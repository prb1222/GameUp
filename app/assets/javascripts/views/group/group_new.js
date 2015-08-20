GameUp.Views.GroupNew = Backbone.View.extend({
  template: JST['group/group_new'],

  events: {
    "submit form.group-form-fields": "createGroup",
    "click button.image-upload":"upload"
  },

   className: "group-new-view content-padding",

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  createGroup: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData,{
      success: function (model) {
        this.remove();
        Backbone.history.navigate("#/groups/" + this.model.get('id'), {trigger: true});
      }.bind(this),

      error: function (error, errorText) {
        errorText.responseJSON.forEach(function(error) {
          var $li = $('<li>'+ error +'</li>')
          this.$el.find('.errors').append($li);
        }.bind(this));
      }.bind(this)
    });
  },

  upload: function (event) {
    if (this.disabled) {return;}
    this.disabled = true;
    var image = new GameUp.Models.Image({imageable_type: "Group"});
    event.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result){
      if (error) {return;}
      var data = result[0];
      image.set({image_url: data.url});
      this.$el.find('p.current-image').remove();
      var $p = $('<p>').addClass('current-image').text("Using image: " + data.original_filename + "." + data.format);
      this.$el.find('label.image-upload').append($p)
    }.bind(this));
    this.image = image;
    this.disabled = false;
  }
});
