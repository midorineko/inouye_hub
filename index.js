exports.handler = function( event, context ) {

    var http = require( 'http' );
    var https = require( 'https' );
    var current = 'no selection';
    var alexa_output = 'Sorry we were not able to access the hub site.'

    var url = 'https://inouyehub.localtunnel.me/';

    if ( event.request.intent ) {
        current = event.request.intent.slots.Reddit.value.toLowerCase();
        var current_arr = current.split(" ");
    }

    if (current_arr[0].toLowerCase() == 'scene'){
        current_arr.shift();
        alexa_output = 'Turned on scene ' + current_arr.join(" ");
        current = current_arr.join("_");
        url = url + '/lights/' + current;
    }

    if (current_arr[0].toLowerCase() == 'off'){
        url = url + 'lights/off';
        alexa_output = 'Turning off lights'
    }

    https.get( url, function( ) {

            var text = alexa_output + url;
        
            output( text, context );

    } );
    
};
    
function output( text, context ) {

    var response = {
        outputSpeech: {
            type: "PlainText",
            text: text
        },
        card: {
            type: "Simple",
            title: "Reddit",
            content: text
        },
        shouldEndSession: true
    };
    
    context.succeed( { response: response } );
    
}