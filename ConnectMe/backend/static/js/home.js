document.getElementById("username").innerHTML =
localStorage.getItem("username");



function loadPosts(){


fetch("http://127.0.0.1:8000/api/posts/")


.then(response => response.json())


.then(data => {


let html = "";


data.forEach(post => {


html += `

<div class="post">

<h3>
${post.user}
</h3>


<p>
${post.content}
</p>


<p>
❤️ Likes: ${post.likes}
</p>


</div>

`;

});


document.getElementById("posts").innerHTML = html;


});


}




function createPost(){


let content =
document.getElementById("postContent").value;


let user_id =
localStorage.getItem("user_id");



fetch(
"http://127.0.0.1:8000/api/create-post/",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},


body:JSON.stringify({

user_id:user_id,

content:content

})


})


.then(response=>response.json())


.then(data=>{


alert(data.message);


document.getElementById("postContent").value="";


loadPosts();


});


}



loadPosts();