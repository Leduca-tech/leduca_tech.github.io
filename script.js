document.addEventListener('DOMContentLoaded', () => {
    // Handle amount button selection
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount');

    if (amountButtons) {
        amountButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                amountButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // If custom button is clicked, focus the input
                if (button.classList.contains('custom')) {
                    customAmountInput.focus();
                } else {
                    // Set the amount from the data attribute
                    const amount = button.getAttribute('data-amount');
                    customAmountInput.value = amount;
                }
            });
        });
    }

    // Handle payment method selection
    const paymentButtons = document.querySelectorAll('.payment-btn');
    
    if (paymentButtons) {
        paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                paymentButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    // Handle donation form submission
    const donationForm = document.getElementById('donation-form');
    
    if (donationForm) {
        donationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const amount = customAmountInput.value;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // Validate form
            if (!amount || amount <= 0) {
                alert('Please enter a valid donation amount');
                return;
            }
            
            // Here you would typically send this data to your payment processor
            alert(`Thank you for your donation of $${amount}! We'll send a confirmation email to ${email}.`);
            donationForm.reset();
            amountButtons.forEach(btn => btn.classList.remove('active'));
        });
    }

    // Handle course enrollment buttons
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    
    if (enrollButtons) {
        enrollButtons.forEach(button => {
            button.addEventListener('click', () => {
                const courseName = button.parentElement.querySelector('h3').textContent;
                alert(`Thank you for your interest in ${courseName}! Enrollment details will be sent to your email.`);
            });
        });
    }

    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // This is a simple example. In a real application, you would:
            // 1. Hash the password
            // 2. Send credentials to a secure backend
            // 3. Use proper session management
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'admin.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }

    // Check login status for admin page
    const isAdminPage = window.location.pathname.includes('admin.html');
    if (isAdminPage && localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'login.html';
        });
    }

    // File upload handling
    const uploadForms = document.querySelectorAll('.upload-form');
    if (uploadForms) {
        uploadForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const course = form.getAttribute('data-course');
                const titleInput = document.getElementById(`${course}-title`);
                const descInput = document.getElementById(`${course}-description`);
                const fileInput = document.getElementById(`${course}-file`);
                
                // Validate file
                const file = fileInput.files[0];
                if (!file) {
                    alert('Please select a file to upload');
                    return;
                }

                // Validate file size (100MB max)
                const maxSize = 100 * 1024 * 1024; // 100MB in bytes
                if (file.size > maxSize) {
                    alert('File size exceeds 100MB limit');
                    return;
                }

                // Validate file type
                const allowedTypes = [
                    'application/pdf',
                    'application/vnd.ms-powerpoint',
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/zip'
                ];

                if (!allowedTypes.includes(file.type)) {
                    alert('Invalid file type. Please upload PDF, PPT, PPTX, DOC, DOCX, or ZIP files.');
                    return;
                }

                // In a real application, you would:
                // 1. Create a FormData object
                // 2. Send the file to a secure backend
                // 3. Handle the response
                // This is a simple example that just shows the file in the list
                const filesList = document.getElementById(`${course}-files-list`);
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <div class="file-info">
                        <strong>${titleInput.value}</strong>
                        <p>${descInput.value || 'No description'}</p>
                        <small>File: ${file.name}</small>
                    </div>
                    <div class="file-actions">
                        <button type="button" class="delete-btn">Delete</button>
                    </div>
                `;

                // Add delete functionality
                const deleteBtn = listItem.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', () => {
                    if (confirm('Are you sure you want to delete this file?')) {
                        listItem.remove();
                    }
                });

                filesList.appendChild(listItem);
                form.reset();
                alert('File uploaded successfully!');
            });
        });
    }
}); 