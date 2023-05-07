async function loadVerifiedUsers() {
  const text = GM_getResourceText('verified.txt')
  return text.split("\n");
}

function injectVerifiedUsers(verifiedUsers) {
  const verifiedUsersDomNode = document.createElement("div");
  verifiedUsersDomNode.id = "eight-dollars-verified-users";
  verifiedUsersDomNode.style.display = "none";
  verifiedUsersDomNode.innerText = JSON.stringify(verifiedUsers);
  document.body.appendChild(verifiedUsersDomNode);
}

const verifiedUserList = await loadVerifiedUsers();
if (typeof GM_info !== "undefined" || typeof GM !== "undefined") {
  createSettingsDomNode(defaultConfig);
  injectVerifiedUsers(verifiedUserList);
}
