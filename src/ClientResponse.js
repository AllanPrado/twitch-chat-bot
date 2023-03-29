const { Api } = require("./api");

const api = new Api();

class ClientResponse {
  usersConnected = [];
  #channel = "";

  constructor(channel) {
    if (channel) {
      this.#channel = channel;
      this.initialize();
    }

    if (ClientResponse.instance) {
      return ClientResponse.instance;
    }

    ClientResponse.instance = this;
  }

  async initialize() {
    this.usersConnected = await api.getCurrentViewers(this.#channel.toLowerCase());
  }

  texts(command) {
    const commands = {
      // texts
      "-1": "-1",
      "><": "><",
      "jukera vai te": "jukera vai te",
      raio: "💳......👃😤👌",

      // numbers
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
    };

    return commands[command] || undefined;
  }

  emotes(command) {
    const commands = {
      // emotes
      "b)": " B)",
      // ":|": " :|",
      ":p": " :) :P :D",
      // ":d": " :D",
      // ":)": " :)",
      // ":(": " :(",
      ":o": " :O",
      o_o: " O_o",

      // emotes channel
      nakoban: "nakoBan",
      nakosanji: "nakoSanji",
      nakorage: "nakoRage",
      nakodance: "nakoDance",
      nakod2: "nakoD2",
      nakod: "nakoD",
      nakonojo: "nakoNojo",
      nakogalante: "nakoGalante",
      nakoxiu: "nakoXiu",
    };

    for (const key in commands) {
      if (command.includes(key)) {
        return commands[key];
      }
    }

    return undefined;
  }

  commands(command, user) {
    const commands = {
      "!comandos": `👉 ${user} 👉 🟢🟩🟩 !roxo !raio !gt 🟩🟩🟢`,
      "!commands": `👉 ${user} 👉 🟢🟩🟩 !roxo !raio !gt 🟩🟩🟢`,
      "!roxo": `O roxo do(a) @${this.randomUser()} é todinho seu @${user} ;)`,
      "!raio": "Bora dá um rainho rapidinho aqui 💳......👃😤👌",
      "!bosta": "💩👃😤🤢🤢🤮",
      "!wr": `👇 !wr 👇 🤣🤣🤣 @${user}`,
      "!elo": `👇 🤣🤣🤣 👇 @${user}`,
      "!rank": `👇 🤣🤣🤣 👇 @${user}`,
      "!gt": "!sr https://youtu.be/3n3itDDgmQQ",
    };

    return commands[command] || undefined;
  }

  randomUser() {
    const randomIndex = Math.floor(Math.random() * this.usersConnected.length);
    return this.usersConnected[randomIndex];
  }
}

module.exports = { ClientResponse };
