/** E5 R2 — summon contact VFX. Pure drawing; no damage, timing or gameplay changes. */
import { AURA_PROFILES } from './summon-aura-v2.js';
const N={tier:0,dark:'#45394f',mid:'#796381',hot:'#b7a2cf',light:'#e4d9f3',core:'#fff4de'};
// Travel language and contact signature; compound elements combine two physical motifs.
export const SUMMON_COMBAT_PROFILES=Object.freeze({
 uninfused:['cut','cut'], fire:['flame','flame'], akki:['flame','inferno'], ice:['shard','ice'], heman:['shard','crystal'], lightning:['bolt','bolt'], asani:['bolt','fork'], earth:['rock','stone'], pathaphi:['rock','quake'], water:['wave','wave'], wari:['wave','surge'], wind:['cut','gust'], vayu:['cut','gale'], magma:['rock','magma'], mudmire:['blob','mud'], dust:['dust','dust'], permafrost:['rock','frozen'], magnet:['metal','magnet'], mist:['cloud','mist'], hail:['shard','hail'], monsoon:['wave','rain'], shockstream:['wave','shockstream'], thunderstorm:['bolt','thunder'], heatwave:['cut','heat'], chillgale:['cut','chill'], plasma:['orb','plasma'], scald:['cloud','steam'], frostvolt:['shard','frostvolt']
});
const c=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)); const mix=(a,b,t)=>a+(b-a)*t;
const rnd=n=>{const v=Math.sin(n*127.1+71.19)*43758.5453;return v-Math.floor(v);};
const seedOf=s=>[...s].reduce((a,x)=>a*1.17+x.charCodeAt(0),19);
function box(g,x,y,w,h,col){g.fillStyle=col;g.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)));}
function seg(g,x,y,X,Y,col,k=1){x=Math.round(x);y=Math.round(y);X=Math.round(X);Y=Math.round(Y);let dx=Math.abs(X-x),dy=-Math.abs(Y-y),sx=x<X?1:-1,sy=y<Y?1:-1,e=dx+dy;for(let n=0;n<400;n++){box(g,x,y,k,k,col);if(x===X&&y===Y)break;let z=e*2;if(z>=dy){e+=dy;x+=sx;}if(z<=dx){e+=dx;y+=sy;}}}
function shape(g,pts,col){g.fillStyle=col; // Scanline polygons for pixel-sharp diagonals, no antialiasing.
 const ys=pts.map(v=>v[1]);for(let y=Math.ceil(Math.min(...ys));y<=Math.floor(Math.max(...ys));y++){let xs=[];for(let i=0,j=pts.length-1;i<pts.length;j=i++){let [a,b]=pts[i],[d,e]=pts[j];if((b>y+.5)!==(e>y+.5))xs.push(a+(y+.5-b)*(d-a)/(e-b));}xs.sort((a,b)=>a-b);for(let i=0;i+1<xs.length;i+=2){const a=Math.ceil(xs[i]),b=Math.floor(xs[i+1]);if(b>=a)g.fillRect(a,y,b-a+1,1);}}}
