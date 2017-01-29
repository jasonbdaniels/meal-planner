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
  	var amountRegex = /^(\d+\/\d+|\d+\.\d+|\d\-\d|\d+)/;
    var unitRegex = /\S+$/;
    var ingredientLine = this.items()[key][index];
    var ingredientParts = ingredientLine.split(" ");

    if(ingredientParts.length >= 3){
      var measurement = measurementRegex.exec(ingredientLine);
      var amount = ingredientParts[0];
      var unit = ingredientParts[1];
      var type = ingredientLine.split(amount + " " + unit)[1];

      return {amount: amount, unit: unit, type: type};
    }

    return {amount: null, unit: null, type: ingredientLine};
  },
  measurements: {
    pound: {
      varients: ["pound", "pounds", "lb", "lbs"]
    },
    ounce: {
      varients: ["ounce", "ounces", "oz"]
    },
    tablespoon: {
      varients: ["tablespoon", "tablespoons", "tbsp", "tbsps"]
    },
    teaspoon: {
      varients: ["teaspoon", "teaspoons", "tsp", "tsps", "tspn", "tspns"]
    },
    cup: {
      varients: ["cup", "cups"]
    }
  }
}
