const matchButton = document.querySelector('.match-btn');
const artworkImage = document.querySelector('.artwork-display');

if (matchButton && artworkImage) {
    matchButton.addEventListener('click', async () => {
        // 1. Tell backend to find a new art piece
        const response = await fetch('http://localhost:5000/api/artworks/random');
        const nextArt = await response.json();

        // 2. Update the image source on your UI screen dynamically
        artworkImage.src = nextArt.imageUrl;
    });
}

const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('myFile');

uploadBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', async () => {
  const file = fileInput.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64 = e.target.result;

    document.getElementById('artwork-display').innerHTML = `<img src="${base64}" alt="preview">`;
    
    const response = await fetch('/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64 })
    });
    
    const result = await response.json();
    console.log('Uploaded!', result);
  };
  reader.readAsDataURL(file);
});