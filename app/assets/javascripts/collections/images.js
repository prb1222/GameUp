GameUp.Collections.Images = Backbone.Collection.extend({
  url: "api/images",

  model: GameUp.Models.Image
});

GameUp.Collections.images = new GameUp.Collections.Images();
