module.exports = (PID,poi_id,location)=> {
    console.log(PID + "  " + poi_id);
    if(location) {
        const t = location.split(",");
        if (location === "latitude") {
            return new Handlebars.SafeString("<label>Location "+ t[0]+"</label> <input placeholder = longitude type = text name=longitude>");

        } else {
            return new Handlebars.SafeString("<label>Location "+ t[1]+"</label> <input placeholder = longitude type = text name=longitude>");
           return new Handlebars.SafeString("<td><a href=/pointView/"+poi_id +"><i><b>View</b></i></a> </td><td><a href=/pointEdit?id="+poi_id + "><i> Edit</i></a> </td> <td><a href=/pointDelete/"+poi_id + "><i> Delete</i></a> </td>'");

        }
    }
};