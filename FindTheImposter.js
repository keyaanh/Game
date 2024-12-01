let currentPage = "home";
let sparkyImg, courtImg, basketballImg, swishSound, missSound;
let basketballX, basketballY;
let basketballSpeedX = 0, basketballSpeedY = 0;
let shooting = false;
let dragging = false;
let startX, startY;
let aimLineX, aimLineY;
let score = 0;
let levelShotsMade = 0; 
let showScoreText = false;
let scoreTextTimer = 0;
let buttonClicked = false;
let selectedLevel = null; 
let mouseReleasedFlag = true;
let homeBackgroundImg;
let gameBackgroundImg;

let asteroids = []; 
let asteroidCount = 1; 
let asteroidSize = 70;
let asteroidGameScore = 0; 
let showCongratulations = false;
let congratulationsTimer = 0;

let sequence = [];
let userSequence = [];
let level = 0;
let gameSpeed = 1000;
let gameStarted = false;
let userTurn = false;
let buttonColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];

let sparkyImages = [];
let sparkyVariants = [];
let sparkyIndex;
let figures = [];
let Sparkyscore = 0;
let Sparkylevel = 1; 
let correctAnswers = 0;
let gameOver = false;
let message = "";

// Preload assets
function preload() {
    sparkyImg = loadImage('assets/pngegg.png');
    courtImg = loadImage('assets/basketball-court-space.png');
    basketballImg = loadImage('assets/basketball.png');
    swishSound = loadSound('assets/basketball-swish-sound-effect-made-with-Voicemod.mp3');
    missSound = loadSound('assets/mixkit-game-show-wrong-answer-buzz-950.wav');
    homeBackgroundImg = loadImage('assets/HomePage.png'); 
    gameBackgroundImg = loadImage('assets/GP-LP-background.png');

    sparkyImages.push(loadImage('assets/pngegg.png')); // Normal Sparky image
    sparkyVariants.push(loadImage('assets/GreenSparky-fotor-bg-remover-20241130203621.png')); // Green Sparky
    sparkyVariants.push(loadImage('assets/BlueSparky-fotor-bg-remover-20241130203938.png')); // Blue Staff Sparky
    sparkyVariants.push(loadImage('assets/StacheSparky-fotor-bg-remover-20241130203540.png')); // Missing Mustache
    sparkyVariants.push(loadImage('assets/NoTailSparky-fotor-bg-remover-2024113020366.png')); // Missing Tail
}

function setup() {
    createCanvas(800, 600);
    resetBall();
    for (let i = 0; i < asteroidCount; i++) spawnAsteroid();
}

function draw() {
    background(128, 0, 0);
    if (currentPage === "home") {
        drawHomePage();
    } else if (currentPage === "gameSelection") {
        drawGameSelectionPage();
    } else if (currentPage === "levels") {
        drawLevelsPage(); 
    } else if (currentPage === "basketball") {
        basketballDraw();
    } else if (currentPage === "simonSays") {
        drawSimonLevelsPage();
    } else if (currentPage === "easyModeGame") {
        easyModeGame.draw();  
    } else if (currentPage === "asteroids") {
        drawAsteroidsPage();
    } else if (currentPage === "findImposter") {
      drawFindImposterGame();
    }
}

// Home Page
function drawHomePage() {
    image(homeBackgroundImg, 0, 0, width, height);
  
    fill('gold');
    textSize(45);
    textStyle(BOLD);
  
    textSize(18);
    if (button("Go to Game Selection", width / 2, height / 2, 200, 50) && mouseReleasedFlag && !buttonClicked) {
      buttonClicked = true;
      currentPage = "gameSelection";
      mouseReleasedFlag = false; 
    }
  }
  
  
  function drawGameSelectionPage() {
    image(gameBackgroundImg, 0, 0, width, height);
    fill('gold');
    textSize(45);
    
    textAlign(CENTER, CENTER);
    
    text("Select a Game", width / 2, height / 4);
    textSize(18);
    
    if (button("Basketball", width / 2, height / 2 - 60, 200, 50) && mouseReleasedFlag) {
      currentPage = "levels"; 
      mouseReleasedFlag = false; 
    }
    if (button("Simon Says", width / 2, height / 2, 200, 50) && mouseReleasedFlag) {
      currentPage = "simonSays";
      mouseReleasedFlag = false;
    }
    if (button("Asteroids", width / 2, height / 2 + 60, 200, 50) && mouseReleasedFlag) {
      resetAsteroidsGame();
      currentPage = "asteroids";
      mouseReleasedFlag = false;
    }
    if (button("Find the Imposter", width / 2, height / 2 + 120, 200, 50) && mouseReleasedFlag) {
      currentPage = "findImposter";
      mouseReleasedFlag = false;
      
    }
  }
