GameUp.Collections.Comments = Backbone.Collection.extend({
  url: "api/comments",

  model: GameUp.Models.Comment
});
