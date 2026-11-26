/** E4 R1: pixel invocation, independent of combat scheduling. 0..1 progress. */
import { AURA_PROFILES } from './summon-aura-v2.js';
const cap=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const smooth=x=>{x=cap(x);return x*x*(3-2*x);};
const lerp=(a,b,t)=>a+(b-a)*t;
const rnd=n=>{const v=Math.sin(n*127.1+91.73)*43758.5453;return v-Math.floor(v);};
const neutral={tier:0,dark:'#443852',mid:'#89739c',hot:'#c4a8dd',light:'#ead8fa',core:'#fff4db'};
// Formation direction and two complementary particle motifs. All 27 IDs remain distinct.
export const INVOKE_PROFILES=Object.freeze({
 uninfused:['center','rune','rune'], fire:['rise','ember','flame'], akki:['rise','flame','ember'],
 ice:['fall','crystal','frost'], heman:['converge','crystal','frost'], lightning:['fall','bolt','spark'], asani:['fall','bolt','bolt'],
 earth:['rise','stone','dust'], pathaphi:['rise','slab','stone'], water:['sweep','drop','wave'], wari:['converge','wave','drop'],
 wind:['sweep','gust','dust'], vayu:['sweep','gust','gust'], magma:['rise','lava','stone'], mudmire:['rise','mud','drop'],
 dust:['sweep','dust','gust'], permafrost:['rise','crystal','stone'], magnet:['converge','metal','spark'], mist:['sweep','fog','drop'],
 hail:['fall','frost','crystal'], monsoon:['fall','rain','gust'], shockstream:['sweep','wave','bolt'], thunderstorm:['fall','bolt','cloud'],
 heatwave:['rise','ember','gust'], chillgale:['sweep','gust','frost'], plasma:['converge','plasma','bolt'], scald:['rise','fog','ember'], frostvolt:['converge','crystal','bolt']
});
export function prepareSummonInvokeV2({element,art,left,top,scale,groundX,groundY,grand=false,progress=0,reducedMotion=false,density=1.5}){
 if(!art?.rows||!(scale>0)||![left,top,scale,groundX,groundY].every(Number.isFinite))return null;
 const id=Object.hasOwn(INVOKE_PROFILES,element)?element:'uninfused';
 const p=AURA_PROFILES[id]??neutral, [dir,primary,secondary]=INVOKE_PROFILES[id];
 const t=reducedMotion?1:cap(Number.isFinite(progress)?progress:0);
 const w=Math.max(1,Math.round(art.width*scale)),h=Math.max(1,Math.round(art.height*scale));
 const seed=[...id].reduce((a,c)=>a+c.charCodeAt(0),0);
 return {id,p,dir,primary,secondary,t,art,left,top,scale,w,h,cx:left+w/2,cy:top+h/2,groundX,groundY,grand,seed,
   reveal:smooth((t-.22)/.47), release:smooth((t-.62)/.30), auraMix:smooth((t-.55)/.45),
   density:cap(Number.isFinite(density)?density:1.5,0,1.5),reducedMotion};
}
function rect(g,x,y,w,h,c){g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)));}
function line(g,x0,y0,x1,y1,c,width=1){x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);let dx=Math.abs(x1-x0),dy=-Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1,e=dx+dy;for(let i=0;i<400;i++){rect(g,x0,y0,width,width,c);if(x0===x1&&y0===y1)break;const k=2*e;if(k>=dy){e+=dy;x0+=sx;}if(k<=dx){e+=dx;y0+=sy;}}}
function diamond(g,x,y,r,c){r=Math.max(1,Math.round(r));for(let dy=-r;dy<=r;dy++){const d=r-Math.abs(dy);rect(g,x-d,y+dy,2*d+1,1,c);}}
function shard(g,x,y,k,p,kind,angle=0){k=Math.max(1,Math.round(k));switch(kind){
 case 'bolt': {const z=Math.max(3,k*2);line(g,x-z,y-z,x,y-1,p.hot);line(g,x,y-1,x-k,y+k,p.core);line(g,x-k,y+k,x+z,y+z,p.light);break;}
 case 'crystal':case 'frost':diamond(g,x,y,k,p.mid);line(g,x,y-k,x,y+k,p.light);rect(g,x,y,1,1,p.core);break;
 case 'metal':case 'stone':case 'slab':case 'lava':rect(g,x-k,y-k,k*2+1,k*2,p.dark);rect(g,x-k+1,y-k,k*2-1,k,p.hot);rect(g,x,y-k,1,k,p.light);if(kind==='lava')line(g,x-k,y,x+k,y+1,p.core);break;
 case 'ember':case 'flame':rect(g,x,y-k*2,1,k*2,p.hot);rect(g,x-1,y-k,k+1,k,p.mid);rect(g,x,y-k,1,k,p.core);break;
 case 'drop':case 'mud':diamond(g,x,y,k,p.mid);rect(g,x,y-k,1,k+1,p.light);break;
 case 'wave':case 'gust':case 'rain':case 'dust':line(g,x-k*2,y+Math.round(k*angle),x+k*2,y-Math.round(k*angle),p.mid);line(g,x-k,y,x+k,y-1,p.light);break;
 case 'fog':case 'cloud':rect(g,x-k*2,y-k,k*4,k*2,p.dark);rect(g,x-k,y-k-1,k*3,k+1,p.mid);rect(g,x-k,y,k*2,1,p.hot);break;
 case 'plasma':diamond(g,x,y,k,p.mid);diamond(g,x,y,Math.max(1,k-1),p.hot);rect(g,x,y,1,1,p.core);break;
 default:diamond(g,x,y,k,p.hot);rect(g,x,y,1,1,p.core);
 }}
