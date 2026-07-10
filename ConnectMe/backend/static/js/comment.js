function addComment(button) {

    const input = button.previousElementSibling;

    const comments = button.nextElementSibling;

    if (input.value.trim() === "") return;

    const p = document.createElement("p");

    p.innerHTML = "💬 " + input.value;

    comments.appendChild(p);

    input.value = "";

    savePosts();
}