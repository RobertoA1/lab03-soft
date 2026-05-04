require('dotenv').config({
  path: ['.env.production', '.env.development', '.env'],
  override: true,
  quiet: true
});

module.exports = {
  "username": process.env.DATABASE_USER,
  "password": process.env.DATABASE_PASSWORD,
  "database": process.env.DATABASE_NAME,
  "host": process.env.DATABASE_HOST,
  "dialect": process.env.DATABASE_DIALECT
}
