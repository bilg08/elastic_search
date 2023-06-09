const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const client = require('./client');
client.info()
    .then(() => console.log('success'))
    .catch(() => console.error('error'))
async function run() {
    await client.index({
        index: 'game-of-thrones',
        body: {
            character: 'Ned Stark',
            quote: 'Winter is coming.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        body: {
            character: 'Daenerys Targaryen',
            quote: 'I am the blood of the dragon.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        body: {
            character: 'Tyrion Lannister',
            quote: 'A mind needs books like a sword needs whetstone.'
        }
    })

    await client.indices.refresh({ index: 'game-of-thrones' })
}

async function read() {
    try {
        const res = await client.search({
            index: 'game-of-thrones',
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                character: 'Tyrion'
                            }
                        },
                        {
                            match: { quote: 'hello' }
                        }
                    ],
                }
            }
        })
        console.log(res.hits.hits)
    } catch (error) {
        console.log('e')
    }
}

//   read().catch(console.log)
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


// searching on query
app.get('/', async (req, res) => {
    // await run();
    await read()
    res.send({ 'email': 'email' })
});

app.listen(3333, () => console.log('server running at 3333'));