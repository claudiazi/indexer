module.exports = class Data1670645892827 {
    name = 'Data1670645892827'

    async up(db) {
        await db.query(`ALTER TABLE "conviction_vote" DROP COLUMN "decision"`)
        await db.query(`ALTER TABLE "conviction_vote" ADD "decision" character varying(12) NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "conviction_vote" ADD "decision" character varying(7) NOT NULL`)
        await db.query(`ALTER TABLE "conviction_vote" DROP COLUMN "decision"`)
    }
}
