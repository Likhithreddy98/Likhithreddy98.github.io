import fs from 'node:fs';

function fixFile(path) {
  let content = fs.readFileSync(path, 'utf8');
  if (content.startsWith('"')) {
    content = content.trim(); // remove trailing newline first
    if (content.endsWith('"')) {
      content = content.slice(1, -1); // remove leading and trailing quote
    } else {
      content = content.slice(1); // remove leading quote only if no trailing quote found?!
    }
    content = content.replace(/\\"/g, '"');
    fs.writeFileSync(path, content);
    console.log('Fixed', path);
  }
}

fixFile('src/App.jsx');
fixFile('src/components/HeroSection.jsx');
