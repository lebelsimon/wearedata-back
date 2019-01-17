const Koa = require ('koa');
const KoaRouter = require ('koa-router');
const bodyParser = require ('koa-bodyparser');

const cors = require ('koa-cors');

// const userRoutes = require ('./routes/clients.routes.js');
const client = require('./controllers/client.controller.js');

//const users = require ('./data/users.json');
//const albums = require ('./data/albums.json');

//const variable = "test";

const app = new Koa();

app.use(bodyParser());
app.use(cors());

const router = new KoaRouter();

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

app.use(router.routes()).use(router.allowedMethods());

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url,{ useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(router.routes()).use(router.allowedMethods());

router.get('/', async (ctx) => {
 ctx.body = "Bienvenue dans la merveilleuse API de wearedata";
});

// Create a new user
router.post('/clients', client.create);

// Retrieve all clients
router.get('/clients', client.findAll);

// Retrieve a single client with noteId
router.get('/clients/:id', client.findOne);

// Update a client with clientid
router.put('/clients/:id', client.update);

// Update client at first connexion
router.put('/clients/:id', client.updateFirstconnection);

// Delete a client with clientid
router.delete('/clients/:id', client.delete);

//router.get('/api/users', async (ctx) => {
//  ctx.body = users;
//});

//router.get('/api/products', async (ctx) => {
//  ctx.body = albums;
//});
app.listen(3000, () => console.log('server on'));
