
module.exports = (location,options)=> {
    console.log(location);
    if(location) {
        //const t = str.split(",");
        if (location === "latitude") {
           // return new Handlebars.SafeString("<label>Location "+ t[0]+"</label> <input placeholder = latitude type = text name=latitude>");
            return "<label>Location latitude</label> <input placeholder = 00.00 type = text name=latitude>";
        } else {
           return "<label>Location longitude</label> <input placeholder = 00.00 type = text name=longitude>";
          //  return new Handlebars.SafeString("<label>Location longitude</label> <input placeholder = longitude type = text name=longitude>");
        }
    } else {
        return "<label>Location non specified </label> <input placeholder = '00.00,00.00' type = text name=location>";
       // return new Handlebars.SafeString("<label>Location non specified </label> <input placeholder = latitude type = text name=latitude-longitude>");
    }
};