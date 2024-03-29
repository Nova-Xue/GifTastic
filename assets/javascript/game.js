$(document).ready(function () {
    $(".load-more").hide();
    var animal;
    var offset = 12;
    var buttons = ["tiger", "lion", "panda", "cat", "dog", "fish", "monkey", "kangaroo", "bear", "zebra", "goose", "gorilla", "raccoon"];
    function displayButtons() {
        // show buttons onload and after click add button
        $(".buttons").empty();
        for (var i = 0; i < buttons.length; i++) {
            var newButton = $("<button>").attr("data-name", buttons[i]);
            newButton.addClass("animal-button");
            newButton.text(buttons[i]);
            $(".buttons").append(newButton);
        }
    }
    function displayImages() {
        //reveal load button
        $(".load-more").css("display", "flex");
        // show images after click on buttons
        animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=12&api_key=0oFnBBdGOg499X6v1K8jK1297utpBDg6";
        $.ajax({
            method: "GET",
            url: queryURL
        }).then(function (resp) {
            //12 animal gifs and 3 in a row 
            $(".images").empty();
            for (var i = 1; i <= 4; i++) {
                var newRow = $("<div>");
                newRow.addClass("row");
                for (var j = 1; j <= 3; j++) {
                    var animalObj = resp.data[i * j - 1];
                    var newCol = $("<div>");
                    newCol.addClass("col-md-3 text-center");
                    var newHeading = $("<a>").text(animalObj.title + " Rating:" + animalObj.rating.toUpperCase());
                    newHeading.attr("href", animalObj.url);
                    var newImg = $("<img>").attr("src", animalObj.images.fixed_width_still.url);
                    newImg.addClass("img-fluid");
                    newImg.attr("value", animalObj.images.fixed_width.url);
                    newCol.append(newHeading, newImg);
                    newRow.append(newCol);

                }
                $(".images").append(newRow);
            }

        });

    }

    function changeDisplay() {
        var imageStill = $(this).attr("src");
        var image = $(this).attr("value");
        $(this).attr("src", image);
        $(this).attr("value", imageStill);

    }

    function loadMore() {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=12&offset=" + offset + "&api_key=0oFnBBdGOg499X6v1K8jK1297utpBDg6";
        $.ajax({
            method: "GET",
            url: queryURL
        }).then(function (resp) {
            for (var i = 1; i <= 4; i++) {
                var newRow = $("<div>");
                newRow.addClass("row");
                for (var j = 1; j <= 3; j++) {
                    var animalObj = resp.data[i * j - 1];
                    var newCol = $("<div>");
                    newCol.addClass("col-md-3 text-center");
                    var newHeading = $("<a>").text(animalObj.title + " Rating:" + animalObj.rating.toUpperCase());
                    newHeading.attr("href", animalObj.url);
                    var newImg = $("<img>").attr("src", animalObj.images.fixed_width_still.url);
                    newImg.addClass("img-fluid");
                    newImg.attr("value", animalObj.images.fixed_width.url);
                    newCol.append(newHeading, newImg);
                    newRow.append(newCol);

                }
                $(".images").append(newRow);
            }

        });
        offset += 12;
    }
    $("#add-animal").click(function (e) {
        e.preventDefault();
        var animal = $("#button-input").val().trim().toLowerCase();
        console.log(animal);
        if (buttons.indexOf(animal) == -1) {//input not in array
            buttons.push(animal);
            displayButtons();
            
        } else {

            alert("you have this animal!");
            
        }
        ///val not text
        $("#button-input").val("");
    });

    $(".load-more").click(loadMore);
    $(document).on("click", ".animal-button", displayImages);
    $(document).on("click", "img", changeDisplay);
    displayButtons();
});