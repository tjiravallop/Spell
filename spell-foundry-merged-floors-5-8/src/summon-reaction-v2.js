/** E6.3 R1 — presentation-only summon reaction poses and contact effects. */
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
const ramp=(x,a,b)=>smooth((x-a)/(b-a));
const zone=(x,y,cx,cy,rx,ry)=>1-smooth(Math.hypot((x-cx)/rx,(y-cy)/ry));
export const REACTION_PROFILES=Object.freeze(Object.fromEntries(Object.entries({"dragon": ["Neck recoil, wing brace", "heavy", 0.82, 0.28], "phoenix": ["Wing flare and aerial recoil", "air", 0.64, 0.35], "hydra": ["Staggered neck recoil", "heavy", 0.78, 0.24], "behemoth": ["Shoulder brace, planted claws", "heavy", 0.78, 0.35], "kraken": ["Mantle recoil, curling tentacles", "soft", 0.73, 0.42], "gargoyle": ["Wing shield, stone crouch", "heavy", 0.7, 0.34], "golem": ["Stone shoulder brace", "heavy", 0.76, 0.38], "siren": ["Arms and hair recoil", "air", 0.83, 0.33], "skeleton": ["Shield-side brace, skull recoil", "guard", 0.8, 0.39], "eagle": ["Wing flare and retreat", "air", 0.74, 0.35], "bird": ["Quick wing recoil", "air", 0.73, 0.35], "bat": ["Folded membrane recoil", "air", 0.55, 0.44], "hornet": ["Quick aerial jolt", "air", 0.7, 0.46], "wolf": ["Head tuck and crouch", "agile", 0.84, 0.36], "dog": ["Ear tuck and low crouch", "agile", 0.8, 0.35], "cat": ["Arched recoil and sidestep", "agile", 0.79, 0.38], "lion": ["Mane and shoulder brace", "heavy", 0.77, 0.38], "bear": ["Heavy shoulder recoil", "heavy", 0.79, 0.36], "boar": ["Snout and shoulder brace", "heavy", 0.84, 0.42], "croc": ["Jaw tuck, tail stays grounded", "heavy", 0.84, 0.47], "snake": ["Neck withdraws into coils", "soft", 0.81, 0.29], "turtle": ["Head retracts under shell", "guard", 0.87, 0.49], "spider": ["Leg brace and abdomen recoil", "agile", 0.76, 0.48], "frog": ["Low spring crouch", "agile", 0.78, 0.38], "rat": ["Quick head tuck", "agile", 0.82, 0.42], "slime": ["Elastic impact squash", "soft", 0.65, 0.42], "sprite": ["Wing flutter and aerial dodge", "air", 0.76, 0.4]}).map(([id,v])=>[id,Object.freeze({name:v[0],style:v[1],headX:v[2],headY:v[3]})])));

