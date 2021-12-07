const fastify = require('fastify')({ logger: true })
const fs = require('fs');

const list = () => {
    const raw = fs.readFileSync('./cars_models.csv', 'utf-8')
    const lines = raw.split(/\r?\n/);
    return lines.map((line) => {
        const [make, model, year, eol] = line.split(';')
        return {
            make,
            model
        }
    });
}

fastify.get('/dictionary/v1/cars', async () => {
    return list()
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()