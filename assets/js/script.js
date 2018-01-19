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

  //Store URL
  var newURL = '';

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

    var imageURL = $("#input-url").val().trim();
    console.log(imageURL);

    if (imageURL === "") {

      console.log('this is working');

          // Get file
      var file = imageInput.files[0];
      console.log(file);

      // Create a storage reference
      var storageRef = firebase.storage().ref("user_images/" + file.name);

      // Upload File
      var task = storageRef.put(file);

      var newURL = '';

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

          newURL = url; 

          console.log(url);
          console.log(newURL);

          $(".profile").attr("src", url);
          var cors_api_host = 'cors-anywhere.herokuapp.com';


          // Gather link to image

          var source = newURL;
          console.log(source);


          //header keys
          var headers = {
            "app_id"          : "59fe3f8b",
            "app_key"         : "472b1119c610482500bfb00b6e897a1c"
          };
          
          //face recognition api call
          var urlFace = "http://" + cors_api_host +  "/http://api.kairos.com/detect";
          var payload  = { "image" : source };
          console.log(payload);
          console.log(urlFace);
          $.ajax(urlFace, {
            headers  : headers,
              type: "POST",
              data: JSON.stringify(payload),
              dataType: "JSON"
          }).done(function(response){
            
            console.log(response);
            //console.log(response.images[0].faces[0].height);
          });

          //emotion api call
          var url = "http://" + cors_api_host + '/https://api.kairos.com/v2/media?source=' + source ;
          $.ajax(url, {
            headers  : headers,
              type: "POST",
              dataType: "JSON"
          }).done(function(response){
            
            console.log(response);
            
          });

          });

        //end complete function  
        });
    }
    else {

      var cors_api_host = 'cors-anywhere.herokuapp.com';
      var source = $("#input-url").val().trim();


          //header keys
          var headers = {
            "app_id"          : "59fe3f8b",
            "app_key"         : "472b1119c610482500bfb00b6e897a1c"
          };
          
          //face recognition api call
          var urlFace = "http://" + cors_api_host +  "/http://api.kairos.com/detect";
          var payload  = { "image" : source };
          console.log(payload);
          console.log(urlFace);
          $.ajax(urlFace, {
            headers  : headers,
              type: "POST",
              data: JSON.stringify(payload),
              dataType: "JSON"
          }).done(function(response){
            
            console.log(response);
            //console.log(response.images[0].faces[0].height);
          });

          //emotion api call
          var url = "http://" + cors_api_host + '/https://api.kairos.com/v2/media?source=' + source ;
          $.ajax(url, {
            headers  : headers,
              type: "POST",
              dataType: "JSON"
          }).done(function(response){
            
            console.log(response);
            
          });

    }



    

      // end on-click
      });

  });
