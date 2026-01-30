// js/register.js

document.addEventListener('DOMContentLoaded', function() {
    // User type selection
    const typeOptions = document.querySelectorAll('.type-option');
    const userTypeInput = document.getElementById('user-type');
    
    typeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            typeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update hidden input value
            const type = this.getAttribute('data-type');
            userTypeInput.value = type;
            
            // Show/hide relevant fields
            toggleFormFields(type);
        });
    });
    
    // Toggle form fields based on user type
    function toggleFormFields(type) {
        const businessFields = document.querySelectorAll('.business-field');
        const farmerFields = document.querySelectorAll('.farmer-field');
        
        if (type === 'farmer') {
            businessFields.forEach(field => field.classList.add('hidden'));
            farmerFields.forEach(field => field.classList.remove('hidden'));
        } else {
            businessFields.forEach(field => field.classList.remove('hidden'));
            farmerFields.forEach(field => field.classList.add('hidden'));
        }
    }
    
    // Password strength checker
    const passwordInput = document.getElementById('password');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    
    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            let color = '';
            let text = '';
            
            // Check password length
            if (password.length >= 8) strength += 25;
            
            // Check for lowercase letters
            if (/[a-z]/.test(password)) strength += 25;
            
            // Check for uppercase letters
            if (/[A-Z]/.test(password)) strength += 25;
            
            // Check for numbers
            if (/[0-9]/.test(password)) strength += 25;
            
            // Update strength bar and text
            strengthBar.style.width = strength + '%';
            
            if (strength < 50) {
                color = 'var(--error)';
                text = 'Weak';
            } else if (strength < 75) {
                color = 'var(--warning)';
                text = 'Fair';
            } else {
                color = 'var(--primary-green)';
                text = 'Strong';
            }
            
            strengthBar.style.backgroundColor = color;
            strengthText.textContent = text;
            strengthText.style.color = color;
        });
    }
    
    // Form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm(this)) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Check if passwords match
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Check if terms are accepted
            const termsAccepted = document.querySelector('input[name="terms"]').checked;
            if (!termsAccepted) {
                alert('Please accept the Terms of Service and Privacy Policy');
                return;
            }
            
            // In a real app, you would send this to a server
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            console.log('Registration data:', data);
            
            // Save user data to localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = {
                email: data.email,
                password: data.password, // In real app, hash this
                role: data['user-type'],
                name: data['first-name'] + ' ' + data['last-name'],
                phone: data.phone,
                location: data.location,
                businessName: data['business-name'] || '',
                farmSize: data['farm-size'] || '',
                createdAt: new Date().toISOString()
            };
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Set current user
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');
            
            // Simulate successful registration
            alert('Registration successful! Redirecting to dashboard...');
            
            // Redirect based on role
            redirectToDashboard(data['user-type']);
        });
    }
    
    // Helper function from main.js
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--error)';
            } else {
                input.style.borderColor = '';
            }
        });
        
        return isValid;
    }
    
    function redirectToDashboard(role) {
        switch(role) {
            case 'farmer':
                window.location.href = 'farmer-dashboard.html';
                break;
            case 'seller':
                window.location.href = 'seller-dashboard.html';
                break;
            case 'buyer':
                window.location.href = 'buyer-dashboard.html';
                break;
            case 'logistics':
                window.location.href = 'logistics-dashboard.html';
                break;
            case 'storage':
                window.location.href = 'storage-dashboard.html';
                break;
            default:
                window.location.href = 'marketplace.html';
        }
    }
});