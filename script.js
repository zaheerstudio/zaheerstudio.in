function handleSubmit(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get all form fields
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);

    // Get individual field values
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const phone = formData.get('phone').trim();
    const guestCount = formData.get('guest-count').trim();
    const eventDetails = formData.get('event-details').trim();
    const location = formData.get('location').trim();
    const service = formData.get('service');
    const budget = formData.get('budget').trim();

    // Validate all required fields
    if (!name || !email || !phone || !guestCount || !eventDetails || !location || !service) {
        alert('Please fill out all required fields.');
        return;
    }

    // Prepare the data to send via EmailJS
    const data = {
        name,
        email,
        phone,
        guestCount,
        eventDetails,
        location,
        service,
        budget: budget || 'Not provided'
    };

    // Send the email using EmailJS
    emailjs.send('service_e36pr3j', 'template_ntve0cu', data)
        .then(() => {
            alert(`Thank you, ${name}! Your message has been sent.`);
            form.reset(); // Clear the form
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again later or contact us directly.');
        });
}