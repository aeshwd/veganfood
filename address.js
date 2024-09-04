window.addEventListener('load', () => {
    const video = document.getElementById('background-video');
    if (video) {
        video.volume = 0.2; // Set volume to 20%
    }
});

document.getElementById('address-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const address = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        phone: document.getElementById('phone').value
    };
    
    localStorage.setItem('address', JSON.stringify(address));
    window.location.href = 'payment.html'; // Redirect to payment page
});
