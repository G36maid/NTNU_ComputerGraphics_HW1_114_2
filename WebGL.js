//This tempalte is just for your reference
//You do not have to follow this template 
//You are very welcome to write your program from scratch

//shader
var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    varying vec4 v_Color;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = 10.0;
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



var shapeFlag = 'l';
var colorFlag = 'r';
var g_lines = [];
var g_triangles = [];
var g_diamonds = [];
var g_circles = [];


function main(){
    //////Get the canvas context
    var canvas = document.getElementById('webgl');
    //var gl = canvas.getContext('webgl') || canvas.getContext('exprimental-webgl') ;
    var gl = canvas.getContext('webgl2');
    if(!gl){
        console.log('Failed to get the rendering context for WebGL');
        return ;
    }

    var vertexShader = createShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);
    var program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    var a_Position = gl.getAttribLocation(program, 'a_Position');
    var a_Color = gl.getAttribLocation(program, 'a_Color');

    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_Color);

    gl.program = program;
    gl.vertexBuffer = vertexBuffer;
    gl.a_Position = a_Position;
    gl.a_Color = a_Color;

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    canvas.onmousedown = function(ev){click(ev, gl, program)};
    document.onkeydown = function(ev){keydown(ev, gl, program)};
}

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
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
        console.log('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
        return null;
    }
    return program;
}



function keydown(ev, gl, program){
    if (ev.key === '1') {
        shapeFlag = 'l';
    } else if (ev.key === '2') {
        shapeFlag = 't';
    } else if (ev.key === '3') {
        shapeFlag = 'd';
    } else if (ev.key === '4') {
        shapeFlag = 'c';
    } else if (ev.key === 'r') {
        colorFlag = 'r';
    } else if (ev.key === 'g') {
        colorFlag = 'g';
    } else if (ev.key === 'b') {
        colorFlag = 'b';
    }
}

function click(ev, gl, program){
    var canvas = document.getElementById('webgl');
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = ((canvas.height - rect.top) - y) / (canvas.height / 2);

    var color = getColor();

    if (shapeFlag === 'l') {
        addLine(x, y, color);
    } else if (shapeFlag === 't') {
        addTriangle(x, y, color);
    } else if (shapeFlag === 'd') {
        addDiamond(x, y, color);
    } else if (shapeFlag === 'c') {
        addCircle(x, y, color);
    }

    draw(gl, program);
}

function getColor() {
    if (colorFlag === 'r') {
        return [1.0, 0.0, 0.0, 1.0];
    } else if (colorFlag === 'g') {
        return [0.0, 1.0, 0.0, 1.0];
    } else {
        return [0.0, 0.0, 1.0, 1.0];
    }
}


function draw(gl, program){
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    drawShapes(gl, g_lines, gl.LINES);
    drawShapes(gl, g_triangles, gl.TRIANGLES);
    drawShapes(gl, g_diamonds, gl.TRIANGLE_FAN);
    drawShapes(gl, g_circles, gl.TRIANGLE_FAN);
}

function drawShapes(gl, shapes, mode) {
    if (shapes.length === 0) return;

    var vertices = [];
    var i;
    for (i = 0; i < shapes.length; i++) {
        vertices = vertices.concat(shapes[i]);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var FSIZE = vertices.BYTES_PER_ELEMENT;
    gl.vertexAttribPointer(gl.a_Position, 2, gl.FLOAT, false, FSIZE * 6, 0);
    gl.vertexAttribPointer(gl.a_Color, 4, gl.FLOAT, false, FSIZE * 6, FSIZE * 2);

    gl.drawArrays(mode, 0, vertices.length / 6);
}

function addLine(x, y, color) {
    var size = 0.1;
    var vertices = [
        x - size, y, color[0], color[1], color[2], color[3],
        x + size, y, color[0], color[1], color[2], color[3]
    ];
    addToShapeArray(g_lines, vertices);
}

function addTriangle(x, y, color) {
    var size = 0.1;
    var vertices = [
        x, y + size, color[0], color[1], color[2], color[3],
        x - size, y - size, color[0], color[1], color[2], color[3],
        x + size, y - size, color[0], color[1], color[2], color[3]
    ];
    addToShapeArray(g_triangles, vertices);
}

function addDiamond(x, y, color) {
    var size = 0.1;
    var vertices = [
        x, y + size, color[0], color[1], color[2], color[3],
        x + size, y, color[0], color[1], color[2], color[3],
        x, y - size, color[0], color[1], color[2], color[3],
        x - size, y, color[0], color[1], color[2], color[3]
    ];
    addToShapeArray(g_diamonds, vertices);
}

function addCircle(x, y, color) {
    var vertices = [];
    var radius = 0.1;
    var segments = 30;
    var i;
    var angle;

    vertices.push(x, y, color[0], color[1], color[2], color[3]);
    for (i = 0; i <= segments; i++) {
        angle = (i / segments) * 2 * Math.PI;
        vertices.push(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius,
                      color[0], color[1], color[2], color[3]);
    }

    addToShapeArray(g_circles, vertices);
}

function addToShapeArray(array, vertices) {
    array.push(vertices);
    if (array.length > 3) {
        array.shift();
    }
}
