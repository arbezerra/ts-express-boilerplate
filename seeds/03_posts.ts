import { Knex } from "knex";
import Category from "../models/category";
import User from "../models/user";

export async function seed(knex: Knex): Promise<void> {
  await knex("posts").del();
  const user = await knex<User>("users").first();
  const category = await knex<Category>("categories").first();
  await knex("posts").insert([
    {
      id: "e9d0fd03-4def-4304-9a4a-f39c6d18b13a",
      title: "Hello World",
      slug: "hello-world",
      content: "Hello World!",
      summary: "Hello World...",
      author_id: user!.id,
      category_id: category!.id,
    },
  ]);
}
