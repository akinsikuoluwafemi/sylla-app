import { pgTable, serial, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const pdfExports = pgTable('pdf_exports', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').default(sql`gen_random_uuid()`).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  pdfUrl: text('pdf_url').notNull(),
})