export function summonReactionKind(event){
 if(!event||event.target!=='summon')return null;
 if(event.type==='summon_hit')return Number(event.damage)>0?'hurt':'zero';
 if(event.type==='ward_absorb')return 'ward';
 if(event.type==='dodge')return 'dodge';
 return null;
}
const FRAMES=16,cache=new WeakMap();
function envelope(t,kind){
 if(kind==='dodge')return ramp(t,0,.20)*(1-ramp(t,.55,1));
 if(kind==='ward'||kind==='zero')return ramp(t,0,.10)*(1-ramp(t,.30,.94));
 return ramp(t,0,.08)*(1-ramp(t,.24,1));
}
function field(id,x,y,t,p,air,kind){
 const a=envelope(t,kind),soft=p.style==='soft',heavy=p.style==='heavy',guard=p.style==='guard';
 const strength=kind==='zero'?.25:kind==='ward'?.48:kind==='dodge'?.74:1;
 const f=a*strength,pin=air?1:1-ramp(y,.74,1),head=zone(x,y,p.headX,p.headY,.40,.44);
 let dx=-f*(.045+.07*head)*(1-y),dy=f*(heavy?.045:.085)*(1-y);
 if(guard){dx-=head*f*.12;dy+=head*f*.055;}
 if(id==='turtle'){dx-=head*f*.12;dy+=head*f*.05;}
 if(id==='hydra'){dx-=f*.05*(1-y)*(.5+.5*Math.sin(x*18+t*3));dy+=f*.025*(1-y);}
 if(soft){dx+=(x-.5)*f*.11;dy+=f*.085*(1-y);}
 if(id==='kraken'){dx-=f*.045*Math.sin(x*13+y*5)*(1-y);}
 if(air){dy+=f*.07*clamp(Math.abs(x-.60)*2);dx-=f*.025;}
 if(id==='slime'){dx=(x-.5)*f*.24;dy=(1-y)*f*.22;}
 return [x+dx*pin,y+dy*pin];
}
function spans(row){const out=[];for(let x=0;x<row.length;){const m=row[x],start=x++;while(x<row.length&&row[x]===m)x++;if(m)out.push([m,start,x]);}return out;}
function bake(art,id,frame,air,kind){
 if(frame===0||frame===FRAMES)return {art,ox:0,oy:0};
 const p=REACTION_PROFILES[id],W=art.width,H=art.height,pad=Math.ceil(Math.max(W,H)*.28)+3,ww=W+2*pad,hh=H+2*pad;
 const data=Array.from({length:hh},()=>Array(ww).fill(null)),map=new Int32Array(ww*hh).fill(-1);
 const verts=Array.from({length:H+1},(_,y)=>Array.from({length:W+1},(_,x)=>{const [u,v]=field(id,x/W,y/H,frame/FRAMES,p,air,kind);return [u*W+pad,v*H+pad];}));
 function tri(A,B,C,m,src){const det=(B[0]-A[0])*(C[1]-A[1])-(B[1]-A[1])*(C[0]-A[0]);if(Math.abs(det)<1e-8)return;
  const l=Math.max(0,Math.floor(Math.min(A[0],B[0],C[0]))),r=Math.min(ww,Math.ceil(Math.max(A[0],B[0],C[0]))),top=Math.max(0,Math.floor(Math.min(A[1],B[1],C[1]))),bot=Math.min(hh,Math.ceil(Math.max(A[1],B[1],C[1])));
  for(let y=top;y<bot;y++)for(let x=l;x<r;x++){const px=x+.5-A[0],py=y+.5-A[1],u=(px*(C[1]-A[1])-py*(C[0]-A[0]))/det,v=((B[0]-A[0])*py-(B[1]-A[1])*px)/det;if(u>=-1e-7&&v>=-1e-7&&u+v<=1.0000001){data[y][x]=m;map[y*ww+x]=src;}}
 }
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const m=art.pixels[y][x];if(!m)continue;const A=verts[y][x],B=verts[y][x+1],C=verts[y+1][x+1],D=verts[y+1][x];tri(A,B,C,m,y*W+x);tri(A,C,D,m,y*W+x);}
 let l=pad,r=pad+W-1,top=pad,bot=pad+H-1;
 for(let y=0;y<hh;y++)for(let x=0;x<ww;x++)if(data[y][x]){l=Math.min(l,x);r=Math.max(r,x);top=Math.min(top,y);bot=Math.max(bot,y);}
 const pixels=data.slice(top,bot+1).map(row=>row.slice(l,r+1)),width=r-l+1,height=bot-top+1;
 const reactionSourceMap=Array.from({length:height},(_,y)=>map.slice((y+top)*ww+l,(y+top)*ww+r+1));
 const posed={...art,width,height,pixels,rows:pixels.map(spans),reactionPoseSource:art,reactionSourceMap};
 return {art:posed,ox:l-pad,oy:top-pad};
}
function getFrame(art,id,frame,air,kind){let frames=cache.get(art);if(!frames){frames=new Map();cache.set(art,frames);}const key=id+':'+frame+':'+air+':'+kind;if(!frames.has(key)){if(frames.size>=FRAMES*2)frames.delete(frames.keys().next().value);frames.set(key,bake(art,id,frame,air,kind));}return frames.get(key);}
function bounds(art){let l=art.width,r=0,t=art.height,b=0;for(let y=0;y<art.rows.length;y++)for(const [,a,c] of art.rows[y]){l=Math.min(l,a);r=Math.max(r,c);t=Math.min(t,y);b=Math.max(b,y+1);}return {l,r,t,b};}

