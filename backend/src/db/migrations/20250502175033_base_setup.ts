import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable("users", (table) => {
		table.increments("id").primary();
		table.string("email").notNullable().unique();
		table.string("password_hash").notNullable();
		table.text("password_salt").notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
		table.index("email");
	});

	await knex.schema.createTable("github_projects", (table) => {
		table.increments("id").primary();
		table
			.integer("user_id")
			.notNullable()
			.references("id")
			.inTable("users")
			.onDelete("CASCADE");
		table.string("owner").notNullable();
		table.string("repo_name").notNullable();
		table.string("repo_url").notNullable();
		table.integer("stars").defaultTo(0);
		table.integer("forks").defaultTo(0);
		table.integer("open_issues").defaultTo(0);
		table.timestamp("created_at_unix").notNullable();
		table.timestamp("added_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
		table.unique(["user_id", "owner", "repo_name"]);
		table.index(["user_id"]);
		table.index(["owner", "repo_name"]);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists("github_projects");
	await knex.schema.dropTableIfExists("users");
}
