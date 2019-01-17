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

    client.find()
    .then(clients => {
        res.send(clients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving clients."
        });
    });
};

// Find a single client with a clientid
exports.findOne = (req, res) => {
    client.findById(req.params.id)
   .then(client => {
       if(!client) {
           return res.status(404).send({
               message: "client not found with id " + req.params.id
           });
       }
       res.send(client);
   }).catch(err => {
       if(err.kind === 'ObjectId') {
           return res.status(404).send({
               message: "client not found with id " + req.params.id
           });
       }
       return res.status(500).send({
           message: "Error retrieving client with id " + req.params.id
       });
   });
};


// Update VIP client at first connexion

exports.updateFirstconnection = (req, res) => {

  // Validate Request
  if(!req.body.name) {
      return res.status(400).send({
          message: "client content can not be empty"
      });
  }

  // Find client and update it with the request body
  client.findByIdAndUpdate(req.params.id, {
    company_adress:req.body.company_adress,
    company_citycode:req.body.company_citycode,
    company_city:req.body.company_city,
    website:req.body.website,
    password:req.body.password
  }, {new: true})
  .then(client => {
      if(!client) {
          return res.status(404).send({
              message: "client not found with id " + req.params.id
          });
      }
      res.send(client);
  }).catch(err => {
      if(err.kind === 'id') {
          return res.status(404).send({
              message: "client not found with id " + req.params.id
          });
      }
      return res.status(500).send({
          message: "Error updating client with id " + req.params.id
      });
  });

};

// Update a client identified by the clientid in the request
exports.update = async (ctx) => {

    // Validate Request
    if(!ctx.request.body.name) {
        return ctx.throw(400, "client content can not be empty");
    }

    // Find client and update it with the request body
    client.findByIdAndUpdate(ctx.request.params.id, {
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
      password:ctx.request.body.password || " ",
    }, {new: true})
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "client not found with id " + req.params.id
            });
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'id') {
            return res.status(404).send({
                message: "client not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating client with id " + req.params.id
        });
    });

};

// Delete a client with the specified clientid in the request
exports.delete = (req, res) => {
    client.findByIdAndRemove(req.params.id)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "client not found with id " + req.params.id
            });
        }
        res.send({message: "client deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "client not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete client with id " + req.params.id
        });
    });

};
