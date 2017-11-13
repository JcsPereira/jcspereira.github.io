
//Joao Pereira (3150667) / Leonel Santos (3150403)
//Circuitos
//Ano Letivo (2017-2018)
//5o Semestre
//UC: Laboratorio de Projecto I
//Design Multimedia
//ESAD.CR
//Docente: Marco Heleno

var x1, y1, cor01, cor02, xPOL, yPOL, t, n, BG_inc_alpha, BG_mult_alpha, BG_rnd_shape, BG_nLinhas, BG_nColunas, nElementos, svg_img;
var Y_AXIS = 1;
var hexag = [];

function preload() 
{
  svg_img = loadImage("image/Hexagono_02.png");
}

function setup()
{
  //createCanvas (596, 842, SVG);
  createCanvas (596, 842);

 
  nElementos = 12;

  t = height / nElementos;
  
  BG_inc_alpha = 0;
  BG_mult_alpha = 1;
  BG_rnd_shape = 6;
  BG_nLinhas = height/t;
  BG_nColunas = t;
}

function draw()
{
  x1 = width / 2;
  y1 = height / 2;

  // ++++ BG - COR ++++

  background(242);

  colorMode(RGB);
  cor01 = color(242);
  cor02 = color(152,114,132);
  
  setGradient(0, 100, width, height, cor01, cor02, Y_AXIS);

  // ++++ BG - HEXAGONOS ++++

  if (BG_inc_alpha == 60) { BG_mult_alpha = -1;                                             //Variação do Alpha
  }else if (BG_inc_alpha == 0) {  BG_mult_alpha = 1; BG_rnd_shape = int(random(4,7)); }
  
  BG_inc_alpha += 1 * BG_mult_alpha;

  fill(249, 181, 172, BG_inc_alpha);
  noStroke();


  for (var xPOL = 0; xPOL < BG_nColunas; xPOL++) {
    for (var yPOL = 0; yPOL <= BG_nLinhas; yPOL++) {
      if (xPOL % 2 == 0) {                                          //Verificar se e par
        push();
        translate(xPOL*(t*0.85), yPOL*t);
        rotate(frameCount / 100.0);
        polygon(0, 0, t/1.9, BG_rnd_shape);                        // t/ = raio
        pop();
      } else {
        push();
        translate(xPOL*(t*0.85), yPOL*t+(t/2));
        rotate(frameCount / -100.0);
        polygon(0, 0, t/1.9, BG_rnd_shape); 
        pop();
      }
    }
  }


  // ++++ PARTICULAS ++++

  var obj = new Hexagonos();
  hexag.push(obj);                  //Cria particula a cada DRAW

  for (var i = 0; i < hexag.length; i++) {
    hexag[i].update();
    hexag[i].show();
    if (hexag[i].finish()) {
      // remover particula quando a opacidade for 0
      hexag.splice(i, 1);
    } 
  }


  // ++++ LOGO ++++

  var map_value;
  
    if (mouseX >= 0 && mouseX <= 596/2) { map_value = map(mouseX,0,596/2,250,280); }else if (mouseX >= 596/2 && mouseX <= 596) { map_value = map(mouseX,596/2,596,280,250); }else{map_value=280;}
  
    imageMode(CENTER);
    image(svg_img, width/2, height/2, map_value, 320);

}

// ------ FUNCTIONS ------

function setGradient(x, y, w, h, c1, c2, axis) {        // Gradiente
  
  noFill();

  if (axis == Y_AXIS) {                       
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

function Hexagonos() {            //Classe para generação das particulas
  this.x = width/2;
  this.y = height/2;
  this.vx = random(-3, 3);
  this.vy = random(-5, 5);
  this.alpha = 255;

  this.finish = function () {     //Metodo que retorna se o alpha é 0
    return this.alpha < 0;
  };

  this.update = function () {     //Metodo que aplica velocidade nos objectos
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 2;
  };

  this.show = function () {       //Metodo que deseja o elemento
    noStroke();
    fill(152,114,132, this.alpha);
    ellipse(this.x, this.y, 8);
  };
}

function keyPressed() {
  if (key === "G") {
    noLoop();
    save("Cartaz_EVA_Circuitos.svg");
  }
}


