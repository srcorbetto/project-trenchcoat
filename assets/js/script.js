$(document).ready(function(){

	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBQ87_3Gzqz4wbtrpiCPnU_ohSwprut8So",
    authDomain: "project-trenchcoat.firebaseapp.com",
    databaseURL: "https://project-trenchcoat.firebaseio.com",
    projectId: "project-trenchcoat",
    storageBucket: "project-trenchcoat.appspot.com",
    messagingSenderId: "404151361992"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Selector for the file input
  var imageInput = document.getElementById("input-image");

  // Process of uploading the image
  imageInput.addEventListener("change", function(e){

    // Get file
    var file = e.target.files[0];

    // Create a storage reference
    var storageRef = firebase.storage().ref("user_images/" + file.name);

    // Upload File
    var task = storageRef.put(file);


    // Update progress
    task.on("state_changed",

      function progress(snapshot) {

        console.log(snapshot);

      },

      function error(err) {

        console.log(err);

      },

      function complete() {

        console.log("complete");

        //Once complete - get the stored image URL
        storageRef.getDownloadURL().then(function(url){

          console.log(url);

          $(".card-img-top").attr("src", url);

        });

      }

      );

  });

  });