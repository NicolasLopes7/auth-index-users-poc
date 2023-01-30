import { client } from "./pg";
import faker from 'faker'

export const seed = async (size = 100000) => {
    const users = Array(size).fill({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        api_key: faker.random.uuid(),
    })

    await client.query(`INSERT INTO users (name, email, password, api_key) 
    VALUES ${users.map((user) => `(
        '${user.name}',
        '${user.email}',
        '${user.password}',
        '${user.api_key}')`)
        .join(',')};`
    )

    return users
}