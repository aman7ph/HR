const pg = require("pg");
const Pool = pg.Pool;

const pool = new Pool({
  user: "postgres.qcvoacnrnsuvdktvtqoz",
  host: "aws-0-eu-central-1.pooler.supabase.com",
  database: "postgres",
  password: "SGLU22d2avKVWL4q",
  port: 5432,
});

const getConnection = async () => {
  try {
    return await pool.connect();
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};

module.exports = getConnection;
