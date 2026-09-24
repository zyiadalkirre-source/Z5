import fs from 'node:fs';
const text=fs.readFileSync('src/data/products.ts','utf8');
const count=(text.match(/make\(/g)||[]).length;
if(count<50) throw new Error('Catalog must contain at least 50 product seeds');
if(!text.includes("affiliateStatus:'pending'")) throw new Error('Affiliate safety flag missing');
console.log(JSON.stringify({products:count,status:'ok',affiliateUrls:'pending-by-default'},null,2));