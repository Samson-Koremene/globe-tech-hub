const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public');
const files = ['avatar1.jpg', 'avatar2.jpg', 'avatar3.jpg', 'avatar4.jpg'];

async function optimize() {
  for (const file of files) {
    const inputPath = path.join(dir, file);
    const tempPath = path.join(dir, 'temp_' + file);
    
    if (fs.existsSync(inputPath)) {
      const stats = fs.statSync(inputPath);
      console.log(`Processing ${file} (Original size: ${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);
      
      try {
        await sharp(inputPath)
          .resize(400, 400, { fit: 'cover' }) // Large enough for retina displays but way smaller than original
          .jpeg({ quality: 80, progressive: true })
          .toFile(tempPath);
          
        fs.unlinkSync(inputPath);
        fs.renameSync(tempPath, inputPath);
        
        const newStats = fs.statSync(inputPath);
        console.log(`Optimized ${file} -> ${(newStats.size / 1024).toFixed(2)} KB`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
      }
    } else {
      console.log(`File not found: ${file}`);
    }
  }
}

optimize();
