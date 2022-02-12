import { UPlugin } from '@classes';
import { getByDisplayName, React } from '@webpack';
const Patcher = require('@patcher');
const { inject, uninject } = require('powercord/injector');
const { messages } = require('powercord/webpack');

export default class resize extends UPlugin {
  start() {
    this.patchMessage();
  }
  patchMessage() {
    inject('injection', messages, 'sendMessage', args => {
      if (args[1].content.search(/\d\d:\d\d/) !== -1) args[1].content = args[1].content.replace(/\d\d:\d\d/, this.getUnixTimestamp(args[1].content.match(/\d\d:\d\d/)));
      return args;
    }, true);
  }
  getUnixTimestamp(time) {
    const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/\d\d:\d\d/, time)
    const then = Math.round((new Date(date)).getTime() / 1000);
    return `<t:${then}:t>`;
  }
  stop() {
    uninject('injection');
  }
}
