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



    var str1 = $("#input-text").val().trim();
    console.log(str1);
    var longestWord = "";
    var totalLetters = 0;
    var wordLengthAverage = 0;
    str1 = str1.replace(/[\r\n]+/g," ");
    var textArray = str1.split(" ");

    for (var i=0; i<textArray.length;i++){
        textArray[i] = textArray[i].replace(/[^a-zA-Z]+/g,""); 
        // Average word length calculation
        totalLetters = totalLetters + textArray[i].length;
        wordLengthAverage = totalLetters/(i+1);
        // Find the longest word and save it and display it
        if (textArray[i].length > longestWord.length){
            longestWord = textArray[i];
            console.log("Longest word: " + longestWord);
        };
    };

    $("#textInfo").append("<br>" + "Average Word Length: " + wordLengthAverage.toFixed(3)); 
    $("#textInfo").append("<br>" + "Longest Word: " + longestWord + ", " + longestWord.length + " letters");





    // Get file
    var file = imageInput.files[0];

    var imageURL = $("#input-url").val().trim();
    console.log(imageURL);


    // if (imageURL === "") {

    //   console.log('this is working');

    //       // Get file
    //   var file = imageInput.files[0];
    //   console.log(file);

    //   // Create a storage reference
    //   var storageRef = firebase.storage().ref("user_images/" + file.name);

    //   // Upload File
    //   var task = storageRef.put(file);

    //   var newURL = '';

    //   // Update progress
    //   task.on("state_changed",

    //     function progress(snapshot) {

    //       console.log(snapshot);

    //     },

    //     function error(err) {

    //       console.log(err);

    //     },

    //     function complete() {

    //       console.log("complete");

    //       //Once complete - get the stored image URL
    //       storageRef.getDownloadURL().then(function(url){

    //       newURL = url; 

    //       console.log(url);
    //       console.log(newURL);

    //       $(".profile").attr("src", url);
    //       var cors_api_host = 'cors-anywhere.herokuapp.com';


    //       // Gather link to image

    //       var source = newURL;
    //       console.log(source);


    //       //header keys
    //       var headers = {
    //         "app_id"          : "59fe3f8b",
    //         "app_key"         : "472b1119c610482500bfb00b6e897a1c"
    //       };
          
    //       //face recognition api call
    //       var urlFace = "http://" + cors_api_host +  "/http://api.kairos.com/detect";
    //       var payload  = { "image" : source };
    //       console.log(payload);
    //       console.log(urlFace);
    //       $.ajax(urlFace, {
    //         headers  : headers,
    //           type: "POST",
    //           data: JSON.stringify(payload),
    //           dataType: "JSON"
    //       }).done(function(response){
            
    //         console.log(response);
    //         //console.log(response.images[0].faces[0].height);
    //       });

    //       //emotion api call
    //       var url = "http://" + cors_api_host + '/https://api.kairos.com/v2/media?source=' + source ;
    //       $.ajax(url, {
    //         headers  : headers,
    //           type: "POST",
    //           dataType: "JSON"
    //       }).done(function(response){
            
    //         console.log(response);
            
    //       });

    //       });

    //     //end complete function  
    //     });
    // }
    // else {

    //   var cors_api_host = 'cors-anywhere.herokuapp.com';
    //   var source = $("#input-url").val().trim();


    //       //header keys
    //       var headers = {
    //         "app_id"          : "59fe3f8b",
    //         "app_key"         : "472b1119c610482500bfb00b6e897a1c"
    //       };
          
    //       //face recognition api call
    //       var urlFace = "http://" + cors_api_host +  "/http://api.kairos.com/detect";
    //       var payload  = { "image" : source };
    //       console.log(payload);
    //       console.log(urlFace);
    //       $.ajax(urlFace, {
    //         headers  : headers,
    //           type: "POST",
    //           data: JSON.stringify(payload),
    //           dataType: "JSON"
    //       }).done(function(response){
            
    //         console.log(response);
    //         //console.log(response.images[0].faces[0].height);
    //       });

    //       //emotion api call
    //       var url = "http://" + cors_api_host + '/https://api.kairos.com/v2/media?source=' + source ;
    //       $.ajax(url, {
    //         headers  : headers,
    //           type: "POST",
    //           dataType: "JSON"
    //       }).done(function(response){
            
    //         console.log(response);
            
    //       });

    // }



    indexChart();

      // end on-click
      });

  // });  




  // This function draws the background arc upon page refresh or reset button
  var bgChart = function () {
    var chart = new Chartist.Pie('#chart1', {
      series: [0,0,100],
      labels: [""]
    }, {
      donut: true,
      donutWidth: 170,
      startAngle: 270,
      total: 200,
      showLabel: false
    });

    chart.on('draw', function(data) {
      if(data.type === 'slice') {
      // Get the total path length in order to use for dash array animation
      var pathLength = data.element._node.getTotalLength();

      // Set a dasharray that matches the path length as prerequisite to animate dashoffset
      data.element.attr({
        'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
      });

      // Create animation definition while also assigning an ID to the animation for later sync usage
      var animationDefinition = {
        'stroke-dashoffset': {
          id: 'anim' + data.index,
          dur: 10,
          from: -pathLength + 'px',
          to:  '0px',
          easing: Chartist.Svg.Easing.easeOutQuint,
          // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
          fill: 'freeze'
        }
      };

      // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
      if(data.index !== 0) {
        animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
      }

      // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
      data.element.attr({
        'stroke-dashoffset': -pathLength + 'px'
      });

      // We can't use guided mode as the animations need to rely on setting begin manually
      // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
      data.element.animate(animationDefinition, false);
    }
  });

  };


  bgChart();



    var textScore = 15;
    var impressionScore = 20;
    var faceScore = 17;

    var creepIndex = textScore + impressionScore + faceScore;
    creepIndex = creepIndex.toFixed(1);



  var indexChart = function () {
        function displayIndextimeout() { 
        setTimeout(displayTime, 4000);
        };

        function displayTime() {
          $(".score").text("Creep Index: " + creepIndex);
        };

  // This function displays our calculated index chart

    var chart = new Chartist.Pie('#chart2', {
      series: [creepIndex,0,0],
      labels: [""]
    }, {
      donut: true,
      donutWidth: 170,
      startAngle: 270,
      total: 200,
      showLabel: false
    });



    chart.on('draw', function(data) {
      if(data.type === 'slice') {
      // Get the total path length in order to use for dash array animation
      var pathLength = data.element._node.getTotalLength();

      // Set a dasharray that matches the path length as prerequisite to animate dashoffset
      data.element.attr({
        'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
      });

      // Create animation definition while also assigning an ID to the animation for later sync usage
      var animationDefinition = {
        'stroke-dashoffset': {
          id: 'anim' + data.index,
          dur: 6000,
          from: -pathLength + 'px',
          to:  '0px',
          easing: Chartist.Svg.Easing.easeOutQuint,
          // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
          fill: 'freeze'
        }
      };

      // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
      if(data.index !== 0) {
        animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
      }

      // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
      data.element.attr({
        'stroke-dashoffset': -pathLength + 'px'
      });

      // We can't use guided mode as the animations need to rely on setting begin manually
      // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
      data.element.animate(animationDefinition, false);
    }
  });

    displayIndextimeout();
  };

}); // End document ready