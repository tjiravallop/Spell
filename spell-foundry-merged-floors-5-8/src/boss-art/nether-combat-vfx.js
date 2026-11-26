/** F90 presentation-only indexed pixel effects. No clocks, RNG or game-state mutations.
 * Caller supplies real actor anchors and event-local progress, not guessed combat turns.
 */
import { drawPixels, chainPixels, scythePixels } from './nether-vfx-v1.js';
export { drawNetherChain, drawSoulScythe } from './nether-vfx-v1.js';
export const NETHER_FX_PALETTE=Object.freeze({void:'#12101d',dark:'#292039',purple:'#533655',violet:'#9765a7',pink:'#e6b3d9',blood:'#742e48',red:'#bf5160',rose:'#ff9c9b',deep:'#123b36',jade:'#206956',green:'#44a982',mint:'#8bdec0',pale:'#d6ffdf',iceDark:'#22465f',ice:'#3d81aa',cyan:'#7bd1e6',white:'#e9ffff',steel:'#81918f',silver:'#c0c9bd',ember:'#d98546',gold:'#ffd0a1'});
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n)), mix=(a,b,t)=>a+(b-a)*t, smooth=t=>{t=clamp(t);return t*t*(3-2*t)}, point=p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y), TAU=Math.PI*2;
function buffer(w,h){const m=new Map();return {put(x,y,c){x=Math.round(x);y=Math.round(y);if(x>=0&&x<w&&y>=0&&y<h)m.set(y*w+x,{x,y,color:NETHER_FX_PALETTE[c]??c})},merge(ps){for(const p of ps)this.put(p.x,p.y,p.color)},out(){return [...m.values()].sort((a,b)=>a.y-b.y||a.x-b.x)}}}
function line(b,a,z,c,th=1){const n=Math.max(1,Math.ceil(Math.max(Math.abs(z.x-a.x),Math.abs(z.y-a.y))));for(let i=0;i<=n;i++){const x=mix(a.x,z.x,i/n),y=mix(a.y,z.y,i/n);b.put(x,y,c);if(th>1)b.put(x,y+1,c);if(th>2)b.put(x+1,y,c)}}
function poly(b,pts,c){const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);for(let y=Math.floor(Math.min(...ys));y<=Math.ceil(Math.max(...ys));y++)for(let x=Math.floor(Math.min(...xs));x<=Math.ceil(Math.max(...xs));x++){let inside=false;for(let i=0,j=pts.length-1;i<pts.length;j=i++){const [a,d]=pts[i],[e,f]=pts[j];if((d>y+.5)!==(f>y+.5)&&x+.5<(e-a)*(y+.5-d)/(f-d)+a)inside=!inside}if(inside)b.put(x,y,c)}}
function ring(b,o,rx,ry,c,phase=0,gaps=0){const n=Math.ceil(Math.max(rx,ry)*7);for(let i=0;i<n;i++){const a=i/n*TAU;if(gaps&&Math.sin(a*gaps+phase)<-.28)continue;b.put(o.x+Math.cos(a)*rx,o.y+Math.sin(a)*ry,c)}}
function diamond(b,x,y,r,c){for(let dy=-r;dy<=r;dy++)for(let dx=-(r-Math.abs(dy));dx<=r-Math.abs(dy);dx++)b.put(x+dx,y+dy,c)}
function spark(b,o,p,colors,n=14,r=24){for(let i=0;i<n;i++){const a=i*2.399963;const d=r*(.35+(i%5)*.15)*smooth(p);if(p> .74+(i%4)*.07)continue;const x=o.x+Math.cos(a)*d,y=o.y+Math.sin(a)*d+8*p*p;b.put(x,y,colors[i%colors.length]);if(i%4===0&&p<.65)b.put(x,y-1,colors[(i+1)%colors.length])}}
function soul(b,x,y,s,colors,dir=1){const shape=[[0,-7],[3,-4],[4,0],[2,4],[0,5],[-2,3],[-5,5],[-3,0],[-3,-4]].map(([a,d])=>[x+a*s*dir,y+d*s]);poly(b,shape,colors[0]);diamond(b,x,y-1,Math.max(1,Math.round(s*2)),colors[1]);b.put(x+dir,y-2,colors[2]);}
function stream(b,a,z,p,colors,reduced=false,arc=22){const n=reduced?3:7;for(let i=0;i<n;i++){const t=p*1.6-i*.10;if(t<0||t>1)continue;const x=mix(a.x,z.x,t),y=mix(a.y,z.y,t)-Math.sin(t*Math.PI)*arc+Math.sin(t*TAU+i)*2;for(let j=1;j<=4;j++){const u=t-j*.022;if(u<0)continue;const xx=mix(a.x,z.x,u),yy=mix(a.y,z.y,u)-Math.sin(u*Math.PI)*arc;diamond(b,xx,yy,Math.max(1,3-j),colors[0])}soul(b,x,y,i%3===0?1:.65,colors,z.x<a.x?-1:1)}}
function glyph(b,o,r,p,colors,stable=false){const phi=stable?0:p*TAU;ring(b,o,r,r,colors[0],phi,5);ring(b,o,r-3,r-3,colors[1],-phi,3);for(let i=0;i<6;i++){const a=i*TAU/6;const a0={x:o.x+Math.cos(a)*r,y:o.y+Math.sin(a)*r},a1={x:o.x+Math.cos(a+2*TAU/6)*r,y:o.y+Math.sin(a+2*TAU/6)*r};if(i%2===0)line(b,a0,a1,colors[0]);diamond(b,a0.x,a0.y,1,colors[2])}}
function frost(b,a,z,p,hit,reduced){const travel=smooth(p/hit),decay=clamp((p-hit)/(1-hit)),dx=z.x-a.x,dy=z.y-a.y,d=Math.hypot(dx,dy)||1,ux=dx/d,uy=dy/d,vx=-uy,vy=ux,head={x:mix(a.x,z.x,travel),y:mix(a.y,z.y,travel)},L=(reduced?23:48)*(1-.35*decay),W=8*(1-.6*decay);if(decay<.8){const q=(u,v)=>[head.x+ux*u+vx*v,head.y+uy*u+vy*v];for(const [c,w,l] of [['iceDark',W,L],['ice',W*.72,L*.92],['cyan',W*.4,L*.75],['white',W*.15,L*.55]])poly(b,[q(4,0),q(-l*.35,-w),q(-l,-w*.3),q(-l*.8,0),q(-l,w*.3),q(-l*.35,w)],c)}if(!reduced&&p>hit)spark(b,z,decay,['ice','cyan','white'],18,27)}
function sealBurst(b,o,p,reduced=false){const r=4+32*smooth(p);ring(b,o,r,Math.max(3,r*.33),'jade',0,7);ring(b,o,r-3,Math.max(2,r*.30),'mint',0,5);if(!reduced)spark(b,o,p,['steel','silver','green','mint'],22,36)}
/** options: kind, source, target, progress, impactProgress, pillars (array of {id,from,to}),
 * ground, reducedMotion, element, width/height. Source/target always logical points.
 * For phase transition source=chest, ground=ground anchor. pillars are pre-event snapshots.
 */
