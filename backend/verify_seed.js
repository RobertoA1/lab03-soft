const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./agrotech.sqlite');
const tables = ['lotes', 'cultivos', 'clima', 'suelo', 'riego', 'produccion', 'alertas'];

async function count(table) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT COUNT(*) as count FROM ${table}`, (err, row) => {
      if (err) reject(err);
      else resolve({ table, count: row.count });
    });
  });
}

(async () => {
  for (const t of tables) {
    try {
      const r = await count(t);
      console.log(`${r.table}: ${r.count} registros`);
    } catch (e) {
      console.error(`${t}: ERROR - ${e.message}`);
    }
  }
  db.close();
})();
