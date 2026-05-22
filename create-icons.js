// Pure Node.js PNG generator — no external deps
import { createDeflate } from 'zlib';
import { writeFileSync, mkdirSync } from 'fs';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { Writable, Readable } from 'stream';

const pipe = promisify(pipeline);

function crc32(buf) {
  let crc = 0xffffffff;
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c;
  }
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const body = Buffer.concat([typeBytes, data]);
  const crcBuf = Buffer.alloc(4); crcBuf.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crcBuf]);
}

async function makePNG(size) {
  // Solid #0a0a0a background + simple orange bishop shape using solid-color pixels
  const pixels = [];
  const cx = size / 2, cy = size / 2;

  for (let y = 0; y < size; y++) {
    pixels.push(0); // filter type: None
    for (let x = 0; x < size; x++) {
      const dx = x - cx, dy = y - cy;
      const s = size / 192;

      // Head circle
      const headDist = Math.sqrt(dx * dx + (dy + 55 * s) * (dy + 55 * s));
      const isHead = headDist < 18 * s;

      // Neck dot (cutout)
      const neckDist = Math.sqrt(dx * dx + (dy + 30 * s) * (dy + 30 * s));
      const isNeck = neckDist < 5 * s;

      // Body trapezoid using quadratic approximation
      const bodyY = dy - (-35 * s); // relative to body top
      const progress = bodyY / (75 * s); // 0 at top, 1 at bottom
      const halfW = progress > 0 && progress < 1 ? (30 + 5 * progress) * s : 0;
      const isBody = progress > 0 && progress < 1 && Math.abs(dx) < halfW;

      // Base rectangle
      const isBase = Math.abs(dx) < 40 * s && dy > 40 * s && dy < 56 * s;

      const isOrange = (isHead || isBody || isBase) && !isNeck;

      if (isOrange) {
        pixels.push(0xF0, 0x7B, 0x00);
      } else {
        pixels.push(0x0a, 0x0a, 0x0a);
      }
    }
  }

  const rawData = Buffer.from(pixels);

  // Compress with zlib
  const compressed = await new Promise((resolve, reject) => {
    const chunks = [];
    const deflate = createDeflate({ level: 6 });
    deflate.on('data', c => chunks.push(c));
    deflate.on('end', () => resolve(Buffer.concat(chunks)));
    deflate.on('error', reject);
    deflate.end(rawData);
  });

  const sig = Buffer.from([137,80,78,71,13,10,26,10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 2;  // RGB
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

mkdirSync('./public/icons', { recursive: true });

const [png192, png512] = await Promise.all([makePNG(192), makePNG(512)]);
writeFileSync('./public/icons/icon-192.png', png192);
writeFileSync('./public/icons/icon-512.png', png512);
writeFileSync('./public/apple-touch-icon.png', png192);

// Minimal 16x16 favicon
const favicon16 = await makePNG(16);
writeFileSync('./public/favicon.ico', favicon16); // PNG works as favicon in modern browsers

console.log('Icons created: icon-192.png, icon-512.png, apple-touch-icon.png, favicon.ico');
