const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

// Quick check for standard variables used in addEventListener
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (line.includes('addEventListener')) {
        // Just print context to see if there's any other weird variables
    }
});
