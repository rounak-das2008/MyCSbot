const Discord = require('discord.js');
const { parse } = require('url');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('connected as ' + client.user.tag);

    client.user.setActivity("PUBG", {type:"PLAYING"});

    client.guilds.cache.forEach((guild) => {
        console.log(guild.name);
        guild.channels.cache.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id} `);
        });

    });

    let generalChannel = client.channels.cache.get("752790746607648812");
    // const attachment = new Discord.Attachment("https://www.devdungeon.com/sites/all/themes/devdungeon2/logo.png", 'killerimage.png');
    // generalChannel.send(
    //     {files: ['https://www.devdungeon.com/sites/all/themes/devdungeon2/logo.png']
    //     })
});

client.on('message',(receivedMessage) => {
    if (receivedMessage.author == client.user) {
        return 
    }
    receivedMessage.channel.send('Message received: ' + receivedMessage.author.toString() +':' + receivedMessage.content);
    receivedMessage.react("🤖")

    // console.log(receivedMessage);

    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage);
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1);
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0].toLowerCase();
    let arguments = splitCommand.slice(1);

    if (primaryCommand == 'help')   {
        helpCommand(arguments, receivedMessage);
    }
    else if (primaryCommand == "multiply") {
        result = multiplyCommand(arguments, receivedMessage)
        if (isNaN(result)) {
            invalidEntries(receivedMessage);
        }
        else {
            receivedMessage.channel.send("The product of arguments " + arguments +" is " + result.toString());
        }
    }
    else if (primaryCommand =='add') {
        result = addCommand(arguments, receivedMessage);
        if (isNaN(result)) {
            invalidEntries(receivedMessage);
        }
        else {
            receivedMessage.channel.send("The addition of arguments "+ arguments + " is " + result.toString());
        }
    }
    else if (primaryCommand == 'subtract') {
        result = subtractCommand(arguments, receivedMessage);
        if (isNaN(result)) {
            invalidEntries(receivedMessage);
        }
        else {
            receivedMessage.channel.send("The subtraction of arguments " + arguments +" is " + result.toString());
        }
    }
    else if (primaryCommand =='divide') {
        divideCommand(arguments, receivedMessage);
    }
    else if (primaryCommand =='factorial') {
        factorialCommand(arguments, receivedMessage);
    }
    else if (primaryCommand =='info') {
        infoCommand(arguments, receivedMessage);
    }
    else if (primaryCommand =='commands') {
        commandsCommand(receivedMessage);
    }
    else if (primaryCommand =='ping') {
        pingCommand(receivedMessage);
    }
    else if (primaryCommand == 'dhankur') {
        receivedMessage.channel.send('Oh that bokachoda  ...  . Come on ')
    }
    else {
        receivedMessage.channel.send('Unknown command. Try !help, !ping, !info or !commands to see a list of commands available');
    }
}

function invalidEntries(receivedMessage) {
    receivedMessage.channel.send('Invalid entries. Result not defined ...');
}

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length <2) {
        receivedMessage.channel.send('Not enough arguments. Try !multiply 2 10')
        return
    }
    let product = 1;
    arguments.forEach((value) => {
        product = product* parseFloat(value); 
    })
    return product;
}

function addCommand(arguments, receivedMessage) {
    if (arguments.length <2) {
        receivedMessage.channel.send('Not enough arguments. Try !add 5 20');
        return;
    }
    let add = 0;
    arguments.forEach((value) => {
        add = add + parseFloat(value);
    })
    return add;
}


function subtractCommand(arguments, receivedMessage) {
    if (arguments.length <2) {
        receivedMessage.channel.send("Not enough arguments. Try !subtract 8 3");
        return;
    }
    // console.log(arguments)
    let subtract1 = parseFloat(arguments[0]);
    let subtract2 = parseFloat(arguments[1]);
    subtract = subtract1 - subtract2;
    return subtract;
}

function divideCommand(arguments, receivedMessage) {
    if (arguments.length <2) {
        receivedMessage.channel.send("Not enough of arguments. Try !divide 10 5");
        return;
    }

    let divide1 = parseFloat(arguments[0]);
    let divide2 = parseFloat(arguments[1]);
    if (divide2 != 0) {
        divide = divide1/ divide2;
        receivedMessage.channel.send("The division of arguments "+ arguments + " is " + divide.toString());
    } 
    else {
        receivedMessage.channel.send('This is not valid man... Zero division Error !!')
    }
}

function factorialCommand(arguments, receivedMessage) {
    if (arguments.length <1) {
        receivedMessage.channel.send("Not enough of arguments. Try !factorial 5..");
        return;
    } 
    let flag =0;
    let fact = 1
    arguments.forEach((value) => {
        cons = parseFloat(value);

        if (Math.sign(cons) == -1) {
            receivedMessage.channel.send('Negative Numbers are not valid ...');
            flag = 0;
            return;
        }

        else {

        var result = (cons - Math.floor(cons)) !== 0; 
   
        if (result) {
            receivedMessage.channel.send("It must be a whole number...");
            flag = 0;
            return;
            }
                
        else {
            while (cons>0) {
                fact = fact*cons
                cons = cons-1
                } 
            flag =1;
            }
      }      
    })
    if (flag==1) {
    receivedMessage.channel.send("The facorial of arguments "+arguments+ " is " + fact.toString());
    }
}
        
function infoCommand(arguments, receivedMessage) {
    if (arguments.length ==0) {
        receivedMessage.channel.send('This is CSBot_bot , from CS Contents Group. We are XII C.');
        return;
    }
    value = arguments[0];
    name = value.toLowerCase();
    if (name.search('rounak') !=-1) {
        receivedMessage.channel.send("Oh ho ho ... Rounak .... He is my boss ....!!!. ");
        return;
    }
    else {
        receivedMessage.channel.send("Sorry I don't know this guy ...");
    }
}    

function commandsCommand(receivedMessage) {
    receivedMessage.channel.send('Commands which I know ...');
    receivedMessage.channel.send('!help, !add, !subtract, !divide, !multiply, !facorial, !info, !ping, !commands');
}

function pingCommand(receivedMessage) {
    receivedMessage.channel.send('Pong!');
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length == 0) {
        receivedMessage.channel.send('I am not sure what you need help with (•_•). Try agian ..!help [topic]');
    }
    else {
        receivedMessage.channel.send('It looks you need help with ' + arguments);

    }
}




client.login(process.env.TOKEN);


