/** Spell Foundry F90: standalone authored pixel VFX. Presentation only.
 * No game imports, state writes, clocks, or RNG. Coordinates are logical pixels.
 * Chain endpoints and attack progress MUST come from actual runtime events.
 */
export const PALETTE=Object.freeze({ink:'#101820',shadow:'#243039',steel:'#45545c',rim:'#81918f',silver:'#c0c9bd',deep:'#123b36',jade:'#206956',green:'#44a982',mint:'#8bdec0',pale:'#d6ffdf'});
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
const smooth=n=>{n=clamp(n);return n*n*(3-2*n)};
const mix=(a,b,t)=>a+(b-a)*t;
const finite=(...n)=>n.every(Number.isFinite);
function buffer(width,height){const map=new Map();return {put(x,y,color){x=Math.round(x);y=Math.round(y);if(x>=0&&x<width&&y>=0&&y<height)map.set(y*width+x,{x,y,color:PALETTE[color]||color});},pixels(){return [...map.values()].sort((a,b)=>a.y-b.y||a.x-b.x)}}}
function pathPoint(a,b,sag,t){return {x:mix(a.x,b.x,t),y:mix(a.y,b.y,t)+4*sag*t*(1-t)}}
function validPoint(p){return p&&finite(p.x,p.y)}
function link(out,x,y,angle,flat,light){
 const cs=Math.cos(angle),sn=Math.sin(angle),rx=4.7,ry=flat?1.55:3.15;
 for(let py=Math.floor(y-6);py<=Math.ceil(y+6);py++)for(let px=Math.floor(x-6);px<=Math.ceil(x+6);px++){
  const dx=px-x,dy=py-y,u=dx*cs+dy*sn,v=-dx*sn+dy*cs;
  const d=(u/rx)**2+(v/ry)**2;
  if(d>1.17)continue;
  if(!flat&&(u/2.7)**2+(v/1.30)**2<1)continue;
  let c=d>.89?'ink':v<-.5?'rim':'steel';
  if(d<.89&&v>1.0)c='shadow';
  if(d<.85&&v<-.9&&u<1.8)c='silver';
  if(light&&d<.92&&v<.15)c=light===2?'mint':'green';
  out.put(px,py,c);
 }
}
/** A chain is one relationship; invoke once per actual surviving seal/pillar.
 * breakProgress undefined = intact; 0..1 = break and retract; >=1 = empty.
 * Caller owns the transient after a destruction event. Do not resurrect dead pillars.
 */
export function chainPixels({from,to,phase=0,sag=7,breakProgress,reducedMotion=false,width=320,height=180}={}){
 if(!validPoint(from)||!validPoint(to)||!finite(phase,sag,width,height))return [];
 const breaking=breakProgress!==undefined;if(breaking&&!Number.isFinite(breakProgress))return [];
 const p=breaking?clamp(breakProgress):0;if(breaking&&(p>=1||(reducedMotion&&p>=.35)))return [];
 const dist=Math.hypot(to.x-from.x,to.y-from.y);if(dist<2)return [];
 const b=buffer(width,height),count=Math.max(2,Math.ceil(dist/6.4)),w=reducedMotion?0:phase*Math.PI*2;
 const split=.46,sg=clamp(sag,-25,25);const gap=breaking?.04+.40*smooth(p):0;
 for(let i=0;i<=count;i++){
  let t=i/count;if(breaking&&Math.abs(t-split)<gap)continue;
  const q=pathPoint(from,to,sg,t);let a=Math.atan2(to.y-from.y+4*sg*(1-2*t),to.x-from.x);
  if(breaking){const side=t<split?-1:1;const edge=1-Math.min(1,Math.abs(t-split)/.55);q.y+=Math.sin(p*Math.PI)*edge*(side===-1?6:-4);a+=side*p*edge*.35;}
  const glow=reducedMotion?0:Math.sin(w- t*8)> .94?2:Math.sin(w-t*8)>.70?1:0;
  link(b,q.x,q.y,a,i%2===1,glow);
 }
 if(breaking&&!reducedMotion){const q=pathPoint(from,to,sg,split);for(let i=0;i<14;i++){const a=i*2.399963,life=clamp(1-p*(1.1+(i%4)*.14));if(life<=0)continue;const r=(9+i%5*3)*p;const x=q.x+Math.cos(a)*r,y=q.y+Math.sin(a)*r+14*p*p;b.put(x,y,i%3===0?'pale':'green');if(i%3===0&&p<.48)b.put(x+1,y,'jade');}}
 return b.pixels();
}
// Hand-designed polygon silhouettes. Local blade tip faces left. The lower tail
// sweeps back to the right, unlike a thin line or uniform geometric ring.
export const SCYTHE_BANDS=Object.freeze([
 ['deep',[[91,1],[65,5],[42,14],[23,28],[10,46],[3,65],[5,84],[16,98],[37,104],[68,97],[89,81],[60,88],[39,83],[29,70],[30,55],[39,40],[55,25],[76,12]]],
 ['jade',[[90,3],[62,10],[37,23],[20,41],[11,60],[11,76],[20,90],[40,96],[65,90],[84,82],[59,84],[40,78],[32,66],[33,52],[43,37],[60,21]]],
 ['green',[[88,4],[61,12],[38,27],[22,45],[15,62],[16,75],[25,87],[43,91],[66,86],[79,83],[55,82],[37,74],[29,62],[31,49],[42,34],[61,19]]],
 ['mint',[[88,4],[62,13],[39,29],[24,47],[18,61],[19,73],[28,82],[42,87],[61,85],[75,83],[53,81],[35,72],[27,61],[30,48],[42,33],[60,18]]],
 ['pale',[[85,5],[63,15],[42,30],[28,46],[22,61],[23,70],[32,79],[42,83],[60,84],[48,80],[33,70],[27,60],[32,47],[44,32],[62,18]]]
]);
function inside(x,y,poly){let ok=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){let [xi,yi]=poly[i],[xj,yj]=poly[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)ok=!ok;}return ok;}
function fillPoly(b,poly,c){const xs=poly.map(q=>q[0]),ys=poly.map(q=>q[1]);for(let y=Math.floor(Math.min(...ys));y<=Math.ceil(Math.max(...ys));y++)for(let x=Math.floor(Math.min(...xs));x<=Math.ceil(Math.max(...xs));x++)if(inside(x+.5,y+.5,poly))b.put(x,y,c)}
/** A broad crescent projectile, not a weapon or boss sprite. Progress is visual only.
 * source/target are current actor anchors; impactProgress must be event-aligned.
 * direction auto mirrors if the target is on the right. */
