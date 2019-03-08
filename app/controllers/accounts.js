'use strict';
const User = require('../models/user');
const AdminA = require('../models/admin');
const Poi = require('../models/poi');
const db = require('../models/db');
const Boom = require('boom');
const ObjectId = require('mongodb').ObjectId;

const Accounts = {


    index: {
        auth:false,
        handler: function(request, h) {
            return h.view('main', { title: 'Welcome to Points of Interest' });
        }
    },

    showSignup: {
        auth:false,
        handler: function(request, h) {
            return h.view('signup', { title: 'Sign up for Points of Interest' });
        }
    },

    signupAdmin: {
        auth:false,
        handler: async function(request, h) {
            try {
                const payload = request.payload;
                const newUser = new Admin({
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    password: payload.password
                });
                const admin = await newUser.save();
                console.log(admin._id +" admin Id");
                request.cookieAuth.set({id: admin._id});
                return h.redirect('/home');
            } catch(err){
                return h.view('login', { errors: [{ message: err.message }] });
            }
        }
    },

    signup: {
        auth:false,
        handler: async function(request, h) {
            try {
                const payload = request.payload;
                const newUser = new User({
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    password: payload.password
                });
                const user = await newUser.save();
                console.log(user._id +" user Id");
                request.cookieAuth.set({id: user._id});
                return h.redirect('/home');
            } catch(err){
                return h.view('login', { errors: [{ message: err.message }] });
            }
        }
    },



    showLogin: {
        auth: false,
        handler: function (request, h) {
            return h.view('login', {title: 'Login to Points of Interest'});
        }
    },

    showLoginAdmin: {
        auth:false,
        handler: function(request, h) {
        return h.view('loginAdmin', { title: 'Welcome Admin' });
        }
    },

    loginUser: {
        auth:false,
        handler: async function(request, h) {
            const payload = request.payload;
            console.log("reached Login handler");
            const email = payload.email;
            const password = payload.password;
            console.log(email);
            console.log(password);

            let user = await User.findByEmail(email);
            console.log(user +" user");
            try{
                if(user){
                    user.comparePassword(password);
                    request.cookieAuth.set({id: user._id});
                    console.log(user._id + " user pass word ok");
                }

                //let user = await User.findByEmail(email);
                //if(user){
                //    user.comparePassword(password);
                //    request.cookieAuth.set({id: user._id});
                //    console.log(user._id + " user pass word ok");
               // }

            //    if(!user) {
             //       let admin =  Admin.findByEmail(email);
              //      admin.comparePassword(password);
               //     request.cookieAuth.set({id: admin._id});
                //    console.log(admin._id + "Admin pass word ok");
               // }
              //  console.log(user);
             //   if (!user) {
             //       const message = 'Email address not registered';
             //       throw new Boom(message);
             //   }
              //  user.comparePassword(password);
               // request.cookieAuth.set({id: user._id});
              //  console.log(user._id + " pass work ok");
                //console.log(request.auth.credentials.id + " credential id");
                return h.redirect('/settings');

              } catch (err) {
                return h.view('signup', {errors: [{message: err.message}]});
              }
        }
    },

    loginAdmin: {
        auth:false,
        handler: async function(request, h) {
            const payload = request.payload;
            console.log("reached Admin Login handler");
            const email = payload.email;
            const password = payload.password;
            console.log(email);
            console.log(password);
            // console.log(adminA.find() + "find All")
            try{
              let admin = await AdminA.findByEmail(email);
              console.log(admin +" admin");
              if(!admin) {
                const message = 'Not a know Administrator';
                throw new Boom(message);
              }
              admin.comparePassword(password);
              request.cookieAuth.set({id: admin._id});
              console.log(admin._id + " Admin pass word ok");
              return h.redirect('/home');

                //let user = await User.findByEmail(email);
                //if(user){
                //    user.comparePassword(password);
                //    request.cookieAuth.set({id: user._id});
                //    console.log(user._id + " user pass word ok");
                // }

                //    if(!user) {
                //       let admin =  Admin.findByEmail(email);
                //      admin.comparePassword(password);
                //     request.cookieAuth.set({id: admin._id});
                //    console.log(admin._id + "Admin pass word ok");
                // }
                //  console.log(user);
                //   if (!user) {
                //       const message = 'Email address not registered';
                //       throw new Boom(message);
                //   }
                //  user.comparePassword(password);
                // request.cookieAuth.set({id: user._id});
                //  console.log(user._id + " pass work ok");
                //console.log(request.auth.credentials.id + " credential id");

            } catch(er) {
                console.log("login Admin error");
               return h.view('login', {title:"here!"});
            }
            }
    },



    logout: {
        auth:false,
        handler: function(request, h) {
            request.cookieAuth.clear();
            return h.redirect('/');
        }
    },

    showSettings: {
        //auth:false,
        handler: async function(request, h) {
            //console.log( request.auth.credentials.id);
            const id = request.auth.credentials.id;
           // let donorEmail = request.auth.credentials.id;
            const user = await User.findById(id);
            const admin = await AdminA.findById(id);
            if(user) {
                return h.view('settings', {title: 'User Settings', user: user});
            }
            if(admin){
                return h.view('settings', {title: 'Admin Settings', user: admin});
            }
            console.log(user +" user");
            console.log(admin +" admin");
           // console.log(donorEmail);
            //const userDetails ={};
            //const userDetails = User[donorEmail];
            //console.log(userDetails);
           // return h.view('settings', { title: 'User Settings', user: user });
        }
    },

    updateSettings: {
        handler: async function(request, h) {
            try {
                const userEdit = request.payload;
                const id = request.auth.credentials.id;

                const admin = await AdminA.findById(id);
                const user = await User.findById(id);

                console.log(user +" user update settings");
                console.log(admin +" admin update settings");

                if (user) {
                user.firstName = userEdit.firstName;
                user.lastName = userEdit.lastName;
                user.email = userEdit.email;
                user.password = userEdit.password;
                await user.save();
                }
                if(admin){
                    admin.firstName = userEdit.firstName;
                    admin.lastName = userEdit.lastName;
                    admin.email = userEdit.email;
                    admin.password = userEdit.password;
                    await admin.save();
                }

                return h.redirect('/home');
            } catch (err) {
                console.log(err);
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    }

};

module.exports = Accounts;