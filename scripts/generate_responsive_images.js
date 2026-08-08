const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, '..', 'public', 'assets', 'images');

async function generateResponsiveImages() {
    if (!fs.existsSync(imgDir)) {
        console.error('Directory does not exist:', imgDir);
        return;
    }

    const files = fs.readdirSync(imgDir).filter(f => f.endsWith('.webp') && !f.includes('-sm.webp'));

    console.log(`Generating mobile responsive variants for ${files.length} WebP images...`);

    for (const file of files) {
        const inputPath = path.join(imgDir, file);
        const nameWithoutExt = path.basename(file, '.webp');
        const outputPath = path.join(imgDir, `${nameWithoutExt}-sm.webp`);

        try {
            await sharp(inputPath)
                .resize({ width: 480, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(outputPath);
            console.log(`Created: ${nameWithoutExt}-sm.webp`);
        } catch (err) {
            console.error(`Error processing ${file}:`, err.message);
        }
    }

    console.log('Responsive images generated successfully!');
}

generateResponsiveImages();