export function scythePixels({source,target,progress=0,impactProgress=.66,scale=.86,reducedMotion=false,width=320,height=180}={}){
 if(!validPoint(source)||!validPoint(target)||!finite(progress,impactProgress,scale,width,height)||scale<=0)return [];
 const p=clamp(progress);if(p<=0||p>=1)return [];
 const hit=clamp(impactProgress,.30,.86),travel=smooth(p/hit),decay=clamp((p-hit)/(1-hit)),dir=target.x<=source.x?1:-1;
 if(reducedMotion&&Math.abs(p-hit)>.12)return [];
 const b=buffer(width,height),cx=mix(source.x,target.x,travel),cy=mix(source.y,target.y,travel),grow=reducedMotion?1:mix(.35,1,smooth(p/.20));
 const sy=scale*grow*(1-.28*smooth(decay)),sx=scale*grow*(1-.10*decay);
 const tx=(x,y,dx=0,dy=0)=>[cx+dir*((x-28)*sx+dx),cy+(y-55)*sy+dy];
 // Two dark trailing cuts, separate from the dense front blade.
 if(!reducedMotion&&decay<.60){for(const [i,dx] of [[0,18],[1,33]]){let s=1-i*.17;const poly=[[76,8],[42,19],[19,43],[12,64],[19,81],[40,91],[69,87],[50,84],[29,75],[25,61],[35,40],[57,20]].map(([x,y])=>tx(x*s,y*s,dx,5+i*4));fillPoly(b,poly,i===0?'deep':'shadow');}}
 const bands=decay<.30?SCYTHE_BANDS:decay<.68?SCYTHE_BANDS.slice(0,3):SCYTHE_BANDS.slice(0,2);
 if(decay<.85)for(const [c,pts] of bands)fillPoly(b,pts.map(([x,y])=>tx(x,y)),c);
 // Sparse, deterministic torn-off slivers; no random jitter or full-screen flash.
 if(!reducedMotion){for(let i=0;i<18;i++){const f=i/18,ang=-1.55+f*3.1;const radius=20+13*(i%3);const q=decay>0?decay:travel*.30;const x=cx+dir*(Math.cos(ang)*radius+q*(i%4+1)*9),y=cy+Math.sin(ang)*(radius+q*18);if((i%5)/5+decay>.98)continue;b.put(x,y,i%4===0?'pale':'green');if(i%4===0)b.put(x+dir,y+1,'jade');}}
 return b.pixels();
}
export function drawPixels(ctx,pixels){ctx.save();try{for(let i=0;i<pixels.length;){const p=pixels[i];let j=i+1;while(j<pixels.length&&pixels[j].y===p.y&&pixels[j].x===pixels[j-1].x+1&&pixels[j].color===p.color)j++;ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,j-i,1);i=j}}finally{ctx.restore()}return pixels.length}
export const drawNetherChain=(ctx,options)=>drawPixels(ctx,chainPixels(options));
export const drawSoulScythe=(ctx,options)=>drawPixels(ctx,scythePixels(options));
