import { UPlugin } from '@classes';
import { getByDisplayName, React } from '@webpack';
const Patcher = require('@patcher');
const { inject, uninject } = require('powercord/injector');
const { messages } = require('powercord/webpack');

export default class resize extends UPlugin {
  start() {
      this.patchMessage()
  }
  patchMessage() {
      inject("injection", messages, (args) => {
          if(args[1].content.includes(`\d\d:\d\d`)) {
              args[1].content.replace(`\d\d:\d\d`, getUnixTimestamp(args[1].content.get().match(`\d\d:\d\d`)));
          }
          return args;
      }, true);
  }
  getUnixTimestamp(time) {
    var now = new Date();
    var nowDateTime = now.toISOString();
    var nowDate = nowDateTime.split('T')[0];
    var target = new Date(nowDate + time);
    return `<t: + ${target.getTime()} + :F>`;
  }
  stop() {
    uninject('injection');
  }
}
