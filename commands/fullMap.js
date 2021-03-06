const {
  SlashCommandBuilder,
  bold,
} = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fullmap")
    .setDescription("Use this command to get an image of the dynmap!"),

  async execute(interaction) {
    const puppeteer = require("puppeteer");
    puppeteer
      .launch({
        defaultViewport: {
          // Define the size of the screenshot/headless browser
          width: 1920,
          height: 1080,
        },
      })
      .then(async (browser) => {
        const page = await browser.newPage();
        await page.goto(
          "https://map.ccnetmc.com/nationsmap/#world;flat;0,64,0;0"
        ); // Define the url
        await page.waitFor(15000);
        await page.screenshot({
          path: "images/map.png",
          fullPage: true,
        }); // Screenshot and save the file as map.png. The path can be configured
        await browser.close(); // Close the headless browser
      });

    const map = new MessageEmbed()
      .setColor("#EE6123")
      .setTitle(bold(`Nations Map`))
      .setTimestamp()
      .setImage("attachment://map.png")
      .setFooter({
        text: "Bot written by Shadowevil015",
        iconURL:
          "https://minecraft-mp.com/images/favicon/204623.png?ts=1615034437",
      });

    await interaction.reply({
      embeds: [map],
      files: ["images/map.png"],
    });
  },
};
