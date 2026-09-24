export type Merchant={id:string;name:string;website:string;affiliateProgram:string;network:string;status:'pending'|'verified';markets:string[];notes:string};
export const merchants:Merchant[]=[
{id:'sephora',name:'Sephora',website:'https://www.sephora.com/',affiliateProgram:'Sephora Affiliates',network:'Rakuten Advertising',status:'pending',markets:['US'],notes:'Publisher relationship must be approved before tracking links are enabled.'},
{id:'ulta',name:'Ulta Beauty',website:'https://www.ulta.com/',affiliateProgram:'Ulta Beauty Impact Program',network:'Impact',status:'pending',markets:['US'],notes:'Publisher relationship must be approved before tracking links are enabled.'},
{id:'amazon',name:'Amazon',website:'https://www.amazon.com/',affiliateProgram:'Amazon Associates',network:'Amazon Associates',status:'pending',markets:['US','Global'],notes:'Requires an approved Associates account and valid tagged links.'},
{id:'neiman-marcus',name:'Neiman Marcus',website:'https://www.neimanmarcus.com/',affiliateProgram:'Publisher program',network:'Merchant/network dependent',status:'pending',markets:['US'],notes:'Program relationship must be verified before affiliate links are enabled.'}
];