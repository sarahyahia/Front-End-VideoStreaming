function PasswordVisibility() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  } 

console.log('log in');
localStorage.clear();



var username = document.getElementById("user");
var password1 = document.getElementById("password");

    jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});


async function validation()
{
  console.log('log in');
    
        if(username.value== "" ){
        document.getElementById("demo").innerHTML = "Please enter username" ;
        return false;
        
        }  else if(password1.value==""){
        document.getElementById("demo").innerHTML = "Please enter password" ;
        return false;
        }
        else{
    console.log(username.value);
    console.log(password1.value);

    var raw = `{
                \n    \"username\":\"${username.value}\",
                \n    \"password\":\"${password1.value}\"
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
//console.log(requestOptions);
    await fetch("https://desolate-plains-69129.herokuapp.com/http://anyservice.imassoft.com/57/login", requestOptions)
    .then(response => response.json())
    .then(result => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('id', result.data.id);
        localStorage.setItem('username',`${result.data.username}`);
    })
    .catch(error => console.log('error', error));
    
    }

    isLoggedIn();
}
function isLoggedIn () {
    token=localStorage.getItem('token');
    const id = localStorage.getItem('id')
    console.log(token);
    if(!token){
        return false;
    }
    autoRedirect(token);
}
//locationUrl='http://127.0.0.1:5501/'
function autoRedirect (d) {
   
    location.pathname='/Dashboard.html';
  
}
console.log(Object.getOwnPropertyNames(location));
console.log(location)

//locatin=getParameterByName('AdminLogin.html');
//console.log(locatin)
//------------------------------Query string url--------------------
/*
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}*/

/*if ('URLSearchParams' in window) {
    var searchParams = new URLSearchParams(window.location.search)
    searchParams.set("username",username );
    var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    history.pushState(null, '', newRelativePathQuery);
}

//href1=updateQueryStringParameter(location.href,username,'admin');

console.log(href1);*/
