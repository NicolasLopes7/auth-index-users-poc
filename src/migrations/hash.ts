import { client } from "../pg";

export const up = async () => client.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        api_key VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
    );
    CREATE INDEX IF NOT EXISTS api_key_index ON users USING hash (api_key);
`)

export const down = async () => client.query(`DROP TABLE IF EXISTS users;`)

export default { up, down }