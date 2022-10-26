/*
 The fs module is Node's native file system module. fs is used to read the commands directory and identify our command files.
The path module is Node's native path utility module. path helps construct paths to access files and directories. One of the advantages of the path module is that it automatically detects the operating system and uses the appropriate joiners.
The Collection class extends JavaScript's native Map class, and includes more extensive, useful functionality. Collection is used to store and efficiently retrieve commands for execution.
*/ 

const fs = require('node:fs');
const path = require('node:path');

// Used to add the variables in the `.env` file to the environment variables
const dotenv = require('dotenv');
dotenv.config();

// console.log(process.env.TOKEN)

const {Client, Events, Collection, GatewayIntentBits} = require('discord.js')

//Guilds is what discord calls its servers in discord library
const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require (filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
		console.log("NIGGA")
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate,async interaction => {
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction);

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});



client.login(process.env.TOKEN)