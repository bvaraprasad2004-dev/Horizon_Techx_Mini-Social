window.onload = function () {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("profileName").textContent =
        user.username;

    document.getElementById("profileEmail").textContent =
        user.email;

    document.getElementById("aboutText").textContent =
        user.bio || "No bio added yet.";

    if (user.image) {
        document.getElementById("profileImage").src =
            user.image;
    }

    loadUserPosts();

};

function loadUserPosts() {

    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    const user = JSON.parse(localStorage.getItem("user"));

    const myPosts =
        posts.filter(post => post.username === user.username);

    document.getElementById("postCount").textContent =
        myPosts.length;

    const container =
        document.getElementById("userPosts");

    container.innerHTML = "";

    myPosts.forEach(post => {

        container.innerHTML += `
            <div class="post">

                <h4>${post.username}</h4>

                <p>${post.content}</p>

                <small>${post.time}</small>

            </div>
        `;

    });

}

function editProfile() {

    window.location.href = "editprofile.html";

}

function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href = "index.html";

}