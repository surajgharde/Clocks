// Global variables
let isDigital = true;
let isIST = true;
let showFlag = false;

// Get elements
const flagCanvas = document.getElementById('flag');
const dateDiv = document.getElementById('date');
const digitalClock = document.getElementById('digital-clock');
const analogClock = document.getElementById('analog-clock');
const toggleStyleBtn = document.getElementById('toggle-style');
const toggleTimezoneBtn = document.getElementById('toggle-timezone');
const toggleFlagBtn = document.getElementById('toggle-flag');

// Set canvas size
flagCanvas.width = 500;
flagCanvas.height = 500;
const ctx = flagCanvas.getContext('2d');

// Add clock numbers
for (let i = 1; i <= 12; i++) {
    const angle = (i * 30) * (Math.PI / 180) - Math.PI / 2;
    const x = 120 * Math.cos(angle);
    const y = 120 * Math.sin(angle);
    
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("class", "hour-mark");
    text.textContent = i;
    
    analogClock.appendChild(text);
}

// Draw Indian flag
function drawIndianFlag() {
    ctx.clearRect(0, 0, flagCanvas.width, flagCanvas.height);
    
    // Saffron
    ctx.fillStyle = "rgb(255, 153, 51)";
    ctx.fillRect(0, 0, flagCanvas.width, flagCanvas.height / 3);
    
    // White
    ctx.fillStyle = "white";
    ctx.fillRect(0, flagCanvas.height / 3, flagCanvas.width, flagCanvas.height / 3);
    
    // Green
    ctx.fillStyle = "rgb(0, 128, 0)";
    ctx.fillRect(0, 2 * flagCanvas.height / 3, flagCanvas.width, flagCanvas.height / 3);
    
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
    
    // Spokes
    for (let i = 0; i < 24; i++) {
        const angle = i * 15 * (Math.PI / 180);
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

// Draw US flag
function drawUSFlag() {
    ctx.clearRect(0, 0, flagCanvas.width, flagCanvas.height);
    
    // Stripes
    const stripeHeight = flagCanvas.height / 13;
    for (let i = 0; i < 13; i++) {
        ctx.fillStyle = i % 2 === 0 ? "red" : "white";
        ctx.fillRect(0, i * stripeHeight, flagCanvas.width, stripeHeight);
    }
    
    // Blue union
    ctx.fillStyle = "navy";
    ctx.fillRect(0, 0, flagCanvas.width * 0.4, flagCanvas.height * 0.538);
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
        
        digitalClock.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
    } else {
        // Update analog clock
        digitalClock.style.display = "none";
        analogClock.style.display = "block";
        
        // Calculate angles
        const hourAngle = ((hours % 12) * 30 + minutes * 0.5) * (Math.PI / 180);
        const minuteAngle = (minutes * 6 + seconds * 0.1) * (Math.PI / 180);
        const secondAngle = seconds * 6 * (Math.PI / 180);
        
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
    }
    
    // Draw flag if show flag is enabled
    if (showFlag) {
        if (isIST) {
            drawIndianFlag();
        } else {
            drawUSFlag();
        }
        flagCanvas.style.display = "block";
    } else {
        flagCanvas.style.display = "none";
    }
}

// Toggle functions
function toggleStyle() {
    isDigital = !isDigital;
    toggleStyleBtn.textContent = isDigital ? "Digital Clock (D)" : "Analog Clock (A)";
    updateClock();
}

function toggleTimezone() {
    isIST = !isIST;
    toggleTimezoneBtn.textContent = isIST ? "IST (I)" : "EST (U)";
    updateClock();
}

function toggleFlag() {
    showFlag = !showFlag;
    toggleFlagBtn.textContent = showFlag ? "Hide Flag (F)" : "Show Flag (F)";
    updateClock();
}

// Add event listeners
toggleStyleBtn.addEventListener("click", toggleStyle);
toggleTimezoneBtn.addEventListener("click", toggleTimezone);
toggleFlagBtn.addEventListener("click", toggleFlag);

// Keyboard controls
document.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
        case 'a': isDigital = false; toggleStyleBtn.textContent = "Analog Clock (A)"; break;
        case 'd': isDigital = true; toggleStyleBtn.textContent = "Digital Clock (D)"; break;
        case 'u': isIST = false; toggleTimezoneBtn.textContent = "EST (U)"; break;
        case 'i': isIST = true; toggleTimezoneBtn.textContent = "IST (I)"; break;
        case 'f': 
            showFlag = !showFlag; 
            toggleFlagBtn.textContent = showFlag ? "Hide Flag (F)" : "Show Flag (F)"; 
            break;
    }
    updateClock();
});

// Update clock every second
setInterval(updateClock, 1000);

// Initial update
updateClock();