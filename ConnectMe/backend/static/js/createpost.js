function createPost() {
    const input = document.getElementById("postInput");
    const posts = document.getElementById("posts");

    if (input.value.trim() === "") {
        alert("Write something!");
        return;
    }

    const post = document.createElement("div");
    post.className = "post";

    post.innerHTML = `
        <h4>John Doe</h4>
        <p>${input.value}</p>

        <button onclick="likePost(this)">❤️ Like</button>

        <button onclick="deletePost(this)">Delete</button>
    `;

    posts.prepend(post);

    input.value = "";
}
function deletePost(index){

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.splice(index,1);

    localStorage.setItem("posts", JSON.stringify(posts));

    loadPosts();

}
function addComment(button){

    const commentInput =
        button.previousElementSibling;

    const comments =
        button.nextElementSibling;

    if(commentInput.value.trim()=="")
        return;

    const p=document.createElement("p");

    p.innerHTML="💬 "+commentInput.value;

    comments.appendChild(p);

    commentInput.value="";

    savePosts();

}

function savePosts(){

    localStorage.setItem(
        "posts",
        document.getElementById("posts").innerHTML
    );

}
window.onload = function(){

    document.getElementById("welcomeUser").innerHTML =
    localStorage.getItem("username");

    document.getElementById("profileName").innerHTML =
    localStorage.getItem("username");

    const savedPosts = localStorage.getItem("posts");

    if(savedPosts){

        document.getElementById("posts").innerHTML = savedPosts;

    }

}
posts.unshift({

    username: user.username,

    content: text,

    likes: 0,

    comments: [],

    time: new Date().toLocaleString()

});
function loadPosts() {

    const postContainer = document.getElementById("posts");

    if (!postContainer) return;

    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    postContainer.innerHTML = "";

    posts.forEach((post, index) => {

        postContainer.innerHTML += `

        <div class="post">

            <div class="post-header">

                <img src="https://i.pravatar.cc/150?img=${index + 10}">

                <div>

                    <h4>${post.username}</h4>

                    <small>${post.time}</small>

                </div>

            </div>

            <p>${post.content}</p>

            <div class="actions">

                <button onclick="likePost(${index})">
                    ❤️ ${post.likes}
                </button>

                <button onclick="deletePost(${index})">
                    🗑 Delete
                </button>

            </div>

            <div class="comment-box">

                <input
                    type="text"
                    id="comment-${index}"
                    placeholder="Write a comment">

                <button onclick="addComment(${index})">
                    Add
                </button>

                <div id="comments-${index}">

                    ${post.comments
                        .map(comment => `<p>💬 ${comment}</p>`)
                        .join("")}

                </div>

            </div>

        </div>

        `;
    });
}