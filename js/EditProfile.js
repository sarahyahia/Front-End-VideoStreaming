var camBtn= document.getElementById("camBtn"),
	camContainer= document.getElementById("profileImage"),
	screenshot=document.getElementById("screenshot"),
	video= document.getElementById("videoElement"),
	canvas = document.querySelector("canvas");


  //-----------------------------------upload profile pic---------------------------------------------------
$("#imageUploadBtn").click(function(e) {
    $("#imageUpload").click();

});

function fasterPreview( uploader ) {
  if ( uploader.files && uploader.files[0] ){
        $('#profileImage').attr('src', 
           window.URL.createObjectURL(uploader.files[0]) );
          //$('#profileImage').css('width','353px')
          //$('#profileImage').css('height','353px')
  }
}

$("#imageUpload").change(function(){
  fasterPreview( this );
});
 
 //---------------------------------------Camera pic--------------------------------------------
function takescreenshot () {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let ctx = canvas.getContext("2d");
        
	ctx.drawImage(video, 0, 0);
	// Other browsers will fall back to image/png
	camContainer.src = canvas.toDataURL("image/webp");
    video.style.display = "none";
	stop();
	screenshot.style.display = "none";
	camContainer.style.display = "inline";
			  

}

function stop(e) {
      
	var stream = video.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
    	var track = tracks[i];
        track.stop();
    }

    video.srcObject = null;
}

async function startCamera(){
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            let str = await navigator.mediaDevices.getUserMedia({ video: true, audio:false },)
            video.srcObject = str;
            video.videoWidth = '353px';
          	video.videoHeight ='353px';
        }
    }
function showCam(){
	startCamera();
	screenshot.style.display = "inline";
	camContainer.style.display = "none";
	video.style.display = "inline";
	
}

//---------------------logout---------------------------

document.getElementById('logout').addEventListener("click",async function logout () {
  var token = localStorage.getItem('token')  ;
  var myHeaders = new Headers();
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
    console.log(result);
      //document.getElementsByClassName("admin").style.display="none";
      location.pathname='/Login.html';        
  })
  .catch(error => console.log('error', error));

  
})



//-------Admin Privileges---------------------

var username = localStorage.getItem('username')
function isAdmin() {
    const id = localStorage.getItem('id')
    const username = localStorage.getItem('username')
    var adm=  document.getElementsByClassName("admin")[0];


    
    //console.log(token);
    if ((id==1 && username=='admin') ||( id == 3 && username =='Sarah')){
        console.log('admin entered');
        adm.style.display="inline";
        }
    //autoRedirect(token);
    return true;
}
