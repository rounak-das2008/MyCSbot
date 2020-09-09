const Discord = require('discord.js');
const { parse } = require('url');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('connected as ' + client.user.tag);

    client.user.setActivity("with AISHIK's maa", {type:"PLAYING"});

    client.guilds.cache.forEach((guild) => {
        console.log(guild.name);
        guild.channels.cache.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id} `);
        });

    });

    let generalChannel = client.channels.cache.get("752790746607648812");
    // const attachment = new Discord.Attachment("https://www.devdungeon.com/sites/all/themes/devdungeon2/logo.png", 'killerimage.png');
    generalChannel.send(
        {files: ['https://www.devdungeon.com/sites/all/themes/devdungeon2/logo.png']
        })
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
    let primaryCommand = splitCommand[0];
    let arguments = splitCommand.slice(1);

    if (primaryCommand == 'help')   {
        helpCommand(arguments, receivedMessage);
    }
    else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage);
    }
    else if (primaryCommand =='add') {
        addCommand(arguments, receivedMessage);
    }
    else if (primaryCommand == 'subtract') {
        subtractCommand(arguments, receivedMessage);
    }
    else if (primaryCommand =='divide') {
        divideCommand(arguments, receivedMessage);
    }
    else {
        receivedMessage.channel.send('Unknown command. Try !help [topic] or !multiply, !add, !subtract, !divide')
    }
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
    receivedMessage.channel.send("The product of arguments " + arguments +" is " + product.toString());
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
    receivedMessage.channel.send("The addition of arguments "+ arguments + " is " + add.toString());
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
    receivedMessage.channel.send("The subtraction of arguments "+arguments+ " is "+ subtract.toString());

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

function helpCommand(arguments, receivedMessage) {
    if (arguments.length == 0) {
        receivedMessage.channel.send('I am not sure what you need help with (•_•). Try agian ..!help [topic]');
    }
    else {
        receivedMessage.channel.send('It looks you need help with ' + arguments);

    }
}




client.login(process.env.TOKEN);


