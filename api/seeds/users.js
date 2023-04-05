/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {first: "Kyle", last: "Mersinger", username: "Kyle4679", password: "somethingotherthanpassword"},
    {first: "Kaia", last: "Mersinger", username: "Potato_wolf16", password: "idksomethingsecure"},
    {first: "Shaq", last: "O'Neal", username: "ShaqAttaq", password: "betterthanjordan"},
    {first: "Samus", last: "Aran", username: "KillinMetroids", password: "raisedbythechozo"},
  ]);
};
