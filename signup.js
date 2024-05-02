$(document).ready(function () {
    $('#signup-form').submit(function (event) {
        event.preventDefault();
        // Get form values
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        // Perform AJAX request
        $.ajax({
            url: 'process.php', // PHP script for processing
            type: 'POST',
            data: {
                username: username,
                email: email,
                password: password
            },
            success: function (response) {
                // Redirect to response.php along with the response data and form details
                window.location.href = "response.php?response=".concat(encodeURIComponent(response), "&username=").concat(encodeURIComponent(username), "&email=").concat(encodeURIComponent(email), "&password=").concat(encodeURIComponent(password));
            },
            error: function (xhr, status, error) {
                // Handle errors
                alert('Error occurred while processing your request.');
            }
        });
    });
});
