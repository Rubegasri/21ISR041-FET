<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Perform basic validation
    if (empty($username) || empty($email) || empty($password)) {
        // Return an error response if any field is empty
        $response = "All fields are required.";
    } elseif (strlen($password) < 8) {
        // Return an error response if password is less than 8 characters
        $response = "Password should have at least 8 characters.";
    } else {
        // If validation passes, you can process the form data further (for example, save to a database)
        
        // For demonstration purposes, let's just echo a success message
        $response = "Form submitted successfully!";
    }
    
    // Return the response
    echo $response;
} else {
    // If the request method is not POST, return an error response
    echo "Invalid request method.";
}
?>
