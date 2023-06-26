import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("categories").del();

    // Inserts seed entries
    await knex("categories").insert([
        { id: "bd7a763f-3135-4923-a2a6-8023b2861f0e", name: "News", slug: "news" },
    ]);
};
