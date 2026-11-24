import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const eventsTable = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
  category: text("category").notNull(),
  theme: text("theme"),
  description: text("description"),
  imageUrl: text("image_url"),
  speakerName: text("speaker_name"),
  speakerTitle: text("speaker_title"),
  speakerBio: text("speaker_bio"),
  speakerImageUrl: text("speaker_image_url"),
  schedule: jsonb("schedule").$type<Array<{ time: string; title: string; description?: string | null }>>(),
  locationName: text("location_name"),
  locationAddress: text("location_address"),
  locationMapUrl: text("location_map_url"),
  registrationUrl: text("registration_url"),
  registrationDescription: text("registration_description"),
  contactName: text("contact_name"),
  contactPhone: text("contact_phone"),
  contactEmail: text("contact_email"),
  additionalInformation: text("additional_information"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertEventSchema = createInsertSchema(eventsTable).omit({ id: true, createdAt: true });
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof eventsTable.$inferSelect;
