



isAdmin();
dashboardVideos();
var token=localStorage.getItem('token');

//----------------Trailer ------------------------
var player=document.getElementById("player")
    videoContainer=document.getElementById('videoContainer'),
    closeWin=document.getElementsByClassName("close");
function displayVideo(){
    document.getElementById("videoContainer").style.display = "block";
    player.play();
}

function videoHidden(){
    player.pause();
    player.currentTime=0;
    document.getElementById("videoContainer").style.display = "none";
}
//---------------------logout---------------------------

document.getElementById('logout').addEventListener("click",async function logout () {
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

// -----------------------------Get All-----------------------------

console.log(token);
async function dashboardVideos(){
    const token =localStorage.getItem('token');
    console.log(token);
    var requestOptions = {
    method: 'GET',
    headers:{
        'content-type':'application/json',
        'token': token
      },
    redirect: 'follow'
    };

    await fetch("https://desolate-plains-69129.herokuapp.com/http://anyservice.imassoft.com/57/videos", requestOptions)
    .then(response => response.text())
    .then(result => {
                console.log(result)
                const pop= JSON.parse(result);
                console.log(pop[0].Poster)
                console.log(pop.length);

                for (var i =0;i < pop.length;i++){
                    console.log(pop[i].id);
                    var videoBox =document.getElementById('videosBox');
                    var node1 = document.createElement("div"); 
                    $( node1 ).addClass( "col-sm-6" );
                    $( node1 ).addClass( "elementDiv" );
                    $( node1 ).addClass( "col-xs-6" );
                    $( node1 ).addClass( "col-md-3" );
                    var node21 = document.createElement("div"); 
                    $( node21 ).addClass( "img-thumbnail" );
                    var img = document.createElement("img"); 
                    $(img).attr("src", pop[i].Poster);
                    $(img).attr("width","500");
                    $(img).attr("height","705");
                    $(img).attr('id', `${pop[i].id}`)
                    node21.appendChild(img);
                    var node22 = document.createElement("div"); 
                    $( node22 ).addClass( "caption" );
                    var h4 = document.createElement('h4');
                    $(h4).addClass('text-center');
                    h4.innerHTML=pop[i].title;
                    node22.appendChild(h4);
                    node21.appendChild(node22);
                    node1.appendChild(node21);
                    videoBox.appendChild(node1);
                };
    }
    )
    .catch(error => console.log('error', error));


    
}
//-------------------get id of clicked dynamic poster to display video-----------------
$('body').on("click",function(e){
    var id = e.target.id;
    console.log(id)
    
    if (typeof(eval(id))=='number'){
        location.pathname ="/VideoDisplay.html";
        localStorage.setItem('videoID',id);
    }
})



