let following = JSON.parse(localStorage.getItem("following")) || [];

function toggleFollow(button, name) {

    if (following.includes(name)) {
        following = following.filter(user => user !== name);
        button.textContent = "Follow";
    } else {
        following.push(name);
        button.textContent = "Following";
    }

    localStorage.setItem("following", JSON.stringify(following));
}