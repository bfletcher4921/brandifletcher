// doc ready f/n
document.addEventListener("DOMContentLoaded", () => {
  console.log ('hello console!')
  setCookie(); 
  greetCookieUser(); 
});

// cookie 
function setCookie() {
  // const d = new Date();
  // d.setTime(d.getTime() + (7*24*60*60*1000));
  // const expires = "expires=" + d.toUTCString();
  // const userName = encodeURIComponent("John Doe");
  document.cookie = `exampleCookie=Welcome Visitor; path=/`;
  console.log("Cookie set:", document.cookie);
}

function getUserNameFromCookie() {
  const match = document.cookie.match(/exampleCookie=([^;]+)/);
  if (match) {
    const decoded = decodeURIComponent(match[1]);
    console.log("User name from cookie:", decoded);
    return decoded;
  }
  console.log("User name not found in cookie.");
  return null;
}

function greetCookieUser() {
  //get the cookie
  const userName = getUserNameFromCookie();
  console.log("user name:", userName)
  //say heloo 
  document.getElementById("userGreeting").innerText = "Hello, " + userName + "!";
}




//comment