export function netherCombatPixels({kind,source,target,progress=0,impactProgress=.62,pillars=[],ground,reducedMotion=false,element,width=320,height=180}={}){
 if(!Number.isFinite(progress)||progress<0||progress>=1||!Number.isInteger(width)||!Number.isInteger(height)||width<1||height<1)return [];
 const p=progress,hit=clamp(Number.isFinite(impactProgress)?impactProgress:.62,.28,.85),b=buffer(width,height),g=point(ground)?ground:source;
 const src=point(source),dst=point(target);const green=['jade','green','pale'],red=['blood','red','rose'],ice=['iceDark','cyan','white'];
 if(reducedMotion&&p>.75)return [];
 switch(kind){
 case 'soul-transfer': case 'soul-drain': case 'ward-transfer':
  if(src&&dst){const c=kind==='ward-transfer'?red:green;stream(b,source,target,p,c,reducedMotion,kind==='soul-drain'?16:26);if(p>.56){ring(b,target,7+8*smooth((p-.56)/.44),5+4*p,c[1],0,4);if(!reducedMotion)spark(b,target,(p-.56)/.44,c,8,12)}}break;
 case 'curse-mark': if(dst){glyph(b,{x:target.x,y:target.y-15},12,p,red,reducedMotion);if(!reducedMotion)spark(b,target,p,red,11,20)}break;
 case 'frost-charge': case 'nether-charge': if(src){const c=kind==='frost-charge'?ice:green;const r=7+14*smooth(p);glyph(b,source,r,p,c,reducedMotion);for(let i=0;i<(reducedMotion?4:8);i++){const a=i*TAU/8+(reducedMotion?0:p*1.8);diamond(b,source.x+Math.cos(a)*r,source.y+Math.sin(a)*r,2,c[1])}}break;
 case 'frost-shot': if(src&&dst)frost(b,source,target,p,hit,reducedMotion);break;
 case 'pillar-break': if(src)sealBurst(b,source,p,reducedMotion);break;
 case 'broken-seal': case 'sacrifice': if(src){for(const q of pillars){if(!point(q.from)||!point(q.to))continue;b.merge(chainPixels({from:q.from,to:q.to,breakProgress:clamp(p/.48),phase:p,sag:5,reducedMotion,width,height}));if(kind==='sacrifice'){stream(b,q.to,source,clamp(p*1.08),green,reducedMotion,24);if(p<.55)sealBurst(b,q.to,p/.55,reducedMotion)}}if(point(g))sealBurst(b,g,p,reducedMotion);if(p>.33&&p<.87){const r=9+23*Math.sin((p-.33)/.54*Math.PI);glyph(b,source,r,p,kind==='sacrifice'?['purple','green','pale']:green,reducedMotion)}}break;
 case 'purge': if(src){const c=element==='fire'?['blood','ember','gold']:element==='lightning'?ice:['jade','mint','pale'];const r=12+18*smooth(p);ring(b,source,r,r*.7,c[1],p*3,5);ring(b,source,r-3,(r-3)*.7,c[2],-p*2,6);if(!reducedMotion)spark(b,source,p,c,18,28)}break;
 case 'scythe': case 'climax': if(src&&dst){if(kind==='scythe')b.merge(scythePixels({source,target,progress:p,impactProgress:hit,scale:.7,reducedMotion,width,height}));else{if(!reducedMotion){for(let i=2;i>=1;i--){const offset=i*.065,pp=clamp((p-offset)/(1-offset));b.merge(scythePixels({source:{x:source.x,y:source.y+i*13},target:{x:target.x,y:target.y+i*8},progress:pp,impactProgress:clamp((hit-offset)/(1-offset),.3,.86),scale:.83+i*.08,width,height}))}}b.merge(scythePixels({source,target,progress:p,impactProgress:hit,scale:1.1,reducedMotion,width,height}));if(p>=hit&&!reducedMotion)spark(b,target,(p-hit)/(1-hit),green,24,46)}}break;
 }
 return b.out();
}
export const drawNetherCombat=(ctx,opts)=>drawPixels(ctx,netherCombatPixels(opts));
/** Presentation mapping for actual event objects; resolveKind(id) must include dead/sacrificed actors.
 * Charge/attack may target summon; caller resolves actual target and contact point. No inferred turns.
 */
