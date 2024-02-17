const discord = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const MODEL = "gemini-pro";
const API_KEY = process.env.API_KEY || "AIzaSyDPgEcHAHjZMrFBs_iMBZYPaKCNiRgmu0U";
const BOT_TOKEN = process.env.BOT_TOKEN || "";
// const CHANNEL_ID = process.env.CHANNEL_ID || "1208404049393614858";

const ai = new GoogleGenerativeAI(API_KEY);
const model = ai.getGenerativeModel({ model: MODEL });

const client = new discord.Client({
  intents: Object.keys(discord.GatewayIntentBits),
});

client.on("ready", () => {
  console.log("Bot is ready!");
});

client.login(BOT_TOKEN);

client.on("messageCreate", async (message) => {
    try {
        if (message.author.bot) return;

        if (message.content === '/Toggle-on') {
            const guild = message.guild;
            const channel = message.channel;
        }

        // چالاک کردنی مۆدێل بۆ وەرگرتنی وەڵامی چاودێری بۆ پیشاندانی بۆشایی
        const { response } = await model.generateContent(message.cleanContent);

        // وەرگرتنی وەڵامی چاودێری بۆ ئەو پەیامەی کە بۆشایی دیاری کراوە
        await message.reply({
            content: response.text(),
        });
    } catch (e) {
        console.log(e); // بۆ دێباگ کردن
    }
});
