// Inspired by Daniel Shiffman, The Coding Train, Coding Challenge # 130.1

let x = [];
let y = [];
let fourierX;
let fourierY; 

let time = 0;
let path = [];

function setup() {
	createCanvas(2500, 2000);
	for (let i = 0; i<drawing.length; i++){
		angle = map(i, 0, 100, 0, TWO_PI);
		x[i] = drawing[i].x;
		y[i] = drawing[i].y;
	}

	fourierX = dft(x);
	fourierY = dft(y);
  	fourierX.sort((a, b) => b.amp - a.amp);
  	fourierY.sort((a, b) => b.amp - a.amp);
}

function epiCycles(x, y, rotation, fourier){
	for (let i = 0; i < fourier.length; i++){

		let prevx = x;
		let prevy = y;

		let freq = fourier[i].freq;
		let radius = fourier[i].amp;
		let phase = fourier[i].phase;
		x += radius * cos(freq*time + phase + rotation);
		y += radius * sin(freq*time + phase + rotation);

		stroke(50, 200);
		noFill();
		ellipse(prevx, prevy, radius*2);
		stroke(0);
		line(prevx, prevy, x, y);
		}
	return createVector(x, y);

	}

function draw() {

	background(255);

	let vx = epiCycles(450, 50, 0, fourierX);
	let vy = epiCycles(200, 200, HALF_PI, fourierY);
	let v = createVector(vx.x, vy.y)
	
	path.unshift(v);
	line(vx.x, vx.y, v.x, v.y);
	line(vy.x, vy.y, v.x, v.y);

	beginShape();
	noFill();
	for (let i = 0; i < path.length; i++){
		stroke(0)
		vertex(path[i].x, path[i].y);
	}
	endShape();

	const dt = TWO_PI / fourierY.length;
	time += dt;	

  if (time > TWO_PI + 0.05) {
    time = 0;
    path = [];
  }
}