firebase.initializeApp({
  
        apiKey: "AIzaSyD7XjrrJU3-pHQLkQPbpJjGiNRm3wIneG4",
        authDomain: "task-app-37f42.firebaseapp.com",
        projectId: "task-app-37f42",
        storageBucket: "task-app-37f42.appspot.com",
        messagingSenderId: "909049888219",
        appId: "1:909049888219:web:d8392d6f0aa8612e067bfe"

});


const db = firebase.firestore();


function addTask(){
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
         db.collection("tasks").add({
        task: task,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
         });
        taskInput.value = "";
       
    }
}

function renderTasks(doc){
    const tasklist = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
        <span>${doc.data().task}</span>
        <button onclick="deleteTask('${doc.id}')">Delete</button>
        `;
        tasklist.appendChild(taskItem);
}


db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type === "added") {
                renderTasks(change.doc);
            }
        });
    });

function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
    location.reload();
    
}