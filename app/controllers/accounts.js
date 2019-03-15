'use strict';
const User = require('../models/user');
const AdminA = require('../models/admin');
const Poi = require('../models/poi');
const db = require('../models/db');
const Boom = require('boom');

// 13.03.2019 error const ObjectId = require('mongodb').ObjectId;
const ObjectId = require('mongoose').Types.ObjectId;
const Joi = require('joi')

const Accounts = {


    index: {
        auth:false,
        handler: function(request, h){
            console.log("Accounts index");
            return h.view('main', { title: 'Welcome to Points of Interest'});
        }
    },


    showSignup: {
        auth:false,
        handler: function(request, h) {
            console.log("Accounts show sign up");
            return h.view('signup', { title: 'Sign up for Points of Interest App' });
        }
    },

    showAdminSignup: {
        auth:false,
        handler: function(request, h) {
            console.log("Accounts showAdminSgn up");
            // 13.03       return h.view('signupAdmin', { title: 'Sign up for new Admin person',PID:1})
            return h.view('signupAdmin', { title: 'Sign up for new Admin person'})
        }
    },



    signupAdmin: {
        auth:false,
        handler: async function(request, h) {
            console.log("Accounts signupAdmin");
            try {
                const payload = request.payload;
                const newUser = new AdminA({
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    password: payload.password
                });
                const admin = await newUser.save();
                request.cookieAuth.set({id: admin._id});
                return h.redirect('/home',{title:"Welcome new admin staff",PID:admin._id});
            } catch(err){
                return h.view('loginAdmin', { errors: [{ message: err.message }] });
            }
        }
    },

    // sign up for users
    signup: {
        auth:false,
        validate: {
            payload: {
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required().min(4)
            },
            options: {
                abortEarly: false
            },
            failAction: function(request, h, error) {
                return h.view('signup', {
                    title: 'Update settings error, all fields are required.',
                    errors: error.details
                })
                    .takeover()
                    .code(400);
            }
        },
        handler: async function(request, h) {
            console.log("Accounts sign up");
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
                return h.redirect('/home',{title:"Welcome new User",PID:user._id});
            } catch(err){
                return h.view('signup', { errors: [{ message: err.message }] });
            }
        }
    },



    showLogin: {
        auth: false,
        handler: function (request, h) {
            console.log("Accounts show login");
            return h.view('login', {title: 'Login to Points of Interest'});
        }
    },

    showLoginAdmin: {
        auth:false,
        handler: function(request, h) {
            console.log("Accounts show loginAdmin");
            return h.view('loginAdmin', { title: 'Welcome Admin' });
        }
    },

    // user login, originally both user and admin ran through login, but had issues!
    loginUser: {
        auth:false,
        handler: async function(request, h) {
            console.log("Accounts login User");
            const payload = request.payload;
            const email = payload.email;
            const password = payload.password;
            console.log(email);
            console.log(password);

            let user = await User.findByEmail(email);
            console.log(user +" user");
            try{
                if(user) {
                    user.comparePassword(password);
                    request.cookieAuth.set({id: user._id});
                    console.log(user._id + " user pass word ok");
                    return h.redirect('/home', {title: "User's Successful login", PID: user._id});
                }

            } catch (err) {
                return h.view('signup', {errors: [{message: err.message}]});
            }
        }
    },

// admin login
    loginAdmin: {
        auth:false,
        handler: async function(request, h) {
            console.log("Accounts loginAdmin");
            const payload = request.payload;
            const email = payload.email;
            const password = payload.password;

            try {
                let admin = await AdminA.findByEmail(email);
                if (!admin) {
                    const message = 'Not a know Administrator';
                    throw new Boom(message);
                }
                if (admin) {
                    admin.comparePassword(password);
                    request.cookieAuth.set({id: admin._id});
                    console.log(admin._id + " Admin pass word ok");
                    return h.redirect('/home', {title: "Successful login", PID: admin._id});
                }


                // originally login was independent of type, but had issues, so split it out
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

            } catch (er) {
                console.log("login Admin error");
                return h.view('login', {title: "Admin Login Issue", PID: 0});
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

    // show the existing settings of the logged in person, either Admin staff or User
    showSettings: {
       // auth:false,
        handler: async function(request, h) {
            const id = request.auth.credentials.id;
            const user = await User.findById(id);
            const admin = await AdminA.findById(id);

            console.log(user +" user");
            console.log(admin +" admin");
            console.log(id +" id")

            if(user) {
                return h.view('settings', {title: 'User Settings', user: user,PID: id});
            }
            if(admin){
                return h.view('settings', {title: 'Admin Settings', user: admin,PID: id});
            }
        }
    },

// User or Admin staff updating their own settings
    updateSettings: {
      //  auth:true,
        handler: async function(request, h) {
            try {
                // userEdit is the data from the form, on submit
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
                return h.redirect('/home',{title:" Your settings have been updated",PID:id});
            } catch (err) {
                console.log(err);
                return h.view('home', { errors: [{ message: err.message }],PID:id });
            }
        }
    },



// Admin rights - to update settings of users
    updateUser: {
       // auth:true,
        handler: async function(request, h) {
            try {
                const pid = request.auth.credentials.id;
                const userEdit = request.payload;
                let user = await  User.findByEmail(userEdit.email);

                console.log(user +" Admin updating User settings");

                user.firstName = userEdit.firstName;
                user.lastName = userEdit.lastName;
                user.email = userEdit.email;
                user.password = userEdit.password;
                await user.save();
                return h.redirect('/home',{title:"User Settings updated",PID:pid});
            } catch (err) {
                console.log(err);
                return h.view('home', { errors: [{ message: err.message }],PID:id });
            }
        }
    },

    // Admin Rights to view settings of others
    viewEditUser: {
      //  auth:false,
        handler: async function (request, h) {
            const pid = 1;
            //request.auth.credentials.id;
            var id = request.query.id;
            console.log(id +" is the id from View Edit User ag");
            var o_id = new ObjectId(id);
            const pointt = await User.find({_id : o_id});
            // console.log(pointt);
            var p2 ={};
            p2 = pointt[0];
            // console.log(p2);
            return h.view('userEdit', { title: 'Time to view a User Edit from View Edit User',userr: p2,PID:pid});
        }
    },

    showUsers: {
      //  auth:false,
        handler: async function(request, h){
            // this is an admin function so just setting pid to one, as oppose to get admin user id
            const pid = 1;
            const pointt = await User.find();
            return h.view('userView', { title: 'Admin - view all users for edit/delete',userr: pointt,PID:pid})
        }
    },
    // admin rights -  to delete
    userDelete: {
       // auth:true,
        handler: async function(request, h) {
            const pid = request.auth.credentials.id;
            let id = request.params.id;
            console.log(id +" is from the delete user");
            let usertodel = await User.findById(id);
            console.log(usertodel +"is the pt from the Delete User");
            try{
                await usertodel.delete();
            } catch (err){
                return h.view('home',{title:"User deletion - error"});
            }
            return h.view('home',{title:"User successfully removed",PID:pid});
        }
    }





};

module.exports = Accounts;