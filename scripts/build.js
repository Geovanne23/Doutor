const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

if (fs.existsSync(dist)) {
    fs.rmSync(dist, { recursive: true, force: true });
}

fs.mkdirSync(dist, { recursive: true });

// Copy HTML pages
fs.copyFileSync(path.join(root, 'index.html'), path.join(dist, 'index.html'));
if (fs.existsSync(path.join(root, 'politica-de-privacidade.html'))) {
    fs.copyFileSync(path.join(root, 'politica-de-privacidade.html'), path.join(dist, 'politica-de-privacidade.html'));
}
if (fs.existsSync(path.join(root, 'termos-de-uso.html'))) {
    fs.copyFileSync(path.join(root, 'termos-de-uso.html'), path.join(dist, 'termos-de-uso.html'));
}

// Copy src directory
if (fs.existsSync(path.join(root, 'src'))) {
    fs.cpSync(path.join(root, 'src'), path.join(dist, 'src'), { recursive: true });
}

// Copy public directory
if (fs.existsSync(path.join(root, 'public'))) {
    fs.cpSync(path.join(root, 'public'), path.join(dist, 'public'), { recursive: true });
}

console.log('Build completed successfully! Assets output to dist/');
