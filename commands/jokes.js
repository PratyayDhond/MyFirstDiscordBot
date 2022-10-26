const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Replies with a random joke!'),
	async execute(interaction) {
        var joke = await getJokes();
        console.log(joke)
		return interaction.reply({ content: `${joke}`, ephemeral: false })
	},
};

async function getJokes() {
    let fetch = require('node-fetch')
    const response = await fetch('https://v2.jokeapi.dev/joke/Dark?type=single');
    const data = await response.json();
    console.log(data['joke']);
    return data['joke'];
}