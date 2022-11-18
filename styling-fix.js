if (!document.cookie.includes('night_mode=1')) {
  console.log(document.querySelector('meta[name="theme-color"]').content)
  let style = document.createElement('style');
  style.textContent = `[data-eight-dollars-status="verified"] svg { color: black !important; }`
  document.head.appendChild(style);
}

// Requires refresh after changing from day to night mode or vice versa. 
//Still have no idea why this workaround is necessary for usercripts, but not on the extension proper. 
