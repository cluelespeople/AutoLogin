function waitForElm(selector) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }
      
      const observer = new MutationObserver((mutations) => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }
  
  waitForElm(".button").then((elm) => {
    chrome.storage.sync.get("username", ({ username }) => {
      document.getElementById('credentials').children[0].style='background-color: rgb(35, 50, 68 , .8);';
      document.getElementById('credentials').children[1].style='background-color: rgb(35, 50, 68 , .8);';
      document.getElementById("username").value = username;
    });
    
    
    chrome.storage.sync.get("password", ({ password }) => {
      document.getElementById("password").value = password;
    });
    
    document.getElementById("signin-caption").style.display = "none";
    setTimeout(function(){
      document.getElementById("loginbutton").click();
    },300)
  });
  document.getElementsByClassName('message')[0].style="color:#ffffff;"
  document.getElementsByClassName('login-icon')[0].remove();
  document.getElementById("loggedin-message").style="height:7em;"
  document.getElementById('statusmessage').style='color:#ffffff'
  // Uncomment the below code if value of customusername is set manually.
  
//   waitForElm(".login-icon").then((elm) => {
//       setTimeout(function () {
      
//             document.getElementById("signin-caption").innerHTML ="You are signed in as "+customUsername;
//             document.title="You are signed in as "+customUsername;
//         }, 500);
      
//           document.getElementById("signin-caption").style.display = "block";
//         });