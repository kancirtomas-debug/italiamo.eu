INSERT INTO "categories" ("id", "sk", "it", "sort_order")
VALUES ('krekry', 'Slané pochutiny a krekry', 'Snack salati e cracker', 99)
ON CONFLICT ("id") DO UPDATE
  SET "sk" = EXCLUDED."sk",
      "it" = EXCLUDED."it";
