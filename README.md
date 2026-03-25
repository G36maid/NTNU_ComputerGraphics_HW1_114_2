# Computer Graphics Homework 1

## How to Use

### Running the Application

Simply open `index.html` in a modern web browser that supports WebGL (Chrome, Firefox, Safari, Edge). No build step or installation required.

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

This is a WebGL programming assignment for CSU0021: Computer Graphics at NTNU.

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

## Demo Video

[Watch the demo on YouTube](https://www.youtube.com/watch?v=Qnxa1kHaC1Y&ab_channel=Ko-ChihWang)

## Submission Guidelines

### File Requirements

1. Put all files (`index.html`, JavaScript files) in a folder
2. Compress (zip) the folder
3. Rename the zip file to your student ID (e.g., `407470888s.zip`)
4. Submit to Moodle before the deadline

**Important**: Ensure that TA can unzip the file and drag `index.html` to the browser to run without any extra work. Failure to follow this rule will result in a penalty.

### Late Submission

Late submissions will incur penalties according to the course policy.

### Demonstration

You must schedule a time with the TA to demonstrate your homework:

1. **Book a 5-minute time slot**: [Sign up here](https://tinyurl.com/y5jcadve) before the Moodle submission deadline
2. **Bring your laptop** (or make a note if you won't when booking)
3. **Arrive on time**
4. **Location**: Room 109, Applied Science Building
5. **TA Email**: 61147074s@gapps.ntnu.edu.tw

**Note**: If you submit late, you must email the TA and book a new demonstration time. Otherwise, you will not receive any points.

## Files

- `index.html` - Main HTML file
- `Homework1-Demo.mov` - Demo video showing expected behavior
- `NTNU_ComputerGraphics_HW1__114_2_.pdf` - Original assignment description

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a web browser to test your implementation
3. Ensure all JavaScript files are properly linked

---

**Course**: CSU0021: Computer Graphics
**Institution**: NTNU (National Taiwan Normal University)
