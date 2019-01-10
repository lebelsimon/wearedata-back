module.exports = (app) => {
    const client = require('../controllers/client.controller.js');

    // Create a new user
    app.post('/clients', client.create);

    // Retrieve all clients
    app.get('/clients', client.findAll);

    // Retrieve a single client with noteId
    app.get('/clients/:id', client.findOne);

    // Update a client with clientid
    app.put('/clients/:id', client.update);

    // Update client at first connexion
    app.put('/clients/:id', client.updateFirstconnection);

    // Delete a client with clientid
    app.delete('/clients/:id', client.delete);
}
