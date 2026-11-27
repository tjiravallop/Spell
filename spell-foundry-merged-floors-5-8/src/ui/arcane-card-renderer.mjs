// Extracted verbatim from approved E7 R6 Lab; only the export statement is added.
const CARD_ICON_PATHS = {
  axe: 'M6 1h7v2h2v5h-2v2H9V8H7l-5 7H0v-2l6-7z',
  timestop: 'M5 1h6l4 4v6l-4 4H5l-4-4V5zm1 2L3 6v4l3 3h4l3-3V6l-3-3zm1 1h2v4h3v2H7z',
  ascension: 'M7 0h2v3h3v3h3v2h-3v3H9v4H7v-4H4V8H1V6h3V3h3zm1 4L5 7l3 3 3-3z',
  light: 'M12 1h3v4h-2v2h-2v2H9v2H6v2H4v2H1v-2h2v-2h2V8h2V5h2V3h3z M6 11h3v2H6z',
  delay: 'M3 1h10v2h-1v3l-3 2 3 2v3h1v2H3v-2h1v-3l3-2-3-2V3H3zm3 2v2l2 2 2-2V3zm2 7-2 2v1h4v-1z',
  shot: 'M5 2h6v2h2v2h2v4h-2v2h-2v2H5v-2H3v-2H1V6h2V4h2z',
  chakram: 'M6 0h4v2h2v1l3-1v4h-1v4h1v4l-3-1v1h-2v2H6v-2H4v-1l-3 1v-4h1V6H1V2l3 1V2h2zm0 5v6h4V5z',
  beam: 'M1 7h14v2H1z',
  wave: 'M1 5h4V3h4v2h6v2H8V5H6v2H1zm0 6h4V9h4v2h6v2H8v-2H6v2H1z',
  storm: 'M5 1h9v2H6v2H3v3h9V6H7V4h6v1h2v4h-2v1H3V9H1V5h2V3h2zm-2 11h10v2H7v1H3z',
  vayu: 'M3 3h8V1h3v2h1v2h-4v1H3zm-2 5h8V6h3v2h1v2h-4v1H1zm3 5h6v2H4z',
  devastation: 'M7 0h2v4l4-3 2 2-3 4h4v2h-4l3 4-2 2-4-3v4H7v-4l-4 3-2-2 3-4H0V7h4L1 3l2-2 4 3zm0 6v4h2V6z',
  blackhole: 'M5 2h8v2H6L3 7v3l3 3h4l3-3V7h-3V5h4l2 2v4l-4 4H5l-4-4V6zm1 4h4v2h2v3H6l-2-2V8z',
  death: 'M4 1h8l3 3v6h-3v4H4v-4H1V4zm0 4v3h3V5zm5 0v3h3V5zm-3 6v2h1v-2zm3 0v2h1v-2z',
  meteor: 'M12 0h3l-4 6 3 3v4l-3 3H6l-3-3V9l3-3 4-6zm-6 1h2L4 6H2z',
  veil: 'M6 1h4v2h3v2h2v8H1V5h2V3h3zm0 4v2H4v4h8V7h-2V5z',
  pair: 'M3 2h4v12H3zm6 0h4v12H9z',
  barrage: 'M1 2h2v12H1zm3 0h2v12H4zm3 0h2v12H7zm3 0h2v12h-2zm3 0h2v12h-2z',
  blast: 'M7 0h2v4l3-3 2 2-3 3h5v3h-5l3 3-2 2-3-3v5H7v-5l-3 3-2-2 3-3H0V6h5L2 3l2-2 3 3z',
  fire: 'M8 1h2v4h2v2h2v5h-2v2H4v-2H2V8h2V5h2v4h2V6H7V3h1zm0 8H6v3h4v-2H8z',
  ice: 'M7 0h2v4l3-3 2 2-3 3h5v2h-5l3 3-2 2-3-3v5H7v-5l-3 3-2-2 3-3H0V6h5L2 3l2-2 3 3z',
  lightning: 'M8 0h6l-5 6h4L4 16l2-7H2z',
  earth: 'M5 2h6l3 4v4l-3 4H5L2 10V6zm1 3v6h4V5z',
  water: 'M7 1h2v3h2v3h2v4l-2 3H5l-2-3V7h2V4h2zm0 6v4h2V7z',
  wind: 'M2 4h9V2h3v3H2zm-1 4h11V6h3v3H1zm3 4h8v2H4z',
  pathaphi: 'M6 1h4l4 4v6l-4 4H6L2 11V5zm0 3v2H4v4h2v2h4v-2h2V6h-2V4z',
  wari: 'M2 3h4v2h4V3h4v3h-2v2H9V6H7v2H4V6H2zm0 6h4v2h4V9h4v3l-3 3H5l-3-3z',
  magma: 'M1 8h3V6h2V3h3v3h2v2h4v5h-2v2H3v-2H1zm3 2v2h3v-2zm5 1v2h3v-2z',
  mudmire: 'M2 7h12v2H2zm-1 3h14v2H1zm2 3h10v2H3zm1-8h2v2H4zm5-2h2v2H9z',
  dust: 'M3 3h4v2H3zm6 0h4v2H9zM1 7h8v2H1zm10 0h4v2h-4zM4 11h7v2H4z',
  permafrost: 'M5 1h6l4 4v6l-4 4H5L1 11V5zm1 3v2H4v4h2v2h4v-2h2V6h-2V4z',
  magnet: 'M3 2h3v6h4V2h3v7l-3 4H6L3 9zm0 2H2V2h1zm10 0h1V2h-1z',
  mist: 'M3 3h12v2H3zM1 7h12v2H1zm4 4h10v2H5z',
  hail: 'M5 1h6l4 5v4l-4 5H5l-4-5V6zm0 5v4h2V6zm4 2v4h2V8z',
  monsoon: 'M2 3h5v2H2zm7 0h5v2H9zm-8 4h14v2H1zm2 4h10v2H3zm4 3h3v1H7z',
  shockstream: 'M6 1h4v3h2v3l-3 3 2 1-5 5 1-4H5V5h1z',
  thunderstorm: 'M5 2h6v2h3v2h1v3h-5l-4 6 1-5H2V5h3z',
  heatwave: 'M3 2h2v3H3zm4-1h2v4H7zm4 1h2v3h-2zm-8 6h2v3H3zm4-1h2v4H7zm4 1h2v3h-2zm-6 6h6v2H5z',
  chillgale: 'M2 3h8v2H2zm-1 4h11v2H1zm4 4h9v2H5zm-2 3h5v2H3z',
  plasma: 'M7 0h2v3h3v2h4v2h-4v2h-3v3H7v-3H4V7H0V5h4V3h3zm-2 5h6v2H5z',
  scald: 'M7 1h2v3h3v2h2v5h-2v2H4v-2H2V6h2V4h3zm-2 5h6v4H5z',
  frostvolt: 'M7 0h2v4h4L8 10h3l-5 6 1-5H3l4-5V0z',
  shield: 'M7 1h2v1h3v1h3v7h-2v2h-2v2H9v1H7v-1H5v-2H3v-2H1V3h3V2h3zm0 3H4v5h2v2h1zm2 0v7h1V9h2V4z',
  heal: 'M6 1h4v5h5v4h-5v5H6v-5H1V6h5z',
  self: 'M6 1h4v4H6zm-2 6h8v2h2v5H2V9h2zm2 2v3h4V9z',
  burn: 'M7 0h2v3h2v2h2v4h-1v3h-2v2H4v-2H2V9h2V6h2V3h1zm0 8H5v4h4V9H7z',
  freeze: 'M7 0h2v3h2v2H9v2h2V5h2v2h3v2h-3v2h-2V9H9v2h2v2H9v3H7v-3H5v-2h2V9H5v2H3V9H0V7h3V5h2v2h2V5H5V3h2z',
  push: 'M1 4h2v8H1zm4 3h5V4l5 4-5 4V9H5z',
  pull: 'M13 4h2v8h-2zm-2 3H6V4L1 8l5 4V9h5z',
  pierce: 'M1 7h8V4l6 4-6 4V9H1zm11-5h2v12h-2z',
  large: 'M4 1h8v3h3v8h-3v3H4v-3H1V4h3zm2 4v6h4V5z',
  grand: 'M7 0h2v4h3v2h4v4h-4v2H9v4H7v-4H4v-2H0V6h4V4h3zm-1 6v4h4V6z',
  heart: 'M2 3h4v2h4V3h4v2h2v5h-2v2h-2v2h-2v2H6v-2H4v-2H2v-2H0V5h2z',
  mana: 'M7 0h2v2h2v2h2v2h2v4h-2v2h-2v2H9v2H7v-2H5v-2H3v-2H1V6h2V4h2V2h2z',
  book: 'M1 2h5v1h4V2h5v12h-5v1H6v-1H1zm2 2v8h3v1h1V5H6V4zm6 1v8h1v-1h3V4h-3v1z',
  bag: 'M5 1h6v4h2v2h2v6h-2v2H3v-2H1V7h2V5h2zm2 2v2h2V3zm-2 5v2h6V8z',
  coin: 'M5 1h6v2h2v2h2v6h-2v2h-2v2H5v-2H3v-2H1V5h2V3h2zm0 4v6h2v2h2v-2h2V5H9V3H7v2z',
  forge: 'M2 2h9v2h4v2h-2v2H9v3h3v3H3v-3h3V8H4V6H2z',
  map: 'M1 3h4l3 2 3-2h4v10h-4l-3 2-3-2H1zm2 2v6h2V5zm4 1v6l1 1 1-1V6L8 7zm4-1v6h2V5z',
  log: 'M2 1h9l3 3v11H2zm2 2v10h8V5H9V3zm1 4h6v1H5zm0 3h6v1H5z',
  sword: 'M12 1h3v3L8 11l-2-2zm-8 7 5 5-1 1-2-2-3 3-2-2 3-3-1-1z',
  pause: 'M3 2h3v12H3zm7 0h3v12h-3z',
  close: 'M2 1l6 6 6-6 1 1-6 6 6 6-1 1-6-6-6 6-1-1 6-6-6-6z',
  arrow: 'M1 7h10L7 3l2-2 7 7-7 7-2-2 4-4H1z',
  sound: 'M1 6h3l4-4h2v12H8l-4-4H1zm11-3h2v2h1v6h-1v2h-2v-2h1V5h-1z',
  seal: 'M3 2h10v2h-2v8h2v2H3v-2h2V4H3zm4 2v8h2V4z',
  dispel: 'M7 1h2v5h5v2H9v5H7V8H2V6h5zm-5 1h2v2H2zm10 8h2v2h-2z',
  brace: 'M2 2h12v8h-2v2h-2v2H6v-2H4v-2H2zm3 3v4h2v2h2V9h2V5z',
  spear: 'M11 1h4v4h-2v1h-1v1h-1v1h-1v1H9v1H8v1H7v1H6v1H5v1H3v1H1v-2h1v-2h1v-1h1V9h1V8h1V7h1V6h1V5h1V4h1V3h1z',
  empower: 'M7 1h2v2h2v2h2v2h-3v7H6V7H3V5h2V3h2zm0 8v3h2V9z',
  bless: 'M7 0h2v3h1v1h2V3h1v3h3v2h-3v1h-1v2h1v1h-3v4H7v-4H4v-1h1V9H4V8H1V6h3V3h1v1h2V3h0zm0 6v3h2V6z',
  fill: 'M5 1h6v2H9v2h3v2h2v6h-2v2H4v-2H2V7h2V5h3V3H5zm-1 7v5h8V8z',
  blood: 'M7 1h2v3h2v3h2v4l-2 3H5l-2-3V7h2V4h2zm-1 8v2h2V9z',
  summon: 'M8 0l2 5h5l-4 3 2 6-5-3-5 3 2-6-4-3h5z',
};

