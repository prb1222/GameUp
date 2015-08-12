GameUp.Models.Group = Backbone.Model.extend({
  urlRoot: 'api/groups',

  parse: function (response) {
    if (response.events) {
      this.meets().set(response.events);
      delete response.events;
    }

    if (response.owned !== undefined) {
      this.owned = response.owned;
      delete response.owned;
    }

    if (response.member !== undefined) {
      this.member = response.member;
      delete response.member;
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
