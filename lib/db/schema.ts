import {
  pgTable,
  text,
  integer,
  real,
  boolean,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  sk: text("sk").notNull(),
  it: text("it").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  nameSk: text("name_sk").notNull(),
  nameIt: text("name_it").notNull(),
  category: text("category").notNull(),
  subCategory: text("sub_category"),
  price: real("price").notNull(),
  compareAtPrice: real("compare_at_price"),
  volume: text("volume"),
  region: text("region"),
  winery: text("winery"),
  vintage: text("vintage"),
  alcohol: text("alcohol"),
  descriptionSk: text("description_sk").notNull().default(""),
  descriptionIt: text("description_it").notNull().default(""),
  image: text("image").notNull(),
  inStock: boolean("in_stock").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Category = typeof categories.$inferSelect;
