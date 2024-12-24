document.addEventListener("DOMContentLoaded", () => {
    function getQueryParam(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    }
    
    // Setting Account
    if (getQueryParam('niawebUpdateFailed') === 'true') {
        Swal.fire({
            icon: 'error',
            title: 'Change failed!',
            text: 'You change failed!',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('niawebUpdateSuccess') === 'true') {
        Swal.fire({
            icon: 'success',
            title: 'Change successfully!',
            text: 'You change successfully!',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('niawebPasswordIncorrect') === 'true') {
        Swal.fire({
            icon: 'error',
            title: 'Password incorrect!',
            text: '',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('niawebUpdateSuccess') === 'true') {
        Swal.fire({
            icon: 'success',
            title: 'Change name successfully!',
            text: 'You change name successfully!',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('niawebUpdateSuccess') === 'true') {
        Swal.fire({
            icon: 'success',
            title: 'Change name successfully!',
            text: 'You change name successfully!',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('niawebEmailExists') === 'true') {
        Swal.fire({
            icon: 'error',
            title: 'Email already exists!',
            text: '',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    
    // Logout
    if (getQueryParam('logoutByWebSuccess') === 'true') {
        Swal.fire({
            icon: 'success',
            title: 'Logout Success!',
            text: 'You logged out successfully!',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('logoutByWebFailed') === 'true') {
        Swal.fire({
            icon: 'error',
            title: 'Logout Failed!',
            text: 'You logged out failed!',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    
    // Login
    if (getQueryParam('niawebLoginSuccess') === 'true') {
        Swal.fire({
            icon: 'success',
            title: 'Login Success!',
            text: 'You logged in successfully!',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('niawebLoginError') === 'true') {
        Swal.fire({
            icon: 'error',
            title: 'Login Error!',
            text: 'Check your email or password!',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('niawebUserNotFound') === 'true') {
        Swal.fire({
            icon: 'error',
            title: 'Login Error!',
            text: 'User not found in database!',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    
    // Register
    if (getQueryParam('niawebEmailOrNameExists') === 'true') {
        Swal.fire({
            icon: 'error',
            title: 'Register Error!',
            text: 'Email or name exists!',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('niawebPasswordNot4') === 'true') {
        Swal.fire({
            icon: 'error',
            title: 'Register Error!',
            text: 'Password must be longer than 4 characters!',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('niawebPasswordNotMatch') === 'true') {
        Swal.fire({
            icon: 'error',
            title: 'Register Error!',
            text: 'Password is not match. Check your password and confirm password!',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('niawebRegisterSuccess') === 'true') {
        Swal.fire({
            icon: 'success',
            title: 'Register Success!',
            text: 'Registration successfully. You can login.',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    
    // Send Email
    if (getQueryParam('niawebSendMailSuccess') === 'true') {
        Swal.fire({
            icon: 'success',
            title: 'Send Mail Success!',
            text: 'You send mail to admin successfully.',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('niawebSendMailFailed') === 'true') {
        Swal.fire({
            icon: 'error',
            title: 'Send Mail Failed!',
            text: 'You send mail to admin failed!',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    
    // admin
    if (getQueryParam('niawebAdmin') === 'true') {
        Swal.fire({
            icon: 'success',
            title: 'Go to admin page success!',
            text: '',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('niawebNoAdmin') === 'true') {
        Swal.fire({
            icon: 'error',
            title: "This page doesn't actually exist!",
            text: '',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('niawebAddVSuccess') === 'true') {
        Swal.fire({
            icon: 'success',
            title: 'Add video success',
            text: '',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('niawebAddVFailed') === 'true') {
        Swal.fire({
            icon: 'error',
            title: 'Add video failed',
            text: '',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('niawebDeleteFailed') === 'true') {
        Swal.fire({
            icon: 'error',
            title: 'Delete video failed',
            text: '',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
    if (getQueryParam('niawebDeleteSuccess') === 'true') {
        Swal.fire({
            icon: 'success',
            title: 'Delete video success',
            text: '',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        });
    }
});