function startPoint(s,i){const a=rnd(s.seed+i*5),b=rnd(s.seed+i*5+1),side=i%2?1:-1;const rx=Math.min(s.grand?94:49,s.w*.65+12),ry=Math.min(s.grand?82:48,s.h*.65+12);switch(s.dir){
 case 'rise':return [s.cx+(a-.5)*rx*2,s.groundY+Math.min(4,b*5)];
 case 'fall':return [s.cx+(a-.5)*rx*2,Math.max(2,s.top-b*ry*.55-9)];
 case 'sweep':return [s.cx+side*rx,s.cy+(b-.5)*ry*1.6];
 case 'center':return [s.cx+(a-.5)*rx*1.5,s.cy+(b-.5)*ry*1.5];
 default:return [s.cx+Math.cos(a*Math.PI*2)*rx,s.cy+Math.sin(a*Math.PI*2)*ry];
}}
function clipScene(g,s){const minX=s.grand?0:Math.max(0,Math.min(66,s.left));const maxX=Math.min(g.canvas.width,s.left+s.w+(s.grand?14:10));g.beginPath();g.rect(minX,0,Math.max(0,maxX-minX),Math.min(g.canvas.height,s.groundY+9));g.clip();}
function formation(g,s){const {p,t}=s;if(t<=0||t>=.74)return;const life=Math.sin(Math.PI*cap(t/.74));const count=Math.round((s.grand?24:12)*s.density*(p.tier===3?1.12:1));
 // Large, stepped gathering shapes behind the creature; never a decorative ring.
 const grow=smooth(t/.27)*(1-smooth((t-.47)/.27));
 const band=Math.max(5,Math.min(s.grand?37:20,s.w*.27));
 if(grow>.02){for(let i=0;i<(s.grand?5:3);i++){const u=(i+.5)/(s.grand?5:3),x=s.left+s.w*u,y=s.dir==='rise'?s.groundY-s.h*grow*(.30+rnd(i+s.seed)*.30):s.dir==='fall'?s.top+s.h*grow*.38:s.cy+(rnd(i+s.seed)-.5)*s.h*.55;const k=Math.max(1,Math.round(band*grow*.32));
  g.globalAlpha=.8*life;shard(g,x,y,k,p,s.secondary,i%2?1:-1);}}
 for(let i=0;i<count;i++){const a=rnd(s.seed+i*7+2),b=rnd(s.seed+i*7+3);const lag=a*.13,local=cap((t-lag)/.53);if(t<lag||local>=1)continue;const [x0,y0]=startPoint(s,i);const tx=s.left+s.w*(.12+.76*b),ty=s.top+s.h*(.12+.76*rnd(i*7+s.seed+4));const f=smooth(local);const x=lerp(x0,tx,f),y=lerp(y0,ty,f);const k=Math.max(1,Math.round((s.grand?3:2)*(1-local*.65)*(.6+a)));g.globalAlpha=cap(life*1.3);shard(g,x,y,k,p,i%3?s.primary:s.secondary,(i%2?1:-1));}
 g.globalAlpha=1;
 // Jagged descending discharge at formation, not a continuous glowing beam.
 if(['lightning','asani','thunderstorm','shockstream','plasma','frostvolt'].includes(s.id)&&t>.12&&t<.43){const fade=Math.sin(Math.PI*(t-.12)/.31);g.globalAlpha=fade*.8;let x=s.cx+(rnd(s.seed+8)-.5)*s.w*.5,y=Math.max(0,s.top-15);for(let i=1;i<=5;i++){const nx=s.cx+(rnd(s.seed+i*13)-.5)*s.w*.45,ny=lerp(Math.max(0,s.top-15),s.cy,i/5);line(g,x,y,nx,ny,p.hot,s.grand?2:1);line(g,x,y,nx,ny,p.core);x=nx;y=ny;}g.globalAlpha=1;}
}
function release(g,s){const q=cap((s.t-.62)/.34);if(q<=0||q>=1)return;const count=Math.round((s.grand?20:9)*s.density);g.globalAlpha=(1-q)**.8;
 for(let i=0;i<count;i++){const a=rnd(s.seed+i*11),b=rnd(s.seed+i*11+1),side=i%2?1:-1;let x=s.cx+side*(s.w*.15+(s.w*.37+12)*q)*(.55+.45*a),y=s.top+s.h*(.20+.62*b)+(s.dir==='fall'?q*17:-q*(8+16*a));if(s.dir==='rise')y=lerp(s.groundY,s.top+s.h*b,q);const k=Math.max(1,Math.round((s.grand?3:2)*(1-q*.65)));shard(g,x,y,k,s.p,i%3?s.secondary:s.primary,side);}
 g.globalAlpha=1;
}
export function drawSummonInvokeLayerV2(g,s,layer){if(!s||s.reducedMotion||s.t<=0||s.t>=1)return;g.save();g.imageSmoothingEnabled=false;g.globalCompositeOperation='source-over';clipScene(g,s);
 if(layer==='rear')formation(g,s);else if(layer==='front')release(g,s);
 else if(layer==='ground'&&['rise','fall'].includes(s.dir)&&s.t>.12&&s.t<.91){const q=smooth((s.t-.12)/.27)*(1-smooth((s.t-.62)/.29));g.globalAlpha=q*.8;const n=s.grand?8:4;for(let i=0;i<n;i++){const x=s.groundX+(rnd(s.seed+i*23)-.5)*Math.min(s.w*.9,140),y=s.groundY+2+Math.round(rnd(i+12)*3);rect(g,x,y,Math.max(2,Math.round(q*(3+rnd(i)*8))),1,s.p.mid);rect(g,x,y-1,2,1,s.p.light);} }
 g.restore();}
