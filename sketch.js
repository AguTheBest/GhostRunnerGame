var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()

  ghost = createSprite(200,200,50,50)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.35

  spookySound.loop()
}

function draw() {
  background(0);
  if(gameState === "play"){

  
  if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("space")){
      ghost.velocityY = -6
    }
    ghost.velocityY = ghost.velocityY+0.8

    if(keyDown("right")){
      ghost.x = ghost.x+10
    }

    if(keyDown("left")){
      ghost.x = ghost.x-10
    }
    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0
    }

    if(ghost.isTouching(invisibleBlockGroup) || ghost.y > 600){
    ghost.destroy()
    gameState = "end"
    }
    
    spawnDoors()
    drawSprites()
  }
  if(gameState==="end"){
    textSize(30)
    fill("yellow")
    text("Game Over",230,250)
  }

}

function spawnDoors(){
if(frameCount % 300 === 0){ 
var door = createSprite(Math.round(random(120,400)),-20)
door.addImage("door",doorImg)
door.velocityY = 1
door.lifetime = 650
doorsGroup.add(door)

var climber = createSprite(door.x,30)
climber.addImage("climber",climberImg)
climber.velocityY = 1
climber.lifetime = 650
climbersGroup.add(climber)
ghost.depth = door.depth+1

invisibleBlock = createSprite(climber.x,35)
invisibleBlock.width = climber.width
invisibleBlock.height = 10
invisibleBlock.velocityY = 1
invisibleBlock.lifetime = 670
invisibleBlockGroup.add(invisibleBlock)
invisibleBlock.visible = false
}
}