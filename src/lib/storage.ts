export const keys={wishlist:'z5-wishlist',compare:'z5-compare',recent:'z5-recent',clicks:'z5-clicks'};
function read<T>(key:string,fallback:T):T{if(typeof localStorage==='undefined')return fallback;try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback)) as T}catch{return fallback}}
function write<T>(key:string,value:T){if(typeof localStorage!=='undefined')localStorage.setItem(key,JSON.stringify(value))}
export const storage={
wishlist:()=>read<string[]>(keys.wishlist,[]),
toggleWishlist:(id:string)=>{const a=read<string[]>(keys.wishlist,[]);const next=a.includes(id)?a.filter(x=>x!==id):[...a,id];write(keys.wishlist,next);return next},
compare:()=>read<string[]>(keys.compare,[]),
toggleCompare:(id:string)=>{const a=read<string[]>(keys.compare,[]);const next=a.includes(id)?a.filter(x=>x!==id):a.length<4?[...a,id]:a;write(keys.compare,next);return next},
recent:()=>read<string[]>(keys.recent,[]),
rememberRecent:(id:string)=>{const a=read<string[]>(keys.recent,[]);write(keys.recent,[id,...a.filter(x=>x!==id)].slice(0,12))},
clicks:()=>read<Record<string,unknown>[]>(keys.clicks,[]),
clear:(key:keyof typeof keys)=>{if(typeof localStorage!=='undefined')localStorage.removeItem(keys[key])}
};