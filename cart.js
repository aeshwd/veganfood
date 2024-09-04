
window.addEventListener('load', () => {
    const video = document.getElementById('background-video');
    if (video) {
        video.volume = 0.2; // Set volume to 20%
    }
});

// Function to update the cart display
function updateCart() {
    const cartItems = document.querySelector('.cart-list');
    cartItems.innerHTML = '';

    let subtotal = 0;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <img src="images/no.gif" alt="Empty Cart">
                <p>No products in the cart</p>
                <a href="index.html" class="start"><button>Start Shopping</button></a>
            </div>
        `;
        document.querySelector('.cart-summary').style.display = 'none'; // Hide cart summary
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <p>${item.name}</p>
            <p class="pr">₹ ${item.price} x 
                <button onclick="decrementQuantity(${item.id})">-</button>
                <span id="quantity-${item.id}">${item.quantity}</span>
                <button onclick="incrementQuantity(${item.id})">+</button>
            </p>
            <p>Total: ₹ ${item.price * item.quantity}</p>
            <button onclick="removeFromCart(${item.id})" class="clear">Remove</button>
        `;
        cartItems.appendChild(cartItem);

        subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.05;
    const del = 29;
    const service = 5;
    const package = 10;
    const total = subtotal + tax + service + del + package;

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('tax').innerText = tax.toFixed(2);
    document.getElementById('del').innerText = del.toFixed(2);
    document.getElementById('service').innerText = service.toFixed(2);
    document.getElementById('package').innerText = package.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);
    document.querySelector('.cart-summary').style.display = 'block'; // Show cart summary
}

// Function to increment product quantity
function incrementQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

// Function to decrement product quantity
function decrementQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

// Function to remove product from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Function to apply coupon and show discount modal
function applyCoupon(coupon) {
    const couponBoxes = document.querySelectorAll('.coupon-box');
    let discount = 0;
    
    couponBoxes.forEach(box => {
        if (box.dataset.coupon === coupon) {
            discount = parseFloat(box.dataset.discount);
            box.querySelector('button').disabled = true; // Disable the button after applying
        } else {
            box.querySelector('button').disabled = false; // Enable other buttons
        }
    });

    if (discount > 0) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        const discountAmount = subtotal * discount;
        const finalSubtotal = subtotal - discountAmount;

        // Update the subtotal with discount
        document.getElementById('subtotal').innerText = finalSubtotal.toFixed(2);

        // Show the modal with discount amount
        showModal(`Congratulations! You have saved ₹ ${discountAmount.toFixed(2)}`);

        // Show remove offer button
        document.querySelector('.remove-offer').style.display = 'block';

        // Store applied coupon
        localStorage.setItem('appliedCoupon', coupon);
    }
}

// Function to remove the applied coupon and revert to original subtotal
function removeOffer() {
    localStorage.removeItem('appliedCoupon'); // Remove the stored coupon
    updateCart(); // Update the cart to reflect the original totals

    // Hide the remove offer button and re-enable all apply buttons
    document.querySelector('.remove-offer').style.display = 'none';
    document.querySelectorAll('.coupon-box button').forEach(button => {
        button.disabled = false;
    });
}

// Function to show discount modal
function showModal(message) {
    const modal = document.getElementById('discountModal');
    const modalMessage = document.getElementById('modal-message');
    const closeBtn = modal.querySelector('.close');

    modalMessage.innerText = message;
    modal.style.display = "block";

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

// Add event listener for DOMContentLoaded to initialize the cart
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});
