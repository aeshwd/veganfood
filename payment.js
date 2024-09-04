
window.addEventListener('load', () => {
    const video = document.getElementById('background-video');
    if (video) {
        video.volume = 0.2; // Set volume to 20%
    }
});


document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const paymentMethod = document.getElementById('payment-method').value;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const address = JSON.parse(localStorage.getItem('address')) || {};
    
    if (!cart.length || !Object.keys(address).length) {
        alert('Please make sure you have items in your cart and address details provided.');
        return;
    }
    
    // Create an order object
    const order = {
        cart,
        address,
        paymentMethod,
        orderDate: new Date().toISOString()
    };
    
    // Store the order details in localStorage (or send it to your server)
    localStorage.setItem('order', JSON.stringify(order));
    
    // Redirect to a confirmation page or display a confirmation message
    window.location.href = 'success.html'; // Redirect to order confirmation page
});
