import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, eventsTable } from "@workspace/db";
import { demoEvents } from "@workspace/db/events-demo-data";
import {
  ListEventsQueryParams,
  ListEventsResponse,
  GetEventParams,
  GetEventResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/events", async (req, res): Promise<void> => {
  const query = ListEventsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const { limit = 10, upcoming } = query.data;
  const databaseEvents = await db.select().from(eventsTable).orderBy(desc(eventsTable.createdAt));
  const all = databaseEvents.length > 0
    ? databaseEvents
    : demoEvents.map((demoEvent) => ({ ...demoEvent, createdAt: new Date(0) }));

  const filtered = upcoming
    ? all.filter((e) => e.date >= new Date().toISOString().split("T")[0])
    : all;

  const paged = filtered.slice(0, limit);
  res.json(ListEventsResponse.parse(paged));
});

router.get("/events/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetEventParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [event] = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.id, params.data.id));

  const result = event ?? demoEvents.find((demoEvent) => demoEvent.id === params.data.id);

  if (!result) {
    res.status(404).json({ error: "Event not found" });
    return;
  }

  res.json(GetEventResponse.parse(result));
});

export default router;
