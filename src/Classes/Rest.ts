import { REST, RESTOptions } from "@discordjs/rest";
import { Routes } from 'discord-api-types/v9';
import { ApplicationCommandManager, ApplicationCommandDataResolvable, GuildResolvable } from "discord.js";

export default class RestClient extends REST {

    private appId: string;
    constructor(token: string, clientId: string, opts: Partial<RESTOptions> = { version: '9' })
    {
        super(opts);
        this.setToken(token);
        this.appId = clientId;
    }

    async addCommand(cmds: any[], guild?: GuildResolvable | boolean): ReturnType<REST["put"]>
    {
        if(!guild) {
            return await this.put(Routes.applicationCommands(this.appId), { body: cmds })
        }
            
        return await this.put(Routes.applicationGuildCommands(this.appId, guild as string), { body: cmds })
    }

    async updateCommand(cmdManager: ApplicationCommandManager, guild: GuildResolvable, data: any): ReturnType<ApplicationCommandManager["create"]>
    {
        return await cmdManager.create(data as ApplicationCommandDataResolvable, guild as string);
    }

}