const axios = require("axios");

class Api {
  async getCurrentViewers(channel) {
    const url = `https://tmi.twitch.tv/group/user/${channel}/chatters`;

    try {
      const { data } = await axios.get(url);

      const { broadcaster, vips, moderators, staff, admins, global_mods, viewers } = data.chatters;

      const output = [...broadcaster, ...vips, ...moderators, ...staff, ...admins, ...global_mods, ...viewers];

      return output;
    } catch (error) {
      console.log("Error getting viewers: ", error);
    }
  }
}
module.exports = { Api };
