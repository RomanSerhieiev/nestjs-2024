import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1729502159581 implements MigrationInterface {
    name = 'FirstMigration1729502159581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "isVerified" boolean NOT NULL, CONSTRAINT "PK_46c438e5a956fb9c3e86e73e321" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "authorId" uuid NOT NULL, "articleId" uuid NOT NULL, CONSTRAINT "PK_09028bba28e1e189969ab502fea" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "content" text NOT NULL, "authorId" uuid NOT NULL, "tags" text NOT NULL, CONSTRAINT "PK_8c1ebe576f079011c7f501069e8" PRIMARY KEY ("_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
