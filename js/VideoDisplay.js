jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
    });
    
    
    var myHeaders = new Headers();
    myHeaders.append('content-type', 'application/json');
    myHeaders.append("token", localStorage.getItem('token'));
    
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    
    fetch(`https://desolate-plains-69129.herokuapp.com/http://anyservice.imassoft.com/57/videos/${localStorage.getItem("videoID")}`, requestOptions)
    .then(response => response.json())
    .then(function(result){document.getElementById("moviePoster").src= result.data.Poster;
    document.getElementById("videoTitle").innerHTML= result.data.title;
    document.getElementById("ReleaseDate").innerHTML= result.data.RealeaseDate;
    document.getElementById("Duration").innerHTML= result.data.Duration;
    document.getElementById("Director").innerHTML= result.data.Director;
    document.getElementById("myvideo").src= result.data.url;
    document.getElementById("Details").innerHTML= result.data.About;
    document.getElementById("actor1").innerHTML= result.data.Actor1;
    document.getElementById("actor2").innerHTML= result.data.Actor2;
    document.getElementById("actor3").innerHTML= result.data.Actor3;
    document.getElementById("actor4").innerHTML= result.data.Actor4;
    })
    .catch(error => console.log('error', error));
    
    //-------------------------------------Admin Privileges-----------------
    function isAdmin() {
        const id = localStorage.getItem('id')
        const username = localStorage.getItem('username')
        var adm=  document.getElementsByClassName("admin")[0];
    
        
        //console.log(token);
        if ((id==1 && username=='admin') ||( id== 3 && username =='Sarah')){
            console.log('admin entered');
            document.getElementsByClassName("del")[0].style.display='block';
            document.getElementsByClassName("edit")[0].style.display='block';
            adm.style.display="inline";

            
            }
        //autoRedirect(token);
        return true;
    }
    isAdmin();
    
//-----------------------------delete video------------------------
    
    
    async function deleteVideo(){


        var myHeaders = new Headers();
        myHeaders.append('content-type','application/json');
        myHeaders.append("token", localStorage.getItem('token'));
    
        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
        };
    
        await fetch(`https://desolate-plains-69129.herokuapp.com/http://anyservice.imassoft.com/57/videos/${localStorage.getItem('videoID')}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            localStorage.removeItem('videoID');
            location.pathname='/Dashboard.html'
        })
        .catch(error => console.log('error', error));
    
    }

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
  


