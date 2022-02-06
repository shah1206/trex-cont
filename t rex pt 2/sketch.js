var trex_running,trex_colided,ground,groundimg,invisibleground,trex,cloudimg,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var cloudGroup,obstacleGroup, imgrestart, imggameover , resart, gameover
var play =1 
var end=0
var gameState=play
var score=0


function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  
trex_colided=loadAnimation("trex_collided.png")  

groundimg = loadImage("ground2.png")  
  
cloud=loadImage("cloud.png")
  
obstacle1 = loadImage("obstacle1.png")  
  
obstacle2 = loadImage("obstacle2.png")  
  
obstacle3 = loadImage("obstacle3.png")  

obstacle4 = loadImage("obstacle4.png")  
  
obstacle5 = loadImage("obstacle5.png")  
  
obstacle6 = loadImage("obstacle6.png")  
  
imgrestart=loadImage("restart.png")
  
imggameover = loadImage("gameOver.png") 
  
  
  
  
} 

function setup() {
  createCanvas(600,300);
  trex=createSprite(70,260,20,20)
  trex.addAnimation("running",trex_running)
  trex.addAnimation("collided",trex_colided)
  trex.scale=0.7
  
  gameover=createSprite(300,100,20,20)
  gameover.addImage(imggameover)
  gameover.scale=0.6
  
  restart=createSprite(300,150,20,20)
  restart.addImage(imgrestart)
  restart.scale=0.6
  
  trex.setCollider("circle",0,0,40)
  
  ground=createSprite(300,280,600,20)
  ground.addImage(groundimg)
  ground.velocityX=-7
  
  invground=createSprite(300,285,600,8)
  invground.visible=false
  
  trex.scale=0.5
  cloudGroup=new Group()
  obstacleGroup= new Group()
}

function draw() {
  background(245);
  //background("grey")
  
   text("Score: " + score,40,50)
  
   camera.position.x= trex.x+200
  
  if (gameState==play){
    restart.visible=false
    gameover.visible=false
    if (keyDown ("space")&&trex.y>248){
     trex.velocityY=-12
      }
  trex.velocityY=trex.velocityY+0.9
 //console.log(random(1,4))
  
    spawnObstacles()
  spawnClouds()
    
    if (obstacleGroup.isTouching(trex)){
      gameState=end
        
        }    
    score= score+Math.round(getFrameRate()/60)
    ground.velocityX=-5
  }
 
  
  
  else if(gameState==end){
    restart.visible=true
    gameover.visible=true
    ground.velocityX=0
    trex.velocityY=0
    obstacleGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    trex.changeAnimation("collided",trex_colided)
    cloudGroup.setLifetimeEach  (-5)
    obstacleGroup.setLifetimeEach (-4)
    
  }
  if (mousePressedOver(restart)){
    Restart()
  }
  trex.collide(invground)
   
  drawSprites();
}

function spawnClouds(){
  if(frameCount% 60==0){
    var clouds=createSprite(620,30,10,10)
    clouds.velocityX=-4
    clouds.addImage(cloud)
    clouds.y= Math.round(random(10,250))
    clouds.lifetime=155
    clouds.depth=trex.depth
    trex.depth=trex.depth+1
    cloudGroup.add(clouds)
    }
}

function spawnObstacles(){
  if(frameCount%70==0){
    var obs=createSprite(620,265,10,10)
    obs.velocityX=-5
    var select= Math.round(random(1,6))
    switch(select){
      case 1:obs.addImage(obstacle1)
        break
      case 2:obs.addImage(obstacle2)
        break
       case 3:obs.addImage(obstacle3)
        break
       case 4:obs.addImage(obstacle4)
        break
       case 5:obs.addImage(obstacle5)
        break
       case 6:obs.addImage(obstacle6)
        break 
         }
        obs.lifetime=155
        obstacleGroup.add(obs)
        obs.scale=0.5        
        
        
  } 
}

  function Restart(){
    gameState=play
    cloudGroup.destroyEach()
    obstacleGroup.destroyEach()
    trex.changeAnimation("running",trex_running)
    score=0
  }
  
  