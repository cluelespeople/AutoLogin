const username=document.querySelector("#username");
const password=document.querySelector("#password");
const submitButton=document.querySelector("#submit");

submitButton.addEventListener('click',()=>{
    chrome.storage.sync.set({ 'username':username.value });
    chrome.storage.sync.set({ 'password':password.value });
        alert("New userid and password saved successfully.");
window.close()
    })