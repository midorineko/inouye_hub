# First update (working)

Alright everyone let me explain how this works.

This is a repository for an Amazon Alexa skill. This skill interacts with a server, the server conntects to a raspberry pi and the pi controls my home.

As for the programming it is quite simple. Intake a sentence from the user. Parse it into an array, and see how to direct a request to the server. While the server is making a request some output speech is generated. 

# Future Imrovements

Currently I don't do anythign special with the sentence structure and this skill heavily relies around sentence structure. I am doing if/else statements based on array position, which will be improved to an inspect of the sentence. Ideally an action can be worded in any way and the skill will accurately interact with the server. 

Have feedback based on successful actions. As in have alexa communicate based on responses from the server, rather than predictively. 

Increase the overall functionality of my hub/server which can be found here. https://github.com/midorineko/rpi_automation
