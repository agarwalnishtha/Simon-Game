var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red","blue", "green", "yellow"];

var started = "false";

var level = 0;

$(document).keydown(function(){
  if(started === "false"){
    nextSequence();
    started = "true";
  }
})

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);

  var randomChooseColor = buttonColors[randomNumber];
  gamePattern.push(randomChooseColor);

  $("#" + randomChooseColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChooseColor);
}

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  if (userClickedPattern[userClickedPattern.length-1] === gamePattern[userClickedPattern.length-1]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
          nextSequence();
      },1000);
    }
  }

  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
})

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
      $("#" + currentColor).removeClass("pressed");
    },100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = "false";
}
