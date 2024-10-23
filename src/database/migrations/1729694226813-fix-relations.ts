import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelations1729694226813 implements MigrationInterface {
    name = 'FixRelations1729694226813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_a9d18538b896fe2a6762e143bea"`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" DROP CONSTRAINT "FK_88bd85554c3fa712cd505ec7b1b"`);
        await queryRunner.query(`CREATE TABLE "articles-to-tags" ("created" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "article_id" uuid NOT NULL, "tag_id" uuid NOT NULL, CONSTRAINT "PK_50c4811aecff6105de0fca96112" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("created" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "article_id" uuid NOT NULL, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "follows" ("created" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "follower_id" uuid NOT NULL, "following_id" uuid NOT NULL, CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "PK_09028bba28e1e189969ab502fea"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "_id"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "authorId"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "articleId"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isVerified"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "body" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "article_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bio" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "image" text`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles-to-tags" ADD CONSTRAINT "FK_63f4f2d1e20abbce2145a38ff35" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles-to-tags" ADD CONSTRAINT "FK_40d2661449afe664c81e24bc188" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_0deaa79a910af56b33472c90ee0" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e9b498cca509147e73808f9e593" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_87bb15395540ae06337a486a77a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" ADD CONSTRAINT "FK_36f06086d2187ca909a4cf79030" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_54b5dc2739f2dea57900933db66" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_c518e3988b9c057920afaf2d8c0" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_c518e3988b9c057920afaf2d8c0"`);
        await queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_54b5dc2739f2dea57900933db66"`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" DROP CONSTRAINT "FK_36f06086d2187ca909a4cf79030"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_87bb15395540ae06337a486a77a"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e9b498cca509147e73808f9e593"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_0deaa79a910af56b33472c90ee0"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"`);
        await queryRunner.query(`ALTER TABLE "articles-to-tags" DROP CONSTRAINT "FK_40d2661449afe664c81e24bc188"`);
        await queryRunner.query(`ALTER TABLE "articles-to-tags" DROP CONSTRAINT "FK_63f4f2d1e20abbce2145a38ff35"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "article_id"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "body"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "articleId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "authorId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "content" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "PK_09028bba28e1e189969ab502fea" PRIMARY KEY ("_id")`);
        await queryRunner.query(`DROP TABLE "follows"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "articles-to-tags"`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" ADD CONSTRAINT "FK_88bd85554c3fa712cd505ec7b1b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_a9d18538b896fe2a6762e143bea" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
