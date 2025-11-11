/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
navToggle.addEventListener('click', () =>{
   navMenu.classList.add('show-menu')
})

/* Menu hidden */
navClose.addEventListener('click', () =>{
   navMenu.classList.remove('show-menu')
})

/*=============== SEARCH ===============*/
const search = document.getElementById('search'),
      searchBtn = document.getElementById('search-btn'),
      searchClose = document.getElementById('search-close')

/* Search show */
searchBtn.addEventListener('click', () =>{
   search.classList.add('show-search')
})

/* Search hidden */
searchClose.addEventListener('click', () =>{
   search.classList.remove('show-search')
})

/*=============== LOGIN ===============*/
const login = document.getElementById('login'),
      loginBtn = document.getElementById('login-btn'),
      loginClose = document.getElementById('login-close')

/* Login show */
loginBtn.addEventListener('click', () =>{
   login.classList.add('show-login')
})

/* Login hidden */
loginClose.addEventListener('click', () =>{
   login.classList.remove('show-login')
})

// ================Carousel ============================
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};


// ================== Card =================================================
// const addToCartBtn = document.getElementById("addToCart");
// const cartCountEl = document.getElementById("cartCount");
// const productImg = document.getElementById("productImg");
// const cartt = document.querySelector(".cart");
// let count = 0;

// addToCartBtn.addEventListener("click", () => {
//   // Clone image
//   const rect = productImg.getBoundingClientRect();
//   const flyImg = productImg.cloneNode(true);
//   flyImg.classList.add("fly");
//   flyImg.style.left = rect.left + "px";
//   flyImg.style.top = rect.top + "px";
//   flyImg.style.width = rect.width + "px";
//   flyImg.style.height = rect.height + "px";
//   document.body.appendChild(flyImg);

//   // Target position (cart)
//   const cartRect = cart.getBoundingClientRect();
//   const xMove = cartRect.left - rect.left;
//   const yMove = cartRect.top - rect.top;

//   requestAnimationFrame(() => {
//     flyImg.style.transform = `translate(${xMove}px, ${yMove}px) scale(0.2)`;
//     flyImg.style.opacity = "0.3";
//   });

//   // Remove clone + increment count
//   setTimeout(() => {
//     flyImg.remove();
//     count++;
//     cartCountEl.textContent = count;
//     cart.animate([
//       { transform: "scale(1)" },
//       { transform: "scale(1.15)" },
//       { transform: "scale(1)" }
//     ], { duration: 400 });
//   }, 800);
// });


// ============= Add to Cart ==================================================

// ======== new add to cart =======


const cartBtn = document.getElementById('cart-btn');
const cart = document.getElementById('cartt');
const cartClose = document.getElementById('cart-close');
const cartContent = document.getElementById('cart-content');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// 🛒 Toggle Cart Sidebar (safe check)
if (cartBtn) {
  cartBtn.addEventListener('click', () => cart.classList.toggle('active'));
}
if (cartClose) {
  cartClose.addEventListener('click', () => cart.classList.remove('active'));
}

// 🧮 Update Cart UI
function updateCart() {
  cartContent.innerHTML = '';
  let total = 0, itemCount = 0;

  cartItems.forEach((item, index) => {
    total += item.price * item.quantity;
    itemCount += item.quantity;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.img}" alt="">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span>$${item.price.toFixed(2)}</span>
        <div class="quantity-box">
          <button class="decrease" data-index="${index}">−</button>
          <span>${item.quantity}</span>
          <button class="increase" data-index="${index}">+</button>
        </div>
      </div>
      <i class="ri-delete-bin-6-line remove-btn" data-index="${index}"></i>
    `;
    cartContent.appendChild(cartItem);
  });

  cartTotal.innerText = total.toFixed(2);
  if (cartCount) cartCount.innerText = itemCount;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateButtonStates();
}

// ♻️ Update Add/Remove Button on Product Cards
function updateButtonStates() {
  document.querySelectorAll('.productt-card').forEach(card => {
    const name = card.querySelector('h3').innerText;
    const btn = card.querySelector('.add-cart');
    const inCart = cartItems.some(item => item.name === name);

    if (inCart) {
      btn.innerText = 'Remove';
      btn.classList.add('remove-from-cart');
    } else {
      btn.innerText = 'Add to Cart';
      btn.classList.remove('remove-from-cart');
    }
  });
}

// ⚡ Event Delegation for All Clicks
document.addEventListener('click', (e) => {
  // Add / Remove from product card
  if (e.target.classList.contains('add-cart')) {
    const card = e.target.closest('.productt-card');
    if (!card) return;

    const name = card.querySelector('h3').innerText;
    const price = parseFloat(card.querySelector('.price').innerText.replace('$', ''));
    const img = card.querySelector('img').src;

    const idx = cartItems.findIndex(item => item.name === name);
    if (idx === -1) {
      cartItems.push({ name, price, img, quantity: 1 });
    } else {
      cartItems.splice(idx, 1);
    }

    updateCart();
  }

  // Remove from cart sidebar
  if (e.target.classList.contains('remove-btn')) {
    const idx = e.target.dataset.index;
    cartItems.splice(idx, 1);
    updateCart();
  }

  // Increase quantity
  if (e.target.classList.contains('increase')) {
    const idx = e.target.dataset.index;
    cartItems[idx].quantity++;
    updateCart();
  }

  // Decrease quantity
  if (e.target.classList.contains('decrease')) {
    const idx = e.target.dataset.index;
    if (cartItems[idx].quantity > 1) {
      cartItems[idx].quantity--;
    } else {
      cartItems.splice(idx, 1);
    }
    updateCart();
  }
});

// 🚀 Initialize Cart
updateCart();









