function handleSubmit(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get all required fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const guestCount = document.getElementById('guest-count').value.trim();
    const eventDetails = document.getElementById('event-details').value.trim();
    const location = document.getElementById('location').value.trim();
    const service = document.querySelector('input[name="service"]:checked'); // Check if a radio button is selected

    // Validate all required fields
    if (!name || !email || !phone || !guestCount || !eventDetails || !location || !service) {
        alert('Please fill out all required fields.');
        return;
    }

    // If all required fields are filled, show success message and reset the form
    alert(`Thank you, ${name}! Your message has been sent.`);
    document.getElementById('contactForm').reset(); // Clear the form
}