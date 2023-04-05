/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('inventory').del()
  await knex('inventory').insert([
    {userid: 1, name: "Super Metroid NTSC-J", desc: "Super Metroid for the SNES, Japanese version", quantity: 1},
    {userid: 1, name: "EarthBound NTSC-J", desc: "EarthBound for the SNES, Japanese version", quantity: 1},
    {userid: 1, name: "Super Mario Kart NTSC-J", desc: "Super Mario Kart for the SNES, Japanese version", quantity: 1},
    {userid: 1, name: "Super Martio World NTSC-J", desc: "Super Mario World for the SNES, Japanese version", quantity: 1},
  ]);
};
