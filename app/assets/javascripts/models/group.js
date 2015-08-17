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

    if (response.membership) {
      this.membership().set({id: response.membership.id, user_id: response.membership.user_id});
      delete response.membership;
    }

    if (response.members) {
      this.members().set(response.members, {parse: true});
      delete response.members;
    }

    if (response.owner) {
      this.owner = response.owner;
      delete response.owner;
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
  },

  members: function () {
    if (!this._members) {
      this._members = new GameUp.Collections.Users();
    }

    return this._members;
  }
})
