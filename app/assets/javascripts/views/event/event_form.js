GameUp.Views.EventForm = Backbone.View.extend({
  template: JST['event/event_form'],

  events: {
    "submit form.event-form-fields": "submitEvent"
  },

  initialize: function (options) {
    this.verb = options.verb;
  },

  render: function () {
    var content = this.template({event: this.model, verb: this.verb});
    this.$el.html(content);
    debugger;
    return this;
  },

  submitEvent: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    formData.event.group_id = $('div.group-detail-view').data("id");
    this.model.save(formData, {
      success: function (model) {
        this.collection.add(model);
        this.remove();
        Backbone.history.navigate('groups/' + model.get('group_id') + "/events/" + model.get('id'), {trigger: true});
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