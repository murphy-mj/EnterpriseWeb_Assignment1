module.exports = (PID,options)=> {

    console.log(PID +"pid");
    if (PID === 0) {
        console.log(options.inverse(this));
        return options.fn(this);
    } else {
        return options.inverse(this)
        // return options.fn(this)
    }
};