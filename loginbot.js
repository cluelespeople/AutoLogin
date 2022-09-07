function updateList(){
  let liArr = document.getElementsByClassName('menu__item');
  for (i = liArr.length - 1; i > 0; i--) {
    liArr[i].remove();
  }
}

function login(username, password , index) {
  document.getElementById("username").value = username;
  document.getElementById("password").value = password;
  setTimeout(function () {
    var script = document.createElement('script');
    script.textContent = 'document.getElementById("loginbutton").click();';
    document.body.appendChild(script);
    script.remove();
  }, 200)
setTimeout(function(){
  if(document.getElementById('statusmessage').innerText ==='Login failed. Invalid user name/password. Please contact the administrator.'){
      chrome.storage.sync.get("userinfo", ({ userinfo }) => {
        let userinfoarr = JSON.parse(userinfo);
        if (confirm("Wrong credentials of " + username + "would you like to delete them?")) {
          userinfoarr.splice(index, 1)
          chrome.storage.sync.set({ 'userinfo': JSON.stringify(userinfoarr) });
          updateList()
        }
      })    
  }
  if (document.getElementById('statusmessage').innerText !== '') {
    return false;
  }
  else {
    return true;
  }
}
,300);
}

chrome.storage.sync.get("userinfo", ({ userinfo }) => {
  const userinfoList =JSON.parse(userinfo);
  if (userinfoList.length!==0){
  for (i=0; i<userinfoList.length;i++){
    if (login(userinfoList[i].username,userinfoList[i].password , i)){
      break;
    }
  }}
  else{
    alert("Please save userid and password for automatically logging in.")
  }
})

// document.getElementById("signin-caption").style.display = "none";


// Uncomment the below code if value of customusername is set manually.

//   waitForElm(".login-icon").then((elm) => {
//       setTimeout(function () {

//             document.getElementById("signin-caption").innerHTML ="You are signed in as "+customUsername;
//             document.title="You are signed in as "+customUsername;
//         }, 500);
//           document.getElementById("signin-caption").style.display = "block";
//         });