"use client";

// Browser-side image compression using jSquash (Squoosh's official wasm codecs).
// Decodes any browser-supported image, re-encodes to WebP, and shrinks quality
// + dimensions until the result is safely under the byte budget. Runs entirely
// on the client so large phone photos never hit the network at full size.

export type CompressOptions = {
  /** Hard ceiling for the output file. Default 5 MB. */
  maxBytes?: number;
  /** Longest-edge cap in pixels before the first encode. Default 2400. */
  maxDimension?: number;
  /** Starting WebP quality (0-100). Default 82. */
  quality?: number;
};

const MB = 1024 * 1024;

export class UnsupportedImageError extends Error {
  constructor() {
    super("UNSUPPORTED_FORMAT");
    this.name = "UnsupportedImageError";
  }
}

export async function compressToWebp(
  file: File,
  opts: CompressOptions = {},
): Promise<File> {
  const maxBytes = opts.maxBytes ?? 2.5 * MB;
  // Aim a bit under the ceiling so we never land exactly on the limit.
  const target = Math.floor(maxBytes * 0.92);
  const startDim = opts.maxDimension ?? 2400;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    // HEIC on non-Safari, corrupt files, unknown formats.
    throw new UnsupportedImageError();
  }

  const { encode } = await import("@jsquash/webp");

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new UnsupportedImageError();

  const longest = Math.max(bitmap.width, bitmap.height);
  let dimCap = Math.min(longest, startDim);
  let quality = opts.quality ?? 82;
  let out: ArrayBuffer | null = null;

  // Up to 8 passes: lower quality first, then downscale, until under target.
  for (let attempt = 0; attempt < 8; attempt++) {
    const scale = dimCap / longest;
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(bitmap, 0, 0, w, h);
    const imageData = ctx.getImageData(0, 0, w, h);

    out = await encode(imageData, { quality });
    if (out.byteLength <= target) break;

    if (quality > 45) {
      quality -= 12;
    } else {
      dimCap = Math.round(dimCap * 0.82);
    }
  }

  bitmap.close?.();

  if (!out) throw new UnsupportedImageError();

  const base = file.name.replace(/\.[^.]+$/, "").trim() || "image";
  return new File([out], `${base}.webp`, { type: "image/webp" });
}
