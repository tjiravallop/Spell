/** Spell Foundry — E3 Aura profiles R6 (27 elements). Independent of combat and creature art.
 * Coordinates are logical 320×180 pixels. Time is milliseconds. No persistent particles.
 */
export const AURA_PROFILES = Object.freeze({
  fire: Object.freeze({tier:1, kind:'flame', dark:'#70242E', mid:'#C84425', hot:'#FF8438', light:'#FFD078', core:'#FFF0B0', particles:9}),
  akki: Object.freeze({tier:2, kind:'flame', dark:'#651C43', mid:'#B82B48', hot:'#F54A50', light:'#FF9362', core:'#FFF3AD', particles:15}),
  magma: Object.freeze({tier:3, kind:'magma', dark:'#44232D', mid:'#92402E', hot:'#E87938', light:'#F5A75A', core:'#FFD369', particles:14}),
  magnet: Object.freeze({tier:3, kind:'magnet', dark:'#40394F', mid:'#8C83A7', hot:'#C58BB7', light:'#A3A9BC', core:'#FFB7D0', particles:12}),
  ice: Object.freeze({tier:1, kind:'ice', dark:'#29445D', mid:'#4A7D9B', hot:'#8CCFE2', light:'#C6F4FF', core:'#E8FCFF', particles:9}),
  lightning: Object.freeze({tier:1, kind:'bolt', dark:'#51432E', mid:'#997A33', hot:'#DAB54C', light:'#FFE66D', core:'#FFF4B3', particles:9}),
  earth: Object.freeze({tier:1, kind:'stone', dark:'#42332D', mid:'#77563F', hot:'#B08555', light:'#D6B181', core:'#F0D3A0', particles:9}),
  water: Object.freeze({tier:1, kind:'water', dark:'#1E405D', mid:'#316D9B', hot:'#50A9D8', light:'#8DDCF6', core:'#D9FAFF', particles:10}),
  wind: Object.freeze({tier:1, kind:'wind', dark:'#2D5046', mid:'#557F67', hot:'#94B998', light:'#BFE8C5', core:'#E4FFE8', particles:9}),
  heman: Object.freeze({tier:2, kind:'crystal', dark:'#38345F', mid:'#6258A8', hot:'#9D96E8', light:'#D0D1FF', core:'#F3F0FF', particles:15}),
  asani: Object.freeze({tier:2, kind:'stormbolt', dark:'#3F245D', mid:'#8150AC', hot:'#BD75E7', light:'#EBC1FF', core:'#FFF2FF', particles:15}),
  pathaphi: Object.freeze({tier:2, kind:'quake', dark:'#4F343B', mid:'#97614F', hot:'#C78C65', light:'#E8B47E', core:'#FFE2B2', particles:14}),
  wari: Object.freeze({tier:2, kind:'tide', dark:'#1E4B5E', mid:'#2A858C', hot:'#5CCAC4', light:'#9EF5DF', core:'#DAFFF1', particles:15}),
  vayu: Object.freeze({tier:2, kind:'gale', dark:'#204738', mid:'#427A47', hot:'#79C567', light:'#C7EC91', core:'#EEFFCE', particles:15}),
  mudmire: Object.freeze({tier:3, kind:'mud', dark:'#302E23', mid:'#716747', hot:'#AAA06A', light:'#A4BD77', core:'#C5E5A0', particles:14}),
  dust: Object.freeze({tier:3, kind:'dust', dark:'#594A3B', mid:'#AD9975', hot:'#BEA37A', light:'#E3C99E', core:'#FFF1D0', particles:16}),
  permafrost: Object.freeze({tier:3, kind:'frozen', dark:'#293E51', mid:'#63859B', hot:'#82CCD8', light:'#B8D6E3', core:'#DAFAFF', particles:14}),
  mist: Object.freeze({tier:3, kind:'mist', dark:'#536C70', mid:'#829D99', hot:'#9DBDB7', light:'#C4DDD2', core:'#F5FFF9', particles:14}),
  hail: Object.freeze({tier:3, kind:'hail', dark:'#4B729D', mid:'#8EB6DD', hot:'#A2C5E6', light:'#C6EBFF', core:'#F0F8FF', particles:17}),
  monsoon: Object.freeze({tier:3, kind:'rain', dark:'#153D50', mid:'#287F8B', hot:'#389AA6', light:'#7AE9D3', core:'#A3FFE9', particles:18}),
  shockstream: Object.freeze({tier:3, kind:'shockstream', dark:'#242B69', mid:'#345EBE', hot:'#53BFFF', light:'#76ECF4', core:'#E8FF85', particles:16}),
  thunderstorm: Object.freeze({tier:3, kind:'thunder', dark:'#272D40', mid:'#515D78', hot:'#687596', light:'#A7B97E', core:'#D8FF72', particles:16}),
  heatwave: Object.freeze({tier:3, kind:'heat', dark:'#713028', mid:'#CC7339', hot:'#DA834A', light:'#F5B961', core:'#FFF2B0', particles:15}),
  chillgale: Object.freeze({tier:3, kind:'chillgale', dark:'#30555D', mid:'#62A9AF', hot:'#68B5B7', light:'#A1DBD1', core:'#E5FFFF', particles:17}),
  plasma: Object.freeze({tier:3, kind:'plasma', dark:'#351A55', mid:'#8D39B0', hot:'#D96EEA', light:'#DE8EE7', core:'#FFB5F8', particles:16}),
  scald: Object.freeze({tier:3, kind:'steam', dark:'#65394B', mid:'#C76B63', hot:'#CC7D79', light:'#E8A798', core:'#FFF1DE', particles:15}),
  frostvolt: Object.freeze({tier:3, kind:'frostvolt', dark:'#303C79', mid:'#727DD0', hot:'#8188D7', light:'#B3A9F0', core:'#E6D5FF', particles:16}),
});
export const AURA_LAYERS = Object.freeze(['ground','rear','rim','foreground','particles']);
const TAU=Math.PI*2, clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), fract=v=>v-Math.floor(v);
const hash=n=>fract(Math.sin(n*127.1+311.7)*43758.5453);
const masks=new WeakMap();
function silhouette(art,scale){
  let cache=masks.get(art); if(!cache){cache=new Map();masks.set(art,cache);}
  if(cache.has(scale))return cache.get(scale);
  const w=Math.max(1,Math.round(art.width*scale)),h=Math.max(1,Math.round(art.height*scale));
  const pixels=new Uint8Array(w*h); let minX=w,minY=h,maxX=-1,maxY=-1;
  for(let sy=0;sy<art.rows.length;sy++){
    const y0=Math.round(sy*scale),y1=Math.round((sy+1)*scale);
    if(y1<=y0)continue;
    for(const [,start,end] of art.rows[sy]){
      const x0=Math.round(start*scale),x1=Math.round(end*scale); if(x1<=x0)continue;
      for(let y=y0;y<y1;y++)pixels.fill(1,y*w+x0,y*w+x1);
      minX=Math.min(minX,x0);maxX=Math.max(maxX,x1-1);minY=Math.min(minY,y0);maxY=Math.max(maxY,y1-1);
    }
  }
  const inside=(x,y)=>x>=0&&y>=0&&x<w&&y<h&&pixels[y*w+x]===1;
  // Exterior-only contour; ignore enclosed holes and protect the face/body from overlays.
  const ow=w+2,oh=h+2, outside=new Uint8Array(ow*oh), queue=new Int32Array(ow*oh);
  let head=0,tail=1; queue[0]=0;outside[0]=1;
  while(head<tail){const i=queue[head++],x=i%ow,y=Math.floor(i/ow);
    for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=ow||ny>=oh)continue;const j=ny*ow+nx;if(!outside[j]&&!inside(nx-1,ny-1)){outside[j]=1;queue[tail++]=j;}}
  }
  const edges=[];
  for(let y=-1;y<=h;y++)for(let x=-1;x<=w;x++){
    if(!outside[(y+1)*ow+x+1])continue;
    if(inside(x-1,y)||inside(x+1,y)||inside(x,y-1)||inside(x,y+1))edges.push([x,y]);
  }
  const opaqueCount=pixels.reduce((n,v)=>n+v,0);
  const result={w,h,pixels,inside,edges,minX,minY,maxX,maxY,opaqueCount};
  // Invocation scaling may be continuous. Bound cache growth.
  if(cache.size>=10)cache.delete(cache.keys().next().value);cache.set(scale,result);return result;
}
export function prepareSummonAuraV2({element,art,left,top,scale,groundX,groundY,grand=false,timeMs=0,reducedMotion=false,intensity=1,speed=1,density=1.5,layers=null}){
  const p=AURA_PROFILES[element]; if(!p||!art?.rows||!(scale>0)||![left,top,groundX,groundY,timeMs].every(Number.isFinite))return null;
  const m=silhouette(art,scale); if(m.maxX<0)return null;
  const l=left+m.minX,r=left+m.maxX+1,t=top+m.minY,b=top+m.maxY+1,w=r-l,h=b-t;
  const power=clamp(Number.isFinite(intensity)?intensity:1,0,1.5);
  const rate=clamp(Number.isFinite(speed)?speed:1,0,2);
  const d=clamp(Number.isFinite(density)?density:1.5,0,1.5);
  const time=reducedMotion?0.83:Math.max(0,timeMs)/1000*rate;
  return {p,m,left,top,l,r,t,b,w,h,x:groundX,y:groundY,cx:(l+r)/2,cy:(t+b)/2,grand,time,power,d,layers,reducedMotion,
    reach:Math.round(clamp(w*(grand?.46:.40),7,grand?83:42)),
    n:reducedMotion?Math.min(3,Math.floor(p.particles*d*power)):Math.min(32,Math.round(p.particles*(grand?1.35:.72)*d*power))};
}
const on=(s,k)=>s.layers==null||s.layers[k]!==false;
function px(g,x,y,c,w=1,h=w){g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)));}
function free(s,x,y){return !s.m.inside(Math.round(x-s.left),Math.round(y-s.top));}
function dot(g,s,x,y,c,size=1,external=false){
  if(!external){px(g,x,y,c,size);return;}
  for(let dy=0;dy<size;dy++)for(let dx=0;dx<size;dx++)if(free(s,x+dx,y+dy))px(g,x+dx,y+dy,c);
}
function line(g,x0,y0,x1,y1,c,width=1){
  x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);
  let dx=Math.abs(x1-x0),dy=-Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1,err=dx+dy;
  for(let i=0;i<400;i++){px(g,x0,y0,c,width);if(x0===x1&&y0===y1)break;const e=2*err;if(e>=dy){err+=dy;x0+=sx;}if(e<=dx){err+=dx;y0+=sy;}}
}
function chain(g,points,c,width=1){for(let i=1;i<points.length;i++)line(g,...points[i-1],...points[i],c,width);}
function poly(g,points,c){
  const ymin=Math.floor(Math.min(...points.map(p=>p[1]))), ymax=Math.ceil(Math.max(...points.map(p=>p[1])));
  g.fillStyle=c;
  for(let y=ymin;y<ymax;y++){
    const scan=y+.5, xs=[];for(let i=0;i<points.length;i++){const [a,b]=points[i],[x,z]=points[(i+1)%points.length];if((b>scan)!==(z>scan))xs.push(a+(scan-b)*(x-a)/(z-b));}
    xs.sort((a,b)=>a-b);for(let i=0;i+1<xs.length;i+=2){const l=Math.ceil(xs[i]-.5),r=Math.ceil(xs[i+1]-.5);if(r>l)g.fillRect(l,y,r-l,1);}
  }
}
function diamond(g,x,y,r,c){poly(g,[[x,y-r],[x+r,y],[x,y+r],[x-r,y]],c);}
function arc(g,s,cx,cy,rx,ry,a0,a1,color,width=1,external=false){
  const count=Math.max(4,Math.ceil((a1-a0)*Math.max(rx,ry)*1.25));
  let prev=null;for(let i=0;i<=count;i++){const a=a0+(a1-a0)*i/count;const x=Math.round(cx+Math.cos(a)*rx),y=Math.round(cy+Math.sin(a)*ry);
    if(external){dot(g,s,x,y,color,width,true);}else if(prev){line(g,...prev,x,y,color,width);}else px(g,x,y,color,width);prev=[x,y];}
}
function flame(g,x,y,w,h,phase,p){
  // Broad stepped tongues: dark outside, warm middle, sharp hot core. No blurred glow.
  const shape=(W,H,X,Y)=>{const sway=Math.sin(phase*TAU)*W*.38;return [[X-W*.54,Y],[X-W*.64,Y-H*.24],[X-W*.28,Y-H*.48],[X-W*.45+sway*.3,Y-H*.68],[X-W*.10+sway*.65,Y-H*.76],[X+sway,Y-H],[X+W*.30+sway*.4,Y-H*.73],[X+W*.18,Y-H*.49],[X+W*.58,Y-H*.31],[X+W*.63,Y-H*.12],[X+W*.37,Y]];};
  poly(g,shape(w,h,x,y),p.dark);
  poly(g,shape(w*.73,h*.80,x,y),p.mid);
  poly(g,shape(w*.44,h*.54,x-w*.05,y),p.hot);
  if(h>9)poly(g,shape(w*.22,h*.29,x,y),p.light);
}
function ground(g,s){
  if(!['flame','magma','magnet'].includes(s.p.kind))return extendedGround(g,s);
  const {p,x,y,reach,grand,time}=s, rr=reach+ (grand?4:1);
  if(p.kind==='magma'){
    // Jagged volcanic bed with solid crust islands and narrow luminous faults.
    poly(g,[[x-rr-5,y],[x-rr*.7,y-5],[x-rr*.2,y-6],[x+rr*.48,y-4],[x+rr+5,y+1],[x+rr*.62,y+7],[x-rr*.55,y+7]],p.dark);
    const count=grand?7:4;
    for(let i=0;i<count;i++){
      const a=(i+.5)/count, xx=x+(a*2-1)*rr, yy=y+2+Math.round(hash(i+9)*3);
      const dir=hash(i+18)>.5?1:-1, drift=(4+hash(i+21)*5)*dir;
      const path=[[xx-drift*.7,y-4],[xx+drift*.3,yy-2],[xx-drift*.15,yy],[xx+drift,yy+2],[xx+drift*.6,yy+4+hash(i+3)*2]];
      chain(g,path,p.mid,grand?3:2);chain(g,path,p.hot,1);
      chain(g,[path[2],[xx-drift*.9,yy+2],[xx-drift*1.3,yy+4]],p.mid,1);
      if(hash(i+1)<.7)px(g,xx-drift*.15,yy,p.core,1);
    }
    for(let i=0;i<(grand?5:2);i++){const q=fract(time*.28+i*.31), xx=x+(q*2-1)*rr;px(g,xx,y+5+(i%2),p.light,2,1);}
  }
  // Fire, Akki and Magnet deliberately have no ground rings or ground glyphs.
  // Magma alone retains its irregular volcanic faults, not an ellipse.
}
function rear(g,s){
  if(!['flame','magma','magnet'].includes(s.p.kind))return extendedRear(g,s);
  const {p,grand,time,l,r,t,b,w,h,cx,cy}=s;
  if(p.kind==='magnet'){
    // Rear half of field loops. The sprite naturally occludes anything behind it.
    const rx=clamp(w*.55+5,12,102),ry=clamp(h*.22+6,8,35);
    for(let k=0;k<(grand?3:2);k++){
      const yy=cy+h*(k-(grand?1:.5))*.23;
      for(let j=0;j<4;j++){const a=Math.PI+j*.72+Math.sin(time*.65+k)*.15;arc(g,s,cx,yy,rx+k*2,ry+k*2,a,a+.49,k%2?p.hot:'#7895CB',grand&&k===1?2:1);}
    }
    return;
  }
  const count=p.kind==='magma'?(grand?7:4):p.tier===2?(grand?9:5):(grand?6:4);
  // Place flames around the lower silhouette, with taller flank tongues on large summons.
  for(let i=0;i<count;i++){
    const u=count===1?.5:i/(count-1),side=Math.abs(u-.5)*2;
    const x=l-4+u*(w+8),phase=fract(time*(p.kind==='magma'?.62:.96)+i*.19);
    const height=clamp(h*(.23+.18*side)*(grand?1.12:1)*(.78+.25*Math.sin(phase*TAU)),6,grand?43:19)*s.power;
    const fw=clamp(w/count*.92,4,grand?19:10)*s.power;
    const y=Math.min(s.y+1,b+2)-Math.max(0,(h*.12)*(1-side));
    flame(g,x,y,Math.max(3,fw),Math.max(4,height),phase,p);
    if(p.tier===2&&i%2===0)flame(g,x+(i%4?3:-3),y-2,Math.max(3,fw*.52),Math.max(4,height*.76),phase+.2,p);
  }
  // Lateral tongues higher on the body, but never drawn over the sprite.
  if(grand&&p.kind!=='magma')for(const side of [-1,1]){
    const x=side<0?l-3:r+2;const y=b-h*.13;
    flame(g,x,y,clamp(w*.15,8,20)*s.power,clamp(h*.38,12,42)*s.power,fract(time*.7+side*.22),p);
    flame(g,x+side*4,b+1,clamp(w*.10,6,13),clamp(h*.20,8,24)*s.power,fract(time*.95+side*.33),p);
  }
}
function rim(g,s){
  const {p,m,left,top,time,grand}=s;
  if(s.power<=0)return;
  // Sparse exterior highlights. Segment selection remains fixed in space; light travels along it.
  const step=grand?1:1, budget=grand?Math.min(48,Math.round((s.w+s.h)*.16)):Math.min(14,Math.round((s.w+s.h)*.13));
  let n=0;
  for(let i=0;i<m.edges.length;i+=step){const [ex,ey]=m.edges[i]; const x=left+ex,y=top+ey;
    const zone=Math.floor(ex/5)+Math.floor(ey/6)*11;
    const wave=fract(zone*.137-time*.40);
    if(wave>.18||hash(zone+23)>.62)continue;
    if(['flame','magma'].includes(p.kind)&&y<s.t+s.h*.35)continue;
    const c=p.kind==='magnet'?(ex<m.w/2?'#B8C8F2':p.hot):(wave<.07?p.light:p.hot);
    px(g,x,y,c);if(++n>=budget)break;
  }
}
function rock(g,s,x,y,size,metal=false,polarity=0,external=false){
  const p=s.p, cold=polarity?'#9BB8FF':p.hot;
  const cells=[[0,0],[1,0],[-1,1],[0,1],[1,1],[2,1],[-1,2],[0,2],[1,2],[0,3]];
  for(const [dx,dy] of cells){const col=dy===0?(metal?cold:p.light):dx===-1?(metal?p.light:p.hot):dy===3?p.dark:metal?p.mid:p.mid;
    dot(g,s,x+dx*size,y+dy*size,col,size,external);}
}
function foreground(g,s){
  if(!['flame','magma','magnet'].includes(s.p.kind))return extendedForeground(g,s);
  const {p,grand,time,cx,cy,w,h,l,r,b}=s;
  if(p.kind==='magnet'){
    const rx=clamp(w*.57+7,12,103),ry=clamp(h*.29+6,8,39);
    // Front arc pixels are masked against the opaque creature, never crossing it.
    for(let j=0;j<(grand?4:2);j++){
      const a=.15+j*.68+Math.sin(time*.8+j)*.15;
      arc(g,s,cx,cy+h*.14,rx,ry,a,a+.42,j%2?p.hot:'#9BB8FF',1,true);
    }
    const count=grand?7:4;
    // Strong readable pole fragments travel outside each flank.
    for(const side of [-1,1]){const q=fract(time*.25+(side<0?.12:.61));const xx=(side<0?l:r)+side*(5+Math.sin(q*TAU)*2);const yy=b-8-q*(h*.8);rock(g,s,xx,yy,grand?2:1,true,side>0?1:0,true);}
    for(let i=0;i<count;i++){
      const a=time*(grand?.62:.82)+i*TAU/count; const x=cx+Math.cos(a)*rx,y=cy+Math.sin(a)*ry;
      if(Math.sin(a)<0||!free(s,x,y))continue;
      rock(g,s,Math.round(x),Math.round(y),grand&&i%3===0?2:1,true,i%2,true);
      if(i%2===0)dot(g,s,x-3,y+1,i%4?p.hot:'#9BB8FF',1,true);
    }
  }else if(p.kind==='magma'){
    // Crust fragments at either side of the feet; never cover the foreground actor.
    for(let i=0;i<(grand?4:2);i++){const side=i%2?1:-1;const q=fract(time*.38+i*.27);const x=(side<0?l:r)+side*(2+q*4), y=Math.min(b,s.y)-q*(grand?16:8);rock(g,s,x,y,grand?2:1,false,0,true);}
  }else{
    for(let i=0;i<(grand?4:2);i++){const side=i%2?1:-1,q=fract(time*.66+i*.37);const x=(side<0?l:r)+side*(2+q*3),y=b-2-q*(grand?18:9);dot(g,s,x,y,p.hot,grand&&i%2===0?2:1,true);dot(g,s,x,y-1,p.light,1,true);}
  }
}
function particles(g,s){
  if(!['flame','magma','magnet'].includes(s.p.kind))return extendedParticles(g,s);
  const {p,n,time,l,r,t,b,w,h,grand,cx,cy}=s;
  for(let i=0;i<n;i++){
    const q=fract(time*(.37+hash(i+4)*.38)+hash(i+11)),side=i%2===0?-1:1;
    let x,y;
    if(p.kind==='magnet'){
      const a=time*.65+i*TAU/Math.max(n,1),rx=clamp(w*.57+9,10,110); x=cx+Math.cos(a)*rx;y=cy+Math.sin(a)*clamp(h*.4+5,8,52);
      if(!free(s,x,y))continue; if(i%4===0)rock(g,s,x,y,1,true,i%2,true);else dot(g,s,x,y,i%2?p.hot:'#9BB8FF',1,true);continue;
    }
    const spread=grand?9:5; x=(side<0?l:r)+side*(2+hash(i+20)*spread+Math.sin(q*TAU+i)*2);
    y=b-q*clamp(h*(p.kind==='magma'?.72:.9)+10,14,grand?110:45);
    if(p.kind==='magma'&&i%4===0&&q<.65)rock(g,s,x,y,1,false,0,true);
    else {const c=q<.32?p.light:q<.75?p.hot:p.mid;dot(g,s,x,y,c,grand&&i%4===0?2:1,true);if(q<.45&&i%3===0)dot(g,s,x,y+2,p.mid,1,true);}
  }
}
// E3: compact pixel motifs. Every profile has explicit motion/shape, not just a recolor.
// All new foreground geometry is emitted through dot(..., true) or a masked pixel line.
function safeLine(g,s,x0,y0,x1,y1,c,width=1){
  const n=Math.max(1,Math.ceil(Math.max(Math.abs(x1-x0),Math.abs(y1-y0))));
  for(let i=0;i<=n;i++)dot(g,s,x0+(x1-x0)*i/n,y0+(y1-y0)*i/n,c,width,true);
}
function safeChain(g,s,a,c,width=1){for(let i=1;i<a.length;i++)safeLine(g,s,...a[i-1],...a[i],c,width);}
function shard(g,s,x,y,z,ext=false){
  const p=s.p;z=Math.max(1,Math.round(z));
  if(ext){for(let j=-z;j<=z;j++)for(let i=-z;i<=z;i++)if(Math.abs(i)*2+Math.abs(j)<=z)dot(g,s,x+i,y+j,i<0?p.light:p.hot,1,true);}
  else{poly(g,[[x,y-z*2],[x+z,y-z*.3],[x+z*.6,y+z],[x-z*.7,y+z],[x-z,y-z*.2]],p.dark);poly(g,[[x,y-z*2],[x,y+z],[x-z*.7,y+z],[x-z,y-z*.2]],p.light);poly(g,[[x,y-z*2],[x+z,y-z*.3],[x+z*.6,y+z],[x,y+z]],p.hot);}
}
function zig(g,s,x,y,len,dir,seed,ext=false,branch=false){
  const p=s.p, pts=[[x,y],[x+dir*len*.26,y-len*.31],[x-dir*len*.08,y-len*.47],[x+dir*len*.34,y-len*.70],[x+dir*len*.17,y-len]];
  const path=(a,c,w)=>ext?safeChain(g,s,a,c,w):chain(g,a,c,w);
  path(pts,p.mid,s.grand?3:2);path(pts,p.core,1);
  if(branch)path([pts[2],[x-dir*len*.32,y-len*.66],[x-dir*len*.18,y-len*.88]],p.light,1);
}
// R4: detached traveling pixel packets, never a rooted, oscillating ribbon.
// Shapes remain rigid while moving; parallel bands have broken/tapered ends.
function flowBand(g,s,x,y,len,thick,c,external){
  len=Math.max(2,Math.round(len));thick=Math.max(1,Math.round(thick));
  for(let j=0;j<thick;j++){
    const inset=Math.abs(j-(thick-1)/2)*1.25;
    for(let i=Math.ceil(inset);i<len-Math.ceil(inset);i++){
      const yy=y+j-Math.floor(i/Math.max(5,len*.55));
      if(external)dot(g,s,x+i,yy,c,1,true);else px(g,x+i,yy,c);
    }
  }
}
function flowPacket(g,s,side,y,q,size,style,external=false){
  const p=s.p,grand=s.grand;
  // All packets travel in one direction. Birth/death via short-lived size envelope, not tail bending.
  const life=Math.min(1,q*5,(1-q)*5);if(life<.14)return;
  const L=Math.max(5,Math.round(clamp(size*(style==='water'?1.7:2.1),5,grand?21:11)*(.55+.45*life)));
  const x=(side<0?s.l-L-5:s.r+2)+Math.floor(q*(grand?8:4));
  const yy=Math.round(y-(style==='water'?q*5:q*2));
  if(style==='water'){
    // A compact crest with four value planes and spray, not a line growing out of the body.
    const H=grand?7:4;
    flowBand(g,s,x,yy+2,L,H,p.dark,external);
    flowBand(g,s,x+1,yy+1,L-1,H-1,p.mid,external);
    flowBand(g,s,x+Math.floor(L*.28),yy,L*.68,grand?3:2,p.hot,external);
    flowBand(g,s,x+Math.floor(L*.48),yy-1,L*.44,1,p.light,external);
    dot(g,s,x+L+1,yy-2,p.light,1,external);
    if(grand)dot(g,s,x+L-2,yy-4,p.hot,1,external);
  }else{
    // Parallel gust packets: staggered wide strokes, short broken highlights, fixed diagonal.
    const H=grand?2:1;
    flowBand(g,s,x,yy+3,L,H+1,p.dark,external);
    flowBand(g,s,x+1,yy+2,L-1,H,p.mid,external);
    flowBand(g,s,x+Math.floor(L*.30),yy,L*.65,H,p.hot,external);
    flowBand(g,s,x+Math.floor(L*.48),yy-1,L*.36,1,p.light,external);
    if(grand&&style!=='dust')flowBand(g,s,x+1,yy-4,L*.55,1,p.mid,external);
    if(style==='dust'){dot(g,s,x-2,yy+1,p.hot,1,external);dot(g,s,x+L+2,yy+4,p.light,1,external);}
  }
}
function heatPacket(g,s,side,y,q,size,external=false){
  const p=s.p,x=(side<0?s.l-5:s.r+3)+Math.floor(q*3),yy=y-q*(s.grand?12:6);
  // Rising, disconnected hot-air dashes; no wavy outline or tentacle.
  for(let j=0;j<(s.grand?4:2);j++){
    const xx=x+(j%2)*3,dy=yy-j*4;
    flowBand(g,s,xx,dy,j%2?3:5,1,j%2?p.hot:p.mid,external);
    if(j===1)dot(g,s,xx+2,dy-2,p.light,1,external);
  }
}
function cloud(g,s,x,y,w,h,steam=false){
  const p=s.p; // stepped opaque color bands instead of soft alpha fog
  const pts=[[x-w*.5,y],[x-w*.5,y-h*.35],[x-w*.32,y-h*.35],[x-w*.26,y-h*.77],[x-w*.08,y-h*.77],[x,y-h],[x+w*.22,y-h*.75],[x+w*.35,y-h*.75],[x+w*.35,y-h*.38],[x+w*.5,y-h*.38],[x+w*.5,y]];
  poly(g,pts,p.dark);poly(g,pts.map(([xx,yy])=>[x+(xx-x)*.78,y+(yy-y)*.70-1]),p.mid);
  if(steam)chain(g,[[x-w*.26,y-h*.43],[x-w*.12,y-h*.53],[x+w*.06,y-h*.53],[x+w*.19,y-h*.32]],p.light,1);
}
function stone(g,s,x,y,z,lit=false){const p=s.p;poly(g,[[x-z,y],[x-z*.8,y-z*.7],[x,y-z],[x+z*.8,y-z*.5],[x+z,y],[x+z*.7,y+z*.45],[x-z*.7,y+z*.45]],p.dark);poly(g,[[x-z*.8,y-z*.7],[x,y-z],[x+z*.8,y-z*.5],[x,y]],p.hot);poly(g,[[x,y],[x+z*.8,y-z*.5],[x+z,y],[x+z*.7,y+z*.45],[x,y+z*.3]],p.mid);if(lit)line(g,x-z*.6,y-z*.5,x,y-z*.8,p.light);}
function extendedGround(g,s){
  const {p,x,y,grand,time,reach}=s;const z=grand?1.4:1, rr=Math.min(reach,grand?72:30);
  const k=p.kind;if(!['stone','quake','mud','frozen','hail','rain'].includes(k))return;
  const n=grand?6:3;
  for(let i=0;i<n;i++){const u=(i+.5)/n,xx=x+(u*2-1)*rr, yy=y+3+(i%2)*2,q=fract(time*.45+i*.31);
    if(k==='stone'||k==='quake'){chain(g,[[xx-5*z,yy-3],[xx-2*z,yy-1],[xx+z,yy-2],[xx+4*z,yy+2]],p.dark,2);if(k==='quake'){line(g,xx-2*z,yy-1,xx+z,yy-2,p.hot);stone(g,s,xx,yy-4,3*z,true);}}
    if(k==='mud'){poly(g,[[xx-7*z,yy],[xx-4*z,yy-3],[xx+4*z,yy-2],[xx+7*z,yy+1],[xx+3*z,yy+3],[xx-6*z,yy+2]],p.dark);px(g,xx-3*z,yy,p.mid,5*z,2);if(q<.5)px(g,xx,yy-2,p.light,2,1);}
    if(k==='frozen'){shard(g,s,xx,yy-2,2*z);line(g,xx-4*z,yy,xx+5*z,yy+1,p.mid);}
    if((k==='hail'||k==='rain')&&q<.32){px(g,xx-3*z,yy,p.hot,2*z,1);px(g,xx+2*z,yy-1,p.light,1);px(g,xx,yy-3,p.mid,1);}
  }
}
// R5: atmospheric profiles live primarily behind the creature, not on its flanks.
const REAR_FIELD_KINDS = new Set(['mist','steam','thunder','rain','dust','chillgale','heat','shockstream','plasma']);
function fieldAlpha(g,a,fn){g.save();g.globalAlpha*=Math.max(0,Math.min(1,a));fn();g.restore();}
// A compact stepped bank. It translates as a mass, with no flexible tail or ribbon.
function bank(g,x,y,w,h,c,seed=0){
  const a=.12+hash(seed+9)*.15,b=.38+hash(seed+13)*.13;
  poly(g,[[x-w*.5,y],[x-w*.5,y-h*.30],[x-w*.36,y-h*.30],[x-w*.36,y-h*.60],[x-w*.17,y-h*.60],[x-w*.17,y-h],[x+w*a,y-h],[x+w*a,y-h*.72],[x+w*b,y-h*.72],[x+w*b,y-h*.42],[x+w*.5,y-h*.42],[x+w*.5,y-h*.14],[x+w*.34,y-h*.14],[x+w*.34,y+h*.08],[x+w*.06,y+h*.08],[x+w*.06,y-h*.05],[x-w*.19,y-h*.05],[x-w*.19,y+h*.04],[x-w*.39,y+h*.04],[x-w*.39,y]],c);
}
// Rigid broad fronts: three or four stepped color planes, drifting in one direction.
function front(g,x,y,w,h,p,s,slant=.22,seed=0){
  const shape=(xx,yy,ww,hh)=>[[xx-ww*.5,yy+hh*.15],[xx-ww*.36,yy-hh*.1],[xx-ww*.12,yy-hh*.18],[xx+ww*.16,yy-hh*(.22+slant)],[xx+ww*.38,yy-hh*(.45+slant)],[xx+ww*.5,yy-hh*.65],[xx+ww*.40,yy+hh*.12],[xx+ww*.13,yy+hh*.46],[xx-ww*.21,yy+hh*.59]];
  fieldAlpha(g,.72,()=>poly(g,shape(x,y,w,h),p.dark));
  fieldAlpha(g,.82,()=>poly(g,shape(x+w*.035,y-h*.10,w*.94,h*.70),p.mid));
  fieldAlpha(g,.90,()=>poly(g,shape(x+w*.09,y-h*.22,w*.76,h*.33),p.hot));
  // Broken small foam / frost / dust crests, no continuous bright stroke.
  for(let j=0;j<(s.grand?4:2);j++){const u=hash(seed+j*7+8);px(g,x+w*(u-.25),y-h*(.28+u*.34),p.light,Math.max(1,w*(.045+hash(j+seed)*.04)),1);}
}
function rearAtmosphere(g,s){
  const {p,grand,time,l,r,t,b,w,h,cx,power}=s,k=p.kind;
  const pad=grand?9:5, width=clamp(w+pad*2,18,grand?208:100), height=clamp(h+pad,16,grand?142:70);
  const top=Math.max(3,t-(grand?10:5)), floor=Math.min(s.y+1,b+3), mid=(top+floor)/2;
  const count=grand?5:3, motion=power;
  // Keep each bank/front within the summon-local clipping envelope; ends stay tapered.
  const fieldLeft=Math.max(grand?1:67,l-pad), fieldRight=Math.min(g.canvas.width-1,r+pad);
  const fitX=(x,W)=>clamp(x,fieldLeft+W*.5,Math.max(fieldLeft+W*.5,fieldRight-W*.5));
  // FX clipped by the existing summon layer viewport. All geometry here is behind opaque art.
  if(k==='mist'||k==='steam'){
    const steam=k==='steam', H=clamp(height*(steam?.24:.20),6,grand?23:12);
    for(let i=0;i<count;i++){
      const q=fract(time*(steam?.20:.13)+i/count), seed=i*19+3;
      const W=Math.min(fieldRight-fieldLeft,width*(steam?.47:.75)*(0.88+hash(seed)*.22));
      const x=fitX(cx+(q-.5)*width*(steam?.55:.76),W), y=steam?floor-q*height*.93:floor-height*(.08+i/count*.48);
      const life=Math.min(1,q*5,(1-q)*5);
      fieldAlpha(g,(steam?.62:.55)*life*motion,()=>bank(g,x,y,W,H*(.8+q*.3),p.dark,seed));
      fieldAlpha(g,(steam?.60:.54)*life*motion,()=>bank(g,x+W*.06,y-2,W*.86,H*.76,p.mid,seed));
      fieldAlpha(g,.45*life*motion,()=>bank(g,x-W*.04,y-H*.27,W*.60,H*.40,p.hot,seed+1));
      fieldAlpha(g,.48*life*motion,()=>{for(let j=0;j<3;j++)px(g,x-W*.30+j*W*.23,y-H*.47-(j%2)*2,p.light,Math.max(2,W*.09),1);});
    }
  }else if(k==='thunder'||k==='rain'){
    const H=clamp(height*.24,8,grand?26:15), Y=top+H*.75;
    // A single distributed storm canopy, animated by passing cloud masses.
    for(let j=0;j<(grand?4:3);j++){
      const u=(j+.5)/(grand?4:3),q=fract(time*.14+j*.28);
      const W=width*(grand?.39:.47), x=fitX(cx+(u-.5)*width*.86+(q-.5)*5,W);
      fieldAlpha(g,.78*motion,()=>bank(g,x,Y+hash(j+6)*3,W,H,p.dark,j));
      fieldAlpha(g,.65*motion,()=>bank(g,x-1,Y-2,W*.83,H*.72,p.mid,j));
      if(k==='thunder')fieldAlpha(g,.58*motion,()=>bank(g,x+1,Y-H*.48,W*.55,H*.34,p.hot,j+2));
    }
    if(k==='rain'){
      // Slanted rain curtain spans the whole rear field rather than two side strips.
      const n=grand?24:12;
      for(let j=0;j<n;j++){const q=fract(time*(.80+hash(j)*.32)+hash(j+91)), xx=cx+(hash(j+3)-.5)*width-q*(grand?15:7), yy=Y+q*Math.max(8,floor-Y);
        const length=grand?7+hash(j+2)*7:4+hash(j+2)*4;
        fieldAlpha(g,(j%3===0?.86:.48)*motion,()=>line(g,xx,yy,xx-length*.42,yy+length,j%3===0?p.light:p.hot,1));}
    }else{
      // Intermittent rear bolts: start at canopy and end at staggered heights, never rooted to the summon.
      for(let j=0;j<(grand?4:2);j++){const q=fract(time*.62+j*.27);if(q>.42)continue;
        const x=cx+(hash(j+88)-.5)*width*.88, y=Y-1, len=clamp(height*(.32+hash(j+10)*.48),8,grand?72:25);
        fieldAlpha(g,.86*motion,()=>zig(g,s,x,y+len,len,j%2?1:-1,j,false,true));}
    }
  }else if(k==='dust'||k==='chillgale'||k==='shockstream'){
    // Wide diagonal fronts cross the rear silhouette, never grow from its side.
    const H=clamp(height*(k==='shockstream'?.24:.15),5,grand?22:12);
    for(let i=0;i<count;i++){
      const q=fract(time*(k==='shockstream'?.37:.29)+i/count), life=Math.min(1,q*4,(1-q)*4);
      const W=Math.min(fieldRight-fieldLeft,width*(.72+hash(i+25)*.16));
      const x=fitX(cx+(q-.5)*width*.65,W), y=floor-height*(.12+i/(count+1)*.72);
      if(life<.14)continue;
      fieldAlpha(g,life*motion,()=>front(g,x,y,W,H*(.70+life*.30),p,s,k==='dust'?.12:.36,i*11));
      if(k==='chillgale')for(let j=0;j<2;j++)shard(g,s,x+(j-.5)*width*.70,y-H*.65,grand?2:1);
      if(k==='shockstream'&&i%2===0&&q<.74){const xx=x+width*.24;zig(g,s,xx,y+H*.3,clamp(H*1.5,5,24),i%2?1:-1,i,false,false);}
    }
  }else if(k==='heat'||k==='plasma'){
    const plasma=k==='plasma', n=grand?7:4;
    if(plasma){
      for(let j=0;j<(grand?4:2);j++){
        const q=fract(time*.42+j*.29),life=Math.min(1,q*5,(1-q)*5), W=width*.36, H=clamp(height*.22,8,grand?25:13);
        const xx=fitX(cx+width*(j/(grand?3:1)-.5)*.74,W), yy=top+H*(1.2+q*.8);
        fieldAlpha(g,.66*life*motion,()=>poly(g,[[xx-W*.5,yy],[xx-W*.24,yy-H*.7],[xx-W*.08,yy-H*.44],[xx+W*.12,yy-H],[xx+W*.24,yy-H*.36],[xx+W*.5,yy],[xx+W*.16,yy+H*.25],[xx-W*.23,yy+H*.2]],p.dark));
        fieldAlpha(g,.65*life*motion,()=>chain(g,[[xx-W*.24,yy-H*.4],[xx-W*.08,yy-H*.18],[xx+W*.12,yy-H*.72],[xx+W*.24,yy-H*.2]],p.hot,grand?2:1));
      }
    }
    // Separate rising pillars and hot cells behind the creature. No elliptical halo or wavy lines.
    for(let j=0;j<n;j++){
      const u=(j+.5)/n, q=fract(time*(plasma?.53:.36)+j*.29), life=Math.min(1,q*5,(1-q)*5);
      const x=cx+(u-.5)*width, y=floor-q*height*.88, W=clamp(width/(n+1),4,grand?21:10), H=clamp(height*(plasma?.37:.29),7,grand?37:17)*life;
      if(life<.15)continue;
      if(plasma){
        const dir=j%2?1:-1;
        fieldAlpha(g,.62*life*motion,()=>poly(g,[[x-W*.56,y],[x-W*.25,y-H*.55],[x+dir*W*.30,y-H],[x+W*.47,y-H*.42],[x+W*.36,y+2]],p.dark));
        fieldAlpha(g,.82*life*motion,()=>poly(g,[[x-W*.31,y],[x-W*.13,y-H*.46],[x+dir*W*.23,y-H*.84],[x+W*.27,y-H*.32],[x+W*.15,y]],p.mid));
        if(q<.62)fieldAlpha(g,.82*motion,()=>zig(g,s,x,y,Math.max(5,H*.88),dir,j,false,true));
        diamond(g,x+W*.17,y-H*.25,grand?2:1,p.light);
      }else{
        fieldAlpha(g,.74*life*motion,()=>flame(g,x,y,W,H,q,p));
        for(let k=0;k<2;k++){const yy=y-H-k*4;fieldAlpha(g,.60*life*motion,()=>flowBand(g,s,x-W*.5+k*2,yy,W*.85,grand?2:1,k?p.hot:p.mid,false));}
      }
    }
  }
}
// Keep particles in a broad field. Masked front pixels remain sparse and independent.
function rearFieldParticles(g,s){
  const {p,n,time,l,r,t,b,w,h,grand}=s,k=p.kind;
  for(let i=0;i<n;i++){
    const q=fract(time*(.24+hash(i+17)*.42)+hash(i+2));
    let x=l-5+hash(i+21)*(w+10), y=b-q*(h+9);
    const c=q<.25?p.light:q<.75?p.hot:p.mid,z=grand&&i%6===0?2:1;
    if(k==='rain'){y=t+q*(h+7);x-=q*5;safeLine(g,s,x,y,x-2,y+4,c);}
    else if(k==='dust'||k==='chillgale'||k==='shockstream'){x+=q*(grand?9:4);if(k==='chillgale'&&i%3===0)shard(g,s,x,y,1,true);else dot(g,s,x,y,c,z,true);}
    else if(k==='thunder'||k==='plasma'){dot(g,s,x,y,c,z,true);}
    else dot(g,s,x,y,c,z,true);
  }
}

