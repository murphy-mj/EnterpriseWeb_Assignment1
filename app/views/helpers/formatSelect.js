module.exports = (PID,options)=> {
console.log(PID +" pid");
    if (PID === 0 | PID === undefined) {
        // the logged in peron is not admin and so should not have access to edit or delete options
        return options.fn(this);
    } else {
        // the logged in peron is an Admin and so page should show options  to edit or delete a poi
        return options.inverse(this);
    }
};