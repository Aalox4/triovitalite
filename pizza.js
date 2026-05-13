// Pizza builder state
let activeToppings = {
  cheese: false,
  pepperoni: false,
  onion: false,
  olive: false
};

let cart = [];

// Fade in the page
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
  updateToppingCount();
  setupPopups();
});

// Setup popup functionality (copied from home.js)
function setupPopups() {
  const cartPopup = document.getElementById("cartPopup");
  const registerPopup = document.getElementById("registerPopup");
  
  if (document.getElementById("openCart")) {
    document.getElementById("openCart").addEventListener("click", () => {
      cartPopup.style.display = "flex";
      renderCart();
    });
  }
  
  if (document.getElementById("closeCart")) {
    document.getElementById("closeCart").addEventListener("click", () => {
      cartPopup.style.display = "none";
    });
  }
  
  if (document.getElementById("openRegister")) {
    document.getElementById("openRegister").addEventListener("click", () => {
      registerPopup.style.display = "flex";
    });
  }
  
  if (document.getElementById("closeRegister")) {
    document.getElementById("closeRegister").addEventListener("click", () => {
      registerPopup.style.display = "none";
    });
  }
}

// Toggle ingredient on/off
function toggleIngredient(ingredient) {
  const topping = document.getElementById(`${ingredient}-topping`);
  const ingredientItem = document.getElementById(`ing-${ingredient}`);
  
  if (!topping) return;
  
  if (activeToppings[ingredient]) {
    // Remove topping
    topping.style.display = 'none';
    topping.classList.remove('active');
    activeToppings[ingredient] = false;
    ingredientItem.classList.remove('active');
    
    // Add removal animation
    topping.style.animation = 'none';
  } else {
    // Add topping
    topping.style.display = 'block';
    topping.classList.add('active');
    activeToppings[ingredient] = true;
    ingredientItem.classList.add('active');
    
    // Trigger animation
    topping.style.animation = 'toppingAppear 0.4s ease';
  }
  
  updateToppingCount();
  updatePizzaPrice();
}

// Reset pizza to empty
function resetPizza() {
  // Hide all toppings
  Object.keys(activeToppings).forEach(ingredient => {
    const topping = document.getElementById(`${ingredient}-topping`);
    const ingredientItem = document.getElementById(`ing-${ingredient}`);
    
    if (topping) {
      topping.style.display = 'none';
      topping.classList.remove('active');
    }
    if (ingredientItem) {
      ingredientItem.classList.remove('active');
    }
    
    activeToppings[ingredient] = false;
  });
  
  updateToppingCount();
  updatePizzaPrice();
  
  // Add shake animation to pizza base for feedback
  const pizzaBase = document.getElementById('pizzaBase');
  pizzaBase.style.animation = 'none';
  pizzaBase.offsetHeight; // Trigger reflow
  pizzaBase.style.animation = 'toppingAppear 0.4s ease';
}

// Update the topping counter
function updateToppingCount() {
  const count = Object.values(activeToppings).filter(Boolean).length;
  const counter = document.getElementById('toppingCount');
  if (counter) {
    counter.textContent = count;
    
    // Add animation when count changes
    counter.style.animation = 'none';
    counter.offsetHeight; // Trigger reflow
    counter.style.animation = 'toppingAppear 0.3s ease';
  }
}

// Update pizza price based on toppings
function updatePizzaPrice() {
  const basePrice = 15;
  const toppingPrice = 2;
  const count = Object.values(activeToppings).filter(Boolean).length;
  const totalPrice = basePrice + (count * toppingPrice);
  
  const priceSpan = document.getElementById('pizzaPrice');
  if (priceSpan) {
    priceSpan.textContent = totalPrice;
  }
  
  return totalPrice;
}

// Add the custom pizza to cart
function addPizzaToCart() {
  const activeToppingList = Object.entries(activeToppings)
    .filter(([_, active]) => active)
    .map(([name]) => name);
  
  if (activeToppingList.length === 0) {
    alert("Please add at least one topping to your pizza! 🍕");
    return;
  }
  
  const price = updatePizzaPrice();
  const toppingNames = activeToppingList.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ');
  
  const pizzaName = `Custom Pizza (${toppingNames})`;
  
  // Add to cart (using the same cart system from home.js)
  cart.push({ 
    name: pizzaName, 
    price: price,
    toppings: activeToppingList 
  });
  
  // Show success message with animation
  alert(`✨ ${pizzaName} added to cart!`);
  
  // Animate the cart icon
  const cartIcon = document.querySelector('.fa-cart-shopping');
  cartIcon.style.animation = 'none';
  cartIcon.offsetHeight; // Trigger reflow
  cartIcon.style.animation = 'toppingAppear 0.5s ease';
}

// Cart functions (copied and adapted from home.js)
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  
  if (!cartItems || !cartTotal) return;
  
  cartItems.innerHTML = "";
  let total = 0;
  
  cart.forEach((item, index) => {
    total += item.price;
    
    cartItems.innerHTML += `
      <div class="cart-item" style="animation: toppingAppear 0.3s ease">
        <span>${item.name} - $${item.price}</span>
        <button onclick="removeFromCart(${index})" style="background:red;border:none;color:white;padding:4px 8px;border-radius:6px;cursor:pointer;">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
    `;
  });
  
  cartTotal.textContent = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty! 🛒");
    return;
  }
  
  alert(`✅ Order placed successfully!\nTotal: $${cart.reduce((sum, item) => sum + item.price, 0)}\nThanks for choosing Feane!`);
  cart = [];
  renderCart();
  document.getElementById("cartPopup").style.display = "none";
}

// Register function (copied from home.js)
function register() {
  const name = document.getElementById("regName")?.value;
  const email = document.getElementById("regEmail")?.value;
  const pass = document.getElementById("regPass")?.value;
  
  if (!name || !email || !pass) {
    alert("Please fill all registration fields!");
    return;
  }
  
  alert("Welcome " + name + "! 🎉 Registration Successful!");
  
  if (document.getElementById("regName")) {
    document.getElementById("regName").value = "";
    document.getElementById("regEmail").value = "";
    document.getElementById("regPass").value = "";
  }
  
  document.getElementById("registerPopup").style.display = "none";
}

// Add keyboard shortcuts (bonus feature)
document.addEventListener('keydown', (e) => {
  if (e.key === 'r' || e.key === 'R') {
    // Press R to reset
    resetPizza();
  } else if (e.key === 'c' || e.key === 'C') {
    // Press C to add to cart
    addPizzaToCart();
  }
});

// Export functions for HTML onclick attributes
window.toggleIngredient = toggleIngredient;
window.resetPizza = resetPizza;
window.addPizzaToCart = addPizzaToCart;
window.removeFromCart = removeFromCart;
window.checkout = checkout;
window.register = register;