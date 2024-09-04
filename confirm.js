window.addEventListener('load', () => {
    const video = document.getElementById('background');
    if (video) {
        video.volume = 3.5; // Set volume to 20%
    }
});


function goHome() {
    localStorage.removeItem('cart'); // Clear cart after order
    localStorage.removeItem('address'); // Clear address details
    localStorage.removeItem('order'); // Clear order details
}


