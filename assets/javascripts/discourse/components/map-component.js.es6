import MountWidget from 'discourse/components/mount-widget';
import { observes, on } from 'discourse-common/utils/decorators';
import { scheduleOnce } from "@ember/runloop";

export default MountWidget.extend({
  classNameBindings: [':map-component', ':map-container', 'size'],
  widget: 'map',
  clickable: false,

  buildArgs() {
    let args = this.getProperties(
      'category',
      'topic',
      'user',
      'locations',
      'clickable',
      'topicList',
      '',
      'search',
      'showAvatar',
      'size',
      'center',
      'zoom'
    );
debugger;
    if (this.get('geoLocation')) {
      if (!args['locations']) args['locations'] = [];
      args['locations'].push({ geo_location: this.get('geoLocation') });
    }

    return args;
  },

  @on('didInsertElement')
  setupOnRender() {
    this.scheduleSetup();
  },

  @observes('category','geoLocation','geoLocations.[]', 'userList.[]')
  refreshMap() {
    this.queueRerender();
    this.scheduleSetup();
  },

  scheduleSetup() {
    scheduleOnce('afterRender', () => {
      this.appEvents.trigger('dom:clean');
    });
  }
});
