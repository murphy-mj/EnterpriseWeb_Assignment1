module.exports = (location,refg)=> {
    console.log(location + "  " + refg);
    if(location) {
        const t = location.split(",");
        if (refg === 1) {
            return "<td>" +t[0]+ "</td>";

        } else {
            return "<td>" +t[1]+ "</td>";

        }
    }
};