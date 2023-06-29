import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("categories", (table) => {
      table.uuid("id").primary();
      table.string("name").notNullable();
      table.string("slug").notNullable().unique();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("categories");
}

