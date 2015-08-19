GameUp.Models.Image = Backbone.Model.extend({
  urlRoot: "api/images",

  groupThumbnail: function (width) {
    if (!this.get("image_url") || !width) {return "";}
    var properties_string = "w_" + width +",h_190/";
    properties_string += this.get('image_url').slice(61);
    return this.get('image_url').slice(0, 49) + properties_string;
  },


  groupJumbo: function (width) {
    if (!this.get("image_url") || !width) {return "";}
    var properties_string = "w_" + width + ",h_225/";
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
  },

  userProfile: function () {
    if (!this.get("image_url")) {return "";}
    var properties_string = "w_150,h_150/";
    properties_string += this.get('image_url').slice(61);
    return this.get('image_url').slice(0, 49) + properties_string;
  },

  userThumbnail: function () {
    if (!this.get("image_url")) {return "";}
    var properties_string = "w_50,h_50/";
    properties_string += this.get('image_url').slice(61);
    return this.get('image_url').slice(0, 49) + properties_string;
  },

  modalSize: function () {
    if (!this.get("image_url")) {return "";}
    return this.get('image_url');
  }
});
