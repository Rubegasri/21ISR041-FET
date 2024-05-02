<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Response Page</title>
</head>
<body>
  
<div>
  <h2>Response</h2>
  <?php
  // Display the response received from process.php
  if (isset($_GET['response'])) {
      echo "<p>" . $_GET['response'] . "</p>";
  } else {
      echo "<p>No response received.</p>";
  }
  
  // Display form details
  if (isset($_GET['username'])) {
      echo "<p>Username: " . htmlspecialchars($_GET['username']) . "</p>";
  }
  if (isset($_GET['email'])) {
      echo "<p>Email: " . htmlspecialchars($_GET['email']) . "</p>";
  }
  if (isset($_GET['password'])) {
      echo "<p>Password: " . htmlspecialchars($_GET['password']) . "</p>";
  }
  ?>
</div>

</body>
</html>
