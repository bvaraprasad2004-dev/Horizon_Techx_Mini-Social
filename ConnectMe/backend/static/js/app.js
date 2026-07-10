fetch("http://127.0.0.1:8000/api/posts/")
.then(response=>response.json())
.then(data=>{

    let output="";

    data.forEach(post=>{

        output += `
        <div class="post">

        <h3>${post.user}</h3>

        <p>${post.content}</p>

        <button>
        ❤️ ${post.likes}
        </button>

        </div>
        `;

    });


    document.getElementById("posts")
    .innerHTML=output;

});