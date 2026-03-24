# AGENTS.md

## Repository Overview

This is a Computer Graphics Homework 1 project for CSU0021 at NTNU. It's a minimal WebGL application that allows users to draw shapes by clicking on a canvas. This is an educational project with no build tools, package managers, or testing frameworks.

## Build Commands

**None** - This project uses plain HTML and JavaScript. No build step required.

## Test Commands

**None** - No automated tests. Manual testing by:
1. Open `index.html` in a WebGL-compatible browser
2. Click canvas to draw shapes
3. Press keys to change shapes and colors
4. Verify only last 3 shapes of each type remain visible

## Run Commands

```bash
# Simply open in browser
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

Or drag `index.html` into any modern browser.

## Code Style Guidelines

### Project Structure
```
.
├── index.html       # Main HTML with canvas setup
├── WebGL.js         # WebGL rendering logic
├── README.md        # Assignment requirements
└── Homework1-Demo.mov # Demo video reference
```

### JavaScript Conventions

**Naming:**
- `camelCase` for variables and functions: `g_points`, `shapeFlag`, `keydown()`
- `UPPER_SNAKE_CASE` for constants: `VSHADER_SOURCE`, `FSHADER_SOURCE`
- Prefix global state with `g_`: `g_points`, `g_triangles`
- Single-letter flags for state: `shapeFlag = 'p'`, `colorFlag = 'r'`

**Imports:**
- No modules or imports - uses script tags in HTML
- `<script src="WebGL.js"></script>` in HTML body

**Formatting:**
- 4 spaces for indentation (see WebGL.js)
- No trailing whitespace
- Single quotes for strings: `canvas.getContext('webgl2')`
- Template literals for multi-line shaders: var VSHADER_SOURCE = `...`

**Types:**
- Plain JavaScript (no TypeScript)
- Type hints in comments where useful: `function click(ev){ // mouse event`

**Error Handling:**
- Check WebGL context availability:
  ```javascript
  var gl = canvas.getContext('webgl2');
  if(!gl){
      console.log('Failed to get the rendering context for WebGL');
      return ;
  }
  ```
- Use console.log for debugging

### WebGL Implementation Patterns

**CRITICAL REQUIREMENT: Single draw call per shape type**
- Use VBO and shaders (required by assignment)
- Call `gl.drawArrays()` once per shape type, not per shape
- Store all shape vertices of same type in array, then draw together

**Shader Structure:**
- Vertex shader source in `VSHADER_SOURCE` variable
- Fragment shader source in `FSHADER_SOURCE` variable
- Compile and use shaders in `main()`

**Canvas Setup:**
- Canvas ID: `'webgl'`
- Dimensions: 400x400 pixels (configurable)
- Clear color: black (0.0, 0.0, 0.0, 1.0)
- Use WebGL2 context: `canvas.getContext('webgl2')`

**Event Handling:**
- Mouse: `canvas.onmousedown = function(ev){click(ev)}`
- Keyboard: `document.onkeydown = function(ev){keydown(ev)}`
- Convert screen coordinates to clip space in `click()`

**Drawing Pipeline:**
1. Clear canvas: `gl.clear(gl.COLOR_BUFFER_BIT)`
2. For each shape type: update VBO → draw all instances → repeat
3. Keep only last 3 shapes per type (FIFO queue)

**State Management:**
- `shapeFlag`: current shape to draw ('p', 't', etc.)
- `colorFlag`: current color ('r', 'g', 'b')
- Separate arrays per shape type: `g_points`, `g_triangles`, etc.
- Maintain max 3 items per array (remove oldest on 4th)

## Assignment Constraints

1. **Must use VBO and shaders** - legacy immediate mode not allowed
2. **Single gl.drawArrays() per shape type** - enforced for grading
3. **Only keep last 3 shapes per type** - FIFO queue behavior required
4. **Shapes must be visible but not overwhelming** - size matters

## Development Workflow

1. Implement vertex and fragment shaders
2. Set up VBO and shader program in `main()`
3. Implement coordinate conversion in `click()`
4. Store shape vertices in appropriate array (max 3)
5. Implement `draw()` to clear and redraw all visible shapes
6. Test shape/color switching with keyboard events

## Testing Checklist

- [ ] Canvas renders without errors
- [ ] Clicking draws shape at cursor position
- [ ] Keyboard changes shape type correctly
- [ ] Keyboard changes color correctly
- [ ] Only last 3 shapes of each type visible
- [ ] Single `gl.drawArrays()` call per shape type (verify in code)
- [ ] Shapes are visible but not too large/small
