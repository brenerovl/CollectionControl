const axios = require('axios');
const CollectPoint = require('../models/CollectPoint');

module.exports = {
    async index(req, res) {
        await CollectPoint.find({  }, function(err, doc) {
            if (err) return res.send(err);

            return res.send(doc);
        }).sort('-createdAt');
    },

    async store(req, res) {
        const {name, address} = req.body;

        const userExists = await CollectPoint.findOne({ name: name });

        if(userExists){
            return res.json(userExists);
        }

        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params:{
                address: address,
                key: 'AIzaSyDi5NeYIPi6Kox-bGb5_IXayW09amWVq1w',
            }

        }).catch(function(err){
            console.log(err);
            return res.status(400).send('Something Broke!');
        });

        const { lat: latitude, lng: longitude } = response.data.results[0].geometry.location;

        const collectPoint = await CollectPoint.create({
            name,
            address,
            latitude,
            longitude,
        });

        return res.json(collectPoint);
    },

    async update(req, res) {
        const { name, newInfo } = req.body;

        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params:{
                address: newInfo.address,
                key: 'AIzaSyDi5NeYIPi6Kox-bGb5_IXayW09amWVq1w',
            }

        });

        const { lat: latitude, lng: longitude } = response.data.results[0].geometry.location;

        const update = {
            name: newInfo.name,
            address: newInfo.address,
            latitude: latitude,
            longitude: longitude,
        }

        console.log(update);

        await CollectPoint.findOneAndUpdate({ name: name }, update, function(err, doc) {
            if(err) return res.send(err);

            return res.json(doc);
        });
    },

    async delete(req, res) {
        var name = req.params.name;

        await CollectPoint.findOneAndDelete({ name: name }, function(err, doc) {
          if(err) return res.send(err);
    
          return res.json(doc);
        });
    },
};