// Levels Page for Basketball
function drawLevelsPage() {
    image(gameBackgroundImg, 0, 0, width, height);
    textSize(45);
    textAlign(CENTER, CENTER);
    fill('gold')
    text("Select a Level", width / 2, height / 4);
    textSize(20)
    if (button("Free Throw Line", width / 2, height / 2 - 60, 250, 50) && mouseReleasedFlag) {
      selectedLevel = "freeThrow";
      setBasketballPosition(); 
      currentPage = "basketball";
      mouseReleasedFlag = false;
      levelShotsMade = 0; 
    }
    if (button("3-pt Line", width / 2, height / 2, 250, 50) && mouseReleasedFlag) {
      selectedLevel = "threePoint";
      setBasketballPosition(); 
      currentPage = "basketball";
      mouseReleasedFlag = false;
      levelShotsMade = 0;
    }
    if (button("Full Court", width / 2, height / 2 + 60, 250, 50) && mouseReleasedFlag) {
      selectedLevel = "fullCourt";
      setBasketballPosition(); 
      currentPage = "basketball";
      mouseReleasedFlag = false;
      levelShotsMade = 0;
    }
    
    if (button("Back to Game Page", width / 2, height / 2 + 120, 250, 50) && mouseReleasedFlag) {
      currentPage = "gameSelection";
      mouseReleasedFlag = false;
    }
  }

// Basketball Position
function setBasketballPosition() {
    if (selectedLevel === "freeThrow") {
        basketballX = 575;
        basketballY = height - 100;
    } else if (selectedLevel === "threePoint") {
        basketballX = 500;
        basketballY = height - 150;
    } else if (selectedLevel === "fullCourt") {
        basketballX = 100;
        basketballY = height - 100;
    }
}

// Basketball Game Render
function basketballDraw() {
    background(255);
    image(courtImg, 0, 0, width, height);
  
    let sparkyPosition = selectedLevel === "threePoint" ? [425, height - 145] : 
                        selectedLevel === "freeThrow" ? [550, height - 150] :
                        [100, height - 100]; 
  
    image(sparkyImg, ...sparkyPosition, 75, 75);
    image(basketballImg, basketballX, basketballY, 30, 30);
    fill(0);
    textSize(24);
    text(`Score: ${score}`, 50, 30); 
    text(`Shots Made: ${levelShotsMade}`, 80, 60);  

    if (dragging) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(basketballX + 15, basketballY + 15, aimLineX, aimLineY);
    }

    if (shooting) {
        basketballX += basketballSpeedX;
        basketballY += basketballSpeedY;
        basketballSpeedY += 0.5;

        if (basketballX > 650 && basketballX < 710 && basketballY < 225) {
            score++;
            levelShotsMade++; 
            swishSound.play();
            showScoreText = true;
            scoreTextTimer = 60;
            resetBall();
            
            if (levelShotsMade >= 5) {
                if (selectedLevel === "freeThrow") {
                    selectedLevel = "threePoint";
                } else if (selectedLevel === "threePoint") {
                    selectedLevel = "fullCourt";
                } else {
                    currentPage = "gameSelection"; 
                }
                setBasketballPosition(); 
                levelShotsMade = 0; 
            }
        }

        if (basketballY > height - 30 || basketballX < 0 || basketballX > width) {
            missSound.play();
            resetBall();
        }
    }

    if (showScoreText) {
        fill(0, 255, 0);
        textSize(48);
        textAlign(CENTER, CENTER);
        text("SCORE", width / 2, height / 2);
        scoreTextTimer--;

        if (scoreTextTimer <= 0) {
            showScoreText = false;
        }
    }
}

