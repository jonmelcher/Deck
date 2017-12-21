const uuidv4 = require('uuid/v4');
const { knuthShuffle } = require('knuth-shuffle');
const { client } = require('./redis.js');
const { generateDeck } = require('./cards.js');


module.exports = {
    applyRoutes(server) {
        server.post('/new', async (req, res) => {
            const { without = [] } = req.body;
            const uuid = uuidv4();
            const deck = generateDeck().filter((card) => !without.includes(card));
            const remaining = deck.length;
            knuthShuffle(deck);
            await client.rpush(uuid, ...deck);
            res.send({ uuid, remaining });
        });
        server.post('/draw', async (req, res) => {
            const { uuid, number } = req.body;
            const cards = [];
            for (let i = 0; i < number; ++i) {
                const card = await client.rpop(uuid);
                if (card === null) {
                    break;
                }
                cards.unshift(card);
            }
            res.send({ uuid, cards });
        });
        server.post('/discard', async (req, res) => {
            const { uuid, number } = req.body;
            let discarded = 0;
            for (let i = 0; i < number; ++i) {
                const card = await client.rpop(uuid);
                if (card === null) {
                    break;
                }
                ++discarded;
            }
            res.send({ uuid, discarded });
        });
        server.post('/shuffle', async (req, res) => {
            const { uuid } = req.body;
            const deck = await client.lrange(uuid, 0, -1);
            await client.del(uuid);
            knuthShuffle(deck);
            await client.rpush(uuid, ...deck);
            res.send({ uuid, shuffled: true });
        });
        server.get('/:uuid/remaining', async (req, res) => {
            const { uuid } = req.params;
            const deck = await client.lrange(uuid, 0, -1);
            const remaining = deck.length;
            res.send({ uuid, remaining });
        });
    }
};
