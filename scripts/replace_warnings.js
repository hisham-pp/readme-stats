const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../public/icons');
const files = fs.readdirSync(dir);
const oldWarning = '<path d="M12 2L2 22h20L12 2zm0 3.5l7.5 15h-15L12 5.5zm-1 8h2v4h-2v-4zm0-3h2v2h-2v-2z"/>';
const newCode = '<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>';

let count = 0;
for (const file of files) {
  if (file.endsWith('.svg')) {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(oldWarning)) {
      fs.writeFileSync(filePath, content.replace(oldWarning, newCode));
      count++;
    }
  }
}
console.log('Replaced ' + count + ' warning icons with code bracket icons.');
