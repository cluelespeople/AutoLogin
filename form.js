const customUsername="YourName"

console.log("Extention started");
document.getElementById("headerdiv").remove();
document.getElementById("footerdiv").remove();
document.getElementById("signin-caption").style.color = "#ffffff";
document.getElementById("myaccountcaption").style.color = "#ffffff";
document.getElementById("logo").children[0].href = "https://www.youtube.com/watch?v=oHg5SJYRHA0";
document.getElementById("logo").className = "logoo";
document.getElementsByClassName('panel-body')[0].style='border:none; border-radius: 0 0 0.3em 0.3em;'

let buttonCase=document.createElement('div')
buttonCase.id='buttonCase';
buttonCase.className='buttonrow'
let whatsapp=document.createElement('button')
let youtube = document.createElement('button')
let notes = document.createElement('button')
whatsapp.id='whatsapp'
youtube.id='youtube'
notes.id='notes'

whatsapp.className='new-button'
youtube.className='new-button'
notes.className='new-button'

whatsapp.innerText='Whatsapp'
youtube.innerText='Youtube'
notes.innerText='Notes'


document.getElementById('loggedin-message').appendChild(buttonCase)
document.getElementById('buttonCase').appendChild(youtube)
document.getElementById('buttonCase').appendChild(whatsapp)
document.getElementById('buttonCase').appendChild(notes)

document.getElementsByClassName('message')[0].style="color:#ffffff;"
document.getElementsByClassName('login-icon')[0].remove();
document.getElementById("loggedin-message").style="height:7em;"
document.getElementById('statusmessage').style='color:#ffffff'


whatsapp.addEventListener('click',()=>{
  window.open('https://web.whatsapp.com/', '_blank');
})
youtube.addEventListener('click',()=>{
  window.open('https://www.youtube.com/', '_blank');
})
notes.addEventListener('click',()=>{
  window.open('https://keep.google.com/', '_blank');
})

document.getElementById('credentials').children[0].style='background-color: rgb(35, 50, 68 , .8);';
document.getElementById('credentials').children[1].style='background-color: rgb(35, 50, 68 , .8);';
