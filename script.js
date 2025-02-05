document.addEventListener('DOMContentLoaded', function() {
    displayWelcomeMessage();
});

function displayWelcomeMessage() {
    alert('Welcome to GDG Productions!');
}

function handleFormSubmission(event) {
    event.preventDefault();
    // Add form submission handling logic here
    alert('Form submitted successfully!');
}
