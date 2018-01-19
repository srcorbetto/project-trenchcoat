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

  //Face Impression value
  var impressionScore;

  // Face Click
  $("#face1").click(function() {

    $(this).toggleClass("face1-active");
    $("#face2").removeClass('face2-active');
    $("#face3").removeClass('face3-active');
    $("#face4").removeClass('face4-active');
    $("#face5").removeClass('face5-active');

    impresssionScore = 33;
    console.log(impresssionScore);

  });
  $("#face2").click(function() {

    $(this).toggleClass("face2-active");
    $("#face1").removeClass('face1-active');
    $("#face3").removeClass('face3-active');
    $("#face4").removeClass('face4-active');
    $("#face5").removeClass('face5-active');

    impresssionScore = 24.75;
    console.log(impresssionScore);

  });
  $("#face3").click(function() {

    $(this).toggleClass("face3-active");
    $("#face2").removeClass('face2-active');
    $("#face1").removeClass('face1-active');
    $("#face4").removeClass('face4-active');
    $("#face5").removeClass('face5-active');

    impresssionScore = 16.5;
    console.log(impresssionScore);

  });
  $("#face4").click(function() {

    $(this).toggleClass("face4-active");
    $("#face2").removeClass('face2-active');
    $("#face3").removeClass('face3-active');
    $("#face1").removeClass('face1-active');
    $("#face5").removeClass('face5-active');

    impresssionScore = 8.25;
    console.log(impresssionScore);

  });
  $("#face5").click(function() {

    $(this).toggleClass("face5-active");
    $("#face2").removeClass('face2-active');
    $("#face3").removeClass('face3-active');
    $("#face4").removeClass('face4-active');
    $("#face1").removeClass('face1-active');

    impresssionScore = 0;
    console.log(impresssionScore);

  });


  // Process of uploading the image
  $("#form-submit").on("click", function(e){
    e.preventDefault();

    // Get file
    var file = imageInput.files[0];

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