
//const User = require('../models/user');
const Poi = require('../models/poi');
//const dboo = require('../models/db');
const Boom = require('boom');

const Points = {
    index: {
        handler: function (request, h) {
            return h.view('main', {title: 'Welcome to Points of Interest'});
        }
    },
    signup: {
        handler: function (request, h) {
            return h.view('signup', {title: 'Sign up for Points of Interest'});
        }
    },
    login: {
        handler: function (request, h) {
            return h.view('login', {title: 'Login to Points of interest'});
        }
    },
    home: {
        handler: async function(request, h) {
            const pois = await Poi.find();
            var query = {category: "Rocks"};
            const Catt = await Poi.find(query);
            const CatList = await Poi.distinct("category");
            const holderAr = [];
            for(let i = 0; i < CatList.length; i++){
                console.log(CatList[i]);
                var qury = {category:CatList[i].toString()};
                //console.log(qury);
                var catColl = await Poi.find(qury);
                holderAr.push(catColl);
            }

            console.log(CatList);
            console.log(holderAr);
            return h.view('home', { title: 'Add a Points',groupCat:holderAr});
            //return h.view('home', { title: 'Add a Points', pois: pois,category: Catt, catg: CatList});
            //pois: pois
            //category: Catt,
            //catg: CatList
        },
    },
    report: {
        handler: async function(request, h) {
            const pois = await Poi.find();
            return h.view('report', { title: 'Points so far',pois: pois});
        }
   },

    addPoint: {
        auth:false,
        handler: async function(request, h) {
            const payload = request.payload;
            const newPoi = new Poi({
                name: payload.pointName,
                category: payload.category,
                description: payload.description,
                image: payload.image,
                location: payload.location
            });
            const poi = await newPoi.save();
            // poi is the object tat we have just saved
            request.cookieAuth.set({ id: poi.id });
            return h.redirect('/home');
        }
    },

    point: {
        handler: async function(request, h) {
            //const pois = await Poi.find();
            return h.view('point', { title: 'Time to add a point'});
        }
    },



    showPoints: {
        handler: async function (request, h) {
            const CatList = await Poi.distinct("category");
            const holderAr = [];
            for (let i = 0; i < CatList.length; i++) {
                console.log(CatList[i]);
                var qury = {category: CatList[i].toString()};
                console.log(qury);
                var catColl = await Poi.find(qury);
                holderAr.push(catColl);
            }

            console.log("from show points")
            console.log(holderAr);
            return h.view('report', {title: 'view Points', groupCat: holderAr});
        },
    }
};
module.exports = Points;