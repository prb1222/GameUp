_.extend(Backbone.Collection.prototype, {
  getOrFetch: function (id, callback) {
    var collection = this;
    var model = collection.get(id);

    if (model) {
      model.fetch({
        success: function (model) {
          callback && callback(model);
        }
      });
    } else {
      model = new collection.model({ id: id })
      collection.add(model);
      model.fetch({
        success: function (model) {
          callback && callback(model);
        },
        error: function(model) {
          collection.remove(model)
        }
      })
    }

    return model;
  }
})