// Mouse Functions
function mousePressed() {
  if (currentPage === "findImposter") {
    // Imposter game specific mouse functionality
    if (gameOver) {
      if (message === "Correct!") {
        correctAnswers++; 
        if (correctAnswers >= 5) {
          gameOver = true;
          message = "You Won! You Got 5 Right!"; 
          currentPage = "gameSelection"; // Redirect to game selection page after winning
        } else {
          Sparkylevel++;
          Sparkyscore++;
          gameOver = false;
          figures = [];
          setup(); // Proceed to next level
        }
      } else {
        restartGame(); // Restart the game on wrong choice
      }
      return;
    }

    for (let i = 0; i < figures.length; i++) {
      let figure = figures[i];
      let imgWidth = 80;
      let imgHeight = 80;

      if (
        mouseX > figure.x &&
        mouseX < figure.x + imgWidth &&
        mouseY > figure.y &&
        mouseY < figure.y + imgHeight
      ) {
        if (figure.isDifferent) {
          message = "Correct!";  
        } else {
          message = "Wrong Choice"; 
        }

        gameOver = true;
        break;
      }
    } 
  } else if (currentPage === "basketball") {
        if (dist(mouseX, mouseY, basketballX + 15, basketballY + 15) < 15) {
            dragging = true;
            startX = mouseX;
            startY = mouseY;
        }
    } else if (currentPage === "asteroids") {
        for (let i = 0; i < asteroids.length; i++) {
            let asteroid = asteroids[i];
            if (asteroid.visible && dist(mouseX, mouseY, asteroid.x, asteroid.y) < asteroidSize) {
                asteroid.visible = false;
                asteroidGameScore++;
                respawnAsteroid(asteroid);
            }
        }
    } else if (currentPage === "easyModeGame") {
        easyModeGame.mousePressed();

  }
}

function mouseDragged() {
    if (dragging) {
        aimLineX = mouseX;
        aimLineY = mouseY;
    }
}

function mouseReleased() {
    if (dragging) {
        dragging = false;
        shooting = true;
        let forceX = startX - mouseX;
        let forceY = startY - mouseY;
        basketballSpeedX = forceX * 0.1;
        basketballSpeedY = forceY * 0.1;
    }
    mouseReleasedFlag = true; 
}

// Button Drawing
function button(label, x, y, w, h) {
    rectMode(CENTER);
    fill('gold'); 
    rect(x, y, w, h, 10); 
    fill(0); 
    textAlign(CENTER, CENTER);
    text(label, x, y); 
    return mouseIsPressed && mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y - h / 2 && mouseY < y + h / 2;
}

// Asteroid Functions
function drawAsteroidsPage() {
    background(0);
    if (showCongratulations){
      fill(255);
      textSize(32);
      textAlign(CENTER,CENTER);
      text("Congratulations!", width / 2, height / 2);

      congratulationsTimer--;
      if (congratulationsTimer <= 0){
        currentPage = "gameSelection"
        showCongratulations = false;
      }
      return;
    }
    for (let i = 0; i < asteroids.length; i++) {
        let asteroid = asteroids[i];
        if (asteroid.visible) {
            push();
            translate(asteroid.x, asteroid.y);
            stroke(255);
            fill(100);
            createAsteroid(0, 0, asteroidSize, 5);
            pop();
            asteroid.x += asteroid.speed;
            if (asteroid.x > width) {
                respawnAsteroid(asteroid);
            }
        }
    }
    
    drawHitMarker(mouseX, mouseY);
    fill(255);
    textSize(24);
    text("Score: " + asteroidGameScore, 60, 30);

    if (asteroidGameScore >= 20 && !showCongratulations){
      showCongratulations = true;
      congratulationsTimer = 180;
    }
}

