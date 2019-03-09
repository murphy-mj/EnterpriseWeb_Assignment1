
const User = require('../../models/user');
const AdminA = require('../../models/admin');

module.exports = (PID,options)=> {

    console.log(PID + "IDentif");
    //console.log("Optios fn "+options.fn(this));
    console.log("menu select");
    // console.log("Optios fn "+options.inverse(this));
    var per = 0;
    const user = User.findById(PID);

    const admin = AdminA.findById(PID);
    if(admin !== 'undefined') {
        per = 1;
            }
    console.log(per +" per var");
    console.log(user +" user obj");

    if((user === 'undefined') | (per === 1)) {
        console.log(options.fn(this) +"Admin Person")
    } else {
        console.log(options.inverse(this) + "User person")
    }

    if((user === 'undefined') | (user === null) | (per === 1)){
        // the logged in peron is an Admin and so should not have access to edit or delete options
        return options.fn(this);
    } else {
        // the logged in peron is  NOt an Admin and so page should show options  to edit or delete a poi, add new Admin etc
        return options.inverse(this);
    }
};