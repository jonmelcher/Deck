const uuidv4 = require('uuid/v4');
const { knuthShuffle } = require('knuth-shuffle');
const { client } = require('./redis.js');


module.exports = {
    applyRoutes(server) {
        server.post('/new', (req, res) => {
            const foo = [ 1, 2, 3, 4, 5 ];
            const uuid = uuidv4();
            knuthShuffle(foo);
            client.lpush(uuid, ...foo).then(() => res.send({ uuid }));
        });
        server.get('/:uuid', (req, res) => {
            client.lrange(req.params.uuid, 0, -1).then((deck) => res.send({ deck }));
        });
    }
};
