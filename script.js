const buttons = document.querySelectorAll('.transcribe-btn');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove selected from all buttons
    buttons.forEach(btn => btn.classList.remove('selected'));
    // Add selected to the clicked button
    button.classList.add('selected');
  });
});
