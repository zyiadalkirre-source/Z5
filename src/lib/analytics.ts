export type ClickEvent={product:string;merchant:string;url:string;timestamp:string;source:string;context?:string;campaign?:string};
const key='z5-clicks';
export function recordClick(event:ClickEvent){if(typeof localStorage==='undefined')return;const rows:ClickEvent[]=JSON.parse(localStorage.getItem(key)||'[]');rows.push(event);localStorage.setItem(key,JSON.stringify(rows.slice(-5000)))}
export function readClicks():ClickEvent[]{if(typeof localStorage==='undefined')return [];return JSON.parse(localStorage.getItem(key)||'[]')}