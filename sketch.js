var b, bimg;

var s, si, s1, s2, s3, s4, s5, s6, s7;

var o, omg

var g;

var score = 0;

var START = 1;

var PLAY = 2;

var END = 3;

var gamestate = START;

function preload(){
  
  bimg = loadImage("b.png");
  
  si = loadAnimation("s1.png","s2.png","s3.png","s4.png",
                    "s5.png","s6.png","s7.png");
  
  omg = loadImage("o.png");
  
}

function setup() {
  
  createCanvas(597, 480);
  
  b = createSprite(890, 100);
  b.addImage("backGround", bimg);
  b.scale = 0.3;
  
  s = createSprite(70, 400);
  s.addAnimation("running", si);
  s.scale = 0.3;
  
  s.setCollider("rectangle",0,0,s.width-130,s.height-40);
  
  g = createSprite(597/2, 464, 597*2, 1);
  g.visible = false;
  
  coneGroup = new Group();
  
}

function draw() {
  
  background("black");
    
  s.collide(g);
  
  if(gamestate === START){
    
    s.visible = false;
    coneGroup.visibleEach = false;
    b.visible = false;
    
    fill("blue");
    textSize(30);
    text("Sonic is late for home help him", 100, 100);
    text("to reach his home", 190, 150);
    fill("red");
    text("Press Space to start", 170, 250);
    
    if(keyDown("space")){
      
      gamestate = PLAY;
      
    }
    
  }
  
  else if(gamestate === PLAY){
    
    score = score + Math.round(getFrameRate()/60);
    
    s.visible = true;
    coneGroup.visibleEach = true;
    b.visible = true;
    
    s.velocityY = s.velocityY + 1;
    
    b.velocityX = -9;
    
    if(b.x < -310){
      
      b.x = 890;
      
    }
    
    obstacle();
    
    if(keyDown("space") && s.y > 390){
      
      s.velocityY = -25;
      
    }
    
    if(s.isTouching(coneGroup)){
      
      gamestate = END;
      
    }
    
  }
  
  else if(gamestate === END){
    
    score = 0;
    
    s.visible = false;
    coneGroup.destroyEach();
    b.visible = false;
    
    fill("red");
    textSize(40);
    text("Game Over", 160, 100);
    text("Press space to restart", 90, 300);
    
    if(keyDown("space")){
      
      gamestate = PLAY;
      
    }
    
  }
  
  drawSprites();
  
  textSize(30);
  fill("white")
  text("Score: "+ score,50,50);

}

function obstacle(){
  
  if(frameCount % 120 === 0){
    
    o = createSprite(620, 430);
    o.addImage("obstacle", omg);
    o.scale = 0.1;
    o.velocityX = -9;
    o.lifetime = 70;
    
    coneGroup.add(o);
    
  }
  
}