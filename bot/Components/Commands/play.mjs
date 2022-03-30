import { SlashCommandBuilder, SlashCommandStringOption } from "@discordjs/builders";
import Command from "../../../Classes/Command.mjs";
import { BotPermissions } from "../../../typings/enums.mjs";
const basicInfo = {
  name: 'play',
  description: 'Play some music for your self (BETA VERSION)'
};
const playCommand = new Command({ ...basicInfo,
  builder: new SlashCommandBuilder().addStringOption(new SlashCommandStringOption().setName("input").setDescription("Give me a URL or text to search for").setRequired(true)).addStringOption(new SlashCommandStringOption().setName("engine").setDescription("What platform you want us to search for music").setRequired(false).addChoices([['YouTube', "YouTube"], ["Spotify", "Spotify"], ["SoundCloud", "SoundCloud"], ["Deezer", "Deezer"]])).setDescription(basicInfo.description).setName(basicInfo.name),
  isAvailable: true,
  permission: BotPermissions.SUPPORT,
  run: async (client, database, ctx) => {
    try {
      const input = ctx.options.getString('input', true);
      const engineChoice = ctx.options.getString('engine', false) ?? 'YouTube';
      const member = await ctx.guild.members.fetch({
        user: ctx.user
      }); // Handle User Errors

      if (!member.voice?.channel) return await ctx.editReply(client.localeManager.getLocale(database.guild.locale).error.NoVoiceChannel().toOBJECT());
      if (ctx.guild.me.voice?.channel && member.voice?.channel !== ctx.guild.me.voice?.channel) return await ctx.editReply(client.localeManager.getLocale(database.guild.locale).error.NoVoiceChannel().toOBJECT());
      const player = client.playerClient.createPlayer(ctx.guild, {
        engine: engineChoice,
        leaveOnEnd: true,
        selfDeaf: true,
        selfMute: false
      });
      const song = await player.search(input);
      const connection = player.connection(member.voice.channel);

      if (!connection) {
        await ctx.editReply(client.localeManager.getLocale(database.guild.locale).error.noContent().toOBJECT({
          ephemeral: true
        }));
        throw new Error(`Connection seems to be lost or something, Recived: ${connection}`);
      }

      client.manager.loadEvent('all', 'player', connection); //song.addMetadata({ interaction: ctx, });
      //player.tracks.addTracks([song]);

      await player.play(ctx, [song]);
      console.log(player.tracks.current(), player.tracks.nextTracks());
      await ctx.editReply(client.localeManager.getLocale(database.guild.locale).reply.beta().toOBJECT());
    } catch (error) {
      throw error;
    }
  }
});
export default playCommand;