-- Verified business customers. A row is created only after the company ID
-- was found in RPO (Register právnických osôb); `status = 'rejected'` is how
-- the admin revokes business pricing for a company.
CREATE TABLE IF NOT EXISTS "b2b_accounts" (
  "id" serial PRIMARY KEY NOT NULL,
  "ico" text NOT NULL UNIQUE,
  "company" text NOT NULL,
  "ic_dph" text,
  "email" text NOT NULL,
  "phone" text,
  "address" text,
  "status" text NOT NULL DEFAULT 'approved',
  "verified_via" text NOT NULL DEFAULT 'rpo',
  "vat_valid" boolean,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);
