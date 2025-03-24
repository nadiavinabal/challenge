import { MigrationInterface, QueryRunner } from "typeorm";

export class Inicial1742852570707 implements MigrationInterface {
    name = 'Inicial1742852570707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "model" character varying NOT NULL, "manufacturer" character varying NOT NULL, "cost_in_credits" character varying NOT NULL, "length" character varying NOT NULL, "max_atmosphering_speed" character varying NOT NULL, "crew" character varying NOT NULL, "passengers" character varying NOT NULL, "cargo_capacity" character varying NOT NULL, "consumables" character varying NOT NULL, "vehicle_class" character varying NOT NULL, "url" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP NOT NULL, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "starship" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "model" character varying NOT NULL, "manufacturer" character varying NOT NULL, "cost_in_credits" character varying NOT NULL, "length" character varying NOT NULL, "max_atmosphering_speed" character varying NOT NULL, "crew" character varying NOT NULL, "passengers" character varying NOT NULL, "cargo_capacity" character varying NOT NULL, "consumables" character varying NOT NULL, "hyperdrive_rating" character varying NOT NULL, "MGLT" character varying NOT NULL, "starship_class" character varying NOT NULL, "url" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP NOT NULL, CONSTRAINT "PK_398cab92a55d977f03881dda8e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "character" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "height" character varying NOT NULL, "mass" character varying NOT NULL, "hair_color" character varying NOT NULL, "skin_color" character varying NOT NULL, "eye_color" character varying NOT NULL, "birth_year" character varying NOT NULL, "gender" character varying NOT NULL, "url" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP NOT NULL, CONSTRAINT "PK_6c4aec48c564968be15078b8ae5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "planet" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "rotation_period" character varying NOT NULL, "orbital_period" character varying NOT NULL, "diameter" character varying NOT NULL, "climate" character varying NOT NULL, "gravity" character varying NOT NULL, "terrain" character varying NOT NULL, "surface_water" character varying NOT NULL, "population" character varying NOT NULL, "url" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP NOT NULL, CONSTRAINT "PK_cb7506671ad0f19d6287ee4bfb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "species" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "classification" character varying NOT NULL, "designation" character varying NOT NULL, "average_height" character varying NOT NULL, "skin_colors" character varying NOT NULL, "hair_colors" character varying NOT NULL, "eye_colors" character varying NOT NULL, "average_lifespan" character varying NOT NULL, "url" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP NOT NULL, CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "film" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "url" character varying NOT NULL, "episode_id" integer NOT NULL, "opening_crawl" text NOT NULL, "director" character varying NOT NULL, "producer" character varying NOT NULL, "release_date" TIMESTAMP NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP NOT NULL, CONSTRAINT "PK_37ec0ffe0011ccbe438a65e3c6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "film_characters_character" ("filmId" integer NOT NULL, "characterId" integer NOT NULL, CONSTRAINT "PK_747541f3482239ead331c08eb04" PRIMARY KEY ("filmId", "characterId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_070b9f3a64962f9b50b32eadf8" ON "film_characters_character" ("filmId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5af655f095527d69af9ec85b62" ON "film_characters_character" ("characterId") `);
        await queryRunner.query(`CREATE TABLE "film_planets_planet" ("filmId" integer NOT NULL, "planetId" integer NOT NULL, CONSTRAINT "PK_b0996a2f9f2ef9b1f80223d30b2" PRIMARY KEY ("filmId", "planetId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9e9d858b064b7d0fa02a9764e1" ON "film_planets_planet" ("filmId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6821d91826ca31cc4e4588b535" ON "film_planets_planet" ("planetId") `);
        await queryRunner.query(`CREATE TABLE "film_starships_starship" ("filmId" integer NOT NULL, "starshipId" integer NOT NULL, CONSTRAINT "PK_130ea5faa82565e819f8d575289" PRIMARY KEY ("filmId", "starshipId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ed79253745f81534b737ce768c" ON "film_starships_starship" ("filmId") `);
        await queryRunner.query(`CREATE INDEX "IDX_21297c5d74a841542bcb7fe063" ON "film_starships_starship" ("starshipId") `);
        await queryRunner.query(`CREATE TABLE "film_vehicles_vehicle" ("filmId" integer NOT NULL, "vehicleId" integer NOT NULL, CONSTRAINT "PK_ace6d3e1be3bbc2107df07eade5" PRIMARY KEY ("filmId", "vehicleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_af46f6d0bef8eba92546a8c537" ON "film_vehicles_vehicle" ("filmId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8be4e7e1014359bb4715338cf2" ON "film_vehicles_vehicle" ("vehicleId") `);
        await queryRunner.query(`CREATE TABLE "film_species_species" ("filmId" integer NOT NULL, "speciesId" integer NOT NULL, CONSTRAINT "PK_46c85de82b1e057207f45783448" PRIMARY KEY ("filmId", "speciesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5dca805e1b117016b196e64305" ON "film_species_species" ("filmId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3af75337b121624486cf179bf1" ON "film_species_species" ("speciesId") `);
        await queryRunner.query(`ALTER TABLE "film_characters_character" ADD CONSTRAINT "FK_070b9f3a64962f9b50b32eadf81" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "film_characters_character" ADD CONSTRAINT "FK_5af655f095527d69af9ec85b623" FOREIGN KEY ("characterId") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "film_planets_planet" ADD CONSTRAINT "FK_9e9d858b064b7d0fa02a9764e18" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "film_planets_planet" ADD CONSTRAINT "FK_6821d91826ca31cc4e4588b5355" FOREIGN KEY ("planetId") REFERENCES "planet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "film_starships_starship" ADD CONSTRAINT "FK_ed79253745f81534b737ce768c1" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "film_starships_starship" ADD CONSTRAINT "FK_21297c5d74a841542bcb7fe063a" FOREIGN KEY ("starshipId") REFERENCES "starship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "film_vehicles_vehicle" ADD CONSTRAINT "FK_af46f6d0bef8eba92546a8c5375" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "film_vehicles_vehicle" ADD CONSTRAINT "FK_8be4e7e1014359bb4715338cf20" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "film_species_species" ADD CONSTRAINT "FK_5dca805e1b117016b196e64305b" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "film_species_species" ADD CONSTRAINT "FK_3af75337b121624486cf179bf13" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "film_species_species" DROP CONSTRAINT "FK_3af75337b121624486cf179bf13"`);
        await queryRunner.query(`ALTER TABLE "film_species_species" DROP CONSTRAINT "FK_5dca805e1b117016b196e64305b"`);
        await queryRunner.query(`ALTER TABLE "film_vehicles_vehicle" DROP CONSTRAINT "FK_8be4e7e1014359bb4715338cf20"`);
        await queryRunner.query(`ALTER TABLE "film_vehicles_vehicle" DROP CONSTRAINT "FK_af46f6d0bef8eba92546a8c5375"`);
        await queryRunner.query(`ALTER TABLE "film_starships_starship" DROP CONSTRAINT "FK_21297c5d74a841542bcb7fe063a"`);
        await queryRunner.query(`ALTER TABLE "film_starships_starship" DROP CONSTRAINT "FK_ed79253745f81534b737ce768c1"`);
        await queryRunner.query(`ALTER TABLE "film_planets_planet" DROP CONSTRAINT "FK_6821d91826ca31cc4e4588b5355"`);
        await queryRunner.query(`ALTER TABLE "film_planets_planet" DROP CONSTRAINT "FK_9e9d858b064b7d0fa02a9764e18"`);
        await queryRunner.query(`ALTER TABLE "film_characters_character" DROP CONSTRAINT "FK_5af655f095527d69af9ec85b623"`);
        await queryRunner.query(`ALTER TABLE "film_characters_character" DROP CONSTRAINT "FK_070b9f3a64962f9b50b32eadf81"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3af75337b121624486cf179bf1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5dca805e1b117016b196e64305"`);
        await queryRunner.query(`DROP TABLE "film_species_species"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8be4e7e1014359bb4715338cf2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af46f6d0bef8eba92546a8c537"`);
        await queryRunner.query(`DROP TABLE "film_vehicles_vehicle"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21297c5d74a841542bcb7fe063"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed79253745f81534b737ce768c"`);
        await queryRunner.query(`DROP TABLE "film_starships_starship"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6821d91826ca31cc4e4588b535"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9e9d858b064b7d0fa02a9764e1"`);
        await queryRunner.query(`DROP TABLE "film_planets_planet"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5af655f095527d69af9ec85b62"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_070b9f3a64962f9b50b32eadf8"`);
        await queryRunner.query(`DROP TABLE "film_characters_character"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "film"`);
        await queryRunner.query(`DROP TABLE "species"`);
        await queryRunner.query(`DROP TABLE "planet"`);
        await queryRunner.query(`DROP TABLE "character"`);
        await queryRunner.query(`DROP TABLE "starship"`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
    }

}
