/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('products', table => {
    table.increments('id').primary();
    table.string('sku').notNullable().unique();
    table.string('name').notNullable();
    table.text('description');
    table.decimal('price', 10, 2).notNullable();
    table.decimal('rating', 3, 2).defaultTo(0);
    table.integer('reviews_count').defaultTo(0);
    table.boolean('availability').defaultTo(true);
    table.json('images'); // Storing array of image URLs
    table.string('brand').nullable();
    table.string('category').nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('products');
};
