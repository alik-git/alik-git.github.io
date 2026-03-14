// Perceptron Learning Visualization
// Interactive demonstration of how a perceptron finds a linear decision boundary

(function() {
  const canvas = document.getElementById('perceptron-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  // --- State ---
  let points = [];
  let weights = [0, 0, 0]; // w0 (bias), w1, w2
  let stepCount = 0;
  let errorCount = 0;
  let running = false;
  let animId = null;
  let trainOrder = [];
  let trainIdx = 0;
  let lastTrained = new Set();
  const LR = 0.01;

  // --- Generate two clusters ---
  let clusterAngle = 0;

  function generateData(n = 80) {
    points = [];
    clusterAngle = Math.random() * Math.PI * 2;
    const cx1 = 0.3 * Math.cos(clusterAngle) + 0.5;
    const cy1 = 0.3 * Math.sin(clusterAngle) + 0.5;
    const cx2 = 0.3 * Math.cos(clusterAngle + Math.PI) + 0.5;
    const cy2 = 0.3 * Math.sin(clusterAngle + Math.PI) + 0.5;

    for (let i = 0; i < n; i++) {
      const label = i < n / 2 ? 1 : -1;
      const cx = label === 1 ? cx1 : cx2;
      const cy = label === 1 ? cy1 : cy2;
      points.push({
        x: cx + (Math.random() - 0.5) * 0.22,
        y: cy + (Math.random() - 0.5) * 0.22,
        label
      });
    }
  }

  function initBadWeights() {
    weights[1] = -Math.sin(clusterAngle);
    weights[2] = Math.cos(clusterAngle);
    weights[0] = -(weights[1] * 0.5 + weights[2] * 0.5);
  }

  function shuffleTrainOrder() {
    trainOrder = points.map((_, i) => i);
    for (let i = trainOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [trainOrder[i], trainOrder[j]] = [trainOrder[j], trainOrder[i]];
    }
    trainIdx = 0;
  }

  // --- Logging ---
  const logEl = document.getElementById('perceptron-log');

  function log(html) {
    logEl.innerHTML += html + '\n';
    logEl.scrollTop = logEl.scrollHeight;
  }

  function clearLog() {
    logEl.innerHTML = '';
  }

  function classificationSummary() {
    let blueCorrect = 0, blueMiss = 0, redCorrect = 0, redMiss = 0;
    for (const p of points) {
      const correct = predict(p) === p.label;
      if (p.label === 1) { correct ? blueCorrect++ : blueMiss++; }
      else { correct ? redCorrect++ : redMiss++; }
    }
    return { blueCorrect, blueMiss, redCorrect, redMiss };
  }

  function boundaryDescription() {
    if (Math.abs(weights[2]) < 1e-9 && Math.abs(weights[1]) < 1e-9) return 'undefined';
    if (Math.abs(weights[2]) < 1e-9) {
      const xInt = -weights[0] / weights[1];
      return `vertical line at x = ${xInt.toFixed(3)}`;
    }
    const slope = -weights[1] / weights[2];
    const intercept = -weights[0] / weights[2];
    return `y = ${slope.toFixed(3)}x + ${intercept.toFixed(3)}`;
  }

  function fmtDelta(v) {
    const cls = v >= 0 ? 'delta-pos' : 'delta-neg';
    return `<span class="${cls}">${v >= 0 ? '+' : ''}${v.toFixed(4)}</span>`;
  }

  function logInitialState() {
    const s = classificationSummary();
    const totalBlue = s.blueCorrect + s.blueMiss;
    const totalRed = s.redCorrect + s.redMiss;
    log(`<span class="step-header">Initial State</span>`);
    log(`<span class="line"><span class="blue">${totalBlue} blue points</span> <span class="dim">(class +1)</span> &nbsp; <span class="red">${totalRed} red points</span> <span class="dim">(class -1)</span></span>`);
    log(`<span class="line"><span class="boundary">Boundary: ${boundaryDescription()}</span></span>`);
    log(`<span class="line"><span class="weights">Weights: bias=${weights[0].toFixed(4)}, w1=${weights[1].toFixed(4)}, w2=${weights[2].toFixed(4)}</span></span>`);
    log(`<span class="line"><span class="miss">${s.blueMiss + s.redMiss} misclassified:</span> <span class="blue">${s.blueMiss} blue</span> + <span class="red">${s.redMiss} red</span> on wrong side</span>`);
  }

  // --- Perceptron ---
  function predict(p) {
    const sum = weights[0] + weights[1] * p.x + weights[2] * p.y;
    return sum >= 0 ? 1 : -1;
  }

  function countErrors() {
    let errs = 0;
    for (const p of points) {
      if (predict(p) !== p.label) errs++;
    }
    return errs;
  }

  function trainBatch() {
    const batchSize = parseInt(document.getElementById('perceptron-batch-slider').value);
    const misclassified = [];
    for (let i = 0; i < points.length; i++) {
      if (predict(points[i]) !== points[i].label) misclassified.push(i);
    }
    if (misclassified.length === 0) {
      errorCount = 0;
      lastTrained = new Set();
      log(`<span class="converged">Converged! All points classified correctly.</span>`);
      return false;
    }
    for (let i = misclassified.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [misclassified[i], misclassified[j]] = [misclassified[j], misclassified[i]];
    }
    const batch = misclassified.slice(0, batchSize);
    lastTrained = new Set(batch);
    stepCount++;

    let batchBlue = 0, batchRed = 0;
    for (const i of batch) {
      points[i].label === 1 ? batchBlue++ : batchRed++;
    }

    const oldW = [...weights];
    for (const i of batch) {
      const p = points[i];
      weights[0] += LR * p.label;
      weights[1] += LR * p.label * p.x;
      weights[2] += LR * p.label * p.y;
    }
    errorCount = countErrors();

    const s = classificationSummary();
    const dw0 = weights[0] - oldW[0];
    const dw1 = weights[1] - oldW[1];
    const dw2 = weights[2] - oldW[2];

    log(`<span class="step-header">Step ${stepCount} &mdash; trained on ${batch.length} point${batch.length > 1 ? 's' : ''} <span class="dim">(</span><span class="blue">${batchBlue} blue</span><span class="dim">,</span> <span class="red">${batchRed} red</span><span class="dim">)</span></span>`);
    log(`<span class="line">Weight deltas: bias ${fmtDelta(dw0)}, w1 ${fmtDelta(dw1)}, w2 ${fmtDelta(dw2)}</span>`);
    log(`<span class="line"><span class="weights">Weights now: bias=${weights[0].toFixed(4)}, w1=${weights[1].toFixed(4)}, w2=${weights[2].toFixed(4)}</span></span>`);
    log(`<span class="line"><span class="boundary">Boundary: ${boundaryDescription()}</span></span>`);
    log(`<span class="line"><span class="blue">${s.blueCorrect} blue correct</span>${s.blueMiss > 0 ? `, <span class="miss">${s.blueMiss} blue misclassified</span>` : ''} &nbsp;|&nbsp; <span class="red">${s.redCorrect} red correct</span>${s.redMiss > 0 ? `, <span class="miss">${s.redMiss} red misclassified</span>` : ''}</span>`);
    if (errorCount === 0) {
      log(`<span class="converged">All ${points.length} points classified correctly!</span>`);
    }

    return true;
  }

  // --- Drawing ---
  function toCanvas(x, y) {
    const pad = 60;
    return [pad + x * (W - 2 * pad), H - pad - y * (H - 2 * pad)];
  }

  function drawDecisionBoundary() {
    if (Math.abs(weights[2]) < 1e-9 && Math.abs(weights[1]) < 1e-9) return;

    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    ctx.beginPath();

    const pts = [];
    if (Math.abs(weights[2]) > 1e-9) {
      for (const x of [0, 1]) {
        const y = -(weights[0] + weights[1] * x) / weights[2];
        pts.push([x, y]);
      }
    }
    if (Math.abs(weights[1]) > 1e-9) {
      for (const y of [0, 1]) {
        const x = -(weights[0] + weights[2] * y) / weights[1];
        pts.push([x, y]);
      }
    }
    const valid = pts.filter(([x, y]) => x >= -0.1 && x <= 1.1 && y >= -0.1 && y <= 1.1);
    if (valid.length >= 2) {
      const [x1, y1] = toCanvas(valid[0][0], valid[0][1]);
      const [x2, y2] = toCanvas(valid[1][0], valid[1][1]);
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  function drawDecisionRegions() {
    if (Math.abs(weights[1]) < 1e-9 && Math.abs(weights[2]) < 1e-9) return;
    const pad = 60;
    const imgData = ctx.getImageData(pad, pad, W - 2 * pad, H - 2 * pad);
    const d = imgData.data;
    const rw = W - 2 * pad;
    const rh = H - 2 * pad;
    for (let py = 0; py < rh; py++) {
      for (let px = 0; px < rw; px++) {
        const x = px / rw;
        const y = 1 - py / rh;
        const sum = weights[0] + weights[1] * x + weights[2] * y;
        const idx = (py * rw + px) * 4;
        if (sum >= 0) {
          d[idx] = 60; d[idx+1] = 100; d[idx+2] = 180; d[idx+3] = 35;
        } else {
          d[idx] = 220; d[idx+1] = 60; d[idx+2] = 60; d[idx+3] = 35;
        }
      }
    }
    ctx.putImageData(imgData, pad, pad);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Background grid
    ctx.strokeStyle = '#1a1a3a';
    ctx.lineWidth = 1;
    const pad = 60;
    for (let i = 0; i <= 10; i++) {
      const x = pad + i * (W - 2 * pad) / 10;
      const y = pad + i * (H - 2 * pad) / 10;
      ctx.beginPath(); ctx.moveTo(x, pad); ctx.lineTo(x, H - pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(W - pad, y); ctx.stroke();
    }

    drawDecisionRegions();
    drawDecisionBoundary();

    // Points
    for (let pi = 0; pi < points.length; pi++) {
      const p = points[pi];
      const [cx, cy] = toCanvas(p.x, p.y);
      const correct = predict(p) === p.label;
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      if (p.label === 1) {
        ctx.fillStyle = '#4a9eff';
        ctx.fill();
      } else {
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      if (!correct) {
        ctx.beginPath();
        ctx.arc(cx, cy, 9, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffcc00';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      if (lastTrained.has(pi)) {
        ctx.beginPath();
        ctx.arc(cx, cy, 12, 0, Math.PI * 2);
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    document.getElementById('perceptron-step-num').textContent = stepCount;
    document.getElementById('perceptron-errors').textContent = errorCount;
  }

  // --- Controls ---
  function step() {
    trainBatch();
    draw();
  }

  function run() {
    if (running) {
      running = false;
      document.getElementById('perceptron-btn-run').textContent = 'Run';
      return;
    }
    running = true;
    document.getElementById('perceptron-btn-run').textContent = 'Pause';

    let lastTime = 0;
    const interval = 50;

    function tick(timestamp) {
      if (!running) return;
      if (timestamp - lastTime >= interval) {
        trainBatch();
        draw();
        lastTime = timestamp;
        if (errorCount === 0) {
          running = false;
          document.getElementById('perceptron-btn-run').textContent = 'Run';
          return;
        }
        if (stepCount > 5000) {
          running = false;
          document.getElementById('perceptron-btn-run').textContent = 'Run';
          return;
        }
      }
      animId = requestAnimationFrame(tick);
    }
    animId = requestAnimationFrame(tick);
  }

  function reset() {
    running = false;
    document.getElementById('perceptron-btn-run').textContent = 'Run';
    cancelAnimationFrame(animId);
    stepCount = 0;
    errorCount = 0;
    lastTrained = new Set();
    generateData();
    initBadWeights();
    shuffleTrainOrder();
    errorCount = countErrors();
    clearLog();
    logInitialState();
    draw();
  }

  // --- Event Listeners ---
  document.getElementById('perceptron-btn-step').addEventListener('click', step);
  document.getElementById('perceptron-btn-run').addEventListener('click', run);
  document.getElementById('perceptron-btn-reset').addEventListener('click', reset);

  const batchSlider = document.getElementById('perceptron-batch-slider');
  const batchLabel = document.getElementById('perceptron-batch-label');
  batchSlider.addEventListener('input', () => {
    const v = parseInt(batchSlider.value);
    batchLabel.textContent = v >= points.length ? 'All' : v;
  });

  // --- Init ---
  generateData();
  initBadWeights();
  shuffleTrainOrder();
  errorCount = countErrors();
  logInitialState();
  draw();
})();
