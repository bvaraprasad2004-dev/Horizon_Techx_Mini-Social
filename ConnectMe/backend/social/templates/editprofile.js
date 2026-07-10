window.onload = function () {

    let user =
        JSON.parse(localStorage.getItem("user")) || {};

    document.getElementById("username").value =
        user.username || "";

    document.getElementById("bio").value =
        user.bio || "";

    if (user.image) {
        document.getElementById("preview").src =
            user.image;
    }

};

document.getElementById("profileImage")
.addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {

        document.getElementById("preview").src =
            reader.result;

    };

    reader.readAsDataURL(file);

});

function saveProfile() {

    let user =
        JSON.parse(localStorage.getItem("user")) || {};

    user.username =
        document.getElementById("username").value;

    user.bio =
        document.getElementById("bio").value;

    user.image =
        document.getElementById("preview").src;

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    alert("Profile Updated!");

    window.location.href = "profile.html";

}