/* Spell Foundry E7 R5. All card visuals are Canvas 2D geometry, existing indexed grids and code paths. */
const ARCANE_RARITIES={
 common:{metal:['#252832','#555c69','#909ba3','#d7dce0'],bg:['#191a25','#30333c'],rank:0},
 rare:{metal:['#15283e','#315e8d','#75b7ed','#d4f4ff'],bg:['#111a32','#203b55'],rank:1},
 special:{metal:['#2d1949','#71439c','#c18bf0','#f4dbff'],bg:['#1c112d','#3c2254'],rank:2},
 epic:{metal:['#49231e','#a0522c','#f3a05b','#ffe0a2'],bg:['#28151f','#54291f'],rank:3},
 legendary:{metal:['#4a2818','#a7732c','#f3cf62','#fff3bc'],bg:['#291a1c','#58401f'],rank:4}
};
function createArcaneCardRenderer({words,creatures,getArt,drawArt,accent,paths,prepareIdle}){
 const cache=new Map(), icons=new Map(), animatedIcons=new Map(); const creatureSet=new Set(creatures);
 const canvas=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
 const rect=(g,c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
 const poly=(g,c,p)=>{g.fillStyle=c;g.beginPath();p.forEach(([x,y],i)=>i?g.lineTo(Math.round(x),Math.round(y)):g.moveTo(Math.round(x),Math.round(y)));g.closePath();g.fill()};
 const line=(g,c,x1,y1,x2,y2,w=1)=>{let dx=x2-x1,dy=y2-y1,n=Math.max(Math.abs(dx),Math.abs(dy),1);for(let i=0;i<=n;i++)rect(g,c,x1+dx*i/n,y1+dy*i/n,w,w)};
 const diamond=(g,c,x,y,r)=>poly(g,c,[[x,y-r],[x+r,y],[x,y+r],[x-r,y]]);
 const star=(g,c,x,y,r=3)=>{rect(g,c,x-r,y,2*r+1,1);rect(g,c,x,y-r,1,2*r+1);rect(g,'#fff6d6',x,y,1,1)};
 const ring=(g,c,x,y,rx,ry,segments=40)=>{for(let i=0;i<segments;i++){let t=i*Math.PI*2/segments;rect(g,c,x+Math.cos(t)*rx,y+Math.sin(t)*ry,1,1)}};
 const disk=(g,c,x,y,r)=>{for(let j=-r;j<=r;j++){let d=Math.floor(Math.sqrt(r*r-j*j));rect(g,c,x-d,y+j,2*d+1,1)}};
 const mix=(a,b,t)=>{let v=[1,3,5].map(i=>Math.round(parseInt(a.slice(i,i+2),16)*(1-t)+parseInt(b.slice(i,i+2),16)*t));return '#'+v.map(x=>x.toString(16).padStart(2,'0')).join('')};
 function iconArt(id){if(icons.has(id))return icons.get(id);const c=canvas(40,40),g=c.getContext('2d');g.imageSmoothingEnabled=false;let a=accent(id)||'#e5cb92',dark=mix(a,'#120c20',.68),mid=mix(a,'#181022',.34),hi=mix(a,'#fff5db',.55);const p=(col,pts)=>poly(g,col,pts),r=(col,x,y,w,h)=>rect(g,col,x,y,w,h);
 if(creatureSet.has(id)){const art=getArt(id);const k=Math.min(36/art.width,34/art.height);drawArt(g,art,Math.floor((40-art.width*k)/2),Math.floor((40-art.height*k)/2),k,null,false);}
 else if(['fire','akki','burn'].includes(id)){const deep=id==='akki'?'#711932':'#8e2619',red=id==='akki'?'#ed3659':'#f45724';p('#231019',[[6,33],[3,25],[7,16],[11,20],[13,10],[18,14],[18,3],[24,10],[28,19],[31,12],[36,23],[35,32],[29,37],[12,37]]);p(deep,[[8,34],[5,25],[10,17],[14,24],[15,11],[19,16],[20,5],[25,13],[28,23],[32,15],[34,26],[31,34],[26,36],[13,36]]);p(red,[[10,32],[8,25],[13,20],[16,26],[18,12],[22,8],[22,19],[29,27],[31,22],[31,31],[26,35],[15,35]]);p('#ffad35',[[13,31],[12,26],[17,29],[19,20],[23,14],[24,25],[29,29],[25,34],[17,34]]);p('#fff0a2',[[17,31],[20,25],[23,22],[26,30],[23,33],[18,33]]);r('#ffce6a',30,5,2,3);r(red,8,8,2,3);}
 else if(['ice','heman','freeze','hail','frostvolt','permafrost'].includes(id)){const ice=id==='heman'?'#9996ff':'#66dcff',s=id==='heman'?'#4b408c':'#236d9c';const shard=(x,y,w,h)=>{p('#142a46',[[x,y],[x+w,y+h*.35],[x+w-2,y+h],[x-w+2,y+h],[x-w,y+h*.36]]);p(ice,[[x,y+2],[x+w-1,y+h*.36],[x+w-3,y+h-2],[x,y+h-3]]);p(s,[[x,y+2],[x,y+h-3],[x-w+3,y+h-2],[x-w+1,y+h*.36]]);p('#e9fcff',[[x,y+2],[x+2,y+7],[x,y+h-5],[x-2,y+10]])};shard(10,19,7,17);shard(22,3,9,33);shard(32,18,6,16);r('#bdf8ff',5,8,2,2);star(g,'#bdf8ff',32,9,2);}
 else if(['lightning','asani','shockstream','thunderstorm','plasma'].includes(id)){let b=id==='lightning'?'#ffe15a':id==='shockstream'?'#75dcff':'#c791ff';let sh=id==='lightning'?'#ae7c22':'#6333aa';p(sh,[[22,2],[35,2],[24,15],[33,15],[12,38],[16,22],[5,22]]);p(b,[[23,3],[31,3],[21,17],[29,17],[14,34],[19,20],[9,20]]);p('#fff6df',[[24,4],[28,4],[19,18],[25,18],[16,29],[21,18],[13,18]]);line(g,b,5,8,10,12);line(g,b,10,12,6,16);line(g,b,31,24,35,28);line(g,b,35,28,30,33);r(hi,4,27,2,2);}
 else if(id==='shot'||id==='meteor'){let col=id==='meteor'?'#f97b40':'#ffc85a';p('#6c352a',[[2,30],[18,14],[10,17],[22,5],[31,5],[37,12],[37,22],[30,30],[21,31],[7,37],[16,27]]);p(col,[[3,32],[20,15],[13,16],[23,9],[30,7],[35,13],[35,22],[28,28],[20,27],[11,32],[17,24]]);disk(g,'#9b4c1c',26,17,10);disk(g,col,26,16,8);disk(g,'#fff1ab',28,14,6);r('#fff9e5',28,10,4,3);line(g,col,5,24,13,19);line(g,col,8,36,17,31);}
 else if(['shield','veil','brace'].includes(id)){p('#17223a',[[20,3],[35,8],[35,23],[30,30],[20,38],[10,30],[5,23],[5,8]]);p('#c8dcec',[[20,5],[33,10],[33,23],[28,29],[20,35],[12,29],[7,23],[7,10]]);p('#4876a7',[[20,8],[30,12],[30,22],[26,27],[20,32],[14,27],[10,22],[10,12]]);p('#75b9ea',[[20,9],[20,30],[13,26],[11,21],[11,13]]);p('#24568e',[[21,10],[29,13],[29,22],[24,28],[21,31]]);r('#daf7ff',18,12,4,15);r('#daf7ff',14,17,12,4);r('#f8ffff',19,14,2,11);}
 else if(id==='heal'||id==='blood'){p('#324631',[[13,5],[27,5],[27,13],[35,13],[35,27],[27,27],[27,35],[13,35],[13,27],[5,27],[5,13],[13,13]]);p('#82d992',[[15,7],[25,7],[25,15],[33,15],[33,25],[25,25],[25,33],[15,33],[15,25],[7,25],[7,15],[15,15]]);r('#e4ffbf',16,8,4,24);r('#c8ffb0',8,16,24,4);star(g,'#f1ffda',31,7,3);}
 else if(id==='magma'||id==='earth'||id==='pathaphi'||id==='mudmire'){let hot=id==='magma',base=hot?'#4e2c32':id==='mudmire'?'#66553d':'#776044',lit=hot?'#ff953a':id==='mudmire'?'#b6a36e':'#d8b485';p('#171221',[[3,30],[8,16],[15,11],[20,3],[27,8],[31,17],[36,21],[38,32],[32,37],[8,37]]);p(base,[[5,30],[10,17],[17,12],[21,6],[26,10],[29,20],[34,23],[35,31],[30,35],[9,35]]);p(mix(base,'#ffffff',.18),[[10,18],[18,13],[20,22],[14,27],[7,30]]);p(mix(base,'#100b14',.32),[[22,22],[28,20],[33,25],[33,31],[27,35],[18,31]]);line(g,lit,21,8,17,17,2);line(g,lit,17,17,23,23,2);line(g,lit,23,23,19,31,2);line(g,lit,23,23,31,27);if(hot){line(g,'#ffed97',21,9,18,17);line(g,'#ffb544',19,30,16,34);star(g,'#ffac4a',7,10,2);rect(g,'#ff7034',29,4,2,3)}}
 else if(['water','wari','monsoon','mist','scald','wind','vayu','dust','heatwave','chillgale'].includes(id)){let fluid=['water','wari','monsoon','mist','scald'].includes(id);const col=accent(id)||'#8ed4dd',sh=mix(col,'#121529',.57),bright=mix(col,'#ffffff',.58);if(fluid&&['water','wari'].includes(id)){p(sh,[[20,2],[25,10],[30,16],[34,24],[31,31],[25,36],[15,36],[8,30],[6,24],[9,17],[15,10]]);p(col,[[20,5],[24,13],[30,21],[31,26],[28,31],[24,34],[16,34],[10,29],[9,23],[13,16]]);p(bright,[[19,9],[14,18],[13,24],[16,29],[12,27],[11,21],[15,15]]);r('#efffff',15,19,2,3);star(g,bright,32,7,2)}else{for(let i=0;i<3;i++){let y=9+i*9;p(sh,[[3,y+3],[12,y],[25,y],[31,y-4],[36,y-1],[32,y+4],[24,y+5],[12,y+5]]);p(col,[[4,y+2],[13,y+1],[26,y+1],[32,y-2],[34,y],[29,y+3],[15,y+4]]);line(g,bright,11,y+1,23,y+1)}if(id==='monsoon'){for(let i=0;i<5;i++)line(g,'#97e9ff',10+i*6,22+(i%2)*5,7+i*6,29+(i%2)*5)}}}
 else if(id==='magnet'){p('#202537',[[7,5],[17,5],[17,23],[23,23],[23,5],[33,5],[33,26],[28,34],[12,34],[7,26]]);p('#7d92be',[[9,7],[15,7],[15,24],[19,28],[24,28],[26,23],[26,7],[31,7],[31,26],[27,32],[13,32],[9,26]]);r('#e57b8a',9,7,6,9);r('#8edcff',26,7,5,9);line(g,'#fff2d9',16,8,24,8);star(g,'#ffb6d2',20,13,3);}
 else if(id==='blackhole'){disk(g,'#593978',20,20,16);for(let i=0;i<56;i++){let t=i*.28,rad=17-i*.22;rect(g,i%3===0?'#e3abff':'#a65ded',20+Math.cos(t)*rad,20+Math.sin(t)*rad*.85,2,2)}disk(g,'#100a20',20,20,8);ring(g,'#e7b4ff',20,20,10,8);}
 else if(id==='timestop'){disk(g,'#483028',20,20,17);disk(g,'#d5b577',20,20,15);disk(g,'#221d30',20,20,12);for(let i=0;i<12;i++)rect(g,'#ffe4ac',20+Math.cos(i*Math.PI/6)*10,20+Math.sin(i*Math.PI/6)*10,2,2);line(g,'#fff1bc',20,20,20,11,2);line(g,'#b9e7ff',20,20,27,24,2);diamond(g,'#fff7db',20,20,2);}
 else if(id==='death'){p('#2b213b',[[4,32],[14,19],[15,7],[23,3],[31,8],[34,19],[28,33],[19,36]]);p('#68547c',[[14,22],[16,9],[23,6],[29,10],[31,22],[26,28],[17,28]]);p('#e8e1d2',[[18,12],[26,12],[29,16],[27,24],[24,25],[24,29],[19,29],[19,25],[15,22],[15,16]]);r('#1b142a',17,18,4,4);r('#1b142a',24,18,4,4);r('#3a2b42',21,23,2,3);line(g,'#a69ba9',5,36,15,9,2);p('#c4d6e3',[[11,8],[20,2],[30,3],[35,8],[23,5],[15,10]]);}
 else if(id==='barrage'){for(let i=0;i<5;i++){let x=5+i*6,y=30-(i%3)*5;line(g,dark,x,y,x+4,y-17,3);line(g,'#ffb955',x+1,y-2,x+5,y-17,2);diamond(g,'#fff4bc',x+5,y-17,3)}}
 else if(id==='ascension'||id==='grand'||id==='summon'||id==='devastation'){let col=id==='ascension'?'#ffe0a1':id==='grand'?'#d6aaff':id==='summon'?'#a4e0b0':'#fca572';ring(g,dark,20,20,17,17);ring(g,mid,20,20,14,14);p(mid,[[20,1],[24,14],[38,20],[24,24],[20,39],[16,24],[2,20],[16,14]]);p(col,[[20,5],[23,16],[34,20],[23,22],[20,34],[17,22],[6,20],[17,16]]);diamond(g,'#fff2c9',20,20,5);for(const [x,y] of [[7,7],[32,7],[7,32],[32,32]])star(g,col,x,y,2);}
 else { // reuse game-defined pixel silhouettes, with a hand-shaded material treatment
 const key=({akki:'fire',heman:'ice',asani:'lightning',light:'light',empower:'empower',bless:'bless',fill:'fill'})[id]||id;
 const shape=new Path2D(paths[key]||paths.mana);g.save();g.translate(4,5);g.scale(2,2);g.fillStyle='#120d1c';g.save();g.translate(1,1);g.fill(shape);g.restore();g.fillStyle=mid;g.fill(shape);g.save();g.clip(shape);for(let y=0;y<16;y++)rect(g,mix(hi,dark,y/16),0,y,16,1);g.restore();g.restore();star(g,hi,33,6,2);}
 icons.set(id,c);return c;}
 function cut(g,c,w,h,inset,corner){const l=inset,r=w-inset-1,t=inset,b=h-inset-1,k=corner;poly(g,c,[[l+k,t],[r-k,t],[r,t+k],[r,b-k],[r-k,b],[l+k,b],[l,b-k],[l,t+k]])}
 function frame(id,rarity,lv,w,h){let key=[id,rarity,lv,w,h].join(':');if(cache.has(key))return cache.get(key);let c=canvas(w,h),g=c.getContext('2d');g.imageSmoothingEnabled=false;const spec=ARCANE_RARITIES[rarity]||ARCANE_RARITIES.common,[d,m,l,hi]=spec.metal,R=spec.rank, a=accent(id)||l, low=h<68;let footer=low?16:20,top=low?11:14,artY=top+1,artH=h-top-footer-2,cy=artY+artH/2, cx=w/2;
 cut(g,'#0b0911',w,h,0,5);cut(g,d,w,h,1,5);cut(g,m,w,h,2,4);cut(g,l,w,h,3,3);cut(g,d,w,h,4,3);cut(g,spec.bg[0],w,h,5,3);
 for(let y=6;y<h-6;y++)rect(g,mix(spec.bg[1],spec.bg[0],Math.min(1,Math.abs(y-cy)/(h*.62))),6,y,w-12,1);
 // Arcane circular engraving and facets behind the illustration.
 const rr=Math.min(w*.29,artH*.46);ring(g,mix(spec.bg[0],l,.28),cx,cy,rr,rr);ring(g,mix(spec.bg[0],l,.17),cx,cy,rr+3,rr+3);for(let i=0;i<8;i++){let t=i*Math.PI/4;diamond(g,mix(spec.bg[0],l,.45),cx+Math.cos(t)*rr,cy+Math.sin(t)*rr,1)}
 if(R>=2){for(let i=0;i<4;i++){let t=Math.PI/4+i*Math.PI/2;line(g,mix(spec.bg[0],m,.55),cx,cy,cx+Math.cos(t)*rr,cy+Math.sin(t)*rr)}}
 // Icon compositing occurs after cached frame rendering. 
 // Engraved nameplate and level plaque: text remains live HTML for readable Thai.
 const ny=h-footer;poly(g,d,[[5,ny+2],[10,ny-1],[w-11,ny-1],[w-6,ny+2],[w-6,h-6],[5,h-6]]);rect(g,spec.bg[0],7,ny+2,w-14,footer-8);rect(g,m,10,ny-1,w-20,1);rect(g,l,Math.floor(cx)-5,ny-1,11,1);
 poly(g,d,[[4,4],[28,4],[31,7],[27,top],[4,top]]);line(g,m,5,top,26,top);line(g,l,5,4,27,4);
 // Base bevel highlights, not gold unless legendary.
 rect(g,hi,7,2,w-14,1);rect(g,hi,2,8,1,Math.max(3,h*.19));rect(g,m,w-3,h*.58,1,h*.30);rect(g,d,8,h-3,w-16,1);
 let orn=Math.max(R>=3?2:R>=1?1:0,lv>=6?3:lv>=3?2:lv>=1?1:0);
 for(const sx of [-1,1])for(const sy of [-1,1]){const x=sx===1?w-5:4,y=sy===1?h-5:4;const P=(dx,dy)=>[x-sx*dx,y-sy*dy];poly(g,m,[P(0,0),P(8+orn,0),P(5,3),P(3,5),P(0,8+orn)]);line(g,l,...P(0,1),...P(6+orn,1));line(g,l,...P(1,0),...P(1,6+orn));if(orn>=2){diamond(g,d,x-sx*3,y-sy*3,3);diamond(g,l,x-sx*3,y-sy*3,2);rect(g,hi,x-sx*3,y-sy*3,1,1)}if(orn>=3){line(g,m,...P(2,8),...P(2,13));line(g,hi,...P(2,9),...P(2,11));}}
 if(lv>=2||R>=3){rect(g,m,5,top+3,1,Math.max(0,h-top-footer-7));rect(g,m,w-6,top+3,1,Math.max(0,h-top-footer-7))}
 if(lv>=4||R>=3){for(let y=top+6;y<ny-3;y+=6){rect(g,l,3,y,1,2);rect(g,m,w-4,y+2,1,2)}}
 if(lv>=5||R===4){diamond(g,d,cx,4,5);diamond(g,l,cx,4,3);diamond(g,hi,cx,3,1)}
 if(lv>=7){for(let i=0;i<Math.min(4,lv-5);i++){let y=top+6+i*5;if(y<ny-2){rect(g,hi,5,y,1,2);rect(g,l,w-6,y,1,2)}}}
 if(lv>=9||R===4){diamond(g,d,cx,ny,4);diamond(g,l,cx,ny,3);rect(g,hi,cx,ny-1,1,1)}
 if(R===4){ // legendary-only heraldic crown and flanking laurels
 poly(g,m,[[cx-9,4],[cx-9,1],[cx-4,3],[cx,0],[cx+4,3],[cx+9,1],[cx+9,4],[cx+6,7],[cx-6,7]]);poly(g,hi,[[cx-7,2],[cx-3,4],[cx,1],[cx+3,4],[cx+7,2],[cx+5,6],[cx-5,6]]);
 for(let i=0;i<4;i++){let y=ny-4-i*4;if(y>top){line(g,l,5,y,9+i%2,y-3);line(g,l,w-6,y,w-10-i%2,y-3)}}}
 // Upgrade engraving is visibly cumulative, independent of rarity.
 if(lv>=3){for(const sx of [-1,1]){let x=sx===1?w-5:4;poly(g,d,[[x,top+2],[x-sx*5,top+6],[x-sx*2,top+10],[x,top+8]]);line(g,l,x,top+3,x-sx*4,top+6);line(g,m,x-sx*4,top+6,x,top+9)}}
 if(lv>=5){for(const sx of [-1,1]){let x=sx===1?w-5:4;line(g,m,x,ny-8,x-sx*6,ny-3,2);line(g,hi,x,ny-8,x-sx*5,ny-4);diamond(g,l,x-sx*3,ny-4,2)}}
 if(lv>=7){for(const sx of [-1,1]){let x=sx===1?w-4:3;let y=Math.round(cy);diamond(g,d,x,y,5);diamond(g,l,x,y,3);diamond(g,hi,x,y,1)}}
 if(lv>=9){line(g,l,cx-15,ny-2,cx-5,ny-2);line(g,l,cx+5,ny-2,cx+15,ny-2);diamond(g,hi,cx,ny,2)}
 if(lv===10){for(const sx of [-1,1]){let x=sx===1?w-7:6;poly(g,m,[[x,top+1],[x-sx*7,top+1],[x-sx*3,top+4],[x,top+8]]);line(g,hi,x,top+1,x-sx*6,top+1);line(g,l,x,top+1,x,top+7)}}
 if(lv===10){rect(g,hi,9,ny-2,5,1);rect(g,hi,w-14,ny-2,5,1);rect(g,hi,3,top+1,1,3);rect(g,hi,w-4,top+1,1,3)}
 cache.set(key,c);if(cache.size>512)cache.delete(cache.keys().next().value);return c;
 }
 function animatedIcon(id,time){if(!prepareIdle||!['dragon','phoenix'].includes(id))return iconArt(id);const period=id==='dragon'?3200:1600,step=Math.floor((time%period)/period*24),key=id+':'+step;if(animatedIcons.has(key))return animatedIcons.get(key);const c=canvas(40,40),g=c.getContext('2d'),art=getArt(id),scale=Math.min(34/art.width,31/art.height),left=Math.floor((40-art.width*scale)/2),top=Math.floor((40-art.height*scale)/2);const pose=prepareIdle({creatureId:id,art,left,top,scale,groundX:20,groundY:36,timeMs:step*period/24,canvasWidth:40,canvasHeight:40});g.imageSmoothingEnabled=false;drawArt(g,pose?.art||art,pose?.left??left,pose?.top??top,scale,null,false);animatedIcons.set(key,c);return c;}
 function draw(c,{id,rarity=words[id]?.rarity||'common',level=0,time=0,motion=true}={}){const box=c.getBoundingClientRect();if(!box.width||!box.height)return;let w=72,h=Math.max(46,Math.round(72*box.height/box.width));if(c.width!==w||c.height!==h){c.width=w;c.height=h}let g=c.getContext('2d');g.imageSmoothingEnabled=false;const lv=Math.max(0,Math.min(10,+level||0)),spec=ARCANE_RARITIES[rarity]||ARCANE_RARITIES.common,[d,m,l,hi]=spec.metal;g.clearRect(0,0,w,h);g.drawImage(frame(id,rarity,lv,w,h),0,0);const at=h<68?12:15,ab=h-(h<68?16:20)-1,sz=Math.max(8,Math.floor(Math.min(w-16,ab-at+4,50))),ic=motion&&rarity==='legendary'?animatedIcon(id,time):iconArt(id);g.drawImage(ic,Math.round((w-sz)/2),Math.round((at+ab-sz)/2),sz,sz);if(!motion||(!(spec.rank>=3||lv>=8)))return;const top=h<68?11:14,ny=h-(h<68?16:20),cy=(top+ny)/2,cx=w/2;g.save();g.beginPath();g.rect(7,top+1,w-14,Math.max(1,ny-top-2));g.clip();let t=time/1000;const a=accent(id)||l;
 if(spec.rank>=3){for(let i=0;i<(spec.rank===4?5:3);i++){let p=t*.65+i*2.4,x=cx+Math.cos(p)*23,y=cy+Math.sin(p)*Math.max(3,(ny-top)*.36);rect(g,i%2?l:a,x,y,1,1);if(i===0&&Math.sin(p*2)>.55)star(g,hi,x,y,2)}}
 if(rarity==='legendary'){switch(id){case 'blackhole':for(let i=0;i<5;i++){let q=t*1.3+i*1.26;rect(g,'#c98bff',cx+Math.cos(q)*13,cy+Math.sin(q)*8,2,1)}break;case 'timestop':line(g,'#f9e9b5',cx,cy,cx+Math.cos(t*.8)*8,cy+Math.sin(t*.8)*8);break;case 'dragon':case 'phoenix':for(let i=0;i<3;i++)rect(g,i?'#e88139':'#ffdf85',cx-13+i*10+Math.sin(t+i)*4,ny-3-((t*8+i*6)%Math.max(4,ny-top-5)),2,2);break;case 'death':for(let i=0;i<3;i++)rect(g,'#af83d7',cx-10+i*10,cy+Math.sin(t+i*2)*7,1,2);break;case 'barrage':for(let i=0;i<5;i++)if(Math.floor(t*4)%5===i)star(g,hi,cx-14+i*7,cy-5,2);break;case 'ascension':case 'devastation':let rr=4+(t*8%12);for(let i=0;i<8;i++)rect(g,hi,cx+Math.cos(i*Math.PI/4)*rr,cy+Math.sin(i*Math.PI/4)*rr,1,1);break;}}
 g.restore();if(lv>=8||spec.rank===4){let p=(time/110)%Math.max(1,(w+h)*2-16),x,y;if(p<w-8){x=4+p;y=2}else if((p-=w-8)<h-8){x=w-3;y=4+p}else if((p-=h-8)<w-8){x=w-4-p;y=h-3}else{x=2;y=h-4-(p-(w-8))}if(Math.sin(t*.8)>-.35)star(g,hi,x,y,lv===10?2:1)}
 }
 function drawIcon(c,id){const g=c.getContext('2d');g.clearRect(0,0,c.width,c.height);g.imageSmoothingEnabled=false;g.drawImage(iconArt(id),0,0,c.width,c.height)}
 return {draw,drawIcon,cache,icons};
}


export { CARD_ICON_PATHS, ARCANE_RARITIES, createArcaneCardRenderer };
