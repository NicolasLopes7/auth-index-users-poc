import { seed } from './seed';
import hashMigrations from './migrations/hash';
import btreeMigrations from './migrations/btree';
import { client } from './pg';

const run = async () => {
    await client.connect()
        
    console.time('RESET_DB')
    await hashMigrations.down()
    await btreeMigrations.down()
    console.timeEnd('RESET_DB')

    console.time('[HASH]: migration')
    await hashMigrations.up()
    console.timeEnd('[HASH]: migration')

    console.time('[HASH]: seed')
    const hashData = await seed()
    console.timeEnd('[HASH]: seed')

    console.time('[HASH]: query')
    const hashRes = await client.query(`EXPLAIN ANALYZE SELECT * FROM users WHERE api_key = '${hashData[1000].api_key}'`)
    console.timeEnd('[HASH]: query')
    console.time('[HASH]: migration down')
    await hashMigrations.down()
    console.timeEnd('[HASH]: migration down')
    
    console.time('[BTREE]: migration')
    await btreeMigrations.up()
    console.timeEnd('[BTREE]: migration')

    console.time('[BTREE]: seed')
    const data = await seed()
    console.timeEnd('[BTREE]: seed')

    console.time('[BTREE]: query')
    const res = await client.query(`EXPLAIN ANALYZE SELECT * FROM users WHERE api_key = '${data[1000].api_key}'`)
    console.timeEnd('[BTREE]: query')
    console.time('[BTREE]: migration down')
    await btreeMigrations.down()
    console.timeEnd('[BTREE]: migration down')
    
    console.log("\nHASH QUERY PLAN: \n",hashRes.rows.map((r: any) => r['QUERY PLAN']).join('\n'))
    console.log("\nBTREE QUERY PLAN: \n",res.rows.map((r: any) => r['QUERY PLAN']).join('\n'))
    process.exit()
};
(async () => run())()
