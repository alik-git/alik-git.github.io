---
layout: distill
title: "Visualizing Why Machines Learn"
description: Interactive visuals to accompany the book. 
date: 2026-01-30 15:09:00
tags: machine-learning visualization
authors:
  - name: Ali Kuwajerwala
    url: "https://alihkw.com/"
    affiliations:
      name: Personal Project

bibliography:
toc:
  - name: The Perceptron
---

<link rel="stylesheet" href="/assets/blog/visuallearn/css/perceptron.css">

I recently read Anil Ananthaswamy's great book [Why Machines Learn](https://anilananthaswamy.com/why-machines-learn).
I enjoyed learning about the story behind the development of deep learning, most of which I didn't know!
While reading it, I repeatedly found myself wishing that the visuals were better, so I made this blog post to accompany the book. I hope it helps!

We start with Frank Rosenblatt's development of the perceptron, one of the first neural networks.

## The Perceptron

The perceptron is the simplest neural network — a single neuron that learns to separate two classes with a linear boundary.

Given an input point $(x_1, x_2)$, the perceptron computes:

$$
y = \text{sign}(w_0 + w_1 x_1 + w_2 x_2)
$$

Where $w_0$ is the bias and $w_1, w_2$ are the weights. The decision boundary is the line where the weighted sum equals zero:

$$
w_0 + w_1 x_1 + w_2 x_2 = 0
$$

### Learning Rule

When the perceptron misclassifies a point, it updates its weights:

$$
w_i \leftarrow w_i + \eta \cdot y \cdot x_i
$$

where $\eta$ is the learning rate and $y \in \{-1, +1\}$ is the true label.

This nudges the decision boundary toward correctly classifying the point. The perceptron convergence theorem guarantees that if the data is linearly separable, this process will find a solution.

### Interactive Demo

Watch the perceptron learn! The visualization starts with a deliberately bad decision boundary (splitting each cluster in half) so you can see the learning process.

- **Blue filled circles** = class +1
- **Red rings** = class -1
- **Yellow dashed line** = decision boundary
- **Yellow rings** = misclassified points
- **Green rings** = points just trained on

<div class="perceptron-container">
  <canvas id="perceptron-canvas" width="600" height="600"></canvas>
  <div class="controls">
    <button id="perceptron-btn-step">Step</button>
    <button id="perceptron-btn-run">Run</button>
    <button id="perceptron-btn-reset">New Data</button>
  </div>
  <div class="slider-row">
    <label for="perceptron-batch-slider">Batch size: <span id="perceptron-batch-label">1</span></label>
    <input type="range" id="perceptron-batch-slider" min="1" max="80" value="1">
  </div>
  <div class="info">
    Step: <span id="perceptron-step-num">0</span> &nbsp;|&nbsp;
    Misclassified: <span id="perceptron-errors">-</span> &nbsp;|&nbsp;
    Learning rate: <span>0.01</span>
  </div>
  <div id="perceptron-log"></div>
</div>

<script src="/assets/blog/visuallearn/js/perceptron.js"></script>

### What to Notice

1. **Single point updates (batch=1)**: The boundary wobbles as it responds to individual points
2. **Larger batches**: Smoother convergence as updates are averaged
3. **The weight deltas**: Blue points push the boundary one way, red points push it the other
4. **Convergence**: The algorithm always finds a solution for linearly separable data

---

*More visualizations coming soon: gradient descent, neural network forward/backward passes, Hopfield networks...*
