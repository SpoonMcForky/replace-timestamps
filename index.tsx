import { UPlugin } from '@classes';
const Patcher = require('@patcher');
const { MessageActions } = require('@webpack');

export default class resize extends UPlugin {
  start() {
    this.patchMessage();
  }
  patchMessage() {
    Patcher.before('patch', MessageActions, 'sendMessage', (_, ret) => {
      if (ret[1].content.search(/\d\d:\d\d/) !== -1) ret[1].content = ret[1].content.replace(/\d\d:\d\d/, this.getUnixTimestamp(ret[1].content.match(/\d\d:\d\d/)));
      return ret;
    });
  }
  getUnixTimestamp(time) {
    const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/\d\d:\d\d/, time);
    const then = Math.round((new Date(date)).getTime() / 1000);
    return `<t:${then}:t>`; //To change the time format, refer to https://github.com/discord/discord-api-docs/blob/master/docs/Reference.md#timestamp-styles
  }
  stop() {
    Patcher.unpatchAll('patch');
  }
}
