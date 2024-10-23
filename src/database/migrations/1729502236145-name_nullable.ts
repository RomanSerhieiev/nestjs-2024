import { MigrationInterface, QueryRunner } from "typeorm";

export class NameNullable1729502236145 implements MigrationInterface {
    name = 'NameNullable1729502236145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL`);
    }

}
