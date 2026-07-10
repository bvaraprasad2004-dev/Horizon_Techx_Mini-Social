from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Post

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from django.contrib.auth.decorators import login_required

from django.shortcuts import render, redirect



# Home page
def home(request):
    posts = Post.objects.all()
    return render(request, 'home.html', {'posts': posts})



# Get all posts API
@api_view(['GET'])
def posts(request):

    data = []

    for post in Post.objects.all():

        data.append({
            "id": post.id,
            "user": post.user.username,
            "content": post.content,
            "likes": post.likes.count()
        })

    return Response(data)



# Create post from HTML form
@login_required
def create_post_page(request):

    if request.method == "POST":

        content = request.POST.get("content")
        image = request.FILES.get("image")

        Post.objects.create(

            user=request.user,

            content=content,

            image=image

        )

        return redirect("home")

    return redirect("home")



# API login
@api_view(['POST'])
def login_api(request):

    email = request.data.get("email")
    password = request.data.get("password")


    try:
        user = User.objects.get(email=email)

    except User.DoesNotExist:

        return Response({
            "success": False,
            "message": "User not found"
        })


    auth_user = authenticate(
        username=user.username,
        password=password
    )


    if auth_user:

        return Response({
            "success": True,
            "user_id": auth_user.id,
            "username": auth_user.username
        })


    return Response({
        "success": False,
        "message": "Invalid password"
    })



# HTML Login
def login_view(request):

    if request.method == "POST":

        email = request.POST.get("email")
        password = request.POST.get("password")


        try:
            user = User.objects.get(email=email)

        except User.DoesNotExist:

            return render(request, "login.html", {
                "error": "Email not registered"
            })


        auth_user = authenticate(
            username=user.username,
            password=password
        )


        if auth_user:

            login(request, auth_user)

            return redirect("home")


        return render(request, "login.html", {
            "error": "Invalid password"
        })


    return render(request, "login.html")



# Register
def register_view(request):

    if request.method == "POST":

        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")


        if User.objects.filter(email=email).exists():

            return render(request, "register.html", {
                "error": "Email already exists"
            })


        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )


        logout(request)

        return redirect("login")


    return render(request, "register.html")



# Logout
def logout_view(request):

    logout(request)

    return redirect("login")

@login_required
def like_post(request, post_id):

    post = Post.objects.get(id=post_id)

    if request.user in post.likes.all():
        post.likes.remove(request.user)
    else:
        post.likes.add(request.user)

    return redirect("home")    

from .models import Profile

@login_required
def edit_profile(request):

    profile, created = Profile.objects.get_or_create(
    user=request.user
    )

    if request.method == "POST":

        profile.bio = request.POST.get("bio")
        profile.profession = request.POST.get("profession")
        profile.location = request.POST.get("location")
        profile.website = request.POST.get("website")
        profile.phone = request.POST.get("phone")

        if "profile_pic" in request.FILES:
            profile.profile_picture = request.FILES["profile_pic"]

        if "cover_photo" in request.FILES:
            profile.cover_photo = request.FILES["cover_photo"]    

        profile.save()

        return redirect("home")

    return render(request, "edit_profile.html", {
        "profile": profile
    })

from .models import Connection

@login_required
def network(request):

    users = User.objects.exclude(id=request.user.id)

    sent_requests = Connection.objects.filter(
        sender=request.user
    ).values_list("receiver_id", flat=True)

    return render(request, "network.html", {
        "users": users,
        "sent_requests": sent_requests
    })

def messages(request):

    chats = [

        {"name":"Rahul","message":"Hi!"},
        {"name":"Priya","message":"How are you?"},
        {"name":"Alex","message":"Let's connect."},

    ]

    return render(request,"messages.html",{
        "chats":chats
    })

@login_required
def notifications(request):

    notifications=[

        "Rahul liked your post",

        "Priya sent a connection request",

        "Alex commented on your post",

        "Welcome to ConnectMe"

    ]

    return render(request,
                  "notifications.html",
                  {
                      "notifications":notifications
                  })    



from django.shortcuts import get_object_or_404
from .models import Connection
from django.contrib.auth.models import User

@login_required
def connect_user(request, user_id):

    receiver = get_object_or_404(User, id=user_id)

    if receiver != request.user:

        Connection.objects.get_or_create(
            sender=request.user,
            receiver=receiver
        )

    return redirect("network")


@login_required
def user_profile(request, user_id):

    user = get_object_or_404(User, id=user_id)

    posts = Post.objects.filter(user=user).order_by("-created_at")

    return render(request, "user_profile.html", {
        "profile_user": user,
        "posts": posts
    })    

from .models import Comment

@login_required
def add_comment(request, post_id):

    post = Post.objects.get(id=post_id)

    if request.method == "POST":

        text = request.POST.get("comment")

        if text:
            Comment.objects.create(
                post=post,
                user=request.user,
                text=text
            )

    return redirect("home")    