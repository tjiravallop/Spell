/** E6.2 R1 — deterministic, indexed species-specific idle animation.
 *  Presentation only. No asset mutation, no per-element sprite duplication.
 */
const TAU=Math.PI*2;
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
const ramp=(x,a,b)=>smooth((x-a)/(b-a));
const zone=(x,y,cx,cy,rx,ry)=>1-smooth(Math.hypot((x-cx)/rx,(y-cy)/ry));
// Periods intentionally vary by species; fast wing flutter isn't fast combat pacing.
const profile=(name,period,breath,hover=0)=>Object.freeze({name,period,breath,hover});
export const IDLE_PROFILES=Object.freeze({
 dragon:profile('Slow chest breath · folded wing and tail',3200,.028),
 phoenix:profile('Broad wing beats · flowing tail feathers',1600,.012,2),
 hydra:profile('Four staggered necks · planted coils',5200,.012),
 behemoth:profile('Heavy breathing · mane and head settling',4700,.030),
 kraken:profile('Independent curling tentacles · slow mantle',4200,.018),
 gargoyle:profile('Stone wings flex · low crouched breathing',3900,.021),
 golem:profile('Massive shoulders rise · fists stay planted',4800,.026),
 siren:profile('Hair and tail fin drift · buoyant hover',3900,.015,2),
 skeleton:profile('Cape sway · steady sword and shield',3400,.006),
 eagle:profile('Measured wing beats · talon tuck',1450,.010,2),
 bird:profile('Light wing beats · feather flick',1050,.010,2),
 bat:profile('Membrane wing flap · hanging legs',1150,.008,2),
 hornet:profile('Rapid wing flutter · stable abdomen',640,.008,1),
 wolf:profile('Alert head · raised tail · breathing',3300,.029),
 dog:profile('Corgi ear twitch · rump and chest motion',2600,.035),
 cat:profile('Slow tail sway · alert ears',3200,.025),
 lion:profile('Mane settles · tail tip flick · breathing',3900,.025),
 bear:profile('Heavy torso breath · head tilt',4100,.035),
 boar:profile('Snout sniff · bristles and shoulder breath',2900,.030),
 croc:profile('Slow tail curl · subtle jaw flex',4200,.020),
 snake:profile('Head and neck sway · resting coils',3500,.010),
 turtle:profile('Neck extends · steady armored shell',4500,.008),
 spider:profile('Abdomen pulses · upper leg joints flex',2800,.025),
 frog:profile('Throat pulse · crouched body breath',2400,.032),
 rat:profile('Nose twitch · tail arc',2300,.026),
 slime:profile('Elastic squash and rebound · grounded base',2500,0),
 sprite:profile('Fairy wing flutter · hovering feet',880,.010,2),
});
const FRAMES=24,cache=new WeakMap();
// Shared continuous vertex field; body materials are sampled at native resolution.
// Each component is localized. Ground contacts never follow a global bob.
function field(id,x,y,t,p,air){
 const a=t*TAU,s=Math.sin(a),c=Math.cos(a),b=(1-c)/2;
 const wave=(n=1,phase=0)=>(Math.sin(n*a+phase)-Math.sin(phase))*.65;
 let dx=(x-.5)*p.breath*b*.35,dy=-p.breath*b*(1-y);
 const z=(cx,cy,rx,ry)=>zone(x,y,cx,cy,rx,ry);
 const move=(w,h,k)=>{dx+=w*h;dy+=w*k;};
 const rear=1-ramp(x,.15,.60),upper=1-ramp(y,.32,.80);
 switch(id){
 case 'dragon': move(z(.27,.22,.38,.40),-.035*s,.10*s);move(z(.17,.76,.31,.30),-.045*wave(1,.5),.055*wave(1,.5));move(z(.83,.21,.29,.31),.018*s,-.030*b);break;
 case 'hydra': [[.30,.32],[.60,.14],[.72,.46],[.91,.30]].forEach(([cx,cy],i)=>{const w=z(cx,cy,.25,.30),q=wave(1,i*1.3);move(w,.052*q,.035*wave(1,i*1.3+1));});break;
 case 'behemoth':move(z(.49,.30,.47,.48),.008*s,-.030*b);move(z(.79,.25,.28,.35),.020*s,.023*s);move(z(.34,.27,.42,.40),.020*wave(1,.4),-.025*wave(1,.4));break;
 case 'kraken':[[.08,.41],[.25,.73],[.76,.17],[.93,.51],[.77,.79]].forEach(([cx,cy],i)=>move(z(cx,cy,.26,.28),.065*wave(1,i*1.1),.075*wave(1,i*1.1+1.2)));move(z(.47,.21,.38,.38),.014*s,-.025*b);break;
 case 'gargoyle':move(z(.28,.13,.43,.42),.025*s,.072*s);move(z(.69,.14,.35,.40),-.018*wave(1,.4),.060*wave(1,.4));move(z(.09,.76,.29,.27),-.034*s,.040*s);break;
 case 'golem':move(z(.27,.27,.38,.50),-.015*b,-.039*b);move(z(.69,.23,.42,.40),.012*b,-.029*b);move(z(.80,.40,.25,.26),.009*s,.013*s);break;
 case 'siren':move(z(.31,.40,.40,.42),.035*wave(1,.5),.075*wave(1,.5));move(z(.12,.29,.25,.36),.055*s,.10*s);move(z(.58,.76,.37,.28),.020*s,.055*wave(1,1));move(z(.85,.54,.25,.34),.014*s,.024*s);break;
 case 'skeleton': // Keep sword / blade rigid. Only cape, skull and shoulder settle.
  move(z(.25,.28,.38,.29)*(1-ramp(y,.52,.68)),.045*wave(1,.5),.075*s);move(z(.71,.12,.17,.21),.012*s,-.019*b);break;
 case 'phoenix':case 'eagle':case 'bird':case 'bat':case 'hornet':case 'sprite':{
  const root=id==='sprite'?.62:id==='phoenix'?.67:id==='bat'?.53:.55;
  const wing=(id==='sprite'?rear:clamp(Math.abs(x-root)*2.6))*upper;
  const strength=({phoenix:.20,eagle:.24,bird:.24,bat:.24,hornet:.16,sprite:.19})[id];
  const w=s;dy+=wing*strength*w;dx+=(x-root)*wing*(-.13*w);
  if(id==='phoenix')move(z(.26,.79,.41,.29),.040*wave(1,1),.083*wave(1,1));
  if(id==='eagle'||id==='bird')move(z(.61,.81,.30,.27),-.02*s,.065*b);
  if(id==='bat')move(z(.51,.82,.22,.22),.019*s,.045*s);
  if(id==='hornet')move(z(.47,.76,.23,.29),.028*s,.034*s);
  if(id==='sprite')move(z(.57,.84,.27,.24),.032*s,.040*wave(1,1));break;
 }
 case 'wolf':move(z(.13,.20,.23,.27),.055*s,.072*wave(1,.7));move(z(.86,.28,.25,.28),.013*s,-.024*b);break;
 case 'dog':move(z(.79,.14,.22,.24),.035*wave(2,.2),.045*wave(2,.2));move(z(.09,.56,.22,.26),.040*wave(2,0),.040*wave(2,.6));break;
 case 'cat':move(z(.10,.13,.22,.42),.093*wave(1,.1),.042*wave(1,1));move(z(.83,.22,.17,.18),.030*wave(2,.3),.027*wave(2,.3));break;
 case 'lion':move(z(.10,.34,.23,.29),.065*wave(1,.4),.067*wave(1,.9));move(z(.72,.25,.37,.43),.013*s,-.020*b);break;
 case 'bear':move(z(.80,.28,.32,.35),.021*s,.030*s);move(z(.51,.24,.46,.41),.013*b,-.018*b);break;
 case 'boar':move(z(.88,.43,.24,.31),.025*wave(2,.2),.036*wave(2,.3));move(z(.45,.20,.43,.30),.010*s,-.026*b);break;
 case 'croc':move(z(.16,.27,.32,.38),.050*s,.065*wave(1,.5));move(z(.88,.48,.29,.22),.006*s,.035*b);break;
 case 'snake':move(z(.81,.19,.34,.36),.075*s,.048*wave(1,.7));move(z(.62,.40,.29,.40),.035*s,.028*s);break;
 case 'turtle':move(z(.92,.49,.24,.28),.054*s,-.030*b);break;
 case 'spider':move(z(.34,.27,.39,.36),-.020*s,-.032*b);move(z(.71,.53,.42,.31),.022*s,.036*wave(1,.5));break;
 case 'frog':move(z(.68,.50,.35,.34),.020*b,.087*b);move(z(.79,.21,.25,.22),.014*s,-.024*b);break;
 case 'rat':move(z(.27,.14,.35,.22),.070*wave(1,.4),.06*wave(1,.8));move(z(.86,.49,.23,.24),.036*wave(2,.2),.024*wave(2,.2));break;
 case 'slime':dx+=(x-.5)*(.17*b-.055*Math.sin(a*2));dy+=(1-y)*(.17*b-.045*Math.sin(a*2));break;
 }
 // Pin the sole / ground-contact band. Airborne animals may articulate freely.
 const pin=air?1:1-ramp(y,.76,1);return [x+dx*pin,y+dy*pin];
}
function spans(row){const out=[];for(let x=0;x<row.length;){const m=row[x],start=x++;while(x<row.length&&row[x]===m)x++;if(m)out.push([m,start,x]);}return out;}
function bake(art,id,frame,air){
 if(frame===0)return {art,ox:0,oy:0};
 const p=IDLE_PROFILES[id],W=art.width,H=art.height,pad=Math.ceil(Math.max(W,H)*.28)+3,ww=W+2*pad,hh=H+2*pad;
 const data=Array.from({length:hh},()=>Array(ww).fill(null)),map=new Int32Array(ww*hh).fill(-1);
 const verts=Array.from({length:H+1},(_,y)=>Array.from({length:W+1},(_,x)=>{const [u,v]=field(id,x/W,y/H,frame/FRAMES,p,air);return [u*W+pad,v*H+pad];}));
 function tri(A,B,C,m,src){const det=(B[0]-A[0])*(C[1]-A[1])-(B[1]-A[1])*(C[0]-A[0]);if(Math.abs(det)<1e-8)return;
  const l=Math.max(0,Math.floor(Math.min(A[0],B[0],C[0]))),r=Math.min(ww,Math.ceil(Math.max(A[0],B[0],C[0]))),top=Math.max(0,Math.floor(Math.min(A[1],B[1],C[1]))),bot=Math.min(hh,Math.ceil(Math.max(A[1],B[1],C[1])));
  for(let y=top;y<bot;y++)for(let x=l;x<r;x++){const px=x+.5-A[0],py=y+.5-A[1],u=(px*(C[1]-A[1])-py*(C[0]-A[0]))/det,v=((B[0]-A[0])*py-(B[1]-A[1])*px)/det;if(u>=-1e-7&&v>=-1e-7&&u+v<=1.0000001){data[y][x]=m;map[y*ww+x]=src;}}
 }
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const m=art.pixels[y][x];if(!m)continue;const A=verts[y][x],B=verts[y][x+1],C=verts[y+1][x+1],D=verts[y+1][x];tri(A,B,C,m,y*W+x);tri(A,C,D,m,y*W+x);}
 let l=pad,r=pad+W-1,top=pad,bot=pad+H-1;
 for(let y=0;y<hh;y++)for(let x=0;x<ww;x++)if(data[y][x]){l=Math.min(l,x);r=Math.max(r,x);top=Math.min(top,y);bot=Math.max(bot,y);}
 const pixels=data.slice(top,bot+1).map(row=>row.slice(l,r+1)),width=r-l+1,height=bot-top+1;
 const idleSourceMap=Array.from({length:height},(_,y)=>map.slice((y+top)*ww+l,(y+top)*ww+r+1));
 const posed={...art,width,height,pixels,rows:pixels.map(spans),idlePoseSource:art,idleSourceMap};
 return {art:posed,ox:l-pad,oy:top-pad};
}
function getFrame(art,id,frame,air){let frames=cache.get(art);if(!frames){frames=new Map();cache.set(art,frames);}const key=id+':'+frame+':'+air;if(!frames.has(key)){if(frames.size>=FRAMES)frames.delete(frames.keys().next().value);frames.set(key,bake(art,id,frame,air));}return frames.get(key);}
function bounds(art){let l=art.width,r=0,t=art.height,b=0;for(let y=0;y<art.rows.length;y++)for(const [,a,c] of art.rows[y]){l=Math.min(l,a);r=Math.max(r,c);t=Math.min(t,y);b=Math.max(b,y+1);}return {l,r,t,b};}
/** Pass unanimated idle geometry. Return the same geometry shape with posed art.
 * Do not use on attack, invocation or hurt; caller retains state priority. */
