import { client } from "./pg";
import faker from 'faker'

export const seed = async (size = 100000) => {
    const users = Array(size).fill({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        api_key: faker.random.uuid(),
        created_at: faker.date.past(),
        updated_at: faker.date.recent()
    })

    return client.query(`INSERT INTO users (name, email, password, api_key, created_at, updated_at) 
    VALUES ${users.map((user) => `(
        '${user.name}',
        '${user.email}',
        '${user.password}',
        '${user.api_key}',
        '${user.created_at}',
        '${user.updated_at}')`)
        .join(',')};`
    )
}