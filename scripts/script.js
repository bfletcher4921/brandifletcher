// doc ready f/n
document.addEventListener("DOMContentLoaded", () => {
  console.log ('hello console!')
  setCookie(); 
  greetCookieUser();
  loadBlogPosts(); // Add this line
});

// cookie 
// cookie function to ask user for name
function setCookie() {
  // cookie check
  const existingCookie = getUserNameFromCookie();
  
  if (!existingCookie) {
    // ask user for their name
    const userName = prompt("Welcome! What's your name?");
    
    if (userName && userName.trim() !== "") {
      const d = new Date();
      d.setTime(d.getTime() + (7*24*60*60*1000)); // 7 days
      const expires = "expires=" + d.toUTCString();
      const encodedName = encodeURIComponent(userName.trim());
      document.cookie = `exampleCookie=${encodedName}; ${expires}; path=/`;
      console.log("Cookie set:", document.cookie);
    } else {
      // default if user cancels or enters nothing
      document.cookie = `exampleCookie=Welcome Visitor; path=/`;
    }
  }
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
  const userName = getUserNameFromCookie();
  console.log("user name:", userName);
  
  if (userName) {
    document.getElementById("userGreeting").innerText = `Hello, ${userName}!`;
  } else {
    document.getElementById("userGreeting").innerText = "Hello, Visitor!";
  }
}

// Blog Admin App 
document.getElementById('blogAdminBtn').addEventListener('click', async function() {
  try {
    // fetch data from data server (use raw GitHub URL)
    const response = await fetch('https://raw.githubusercontent.com/bfletcher4921/devBlogData/32f7d3cb15cfe431529bc10ad30e30a0770bc73b/blog-entries.json');
    const blogData = await response.json();
    
    // store data in localStorage for the Blog Admin App
    localStorage.setItem('blogAdminData', JSON.stringify(blogData));
    
    // open Blog Admin App in new tab
    window.open('https://bfletcher4921.github.io/blogAdmin/', '_blank');
    
  } catch (error) {
    console.error('Error fetching blog data:', error);
    // still open the app even if data fetch fails
    window.open('https://bfletcher4921.github.io/blogAdmin/', '_blank');
  }
});

// function to load and display blog posts in Dev Life column
async function loadBlogPosts() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/bfletcher4921/devBlogData/32f7d3cb15cfe431529bc10ad30e30a0770bc73b/blog-entries.json');
    const blogData = await response.json();
    
    // find the Dev Life column container
    const devLifeColumn = document.querySelector('#devLifeCard');
    
    // clear existing blog entries (except header and button)
    const existingEntries = devLifeColumn.querySelectorAll('.blogEntry');
    existingEntries.forEach(entry => entry.remove());
    
    // add new blog posts
    const headerElement = devLifeColumn.querySelector('h2');
    const buttonContainer = devLifeColumn.querySelector('.mt-auto');
    
    blogData.forEach(post => {
      const blogEntry = document.createElement('div');
      blogEntry.className = 'blogEntry m-2 border border-1 rounded border-danger p-2';
      blogEntry.innerHTML = `
        <h3>${post.title}</h3>
        <small class="text-muted">${post.date}</small>
        <p>${post.content}</p>
        <div class="mt-2">
          ${post.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
        </div>
      `;

      // insert before the button container
      devLifeColumn.insertBefore(blogEntry, buttonContainer);
    });
    
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
}

