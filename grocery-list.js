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
  }
}
