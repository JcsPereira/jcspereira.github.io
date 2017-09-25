

function setup() 
{
  createCanvas (windowWidth, windowHeight);
}


function draw() 
{
  background( random(0, 255), random(0, 255), random(0, 255) );
}


function windowResized() 
{
  resizeCanvas (windowWidth, windowHeight);
}
