var dog, happyDog, database, foodS, foodStock;
var lastFed, fedTime;
var addFood, feedDog;
var foodObj;
var add, feed;

function preload()
{
  dogimage1 = loadImage("images/dogImg.png");
  dogimage2 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite (250,250,10,10);
  dog.addImage(dogimage1);
  dog.scale = 0.2;

  database = firebase.database();

  foodStock = database.ref('Food')
  foodStock.on("value", readStock);

  foodObj = new Food();
  
  feed = createButton("Press to feed the dog");
  feed.position(570,65);
  feed.mousePressed(feedDog);

  add = createButton("Press to add food");
  add.position(720,65);
  add.mousePressed(addFood)
  

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  });
  

}

function draw() {  
  background(46, 139, 87);

  foodObj.display();

  drawSprites();

  /*
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogimage2);
  }

  textSize(15);
  fill("orange");
  text("Press the up arrow key to feed the dog milk", 200, 100);
  text("You have: " + foodS + " Milk left", 200, 70); 
  */

  fill(255,255,254);
  textSize(15);
  if(lastFed>12){
    text("Last Feed : "+ lastFed%12 +" PM"+50,30);
  }else if(lastFed==0){
  text("Last Feed : 12AM", 50,30)
  }else{
  text("Last Feed :" +lastFed + "AM", 50,30);
}
}



function readStock() {
  foodS = data.val
}

function writeStock(x) {
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

//function to update food stock and last fed time 
function feedDog() {
  dog.addImage(dogimage2);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:Hour()
  })
}

function addFoods() {
foodS++;
database.ref('/').update({
  Food:foodS
})
}