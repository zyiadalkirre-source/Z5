import fs from 'node:fs/promises';
const feedUrl=process.env.Z5_CATALOG_FEED_URL;
if(!feedUrl){console.log('Z5_CATALOG_FEED_URL not set; ingestion skipped safely.');process.exit(0);}
const res=await fetch(feedUrl,{headers:process.env.Z5_CATALOG_FEED_TOKEN?{Authorization:'Bearer '+process.env.Z5_CATALOG_FEED_TOKEN}:{}});if(!res.ok)throw new Error('Feed request failed: '+res.status);
const rows=await res.json();if(!Array.isArray(rows))throw new Error('Feed must return a JSON array');
await fs.mkdir('.z5-cache',{recursive:true});await fs.writeFile('.z5-cache/catalog-feed.json',JSON.stringify({fetchedAt:new Date().toISOString(),rows},null,2));
console.log('Fetched',rows.length,'feed rows. Normalization/dedupe should run in the publisher backend before writing product records.');