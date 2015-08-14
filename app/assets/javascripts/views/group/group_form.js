GameUp.Views.GroupForm = Backbone.View.extend({
  template: JST['group/group_form'],

  events: {
    "submit form.group-form-fields": "submitGroup"
  },

  initialize: function (options) {
    this.verb = options.verb;
  },

  render: function () {
    var content = this.template({group: this.model, verb: this.verb});
    this.$el.html(content);
    return this;
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
        errorText.responseJSON.forEach(function(error) {
          var $li = $('<li>'+ error +'</li>')
          this.$el.find('.errors').append($li);
        }.bind(this));
      }.bind(this)
    });
  }
});
