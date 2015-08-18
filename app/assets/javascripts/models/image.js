GameUp.Models.Image = Backbone.Model.extend({
  urlRoot: "api/images",

  groupThumbnail: function () {
    if (!this.get("image_url")) {return "";}
    var properties_string = "w_300,h_200/";
    properties_string += this.get('image_url').slice(61);
    return this.get('image_url').slice(0, 49) + properties_string;
  },

  groupJumbo: function (width) {
    if (!this.get("image_url")) {return "";}
    var properties_string = "w_" + width + ",h_120/";
    properties_string += this.get('image_url').slice(61);
    return this.get('image_url').slice(0, 49) + properties_string;
  },

  imageItem: function () {
    if (!this.get("image_url")) {return "";}
    var properties_string = "w_150,h_150/";
    properties_string += this.get('image_url').slice(61);
    return this.get('image_url').slice(0, 49) + properties_string;
  },

  displayDate: function () {
    var date = this.get('created_at');
    return moment(date).format("MMMM DD YYYY HH:mm");
  }
});
