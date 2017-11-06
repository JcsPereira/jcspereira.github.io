
//Joao Pereira (3150667) / Leonel Santos (3150403)
//Circuitos
//Ano Letivo (2017-2018)
//5o Semestre
//UC: Laboratorio de Projecto I
//Design Multimedia
//ESAD.CR
//Docente: Marco Heleno
//data da avaliação?

var x, y, cor01, cor02, xPOL, yPOL, t, n, BG_nLinhas, BG_nColunas, nElementos, raio;
var Y_AXIS = 1;

function preload() 
{
  svg_img = loadImage("image/Hexagon.svg");
}

function setup()
{
  createCanvas (windowWidth, windowHeight);
  //createCanvas (596, 842, SVG);
  //createCanvas (596, 842);

  //frameRate(1);
 
  var hex = [];

  nElementos = 12;

  t = height / nElementos;
  
  BG_nLinhas = height/t;
  BG_nColunas = t;

  for (var i = 0; i < 3; i++) {
    hex[i] = new Hexagono(width/2,200);
    
  }

}

function draw()
{
  x = width / 2;
  y = height / 2;

  // ++++ BG - COR ++++

  background(242);

  colorMode(RGB);
  cor01 = color(242);
  cor02 = color(152,114,132);
  
  setGradient(0, 100, width, height, cor01, cor02, Y_AXIS);

  // ++++ BG - HEXAGONOS ++++

  fill(249, 181, 172, 120);
  noStroke();

  //desenhar_hexagono(x,y);

  for (var xPOL = 0; xPOL < BG_nColunas; xPOL++) {
    for (var yPOL = 0; yPOL <= BG_nLinhas; yPOL++) {
      if (xPOL % 2 == 0) {                      //Verificar se e par
        push();
        translate(xPOL*(t*0.85), yPOL*t);
        //rotate(frameCount / -100.0);
        polygon(0, 0, t/1.9, 6);                  // t/ = raio
        pop();
      } else {
        push();
        translate(xPOL*(t*0.85), yPOL*t+(t/2));
        //rotate(frameCount / -100.0);
        polygon(0, 0, t/1.9, 6); 
        pop();
      }
      
    }
  }
  
  // ++++ LINHAS ++++



  // ++++ LOGO ++++

  for (var i = 0; i < hex.length; i++) {
    hex[i].move();
    hex[i].show();
  }


}

/* function desenhar_hexagono(p1, p2)
{
  noStroke();
  fill(255,0,0);
  beginShape();
    vertex( p1-40, p2-50);
    vertex( p1+50, p2-50);
    vertex( p1+85, p2);
    vertex( p1+50, p2+50);
    vertex( p1-50, p2+50);
    vertex( p1-85, p2);
  endShape(CLOSE);
  
} */

function setGradient(x, y, w, h, c1, c2, axis) {
  
  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

class Hexagono{

  constructor(x1, y1) {
    this.x = x1
    this.y = y1
  }

  move() {
    this.x = this.x + random(-2,2);
    this.y = this.y + random(-2,2);
  }

  show() {
    image(svg_img, this.x, this.y, 100, 100);
  }
}

function keyPressed() {
  if (key === "G") {
    noLoop();
    save("Cartaz_EVA_Circuitos.svg");
  }
}

function windowResized() 
{
  resizeCanvas (windowWidth, windowHeight);
}
