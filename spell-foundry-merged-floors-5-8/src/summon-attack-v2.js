/** E6.1 R2: delivery-aware native indexed pixel animation. No combat state mutation.
 * The source art remains immutable. Posed art has the same materials and is reusable
 * by drawSummonArt and R6's opaque-pixel mask. Cached discrete poses bound work.
 */
export const ATTACK_PROFILES=Object.freeze({
 dragon:{name:'Breath of the dragon',type:'breath',port:[.93,.32],move:5},
 phoenix:{name:'Wing sweep / feather volley',type:'phoenix',port:[.86,.38],move:5},
 hydra:{name:'Four-neck sequential surge',type:'hydra',port:[.94,.44],move:4},
 behemoth:{name:'Heavy foreleg stomp',type:'stomp',port:[.83,.90],move:7},
 kraken:{name:'Tentacle lash',type:'kraken',port:[.90,.62],move:3},
 gargoyle:{name:'Wing-assisted claw rake',type:'gargoyle',port:[.88,.80],move:15},
 golem:{name:'Stone fist hammer',type:'hammer',port:[.85,.75],move:5},
 siren:{name:'Tidal casting gesture',type:'siren',port:[.95,.64],move:2},
 skeleton:{name:'Sword sweep',type:'sword',port:[.74,.52],move:9},
 eagle:{name:'Talon dive',type:'dive',port:[.68,.86],move:18},
 bird:{name:'Beak dart',type:'peck',port:[.73,.43],move:17},
 bat:{name:'Sonic wing snap',type:'bat',port:[.56,.60],move:4},
 hornet:{name:'Stinger thrust',type:'sting',port:[.62,.89],move:14},
 wolf:{name:'Running bite',type:'bite',port:[.95,.46],move:20},
 dog:{name:'Corgi hop bite',type:'dog',port:[.95,.40],move:17},
 cat:{name:'Front paw swipe',type:'swipe',port:[.88,.83],move:12},
 lion:{name:'Roaring pounce',type:'lion',port:[.96,.42],move:18},
 bear:{name:'Heavy paw sweep',type:'bear',port:[.91,.80],move:9},
 boar:{name:'Tusk charge',type:'charge',port:[.96,.60],move:24},
 croc:{name:'Jaw snap',type:'croc',port:[.96,.38],move:10},
 snake:{name:'Coil and strike',type:'snake',port:[.94,.20],move:7},
 turtle:{name:'Shell drive',type:'shell',port:[.82,.61],move:14},
 spider:{name:'Foreleg lunge',type:'spider',port:[.86,.67],move:11},
 frog:{name:'Tongue flick',type:'frog',port:[.84,.28],move:3},
 rat:{name:'Quick dart and nip',type:'rat',port:[.94,.56],move:19},
 slime:{name:'Elastic body slam',type:'slime',port:[.83,.54],move:13},
 sprite:{name:'Fairy casting gesture',type:'sprite',port:[.84,.59],move:3},
});
/** Visual delivery only: never changes range, damage, targets or number of hits. */
export function summonAttackDelivery(creatureId){
 const type=ATTACK_PROFILES[creatureId]?.type;
 return ({breath:'projectile',phoenix:'projectile',hydra:'projectile',siren:'projectile',sprite:'projectile',bat:'sonic',stomp:'ground',kraken:'tether',frog:'tether'})[type]??(type?'melee':'projectile');
}
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
const ramp=(x,a,b)=>smooth((x-a)/(b-a));
const hump=(x,a,b,c)=>x<b?ramp(x,a,b):1-ramp(x,b,c);
const region=(x,y,cx,cy,rx,ry)=>{let d=Math.hypot((x-cx)/rx,(y-cy)/ry);return 1-smooth(d);};
const keyTimes=[0,.08,.16,.24,.34,.43,.52,.64,.76,.88,1];
const poses=new WeakMap();
function phases(t){return {wind:hump(t,0,.16,.34),hit:hump(t,.16,.43,.76),recoil:hump(t,.43,.64,1),a:t};}
/** Counter contact .32, strike .43. Pose local clock is reparameterized, not gameplay timing. */
export function summonAttackClock(progress,kind='strike'){
 const p=clamp(Number.isFinite(progress)?progress:0),contact=kind==='counter'?.32:.43;
 return p<contact?p/contact*.43:.43+(p-contact)/(1-contact)*.57;
}
export function summonAttackFxProgress(progress,kind='strike'){
 const p=clamp(progress),contact=kind==='counter'?.32:.43,wind=kind==='counter'?.08:.12;
 if(p<wind)return null;return p<contact?(p-wind)/(contact-wind)*contact:p;
}
// The coordinate field is expressed in normalized idle-art space. Every native pixel
// is resampled from its source material; never uses CSS filters or RGB interpolation.
function deform(type,x,y,P){
 const {wind:w,hit:h,recoil:r,a}=P;let dx=0,dy=0;
 const front=ramp(x,.38,.93),upper=1-ramp(y,.28,.83),feet=ramp(y,.64,1),rear=1-ramp(x,.18,.68);
 const head=region(x,y,.85,.32,.46,.55),fist=region(x,y,.83,.78,.43,.55);
 const torso=region(x,y,.54,.55,.68,.75),near=region(x,y,.80,.82,.37,.36);
 switch(type){
 case 'breath':{
  let n=region(x,y,.80,.25,.51,.52); dx+=n*(-.09*w+.16*h);dy+=n*(-.13*w+.07*h);dy+=rear*upper*(.10*w-.08*h);dx+=feet*.015*h;break;
 }
 case 'phoenix': case 'dive': case 'peck': case 'bat': case 'sting':{
  let root=type==='bat'?.52:type==='sting'?.60:.59;
  let wing=clamp(Math.abs(x-root)*2.2)*upper;
  let flap=type==='bat'?.26:type==='phoenix'?.29:type==='dive'?.31:type==='peck'?.20:.18;
  dy+=wing*(flap*h-.18*w-.10*r);dx+=(x-root)*wing*(.16*w-.15*h);
  if(type==='phoenix'){dx+=rear*ramp(y,.48,.95)*(-.13*h);dy+=rear*ramp(y,.48,.95)*.12*h;dx+=head*.08*h;}
  if(type==='dive'){dy+=near*.18*h;dx+=near*.12*h;}
  if(type==='peck'){dx+=head*.17*h;dy+=head*.09*h;}
  if(type==='bat'){dx+=region(x,y,.53,.62,.25,.33)*.10*h;dy-=region(x,y,.53,.62,.25,.33)*.07*h;}
  if(type==='sting'){let sting=region(x,y,.43,.86,.4,.43);dx+=sting*.26*h;dy-=sting*.10*h;}
  break;
 }
 case 'hydra':{
  // Four upper-neck zones, staggered through the same single attack event.
  const zones=[[.36,.27],[.61,.11],[.75,.40],[.92,.28]];
  zones.forEach(([cx,cy],i)=>{let z=region(x,y,cx,cy,.27,.39)*(1-ramp(y,.53,.86));let q=hump(a,.09+i*.045,.31+i*.07,.69+i*.045);dx+=z*(.18*q-.055*w);dy+=z*(.06*q-.07*w);});
  dx-=rear*feet*.035*h;break;
 }
 case 'stomp': case 'hammer': case 'bear':{
  let arm=region(x,y,type==='hammer'?.80:.84,.78,.47,.62);
  dx+=arm*(.10*h-.05*w);dy+=arm*(-.27*w+.055*h);
  dx+=head*(.06*h-.025*w);dy+=head*(-.065*w+.055*h);
  dy+=torso*(type==='stomp'?.05:.075)*h;break;
 }
 case 'kraken':{
  let t=region(x,y,.88,.52,.40,.59);dx+=t*(.26*h-.10*w);dy+=t*(-.19*w+.065*h);
  let tail=region(x,y,.29,.77,.48,.38);dx-=tail*.075*h;dy-=tail*.07*h;break;
 }
 case 'gargoyle':{
  dy+=rear*upper*(.20*h-.15*w);dx+=fist*.16*h;dy+=fist*(-.15*w+.04*h);dy+=head*.07*h;break;
 }
 case 'siren':{
  let arm=region(x,y,.90,.64,.20,.40);dx+=arm*(.19*h-.045*w);dy+=arm*(-.15*h+.07*w);
  dy+=head*(-.07*w+.045*h);dx+=rear*.06*w;dy+=rear*(.14*h-.11*w);break;
 }
 case 'sword':{
  // Blade is handled as a rigid material-preserving cutout below; shoulder follows swing.
  let shoulder=region(x,y,.43,.49,.38,.40),grip=region(x,y,.33,.59,.29,.30);dx+=shoulder*(-.05*w+.09*h)+grip*(-.045*w+.17*h);dy+=shoulder*(-.08*w+.025*h)+grip*(-.06*w-.035*h);
  dy+=rear*(1-feet)*(.09*h-.05*w);dx+=head*.05*h;break;
 }
 case 'bite': case 'dog': case 'lion': case 'rat':{
  dx+=head*(.18*h-.08*w);dy+=head*(.11*h-.06*w);
  dx+=near*.13*h;dy+=near*(-.12*h-.05*w);
  let backLeg=region(x,y,.25,.84,.40,.34);dx-=backLeg*.15*h;dy-=backLeg*.08*h;
  dy+=torso*.12*w;dy-=rear*upper*.08*h;break;
 }
 case 'swipe':{
  dx+=near*(.24*h-.065*w);dy+=near*(-.20*w-.12*h);dy+=head*.05*w;dx+=head*.06*h;dy+=rear*upper*(.13*w-.11*h);break;
 }
 case 'charge':{
  dx+=head*.16*h;dy+=head*(.16*w+.08*h);dy+=torso*.06*w;dx+=feet*(x-.5)*.22*h;dy-=feet*.055*h;break;
 }
 case 'croc':{
  let jaw=region(x,y,.86,.51,.36,.26);dy+=jaw*(.15*w-.11*h);dx+=head*.12*h;
  dy+=rear*(.08*h-.09*w);dx-=rear*.07*h;break;
 }
 case 'snake':{
  let neck=front*(1-ramp(y,.35,.90));dx+=neck*(.26*h-.13*w);dy+=neck*(-.15*w+.10*h);dx-=rear*feet*.03*h;break;
 }
 case 'shell':{
  let headT=region(x,y,.93,.50,.28,.43);dx-=headT*(.21*w+.08*h);dy+=headT*.12*w;dy-=feet*.10*h;dy+=torso*.055*w;break;
 }
 case 'spider':{
  dx+=near*(.18*h-.09*w);dy+=near*(-.22*w-.08*h);dx-=rear*feet*.13*h;dy+=torso*.07*w;dx+=head*.09*h;break;
 }
 case 'frog':{
  dx+=head*.10*h;dy+=head*(-.11*w+.06*h);dy+=torso*.12*w;dx+=near*.09*h;break;
 }
 case 'slime':{
  dx+=(x-.5)*(.28*w-.14*h)+.18*h*(1-feet);dy+=(1-y)*(.27*w-.22*h+.13*r);break;
 }
 case 'sprite':{
  let wing=rear*(1-ramp(y,.35,.90));dy+=wing*(.25*h-.13*w);dx-=wing*.12*h;
  let arm=region(x,y,.77,.57,.29,.33);dx+=arm*.20*h;dy-=arm*.16*h;dy+=feet*.13*h;break;
 }
 }
 return [x+dx,y+dy];
}
function spans(row){const out=[];for(let x=0;x<row.length;){let c=row[x],s=x++;while(x<row.length&&row[x]===c)x++;if(c)out.push([c,s,x]);}return out;}
function bladeMask(art,x,y){
 const m=art.pixels[y]?.[x];if(!m)return false;
 if(/^blade/i.test(m))return true;
 // Approved 65x46 skeleton: blade+outline from (1,41) to the grip (21,27).
 // A narrow lower-left polygon keeps cape and legs out of the rigid weapon layer.
 const u=x/art.width*65,v=y/art.height*46;
 return u<=22&&v>=25&&v>=36.5-.66*u&&v<=44.5-.59*u&&(m==='ink'||u<19&&/armor|rim/i.test(m));
}
function warpArt(art,type,t){
 const W=art.width,H=art.height,P=phases(t),pad=Math.ceil(Math.max(W,H)*.36)+3,ww=W+2*pad,hh=H+2*pad;
 const data=Array.from({length:hh},()=>Array(ww).fill(null)),map=new Int32Array(ww*hh).fill(-1);
 const put=(x,y,m,src)=>{if(x>=0&&y>=0&&x<ww&&y<hh){data[y][x]=m;map[y*ww+x]=src;}};
 // Rasterize deformed cell triangles at destination pixel centres. Nearest indexed color;
 // shared cell vertices avoid interpolation seams, including when the pose compresses.
 const verts=Array.from({length:H+1},(_,y)=>Array.from({length:W+1},(_,x)=>{let [u,v]=deform(type,x/W,y/H,P);return [u*W+pad,v*H+pad]}));
 function tri(A,B,C,m,src){
  let det=(B[0]-A[0])*(C[1]-A[1])-(B[1]-A[1])*(C[0]-A[0]);if(Math.abs(det)<1e-8)return;
  let x0=Math.floor(Math.min(A[0],B[0],C[0])),x1=Math.ceil(Math.max(A[0],B[0],C[0]));let y0=Math.floor(Math.min(A[1],B[1],C[1])),y1=Math.ceil(Math.max(A[1],B[1],C[1]));
  for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){let px=x+.5-A[0],py=y+.5-A[1],u=(px*(C[1]-A[1])-py*(C[0]-A[0]))/det,v=((B[0]-A[0])*py-(B[1]-A[1])*px)/det;if(u>=-1e-7&&v>=-1e-7&&u+v<=1.0000001)put(x,y,m,src);}
 }
 function quad(A,B,C,D,m,src){tri(A,B,C,m,src);tri(A,C,D,m,src);}
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){let m=art.pixels[y][x];if(!m||type==='sword'&&bladeMask(art,x,y))continue;quad(verts[y][x],verts[y][x+1],verts[y+1][x+1],verts[y+1][x],m,y*W+x);}
 let bladeTip=null;
 if(type==='sword'){
  const hx=W*(21/65),hy=H*(27/46),[u,v]=deform(type,hx/W,hy/H,P),cx=u*W+pad,cy=v*H+pad;
  const angle=.58*P.wind-2.77*P.hit+.10*P.recoil,co=Math.cos(angle),si=Math.sin(angle);
  const vtx=(x,y)=>{let dx=x-hx,dy=y-hy;return [cx+dx*co-dy*si,cy+dx*si+dy*co];};
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(!bladeMask(art,x,y))continue;quad(vtx(x,y),vtx(x+1,y),vtx(x+1,y+1),vtx(x,y+1),art.pixels[y][x],y*W+x);}
  bladeTip=vtx(W*(2/65),H*(41/46)).map(n=>n-pad);
 }
 let x0=ww,y0=hh,x1=-1,y1=-1;for(let y=0;y<hh;y++)for(let x=0;x<ww;x++)if(data[y][x]){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
 if(x1<x0)return null;
 // Keep the source origin as a stable reference (no artificial re-centering).
 x0=Math.min(x0,pad);y0=Math.min(y0,pad);x1=Math.max(x1,pad+W-1);y1=Math.max(y1,pad+H-1);
 const pixels=data.slice(y0,y1+1).map(row=>row.slice(x0,x1+1)),width=x1-x0+1,height=y1-y0+1,sourceMap=Array.from({length:height},(_,y)=>map.slice((y+y0)*ww+x0,(y+y0)*ww+x1+1));
 const offsetX=x0-pad,offsetY=y0-pad;
 const poseArt={...art,width,height,pixels,rows:pixels.map(spans),attackPoseSource:art,attackSourceMap:sourceMap};
 return {art:poseArt,offsetX,offsetY,bladeTip};
}
function nativePose(art,type,t){if(t===0||t===1)return {art,offsetX:0,offsetY:0,bladeTip:null};let cache=poses.get(art);if(!cache){cache=new Map();poses.set(art,cache);}const k=type+':'+t;if(!cache.has(k)){if(cache.size>=24)cache.delete(cache.keys().next().value);cache.set(k,warpArt(art,type,t));}return cache.get(k)??{art,offsetX:0,offsetY:0,bladeTip:null};}
/** Return final art and screen coordinates for both body renderer and R6 mask.
 * `left/top` are IDLE render origin, `groundX/Y` are existing anchors. */
