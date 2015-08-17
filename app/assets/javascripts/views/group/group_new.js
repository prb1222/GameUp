GameUp.Views.GroupNew = Backbone.View.extend({
  template: JST['group/group_new'],

  events: {
    "submit form.group-form-fields": "createGroup"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  createGroup: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData,{
      success: function () {
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
  }
});
