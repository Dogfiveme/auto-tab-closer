const DEFAULT_URLS = ["https://example.com"]; // Default URLs to block
let blockedUrls = [...DEFAULT_URLS]; // Initialize with default URLs

// Load blocked URLs from storage or use defaults
browser.storage.sync.get("blockedUrls").then((data) => {
  if (data.blockedUrls) {
    blockedUrls = data.blockedUrls;
  }
}).catch(console.error);

// Listen for tab updates and close matching tabs
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && blockedUrls.some((url) => changeInfo.url.includes(url))) {
    browser.tabs.remove(tabId).catch(console.error);
  }
});

// Listen for new tabs and close matching tabs
browser.tabs.onCreated.addListener((tab) => {
  if (tab.url && blockedUrls.some((url) => tab.url.includes(url))) {
    browser.tabs.remove(tab.id).catch(console.error);
  }
});

// Update blocked URLs when changed in settings
browser.storage.onChanged.addListener((changes) => {
  if (changes.blockedUrls) {
    blockedUrls = changes.blockedUrls.newValue;
  }
});