function spawnAsteroid() {
    let asteroid = {
        x: random(-200, 0), 
        y: random(height),  
        speed: random(1, 3), 
        visible: true       
    };
    asteroids.push(asteroid);
}

function respawnAsteroid(asteroid) {
    asteroid.x = random(-200, 0); 
    asteroid.y = random(height);  
    asteroid.speed = random(1, 3); 
    asteroid.visible = true; 
}

function createAsteroid(x, y, size, vertices) {
    beginShape();
    for (let i = 0; i < TWO_PI; i += TWO_PI / vertices) {
        let offset = random(-size / 3, size / 3);
        let r = size + offset;
        let xPos = r * cos(i);
        let yPos = r * sin(i);
        vertex(x + xPos, y + yPos);
    }
    endShape(CLOSE);
}

function drawHitMarker(x, y) {
    stroke(255, 0, 0);
    line(x - 10, y, x + 10, y); 
    line(x, y - 10, x, y + 10); 
}
function resetAsteroidsGame(){
  asteroidGameScore = 0;
  asteroids = [];
  for (let i = 0; i < asteroidCount; i++){
    spawnAsteroid();
  }
  showCongratulations = false;
  congratulationsTimer = 0;
}

// Simon Says Game
function drawSimonLevelsPage() {
    image(gameBackgroundImg, 0, 0, width, height);
    textSize(45);
    textAlign(CENTER, CENTER);
    fill('gold');
    text("Select a Mode", width / 2, height / 4); 

    textSize(20);
    
    if (button("Click to Start!", width / 2, height / 2 - 60, 250, 50)) {
        currentPage = "easyModeGame";  
        easyModeGame.setup();    
    }

    if (button("Back to Game Page", width / 2, height / 2 + 60, 250, 50)) {
        currentPage = "gameSelection";          
    }
}

// Easy Mode Game 
let easyModeGame = {
    colors: ['red', 'yellow', 'green', 'blue'],
    sequence: [],
    playerSequence: [],
    level: 0,
    playerTurn: false,
    compTurn: true,
    index: 0,
    lastPlayTime: 0,
    blinkDuration: 600,
    gameOver: false,
    showingBlink: false,
    winTimer: null,

    setup: function() {
      this.nextColor();
    },
    
    draw: function() {
      background(255);
      
      if (this.gameOver) {
        background('green');
        fill('white');
        textSize(50);
        textAlign(CENTER, CENTER);
        text("You Win! Game Over", width / 2, height / 2);

        if (this.winTimer === null) {
          this.winTimer = millis();
        }

        if (millis() - this.winTimer > 3000){
          currentPage = "gameSelection";
          this.resetGame();
        }
        return;
      }
    
      this.drawButtons();
      fill('green');
      textSize(35);
      textAlign(CENTER, CENTER);
      text(`Level: ${this.level}`, width / 2, height - 15);
    
      if (this.compTurn) {
        if (!this.showingBlink && millis() - this.lastPlayTime > this.blinkDuration) {
          this.showingBlink = true;
          this.lastPlayTime = millis();
        }
    
        if (this.showingBlink) {
          this.highlightButton(this.sequence[this.index]);
          if (millis() - this.lastPlayTime > this.blinkDuration / 2) {
            this.showingBlink = false;
            this.index++;
            this.lastPlayTime = millis();
          }
        }
    
        if (this.index === this.sequence.length) {
          this.compTurn = false;
          this.playerTurn = true;
          this.index = 0;
          this.playerSequence = [];
        }
      } else if (this.playerTurn && this.playerSequence.length === this.sequence.length) {
        this.checkPlayerSequence();
      }
    },
    
    drawButtons: function() {
      let baseColors = { red: 'darkred', green: 'darkgreen', blue: 'darkblue', yellow: 'goldenrod' };
    
      for (let color of this.colors) {
        fill(baseColors[color]);
        let [x, y] = this.getButtonPosition(color);
        rect(x, y, width / 2.2, height / 2.2);
      }
    },
    
    highlightButton: function(color) {
      let brightColors = { red: 'pink', green: 'lightgreen', blue: 'lightblue', yellow: 'lightyellow' };
      fill(brightColors[color]);
      let [x, y] = this.getButtonPosition(color);
      rect(x, y, width / 2.2, height / 2.2);
    },
    
    getButtonPosition: function(color) {
      switch (color) {
        case 'red': return [200, 150];
        case 'green': return [width / 1.385, 150];
        case 'blue': return [200, height / 1.38];
        case 'yellow': return [width / 1.385, height / 1.38];
      }
    },
    
    nextColor: function() {
      if (this.level === 5) {
        this.gameOver = true;
        return;
      }
      this.sequence.push(random(this.colors));
      this.level++;
      this.compTurn = true;
      this.playerTurn = false;
      this.index = 0;
      this.lastPlayTime = millis();
    },
    
    checkPlayerSequence: function() {
      if (this.sequence.join() === this.playerSequence.join()) {
        this.nextColor();
      } else {
        this.sequence = [];
        this.level = 0;
        this.nextColor();
      }
    },
    
    mousePressed: function() {
      if (!this.playerTurn || this.gameOver) return;
      let color = this.getColorClicked(mouseX, mouseY);
      if (color) {
          this.playerSequence.push(color);
          this.highlightButton(color);
      }
    },
    
    getColorClicked: function(x, y) {
      if (x < width / 2 && y < height / 2) return 'red';
      if (x >= width / 2 && y < height / 2) return 'green';
      if (x < width / 2 && y >= height / 2) return 'blue';
      if (x >= width / 2 && y >= height / 2) return 'yellow';
    },
    resetGame: function() {
      this.sequence = [];
      this.playerSequence = [];
      this.level = 0;
      this.playerTurn = false;
      this.compTurn = true;
      this.index = 0;
      this.lastPlayTime = 0;
      this.blinkDuration = 600;
      this.gameOver = false;
      this.showingBlink = false;
      this.winTimer = null; // Reset the timer
  }
};

