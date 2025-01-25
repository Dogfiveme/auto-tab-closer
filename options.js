const urlList = document.getElementById('urlList');
const newUrlInput = document.getElementById('newUrl');
const addUrlButton = document.getElementById('addUrl');

// Function to load and display blocked URLs
function loadBlockedUrls() {
  browser.storage.sync.get('blockedUrls').then((data) => {
    const blockedUrls = data.blockedUrls || [];
    blockedUrls.forEach((url) => addUrlToList(url));
  }).catch(console.error);
}

// Function to add URL to the visible list
function addUrlToList(url) {
  const li = document.createElement('li');
  li.textContent = url;

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    browser.storage.sync.get('blockedUrls').then((data) => {
      const blockedUrls = data.blockedUrls || [];
      const updatedUrls = blockedUrls.filter((blockedUrl) => blockedUrl !== url);
      browser.storage.sync.set({ blockedUrls: updatedUrls });
      li.remove();
    }).catch(console.error);
  });

  li.appendChild(removeButton);
  urlList.appendChild(li);
}

// Add a new URL to storage and display
addUrlButton.addEventListener('click', () => {
  const newUrl = newUrlInput.value.trim();
  if (newUrl) {
    browser.storage.sync.get('blockedUrls').then((data) => {
      const blockedUrls = data.blockedUrls || [];
      if (!blockedUrls.includes(newUrl)) {
        blockedUrls.push(newUrl);
        browser.storage.sync.set({ blockedUrls });
        addUrlToList(newUrl);
        newUrlInput.value = '';
      }
    }).catch(console.error);
  }
});

// Initialize by loading existing blocked URLs
loadBlockedUrls();
