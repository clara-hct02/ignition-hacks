const matchButton = document.querySelector('.match-btn');
const artworkImage = document.querySelector('.artwork-display');

matchButton.addEventListener('click', async () => {
    // 1. Tell backend to find a new art piece
    const response = await fetch('http://localhost:5000/api/artworks/random');
    const nextArt = await response.json();
    
    // 2. Update the image source on your UI screen dynamically
    artworkImage.src = nextArt.imageUrl; 
});