
document.addEventListener("DOMContentLoaded", function () {

  setTimeout(() => {
    const loader = document.getElementById("loader");

    if (loader) {
      loader.style.opacity = "0";
      loader.style.transition = "0.3s ease";

      setTimeout(() => {
        loader.style.display = "none";

        enterSystem(); 

      }, 500);
    }

  }, 3000);

});
                    const firebaseConfig = {
  apiKey: "AIzaSyBTkizm7gOxqqVp5FmEM9m22gmFTf5OETk",
  authDomain: "schoolqueuing.firebaseapp.com",
  databaseURL: "https://schoolqueuing-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "schoolqueuing",
  storageBucket: "schoolqueuing.firebasestorage.app",
  messagingSenderId: "88158961699",
  appId: "1:88158961699:web:8479ba7d88e0e144433196",
  measurementId: "G-XES8VGNYHL"
};

                    firebase.initializeApp(firebaseConfig);
                    const db = firebase.database();

                    db.ref("queue").on("value", function(snapshot)
                    {
                        queueList = [];

                        snapshot.forEach(function(child){
                            queueList.push(child.val());
                        });
                        
                        updateQueueListDisplay();
                    });
                    db.ref("serving").on("value", function(snapshot){

    serving = snapshot.val() || 0
    updateBoard()

    if(myNumber !== null && serving === myNumber){

        document.getElementById("popupNumber").innerText = "Queue " + myNumber
        document.getElementById("popup").style.display = "flex"

        const sound = document.getElementById("beepSound")
        sound.currentTime = 0
        sound.play()

    }

})
              
                let queueNumber=0
                let myNumber=null
                let serving=0
                let queueList=[]
                const correctAnswer = "Math"; 
                
                function enterSystem(){

    document.querySelector("header").style.display="block"
    document.querySelector("nav").style.display="block"

    // unlock audio
    const sound = document.getElementById("beepSound")
    sound.play().then(()=>{
        sound.pause()
        sound.currentTime = 0
    }).catch(()=>{})

    showPage('home')
}
                
                function showPage(page){
    document.getElementById("home").style.display="none"
    document.getElementById("queue").style.display="none"
    document.getElementById("help").style.display="none"
    document.getElementById("adminPanel").style.display="none"
    document.getElementById("login").style.display="none"

    document.getElementById(page).style.display="block"
    updateBoard()
}
                
                document.getElementById("queueForm").addEventListener("submit",function(e){
                    e.preventDefault()

                    let name=
                    document.getElementById("name").value
                    
                    db.ref("queueCounter").transaction(function(currentNumber){

    return (currentNumber || 0) + 1

}, function(error, committed, snapshot){

    if(committed){

        myNumber = snapshot.val()

        db.ref("queue").push({
            number: myNumber,
            name: name
        })

        document.getElementById("result").innerHTML=
        "<h3>Queue Registered!</h3>" +
        "Student: <b>" + name + "</b><br><br>" +
        "Your Queue Number:<br><h1>" + myNumber + "</h1>";

    }

})

                    document.getElementById("result").innerHTML=
                    "<h3>Queue Registered!</h3>" +
                    "Student: <b>" + name + "</b><br><br>" +
                    "Your Queue Number:<br><h1>" + myNumber + "</h1>";                
                })

                function adminLogin(){
                    let user=document.getElementById("adminUser").value
                    let pass=document.getElementById("adminPass").value
                    if(user==="admin" && pass==="ctu123"){
                        document.getElementById("adminMsg").innerHTML="<span style='color:lime;font-size:10px'>Login Successful</span>"
                        document.getElementById("adminTab").style.display="inline-block"
                        document.getElementById("adminPanel").style.display="block"
                        updateQueueListDisplay()
                    } else{
                        document.getElementById("adminMsg").innerHTML="<span style='color:red;font-size:10px'>Wrong credentials</span>"
                    }
                }

                function updateQueueListDisplay(){
                    let ul=document.getElementById("queueListDisplay")
                    ul.innerHTML=""
                    queueList.forEach(s=>{
                        let li=document.createElement("li")
                        li.textContent="Queue "+s.number+" - "+s.name
                        ul.appendChild(li)
                    })
                }

                function callNext(){

    db.ref("serving").once("value").then(function(snapshot){

        let currentServing = snapshot.val() || 0
        let nextServing = currentServing + 1

        db.ref("serving").set(nextServing)

    })

}

                function resetQueue(){

    db.ref("queue").remove()
    db.ref("serving").set(0)
    db.ref("queueCounter").set(0)


    queueNumber = 0
    serving = 0

    updateBoard()
    updateQueueListDisplay()

}

                function updateBoard(){
                    document.getElementById("serving").innerText=serving
                }

                function closePopup(){

    document.getElementById("popup").style.display="none"

    let sound = document.getElementById("beepSound")
    sound.pause()
    sound.currentTime = 0

}

                function forgotPassword(){
                    document.getElementById("forgotPopup").style.display="flex";
                    document.getElementById("qnaStep").style.display="block";
                    document.getElementById("resetStep").style.display="none";
                }

                function closeForgotPopup(){
                    document.getElementById("forgotPopup").style.display="none";
                    document.getElementById("qnaAnswer").value="";
                    document.getElementById("newPass").value="";
                }

                function checkQnA(){
                    let answer=document.getElementById("qnaAnswer").value.trim();
                    if(answer.toLowerCase()===correctAnswer.toLowerCase()){
                        document.getElementById("qnaStep").style.display="none";
                        document.getElementById("resetStep").style.display="block";
                    }else{
                        alert("Incorrect answer. Please try again.");
                    }
                }
                
                function resetPassword(){
                    let newPass=document.getElementById("newPass").value.trim();
                    if(newPass){
                        alert("Password has been successfully reset!");
                        closeForgotPopup();
                        }else{
                            alert("Please enter a new password.");
                        }
                }
                            
               