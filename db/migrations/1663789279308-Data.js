module.exports = class Data1663789279308 {
  name = 'Data1663789279308'

  async up(db) {
    await db.query(`CREATE TABLE "preimage" ("id" character varying NOT NULL, "hash" text NOT NULL, "proposer" text NOT NULL, "deposit" numeric NOT NULL, "proposed_call" jsonb, "status" character varying(7) NOT NULL, "status_history" jsonb NOT NULL, "created_at_block" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at_block" integer, "updated_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_dff8526c5d16d71afbefb55b286" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_c6e9bc6f69c924e85a44174d35" ON "preimage" ("hash") `)
    await db.query(`CREATE INDEX "IDX_8961b767f111466724025930b0" ON "preimage" ("created_at_block") `)
    await db.query(`CREATE INDEX "IDX_146c48e4f4bf54acb708686897" ON "preimage" ("created_at") `)
    await db.query(`CREATE TABLE "vote" ("id" character varying NOT NULL, "voter" text, "referendum_id" character varying NOT NULL, "referendum_index" integer NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "decision" character varying(7) NOT NULL, "balance" jsonb NOT NULL, "lock_period" integer, CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_6c157f7819d8bf5869a9e2ab86" ON "vote" ("referendum_id") `)
    await db.query(`CREATE INDEX "IDX_6d54f04fc9dd3a4c15cb607c9e" ON "vote" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_8d701dbd422ac5e3e1d7a9a0d1" ON "vote" ("timestamp") `)
    await db.query(`CREATE TABLE "referendum" ("id" character varying NOT NULL, "hash" text NOT NULL, "index" integer NOT NULL, "threshold" jsonb NOT NULL, "status" character varying(9) NOT NULL, "status_history" jsonb NOT NULL, "created_at_block" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "ended_at_block" integer, "ended_at" TIMESTAMP WITH TIME ZONE, "updated_at_block" integer, "updated_at" TIMESTAMP WITH TIME ZONE, "total_issuance" numeric NOT NULL, "preimage_id" character varying, CONSTRAINT "PK_772fc260f18c235a6327252ce00" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_d8d1763676047e95e67925b942" ON "referendum" ("hash") `)
    await db.query(`CREATE INDEX "IDX_33436e93497e1ac9ea28eb288e" ON "referendum" ("index") `)
    await db.query(`CREATE INDEX "IDX_5880aad6fdaa1d4092e7a25435" ON "referendum" ("created_at_block") `)
    await db.query(`CREATE INDEX "IDX_25101f21f70d59929b84ae0411" ON "referendum" ("created_at") `)
    await db.query(`CREATE INDEX "IDX_c03067ac62c70a40bfd726f91e" ON "referendum" ("preimage_id") `)
    await db.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_6c157f7819d8bf5869a9e2ab86a" FOREIGN KEY ("referendum_id") REFERENCES "referendum"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "referendum" ADD CONSTRAINT "FK_c03067ac62c70a40bfd726f91ee" FOREIGN KEY ("preimage_id") REFERENCES "preimage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "preimage"`)
    await db.query(`DROP INDEX "public"."IDX_c6e9bc6f69c924e85a44174d35"`)
    await db.query(`DROP INDEX "public"."IDX_8961b767f111466724025930b0"`)
    await db.query(`DROP INDEX "public"."IDX_146c48e4f4bf54acb708686897"`)
    await db.query(`DROP TABLE "vote"`)
    await db.query(`DROP INDEX "public"."IDX_6c157f7819d8bf5869a9e2ab86"`)
    await db.query(`DROP INDEX "public"."IDX_6d54f04fc9dd3a4c15cb607c9e"`)
    await db.query(`DROP INDEX "public"."IDX_8d701dbd422ac5e3e1d7a9a0d1"`)
    await db.query(`DROP TABLE "referendum"`)
    await db.query(`DROP INDEX "public"."IDX_d8d1763676047e95e67925b942"`)
    await db.query(`DROP INDEX "public"."IDX_33436e93497e1ac9ea28eb288e"`)
    await db.query(`DROP INDEX "public"."IDX_5880aad6fdaa1d4092e7a25435"`)
    await db.query(`DROP INDEX "public"."IDX_25101f21f70d59929b84ae0411"`)
    await db.query(`DROP INDEX "public"."IDX_c03067ac62c70a40bfd726f91e"`)
    await db.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_6c157f7819d8bf5869a9e2ab86a"`)
    await db.query(`ALTER TABLE "referendum" DROP CONSTRAINT "FK_c03067ac62c70a40bfd726f91ee"`)
  }
}
