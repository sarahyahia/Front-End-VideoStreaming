
    

async function AddVideo(){
  var VideoTitle = document.getElementById("title").value;
  var VideoLink = document.getElementById("VideoURL").value;
  var About = document.getElementById("About").value;
  var RealeaseDate = document.getElementById("RealeaseDate").value;
  var Duration = document.getElementById("Duration").value;
  var Actor1 = document.getElementById("Actor1").value;
  var Actor2 = document.getElementById("Actor2").value;
  var Actor3 = document.getElementById("Actor3").value;
  var Actor4 = document.getElementById("Actor4").value;
  var Director = document.getElementById("Director").value;
  var Poster = document.getElementById("Poster").value;

  // localStorage.getItem('token')

  var myHeaders = new Headers();
  myHeaders.append('content-type', 'application/json');
  myHeaders.append("token",localStorage.getItem('token') );

  var raw = `{
    \n    \"url\":\"${VideoLink}\",
    \n    \"About\":\"${About}\",
    \n    \"RealeaseDate\":\"${RealeaseDate}\",
    \n    \"Poster\":\"${Poster}\",
    \n    \"Director\":\"${Director}\",
    \n    \"Duration\":\"${Duration}\",
    \n    \"Actor1\":\"${Actor1}\",
    \n    \"Actor2\":\"${Actor2}\",
    \n    \"Actor3\":\"${Actor3}\",
    \n    \"Actor4\":\"${Actor4}\",
    \n    \"title\":\"${VideoTitle}\"
    \n}`;
  console.log(raw);
  var requestOptions = {
      method: 'POST',  
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };

  await fetch("https://desolate-plains-69129.herokuapp.com/http://anyservice.imassoft.com/57/videos/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))  
    .catch(error => console.log('error', error))

   

}

jQuery.ajaxPrefilter(function(options) {
  if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

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

var adm=  document.getElementsByClassName("admin")[0];
adm.style.display="inline";

