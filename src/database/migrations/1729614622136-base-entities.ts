import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseEntities1729614622136 implements MigrationInterface {
    name = 'BaseEntities1729614622136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "PK_46c438e5a956fb9c3e86e73e321" TO "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`CREATE TABLE "articles_tags_tags" ("articlesId" uuid NOT NULL, "tagsId" uuid NOT NULL, CONSTRAINT "PK_bee9492f5e2157b6dc27fd510bd" PRIMARY KEY ("articlesId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0adb8d108330d74e4a7f7d29de" ON "articles_tags_tags" ("articlesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dcd523dc6473a35e6cb0cbf9f2" ON "articles_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "articles_tags_tags" ADD CONSTRAINT "FK_0adb8d108330d74e4a7f7d29de2" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "articles_tags_tags" ADD CONSTRAINT "FK_dcd523dc6473a35e6cb0cbf9f2d" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles_tags_tags" DROP CONSTRAINT "FK_dcd523dc6473a35e6cb0cbf9f2d"`);
        await queryRunner.query(`ALTER TABLE "articles_tags_tags" DROP CONSTRAINT "FK_0adb8d108330d74e4a7f7d29de2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dcd523dc6473a35e6cb0cbf9f2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0adb8d108330d74e4a7f7d29de"`);
        await queryRunner.query(`DROP TABLE "articles_tags_tags"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" TO "PK_46c438e5a956fb9c3e86e73e321"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "id" TO "_id"`);
    }

}
