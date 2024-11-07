let playButton, instructionsButton, exitButton;
let ASUlogo;
  function preload() {
  
  ASUlogo = loadImage('assets/ASU_Symbol.png');
}
  function setup() {
  createCanvas(400, 400);
  
  playButton = createButton('Play');
  playButton.position(160, 200);
  playButton.size(100, 50);
  playButton.mousePressed(startGame);
  
  
  
}

function draw() {
  fill('gold');
  image(ASUlogo, 120, 10, 160, 80);
  fill('gold');
  textAlign(CENTER);
  textSize(32);
  text("Welcome to Our Game!", width / 2, 150);
}

// Placeholder function to start the game
function startGame() {
  console.log("Starting the game...");

}
