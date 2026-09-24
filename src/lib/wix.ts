const clientId=import.meta.env.PUBLIC_WIX_CLIENT_ID;
const apiBase=import.meta.env.PUBLIC_WIX_API_BASE||'';
export const wixConfig={clientId,apiBase,enabled:Boolean(clientId&&apiBase)};
export async function wixFetch(path:string,init:RequestInit={}){if(!wixConfig.enabled)throw new Error('Wix Headless is not configured.');const res=await fetch(apiBase+path,{...init,headers:{'Content-Type':'application/json',...(init.headers||{})}});if(!res.ok)throw new Error('Wix request failed: '+res.status);return res.json()}