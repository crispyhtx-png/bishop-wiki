// Run with: node generate-icons.js
// Requires: npm install canvas (or use the browser approach below)
// Alternative: open generate-icons.html in a browser and save the PNGs

import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync } from 'fs';

function drawBishopIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, size, size);

  // Scale factor
  const s = size / 192;

  ctx.fillStyle = '#F07B00';
  ctx.strokeStyle = '#F07B00';
  ctx.lineWidth = 2 * s;

  // Bishop chess piece shape (simplified silhouette)
  const cx = size / 2;
  const cy = size / 2;

  // Head (circle)
  ctx.beginPath();
  ctx.arc(cx, cy - 55 * s, 18 * s, 0, Math.PI * 2);
  ctx.fill();

  // Neck dot
  ctx.beginPath();
  ctx.arc(cx, cy - 30 * s, 5 * s, 0, Math.PI * 2);
  ctx.fillStyle = '#0a0a0a';
  ctx.fill();
  ctx.fillStyle = '#F07B00';

  // Body
  ctx.beginPath();
  ctx.moveTo(cx - 30 * s, cy + 40 * s);
  ctx.quadraticCurveTo(cx - 35 * s, cy - 10 * s, cx, cy - 35 * s);
  ctx.quadraticCurveTo(cx + 35 * s, cy - 10 * s, cx + 30 * s, cy + 40 * s);
  ctx.closePath();
  ctx.fill();

  // Base
  ctx.beginPath();
  ctx.roundRect(cx - 40 * s, cy + 40 * s, 80 * s, 16 * s, 6 * s);
  ctx.fill();

  return canvas;
}

try {
  mkdirSync('./public/icons', { recursive: true });
  const c192 = drawBishopIcon(192);
  writeFileSync('./public/icons/icon-192.png', c192.toBuffer('image/png'));
  const c512 = drawBishopIcon(512);
  writeFileSync('./public/icons/icon-512.png', c512.toBuffer('image/png'));
  writeFileSync('./public/apple-touch-icon.png', c192.toBuffer('image/png'));
  console.log('Icons generated successfully.');
} catch (e) {
  console.log('canvas module not installed. Use generate-icons.html instead.');
  console.log('Run: npm install canvas  (requires native build tools)');
}
