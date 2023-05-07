const defaultConfig = {
  memeMode: false,
  textEnabled: true,
  removeBlueVerification: false,
  textOptions: {
    verifiedLabel: "Verified",
    twitterBlueLabel: "Paid",
    enableBorder: true,
  },
};

async function loadVerifiedUsers() {
  const url = chrome.runtime.getURL("data/verified.txt");
  const response = await fetch(url);
  const text = await response.text();
  return text.split("\n");
}

function createSettingsDomNode(items) {
  const settingsDomNode = document.createElement("div");
  settingsDomNode.id = "eight-dollars-settings";
  settingsDomNode.style.display = "none";
  settingsDomNode.innerText = JSON.stringify(items);
  document.body.appendChild(settingsDomNode);
}

function injectScript() {
  const s = document.createElement("script", { id: "eight-dollars" });
  s.src = chrome.runtime.getURL("script.js");
  s.onload = function () {
    this.remove();
  };
  document.head.appendChild(s);
}

function injectVerifiedUsers(verifiedUsers) {
  const verifiedUsersDomNode = document.createElement("div");
  verifiedUsersDomNode.id = "eight-dollars-verified-users";
  verifiedUsersDomNode.style.display = "none";
  verifiedUsersDomNode.innerText = JSON.stringify(verifiedUsers);
  document.body.appendChild(verifiedUsersDomNode);
}

if (typeof GM_info !== "undefined" || typeof GM !== "undefined") {
  createSettingsDomNode(defaultConfig);
} else if (typeof chrome !== "undefined" && chrome.storage) {
  chrome.storage.local.get(defaultConfig, function (items) {
    createSettingsDomNode(items);
    injectScript();
  });
} else {
  createSettingsDomNode(defaultConfig);
  injectScript();
}
