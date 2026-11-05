import { getMemory } from '../data/memories';
import { getTrack } from '../data/tracks';
import type { CapsuleState } from '../types/capsule';

const WIDTH = 1200;
const HEIGHT = 760;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load image: ${src}`));
    image.src = src;
  });
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, width: number, height: number, radius: number,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
}

function wrap(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split(/\r?\n/)) {
    let current = '';
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const proposed = current ? `${current} ${word}` : word;
      if (current && ctx.measureText(proposed).width > maxWidth) {
        lines.push(current);
        current = word;
      } else {
        current = proposed;
      }
    }
    lines.push(current);
  }
  return lines;
}

function drawWrapped(
  ctx: CanvasRenderingContext2D,
  value: string,
  x: number, y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const lines = wrap(ctx, value, maxWidth);
  lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
  return lines.length;
}

function drawFloppy(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.translate(x, y);
  const scale = size / 70;
  ctx.scale(scale, scale);
  ctx.fillStyle = '#252d68';
  ctx.fillRect(0, 0, 70, 70);
  ctx.fillStyle = '#8c92b8';
  ctx.fillRect(12, 0, 44, 25);
  ctx.fillStyle = '#353653';
  ctx.fillRect(41, 3, 11, 19);
  ctx.fillStyle = '#f3e4ca';
  ctx.fillRect(10, 37, 50, 31);
  ctx.fillStyle = '#3e5689';
  ctx.fillRect(15, 46, 40, 3);
  ctx.fillStyle = '#e87d5a';
  ctx.fillRect(15, 52, 40, 3);
  ctx.fillStyle = '#e6b64d';
  ctx.fillRect(15, 58, 40, 3);
  ctx.strokeStyle = '#151b46';
  ctx.lineWidth = 3;
  ctx.strokeRect(1.5, 1.5, 67, 67);
  ctx.restore();
}

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = '#3466ad';
  ctx.lineWidth = 3;
  ctx.font = '38px Arial';
  ctx.strokeText('☆', 0, 0);
  ctx.restore();
}

function drawNote(
  ctx: CanvasRenderingContext2D,
  label: string,
  value: string,
  y: number,
  maxWidth: number,
): number {
  const x = 465;
  ctx.font = 'bold 25px Arial, sans-serif';
  ctx.fillStyle = '#1c2946';
  ctx.fillText(label, x, y);
  const valueX = x + ctx.measureText(label).width + 12;
  ctx.font = '23px Arial, sans-serif';
  const remaining = maxWidth - (valueX - x);
  const firstLine = wrap(ctx, value, Math.max(remaining, 100));
  const needsWrap = firstLine.length > 1;
  const lineCount = needsWrap ? drawWrapped(ctx, value, x, y + 31, maxWidth, 30) : 1;
  if (!needsWrap) ctx.fillText(value, valueX, y);
  const bottom = y + (needsWrap ? 36 + lineCount * 30 : 22);
  ctx.strokeStyle = '#968f86';
  ctx.lineWidth = 2;
  ctx.setLineDash([3, 5]);
  ctx.beginPath();
  ctx.moveTo(x, bottom + 8);
  ctx.lineTo(x + maxWidth, bottom + 8);
  ctx.stroke();
  ctx.setLineDash([]);
  return bottom + 35;
}

/**
 * Export a standalone paper keepsake rather than screenshotting the browser UI.
 * All photos and textures are loaded from this site's own static assets.
 */
export async function downloadTimeCapsule(capsule: CapsuleState): Promise<void> {
  const memory = getMemory(capsule.memoryId);
  const track = getTrack(capsule.trackId);
  if (!capsule.sealed || !memory || !track || !capsule.prediction) {
    throw new Error('Complete and seal your capsule before saving it.');
  }

  const [paper, photo] = await Promise.all([
    loadImage('/images/1996/scrapbook.png'),
    loadImage(memory.image),
  ]);
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Your browser cannot create the time capsule image.');

  ctx.fillStyle = '#f3e5c7';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.drawImage(paper, 0, 0, WIDTH, HEIGHT);
  // Translucent parchment keeps user-selected text readable on textured paper.
  ctx.fillStyle = 'rgba(252,239,209,0.45)';
  ctx.fillRect(32, 28, WIDTH - 64, HEIGHT - 56);

  // Corner stickers and blue doodles echo the approved 1996 scrapbook design.
  const rainbow = ['#e96262', '#f3b34a', '#9bc06b', '#74b7cd', '#8884cb'];
  ctx.save();
  ctx.translate(1113, 13);
  ctx.rotate(Math.PI / 5);
  rainbow.forEach((colour, index) => {
    ctx.fillStyle = colour;
    ctx.fillRect(index * 13, -23, 13, 120);
  });
  ctx.restore();
  drawStar(ctx, 65, 93);
  drawStar(ctx, 100, 53);
  drawStar(ctx, 1110, 705);
  drawFloppy(ctx, 160, 65, 71);

  ctx.fillStyle = '#1e2d50';
  ctx.textAlign = 'left';
  ctx.font = 'bold 54px "Courier New", monospace';
  ctx.fillText('SAVE COMPLETE.', 265, 106);
  ctx.font = '24px Arial, sans-serif';
  ctx.fillText('Your 1996 time capsule has been sealed!', 267, 146);

  // A tilted physical instant print with a generous handwritten-style footer.
  ctx.save();
  ctx.translate(232, 408);
  ctx.rotate(-0.10);
  ctx.shadowColor = 'rgba(60,48,38,0.4)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetX = 6;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = '#fffaf0';
  ctx.fillRect(-172, -198, 344, 431);
  ctx.shadowColor = 'transparent';
  ctx.save();
  ctx.beginPath();
  ctx.rect(-153, -179, 306, 305);
  ctx.clip();
  const aspect = photo.naturalWidth / photo.naturalHeight;
  const renderWidth = aspect > 1 ? 306 * aspect : 306;
  const renderHeight = aspect > 1 ? 305 : 305 / aspect;
  ctx.drawImage(photo, -renderWidth / 2, -179 + (305 - renderHeight) / 2, renderWidth, renderHeight);
  ctx.restore();
  ctx.fillStyle = '#25242a';
  ctx.textAlign = 'center';
  ctx.font = 'italic 27px "Comic Sans MS", cursive';
  ctx.fillText('My 1996', 0, 172);
  ctx.fillText('Memory ♡', 0, 202);
  ctx.restore();

  ctx.textAlign = 'left';
  let y = 260;
  y = drawNote(ctx, 'Memory:', memory.title, y, 660);
  y = drawNote(ctx, 'Prediction:', capsule.prediction, y, 660);
  y = drawNote(ctx, 'Soundtrack:', track.title, y, 660);

  const highlightY = Math.max(555, Math.min(y + 5, 615));
  roundedRect(ctx, 450, highlightY, 670, 73, 5);
  ctx.fillStyle = '#f5e582';
  ctx.fill();
  ctx.fillStyle = '#1a223a';
  ctx.textAlign = 'center';
  ctx.font = '21px Arial, sans-serif';
  ctx.fillText('Your memories have been safely stored', 785, highlightY + 28);
  ctx.fillText('on a floppy disk.', 785, highlightY + 55);
  ctx.font = '21px "Courier New", monospace';
  ctx.fillText('Please do not lose it for 30 years.', 785, highlightY + 112);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((value) =>
      value ? resolve(value) : reject(new Error('Could not encode the PNG file.')), 'image/png');
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'my-1996-time-capsule.png';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
