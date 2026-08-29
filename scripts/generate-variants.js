const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const dirsToProcess = ['icons', 'badges'];

dirsToProcess.forEach(dirName => {
  const targetDir = path.join(publicDir, dirName);
  
  if (!fs.existsSync(targetDir)) return;

  const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.svg'));
  
  const themes = ['default', 'dark', 'light'];
  
  themes.forEach(theme => {
    const themeDir = path.join(targetDir, theme);
    if (!fs.existsSync(themeDir)) {
      fs.mkdirSync(themeDir, { recursive: true });
    }
  });

  files.forEach(file => {
    const filePath = path.join(targetDir, file);
    
    // Read the content
    const content = fs.readFileSync(filePath, 'utf8');
    
    themes.forEach(theme => {
      const targetPath = path.join(targetDir, theme, file);
      // For now, just duplicate the files
      fs.writeFileSync(targetPath, content);
    });
    
    // Delete the original file in the root
    fs.unlinkSync(filePath);
  });
});

console.log('Variants generated successfully.');
