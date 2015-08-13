GameUp.Views.EventForm = Backbone.View.extend({
  template: JST['event/event_form'],

  tagName: "form",

  className: "event-form-fields",

  events: {
    "submit": "submitEvent"
  },

  render: function () {
    var content = this.template({event: this.model});
    this.$el.html(content);
    return this;
  },

  submitEvent: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    formData.event.group_id = $('div.group-detail-view').data("id");
    this.model.save(formData, {
      success: function (model) {
        this.collection.add(model);
        this.$el.empty();
        Backbone.history.navigate('groups/' + model.get('group_id'), {trigger: true});
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
