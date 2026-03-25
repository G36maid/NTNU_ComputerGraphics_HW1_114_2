// Shader setup
var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    varying vec4 v_Color;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = 15.0; // Slightly larger, make points more visible
        v_Color = a_Color;
    }
`;

var FSHADER_SOURCE = `
    precision mediump float;
    varying vec4 v_Color;
    void main() {
        gl_FragColor = v_Color;
    }
`;

// State management: default to point, red
var shapeFlag = "p";
var colorFlag = "r";

// Array management
var g_points = [];
var g_triangles = [];
var g_circles = [];
var g_squares = [];

function main() {
  var canvas = document.getElementById("webgl");
  var gl = canvas.getContext("webgl2");
  if (!gl) {
    console.log("Failed to get the rendering context for WebGL");
    return;
  }

  var vertexShader = createShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);
  var program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  var a_Position = gl.getAttribLocation(program, "a_Position");
  var a_Color = gl.getAttribLocation(program, "a_Color");

  gl.enableVertexAttribArray(a_Position);
  gl.enableVertexAttribArray(a_Color);

  gl.program = program;
  gl.vertexBuffer = vertexBuffer;
  gl.a_Position = a_Position;
  gl.a_Color = a_Color;

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  canvas.onmousedown = function (ev) {
    click(ev, gl);
  };
  document.onkeydown = function (ev) {
    keydown(ev);
  };
}

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(
      "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader),
    );
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(
      "Unable to initialize the shader program: " +
        gl.getProgramInfoLog(program),
    );
    return null;
  }
  return program;
}

function keydown(ev) {
  var key = ev.key.toLowerCase(); // Convert to lowercase for case-insensitive input

  // Shape switching
  if (key === "1" || key === "p") {
    shapeFlag = "p";
  } else if (key === "2" || key === "t") {
    shapeFlag = "t";
  } else if (key === "3" || key === "c") {
    shapeFlag = "c";
  } else if (key === "4" || key === "s") {
    shapeFlag = "s";
  }
  // Color switching
  else if (key === "r") {
    colorFlag = "r";
  } else if (key === "g") {
    colorFlag = "g";
  } else if (key === "b") {
    colorFlag = "b";
  }
}

function click(ev, gl) {
  var canvas = document.getElementById("webgl");
  var rect = ev.target.getBoundingClientRect();

  // Get correct coordinates within canvas
  var x_in_canvas = ev.clientX - rect.left;
  var y_in_canvas = ev.clientY - rect.top;

  // Convert to WebGL clip space (-1.0 to 1.0)
  var x = (x_in_canvas - canvas.width / 2) / (canvas.width / 2);
  var y = (canvas.height / 2 - y_in_canvas) / (canvas.height / 2); // Fixed original math error here

  var color = getColor();

  if (shapeFlag === "p") {
    addPoint(x, y, color);
  } else if (shapeFlag === "t") {
    addTriangle(x, y, color);
  } else if (shapeFlag === "c") {
    addCircle(x, y, color);
  } else if (shapeFlag === "s") {
    addSquare(x, y, color);
  }

  draw(gl);
}

function getColor() {
  if (colorFlag === "r") return [1.0, 0.0, 0.0, 1.0];
  if (colorFlag === "g") return [0.0, 1.0, 0.0, 1.0];
  return [0.0, 0.0, 1.0, 1.0];
}

function draw(gl) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Points use gl.POINTS rendering
  drawShapes(gl, g_points, gl.POINTS);
  // Other area shapes are decomposed into triangles using gl.TRIANGLES
  drawShapes(gl, g_triangles, gl.TRIANGLES);
  drawShapes(gl, g_circles, gl.TRIANGLES);
  drawShapes(gl, g_squares, gl.TRIANGLES);
}

function drawShapes(gl, shapes, mode) {
  if (shapes.length === 0) return;

  var vertices = [];
  for (var i = 0; i < shapes.length; i++) {
    vertices = vertices.concat(shapes[i]);
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  var FSIZE = Float32Array.BYTES_PER_ELEMENT;
  gl.vertexAttribPointer(gl.a_Position, 2, gl.FLOAT, false, FSIZE * 6, 0);
  gl.vertexAttribPointer(gl.a_Color, 4, gl.FLOAT, false, FSIZE * 6, FSIZE * 2);

  gl.drawArrays(mode, 0, vertices.length / 6);
}

// === Shape generation logic ===

function addPoint(x, y, color) {
  // A point only needs to push itself
  var vertices = [x, y, color[0], color[1], color[2], color[3]];
  addToShapeArray(g_points, vertices);
}

function addTriangle(x, y, color) {
  var size = 0.1;
  // To draw a proper equilateral triangle, calculations require trigonometry for base width and center
  var c30 = Math.cos(Math.PI / 6) * size; // 0.866 * size
  var s30 = Math.sin(Math.PI / 6) * size; // 0.5 * size

  var vertices = [
    x,
    y + size,
    color[0],
    color[1],
    color[2],
    color[3], // Top
    x - c30,
    y - s30,
    color[0],
    color[1],
    color[2],
    color[3], // Bottom-left
    x + c30,
    y - s30,
    color[0],
    color[1],
    color[2],
    color[3], // Bottom-right
  ];
  addToShapeArray(g_triangles, vertices);
}

function addCircle(x, y, color) {
  var vertices = [];
  var radius = 0.1;
  var segments = 30;

  for (var i = 0; i < segments; i++) {
    var angle1 = (i / segments) * 2 * Math.PI;
    var angle2 = ((i + 1) / segments) * 2 * Math.PI;

    vertices.push(x, y, color[0], color[1], color[2], color[3]);
    vertices.push(
      x + Math.cos(angle1) * radius,
      y + Math.sin(angle1) * radius,
      color[0],
      color[1],
      color[2],
      color[3],
    );
    vertices.push(
      x + Math.cos(angle2) * radius,
      y + Math.sin(angle2) * radius,
      color[0],
      color[1],
      color[2],
      color[3],
    );
  }

  addToShapeArray(g_circles, vertices);
}

function addSquare(x, y, color) {
  var size = 0.08; // Slightly smaller for visual consistency with other shapes
  var vertices = [
    // First triangle (top-left, bottom-left, bottom-right)
    x - size,
    y + size,
    color[0],
    color[1],
    color[2],
    color[3],
    x - size,
    y - size,
    color[0],
    color[1],
    color[2],
    color[3],
    x + size,
    y - size,
    color[0],
    color[1],
    color[2],
    color[3],
    // Second triangle (top-left, bottom-right, top-right)
    x - size,
    y + size,
    color[0],
    color[1],
    color[2],
    color[3],
    x + size,
    y - size,
    color[0],
    color[1],
    color[2],
    color[3],
    x + size,
    y + size,
    color[0],
    color[1],
    color[2],
    color[3],
  ];
  addToShapeArray(g_squares, vertices);
}

function addToShapeArray(array, vertices) {
  array.push(vertices);
  if (array.length > 3) {
    array.shift();
  }
}