function extendedRear(g,s){
  if(REAR_FIELD_KINDS.has(s.p.kind))return rearAtmosphere(g,s);
  if(s.p.kind==='bolt'||s.p.kind==='stormbolt')return;
  const {p,grand,time,l,r,t,b,w,h,cx}=s,k=p.kind;
  const size=clamp(h*.15,4,grand?17:8)*(.65+.35*s.power),n=grand?5:3;
  for(let i=0;i<n;i++){
    const side=i%2?-1:1,u=fract(i*.37+.16),q=fract(time*(.35+i*.045)+i*.31),x=(side<0?l:r)+side*(2+u*3),y=b-h*(.14+u*.72);
    switch(k){
      case 'ice':case 'crystal':case 'frozen':case 'frostvolt':
        shard(g,s,x,y+Math.sin(q*TAU)*2,size*(k==='crystal'? .62:.43));
        if(k==='frozen')stone(g,s,x-side*3,y+5,size*.5);
        // Frostvolt discharge is now on the creature; rear crystals remain.
        if(k==='crystal'&&grand)shard(g,s,x-side*5,y+6,size*.32);
        break;
      case 'bolt':case 'stormbolt':case 'plasma':
        if(q<.80)zig(g,s,x,y+size,size*(k==='bolt'?1.5:2.4),side,i,false,k!=='bolt');
        if(k==='plasma'){diamond(g,x,y+2,size*.48,p.mid);diamond(g,x,y+2,size*.23,p.light);}
        break;
      case 'stone':case 'quake':case 'mud':
        if(k==='mud')cloud(g,s,x,y+h*.1,size*1.3,size*.58);
        else stone(g,s,x,y+Math.sin(q*TAU)*4,size*(k==='quake'?.6:.4),k==='quake');
        if(k==='quake'&&grand)stone(g,s,x+side*4,y+size,size*.34,true);
        break;
      case 'water':case 'tide':case 'shockstream':
        flowPacket(g,s,side,y,q,size*(k==='water'?.8:1.15),'water');
        if(k==='shockstream'&&q<.68)zig(g,s,x,y+size*.5,size*1.2,side,i,false);
        break;
      case 'wind':case 'gale':case 'dust':case 'chillgale':case 'heat':
        if(k==='heat'){heatPacket(g,s,side,y,q,size);if(i%2===0)flame(g,x,y+size,size*.36,size*.72,q,p);}
        else{flowPacket(g,s,side,y,q,size*(k==='wind'?.7:1),k==='dust'?'dust':'air');
          if(k==='gale'||k==='chillgale')flowPacket(g,s,side,y+size*.5,fract(q+.28),size*.65,'air');}
        break;
      case 'mist':case 'steam':case 'thunder':
        cloud(g,s,x+Math.sin(q*TAU)*3,y+size*.5,size*(k==='thunder'?2.7:2.1),size*(k==='steam'?1.35:.8),k!=='thunder');
        if(k==='thunder'&&q<.45)zig(g,s,x,y+size*1.2,size*1.3,side,i,false,true);
        break;
      case 'hail':case 'rain':
        for(let j=0;j<(grand?3:2);j++){const v=fract(q+j*.31),xx=x+(j-1)*4+(k==='rain'?v*6:0),yy=t+v*h; if(k==='hail')shard(g,s,xx,yy,grand?2:1);else line(g,xx,yy,xx-3,yy+7,p.hot,1);}
        if(k==='rain'){const xx=x+q*4;line(g,xx,y,xx-4,y+9,p.mid,2);line(g,xx+1,y,xx-3,y+7,p.light);}
        break;
    }
  }
}
function extendedForeground(g,s){
  if(REAR_FIELD_KINDS.has(s.p.kind)||s.p.kind==='bolt'||s.p.kind==='stormbolt')return;
  const {p,grand,time,l,r,t,b,h,w}=s,k=p.kind;
  for(let i=0;i<(grand?4:2);i++){
    const side=i%2?1:-1,q=fract(time*.44+i*.39),x=(side<0?l:r)+side*(3+q*4),y=b-3-q*h*.75;
    if(['ice','crystal','frozen','hail','frostvolt'].includes(k)){shard(g,s,x,k==='hail'?t+q*h:y,grand?2:1,true);}
    else if(['bolt','stormbolt','plasma','shockstream','thunder'].includes(k)){if(q<.75)zig(g,s,x,y+5,grand?12:6,side,i,true,k!=='bolt');}
    else if(['stone','quake','mud'].includes(k)){rock(g,s,x,y,grand&&i===0?2:1,false,0,true);}
    else if(k==='rain'){safeLine(g,s,x,t+q*h,x-2,t+q*h+6,p.light);}
    else if(['water','tide','gale','wind','chillgale','dust','heat'].includes(k)){if(k==='heat')heatPacket(g,s,side,y,q,grand?7:4,true);else flowPacket(g,s,side,y,q,grand?7:4,k==='water'||k==='tide'?'water':k==='dust'?'dust':'air',true);}
    else{dot(g,s,x,y,p.mid,grand?2:1,true);dot(g,s,x+1,y-1,p.light,1,true);}
  }
}
function extendedParticles(g,s){
  if(REAR_FIELD_KINDS.has(s.p.kind))return rearFieldParticles(g,s);
  const {p,n,time,l,r,t,b,h,grand}=s,k=p.kind;
  for(let i=0;i<n;i++){
    const side=i%2?1:-1,q=fract(time*(.28+hash(i+17)*.45)+hash(i+2));
    let x=(side<0?l:r)+side*(2+hash(i+21)*(grand?9:5)+Math.sin(q*TAU+i)*2),y=b-q*Math.min(h+9,grand?125:48);
    const c=q<.25?p.light:q<.75?p.hot:p.mid,z=grand&&i%5===0?2:1;
    switch(k){
      case 'hail':case 'rain':y=t+q*(b-t+4);x+=k==='rain'?q*5:0;if(k==='rain')safeLine(g,s,x,y,x-2,y+5,c);else shard(g,s,x,y,z,true);break;
      case 'ice':case 'crystal':case 'frozen':case 'frostvolt':if(i%3===0)shard(g,s,x,y,z,true);else{dot(g,s,x,y,c,z,true);}break;
      case 'bolt':case 'stormbolt':case 'plasma':case 'shockstream':case 'thunder':dot(g,s,x,y,c,z,true);break;
      case 'stone':case 'quake':case 'mud':if(i%4===0)rock(g,s,x,y,1,false,0,true);else dot(g,s,x,y,c,z,true);break;
      case 'wind':case 'gale':case 'dust':case 'chillgale':{x=(side<0?l-8:r+2)+q*(grand?8:4);safeLine(g,s,x,y,x+(grand?4:2),y-1,c);if(k==='chillgale'&&i%3===0)dot(g,s,x,y-2,p.core,1,true);break;}
      case 'heat':dot(g,s,x,y,c,z,true);if(i%3===0)dot(g,s,x+1,y-3,p.hot,1,true);break;
      case 'water':case 'tide':dot(g,s,x,y,c,z,true);if(i%3===0)dot(g,s,x,y+1,p.light,1,true);break;
      default:dot(g,s,x,y,c,z,true);if(i%3===0)dot(g,s,x+side*2,y-1,p.mid,1,true);
    }
  }
}


