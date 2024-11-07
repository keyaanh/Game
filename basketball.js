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

function preload() {
  sparkyImg = loadImage('assets/pngegg.png');
  courtImg = loadImage('assets/cartoon-background-basketball-court-street-outdoor-sport-arena-with-baskets-game_33099-1016.jpg');
  basketballImg = loadImage('assets/basketball.png');
  pitchforkImg = loadImage('assets/Image 10-29-24 at 1.54 PM.jpeg');
  swishSound = loadSound('assets/basketball-swish-sound-effect-made-with-Voicemod.mp3');
  missSound = loadSound('assets/mixkit-game-show-wrong-answer-buzz-950.wav');
  
}

function setup() {
  createCanvas(800, 600);
  resetBall();
}

function draw() {
  background(128,0,0);
  if (currentPage === "home") {
    drawHomePage();
  } else if (currentPage === "gameSelection") {
    drawGameSelectionPage();
  } else if (currentPage === "levels") {
    drawLevelsPage(); // New levels page
  } else if (currentPage === "basketball") {
    basketballDraw();
  } else if (currentPage === "simonSays") {
    drawSimonSaysPage();
  } else if (currentPage === "asteroids") {
    drawAsteroidsPage();
  } else if (currentPage === "findImposter") {
    drawFindImposterPage();
  }
}

function drawHomePage() {
  fill('gold');
  textSize(45);
  textStyle(BOLD);

  text("Welcome to the Game Hub", width/2, height/6);
  image(pitchforkImg, 30, 200, width / 3, height / 3);
  image(pitchforkImg, 520, 200, width / 3, height / 3);
  textSize(18);
  if (button("Go to Game Selection", width / 2, height / 2, 200, 50) && mouseReleasedFlag && !buttonClicked) {
    buttonClicked = true;
    currentPage = "gameSelection";
    mouseReleasedFlag = false; 
  }
}


function drawGameSelectionPage() {
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
    currentPage = "asteroids";
    mouseReleasedFlag = false;
  }
  if (button("Find the Imposter", width / 2, height / 2 + 120, 200, 50) && mouseReleasedFlag) {
    currentPage = "findImposter";
    mouseReleasedFlag = false;
    
  }
}

function mouseReleased() {
  mouseReleasedFlag = true; 
}

function drawLevelsPage() {
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

function basketballDraw() {
  background(255);
  image(courtImg, 0, 0, width, height);
  
  let sparkyPosition;
if (selectedLevel === "threePoint") {
  sparkyPosition = [425, height - 145]; 
} else if (selectedLevel === "freeThrow") {
  sparkyPosition = [550, height - 150];
} else {
  sparkyPosition = [100, height - 100]; 
}

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

function mousePressed() {
  if (currentPage === "basketball" && dist(mouseX, mouseY, basketballX + 15, basketballY + 15) < 15) {
    dragging = true;
    startX = mouseX;
    startY = mouseY;
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

function resetBall() {
  setBasketballPosition(); 
  basketballSpeedX = 0;
  basketballSpeedY = 0;
  shooting = false;
}

function button(label, x, y, w, h) {
  rectMode(CENTER);
  fill('gold'); 
  rect(x, y, w, h, 10); 
  fill(0); 
  textAlign(CENTER, CENTER);
  text(label, x, y); 
  return mouseIsPressed && mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y - h / 2 && mouseY < y + h / 2;
}
