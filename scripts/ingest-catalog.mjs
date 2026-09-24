import fs from 'node:fs/promises';
const feedUrl=process.env.Z5_CATALOG_FEED_URL;
if(!feedUrl){console.log('Z5_CATALOG_FEED_URL not set; ingestion skipped safely.');process.exit(0);}
const res=await fetch(feedUrl,{headers:process.env.Z5_CATALOG_FEED_TOKEN?{Authorization:'Bearer '+process.env.Z5_CATALOG_FEED_TOKEN}:{}});if(!res.ok)throw new Error('Feed request failed: '+res.status);
const raw=await res.json();if(!Array.isArray(raw))throw new Error('Feed must return a JSON array');
const normalize=(r)=>({id:(r.id||[r.brand,r.name].filter(Boolean).join('-')).toLowerCase().replace(/[^a-z0-9]+/g,'-'),name:r.name,brand:r.brand,category:r.category||'Personal Care',audience:r.audience||'Unisex',price:Number.isFinite(Number(r.price))?Number(r.price):null,currency:r.currency||'USD',rating:Number.isFinite(Number(r.rating))?Number(r.rating):null,reviews:Number(r.reviews||0),size:r.size||'See merchant',description:r.description||'',image:r.image||'',gallery:Array.isArray(r.gallery)?r.gallery:[r.image].filter(Boolean),officialUrl:r.officialUrl||'',merchant:r.merchant,merchantUrl:r.merchantUrl,availability:r.availability==='Available'?'Available':'Check merchant',verifiedPrice:Boolean(r.verifiedPrice),affiliateStatus:r.affiliateStatus==='verified'?'verified':'pending',affiliateUrl:r.affiliateStatus==='verified'&&r.affiliateUrl?r.affiliateUrl:null,features:Array.isArray(r.features)?r.features:[],offers:Array.isArray(r.offers)?r.offers:[],ratingSource:r.ratingSource||null,ratingDate:r.ratingDate||null,updatedAt:r.updatedAt||new Date().toISOString(),markets:Array.isArray(r.markets)?r.markets:['US'],ingredients:r.ingredients||undefined});
const map=new Map();for(const row of raw){const n=normalize(row);if(n.name&&n.brand&&n.merchant&&n.merchantUrl)map.set(n.id,n);}
const output=`import type {Product} from './products';
export const liveProducts:Product[]=${JSON.stringify([...map.values()],null,2)};
`;
await fs.writeFile('src/data/live-products.ts',output);
await fs.mkdir('.z5-cache',{recursive:true});await fs.writeFile('.z5-cache/catalog-feed.json',JSON.stringify({fetchedAt:new Date().toISOString(),rows:[...map.values()]},null,2));
console.log('Generated live catalog with',map.size,'validated unique rows.');