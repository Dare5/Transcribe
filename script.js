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
