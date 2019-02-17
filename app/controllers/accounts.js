'use strict';
const User = require('../models/user');
const Poi = require('../models/poi');
const db = require('../models/db');
const Boom = require('boom');

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
    signup: {
        auth:false,
        handler: async function(request, h) {
            const payload = request.payload;
            const newUser = new User({
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                password: payload.password
            });
            const user = await newUser.save();
            request.cookieAuth.set({ id: user.id });
            return h.redirect('/home');
        }
    },
    showLogin: {
        auth:false,
        handler: function(request, h) {
            return h.view('login', { title: 'Login to Points of Interest' });
        }
    },
//    login: {
//        auth: false,
  //      handler: function(request, h) {
   //         const user = request.payload;
    //        if (user.email in this.users && user.password === this.users[user.email].password) {
   //             request.cookieAuth.set({ id: user.email });
   //            return h.redirect('/home');
   //         }
   //         return h.redirect('/');
   //     }
//    },
    login: {
        auth: false,
        handler: async function(request, h) {
            const {email, password} = request.payload
            try {
                let user = await User.findByEmail(email);
                if (!user) {
                    const message = 'Email address not registered';
                    throw new Boom(message);
                }
                user.comparePassword(password);
                request.cookieAuth.set({id: user.id});
                return h.redirect('/home');
            } catch (err) {
                return h.view('login', {errors: [{message: err.message}]});
            }
        }
    },

    logout: {
        auth:false,
        handler: function(request, h) {
            return h.redirect('/');
        }
    },

    showSettings: {
        handler: function(request, h) {
            let donorEmail = request.auth.credentials.id;
            const userDetails = this.users[donorEmail];
            return h.view('settings', { title: 'Donation Settings', user: userDetails });
        }
    },

    updateSettings: {
        handler: async function(request, h) {
            try {
                const userEdit = request.payload;
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                user.firstName = userEdit.firstName;
                user.lastName = userEdit.lastName;
                user.email = userEdit.email;
                user.password = userEdit.password;
                await user.save();
                return h.redirect('/settings');
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },

};

module.exports = Accounts;