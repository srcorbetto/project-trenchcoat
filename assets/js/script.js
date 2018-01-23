$(document).ready(function() {

    // Initialize Firebase
    //========================================================================
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

    var creepIndex = 0;

    var impressionSummaryImage;

    var faceScore = 0;

    var pitch = 0;

    var anger = 0;

    var disgust = 0;

    var fear = 0;

    var roll = 0;




    // Face Click
    //========================================================================
    $("#face1").click(function() {

        $(this).toggleClass("face1-active");
        $("#face2").removeClass('face2-active');
        $("#face3").removeClass('face3-active');
        $("#face4").removeClass('face4-active');
        $("#face5").removeClass('face5-active');

        impressionScore = 33;
        console.log(impressionScore);

        impressionSummaryImage = "assets/img/svg/1-active.svg";

        impressionScore = 33;
        console.log(impressionScore);

    });
    $("#face2").click(function() {

        $(this).toggleClass("face2-active");
        $("#face1").removeClass('face1-active');
        $("#face3").removeClass('face3-active');
        $("#face4").removeClass('face4-active');
        $("#face5").removeClass('face5-active');

        impressionScore = 24.75;
        console.log(impressionScore);

        impressionSummaryImage = "assets/img/svg/2-active.svg";

        impresssionScore = 24.75;
        console.log(impressionScore);


    });
    $("#face3").click(function() {

        $(this).toggleClass("face3-active");
        $("#face2").removeClass('face2-active');
        $("#face1").removeClass('face1-active');
        $("#face4").removeClass('face4-active');
        $("#face5").removeClass('face5-active');

        impressionScore = 16.5;
        console.log(impressionScore);

        impressionSummaryImage = "assets/img/svg/3-active.svg";

        impressionScore = 16.5;
        console.log(impressionScore);


    });
    $("#face4").click(function() {

        $(this).toggleClass("face4-active");
        $("#face2").removeClass('face2-active');
        $("#face3").removeClass('face3-active');
        $("#face1").removeClass('face1-active');
        $("#face5").removeClass('face5-active');

        impressionScore = 8.25;
        console.log(impressionScore);

        impressionSummaryImage = "assets/img/svg/4-active.svg";

        impressionScore = 8.25;
        console.log(impressionScore);


    });
    $("#face5").click(function() {

        $(this).toggleClass("face5-active");
        $("#face2").removeClass('face2-active');
        $("#face3").removeClass('face3-active');
        $("#face4").removeClass('face4-active');
        $("#face1").removeClass('face1-active');

        impressionScore = 0;
        console.log(impressionScore);

        impressionSummaryImage = "assets/img/svg/5-active.svg";

        impressionScore = 0;
        console.log(impressionScore);

    });

    // Smooth scrolling
    //========================================================================
    $(document).on('click', 'a[href^="#"]', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });


    // Process of uploading the image
    //========================================================================
    $("#form-submit").on("click", function(){

      $("#modalContent").fadeToggle();

    });

    $("#goBack").on("click", function(){

      $("#modalContent").fadeToggle();

    });

    //Submit Modal
    // ==================================================
    $("#Proceed").on("click", function(e) {
        e.preventDefault();
        faceScore = 0;

        $("#modalContent").fadeToggle();


            
      

            // Get file
            var file = imageInput.files[0];

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
                        storageRef.getDownloadURL().then(function(url) {

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
                                "app_id": "59fe3f8b",
                                "app_key": "472b1119c610482500bfb00b6e897a1c"
                            };

                            //face recognition api call
                            var request = new XMLHttpRequest();

                            request.open('POST', 'http://cors-anywhere.herokuapp.com/https://api.kairos.com/detect');

                            request.setRequestHeader('app_id', '59fe3f8b');
                            request.setRequestHeader('app_key', '472b1119c610482500bfb00b6e897a1c');
                            request.setRequestHeader('Content-Type', 'application/JSON');

                            request.onreadystatechange = function() {
                                if (this.readyState === 4) {
                                    console.log('Status:', this.status);
                                    console.log('Headers:', this.getAllResponseHeaders());
                                    console.log(JSON.parse(this.responseText));

                                    //face logic
                                    pitch = response.images[0].faces[0].pitch;
                                    roll = response.images[0].faces[0].roll;
                                    if (pitch < 0) {
                                        faceScore = faceScore + 6;
                                        console.log(faceScore);
                                    }
                                    if (roll < -10 || roll > 10) {
                                        faceScore = faceScore + 6;
                                    }
                                    console.log(faceScore);
                                }
                            };

                            var body = {
                                'image': source
                            }
                            console.log('this is correct');
                            request.send(JSON.stringify(body));


                            //emotion api call
                            var url = "http://" + cors_api_host + '/https://api.kairos.com/v2/media?source=' + source;
                            $.ajax(url, {
                                headers: headers,
                                type: "POST",
                                dataType: "JSON"
                            }).done(function(response) {

                                console.log(response.frames[0].people[0].emotions.fear);
                                fear = response.frames[0].people[0].emotions.fear;

                                //face logic
                                disgust = response.frames[0].people[0].emotions.disgust;
                                anger = response.frames[0].people[0].emotions.anger;
                                if (disgust > 0) {
                                faceScore = faceScore + 7;
                                }
                                if (anger > 0) {
                                    faceScore = faceScore + 7;
                                }
                                if (fear > 0) {
                                    faceScore = faceScore + 7;
                                    console.log(faceScore);
                                }
                                console.log(faceScore);

                                console.log(response);

                                wordLength();
                                createTableRow(imageURL);
                                indexChart();

                            });

                        });

                        //end complete function  
                    });
            } else {


                var cors_api_host = 'cors-anywhere.herokuapp.com';
                var source = $("#input-url").val().trim();
                $('.profile').attr('src', source);


                //header keys
                var headers = {
                    "app_id": "59fe3f8b",
                    "app_key": "472b1119c610482500bfb00b6e897a1c"
                };

                //face recognition api call
                var request = new XMLHttpRequest();

                request.open('POST', 'http://cors-anywhere.herokuapp.com/https://api.kairos.com/detect');

                request.setRequestHeader('app_id', '59fe3f8b');
                request.setRequestHeader('app_key', '472b1119c610482500bfb00b6e897a1c');
                request.setRequestHeader('Content-Type', 'application/JSON');

                request.onreadystatechange = function() {
                    if (this.readyState === 4) {
                        console.log('Status:', this.status);
                        console.log('Headers:', this.getAllResponseHeaders());
                        var response = JSON.parse(this.responseText);


                        //face logic
                        pitch = response.images[0].faces[0].pitch;
                        roll = response.images[0].faces[0].roll;
                        if (pitch < 0) {
                            faceScore = faceScore + 6;
                            console.log(faceScore);
                        }
                        if (roll < -10 || roll > 10) {
                            faceScore = faceScore + 6;
                        }
                        console.log(faceScore);

                    }
                };

                var body = {
                    'image': source
                }
                console.log('this is correct');
                request.send(JSON.stringify(body));

                //emotion api call
                var url = "http://" + cors_api_host + '/https://api.kairos.com/v2/media?source=' + source;
                $.ajax(url, {
                    headers: headers,
                    type: "POST",
                    dataType: "JSON"
                }).done(function(response) {

                    console.log(response);

                    console.log(response.frames[0].people[0].emotions.fear);
                    fear = response.frames[0].people[0].emotions.fear;

                    //face logic
                    disgust = response.frames[0].people[0].emotions.disgust;
                    anger = response.frames[0].people[0].emotions.anger;
                    if (disgust > 0) {
                    faceScore = faceScore + 7;
                    }
                    if (anger > 0) {
                        faceScore = faceScore + 7;
                    }
                    if (fear > 0) {
                        faceScore = faceScore + 7;
                        console.log(faceScore);
                    }
                    console.log(faceScore);

                    //call functions
                    wordLength();
                    createTableRow(imageURL);
                    indexChart();

                });

            }

    });

    function createTableRow(url) {

        var newImageUrl = url;
        // Build the table row and add info into into the different <td>'s
        var creepInfoRow = $("<tr>");
        creepInfoRow.html("<td>" + "<img class='history-profile' src='" + newImageUrl + "'>" + "<td>" + faceScore + "</td>");

        //console.log("ROW MADE");

        $("tbody").prepend(creepInfoRow);
    }

    // });  

        function wordLength() {
            var str1 = $("#input-text").val().trim();
            console.log(str1);
            var longestWord = "";
            var totalLetters = 0;
            var wordLengthAverage = 0;
            str1 = str1.replace(/[\r\n]+/g, " ");
            var textArray = str1.split(" ");

            for (var i = 0; i < textArray.length; i++) {
                textArray[i] = textArray[i].replace(/[^a-zA-Z]+/g, "");
                // Average word length calculation
                totalLetters = totalLetters + textArray[i].length;
                wordLengthAverage = totalLetters / (i + 1);
                // Find the longest word and save it and display it
                if (textArray[i].length > longestWord.length) {
                    longestWord = textArray[i];
                    console.log("Longest word: " + longestWord);
                };
            };


            
            var textScore = 33 - ((2 * wordLengthAverage) + longestWord.length);

            if (textScore < 0) {
                textScore = 0;
            };

            console.log("textScore:" + textScore);


            var targetName = $("#input-name").val().trim();

            creepIndex = textScore + impressionScore + faceScore;
            creepIndex = creepIndex.toFixed(1);
            console.log("creepIndex: " + creepIndex);

            $(".personname").text(targetName);

              $("#textInfo1").text("Average Word Length: " + wordLengthAverage.toFixed(3)); 
              $("#textInfo2").text("Longest Word: " + longestWord + ", " + longestWord.length + " letters");
        }

    // This function draws the background arc upon page refresh or reset button
    //========================================================================
    var bgChart = function() {
        var chart = new Chartist.Pie('#chart1', {
            series: [0, 0, 100],
            labels: [""]
        }, {
            donut: true,
            donutWidth: 30,
            startAngle: 270,
            total: 200,
            showLabel: false
        });

        chart.on('draw', function(data) {
            if (data.type === 'slice') {
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
                        to: '0px',
                        easing: Chartist.Svg.Easing.easeOutQuint,
                        // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                        fill: 'freeze'
                    }
                };

                // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
                if (data.index !== 0) {
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


    // This function displays our calculated index chart
    var indexChart = function() {
        function displayIndextimeout() {
            setTimeout(displayTime, 4000);
        };

        function displayTime() {
            $(".score").text("Creep Index: " + creepIndex);
        };

        var chart = new Chartist.Pie('#chart2', {
            series: [creepIndex, 0, 0],
            labels: [""]
        }, {
            donut: true,
            donutWidth: 30,
            startAngle: 270,
            total: 200,
            showLabel: false
        });

        chart.on('draw', function(data) {
            if (data.type === 'slice') {
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
                        to: '0px',
                        easing: Chartist.Svg.Easing.easeOutQuint,
                        // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                        fill: 'freeze'
                    }
                };

                // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
                if (data.index !== 0) {
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