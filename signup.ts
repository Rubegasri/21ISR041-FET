$(document).ready(() => {
    $('#signup-form').submit((event) => {
        event.preventDefault();

        // Get form values
        const username: string = $('#username').val() as string;
        const email: string = $('#email').val() as string;
        const password: string = $('#password').val() as string;

        // Perform AJAX request
        $.ajax({
            url: 'process.php', // PHP script for processing
            type: 'POST',
            data: {
                username: username,
                email: email,
                password: password
            },
            success: (response) => {
                // Redirect to response.php along with the response data and form details
                window.location.href = `response.php?response=${encodeURIComponent(response)}&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
            },
            error: (xhr, status, error) => {
                // Handle errors
                alert('Error occurred while processing your request.');
            }
        });
    });
});
