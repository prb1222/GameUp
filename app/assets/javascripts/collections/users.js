GameUp.Collections.Users = Backbone.Collection.extend({
  url: "api/users",
  
  model: GameUp.Models.User
});
