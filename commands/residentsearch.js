const { SlashCommandBuilder, bold, inlineCode } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resident')
		.setDescription("Use this command, with a username, to find information about the player.")
        .addStringOption(option =>
            option.setName("name")
                .setDescription("The username of the player.")
                .setRequired(true)),

	async execute(interaction) {

		const username = interaction.options.getString("name");

        var capusername = username.replace(/(^\w|\s\w|\s\_)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())

        var compltusername = await fetch("https://shadowevil015.tech/api/v1/allPlayers/"+username).then(res => res.json()).catch(err => { return err })

        var town = JSON.stringify(compltusername.town)
        var nation = JSON.stringify(compltusername.nation)

		let codedName;
		if (capusername.includes("_")){
			codedName = inlineCode(capusername)
		}
		else {
			codedName = capusername
		}

		const resident = new MessageEmbed()
			.setColor('#EE6123')
			.setTitlebold((`${codedName}`))
			.addFields(
				{ name: 'Town:', value: town.replaceAll(/"/g, "").replaceAll(/_/g, " "), inline: true },
				{ name: 'Nation:', value: nation.replaceAll(/"/g, "").replaceAll(/_/g, " "), inline: true },
		)
			.setTimestamp()
			.setFooter({ text: 'Bot written by Shadowevil015', iconURL: 'https://minecraft-mp.com/images/favicon/204623.png?ts=1615034437' });
        
			await interaction.reply({ embeds: [resident] });

	},
};