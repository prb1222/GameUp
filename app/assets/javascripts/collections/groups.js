GameUp.Collections.Groups = Backbone.Collection.extend({
  url: "api/groups",

  model: GameUp.Models.Group,

  // getOrFetch: function(id) {
  //   var collection = this;
  //   var model = collection.get(id);
  //
  //   if (model) {
  //     model.fetch();
  //   } else {
  //     model = new GameUp.Models.Group({ id: id })
  //     collection.add(model);
  //     model.fetch({
  //       error: function(model) {
  //         collection.remove(model)
  //       }
  //     })
  //   }
  //
  //   return model;
  // }
})
