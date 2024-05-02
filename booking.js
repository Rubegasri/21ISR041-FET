document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("booking-form");
    
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Gather form data
      const formData = new FormData(bookingForm);
      const bookingData = {};
      formData.forEach((value, key) => {
        bookingData[key] = value;
      });
  
      // Get cart items from localStorage
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  
      // Do something with bookingData and cartItems
      console.log("Booking Data:", bookingData);
      console.log("Cart Items:", cartItems);
  
      // Clear cart
      localStorage.removeItem("cart");
      alert("Booking Confirmed! Cart Cleared.");
      window.location.href = "thankyou.html"; // Redirect to thank you page
    });
  });
  