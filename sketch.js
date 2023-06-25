var bg, player, bulletGroup, enemyGroup, edges;
function preload() {
    bgImg = loadImage("bg.png")
    f1Img = loadImage("f1.png")
    f2Img = loadImage("f2.png")
    f3Img = loadImage("f3.png")
    fBImg = loadImage("fB.png")
    p1Img = loadImage("p1.png")
    pbImg = loadImage("pb.png")
    hitSound = loadSound("hitSound.wav")
    laserBullet = loadSound("laserbullet.wav")
    bgSound = loadSound("bgSound.mp3")
    gameOverImg = loadImage("Game Over.png")
}

function setup() {

    createCanvas(600, 600)
    bg = createSprite(300, 300);
    bg.addImage(bgImg)
    bg.scale = 2.25
    bgSound.loop()
    score = 0
    health = 3
    flag = false

    player = createSprite(width / 2, height - 75)
    player.addImage(p1Img)
    player.scale = 0.3

    bulletGroup = new Group()

    enemyGroup = new Group()

    edges = createEdgeSprites()
    bg.velocityY = -2

}

function draw() {
    background("red")
    drawSprites()
    textSize(24)
    fill("yellow")
    text("score =" + score, 50, height - 20)
    text("Press space to shoot", width / 2 - 100, 50)
    if(bg.y<150){
        bg.y=300
    }
    
  
    
    text("health =" + health, width - 100, height - 20)

    enemyGroup.overlap(player,gameOver)

    player.bounceOff(edges[0])
    player.bounceOff(edges[1])
    move()
    createEnemy()
    enemyGroup.bounceOff(edges[0])
    enemyGroup.bounceOff(edges[1])
    createBullet()
    if (World.frameCount % 250 === 0) {
        enemyShoot()
    }


    bulletGroup.overlap(enemyGroup, destroyEnemy)
    // enemyGroup.overlap(player,fallHealth)
    if (enemyGroup[0]) {

        if (enemyGroup[0].y > height - 100) {
            if (health > 0) {
                health--;
            }


            enemyGroup[0].destroy()
            player.scale = 0.2
        }
    }
    if (health === 0) {
        gameOver()
    }
}

function gameOver() {
    enemyGroup.destroyEach()
    player.destroy()
    bulletGroup.destroyEach()
    gameOver = createSprite(width/2,height/2)
    gameOver.addImage(gameOverImg)
    gameOver.scale=.5
    bgSound.stop()
}

function destroyEnemy(f1, f2) {
    f1.destroy()
    f2.destroy()
    score++
    hitSound.play()
}

function enemyShoot() {
    console.log("enemyShoot")
    if (enemyGroup[0]) {
        enemyGroup[0].velocityY = 3
    }
}

function createBullet() {
    if (keyDown("space")) {
        if(bulletGroup.length<=10){
        var bullet = createSprite(player.x, player.y - 30)
        bullet.addImage(pbImg)
        bullet.scale = 0.06
        bullet.velocityY = -5
        bulletGroup.add(bullet)
        laserBullet.play()
        bullet.lifetime = 150
        }
    }
}

function move() {
    if (keyDown("right")) {
        player.x += 7
    }

    if (keyDown("left")) {
        player.x -= 7
    }
}

function createEnemy() {
    if (World.frameCount % 100 == 0) {
        var enemy = createSprite(random(50, width - 50), random(50, height / 2))
        enemyGroup.add(enemy)

        var rand = Math.round(random(1, 3))

        if (rand === 1) {
            enemy.addImage(f1Img)
        }
        else if (rand === 2) {
            enemy.addImage(f2Img)

        }
        else {
            enemy.addImage(f3Img)

        }
        enemyGroup.setScaleEach(0.1)
        enemyGroup.setVelocityXEach(7)
    }

}



