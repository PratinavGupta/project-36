var food, nameBox, gamestate;
var lastfed         ;   //
var currenttime  ;         // =19;


/*
3 = hungary
2=washroom
1=garden
*/

function preload() {
  Time()

  dogimg = loadImage("images/dogimg.png");
  dogimg2 = loadImage("images/dogimg1.png");
  milkImage = loadImage("images/milk.png");
  gardenImg = loadImage("images/Garden.png")
  livingroomimg = loadImage("images/livingroom.png");
  washroomImg = loadImage("images/washroom.png")

  lazyimg = loadImage("images/lazy.png")
}

function setup() {
  createCanvas(800, 600);

  dog = createSprite(550, 500)
  dog.addImage(lazyimg);
  dog.scale = 0.3;

  db = firebase.database();
  db_q = db.ref('gameState')
  db_q.on("value", function (data) {
    gamestate = data.val();
  });

  db_p = db.ref('food')
  db_p.on("value", function (a) {
    food = a.val();
  });

  db_z = db.ref('lastfed')
  db_z.on("value", function (z) {
    lastfed = z.val();
  });

  bottle1 = createSprite(100, 300)
  bottle1.addImage(milkImage);
  bottle1.scale = 0.15;
  bottle1.visible = false;
  bottle2 = createSprite(250, 400)
  bottle2.addImage(milkImage);
  bottle2.scale = 0.15;
  bottle2.visible = false;
  bottle3 = createSprite(350, 400)
  bottle3.addImage(milkImage);
  bottle3.scale = 0.15;
  bottle3.visible = false;
  bottle4 = createSprite(200, 300)
  bottle4.addImage(milkImage);
  bottle4.scale = 0.15;
  bottle4.visible = false;
  bottle5 = createSprite(300, 300)
  bottle5.addImage(milkImage);
  bottle5.scale = 0.15;
  bottle5.visible = false;
  bottle6 = createSprite(450, 400)
  bottle6.addImage(milkImage);
  bottle6.scale = 0.15;
  bottle6.visible = false;
  bottle7 = createSprite(400, 300)
  bottle7.addImage(milkImage);
  bottle7.scale = 0.15;
  bottle7.visible = false;
  bottle8 = createSprite(500, 300)
  bottle8.addImage(milkImage);
  bottle8.scale = 0.15;
  bottle8.visible = false;
  bottle9 = createSprite(50, 400)
  bottle9.addImage(milkImage);
  bottle9.scale = 0.15;
  bottle9.visible = false;
  bottle10 = createSprite(150, 400)
  bottle10.addImage(milkImage);
  bottle10.scale = 0.15;
  bottle10.visible = false;

  nameBox = createInput('Name your dog');
  nameBox.position(300, 50);
  nameBox.size(200);
  nameBox.style('height', '30px');
  feedButton = createButton('Press here to feed the dog');
  feedButton.position(100, 50);
  feedButton.style('backgroundColor', '#ADD8E6')
  feedButton.style('width', '250px')
  feedButton.style('height', '50px')
  addButton = createButton('Add food to the stock');
  addButton.position(400, 50);
  addButton.style('backgroundColor', '#FFA500')
  addButton.style('width', '250px')
  addButton.style('height', '50px')

  saveButton = createButton('Savedog name');
  saveButton.position(300, 150);
  saveButton.style('backgroundColor', '#FFA500')
  saveButton.style('width', '150px')
  saveButton.style('height', '40px')



  nameBox2 = createInput('Name your dog');
  nameBox2.position(550, 200);
  nameBox2.size(100);
  nameBox2.style('height', '30px');
}


function draw() {

  if (currenttime == lastfed + 1) {
    background(gardenImg, 550, 500)
    nameBox2.hide();
    gamestate = 1;
    dbchangeState(gamestate);
    dog.visible = false
    feedButton.hide();
    addButton.hide()
  }

  if (currenttime == lastfed + 2 || gamestate ==2) {
    background(washroomImg)
    gamestate = 2;
    dbchangeState(gamestate);
    nameBox2.hide();
    dog.visible = false
    feedButton.hide();
    addButton.hide();
  }

  if (currenttime - lastfed >= 3) {
    gamestate = 3;
    dbchangeState(gamestate);
  }

  if (gamestate == 3) {
    Bottle_change();
    nameBox.hide();
    background(0);

    feedButton.mousePressed(function () {
      dbchangefed(lastfed);
      dbchangeState(gamestate);
      dog.addImage(dogimg2);
      dbchange(food);
      if (food > 0)
        food--;
      lastfed = parseInt(currenttime);
      dbchangefed(lastfed);
    })

  }


  addButton.mousePressed(function () {
    if (food < 10) 
      food++;
    
      dbchange(food);
  })



  saveButton.mousePressed(function () {
  nameBox.hide();
  nameBox2.hide();
  })

  drawSprites();

}

