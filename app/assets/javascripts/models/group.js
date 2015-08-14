GameUp.Models.Group = Backbone.Model.extend({
  urlRoot: 'api/groups',

  parse: function (response) {
    if (response.events) {
      this.meets().set(response.events, { parse: true });
      delete response.events;
    }

    if (response.owned !== undefined) {
      this.owned = response.owned;
      delete response.owned;
    }

    if (response.membership_id) {
      this.membership().set({id: response.membership_id});
      delete response.membership_id;
    }

    return response;
  },

  meets: function () {
    if (!this._meets) {
      this._meets = new GameUp.Collections.Events([], {group: this});
    }

    return this._meets;
  },

  is_member: function () {
    return !this.membership().isNew();
  },

  membership: function () {
    if (!this._membership) {
      this._membership = new GameUp.Models.GroupMembership();
    }

    return this._membership;
  }
})
