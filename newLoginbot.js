const targetElement = document.getElementById("signin-caption");
const statusmessage = document.getElementById('statusmessage')
// let LoginData = null
let loggedIn = false
var count = 0;
var max = 0;
var flag = false;
let LoginData = null




chrome.storage.sync.get("userinfo", ({ userinfo }) => {
    const userinfoList = JSON.parse(userinfo);
    console.log("current data state")
    console.log(userinfoList)
    LoginData = userinfoList;
    afterGetFromStorage(userinfoList)
})


const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        console.log(count)
        if (mutation.type === "childList" || mutation.type === "characterData") {
            console.log("Element content changed:", targetElement.textContent);
            if (statusmessage.textContent.includes("Login failed. Invalid user name/password. Please contact the administrator.")) {
                console.log("wrong Password!")
                if (flag) {
                    deleteFromStorage(count)
                }
                // max>=count?:alert("Auto Login Not Possible , Add new id's to continue")
                login(LoginData[count].username, LoginData[count].password)

            }
            else if (targetElement.textContent.includes("Sign in to Access Internet") && statusmessage.textContent.includes("exceeded")) {
                max >= count ? count++ : alert("Auto Login Not Possible , Add new id's to continue")

                console.log("Data Limit exceeded")
            }
            else if (targetElement.textContent.includes('Sign in to Access Internet')) {
                console.log("Signin logic goes here")
                if (!loggedIn) {
                    login(LoginData[count].username, LoginData[count].password)
                }
            }
            if (targetElement.textContent.includes("Signing you in...")) {
                console.log("Signing in state")
            }
            if (targetElement.textContent.includes('You are signed in as')) {
                loggedIn = true;
                console.log("You are successfully Logged in ")
            }
            else {
                loggedIn = false;
                console.log("Not Logged in yet")
            }
        }
    }
});

const PressLoginBtn = async () => {
    const loginBtn = document.getElementById("loginbutton")
    // console.log(statusmessage)
    loginBtn.click()
    flag = true
    // console.log(statusmessage)
}
const login = (username, password) => {
    console.log("Username :" + username + ' , Password :', password)
    document.getElementById("username").value = username;
    document.getElementById("password").value = password;
    PressLoginBtn()
}
const afterGetFromStorage = (data) => {
    max = data.length;
    // LoginData = data;
    console.log(data)
        console.log("Login Dara fetched");
        console.log(LoginData);
        console.log(data)
        login(data[count].username, data[count].password);
        console.log("Login test 1 ");
        observer.observe(targetElement, { childList: true, characterData: true, subtree: true });

}
const deleteFromStorage = (idx) => {
    console.log("Deleting at index" + idx + ":" + LoginData[idx])
    LoginData = LoginData.splice(idx, 1);
    console.log(LoginData)
    chrome.storage.sync.set({ 'userinfo': JSON.stringify(LoginData) });
    const liArr = document.getElementsByClassName('menu__item');
    liArr[liArr.length - idx].remove();
}

