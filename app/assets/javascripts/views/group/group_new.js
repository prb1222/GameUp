GameUp.Views.GroupNew = Backbone.View.extend({
  template: JST['group/group_new'],

  events: {
    "submit form.group-form-fields": "createGroup",
    "click button.image-upload":"upload",
    "click input.next":"next",
  },

   className: "group-new-view content-padding",

   initialize: function () {
     this.counter = 0;
     $(document).on('keyup', this.handleKey.bind(this));
     $("html, body").animate({ scrollTop: 0 }, "slow");
     this.loading = true;
   },

   handleKey: function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      $nextButton = $('#' + (this.counter + 1));
      $nextButton.focus();
      $nextButton.trigger('click');
    }
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    if (this.loading) {
      $('.new-group-title').focus();
      this.loading = false;
    }
    return this;
  },

  createGroup: function (event) {
    event.preventDefault();
    if (this.counter < 4) {return;}
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData,{
      success: function (model) {
        this.remove();
        Backbone.history.navigate("#/groups/" + this.model.get('id'), {trigger: true});
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }.bind(this),

      error: function (error, errorText) {
        this.$el.find('.errors').empty();
        errorText.responseJSON && errorText.responseJSON.forEach(function(error) {
          var $li = $('<li>'+ error +'</li>')
          this.$el.find('.errors').append($li);
        }.bind(this));
        if (errorText.responseText) {
          var $li = $('<li>'+ errorText.responseText +'</li>')
          this.$el.find('.errors').append($li);
        }
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
  },

  next: function (event) {
    if (this.disabled) {return;}
    event.preventDefault();
    this.disabled = true;
    $(event.currentTarget).slideToggle(100, function() {
      this.disabled = false;
    }.bind(this));
    this.counter++
    switch (this.counter) {
      case 1:
        this.$el.find('.group-new-location').slideToggle(400);
        this.$el.find('.new-group-location').focus();
        $('html, body').animate({ scrollTop: $('.new-group-location').offset().top }, 'slow');
        break;
      case 2:
        this.$el.find('.group-new-description').slideToggle(400);
        this.$el.find('.new-group-description').focus();
        $('html, body').animate({ scrollTop: $('.new-group-description').offset().top }, 'slow');
        break;
      case 3:
        this.$el.find('.group-new-member-name').slideToggle(400);
        this.$el.find('.new-group-member-name').focus();
        $('html, body').animate({ scrollTop: $('.new-group-member-name').offset().top }, 'slow');
        break;
      case 4:
        this.$el.find('.group-new-upload-image').slideToggle(400);
        this.$el.find('.submit-button').slideToggle(400);
        this.$el.find('.create-group').focus();
        $('html, body').animate({ scrollTop: $('.group-new-upload-image').offset().top }, 'slow');
        break;
    }
  }
});
