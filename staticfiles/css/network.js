const following = JSON.parse(localStorage.getItem("following")) || [];

document.getElementById("followingCount").textContent = following.length;

const followingList = document.getElementById("followingList");

following.forEach(name => {

    const li = document.createElement("li");

    li.innerHTML = `
        ${name}
        <button onclick="removeFollow('${name}')">
            Unfollow
        </button>
    `;

    followingList.appendChild(li);

});

function removeFollow(name){

    let following =
    JSON.parse(localStorage.getItem("following")) || [];

    following = following.filter(user => user !== name);

    localStorage.setItem(
        "following",
        JSON.stringify(following)
    );

    location.reload();

}