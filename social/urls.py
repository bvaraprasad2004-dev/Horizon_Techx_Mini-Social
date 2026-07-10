from django.urls import path
from . import views


urlpatterns = [

    path("", views.home, name="home"),

    path("login/", views.login_view, name="login"),

    path("register/", views.register_view, name="register"),

    path("logout/", views.logout_view, name="logout"),

    path("create-post/", views.create_post_page, name="create_post_page"),

    path("posts/", views.posts, name="posts"),

    path("like/<int:post_id>/", views.like_post, name="like_post"),

    path("profile/edit/", views.edit_profile, name="edit_profile"),

    path("network/", views.network, name="network"),

    path("messages/", views.messages, name="messages"),

    path("notifications/", views.notifications, name="notifications"),

    path("connect/<int:user_id>/", views.connect_user, name="connect_user"),

    path("profile/<int:user_id>/", views.user_profile, name="user_profile"),

    path("comment/<int:post_id>/",
     views.add_comment,
     name="add_comment"), 

]