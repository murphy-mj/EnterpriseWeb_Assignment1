module.exports = ('options_selected',function(context, test) {
    var ret = '';
    for (var i = 0, len = context.length; i < len; i++) {
        var option = '<option value="' + context[i]+'"';
        if (test.toLowerCase() == contextt[i].toLowerCase()) {
            option += ' selected="selected"';
        }
        option += '>'+ Handlebars.Utils.escapeExpression(context[i]) + '</option>';
        ret += option;
    }
    console.log(ret);
    return new Handlebars.SafeString(ret);
});