// Reset the basketball
function resetBall() {
    setBasketballPosition(); 
    basketballSpeedX = 0;
    basketballSpeedY = 0;
    shooting = false;
}


//Imposter Game
function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(32);
  textFont('Georgia');
  fill(255);

  
  sparkyIndex = floor(random(5));
  
  let spacing = width / 6;
  
  for (let i = 0; i < 5; i++) {
    let x = i * spacing + spacing / 2;
    let y = height / 2 - 40;
    let figure = { 
      x, 
      y, 
      isDifferent: false,
      image: sparkyImages[0] 
    };

    if (i === sparkyIndex) {
      figure.isDifferent = true; 
      let randomVariant = random(sparkyVariants);
      figure.image = randomVariant; 
    }
    
    figures.push(figure);
  }
}

function drawFindImposterGame() {
  background(155, 43, 58);
 

  
  textSize(32);
  fill(255);
  text("Find the Different Sparky", width / 2, 50);

  textSize(32);
  fill(255);
  text("Score: " + Sparkyscore, width - 100, 50);


  for (let figure of figures) {
    image(figure.image, figure.x, figure.y, 80, 80);
  }

  
  if (gameOver) {
    textSize(24);
    if (message === "Correct!") {
      fill(49,197,49); 
      text("Correct! Next Level!", width / 2, height / 1.5);
    } else if (message === "Wrong Choice") {
      fill(255, 0, 0); 
      text(message, width / 2, height / 1.5);
    }

    // if the player won
    if (correctAnswers === 5) {
      fill(0, 255, 0); 
      text("You Won! You Got 5 Right!", width / 2, height / 2 + 40);
    }

    textSize(24);
    text("Click to Continue", width / 2, height - 100);
  }
}

function restartGame() {
  
  gameOver = false;
  figures = [];
  Sparkylevel = 1; 
  Sparkyscore = 0;
  correctAnswers = 0; 
  message = ""; 
  setup();
}