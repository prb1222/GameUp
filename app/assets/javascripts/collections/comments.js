GameUp.Collections.Comments = Backbone.Collection.extend({
  url: "api/comments",

  model: GameUp.Models.Comment,

  comparator: function (model) {
    return -parseInt(moment(model.get('created_at')).format('x'));
  }
});
