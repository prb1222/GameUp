GameUp.Models.Group = Backbone.Model.extend({
  urlRoot: 'api/groups',

  parse: function (response) {
    if (response.events) {
      this.meets().set(response.events);
      delete response.events;
    }

    return response;
  },

  meets: function () {
    if (!this._meets) {
      this._meets = new GameUp.Collections.Events([], {group: this});
    }

    return this._meets;
  }
})
