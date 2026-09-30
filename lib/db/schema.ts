import {
  pgTable,
  text,
  integer,
  real,
  boolean,
  timestamp,
  serial,
  jsonb,
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
  woltUrl: text("wolt_url"),
  inStock: boolean("in_stock").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Category = typeof categories.$inferSelect;

/**
 * Companies that passed the public-registry check and may see B2B pricing.
 * `status` lets the admin revoke access without deleting the audit trail.
 */
export const b2bAccounts = pgTable("b2b_accounts", {
  id: serial("id").primaryKey(),
  ico: text("ico").notNull().unique(),
  company: text("company").notNull(),
  icDph: text("ic_dph"),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address"),
  status: text("status").notNull().default("approved"),
  verifiedVia: text("verified_via").notNull().default("rpo"),
  vatValid: boolean("vat_valid"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type B2bAccount = typeof b2bAccounts.$inferSelect;

/**
 * Customer orders. Created when checkout starts (status awaiting_*), flipped to
 * `paid` by the GoPay notification webhook once the gateway confirms the card
 * payment. `gopayId` is the gateway payment id used to look the order back up.
 */
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  status: text("status").notNull().default("awaiting_card"),
  method: text("method").notNull(),
  locale: text("locale").notNull().default("sk"),
  gopayId: text("gopay_id"),
  contact: jsonb("contact").notNull(),
  address: jsonb("address").notNull(),
  note: text("note"),
  items: jsonb("items").notNull(),
  pricing: jsonb("pricing").notNull(),
  total: real("total").notNull(),
  customerType: text("customer_type").notNull().default("b2c"),
  b2b: jsonb("b2b"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export type OrderContact = { name: string; email: string; phone: string };
export type OrderAddress = {
  street: string;
  city: string;
  zip: string;
  country: string;
};
export type OrderItem = {
  slug: string;
  name: string;
  price: number;
  unitPrice: number;
  quantity: number;
};
export type OrderPricing = {
  subtotal: number;
  discountPct: number;
  discountAmount: number;
  shipping: number;
  total: number;
};
