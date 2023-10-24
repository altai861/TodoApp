fetch('http://localhost:3500/auth/logout', {
    method: 'GET' // Include cookies in the request
  })
.then(response => response.json())
.then(data => {
      // Access the value of the HttpOnly cookie returned by the server
      console.log('Session ID:', data.accessToken);
    })
    .catch(error => {
      console.error('Error:', error);
    });

const loginForm = document.querySelector("#login-form");
