const { create } = require('./server.js');
const { applyRoutes } = require('./routes.js');


const PORT = 8080;
const HOST = '0.0.0.0';

const server = create();
applyRoutes(server);

server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
