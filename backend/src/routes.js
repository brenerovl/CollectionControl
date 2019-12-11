const express = require('express');
const CollectPointController = require('./controllers/CollectPointController');

const routes = new express.Router();


routes.get('/', (req, res) => {
    return res.send(`Hello ${req.query.name}`);
});

routes.post('/pontos-coleta', CollectPointController.store);
routes.get('/pontos-coleta', CollectPointController.index);
routes.put('/pontos-coleta', CollectPointController.update);
routes.delete('/pontos-coleta/:name', CollectPointController.delete);


module.exports = routes;