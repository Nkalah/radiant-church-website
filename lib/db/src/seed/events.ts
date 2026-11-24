import { db, pool } from "../index";
import { demoEvents } from "../events-demo-data";
import { eventsTable } from "../schema/events";

await db.insert(eventsTable).values(demoEvents).onConflictDoNothing({ target: eventsTable.id });
console.log(`Seeded ${demoEvents.length} demo events.`);
await pool.end();
