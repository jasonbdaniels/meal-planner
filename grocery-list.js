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
      var unitSymbol;
      var ingredientType;

      if(amount == null){
        return {amount: null, unit: null, type: this.normalizeIngredient(ingredientLine)};
      }
      else if(unit == null){
        ingredientParts.shift();

        var type = ingredientParts.join(" ");

        return {amount: amount[0], unit: null, type: this.normalizeIngredient(type)};
      }
      else {
        ingredientParts.shift();
        ingredientParts.shift();

        var type = ingredientParts.join(" ");

        return {amount: amount[0], unit: unit.symbol, type: this.normalizeIngredient(type)};
      }
    }

    return {amount: null, unit: null, type: this.normalizeIngredient(ingredientLine)};
  },
  normalizeIngredient: function(ingredient){
    var parenthesesRegex = /\(.+\)/g;
    var commaSeperationRegex = /,.+$/g;
    var articleRegex = /\s(a|the|an)\s/g;
    var prepositionRegex = /\s(from|of|by|on|in|off|out|at|about)\s/g;

    ingredient = ingredient.replace(commaSeperationRegex, "");
    ingredient = ingredient.replace(parenthesesRegex, "");
    ingredient = ingredient.replace(articleRegex, " ");
    ingredient = ingredient.replace(prepositionRegex, " ");

    return ingredient;
  },
  measurements: {
    pound: {
      deminsion: "weight",
      symbol: "lb",
      varients: ["pound", "pounds", "lb", "lbs"]
    },
    ounce: {
      deminsion: "volume",
      factor: 1,
      symbol: "oz",
      varients: ["ounce", "ounces", "oz"]
    },
    tablespoon: {
      deminsion: "volume",
      factor: 0.5,
      symbol: "tbsp",
      varients: ["tablespoon", "tablespoons", "tbsp", "tbsps"]
    },
    teaspoon: {
      deminsion: "volume",
      factor: 0.1667,
      symbol: "tspn",
      varients: ["teaspoon", "teaspoons", "tsp", "tsps", "tspn", "tspns"]
    },
    cup: {
      deminsion: "volume",
      factor: 8,
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
    add: function(lAmount, lMeasurement, rAmount, rMeasurement) {
      if(lMeasurement.deminsion == rMeasurement.deminsion){
        var lhs = lAmount*lMeasurement.factor;
        var rhs = rAmount*rMeasurement.factor;
        var amount = lhs + rhs;

        return {amount: amount, measurement: this.ounce};
      }

      return null;
    }
  }
}
