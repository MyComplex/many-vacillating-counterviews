const handleLogonForm = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#logon-username').value.trim();
    const password = document.querySelector('#logon-password').value.trim();

    if (username && password) {
        const response = await fetch('/api/user/logon', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('A log on failure has occured.');
        }
    }
};

const handleSignupForm = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if (username && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('A sign up failure has occurred.');
        }
    }
};

document.querySelector('.logon-form').addEventListener('submit', handleLogonForm);

document.querySelector('.signup-form').addEventListener('submit', handleSignupForm);
