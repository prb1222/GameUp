GameUp.Views.EventForm = Backbone.View.extend({
  template: JST['event/event_form'],

  events: {
    "submit form.event-form-fields": "submitEvent",
    "click .m-background":"remove",
    "click .close":"removeBtn"
  },

  initialize: function (options) {
    this.verb = options.verb;
    $(document).on('keydown', this.handleKey.bind(this));
  },

  handleKey: function (event) {
   if (event.keyCode === 27) {
     event.preventDefault();
     this.remove();
   }
 },

  render: function () {
    var content = this.template({event: this.model, verb: this.verb});
    this.$el.html(content);
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return this;
  },

  removeBtn: function(event) {
    event.preventDefault();
    this.remove();
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
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }.bind(this),

      error: function (error, errorText) {
        errorText.responseJSON.forEach(function(error) {
          this.$el.find('.errors').empty();
          var $li = $('<li>'+ error +'</li>')
          this.$el.find('.errors').append($li);
        }.bind(this));
      }.bind(this)
    });
  }
});