// Reveal exact indexed sprite, without resizing or altering a single original pixel.
export function drawSummonInvokeBodyV2(g,s,drawBody){if(!s||s.reveal>=1||s.reducedMotion){drawBody();return;}if(s.reveal<=0)return;
 const {w,h,left,top,seed,p}=s;const tile=s.grand?3:2;g.save();g.beginPath();const frontier=[];
 for(let y=0;y<h;y+=tile)for(let x=0;x<w;x+=tile){let axis=s.dir==='rise'?1-y/h:s.dir==='fall'?y/h:s.dir==='sweep'?x/w:Math.hypot((x-w/2)/w,(y-h/2)/h)*1.4;const threshold=cap(axis*.72+rnd(seed+x*19+y*31)*.27);if(threshold<=s.reveal){g.rect(left+x,top+y,Math.min(tile,w-x),Math.min(tile,h-y));if(threshold>s.reveal-.075)frontier.push([x,y]);}}
 g.clip();drawBody();
 // Frontier pixels are clipped both to the revealed region and actual opaque sprite spans.
 if(frontier.length&&s.t<.64){g.beginPath();for(let row=0;row<s.art.rows.length;row++){const y0=Math.round(row*s.scale),hh=Math.round((row+1)*s.scale)-y0;for(const [,start,end] of s.art.rows[row]){const x0=Math.round(start*s.scale);g.rect(left+x0,top+y0,Math.round(end*s.scale)-x0,hh);}}g.clip();g.globalAlpha=.68*(1-smooth((s.t-.49)/.15));for(const [x,y] of frontier)rect(g,left+x,top+y,1,Math.min(tile,h-y),p.light);}
 g.restore();}
