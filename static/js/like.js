function likePost(button) {

    let likes = parseInt(button.dataset.likes || 0);

    likes++;

    button.dataset.likes = likes;

    button.innerHTML = "❤️ " + likes;

    savePosts();
}