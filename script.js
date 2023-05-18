window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const svgContainer = document.getElementById('svg-container');
  
    
    const screenWidth = 1920; 
    const screenHeight = 1080; 
  
    function resizeCanvas() {
      const scaleFactor = Math.min(
        window.innerWidth / screenWidth,
        window.innerHeight / screenHeight
      );
  
      canvas.width = screenWidth * scaleFactor;
      canvas.height = screenHeight * scaleFactor;
    }
  
    
    window.addEventListener('resize', resizeCanvas);
  
    resizeCanvas();
  
    const colors = ['red', 'blue', 'green', 'yellow', 'orange'];
  
    class Ball {
      constructor(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
      }
  
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }
  
      update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.dx = -this.dx;
          this.color = colors[Math.floor(Math.random() * colors.length)];
        }
  
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.dy = -this.dy;
          this.color = colors[Math.floor(Math.random() * colors.length)];
        }
  
        for (let i = 0; i < balls.length; i++) {
          if (this === balls[i]) continue; 
          const distance = Math.sqrt(
            Math.pow(this.x - balls[i].x, 2) + Math.pow(this.y - balls[i].y, 2)
          );
  
          if (distance < this.radius + balls[i].radius) {
            this.dx = -this.dx;
            this.dy = -this.dy;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            balls[i].color = colors[Math.floor(Math.random() * colors.length)];
          }
        }
  
        this.x += this.dx;
        this.y += this.dy;
  
        this.draw();
      }
    }
  
    const balls = [];
  
    for (let i = 0; i < 20; i++) {
      const radius = 20;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const dx = (Math.random() - 0.5) *2;
      const dy = (Math.random() - 0.5) *2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      balls.push(new Ball(x, y, radius, color, dx, dy));
    }
  
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      for (let i = 0; i < balls.length; i++) {
        balls[i].update();
      }
    }
  
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
  
    canvas.addEventListener('mousedown', (event) => {
      isDragging = true;
      prevMouseX = event.clientX;
      prevMouseY = event.clientY;
    });
  
    canvas.addEventListener('mousemove', (event) => {
      if (isDragging) {
        const deltaX = event.clientX - prevMouseX;
        const deltaY = event.clientY - prevMouseY;
        canvasWidth += deltaX;
        canvasHeight += deltaY;
        canvasWidth = Math.max(Math.min(canvasWidth, maxWidth), minWidth);
        canvasHeight = Math.max(Math.min(canvasHeight, maxHeight), minHeight);
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
      }
    });
  
    canvas.addEventListener('mouseup', () => {
      isDragging = false;
    });
  
    animate();
  });
  
  