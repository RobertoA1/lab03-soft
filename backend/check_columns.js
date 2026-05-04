const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./agrotech.sqlite');
db.all("PRAGMA table_info(alertas);", (e, r) => {
  if (e) console.error(e);
  else console.log(JSON.stringify(r, null, 2));
  db.close();
});
