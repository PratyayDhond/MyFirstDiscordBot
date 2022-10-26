const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
        console.log(interaction)
		return interaction.reply({ content: `Pong @${interaction.user.username}!`, ephemeral: true })
	},
};