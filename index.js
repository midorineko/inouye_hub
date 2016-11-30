sessionRequests = []

exports.handler = function( event, context ) {

    var http = require( 'http' );
    var https = require( 'https' );
    var current = 'no selection';
    var alexa_output = 'Sorry we were not able to access the hub site.'
    var output_continue = false

    var url = 'https://inouyehub.localtunnel.me/';

    if ( event.request.intent ) {
        current = event.request.intent.slots.Reddit.value.toLowerCase();
        var current_arr = current.split(" ");
    }

    if (current_arr[0].toLowerCase() == 'yes' || current_arr[0].toLowerCase() == 'set'){
        alexa_output = 'Created new scene ' + sessionRequests;
        var scene_name = sessionRequests[0].replace(/\s+/g, '_').toLowerCase();
        url = url + 'scenes/new/' + scene_name;
    }

    if (current_arr[0].toLowerCase() == 'no'){
        current_arr.shift();
        alexa_output = 'Name scene ' + current_arr.join(" ");
        sessionRequests.shift()
        sessionRequests.push(current_arr.join("_"))
        output_continue = true;
    }

    if (current_arr[0].toLowerCase() == 'scene'){
        current_arr.shift();
        if (current_arr[0].toLowerCase() == 'new'){
            current_arr.shift();
            alexa_output = 'Name scene ' + current_arr.join(" ");
            sessionRequests.push(current_arr.join("_"))
            output_continue = true;
        }else{
            alexa_output = 'Turned on scene ' + current_arr.join(" ");
            current = current_arr.join("_");
            url = url + 'lights/' + current;
        }
    }

    if (current_arr[0].toLowerCase() == 'off'){
        url = url + 'lights/off';
        alexa_output = 'Turning off lights'
    }

    if (current_arr[0].toLowerCase() == 'brightness'){
        current_arr.shift();
        if (current_arr[0].toLowerCase() == 'low'){
            url = url + 'brightness/50';
            alexa_output = 'Light brightness is 50'
        }else if(current_arr[0].toLowerCase() == 'medium' || current_arr[0].toLowerCase() == 'middle'){
            url = url + 'brightness/150';
            alexa_output = 'Light brightness is 150'
        }else if(current_arr[0].toLowerCase() == 'high'){
            url = url + 'brightness/255';
            alexa_output = 'Light brightness is 255'
        }
    }

    if (output_continue){
        var text = alexa_output;
        output2( text, context );
    }else{
        https.get( url, function( ) {
                var text = alexa_output + url;
                output( text, context );
        } );
    }
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

function output2( text, context ) {

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
        shouldEndSession: false
    };
    
    context.succeed( { response: response } );
    
}