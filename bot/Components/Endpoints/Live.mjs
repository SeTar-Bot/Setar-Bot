import Endpoint from "../../../Classes/Endpoint.mjs";
import { expreessEndpoints, expressMethods } from "../../../typings/enums.mjs";
import botOptions from "../../Config/botOptions.mjs";
const basicInfo = {
  uri: expreessEndpoints.LIVE,
  method: expressMethods.GET
};
const liveEndpoint = new Endpoint({ ...basicInfo,
  isAvailable: true,
  testPing: true,
  handler: async (client, req, res) => {
    // eslint-disable-next-line
    try {
      res.send({
        result: 'ok'
      });
      setTimeout(async () => {
        const replyRes = await client.axiosClient[basicInfo.method](botOptions.serverURL + basicInfo.uri);
        if (replyRes.status == 200) console.log(`Server has been refreshed.`);else throw new Error(`Server couldn't be refresh, Status Code: ${replyRes.status}`);
      }, 900000);
    } catch (error) {
      throw error;
    }
  }
});
export default liveEndpoint;