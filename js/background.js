/*
Author: Gvozden Despotovski
Version: 0.1
Description: A dynamic particle background written in p5.js

Licence: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) 
08.Oct.2019.
*/
function setup() {
  cwidth = document.body.clientWidth;
  cheight = document.body.clientHeight;
  activateStrokes = false;
  var canvas = createCanvas(cwidth, cheight);

  deviceMovementX = 0;
  deviceMovementY = 0;
  canvas.parent("dyn-bg");
  //Prepare the dot object array
  
  dots = [];
  maxDotSize = 4;
  for(i = 0; i <= cwidth/10; i++){
    var dotSize = random(maxDotSize);
    var dotX = random(cwidth-dotSize);
    var dotY = random(cheight-dotSize);
    
    dot = {
     size:{
       value:dotSize,
       growing:false,
      },
     x:dotX,
     y:dotY,
     alpha: {
      value:random(),
      growing:true,
     }
    }
    
    dots.push(dot);
  }
  
}
  var framerateCounter = 0;
  var interval = 0;
function windowResized() {
    cwidth = $("#main-wrapper").width();
    cheight = $("#main-wrapper").height();
    resizeCanvas(cwidth, cheight);
  }
function draw() {
  background('#293132');
  noStroke();


//Performance boosting. Will not animate background when not in viewport. Pauses execution.
  if($("#dyn-bg").is(":in-viewport")){ //If in viewport
    loop();
  } else { //If not
    noLoop();

    var waiter = setInterval(function(){ //Create a listener in case background returns to viewport
      if($("#dyn-bg").is(":in-viewport")){ 
        loop();

        clearInterval(waiter);
      } 
    }, 1000);
  }
//FPS checker and breaker.
//If fps less than 24, stop looping
  framerateCounter += frameRate();
  interval++;

  if(interval == 60){
    if(framerateCounter / 60 < 24){
      noLoop();
      interval = 0;
      framerateCounter = 0;
    } else {
      console.log("fps fine");
      interval = 0;
      framerateCounter = 0;
      }
  }

  for(i = 0; i<=dots.length-1; i++){
    
    newAlpha = dots[i].alpha;
    
    if(newAlpha.growing == true){
      newAlpha.value += 0.01;
    } else newAlpha.value -= 0.05;
    
    if(newAlpha.value > 0.98 ){
      newAlpha.growing = false;
    } else if(newAlpha.value < 0.1 ){
      newAlpha.growing = true;
      dots[i].x = random(cwidth - dots[i].size.value);
      dots[i].y = random(cheight - dots[i].size.value);

      if(!activateStrokes){
        dots[i].size.value = random(maxDotSize);
      }

 
    }
    
    
    dots[i].alpha = newAlpha;
    
    movementX = (mouseX - dots[i].x)/128;
    movementY = (mouseY - dots[i].y)/128;

      deviceMovementX = pRotationX/100;
      deviceMovementY = pRotationY/100;

    
   fill('rgba(147,183,190, '+newAlpha.value+')');

   if(activateStrokes){

    for(p = 0; p <= dots.length -1; p++){
      if(dots[p].x < mouseX && dots[p].x >= mouseX - 50){
        if(dots[p].y < mouseY && dots[p].y >= mouseY - 50){
          dots[p].x += (dots[p].x - mouseX)/100;
          dots[p].y += (dots[p].y - mouseY)/100;
        }
      }
      if(dots[p].x < mouseX && dots[p].x >= mouseX - 50){
        if(dots[p].y > mouseY && dots[p].y <= mouseY + 50){
          dots[p].x += (dots[p].x - mouseX)/100;
          dots[p].y += (dots[p].y - mouseY)/100;
        }
      }
      if(dots[p].x > mouseX && dots[p].x <= mouseX + 50){
        if(dots[p].y < mouseY && dots[p].y >= mouseY - 50){
          dots[p].x += (dots[p].x - mouseX)/100;
          dots[p].y += (dots[p].y - mouseY)/100;
        }
      }
      if(dots[p].x > mouseX && dots[p].x <= mouseX + 50){
        if(dots[p].y > mouseY && dots[p].y <= mouseY + 50){
          dots[p].x += (dots[p].x - mouseX)/100;
          dots[p].y += (dots[p].y - mouseY)/100;
        }
      }
    }
    if(dots[i].size.value >= 2* maxDotSize ){
      dots[i].size.growing = false;
    } else if(dots[i].size.value <= 1){
      dots[i].size.growing = true;
    }
    if(dots[i].size.growing == true){
      dots[i].size.value += 0.1;
    } else dots[i].size.value -= 0.2;

 
   }

   randomMovement = random(-0.2, 0.2);
   dots[i].x += randomMovement;
   dots[i].y += randomMovement;
   circle(dots[i].x-movementX-deviceMovementX, dots[i].y-movementY-deviceMovementY, dots[i].size.value);

  }

}