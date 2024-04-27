document.getElementById('logoutBtn').addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  localStorage.removeItem("session"); // Remove session data
  // window.location.replace("http://192.168.1.5:5500/src/public/login.html"); // Redirect to login page without hash
  window.location.href= "../login.html"
});



function openFileSharing() {
  // Redirect to the file sharing page
  window.location.href = "http://localhost:3000/";
}
// Define the openFileSharing function
function openFileSharing() {
  // Add your code here to handle file sharing functionality
  console.log("File sharing functionality to be implemented...");
}


// Assume this function fetches data from the backend API


// Function to render product cards on the webpage



// Call the function to render products when the page loads
