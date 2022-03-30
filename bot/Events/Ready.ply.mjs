import Event from "../../Classes/Event.mjs";
import { PlayerEvents } from "../../typings/enums.mjs";
const PlayerReadyEvent = new Event({
  name: PlayerEvents.CONNECT,
  type: 'player',
  isAvailable: true,
  run: async (client, oldState, newState) => {
    console.log(`a player has ended playing music.`);
  }
});
export default PlayerReadyEvent;