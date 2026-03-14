# Agent Notes for Visuallearn Blog Post

## Overview
This folder contains assets for the "Visualizing Why Machines Learn" blog post, which uses the **distill layout** for academic-style presentation with interactive JavaScript visualizations.

## File Structure
```
assets/blog/visuallearn/
├── agent.md          # This file - guidelines for AI agents
├── css/
│   └── perceptron.css
└── js/
    └── perceptron.js
```

## Blog Post Location
`_posts/2026-01-30-visuallearn.md`

## Style Guidelines

### JavaScript
- Wrap all JS in an IIFE to avoid polluting global scope
- Prefix all DOM element IDs with the visualization name (e.g., `perceptron-canvas`, `perceptron-btn-run`)
- This prevents conflicts when multiple visualizations are on the same page

### CSS
- Scope all styles under a container class (e.g., `.perceptron-container`)
- Use dark theme colors to match the visualization aesthetic:
  - Background: `#0f0f23`, `#1a1a2e`
  - Text: `#e0e0e0`, `#aaa`
  - Accent blue: `#4a9eff`
  - Accent red: `#ff6b6b`
  - Accent yellow: `#ffcc00`
  - Accent green: `#00ff88`

### Distill Layout Features
- Use `$...$` for inline math, `$$...$$` for display math
- Use `<d-cite key="...">` for citations (requires bibliography in frontmatter)
- Use `<d-footnote>` for footnotes
- Layout classes: `.l-body` (default), `.l-page` (wider), `.l-screen` (full width)

## Planned Visualizations
- [x] Perceptron learning
- [ ] Gradient descent
- [ ] Neural network forward/backward passes
- [ ] Hopfield networks

## Notes
- The perceptron visualization deliberately starts with a "bad" decision boundary to show learning
- Batch size slider allows comparison of SGD vs mini-batch vs full-batch updates

# Ali's Notes 
- claude should not change this section.
- lets freeze the metadata at the top of visuallearn.md for now, its good
- note that this blogpost is to accompany the book "Why Machines Learn" by Anil Ananthaswamy