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

    // Reset error messages
    document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => input.classList.remove('invalid'));

    // Validation flags
    let isValid = true;

    // Validate Name
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name) {
        displayError('name-error', 'Name is required.');
        markInvalid('name');
        isValid = false;
    } else if (name.length < 2 || name.length > 50) {
        displayError('name-error', 'Name must be between 2 and 50 characters.');
        markInvalid('name');
        isValid = false;
    } else if (!nameRegex.test(name)) {
        displayError('name-error', 'Name can only contain letters and spaces.');
        markInvalid('name');
        isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        displayError('email-error', 'Email is required.');
        markInvalid('email');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        displayError('email-error', 'Please enter a valid email address.');
        markInvalid('email');
        isValid = false;
    }

    // Validate Phone
    const phoneRegex = /^(\+\d{10,14}|\d{10})$/;
    if (!phone) {
        displayError('phone-error', 'Phone number is required.');
        markInvalid('phone');
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        displayError('phone-error', 'Please enter a valid phone number (e.g., +919876543210 or 9876543210).');
        markInvalid('phone');
        isValid = false;
    }

    // Validate Estimated Guest Count
    const guestCountRegex = /^\d+$/;
    if (!guestCount) {
        displayError('guest-count-error', 'Estimated guest count is required.');
        markInvalid('guest-count');
        isValid = false;
    } else if (!guestCountRegex.test(guestCount) || parseInt(guestCount) <= 0) {
        displayError('guest-count-error', 'Please enter a valid positive number for guest count.');
        markInvalid('guest-count');
        isValid = false;
    }

    // Validate Event Details
    if (!eventDetails) {
        displayError('event-details-error', 'Event details are required.');
        markInvalid('event-details');
        isValid = false;
    } else if (eventDetails.length < 10 || eventDetails.length > 500) {
        displayError('event-details-error', 'Event details must be between 10 and 500 characters.');
        markInvalid('event-details');
        isValid = false;
    }

    // Validate Location
    const locationRegex = /^[A-Za-z0-9\s,.-]+$/;
    if (!location) {
        displayError('location-error', 'Location is required.');
        markInvalid('location');
        isValid = false;
    } else if (location.length < 3 || location.length > 100) {
        displayError('location-error', 'Location must be between 3 and 100 characters.');
        markInvalid('location');
        isValid = false;
    } else if (!locationRegex.test(location)) {
        displayError('location-error', 'Location can only contain letters, numbers, spaces, commas, periods, and hyphens.');
        markInvalid('location');
        isValid = false;
    }

    // Validate Service
    if (!service) {
        displayError('service-error', 'Please select a service.');
        isValid = false;
    }

    // Validate Budget (optional)
    if (budget) {
        const budgetRegex = /^[0-9,]+$/;
        if (budget.length > 20) {
            displayError('budget-error', 'Budget must not exceed 20 characters.');
            markInvalid('budget');
            isValid = false;
        } else if (!budgetRegex.test(budget)) {
            displayError('budget-error', 'Budget must be a valid number (e.g., 150000 or 1,50,000).');
            markInvalid('budget');
            isValid = false;
        } else {
            const budgetValue = parseFloat(budget.replace(/,/g, ''));
            if (budgetValue <= 0) {
                displayError('budget-error', 'Budget must be a positive number.');
                markInvalid('budget');
                isValid = false;
            }
        }
    }

    // If validation fails, stop here
    if (!isValid) {
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

// Helper function to display error messages
function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

// Helper function to mark a field as invalid
function markInvalid(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.add('invalid');
}