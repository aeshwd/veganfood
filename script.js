
window.addEventListener('load', () => {
    const video = document.getElementById('background-video');
    if (video) {
        video.volume = 0.2; // Set volume to 20%
    }
});


// Function to show the custom alert modal
function showModal(message) {
    const modal = document.getElementById("custom-alert");
    const modalMessage = document.getElementById("modal-message");
    const closeButton = document.querySelector(".close-btn");

    modalMessage.textContent = message;
    modal.style.display = "block";

    // Close the modal when the close button is clicked
    closeButton.onclick = () => {
        modal.style.display = "none";
    };

    // Close the modal when clicking outside of the modal content
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

// List of products
const products = [
    { id: 1, name: 'Whopper Burger', price: 179, imageUrl: 'images/g1.jpeg' },
    { id: 2, name: 'Baconator', price: 140, imageUrl: 'images/g2.jpeg' },
    { id: 3, name: 'Taco Bell Crunchwrap', price: 200, imageUrl: 'images/g3.jpeg' },
    { id: 4, name: 'Chick-fil-A Chicken SandWitch ', price: 127, imageUrl: 'images/g4.jpeg' },
    { id: 5, name: 'Crunch Wrap Supreme', price: 240, imageUrl: 'images/g5.jpeg' },
    { id: 6, name: 'Pizza Pepperoni (Small) ', price: 345, imageUrl: 'images/g6.jpeg' },
    { id: 7, name: 'Footlong Subway Club', price: 300, imageUrl: 'images/g7.jpeg' },
    { id: 8, name: 'Pizza Pepperoni (Small)', price: 345, imageUrl: 'images/g8.jpeg' },
    { id: 9, name: '2-Topping Pizza (Medium)', price: 630, imageUrl: 'images/g9.jpeg' },
    { id: 10, name: 'Taco Bell Crunchwrap', price: 200, imageUrl: 'images/g10.jpeg' },
    { id: 11, name: 'Chilli Cheese HotDog ', price: 110, imageUrl: 'images/g11.jpeg' },
    { id: 12, name: 'Feta & Egg White Wrap', price: 250, imageUrl: 'images/g12.jpeg' },
    { id: 13, name: 'Burrito (Chicken) ', price: 210, imageUrl: 'images/g13.jpeg' },
    { id: 14, name: 'Chocolate Cake (3 Kg)', price: 2500, imageUrl: 'images/g14.jpeg' },
    { id: 15, name: 'Red Velvet Cake (1 Kg)', price: 670, imageUrl: 'images/g15.jpeg' },
    { id: 16, name: 'CheeseCake (500 gm)', price: 350, imageUrl: 'images/g16.jpeg' },
    { id: 17, name: 'Carrot Cake (500 gm)', price: 700, imageUrl: 'images/g17.jpeg' },
    { id: 18, name: 'Lemon Drizzle Cake (1 Kg)', price: 1200, imageUrl: 'images/g18.jpeg' },
    { id: 19, name: 'ButterScotch Cake (1 Kg)', price: 570, imageUrl: 'images/g19.jpeg' },
    { id: 20, name: 'Big Mac Burger', price: 450, imageUrl: 'images/g20.jpeg' },
];

// Function to add products to the page
function addProducts(filteredProducts) {
    let productList = document.querySelector(".products-list");
    let noProductsMessage = document.querySelector(".no-products");
    productList.innerHTML = "";

    if (filteredProducts.length === 0) {
        noProductsMessage.style.display = "block";
    } else {
        noProductsMessage.style.display = "none";
        filteredProducts.forEach(product => {
            let productItem = document.createElement("div");
            productItem.classList.add("product-item");

            productItem.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">₹ ${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>`;

            productList.appendChild(productItem);
        });
    }
}

// Function to handle search
function searchProducts() {
    let searchValue = document.getElementById("search-bar").value.toLowerCase();
    let filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    );
    addProducts(filteredProducts);
}

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Show custom alert modal
    showModal("Item has been added to Cart");
}

// Add products on page load
document.addEventListener("DOMContentLoaded", () => {
    addProducts(products);
    document.getElementById("search-bar").addEventListener("input", searchProducts);
});




/* JS without search Bar

// List of products
const products = [
    { id: 1, name: 'Whopper Burger', price: 179, imageUrl: 'images/g1.jpeg' },
    { id: 2, name: 'Baconator', price: 140, imageUrl: 'images/g2.jpeg' },
    { id: 3, name: 'Taco Bell Crunchwrap', price: 200, imageUrl: 'images/g3.jpeg' },
    { id: 4, name: 'Chick-fil-A Chicken SandWitch ', price: 127, imageUrl: 'images/g4.jpeg' },
    { id: 5, name: 'Crunch Wrap Supreme', price: 240, imageUrl: 'images/g5.jpeg' },
    { id: 6, name: 'Pizza Pepperoni (Small) ', price: 345, imageUrl: 'images/g6.jpeg' },
    { id: 7, name: 'Footlong Subway Club', price: 300, imageUrl: 'images/g7.jpeg' },
    { id: 8, name: 'Pizza Pepperoni (Small)', price: 345, imageUrl: 'images/g8.jpeg' },
    { id: 9, name: '2-Topping Pizza (Medium)', price: 630, imageUrl: 'images/g9.jpeg' },
    { id: 10, name: 'Taco Bell Crunchwrap', price: 200, imageUrl: 'images/g10.jpeg' },
    { id: 11, name: 'Chilli Cheese HotDog ', price: 110, imageUrl: 'images/g11.jpeg' },
    { id: 12, name: 'Feta & Egg White Wrap', price: 250, imageUrl: 'images/g12.jpeg' },
    { id: 13, name: 'Burrito (Chicken) ', price: 210, imageUrl: 'images/g13.jpeg' },
    { id: 14, name: 'Chocolate Cake (3 Kg)', price: 2500, imageUrl: 'images/g14.jpeg' },
    { id: 15, name: 'Red Velvet Cake (1 Kg)', price: 670, imageUrl: 'images/g15.jpeg' },
    { id: 16, name: 'CheeseCake (500 gm)', price: 350, imageUrl: 'images/g16.jpeg' },
    { id: 17, name: 'Carrot Cake (500 gm)', price: 700, imageUrl: 'images/g17.jpeg' },
    { id: 18, name: 'Lemon Drizzle Cake (1 Kg)', price: 1200, imageUrl: 'images/g18.jpeg' },
    { id: 19, name: 'ButterScotch Cake (1 Kg)', price: 570, imageUrl: 'images/g19.jpeg' },
    { id: 20, name: 'Big Mac Burger', price: 450, imageUrl: 'images/g20.jpeg' },
];

// Function to add a product to the cart

function addToCart(productId){
    const product = products.find(p => p.id === productId);
    if(!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === productId);
    alert("Item has been added to Cart");

    if(cartItem){
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add products in the page 

function addProducts() {
    let productList = document.querySelector(".products-list");
    productList.innerHTML = "";


    products.forEach(product => {
    let productItem = document.createElement("div");
    productItem.classList.add("product-item");

    productItem.innerHTML = `
     <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">₹ ${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>`;
    

            productList.appendChild(productItem);

    });

};

document.addEventListener("DOMContentLoaded", () => {
    addProducts();
})  */