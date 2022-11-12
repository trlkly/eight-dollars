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

function createSettingsDomNode(items) {
  const settingsDomNode = document.createElement("div");
  settingsDomNode.id = "eight-dollars-settings";
  settingsDomNode.style.display = "none";
  settingsDomNode.innerText = JSON.stringify(items);
  document.body.appendChild(settingsDomNode);
}

function injectScript() {
  const s = document.createElement("script", { id: "eight-dollars" });
  s.src = chrome.runtime.getURL("script.user.js");
  s.onload = function () {
    this.remove();
  };
  document.head.appendChild(s);
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
