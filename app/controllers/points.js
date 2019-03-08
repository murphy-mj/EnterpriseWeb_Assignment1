'use strict';
const AdminA = require('../models/admin');
const Poi = require('../models/poi');
const Boom = require('boom');
const ObjectId = require('mongodb').ObjectId;

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
            // extract a list of the various categories,
            // for each category, create an object that holds all the point of interest for that category
            // add that object to an array,
            const CatList = await Poi.distinct("category");
            const holderAr = [];
            for(let i = 0; i < CatList.length; i++){
                const qury = {category:CatList[i].toString()};
                const catColl = await Poi.find(qury);
                holderAr.push(catColl);
            }
            return h.view('home', { title: 'is this home',groupCat:holderAr});
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
            console.log(request.payload);
            let x = request.payload.longitude;
            let y = request.payload.latitude;
            const location = x+","+y;
            console.log(location);
            const newPoi = new Poi({
                name: payload.pointName,
                category: payload.category,
                description: payload.description,
                image: payload.image,
                location: location
            });
            const poi = await newPoi.save();
            return h.redirect('/report');
        }
    },

    point: {
        auth:false,
        handler: async function(request, h) {
            //const pois = await Poi.find();
            return h.view('point', { title: 'Time to add a point from point'});
        }
    },

    showPoints: {
        //auth:false,
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
            let pid = request.auth.credentials.id;
            let adminP = await AdminA.findById(pid);
            console.log("logged in person object "+ adminP);
            if(!adminP){
                pid = 0;
            }
            console.log("logged in person "+pid);
            console.log("from show points")
            console.log(holderAr);
            return h.view('report', {title: 'view Points', groupCat: holderAr,PID:pid});
        },
    },

    updatePoint: {
        //auth:false,
        handler: async function(request, h) {


            try {
                const payload = request.payload;

                const pois = await Poi.find();
                const payl = request.payload;
                console.log(payl.idd);
                const id = payl.idd;
                var o_id = new ObjectId(id);
                var ptEditAr = await Poi.find({_id : o_id});
                var ptEdit = ptEditAr[0];
                console.log(ptEdit);
                console.log(payl.name);
                if(ptEdit) {
                    ptEdit.name = payl.name;
                    ptEdit.category = payl.category;
                    ptEdit.description = payl.description;
                    ptEdit.image = payl.image;
                    ptEdit.location = payl.location;
                    await ptEdit.save();
                }
                return h.redirect('/report');
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },

    pointDelete: {
      handler: async function(request, h) {
              // const pois = await Poi.find();
              let id = request.params.id;
              console.log(id +"is the id from the Delete Point");
              let pdid = new ObjectId(id);
              let poitodel = await Poi.find({_id : pdid});
              console.log(poitodel +"is the pt from the Delete Point");
             // try{
               // await Poi.delete({_id: id});
               //   await Poi.Delete(id);
               // return h.response(result);
           //  } catch (err) {
            //      return h.view('home',{title:"poi removed - error"});
            //  }
              return h.view('home',{title:"poi removed"});
      }
     },



    showPoint: {
        //auth:false,
        handler: async function(request, h) {
            console.log("from show Point");
            let id = request.params.id;
            let o_id = new ObjectId(id);
            let pointt = await Poi.find({_id : o_id});
            //console.log(pointt);
            let p2 ={};
            p2 = pointt[0];
            console.log("data being passed to pointView" +p2);
            return h.view('pointView', { title: 'Time to view the point',pointt: p2});
        }
    },

    viewEditPoint: {
        auth:false,
        handler: async function (request, h) {
            var id = request.query.id;
            console.log(id +" is the id from View Edit Point ag");
            var o_id = new ObjectId(id);
            const pointt = await Poi.find({_id : o_id});
           // console.log(pointt);
            var p2 ={};
            p2 = pointt[0];
           // console.log(p2);
            return h.view('pointEdit', { title: 'Time to view a point from View Edit POint',poi: p2});
        }
    },

    testHelp: {
        auth:false,
        handler: async function (request, h) {
            const CatList = await Poi.distinct("category");
           // const holderAr = [];
            for (let i = 0; i < CatList.length; i++) {
                console.log(CatList[i]);
               // var qury = {category: CatList[i].toString()};
              //  console.log(qury);
              //  var catColl = await Poi.find(qury);
              //  holderAr.push(catColl);
            }

            console.log("from testHelp");
          // console.log(holderAr);
            return h.view('TestingHelp', {title: 'view testing help', states: CatList});
        },
    },
    testHelp2: {
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
            return h.view('TestingHelp', {title: 'view Points', groupCat: holderAr});
        },
    }




};

module.exports = Points;