/** progress is the existing event's normalized presentation clock, not new game timing. */
export function prepareSummonReactionPose({creatureId,art,left,top,scale,groundX,groundY,grand=false,kind,progress=0,reducedMotion=false,canvasWidth=320,canvasHeight=180}={}){
 const p=REACTION_PROFILES[creatureId];if(!p||!art?.pixels||!(scale>0)||!['hurt','ward','zero','dodge'].includes(kind)||![left,top,groundX,groundY,progress].every(Number.isFinite))return null;
 const base={art,left,top,scale,groundX,groundY,grand};if(reducedMotion)return base;
 const t=clamp(progress),frame=Math.round(t*FRAMES),a=envelope(frame/FRAMES,kind),air=art.lift>0,pose=getFrame(art,creatureId,frame,air,kind),orig=bounds(art),b=bounds(pose.art);
 const shift=Math.round(-a*(kind==='dodge'?(grand?12:16):kind==='hurt'?(grand?3:6):kind==='ward'?1:0));
 let L=left+Math.round(pose.ox*scale)+shift,T=top+Math.round(pose.oy*scale);
 if(air)T+=Math.round(a*(kind==='dodge'?-7:kind==='hurt'?4:0));else T+=top+Math.round(orig.b*scale)-(T+Math.round(b.b*scale));
 L=clamp(L,Math.min(0,left+Math.round(orig.l*scale))-Math.round(b.l*scale),Math.max(canvasWidth,left+Math.round(orig.r*scale))-Math.round(b.r*scale));
 T=clamp(T,Math.min(0,top+Math.round(orig.t*scale))-Math.round(b.t*scale),Math.max(canvasHeight,top+Math.round(orig.b*scale))-Math.round(b.b*scale));
 return {...base,art:pose.art,left:L,top:T,groundX:groundX+(L-left-Math.round(pose.ox*scale)),frame};
}
export function mapSummonReactionMark(art,mark){if(!art.reactionSourceMap)return mark;const W=art.reactionPoseSource.width,colors=new Map(mark.map(([x,y,c])=>[y*W+x,c])),out=[];for(let y=0;y<art.height;y++)for(let x=0;x<art.width;x++){const c=colors.get(art.reactionSourceMap[y][x]);if(c)out.push([x,y,c]);}return out;}
function px(g,x,y,c,w=1,h=w){g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h);}
function line(g,x,y,X,Y,c,w=1){const n=Math.max(1,Math.ceil(Math.max(Math.abs(X-x),Math.abs(Y-y))));for(let i=0;i<=n;i++)px(g,x+(X-x)*i/n,y+(Y-y)*i/n,c,w);}
/** Contact accent only. Do not draw attacker travel, damage popups or extra hits. */
export function drawSummonReactionFx(g,geom,{kind,progress=0,reducedMotion=false,contactX,contactY}={}){
 if(reducedMotion||!geom?.art||!['hurt','zero','ward','dodge'].includes(kind))return;
 const t=clamp(progress),{art,left,top,scale,grand}=geom,b=bounds(art),r=left+b.r*scale,l=left+b.l*scale,h=(b.b-b.t)*scale;
 const x=clamp(Number.isFinite(contactX)?contactX:r-2,3,316),y=clamp(Number.isFinite(contactY)?contactY:top+(b.t+(b.b-b.t)*.43)*scale,4,173);
 if(t>.88)return;
 g.save();
 if(kind==='ward'){
  const q=ramp(t,0,.10)*(1-ramp(t,.47,.84)),height=clamp(h*.52,14,55),w=grand?12:8,cy=clamp(y,height/2+3,177-height/2),cx=clamp(Math.max(x,r+3),w+2,317-w);
  const verts=[[cx-w*.7,cy-height*.5],[cx+w*.65,cy-height*.34],[cx+w,cy],[cx+w*.65,cy+height*.34],[cx-w*.7,cy+height*.5],[cx-w*.38,cy]];
  g.globalAlpha=q*.23;g.fillStyle='#9c75ed';g.beginPath();verts.forEach(([u,v],i)=>i?g.lineTo(Math.round(u),Math.round(v)):g.moveTo(Math.round(u),Math.round(v)));g.closePath();g.fill();
  g.globalAlpha=q;for(let i=0;i<verts.length;i++)line(g,...verts[i],...verts[(i+1)%verts.length],i<3?'#e7dcff':'#8260c9',grand?2:1);
  for(let i=0;i<5;i++){const yy=cy+(i-2)*height*.17;line(g,cx+w*.5,yy,cx+w*.5+3+t*12,yy+(i-2)*t*8,'#cdb0ff',1);}
 }else if(kind==='dodge'){
  const a=envelope(t,kind);g.globalAlpha=a*.85;for(let i=0;i<4;i++){const yy=y+(i-1.5)*5;line(g,r+3+t*8,yy,r+9+t*13,yy-2,'#a6c5da');}
 }else{
  const q=1-ramp(t,.12,.68),n=kind==='zero'?4:grand?10:7;g.globalAlpha=q;
  const colors=kind==='zero'?['#dbcbb6','#8a8795','#fff1d4']:['#f4d9b3','#e99a61','#a94347'];
  for(let i=0;i<n;i++){const ang=-1.5+i*3/(n-1),d=2+t*(grand?25:17),xx=x+Math.cos(ang)*d,yy=y+Math.sin(ang)*d;line(g,xx,yy,xx+Math.cos(ang)*(grand?5:3)*(1-t),yy+Math.sin(ang)*4*(1-t),colors[i%3],i%4===0?2:1);}
  if(t<.20){g.globalAlpha=1-t/.20;line(g,x-3,y,x+3,y,'#fff5dd',1);line(g,x,y-4,x,y+4,'#fff5dd',1);}
 }
 g.restore();
}
