GameUp.Collections.Events = Backbone.Collection.extend({
  url: "api/events",

  model: GameUp.Models.Event,

  getOrFetch: function(id) {
    var collection = this;
    var model = collection.get(id);

    if (model) {
      model.fetch();
    } else {
      model = new GameUp.Models.Event({ id: id })
      collection.add(model)
      model.fetch({
        error: function(model) {
          collection.remove(model)
        }
      })
    }

    return model;
  }
})
