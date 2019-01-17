const Client = require('../models/client.model.js');

// Create and Save a new client
exports.create = async (ctx) => {
    // Validate request
    console.log('test');
    if(!ctx.request.body.name) {
        return res.status(400).send({
            message: "client content can not be empty"
        });
    }
    // Create a client
    const client = new Client({
        name: ctx.request.body.name,
        surname: ctx.request.body.surname,
        company:ctx.request.body.company,
        siret:ctx.request.body.siret,
        mail:ctx.request.body.mail,
        telephone:ctx.request.body.telephone,
        company_adress:ctx.request.body.company_adress || " ",
        company_citycode:ctx.request.body.company_citycode || " ",
        company_city:ctx.request.body.company_city || " ",
        website:ctx.request.body.website || " ",
        login:ctx.request.body.login || " ",
        password:ctx.request.body.password || " ",
    });
    console.log(client);
    // Save client in the database
    await client.save()
    .catch(()=>{
      if (!client) {
        return ctx.throw(400)
      }
    })
    .then(() => {
        ctx.body = client;
    })
};

// Retrieve and return all client from the database.
exports.findAll = async (ctx) => {
    console.log("Ici");
    const clients = await Client.find();
    if (!clients) {
      return ctx.throw(400, 'cannot find Clients');
    }
    else {
      ctx.body = clients;
    }
};

// Find a single client with a clientid
exports.findOne = async (ctx) => {
    const client = await Client.findById(ctx.params.id)
    if (!client) {
      return ctx.throw(400, 'client not found with id ' + ctx.params.id);
    }
    else {
      ctx.body = client;
    }
};

// Update a client identified by the clientid in the request
exports.update = async (ctx) => {

  const client = await Client.findByIdAndUpdate(ctx.params.id, {
    name: ctx.request.body.name,
    surname: ctx.request.body.surname,
    company:ctx.request.body.company,
    siret:ctx.request.body.siret,
    mail:ctx.request.body.mail,
    telephone:ctx.request.body.telephone
  })
  if (!client) {
    return ctx.throw(400, 'cannot update Client');
    ctx.body = "Could not delete client"
  }
  else {
    ctx.body = `Client ${client.name} ${client.surname} updated`;
  }

};

// Update VIP client at first connexion

exports.updateFirstconnexion = async (ctx) => {

  const client = await Client.findByIdAndUpdate(ctx.params.id, {
    login: ctx.request.body.login,
    password: ctx.request.body.password
  })
  if (!client) {
    return ctx.throw(400, 'cannot update identifiants Client');
  }
  else {
    ctx.body = `Client ${client.name} ${client.surname}, identifiants modifiés`;
  }

};

//Update company client

exports.updateCompany = async (ctx) => {

  const client = await Client.findByIdAndUpdate(ctx.params.id, {
    company_adress:ctx.request.body.company_adress,
    company_citycode:ctx.request.body.company_citycode,
    company_city:ctx.request.body.company_city,
    website:ctx.request.body.website
  })
  if (!client) {
    return ctx.throw(400, 'cannot update company Client');
  }
  else {
    ctx.body = `Client ${client.name} ${client.surname}, company updated`;
  }

};

// Delete a client with the specified clientid in the request
exports.delete = async (ctx) => {
    const client = await Client.findByIdAndDelete(ctx.params.id)
    if (!client) {
      return ctx.throw(400, 'cannot delete Client, invalid id');
      ctx.body = "Could not delete client"
    }
    else {
      ctx.body = `Client ${client.name} ${client.surname} deleted`;
    }

};
