  // Global variables
  let isDigital = true;
  let isIST = true;
  let showFlag = false;
  let isLightTheme = false;
  
  // Get elements
  const flagCanvas = document.getElementById('flag');
  const dateDiv = document.getElementById('date');
  const digitalClock = document.getElementById('digital-clock');
  const analogClock = document.getElementById('analog-clock');
  const ampmDiv = document.getElementById('ampm');
  const toggleStyleBtn = document.getElementById('toggle-style');
  const toggleTimezoneBtn = document.getElementById('toggle-timezone');
  const toggleFlagBtn = document.getElementById('toggle-flag');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const tickMarksGroup = document.getElementById('tick-marks');
  const centerDot = document.getElementById('center-dot');
  const body = document.body;
  
  // Set canvas size
  flagCanvas.width = 500;
  flagCanvas.height = 500;
  const ctx = flagCanvas.getContext('2d');
  
  // Add clock numbers and tick marks
  function setupClockFace() {
      // Clear existing elements
      while (tickMarksGroup.firstChild) {
          tickMarksGroup.removeChild(tickMarksGroup.firstChild);
      }
      
      // Remove existing hour marks
      const existingHourMarks = analogClock.querySelectorAll('.hour-mark');
      existingHourMarks.forEach(mark => mark.remove());
      
      // Add tick marks for minutes
      for (let i = 0; i < 60; i++) {
          const angle = (i * 6) * (Math.PI / 180) - Math.PI / 2;
          const length = i % 5 === 0 ? 10 : 5; // Longer marks for hour positions
          const outerRadius = 138;
          const innerRadius = outerRadius - length;
          
          const x1 = outerRadius * Math.cos(angle);
          const y1 = outerRadius * Math.sin(angle);
          const x2 = innerRadius * Math.cos(angle);
          const y2 = innerRadius * Math.sin(angle);
          
          const tickLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
          tickLine.setAttribute("x1", x1);
          tickLine.setAttribute("y1", y1);
          tickLine.setAttribute("x2", x2);
          tickLine.setAttribute("y2", y2);
          tickLine.setAttribute("stroke", isLightTheme ? "#333" : "white");
          tickLine.setAttribute("stroke-width", i % 5 === 0 ? "2" : "1");
          tickLine.setAttribute("class", "tick-mark");
          
          tickMarksGroup.appendChild(tickLine);
      }
      
      // Add hour numbers
      for (let i = 1; i <= 12; i++) {
          const angle = (i * 30) * (Math.PI / 180) - Math.PI / 2;
          const x = 115 * Math.cos(angle);
          const y = 115 * Math.sin(angle);
          
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("x", x);
          text.setAttribute("y", y);
          text.setAttribute("class", "hour-mark");
          text.textContent = i;
          
          analogClock.appendChild(text);
      }
  }
  
  // Create stars for background
  function createStars() {
      const container = document.querySelector('.background-animation');
      
      // Remove existing stars
      const existingStars = document.querySelectorAll('.star');
      existingStars.forEach(star => star.remove());
      
      // Create new stars
      for (let i = 0; i < 100; i++) {
          const star = document.createElement('div');
          star.classList.add('star');
          
          // Random position
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;
          star.style.left = `${x}px`;
          star.style.top = `${y}px`;
          
          // Random size
          const size = Math.random() * 3;
          star.style.width = `${size}px`;
          star.style.height = `${size}px`;
          
          // Random animation duration
          const duration = 2 + Math.random() * 3;
          star.style.animationDuration = `${duration}s`;
          
          // Random animation delay
          const delay = Math.random() * 5;
          star.style.animationDelay = `${delay}s`;
          
          container.appendChild(star);
      }
  }
  
  // Draw Indian flag with animation
  function drawIndianFlag() {
      ctx.clearRect(0, 0, flagCanvas.width, flagCanvas.height);
      
      // Apply wave animation
      const time = new Date().getTime() * 0.001;
      const amplitude = 5;
      const frequency = 0.1;
      
      for (let y = 0; y < flagCanvas.height; y++) {
          const xOffset = Math.sin(time + y * frequency) * amplitude;
          
          // Saffron
          if (y < flagCanvas.height / 3) {
              ctx.fillStyle = "rgb(255, 153, 51)";
              ctx.fillRect(xOffset, y, flagCanvas.width, 1);
          }
          // White
          else if (y < 2 * flagCanvas.height / 3) {
              ctx.fillStyle = "white";
              ctx.fillRect(xOffset, y, flagCanvas.width, 1);
          }
          // Green
          else {
              ctx.fillStyle = "rgb(0, 128, 0)";
              ctx.fillRect(xOffset, y, flagCanvas.width, 1);
          }
      }
      
      // Ashoka Chakra
      ctx.fillStyle = "navy";
      ctx.beginPath();
      ctx.arc(flagCanvas.width / 2, flagCanvas.height / 2, 40, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(flagCanvas.width / 2, flagCanvas.height / 2, 40, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Rotating spokes
      const spokesRotation = time * 20;
      for (let i = 0; i < 24; i++) {
          const angle = (i * 15 + spokesRotation) * (Math.PI / 180);
          const x1 = flagCanvas.width / 2 + 40 * Math.cos(angle);
          const y1 = flagCanvas.height / 2 + 40 * Math.sin(angle);
          const x2 = flagCanvas.width / 2 + 20 * Math.cos(angle);
          const y2 = flagCanvas.height / 2 + 20 * Math.sin(angle);
          
          ctx.strokeStyle = "white";
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
      }
  }
  
  // Draw US flag with animation
  function drawUSFlag() {
      ctx.clearRect(0, 0, flagCanvas.width, flagCanvas.height);
      
      const time = new Date().getTime() * 0.001;
      const amplitude = 5;
      const frequency = 0.1;
      
      // Stripes with wave animation
      const stripeHeight = flagCanvas.height / 13;
      for (let y = 0; y < flagCanvas.height; y++) {
          const stripeIndex = Math.floor(y / stripeHeight);
          const xOffset = Math.sin(time + y * frequency) * amplitude;
          
          ctx.fillStyle = stripeIndex % 2 === 0 ? "red" : "white";
          ctx.fillRect(xOffset, y, flagCanvas.width, 1);
      }
      
      // Blue union with wave
      for (let y = 0; y < flagCanvas.height * 0.538; y++) {
          const xOffset = Math.sin(time + y * frequency) * amplitude;
          ctx.fillStyle = "navy";
          ctx.fillRect(xOffset, y, flagCanvas.width * 0.4, 1);
      }
      
      // Stars
      ctx.fillStyle = "white";
      const starSize = 8;
      const starOffset = 15;
      const startX = 20;
      const startY = 15;
      const starRows = 9;
      const starCols = 11;
      
      for (let row = 0; row < starRows; row++) {
          const rowStars = row % 2 === 0 ? 6 : 5;
          const rowStartX = row % 2 === 0 ? startX : startX + starOffset;
          
          for (let col = 0; col < rowStars; col++) {
              const x = rowStartX + col * starOffset * 2;
              const y = startY + row * starOffset;
              
              // Draw star with pulse
              const pulse = 1 + 0.2 * Math.sin(time * 3 + row + col);
              drawStar(x, y, starSize * pulse);
          }
      }
  }
  
  // Draw a star at position
  function drawStar(x, y, size) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      
      for (let i = 0; i < 5; i++) {
          ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * size, Math.sin((18 + i * 72) * Math.PI / 180) * size);
          ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * size * 0.4, Math.sin((54 + i * 72) * Math.PI / 180) * size * 0.4);
      }
      
      ctx.closePath();
      ctx.fill();
      ctx.restore();
  }
  
  // Update clock
  function updateClock() {
      const now = new Date();
      
      // Adjust for IST or EST
      const timeOffset = isIST ? 0 : -9.5 * 60 * 60 * 1000;
      const adjustedTime = new Date(now.getTime() + timeOffset);
      
      let hours = adjustedTime.getHours();
      const minutes = adjustedTime.getMinutes();
      const seconds = adjustedTime.getSeconds();
      const milliseconds = adjustedTime.getMilliseconds();
      const day = adjustedTime.getDate();
      const month = adjustedTime.getMonth() + 1;
      const year = adjustedTime.getFullYear();
      
      // AM/PM
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      
      // Update date
      dateDiv.textContent = `${day}/${month}/${year}`;
      
      if (isDigital) {
          // Update digital clock
          digitalClock.style.display = "block";
          analogClock.style.display = "none";
          ampmDiv.style.display = "none";
          
          // Add pulsing animation to seconds
          const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:<span style="animation: digitalPulse 1s infinite;">${seconds.toString().padStart(2, '0')}</span> ${ampm}`;
          digitalClock.innerHTML = formattedTime;
      } else {
          // Update analog clock
          digitalClock.style.display = "none";
          analogClock.style.display = "block";
          ampmDiv.style.display = "block";
          
          // Calculate angles with smooth motion
          const hourAngle = ((hours % 12) * 30 + minutes * 0.5) * (Math.PI / 180);
          const minuteAngle = (minutes * 6 + seconds * 0.1) * (Math.PI / 180);
          const secondAngle = (seconds * 6 + milliseconds * 0.006) * (Math.PI / 180);
          
          // Update hands
          const hourHand = document.getElementById("hour-hand");
          hourHand.setAttribute("x2", 70 * Math.sin(hourAngle));
          hourHand.setAttribute("y2", -70 * Math.cos(hourAngle));
          
          const minuteHand = document.getElementById("minute-hand");
          minuteHand.setAttribute("x2", 100 * Math.sin(minuteAngle));
          minuteHand.setAttribute("y2", -100 * Math.cos(minuteAngle));
          
          const secondHand = document.getElementById("second-hand");
          secondHand.setAttribute("x2", 120 * Math.sin(secondAngle));
          secondHand.setAttribute("y2", -120 * Math.cos(secondAngle));
          
          // Animate center dot
          centerDot.style.animation = "pulse 2s infinite";
          
          // Update AM/PM
          ampmDiv.textContent = ampm;
      }
      
      // Draw flag if show flag is enabled
      if (showFlag) {
          if (isIST) {
              drawIndianFlag();
          } else {
              drawUSFlag();
          }
          flagCanvas.style.opacity = "1";
          flagCanvas.style.display = "block";
      } else {
          flagCanvas.style.opacity = "0";
      }
  }
  
  // Toggle functions with animation effects
  function toggleStyle() {
      isDigital = !isDigital;
      toggleStyleBtn.textContent = isDigital ? "Digital Clock (D)" : "Analog Clock (A)";
      toggleStyleBtn.classList.toggle('active-button');
      
      if (isDigital) {
          digitalClock.classList.add('fade-transition');
          setTimeout(() => digitalClock.classList.remove('fade-transition'), 500);
      } else {
          analogClock.classList.add('fade-transition');
          setTimeout(() => analogClock.classList.remove('fade-transition'), 500);
          ampmDiv.classList.add('fade-transition');
          setTimeout(() => ampmDiv.classList.remove('fade-transition'), 500);
      }
      
      updateClock();
  }
  
  function toggleTimezone() {
      isIST = !isIST;
      toggleTimezoneBtn.textContent = isIST ? "IST (I)" : "EST (U)";
      toggleTimezoneBtn.classList.toggle('active-button');
      
      if (isDigital) {
          digitalClock.classList.add('fade-transition');
          setTimeout(() => digitalClock.classList.remove('fade-transition'), 500);
      } else {
          analogClock.classList.add('fade-transition');
          setTimeout(() => analogClock.classList.remove('fade-transition'), 500);
      }
      
      updateClock();
  }
  
  function toggleFlag() {
      showFlag = !showFlag;
      toggleFlagBtn.textContent = showFlag ? "Hide Flag (F)" : "Show Flag (F)";
      toggleFlagBtn.classList.toggle('active-button');
      updateClock();
  }
  
  function toggleTheme() {
      isLightTheme = !isLightTheme;
      body.classList.toggle('light-theme');
      
      // Update tick marks color
      const tickMarks = document.querySelectorAll('.tick-mark');
      tickMarks.forEach(mark => {
          mark.setAttribute('stroke', isLightTheme ? '#333' : 'white');
      });
      
      // Refresh the clock face
      setupClockFace();
      updateClock();
  }
  
  // Add event listeners
  toggleStyleBtn.addEventListener("click", toggleStyle);
  toggleTimezoneBtn.addEventListener("click", toggleTimezone);
  toggleFlagBtn.addEventListener("click", toggleFlag);
  themeToggleBtn.addEventListener("click", toggleTheme);
  
  // Keyboard controls
  document.addEventListener("keydown", (event) => {
      switch (event.key.toLowerCase()) {
          case 'a': 
              isDigital = false; 
              toggleStyleBtn.textContent = "Analog Clock (A)"; 
              toggleStyleBtn.classList.add('active-button');
              break;
          case 'd': 
              isDigital = true; 
              toggleStyleBtn.textContent = "Digital Clock (D)"; 
              toggleStyleBtn.classList.remove('active-button');
              break;
          case 'u': 
              isIST = false; 
              toggleTimezoneBtn.textContent = "EST (U)"; 
              toggleTimezoneBtn.classList.add('active-button');
              break;
          case 'i': 
              isIST = true; 
              toggleTimezoneBtn.textContent = "IST (I)"; 
              toggleTimezoneBtn.classList.remove('active-button');
              break;
          case 'f': 
              showFlag = !showFlag; 
              toggleFlagBtn.textContent = showFlag ? "Hide Flag (F)" : "Show Flag (F)"; 
              toggleFlagBtn.classList.toggle('active-button');
              break;
          case 't':
              toggleTheme();
              break;
      }
      updateClock();
  });
  
  // Window resize handler
  window.addEventListener('resize', createStars);
  
  // Update clock more frequently for smoother animations
  setInterval(updateClock, 16); // ~60fps
  
  // Initial setup
  setupClockFace();
  createStars();
  updateClock();