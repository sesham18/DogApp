import {sendAuthState, getAuthState, authUrl} from './index.js';

// load container
$('.container').show();
$('#login-error').hide();

$('#loginbutton').on('click', function() {
    if ($('#email').val() == 'admin@doggone.org' && $('#password').val() == 'dogpw0') {
        $('#login-error').hide();
        getAuthState().then(data => {
            if (!data) {
                sendAuthState(true).then(console.log('Now authenticated...'));
                window.location = 'index.html';
            } else {
                window.location = 'index.html';
            }
        });
        return false;    // protect against random reloads
    } else {
        $('#login-error').show();
        console.log('Incorrect!');
        return false; 
    }
})

$('#button-signout').on('click', function() {
    sendAuthState(false).then(resp => {window.location = 'index.html'});
})
