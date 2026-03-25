# Computer Graphics Homework 1

## How to Use

### Running the Application

Simply open `index.html` in a modern web browser that supports WebGL (Chrome, Firefox, Safari, Edge). No build step or installation required.

### GitHub Pages Deployment

This project is deployed on GitHub Pages. You can access the live application at:

[https://G36maid.github.io/NTNU_ComputerGraphics_HW1_114_2/](https://G36maid.github.io/NTNU_ComputerGraphics_HW1_114_2/)

The GitHub Pages deployment provides instant access to the application without any local setup required.

### Controls

**Shape Selection** (Press keys on keyboard):
- `1` or `P` - Point
- `2` or `T` - Triangle
- `3` or `C` - Circle
- `4` or `S` - Square

**Color Selection** (Press keys on keyboard):
- `R` - Red
- `G` - Green
- `B` - Blue

**Drawing:**
- Click anywhere on the black canvas to draw the selected shape at that position

### Behavior

- Each shape type keeps only the last 3 shapes visible (FIFO queue)
- When you draw the 4th shape of any type, the oldest one is automatically removed
- Example: Drawing 4 triangles will show triangles #2, #3, and #4; triangle #1 disappears

## Overview

This is a WebGL programming application for drawing shapes.

## Task Description

Implement a WebGL program that allows users to draw four different shapes with three different colors at the location of mouse clicks. Users can press keyboard keys to switch between shapes and colors.

### Requirements

1. **Shapes**: Draw four different shapes (e.g., line segment, triangle, diamond, etc.)
2. **Colors**: Support three different color options
3. **Interactive Controls**:
   - Click to draw shapes at the cursor position
   - Press keys to change the current shape
   - Press keys to change the current color
4. **Shape Retention**: Only keep the last three shapes of each type on the screen
   - Example: If the user clicks for the 4th triangle, remove the first triangle and keep only the 2nd, 3rd, and 4th triangles
5. **Size Guidelines**: Shapes should not be too large (covering everything) or too small/slight to see

### Technical Requirements (IMPORTANT)

- **Must use Vertex Buffer Object (VBO) and shaders**
- **Single draw call per shape type**: You can only call `gl.drawArrays()` once to draw all shapes of the same type
  - Example: If you need to draw 3 triangles, call `gl.drawArrays()` only once for all 3 triangles
  - You will not receive any points if you do not follow this requirement





## Files

- `index.html` - Main HTML file with canvas setup
- `WebGL.js` - WebGL rendering and shape drawing logic

## Getting Started

### Option 1: GitHub Pages (Recommended)

1. Visit the live deployment: [https://G36maid.github.io/NTNU_ComputerGraphics_HW1_114_2/](https://G36maid.github.io/NTNU_ComputerGraphics_HW1_114_2/)
2. The application will load automatically in your browser
3. No additional setup required

### Option 2: Local Development

1. Clone or download this repository
2. Open `index.html` in a web browser to test your implementation
3. Ensure all JavaScript files are properly linked


