document.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let email =
    document.getElementById("loginEmail").value;

    let password =
    document.getElementById("loginPassword").value;


    fetch("http://127.0.0.1:8000/api/login/", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            email:email,
            password:password

        })

    })


    .then(response=>response.json())

    .then(data=>{

        if(data.success){

            localStorage.setItem(
                "user_id",
                data.user_id
            );

            localStorage.setItem(
                "username",
                data.username
            );


            window.location.href="/home/";

        }

        else{

            alert(data.message);

        }

    });

});