// ----------------------------
// Handle Transcribe Buttons
// ----------------------------
const buttons = document.querySelectorAll('.transcribe-btn');
const uploadBox = document.querySelector('.upload-box');
const textContent = document.getElementById('text-content');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'selected' from all buttons
    buttons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');

    const type = button.dataset.type.toLowerCase();

    // Hide default placeholder
    const placeholder = document.getElementById('upload-placeholder');
    if (placeholder) placeholder.style.display = 'none';

    if (type === "text") {
      uploadBox.style.display = 'none';
      textContent.style.display = 'block';
    } else {
      uploadBox.style.display = 'flex';
      textContent.style.display = 'none';

      // Hide all upload-content sections
      document.querySelectorAll('.upload-content').forEach(content => {
        content.style.display = 'none';
      });

      // Show only the selected section
      const selectedContent = document.getElementById(`${type}-content`);
      if (selectedContent) selectedContent.style.display = 'flex';
    }
  });
});

// ----------------------------
// Handle "Browse" links for file input
// ----------------------------
document.querySelectorAll('.upload-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // prevent link navigation
    const inputId = link.dataset.target;
    const fileInput = document.getElementById(inputId);
    if (fileInput) fileInput.click();
  });
});


//----------------
//Handle file selection(video, audio, document)
//----------------

document.querySelectorAll('.file-input').forEach(input => {
  input.addEventListener('change', () =>{
    const file = input.files[0];
    if (!file) return;

    const uploadContent = input.closest('.upload-content') ;
    const preview = uploadContent.querySelector('.file-preview');

    preview.querySelector('.file-name').textContent = file.name;
    preview.querySelector('.file-size').textContent = `(${(file.size / 1024 / 1024).toFixed(2)} MB)`;

    preview.hidden = false;
  });


})


const transcribeBar = document.getElementById('transcribe-bar');

/* -------------------------
   Show / Hide helpers
-------------------------- */
function showTranscribeBar() {
  transcribeBar.hidden = false;       // remove hidden
 
}

function hideTranscribeBar() {
  transcribeBar.hidden = true;       // hide bar
 
}

/* -------------------------
   Check if there’s valid input
-------------------------- */
function hasValidInput() {
  // 1️⃣ Any file selected?
  const fileInputs = document.querySelectorAll('input[type="file"]');
  for (let input of fileInputs) {
    if (input.files && input.files.length > 0) return true;
  }

  // 2️⃣ Any text input filled?
  const textInputs = document.querySelectorAll('input[type="text"]');
  for (let input of textInputs) {
    if (input.value.trim() !== '') return true;
  }

  // 3️⃣ Textarea filled?
  const textArea = document.getElementById('text-input');
  if (textArea && textArea.value.trim() !== '') return true;

  return false;
}

/* -------------------------
   Watch for input changes
-------------------------- */
document.addEventListener('input', () => {
  if (hasValidInput()) {
    showTranscribeBar();
  } else {
    hideTranscribeBar();
  }
});

document.addEventListener('change', () => {
  if (hasValidInput()) {
    showTranscribeBar();
  } else {
    hideTranscribeBar();
  }
});

/* -------------------------
   Ensure hidden on load
-------------------------- */
hideTranscribeBar();
