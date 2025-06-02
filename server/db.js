import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const savePayment = async (session) => {
  const { id, amount_total, currency, payment_status } = session;
  await pool.query(
    `INSERT INTO payments (stripe_session_id, amount, currency, status)
     VALUES ($1, $2, $3, $4)`,
    [id, amount_total, currency, payment_status]
  );
};

export const updatePaymentStatus = async (sessionId, status) => {
  await pool.query(
    `UPDATE payments SET status=$1, updated_at=NOW() WHERE stripe_session_id=$2`,
    [status, sessionId]
  );
};
