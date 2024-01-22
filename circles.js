const axi = new axidraw.AxiDraw();
let connected = false;
const ElectrictyData = [87, 100, 31, 47, 51, 99, 2, 47, 100, 100];

function setup() {
  createCanvas(200, 200);
}

function drawArc(x, y, radius, startAngle, endAngle, pointCount = 16) {
  const angleInc = (endAngle - startAngle) / pointCount;
  const x1 = radius * cos(startAngle);
  const y1 = radius * sin(startAngle);

  axi.penDown(); // Lower the pen to start drawing
  axi.moveTo(x + x1, y + y1);
  
  for (let i = 0; i <= pointCount; i += 1) {
    const angle = startAngle + i * angleInc;
    const relX = radius * cos(angle);
    const relY = radius * sin(angle);
    axi.moveTo(x + relX, y + relY);
  }
  axi.penUp(); // Lift the pen after drawing
}

function drawCirclesInCircle() {
  axi.penUp(); // Lift the pen before starting the loop

  const centerX = 150; // Adjusted center x-coordinate for the smaller canvas
  const centerY = 150; // Adjusted center y-coordinate for the smaller canvas
  const circleCount = ElectrictyData.length;

  for (let i = 0; i < circleCount; i++) {
    const angle = (i / circleCount) * TWO_PI;
    const radius = 100; 
    const x = centerX + radius * cos(angle);
    const y = centerY + radius * sin(angle);
    drawArc(x, y, ElectrictyData[i] / 5, 0, TWO_PI);
  }
}

function mouseClicked() {
  if (!connected) {
    axi.connect()
      .then(() => {
        connected = true;
        drawCirclesInCircle(); // Draw circles once connected
      });
  }
}