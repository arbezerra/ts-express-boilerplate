import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("posts", (table) => {
    table.uuid("id").primary();
    table.string("title").notNullable();
    table.string("slug").notNullable().unique();
    table.text("content", "LONGTEXT").notNullable();
    table.text("summary").notNullable();
    table
      .timestamp("date", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.uuid("author_id").notNullable();
    table.foreign("author_id").references("users.id");
    table.uuid("category_id").notNullable();
    table.foreign("category_id").references("categories.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("posts");
}
