const tmi = require("tmi.js");
const { ClientResponse } = require("./ClientResponse");
require("dotenv").config();

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
  },
  channels: ["Nako", "Lanprd"],
});

let clientResponse;

try {
  client.connect();
} catch (error) {
  console.log("Problem connecting:", error);
}

client.on("join", async (channel, username, self) => {
  channel = channel.replace("#", "");
  clientResponse = new ClientResponse(channel.toLowerCase());

  if (self) {
    // add in points and any other flow to user
  } else {
    // add user in database
  }
});

let lastMessage = "";

client.on("message", (channel, tags, message, self) => {
  // Ignore echoed messages.
  if (self) return;

  const text = clientResponse.texts(message.toLowerCase());
  const emote = clientResponse.emotes(message.toLowerCase());
  const command = clientResponse.commands(message.toLowerCase(), tags["display-name"]);

  if (message.toLowerCase() === "!roxo") {
    clientResponse.initialize();
  }

  if (text || emote || command) {
    const newMessage = text || emote || command;
    lastMessage = lastMessage === newMessage ? `${lastMessage}.` : newMessage;
    client.say(channel, lastMessage);
  }
});

client.on("subscription", (channel, username, methods, message, userState) => {
  console.log("--------------------");
  console.log("SUBSCRIPTION");
  console.log(channel);
  console.log(username);
  console.log(methods);
  console.log(message);
  console.log(userState);
  console.log("--------------------");
});

// [21:01] info: [#nako] Your message was not sent because it is identical to the previous one you sent, less than 30 seconds ago.
// [21:04] info: [#nako] Your message was not sent because you are sending messages too quickly.
