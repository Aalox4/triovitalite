let cart = [];

const cartPopup = document.getElementById("cartPopup");
const registerPopup = document.getElementById("registerPopup");

document.getElementById("openCart").addEventListener("click", () => {
  cartPopup.style.display = "flex";
  renderCart();
});

document.getElementById("closeCart").addEventListener("click", () => {
  cartPopup.style.display = "none";
});

document.getElementById("openRegister").addEventListener("click", () => {
  registerPopup.style.display = "flex";
});

document.getElementById("closeRegister").addEventListener("click", () => {
  registerPopup.style.display = "none";
});

/* MENU FILTER */
const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".menu-card");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.dataset.filter;

    cards.forEach(card => {
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* CART SYSTEM */
function addToCart(name, price) {
  cart.push({ name, price });
  alert(name + " added to cart 🛒");
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} - $${item.price}</span>
        <button onclick="removeItem(${index})" style="background:red;border:none;color:white;padding:4px 8px;border-radius:6px;cursor:pointer;">X</button>
      </div>
    `;
  });

  cartTotal.textContent = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const fullname = document.getElementById("fullname").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  const orderType = document.querySelector("input[name='type']:checked");

  if (!fullname || !address || !phone || !orderType) {
    alert("Please fill all checkout fields!");
    return;
  }

  alert("Order Successful ✅\nThanks " + fullname + " (" + orderType.value + ")");

  cart = [];
  renderCart();

  document.getElementById("fullname").value = "";
  document.getElementById("address").value = "";
  document.getElementById("phone").value = "";

  cartPopup.style.display = "none";
}

function register() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const pass = document.getElementById("regPass").value;

  if (!name || !email || !pass) {
    alert("Please fill all registration fields!");
    return;
  }

  alert("Welcome " + name + " 🎉 Registration Successful!");

  document.getElementById("regName").value = "";
  document.getElementById("regEmail").value = "";
  document.getElementById("regPass").value = "";

  registerPopup.style.display = "none";
}
const animatedSections = document.querySelectorAll(".scroll-animate");

function revealOnScroll() {
  animatedSections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      section.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

window.addEventListener("scroll", () => {
  const scrollValue = window.scrollY;
  document.querySelector(".hero").style.backgroundPositionY = scrollValue * 0.4 + "px";
});



// Fade in the page smoothly
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});






const sections = document.querySelectorAll('.scroll-animate');

window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100;

    if (sectionTop < triggerPoint) {
      section.classList.add('show');
    }
  });
});