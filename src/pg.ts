import { Client } from 'pg'

export const client = new Client({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'index-test',
    port: 5433
})