GameUp.Models.Comment = Backbone.Model.extend({
  urlRoot: "api/comments",

  parse: function (response) {
    if (response.user) {
      this.user = response.user;
      this.image = new GameUp.Models.Image(response.user.image);
      delete response.user;
    }

    return response;
  },

  displayDate: function () {
    var date = this.get('created_at');
    return moment(date).format("MMMM Do[,] YYYY hh:mm A");
  }
});
