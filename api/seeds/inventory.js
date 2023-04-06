/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('inventory').del()
  await knex('inventory').insert([
    {userid: 1, name: "Super Metroid NTSC-J", desc: "Super Metroid for the SNES, Japanese version", quantity: 1},
    {userid: 3, name: "EarthBound NTSC-J", desc: "EarthBound for the SNES, Japanese version", quantity: 2},
    {userid: 3, name: "Super Mario Kart NTSC-J", desc: "Super Mario Kart for the SNES, Japanese version", quantity: 1},
    {userid: 2, name: "Super Mario World NTSC-U", desc: "Super Mario World for the SNES, American version", quantity: 3},
    {userid: 2, name: "ChronoTrigger NTSC-J", desc: "ChronoTrigger for the SNES, Japanese version", quantity: 7},
    {userid: 1, name: "EarthBound NTSC-U", desc: "EarthBound for the SNES, American version", quantity: 19},
  ]);
};
