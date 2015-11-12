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

    if (response.genres) {
      this.genres().set(response.genres, {parse: true});
      delete response.genres;
    }

    if (response.owner) {
      this.owner = response.owner;
      delete response.owner;
    }

    if (response.images) {
      this.images().set(response.images, {parse: true});
      delete response.images;
    }

    if (response.profile_pic) {
      this.profilePic().set(response.profile_pic);
      delete response.profile_pic;
    }

    if (response.jumbo_pic) {
      this.jumboPic().set(response.jumbo_pic);
      delete response.jumbo_pic;
    }

    if (response.profile_id) {
      this.profilePic().set({id: response.profile_id});
      delete response.profile_id;
    }

    if (response.rank) {
      this.rank = response.rank;
      delete response.rank;
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
  },

  genres: function () {
    if (!this._genres) {
      this._genres = new GameUp.Collections.Genres();
    }

    return this._genres;
  },

  images: function () {
    if (!this._images) {
      this._images = new GameUp.Collections.Images([], {group: this});
    }

    return this._images;
  },

  profilePic: function () {
    if (!this._profilePic) {
      this._profilePic = new GameUp.Models.Image();
    }

    return this._profilePic;
  },

  jumboPic: function () {
    if (!this._jumboPic) {
      this._jumboPic = new GameUp.Models.Image();
    }

    return this._jumboPic;
  },

  groupItemString: function () {
    if (!this.members().length || !this.get('member_name')) {
      return "Loading...";
    }

    var str = "We're " + this.members().length + " " + this.get('member_name') + "!";

    if (str.length > 30) {
      return str.slice(0, 27) + ". . .";
    } else {
      return str;
    }
  },
})
