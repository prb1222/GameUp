GameUp.Collections.Events = Backbone.Collection.extend({
  url: "api/events",

  model: GameUp.Models.Event,

  comparator: function (event1, event2) {
    var date1 = moment(event1.get('date'), "MMMM DD YYYY HH:mm");
    var date2 = moment(event2.get('date'), "MMMM DD YYYY HH:mm");
    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else {
      return 0;
    }
  },

  getUniqueDates: function () {
    var filteredDates = this.filterDates();

    return filteredDates.getUnique();
  },

  filterDates: function () {
    return this.pluck("date").map(function(date){
      return moment(date, "MMMM DD YYYY HH:mm").format("MMMM Do[,] YYYY");
    });
  },

  filterByDate: function (date) {
    return this.filter(function(event){
      return moment(event.get('date'), "MMMM DD YYYY HH:mm").format("MMMM Do[,] YYYY") === date;
    })
  }

  // getOrFetch: function(id) {
  //   var collection = this;
  //   var model = collection.get(id);
  //
  //   if (model) {
  //     model.fetch();
  //   } else {
  //     model = new GameUp.Models.Event({ id: id })
  //     collection.add(model)
  //     model.fetch({
  //       error: function(model) {
  //         collection.remove(model)
  //       }
  //     })
  //   }
  //
  //   return model;
  // }
});