function dbchangefed(z) {
  db.ref('/').update({ lastfed: z })
}


function dbchangeState(q) {
  db.ref('/').update({ gameState: q })
}


function dbchange(b) {
  db.ref('/').update({ food: b })
}

async function Time() {
  var nowtime = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var nowtime2 = await nowtime.json();
  var nowtime3 = nowtime2.datetime;
  var nowtime4 = nowtime3.slice(11, 13);
  currenttime = nowtime4;
  console.log(currenttime)
}

function Bottle_change() {
  if (food > 9) {
    bottle10.visible = true;
    bottle9.visible = true;
    bottle8.visible = true;
    bottle7.visible = true;
    bottle6.visible = true;
    bottle5.visible = true;
    bottle4.visible = true;
    bottle3.visible = true;
    bottle2.visible = true;
    bottle1.visible = true;
  }
  if (food == 9) {
    bottle10.visible = false;
    bottle9.visible = true;
    bottle8.visible = true;
    bottle7.visible = true;
    bottle6.visible = true;
    bottle5.visible = true;
    bottle4.visible = true;
    bottle3.visible = true;
    bottle2.visible = true;
    bottle1.visible = true;
  }
  if (food == 8) {
    bottle10.visible = false;
    bottle9.visible = false;
    bottle8.visible = true;
    bottle7.visible = true;
    bottle6.visible = true;
    bottle5.visible = true;
    bottle4.visible = true;
    bottle3.visible = true;
    bottle2.visible = true;
    bottle1.visible = true;
  }
  if (food == 7) {
    bottle10.visible = false;
    bottle9.visible = false;
    bottle8.visible = false;
    bottle7.visible = true;
    bottle6.visible = true;
    bottle5.visible = true;
    bottle4.visible = true;
    bottle3.visible = true;
    bottle2.visible = true;
    bottle1.visible = true;
  }
  if (food == 6) {
    bottle10.visible = false;
    bottle9.visible = false;
    bottle8.visible = false;
    bottle7.visible = false;
    bottle6.visible = true;
    bottle5.visible = true;
    bottle4.visible = true;
    bottle3.visible = true;
    bottle2.visible = true;
    bottle1.visible = true;
  }
  if (food == 5) {
    bottle10.visible = false;
    bottle9.visible = false;
    bottle8.visible = false;
    bottle7.visible = false;
    bottle6.visible = false;
    bottle5.visible = true;
    bottle4.visible = true;
    bottle3.visible = true;
    bottle2.visible = true;
    bottle1.visible = true;
  }
  if (food == 4) {
    bottle10.visible = false;
    bottle9.visible = false;
    bottle8.visible = false;
    bottle7.visible = false;
    bottle6.visible = false;
    bottle5.visible = false;
    bottle4.visible = true;
    bottle3.visible = true;
    bottle2.visible = true;
    bottle1.visible = true;
  }
  if (food == 3) {
    bottle10.visible = false;
    bottle9.visible = false;
    bottle8.visible = false;
    bottle7.visible = false;
    bottle6.visible = false;
    bottle5.visible = false;
    bottle4.visible = false;
    bottle3.visible = true;
    bottle2.visible = true;
    bottle1.visible = true;
  }
  if (food == 2) {
    bottle10.visible = false;
    bottle9.visible = false;
    bottle8.visible = false;
    bottle7.visible = false;
    bottle6.visible = false;
    bottle5.visible = false;
    bottle4.visible = false;
    bottle3.visible = false;
    bottle2.visible = true;
    bottle1.visible = true;
  }
  if (food == 1) {
    bottle10.visible = false;
    bottle9.visible = false;
    bottle8.visible = false;
    bottle7.visible = false;
    bottle6.visible = false;
    bottle5.visible = false;
    bottle4.visible = false;
    bottle3.visible = false;
    bottle2.visible = false;
    bottle1.visible = true;
  }
  if (food == 0) {
    bottle10.visible = false;
    bottle9.visible = false;
    bottle8.visible = false;
    bottle7.visible = false;
    bottle6.visible = false;
    bottle5.visible = false;
    bottle4.visible = false;
    bottle3.visible = false;
    bottle2.visible = false;
    bottle1.visible = false;
  }
}