// R6: body conduction is the only intentionally unmasked-in-front effect.
// Short moving pixel arcs, drawn ONLY on opaque sprite pixels. No permanent outline or white wash.
const SURFACE_ARC_KINDS = new Set(['bolt','stormbolt','shockstream','thunder','plasma','frostvolt']);
function surfaceArcTiming(s){
  const period=s.p.tier===1?1.32:s.p.tier===2?1.06:1.16;
  const duration=s.p.tier===1?.23:s.p.tier===2?.29:.31;
  const tick=s.time+.045, cycle=Math.floor(tick/period), age=tick-cycle*period;
  return {cycle,age,duration,active:!s.reducedMotion&&age<duration};
}
function surfaceDischarge(g,s){
  if(!SURFACE_ARC_KINDS.has(s.p.kind)||s.reducedMotion||s.power<=0)return;
  const {cycle,age,duration,active}=surfaceArcTiming(s);if(!active)return;
  const {m,p,grand,left,top}=s, seed=cycle*17+p.tier*103;
  // Choose a connected horizontal surface strip, biased to a different body height each pulse.
  // This works on skinny wings/limbs, winding serpents and tiny summons without per-species artwork.
  const target=m.minY+(m.maxY-m.minY)*(.20+hash(seed+8)*.57);
  let best=null,bestScore=-Infinity;
  for(const dy of [0,.09,-.09,.18,-.18,.28,-.28]){
    const y=Math.round(clamp(target+dy*s.h,m.minY,m.maxY));
    let start=-1;
    for(let x=m.minX;x<=m.maxX+1;x++){
      if(m.inside(x,y)){if(start<0)start=x;continue;}
      if(start>=0){const len=x-start,score=len-Math.abs(y-target)*.48;
        if(score>bestScore&&len>=3){bestScore=score;best={a:start,b:x-1,y};}start=-1;}
    }
  }
  if(!best)return;
  const span=best.b-best.a+1, len=Math.min(span-1,Math.max(3,Math.round(span*(p.tier===1?.60:.84))));
  const start=best.a+Math.floor(Math.max(0,span-len-1)*hash(seed+4));
  const dir=cycle%2===0?1:-1, segments=clamp(Math.round(len/5),2,7);
  const height=clamp(Math.round(s.h*.09),1,grand?8:4), nodes=[];
  for(let i=0;i<=segments;i++){
    const x=Math.round(start+len*(dir===1?i/segments:1-i/segments));
    const shift=i===0||i===segments?0:Math.round((i%2?1:-1)*height*(.55+hash(seed+i)*.45));
    let y=best.y;
    // Walk from the connected strip until the next pixel would leave the body.
    for(let n=1;n<=Math.abs(shift);n++){const yy=best.y+Math.sign(shift)*n;if(!m.inside(x,yy))break;y=yy;}
    nodes.push([x,y]);
  }
  const path=[];
  for(let i=1;i<nodes.length;i++){
    const [x0,y0]=nodes[i-1],[x1,y1]=nodes[i];
    const n=Math.max(1,Math.abs(x1-x0),Math.abs(y1-y0));
    for(let j=i===1?0:1;j<=n;j++){
      const x=Math.round(x0+(x1-x0)*j/n),y=Math.round(y0+(y1-y0)*j/n);
      if(m.inside(x,y))path.push([x,y]);
    }
  }
  if(!path.length)return;
  // The head traverses the surface quickly, then its short tail extinguishes. Long quiet interval follows.
  const q=age/duration, window=p.tier===1?.53:.72, head=q*(1+window), tail=head-window;
  let budget=Math.min(grand?95:32,Math.max(4,Math.floor(m.opaqueCount*.075*s.power)));
  const put=(x,y,c)=>{if(budget>0&&m.inside(x,y)){px(g,left+x,top+y,c);budget--;}};
  const colors=s.p.kind==='shockstream'?['#53BFFF','#E8FF85']:s.p.kind==='thunder'?['#9DB986','#F0FFAA']:s.p.kind==='frostvolt'?['#B3A9F0','#F3F0FF']:s.p.kind==='plasma'?['#F084E8','#FFF1FF']:[p.hot,p.core];
  for(let i=0;i<path.length&&budget>0;i++){
    const u=i/Math.max(1,path.length-1);if(u<tail||u>head)continue;
    const [x,y]=path[i], glow=(u-tail)/window;
    if(grand&&glow>.35&&budget>2&&i%2===0)put(x,y+1,colors[0]);
    put(x,y,glow>.27?colors[1]:colors[0]);
    // Brief fork on stronger tiers, no extended tentacle or off-body streak.
    if(p.tier>1&&i===Math.floor(path.length*.55)&&glow>.40&&budget>2){
      const dy=hash(seed+5)>.5?1:-1;for(let j=1;j<=Math.min(grand?5:2,Math.floor(len*.18));j++)put(x+dir*Math.floor(j*.6),y+dy*j,j===1?colors[1]:colors[0]);
    }
  }
}

export function drawSummonAuraLayerV2(g,s,layer){
  if(!s||s.power<=0||!on(s,layer))return;
  g.save();g.imageSmoothingEnabled=false;g.globalAlpha=1;g.globalCompositeOperation='source-over';
  // Keep normal FX away from the wizard. XXL can use the left edge, but actors draw above Grand.
  const minX=s.grand?0:66,maxX=Math.min(g.canvas.width,s.r+(s.grand?12:8));
  g.beginPath();g.rect(Math.max(0,minX),0,Math.max(0,maxX-Math.max(0,minX)),Math.min(g.canvas.height,s.y+12));g.clip();
  if(layer==='ground')ground(g,s);else if(layer==='rear')rear(g,s);else if(layer==='rim')rim(g,s);else if(layer==='foreground'){foreground(g,s);surfaceDischarge(g,s);}else if(layer==='particles')particles(g,s);
  g.restore();
}
