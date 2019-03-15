'use strict';
const AdminA = require('../models/admin');
const Poi = require('../models/poi');
const Boom = require('boom');

// 13.03 error in code const ObjectId = require('mongodb').ObjectId;
const ObjectId = require('mongoose').Types.ObjectId;



const Points = {


  //  index: {
 //       handler: function (request, h) {
  //          return h.view('main', {title: 'Welcome to Points of Interest'});
   //     }
//    },
  //  signup: {
  //      handler: function (request, h) {
  //          const id = request.auth.credentials.id;
  //          return h.view('signup', {title: 'Sign up for Points of Interest',PID:id});
   //     }
   // },

    login: {
        auth:false,
        handler: function (request, h) {
            const id = request.auth.credentials.id;
            return h.view('login', {title: 'Login to Points of interest',PID:id});
        }
    },

    home: {
        //auth:true,
        handler: async function(request, h) {
            console.log("Points home");
            const id = request.auth.credentials.id;
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
           return h.view('home', { title: 'Welcome to the home page',groupCat:holderAr,PID:id});
    },
    },
// not used
    homeAdmin: {
        auth:false,
        handler: async function (request, h) {
            console.log("Points homeAdmin");
            const id = request.auth.credentials.id;
            // extract a list of the various categories,
            // for each category, create an object that holds all the point of interest for that category
            // add that object to an array,
            const CatList = await Poi.distinct("category");
            const holderAr = [];
            for (let i = 0; i < CatList.length; i++) {
                const qury = {category: CatList[i].toString()};
                const catColl = await Poi.find(qury);
                holderAr.push(catColl);
            }
            return h.view('homeAdmin', {title: 'is this home', groupCat: holderAr,PID:id});
        }
    },



    report: {
       // auth:true,
        handler: async function(request, h) {
            console.log("Points report");
            const id = request.auth.credentials.id;
            const pois = await Poi.find();
            return h.view('report', { title: 'Points so far',pois: pois,PID:id});
        }
   },
// adding a point of interest
    addPoint: {
       // auth:true,
        handler: async function(request, h) {
            const id = request.auth.credentials.id;
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
            return h.redirect('/report',{title:"Point of interest successfully added",PID:id});
        }
    },

    point: {
      //  auth:true,
        handler: async function(request, h) {
            const id = request.auth.credentials.id;
            return h.view('point', { title: 'Lets add a point of interest',PID:id});
        }
    },
// view all points by category
// creating an array, each object is a collection of points of interest that have the same category

    showPoints: {
       // auth:true,
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

// both Adin and User can update a point of interest
    updatePoint: {
       // auth:false,
        handler: async function(request, h) {
            const pid = request.auth.credentials.id;

            try {
                const payload = request.payload;
                //const pois = await Poi.find();

                const payl = request.payload;
                const id = payl.idd;
                var o_id = new ObjectId(id);
                var ptEditAr = await Poi.find({_id : o_id});
                var ptEdit = ptEditAr[0];

                console.log(ptEdit);
                console.log(payl.name);
                // ptEdit is the POI that is being updated bt data from the form
                if(ptEdit) {
                    ptEdit.name = payl.name;
                    ptEdit.category = payl.category;
                    ptEdit.description = payl.description;
                    ptEdit.image = payl.image;
                    ptEdit.location = payl.location;
                    await ptEdit.save();
                }
                return h.redirect('/report',{title:"Point of Interest updated successfully ",PID:pid});
            } catch (err) {
                return h.view('report', { errors: [{ message: err.message }],PID:pid });
            }
        }
    },

    // removing by an Admin person, a point of Interest
    pointDelete: {
     // auth:false,
      handler: async function(request, h) {
              const pid = request.auth.credentials.id;
              // const pois = await Poi.find();
              let id = request.params.id;
              let poitodel =  await Poi.findById(id);

              //let pdid = new ObjectId(id);
              //let poitodel = await Poi.find({_id : pdid});
              //console.log(poitodel +"is the pt from the Delete Point");
              // delete does not work on this object
          try{
                await poitodel.delete({_id: id});
                return h.response(result);
              } catch (err) {
                   return h.view('home',{title:"poi removal - error"});
              }
              return h.view('home',{title:"poi successfully removed",PID:pid});
      }
     },



    showPoint: {
       // auth:false,
        handler: async function(request, h) {
            const pid = request.auth.credentials.id;
            let id = request.params.id;

            let o_id = new ObjectId(id);
            let pointt = await Poi.find({_id : o_id});
            // returns an array

            let p2 ={};
            p2 = pointt[0];
            return h.view('pointView', { title: 'View point in detail',pointt: p2,PID:pid});
        }
    },

    viewEditPoint: {
        //auth:false,
        handler: async function (request, h) {
            const pid = request.auth.credentials.id;
            var id = request.query.id;
            console.log(id +" is the id from View Edit Point ag");
            var o_id = new ObjectId(id);
            const pointt = await Poi.find({_id : o_id});
           // console.log(pointt);
            var p2 ={};
            p2 = pointt[0];
           // console.log(p2);
            return h.view('pointEdit', { title: 'Time to view a point from View Edit POint',poi: p2,PID:pid});
        }
    },

    testHelp: {
        auth:false,
        handler: async function (request, h) {
            const pid = request.auth.credentials.id;
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
            return h.view('TestingHelp', {title: 'view testing help', states: CatList,PID:pid});
        },
    },
    testHelp2: {
        auth:false,
        handler: async function (request, h) {
            const pid = request.auth.credentials.id;
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
            return h.view('TestingHelp', {title: 'view Points', groupCat: holderAr,PID:id});
        },
    }




};

module.exports = Points;