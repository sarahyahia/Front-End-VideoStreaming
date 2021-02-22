

document.addEventListener("keyup",function(e){
  if(e.key==" "){
      toggle();
  }
  else if(e.key=="ArrowRight"){
      myVideo.currentTime+=2;
  }
  else if(e.key=="ArrowLeft"){
      myVideo.currentTime-=2;
  }
});



let videoId=1;
let myVideo = document.getElementById("myvideo");
let progressValue = document.getElementById("progressValue");
let progressBackground = document.getElementById("progressBackground");
let overlay = document.getElementById("overlay");
let videoSpeed = document.getElementById("videoSpeed");
let subtitleDiv = document.getElementById("subtitle");

progressBackground.addEventListener("click",function(e){
  let maxWidth = progressBackground.clientWidth;
  let barValue = e.offsetX;
  let barValuePercent = barValue/maxWidth;
  let currentTime = myVideo.duration * barValuePercent;
  myVideo.currentTime = currentTime;

})

function getProgressBarWidth(){
  return new Promise(function(resolve,reject){
      
          let t = setInterval(function(){
              if(progressBackground.clientWidth>0){
                  clearInterval(t);
                  resolve(progressBackground.clientWidth);
              }
          },10);
  });
}



myVideo.addEventListener("loadedmetadata",async function(e){
  console.log(myVideo.duration);

  if(localStorage["video"+videoId]){
      myVideo.currentTime = Number(localStorage["video"+videoId]);

      let maxWidth = await getProgressBarWidth();
  
      console.log(maxWidth,(myVideo.currentTime/myVideo.duration) *maxWidth)
      progressValue.style.width = (myVideo.currentTime/myVideo.duration) *maxWidth ;
  
  }
})

let subtitlesArray = [{
  fromTime:1,
  toTime:10,
  text:"Welcome. This is just a test to check the subtitle"
},{
  fromTime:10,
  toTime:13,
  text:"Hello"
},{
  fromTime:13,
  toTime:16,
  text:"How are you?"
},{
  fromTime:16,
  toTime:20,
  text:"I hope all of you are doing well!"
}]

myVideo.addEventListener("timeupdate",function(e){
  localStorage["video"+videoId] = myVideo.currentTime;
  
  let subtitles = subtitlesArray.filter((item)=>
      myVideo.currentTime>=item.fromTime &&
      myVideo.currentTime<=item.toTime
  );
  if(subtitles.length>0){
      let subtitle = subtitles[0];
      subtitleDiv.innerHTML = subtitle.text;
  }
  let maxWidth = progressBackground.clientWidth;
  progressValue.style.width = (myVideo.currentTime/myVideo.duration) *maxWidth ;
})


function toggle(){
  if(myVideo.paused){
      play();
  }
  else
  {
      pause();
  }
}

function play(){
  myVideo.play();
  overlay.style.display="none";
}

function stop(){
  pause();
  myVideo.currentTime = "0";
}

function pause(){
  myVideo.pause();
  overlay.style.display="block";
}

function loop(){

  if (myvideo.loop == false) {
      myvideo.loop = true
      document.getElementById("loops").className = "playerBtn1";
  }

  else {myvideo.loop = false
      document.getElementById("loops").className = "playerBtn";
  };

}

function mute(){

  if (myvideo.muted == false) {
      myvideo.muted = true
      document.getElementById("mutes").className = "playerBtn";
  }

  else {myvideo.muted = false
      document.getElementById("mutes").className = "playerBtn2";
  };

  }

function moveForward(){
  myVideo.currentTime += 1;
}


function moveBackward(){
  myVideo.currentTime -= 1;
}

function videoSpeedChanged(){
  myVideo.playbackRate = Number(videoSpeed.value);
}

function fullScreen()
{
  if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
  ) {
      if (document.exitFullscreen) {
      document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
      }
  } else {
      element = myVideo.parentElement;
      if (element.requestFullscreen) {
      element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
      }}
}
function SetVolume(val)

{
  var player = document.getElementById('myvideo');
  console.log('Before: ' + player.volume);
  player.volume = val / 100;
  console.log('After: ' + player.volume);
}
function showControls(){
  controls.style.display="flex";
  let subtitleStyle = document.getElementById("subtitle").style;
  subtitleStyle.top = "-48%";
}

function hideControls(){
  controls.style.display="none";
  let subtitleStyle = document.getElementById("subtitle").style;
  subtitleStyle.top = "80%";
}

console.log({myVideo});


//---------------------logout---------------------------

document.getElementById('logout').addEventListener("click",async function logout () {
  var myHeaders = new Headers();
  var token = localStorage.getItem('token');
  myHeaders.append('content-type','application/json');
  myHeaders.append("token", token);

  var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
  };

 await fetch("https://desolate-plains-69129.herokuapp.com/http://anyservice.imassoft.com/57/logout", requestOptions)
  .then(response => response.text())
  .then(result => {
      //document.getElementsByClassName("admin").style.display="none";
      location.pathname='/Login.html';        
  })
  .catch(error => console.log('error', error));

  
})