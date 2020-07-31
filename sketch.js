//Create variables here
var dog,dogImg,happyDog,database,foodS,foodStock;

var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);
  dog = createSprite(750,250,10,10)
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  feed=createButton("Feed the Dog");
  feed.position(900,65);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(1000,65);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46,139,87);

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed = data.val();
})

  drawSprites();
  //add styles here
  textSize(15);
  fill("white");
  text("Food Stock : "+foodS,450,90);


  textSize(15);
  fill(255,255,254);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 +"PM",350,30);
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + "AM",350,30);
  }
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref("/").update({
    Food:x
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}



