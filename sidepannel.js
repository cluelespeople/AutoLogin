const body = document.querySelector('body');
const sideicondiv = document.createElement('div');
sideicondiv.className = "hamburger-menu";

const checkbox = document.createElement('input')
checkbox.id = 'menu__toggle';
checkbox.type = "checkbox";
sideicondiv.appendChild(checkbox);

const label = document.createElement('label');
label.className = 'menu__btn';
label.for = "menu__toggle";
label.appendChild(document.createElement('span'));
sideicondiv.appendChild(label);

const ul = document.createElement('ul');
ul.className = "menu__box";
sideicondiv.appendChild(ul);

let newlistitem = document.createElement('li')
newlistitem.innerHTML = `
    <div class="form__group field">
  <input type="input" class="form__field" placeholder="Name" name="name" id='Newusername'  />
  <label for="Newusername" class="form__label">Username</label>
</div>
<div class="form__group field" style="padding-bottom:5px;">
<input type="input" class="form__field" placeholder="Name" name="name" id='NewPassword'  />
<label for="NewPassword" class="form__label">Password</label>
</div>
<div class="button2" id='submitButton'>
<span></span>
<span></span>
<span></span>
<span></span>
Add
</div>
  `
// class userinfo{
//   constructor(username,password){
//     this.username=username
//     this.password=password
//   }
// }

let link = document.createElement('a')
link.className = "menu__item";
link.href = "#"
newlistitem.appendChild(link)
ul.appendChild(newlistitem)
body.appendChild(sideicondiv)

const username = document.getElementById('Newusername');
const password = document.getElementById('NewPassword');
const submitButton = document.getElementById('submitButton');

function updateList() {
  let liArr = document.getElementsByClassName('menu__item');
  for (i = liArr.length - 1; i > 0; i--) {
    liArr[i].remove();
  }
  chrome.storage.sync.get("userinfo", ({ userinfo }) => {
    let userinfoarr = JSON.parse(userinfo)
    for (userData of userinfoarr) {
      let listitem = document.createElement('li');
      listitem.className = 'menu__item'
      listitem.style = "text-align:left; padding-left:5%;"
      listitem.innerText = 'username:' + userData.username + '\n' + 'password:' + userData.password
      listitem.addEventListener('click', removeUser);
      newlistitem.appendChild(listitem)
    }
  })
}


function removeUser(element) {
  let username = element.target.innerText.split(":")[1].split(`\n`)[0];
  console.log(username);

  chrome.storage.sync.get("userinfo", ({ userinfo }) => {
    let userinfoarr = JSON.parse(userinfo);
    let index = getindex0fusername(userinfoarr, username);
    userinfoarr.splice(index, 1)
    if (confirm("Do you want to delete credentials of " + username + "?")) {
      chrome.storage.sync.set({ 'userinfo': JSON.stringify(userinfoarr) });
      updateList()
    }
  })


}

function getindex0fusername(array, element) {
  for (i = 0; i < array.length; i++) {
    if (array[i].username === element) {
      return i
    }
  }
}

function handleSubmit() {

  if (username.value === '' && password.value === '') {
    alert('please enter username and password');
    return 0;
  }
  if (username.value === '') {
    alert('Please enter a username')
    return 0;
  }
  if (password.value === '') {
    alert('Please enter a password')
    return 0;
  }

  chrome.storage.sync.get("userinfo", ({ userinfo }) => {

    let userinfoarr = JSON.parse(userinfo)
    let flag = false;
    for (element of userinfoarr) {
      if (element.username === username.value) {
        flag = true
      }
    }


    if (flag) {
      const index = getindex0fusername(userinfoarr, username.value)
      userinfoarr[index].password = password.value;
      alert("password for " + userinfoarr[index].username + " Updated successfully!")
    } else {
      console.log("before : " + userinfo)


      if (userinfoarr.length >= 5) {
        userinfoarr.pop()
        userinfoarr.unshift({ username: username.value, password: password.value })
      }
      else {
        userinfoarr.unshift({ username: username.value, password: password.value })
      }
    }
    chrome.storage.sync.set({ 'userinfo': JSON.stringify(userinfoarr) });
    username.value = '';
    password.value = '';
    updateList()
  })
}
submitButton.addEventListener('click', handleSubmit);

chrome.storage.sync.get("userinfo", ({ userinfo }) => {
  if (userinfo === undefined) {
    chrome.storage.sync.set({ 'userinfo': JSON.stringify([]) });
  }
})
updateList()