function diamond(g,x,y,r,col){r=Math.max(1,Math.round(r));for(let i=-r;i<=r;i++){let w=r-Math.abs(i);box(g,x-w,y+i,w*2+1,1,col);}}
// Electrical VFX: stable, seeded leader paths with uneven bends, tapered return strokes
// and recursive side branches. All strokes are rasterized at logical-pixel resolution.
const ELECTRIC_IDS=new Set(['lightning','asani','shockstream','thunderstorm','plasma','frostvolt']);
const electricColors={lightning:['#8c5428','#f2aa35','#ffe66d','#fffce1'],asani:['#56328d','#a958ea','#df9aff','#fff4ff'],shockstream:['#214eb0','#369df9','#83eaff','#edffff'],thunderstorm:['#536899','#9bbd72','#e0ff9b','#fbffe4'],plasma:['#7827a8','#e34cdb','#ff9ef4','#fff2ff'],frostvolt:['#4657ba','#8d8df7','#c4d8ff','#f9f5ff']};
function electricPalette(id,p){const [dark,mid,hot,core]=electricColors[id]??[p.dark,p.mid,p.hot,p.core];return {dark,mid,hot,light:hot,core};}
function leader(x,y,X,Y,seed,depth=3,rough=.23){
 const length=Math.hypot(X-x,Y-y);const points=[[x,y],[X,Y]];
 for(let d=0;d<depth;d++){
  const next=[points[0]];for(let i=1;i<points.length;i++){
   const [a,b]=points[i-1],[e,f]=points[i],dx=e-a,dy=f-b,len=Math.max(1,Math.hypot(dx,dy));
   const n=seed+d*103+i*29, u=.33+rnd(n+3)*.34;
   const j=(rnd(n+9)<.5?-1:1)*Math.min(len*.68,length*rough*(.64**d))*(.44+.56*rnd(n+7));
   next.push([a+dx*u-dy/len*j,b+dy*u+dx/len*j],[e,f]);
  }points.splice(0,points.length,...next);
 }return points;
}
function rasterStroke(g,pts,col,width=1,from=0,to=1,taper=false){
 const n=pts.length-1;if(to<=from)return;
 for(let i=0;i<n;i++){let a=Math.max(from*n,i),b=Math.min(to*n,i+1);if(b<=a)continue;const [x,y]=pts[i],[X,Y]=pts[i+1];
  let k=taper?Math.max(1,Math.round(width*(.35+.65*Math.sin(Math.PI*(i+.5)/n)))):width;
  let x1=mix(x,X,a-i),y1=mix(y,Y,a-i),x2=mix(x,X,b-i),y2=mix(y,Y,b-i),o=(k-1)/2;
  seg(g,x1-o,y1-o,x2-o,y2-o,col,k);
 }
}
function electricStroke(g,pts,p,width,from,to,alpha=1){
 const old=g.globalAlpha;g.globalAlpha=old*alpha*.45;rasterStroke(g,pts,p.dark,width+3,from,to,true);
 g.globalAlpha=old*alpha*.8;rasterStroke(g,pts,p.mid,width+1,from,to,true);
 g.globalAlpha=old*alpha;rasterStroke(g,pts,p.hot,width,from,to,true);rasterStroke(g,pts,p.core,1,from,to);
 g.globalAlpha=old;
}
function discharge(g,x,y,X,Y,p,seed,{width=2,branches=2,reach=1,tail=0,power=1,rough=.23}={}){
 if(Math.hypot(X-x,Y-y)<2)return;
 const pts=leader(x,y,X,Y,seed,Math.hypot(X-x,Y-y)>34?3:2,rough),n=pts.length-1;
 const dx=X-x,dy=Y-y,len=Math.hypot(dx,dy),old=g.globalAlpha;
 // Branches form ahead of the return stroke, fade earlier, and end in a one-pixel tip.
 for(let i=0;i<branches;i++){
  const j=Math.min(n-1,Math.max(1,Math.round((.23+(i+.25)*.55/Math.max(1,branches))*n)));
  if(reach<j/n||tail>(j+.85)/n)continue;
  const [a,b]=pts[j],side=(i%2?1:-1)*(rnd(seed+19)<.5?-1:1),l=Math.min(30,len*(.23+.20*rnd(seed+i*37+1)));
  const e=a+dx/len*l*.55-dy/len*l*side,f=b+dy/len*l*.55+dx/len*l*side;
  const branch=leader(a,b,e,f,seed+400+i*93,2,.28),vis=c((reach-j/n)*5+.15);
  g.globalAlpha=old*power*.65;rasterStroke(g,branch,p.mid,2,0,vis,true);
  g.globalAlpha=old*power*.88;rasterStroke(g,branch,p.hot,1,0,vis);
  if(vis>.65&&i%2===0){let [u,v]=branch[2];const fork=leader(u,v,e-dx/len*l*.36,f-dy/len*l*.36,seed+800+i*47,1,.18);g.globalAlpha=old*power*.6;rasterStroke(g,fork,p.hot,1,0,1);}
 }
 g.globalAlpha=old;electricStroke(g,pts,p,width,tail,reach,power);
 // A few isolated, hot pixel knots instead of an even white tube.
 for(let j=1;j<n;j++)if(j/n<=reach&&j/n>=tail&&rnd(seed+j*43)>.67){const [a,b]=pts[j];g.globalAlpha=old*power*.92;box(g,a-1,b,2,1,p.core);}
 g.globalAlpha=old;
}
function ionSparks(g,x,y,r,p,seed,q,grand,density){
 const old=g.globalAlpha;for(let i=0;i<Math.round((grand?13:8)*c(density,0,1.5)/1.5);i++){
  const angle=rnd(seed+i*37)*Math.PI*2,d=r*(.3+q*1.4)*(.4+rnd(seed+i*37+2)*.6),a=x+Math.cos(angle)*d,b=y+Math.sin(angle)*d*.8;
  const l=(grand?5:3)*(1-q)*(.5+rnd(seed+i*37+7));g.globalAlpha=old*(1-q)*(.45+.55*rnd(seed+i*37+11));
  seg(g,a,b,a+Math.cos(angle)*l,b+Math.sin(angle)*l,p.hot,1);box(g,a,b,1,1,p.core);
 }g.globalAlpha=old;
}
function stormCloud(g,x,y,r,p){
 // Staggered storm shelf with a scalloped silhouette and cool undersides.
 const outline=[[-1,.15],[-.96,-.06],[-.76,-.07],[-.72,-.32],[-.43,-.35],[-.31,-.53],[.04,-.53],[.17,-.41],[.43,-.42],[.59,-.23],[.85,-.2],[1,.03],[.94,.22],[.72,.29],[.37,.28],[.23,.39],[-.15,.32],[-.44,.38],[-.72,.22]];
 const at=pts=>pts.map(([u,v])=>[x+r*u,y+r*v]);
 shape(g,at(outline),p.dark);
 shape(g,at([[-.89,.03],[-.7,-.08],[-.66,-.3],[-.4,-.3],[-.25,-.47],[.01,-.47],[.16,-.35],[.4,-.35],[.55,-.18],[.79,-.16],[.92,.02],[.63,.13],[.34,.06],[.02,.19],[-.31,.03],[-.52,.14]]),p.mid);
 shape(g,at([[-.63,-.23],[-.38,-.23],[-.24,-.42],[.02,-.42],[.17,-.29],[.37,-.29],[.51,-.15],[.21,-.19],[-.08,-.13],[-.31,-.21]]),p.hot);
 seg(g,x-r*.29,y+r*.25,x+r*.12,y+r*.24,p.light,1);
}
function electricTravel(g,id,src,sy,tx,ty,u,lead,y,k,s,p,seed,grand){
 const ep=electricPalette(id,p),width=grand?3:2,dir=tx>=src?1:-1;
 if(id==='lightning'||id==='asani'||id==='thunderstorm'){
  // The leader advances across the entire gap; the bright return stroke chases it.
  const reach=c(u),tail=c(reach-(id==='asani'?.73:.62));
  discharge(g,src,sy,tx,ty,ep,seed,{width,branches:id==='asani'?4:id==='thunderstorm'?3:2,reach,tail,power:c(u*4),rough:.21});
  if(id==='thunderstorm'){const x=mix(src,tx,reach),Y=mix(sy,ty,reach);stormCloud(g,x,Y-k*1.7,k*1.5,p);}
 }else if(id==='shockstream'){
  wave(g,lead,y,k*1.35,p,dir);discharge(g,lead-dir*k*1.5,y+k*.35,lead+dir*k*.75,y-k*.45,ep,seed,{width:2,branches:2,reach:1,rough:.29});
 }else if(id==='frostvolt'){
  shape(g,[[lead+dir*k*1.6,y],[lead-dir*k,y-k*.55],[lead-dir*k*.6,y+k*.65]],p.hot);seg(g,lead-dir*k,y,lead+dir*k*1.5,y,p.core,1);
  discharge(g,lead-dir*k*1.7,y+k*.55,lead+dir*k*1.5,y,ep,seed,{width:1,branches:2,rough:.24});
 }else if(id==='plasma'){
  // Irregular compressed plasma packet, not a generic diamond projectile.
  shape(g,[[lead-dir*k*2,y+k*.2],[lead-dir*k*.6,y-k*.72],[lead+dir*k*.4,y-k*.56],[lead+dir*k,y],[lead+dir*k*.35,y+k*.66],[lead-dir*k*.6,y+k*.46]],ep.dark);
  shape(g,[[lead-dir*k*1.3,y],[lead-dir*k*.25,y-k*.45],[lead+dir*k*.62,y-k*.27],[lead+dir*k*.85,y],[lead+dir*k*.3,y+k*.36]],ep.mid);
  discharge(g,lead-dir*k*1.8,y,lead+dir*k*.8,y,ep,seed,{width:3,branches:3,rough:.2});
  box(g,lead+dir*k*.2,y-1,2,2,ep.core);
 }
}
function electricalImpact(g,id,src,sy,x,y,r,q,p,seed,grand,dir,spikes,density){
 const ep=electricPalette(id,p),old=g.globalAlpha,width=grand?3:2,reach=c(q*8+.5),fade=(1-q)**.85;
 if(id==='thunderstorm'){
  const sky=Math.max(5,y-r*2.8);stormCloud(g,x-r*.26,sky,r*1.65,p);stormCloud(g,x+r*.48,sky+r*.12,r*1.1,p);
  discharge(g,x-r*.38,sky,x,y+r*.48,ep,seed,{width:width+1,branches:4,reach,rough:.22,power:fade});
  if(q<.48)discharge(g,x+r*.93,sky+r*.4,x+r*.32,y+r*.2,ep,seed+71,{width:1,branches:2,reach,power:.7*(1-q),rough:.27});
 }else if(id==='shockstream'){
  wave(g,x,y,r*1.2,p,dir);discharge(g,x-dir*r*1.2,y+r*.18,x+dir*r*.9,y-r*.4,ep,seed,{width,branches:3,reach,power:fade,rough:.29});
  if(q<.55)discharge(g,x-r*.48,y-r*.75,x+r*.55,y+r*.72,ep,seed+36,{width:1,branches:2,reach,power:.8*(1-q),rough:.22});
 }else if(id==='frostvolt'){
  spikes(4);discharge(g,x-r*.9,y-r*.38,x+r*.95,y+r*.42,ep,seed,{width,branches:3,reach,power:fade,rough:.25});
  if(q<.65)discharge(g,x-r*.28,y-r*1.05,x+r*.35,y+r*.45,ep,seed+33,{width:1,branches:2,reach,power:fade,rough:.25});
 }else if(id==='plasma'){
  const bloom=r*(.3+.65*Math.sin(Math.PI*c(q*1.3+.08)));const angles=[-.83,.35,1.83,3.42,4.65];
  shape(g,angles.map((a,i)=>[x+Math.cos(a)*bloom*(i%2?.72:1),y+Math.sin(a)*bloom*.8]),ep.dark);
  shape(g,angles.map((a,i)=>[x+Math.cos(a)*bloom*.62,y+Math.sin(a)*bloom*.55]),ep.mid);
  for(let i=0;i<(grand?5:4);i++){const a=angles[i]+(rnd(seed+i*7)-.5)*.26,rad=r*(.96+.55*rnd(seed+i*17+8));discharge(g,x+Math.cos(a)*bloom*.2,y+Math.sin(a)*bloom*.2,x+Math.cos(a)*rad,y+Math.sin(a)*rad*.83,ep,seed+i*41,{width:i===0?width:1,branches:i%2===0?2:1,reach,power:fade,rough:.28});}
 }else{
  // Lightning retains a brief source-to-contact return stroke; Asani forks outward.
  if(q<.34){discharge(g,src,sy,x,y,ep,seed,{width,branches:id==='asani'?4:2,reach:1,power:1-q/.4,rough:.21});}
  discharge(g,x-dir*r*.37,y-r*1.48,x,y+r*.57,ep,seed+67,{width,branches:id==='asani'?4:2,reach,power:fade,rough:.27});
  if(id==='asani')discharge(g,x+r*.98,y-r*.79,x-r*.15,y+r*.3,ep,seed+83,{width:2,branches:3,reach,power:fade*.9,rough:.29});
 }
 if(q<.22){const a=1-q/.22;g.globalAlpha=old*a;const l=Math.max(2,r*.36*a);shape(g,[[x-l,y],[x-1,y-2],[x+2,y-l],[x+1,y+1],[x+l,y+2],[x,y+3],[x-2,y+l*.6]],ep.core);box(g,x-1,y-1,3,3,ep.hot);box(g,x,y,1,1,ep.core);}
 g.globalAlpha=old;ionSparks(g,x,y,r,ep,seed+127,q,grand,density);
}
function rock(g,x,y,r,p,hot=false){shape(g,[[x-r,y],[x-r*.6,y-r],[x+r*.55,y-r*.7],[x+r,y+r*.3],[x+r*.2,y+r],[x-r*.6,y+r*.65]],p.dark);shape(g,[[x-r*.8,y],[x-r*.5,y-r*.8],[x+r*.4,y-r*.65],[x+r*.6,y],[x,y+r*.25]],p.mid);seg(g,x-r*.5,y-r*.7,x+r*.35,y-r*.6,p.light,1);if(hot)seg(g,x-r*.6,y+.5,x+r*.5,y+r*.4,p.core,1);}
function shard(g,x,y,r,p,angle=0){shape(g,[[x,y-r*1.6],[x+r*.64,y-r*.4],[x+r*.35,y+r],[x-r*.5,y+r*.55],[x-r*.62,y-r*.25]],p.dark);shape(g,[[x,y-r*1.6],[x+r*.5,y-r*.4],[x,y+r*.65],[x-r*.4,y-r*.15]],p.hot);seg(g,x,y-r*1.25,x,y+r*.5,p.core);}
function flame(g,x,y,w,h,p,lean=0){const points=[[x-w,y],[x-w*.85,y-h*.36],[x-w*.38+lean*.35,y-h*.66],[x+lean,y-h],[x+w*.24+lean*.5,y-h*.52],[x+w*.68,y-h*.7],[x+w,y-h*.22],[x+w*.65,y]];shape(g,points,p.mid);shape(g,[[x-w*.58,y],[x-w*.42,y-h*.28],[x+lean*.57,y-h*.78],[x+w*.23,y-h*.34],[x+w*.58,y-h*.5],[x+w*.5,y]],p.hot);shape(g,[[x-w*.25,y],[x-w*.15,y-h*.24],[x+lean*.25,y-h*.43],[x+w*.2,y]],p.core);}
function slash(g,x,y,r,p,d=1){shape(g,[[x-d*r,y+r*.52],[x-d*r*.3,y-r*.75],[x+d*r*.6,y-r],[x+d*r*.12,y-r*.26],[x+d*r,y+r*.32],[x+d*r*.28,y+r*.64]],p.mid);shape(g,[[x-d*r*.85,y+r*.43],[x-d*r*.28,y-r*.68],[x+d*r*.6,y-r],[x+d*r*.12,y-r*.48],[x-d*r*.1,y+r*.15]],p.light);seg(g,x-d*r*.72,y+r*.32,x-d*r*.27,y-r*.55,p.core);}
function wave(g,x,y,r,p,d=1){shape(g,[[x-d*r,y+r*.4],[x-d*r*.55,y-r*.3],[x-d*r*.05,y-r*.72],[x+d*r*.6,y-r*.58],[x+d*r,y-r*.13],[x+d*r*.45,y-r*.3],[x+d*r*.28,y+r*.13],[x+d*r*.85,y+r*.5],[x-d*r*.3,y+r*.65]],p.dark);shape(g,[[x-d*r,y+r*.33],[x-d*r*.5,y-r*.34],[x,y-r*.66],[x+d*r*.62,y-r*.5],[x+d*r*.9,y-r*.12],[x+d*r*.3,y-r*.25],[x-d*r*.22,y+r*.38]],p.hot);seg(g,x-d*r*.48,y-r*.31,x,y-r*.61,p.core,1);seg(g,x,y-r*.61,x+d*r*.6,y-r*.47,p.light,1);}
function cloud(g,x,y,r,p){for(let i=0;i<4;i++){let w=r*(.5+.22*i),h=r*(.35+.06*(i%2));box(g,x-w/2+(i-1.5)*r*.34,y-h/2+(i%2)*r*.12,w,h,p.dark);box(g,x-w/3+(i-1.5)*r*.34,y-h*.5,w*.7,h*.42,p.mid);}}
function particle(g,x,y,r,p,kind){switch(kind){case 'rock':case 'metal':rock(g,x,y,r,p);break;case 'shard':shard(g,x,y,r,p);break;case 'wave':case 'blob':diamond(g,x,y,r,p.hot);box(g,x,y-r,1,r,p.core);break;case 'cloud':cloud(g,x,y,r*2,p);break;case 'dust':case 'cut':seg(g,x-r*2,y+1,x+r,y-1,p.light);break;case 'bolt':seg(g,x-r,y-r,x,y,p.hot);seg(g,x,y,x+r,y-r,p.core);break;case 'flame':flame(g,x,y,r,r*3,p,-r);break;default:diamond(g,x,y,r,p.mid);box(g,x,y,1,1,p.core);}}
export function drawSummonCombatV2(g,{element,sourceX,sourceY,targetX,targetY=124,groundY=146,grand=false,progress=0,kind='strike',blocked=false,damaging=true,reducedMotion=false,density=1.5,seed=0,delivery='projectile',gesture=''}={}){
 if(![sourceX,sourceY,targetX,targetY,groundY].every(Number.isFinite))return false;
 const id=Object.hasOwn(SUMMON_COMBAT_PROFILES,element)?element:'uninfused',p=AURA_PROFILES[id]??N,[travel,hit]=SUMMON_COMBAT_PROFILES[id];
 const t=c(Number.isFinite(progress)?progress:0),s=(grand?1.55:1)*(1+p.tier*.10)*(kind==='counter'?.8:1),contact=kind==='counter'?.32:.43,base=seedOf(id)+(Number(seed)||0); const dir=targetX>=sourceX?1:-1;
 const tx=targetX-(blocked?dir*10:0),ty=targetY,src=c(sourceX,2,318),sy=c(sourceY,4,groundY),fx=x=>Math.round(x*s); const r=fx(13);
 g.save();g.imageSmoothingEnabled=false;g.globalCompositeOperation='source-over';g.beginPath();g.rect(0,0,g.canvas.width,Math.min(g.canvas.height,groundY+9));g.clip();
 if(reducedMotion){if(blocked||damaging){g.globalAlpha=.85;seg(g,tx-3,ty,tx+3,ty,p.light,1);seg(g,tx,ty-3,tx,ty+3,p.core,1);}g.restore();return true;}
 if(delivery==='projectile'&&t>0&&t<contact){const u=c(t/contact),lead=mix(src,tx,u),y=mix(sy,ty,u)-Math.sin(u*Math.PI)*Math.min(11,Math.abs(tx-src)*.09),k=fx(5+Math.sin(u*Math.PI)*3);g.globalAlpha=c(u*4)*.95;
   if(ELECTRIC_IDS.has(id)){electricTravel(g,id,src,sy,tx,ty,u,lead,y,k,s,p,base,grand);}
   else if(travel==='flame'){flame(g,lead,y+k*.7,k,k*2,p,-dir*k*.85);}
   else if(travel==='wave'){wave(g,lead,y,k*1.35,p,dir);}
   else if(travel==='cut'){slash(g,lead,y,k*1.2,p,dir);}
   else if(travel==='rock'||travel==='metal'){rock(g,lead,y,k*.8,p,id==='magma');}
   else if(travel==='shard'){shape(g,[[lead+dir*k*1.6,y],[lead-dir*k,y-k*.55],[lead-dir*k*.6,y+k*.65]],p.hot);seg(g,lead-dir*k,y,lead+dir*k*1.5,y,p.core,1);}
   else if(travel==='cloud'||travel==='dust'){cloud(g,lead,y,k*1.7,p);}
   else {diamond(g,lead,y,k,p.mid);diamond(g,lead,y,k*.65,p.hot);diamond(g,lead,y,k*.27,p.core);}
   for(let i=0;i<Math.round(6*c(density,0,1.5));i++){const a=rnd(base+i*17),b=rnd(base+i*17+2),x=lead-dir*(5+a*fx(21))*u;if((x-src)*dir<0)continue;if(ELECTRIC_IDS.has(id)){const ep=electricPalette(id,p);seg(g,x,y+(b-.5)*k*1.7,x-dir*(1+i%3),y+(b-.5)*k*1.7-1,ep.hot,1);}else particle(g,x,y+(b-.5)*k*1.7,1+(i%3===0?1:0),p,travel);}
 }
 // E6.1 R2: visual delivery is independent from elemental contact signature.
 // Melee never launches a detached projectile; a short sweep remains at the limb.
 if(delivery!=='projectile'&&t>0&&t<contact){
  const u=c(t/contact);g.globalAlpha=.88;
  if(delivery==='melee'&&u>.57){
   const v=c((u-.57)/.43),size=fx(5+4*v), x=src,y=sy;
   if(['sword','swipe','bear','gargoyle','spider','dive'].includes(gesture)){
    // Short tapered cut hugging the weapon / paw, not a traveling slash.
    const pts=[[x-dir*size*.65,y-size*.9],[x+dir*size*.52,y-size*.38],[x+dir*size*.95,y+size*.19],[x+dir*size*.18,y+size*.73]];
    g.globalAlpha=.85*Math.sin(Math.PI*v*.85);for(let i=1;i<pts.length;i++){seg(g,...pts[i-1],...pts[i],p.dark,3);seg(g,...pts[i-1],...pts[i],p.hot,2);seg(g,...pts[i-1],...pts[i],p.core,1);}
   }else{
    // Bite, sting, charge, slam: tight speed accents on the striking limb.
    g.globalAlpha=.82*v;for(let i=0;i<3;i++){const y2=y+(i-1)*size*.64;seg(g,x-dir*size*(1.15+i*.15),y2-2,x-dir*size*.18,y2,p.hot,1);}
   }
  }else if(delivery==='ground'){
   // A connected floor disturbance propagates toward the target; no flying orb.
   const end=mix(src,tx,u),floor=groundY-1,step=grand?5:4;
   for(let i=0;i<Math.ceil(Math.abs(end-src)/step);i++){const x=src+dir*i*step,j=rnd(base+i*13),fade=c((Math.abs(end-x)+step)/(step*4));g.globalAlpha=.35+.55*(1-fade);seg(g,x,floor+(i%2),x+dir*step,floor+(i%2?0:2),p.dark,2);seg(g,x,floor,x+dir*step,floor+(i%2?1:0),p.hot,1);if(i%3===0){rock(g,x,floor-2-j*fx(5),Math.max(1,fx(2)*j),p,id==='magma');}}
  }else if(delivery==='sonic'){
   // Expanding discontinuous pressure fronts, not detached missile packets.
   for(let i=0;i<3;i++){let v=u-i*.16;if(v<=0)continue;const x=mix(src,tx,v),y=mix(sy,ty,v),rad=fx(3+v*12);g.globalAlpha=.75*(1-v*.55);for(let j=-3;j<3;j++){let a=j/3,b=(j+1)/3;seg(g,x-dir*rad*a*a,y+rad*a,x-dir*rad*b*b,y+rad*b,j%2?p.hot:p.light,1);}}
  }
 }
 if(t>=contact&&(blocked||damaging)){const q=c((t-contact)/(1-contact)),power=Math.sin(Math.PI*c(q*1.25+.1)),grow=c(q*5+.23),fade=(1-q)**.72,rr=r*(.55+.62*grow);g.globalAlpha=fade;
   if(blocked){ // Contact at ward, no hit burst or element status on target.
     const w=fx(9),h=fx(18);for(let i=0;i<4;i++){const d=i*2;seg(g,tx-dir*(w-d),ty-h+d,tx-dir*(w*.35),ty-3+d,p.light,1);seg(g,tx-dir*(w*.35),ty-3+d,tx-dir*(w-d),ty+h-d,p.mid,1);}for(let i=0;i<10;i++){const a=rnd(base+i*11),b=rnd(base+i*11+1);particle(g,tx-dir*(4+q*fx(24)*a),ty+(b-.5)*q*fx(35),1,p,travel);}g.restore();return true;
   }
   const floor=groundY-1, z=(v)=>v*s;
   const plume=(num=3)=>{for(let i=0;i<num;i++){const off=(i-(num-1)/2)*rr*.59;flame(g,tx+off,ty+rr*.9,rr*.46,rr*(1.45+.5*rnd(base+i))*grow,p,off*.4);}};
   const spikes=(num=4)=>{for(let i=0;i<num;i++){const off=(i-(num-1)/2)*rr*.55;shard(g,tx+off,ty+rr*.32,rr*(.38+.2*rnd(base+i))*grow,p);}};
   const rubble=(num=4,hot=false)=>{for(let i=0;i<num;i++){const off=(i-(num-1)/2)*rr*.7;rock(g,tx+off,floor-rr*.48*grow,rr*(.38+.15*rnd(base+i))*grow,p,hot);}};
   const clouds=(num=4)=>{for(let i=0;i<num;i++){let off=(i-(num-1)/2)*rr*.66;cloud(g,tx+off,ty-rr*(.1+.9*q)+Math.sin(i)*rr*.35,rr*.95*grow,p);}};
   if(ELECTRIC_IDS.has(id)){electricalImpact(g,id,delivery==='projectile'?src:tx-dir*rr*.38,delivery==='projectile'?sy:ty+rr*.32,tx,ty,rr,q,p,base,grand,dir,spikes,density);g.restore();return true;}
   switch(hit){
    case 'flame':plume(3);break;case 'inferno':plume(5);flame(g,tx,ty+rr*.85,rr*.65,rr*2.2*grow,p);break;
    case 'ice':spikes(3);break;case 'crystal':spikes(5);shard(g,tx,ty-rr*.18,rr*.85*grow,p);break;
    case 'stone':rubble(3);break;case 'quake':rubble(5);for(let i=-2;i<=2;i++)seg(g,tx, floor,tx+i*rr*.65,floor+Math.abs(i)*2,p.hot,1);break;
    case 'wave':case 'surge':wave(g,tx,ty,rr*(hit==='surge'?1.38:1),p,dir);if(hit==='surge')wave(g,tx-dir*rr*.6,ty+rr*.4,rr,p,dir);break;
    case 'cut':case 'gust':case 'gale':slash(g,tx,ty,rr,p,dir);if(hit!=='cut')slash(g,tx+rr*.4,ty-rr*.4,rr*.8,p,-dir);if(hit==='gale')slash(g,tx-rr*.55,ty+rr*.35,rr*.7,p,dir);break;
    case 'magma':rubble(4,true);plume(3);for(let i=-2;i<=2;i++)seg(g,tx,floor,tx+i*rr*.8,floor+Math.abs(i)*2,p.hot,1);break;
    case 'mud':for(let i=0;i<5;i++){let x=tx+(i-2)*rr*.52,y=floor-rr*(.15+rnd(base+i)*.4)*power;diamond(g,x,y,rr*.42,p.mid);box(g,x-rr*.15,y-rr*.2,rr*.3,2,p.hot);}break;
    case 'dust':clouds(5);for(let i=0;i<5;i++)seg(g,tx-rr,ty-rr+i*rr*.35,tx+rr,ty-rr+i*rr*.35-3,p.light,1);break;
    case 'frozen':rubble(3);spikes(4);break;
    case 'magnet':for(let i=0;i<6;i++){let a=i*Math.PI/3,rad=rr*(1.5-.65*q);let x=tx+Math.cos(a)*rad,y=ty+Math.sin(a)*rad*.8;rock(g,x,y,rr*.23,p);seg(g,x,y,mix(x,tx,.5),mix(y,ty,.5),i%2?'#a3a9bc':'#c58bb7',1);}break;
    case 'mist':clouds(5);break;case 'hail':for(let i=0;i<7;i++){let x=tx+(rnd(base+i)-.5)*rr*2.2,y=ty-rr*1.6+q*rr*2;seg(g,x-3,y-6,x,y,p.light);diamond(g,x,y,rr*.21,p.core);}spikes(2);break;
    case 'rain':cloud(g,tx,ty-rr*1.45,rr*1.8,p);for(let i=0;i<9;i++){let x=tx+(rnd(base+i)-.5)*rr*2.7,y=ty-rr+q*rr*1.6+rnd(base+i+3)*rr;seg(g,x+4,y-9,x,y,p.light,1);}wave(g,tx,ty+rr*.45,rr,p,dir);break;
    case 'heat':slash(g,tx,ty,rr*1.2,p,dir);plume(3);break;
    case 'chill':slash(g,tx,ty,rr,p,dir);spikes(4);break;
    case 'steam':clouds(4);plume(2);break;
   }
   const n=Math.round((grand?13:8)*c(density,0,1.5));for(let i=0;i<n;i++){let a=rnd(base+i*17),b=rnd(base+i*17+1),angle=a*Math.PI*2,dist=rr*(.35+q*(.7+b));particle(g,tx+Math.cos(angle)*dist,ty+Math.sin(angle)*dist*.8-q*rr*.34,Math.max(1,Math.round((1-q)*s*(.7+b))),p,travel);}
   if(q<.16){const len=fx(8)*(1-q/.16);seg(g,tx-len,ty,tx+len,ty,p.core,1);seg(g,tx,ty-len,tx,ty+len,p.core,1);}
 }
 g.restore();return true;
}