export function prepareSummonAttackPose({creatureId,art,left,top,scale,groundX,groundY,grand=false,progress=0,kind='strike',reducedMotion=false,targetX=216,targetY=124,canvasWidth=320,blocked=false}={}){
 const pr=ATTACK_PROFILES[creatureId];if(!pr||!art?.pixels||!(scale>0)||![left,top,groundX,groundY].every(Number.isFinite))return null;
 const delivery=summonAttackDelivery(creatureId);
 const t=summonAttackClock(progress,kind),p=phases(t),q=keyTimes.reduce((a,b)=>Math.abs(b-t)<Math.abs(a-t)?b:a,0);
 const frame=reducedMotion?nativePose(art,pr.type,0):nativePose(art,pr.type,q);
 const strength=kind==='counter'?.72:1,air=art.lift>0;
 let dx=reducedMotion?0:Math.round((pr.move*p.hit-pr.move*.27*p.wind-pr.move*.08*p.recoil)*strength*(grand?.75:1));
 let dy=0;if(!reducedMotion){if(['dive','peck','sting'].includes(pr.type))dy=Math.round((-8*p.wind+7*p.hit)*strength);else if(['dog','lion','gargoyle','rat','spider'].includes(pr.type))dy=Math.round(-Math.min(8,art.height*scale*.10)*p.hit*strength);else if(pr.type==='stomp')dy=Math.round(-3*p.wind);else if(air)dy=Math.round(-4*p.wind+2*p.hit);}
 // Bound the motion of giant poses; never shove an XXL guardian off the left/top edge.
 let L=left+Math.round(frame.offsetX*scale),T=top+Math.round(frame.offsetY*scale);
 let minX=frame.art.width,maxX=-1,minY=frame.art.height,maxY=-1;for(let y=0;y<frame.art.rows.length;y++)for(const [,a,b] of frame.art.rows[y]){minX=Math.min(minX,a);maxX=Math.max(maxX,b);minY=Math.min(minY,y);maxY=Math.max(maxY,y+1);}
 const ol=L+Math.round(minX*scale),or=L+Math.round(maxX*scale),ot=T+Math.round(minY*scale),ob=T+Math.round(maxY*scale);
 let port=frame.bladeTip&&pr.type==='sword'?frame.bladeTip:deform(pr.type,...pr.port,phases(reducedMotion?0:q)).map((v,i)=>v*(i?art.height:art.width));
 if(reducedMotion||q===0||q===1)port=[pr.port[0]*art.width,pr.port[1]*art.height];
 if(!reducedMotion&&delivery==='melee'){
  const aim=targetX-(blocked?13:5), idlePort=left+port[0]*scale;
  // Approach during anticipation and strike; retreat smoothly. Stop before the ward.
  const approach=hump(t,.10,.43,.94), room=Math.max(0,targetX+(blocked?-10:9)-or);
  const distance=Math.max(0,Math.min(aim-idlePort,room));
  dx=Math.round(distance*approach- Math.min(5,pr.move*.27)*p.wind);
  if(air){const aimY=Math.min(groundY-5,targetY+4),drop=aimY-(top+port[1]*scale);dy=Math.round(drop*approach-5*p.wind);}
 }
 if(!reducedMotion&&q!==0&&q!==1){
  if(or-ol<=canvasWidth)dx=clamp(dx,-ol,canvasWidth-or);
  const lo=2-ot,hi=groundY+(air?0:2)-ob;
  if(lo<=hi)dy=clamp(dy,lo,hi);else dy=clamp(dy,-ot,179-ob);
 }
 // Do not introduce a different idle origin if a source already clips.
 
 let sourceX=left+dx+port[0]*scale,sourceY=top+dy+port[1]*scale;
 sourceX=clamp(sourceX,2,Math.max(2,targetX-8));sourceY=clamp(sourceY,3,groundY);
 return {art:frame.art,left:L+dx,top:T+dy,scale,groundX:groundX+dx,groundY,grand,sourceX:Math.round(sourceX),sourceY:Math.round(sourceY),targetX,targetY,profile:pr,delivery,phase:t,progress,kind,reducedMotion,baseArt:art};
}
/** Transform the original mark via the same source-pixel map; do not refit the rune each pose. */
export function mapSummonAttackMark(art,mark){
 if(!art.attackSourceMap)return mark;
 const W=art.attackPoseSource.width,colors=new Map(mark.map(([x,y,c])=>[y*W+x,c])),out=[];
 for(let y=0;y<art.height;y++)for(let x=0;x<art.width;x++){let c=colors.get(art.attackSourceMap[y][x]);if(c)out.push([x,y,c]);}return out;
}
/** Frog tongue is an ephemeral anatomical extension, not a new attack or damage event. */
export function drawSummonAttackAnatomy(g,pose,{blocked=false,damaging=true,palette=null}={}){
 if(!pose||pose.reducedMotion||!['frog','kraken'].includes(pose.profile.type))return;
 if(pose.profile.type==='kraken'){
  const reach=hump(pose.phase,.16,.43,.76);if(reach<=0)return;
  const x0=pose.sourceX,y0=pose.sourceY,tx=pose.targetX-(blocked?13:5),ty=pose.targetY;
  const x1=x0+(tx-x0)*reach,y1=y0+(ty-y0)*reach,span=Math.hypot(x1-x0,y1-y0);
  if(span<3)return;
  const mid=palette?.midtone??'#6a5f81',light=palette?.highlight??'#c4a994',dark=palette?.shadow??'#392f4f';
  g.save();const n=Math.ceil(span),width=pose.grand?9:5;
  for(let i=0;i<=n;i++){const u=i/n,x=Math.round(x0+(x1-x0)*u),y=Math.round(y0+(y1-y0)*u-Math.sin(Math.PI*u)*Math.min(13,span*.19));const w=Math.max(2,Math.round(width*(1-u*.76)));g.fillStyle='#201a2d';g.fillRect(x,y-Math.floor(w/2),2,w);g.fillStyle=dark;g.fillRect(x,y-Math.floor(w/2)+1,2,Math.max(1,w-2));g.fillStyle=mid;g.fillRect(x,y-1,2,Math.max(1,w-3));if(i%4===0&&w>=4){g.fillStyle=light;g.fillRect(x,y+1,2,1);}}
  g.restore();return;
 }
 if(!damaging&&!blocked)return;
 const p=pose.phase,reach=hump(p,.21,.43,.67);if(reach<=0)return;
 const x0=pose.sourceX,y0=pose.sourceY,tx=pose.targetX-(blocked?12:4),ty=pose.targetY;
 const x1=x0+(tx-x0)*reach,y1=y0+(ty-y0)*reach;
 const c=palette?.highlight??'#e2a298',dark=palette?.shadow??'#552d48';
 g.save();const n=Math.max(1,Math.ceil(Math.hypot(x1-x0,y1-y0)));for(let i=0;i<=n;i++){let q=i/n,x=Math.round(x0+(x1-x0)*q),y=Math.round(y0+(y1-y0)*q+Math.sin(q*Math.PI)*2);g.fillStyle='#241a30';g.fillRect(x,y-1,2,3);g.fillStyle=dark;g.fillRect(x,y,2,2);g.fillStyle=c;g.fillRect(x,y,1,1);}g.fillStyle=c;g.fillRect(Math.round(x1)-1,Math.round(y1)-1,3,3);g.restore();
}
