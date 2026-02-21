(() => {
  const canvas = document.getElementById('beer-canvas');
  const ctx = canvas.getContext('2d');
  const prompt = document.getElementById('prompt');

  let W, H;
  let tiltX = 0; // left/right tilt in degrees (-90 to 90)
  let tiltY = 0; // front/back tilt
  let smoothTiltX = 0;
  let smoothTiltY = 0;
  let poured = false;
  let pourProgress = 0; // 0 to 1
  let bubbles = [];
  let foamBubbles = [];
  let time = 0;

  // Glass dimensions (relative to canvas)
  function glassLeft() { return W * 0.15; }
  function glassRight() { return W * 0.85; }
  function glassTop() { return H * 0.08; }
  function glassBottom() { return H * 0.92; }
  function glassWidth() { return glassRight() - glassLeft(); }
  function glassHeight() { return glassBottom() - glassTop(); }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', resize);
  resize();

  // Device orientation
  function handleOrientation(e) {
    // gamma: left/right tilt (-90 to 90)
    // beta: front/back tilt (-180 to 180)
    if (e.gamma !== null) tiltX = e.gamma;
    if (e.beta !== null) tiltY = e.beta - 45; // offset so holding phone ~45deg is neutral
  }

  function requestPermission() {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(state => {
          if (state === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }
  }

  // Mouse/touch fallback for desktop testing
  let mouseActive = false;
  canvas.addEventListener('mousemove', (e) => {
    if (!poured) return;
    mouseActive = true;
    tiltX = ((e.clientX / W) - 0.5) * 60;
    tiltY = ((e.clientY / H) - 0.5) * 40;
  });

  canvas.addEventListener('touchmove', (e) => {
    if (!poured) return;
    e.preventDefault();
    const touch = e.touches[0];
    tiltX = ((touch.clientX / W) - 0.5) * 60;
    tiltY = ((touch.clientY / H) - 0.5) * 40;
  }, { passive: false });

  // Start pouring on tap
  function startPour() {
    if (poured) return;
    poured = true;
    prompt.classList.add('hidden');
    requestPermission();
  }

  canvas.addEventListener('click', startPour);
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startPour();
  }, { passive: false });

  // Bubble class
  function createBubble() {
    const gL = glassLeft();
    const gW = glassWidth();
    return {
      x: gL + Math.random() * gW,
      y: glassBottom(),
      radius: 1 + Math.random() * 3,
      speed: 0.5 + Math.random() * 1.5,
      wobbleOffset: Math.random() * Math.PI * 2,
      wobbleSpeed: 1 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.5,
    };
  }

  function createFoamBubble(x, y) {
    return {
      x: x,
      y: y,
      radius: 3 + Math.random() * 8,
      opacity: 0.4 + Math.random() * 0.4,
    };
  }

  // Beer color
  const beerColor = 'rgba(218, 165, 32, 0.92)';
  const beerColorLight = 'rgba(245, 200, 60, 0.95)';
  const foamColor = 'rgba(255, 250, 230, 0.95)';
  const foamHighlight = 'rgba(255, 255, 255, 0.8)';
  const glassColor = 'rgba(255, 255, 255, 0.12)';
  const glassEdge = 'rgba(255, 255, 255, 0.3)';

  function drawGlass() {
    const gL = glassLeft();
    const gR = glassRight();
    const gT = glassTop();
    const gB = glassBottom();
    const r = 12;

    // Glass body (subtle outline)
    ctx.beginPath();
    ctx.moveTo(gL + r, gT);
    ctx.lineTo(gR - r, gT);
    ctx.quadraticCurveTo(gR, gT, gR, gT + r);
    ctx.lineTo(gR, gB - r);
    ctx.quadraticCurveTo(gR, gB, gR - r, gB);
    ctx.lineTo(gL + r, gB);
    ctx.quadraticCurveTo(gL, gB, gL, gB - r);
    ctx.lineTo(gL, gT + r);
    ctx.quadraticCurveTo(gL, gT, gL + r, gT);
    ctx.closePath();

    ctx.fillStyle = glassColor;
    ctx.fill();
    ctx.strokeStyle = glassEdge;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Glass shine on left edge
    ctx.beginPath();
    ctx.moveTo(gL + 8, gT + 20);
    ctx.lineTo(gL + 8, gB - 20);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 6;
    ctx.stroke();
  }

  function drawBeer() {
    const gL = glassLeft();
    const gR = glassRight();
    const gT = glassTop();
    const gB = glassBottom();
    const gW = glassWidth();
    const gH = glassHeight();

    // Beer fill level
    const fillHeight = gH * 0.82 * pourProgress;
    const beerTop = gB - fillHeight;

    // Tilt offset for liquid surface
    const tiltOffset = (smoothTiltX / 90) * gW * 0.35;

    // Left and right surface heights
    const leftSurfaceY = beerTop + tiltOffset;
    const rightSurfaceY = beerTop - tiltOffset;

    // Clipping region (inside glass)
    ctx.save();
    ctx.beginPath();
    ctx.rect(gL + 1, gT + 1, gW - 2, gH - 2);
    ctx.clip();

    // Beer body with wave
    const waveAmplitude = 3 + Math.abs(smoothTiltX) * 0.1;
    const waveFreq = 0.02;

    ctx.beginPath();
    ctx.moveTo(gL, leftSurfaceY);

    // Wavy top surface
    for (let x = gL; x <= gR; x += 2) {
      const t = (x - gL) / gW;
      const surfaceY = leftSurfaceY + (rightSurfaceY - leftSurfaceY) * t;
      const wave = Math.sin(x * waveFreq + time * 3) * waveAmplitude +
                   Math.sin(x * waveFreq * 2.3 + time * 2) * waveAmplitude * 0.5;
      ctx.lineTo(x, surfaceY + wave);
    }

    ctx.lineTo(gR, gB);
    ctx.lineTo(gL, gB);
    ctx.closePath();

    // Beer gradient
    const grad = ctx.createLinearGradient(gL, beerTop, gL, gB);
    grad.addColorStop(0, beerColorLight);
    grad.addColorStop(0.3, beerColor);
    grad.addColorStop(1, 'rgba(180, 120, 10, 0.95)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Foam layer on top of beer
    const foamThickness = 30 * pourProgress;
    ctx.beginPath();
    ctx.moveTo(gL, leftSurfaceY);

    for (let x = gL; x <= gR; x += 2) {
      const t = (x - gL) / gW;
      const surfaceY = leftSurfaceY + (rightSurfaceY - leftSurfaceY) * t;
      const wave = Math.sin(x * waveFreq + time * 3) * waveAmplitude +
                   Math.sin(x * waveFreq * 2.3 + time * 2) * waveAmplitude * 0.5;
      ctx.lineTo(x, surfaceY + wave);
    }

    for (let x = gR; x >= gL; x -= 2) {
      const t = (x - gL) / gW;
      const surfaceY = leftSurfaceY + (rightSurfaceY - leftSurfaceY) * t;
      const wave = Math.sin(x * waveFreq + time * 3) * waveAmplitude * 0.5;
      ctx.lineTo(x, surfaceY + wave - foamThickness);
    }

    ctx.closePath();

    const foamGrad = ctx.createLinearGradient(0, beerTop - foamThickness, 0, beerTop);
    foamGrad.addColorStop(0, foamColor);
    foamGrad.addColorStop(0.5, 'rgba(255, 248, 220, 0.9)');
    foamGrad.addColorStop(1, 'rgba(245, 230, 180, 0.7)');
    ctx.fillStyle = foamGrad;
    ctx.fill();

    // Foam detail bubbles
    if (pourProgress > 0.3) {
      for (let i = 0; i < foamBubbles.length; i++) {
        const fb = foamBubbles[i];
        const t = (fb.x - gL) / gW;
        const surfaceY = leftSurfaceY + (rightSurfaceY - leftSurfaceY) * t;
        const adjustedY = surfaceY - foamThickness + (fb.y % foamThickness);

        ctx.beginPath();
        ctx.arc(fb.x + smoothTiltX * 0.2, adjustedY, fb.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${fb.opacity * pourProgress})`;
        ctx.fill();
      }
    }

    ctx.restore();
  }

  function drawBubbles() {
    const gL = glassLeft();
    const gR = glassRight();
    const gT = glassTop();
    const gB = glassBottom();

    ctx.save();
    ctx.beginPath();
    ctx.rect(gL + 1, gT + 1, glassWidth() - 2, glassHeight() - 2);
    ctx.clip();

    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];

      // Move bubble up
      b.y -= b.speed;
      b.x += Math.sin(time * b.wobbleSpeed + b.wobbleOffset) * 0.5;

      // Shift with tilt
      b.x += smoothTiltX * 0.02;

      // Remove if above beer surface
      const fillHeight = glassHeight() * 0.82 * pourProgress;
      const beerTopY = gB - fillHeight;
      if (b.y < beerTopY || b.x < gL || b.x > gR) {
        bubbles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 200, ${b.opacity})`;
      ctx.fill();

      // Tiny highlight
      ctx.beginPath();
      ctx.arc(b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.7})`;
      ctx.fill();
    }

    ctx.restore();
  }

  function drawDrinkingEffect() {
    // When tilted forward a lot, show the beer "coming toward you"
    if (smoothTiltY > 15 && pourProgress > 0) {
      const drinkAmount = Math.min((smoothTiltY - 15) / 40, 1);
      const grad = ctx.createLinearGradient(0, 0, 0, H * 0.5);
      grad.addColorStop(0, `rgba(218, 165, 32, ${drinkAmount * 0.6})`);
      grad.addColorStop(1, 'rgba(218, 165, 32, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H * 0.5);
    }
  }

  function initFoamBubbles() {
    foamBubbles = [];
    const gL = glassLeft();
    const gW = glassWidth();
    for (let i = 0; i < 60; i++) {
      foamBubbles.push(createFoamBubble(
        gL + Math.random() * gW,
        Math.random() * 30
      ));
    }
  }

  function update(dt) {
    time += dt;

    // Smooth tilt values
    const smoothFactor = 0.08;
    smoothTiltX += (tiltX - smoothTiltX) * smoothFactor;
    smoothTiltY += (tiltY - smoothTiltY) * smoothFactor;

    // Clamp
    smoothTiltX = Math.max(-45, Math.min(45, smoothTiltX));
    smoothTiltY = Math.max(-45, Math.min(45, smoothTiltY));

    // Pour animation
    if (poured && pourProgress < 1) {
      pourProgress = Math.min(1, pourProgress + dt * 0.4);
    }

    // Spawn bubbles
    if (pourProgress > 0.1 && Math.random() < 0.3) {
      bubbles.push(createBubble());
    }

    // Init foam once
    if (foamBubbles.length === 0 && pourProgress > 0.2) {
      initFoamBubbles();
    }
  }

  function draw() {
    // Dark background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, W, H);

    drawGlass();

    if (pourProgress > 0) {
      drawBeer();
      drawBubbles();
      drawDrinkingEffect();
    }

    // Re-draw glass edges on top for realism
    const gL = glassLeft();
    const gR = glassRight();
    const gT = glassTop();
    const gB = glassBottom();

    // Glass rim highlight
    ctx.beginPath();
    ctx.moveTo(gL + 12, gT);
    ctx.lineTo(gR - 12, gT);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  let lastTime = 0;
  function loop(timestamp) {
    const dt = Math.min((timestamp - lastTime) / 1000, 0.1);
    lastTime = timestamp;

    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  requestAnimationFrame((ts) => {
    lastTime = ts;
    loop(ts);
  });
})();
