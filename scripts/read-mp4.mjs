import fs from 'fs';

function getMp4Dimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  const tkhdIdx = buffer.indexOf('tkhd');
  if (tkhdIdx !== -1) {
    // In tkhd box, width and height are 32-bit fixed point numbers at offset 76 and 80 from start of tkhd version (usually version is 1 byte, flags 3 bytes)
    // version at tkhdIdx + 4
    const version = buffer.readUInt8(tkhdIdx + 4);
    let offset = tkhdIdx + 4 + (version === 1 ? 88 : 76);
    if (offset + 8 <= buffer.length) {
      const width = buffer.readUInt32BE(offset) >> 16;
      const height = buffer.readUInt32BE(offset + 4) >> 16;
      return { width, height };
    }
  }
  return null;
}

const vids = ['1K34PRO84_DMCL0D.mp4', '1K34PRO8E_DMCL0D.mp4', '1K34PRO8K_DMCL0D.mp4'];
vids.forEach(v => {
  console.log(v, getMp4Dimensions('Images/' + v));
});
