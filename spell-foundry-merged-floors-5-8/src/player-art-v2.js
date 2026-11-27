// Spell Foundry — E8 R1. Hand-authored indexed procedural pixel art.
// No image assets are used by this module. 48x44 native workspace, foot pivot [19,38].
const C = Object.freeze({ink:'#141c1c',deep:'#202a29',s0:'#263a32',s1:'#3d5540',s2:'#5a7651',s3:'#87a16a',s4:'#b3c48a',g0:'#59462d',g1:'#a88845',g2:'#e2c078',g3:'#fff0b0',skin0:'#704735',skin1:'#bd8863',skin2:'#e9bc8c',boot:'#372c2a',bootL:'#72533b',wood:'#654b35',woodL:'#b08b5c',gem0:'#235e65',gem1:'#4fa99b',gem2:'#a4ead6',gem3:'#e7fff0',scarf:'#a16c3e'});
const W=48,H=44, PX=19,PY=38;
function grid(){return Array.from({length:H},()=>Array(W).fill(null));}
function paint(g,dx=0,dy=0){
 const rect=(k,x,y,w,h)=>{for(let j=y+dy;j<y+dy+h;j++)for(let i=x+dx;i<x+dx+w;i++)if(g[j]&&i>=0&&i<W)g[j][i]=k;};
 const poly=(k,...a)=>{for(let y=0;y<H;y++){let cuts=[];for(let i=0;i<a.length;i++){const [x1,y1]=a[i], [x2,y2]=a[(i+1)%a.length];const Y=y+.5-dy;if((y1>Y)!=(y2>Y))cuts.push(x1+(Y-y1)*(x2-x1)/(y2-y1)+dx);}cuts.sort((a,b)=>a-b);for(let i=0;i<cuts.length;i+=2)for(let x=Math.ceil(cuts[i]-.5);x<Math.ceil(cuts[i+1]-.5);x++)if(x>=0&&x<W)g[y][x]=k;}};
 return {r:rect,p:poly};
}
const P=(x,y)=>[x,y];
function make({head=0,cloth=0,arm=0,lean=0,blink=false,cast=false,hurt=false}={}){
 const g=grid();let {p,r}=paint(g,lean,0);
 // Grounded boots, separated by a single dark seam.
 p('ink',P(12,29),P(24,29),P(26,35),P(29,36),P(29,38),P(20,38),P(18,36),P(17,38),P(9,38),P(9,35),P(12,34));
 p('boot',P(12,32),P(18,32),P(17,36),P(10,37),P(10,35));
 p('boot',P(20,32),P(24,32),P(25,36),P(28,36),P(28,37),P(20,37));r('bootL',12,35,4,1);r('bootL',23,35,3,1);
 // Cape: animated hem, not a whole-body bob.
 p('ink',P(14,16),P(20,17),P(20,31),P(16,36),P(11,35),P(7+cloth,37),P(3+cloth,34),P(6+cloth,28),P(8,21));
 p('s0',P(13,18),P(19,18),P(18,31),P(15,34),P(10,33),P(7+cloth,35),P(5+cloth,33),P(8,25));
 p('s1',P(12,18),P(15,20),P(12,29),P(8+cloth,33),P(6+cloth,33),P(9,25));
 p('s2',P(11,20),P(12,22),P(10,27),P(7+cloth,31),P(8,26));
 p('g0',P(5+cloth,33),P(7+cloth,34),P(11,32),P(14,33),P(15,34),P(10,34),P(7+cloth,36));r('g1',7+cloth,34,2,1);
 // Long tunic silhouette, warm metal waist clasp.
 p('ink',P(15,16),P(22,16),P(25,21),P(24,27),P(27,34),P(23,36),P(18,35),P(12,36),P(10,33),P(13,26),P(12,21));
 p('s1',P(16,18),P(21,18),P(23,21),P(22,27),P(25,33),P(22,34),P(18,33),P(13,34),P(12,32),P(15,26),P(14,21));
 p('s2',P(16,19),P(19,20),P(18,26),P(16,31),P(13,32),P(15,26));
 p('s0',P(20,23),P(23,23),P(22,27),P(24,33),P(22,34),P(20,31),P(20,28));
 p('s3',P(16,21),P(17,22),P(16,26),P(14,29),P(15,25));
 p('g1',P(13,33),P(18,32),P(22,33),P(24,32),P(25,33),P(22,34),P(18,33),P(13,34));
 r('g2',14,33,3,1);r('g2',22,33,2,1);
 p('g0',P(13,25),P(23,24),P(24,27),P(14,28));r('g1',15,25,6,1);r('g2',19,25,3,2);r('ink',20,25,1,1);r('g3',19,25,1,1);
 // Shoulder mantle and scarf.
 p('ink',P(14,15),P(22,15),P(26,19),P(23,22),P(19,21),P(16,22),P(11,20));
 p('s2',P(14,16),P(21,16),P(24,19),P(22,20),P(18,19),P(15,20),P(13,19));
 p('s3',P(14,16),P(19,17),P(16,18),P(13,18));r('g2',14,19,2,1);r('g1',16,20,2,1);
 p('scarf',P(18,15),P(23,15),P(24,18),P(20,19),P(17,18));r('g2',20,16,3,1);
 // Visible right-facing head, under the brim. Head motion is independent of feet.
 ({p,r}=paint(g,lean,head));
 p('ink',P(15,9),P(23,9),P(26,12),P(26,14),P(28,16),P(25,17),P(24,20),P(18,19),P(15,16));
 p('skin0',P(18,11),P(23,11),P(25,13),P(25,15),P(26,16),P(24,16),P(23,18),P(19,17),P(17,15));
 p('skin1',P(21,12),P(24,12),P(25,14),P(25,15),P(26,15),P(26,16),P(23,16),P(23,17),P(21,16));
 r('skin2',24,14,1,1);r('skin2',23,16,1,1);
 r('deep',22,13,3,1);if(!blink){r('g3',23,13,1,1);r('ink',24,13,1,1);}r('ink',24,17,1,1);
 // Bent pointed wizard hat, dark outline with folded cloth panels.
 p('ink',P(6,12),P(12,10),P(14,5),P(18,1),P(23,1),P(27,4),P(25,5),P(22,4),P(23,8),P(27,11),P(31,12),P(31,14),P(25,15),P(15,14),P(7,15),P(4,14));
 p('s0',P(13,10),P(15,5),P(19,2),P(23,2),P(25,4),P(22,3),P(21,5),P(23,9),P(26,11),P(17,12));
 p('s2',P(15,8),P(16,5),P(19,3),P(22,3),P(19,5),P(18,8),P(20,10),P(15,10));
 p('s3',P(16,5),P(19,3),P(20,3),P(18,6),P(17,8),P(15,8));
 p('g0',P(14,9),P(18,9),P(24,9),P(26,11),P(17,12),P(13,11));
 r('g1',15,10,10,1);r('g2',17,9,5,1);r('g3',21,10,2,1);
 p('s1',P(7,12),P(14,11),P(19,12),P(26,12),P(30,13),P(25,14),P(16,13),P(8,14),P(6,13));
 r('s3',8,12,7,1);r('s4',8,13,4,1);r('s2',25,13,4,1);
 // Staff (right hand); moves from upright to forward angle during cast.
 ({p,r}=paint(g,lean,0));const gripY=24-(cast?2:0);const tx=31+arm,ty=cast?14:12;const gripX=Math.round(tx+((cast?27:30)-tx)*(gripY-ty)/(37-ty))-2;
 const bx=cast?27:30,by=37;
 p('ink',P(tx-1,ty),P(tx+2,ty),P(bx+2,by),P(bx-1,by));
 p('wood',P(tx,ty+1),P(tx+1,ty+1),P(bx+1,by-1),P(bx,by-1));
 for(let y=ty+4;y<by-2;y+=4){const x=Math.round(tx+(bx-tx)*(y-ty)/(by-ty));r('woodL',x,y,1,2);}
 // Metal socket, faceted jade crystal, small emissive core.
 p('ink',P(tx-4,ty-5),P(tx-2,ty-9),P(tx+1,ty-11),P(tx+5,ty-6),P(tx+4,ty-2),P(tx+1,ty+2),P(tx-2,ty+1));
 p('g0',P(tx-3,ty-4),P(tx-2,ty-1),P(tx+1,ty+1),P(tx+3,ty-2),P(tx+4,ty-5),P(tx+2,ty-3),P(tx-1,ty-2));
 p('gem0',P(tx-3,ty-5),P(tx-1,ty-8),P(tx+1,ty-9),P(tx+4,ty-5),P(tx+1,ty-2),P(tx-1,ty-3));
 p('gem1',P(tx-2,ty-5),P(tx-1,ty-7),P(tx+1,ty-8),P(tx+2,ty-5),P(tx,ty-3));
 p('gem2',P(tx-1,ty-7),P(tx+1,ty-8),P(tx+1,ty-5),P(tx-1,ty-4));r('gem3',tx,ty-7,1,2);r('g2',tx-2,ty-2,2,1);
 // Bent arm and hand drawn over shaft.
 p('ink',P(18,19),P(22,18),P(25,20),P(gripX+1,gripY-2),P(gripX+3,gripY),P(gripX+2,gripY+3),P(gripX-1,gripY+3),P(23,25),P(19,24));
 p('s1',P(20,19),P(23,20),P(24,22),P(gripX,gripY-1),P(gripX,gripY+2),P(23,24),P(20,23));r('s3',20,20,2,1);
 p('g0',P(gripX-1,gripY-1),P(gripX+1,gripY-2),P(gripX+2,gripY+1),P(gripX,gripY+2));r('g2',gripX,gripY-1,1,2);r('skin1',gripX+1,gripY,2,2);r('skin2',gripX+2,gripY,1,1);
 return {grid:g,staff:{x:tx+1,y:ty-7}};
}
const FRAMES=Object.freeze({idle:[{}, {cloth:1},{head:-1,cloth:1},{cloth:0},{cloth:-1,blink:true},{cloth:-1}],cast:[{}, {head:-1,cloth:-1,lean:-1},{head:-1,cloth:-1,lean:-1,arm:2,cast:true},{head:0,cloth:1,lean:1,arm:5,cast:true},{cloth:1,lean:1,arm:4,cast:true},{arm:1,cast:true},{}],hurt:[{}, {head:1,cloth:-1,lean:-2,hurt:true},{head:1,cloth:1,lean:-1,hurt:true},{}]});
const cache=new Map();
function resolve(pose,time,progress,reduced){let kind=FRAMES[pose]?pose:'idle',seq=FRAMES[kind];let n=kind==='idle'?Math.floor(time/310)%seq.length:Math.min(seq.length-1,Math.floor(Math.max(0,Math.min(.99999,progress))*seq.length));if(reduced)n=kind==='cast'?3:0;const key=kind+':'+n;if(!cache.has(key))cache.set(key,make(seq[n]));return cache.get(key);}
export function drawPlayerV2(ctx,x,baseline,{pose='idle',time=0,progress=0,reducedMotion=false,scale=1}={}){
 if(pose==='dead')return false;
 const f=resolve(pose,time,progress,reducedMotion),left=Math.round(x-PX*scale),top=Math.round(baseline-PY*scale);
 for(let y=0;y<H;y++){const row=f.grid[y];for(let i=0;i<W;){let k=row[i],j=i+1;while(j<W&&row[j]===k)j++;if(k){ctx.fillStyle=C[k];const x0=Math.round(left+i*scale),x1=Math.round(left+j*scale),y0=Math.round(top+y*scale),y1=Math.round(top+(y+1)*scale);if(x1>x0&&y1>y0)ctx.fillRect(x0,y0,x1-x0,y1-y0);}i=j;}}
 return {staffX:Math.round(left+f.staff.x*scale),staffY:Math.round(top+f.staff.y*scale)};
}
export const PLAYER_V2_METRICS=Object.freeze({width:W,height:H,pivot:[PX,PY],colors:C});
