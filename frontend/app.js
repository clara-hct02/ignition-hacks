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
    const credits = getCredits();
    if (credits < 2) {
        alert('Not enough credits. Give feedback to others to earn more!');
        return;
    }

    updateCredits(-2); // -2 credit for upload
    
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
    alert('Image uploaded! You now have ' + getCredits() + ' credits');
});

let currentComment = '';

document.querySelector('.send-btn')?.addEventListener('click', function() {
  const textarea = document.querySelector('.feedback-input');
  if (textarea && textarea.value.trim()) {
    currentComment = textarea.value;
    textarea.value = '';
    displayComment();
  }
  handleCommentSubmit();
});

function displayComment() {
  const commentBox = document.querySelector('.comment-display');
  commentBox.innerHTML = `
    <div class="comment-item">
        <strong>Feedback:</strong>
      <p>${currentComment}</p>
    </div>
  `;
}

const getCredits = () => {
  const stored = localStorage.getItem('userCredits');
  return stored ? parseInt(stored) : 2;
};

const updateCredits = (amount) => {
  const current = getCredits();
  const newAmount = current + amount;
  localStorage.setItem('userCredits', newAmount);
  displayCredits();
  return newAmount;
};

const handleCommentSubmit = async () => {
  const newCredits = updateCredits(1);
  alert(`Feedback sent! You earned 1 credit. (Total: ${newCredits})`);
};


const displayCredits = () => {
    const credits = localStorage.getItem('userCredits') || 2;
    document.getElementById('credit-display').textContent = `Credits: ${credits}`;
  };
  
displayCredits();