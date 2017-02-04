var groceryList = {
  groceryList: "grocery-list",
  items: function() {
    var listJSON = sessionStorage.getItem(this.groceryList);
    var list;

    if(listJSON == null || listJSON === "undefined") {
      return {};
    }
    else {
      return JSON.parse(listJSON);
    }
  },
  addItems: function(key, itemList) {
    var allItems = this.items();

    allItems[key] = itemList;

    sessionStorage.setItem(this.groceryList, JSON.stringify(allItems));
  },
  removeItems: function(key) {
    var allItems = this.items();

    delete allItems[key];

    sessionStorage.setItem(this.groceryList, JSON.stringify(allItems));
  },
  ingredient: function(key, index) {
    var measurementRegex = /^\S+\s\S+/;
  	var amountRegex = /^(\d+\/\d+|\d+\.\d+|\d+\-\d+|\d+)/;
    var unitRegex = /\S+$/;
    var ingredientLine = this.items()[key][index];
    var ingredientParts = ingredientLine.split(" ");

    if(ingredientParts.length >= 3){
      var measurement = measurementRegex.exec(ingredientLine);
      var amount = amountRegex.exec(ingredientParts[0]);
      var unit = this.measurements.unitFrom(ingredientParts[1]);

      if(amount == null){
        return {amount: null, unit: null, type: ingredientLine};
      }
      else if(unit == null){
        var type = ingredientLine.split(ingredientParts[1])[1];

        return {amount: amount[0], unit: null, type: type};
      }
      else {
          var type = ingredientLine.split(ingredientParts[0] + " " + ingredientParts[1])[1];

          return {amount: amount[0], unit: unit.symbol, type: type};
      }
    }

    return {amount: null, unit: null, type: ingredientLine};
  },
  measurements: {
    pound: {
      symbol: "lb",
      varients: ["pound", "pounds", "lb", "lbs"]
    },
    ounce: {
      symbol: "oz",
      varients: ["ounce", "ounces", "oz"]
    },
    tablespoon: {
      symbol: "tbsp",
      varients: ["tablespoon", "tablespoons", "tbsp", "tbsps"]
    },
    teaspoon: {
      symbol: "tspn",
      varients: ["teaspoon", "teaspoons", "tsp", "tsps", "tspn", "tspns"]
    },
    cup: {
      symbol: "cup",
      varients: ["cup", "cups"]
    },
    unitFrom: function(unit) {
      unit = unit.toLowerCase();

      if(this.pound.varients.indexOf(unit) > -1) {
        return this.pound;
      }
      else if(this.ounce.varients.indexOf(unit) > -1) {
        return this.ounce;
      }
      else if(this.tablespoon.varients.indexOf(unit) > -1) {
        return this.tablespoon;
      }
      else if(this.teaspoon.varients.indexOf(unit) > -1) {
        return this.teaspoon;
      }
      else if(this.cup.varients.indexOf(unit) > -1) {
        return this.cup;
      }

      return null;
    }
  }
}
