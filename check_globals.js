const fs = require('fs');
const code = fs.readFileSync('app.js', 'utf8');

// A simple regex to find potential undeclared variables (very naive, just for catching obvious ones like selectedAiLabel)
const identifiers = [...code.matchAll(/\b([a-zA-Z_]\w*)\b/g)].map(m => m[1]);
const uniqueIdentifiers = [...new Set(identifiers)];

console.log("Checking unique identifiers...");
// It's hard to accurately parse without AST. Let's look for assignments to globals.
const assignments = [...code.matchAll(/^([a-zA-Z_]\w*)\s*=[^=]/gm)].map(m => m[1]);
console.log("Assignments to globals without let/const/var:", [...new Set(assignments)].filter(a => !code.includes(`const ${a}`) && !code.includes(`let ${a}`) && !code.includes(`var ${a}`) && !code.includes(`function ${a}`)));
