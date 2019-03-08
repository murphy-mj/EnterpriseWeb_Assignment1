module.exports = ('selected', function(context,test){
    var ret = '';
    if(context === undefined || test === undefined ) {
        return 'nothing selected'
    } else {
        for (let i = 0; i < context.length; i++) {

            var option = '<option value="' + context[i] + '"';

            if (test.toLowerCase() == context[i].toLowerCase()) {
                option += ' selected="selected"';
            }
            option += '>' + Handlebars.Utils.escapeExpression(context[i]) + '</option>';
            ret += option;
        }
        return new Handlebars.SafeString(ret);
    }
});
