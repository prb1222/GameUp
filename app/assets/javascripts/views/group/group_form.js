GameUp.Views.GroupForm = Backbone.View.extend({
  template: JST['group/group_form'],

  events: {
    "submit form.edit-group-form-fields": "submitGroup",
    "click .m-background":"remove",
    "click .close":"removeBtn"
  },

  initialize: function (options) {
    this.verb = options.verb;
  },

  render: function () {
    var content = this.template({group: this.model, verb: this.verb});
    this.$el.html(content);
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return this;
  },

  removeBtn: function(event) {
    event.preventDefault();
    this.remove();
  },

  submitGroup: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData, {
      success: function (model) {
        this.collection.add(model);
        this.remove();
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
  }
});