export function prepareSummonIdlePose({creatureId,art,left,top,scale,groundX,groundY,grand=false,timeMs=0,reducedMotion=false,canvasWidth=320,canvasHeight=180}={}){
 const p=IDLE_PROFILES[creatureId];if(!art?.pixels||!p||!(scale>0)||![left,top,groundX,groundY,timeMs].every(Number.isFinite))return null;
 const base={art,left,top,scale,groundX,groundY,grand};if(reducedMotion)return base;
 const t=((timeMs%p.period)+p.period)%p.period/p.period,frame=Math.floor(t*FRAMES),air=art.lift>0,pose=getFrame(art,creatureId,frame,air);
 const orig=bounds(art),b=bounds(pose.art);let L=left+Math.round(pose.ox*scale),T=top+Math.round(pose.oy*scale);
 if(air)T-=Math.round(p.hover*(.5-.5*Math.cos(t*TAU))*(grand?1.25:1));
 else T+=top+Math.round(orig.b*scale)-(T+Math.round(b.b*scale));
 // Maintain actual silhouette on screen, without changing the ground anchor.
 const minX=Math.min(0,left+Math.round(orig.l*scale)),maxX=Math.max(canvasWidth,left+Math.round(orig.r*scale));
 const minY=Math.min(0,top+Math.round(orig.t*scale)),maxY=Math.max(canvasHeight,top+Math.round(orig.b*scale));
 L=clamp(L,minX-Math.round(b.l*scale),maxX-Math.round(b.r*scale));
 T=clamp(T,minY-Math.round(b.t*scale),maxY-Math.round(b.b*scale));
 return {...base,art:pose.art,left:L,top:T,frame,period:p.period};
}
/** Keep rune identity tied to the original source pixels; never refit each idle frame. */
export function mapSummonIdleMark(art,mark){if(!art.idleSourceMap)return mark;const W=art.idlePoseSource.width,colors=new Map(mark.map(([x,y,c])=>[y*W+x,c])),out=[];for(let y=0;y<art.height;y++)for(let x=0;x<art.width;x++){const c=colors.get(art.idleSourceMap[y][x]);if(c)out.push([x,y,c]);}return out;}
