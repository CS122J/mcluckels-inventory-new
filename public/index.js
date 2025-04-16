/** OBJECT CONSTANTS **
 * These constants include an inventory object, resupply levels,
 * and ingredients for menu items. Some objects include methods,
 * which drive object behaviors. This section also include HTML
 * DOM targets for certain UI actions.
 */

const myForm = document.querySelector("#takeOrder");
const currOrder = document.querySelector("#currOrder");
const invDisplay = document.querySelector("#currInventory");
const orderHistory = document.querySelector("#orderHistory");

const Inventory = class {
  constructor(bun, patty, lettuce, tomato, pickle, pepperjack) {
    this.bun = bun;
    this.patty = patty;
    this.lettuce = lettuce;
    this.tomato = tomato;
    this.pickle = pickle;
    this.pepperjack = pepperjack;
  }
  restock(levelsObj) {
    for (let [itemname, count] of Object.entries(levelsObj)) {
      if (this[itemname]) {
        this[itemname].qty = count;
      } else {
        console.log(`Item ${itemname} not found in inventory!`);
      }
    }
  }
  show() {
    let newMsg = "";
    let separator = "";
    for (let [itemname, count] of Object.entries(this)) {
      newMsg += `${separator}${itemname} : ${count.qty}`;
      separator = "<br />";
    }
    invDisplay.innerHTML = newMsg;
  }
};

const inventory = new Inventory(
  { unit: "bun", qty: 0 }, // bun
  { unit: "patty", qty: 0 }, // patty
  { unit: "cup", qty: 0 }, // lettuce
  { unit: "cup", qty: 0 }, // tomato
  { unit: "ounce", qty: 0 }, // pickle
  { unit: "slices", qty: 0 } // pepperjack
);

const resupplyLevels = {
  lettuce: 50,
  tomato: 50,
  pickle: 100,
  pepperjack: 20,
  patty: 50,
  bun: 75,
};

const mealIngredients = {
  regular: {
    bun: 2,
    patty: 1,
    lettuce: 0.5,
  },
  deluxe: {
    bun: 3,
    patty: 2,
    lettuce: 1,
    pickle: 3,
    tomato: 1,
  },
  spicy: {
    bun: 2,
    patty: 1,
    lettuce: 0.5,
    pickle: 2,
    pepperjack: 2,
    tomato: 1,
  },
};

const orderDetails = {
  orderNum: 0,
  custName: null,
  items: [],
  timestamp: null,
  show() {
    let msg = `Order #${this.orderNum}: ${this.custName} at ${
      this.timestamp
    }:<br /> ${JSON.stringify(this.items)}`;
    currOrder.innerHTML = msg;
    historyLog(msg);
  },
  checkForMissingItems() {
    let missingItems = [];
    this.items.forEach(({ itemname, count }) => {
      for (let [ingredient, amount] of Object.entries(
        mealIngredients[itemname]
      )) {
        if (inventory[ingredient].qty < amount * count) {
          missingItems.push({
            itemname: itemname,
            ingredient: ingredient,
            shortage: amount * count - inventory[ingredient].qty,
            unit: inventory[ingredient].unit,
          });
        }
      }
    });
    return missingItems;
  },
  process() {
    /* WRITE YOUR CODE HERE - Then remove the console.log */
    this.items.forEach(({ itemname, count }) => {
      for (let [ingredient, amount] of Object.entries(
        mealIngredients[itemname]
      )) {
        inventory[ingredient].qty -= amount * count;
      }
    });
  },
};

/** STANDALONE FUNCTION DEFINITIONS **
 * These functions are defined apart from object methods; however,
 * they can still leverage object methods
 */

const restockAndDisplay = () => {
  /* WRITE YOUR CODE HERE - Then remove the console.log */
  inventory.restock(resupplyLevels);
  inventory.show();
  historyLog(
    `Restocked at ${new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    })}`
  );
};

const historyLog = (msg) => {
  let separator = "";
  if (orderHistory.innerHTML.length) {
    separator = "<hr />";
  }
  orderHistory.innerHTML += separator + msg;
};

const formSubmit = (event) => {
  event.preventDefault();
  const inputs = event.target.querySelectorAll("select");
  orderDetails.custName = event.target.custName.value;
  orderDetails.timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });
  orderDetails.items.length = 0; // empties the order items array
  inputs.forEach(({ name: itemname, value }) => {
    if (value > 0) {
      orderDetails.items.push({ itemname: itemname, count: value });
    }
  });
  if (!orderDetails.items.length) {
    alert("OOPS! You didn't order any items.");
    return false;
  }

  orderDetails.orderNum++;

  const missingItems = orderDetails.checkForMissingItems();
  if (missingItems.length) {
    historyLog(`Order #${orderDetails.orderNum} was canceled`);
    alert(
      `OOPS! We're missing the following ingredient(s): ${JSON.stringify(
        missingItems
      )}`
    );
    return false;
  }
  orderDetails.process();
  orderDetails.show();
  inventory.show();
  myForm.reset();
};

/** INITIALIZATION ACTIONS **
 * These are actions that take place when the page initially
 * loads. Note the addition of a "submit" event listener on the
 * HTML form. This reflects the paradigm of event-driven
 * programming.
 */

myForm.addEventListener("submit", formSubmit);

document.addEventListener("DOMContentLoaded", () => {
  /* WRITE YOUR CODE HERE - Then remove the console.log */
  restockAndDisplay();
  document.querySelector("#message").innerHTML = "";
});
