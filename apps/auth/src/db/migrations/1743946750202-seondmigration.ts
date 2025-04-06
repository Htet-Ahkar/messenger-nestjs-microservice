import { MigrationInterface, QueryRunner } from "typeorm";

export class Seondmigration1743946750202 implements MigrationInterface {
    name = 'Seondmigration1743946750202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "firstName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "firstName" TO "name"`);
    }

}
