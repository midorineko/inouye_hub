exports.handler = function( event, context ) {

    var http = require( 'http' );
    var https = require( 'https' );
    var current = 'memememememe';

    // if ( event.request.intent ) {
    //     current = event.request.intent.slots.Reddit.value.toLowerCase();
    // }

    var url = 'https://www.google.com/';

    https.get( url, function( response ) {

        response.on( 'end', function() {

            var text = 'we made it boyz';
        
            output( text, context );
        
        } );
        
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