export function netherEventKind(e,resolveKind=()=>null){if(!e)return null;const s=e.sourceKind??resolveKind(e.source);if(e.type==='boss-phase'&&s==='nether_dread_lord'&&e.phase===2)return e.mode==='sacrifice'?'sacrifice':e.mode==='broken'?'broken-seal':null;if(e.type==='heal'&&s==='nether_dread_lord'&&e.isSoulDrain&&e.amount>0)return 'soul-drain';if(e.type==='heal'&&s==='nether_leech_pillar'&&e.amount>0)return 'soul-transfer';if(e.type==='ward-grant'&&s==='nether_curse_pillar')return 'ward-transfer';if(e.type==='nether-curse'&&s==='nether_dread_lord')return 'curse-mark';if(e.type==='charge'&&s==='nether_doom_pillar')return 'frost-charge';if(e.type==='attack'&&s==='nether_doom_pillar')return 'frost-shot';if(e.type==='charge'&&s==='nether_dread_lord')return 'nether-charge';if(e.type==='attack'&&s==='nether_dread_lord')return e.ultimate?'climax':'scythe';if(e.killed&&['nether_leech_pillar','nether_curse_pillar','nether_doom_pillar'].includes(e.targetKind??resolveKind(e.target)))return 'pillar-break';return null}
