let canvas;
let button;
let button2;
let button3;
let food = 0;
let feeding = false;
let r = 0;
let g = 0;
let b = 255;

let circle1 = {
  x: 0,
  y: 300,
  d: 20
}

let hungry = 0;
let full = 1;
let tamaState = hungry;

let tamaX;
let tamaY;
let tamaDiam;

function setup() {

  canvas = createCanvas(800, 600);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element
  tamaX = width/2;
  tamaY = height/2;
 tamaDiam = width/6;
 

  addGUI();
}

function draw() {
  background(r, g, b);
  r = map(mouseX, 0, 600, 0, 255);
  g = map(mouseY, 0, 400, 0, 255);
  b = map(mouseX, 0, 600, 255, 0);
  
  fill(r, g, b, 50);
  stroke('black');
  strokeWeight(3);
  ellipse(circle1.x, circle1.y, circle1.d, circle1.d);
  circle1.x = mouseX
  circle1.y = mouseY

  if (mouseX > 400) {
    circle1.d = 30
  }
  if (mouseX < 200) {
    circle1.d = 20
  }
  if (mouseX > 300) {
    circle1.d = 40
  }
  if (mouseX > 400) {
    circle1.d = 50
  }
  if (mouseX > 500) {
    circle1.d = 60
  }
  
   //manage state of Tama
  if(tamaState == hungry){
    fill(171,189,250);

    //manage switching to full state
    if(tamaDiam > width/4){
      tamaState = full;
    }
    }else if(tamaState == full){
    //full color
    fill(255,249,126);

    //manage returning to hungry state
    if(tamaDiam > width/6){
      if(frameCount % 2 == 0) tamaDiam--; // reduce every second frame
    }else{
      tamaState = hungry;
    }
  }
  ////draw Tama and closed mouth
 ellipse(300, 350, 400, 230);
  //
  line(width/2-8,200,width/2-8,120)
  circle(width/2-8, 120, 50);
  //
  circle(397, 255, 160);
  //eyes
 ellipse(359, 240, 40, 15);
   circle(359, 240, 15);
ellipse(429, 240, 40, 15);
  circle(429, 240, 15);
 //  mouth
 //circle(tamaX,tamaY,tamaDiam);
  //fill(0);
  let mouthOffset = tamaDiam/100;

  ellipse(tamaX-mouthOffset/20, tamaY, mouthOffset-50,50);
 
 if(food > 0 ){

    //Tama Eat
    if(frameCount % 30 < 15 && tamaState == hungry){
      eatFood();
    }

    //draw food
    fill(100);
    circle(tamaX,tamaY+food,food-50);

  }else if(feeding){
    //manage button state, only do this once IF the button is inactive
    feeding = false;
    button.html("FEED");
    button.removeClass("inactive");
  }
  
  
}

function eatFood(){

  //draw open mouth
  fill(0);
  circle(tamaX,tamaY,tamaDiam/3);

  //reduce food & grow Tama
  food --;
  tamaDiam++;

}

function addGUI()
{

  //add a button
  button = createButton("FEED");
  button2 = createButton("SLIDE THE MOUSE TO SEE THE COLOUR CHANGE");

  button.addClass("button");
  button2.addClass("button");

  //Add the play button to the parent gui HTML element
  button.parent("gui-container");
  button2.parent("gui-container");
  
  //Adding a mouse pressed event listener to the button 
  button.mousePressed(handleButtonPress); 
 // button2.mousePressed(handleButton2Press); 

}

function handleButtonPress()
{
    if(!feeding){
      //set food to random value
      food = random(40,60);
      feeding = true;

      //manage button state
      button.html("FEEDING");
      button.addClass("inactive");
    }
}