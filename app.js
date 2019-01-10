const Koa = require ('koa');
const KoaRouter = require ('koa-router');
const bodyParser = require ('koa-bodyparser');

const cors = require ('koa-cors');


//const users = require ('./data/users.json');
//const albums = require ('./data/albums.json');

//const variable = "test";

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());
app.use(cors());

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(router.routes()).use(router.allowedMethods());

router.get('/', async (ctx) => {
 ctx.body = "it works";
});

//router.get('/api/users', async (ctx) => {
//  ctx.body = users;
//});

//router.get('/api/products', async (ctx) => {
//  ctx.body = albums;
//});
app.listen(3000, () => console.log('server on'));
