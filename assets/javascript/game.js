$(document).ready(function(){
    var buttons = ["tiger","lion","panda","cat","dog","fish","monkey","kangaroo","bear","zebra","goose","gorilla","raccoon"];
    function displayButtons(){
        // show buttons onload and after click add button
        for(var i = 0;i<buttons.length;i++){
            var newButton = $("<button>").attr("data-name",buttons[i]);
            newButton.text(buttons[i]);
            $(".buttons").append(newButton);
        }
    }
    function displayImages(){
        // show images after click on buttons
    }
    function loadMore(){

    }
    displayButtons();
});