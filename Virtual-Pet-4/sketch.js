//Create variables here
var database;

var dog,happyDog;
var dogImg,happyDogImg;
var dataBase;
var foodS,foodStock;



var feedButton, addButton;
var lastFed;
var foodObj;

var gameState = "Hungry";
var changingGameState, readingGameState;

var bedroomImg, washroomImg, gardenImg;

var sadDodImg,sadDog;

var PlayingImg,SleepingImg,BathingImg;
var Playing,Sleeping,Bathing;

var currentTime;


function preload(){
  //load images here
  backgroundImg = loadImage("images/bg.png");

  dogImg = loadImage('images/Dog.png');
  happyDogImg = loadImage('images/happy dog.png');
  sadDog = loadImage('images/Lazy.png');
  milkBotltle2 = loadImage('images/Food Stock.png');

  bedroomImg = loadImage('images/Bed Room.png');
  washroomImg = loadImage('images/Wash Room.png');
  gardenImg = loadImage('images/Garden.png');

  Playing = loadImage('images/running.png');
  Sleeping = loadImage('images/Lazy.png');
  Bathing = loadImage('images/Happy.png');


}

function setup() {
  var canvas = createCanvas(600, 570);
  database = firebase.database();

  dog = createSprite(300,400,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feedButton = createButton("Feed the Dog");
  addButton = createButton("Add Food");

  input = createInput ("Fill your Dog's Name"); 
  input.position (750, 75); 

  var name = input.value();

 feedButton.position(400,80);
  addButton.position(650,90);

  feedButton.mousePressed(feedDog);
  addButton.mousePressed(addFood);

  foodObj = new Food();
 


}


function draw() {  
  background(backgroundImg);

  foodObj.display();
  writeStock(foodS);
  
  //add styles here
  database.ref('FeedTime').on("value",readTime);

  //read gamestate from database
  readingGameState = database.ref('gameState');
  readingGameState.on("value",function(data){
    gameState = data.val();
  });

  if(foodS == 0){
    dog.addImage(happyDog);
    milkBotltle2.visible=false;
  }else{
    dog.addImage(sadDog);
    milkBotltle2.visible=true;
  }

  if(gameState===1){
    dog.addImage(happyDog);
    dog.scale=0.175;
    dog.y=250;
  }

  if(gameState===2){
    dog.addImage(sadDog);
    dog.scale=0.175;
    milkBotltle2.visible=false;
    dog.y=250;
  }

  var Bath=createButton("I want to take bath");
  Bath.position(580,125);
  if(Bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===3){
    dog.addImage("washroomImg");
    dog.scale=1;
  milkBotltle2.visible=false;
  }

  var Sleep =createButton("I am very sleepy");
  Sleep.position(710,125);
  if(Sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState': gameState});
  }));
  if(gameState===4){
    dog.addImage("bedroomImg");
    dog.scale=1;
    milkBotltle2.visible=false;
  }
  var Play=createButton("Lets play !");
  Play.position(500,160);
  if(Play.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===5){
    dog.addImage("livingroomImg");
    dog.scale=1;
    milkBotltle2.visible=false;
  }
  var PlayInGarden=createButton("Lets play in park");
  PlayInGarden.position(585,160);
  if(PlayInGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===6){
    dog.y=175;
    dog.addImage("gardenImg");
    dog.scale=1;
    milkBotltle2.visible=false;
  }
  if(gameState!="Hungry"){
    feedButton.hide();
    addButton.hide();
    dog.remove(); 

  }else{
    feedButton.show();
    addButton.show();
    dog.addImage("dogImg");
  }

  fill(0);
  textSize(20);
  text("Food Stock: "+foodS,30,170);

  if(lastFed>=12){
  text("Last Fed: "+lastFed%12 + " PM",30,200);
  }else if(lastFed===0){
    text("Last Fed: 12AM",50,50);
  }else{
    text("Last Fed: "+lastFed + "AM",30,200);
  }

  currentTime = hour();
   if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }
  
  drawSprites();

}

//function to read and write food stock from database
function readStock(data){

  foodS = data.val();
 // foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  //database.ref('/').update({
    //food:x
  //})
}


function readTime(data){
  lastFed = data.val();
}

//function to write values in database

function feedDog(){

  dog.changeAnimation(happyDogImg);

  if(foodS<=0){
    foodS=0;
    }else{
      foodS = foodS-1;
    }
  
  database.ref('/').update({
    FeedTime:hour(),
    Food:foodS
  })
}

function addFood(){
  

  foodS = foodS+1;

  database.ref('/').update({
    Food:foodS
  })

}

  function update(state){
    database.ref('/').update({
      gameState:state
    });
  }