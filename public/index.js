/** OBJECT CONSTANTS **
 * These constants include an inventory object, resupply levels,
 * and ingredients for menu items. Some objects include methods,
 * which drive object behaviors. This section also include HTML
 * DOM targets for certain UI actions.
 */

// DOM element selection - assignment to constants for better code management
const myForm = document.querySelector("#takeOrder")
const currOrder = document.querySelector("#currOrder")
const invDisplay = document.querySelector("#currInventory")
const orderHistory = document.querySelector("#orderHistory")
const messageEl = document.querySelector("#message")
const restockBtn = document.querySelector("#restockBtn")

// Defineing the Inventory class with methods for restocking and displaying inventory
const Inventory = class {
  constructor(bun, patty, lettuce, tomato, pickle, pepperjack) {
    this.bun = bun
    this.patty = patty
    this.lettuce = lettuce
    this.tomato = tomato
    this.pickle = pickle
    this.pepperjack = pepperjack
  }

  // Adding a method to restock inventory based on an input object of levels
  restock(levelsObj) {
    for (let [itemname, count] of Object.entries(levelsObj)) {
      if (this[itemname]) {
        this[itemname].qty = count
      } else {
        console.log(`Item ${itemname} not found in inventory!`)
      }
    }
  }

  // Adding a method to display current inventory in the UI
  show() {
    let newMsg = ""
    let separator = ""
    for (let [itemname, item] of Object.entries(this)) {
      newMsg += `${separator}${itemname}: ${item.qty} ${item.unit}`
      separator = "<br />"
    }
    invDisplay.innerHTML = newMsg
  }
}

// Initializing the inventory object with zero quantities for each ingredient
const inventory = new Inventory(
  { unit: "bun", qty: 0 }, // bun
  { unit: "patty", qty: 0 }, // patty
  { unit: "cup", qty: 0 }, // lettuce
  { unit: "cup", qty: 0 }, // tomato
  { unit: "ounce", qty: 0 }, // pickle
  { unit: "slices", qty: 0 }, // pepperjack
)

// Defining resupply levels for each ingredient, which can be used to restock inventory
const resupplyLevels = {
  lettuce: 50,
  tomato: 50,
  pickle: 100,
  pepperjack: 20,
  patty: 50,
  bun: 75,
}

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
}

// User feedback function that automatically clears non-error messages after a few seconds
const showFeedback = (message, type = "info") => {
  messageEl.innerHTML = `<div class="alert alert-${type}">${message}</div>`
  window.scrollTo({ top: 0, behavior: "smooth" }) // Scroll to top for visibility
  // Auto-clear success/info messages after 4 seconds
  if (type !== "error") {
    setTimeout(() => {
      if (messageEl.innerHTML.includes(message)) {
        messageEl.innerHTML = ""
      }
    }, 4000)
  }
}

// Defining the orderDetails object with properties and methods related to customer orders
const orderDetails = {
  orderNum: 0,
  custName: null,
  items: [],
  timestamp: null,

  // The show() method displays the current order details in the UI and logs it to the history
  show() {
    const msg = `Order #${this.orderNum}: ${this.custName} at ${this.timestamp}:<br /> ${JSON.stringify(this.items)}`
    currOrder.innerHTML = msg
    historyLog(msg)
  },

  // The checkForMissingItems() method returns a list of any missing items
  checkForMissingItems() {
    let missingItems = []

    this.items.forEach(({ itemname, count }) => {
      for (let [ingredient, amount] of Object.entries(
        mealIngredients[itemname],
      )) {
        const neededAmount = amount * count
        const availableAmount = inventory[ingredient].qty

        if (availableAmount < neededAmount) {
          missingItems.push({
            itemname: itemname,
            ingredient: ingredient,
            shortage: neededAmount - availableAmount,
            unit: inventory[ingredient].unit,
          })
        }
      }
    })
    return missingItems
  },

  // Method for processing orders and updating inventory
  process() {
    /* WRITE YOUR CODE HERE - Then remove the console.log */
    console.log(
      `Bug #3: Write a METHOD that depletes the inventory by using the 'items' array in the orderDetails object.`,
    )
  },
}

/** STANDALONE FUNCTION DEFINITIONS **
 * These functions are defined apart from our object methods
 */

// Function for restocking inventory and updating the display, called when the restock button is clicked
const restockAndDisplay = () => {
  /* WRITE YOUR CODE HERE - Then remove the console.log */
  console.log(
    "Bug #2: Invoke the inventory object METHOD that restocks according to prescribed supply levels for each ingredient. Be sure to include the required (object) argument.",
  )
  inventory.show()
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  })
  historyLog(`Restocked at ${timestamp}`)
  showFeedback("Inventory successfully restocked!", "success")
}

// Utility function for adding history entries
const historyLog = (msg) => {
  let separator = ""
  if (orderHistory.innerHTML.length) {
    separator = "<hr />"
  }
  orderHistory.innerHTML += separator + msg
}

/** EVENT HANDLING AND FORM PROCESSING **
 * Handle event listeners, perform OM manipulation, and
 * handle form submission logic.
 */
const formSubmit = (event) => {
  event.preventDefault()

  // Clear any previous error messages
  messageEl.innerHTML = ""

  // Get form elements by leveraging the event object
  const custName = event.target.custName
  const inputs = event.target.querySelectorAll("select")

  // Set order details in the orderDetails object
  orderDetails.custName = custName.value
  orderDetails.timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  })

  // Reset the 'items' array (in the orderDetails object) and process form inputs
  orderDetails.items.length = 0
  inputs.forEach(({ name: itemname, value }) => {
    if (parseInt(value) > 0) {
      orderDetails.items.push({
        itemname: itemname,
        count: parseInt(value),
      })
    }
  })

  // Validation: Check if any items were ordered
  if (!orderDetails.items.length) {
    showFeedback("Please select at least one item to order.", "error")
    return false
  }

  orderDetails.orderNum++ // Increment order number for each new order

  // Check inventory availability
  const missingItems = orderDetails.checkForMissingItems()
  if (missingItems.length) {
    historyLog(`Order #${orderDetails.orderNum} was canceled`)
    const missingText = missingItems
      .map(
        (item) => `${item.ingredient}: need ${item.shortage} more ${item.unit}`,
      )
      .join(", ")
    showFeedback(
      `Cannot complete order. Missing ingredients: ${missingText}`,
      "error",
    )
    return false
  }

  // Process successful order
  orderDetails.process()
  orderDetails.show()
  inventory.show()
  myForm.reset()

  showFeedback(
    `Order #${orderDetails.orderNum} processed successfully!`,
    "success",
  )
}

/** INITIALIZATION ACTIONS **
 * These are actions that take place when the page initially
 * loads. It mainly involves attaching event listeners and
 * performing any necessary setup.
 */

// Modern event listener approach (replaces inline onclick)
myForm.addEventListener("submit", formSubmit)
restockBtn.addEventListener("click", restockAndDisplay)

// Keyboard accessibility for restock button
restockBtn.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault()
    restockAndDisplay()
  }
})

// Page initialization when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  /* WRITE YOUR CODE HERE - Then remove the console.log */
  console.log(
    `Bug #1: Call the STANDALONE function that kicks off restocking and displaying of inventory.`,
  )
  document.querySelector("#message").innerHTML = ""
})
