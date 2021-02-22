function BankInformation(){
    var x = document.getElementById("bank");
  if (x.style.display === "none") {
    x.style.display = "block";
  }
  
}
function BankHidden(){
    var x = document.getElementById("bank");
  if (x.style.display === "block") {
    x.style.display = "none";
  }
}
//----------------------------------show password---------------------------------------

function PasswordVisibility() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
} 




//---------------------------Validation & Fetch-------------------------------------


var errorReg=document.getElementById("error")

jQuery.ajaxPrefilter(function(options) {
  if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

async function validation(){
  var Register = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    
  };
  if (Register.username == "") { 
    errorReg.innerHTML="please enter a username";
    errorReg.style.display="block";
    return false;

  }else if (Register.password == "") {
    errorReg.innerHTML="please enter a password";
    errorReg.style.display="block";
    return false;
  }else{
  console.log(Register.username );
  console.log(Register.password );

 

    var raw = `{
      \n    \"username\":\"${Register.username}\",
      \n    \"password\":\"${Register.password}\"
      \n}`;
    console.log(raw);
      var requestOptions = {
        headers:{
          'content-type':'application/json'
        },
        method: 'POST',
        body: raw,
        redirect: 'follow'
      };
      console.log(requestOptions);
            
      await fetch("https://desolate-plains-69129.herokuapp.com/http://anyservice.imassoft.com/57/register", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log(error));
    }
}
