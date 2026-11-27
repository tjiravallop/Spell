// E9 R10: hand-authored indexed pixel shapes. No image assets or dependencies.
const INK='#15121e';
const profiles={
 striker:{name:'อิมพ์หมึก',family:'imp',height:29,colors:['#33233f','#58365e','#81517e','#b784aa','#ffe2a1','#b89b70']},
 ember_imp:{name:'อิมพ์เพลิง',family:'flame imp',height:32,colors:["#48232f", "#9b3440", "#e16a40", "#ffab60", "#fff1aa", "#ffc66d"]},
 swarm:{name:'หยดหมึก',family:'slime',height:16,colors:['#221932','#432752','#694477','#a27ab1','#ffe5a0','#d5aed9']},
 warden:{name:'ผู้ผนึกอาคม',family:'ward keeper',height:35,colors:["#33273f", "#625079", "#a08cbe", "#ddd0f2", "#ffe5a0", "#ceb686"]},
 iron_warden:{name:'ผู้พิทักษ์ม่านศิลา',family:'tower shield sentinel',height:39,colors:["#27323a", "#4d6163", "#7c9890", "#bdd2b7", "#c7f5c1", "#c6a478"]},
 armored:{name:'อัศวินเกราะเหล็ก',family:'shield knight',height:36,colors:["#303540", "#58636d", "#89969f", "#d6e0dc", "#ffdea0", "#bd9a69"]},
 charger:{name:'อสูรเตาหลอม',family:'furnace ram',height:39,colors:["#3e2c2e", "#81503e", "#bd8658", "#ebba80", "#fff2ad", "#d7ad6f"]},
 rune_golem:{name:'โกเลมผลึกรูน',family:'rune crystal golem',height:42,colors:["#28333b", "#51636b", "#889b9a", "#c8d7cf", "#a4f5e0", "#eac27a"]},
 support:{name:'ภูตสปอร์เยียวยา',family:'spore oracle',height:33,colors:["#3b353d", "#92505f", "#c67b76", "#efd1b8", "#c8f69d", "#b5c68e"]},
 void_imp:{name:"กบอัคนี",family:"ember frog",height:29,colors:["#432532", "#a24435", "#df7c45", "#ffd38b", "#fff0a1", "#ffbd69"]},
 aether_warden:{name:"ผู้คุมม่านวายุ",family:"wind ward spirit",height:36,colors:["#30334b", "#536e83", "#92bfc2", "#d4f1e1", "#efffc0", "#b1d5d4"]},
 obsidian_golem:{name:"หมูป่าหินผา",family:"crag boar",height:34,colors:["#2a3032", "#56645b", "#879581", "#c7cfaa", "#e0f6a4", "#d6c29a"]},
 chrono_sage:{name:"นักปราชญ์กาลเวลา",family:"hourglass sage",height:35,colors:["#2e3745", "#45676c", "#95c2b9", "#e7e9c9", "#fbdf8d", "#bd9a68"]},
 ward_scribe:{name:"อาลักษณ์ทอม่าน",family:"scroll spirit",height:31,colors:["#32243e", "#6a477e", "#a68ac1", "#e9d8e4", "#f4d8ff", "#d7b590"]},
 ward_keeper:{name:"ด้วงเกราะเพลิง",family:"furnace beetle",height:30,colors:["#442630", "#964134", "#d87842", "#ffc36f", "#fff1a5", "#e5a85f"]},
 rune_ram:{name:"แพะผาศิลา",family:"rune ram",height:36,colors:["#37343b", "#756759", "#b19a7b", "#e0c99f", "#b4f5ce", "#d0b58a"]}
,
 ink_ray:{"name":"กระเบนหมึก","family":"abyssal ray","height":29,"colors":["#28223d","#594475","#8b76ab","#cbb5de","#e8dbff","#79c4c4"]},
 prism_crab:{"name":"ปูเกราะปริซึม","family":"crystal crab","height":35,"colors":["#23383d","#486970","#7ba6a5","#c6dfd0","#d6fff2","#95b8e6"]},
 lantern_wisp:{"name":"โคมวิญญาณ","family":"lantern specter","height":33,"colors":["#392d42","#72536b","#aa795c","#e7b67c","#fff3b0","#c3a5df"]},
 scroll_moth:{"name":"ผีเสื้อคัมภีร์","family":"archive moth","height":32,"colors":["#43364b","#806c80","#c2a98f","#efdfb5","#fff2cc","#8dd2c4"]},
 chain_hound:{"name":"สุนัขโซ่อาคม","family":"chained hound","height":39,"colors":["#332b38","#70505a","#b0786c","#e0b495","#ffe3a4","#aaa5c4"]},
 prism_watcher:{"name":"ผู้เฝ้าปริซึมชั้นสูง","family":"minor boss · prism custodian","height":52,"colors":["#292a49","#605783","#a08ac3","#ded2ed","#f9f3ff","#83d4d1"]},
rift_runner:{"name": "วิหคสลับรอยแยก", "family": "rift raptor", "height": 38, "colors": ["#30243e", "#62467f", "#987fc1", "#dac5f4", "#fff1ac", "#b8a0d0"]},
lattice_guard:{"name": "โกเลมแนวศิลา", "family": "lattice sentinel", "height": 44, "colors": ["#25313a", "#52646d", "#91a4a9", "#d0e3df", "#b6ffe9", "#6299a2"]},
thread_archer:{"name": "พรานศรด้ายวายุ", "family": "thread ranger", "height": 42, "colors": ["#28363c", "#4c7162", "#87ac8c", "#d7e8b6", "#deffae", "#c6ac77"]},
gate_weaver:{"name": "จ้าวทวารสานมิติ", "family": "floor 35 guardian · gate weaver", "height": 57, "colors": ["#2d2746", "#675187", "#a68bcb", "#ead7ff", "#d9ffff", "#b8a17c"]},
seam_warden:{"name": "จ้าวผู้เฝ้ารอยต่อ", "family": "floor 45 guardian · seam titan", "height": 61, "colors": ["#3d2b32", "#79564b", "#ba9275", "#edcc9c", "#ffe4a2", "#ce8a58"]},
abyss_crawler:{"name": "ปูเกราะบาดาล", "family": "abyssal crustacean", "height": 40, "colors": ["#1c3444", "#31566b", "#518b9a", "#a1d9df", "#d8fff0", "#72bcbe"]},
hydra_serpent:{"name": "อสรพิษวารี", "family": "sea serpent", "height": 43, "colors": ["#173a40", "#29686d", "#54a79d", "#b5e1c6", "#e9ffcf", "#86c9e4"]},
magma_tortoise:{"name": "เต่าศิลาลาวา", "family": "magma tortoise", "height": 43, "colors": ["#38242c", "#73453e", "#ae7250", "#e2b889", "#fff0a5", "#ff7236"]},
cinder_drake:{"name": "มังกรสะเก็ดไฟ", "family": "cinder drake", "height": 46, "colors": ["#41232c", "#934039", "#d56e43", "#ffd18a", "#fff4b0", "#f49b42"]},
gale_harpy:{"name": "ปักษาพายุหมุน", "family": "gale harpy", "height": 45, "colors": ["#29394e", "#4e7289", "#91c0cf", "#e0f5e6", "#f3ffb8", "#8ee3d2"]},
cloud_elemental:{"name": "จิตวิญญาณเมฆา", "family": "cloud elemental", "height": 44, "colors": ["#333b57", "#62748c", "#a1beca", "#e1e9ef", "#ffffd9", "#b6f1e6"]},
sand_stalker:{"name": "แมงป่องสายฟ้าทราย", "family": "thunder scorpion", "height": 45, "colors": ["#43313a", "#826044", "#bf9252", "#f4d38b", "#fff9c0", "#eeb950"]},
spark_wraith:{"name": "ภูตอัสนีไร้ร่าง", "family": "spark wraith", "height": 46, "colors": ["#34294e", "#725090", "#a980c3", "#e1b7eb", "#fff3af", "#d9a74d"]},
leviathan_tide:{"name": "พญานาคีสมุทร", "family": "abyssal floor guardian", "height": 74, "colors": ["#172c4a", "#275d78", "#4ea2ad", "#b8e5df", "#e8fff1", "#76d7d3"]},
storm_roc:{"name": "วิหคสายลมคำราม", "family": "gale floor guardian", "height": 78, "colors": ["#25334a", "#456985", "#83afc8", "#e6f5ed", "#fff2b2", "#d6b778"]},
frost_crystal_golem:{"name": "โกเลมผลึกหิมะ", "family": "glacial crystal sentinel", "height": 51, "colors": ["#193447", "#285269", "#5088a2", "#d4f4ef", "#a3fffa", "#8fc5d5"]},
blizzard_wolf:{"name": "พญาหมาป่าเหมันต์", "family": "blizzard direwolf", "height": 49, "colors": ["#20374e", "#42667f", "#7197ae", "#edf8ed", "#86d9f2", "#b2d1da"]},
venom_spore_beast:{"name": "อสูรสปอร์พิษ", "family": "toxic fungal crawler", "height": 54, "colors": ["#26352c", "#4d6742", "#84965a", "#bcc67b", "#c5ff83", "#ead8a5"]},
crag_titan_sentinel:{"name": "ทมิฬศิลายักษ์", "family": "ancient basalt sentinel", "height": 57, "colors": ["#1a292a", "#36443a", "#63705a", "#d0cdb0", "#c0ed86", "#9ba488"]},
glacial_hydra:{"name": "ไฮดราน้ำแข็งพันปี", "family": "glacial floor guardian", "height": 82, "colors": ["#16293e", "#285474", "#4c87a9", "#c2ecf4", "#f5fff4", "#86c4db"]},
ancient_chitin_behemoth:{"name": "เบฮีมอธเกราะปฐพี", "family": "ancient chitin floor guardian", "height": 84, "colors": ["#1d3029", "#364c36", "#647b48", "#d7e69b", "#c5ef8b", "#cfb88b"]},
solar_sentinel:{"name": "หุ่นสุริยันพิฆาต", "family": "solar bronze automaton", "height": 56, "colors": ["#30202b", "#805632", "#b9894b", "#f6db95", "#fff6bf", "#e4a14d"]},
radiant_phoenix:{"name": "วิหคสุริยคราส", "family": "solar phoenix", "height": 55, "colors": ["#3a182a", "#8b2d32", "#d45a34", "#ffab45", "#ffe5a0", "#f7cc79"]},
dread_reaper:{"name": "ยมทูตเงาจันทรา", "family": "lunar scythe reaper", "height": 62, "colors": ["#171625", "#2c263d", "#4b3d58", "#82708d", "#d1b0ff", "#b5a1ad"]},
void_devourer:{"name": "มารสุญญากาศ", "family": "abyssal void devourer", "height": 63, "colors": ["#141426", "#2d2543", "#514169", "#8b72ad", "#f0aaff", "#c6b8de"]},
sun_archon:{"name": "อัครทูตแห่งดวงอาทิตย์", "family": "solar citadel guardian", "height": 88, "colors": ["#3b2326", "#805332", "#bd843f", "#efd08b", "#fff5c4", "#f6ab52"]},
cosmic_silk_oracle:{"name": "โหราจารย์ใยดารา", "family": "cosmic silk oracle", "height": 66, "colors": ["#25213b", "#544270", "#9478b1", "#d8b7f4", "#ffdbff", "#a693cc"]},
astral_chimera:{"name": "คิเมร่าดวงดาว", "family": "astral three-beast chimera", "height": 68, "colors": ["#202c42", "#4b647e", "#91b2c4", "#d9f3f4", "#fff0d4", "#c5a4e8"]},
primordial_avatar:{"name": "อวตารปฐมกาล", "family": "primordial cosmic guardian", "height": 92, "colors": ["#27213e", "#574580", "#a18ac8", "#e7dcff", "#f6e2ff", "#8ba6ef"]},
astral_vanguard:{"name": "องครักษ์ดาราเหล็ก", "family": "astral star-forged vanguard", "height": 70, "colors": ["#1d2a41", "#476482", "#91b3cb", "#dff5fc", "#fff2b6", "#82d7f2"]},
aeon_oracle:{"name": "โหราจารย์แห่งกาลนิรันดร์", "family": "eternal aeon oracle", "height": 70, "colors": ["#203047", "#466785", "#92b2c4", "#d8edf0", "#fff2be", "#bca27d"]}
};
const ENEMY_ID_RENAMES=Object.freeze({zenith_templar:"astral_vanguard",chronos_keeper:"aeon_oracle"});
const DRAW_ID_ALIASES=Object.freeze({zenith_templar:"astral_vanguard",chronos_keeper:"aeon_oracle",chaos_weaver:"cosmic_silk_oracle",council_zenith_templar:"astral_vanguard"});
const ENEMY_ART_V2=Object.freeze(profiles);
const SLIME_VARIANTS=Object.freeze({"fire": ["#4a2330", "#9b3d39", "#e17035", "#ffb458", "#fff0a0", "#ffd275"], "ice": ["#243c59", "#3d759f", "#83c9df", "#d8f4ff", "#f9ffff", "#b2e3f9"], "lightning": ["#433545", "#81703a", "#c8a943", "#ffe77b", "#ffffc7", "#f2ce61"], "earth": ["#3d3028", "#72543a", "#b28551", "#e1bd86", "#ffe3a1", "#d5ac7a"], "water": ["#233954", "#31639a", "#4fa8d5", "#9ce7f1", "#e9ffff", "#8ed5f1"], "wind": ["#26483f", "#407c65", "#80bb92", "#b9efbc", "#f4ffd6", "#c1e6b4"], "magma": ["#3a232b", "#873c31", "#e16b33", "#ffbf67", "#fff0ac", "#ff9b56"], "hail": ["#375a85", "#6c97c4", "#a9d8eb", "#e6f7ff", "#fffefb", "#c1e9fa"], "plasma": ["#391d58", "#8335a6", "#c35be2", "#f1a0ef", "#fff0ff", "#eb8cff"]});
const W=48,H=48,PX=24,PY=44;
const cache=new Map();
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function build(id,step,pose,variant){
 const finalTower=["cosmic_silk_oracle", "chaos_weaver", "astral_chimera", "primordial_avatar", "astral_vanguard", "aeon_oracle"].includes(id);
 const endgame=finalTower||["abyss_crawler", "hydra_serpent", "magma_tortoise", "cinder_drake", "gale_harpy", "cloud_elemental", "sand_stalker", "spark_wraith", "leviathan_tide", "storm_roc", "frost_crystal_golem", "blizzard_wolf", "venom_spore_beast", "crag_titan_sentinel", "glacial_hydra", "ancient_chitin_behemoth", "solar_sentinel", "radiant_phoenix", "dread_reaper", "void_devourer", "sun_archon"].includes(id);
 const refined71=finalTower||["frost_crystal_golem","blizzard_wolf","venom_spore_beast","crag_titan_sentinel","glacial_hydra","ancient_chitin_behemoth", "solar_sentinel", "radiant_phoenix", "dread_reaper", "void_devourer", "sun_archon"].includes(id);
 const density=refined71?3:endgame?2:(id==='gate_weaver'||id==='seam_warden')?1.5:1, W=48*density,H=48*density;
 const a=profiles[id], [s,m,l,h,e,t]=(id==='swarm'&&SLIME_VARIANTS[variant])||a.colors;const g=Array.from({length:H},()=>Array(W).fill(null));
 const r=(c,x,y,w,hh)=>{if(density!==1){const x2=Math.round((x+w)*density),y2=Math.round((y+hh)*density);x=Math.round(x*density);y=Math.round(y*density);w=x2-x;hh=y2-y;}for(let j=y;j<y+hh;j++)for(let i=x;i<x+w;i++)if(g[j]&&i>=0&&i<W)g[j][i]=c;};
 const p=(c,...v)=>{if(density!==1)v=v.map(n=>n*density);for(let y=0;y<H;y++){let q=[];for(let i=0;i<v.length;i+=2){let j=(i+2)%v.length,x1=v[i],y1=v[i+1],x2=v[j],y2=v[j+1];if((y1>y+.5)!=(y2>y+.5))q.push(x1+(y+.5-y1)*(x2-x1)/(y2-y1));}q.sort((a,b)=>a-b);for(let i=0;i<q.length;i+=2)for(let x=Math.ceil(q[i]-.5);x<Math.ceil(q[i+1]-.5);x++)if(x>=0&&x<W)g[y][x]=c;}};
 const breath=pose==='idle'?step%3===1?1:0:0, atk=pose==='attack'?Math.round(Math.sin(step/8*Math.PI)*4):0, hurt=pose==='hurt'?Math.round(Math.sin(step/8*Math.PI)*2):0;
 const dy=breath+hurt;
 // E9 R9: authored 96px endgame masters. Coordinates are on a new native grid,
// not upscaled R8 polygons. All local motion stays within a padded master.
if(endgame){
 const P=(c,...v)=>p(c,...v.map((z,i)=>(i%2?z:3+z*.94)/2)), R=(c,x,y,w,hh)=>r(c,(3+x*.94)/2,y/2,w*.94/2,hh/2);
 const K='#151522', D='#20232d', ivory='#fff0cf', gold='#d7aa63', bronze='#8b654a';
 const disk=(c,x,y,rad)=>{for(let j=-rad;j<=rad;j++){let w=Math.floor(Math.sqrt(rad*rad-j*j));R(c,x-w,y+j,w*2+1,1);}};
 const line=(c,w,...v)=>{for(let i=0;i<v.length-2;i+=2){let [x,y,x2,y2]=v.slice(i,i+4);let n=Math.max(1,Math.ceil(Math.max(Math.abs(x2-x),Math.abs(y2-y))));for(let k=0;k<=n;k++)disk(c,Math.round(x+(x2-x)*k/n),Math.round(y+(y2-y)*k/n),w);}};
 const limb=(w,col,hi,...v)=>{line(K,w+2,...v);line(col,w,...v);line(hi,Math.max(1,Math.floor(w/3)),...v.map((n,i)=>n-(i%2?1:1)));};
 const gem=(x,y,w,hh,col=l,light=h)=>{P(K,x,y-hh-2,x+w+2,y,x,y+hh+2,x-w-2,y);P(col,x,y-hh,x+w,y,x,y+hh,x-w,y);P(light,x,y-hh,x,y+hh-2,x-w,y);P(e,x,y-hh+2,x+1,y-2,x-2,y);};
 const scaleFacet=(x,y,w,hh,flip=0)=>{P(s,x,y,x+w,y-2,x+w+2,y+hh-3,x+w/2,y+hh,x-2,y+hh-3);P(m,x,y,x+w-1,y-1,x+w-3,y+hh-4,x+1,y+hh-3);P(l,x+1,y,x+w-3,y,x+w-5,y+2,x+1,y+3);};
 const A=atk,B=breath*2+hurt*2;
 const mix=(a,b,k)=>'#'+[1,3,5].map(i=>Math.round(parseInt(a.slice(i,i+2),16)*(1-k)+parseInt(b.slice(i,i+2),16)*k).toString(16).padStart(2,'0')).join('');
 const M=mix(m,l,.48), L=mix(l,h,.55), S=mix(s,K,.34);
 // Hand-placed highlights and bevels at the actual 96-pixel master resolution.
 const plate=(x,y,w,hgt,c=m,hi=l)=>{P(K,x,y+3,x+w*.35,y,x+w*.82,y+1,x+w,y+hgt*.38,x+w*.72,y+hgt,x+w*.22,y+hgt,x-1,y+hgt*.6);P(c,x+1,y+3,x+w*.35,y+2,x+w*.79,y+3,x+w-2,y+hgt*.4,x+w*.68,y+hgt-2,x+w*.25,y+hgt-2,x+1,y+hgt*.6);P(hi,x+1,y+4,x+w*.36,y+2,x+w*.78,y+3,x+w*.55,y+5,x+w*.27,y+5,x+2,y+hgt*.5);P(s,x+w*.82,y+5,x+w-2,y+hgt*.4,x+w*.68,y+hgt-2,x+w*.3,y+hgt-2,x+w*.53,y+hgt*.65);};
 const ridge=(c,x,y,tx,ty,w=2)=>{P(c,x-w,y,tx,ty,tx+w,ty+1,x+w,y+3);};
 if(refined71){
 // R13: independent sculpted raster masters, generated entirely from authored geometry.
 // Native 144px grid; all geometry uses a 96-unit design space. No imported pixels.
 const Z=density/2, ox=3, sx=.94, X=-A+hurt, Y=B*.38;
 const rgb=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16));
 const hex=v=>'#'+v.map(n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,'0')).join('');
 const ramp=(...cols)=>Array.from({length:11},(_,i)=>{let q=i/10*(cols.length-1),k=Math.min(cols.length-2,Math.floor(q)),f=q-k;return hex(rgb(cols[k]).map((n,j)=>n+(rgb(cols[k+1])[j]-n)*f));});
 const poly=(c,...v)=>P(c,...v); const pix=(c,x,y,w=1,h=1)=>R(c,x,y,w,h);
 const write=(i,j,c)=>{if(g[j]&&i>=0&&i<W)g[j][i]=c;};
 const uv=(i,j)=>[( (i+.5)/Z-ox)/sx,(j+.5)/Z];
 const raster=(x0,y0,x1,y1,fn)=>{for(let j=Math.max(0,Math.floor(y0*Z));j<Math.min(H,Math.ceil(y1*Z));j++)for(let i=Math.max(0,Math.floor((ox+x0*sx)*Z));i<Math.min(W,Math.ceil((ox+x1*sx)*Z));i++){let [x,y]=uv(i,j),c=fn(x,y);if(c)write(i,j,c);}};
 const shade=(pal,n)=>pal[Math.max(0,Math.min(10,Math.round(n*10)))];
 const ell=(cx,cy,rx,ry,ang,pal,mode='smooth',edge=1)=>{let ca=Math.cos(ang),sa=Math.sin(ang),rad=Math.max(rx,ry)+2;raster(cx-rad,cy-rad,cx+rad,cy+rad,(x,y)=>{let dx=x-cx,dy=y-cy,u=(dx*ca+dy*sa)/rx,v=(-dx*sa+dy*ca)/ry,d=u*u+v*v;if(d>1)return null;if(d>Math.pow(1-edge/Math.max(rx,ry),2))return K;let z=Math.sqrt(1-d),nx=u*ca-v*sa,ny=u*sa+v*ca;let light=.08+.83*Math.max(0,-.47*nx-.67*ny+.62*z);if(mode==='fur'){let f=Math.sin(1.6*(y-.43*x)+Math.sin(x*.46)*1.4);light+=.045*f+.018*Math.sin(x*2+y*.5);}if(mode==='stone'){light+=.08*Math.sin(x*.65+y*.46)*Math.sin(y*.85-x*.38);}if(mode==='shell'){light+=.06*Math.sin((u*.85+v)*15);light+=.13*Math.exp(-Math.pow((v+.36)*8,2));}return shade(pal,light);});};
 const curve=(points)=>{let arr=[];for(let k=0;k<points.length-1;k++){let a=points[Math.max(0,k-1)],b=points[k],c=points[k+1],d=points[Math.min(points.length-1,k+2)];let n=Math.max(5,Math.ceil(Math.hypot(c[0]-b[0],c[1]-b[1])));for(let j=0;j<n;j++){let t=j/n,t2=t*t,t3=t2*t;arr.push([0,1,2].map(i=>.5*((2*b[i])+(-a[i]+c[i])*t+(2*a[i]-5*b[i]+4*c[i]-d[i])*t2+(-a[i]+3*b[i]-3*c[i]+d[i])*t3)));}}arr.push(points.at(-1));return arr;};
 const tube=(pts,pal,mode='smooth',edge=1.2)=>{let arr=curve(pts),xs=arr.map(p=>p[0]),ys=arr.map(p=>p[1]),max=Math.max(...arr.map(p=>p[2]))+2;raster(Math.min(...xs)-max,Math.min(...ys)-max,Math.max(...xs)+max,Math.max(...ys)+max,(x,y)=>{let best=2,bidx=0,bu=0;for(let k=0;k<arr.length;k++){let p=arr[k],d=((x-p[0])**2+(y-p[1])**2)/(p[2]**2);if(d<best){best=d;bidx=k;}}if(best>1)return null;let p=arr[bidx];if(best>Math.pow(1-edge/p[2],2))return K;let dx=(x-p[0])/p[2],dy=(y-p[1])/p[2],z=Math.sqrt(1-best);let light=.075+.84*Math.max(0,-.47*dx-.61*dy+.66*z);if(mode==='fur')light+=.045*Math.sin(y*1.8-x*.6+Math.sin(x*.7));if(mode==='scale')light+=.08*Math.cos(bidx*.72+dx*3)*Math.cos((x+y)*1.2);if(mode==='rib')light+=.1*Math.cos(bidx*.9);return shade(pal,light);});};
 const facet=(pts,pal,style='stone')=>{let xx=pts.filter((n,i)=>i%2===0),yy=pts.filter((n,i)=>i%2===1),x0=Math.min(...xx),x1=Math.max(...xx),y0=Math.min(...yy),y1=Math.max(...yy);raster(x0,y0,x1,y1,(x,y)=>{let inside=false,dist=100;for(let i=0,j=xx.length-1;i<xx.length;j=i++){let a=xx[j],b=yy[j],c=xx[i],d=yy[i];if((b>y)!=(d>y)&&x<(c-a)*(y-b)/(d-b)+a)inside=!inside;let u=c-a,v=d-b,t=Math.max(0,Math.min(1,((x-a)*u+(y-b)*v)/(u*u+v*v||1)));dist=Math.min(dist,Math.hypot(x-a-t*u,y-b-t*v));}if(!inside)return null;if(dist<.8)return style==='fur'||style==='belly'?shade(pal,.27):K;let u=(x-x0)/(x1-x0||1),v=(y-y0)/(y1-y0||1),light=.99-u*.42-v*.37;if(style==='crystal'){light=u<.37?.89-v*.17:u<.68?.63-v*.15:.34-v*.10;if(dist<1.8)light+=.12;}else if(style==='metal'){light+=.22*Math.exp(-Math.pow((v+.38*u-.36)*8,2));if(dist<1.9)light+=.12;}else{light+=.055*Math.sin(x*.9+y*.55)*Math.sin(y*.9);if(dist<1.65&&v<.6)light+=.12;}return shade(pal,light);});};
 const F=(pal,...pts)=>facet(pts,pal);const metal=(pal,...pts)=>facet(pts,pal,'metal');const crystal=(pal,...pts)=>facet(pts,pal,'crystal');
 const shard=(x,y,w,hh,pal,tilt=0)=>crystal(pal,x-w,y+hh*.75,x-w*.65,y+hh*.21,x+tilt,y,x+w,y+hh*.3,x+w*.65,y+hh*.84,x,y+hh);
 const fang=(x,y,tx,ty,w,pal)=>tube([[x,y,w],[x+(tx-x)*.45,y+(ty-y)*.58,w*.7],[tx,ty,.8]],pal,'smooth',.55);
 const eye=(x,y,c='#fff3ba',size=2)=>{poly(K,x-4,y-1,x+4,y-3,x+3,y+3,x-4,y+2);pix(c,x-2,y-1,size+1,2);pix('#fffef0',x-2,y-1,1,1);};
 const bone=ramp('#322839','#806d62','#c9ae82','#fff4cf');
 if(finalTower){
 // R18: individually authored silhouettes, planar highlights and material-specific detailing.
 const dx=-atk*1.15+hurt,dy=breath*.8+hurt*.4;
 const Q=(c,...v)=>poly(c,...v.map((a,i)=>a+(i%2?dy:dx)));
 const S=(c,w,...v)=>line(c,w,...v.map((a,i)=>a+(i%2?dy:dx)));
 const star=(x,y,w=2,c='#dbf9ff')=>{Q(c,x,y-w*2,x+w*.5,y-1,x+w*1.5,y,x+w*.5,y+1,x,y+w*2,x-.5*w,y+1,x-w*1.5,y,x-.5*w,y-1);};
 const panel=(colors,...v)=>{let xx=v.filter((_,i)=>!(i%2)),yy=v.filter((_,i)=>i%2),cx=xx.reduce((a,b)=>a+b,0)/xx.length,cy=yy.reduce((a,b)=>a+b,0)/yy.length;Q(K,...v);let a=v.map((z,i)=>z*.9+(i%2?cy:cx)*.1);Q(colors[0],...a);let b=a.map((z,i)=>z*.80+(i%2?cy:cx)*.20);Q(colors[1],...b);Q(colors[2],...a.slice(0,4),...b.slice(2,4),...b.slice(0,2));S(colors[3],0,...a.slice(0,4));};
 const silver=['#34475e','#728da8','#b7d4e3','#e9ffff'], gold2=['#543746','#ac7754','#e0b97b','#fff0bd'], void2=['#272039','#514574','#876bae','#d5b9f0'];
 const violet=ramp('#141525','#302446','#614576','#aa80c0','#edcdf9'), teal=ramp('#142037','#264d68','#548fa4','#aadbe3','#edffff'), fur=ramp('#22243c','#3b4262','#6d7b9b','#b2c4db','#e9edf9');
 const horn=ramp('#392f4c','#7a6584','#c2a9c6','#f8e9d7');
 const gem2=(x,y,w,h,c='#79e2e8')=>{Q(K,x,y-h-1,x+w+1,y,x,y+h+1,x-w-1,y);Q(c,x,y-h,x+w,y,x,y+h,x-w,y);Q('#d8faff',x,y-h,x,y+h-1,x-w,y);Q('#ffffff',x,y-h+2,x+1,y-1,x-2,y);};
 const folds=(pal,v,lines)=>{Q(K,...v);let cx=v.filter((_,i)=>!(i%2)).reduce((a,b)=>a+b,0)/(v.length/2),cy=v.filter((_,i)=>i%2).reduce((a,b)=>a+b,0)/(v.length/2);Q(pal[0],...v.map((z,i)=>.96*z+.04*(i%2?cy:cx)));for(const [c,...pts] of lines)Q(c,...pts);};
 if(id==='cosmic_silk_oracle'||id==='chaos_weaver'){
 // R19: astral drider. Eight articulated legs, a coherent chitin exoskeleton,
 // directional metal and silk highlights, and a left-facing porcelain mask.
 const shell=['#17182c','#292942','#554968','#89739d','#b9a1d4','#e0c9ef'];
 const trim='#b5a0cb', pale='#e6d9f4', dark='#171524', mid='#51446b';
 const shape=(outline,base,highlight,shadow)=>{Q(K,...outline);Q(base,...outline.map((v,i)=>v*.97+(i%2?outline.filter((_,j)=>j%2).reduce((a,b)=>a+b,0)/(outline.length/2):outline.filter((_,j)=>!(j%2)).reduce((a,b)=>a+b,0)/(outline.length/2))*.03));if(highlight)Q(...highlight);if(shadow)Q(...shadow);};
 // Each leg has a wide proximal segment, knife-shaped tibia and tapered claw.
 // Articulated legs, not round tubes: independently move their knees while feet stay anchored.
 const leg=(a,b,c,d,near,idx)=>{
  const k=pose==='idle'?(step===1?((idx%2)?-.65:.65):0):pose==='attack'?Math.sin(step/8*Math.PI)*(idx<2?-2:1):hurt*.4;
  b=[b[0]+k,b[1]-k];c=[c[0]-k*.4,c[1]+k*.3];
  const seg=(u,v,w0,w1,lit)=>{let vx=v[0]-u[0],vy=v[1]-u[1],len=Math.hypot(vx,vy)||1,nx=-vy/len,ny=vx/len;
    let outline=[u[0]+nx*w0,u[1]+ny*w0,v[0]+nx*w1,v[1]+ny*w1,v[0]-nx*w1,v[1]-ny*w1,u[0]-nx*w0,u[1]-ny*w0];Q(K,...outline);
    let a0=w0*.69,a1=w1*.55;Q(near?shell[2]:shell[1],u[0]+nx*a0,u[1]+ny*a0,v[0]+nx*a1,v[1]+ny*a1,v[0]-nx*a1,v[1]-ny*a1,u[0]-nx*a0,u[1]-ny*a0);
    Q(near?lit:shell[2],u[0]-nx*a0,u[1]-ny*a0,v[0]-nx*a1,v[1]-ny*a1,v[0],v[1],u[0]-nx*.15,u[1]-ny*.15);};
  seg(a,b,near?5.3:4.4,3.8,shell[3]);seg(b,c,4.2,2.8,shell[4]);seg(c,d,3.1,.8,shell[3]);
  for(const [x,y] of [b,c]){Q(K,x-3.6,y-1,x-.6,y-3.3,x+3.3,y-1.7,x+2.5,y+2.7,x-1.8,y+3);Q(near?shell[3]:shell[2],x-2.1,y-1,x-.4,y-2.1,x+2,y-1,x+1.5,y+1.6,x-1.1,y+1.7);if(near)S(shell[5],0,x-1.8,y-1.4,x+.7,y-2);}
  if(near){S('#9786b0',0,c[0],c[1]+1,d[0],d[1]-1);}
 };
 // Four far legs, arranged on distinct trajectories behind the body.
 const legsFar=[[[45,49],[26,46],[10,61],[3,79]],[[53,50],[39,61],[25,71],[18,85]],[[60,50],[75,45],[85,59],[92,77]],[[64,53],[83,54],[91,68],[88,85]]];
 legsFar.forEach((a,i)=>leg(...a,false,i));
 // Broad, tapered abdomen with interlocking shell plates and directional facets.
 Q(K,45,43,49,32,60,25,73,24,85,29,92,39,91,50,83,59,71,64,58,61,49,54);
 ell(68+dx,44+dy,22,18,-.15,violet,'shell',1.1);
 Q('#211d35',49,42,54,32,64,27,74,27,83,32,89,40,86,51,77,59,64,61,54,54);
 Q('#57456f',50,41,56,32,66,28,76,30,83,35,72,40,65,47,57,52);Q('#8d76ab',53,39,59,32,68,29,77,32,68,35,62,39,58,47);
 Q('#ba9fcf',58,32,67,30,74,32,66,34,60,38);Q('#e2d0ed',61,32,68,31,71,32,65,33);
 Q('#3e3455',76,41,85,36,88,42,84,51,77,57,68,59,65,54,72,50);Q('#75618f',82,40,85,39,84,47,77,52,73,53,79,47);
 // Sweeping seams follow the curved carapace rather than random ornament.
 S('#18172a',1,54,34,61,41,64,49,62,58);S('#ae95c7',0,55,34,62,40,65,48);S('#211b31',1,70,29,75,36,79,40,76,50,72,58);S('#8b74a5',0,71,30,76,36,80,40);S('#15192c',1,50,45,59,49,68,51,76,50,84,46);
 Q('#121b30',61,40,66,36,72,38,74,43,70,50,64,52,60,47);Q('#4f4078',62,40,66,38,71,40,72,44,69,48,65,49,62,46);Q('#8c79d1',63,42,67,39,70,42,69,46,66,48,63,46);Q('#d2c9f8',65,42,67,40,69,42,67,45,65,46);S('#91e6f0',0,66,41,68,42);S('#b1a0cc',0,53,34,59,29,65,27,73,27);S('#e1c9e8',0,59,29,65,28,70,28);S('#9080b8',0,80,31,87,36,89,41);
 for(const [x,y] of [[55,38],[60,54],[79,34],[83,48],[75,56]]){Q('#b7a0d3',x-1,y,x+1,y-1,x+2,y,x,y+1);}
 // Thorax is an articulated section joining the humanoid and abdomen.
 Q(K,32,44,41,39,52,42,61,52,57,61,49,66,37,62,29,54);Q('#352c4a',34,45,41,41,50,44,58,52,55,59,49,63,38,60,31,53);Q('#74618e',35,45,42,42,48,44,49,51,39,54,34,51);Q('#af99c9',36,45,42,43,46,44,40,48);Q('#514361',49,52,55,53,52,59,46,61,40,58);
 // Four near legs: staggered feet and visible elbows.
 const legsNear=[[[36,50],[21,51],[13,68],[6,85]],[[41,55],[31,65],[22,77],[16,87]],[[49,56],[54,65],[47,78],[40,87]],[[56,54],[73,63],[70,76],[64,87]]];
 legsNear.forEach((a,i)=>leg(...a,true,i));
 // Humanoid body: arched back, narrow waist, silk robe over the thorax.
 Q(K,29,23,41,20,49,27,49,37,45,45,48,52,42,58,35,53,28,48,31,38,25,31);
 Q('#2b223e',29,25,40,22,47,28,47,36,42,44,46,51,42,55,35,51,30,47,33,38,27,31);
 Q('#79618f',30,27,36,24,42,25,40,32,36,39,35,46,31,48,34,37);Q('#a48ab9',31,27,36,25,38,27,35,34,33,39,32,33);Q('#4b3b61',42,28,46,29,45,36,40,43,44,50,41,53,38,45,39,37);
 Q('#b69bc9',33,28,36,26,38,27,35,31,34,35,33,34);Q('#30243e',36,39,42,38,43,41,38,44,34,43);S('#a88abf',0,34,43,38,45,42,42);Q('#a88eb8',37,46,39,47,38,52,34,50);Q('#6d557d',42,46,45,51,42,54,40,51);
 // Narrow trailing silk panels and silver embroidery at the waist.
 Q(K,32,44,38,46,39,53,32,62,25,65,29,56,28,51);Q('#463554',33,46,36,47,37,53,31,60,28,62,31,55,30,51);Q('#957aa9',32,47,34,48,33,53,30,58,31,53);S('#c0a4d2',0,32,47,34,50,31,56,28,62);
 Q(K,42,46,47,48,52,56,49,65,43,60,40,53);Q('#4b3d65',43,48,46,49,50,56,48,62,44,59,42,53);S('#b6a0d0',0,44,49,48,56,47,60);
 // Shoulder armor, sculpted curves, hand extended toward target.
 Q(K,28,25,23,28,22,33,26,37,32,33,34,28);Q('#a38ab7',28,26,24,29,24,32,27,34,31,32,32,28);Q('#c4add9',25,29,28,27,31,28,28,30,25,31);
 const reach=Math.min(2,atk*.8);Q(K,25,32,22,35,19,43,12-reach,43,8-reach,40,4-reach,42,5-reach,46,13-reach,49,22,47,29,37);Q('#59466f',25,34,23,37,20,44,13-reach,45,8-reach,43,7-reach,45,14-reach,47,21,46,27,37);Q('#a58bb9',24,35,23,38,21,43,18,44,19,41);S('#d6c3e5',0,20,45,14-reach,46,9-reach,44);
 Q(K,43,26,49,27,53,31,53,37,49,43,39,44,34-reach*.4,40,36-reach*.4,37,43,39,47,35,45,32);Q('#66517d',44,28,48,29,51,32,51,36,48,41,40,42,37-reach*.4,40,39,39,45,40,49,35,47,31);S('#c5acd8',0,49,31,50,34,47,39,42,40);
 // Long swept headdress. White mask is angled left, eye slit and jaw distinguish face.
 Q(K,25,22,25,15,29,9,36,6,40,9,45,17,48,25,43,28,36,26,32,31,26,28);Q('#342744',26,22,27,15,30,11,36,8,39,11,43,18,45,24,42,26,36,24,32,29,28,27);
 Q('#8b70a3',28,17,31,11,36,9,38,12,34,15,31,21,28,23);Q('#c0a4d6',30,13,35,10,36,11,32,15,30,18);Q('#544066',40,13,43,18,45,23,42,24,40,19,38,17);
 Q(K,26,20,32,17,38,18,40,22,35,27,30,28,25,25,23,23);Q('#d0c1d8',26,21,32,18,37,19,38,22,34,26,30,27,26,24,25,23);Q('#fff0fa',26,21,32,19,35,20,31,22,27,24,25,23);Q('#55445f',31,23,36,22,34,26,30,26);S('#1a1930',1,26,22,31,21,34,21);S('#ecadf6',0,27,22,30,21);Q('#f4e8f7',26,24,29,24,28,25);
 // Taut silk threads and small suspended spindle: mostly within the silhouette.
 let tx=9-reach,ty=32-(pose==='attack'?atk*.5:0);
 S('#5e4c84',0,tx,ty-8,tx+6,ty,tx,ty+9,tx-5,ty,tx,ty-8);S('#a697d8',0,tx,ty-8,tx+6,ty,tx,ty+9);Q('#2f2854',tx,ty-5,tx+3,ty,tx,ty+5,tx-3,ty);Q('#ba9be9',tx,ty-4,tx+2,ty,tx,ty+4,tx-2,ty);Q('#e4d9ff',tx,ty-3,tx+1,ty,tx,ty+1,tx-1,ty);S('#bba1e5',0,tx,ty+9,12-reach,44,37-reach*.4,40);
 }else if(id==='astral_chimera'){
 // R20: astral chimera. Low, powerful leonine quadruped with an integrated goat
 // shoulder/neck and an independently moving serpent tail. Authored pixel planes.
 const furDark='#292c43',furMid='#56617c',furLight='#a5b6cd',furHi='#e1e7e8', maneDark='#33263f',maneMid='#695374',maneLight='#a68fb4',maneHi='#d8c8e1';
 const beast=ramp('#232538','#414c64','#748aa4','#b4c5d6','#e2e7eb');
 const goat=ramp('#29283d','#4a4c64','#8e94ad','#d4d7dc');
 const snake=ramp('#192d41','#315c73','#5c9eae','#a9dce0','#e2ffff');
 const tusk=ramp('#3c3445','#826e88','#c5adc0','#f6e6d1');
 const shp=(c,v,hi,sh)=>{Q(K,...v);const n=v.length/2;let cx=0,cy=0;for(let i=0;i<v.length;i+=2){cx+=v[i]/n;cy+=v[i+1]/n;}Q(c,...v.map((z,i)=>z*.965+(i%2?cy:cx)*.035));if(hi)Q(...hi);if(sh)Q(...sh);};
 const t=(pts,pal,mode='fur',edge=1)=>tube(pts.map(([x,y,w])=>[x+dx,y+dy,w]),pal,mode,edge);
 const flex=pose==='attack'?Math.sin(step/8*Math.PI)*2:breath*.65;
 // Serpentine tail behind the haunches. Directional belly scutes, real jaws and eye.
 t([[75,52,6],[87,46,5.1],[93,35,4.2],[91,23-flex,4],[84,17-flex,3.8],[77,19-flex,3.7]],snake,'scale',.9);
 for(const [x,y,a] of [[86,47,-.6],[90,40,-.3],[92,32,0],[90,24-flex,.5],[85,19-flex,.8]]){S('#8bc2ca',0,x-2,y-2*a,x+1.5,y+1);}
 let sy=19-flex;
 shp('#568d9e',[78,sy-6,72,sy-7,66,sy-3,62,sy,65,sy+4,71,sy+3,75,sy+6,81,sy+3,83,sy-1],['#a6d7dd',66,sy-2,72,sy-5,77,sy-4,75,sy-1,68,sy],['#294b65',66,sy+2,72,sy+1,78,sy+1,79,sy+3,74,sy+5,70,sy+2]);
 Q(K,63,sy,69,sy-1,73,sy+1,69,sy+2,64,sy+2);Q('#f5e7d9',66,sy+1,68,sy+1,67,sy+4);S('#d19ad3',0,64,sy+1,60,sy+3,58,sy+2);Q('#d8f6dd',70,sy-4,74,sy-4,73,sy-2,70,sy-2);Q('#26334a',72,sy-4,73,sy-4,73,sy-2,72,sy-2);
 // Far legs in deep shadow; feline digitigrade rear hock and grounded forepaw.
 shp('#39455f',[66,50,78,51,79,60,75,66,81,75,87,82,86,85,74,85,72,82,73,77,67,70,64,62],['#65768c',70,54,76,54,75,61,70,66,68,61],['#242b40',74,67,81,77,84,81,77,82,72,75]);
 shp('#3d4a62',[38,48,47,50,46,62,42,70,43,78,49,81,48,85,34,85,32,82,36,76,35,66,34,57],['#667b94',39,52,44,52,42,65,38,69,37,60],['#252d42',39,69,42,72,40,80,46,83,36,83]);
 // Continuous body silhouette, not disconnected ellipses. Broad shoulder, tucked abdomen.
 let body=[24,40,31,31,42,30,54,34,66,32,77,35,84,43,85,51,80,59,73,64,63,62,55,59,45,63,36,65,29,60,23,52];
 shp(furMid,body,['#8194ae',29,40,34,34,43,33,54,37,65,35,76,38,81,44,71,43,60,42,48,43,39,49,28,48],['#30394f',27,51,38,54,49,53,59,57,70,57,80,52,77,60,71,62,62,59,53,57,44,61,36,62,30,58]);
 // Muscle groups in tapered, interlocking fur planes.
 Q('#687d97',34,40,43,37,52,42,48,48,42,53,34,57,30,49);Q('#9eb3ca',35,40,42,39,46,41,42,44,37,49,34,51,35,45);Q('#495d78',44,47,49,45,58,46,62,50,59,54,52,52,45,57,40,56);Q('#8398ad',53,39,66,36,74,39,69,42,62,42,57,44);Q('#6e839d',70,43,78,43,82,48,78,55,72,58,64,54,66,48);Q('#adbed0',73,43,78,45,79,49,75,52,70,52,70,47);Q('#45556e',64,52,69,55,77,54,74,60,67,60,61,57);
 // Goat head rooted in the back: a distinct neck, swept horns, pointed ear and beard.
 t([[57,40,9],[58,30,7.8],[55,22-flex*.35,6.2]],goat,'fur',.95);
 Q('#39425a',52,29,57,28,63,34,63,41,56,43,52,39);Q('#a9b3c8',52,27,56,27,57,32,55,38,51,36,53,32);Q('#66738a',59,28,63,32,61,37,58,36);
 t([[58,18,3.3],[62,12,3],[62,6,2.3],[58,3,1.5],[54,4,.8]],tusk,'rib',.65);
 t([[51,18,3.2],[45,13,2.8],[43,7,2],[46,3,1.3],[50,3,.7]],tusk,'rib',.65);
 shp('#7d839b',[49,17,54,14,60,17,62,22,59,28,55,31,51,27,45,26,41,22,44,19],['#c9d0de',45,20,50,17,55,17,58,20,54,22,48,23,42,22],['#49465f',46,24,53,23,58,22,58,27,54,29,51,26]);
 Q(K,59,19,67,16,65,22,60,24);Q('#a6a2b3',60,20,65,18,64,21,60,22);Q(K,42,21,46,20,48,22,46,24,42,23);Q('#e9e7db',48,19,53,18,54,20,50,21);Q('#24263a',50,19,51,19,51,21,50,21);Q('#555069',51,27,56,27,55,33,52,36,52,32,49,33);S('#b2a7c3',0,53,28,53,32);
 // Foreground legs are jointed with strong taper and weight on the front paw.
 shp('#637893',[31,49,41,49,44,55,41,63,34,68,30,76,29,81,34,84,33,87,15,87,14,84,21,80,22,73,24,62,25,55],['#a4b7ce',30,52,37,51,40,54,37,60,32,65,28,67,28,58],['#3e4e68',34,63,36,66,32,71,30,80,33,83,27,84,25,80,26,72,29,67]);
 Q('#7c92aa',24,69,28,68,28,77,24,81,20,82,22,77);Q('#c0cfdb',24,71,26,70,25,77,23,79);Q('#899db2',16,84,21,82,28,82,30,84,28,85,17,85);
 shp('#657b93',[68,48,77,45,83,49,84,56,80,63,71,69,70,73,75,78,81,81,84,84,83,87,65,87,62,84,63,78,59,72,58,65,61,56],['#a9bcd0',69,49,77,48,81,52,79,57,74,62,67,65,63,61,65,55],['#3e4c65',70,64,74,65,70,70,69,74,75,81,81,83,76,85,68,83,65,77,62,72,65,68]);
 Q('#8da4b9',65,67,68,67,66,72,68,77,66,81,63,79,61,73);Q('#9fb0c1',66,84,73,82,79,83,81,85,68,85);
 for(const x of [16,21,26,34,39,44,65,70,76,80])Q('#d9dbe0',x,84,x+2,84,x+2,86,x,86);
 // Mane wraps the neck and shoulder; deliberately hand-placed flowing clumps.
 shp(maneMid,[17,30,22,23,31,22,36,26,40,27,45,35,49,40,45,45,48,52,42,51,40,59,35,56,31,63,28,58,23,59,23,52,17,54,18,47,11,45,14,39,11,34],['#927da5',18,30,24,25,31,25,36,30,40,31,44,37,39,36,40,42,35,40,34,48,29,44,29,53,25,49,22,43,16,43,19,37,15,35],['#45344f',30,43,37,44,41,39,45,43,40,48,44,51,39,52,37,57,34,53,30,59,28,53,24,54,25,47]);
 for(const v of [[19,30,24,26,30,26,25,29,22,33],[28,26,33,27,37,31,32,30,28,33],[37,32,42,36,39,38,36,36],[31,34,36,36,35,42,32,40],[27,42,30,45,29,50,26,47],[37,45,39,47,36,53,34,49],[20,43,23,46,22,49,19,47]])Q(maneLight,...v);
 Q(maneHi,21,29,25,27,29,27,25,29,23,31);Q('#c0add0',33,29,36,31,33,31,31,30);Q('#c0add0',30,37,34,38,32,41,30,40);
 // Lion skull, short broad nose, eye under heavy brow and open snarling mouth.
 let hx=pose==='attack'?-flex:0;
 const H=(c,...v)=>Q(c,...v.map((z,i)=>i%2?z:z+hx));
 H(K,8,29,13,25,21,24,27,28,31,33,28,39,25,44,20,47,14,43,8,41,4,36,4,32);
 H('#7689a2',9,30,14,26,21,26,26,29,29,33,26,38,24,43,20,45,15,41,9,39,6,35,6,32);
 H('#c3d1df',11,29,16,27,21,28,24,30,20,33,15,32,10,34,6,33);H('#a7b9cd',7,35,14,33,20,34,24,37,19,39,12,38,7,37);H('#46516c',24,31,28,33,26,37,23,39,20,35);H('#d2dce4',14,40,20,40,23,42,20,45,16,43,11,41);
 H(K,5,32,11,31,14,34,11,36,6,36,5,34);H('#a0a7bb',6,32,10,32,10,33,7,33);
 H('#211a30',9,38,16,37,23,38,25,41,21,43,16,41,12,40);H('#ae7289',15,40,20,40,22,41,18,42);H('#fff2dc',13,38,16,38,15,41);H('#fff2dc',21,38,23,39,21,41);H('#e0e0dd',19,41,21,42,19,43);
 H(K,16,29,22,28,25,31,22,33,16,32);H('#cef7f5',17,30,22,29,23,31,19,32);H('#274a64',20,30,21,30,21,32,20,32);H('#efffff',17,30,18,30,18,31,17,31);
 H(K,23,25,24,20,29,23,29,28,27,29);H('#9d94b3',25,23,27,24,27,27,25,26);
 for(const [x,y] of [[9,35],[11,36],[14,35]])H('#475569',x,y,x+1,y,x+1,y+1,x,y+1);
 // Directional fur notches across shoulder and flank, with restrained constellation accents.
 for(const [x,y,w] of [[40,35,5],[46,37,5],[52,39,6],[62,38,5],[70,39,5],[77,44,4],[43,50,5],[52,48,5],[57,53,4],[67,48,4],[31,55,3],[29,60,3],[70,56,4]]){Q('#41536d',x,y,x+w,y+1,x+w-2,y+3,x+1,y+2);Q('#a1b3c9',x,y-1,x+w-1,y,x+2,y+1);}
 // Celestial markings lie inside the coat: small constellation lines, not floating gems.
 S('#8a8cbf',0,49,39,54,43,61,41,66,45);for(const [x,y] of [[49,39],[54,43],[61,41],[66,45]]){Q('#b8c4eb',x,y-1,x+1,y,x,y+1,x-1,y);}
 Q('#cfb9e6',58,48,59,46,60,48,59,50);Q('#d6ecf5',59,47,60,48,59,49,58,48);
 }else if(id==='primordial_avatar'){
 // R24: the incarnation of the first star. Authored silhouettes and pixel clusters.
 const I='#100e1c',D0='#1b172c',D1='#27213d',D2='#392b54',V0='#493569',V1='#674c8f',V2='#9274b9',V3='#c7a6e4',N0='#1a2b42',N1='#35465e',N2='#657f9b',N3='#a1baca',N4='#e1e9e8',G0='#513647',G1='#875b50',G2='#b98c5e',G3='#e7c38a',G4='#fff0bf',C0='#385d89',C1='#68c2d7',C2='#d7ffff';
 const L=(c,...v)=>S(c,0,...v);
 const A=(c,...v)=>Q(c,...v);
 // Broken celestial aureole: individually beveled rays, no flat circle.
 A(I,57,5,69,1,79,2,88,8,94,20,90,17,84,9,76,6,67,5,61,9);
 A(G1,59,5,69,2,79,3,87,9,92,17,88,14,83,8,76,5,68,4,62,7);
 L(G3,60,5,69,2,79,3,87,9);L(G4,68,2,75,2,79,3);
 A(I,17,13,22,7,29,4,27,8,23,12,21,18,18,21,18,17);
 A(G2,18,13,23,8,27,6,25,9,22,13,20,18,19,18);L(G4,20,12,23,8,25,7);
 // Sweeping mantle of night, with branching torn silk fins. Draw behind all anatomy.
 A(I,41,24,52,17,64,19,73,13,81,6,79,20,88,13,84,29,92,25,87,42,81,50,86,63,94,76,86,73,92,87,82,83,81,94,70,85,65,94,58,81,52,92,44,83,31,92,34,77,23,83,29,64,31,46,25,33);
 A(D1,42,25,52,19,64,21,73,15,79,9,77,23,85,16,81,31,88,28,85,41,79,50,84,64,90,74,83,70,88,83,80,79,79,89,69,82,65,90,59,78,52,88,44,80,34,88,36,74,26,79,31,64,33,46,28,34);
 A('#423561',57,22,65,23,76,17,73,28,80,22,76,39,70,46,72,57,80,70,79,78,69,66,64,50,62,37);
 A('#624780',62,23,69,22,75,18,72,28,67,34,65,43,64,36);A(V1,65,24,71,22,68,29,66,34);L(V3,67,24,71,21,69,26);
 A('#634982',72,38,80,30,84,28,80,39,75,44,72,51,72,60,79,72,75,68,69,59,68,50);A(V1,76,36,81,31,79,38,74,45,73,51,72,45);L(V2,78,34,74,40,72,45);
 A(D0,70,54,76,54,80,65,86,74,80,71,84,82,78,77,72,68);A(V0,73,56,76,61,80,70,77,68,74,62);L(V2,75,59,77,65,80,70);
 A('#5a437b',62,48,66,58,65,71,70,82,65,86,61,74,61,63,59,56);A(V1,63,53,64,61,63,72,66,79,64,77,62,71);L(V2,63,59,63,68,64,74);
 A(D0,46,47,53,44,58,59,55,70,58,81,52,87,48,77,47,65);A(V0,49,53,52,51,54,60,52,72,54,80,51,77,49,66);L(V2,51,54,52,61,50,69);
 A(D2,33,43,41,39,45,50,41,65,37,77,29,82,33,69,35,58);A(V0,35,46,39,44,40,54,37,66,34,74,34,68,37,57);L(V2,37,46,38,51,36,62);
 // Edge-lit silk. Long tapered reflected streaks guide the silhouette.
 L('#a38acb',79,10,77,19,74,24);L('#d1b5e8',78,12,77,17);
 L('#a38acb',85,17,82,27,79,32);L('#8bbdd6',88,29,84,36,81,41);
 A('#53406d',81,50,84,58,87,67,84,64,80,56);L('#ad91c9',81,51,83,58,86,65);
 L('#8066a5',88,76,82,71,78,65);L('#967dbd',78,88,73,80,68,73);
 L('#8b73b0',66,88,63,81,60,74);L('#b49bd5',62,82,60,78);
 // Sparse star clusters, embroidery along the folds rather than noise.
 for(const [x,y,c] of [[69,29,V3],[77,35,C1],[73,46,V2],[78,65,C1],[66,73,V3],[55,63,V2],[70,79,V2],[33,70,V3],[81,75,V2],[61,35,C1]]){A(c,x,y-1,x+.8,y,x,y+1,x-.8,y);}
 L(G1,78,17,74,26,71,32);L(G2,77,19,74,25);L(G1,85,28,80,40,74,46);L(G2,84,30,81,36);L(G1,80,88,73,80,68,73);L(G1,64,88,61,81,58,76);
 // Split, floating lower regalia. Clear waist and leg-shaped divisions, no bulky skirt.
 A(I,40,49,55,48,63,56,62,65,66,78,61,89,55,82,50,92,44,86,39,92,33,88,24,91,30,79,32,67,34,58);
 A(D0,41,51,54,50,61,57,60,66,63,77,60,85,55,79,50,88,44,83,39,88,33,85,28,87,32,79,34,66,36,59);
 A(D2,36,57,42,53,44,58,41,69,35,79,32,84,35,72,36,63);A(V1,37,58,40,55,41,58,39,67,35,77,36,69);A(V2,38,57,39,56,38,64,36,70);
 A(N0,43,55,49,53,53,59,49,69,47,80,44,85,41,83,43,73,42,64);A(N1,44,58,48,55,49,60,46,69,45,79,43,82,44,70);A(N2,45,58,47,57,46,65,44,70);L(G2,43,57,43,65,44,70,42,81);
 A(D2,53,54,58,56,58,65,56,73,61,82,58,80,54,74,53,66);A(V1,54,58,56,59,56,66,55,72,57,77,54,74,54,65);L(V2,55,60,55,67,54,71);
 // long central ceremonial sash, tapering rather than a flat rectangular panel
 A(I,45,54,52,53,54,60,52,72,54,81,50,89,46,82,42,87,43,76,43,66);A(V0,46,56,51,55,52,60,50,72,52,81,50,86,46,79,44,83,45,76,45,65);A(V1,46,56,49,56,48,68,47,78,45,81,46,70);L(G3,46,57,45,65,45,75,44,82);L(G2,51,57,51,61,49,72,51,81,50,85);for(let yy=60;yy<79;yy+=6){A(G1,48,yy-2,50,yy,48,yy+2,46,yy);A(G3,48,yy-1,49,yy,48,yy+1,47,yy);}
 // narrow articulated waist and breastplate, built as interlocking metal planes.
 A(I,39,40,54,39,61,48,55,57,48,60,40,57,34,50);A(N0,40,42,53,41,58,48,54,55,48,57,41,55,36,50);A(N1,39,43,44,45,45,51,40,53,37,49);A(N2,39,45,42,46,43,50,40,51);A(N1,50,44,54,43,56,48,52,54,49,54);L(G2,40,54,48,57,54,54);A(G3,47,51,50,54,47,57,44,54);
 A(I,34,26,43,19,52,19,62,25,65,33,61,41,54,46,48,51,41,46,33,42,29,35);
 A(N0,35,27,43,21,52,21,60,26,63,33,59,40,53,44,48,48,42,44,35,40,31,35);
 A(N1,35,28,43,22,47,26,44,33,39,36,33,34);A(N2,35,28,43,23,44,25,40,30,34,33);A(N3,36,28,42,24,42,26,37,29);L(N4,36,28,40,25);
 A(N1,49,26,52,22,60,27,60,34,54,40,50,38,53,32);A(N2,53,24,59,28,58,32,53,34,54,30);A(N3,53,25,57,27,56,29,53,29);L(N4,53,24,57,26);
 A(D2,34,35,39,38,43,38,44,43,41,44,35,40);A(D2,53,38,58,35,59,38,54,43,50,46,49,43);
 L(G1,32,34,35,38,41,43,48,48,54,43,60,36);L(G3,33,34,36,37,40,40);L(G3,55,41,59,37);
 // Eclipsed core: a faceted dark crystal with asymmetric corona, integrated into chest.
 A(I,47,28,54,35,53,40,48,46,41,39,40,34);A(G1,47,29,52,35,51,40,48,44,43,39,42,34);A(G3,47,29,49,32,45,35,45,38,48,43,44,39,42,34);A(V1,48,32,51,35,50,39,48,42,45,38,45,35);A(D0,48,34,49,36,48,40,46,37);L(C2,47,33,46,35);L(G4,45,32,43,35);
 // Rear arm, slim gauntlet and angular articulated pauldron.
 A(I,58,25,65,22,71,26,73,35,69,41,65,45,64,55,59,63,54,60,56,51,56,42,55,35);
 A(N0,59,27,65,24,69,27,71,35,67,40,63,44,62,54,58,60,56,58,58,50,58,42,57,35);
 A(N1,60,27,65,24,69,28,69,32,65,36,60,34);A(N2,61,27,65,25,68,28,65,31,60,32);L(N4,61,27,65,25,67,27);A(G1,68,33,70,34,67,39,63,40,63,38);L(G3,68,34,65,38);
 A(N1,59,41,63,43,61,51,58,53,58,47);A(N2,60,43,61,44,60,49,58,51);A(N1,57,53,61,53,60,57,57,60,56,58);L(N3,58,54,57,57);
 // Near arm: extended into space, hand with fingers cupping the star. Local cast motion.
 const reach=atk*1.1, lift=atk*.55;
 const M=(c,...v)=>A(c,...v.map((n,i)=>n-(i%2?lift:reach)*(i%2?1:1)));
 A(I,34,24,29,22,23,25,19,31,20,39,25,43,30,40,34,34,36,28);A(N0,33,26,29,24,24,27,21,31,22,38,25,41,29,38,32,33,34,28);A(N1,24,27,29,24,33,27,31,31,26,34,22,32);A(N2,25,27,29,25,31,27,29,30,24,31);L(N4,25,27,29,25);A(G2,22,33,25,35,28,34,26,38,23,37);L(G4,23,33,25,35);
 A(I,24,37,18-reach,40-lift,12-reach,37-lift,8-reach,39-lift,7-reach,44-lift,15-reach,49-lift,23,46,28,41);A(N0,24,39,18-reach,42-lift,12-reach,39-lift,10-reach,40-lift,9-reach,44-lift,15-reach,47-lift,22,44,26,41);A(N1,23,39,18-reach,43-lift,12-reach,41-lift,11-reach,43-lift,16-reach,46-lift,22,43);A(N2,22,40,18-reach,43-lift,14-reach,42-lift,16-reach,44-lift,21,42);L(N3,21,40,18-reach,42-lift,14-reach,41-lift);
 M(I,11,38,7,34,4,34,3,38,6,43,11,44,14,41);M(N2,10,39,7,36,5,36,5,38,7,41,11,42,12,40);M(N3,6,36,7,38,10,39,10,40,7,39,5,37);M(G2,10,40,12,40,11,42,9,42);
 // Long tapered neck and faceless helm: pointed silhouette, dark recess and a tiny white eye.
 A(I,43,10,51,8,57,12,57,20,53,25,47,28,42,24,38,21,39,15);A(N0,44,12,50,10,55,13,55,19,52,23,47,26,43,23,40,20,41,15);
 A(N2,43,13,48,11,50,13,47,16,42,17,41,16);A(N3,43,13,48,11,49,12,46,14,42,16);L(N4,43,13,47,11);
 A(D0,41,18,48,15,52,16,52,20,48,23,44,23,40,20);A(I,42,18,49,16,51,17,49,21,45,22,41,20);L(C1,42,18,47,17,49,17);L(C2,42,18,44,18);
 A(N1,52,14,55,14,55,19,52,23,47,26,45,24,49,22);A(N3,53,14,54,15,53,19,50,22,48,23,51,20);L(G2,53,14,53,18,50,22);
 A(N2,43,23,47,24,49,26,46,27,43,25);L(N4,43,23,46,24);
 // Diadem: three elongated rays, negative space between them; no cartoon crown.
 A(I,40,14,31,8,28,2,38,7,42,11,43,3,47,0.8,49,8,52,5,58,1,57,9,55,15,52,16,48,11,44,14);A(G1,40,12,33,8,31,4,38,8,42,12,44,4,47,2,48,10,53,6,56,3,55,9,54,13,52,14,48,10,44,12);A(G3,33,6,39,9,42,12,38,11);A(G3,44,5,47,2,46,9,44,12);A(G3,53,6,56,3,54,10,52,12);L(G4,44,5,46,3);L(G4,33,6,37,8);A(C2,47,8,49,10,47,13,45,10);
 // Engraved metal motifs following the breastplate bevels, not floating decals.
 L('#c8b3a1',37,31,40,29,42,29);L('#7f9db9',35,33,39,32,41,30);
 L(G2,55,28,58,29,57,31,55,32);L(G4,55,28,57,29);
 L('#708ea8',39,45,41,46,43,46);L(G2,54,47,55,49,52,52);
 // Celestial fragments and a compact living singularity in the casting hand.
 const orbX=12-reach,orbY=25-lift;
 const O=(c,...v)=>A(c,...v.map((n,i)=>n+(i%2?orbY:orbX)));
 O(I,-8,-3,-4,-8,2,-10,8,-6,10,-1,7,6,2,9,-5,7,-9,2);O(V0,-7,-3,-3,-7,2,-9,7,-5,8,-1,6,5,2,8,-4,6,-8,1);O(V2,-7,-3,-3,-7,2,-8,5,-6,0,-6,-4,-3,-5,1,-3,4,1,6,-4,5,-7,1);O(C1,-5,-4,-1,-7,3,-7,0,-5,-3,-3,-4,0,-5,-1);O(C2,-4,-4,-1,-6,1,-6,-2,-4);O(D0,0,-4,4,-3,5,0,3,3,-1,4,-4,1,-3,-2);O(I,0,-3,3,-2,4,0,2,2,-1,3,-3,0,-2,-2);O(V3,5,2,6,0,7,-1,6,4,2,7,3,5);
 O('#7286c7',-3,1,-1,-1,2,-2,3,-1,1,0,-1,2);O(C2,-1,-1,0,-2,1,-2,0,0);O(V2,-3,4,-1,3,2,3,4,2,3,4,0,5);O(V3,-1,4,1,3,2,3,1,4);
 for(const [x,y,w,hh] of [[27,15,1.4,3.2],[65,12,1.6,4],[87,47,1.4,3],[19,55,1.2,2.4]]){A(I,x,y-hh-1,x+w+1,y,x,y+hh+1,x-w-1,y);A(V1,x,y-hh,x+w,y,x,y+hh,x-w,y);A(V3,x,y-hh,x,y+hh-1,x-w,y);L(C2,x,y-hh+1,x-.5,y-1);}
 }else if(id==='astral_vanguard'){
 // R21: ancient star-forged knight, asymmetric late-medieval plate, engraved kite shield.
 const d='#151a2b',deep='#232b41',shadow='#37465f',steel='#6f8ca7',lit='#b1cfdf',white='#edfaff',blue='#466482', gold='#b2a078', pale='#e8d9ac',cyan='#80e5f0';
 const edge=(...v)=>S(lit,0,...v), shine=(...v)=>S(white,0,...v);
 // A single sweeping cloak, with overlapping folds and torn edge. Rear silhouette.
 Q(d,46,17,60,16,71,24,74,37,78,54,88,72,92,83,80,79,78,87,66,80,60,89,49,82,44,87,40,67,40,43);
 Q('#233650',48,20,60,19,69,26,72,39,77,55,86,73,89,81,79,76,76,84,66,77,59,86,49,79,45,84,43,66,42,43);
 Q('#354d73',58,23,65,25,68,33,70,48,75,63,83,77,76,72,67,56,61,37);Q('#59769a',59,24,63,26,66,35,67,46,63,39,60,30);Q('#19253c',69,31,72,42,76,59,83,72,77,66,71,54,66,38);Q('#47658a',49,31,54,33,53,53,55,70,61,82,54,77,49,65,48,48);Q('#13243a',60,43,64,56,64,70,69,78,64,75,60,67,58,54);
 S('#8b9bb2',0,70,28,73,40,78,58,85,73,89,81);S('#8b9bb2',0,48,82,54,78,59,86,66,77,76,84,79,76);S('#c0b89c',0,75,80,79,76,87,80);
 // Far leg behind tabard. Dark joints, plate panels taper toward boot.
 Q(d,49,48,60,46,65,52,66,62,63,70,68,80,76,84,76,88,59,89,54,85,55,77,51,68,51,60,45,55);
 Q(shadow,51,50,59,49,63,54,64,62,61,70,66,81,72,85,60,86,57,83,58,76,54,67,54,59,48,54);
 Q(steel,54,51,59,50,62,55,61,62,56,64,53,59);Q(lit,54,52,59,52,60,55,56,57,54,56);Q(deep,54,64,61,63,65,67,61,72,56,71);Q(steel,56,65,61,65,62,68,59,70,56,68);Q(lit,57,65,60,65,59,67);
 Q('#566e88',57,72,62,72,65,80,62,83,58,81,58,77);Q(lit,58,73,60,74,61,79,59,81);Q(shadow,58,82,65,81,73,85,72,87,60,87,57,85);edge(60,82,65,83,69,85);
 // Near leg planted forward. Articulated thigh, knee fan and fitted greave.
 Q(d,34,46,48,46,53,54,47,62,43,68,38,72,35,80,38,86,36,89,15,89,11,86,15,82,24,78,26,70,25,65,29,55);
 Q(deep,36,48,47,49,50,54,44,62,41,68,36,71,33,80,35,85,17,87,14,85,25,80,29,70,28,65,31,55);
 Q(shadow,33,51,42,49,48,53,44,59,37,63,29,61,29,57);Q(steel,34,52,41,51,45,53,42,57,36,60,31,58);Q(lit,33,53,40,51,44,53,38,54,32,57);Q(white,35,52,40,52,37,53,34,54);Q(blue,42,55,45,53,42,58,37,61,35,60);
 Q(d,28,61,37,59,43,63,42,67,36,73,29,72,25,67);Q(steel,29,62,36,61,40,64,39,67,35,71,30,70,27,67);Q(lit,29,63,35,62,39,64,34,65,29,67);Q(white,30,63,35,63,32,64);Q(shadow,35,66,39,65,36,70,31,70);
 Q(shadow,28,72,36,73,34,78,33,82,26,84,22,81);Q(steel,28,73,34,74,31,81,26,82,25,80);Q(lit,28,74,30,75,28,80,26,81);shine(28,74,27,79);edge(34,75,32,81);
 Q(d,23,79,32,80,36,85,35,88,14,88,12,85,16,82);Q(steel,23,81,30,82,33,85,16,86,17,84);Q(lit,21,82,26,82,23,84,16,85,18,83);shine(16,84,22,83);S(shadow,0,23,85,25,83,29,84,28,86);
 // Split tabard over the hip; silver embroidery, no excessive jewelry.
 Q(d,37,46,48,45,53,55,49,66,44,78,36,71,32,74,34,60);Q('#344a77',38,48,47,47,50,55,47,65,43,75,37,68,35,71,36,59);Q('#647fa9',39,49,43,49,42,57,39,68,37,69,38,60);Q('#1c2d50',46,49,48,55,46,64,43,72,43,60);S(gold,0,36,70,39,67,43,75,47,65,49,56);S(pale,0,39,51,38,61,36,69);star(42,60,2,'#c8dce8');
 // Main breastplate: continuous surface, sharp central ridge and overlapping waist lames.
 Q(d,31,20,43,16,57,20,65,27,64,37,57,46,54,54,45,59,34,54,32,45,25,38,24,29);
 Q(deep,32,22,43,18,56,22,63,28,62,36,55,45,52,52,44,57,36,53,34,44,27,37,26,29);
 Q(shadow,28,27,42,20,55,23,61,28,59,37,50,43,43,44,34,40,28,34);
 Q(steel,29,28,41,23,53,25,58,29,53,35,44,39,35,37,29,33);Q(lit,29,28,41,23,52,25,48,28,41,26,35,30,31,33);Q(white,33,27,41,24,48,25,43,26,36,29);Q('#536e8e',43,29,55,27,58,29,53,35,44,39,40,36);Q('#34455f',43,30,45,33,43,40,40,39);edge(29,35,35,39,43,42,51,40,57,35);
 // Inlaid four-point stellar sigil, flush with the chest rather than a floating ball.
 Q(d,43,26,45,31,51,33,46,35,43,40,41,35,35,33,41,31);Q(gold,43,28,44,32,48,33,44,34,43,38,42,34,38,33,42,32);Q(cyan,43,30,44,33,43,36,42,33);Q(white,43,31,44,33,43,34,42,33);
 for(let j=0;j<3;j++){let y=41+j*4;Q(d,34,y,43,y+3,55,y-1,55,y+3,44,y+7,35,y+4);Q(shadow,35,y+1,43,y+4,54,y,53,y+3,44,y+6,36,y+3);Q(steel,35,y+1,43,y+4,52,y+1,49,y+3,43,y+5,36,y+3);edge(36,y+1,43,y+3,51,y+1);}
 Q(d,33,53,43,56,54,52,56,57,49,61,43,60,34,61,29,57);Q(gold,34,55,43,58,53,54,53,57,49,59,43,59,34,59,32,57);Q(pale,39,55,45,55,47,57,44,60,40,59);Q('#586d86',41,56,44,56,45,57,43,59,41,58);
 // Neck and helmet, left-facing visor with extended pointed bevor and tall metal crest.
 Q(d,34,19,32,13,34,7,41,2,49,3,54,8,56,15,53,21,48,24,39,25,31,22);Q(shadow,35,18,34,13,36,8,42,4,49,5,52,9,54,15,51,20,47,22,40,23,34,21);
 Q(steel,35,12,37,8,42,5,48,6,51,9,47,12,40,13);Q(lit,36,10,39,7,43,5,48,6,46,8,41,8,37,12);Q(white,40,7,43,6,47,6,44,7);Q('#415a77',49,8,52,11,53,16,49,20,45,19,48,15);edge(50,9,52,12,52,16,49,19);
 Q(d,34,13,40,11,49,12,47,16,39,18,32,17);Q('#254a62',34,14,40,12,46,13,40,15,33,16);Q(cyan,34,14,40,13,44,13,39,14,34,15);Q(white,35,14,39,13,39,14,35,15);
 Q(steel,34,18,39,17,42,21,47,22,44,24,39,24,31,21,30,19);Q(lit,33,18,37,18,35,21,32,20);Q(d,39,20,45,19,45,20,41,21);S(shadow,0,37,21,40,22,43,22);shine(33,19,35,18);
 Q(d,46,5,48,0,53,2,58,8,57,14,53,11,51,7);Q('#405a86',48,4,50,2,54,5,56,8,55,11,52,7);Q('#a9c4df',49,3,51,3,54,6,51,5);S(gold,0,47,6,50,8,53,9);
 // Far arm and shield grip sit behind a broad asymmetrical kite shield.
 Q(d,56,22,65,20,73,26,72,33,67,39,70,47,66,54,58,53,56,46,59,38,54,31);Q(shadow,58,24,65,22,71,27,69,33,65,38,68,46,64,51,60,50,58,46,61,38,56,31);
 Q(steel,55,26,64,21,70,24,70,29,64,33,57,32);Q(lit,56,26,64,22,68,24,64,26,58,29);shine(58,25,64,22,67,24);Q(shadow,59,34,64,33,67,37,64,41,59,39);Q(steel,61,40,66,39,68,44,64,49,60,47);edge(61,41,65,40,66,44,64,46);
 // Shield: deep enamel, beveled steel rim, engraved celestial compass.
 const shx=atk*.6;const T=(c,...v)=>Q(c,...v.map((z,i)=>i%2?z:z+shx));
 T(d,63,31,75,25,84,27,92,34,90,53,85,65,75,75,64,67,58,55,57,42);
 T(shadow,64,33,75,27,83,29,90,35,88,53,83,64,75,72,66,65,60,54,59,43);
 T(lit,64,33,75,27,83,29,89,35,85,36,81,32,75,31,66,36,62,44,62,53,68,65,75,70,74,72,65,65,60,54,59,43);T(white,64,33,75,28,81,29,75,30,66,35,62,42,61,44);
 T('#263a59',66,38,75,32,82,33,87,38,85,52,81,62,75,68,68,62,64,52,63,45);T('#3b5a83',66,39,75,34,81,35,84,38,75,40,69,45,65,51);T('#1e2e4b',78,42,86,39,84,53,79,63,75,67,72,61,78,55);
 T(gold,75,36,77,43,84,47,77,49,75,61,73,50,66,47,73,43);T('#16273c',75,39,76,45,81,47,76,48,75,57,74,48,69,47,74,45);T(cyan,75,42,76,46,79,47,76,48,75,53,74,48,71,47,74,46);T(white,75,45,76,47,75,49,74,47);
 for(const [x,y] of [[68,39],[81,36],[83,53],[70,58],[75,65]]){T(gold,x,y-1,x+1,y,x,y+1,x-1,y);}
 T('#8fb0c8',89,38,87,52,83,62,75,71,78,67,82,60,86,51,87,40);
 // Near shoulder has flared overlapping metal plates, arm grips sword at a natural bend.
 Q(d,27,23,35,20,40,26,38,33,30,38,27,45,32,49,29,55,22,55,16,49,18,39,18,32);Q(deep,28,25,35,22,38,27,36,32,28,37,25,45,30,49,27,53,23,53,18,49,20,39,20,32);
 Q(shadow,19,27,27,21,34,20,39,25,35,30,29,34,20,34,16,31);Q(steel,19,28,27,23,34,22,36,25,33,29,28,32,21,32,18,31);Q(lit,20,27,27,23,33,22,35,24,28,25,23,28,19,30);Q(white,22,26,27,24,32,23,28,25,23,27);
 Q(shadow,19,34,28,32,31,35,27,39,20,39,17,37);Q(steel,19,35,27,34,29,35,26,37,20,38);edge(19,35,25,34,28,35);
 Q(d,18,39,24,38,28,41,25,45,20,46,17,43);Q(steel,20,40,24,40,26,42,23,44,19,43);shine(20,40,24,40);
 Q(shadow,20,45,25,44,29,48,27,53,22,53,18,49);Q(steel,21,46,25,46,27,49,25,51,22,51,20,49);Q(lit,21,46,24,46,25,48,21,49);edge(20,47,22,46,24,46);
 // Sword, animated around the hand; blade is a long faceted star-metal edge, not a wand.
 const handX=24,handY=49,ang=-.17-atk*.075+hurt*.025;
 const ca=Math.cos(ang),sa=Math.sin(ang),swing=(v)=>{let a=[];for(let i=0;i<v.length;i+=2){let x=v[i]-handX,y=v[i+1]-handY;a.push(handX+x*ca-y*sa,handY+x*sa+y*ca);}return a;};const W=(c,...v)=>Q(c,...swing(v));
 W(d,22,46,14,42,3,14,3,4,11,11,23,39,28,43,30,45,28,49);W('#506e98',22,43,16,40,5,14,5,8,10,13,21,39,26,43);W(lit,22,43,16,40,5,14,5,8,8,14,19,39);W(white,6,10,6,14,16,37,20,41,18,40,14,32,7,16);W('#91c5dd',10,14,20,37,25,43,22,42,18,36);W('#304a70',12,19,19,38,23,42,22,39);W(cyan,7,14,12,25,18,38,17,35,11,22);
 W(d,14,43,17,40,25,41,30,36,33,37,33,42,27,48,18,49,14,47);W(gold,16,43,18,42,25,43,30,38,31,39,31,41,26,46,18,47,16,46);W(pale,16,43,18,42,25,44,30,38,31,39,26,45,18,46);W('#5c617c',23,43,25,42,27,44,25,46,23,45);W(cyan,24,43,26,44,25,45,24,45);
 W(d,23,47,27,45,32,55,30,58,26,57,23,51);W('#4a5069',24,48,27,47,30,54,29,56,27,55);W(gold,27,54,31,54,33,57,31,60,28,60,26,57);W(pale,28,55,30,55,31,57,29,58,27,57);
 // Fingers overlay the grip; fine gauntlet segments read at actual scale.
 Q(d,19,48,24,45,29,47,31,51,29,55,24,56,19,53);Q(steel,20,48,24,47,28,48,29,51,27,54,24,54,20,52);Q(lit,20,49,24,47,27,48,25,50,21,51);S(shadow,0,23,52,27,50,28,51);S(shadow,0,25,53,28,52);shine(21,49,24,48);
 }else if(id==='aeon_oracle'){
 // R22: the Chronos Keeper. A lean, faceless temporal hierophant, layered textiles,
 // sculpted mask, beveled brass chronometer and a caged hourglass on a ritual staff.
 const black='#131622',deep='#20293c',navy='#30415b',blue='#455e7d',light='#7696b2',pale='#bad5de',iv='#e4e6d7',br='#544453',bronze='#8c6b52',gold='#c9a779',shine='#f6dfaa',cyan='#80e5e4';
 const L=(c,...v)=>S(c,0,...v);
 // Chronometer: exposed double rim, engraved ticks, inset radial struts and asymmetric escapement.
 const cx=65+dx,cy=30+dy;
 const arc=(c,w,rad,start,end)=>{let v=[];for(let i=0;i<=36;i++){let a=start+(end-start)*i/36;v.push(cx+Math.cos(a)*rad,cy+Math.sin(a)*rad);}line(c,w,...v);};
 arc(black,3,23,-2.7,2.8);arc(br,2,23,-2.7,2.8);arc(bronze,1,24,-2.65,2.7);arc(gold,0,25,-2.55,1.0);arc(shine,0,25,-2.4,-.6);arc('#2a344b',2,19,-2.6,2.8);arc('#67869c',0,19,-2.45,2.65);
 for(let k=0;k<16;k++){let a=k*Math.PI/8-.1;let x=cx+Math.cos(a)*22,y=cy+Math.sin(a)*22;if(x>47){line(k%4===0?shine:gold,k%4===0?1:0,cx+Math.cos(a)*19,cy+Math.sin(a)*19,x,y);}}
 // beveled solid housing, escapement teeth and rotating hands
 for(let k=0;k<7;k++){let a=-1.75+k*.32,co=Math.cos(a),si=Math.sin(a);let x=cx+co*25,y=cy+si*25;line(black,1,x,y,x+co*2,y+si*2);line(gold,0,x,y,x+co*2,y+si*2);}
 const aa=-.95+step*.24;line(black,2,cx,cy,cx+Math.cos(aa)*17,cy+Math.sin(aa)*17);line(cyan,0,cx,cy,cx+Math.cos(aa)*17,cy+Math.sin(aa)*17);line(bronze,1,cx,cy,cx+11,cy-10);line(shine,0,cx,cy,cx+11,cy-10);disk(black,cx,cy,3);disk(gold,cx,cy,2);disk(shine,cx-1,cy-1,0);
 // Sweeping rear cloth: weight, layered panels, no ball-shaped joints.
 Q(black,36,18,54,17,62,26,63,41,68,56,72,71,86,84,78,83,75,89,63,84,55,89,47,85,38,90,28,86,17,88,21,74,25,57,27,40,25,29);
 Q(deep,37,20,53,19,60,28,61,42,66,57,70,72,82,83,76,81,73,86,62,82,55,87,47,83,38,87,29,84,20,86,23,74,27,57,29,41,27,30);
 Q(navy,49,24,56,26,58,40,58,52,65,70,75,83,64,79,57,69,53,51);Q(blue,51,25,54,27,56,40,56,48,52,39);Q('#1b2135',62,42,66,58,70,73,78,82,70,76,65,65);Q(light,57,58,60,62,66,76,70,80,64,76,60,69);
 Q('#1b2539',33,33,42,32,43,54,39,68,40,79,47,83,38,86,31,83,24,85,28,70,31,54);
 Q(navy,33,39,37,37,38,55,34,71,30,82,25,84,30,71);Q(blue,36,43,37,48,33,66,30,75,29,76,32,61);L('#98afbc',36,45,35,54,32,65,30,71);
 // Tall narrow torso and skirt, cream embroidery on fitted blue-black cloth.
 Q(black,32,27,45,22,54,25,58,35,53,47,53,57,58,72,65,84,55,89,48,85,42,88,32,85,26,88,18,85,25,73,29,59,31,46,28,36);
 Q(blue,34,29,45,25,52,28,55,35,50,47,50,58,55,73,62,83,55,86,48,82,42,85,33,82,26,85,21,84,28,73,32,58,33,45,30,36);
 Q(navy,43,31,50,29,53,35,49,45,48,57,53,72,59,83,54,84,48,79,45,66,43,50);Q(deep,35,47,40,49,40,62,36,73,37,82,32,81,28,83,32,71);Q(light,34,31,40,28,44,30,41,40,38,46,35,45,36,37);Q(pale,35,31,40,30,39,33,36,35);Q('#253249',44,49,47,48,47,62,49,74,53,83,48,80,44,70);
 // split embroidered tabard, narrow borders, intentional ornament placement.
 Q(black,38,43,49,42,49,61,53,78,47,82,42,77,35,81,37,65);Q('#21384e',40,44,47,44,46,61,50,77,47,79,42,75,37,78,39,65);
 L(gold,40,45,39,63,37,77,42,74,47,78,50,77,46,61,47,45);L(shine,40,46,40,58,39,67);L(bronze,22,83,27,82,32,81,42,85,48,82,55,86,61,83);L(gold,23,83,28,82,33,82,42,85,48,83,55,86);L(shine,24,83,28,83,32,82);
 for(let y=52;y<=68;y+=8){Q(gold,43,y-2,45,y,43,y+2,41,y);Q(cyan,43,y-1,44,y,43,y+1,42,y);}
 // Belt, hourglass clasp, hanging chain links and a narrow scroll case.
 Q(black,31,43,37,44,51,42,54,45,51,49,37,50,31,47);Q(bronze,33,45,39,46,51,44,51,47,38,49,33,47);L(gold,34,45,39,46,49,44);Q(black,41,43,46,42,49,45,47,49,42,50,39,47);Q(gold,42,44,46,44,47,46,45,48,42,48,41,46);Q(cyan,42,45,46,45,44,47);L(bronze,49,48,51,55,54,57,56,53,54,48);L(shine,50,49,51,54,54,56);Q(black,52,53,56,52,59,61,56,65,52,61);Q(bronze,54,54,55,54,57,61,56,63,54,60);L(gold,54,55,56,60);
 // Far sleeve and outstretched skeletal gauntlet with fingers pointed toward the mechanism.
 Q(black,51,27,59,25,66,31,67,36,72,35,75,30,80,31,82,35,77,39,70,43,62,43,55,36);Q(navy,53,29,59,27,64,32,65,37,69,39,67,41,62,41,56,35);Q(blue,56,29,60,29,62,33,61,36,57,34);Q(light,57,29,59,29,61,32,58,31);Q(bronze,65,36,69,35,72,38,68,42,65,41);L(gold,66,37,69,37,70,39);Q(black,70,36,73,32,76,32,78,29,80,30,79,33,83,31,84,32,81,35,83,36,80,38,75,40,71,39);Q(pale,72,36,75,33,77,33,79,31,78,34,81,33,80,35,81,36,78,37,75,39,72,38);L(iv,75,33,77,34,79,33);
 // Collar: carved shoulder mantle with tapered overlapping panels.
 Q(black,29,26,38,20,49,20,59,25,61,29,55,34,49,33,43,39,36,35,26,35,23,30);Q(br,29,27,39,22,49,22,57,26,58,29,54,32,49,31,43,36,36,33,27,33,25,30);Q(bronze,29,27,39,22,44,23,39,27,32,29,27,31);Q(gold,31,26,39,23,43,24,38,26,32,28);Q(bronze,46,23,50,23,56,27,55,30,50,29);L(shine,32,26,39,24,42,24);L(gold,26,31,35,32,42,36,49,31,54,31,58,29);Q(black,39,29,44,27,48,30,47,34,43,37,39,34);Q(cyan,43,29,46,31,43,35,41,32);Q(iv,43,29,44,30,42,32);
 // Hood: elongated pointed shape, recessed face, separate sculpted porcelain mask, shadow under jaw.
 Q(black,28,22,29,14,34,7,42,3,49,5,55,11,57,19,53,27,48,31,39,30,34,27,29,27,25,24);Q(navy,30,22,31,15,35,9,42,5,48,7,53,12,55,19,51,26,47,29,39,28,34,25,29,25,27,23);
 Q(blue,31,16,36,9,42,6,48,8,51,11,44,11,37,14,33,20,30,22);Q(light,35,10,42,7,47,8,43,9,37,12,34,16);L(pale,38,9,42,8,45,8);Q(deep,50,12,53,17,53,21,49,27,46,28,48,23,48,17);L(gold,29,23,33,16,38,12,44,11,49,13);L(shine,33,16,38,13,42,12);
 Q(black,33,16,39,13,45,14,49,18,48,23,44,28,39,27,36,24,32,23,30,21);Q('#8399a3',35,16,40,15,45,16,47,19,46,23,43,26,39,25,36,23,32,22,34,20);Q(iv,35,16,40,15,44,16,42,18,36,19,34,21,33,21);Q(pale,37,21,42,20,45,19,45,23,42,25,39,24);Q('#3c495e',34,19,38,18,43,18,44,19,40,21,36,20);L(cyan,35,19,40,19);L('#f1ffff',35,19,37,19);Q('#42536a',36,22,39,22,40,24,38,24);L(shine,40,16,42,16);L('#6a7f91',42,24,44,23);
 // Near sleeve/hand crosses forward to the staff, segmented fitted bracer.
 Q(black,27,30,33,32,31,40,26,46,20,48,15-atk*.35,43,15-atk*.35,39,20,34);Q(navy,27,32,31,33,29,39,25,44,20,46,17-atk*.35,42,18-atk*.35,39,22,35);Q(blue,25,33,29,34,27,38,22,41,19,39);Q(light,25,34,27,34,25,37,22,39);Q(black,20,40,23,42,21,47,16,48,11-atk*.35,44,13-atk*.35,39);Q(bronze,16,41,20,42,21,44,19,46,16,46,13-atk*.35,43,14-atk*.35,41);L(gold,14-atk*.35,41,19,43,20,44);L(shine,15,42,18,43);
 // Angled ritual staff, openwork brass cage and visible hourglass sand.
 const sx=15-atk*.28,sy=1+atk*.12;const H=(c,...v)=>Q(c,...v.map((z,i)=>z+(i%2?sy:sx)));
 H(black,-2,22,2,22,7,81,6,87,2,86,3,79);H(bronze,-1,24,1,24,5,80,5,85,3,85,4,79);H(gold,0,24,1,25,5,79,4,81);H(shine,0,28,1,30,1,40,0,38);
 for(let y of [31,53,73]){let x=(y-24)*.075;H(black,x-2,y,x+3,y,x+3,y+3,x-2,y+3);H(gold,x-1,y,x+2,y,x+2,y+2,x-1,y+2);}
 H(black,-10,5,-7,2,5,2,10,5,10,9,6,13,3,17,7,22,10,25,8,29,-8,29,-11,26,-8,21,-4,17,-7,12,-11,9);H(bronze,-9,5,-6,3,5,3,8,5,8,8,-9,8);H(gold,-8,5,6,4,8,6,-8,7);H(shine,-7,5,4,5,6,6,-7,6);H('#28394c',-8,9,7,9,5,13,1,17,5,22,7,25,-8,25,-5,22,-2,17,-6,13);H('#659cae',-7,10,6,10,3,14,0,17,3,21,6,24,-7,24,-4,21,-1,17,-4,14);H('#243f56',-5,11,4,11,2,14,-1,17,2,21,4,23,-5,23,-3,21,-1,17,-3,14);H('#d1ac72',-4,11,4,11,1,14,-1,15);H(shine,-4,11,3,11,2,12,-3,12);H('#d4ae72',-4,23,0,20+(step%3)*.45,4,23);H(shine,-2,22,0,21+(step%3)*.45,2,23);H('#e8f9ee',-.4,15,.3,15,.3,20,-.4,20);H(pale,-6,10,-5,10,-3,14,-4,14);H(gold,-9,25,8,25,8,27,5,28,-7,28,-9,27);H(shine,-8,25,6,25,5,26,-7,26);
 // Fine cage ribs and jeweled crown, leaving the hourglass interior legible.
 H(bronze,-10,7,-8,8,-7,13,-4,17,-7,22,-9,25,-10,24,-8,20,-6,17,-9,12);H(gold,8,8,9,9,7,14,4,17,8,23,9,25,7,24,5,21,3,17,6,13);H(black,-3,3,0,-1,3,3,0,5);H(gold,-2,3,0,0,2,3,0,4);H(cyan,0,1,1,3,0,4,-1,3);
 // Thumb over shaft, not behind it.
 Q(black,14-atk*.35,42,16-atk*.35,40,19,42,18,46,15-atk*.35,47,12-atk*.35,45);Q(pale,15-atk*.35,42,17-atk*.35,42,18,44,16,46,13-atk*.35,44);L(iv,15-atk*.35,42,16-atk*.35,43,15-atk*.35,44);
 }
 }else if(id==='frost_crystal_golem'){
  const rock=ramp('#101d33','#203c58','#477c99','#a2d2e1','#e4fcff'), ice=ramp('#172b49','#285e89','#53a9c6','#b1f7fb','#efffff'), shadow=ramp('#121b29','#294861','#4b809a','#99bdca');
  // Broad glacier, jagged crystal ridge, articulated limbs and embedded frozen core.
  for(const [x,y,w,hh,t] of [[68,6,9,39,9],[55,3,9,44,1],[82,22,7,31,8],[38,14,7,28,-4]])shard(x+X,y+Y,w,hh,ice,t);
  tube([[63,54,11],[70,69,8],[69,80,7]],shadow,'stone');F(rock,59,76,73,73,85,80,81,88,60,88,55,83);
  tube([[36,52,12],[28,67,9],[31,80,8]],rock,'stone');F(rock,19,76,35,73,47,81,43,88,17,88,13,83);
  F(rock,22+X,30+Y,38+X,18+Y,60+X,19+Y,76+X,32+Y,78+X,47+Y,65+X,66+Y,48+X,70+Y,27+X,58+Y,20+X,42+Y);
  F(rock,25+X,31+Y,41+X,23+Y,51+X,29+Y,45+X,42+Y,27+X,46+Y,22+X,40+Y);F(shadow,55+X,28+Y,71+X,30+Y,75+X,43+Y,64+X,52+Y,56+X,48+Y);F(rock,32+X,53+Y,46+X,48+Y,54+X,54+Y,51+X,64+Y,38+X,65+Y);
  crystal(ice,50+X,32+Y,59+X,42+Y,51+X,57+Y,42+X,45+Y);poly('#d6ffff',50+X,36+Y,52+X,43+Y,49+X,47+Y,47+X,43+Y);
  tube([[69+X,35+Y,9],[78+X,49+Y,8],[75+X,62+Y,8]],shadow,'stone');F(rock,68+X,53+Y,81+X,53+Y,85+X,65+Y,80+X,72+Y,69+X,68+Y);shard(73+X,24+Y,6,25,ice,7);
  tube([[22+X,38+Y,12],[14+X,54+Y,8],[14+X,67+Y,10]],rock,'stone');F(rock,11+X,54+Y,24+X,53+Y,27+X,64+Y,19+X,74+Y,7+X,71+Y,4+X,61+Y);for(let i=0;i<3;i++)F(rock,5+X+i*6,66+Y,10+X+i*6,64+Y,13+X+i*6,69+Y,11+X+i*6,73+Y,5+X+i*6,72+Y);
  shard(16+X,23+Y,7,19,ice,-6);shard(29+X,22+Y,5,16,ice,1);shard(31,66,4,13,ice,3);
  F(rock,12+X,25+Y,22+X,14+Y,36+X,13+Y,48+X,21+Y,43+X,34+Y,31+X,41+Y,19+X,36+Y,10+X,30+Y);F(rock,11+X,24+Y,24+X,17+Y,36+X,18+Y,39+X,22+Y,25+X,26+Y,13+X,28+Y);eye(21+X,28+Y,'#b9ffff',5);F(shadow,13+X,32+Y,25+X,33+Y,37+X,29+Y,35+X,36+Y,25+X,39+Y,16+X,36+Y);
  for(const [x,y] of [[32,34],[60,39],[14,59],[39,56],[68,62]]){line('#1a354d',0,x+X,y+Y,x-3+X,y+4+Y,x+1+X,y+7+Y);line('#70c8d8',0,x+1+X,y+Y,x-2+X,y+4+Y,x+2+X,y+7+Y);}
 }else if(id==='blizzard_wolf'){
  // R14: a low, long-bodied arctic direwolf, not an upright husky.
  const f=ramp('#182436','#30485f','#617e98','#afc9d6','#f6fbf7'), back=ramp('#172336','#2d4561','#57778d','#a7bdcc'), white=ramp('#3c5269','#849eaf','#c6dce5','#f5ffff'), far=ramp('#121d2d','#2b435a','#536d82','#93acbb');
  const Q=(c,...v)=>poly(c,...v.map((z,i)=>z+(i%2?Y:X)));
  const fur=(pal,...v)=>facet(v.map((z,i)=>z+(i%2?Y:X)),pal,'fur');
  const tailLift=pose==='idle'?Math.sin(step*2.1)*1.6:0;
  // Far limbs have their own stances; near hocks and paws are not merged.
  tube([[65+X,52+Y,7],[74,65,4.6],[70,77,3.4],[74,85,2.9]],far,'fur');F(far,69,83,77,83,79,88,68,88,66,86);
  tube([[32+X,51+Y,7],[39,65,4.5],[39,76,3.2],[35,84,3]],far,'fur');F(far,31,83,40,83,42,88,29,88,28,86);
  // Low sweeping tail with tapered jagged fur clusters, rather than a curled dog tail.
  tube([[73+X,45+Y,7],[84+X,51+Y,6.5],[91+X,60+Y+tailLift,5],[91+X,68+Y+tailLift,3],[87+X,72+Y+tailLift,1]],back,'fur',.8);
  fur(white,79,49,89,55+tailLift,95,62+tailLift,94,68+tailLift,88,75+tailLift,89,68+tailLift,84,65+tailLift,87,62+tailLift,80,59,82,55);
  // Rib cage, sloping back, tucked belly and muscular shoulder.
  fur(back,20,39,29,31,43,28,57,34,69,33,79,39,81,47,76,56,63,60,54,54,43,57,32,65,23,58,18,48);
  ell(54+X,44+Y,24,13,.08,back,'fur',.6);ell(69+X,47+Y,12,14,-.18,f,'fur',.7);
  fur(f,24,39,31,34,43,35,51,39,48,46,42,50,36,57,27,62,20,54);
  fur(white,31,49,40,47,51,48,57,53,61,56,51,55,44,59,35,59,27,62);
  // Foreleg and hind leg with angular canine hocks; ground stays fixed.
  tube([[67+X,49+Y,10],[62,61,7],[70,70,4.8],[68,82,3.6],[62,85,3.8]],f,'fur',.8);
  tube([[28+X,48+Y,9],[25,61,5.3],[21,72,3.7],[19,84,3.5]],f,'fur',.8);
  F(white,16,72,23,73,22,83,24,86,20,88,10,88,12,84,16,82);
  F(white,65,73,72,74,71,82,73,86,67,88,57,88,58,84,63,82);
  for(const [x,y] of [[13,86],[17,86],[60,86],[64,86]])pix('#3b4a60',x,y,1,2);
  // Anatomical mane: backward pointing tufts define ruff, neck and back.
  fur(f,15,27,25,22,33,24,40,30,48,33,43,35,48,39,40,40,44,44,35,44,39,50,30,51,31,57,24,55,20,60,18,52,13,52,14,42,9,40);
  fur(white,14,31,21,27,28,28,35,35,29,36,35,41,26,41,29,48,23,46,24,54,18,51,15,54,13,46,9,43);
  // Ears separated; wedge-shaped muzzle and a narrow, aggressive eye.
  fur(far,16,28,13,14,15,11,23,22,25,30);
  fur(f,25,24,29,9,34,13,35,21,32,32,24,32);
  Q('#52647c',28,24,30,13,32,16,31,25);
  fur(f,9,31,16,25,24,24,33,29,33,38,26,45,19,46,12,42,5,41,2,37);
  fur(white,5,33,14,30,21,28,26,30,22,34,15,36,7,39,3,38);
  Q(K,2,36,7,35,8,38,5,41,2,40);Q('#8ba6b9',3,36,5,36,6,37,3,37);
  Q(K,7,40,16,39,24,37,25,40,19,44,10,44,5,42);
  Q('#edf6e9',10,40,14,40,12,44);Q('#edf6e9',18,39,21,39,19,42);
  Q('#687f98',12,44,21,43,25,41,22,46,16,47);
  Q('#1a2638',14,31,23,28,26,30,21,34,14,34);Q('#a2f3ff',16,31,22,30,21,32,16,33);Q('#efffff',17,31,18,31,18,32,17,32);
  // Directional fur glints and restrained ice crystals along the shoulder ridge.
  for(const [a,b,c,d] of [[26,28,31,31],[33,31,39,35],[24,38,28,42],[18,45,21,49],[38,38,44,41],[45,34,53,37],[56,35,63,38],[64,40,72,43],[66,52,69,56],[83,57,89,63],[25,56,23,61]]){Q('#829eb2',a,b,c,d,c-2,d+1,a-1,b+2);}
  const ice=ramp('#214662','#428bab','#a5e4f4','#ecffff');for(const [x,y,w,hh,tilt] of [[37,25,2.6,8,2],[43,28,2.4,6,2],[48,30,1.8,5,2]])shard(x+X,y+Y,w,hh,ice,tilt);
 }else if(id==='venom_spore_beast'){
  const shell=ramp('#1d2226','#364834','#657d43','#b0ba70','#e2d795'), dark=ramp('#171e20','#2c3d31','#536747','#8b9f60'), cap=ramp('#35253e','#64334f','#a45b66','#e8a28b','#f9dfb0'), gill=ramp('#43323a','#a27b69','#dec49c','#f6e1bc');
  const leg=(pts,pal)=>{tube(pts,pal,'rib');for(let j=1;j<pts.length-1;j++){let [x,y,w]=pts[j];ell(x,y,w*1.25,w*1.1,-.5,pal,'shell');}let [x,y,w]=pts.at(-1);fang(x,y,x-5,y+2,3,bone);};
  leg([[65,47,5],[82,56,4],[87,71,3],[94,83,2]],dark);leg([[48,49,5],[61,63,4],[56,79,3],[51,86,2]],dark);leg([[31,43,5],[35,61,4],[27,75,3],[21,85,2]],dark);
  ell(63+X,48+Y,27,22,-.22,shell,'shell');ell(35+X,45+Y,22,19,.15,shell,'shell');
  for(const [x,y,rx,ry,a] of [[79,44,10,14,.5],[65,37,14,13,.3],[52,42,12,15,.05],[61,56,16,12,-.2],[37,47,11,12,-.5]])ell(x+X,y+Y,rx,ry,a,shell,'shell');
  const fungus=(x,y,w,hh)=>{tube([[x+3,y+hh+16,4],[x+1,y+hh+5,3.5],[x,y+hh,3]],gill,'rib',.7);ell(x,y+hh*.77,w,hh*.39,-.07,gill,'rib');ell(x-1,y+hh*.45,w,hh*.62,-.08,cap,'smooth');for(const [dx,dy,rx] of [[-.55,.35,2],[-.18,.05,3],[.3,.27,2],[.57,.49,2]])ell(x+w*dx,y+hh*dy,rx,rx*.55,-.2,gill,'smooth',.3);for(let i=-3;i<=3;i++)line('#6d4651',0,x+i*w*.21,y+hh*.8,x+i*w*.23,y+hh*1.02);};
  fungus(70+X,10+Y,17,18);fungus(44+X,5+Y,18,19);fungus(84+X,29+Y,8,11);fungus(29+X,24+Y,9,10);
  leg([[66,54,8],[79,67,6],[76,80,3],[86,86,3]],shell);leg([[48,54,8],[55,69,5],[47,82,4],[38,87,3]],shell);leg([[26,49,8],[21,64,6],[12,78,4],[5,86,3]],shell);
  ell(19+X,43+Y,17,15,-.25,shell,'shell');F(dark,5+X,41+Y,18+X,32+Y,29+X,37+Y,33+X,48+Y,23+X,57+Y,9+X,52+Y,3+X,46+Y);ell(15+X,40+Y,11,6,-.25,shell,'shell');eye(10+X,44+Y,'#c6ff55',4);eye(22+X,42+Y,'#b7f763',2);fang(9+X,50+Y,2+X,66+Y,4,bone);fang(24+X,50+Y,16+X,68+Y,4,bone);
  for(const [x,y] of [[36,47],[45,55],[61,49],[72,56],[80,47]]){ell(x+X,y+Y,3,2,-.3,ramp('#354a24','#74952f','#c3ef67','#e8ffbd'),'smooth',.5);}
 }else if(id==='crag_titan_sentinel'){
  const basalt=ramp('#171e23','#29363c','#526268','#8b9587','#d0d0ad'), iron=ramp('#18242e','#354b55','#6e8b8f','#b8c5af','#e7e4c8'), brass=ramp('#3b2a29','#785536','#b68f4e','#e5cd83','#fff0b2'), moss=ramp('#223522','#526a35','#8eaa53','#d3e39b');
  // Towering knight with an elongated basalt helm, massive armor and shield.
  tube([[61,54,10],[67,70,8],[70,82,7]],basalt,'stone');F(basalt,58,78,73,74,86,81,82,88,58,88,54,83);tube([[37,53,12],[34,69,8],[31,82,8]],basalt,'stone');F(iron,19,78,34,74,47,82,43,88,17,88,13,84);
  F(basalt,54+X,20+Y,66+X,8+Y,76+X,17+Y,83+X,8+Y,88+X,25+Y,85+X,48+Y,70+X,58+Y);F(moss,70+X,14+Y,76+X,20+Y,83+X,13+Y,85+X,24+Y,78+X,32+Y,72+X,28+Y);
  F(basalt,25+X,27+Y,42+X,18+Y,62+X,20+Y,78+X,35+Y,72+X,55+Y,58+X,69+Y,39+X,68+Y,25+X,58+Y,19+X,39+Y);metal(iron,28+X,31+Y,43+X,24+Y,59+X,27+Y,65+X,37+Y,52+X,49+Y,36+X,47+Y,25+X,40+Y);F(basalt,34+X,52+Y,48+X,48+Y,60+X,52+Y,57+X,64+Y,44+X,66+Y,32+X,61+Y);
  crystal(moss,48+X,31+Y,55+X,42+Y,48+X,50+Y,42+X,42+Y);
  tube([[68+X,35+Y,11],[79+X,51+Y,8],[79+X,63+Y,9]],basalt,'stone');metal(iron,62+X,27+Y,73+X,24+Y,83+X,34+Y,81+X,45+Y,68+X,44+Y,61+X,36+Y);F(basalt,70+X,53+Y,84+X,51+Y,90+X,63+Y,83+X,74+Y,71+X,69+Y,67+X,61+Y);for(let i=0;i<3;i++)F(iron,71+X+i*5,65+Y,76+X+i*5,64+Y,79+X+i*5,69+Y,76+X+i*5,73+Y,71+X+i*5,71+Y);
  metal(iron,17+X,22+Y,25+X,12+Y,39+X,10+Y,48+X,19+Y,44+X,31+Y,33+X,39+Y,20+X,34+Y,13+X,28+Y);F(basalt,19+X,19+Y,24+X,8+Y,30+X,15+Y,36+X,4+Y,41+X,14+Y,45+X,18+Y,35+X,21+Y);poly(K,15+X,26+Y,29+X,22+Y,38+X,24+Y,33+X,29+Y,18+X,30+Y);eye(23+X,26+Y,'#c9ff8e',5);metal(iron,19+X,32+Y,29+X,31+Y,41+X,27+Y,37+X,35+Y,30+X,38+Y,22+X,36+Y);
  // Large sculpted shield: stone face, broad metal bevel, engraved ward, corner studs.
  const shx=2+X,shy=36+Y;const S2=(pal,...v)=>metal(pal,...v.map((n,i)=>n+(i%2?shy:shx)));S2(brass,0,4,12,-3,31,0,38,10,35,32,22,48,8,43,-1,29);S2(iron,4,6,13,0,29,3,34,12,31,31,22,43,10,39,3,27);S2(basalt,8,9,15,4,27,7,30,14,27,29,21,38,12,34,7,25);
  S2(brass,15,10,20,15,26,15,23,21,25,28,20,26,15,32,14,24,10,20,15,17);crystal(moss,18+shx,15+shy,22+shx,21+shy,18+shx,27+shy,14+shx,21+shy);for(const [x,y] of [[7,8],[29,9],[6,28],[21,40]])ell(shx+x,shy+y,1.8,1.8,0,brass,'smooth',.3);
  for(const [x,y] of [[60,29],[61,54],[74,61],[35,72]]){line('#263632',0,x+X,y+Y,x-2+X,y+4+Y,x+1+X,y+6+Y);line('#a4b37a',0,x+1+X,y+Y,x-1+X,y+4+Y,x+2+X,y+6+Y);}
 }else if(id==='glacial_hydra'){
  const scaleBlue=ramp('#102036','#234262','#39789d','#7fbcd7','#d8f1f4'), belly=ramp('#243b57','#517e9d','#a2ccd8','#e5f2e9'), deep=ramp('#111b31','#254563','#4f81a2','#83b6d2'), frost=ramp('#153a58','#297caa','#85d7ef','#e8ffff');
  // Coiled dragon body with a thick tapering tail and curved, independently moving necks.
  tube([[15,76,8],[30,64,12],[54,66,13],[76,71,11],[88,66,7],[92,52,4],[88,43,1.3]],deep,'scale');
  for(const [x,y,w,hh,t] of [[78,56,4,15,5],[85,48,3,15,4],[67,62,5,12,5]])shard(x,y,w,hh,frost,t);
  const neck=(pts,pal,phase)=>{tube(pts,pal,'scale');let c=curve(pts);for(let k=8;k<c.length-7;k+=8){let [x,y,w]=c[k],p=c[Math.min(c.length-1,k+2)],dx=p[0]-x,dy=p[1]-y,n=Math.hypot(dx,dy)||1;let nx=dy/n,ny=-dx/n;if(nx>0){nx=-nx;ny=-ny;}let a=x+nx*w*.8,b=y+ny*w*.8;facet([a-dx*.5,b-dy*.5,a-nx*w*.53-dx*.55,b-ny*w*.53-dy*.55,a-nx*w*.6+dx*.75,b-ny*w*.6+dy*.75,a+dx*.8,b+dy*.8],belly,'belly');if(k%16===0)shard(x-nx*w*.65,y-ny*w*.65-5,2.8,9,frost,3);}};
  const heads=[{x:67,y:19,p:[[66,75,11],[78,54,8],[76,37,7],[69,25,7]],phase:1,small:.94},{x:36,y:13,p:[[48,76,13],[51,55,10],[43,38,8],[37,21,8]],phase:0,small:1.05},{x:19,y:39,p:[[33,77,11],[17,67,9],[22,53,7],[23,45,7]],phase:2,small:.91}];
  for(const {x,y,p,phase,small:k} of heads){let shift=pose==='idle'?Math.sin((step+phase)*2.1)*1.5:pose==='attack'?-A*(phase===1?1:1.6):hurt;let yy=pose==='idle'?Math.sin(step+phase)*.8:B*.22;let xx=x+shift, cy=y+yy;const q=(pal,...v)=>F(pal,...v.map((n,i)=>(i%2?cy:xx)+n*k));const pp=(col,...v)=>poly(col,...v.map((n,i)=>(i%2?cy:xx)+n*k));
   neck(p.map((z,i)=>[z[0]+(i<2?0:shift),z[1]+(i<2?0:yy),z[2]]),phase===1?deep:scaleBlue,phase);
   // Bone horns, icy frill, angular draconic snout, jaw and cheek musculature.
   fang(xx+7*k,cy+3*k,xx+10*k,cy-13*k,4*k,bone);fang(xx+12*k,cy+6*k,xx+21*k,cy-3*k,3*k,bone);fang(xx+1*k,cy+3*k,xx+1*k,cy-8*k,2.7*k,bone);
   q(frost,6,-1,17,-8,17,1,24,0,19,11,12,18,5,13);q(scaleBlue,-23,8,-14,1,-2,-3,10,1,17,10,13,20,3,23,-7,19,-17,16,-24,14);q(scaleBlue,-23,7,-15,2,-3,0,4,4,-2,8,-15,11,-23,12);q(deep,-24,14,-12,11,0,12,7,16,3,21,-9,20,-20,17);pp(K,-24,12,-12,10,2,11,5,13,-1,14,-12,14,-23,14);for(const [a,b] of [[-19,12],[-6,13]])pp('#f7f2d9',a,b,a+2.5,b,a+1,b+4);q(belly,-19,16,-11,16,-2,15,4,17,1,20,-10,19,-20,17);pp(K,-10,5,1,3,3,6,-5,8,-10,7);pp('#f6de8d',-8,5,-1,4,-2,6,-7,7);pp('#131c29',-4,4,-3,4,-3,7,-4,7);q(scaleBlue,5,6,13,8,15,13,9,18,4,16);pp('#bbe8eb',7,7,12,8,10,10,6,9);pix('#0c1c2d',xx-18*k,cy+8*k,2,1);
  }
  tube([[12,76,8],[27,80,10],[48,82,10],[70,80,10],[84,72,6]],scaleBlue,'scale');for(let i=0;i<8;i++){let x=15+i*8.2,y=80+Math.sin(i*.5)*3;facet([x,y,x+7,y-2,x+9,y+2,x+6,y+5,x,y+4],belly,'belly');}
 }else if(id==='ancient_chitin_behemoth'){
  // R14: ancient earth beetle titan, low charging silhouette, real articulated limbs.
  const shell=ramp('#141b21','#273b34','#4f6243','#a0ae70','#e2dca2'), shadow=ramp('#111b20','#263830','#4f6245','#839360'), golds=ramp('#332922','#6e5035','#b69258','#f2d6a0'), horn=ramp('#2b2325','#705c4b','#c3a078','#fff0c7'), seams=ramp('#15231e','#355a37','#759b4a','#d1efa1');
  const Q=(c,...v)=>poly(c,...v.map((z,i)=>z+(i%2?Y:X)));const armor=(pal,...v)=>facet(v.map((z,i)=>z+(i%2?Y:X)),pal,'metal');
  const leg=(pts,pal,front=false)=>{
    tube(pts,pal,'rib',1);for(let i=0;i<pts.length-2;i++){let [x,y,w]=pts[i], [a,b,v]=pts[i+1], dx=a-x,dy=b-y,d=Math.hypot(dx,dy),nx=-dy/d,ny=dx/d;facet([x+nx*w,y+ny*w,x-nx*w,y-ny*w,a-nx*v,b-ny*v,a+nx*v,b+ny*v],pal,'metal');}
    let [x,y,w]=pts.at(-1);F(pal,x-w-3,y-2,x+w,y-4,x+w+4,y+2,x+w,y+5,x-w-6,y+5,x-w-7,y+2);for(let i=0;i<3;i++)fang(x-w+i*3.3,y+2,x-w-5+i*4,y+5,2.2,horn);
  };
  // Separate rear leg silhouettes, visible in gaps between near legs.
  leg([[38+X,45+Y,7],[27,61,5],[30,73,4],[24,83,3]],shadow);
  leg([[60+X,47+Y,8],[70,58,5],[63,73,4],[55,83,3]],shadow);
  leg([[80+X,44+Y,8],[91,57,5],[87,72,4],[83,83,3]],shadow);
  // Belly and sweeping elytra; asymmetric armored shoulder, tapering abdomen.
  ell(59+X,54+Y,34,17,-.13,shadow,'rib',1.2);
  armor(shell,26,31,36,18,50,12,67,13,83,20,92,34,94,46,85,58,66,63,47,61,29,51,24,41);
  // Irregular overlapping shell segments, each with a separate hard bevel and ridge.
  armor(shell,58,15,70,13,84,22,92,35,90,45,80,51,66,46,60,34);
  armor(shell,44,13,56,9,70,15,76,27,72,40,60,46,46,38,39,25);
  armor(shell,30,21,43,13,56,18,61,32,55,45,41,51,29,42,25,31);
  armor(shell,66,42,81,41,91,47,85,57,72,63,61,58,58,50);
  armor(shell,49,40,61,38,73,44,72,54,62,62,50,58,44,49);
  armor(shell,30,38,42,34,54,42,55,53,45,62,32,58,25,47);
  // Broken mineral ridge grows out of the shell instead of a uniform crown.
  for(const [x,y,w,hh,t] of [[40,5,4,18,-5],[50,1,6,19,-2],[62,3,5,16,5],[76,9,4,15,4],[86,18,3,13,4]])shard(x+X,y+Y,w,hh,seams,t);
  // Front armor overlaps the dorsal ridge bases.
  armor(shell,23,24,35,15,45,18,53,28,49,42,36,49,23,40,19,32);
  Q('#6b7951',24,26,34,19,43,21,47,26,37,24,29,29);
  // All three near limbs have different lengths and angles, leaving dark joints exposed.
  leg([[76+X,53+Y,10],[87,61,7],[79,74,5],[78,83,5]],shell,true);
  leg([[52+X,55+Y,11],[61,64,7],[49,75,5],[45,83,5]],shell,true);
  leg([[28+X,49+Y,11],[19,59,8],[18,74,5],[10,83,5]],shell,true);
  // Angular head and cheek armor, prominent shovel-like double mandibles.
  armor(shadow,6,33,13,24,25,22,36,29,38,42,30,53,15,55,4,47,2,40);
  armor(shell,4,33,11,27,24,24,31,29,27,36,17,40,4,40);
  armor(shell,22,31,33,33,37,41,31,49,23,52,17,44);
  // Crown horns curl toward the enemy, distinct from mandibles.
  tube([[16+X,31+Y,5],[11+X,22+Y,4],[7+X,12+Y,2.5],[7+X,5+Y,.8]],horn,'smooth',.65);
  tube([[30+X,27+Y,4.5],[28+X,18+Y,3],[22+X,9+Y,1]],horn,'smooth',.65);
  Q(K,5,38,14,34,20,35,17,41,8,42);Q('#b8ec75',7,38,15,36,16,38,12,40,7,40);Q('#f1ffbf',8,38,11,37,11,39,8,39);
  Q('#1a2925',22,36,29,34,31,37,28,40,23,40);Q('#91bd55',24,36,28,35,28,37,24,38);
  Q(K,5,45,18,43,25,46,22,54,12,58,5,54);
  // Two clearly separated, hooked jaws with heavy ochre bevels.
  tube([[8+X,47+Y,4],[4+X,54+Y,3.5],[1+X,61+Y,2.5],[3+X,65+Y,1]],golds,'smooth',.65);
  tube([[22+X,49+Y,5.5],[18+X,57+Y,4.8],[9+X,65+Y,3.7],[4+X,65+Y,1.1]],horn,'smooth',.7);
  fang(15+X,57+Y,10+X,55+Y,2.4,horn);fang(11+X,62+Y,6+X,59+Y,2,horn);
  // Chipped edges, ochre striations and embedded mineral fissures follow each plate.
  for(const v of [[34,21,38,24,36,29],[51,17,55,20,54,26],[65,20,69,23,68,30],[78,30,82,34,80,38],[35,40,40,43,38,47],[58,46,61,49,59,54],[76,48,80,51,77,56]]){Q('#2a3a2e',v[0],v[1],v[2],v[3],v[4],v[5],v[2]-2,v[3],v[0]-1,v[1]+1);line('#b6bd7a',0,...v.map((n,i)=>n+(i%2?Y:X+1)));}
  for(const [x,y] of [[41,31],[47,33],[59,28],[72,36],[83,40],[38,51],[64,53]]){Q('#9ca66b',x,y,x+4,y-1,x+3,y+1,x,y+2);}

 }else if(['solar_sentinel','radiant_phoenix','dread_reaper','void_devourer','sun_archon'].includes(id)){
 // R16: independently authored silhouettes, hard edge pixel clusters and local articulated motion.
 const shift=(v,dx=X,dy=Y)=>v.map((n,i)=>n+(i%2?dy:dx));
 const q=(c,...v)=>poly(c,...shift(v));
 const z=(pal,...v)=>metal(pal,...shift(v));
 const stroke=(c,w,...v)=>line(c,w,...shift(v));
 const brass=ramp('#241b26','#59402f','#a6773c','#e3b968','#fff0b4');
 const steel=ramp('#101724','#293646','#60747d','#b9c5bd');
 const ivory2=ramp('#342d39','#716474','#c0b4a2','#fff0cb');
 const red=ramp('#271527','#592337','#a53e37','#d77b49');
 const flame=ramp('#4b1629','#a0352d','#e85c29','#ffc153','#fff8b7');
 const gold='#d6aa58', gl='#ffe4a0', gd='#755035', dark='#191925';
 // tapered curved feather with shaft and broken, manually directed highlight clusters.
 const feather=(pal,x,y,tx,ty,w,bend=0)=>{let dx=tx-x,dy=ty-y,L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L;
 const at=(t,a)=>[x+dx*t+nx*(a+bend*Math.sin(Math.PI*t)),y+dy*t+ny*(a+bend*Math.sin(Math.PI*t))];
 const shape=(c,ps)=>poly(c,...ps.flatMap(([t,a])=>at(t,a)));
 shape(K,[[0,-w],[.26,-w*1.05],[.63,-w*.77],[1,0],[.65,w*.65],[.25,w],[0,w]]);
 shape(shade(pal,.55),[[.02,-w*.72],[.3,-w*.83],[.66,-w*.53],[.98,0],[.63,w*.45],[.27,w*.74],[.02,w*.72]]);
 shape(shade(pal,.72),[[.08,-w*.55],[.34,-w*.65],[.75,-w*.27],[.98,0],[.54,-w*.07],[.2,w*.07]]);
 shape(shade(pal,.31),[[.17,w*.16],[.5,w*.16],[.91,0],[.6,w*.42],[.24,w*.6]]);
 for(let t of [.38,.57,.73]){const a=at(t,-w*.48*(1-t)),b=at(t+.08,-w*.13);line(shade(pal,.78),0,...a,...b);}
 };
 if(id==='solar_sentinel'){
 // R17: a narrow-waisted solar legionary, individually authored forged plates.
 const ink='#151420', deep='#292433', iron='#41434d', steelHi='#747c83', shadeG='#593b2e', brassM='#a2723c', goldM='#d5a658', bright='#f5d88f', white='#fff0bd', redD='#3c1829', redM='#79313a', redH='#b65142';
 const Q=(c,...v)=>poly(c,...shift(v));
 // cloak is one connected sweep, with long directional folds.
 Q(ink,50,18,62,20,66,27,70,46,76,65,86,82,75,79,69,87,62,77,54,86,48,64,46,37);
 Q(redD,51,20,61,22,65,29,69,47,74,65,83,80,74,76,69,84,62,74,55,82,50,63,48,38);
 Q(redM,54,23,59,25,62,35,65,55,73,77,69,72,62,54,59,36);Q(redH,55,26,58,29,61,47,66,64,62,58,58,45);Q('#51212c',64,33,68,48,73,63,79,76,72,68,67,55);
 // far leg — narrow foot, knee joint, tapered greave
 poly(ink,49,46,60,47,65,59,66,68,72,79,79,84,79,88,61,88,57,84,58,76,54,68,52,62,46,55);
 poly(deep,51,48,58,49,63,60,61,67,68,80,73,84,63,85,60,81,60,75,55,67,55,62,49,54);
 poly(shadeG,55,51,59,51,64,61,60,65,55,60,51,54);poly(brassM,55,52,59,53,62,60,58,61);poly(ink,56,65,63,63,67,68,64,73,59,72);poly(brassM,58,66,63,65,65,68,62,71,59,70);
 poly(shadeG,59,72,64,71,69,79,68,82,62,81);poly(goldM,60,73,63,73,66,79,63,80);poly(brassM,62,81,69,81,76,85,76,86,62,86,60,84);poly(bright,63,82,68,82,72,84,65,84);
 // near leg: armored thigh with visible dark fabric at hip, anatomical knee and angled shin
 poly(ink,34,45,49,46,50,55,43,67,39,71,36,81,40,86,36,88,15,88,14,84,23,79,26,69,26,64,30,55);
 poly(iron,36,48,46,48,47,55,40,66,35,70,33,80,36,84,18,86,17,84,26,80,29,69,28,64,32,55);
 poly(shadeG,32,52,39,49,47,52,44,59,37,64,29,62);poly(goldM,33,52,39,51,44,53,41,58,35,60,31,59);poly(bright,33,52,39,51,42,53,36,54,32,57);poly(brassM,38,55,44,53,41,59,35,61,35,58);
 poly(ink,28,62,38,61,41,66,37,72,29,71,26,67);poly(shadeG,29,63,37,63,39,66,35,70,29,69,28,66);poly(goldM,29,64,36,64,37,66,33,68,28,66);poly(bright,30,64,35,64,34,65,29,66);
 poly(shadeG,28,70,36,71,34,76,33,82,25,83,22,80);poly(goldM,28,71,32,73,30,81,25,81,25,78);poly(bright,28,72,30,73,27,79,25,80);poly(brassM,32,74,35,72,32,81,30,81);
 poly(ink,23,79,32,80,36,85,34,88,14,88,12,85,16,82);poly(brassM,23,81,31,82,33,85,15,86,16,84);poly(goldM,23,81,27,82,22,84,16,85,18,83);poly(bright,16,84,22,83,21,84,16,85);
 // one angular cuirass, not independent pectoral balls. steel core and layered golden ribs
 Q(ink,31,20,44,18,59,21,65,29,60,42,54,48,52,56,40,59,31,53,32,44,25,36,25,27);
 Q(deep,32,22,44,20,57,23,63,29,58,41,52,47,50,54,40,57,33,52,34,43,27,35,27,28);
 Q(shadeG,29,26,43,21,57,24,61,29,56,39,46,44,35,42,29,35);
 Q(goldM,30,27,43,23,54,25,57,29,52,36,43,40,35,39,30,34);
 Q(bright,30,27,42,23,53,25,49,27,42,26,34,29,31,33);Q(brassM,44,28,55,27,57,30,51,36,43,40,38,38);Q(shadeG,43,29,47,32,44,39,41,38);
 // engraved sun on chest — small and integrated, not a spherical core
 Q(ink,41,29,46,27,51,31,49,37,44,39,39,35);Q('#a94d24',42,30,46,29,49,32,47,36,44,37,41,34);Q('#f8b34c',43,31,46,30,48,32,46,35,44,35,42,33);Q(white,44,31,46,31,46,33,44,34);
 for(const [x,y,xx,yy] of [[40,28,38,26],[51,29,54,27],[52,35,55,36],[41,38,39,40]])stroke(bright,0,x,y,xx,yy);
 Q(shadeG,34,42,43,44,53,40,55,43,50,47,41,49,34,46);Q(goldM,35,43,42,45,51,42,49,45,41,47,35,45);
 Q(shadeG,34,47,41,50,51,46,53,49,49,53,40,55,33,52);Q(goldM,35,48,41,51,49,48,48,50,40,53,35,51);
 Q(ink,32,52,41,55,51,52,54,56,49,62,41,59,32,62,28,57);Q(brassM,33,54,41,57,50,54,51,57,48,59,41,58,33,60,30,57);Q(bright,39,55,44,55,44,58,39,58);
 // angular profile helm, narrow eye slit and nose guard, small back crest
 Q(ink,32,18,29,13,31,6,38,2,47,3,52,7,54,15,49,22,41,24,35,21,30,20);
 Q(shadeG,33,17,31,13,33,7,39,4,47,5,50,8,52,14,48,20,41,22,36,19,32,19);
 Q(goldM,32,12,34,7,39,4,46,5,49,8,45,12,36,13);Q(bright,34,7,39,5,46,6,45,8,38,8,34,10);Q(brassM,47,8,51,12,50,17,46,20,42,19,46,14);
 Q(ink,30,13,40,11,46,12,44,15,37,16,31,17);Q('#ffb04b',32,13,39,12,43,13,36,14,32,15);Q(white,33,13,38,12,38,13,33,14);
 Q(goldM,31,17,36,16,38,20,42,21,38,23,33,21,29,19);Q(bright,31,17,34,17,32,20,30,19);Q(ink,37,18,44,17,44,18,38,20);
 Q(ink,45,5,47,0,51,2,57,7,57,13,52,10);Q(redM,47,3,51,4,55,8,55,10,51,8);Q(redH,48,3,52,5,54,7,51,6);
 // far arm with angular pauldrons and visibly articulated elbow
 Q(ink,55,23,64,20,70,25,69,33,65,38,67,45,63,53,55,52,53,45,57,38,53,30);
 Q(iron,57,25,64,23,68,27,66,33,63,37,65,44,61,50,57,50,55,45,59,38,55,30);
 Q(shadeG,53,25,63,19,71,24,68,31,62,34,56,31);Q(goldM,55,25,63,21,68,24,66,29,62,31,56,29);Q(bright,55,25,63,21,67,23,61,24,56,27);
 Q(brassM,59,39,64,38,65,45,61,49,56,46);Q(bright,59,40,63,39,61,44,57,45);Q(deep,56,48,61,49,60,54,55,54,54,51);
 // weapon passes behind the near hand. diagonal shaft and shaped crescent head.
 const ax=-A*1.4+hurt, ay=Y*.5;const Wp=(c,...v)=>poly(c,...shift(v,ax,ay));
 Wp(ink,10,6,14,5,37,86,33,88);Wp('#654637',11,7,13,7,35,85,34,86);Wp(bright,11,8,12,8,34,84,33,84);
 Wp(ink,11,3,16,3,18,12,25,13,29,8,28,19,22,26,13,29,12,22,7,17,4,9,6,5);Wp(shadeG,12,5,15,5,16,13,24,15,27,12,26,19,21,24,14,27,14,21,9,16,6,9,7,7);
 Wp(goldM,8,7,12,6,12,13,16,18,22,18,26,15,25,19,20,23,15,25,15,20,10,16,7,10);Wp(bright,8,7,11,7,9,11,12,16,16,20,20,20,24,18,21,22,15,23,11,17,7,11);Wp('#f28c3c',15,12,18,16,17,20,14,17);Wp(white,15,14,17,16,16,18);
 // near arm bends around shaft; no spherical joints
 Q(ink,26,23,34,21,38,27,34,35,27,38,25,43,29,47,25,53,18,52,14,47,17,37,19,29);
 Q(iron,27,25,33,23,36,28,32,34,25,37,23,43,27,47,23,51,19,50,16,47,19,37,21,30);
 Q(shadeG,19,26,28,21,35,24,36,29,29,35,20,34,16,30);Q(goldM,19,27,28,23,33,25,33,29,28,33,21,32,18,30);Q(bright,19,27,28,23,32,25,26,26,20,29);
 Q(shadeG,18,37,24,35,27,39,25,46,20,49,15,45);Q(goldM,19,38,24,37,25,40,22,46,18,46,17,44);Q(bright,19,38,23,38,21,42,18,44);
 Wp(ink,18,44,24,43,29,46,29,51,25,54,19,52,17,49);Wp(brassM,19,45,24,45,27,47,27,50,24,52,20,51,19,49);Wp(bright,19,46,23,46,25,48,22,48,19,47);Wp(shadeG,21,49,27,48,26,50,22,51);
 }else if(id==='radiant_phoenix'){
 const fire=ramp('#33162b','#792335','#c43e2d','#f48131','#ffdb78'), far=ramp('#271629','#63243a','#9e3a38','#dd7647','#ffb36a'), crest=ramp('#812b29','#df5d27','#ffb243','#fff3af');
 const dx=X,dy=Y-2,flap=pose==='idle'?(step===1?-3:step===2?2:0):-A*.75;
 // Far wing curves up and backwards. Long independent tail streamers, no round shoulder disk.
 poly(K,...shift([32,45,32,25,40,5,52,14,64,26,67,37,53,48],dx,dy));poly('#783039',...shift([34,43,34,25,41,8,51,16,62,27,64,37,52,46],dx,dy));for(let i=0;i<5;i++)feather(far,43+i*1.1+dx,41+dy,40+i*5.4+dx,5+i*4.4+dy+flap,6.5,2);
 for(let i=0;i<5;i++)feather(i===2?crest:fire,53+dx,52+i*1.3+dy,94-i*3.9+dx,58+i*6.6+dy,4.4,5-i*.6);
 tube([[26+dx,34+dy,7],[33+dx,46+dy,11],[49+dx,51+dy,13],[65+dx,53+dy,6]],fire,'fur',.9);
 // Angular feathers following the torso, breast and throat. Distinct near wing with open finger tips.
 poly(K,...shift([38,48,41,29,56,14,76,5,94,1,91,22,90,36,82,49,69,55,52,55],dx,dy));
 poly('#aa382d',...shift([40,47,43,30,57,15,77,7,91,3,89,22,88,36,81,47,68,53,52,53],dx,dy));
 // Broad primary feathers arranged along the wing's leading edge; layered coverts conceal roots.
 for(const [x,y,tx,ty,w] of [[50,34,89,3,6],[54,37,90,15,6],[56,40,89,27,6],[56,44,86,39,6],[55,47,78,48,6],[51,48,67,54,5]])feather(fire,x+dx,y+dy,tx+dx,ty+dy+flap,w,2);
 for(const [x,y,tx,ty,w] of [[43,37,68,15,6],[45,40,78,23,6],[47,43,78,35,5],[46,46,69,44,5],[43,46,57,50,4]])feather(crest,x+dx,y+dy,tx+dx,ty+dy+flap*.5,w,1);
 poly('#b44631',...shift([39,42,45,31,53,28,61,32,54,40,47,46],dx,dy));poly('#ef8638',...shift([41,40,46,33,53,31,57,33,50,38,43,43],dx,dy));
 for(let i=0;i<5;i++)feather(crest,32+i*3+dx,40+i*.5+dy,41+i*4+dx,52+i*.8+dy,2.6,.3);
 // neck and raptor head; swept crest, narrow brow and hooked ivory beak.
 const pp=(c,...v)=>poly(c,...shift(v,dx,dy));
 pp(K,8,29,13,21,23,19,30,24,33,34,28,45,20,42,15,34,8,35,3,38,4,30);
 pp('#b8432d',10,29,14,23,23,21,28,26,30,34,26,42,20,40,16,33,10,33);pp('#ed8236',13,24,20,22,25,24,27,29,20,28,14,30);pp('#ffd578',14,24,19,22,23,24,19,26,13,27);
 for(let i=0;i<4;i++)feather(crest,20+i*1.5+dx,24+dy,25+i*4.6+dx,7+i*3.8+dy,2.2,1.2);
 pp(K,3,29,12,27,15,31,10,35,6,39,5,35,1,35);pp('#e9b367',3,30,11,29,12,31,7,34,6,37,5,33,2,34);pp('#fff2ac',3,30,9,29,7,31,3,32);pp(K,11,27,19,25,21,28,16,30,11,29);pp('#fff6ca',13,27,17,26,17,28,13,29);
 for(const [x,y] of [[35,55],[49,57]]){tube([[x+dx,y+dy,2.4],[x-5+dx,y+9+dy,1.7],[x-2+dx,y+12+dy,1.4]],ivory2,'rib',.55);for(let i=0;i<3;i++)fang(x-4+i*2+dx,y+12+dy,x-9+i*2.8+dx,y+15+dy,1.2,ivory2);}
 }else if(id==='dread_reaper'){
 const cloth=ramp('#100e1c','#282337','#49425d','#746783','#aba1bb'), edge='#77708e', pale='#dacdbb';
 // Dramatic asymmetrical silhouette, flowing cloak with actual negative-space tears.
 q(K,49,12,63,15,70,26,78,42,90,55,94,73,88,70,94,87,79,81,73,94,65,85,56,91,52,82,39,92,35,82,22,88,26,66,28,46,34,29);
 q('#241d33',49,15,62,17,68,28,76,43,88,57,91,70,84,66,90,84,78,78,73,90,65,82,57,87,53,79,40,88,37,79,25,84,29,65,30,46,36,30);
 q('#4c435e',49,16,58,18,61,34,67,54,64,74,58,83,59,65,53,48,48,31);q('#141321',63,27,71,43,82,57,85,67,77,62,73,55,71,77,66,65,67,50);q('#5a4c68',69,37,75,46,87,58,89,64,81,60,74,52);q('#3f354f',37,36,45,38,43,60,37,78,30,82,34,64,34,49);q('#685972',46,55,50,63,48,77,41,84,44,68);q('#151321',50,46,55,55,52,74,48,81,50,60);q('#51445d',75,66,80,71,86,80,79,77,73,86,73,77);
 // torso tilted left, engraved shoulder and thin ribcage showing beneath split cloak.
 q(K,34,32,47,27,58,31,61,43,53,60,42,65,34,54,30,41);q('#211d31',36,33,47,29,56,32,58,42,50,57,42,62,36,52,32,41);
 tube([[43+X,33+Y,2.2],[45+X,45+Y,2.3],[47+X,56+Y,2]],ivory2,'rib',.6);
 for(let i=0;i<5;i++){let y=35+i*3.8;q('#9c8f89',36,y,42,y-1,47,y,52,y-1,54,y+1,49,y+3,44,y+2,40,y+3,36,y+2);q(pale,37,y,42,y-1,44,y,40,y+1,37,y+1);}
 q('#322a41',50,31,62,27,69,34,65,42,57,45,51,39);q(edge,53,32,62,29,66,34,60,34,54,36);q('#9a8b9c',56,31,61,30,63,31,58,32);
 // Hood follows skull with a pronounced left-facing jaw and cheek bone.
 q(K,26,21,30,11,40,4,53,0,57,10,63,20,58,32,49,38,36,33,27,28,23,25);q('#50435f',28,20,32,13,41,7,52,3,54,12,60,20,55,30,49,35,37,31,28,26);q('#82718b',31,14,41,8,50,5,46,12,37,16,29,24,26,24);q('#191421',32,19,41,13,49,14,53,20,50,29,44,33,34,28,29,25);q('#a79b95',32,19,41,15,47,17,48,23,44,27,44,31,37,31,34,27,29,26,30,23);q('#e6d5b9',33,19,40,16,45,18,42,20,36,20,31,23);q(K,29,23,34,20,41,21,40,24,34,26,29,25);q('#cdb0ff',31,23,36,22,39,22,36,24,31,25);q(K,32,26,36,25,35,28,32,28);q('#e6d5bb',36,27,42,26,43,29,41,31,36,30);for(let i=0;i<3;i++)q('#43374b',37+i*2,28,38+i*2,28,38+i*2,30,37+i*2,30);
 q('#342a43',48,12,55,16,58,23,54,31,48,35,44,32,50,25);q('#8d749e',48,14,52,18,54,24,50,30,52,23);
 // Huge curved crescent scythe with angular polished edge and filigree mount.
 const a=-A*1.4+hurt,b=Y*.6;const w=(c,...v)=>poly(c,...shift(v,a,b));
 w(K,41,19,45,21,22,94,17,93);w('#54454c',42,21,43,22,20,92,19,92);w('#bcb09a',42,22,43,22,21,90,20,90);
 w(K,44,17,36,10,25,5,13,4,5,8,1,15,0,29,4,24,8,17,15,13,23,13,31,16,39,23,45,24);
 w('#687c91',42,18,35,12,24,7,13,6,6,10,3,16,2,24,7,16,14,11,23,11,32,15,40,21,44,22);w('#e0f1ec',2,24,4,15,8,10,15,7,24,8,34,13,40,18,29,12,20,10,13,11,7,16);w('#37435e',12,12,22,11,32,16,41,22,38,23,30,18,20,15);w('#a88ac4',38,15,43,16,47,20,44,25,39,24,41,20);w('#e3cfff',42,17,44,20,42,23,40,20);
 tube([[55+X,36+Y,5],[51+X,44+Y,4],[35+a,44+b,3]],cloth,'smooth',.7);tube([[34+X,35+Y,4],[28+X,44+Y,3],[34+a,49+b,2.4]],cloth,'smooth',.7);ell(35+a,45+b,4,3,-.6,ivory2,'rib',.5);ell(34+a,49+b,3.3,3,-.4,ivory2,'rib',.5);
 // narrow silver stitching only at selected edges, crescent clasp.
 stroke('#8e779b',0,31,47,29,62,27,79);stroke('#8e779b',0,70,46,75,58,79,63);q('#b8a0c1',48,33,52,31,55,33,54,36,51,38,48,36);q('#39263f',51,32,54,33,53,35,51,35);
 }else if(id==='void_devourer'){
 const hide=ramp('#100e20','#26223d','#483854','#77516e','#b786a3'), shell=ramp('#171526','#302a46','#63516d','#9a85aa','#dfc2df'), flesh=ramp('#241027','#51213b','#8e405d','#ca7490'), glow='#eabbff';
 // Alien predator: long bent torso, hooked chitin limbs, sloping skull and splitting jaw.
 tube([[63+X,48+Y,6],[83,46,4],[91,35,3],[90,22,1]],hide,'rib',.8);tube([[68+X,57+Y,7],[83,72,5],[93,76,2],[91,85,1]],hide,'rib',.8);
 tube([[53+X,53+Y,7],[61,70,4],[54,83,3],[43,87,1]],shell,'rib',.8);tube([[67+X,48+Y,8],[77,57,5],[77,75,3],[66,88,1]],hide,'rib',.8);
 tube([[32+X,40+Y,12],[49+X,39+Y,18],[65+X,49+Y,17],[79+X,57+Y,9]],hide,'shell',1.1);
 // Curved overlapping armor ridges instead of spherical segments.
 for(let i=0;i<5;i++){let x=34+i*9,y=26+i*3;F(shell,x+X-5,y+Y+12,x+X-1,y+Y+3,x+X+6,y+Y-5,x+X+13,y+Y-11+i*.7,x+X+12,y+Y+3,x+X+18,y+Y+10,x+X+12,y+Y+22,x+X+2,y+Y+24);poly('#ad91b4',x+X,y+Y+7,x+X+6,y+Y-3,x+X+11,y+Y-8+i*.7,x+X+8,y+Y+5,x+X+3,y+Y+13);poly('#3b2a46',x+X+10,y+Y+7,x+X+15,y+Y+12,x+X+10,y+Y+20,x+X+5,y+Y+23);}
 // neck sinews and forelegs
 tube([[38+X,51+Y,8],[30+X,65+Y,5],[16,78,3],[9,88,2]],hide,'rib',.8);F(shell,28+X,51+Y,37+X,53+Y,40+X,60+Y,29+X,68+Y,22+X,66+Y);F(shell,20,68,29,67,28,73,17,82,13,82,13,77);for(let i=0;i<3;i++)fang(12+i*2,83,4+i*3,90-i*2,2.5,ivory2);
 tube([[59+X,52+Y,7],[69,66,5],[61,79,3],[54,87,2]],hide,'rib',.8);F(shell,64,62,73,64,73,71,64,80,58,79,59,73);for(let i=0;i<3;i++)fang(57+i*2,83,49+i*3,90-i,2,ivory2);
 // Wedge-shaped head with open maw that reads in silhouette.
 q(K,4,26,14,18,31,16,45,22,51,34,44,48,33,54,24,50,18,61,7,58,2,51,3,43,13,44,23,39,9,38,1,34);
 q('#4e3c60',5,27,15,20,30,18,44,24,48,34,42,46,32,51,24,47,18,58,8,56,4,51,5,46,13,47,27,39,12,36,3,33);
 q('#93759a',6,27,15,22,29,20,42,25,43,31,33,29,24,27,11,30,5,32);q('#c8a5bb',13,23,24,20,33,22,26,24,15,26,8,29);q('#25162c',5,34,14,32,28,34,39,39,30,48,19,49,12,54,6,51,16,45,24,39,13,37);q('#71344d',13,36,26,36,34,40,28,46,20,45,15,49,11,49,22,40);q('#d98da1',26,38,31,39,29,42,25,43,23,41);
 for(const [x,y,tx,ty,w] of [[7,33,8,41,2],[13,32,15,40,2.1],[20,33,20,43,2.4],[27,35,24,43,2],[8,53,11,46,2],[15,53,17,45,2.2],[21,49,22,43,1.6]])fang(x+X,y+Y,tx+X,ty+Y,w,ivory2);
 q(K,13,28,20,24,28,25,29,29,22,31,14,31);q(glow,16,28,21,26,25,27,23,29,16,30);q('#fff2ff',17,28,21,27,21,28,17,29);
 fang(31+X,20+Y,42+X,8+Y,4,shell);fang(42+X,25+Y,53+X,13+Y,3,shell);
 // vent slits with concentrated violet light.
 for(let i=0;i<4;i++){let x=45+i*7,y=44+i*2;q(K,x,y,x+5,y-3,x+6,y-1,x+3,y+3);q('#b77be2',x+1,y,x+4,y-2,x+4,y,x+2,y+2);}
 }else if(id==='sun_archon'){
 // R17: winged sovereign in side-facing contrapposto, hand-cut metal planes, porcelain mask and silk tabard.
 const ink='#151421', wingD='#49404b', wingM='#a69b91', wingL='#e2d6b9', wingH='#fff1ce', wingS='#72626a', goldD='#62422f', goldM='#bf8d49', goldL='#edc77a', goldH='#fff0b2', shadow='#302431', ivory='#e8d9bf', redD='#3b192e', redM='#813b48', redH='#c46a55', steel='#495260';
 const Q=(c,...v)=>poly(c,...shift(v));const fl=pose==='idle'?(step===1?-1.8:step===2?1.3:0):-A*.5;
 // Rear wings: a single connected arched mass per side, then individually tapered flight feathers.
 const wingFeather=(x,y,tx,ty,w,far=false)=>{const dx=tx-x,dy=ty-y,L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L;
 const at=(t,k)=>[x+dx*t+nx*k,y+dy*t+ny*k];const f=(c,ps)=>poly(c,...ps.flatMap(([t,k])=>at(t,k)));
 const d=far?'#5f5361':wingS, m=far?'#9a8c89':wingM, hi=far?'#d5c4ab':wingL, top=far?'#ead8b9':wingH;
 f(ink,[[0,-w*.65],[.19,-w],[.51,-w*.94],[.82,-w*.48],[1,0],[.78,w*.42],[.43,w*.8],[.14,w*.8],[0,w*.45]]);
 f(d,[[.03,-w*.52],[.2,-w*.81],[.51,-w*.76],[.82,-w*.34],[.97,0],[.76,w*.27],[.42,w*.63],[.15,w*.61],[.03,w*.3]]);
 f(m,[[.03,-w*.51],[.2,-w*.81],[.51,-w*.76],[.82,-w*.34],[.97,0],[.7,w*.02],[.42,w*.24],[.12,w*.27]]);
 f(hi,[[.07,-w*.45],[.23,-w*.72],[.51,-w*.64],[.82,-w*.27],[.97,0],[.6,-w*.14],[.23,-w*.06],[.07,w*.04]]);
 f(top,[[.22,-w*.64],[.5,-w*.56],[.77,-w*.23],[.94,0],[.63,-w*.28],[.3,-w*.31]]);
 for(const t of [.34,.49,.63,.77]){let a=at(t,-w*.52*(1-t)),b=at(t+.1,w*.02);line(far?m:hi,0,...a,...b);}
 };
 poly(ink,44+X,34+Y,31,21,17,9+fl,5,5+fl,8,23,14,42,24,57,37,62,49,48);poly(wingD,44+X,34+Y,31,23,17,11+fl,7,8+fl,10,24,16,42,25,55,37,59,47,48);
 for(const [x,y,tx,ty,w] of [[39,31,7,7,5],[39,34,8,18,5],[40,38,12,29,5],[40,42,17,40,5],[41,47,23,51,4],[43,49,32,57,4]])wingFeather(x+X,y+Y,tx,ty+fl,w,true);
 poly(ink,53+X,33+Y,65,20,78,8+fl,94,3+fl,93,21,90,40,81,56,66,66,53,53);poly(wingS,55+X,34+Y,66,22,79,10+fl,92,6+fl,91,22,88,40,79,55,66,63,55,53);
 for(const [x,y,tx,ty,w] of [[63,30,94,4,5.2],[64,32,94,15,5.4],[65,35,92,26,5.5],[66,39,88,37,5.3],[66,43,82,48,5],[65,47,76,57,4.5],[62,49,67,65,4]])wingFeather(x+X,y+Y,tx,ty+fl,w);
 for(const [x,y,tx,ty,w] of [[57,29,78,14,4],[58,32,84,23,4.2],[59,36,84,33,4],[60,40,80,43,3.8],[60,44,73,51,3.5],[58,47,64,56,3]])wingFeather(x+X,y+Y,tx,ty+fl*.6,w);
 for(const [x,y,tx,ty,w] of [[43,29,20,18,3.6],[44,33,20,29,3.8],[45,38,26,39,3.5],[45,43,34,47,3.4]])wingFeather(x+X,y+Y,tx,ty+fl*.6,w,true);
 // thin open sun diadem behind the head, not a filled blob
 const cx=48+X,cy=18+Y;for(let i=0;i<20;i++){const ang=-Math.PI+i*Math.PI*2/20,ang2=ang+.25;const x=cx+Math.cos(ang)*14,y=cy+Math.sin(ang)*14,x2=cx+Math.cos(ang2)*14,y2=cy+Math.sin(ang2)*14;line(ink,1,x,y,x2,y2);line(goldM,0,x,y,x2,y2);if(i%2===0){const xx=Math.cos(ang),yy=Math.sin(ang);poly(goldL,x-yy,y+xx,x+xx*4,y+yy*4,x+yy,y-xx);}}
 // long flowing cape, narrow waist, split tabard rather than bulky leg armor
 Q(ink,43,25,57,27,63,39,63,56,70,71,82,88,71,84,67,91,58,85,53,92,45,83,38,91,29,86,21,89,28,67,31,46,34,30);
 Q(redD,44,27,56,29,61,40,61,56,68,72,79,85,71,81,66,88,57,82,53,89,45,80,38,88,29,83,24,86,30,68,33,46,36,32);
 Q(redM,43,32,48,36,45,53,39,71,29,83,27,84,33,67,36,47);Q(redH,43,36,45,39,41,56,35,72,32,76,37,58);Q('#512034',53,35,58,42,59,58,65,74,73,83,65,81,58,69,55,51);Q(redM,56,44,59,50,61,65,67,77,63,74,58,61);
 // back leg and front greave, largely under garment
 poly(ink,48,52,57,52,61,65,62,76,69,83,73,86,72,89,55,89,53,85,53,76,49,67,46,60);poly(shadow,49,54,55,54,59,65,60,76,66,83,69,86,57,87,55,84,55,75,51,66);poly(goldD,55,69,60,69,60,77,65,83,59,85,56,82);poly(goldM,56,70,58,71,59,78,62,82,58,83);poly(goldL,57,71,58,75,59,79,58,78);
 poly(ink,34,52,45,54,44,66,40,76,39,83,43,86,40,89,22,89,21,86,28,82,30,72,31,62);poly(steel,35,54,43,55,42,65,38,76,37,83,40,86,24,87,24,86,30,82,32,72,33,62);poly(goldD,32,67,39,68,38,76,36,83,29,83,28,80);poly(goldM,32,69,37,70,35,78,34,82,30,81,30,77);poly(goldL,32,70,34,71,32,78,30,80);poly(goldM,29,83,36,83,39,86,24,87,25,85);poly(goldH,25,85,31,84,34,85,29,86,25,86);
 // long ivory silk central skirt with bordered pointed panel
 Q(ink,39,46,53,45,56,59,56,72,59,85,51,82,45,91,38,85,32,86,36,71,36,58);
 Q('#917a72',40,48,52,47,54,59,54,72,56,82,51,79,45,88,39,82,35,83,38,70,38,58);
 Q(ivory,40,49,48,48,49,60,47,75,44,85,40,81,37,82,40,69,40,59);Q(wingH,41,50,44,49,43,66,40,78,40,68);Q('#ba9b80',49,51,52,55,52,69,54,79,50,77,47,82,49,70);
 stroke(goldM,0,35,82,39,83,45,89,51,80,56,82);Q(redM,43,53,47,53,46,72,44,79,42,72);Q(goldL,43,54,45,54,44,72,43,74);
 // continuous narrow breastplate, gold engraved panels over deep steel undersuit
 Q(ink,34,24,44,21,55,23,61,29,58,38,52,45,52,50,46,54,36,51,34,43,29,34,29,28);
 Q(shadow,35,26,44,23,54,25,59,30,56,37,50,44,50,49,46,52,38,49,36,42,31,34,31,29);
 Q(goldD,32,28,43,24,54,26,57,30,54,37,47,43,38,42,32,35);
 Q(goldM,33,29,43,26,52,27,55,30,51,36,45,40,38,40,34,34);Q(goldL,33,29,43,26,51,28,47,29,42,28,36,31,34,34);Q(goldH,35,29,43,27,47,28,42,29,36,31);Q('#916039',46,31,54,30,50,36,45,39,42,38);
 // sun sigil etched into breastplate; tiny white center
 Q(ink,42,29,47,29,51,33,47,38,43,38,39,34);Q('#ae592e',43,30,47,30,49,33,46,36,43,36,41,34);Q('#f5b948',43,31,46,31,48,33,46,35,43,35,42,33);Q(goldH,44,32,46,32,46,34,44,34);
 for(const [x,y,xx,yy] of [[41,29,39,27],[49,29,51,27],[50,36,53,38],[40,37,38,39]])stroke(goldH,0,x,y,xx,yy);
 Q(goldD,36,42,45,44,53,40,52,44,46,48,37,46);Q(goldL,37,43,45,45,51,42,48,45,45,46,37,45);Q(goldD,37,47,45,49,51,46,52,50,46,54,38,52);Q(goldM,38,48,45,50,50,48,49,50,45,52,38,51);Q(goldH,42,49,46,49,47,51,44,53,41,51);
 // sculpted left-facing ceremonial helmet, small proportions, separate pale faceplate
 Q(ink,36,19,34,12,36,7,42,4,48,5,52,9,53,16,50,22,45,26,40,24,36,22,33,20);
 Q(goldD,37,19,36,12,38,8,43,6,48,7,50,10,51,16,48,21,45,24,40,22,37,21,35,20);
 Q(goldM,36,12,39,8,43,6,48,7,50,10,46,13,40,13);Q(goldL,38,9,43,7,47,8,46,10,42,10,38,12);Q(goldH,39,9,43,7,45,8,41,9);
 Q(ivory,36,14,42,12,47,13,46,18,43,23,40,22,39,19,35,19,33,17);Q('#ba9c85',43,14,46,14,45,18,43,22,41,21,43,18);Q(wingH,36,14,41,13,40,16,36,17,35,18);
 Q(ink,35,15,42,14,45,15,42,17,37,17,34,18);Q('#ffb94c',36,15,41,15,40,16,36,17);Q(ink,37,20,41,20,42,21,38,21);
 Q(ink,37,8,34,1,40,4,44,0,48,4,55,1,52,9,48,11,43,7,39,11);Q(goldM,38,8,36,3,40,6,44,2,48,6,53,3,51,8,48,9,43,5,39,9);Q(goldH,37,4,40,7,44,3,43,5,40,8,38,7);
 // far shoulder/arm. pointed pauldron with engraved trim, jointed elbow and open hand
 Q(ink,54,25,63,20,70,21,66,30,64,36,65,42,61,51,56,54,52,50,53,44,55,37,51,31);
 Q(steel,55,27,62,23,67,23,64,30,62,36,63,42,59,50,56,52,54,49,55,44,57,37,53,31);
 Q(goldD,51,27,58,21,70,19,67,27,63,33,57,34,53,31);Q(goldM,53,27,59,23,67,21,64,27,61,31,56,32);Q(goldL,54,27,60,23,66,22,63,25,58,27,55,30);Q(goldH,59,23,65,22,63,24,58,25);
 Q(goldD,56,39,62,37,64,42,60,49,55,48,54,44);Q(goldM,57,40,61,39,62,42,59,47,56,46);Q(goldL,57,40,60,40,58,45,56,45);Q(shadow,55,47,59,49,58,54,55,56,52,53,52,50);Q(goldM,54,50,57,50,56,54,54,54);
 // sun spear: narrow long shaft, prismatic blade with open prongs
 const ax=-A*1.3+hurt,ay=Y*.5;const Wp=(c,...v)=>poly(c,...shift(v,ax,ay));
 Wp(ink,10,11,14,10,31,88,27,89);Wp(goldD,11,12,13,12,29,87,28,87);Wp(goldL,11,12,12,12,28,85,27,85);
 Wp(ink,12,0,18,8,19,15,16,21,20,26,13,24,7,28,8,20,3,15,5,8);Wp(goldD,12,2,17,9,17,15,14,21,17,23,13,22,9,25,10,20,5,15,7,9);
 Wp(goldM,12,3,16,9,16,14,13,20,11,19,8,15,8,10);Wp(goldL,12,4,14,10,13,17,10,15,9,11);Wp(goldH,12,5,13,10,12,15,10,11);Wp('#ef8b3b',12,8,14,12,12,16,10,12);Wp('#fff6c9',12,9,13,12,12,14,11,12);
 Wp(goldL,6,10,7,15,11,20,10,24,9,23,9,20,5,15);Wp(goldM,17,10,18,14,15,20,17,24,15,23,13,21,16,15);
 // near arm with a narrow gauntlet wrapping spear
 Q(ink,31,25,38,22,42,27,38,34,32,37,28,42,29,47,25,53,18,51,16,46,20,38,23,31);
 Q(steel,32,27,37,24,40,28,36,33,30,36,26,42,27,46,24,51,19,49,18,46,22,38,25,32);
 Q(goldD,23,27,31,22,39,23,41,28,35,34,27,35,20,31);Q(goldM,24,28,31,24,37,25,38,28,34,32,27,33,22,31);Q(goldL,24,28,31,24,36,25,32,27,27,29,24,31);Q(goldH,27,27,31,25,34,25,30,27);
 Q(goldD,21,38,27,36,30,40,27,46,23,49,18,45);Q(goldM,22,39,27,38,28,40,25,45,22,47,20,44);Q(goldL,22,39,26,39,23,44,21,45);
 Wp(ink,18,44,24,43,28,46,28,51,24,53,19,51,17,48);Wp(goldM,19,45,24,45,26,47,26,50,24,51,20,50,19,48);Wp(goldL,19,46,23,46,25,48,22,48,19,47);Wp(goldD,21,49,26,48,25,50,22,50);
 }
 }
 }else if(id==='leviathan_tide'){
  // Independent abyssal dragon master. Curved overlapping coils, articulated frills, bone crown.
  const deep='#102b40', shade='#1a4858', teal='#28747e', mid='#459c9d', jade='#77c5ba', pale='#b8e6d2', white='#e7f7de', belly='#528c91', bone='#dbc79a', boneS='#8a7663', goldD='#775a42', goldM='#c4a16b';
  const X=-A+hurt,Y=B*.55;
  const Q=(c,...v)=>P(c,...v.map((n,i)=>n+(i%2?Y:X)));
  // Long forked tail emerging from behind the coils. Membranes with sharp ray supports.
  P(K,62,65,76,57,81,43,78,31,82,23,89,22,94,28,91,41,88,52,83,65,73,76,63,79);
  P(shade,64,65,77,58,83,43,80,31,83,25,88,24,92,28,89,41,86,52,81,64,72,74,64,76);
  P(teal,77,57,83,42,82,32,85,27,88,26,87,39,84,51,80,60);P(mid,83,37,85,28,88,27,86,37,84,42);
  P(K,80,35,68,25,62,12,65,8,75,14,81,23,83,15,92,5,95,5,94,17,89,28,85,36);
  P('#234c68',81,32,70,23,64,12,66,11,75,16,82,26,85,17,92,8,93,7,92,17,87,28,85,33);
  P(mid,82,30,72,20,66,12,76,18,82,27);P(jade,86,28,91,11,93,8,91,18,88,25);line(pale,1,85,30,88,22,91,12);
  // Rear coil, full oval, largely hidden by the raised chest and foreground coil.
  P(K,10,69,13,59,26,53,46,52,66,57,78,63,83,73,80,82,67,88,33,88,16,83,9,77);
  P(deep,12,69,15,61,27,55,46,54,65,59,76,65,81,73,78,80,66,86,34,86,17,81,11,76);
  P(shade,15,65,27,58,45,57,64,61,74,67,78,73,74,76,61,69,42,65,24,68,17,75);P(teal,20,64,29,60,45,60,55,63,40,63,26,66,18,69);P(mid,26,62,39,60,47,61,36,62,27,64);
  // Finned dorsal crest attached to the serpentine neck, not a crown pasted on top.
  for(const [x,y,tx,ty] of [[55,32,67,16],[58,40,75,24],[57,49,77,36],[53,58,68,49]]){P(K,x-4,y-4,tx-2,ty-2,tx+2,ty+1,x+8,y+4,x,y+7);P('#28536b',x-2,y-3,tx,ty,tx,ty+2,x+6,y+3,x,y+5);P(teal,x,y-1,tx-1,ty+3,x+3,y+3);line(jade,1,x,y,tx,ty);}
  // Neck sweeps right from the head before curling left into the body.
  Q(K,28,28,42,24,54,26,62,36,64,48,60,59,50,69,44,75,36,77,29,71,33,61,41,52,45,43,42,36,30,37);
  Q(shade,29,29,42,26,53,28,60,37,62,48,58,58,49,67,42,73,36,74,32,70,35,62,43,53,47,43,44,35,30,35);
  Q(teal,35,29,44,28,53,31,58,39,59,48,55,55,48,61,45,57,51,47,50,39,45,33,35,33);
  Q(mid,43,29,51,31,55,35,57,42,55,46,53,39,49,35,43,33);Q(jade,45,30,51,32,54,35,50,34,46,32);
  // Segmented ventral scales sweep down inside the S curve.
  Q(belly,30,34,40,33,45,38,47,44,44,53,36,64,34,71,39,75,45,71,43,67,50,57,54,47,53,39,48,33,39,31);
  for(const [x,y,w] of [[40,35,7],[45,40,8],[46,46,8],[43,52,9],[39,57,8],[35,62,8],[34,67,7],[35,72,6]]){Q(deep,x-1,y+3,x+w,y+1,x+w-1,y+3,x,y+5);Q(jade,x,y,x+w-2,y-1,x+w-1,y+1,x,y+2);}
  for(const [x,y] of [[53,37],[56,43],[56,49],[52,55],[48,61]]){Q(deep,x-3,y,x+3,y-2,x+4,y+2,x,y+5,x-4,y+3);Q(mid,x-2,y,x+2,y-1,x+1,y+1,x-2,y+2);}
  // Foreground coil wraps across the lower neck, with large curved facets and belly ridges.
  P(K,17,70,28,65,39,65,49,69,60,70,70,65,77,68,80,76,74,83,61,88,34,88,20,84,13,78);
  P(shade,18,71,28,67,39,67,49,71,60,72,70,67,75,70,78,76,72,81,61,86,34,86,21,82,15,78);
  P(teal,19,72,29,68,39,68,49,73,61,74,70,69,74,71,75,76,66,80,56,81,44,77,31,75,22,78,17,76);
  P(mid,22,72,30,69,38,69,44,72,38,73,29,72,23,74);P(mid,47,74,57,76,67,75,72,72,71,76,65,78,55,79);P(jade,29,69,37,69,40,70,31,71);P(jade,57,75,65,75,69,73,67,76,59,77);
  for(const [x,y] of [[22,77],[30,75],[38,76],[46,79],[55,82],[64,81],[72,77]]){P(deep,x-3,y,x+3,y-2,x+6,y+2,x+2,y+5,x-4,y+3);P(mid,x-2,y,x+2,y-1,x+3,y+1,x-1,y+2);}
  // Side fins: swept webbed fins on neck, asymmetric like a sea dragon.
  Q(K,48,38,66,30,75,29,70,36,72,41,65,42,66,47,56,47,49,43);Q('#326f85',50,38,67,32,73,31,68,36,70,40,64,40,64,45,56,45,51,42);Q(jade,51,38,66,33,69,33,61,37,53,40);Q(mid,54,41,65,37,68,38,61,41,64,43,57,44);Q(pale,52,39,61,35,67,33,63,36,54,40);
  // Large head: crocodilian snout, angular brow, open jaw, swept horns and cheek frill.
  Q(K,7,25,15,20,25,19,30,13,39,10,46,14,51,22,49,30,43,35,32,38,21,36,11,37,5,33,4,30);
  Q(teal,8,26,16,22,26,21,32,15,39,12,44,16,49,22,47,29,42,33,32,36,22,34,12,35,7,32,6,30);
  Q(mid,9,25,17,23,27,22,33,16,39,14,43,17,46,22,41,24,30,24,20,27,11,28);
  Q(jade,12,25,22,23,28,23,33,18,38,16,41,17,36,19,31,24,21,25,12,27);Q(pale,17,24,24,23,27,23,23,25,17,26);
  Q(deep,9,30,22,28,32,27,39,29,33,34,21,33,10,35,6,33);
  Q('#763f49',13,31,23,29,32,29,29,32,21,32,12,34);Q(belly,9,34,18,34,25,33,33,34,40,31,35,36,23,38,11,37,7,35);
  for(const [x,y] of [[10,29],[15,29],[20,28],[25,28],[29,28]])Q(white,x,y,x+3,y,x+1,y+4);for(const [x,y] of [[15,35],[23,34],[30,34]])Q(bone,x,y,x+1,y-3,x+3,y);
  Q(deep,9,26,13,25,15,26,12,28,9,28);Q(jade,9,25,13,24,14,25,11,26);
  Q(deep,27,22,33,18,41,19,44,23,38,26,30,26);Q('#ebbc70',30,22,34,20,40,21,39,23,33,24);Q('#fff8bf',32,21,35,21,35,22,32,23);Q(K,36,20,37,20,37,24,36,24);
  Q(shade,40,26,47,23,47,28,42,32,37,32);Q(jade,42,26,45,25,44,28,41,29);
  // Rear swept antler-like ivory horns rooted at the brow. Each has light and shadow planes.
  Q(K,30,17,31,10,28,4,32,2,39,8,41,14,37,19);Q(boneS,32,16,33,10,30,4,32,4,37,9,39,14,36,17);Q(bone,32,5,36,8,38,13,36,14,34,10);Q(white,32,5,35,8,34,9);
  Q(K,39,15,44,8,51,5,58,6,53,10,49,11,46,18,42,20);Q(boneS,41,15,45,9,51,7,55,7,51,9,47,11,45,17,42,18);Q(bone,43,14,46,9,51,7,52,8,47,10,45,15);Q(white,46,9,50,8,48,10,46,11);
  // Cheek spines and split barbels, biological details rather than generic metal decoration.
  Q(K,44,24,57,17,61,19,53,25,58,26,53,31,56,34,46,33,41,29);Q('#377e89',45,24,57,19,59,19,51,26,55,27,51,30,53,32,46,31,43,28);Q(pale,45,24,55,20,57,20,52,23,47,26);Q(jade,45,28,52,26,54,27,49,29);
  line(deep,2,13+X,35+Y,9+X,41+Y,5+X,43+Y);line(jade,1,13+X,35+Y,9+X,40+Y,5+X,42+Y);line(deep,2,20+X,37+Y,18+X,45+Y,12+X,49+Y);line(mid,1,20+X,37+Y,18+X,44+Y,12+X,48+Y);
  // Small overlapping scale clusters on the cheek, near coil, and fin ridge.
  Q(jade,38,27,42,26,43,28,39,30,37,29);Q(mid,35,31,39,30,40,32,36,33,34,32);
  for(const [x,y] of [[25,73],[34,73],[49,77],[58,78],[68,77]]){P('#245768',x-1,y+1,x+3,y,x+4,y+2,x+1,y+4,x-1,y+3);R(jade,x,y,2,1);}
  // A restrained ancient collar identifies the guardian without covering the anatomy.
  Q(K,43,42,50,40,58,43,60,46,55,50,47,49,42,46);Q(goldD,44,43,50,42,57,44,58,46,54,48,47,47,44,46);Q(goldM,45,43,50,42,55,44,52,45,47,45);Q(bone,47,43,50,43,52,44,48,44);gem(52+X,46+Y,3,4,teal,pale);
 }else if(id==='storm_roc'){
  // Independent storm eagle: broad spread asymmetric wings, real feather overlap and hooked talons.
  const dark='#17253f', navy='#233b58', blue='#3e6383', steel='#6f9bb1', sky='#a8c8d4', cream='#dbe7dd', white='#f5f6df', ochre='#b69059', umber='#76583f', sun='#ebc87c';
  const X=-A+hurt,Y=B*.65, flap=breath*2-atk;
  const Q=(c,...v)=>P(c,...v.map((n,i)=>n+(i%2?Y:X)));
  // Swept tail fans out from the rump, each feather narrows into a distinct point.
  const feather=(x,y,tx,ty,w,c,light,shadow=navy)=>{let dx=tx-x,dy=ty-y,len=Math.hypot(dx,dy),nx=-dy/len,ny=dx/len;const f=(a,b)=>[x+dx*a+nx*b,y+dy*a+ny*b];const poly=(col,...pts)=>P(col,...pts.flatMap(([a,b])=>f(a,b)));poly(K,[0,-w*.6],[.28,-w*.66],[.75,-w*.38],[1,0],[.72,w*.43],[.23,w*.58],[0,w*.4]);poly(c,[.04,-w*.42],[.28,-w*.47],[.75,-w*.23],[.94,0],[.71,w*.26],[.23,w*.37],[.05,w*.25]);poly(light,[.1,-w*.38],[.36,-w*.42],[.8,-w*.14],[.9,0],[.38,-w*.12],[.1,0]);poly(shadow,[.16,w*.12],[.64,w*.14],[.88,0],[.71,w*.24],[.24,w*.34]);};
  for(const [tx,ty,w] of [[88,81,10],[79,87,10],[67,87,9],[58,84,8]])feather(55,62,tx,ty,w,blue,steel);
  // Far wing rises toward upper left, partially concealed by the head and torso.
  P(K,42,48,32,43,21,29,13,12,11,5,16,5,25,13,33,17,41,25,49,39,49,49);
  P(navy,42,45,33,41,23,28,15,13,13,7,16,7,25,15,33,19,40,26,47,39,47,47);
  for(const [x,y,tx,ty,w] of [[41,41,14,7,9],[39,43,19,15,9],[39,45,24,22,9],[41,46,29,29,8],[43,46,35,35,8]])feather(x,y,tx,ty+flap,w,blue,steel,dark);
  // Main body and pale breast. Full chest rather than small bird with accessories.
  P(K,24,35,37,26,48,28,59,36,66,47,67,60,60,72,50,77,38,74,27,65,20,53,20,43);
  P(blue,26,36,37,28,47,30,57,37,64,48,65,60,58,70,49,75,39,72,29,64,22,53,22,43);
  P(steel,24,39,35,32,45,33,52,40,48,50,42,60,38,70,29,63,24,54,22,46);
  P(cream,25,39,35,34,43,35,48,40,45,49,39,56,34,64,28,58,24,50);P(white,27,40,34,36,40,36,44,39,40,42,32,43,26,46);
  P(navy,50,47,60,43,64,48,64,59,57,68,48,72,42,66,46,58);P(steel,47,58,53,55,57,59,52,65,47,67);
  // Feathered breast groups with clean dark separations and a few high contrast barbs.
  for(const [x,y] of [[26,47],[32,45],[38,44],[28,53],[34,51],[40,50],[30,59],[35,57],[39,63]]){P(steel,x-2,y,x+5,y-2,x+5,y+1,x+1,y+5,x-2,y+3);P(cream,x-1,y,x+4,y-2,x+2,y+1,x,y+2);}
  // Near wing, large primary fan, with the shoulder masking feather roots.
  P(K,43,52,43,37,50,25,63,16,75,11,89,3,94,4,93,11,88,21,92,21,89,29,82,36,86,37,81,45,72,51,73,55,62,62,51,63);
  P(navy,45,51,45,37,52,26,64,18,76,13,90,5,92,6,91,11,86,22,89,23,87,29,80,36,83,38,79,44,70,51,70,54,61,60,52,61);
  for(const [x,y,tx,ty,w] of [[54,41,92,6,10],[56,44,90,17,11],[58,46,89,26,11],[59,49,83,36,11],[57,53,78,45,10],[54,55,70,53,9]])feather(x,y,tx,ty+flap,w,blue,steel,dark);
  // Secondary flight feathers overlap the dark primaries with silver-blue tips.
  for(const [x,y,tx,ty,w] of [[48,40,71,19,9],[49,43,76,25,10],[50,47,77,32,10],[50,50,73,40,10],[51,53,66,47,9]])feather(x,y,tx,ty+flap*.5,w,steel,sky,blue);
  // Layered shoulder coverts, sculpted rather than parallel bars.
  P(K,44,40,50,29,59,24,67,23,68,28,63,36,57,43,49,49,44,48);P(blue,46,40,51,31,59,26,65,25,66,28,61,35,55,42,49,47,46,46);
  for(const [x,y,tx,ty] of [[49,37,60,27],[52,39,63,30],[51,43,61,35],[48,45,55,39]])feather(x,y,tx,ty,6,steel,cream,blue);
  // Feathered thighs and two talons, one foreshortened, both visibly curved.
  P(K,36,65,44,63,49,69,45,76,38,78,32,72);P(steel,37,66,43,65,46,69,43,74,38,76,34,72);P(cream,37,66,42,66,43,69,39,71,36,70);
  P(K,49,65,57,64,61,69,57,76,51,78,46,73);P(blue,50,66,56,66,59,69,55,74,51,76,48,73);
  for(const [x,y,j] of [[38,74,27],[53,74,43]]){line(K,3,x,y,x-2,80,j,82);line(umber,2,x,y,x-2,79,j,81);line(sun,1,x-1,y,x-3,79,j,80);for(const [dx,dy] of [[-8,-2],[-7,4],[0,5]]){line(K,2,j,82,j+dx,82+dy,j+dx-2,85+dy);line(ochre,1,j,81,j+dx,81+dy,j+dx-1,83+dy);R(white,j+dx-2,83+dy,2,1);}}
  // Distinct raptor head, slanted brow, hooked beak and long silver storm crest.
  Q(K,13,26,19,20,27,15,35,13,45,17,50,24,48,33,40,39,29,39,22,34,11,35,5,32,5,29);
  Q(steel,14,27,20,22,28,17,35,15,44,19,48,24,46,32,39,37,30,37,23,32,13,33,8,31,7,29);
  Q(cream,18,25,25,20,34,17,42,20,45,24,41,28,31,29,24,32,18,30);Q(white,21,24,29,19,35,18,40,20,35,21,29,23,23,26);
  Q(blue,31,29,41,25,46,25,44,32,38,36,31,35,27,32);Q(sky,32,30,39,28,42,28,39,31,33,32);
  Q(K,7,27,20,26,25,29,22,33,13,33,9,38,5,37,4,31);Q(ochre,8,28,20,28,23,29,21,31,13,31,9,36,7,35,6,31);Q(sun,8,28,17,28,20,29,13,30,8,31);Q(white,8,28,13,28,12,29,8,30);Q(umber,7,33,11,32,10,35,8,36);
  Q(K,25,25,32,21,40,22,41,25,35,28,27,28);Q('#fff0a0',27,25,33,23,38,24,35,26,28,26);Q(K,33,23,34,23,34,27,33,27);Q(white,28,24,31,24,31,25,28,25);
  // Crest made of three long feathers flowing rearward, not a miniature crown.
  for(const [x,y,tx,ty,w] of [[32,17,45,3,8],[36,17,55,6,8],[39,19,59,13,8]])feather(x+X,y+Y,tx+X,ty+Y,w,steel,white,blue);
  Q(cream,28,20,34,16,40,17,37,20,32,22);Q(white,29,19,34,17,36,18,32,19);
  // Stormlight caught only at the upper flight feather tips; narrow, irregular accents.
  P('#c6ebed',84,12+flap,92,6+flap,90,11+flap,86,14+flap);P('#9bcad8',85,22+flap,90,17+flap,88,22+flap,83,25+flap);P('#b8dce1',83,30+flap,88,26+flap,86,30+flap,81,33+flap);
  P('#dbe7dd',68,24+flap*.5,73,20+flap*.5,71,24+flap*.5,67,27+flap*.5);P('#dbe7dd',70,32+flap*.5,76,26+flap*.5,74,31+flap*.5,69,34+flap*.5);
  // A single ancient storm sigil in the shoulder and gold ankle bands; no blanket gold plating.
  P(K,48,39,55,34,62,36,64,41,58,48,51,47,47,43);P(umber,49,40,55,36,61,37,62,41,58,46,52,45,49,43);P(ochre,50,39,55,36,60,38,57,40,52,42,50,43);P(sun,51,39,55,37,58,38,54,40,51,41);gem(56,41,3,4,'#75b8d2',white);
  for(const [x,y] of [[36,77],[51,77]]){P(K,x-4,y-2,x+3,y-3,x+4,y+2,x-4,y+3);P(ochre,x-3,y-1,x+2,y-2,x+3,y+1,x-3,y+2);R(sun,x-2,y-1,3,1);}
 }else
 if(id==='abyss_crawler'){
  // Six jointed legs, two pincers, articulated shell with a serrated dorsal ridge.
  for(const [x,y,j,k] of [[42,57,62,83],[53,55,75,81],[65,52,86,76]]){limb(3,s,m,x,y,x+10,62,j,k);P(K,j-5,k,j+3,k-3,j+6,k+1,j+2,k+3,j-6,k+3);}
  limb(5,s,l,49,49,24,36,16,41);P(K,8,27,20,24,30,31,29,44,21,52,10,48,6,40,11,35,16,39,20,34,16,32,9,34);P(m,10,29,19,27,27,32,26,43,20,49,12,46,9,40,12,38,16,42,23,34,17,29,11,31);P(l,12,29,19,28,24,32,21,34,17,31);line(h,1,12,29,17,29);
  P(K,29,36,39,24,55,19,71,21,84,30,90,43,84,57,73,64,47,66,33,60,27,48);P(s,31,37,41,26,55,21,70,23,82,32,87,43,82,55,72,62,47,63,35,58,30,48);P(m,36,34,49,24,62,25,73,31,79,40,69,48,51,48,38,44);P(l,40,33,49,26,60,27,55,32,43,38);P(h,44,30,51,27,55,28,50,30);
  for(const [x,y,w,hh] of [[58,25,10,12],[70,30,10,13],[80,38,6,11],[46,43,11,12],[59,47,12,12],[73,48,9,10]])scaleFacet(x,y,w,hh);
  for(const [x,y,w] of [[42,26,5],[55,21,6],[69,23,5],[80,30,4]]){P(K,x-4,y+3,x,y-13,x+w,y-5,x+w,y+5);P(t,x-2,y+1,x,y-10,x+w-2,y-4,x+w-1,y+3);P(h,x,y-8,x+1,y-1,x-1,y+1);}
  for(const [x,y,j,k] of [[44,58,36,85],[57,61,57,87],[73,59,78,84]]){limb(4,m,l,x,y,x-2,71,j,k);P(K,j-6,k-2,j+3,k-3,j+5,k+2,j-7,k+2);R(l,j-4,k-1,7,2);}
  const X=-A;limb(6,s,l,39,51,25+X,56,17+X,53);
  P(K,20+X,47,10+X,44,6+X,32,12+X,22,23+X,23,30+X,31,25+X,39,18+X,34,15+X,29,12+X,34,16+X,40,26+X,42,33+X,49,28+X,59,17+X,63,8+X,57,4+X,48,9+X,43,15+X,50);P(m,20+X,49,11+X,46,8+X,33,13+X,24,22+X,25,27+X,31,24+X,36,19+X,31,15+X,26,10+X,34,15+X,42,25+X,44,30+X,49,26+X,57,17+X,60,10+X,55,7+X,49,10+X,46,16+X,53);P(l,10+X,33,13+X,25,20+X,26,23+X,30,16+X,28,12+X,34);P(l,16+X,51,24+X,46,29+X,50,23+X,55,17+X,56);line(h,1,18+X,51,24+X,48);
  // Bioluminescent armored carapace: broad facets, articulated gills, sharpened pincer edges.
  for(const [x,y,w,hg] of [[45,29,13,15],[59,25,13,17],[72,31,12,16],[48,45,13,13],[63,46,14,14],[77,43,8,12]])plate(x,y,w,hg,M,l);
  P(L,43,31,48,27,53,26,50,29,45,33);P(h,58,25,62,25,59,28,55,30);
  for(const [x,y] of [[54,57],[65,58],[76,54]]){P(S,x-3,y,x+6,y-1,x+3,y+4,x-4,y+4);R(t,x,y,3,2);}
  for(const [x,y] of [[42,70],[56,72],[75,70]]){P(S,x-4,y,x+4,y-3,x+5,y+1,x-3,y+4);R(L,x-2,y-1,4,2);}
  P(M,10+X,34,13+X,28,18+X,29,22+X,34,18+X,33,14+X,31,12+X,36);P(L,10+X,32,13+X,27,18+X,27,15+X,30);P(L,10+X,54,16+X,57,25+X,51,22+X,55,16+X,59);P(ivory,23+X,36,26+X,35,24+X,39);P(ivory,24+X,47,28+X,48,25+X,50);
  P(K,31,35,40,34,49,42,47,50,36,51,28,45);P(m,32,37,39,36,46,42,44,47,35,48,30,44);R(K,31,40,12,5);R(e,32,40,5,3);R(h,33,40,2,1);R(t,36,48,6,1);P(L,31,38,39,36,43,38,36,39);R(K,35,41,2,2);R(ivory,32,40,2,1);P(s,35,46,43,45,39,49,34,49);
 }else if(id==='hydra_serpent'||id==='leviathan_tide'){
  const boss=id==='leviathan_tide', X=-A+hurt,Y=B;
  // Coiling body: three depth-separated loops and a continuous muscular neck.
  limb(boss?8:6,s,m,59,75,75,71,81,58,77,44,84,30,89,19);
  P(K,76,43,81,25,91,13,90,29,86,40,89,47);P(t,79,40,83,26,89,17,87,31,84,39,86,44);line(h,1,82,35,86,24);
  limb(9,s,m,49,77,34,77,24,70,28,61,43,58,63,62,76,72,72,80,48,84,23,81,14,74,17,69);
  limb(7,m,l,68,77,56,70,44,68,36,72,40,79,60,81,78,76);line(h,1,43,70,55,71,65,75);
  // Neck arches forward; ventral plates trace the curve rather than a straight stripe.
  P(K,36,77,28,67,32,54,43,43,49,33,47+X,24+Y,39+X,20+Y,34+X,10+Y,43+X,8+Y,57+X,16+Y,64+X,30+Y,60,46,50,59,48,68,56,78,52,85,40,85);
  P(s,38,77,30,67,34,54,45,44,51,33,49+X,23+Y,41+X,19+Y,37+X,11+Y,43+X,10+Y,55+X,17+Y,62+X,30+Y,58,45,48,58,46,68,53,78,50,82,41,82);
  P(m,40,73,34,66,38,56,48,45,55,34,53+X,22+Y,46+X,16+Y,48+X,13+Y,55+X,19+Y,60+X,31+Y,55,44,45,56,42,67,47,77);P(l,39,71,36,64,41,55,50,45,53,37,53,44,43,58,40,66,43,73);line(h,1,39,64,42,56,49,48);
  for(const [x,y] of [[39,75],[35,67],[38,59],[44,51],[51,43],[55,35]]){line(s,1,x-2,y,x+5,y+2);R(l,x,y-2,4,1);}
  for(const [x,y,w,hh] of [[58,32,4,6],[54,43,5,6],[49,51,4,6],[46,59,5,6],[48,72,5,5],[60,78,6,4],[70,77,5,4],[30,76,5,4]])scaleFacet(x,y,w,hh);
  // Distinct frill and long predatory head; opened jaw with teeth.
  for(const [x,y,xx,yy] of [[49,22,65,7],[53,29,72,15],[56,37,74,30]]){P(K,x,y,xx,yy,xx-2,yy+12,x+5,y+7);P(t,x+2,y,xx-2,yy+3,xx-4,yy+11,x+5,y+4);line(l,1,x+3,y,xx-4,yy+7);}
  const Q=(c,...v)=>P(c,...v.map((n,i)=>n+(i%2?Y:X)));
  Q(K,12,24,17,17,31,14,37,9,49,11,56,19,54,30,46,37,36,36,30,29,16,30,7,27);Q(m,13,24,19,19,31,16,38,11,48,13,54,19,52,29,45,34,37,34,31,27,17,28,10,26);Q(l,15,22,22,18,31,18,39,13,46,14,49,18,38,21,29,23,17,24);Q(h,18,21,29,19,36,18,30,21,20,23);Q(s,29,25,38,22,49,22,48,30,40,33,34,29);
  Q(K,9,28,27,28,37,31,46,30,43,39,34,41,21,37,9,33);Q(l,12,32,25,33,35,36,42,33,40,37,34,39,22,35,13,34);Q(D,10,28,29,27,36,31,30,33,13,31);
  for(let i=0;i<4;i++)Q(ivory,14+i*5,28,17+i*5,28,16+i*5,31);Q(K,32,19,44,18,45,23,36,25,30,23);Q(e,34,20,42,19,40,22,34,23);Q(K,38,19,40,19,39,22,37,22);Q(s,12,24,18,23,18,25,12,26);
  // Distinct dorsal scales follow the body curvature; pale throat is ribbed, not flat.
  for(const [x,y,w,hg] of [[52,39,6,7],[48,47,7,7],[44,55,6,7],[42,63,6,7],[49,74,8,7],[59,77,8,5],[69,74,7,5],[75,62,7,6],[76,53,6,7],[80,44,5,6]]){P(S,x,y,x+w,y-2,x+w-1,y+hg-2,x+w/2,y+hg,x-1,y+hg-2);P(M,x+1,y+1,x+w-1,y-1,x+w-3,y+hg-2,x+1,y+hg-2);R(L,x+1,y,Math.max(2,w-4),2);}
  for(const [x,y] of [[39,60],[36,67],[38,73]]){P(L,x-1,y,x+5,y-1,x+4,y+3,x,y+4);}
  Q(M,17,22,28,19,36,18,33,21,23,23);Q(L,17,22,24,20,29,20,25,22);Q(K,12,24,17,23,18,25,13,26);Q(h,12,23,15,22,17,23,14,24);
  Q(S,34,26,45,24,48,27,45,33,39,34);Q(t,43,24,45,25,43,29,40,30);Q(L,42,25,44,25,42,28);Q(ivory,22,35,24,32,26,35);Q(ivory,29,37,31,34,33,37);
  if(boss){ // Royal sea dragon: a second coil, long ornamental fins and three pointed horns.
   for(const [x,y] of [[47,42],[54,52],[45,62],[57,70],[68,74],[77,65]]){P(K,x,y,x+10,y-12,x+14,y-8,x+9,y+3);P(t,x+2,y,x+10,y-9,x+11,y-7,x+7,y+1);line(h,1,x+5,y-2,x+10,y-8);}
   Q(K,29,16,24,5,29,7,36,14,39,2,44,5,44,14,55,5,57,10,51,20);Q(gold,30,14,27,7,35,16,39,5,42,7,42,17,54,8,50,17,45,20,35,18);Q(ivory,39,6,40,12,37,16);gem(47+X,26+Y,3,4,t,h);
   for(const [x,y] of [[24,78],[32,82],[43,84],[55,83],[65,81]]){line(gold,1,x,y,x+4,y-2);}
   line(t,1,24+X,30+Y,12+X,42+Y,5+X,44+Y);line(t,1,26+X,31+Y,17+X,46+Y,10+X,49+Y);
   // Ancient sea monarch: ivory horn crown, raised cheek frills and articulated royal collar.
   Q(K,36,14,31,6,32,1,37,5,41,12,48,5,57,2,55,8,47,16,42,20);Q(bronze,36,13,33,6,33,3,36,7,40,15,48,8,55,4,52,9,45,16,42,18);Q(ivory,33,4,36,8,38,13,36,12,34,8);Q(gold,43,15,49,8,54,5,51,10,46,15);Q(ivory,47,9,52,6,50,9,47,12);
   Q(K,45,27,55,19,67,17,61,24,65,30,53,36,46,35);Q(t,47,27,56,21,64,19,59,24,62,30,53,34,48,34);Q(L,48,27,56,22,60,21,55,27,50,29);Q(S,50,32,57,28,61,29,53,34);
   for(const [x,y] of [[53,45],[48,54],[42,64]]){P(K,x-8,y-5,x+5,y-7,x+9,y-1,x+3,y+5,x-8,y+3);P(bronze,x-6,y-4,x+4,y-5,x+6,y-1,x+2,y+3,x-6,y+1);P(gold,x-6,y-4,x+4,y-5,x+3,y-2,x-4,y);R(ivory,x-4,y-3,4,1);}
   gem(52,47,4,5,t,h);P(L,59,70,66,66,73,68,69,71,63,72);P(gold,21,79,27,77,34,79,30,81,23,81);

  }
 }else if(id==='magma_tortoise'){
  // Broad quadruped with dark obsidian shell plates divided by molten fissures.
  for(const [x,y,j] of [[32,63,29],[64,62,66]]){limb(7,s,m,x,y,j,79);P(K,j-10,78,j+7,78,j+10,85,j-12,85);R(l,j-8,80,14,2);}
  P(K,21,54,25,38,37,22,50,16,62,19,74,27,84,42,89,58,80,69,57,75,33,71,18,63);P(t,23,54,27,39,38,24,50,18,61,21,73,29,82,43,86,57,78,67,57,72,34,68,21,62);
  const plates=[[[25,45,35,31,46,33,43,49,31,57],[29,44,36,34,43,35,40,47,32,53]],[[39,26,49,19,59,23,56,34,47,39],[42,27,49,22,56,25,54,32,48,35]],[[49,40,60,26,72,32,75,44,65,53,52,49],[52,40,61,30,70,34,71,43,64,49,55,46]],[[33,59,45,51,56,53,59,65,48,70,35,66],[36,59,45,54,53,56,55,63,48,67,38,64]],[[64,57,76,46,83,53,80,64,68,70,62,65],[67,57,76,50,80,54,77,62,69,66,65,64]]];
  for(const [v,z] of plates){P(K,...v);P(s,...z);let [x,y]=z;P(m,x,y,x+6,y-4,x+10,y-3,x+7,y+4,x+1,y+5);line(l,1,x+1,y,x+6,y-3);}
  line(e,1,46,38,45,49,57,51,62,57);line(e,1,59,24,58,34,63,36);line(e,1,26,58,33,58,40,53);R('#ffb244',61,55,2,3);
  // Irregular volcanic spines and neck, visible near-side legs.
  for(const [x,y,w] of [[39,29,5],[51,19,7],[69,32,5]]){P(K,x-5,y+6,x-1,y-11,x+w,y-3,x+w+1,y+6);P(m,x-3,y+4,x-1,y-8,x+w-2,y-2,x+w-1,y+3);line(t,1,x-1,y-6,x+1,y+2);}
  for(const [x,y,j] of [[39,65,37],[72,64,75]]){limb(7,m,l,x,y,j-2,76,j,82);P(K,j-10,79,j+7,79,j+10,86,j-12,86);P(m,j-8,80,j+5,80,j+7,84,j-10,84);for(let i=0;i<3;i++)R(ivory,j-9+i*5,83,3,2);}
  // Jagged volcanic stone facets with cooled dark faces and restrained orange fissures.
  for(const [x,y,w,hg] of [[32,36,12,14],[45,23,12,13],[55,35,17,14],[37,55,17,12],[67,52,13,13]]){P(S,x,y+3,x+w*.4,y,x+w,y+4,x+w-3,y+hg-2,x+3,y+hg);P(M,x+1,y+3,x+w*.4,y+1,x+w-3,y+4,x+w*.5,y+6,x+3,y+6);P(s,x+3,y+8,x+w-3,y+6,x+w-4,y+hg-2,x+4,y+hg-1);R(l,x+3,y+2,Math.max(3,Math.floor(w/3)),2);}
  P('#f7aa4e',47,38,45,49,54,51,55,53,45,52,43,48);R('#fff1b1',45,44,2,5);P('#ff7a35',75,43,81,45,84,54,81,53,79,47);P(M,26,63,36,67,49,69,56,69,54,72,37,71,26,67);P(l,29,65,38,68,44,68,39,70,30,68);
  for(const [x,y] of [[33,72],[71,71]]){plate(x,y,10,9,m,l);P(S,x+1,y+8,x+9,y+8,x+10,y+11,x,y+11);}
  const X=-A;P(K,7+X,56+B,15+X,49+B,26,48,36,56,37,67,24,72,13+X,70+B,5+X,65+B);P(m,9+X,57+B,16+X,51+B,26,50,34,57,34,65,23,69,14+X,68+B,7+X,64+B);P(l,11+X,56+B,19+X,53+B,25,54,23,59,12+X,61+B);R(K,8+X,59+B,11,5);R(e,10+X,59+B,5,2);R(s,7+X,64+B,11,2);R(t,29,58,3,5);P(S,17+X,52+B,24+X,50+B,29,54,25,58,18+X,58+B);P(L,12+X,56+B,18+X,53+B,22+X,53+B,19+X,56+B);R(K,13+X,59+B,2,2);R(ivory,10+X,59+B,2,1);P(S,14+X,65+B,24,64,22,68,15+X,68+B);
 }else if(id==='cinder_drake'){
  // Four-limbed drake with folded far wing and long swept near wing.
  limb(4,s,m,67,67,80,61,85,46,80,35);P(K,78,38,77,25,87,17,90,30,85,40);P(t,80,36,79,28,86,21,88,30,83,36);
  P(K,42,41,50,23,70,13,86,7,80,26,81,42,65,38,56,52);P(s,45,41,52,25,70,16,82,11,77,27,78,38,65,34,57,49);P(m,52,39,57,25,78,14,69,29,62,34,57,45);line(l,1,56,42,65,26,78,14);
  limb(5,s,m,48,62,43,75,39,84);limb(6,s,m,65,65,69,77,65,85);R(K,32,82,11,5);R(K,59,82,12,5);
  P(K,22,38,32,27,45,31,54,42,68,47,76,59,72,70,59,77,43,70,36,61,25,61,18,53);P(m,24,39,33,29,44,33,52,44,67,49,74,59,70,68,59,74,44,68,38,59,26,59,20,52);P(l,26,40,33,32,41,34,48,43,44,48,33,47,24,51);P(s,48,52,63,49,70,58,64,65,50,63);P(t,29,52,36,48,40,52,44,59,47,66,43,66,37,60,30,58);
  for(const [x,y,w,hh] of [[47,48,6,6],[55,47,6,6],[63,51,6,6],[56,61,6,6],[43,57,5,5]])scaleFacet(x,y,w,hh);
  // Wing membrane with visible finger bones and torn trailing edge.
  P(K,44,48,38,30,43,16,59,8,80,3,85,9,77,22,75,36,67,30,61,44,54,40,49,53);P(s,46,46,40,30,45,18,60,10,80,5,82,9,75,22,73,33,66,27,60,41,54,37,49,50);P(m,43,30,48,19,61,12,77,8,62,23,51,37);P('#a34d3d',52,37,62,25,76,13,68,26,61,38,55,35);P(t,46,35,42,29,46,19,60,11,79,6,76,9,61,15,50,24);line(l,1,47,42,49,31,61,18,77,10);line(l,1,53,38,61,29,68,27);
  limb(5,m,l,36,58,30-A,69,27-A,82);P(K,17-A,81,29-A,79,35-A,85,17-A,87);R(l,19-A,82,9,2);for(let i=0;i<3;i++)R(ivory,18-A+i*4,84,2,2);
  limb(6,m,l,60,68,55,78,50,84);P(K,42,82,53,80,58,86,41,87);R(l,44,82,9,2);R(ivory,42,85,4,1);
  // Wing fingers cast thin shadows across warm membranes; overlapping muscle clusters remain visible.
  P('#6d2b34',49,25,64,13,77,8,70,17,61,23,55,32);P('#d76f42',50,24,64,14,73,10,67,17,59,23,55,28);P('#f4a55c',53,20,63,14,70,12,65,16,57,20);
  P('#6a2934',51,38,59,30,68,24,72,23,68,29,61,36,56,41);P('#bb503a',55,35,63,28,68,25,64,31,59,36);ridge('#f8bb6a',48,37,78,10,1);ridge('#d98850',55,41,71,29,1);
  for(const [x,y,w,hg] of [[28,44,8,7],[33,49,8,7],[42,58,7,7],[52,65,9,7],[61,58,9,7],[66,62,6,6]]){P(S,x,y,x+w,y-2,x+w-1,y+hg,x+2,y+hg);P(M,x+1,y,x+w-1,y-1,x+w-4,y+3,x+1,y+4);R(L,x+1,y,3,2);}
  P('#ffc06f',31,52,36,51,39,55,35,58,31,56);P('#d98c52',35,60,39,58,42,63,39,66,36,64);P(L,30-A,68,34-A,65,34-A,71,30-A,76,28-A,75);P(M,52,74,56,70,59,72,55,78,52,81);P(S,69,63,76,59,77,65,72,69);R(l,70,63,4,2);
  let X=-A,Y=B;const Q=(c,...v)=>P(c,...v.map((n,i)=>n+(i%2?Y:X)));Q(K,8,28,16,22,25,20,28,10,34,14,36,21,43,28,42,38,36,43,25,41,17,35,6,35,4,31);Q(m,9,29,17,24,26,22,30,13,33,16,34,23,41,28,40,36,35,40,26,39,18,33,8,33,6,31);Q(l,11,28,20,24,27,24,31,18,35,25,28,28,17,30);Q(t,29,18,30,10,34,15,35,21);Q(ivory,30,13,32,16,31,18);Q(K,22,26,33,24,34,28,27,31,22,29);Q(e,24,26,31,25,29,28,24,29);Q(s,7,32,19,31,26,34,21,36,9,35);Q(ivory,12,33,15,33,14,35);Q(ivory,18,33,21,33,20,35);Q(K,29,16,32,5,37,8,39,18,43,21,39,24,33,21);Q(bronze,31,16,33,8,36,10,37,18,40,21,37,21);Q(ivory,33,8,35,10,36,16,33,13);Q(M,14,27,24,23,29,24,25,26,18,28);Q(L,14,27,20,25,24,25,21,27);Q(K,10,30,14,29,16,30,13,32,10,31);Q(S,29,33,38,29,40,34,35,39,29,38);Q(t,33,32,37,31,35,34,32,35);Q(ivory,23,35,26,34,25,37);
 }else if(id==='gale_harpy'||id==='storm_roc'){
  const boss=id==='storm_roc', X=-A,Y=B, F=breath*2;
  // Bird of prey: tail feathers, layered far wing, body, near wing, talons.
  for(let i=0;i<4;i++){let a=62+i*4;P(K,47,61,a,65+i*2,a+7,80-i*2,a-4,82-i*2,49,71);P(s,49,62,a,67+i*2,a+4,78-i*2,a-4,80-i*2,51,70);line(l,1,53,68,a,76-i*2);}
  const feather=(x,y,tx,ty,w,col=m,hi=l)=>{P(K,x-3,y-2,x+w,y-5,tx+3,ty-2,tx+3,ty+3,x+w-4,y+7,x-4,y+5);P(col,x-1,y,x+w-1,y-3,tx+1,ty,tx,ty+2,x+w-5,y+5,x-2,y+3);line(hi,1,x+2,y,tx,ty);};
  P(K,48,46,45,28-F,54,14-F,73,9-F,86,3-F,88,9-F,81,24-F,71,36,62,48);P(s,50,44,47,29-F,56,16-F,74,11-F,85,6-F,85,11-F,78,23-F,69,34,61,45);
  for(let i=0;i<5;i++)feather(55+i*3,32+i*2,84-i*2,7+i*6-F,7,s,m);
  // Muscular chest, layered breast feathers and hooked beak.
  P(K,22,39,35,31,49,36,63,45,67,57,60,71,48,76,35,71,24,57,19,48);P(m,24,40,36,33,48,38,61,46,64,57,58,69,48,73,36,69,26,56,21,48);P(l,24,43,34,37,43,39,48,47,42,57,33,62,26,55);P(h,26,43,34,39,40,41,35,44,28,46);P(s,49,51,61,48,62,57,55,67,47,69,44,61);
  for(const [x,y] of [[31,46],[36,50],[32,55],[40,58],[48,65]]){P(m,x-2,y,x+6,y-2,x+3,y+4,x,y+6);R(l,x,y,3,1);}
  // Near wing built from distinct primaries and coverts rather than two broad slabs.
  P(K,42,51,47,32,59,22-F,76,18-F,92,7-F,91,17-F,85,28-F,89,31-F,78,41,79,47,65,58,52,62);P(s,44,50,49,33,61,24-F,77,20-F,89,10-F,89,17-F,82,29-F,86,32-F,76,40,76,46,64,56,52,59);
  for(let i=0;i<7;i++)feather(48+i*3,46+i,89-i*2,12+i*6-F,8,i%2?m:s,i%2?h:l);
  for(let i=0;i<5;i++)feather(45+i*4,41+i*2,67+i*3,25+i*4-F,8,m,l);
  P(l,45,43,51,33,59,29,68,27-F,62,34,54,42,48,49);P(h,49,38,56,32,61,30,56,35);line(h,1,51,40,57,35);
  // Individual feather barbs and layered coverts, with a brighter pale breast.
  for(const [x,y,tx,ty] of [[49,46,66,32],[54,48,75,28],[60,50,82,30],[63,54,83,36],[65,57,78,43]]){P(S,x-1,y-2,tx+2,ty-2,tx+2,ty+2,x+3,y+5,x,y+5);P(M,x,y,tx,ty,tx,ty+2,x+3,y+3);ridge(L,x+1,y+1,tx-1,ty+1,1);}
  for(const [x,y,tx,ty] of [[58,29,85,10],[64,32,87,17],[69,35,84,24],[73,41,86,30]]){P(l,x,y,tx,ty,tx-2,ty+4,x+4,y+3);P(h,x+2,y,tx-2,ty+1,tx-4,ty+3,x+4,y+1);}
  for(const [x,y] of [[28,44],[32,49],[29,55],[35,57],[38,63]]){P(L,x,y,x+6,y-2,x+6,y+1,x+2,y+5,x-1,y+3);P(M,x+2,y+3,x+6,y+1,x+4,y+5,x+1,y+6);}
  const Q=(c,...v)=>P(c,...v.map((n,i)=>n+(i%2?Y:X)));
  Q(K,10,28,17,22,26,17,36,17,43,23,44,34,38,40,26,40,20,35,11,35,5,31);Q(m,12,28,18,24,27,19,35,19,41,24,42,33,37,38,27,38,21,33,12,33,8,31);Q(l,17,26,27,21,35,21,39,25,34,29,23,29);Q(h,23,24,30,21,35,22,31,24);Q(K,9,29,22,28,26,31,21,35,12,34,7,38,5,34);Q(gold,9,30,21,30,23,31,20,33,11,32,8,35,7,34);Q(ivory,10,30,17,30,15,31,10,32);Q(K,22,25,32,23,35,26,30,29,23,29);Q(e,24,25,31,24,30,27,24,27);Q(K,28,24,29,24,29,27,27,27);Q(S,24,30,33,28,40,29,38,34,32,37,26,35);Q(L,18,26,24,22,33,20,37,23,31,23,25,25,22,28);Q(K,23,26,34,24,35,26,30,29,23,28);Q(e,25,26,31,25,30,27,25,28);Q(K,29,25,30,25,30,27,28,27);Q(ivory,10,31,18,30,20,31,16,33,11,33);Q(gold,8,34,11,33,11,36,7,39,6,37);
  for(const [x,y,j] of [[39,69,30],[50,70,44]]){limb(2,bronze,gold,x,y,x-2,77,j,81);line(K,2,j,81,j-7,82,j-10,79);line(gold,1,j,80,j-7,81,j-9,79);line(K,2,j,82,j-3,87,j-7,86);line(gold,1,j,82,j-3,86,j-6,85);}
  if(boss){ // Crowned roc: long storm plumes and gold-inlaid shoulder armor.
   for(let i=0;i<4;i++){let x=61+i*7,y=22+i*5;P(K,x-5,y+1,x+7,y-9,x+11,y-6,x+3,y+8);P(bronze,x-3,y+1,x+7,y-7,x+8,y-5,x+2,y+6);line(gold,1,x,y,x+7,y-6);}
   Q(K,22,19,19,8,26,12,30,5,34,12,42,7,40,19,36,23,27,23);Q(gold,23,18,21,11,26,15,30,8,33,15,39,10,38,18,35,21,27,21);Q(ivory,29,10,30,9,31,15,28,15);gem(30+X,19+Y,3,3,t,h);
   P(K,27,39,36,36,46,43,44,54,35,61,25,51);P(bronze,29,40,36,38,43,44,42,53,35,58,27,51);P(gold,29,41,36,39,40,44,36,47,30,46);gem(35,49,4,6,t,h);
   // Royal storm-feather mantle and ceremonial breastplate, distinct from the ordinary harpy.
   Q(K,35,27,42,24,49,28,47,39,40,45,31,43,25,37);Q(m,36,28,42,26,47,29,45,38,40,43,32,41,28,37);Q(l,30,34,37,30,44,29,43,34,39,39,34,39);Q(h,32,34,38,31,42,31,40,34,34,36);Q(S,35,39,42,36,45,35,42,40,38,42);
   for(const [x,y,tx,ty] of [[54,65,82,81],[58,66,90,80],[62,64,90,74]]){P(K,x-3,y-2,x+2,y-3,tx+2,ty-2,tx+2,ty+2,tx-2,ty+5,x-2,y+5);P(m,x-1,y,tx,ty,tx,ty+3,x-1,y+3);P(l,x,y,tx-1,ty,tx-4,ty+1,x,y+1);}
   Q(K,29,18,37,7,46,4,45,10,40,15,45,17,40,23,35,22);Q(s,31,18,38,9,44,6,42,11,37,16,42,18,39,21,35,20);Q(L,34,16,39,10,43,7,41,11,37,15);Q(gold,22,18,26,16,30,18,34,16,37,19,35,22,27,22);Q(ivory,26,17,29,19,31,18,30,20,27,20);
   for(const [x,y,tx,ty] of [[53,33,75,17],[60,37,88,13],[66,44,88,25]]){P(K,x-3,y,tx,ty-2,tx+2,ty+2,x+5,y+7);P(bronze,x-1,y+1,tx,ty,tx,ty+2,x+4,y+5);P(gold,x,y+1,tx-1,ty+1,tx-3,ty+3,x+3,y+3);ridge('#e7c68a',x+2,y+2,tx-7,ty+4,1);P('#f5dfb2',tx-8,ty+5,tx-3,ty+1,tx-1,ty+2,tx-5,ty+6);}
   P(K,31,57,40,53,45,59,41,66,34,69,29,64);P(bronze,32,58,40,55,43,59,40,64,34,67,31,64);P(gold,33,58,39,56,40,58,35,61);R(ivory,33,58,3,1);gem(36,61,3,3,t,h);
   for(let i=0;i<3;i++){P(K,52+i*7,68,76+i*5,85-i*3,68+i*4,87,48+i*6,72);P(m,53+i*7,70,73+i*5,84-i*3,68+i*4,85,51+i*6,72);line(gold,1,55+i*7,71,70+i*4,83-i*3);}
  }
 }else if(id==='cloud_elemental'||id==='spark_wraith'){
  const electric=id==='spark_wraith', X=-A,Y=B;
  // Elemental torso with a hooded spectral head, articulated vapor/energy arms,
  // tapering lower body and controlled dark/light masses, no floating face icon.
  const q=(c,...v)=>P(c,...v.map((n,i)=>n+(i%2?Y:0)));
  if(!electric){
   // Cloud lobes interlock in depth; angular shadow undersides imply storm clouds.
   for(const [x,y,rad] of [[64,31,13],[73,43,13],[70,57,13],[60,68,12],[72,72,8]]){disk(K,x,y+Y,rad+2);disk(s,x,y+Y,rad);disk(m,x-2,y-3+Y,rad-3);disk(l,x-4,y-5+Y,rad-6);}
  }else{
   for(const [x,y,xx,yy] of [[65,30,81,9],[68,44,90,27],[67,59,86,56]]){q(K,x-6,y,x+2,y-13,xx,yy,xx-7,yy+16,xx+2,yy+20,x+3,y+8);q(s,x-4,y,x+3,y-10,xx-3,yy+4,xx-9,yy+16,xx-1,yy+19,x+2,y+5);line(t,1,x,y+Y,xx-7,yy+10+Y,xx-2,yy+5+Y);}
  }
  q(K,25,34,34,26,50,25,62,35,68,48,60,63,65,72,51,85,32,88,38,76,24,71,17,60,18,46);q(s,27,35,35,28,49,27,60,36,65,48,57,63,62,71,49,82,36,85,41,75,26,69,19,59,20,47);q(m,28,37,37,30,47,30,56,38,57,48,49,57,44,67,34,70,25,61,23,48);q(l,30,38,37,32,45,33,49,39,43,46,31,46,26,43);q(h,32,37,37,34,43,35,39,38);q(m,52,55,58,50,60,57,54,66,55,73,47,78,42,79,46,68);q(l,47,59,51,55,54,57,50,64,47,64);
  // Forward arm and fingers with cloud curls or charged claw tips.
  limb(6,s,m,31,44+Y,23-A,51+Y,12-A,48+Y);P(K,13-A,41+Y,20-A,44+Y,18-A,51+Y,13-A,56+Y,5-A,54+Y,3-A,47+Y,7-A,44+Y);P(m,12-A,43+Y,18-A,45+Y,16-A,50+Y,12-A,54+Y,7-A,52+Y,5-A,47+Y,8-A,46+Y);line(l,1,8-A,47+Y,13-A,45+Y,16-A,46+Y);
  limb(5,s,l,58,44+Y,69,51+Y,77,46+Y);P(K,74,40+Y,83,40+Y,88,46+Y,83,53+Y,75,51+Y);P(m,76,42+Y,82,42+Y,85,46+Y,82,50+Y,77,49+Y);R(l,79,43+Y,4,2);
  const Q=(c,...v)=>P(c,...v.map((n,i)=>n+(i%2?Y:X)));Q(K,19,30,18,18,26,9,38,7,50,13,56,23,52,34,42,42,28,40);Q(s,21,29,20,19,27,11,38,9,48,15,54,23,50,32,41,39,29,38);Q(m,22,20,28,12,37,11,46,16,50,22,41,23,34,19,25,24);Q(l,27,14,35,12,43,15,38,16,31,16);Q(D,22,25,31,20,43,21,49,27,44,34,30,35,22,31);Q(K,22,26,31,22,42,23,46,27,43,31,30,33,23,30);Q(e,24,26,30,24,34,26,30,28,24,28);Q(e,36,25,42,25,44,27,38,28);Q(m,29,35,42,34,39,38,31,38);
  if(electric){
   Q(K,22,16,19,6,27,12,31,4,36,13,44,6,43,18);Q(t,23,15,22,9,28,14,31,8,35,15,42,10,41,17);Q(e,30,10,32,9,33,13);gem(40,48+Y,4,7,t,e);
   // Storm wraith mask: sharply tapered hood, one glaring eye and molten lightning split.
   Q(K,18,29,17,17,26,8,37,8,49,13,55,25,49,38,38,43,26,38);Q('#4c3468',20,28,20,18,27,10,37,10,47,15,52,25,47,36,38,41,27,36);Q(M,22,20,28,12,36,12,45,16,46,19,36,17,29,18,24,24);Q(L,26,14,32,12,37,13,33,15,28,16);Q(K,22,25,30,21,43,22,47,26,42,35,35,39,26,34);Q('#49365f',27,31,36,29,42,26,40,33,35,36,29,34);Q(e,23,26,31,24,35,25,31,28,24,28);Q('#fff9d6',24,26,30,25,32,26,28,27,24,27);Q(t,38,25,43,24,45,25,42,27,38,27);
   q(S,24,47,35,42,42,46,37,55,29,61,23,58);q(M,26,47,34,44,38,47,34,51,27,54);q(L,27,47,33,45,36,46,31,48);
   q(S,48,58,58,52,60,58,56,66,51,72,44,73);q(M,50,59,56,55,57,59,53,65,48,67);q(t,54,55,57,56,54,61,50,63);
   P(K,6-A,44+Y,11-A,40+Y,17-A,42+Y,20-A,47+Y,14-A,54+Y,6-A,57+Y,3-A,50+Y);P(m,7-A,45+Y,11-A,42+Y,16-A,44+Y,17-A,47+Y,12-A,52+Y,7-A,54+Y,5-A,50+Y);P(e,6-A,48+Y,9-A,44+Y,10-A,47+Y,13-A,45+Y,11-A,51+Y,7-A,53+Y);
   line(t,1,46,43+Y,51,48+Y,46,54+Y,53,60+Y,48,68+Y);line(e,1,46,43+Y,51,48+Y,46,54+Y);line(t,1,26,59+Y,31,64+Y,27,69+Y,37,73+Y);line(e,1,9-A,46+Y,14-A,48+Y,8-A,52+Y);
  }else{ // cloud crests and lightning veins inside the vapor, not an external asset
   for(const [x,y,rad] of [[26,13,5],[37,9,5],[47,17,5]]){disk(s,x+X,y+Y,rad+1);disk(l,x+X-1,y+Y-1,rad-1);R(h,x+X-2,y+Y-2,3,1);}
   // Organic cloud giant: turbulent layered vapor and a face formed from storm shadows, not a helmet.
   const cloud=(x,y,rad)=>{disk(K,x,y,rad+2);disk(s,x,y,rad);disk(m,x-2,y-2,rad-2);P(L,x-rad+2,y-2,x-rad+4,y-rad+3,x-1,y-rad+1,x+rad-3,y-rad+4,x+rad-5,y-1,x+1,y+1,x-rad+5,y+2);P(M,x-rad+4,y+2,x+1,y+1,x+rad-4,y-2,x+rad-3,y+4,x+2,y+rad-2,x-rad+5,y+rad-3);P(h,x-rad+4,y-rad+4,x-1,y-rad+2,x+4,y-rad+3,x,y-rad+5,x-rad+4,y-rad+6);};
   cloud(28+X,15+Y,9);cloud(42+X,15+Y,10);cloud(49+X,24+Y,8);cloud(23+X,28+Y,9);
   Q(S,21,28,27,21,35,22,42,21,48,26,45,35,38,39,29,37,22,33);Q(K,23,28,31,24,35,26,30,29,24,30);Q(e,25,27,31,25,33,26,29,28,25,28);Q(K,38,25,44,24,46,27,41,29,37,28);Q(h,39,26,44,25,43,27,39,27);Q(M,29,34,34,32,39,33,42,31,40,36,34,38,29,36);Q(l,24,32,29,31,31,33,28,34);Q(K,31,34,37,34,35,36,31,36);
   P(S,43,71+Y,55,66+Y,65,64+Y,63,71+Y,52,81+Y,39,86+Y,43,78+Y);P(M,47,72+Y,56,69+Y,60,68+Y,56,74+Y,48,79+Y,44,80+Y);P(L,48,72+Y,55,69+Y,57,70+Y,52,73+Y);
   cloud(22-A,49+Y,7);cloud(13-A,50+Y,7);cloud(64,46+Y,8);cloud(78,47+Y,7);
   P(S,26,61+Y,33,57+Y,43,61+Y,41,67+Y,35,73+Y,31,72+Y);P(M,29,62+Y,34,60+Y,40,62+Y,36,66+Y,31,67+Y);P(L,30,62+Y,35,61+Y,37,62+Y,33,64+Y);
   line(t,1,42,48+Y,36,54+Y,41,57+Y,34,65+Y);line(h,1,42,48+Y,36,54+Y,41,57+Y);
  }
 }else if(id==='sand_stalker'){
  // Sand scorpion: four depth-separated leg pairs, long segmented raised tail, two pincers.
  const pts=[[66,45],[77,36],[82,25],[76,15],[63,12],[54,18]];
  for(let i=0;i<pts.length-1;i++){let [x,y]=pts[i],[xx,yy]=pts[i+1];limb(5-i%2,s,m,x,y,xx,yy);disk(K,x,y,6);disk(m,x,y,4);R(l,x-2,y-3,4,2);R(s,x+1,y+1,3,2);}
  P(K,63,9,54,8,43,15,42,25,49,23,55,19,63,20,67,15);P(t,61,11,55,10,45,16,44,22,49,20,54,17,62,18,64,15);line(e,1,48,16,54,12,60,12);
  for(const [x,y,j,k] of [[38,54,35,79],[49,52,52,81],[60,50,71,78],[68,48,86,74]])limb(3,s,m,x,y,x+8,y+12,j,k);
  P(K,30,39,44,34,59,36,72,45,73,56,64,66,47,70,33,64,25,53);P(s,32,40,44,36,58,38,70,46,70,55,63,64,47,67,35,62,27,53);P(m,34,41,44,38,56,40,67,47,61,53,48,55,33,50);P(l,36,42,44,39,49,41,43,45,35,46);
  for(const [x,y,w,hh] of [[44,39,7,13],[54,41,7,13],[64,46,5,10],[39,55,9,10],[51,56,9,10],[62,55,6,8]])scaleFacet(x,y,w,hh);
  for(const [x,y,j,k] of [[35,59,24,85],[47,64,46,87],[58,62,63,85],[67,58,82,81]]){limb(3,m,l,x,y,x-2,y+11,j,k);R(K,j-3,k,6,2);R(l,j-2,k,3,1);}
  // Secondary claw behind main carapace.
  limb(4,s,m,35,46,22,35,12,38);P(K,4,26,10,21,20,23,25,31,18,37,13,32,10,29,9,33,15,39,21,42,18,47,9,44,4,38,3,33);P(m,6,27,11,23,19,25,22,31,18,34,14,30,10,26,7,33,13,40,18,42,16,44,10,42,6,37,5,33);R(l,10,25,7,2);
  const X=-A;limb(5,m,l,35,54,22+X,60,16+X,55);P(K,19+X,50,12+X,44,6+X,36,9+X,30,19+X,30,28+X,38,25+X,46,18+X,41,14+X,35,11+X,38,15+X,44,25+X,50,30+X,58,24+X,68,15+X,71,6+X,65,4+X,57,10+X,52,15+X,57);P(m,19+X,52,13+X,46,8+X,36,10+X,32,18+X,32,26+X,38,24+X,43,19+X,39,14+X,33,9+X,38,14+X,46,24+X,52,27+X,58,23+X,66,15+X,68,8+X,63,6+X,58,10+X,55,15+X,60);P(l,10+X,36,13+X,33,19+X,34,23+X,38,18+X,37,13+X,36);P(l,16+X,60,23+X,54,25+X,58,21+X,64,15+X,66);line(h,1,16+X,60,23+X,56);
  // Chitin armor: ribbed overlapping segments, angular leg joints and gold edge catches.
  for(const [x,y,w,hg] of [[42,38,11,15],[53,40,11,16],[64,45,7,12],[41,54,11,11],[53,56,11,10]])plate(x,y,w,hg,M,L);
  for(const [x,y] of [[66,43],[77,34],[80,24],[73,15],[63,12]]){P(S,x-4,y+1,x+4,y-1,x+5,y+3,x-3,y+5);P(l,x-3,y-3,x+2,y-4,x+4,y-2,x,y,x-3,y);R(h,x-2,y-3,3,1);}
  for(const [x,y] of [[33,70],[46,75],[61,73],[76,69]]){P(S,x-3,y,x+3,y-3,x+5,y+1,x-1,y+4);R(L,x-2,y-1,3,2);}
  P(L,10+X,35,13+X,32,19+X,34,22+X,37,17+X,36,13+X,35);P(h,12+X,34,16+X,33,18+X,34,15+X,35);P(M,8+X,62,15+X,66,23+X,60,21+X,65,15+X,68,9+X,65);P(ivory,23+X,41,26+X,39,25+X,44);P(ivory,22+X,52,26+X,54,23+X,55);
  P(K,25,43,34,39,43,43,44,54,37,60,27,58,21,51);P(m,27,44,34,41,41,45,42,53,36,57,28,56,23,51);R(K,25,46,13,5);R(e,26,46,4,3);R(e,33,45,3,3);R(t,29,55,5,1);P(L,26,44,34,41,39,44,34,46,28,47);R(K,28,47,2,2);R(ivory,26,46,2,1);P(S,30,53,38,52,36,57,30,56);line(e,1,56,41,59,45,55,48,61,51);P(e,47,17,54,11,60,11,57,13,52,14,48,19);
 }
}else if(id==='rift_runner'){
 // Rift raptor: hooked beak, swept wings, split tail, lightning crystal quills.
 let k=breath*2-atk, x=-Math.min(atk,1)+hurt, z=pose==='attack'?atk:breath;
 // far wing, trailing tail
 p(INK,23,24,25,14-k,34,5-k,43,2-k,41,10-k,36,21,30,29);
 p(s,25,23,27,15-k,35,7-k,41,4-k,38,13-k,33,22,29,26);
 p(m,28,20,30,14-k,39,7-k,35,15-k,31,22);p(l,32,12-k,38,7-k,35,13-k,32,16-k);
 p(INK,28,28,39,23,46,20,43,28,46,31,34,34,27,34);
 p(m,30,29,42,23,40,28,43,30,34,32);p(l,35,28,42,25,37,30);
 // body, talons tucked forward
 p(INK,15+x,22,23,18,32,21,35,27,30,33,24,35,24,40,18,42,15,40,18,34,12,31);
 p(s,17+x,23,23,20,31,23,33,27,28,32,22,33,20,39,17,40,19,34,14,30);
 p(m,16+x,24,23,21,29,23,28,28,21,32,15,29);p(l,18+x,24,23,22,27,24,22,27,17,27);r(h,20+x,24,3,1);
 p(t,18,35,21,34,20,39,17,40,16,39);r(e,17,38,2,1);
 // forward head and hooked beak
 p(INK,8+x,16+hurt,13+x,12+hurt,19+x,13+hurt,25+x,19,23+x,24,18+x,27,10+x,24,5+x,24,2+x,21,7+x,19);
 p(m,9+x,17+hurt,14+x,14+hurt,19+x,15+hurt,23+x,20,20+x,24,15+x,25,10+x,22);
 p(l,10+x,17+hurt,14+x,15+hurt,18+x,16+hurt,17+x,19+hurt,11+x,20+hurt);p(t,9+x,20,5+x,21,8+x,23,10+x,22);r(INK,9+x,18+hurt,5,3);r(e,10+x,18+hurt,3,1);
 p(INK,16+x,14+hurt,18+x,8+hurt,21+x,11+hurt,24+x,7+hurt,25+x,14+hurt,22+x,18+hurt);p(h,19+x,12+hurt,21+x,13+hurt,24+x,10+hurt,23+x,15+hurt,20+x,16+hurt);
 // near wing sweeps back; feathers separate rather than flat mass
 p(INK,23,24,28,19+z,37,14+z,46,11+z,43,19+z,40,22+z,42,25+z,34,29+z,35,32+z,26,34,21,30);
 p(s,24,25,29,21+z,37,16+z,43,14+z,40,20+z,37,23+z,39,25+z,32,28+z,33,30+z,26,32,23,29);
 p(m,25,24,31,21+z,42,15+z,38,21+z,32,24+z,28,29);p(l,28,24,32,21+z,38,18+z,35,22+z,30,25);p(h,32,21+z,38,18+z,36,20+z,32,23+z);
 p(l,28,29,34,25+z,39,24+z,35,27+z,30,30);r(e,30,26+z,1,1);r(t,25,29,2,1);
 }else if(id==='lattice_guard'){
 // Stone sentinel with angular lattice shield, turquoise energy locked within rock plates.
 let x=-atk,y=dy;
 p(INK,18,30,26,29,30,35,29,41,33,42,33,44,22,44,20,40,16,37);p(s,20,32,26,32,28,36,26,41,30,42,24,43,22,39,18,36);p(l,21,34,25,34,26,37,23,39,20,37);
 p(INK,30,29,36,31,39,38,38,41,43,42,43,44,32,44,30,40,28,35);p(m,32,32,36,33,37,38,35,41,40,42,34,43,32,39,30,35);p(l,33,34,35,35,36,38,33,39);r(h,35,42,5,1);
 p(INK,19,15,32,13,40,19,38,29,33,35,22,34,16,28);p(s,21,17,32,15,38,20,36,28,32,33,23,32,18,27);
 p(m,20,19,27,17,33,20,31,26,25,30,20,27);p(l,22,19,27,18,31,20,26,24,21,24);p(h,23,19,27,18,28,20,23,21);
 p(INK,27,23,32,20,36,25,33,30,28,31,25,27);p(t,28,24,32,22,34,25,32,28,28,29,27,27);r(e,30,24,2,3);r(h,30,24,1,1);
 // far arm and shoulder crystal
 p(INK,32,14-y,37,9-y,44,13-y,47,23,43,32,37,34,33,28,35,21);p(m,34,15-y,37,11-y,42,14-y,45,23,42,30,38,32,35,27,37,21);p(l,35,15-y,38,12-y,42,15-y,42,19,37,20);p(h,37,13-y,40,14-y,40,16-y,37,16-y);
 p(INK,38,10-y,39,3-y,43,8-y,45,15-y,40,18-y);p(t,40,10-y,40,6-y,43,12-y,42,15-y);r(e,41,10-y,1,3);
 // head, angular brow, inset face
 p(INK,13+x,8+y,20+x,5+y,29+x,7+y,34+x,13+y,30+x,20+y,21+x,22+y,13+x,18+y,10+x,13+y);
 p(m,14+x,9+y,20+x,7+y,28+x,9+y,32+x,13+y,28+x,18+y,21+x,20+y,15+x,17+y,12+x,13+y);
 p(l,14+x,10+y,20+x,8+y,27+x,10+y,23+x,13+y,13+x,14+y);r(h,18+x,9+y,6,1);p(s,15+x,15+y,22+x,14+y,28+x,15+y,26+x,18+y,20+x,19+y,15+x,17+y);r(INK,13+x,14+y,10,3);r(e,14+x,14+y,6,1);r(h,14+x,14+y,2,1);r(l,20+x,18+y,4,1);
 // forward shield with inlaid lattice instead of generic stone fist
 p(INK,4+x,17,15+x,15,23+x,21,21+x,34,15+x,42,8+x,38,2+x,29,2+x,22);
 p(t,5+x,18,15+x,17,21+x,22,19+x,33,14+x,40,9+x,36,4+x,28,4+x,23);
 p(s,7+x,20,14+x,19,19+x,23,17+x,32,13+x,37,10+x,33,6+x,27);p(m,8+x,21,14+x,20,17+x,23,13+x,27,7+x,26);
 p(l,7+x,22,9+x,21,17+x,32,15+x,34);p(l,16+x,21,18+x,23,8+x,31,7+x,28);p(INK,10+x,25,14+x,23,17+x,27,13+x,31,9+x,28);p(e,11+x,26,14+x,25,15+x,27,13+x,29,11+x,28);r(h,12+x,26,2,1);r(h,5+x,20,1,5);r(h,14+x,17,2,1);
 }else if(id==='thread_archer'){
 // Thread ranger: masked face and asymmetric hood, quiver, luminous bowstring.
 let y=dy,x=-atk,z=Math.min(atk,3);
 // cape and quiver, grounded boots
 p(INK,25,16,32,13,40,18,43,31,45,40,35,38,31,43,24,37);p(s,27,18,32,15,38,19,41,31,42,37,35,35,31,40,27,35);p(m,30,18,35,18,37,29,34,34,32,32);p(l,34,19,36,21,37,27,34,25);
 p(INK,27,10,32,8,37,19,36,26,30,25);p(t,29,12,32,11,35,19,34,24,31,23);r(h,30,13,2,2);r(e,31,7,1,4);r(l,33,5,1,6);r(h,35,8,1,5);
 p(INK,18,29,29,29,32,37,36,42,35,44,26,44,23,38,21,40,18,44,10,44,9,41,15,36);p(s,20,31,26,31,29,37,33,42,27,42,23,36,19,40,17,42,12,42,17,37);p(m,20,32,23,33,19,38,16,40,15,38);p(l,25,32,28,35,29,38,26,36);r(t,12,41,4,1);r(t,28,41,4,1);
 p(INK,17,17,27,16,34,21,33,29,28,34,19,33,14,28);p(m,19,19,26,18,32,22,31,28,27,32,20,31,16,27);p(l,19,20,25,19,28,22,23,26,17,25);p(s,25,25,31,23,30,28,26,31,22,29);r(t,18,29,10,2);r(e,22,29,2,2);
 // hood with long point and narrow face opening facing left
 p(INK,11+x,11+y,17+x,5+y,25+x,2+y,32+x,8+y,36+x,17+y,30+x,21+y,20+x,23+y,11+x,19+y,8+x,15+y);
 p(m,12+x,12+y,18+x,7+y,25+x,4+y,30+x,9+y,33+x,16+y,28+x,19+y,20+x,21+y,13+x,17+y,10+x,15+y);p(l,13+x,12+y,18+x,8+y,25+x,5+y,28+x,8+y,21+x,10+y,15+x,15+y);p(h,18+x,8+y,23+x,6+y,25+x,7+y,20+x,9+y);
 p(INK,10+x,14+y,18+x,12+y,24+x,14+y,25+x,18+y,20+x,21+y,12+x,18+y);p(s,12+x,15+y,18+x,14+y,22+x,15+y,22+x,18+y,18+x,19+y,13+x,17+y);r(e,12+x,15+y,6,1);r(h,12+x,15+y,2,1);p(t,20+x,20+y,25+x,19+y,29+x,21+y,23+x,22+y);
 // forearm reaching bow, draw hand moves backward
 p(INK,19,22,13-z,22,8-z,25,9-z,29,16,27,22,26);p(l,19,23,13-z,23,10-z,25,11-z,27,17,26,21,25);r(t,9-z,25,3,2);
 p(INK,29,21,34,23,31,27,22+z,25,20+z,22,23+z,20);p(m,29,22,32,24,30,25,23+z,24,22+z,22,24+z,22);r(t,22+z,22,2,2);
 // carved bow with angular curve, thread and arrow
 let b=5-z; p(INK,b+5,8,b+8,9,b+3,15,b+1,23,b+3,33,b+8,38,b+5,40,b,34,b-1,25,b,17);p(t,b+5,10,b+6,10,b+2,16,b,24,b+2,33,b+6,38,b+4,38,b+1,33,b,26,b,19);r(h,b+1,18,1,4);r(e,b+4,11,1,1);r(e,b+4,36,1,1);
 p(e,b+6,10,b+7,10,23+z,23,23+z,24,b+5,38,b+5,36,21+z,24);if(pose==='attack'&&atk>1){r(h,1,23,22+z,1);p(e,0,23,4,21,4,26);}
 }else if(id==='gate_weaver'){
 // Floor 35 gate weaver: segmented arch behind a levitating masked entity, woven filaments.
 let y=dy,z=atk;
 // physical portal fragments, hollow center, staggered trim
 p(INK,5,35,3,25,4,15,11,6,19,1,31,1,40,6,46,15,47,26,43,35,39,37,38,30,41,23,39,16,34,10,27,7,21,7,14,11,10,17,9,25,13,34,11,38);
 p(s,6,34,5,25,6,16,12,8,20,3,31,3,39,8,44,16,45,25,42,33,40,34,41,29,43,23,41,15,35,8,28,5,20,5,13,9,8,16,7,25,11,34,10,36);
 p(t,7,17,12,9,16,6,17,9,12,13,9,19);p(l,19,4,25,3,28,4,26,6,20,6);p(t,32,4,38,8,42,14,39,16,36,10,32,8);p(m,42,19,44,22,43,28,40,32,41,25);p(l,5,25,7,23,8,29,11,33,9,34);r(h,11,11,1,3);r(e,21,4,3,1);r(e,36,9,1,3);r(h,42,23,1,3);
 // R7: engraved portal masonry. Teal inner edge, antique gold bevels, fractured crystalline keystone.
 const gold='#b79365', goldHi='#ecd19a', goldShadow='#66506c', teal='#5d9eae', aqua='#9fe9eb', deep='#211b39', violet='#8561b7';
 p(goldShadow,6,16,11,9,15,7,13,11,9,17,8,22,6,22);p(gold,6.7,16,10.5,10,13.8,8.5,12,12,9,16.8,8,20);p(goldHi,8,15,11,10,13,9,11,12,9,15.5);
 p(teal,8,20,10,16,12,14,11,17,9.5,23,10,27,9,27);p(aqua,9,19,10,17,10,20,9.5,23);
 p(goldShadow,14,7,19,4,21,4,20,6,16,9);p(gold,15,7,19,5,20,5,19,6,16,8);p(goldHi,16,6,19,4.7,19.8,5,17,6.8);
 p(INK,21,1,25,0,29,2,27,7,24,9,21,6);p(violet,22,2,25,1,28,2.5,26,6.5,24,8,22,5);p(teal,24,2,26,2,27,3,25,6,24,7);p(aqua,23,3,25,1.6,24.5,4,23,5);r(e,23.7,2.8,.8,1.3);
 p(goldShadow,30,4,35,5,40,9,39,12,36,8,31,7);p(gold,31,4.8,35,6,38,9,38,10,35,7.6,31,6);p(goldHi,32,5,35,6,36,7,33,6);
 p(teal,36,12,39,15,41,21,41,23,39,21,38,17);p(aqua,38,15,39,17,40,20,39.5,20);
 p(goldShadow,42,15,45,19,46,24,43,24,42,20);p(gold,43,17,44,19,45,23,43.5,22);p(goldHi,43,17,44,19,44,20,43,19);
 p(INK,5,25,8,24,9,25,7,26,6,29);p(INK,41,25,45,24,45,25,42,27);p(gold,6,30,9,32,11,35,10,36,8,34);p(goldHi,7,31,9,33,9,34,7,32);
 p(gold,42,29,43,29,41,34,39,35,40,32);p(aqua,40,29,41,28,40,32,39,33);
 // engraved notches are bounded to the arch, not free-floating noise
 r(goldHi,11,12,1,1);r(deep,8,22,1,1);r(aqua,7,27,1,1);r(goldHi,35,8,1,1);r(deep,43,21,1,1);r(aqua,42,31,1,1);
 // inner filaments connect fractured structure to floating caster
 p(m,9,18,12,17,23,25+y,22,26+y);p(l,39,15,41,16,28,26+y,27,25+y);p(l,12,32,13,30,22,27+y,23,28+y);p(m,39,31,40,32,29,27+y,28,26+y);
 // floating layered robes
 p(INK,19,20+y,30,20+y,35,27+y,36,35+y,32,39+y,29,36+y,25,44,21,39,15,42,17,35+y,12,37+y,14,27+y);
 p(s,20,22+y,29,22+y,33,28+y,34,35+y,31,37+y,28,34+y,25,41,21,36+y,17,39,19,34+y,15,35+y,16,28+y);
 p(m,20,23+y,24,23+y,24,32+y,20,37,20,31+y,17,33+y);p(l,27,23+y,30,24+y,32,30+y,30,35+y,27,32+y);p(t,22,35+y,24,34+y,25,39,24,41);p(t,29,33+y,32,34+y,31,37+y,30,35+y);
 // R7: brocade panels and deliberate cloth folds, stitched gold lower edges.
 p(deep,20,27+y,23,27+y,22,33+y,20,36,20,32+y);p(violet,24,28+y,26,27+y,25,33+y,26,36,24,39,24,33+y);p(h,25,29+y,25.8,29+y,25,33+y,24.4,33+y);
 p(goldShadow,16,33+y,18,32+y,18,35+y,16,37);p(gold,16,35+y,17.4,35+y,17,37,16,38);p(gold,24,38,25,40,24.5,42,23.7,40);p(gold,29,34+y,31,36+y,31,37+y,29,35+y);
 p(teal,28,28+y,29,27+y,30,29+y,29,31+y);r(aqua,29,28+y,.8,1.6);
 // neck, hood and face mask, upper crown
 p(INK,16,13+y,19,8+y,24,6+y,30,9+y,34,15+y,31,21+y,25,25+y,18,21+y,13,18+y);
 p(m,17,14+y,20,10+y,24,8+y,29,11+y,32,15+y,29,20+y,25,23+y,19,20+y,15,18+y);p(l,18,13+y,21,10+y,24,9+y,27,11+y,22,13+y,17,17+y);p(h,21,10+y,24,9+y,25,10+y,22,12+y);
 p(INK,15,17+y,21,14+y,27,15+y,29,19+y,25,22+y,19,20+y);p(t,17,17+y,21,16+y,26,17+y,27,19+y,24,21+y,19,19+y);r(INK,17,17+y,7,2);r(e,17,17+y,5,1);r(h,17,17+y,2,1);
 p(INK,20,9+y,20,4+y,24,6+y,27,3+y,30,10+y,25,12+y);p(t,21,6+y,24,8+y,27,5+y,28,9+y,25,10+y);r(e,25,8+y,1,2);
 // R7: mask is carved metal, with an asymmetric nose/cheek, a crown inset and high-contrast eye slit.
 p(goldShadow,19,16+y,25,15+y,27,17+y,26,20+y,24,22+y,21,20+y);p(gold,20,16+y,25,16+y,26,18+y,24,20+y,21,19+y);p(goldHi,19,17+y,21,16+y,24,16+y,23,17+y,20,18+y);
 p(deep,16,16.5+y,23.5,16+y,24.5,17.5+y,20.5,18.5+y,17,18+y);r(aqua,17,17+y,5,1);r(e,17,17+y,2,1);p(goldHi,18,19+y,21,19+y,20,20+y,18,20+y);
 p(violet,27,11+y,30,12+y,31,15+y,29,17+y,27,15+y);p(l,28,12+y,29,12+y,30,14+y,29,14+y);p(goldHi,21,9+y,24,7+y,25,8+y,23,10+y);r(aqua,25,8+y,1,1.4);
 // hands and central gate sigil, one hand extends on attack
 p(INK,17,23+y,10-z,21+y,7-z,24+y,8-z,29+y,15,30+y,21,27+y);p(l,17,24+y,11-z,23+y,9-z,25+y,10-z,27+y,15,28+y,19,26+y);r(t,8-z,25+y,3,2);
 p(INK,30,24+y,36,20+y,40,23+y,39,28+y,33,30+y,28,27+y);p(m,30,25+y,36,22+y,38,24+y,37,27+y,33,28+y);r(t,36,24+y,3,2);
 p(INK,22,23+y,26,21+y,30,25+y,26,31+y,21,28+y);p(l,23,24+y,26,23+y,28,25+y,26,29+y,23,27+y);p(e,24,25+y,26,24+y,27,26+y,25,28+y);r(h,25,25+y,1,1);
 // R7: cuffs, layered shoulder stitching and faceted gate seal.
 p(goldShadow,12-z,23+y,14-z,24+y,13-z,28+y,11-z,27+y);p(goldHi,11-z,24+y,13-z,24+y,12-z,25+y,11-z,26+y);r(aqua,9-z,25+y,1,1);
 p(gold,33,23+y,36,22+y,37,23+y,34,25+y);r(aqua,36,24+y,1.5,1);
 p(gold,22,25+y,26,22+y,29,25+y,26,30+y,22,28+y);p(deep,23,25+y,26,23.5+y,28,25+y,26,29+y,23,27+y);p(teal,24,25+y,26,24+y,27,26+y,25,28+y);p(aqua,24,25+y,25.5,24.5+y,25,27+y,24,27+y);r(e,24.5,25+y,.8,1.2);
 }else if(id==='seam_warden'){
 // Floor 45 seam titan: broad asymmetric ancient sandstone armor, fissure core and crushing fist.
 let y=dy,x=-Math.min(atk,1);
 // legs with layered plates
 p(INK,14,28,25,28,29,35,26,40,29,43,28,44,13,44,10,41,12,35);p(s,16,30,24,30,27,35,24,40,26,42,14,42,12,40,14,35);p(m,16,32,22,31,24,35,20,38,14,37);p(l,17,32,21,32,21,34,16,35);p(t,14,40,22,40,24,42,14,42);r(h,14,41,4,1);
 p(INK,30,28,39,30,42,36,40,40,46,42,46,44,32,44,30,40,27,34);p(m,31,30,37,32,40,36,38,40,43,42,33,42,32,39,29,34);p(l,33,32,37,33,38,36,34,38,31,36);p(s,33,38,38,36,37,41,42,42,33,42);r(t,34,41,5,1);
 // R7: boot and greave facets with bronze bindings.
 const bronze='#a87546', bright='#f3cc88', rockHi='#d8ab83', rockDark='#4b333b', fissure='#ff9b4d', coreHi='#fff0ba', basalt='#251d28';
 p(rockDark,16,35,21,34,23,36,20,39,14,38);p(rockHi,16,35,20,34,21,35.5,17,37,15,37);p(bronze,13,40,21,39,23,41,20,42,13,42);r(bright,15,40,4,1);r(rockDark,18,42,1,1);
 p(rockDark,33,35,37,34,39,37,36,39,32,38);p(rockHi,33,35,36,35,37,36,34,37);p(bronze,33,40,37,40,41,42,34,42);r(bright,35,41,4,1);r(rockDark,39,42,1,1);
 // massive torso carved from rock
 p(INK,13,13,27,10,38,14,42,23,36,33,28,36,17,33,10,25);p(s,15,15,27,12,37,16,40,23,34,31,28,34,18,31,12,25);
 p(m,15,17,22,15,27,17,25,23,19,27,13,24);p(l,16,17,22,16,25,18,20,21,15,21);p(h,17,17,22,16,22,18,17,19);
 p(m,28,15,35,17,38,22,34,25,29,23,27,20);p(l,29,16,35,18,36,20,31,20);p(m,20,28,26,25,33,27,31,31,27,33,21,31);p(l,22,28,26,27,29,28,26,30,22,30);
 // R7: layered, stepped breastplate bevels and chipped stone edges.
 p(rockDark,17,21,21,19,25,20,22,23,18,25,15,24);p(rockHi,17,20,21,18,24,19,21,21,18,22);r(bright,18,19,3,.8);
 p(rockDark,29,17,34,17,37,20,35,23,31,22);p(rockHi,30,17,34,18,36,20,33,20);r(bright,31,18,2,.8);
 p(rockDark,22,30,26,28,30,29,28,32,23,32);p(rockHi,22,29,26,28,28,29,25,30);r(bronze,22,31,3,1);
 // luminous tectonic seam, embedded, not a floating particle
 p(INK,24,19,28,18,33,23,31,27,26,31,22,27,21,23);p(t,25,20,28,20,31,23,29,27,26,29,24,26,23,23);p(e,26,21,28,21,29,23,27,27,25,26,25,23);r(h,26,22,2,2);r(e,20,27,2,1);r(t,19,28,1,3);r(e,32,25,3,1);r(t,35,24,1,2);
 // R7: the central seam has a carved dark channel, ember lining and narrow hot core.
 p(basalt,24,19,28,18,32,21,33,24,30,28,26,31,22,27,21,23);p(bronze,24,20,28,19,31,21,32,24,29,28,26,30,23,27,22,23);
 p(fissure,25,21,28,20,30,22,30,24,28,26,27,29,25,27,26,24,24,23);p(coreHi,26,21,28,21,28,23,27,24,27,26,26,25,26,23,25,23);r(e,26,22,1,1.5);
 p(fissure,23,25,21,26,20,29,19,29,20,26,22,25);p(fissure,30,24,34,23,35,25,34,26,33,24.5,30,25);r(coreHi,21,26,1,1);
 // rear arm, angular shoulder ridge
 p(INK,31,12-y,34,6-y,40,7-y,45,13-y,47,23,44,30,38,32,34,27,36,20);p(m,33,13-y,35,8-y,39,9-y,43,14-y,45,23,42,28,38,30,36,26,38,20);p(l,34,13-y,36,9-y,39,10-y,42,14-y,38,16,35,15);p(h,36,10-y,39,11-y,40,13-y,36,12-y);p(s,40,18,44,21,43,27,39,29,37,26,39,23);p(l,39,22,43,22,42,25,38,26);r(t,40,20,2,1);
 // R7: far pauldron ridge and wrist assembly, with deliberate cracks.
 p(rockDark,34,13-y,37,11-y,41,12-y,44,16-y,41,18-y,37,17-y);p(rockHi,35,12-y,37,10-y,40,11-y,42,14-y,38,14-y);p(bright,36,11-y,38,10.5-y,39,11.5-y,37,12-y);
 p(basalt,41,18,42,20,41,22,42,24,41,25,40,22,41,20);r(fissure,41,21,.8,1.5);p(bronze,38,26,42,25,43,26,40,29,38,29);r(bright,40,26,2,1);
 // cracked helm, horn projections and visible jaw
 p(INK,12+x,9+y,10+x,3+y,15+x,5+y,18+x,2+y,24+x,5+y,29+x,3+y,32+x,10+y,35+x,15+y,30+x,21+y,20+x,23+y,11+x,18+y,8+x,14+y);
 p(m,13+x,10+y,12+x,6+y,16+x,8+y,19+x,4+y,24+x,7+y,28+x,5+y,30+x,11+y,33+x,15+y,28+x,19+y,20+x,21+y,13+x,17+y,10+x,14+y);
 p(l,14+x,10+y,19+x,6+y,23+x,8+y,28+x,7+y,29+x,11+y,24+x,12+y,18+x,11+y,13+x,13+y);p(h,18+x,7+y,20+x,6+y,22+x,8+y,19+x,9+y);p(t,24+x,8+y,26+x,8+y,25+x,12+y,23+x,13+y,24+x,11+y);
 p(INK,11+x,13+y,19+x,12+y,25+x,14+y,23+x,17+y,13+x,17+y,10+x,15+y);r(e,12+x,14+y,7,1);r(h,12+x,14+y,2,1);p(s,14+x,18+y,22+x,17+y,29+x,17+y,26+x,20+y,20+x,21+y);r(l,15+x,18+y,5,1);
 // R7: crest, temple plate, dark eye cavity and carved cheek facets.
 p(rockHi,13+x,10+y,15+x,7+y,17+x,8+y,19+x,5+y,22+x,8+y,20+x,10+y,16+x,11+y);p(bright,17+x,8+y,19+x,5.5+y,20+x,7+y,19+x,8+y);
 p(rockDark,23+x,9+y,25+x,7+y,28+x,6+y,28+x,10+y,26+x,12+y,23+x,13+y);p(bronze,25+x,9+y,28+x,7+y,28+x,9+y,26+x,11+y);r(bright,26+x,8+y,1,1);
 p(basalt,11+x,13+y,18+x,12+y,24+x,14+y,22+x,17+y,13+x,17+y,10+x,15+y);p(fissure,12+x,14+y,17+x,13.5+y,21+x,14.5+y,17+x,15.5+y,12+x,15.5+y);r(coreHi,12+x,14+y,3,1);p(rockHi,15+x,18+y,19+x,17.5+y,23+x,17.5+y,21+x,19+y,16+x,19+y);r(bronze,22+x,19+y,2,1);
 // giant forward shoulder and fist, animated on impact
 p(INK,8+x,13,17+x,12,22+x,18,20+x,25,16+x,29,17+x,34,14+x,40,5+x,41,1+x,36,2+x,29,5+x,24,4+x,19);
 p(s,9+x,15,16+x,14,20+x,18,18+x,24,14+x,28,15+x,34,12+x,38,6+x,39,3+x,35,4+x,30,7+x,24,6+x,19);
 p(m,8+x,17,15+x,15,18+x,19,15+x,24,8+x,25,6+x,21);p(l,9+x,17,15+x,16,16+x,19,12+x,22,7+x,21);p(h,10+x,17,14+x,16,14+x,18,10+x,19);p(t,14+x,24,17+x,22,16+x,26,13+x,28,12+x,27);r(e,14+x,25,1,2);
 p(m,5+x,29,12+x,27,15+x,31,13+x,36,6+x,38,3+x,34);p(l,6+x,29,10+x,29,11+x,32,7+x,34,4+x,33);p(h,6+x,29,9+x,29,9+x,30,5+x,31);p(s,6+x,35,10+x,33,13+x,34,11+x,37,6+x,38);r(t,5+x,34,2,1);r(t,9+x,35,2,1);r(e,11+x,30,1,2);
 // R7: near arm armor plates, cut-in fingers, bronze edge banding and glowing fractures.
 p(rockDark,8+x,20,12+x,18,17+x,19,16+x,23,12+x,25,7+x,23);p(rockHi,8+x,19,12+x,17,16+x,18,14+x,20,9+x,22);p(bright,9+x,18,12+x,17,13+x,18,10+x,19);
 p(basalt,13+x,21,14+x,20,14+x,23,12+x,25,11+x,24,13+x,23);p(fissure,13+x,22,13.7+x,21,13.5+x,23,12+x,24,12+x,23);r(coreHi,13+x,22,.7,1);
 p(bronze,6+x,26,12+x,25,14+x,26,12+x,28,6+x,28);p(bright,7+x,26,11+x,25.5,12+x,26.5,8+x,27);
 p(rockHi,5+x,30,9+x,29,12+x,30,11+x,32,7+x,33,4+x,33);p(bright,5+x,30,8+x,29.5,9+x,30,6+x,31);
 p(basalt,5+x,34,6+x,33,7+x,35,7+x,37,6+x,37,6+x,35);p(basalt,9+x,33,10+x,32,11+x,34,10+x,36,9+x,36,10+x,34);r(bronze,5+x,36,1,1);r(bronze,9+x,36,1,1);r(fissure,11+x,30,.8,1.6);
 }else if(id==='warden'){
 // Masked ward keeper: a pointed ceremonial hood, floating taper, ward lantern.
 let y=dy, x=-atk;
 p(INK,23,18,33,20,39,29,42,40,34,39,30,44,24,40,16,44,14,35,17,25);
 p(s,24,20,32,22,37,30,39,37,33,36,29,41,25,37,18,41,16,35,19,25);
 p(m,22,23,28,23,31,32,29,39,25,36,19,40,21,31);p(l,23,24,26,24,25,33,22,37,22,29);p(t,18,37,22,35,21,39,18,41);p(t,30,37,33,35,37,36,39,38,33,37);
 p(INK,14,17+y,16,9+y,23,3+y,31,7+y,36,16+y,32,23+y,27,28+y,18,23+y,11,21+y);
 p(m,16,17+y,18,10+y,23,5+y,29,9+y,33,16+y,30,22+y,26,25+y,18,21+y,13,20+y);
 p(l,17,14+y,22,7+y,25,7+y,28,10+y,21,13+y,16,17+y);r(h,22,8+y,3,1);
 p(INK,13,18+y,19,14+y,26,15+y,28,20+y,23,24+y,17,22+y);
 p(t,15,18+y,19,16+y,24,17+y,25,20+y,21,22+y,17,21+y);r(INK,15,18+y,5,2);r(e,16,18+y,3,1);r(s,22,19+y,2,2);
 p(INK,19,26,14+x,24,10+x,27,10+x,32,16,33,24,30);p(l,19,27,14+x,26,12+x,28,12+x,30,17,31,21,29);
 // Floating ward focus, open hexagonal cage with a luminous center.
 p(INK,6+x,13,12+x,11,16+x,16,16+x,23,11+x,28,5+x,25,2+x,20,3+x,16);
 p(t,6+x,15,11+x,13,14+x,17,14+x,22,10+x,25,6+x,23,4+x,19);p(s,7+x,16,11+x,15,12+x,18,11+x,22,8+x,23,5+x,20);p(e,8+x,17,10+x,16,12+x,19,9+x,22,6+x,19);r(h,8+x,18,2,2);
 r(t,26,28,2,2);r(t,27,30,1,4);
 }else if(id==='armored'){
 let y=dy;
 // Armoured knight: shield toward the player, sword low, cape trailing right.
 p(INK,28,18,37,20,43,30,45,41,34,37,30,43,23,38);p(s,30,20,36,22,40,30,42,38,34,35,29,40,26,37);p('#75444f',32,23,36,24,39,32,36,33,32,29);
 p(INK,20,31,34,31,35,40,39,42,38,44,27,44,25,38,23,44,13,44,12,41,17,36);p(m,18,34,25,35,23,40,21,42,14,42);p(l,27,34,32,34,33,39,36,42,28,42);r(h,28,40,4,1);
 p(INK,18,17,29,15,36,20,36,29,29,35,17,33,12,25);p(m,20,18,28,17,34,21,34,28,28,33,18,31,14,25);p(l,19,19,27,18,31,20,27,24,18,25);p(s,25,26,33,25,31,30,27,33,19,31);r(t,18,30,12,2);r(h,20,20,6,1);
 p(INK,14,15+y,15,8+y,21,4+y,29,4+y,34,9+y,33,17+y,28,23+y,19,22+y,12,19+y);p(l,16,15+y,17,9+y,22,6+y,28,6+y,32,10+y,31,16+y,27,21+y,20,20+y,14,18+y);p(h,18,10+y,22,7+y,28,7+y,29,9+y,21,10+y);p(s,27,10+y,31,10+y,31,16+y,27,20+y,23,19+y,24,15+y);p(INK,13,15+y,25,13+y,29,15+y,25,17+y,15,18+y);r(e,15,15+y,6,1);r(t,22,9+y,1,4);
 // Sword on rear hand, angled forward in attack.
 let x=-atk;p(INK,30,25,35,27,32+x,32,18+x,40,8+x,43,12+x,37,27+x,29);p(h,30,28,31+x,30,17+x,39,11+x,41,15+x,37);p(t,27+x,29,31+x,33,29+x,35,25+x,31);r(m,32,27,3,3);
 // Broad kite shield with embossed ribs.
 p(INK,7+x,22,15+x,18,22+x,21,24+x,29,19+x,36,14+x,41,8+x,36,4+x,29);p(t,8+x,23,15+x,20,20+x,23,22+x,29,18+x,35,14+x,38,9+x,35,6+x,29);p(s,9+x,24,15+x,22,19+x,24,20+x,29,17+x,34,14+x,36,10+x,33,8+x,29);p(l,10+x,24,15+x,23,15+x,35,11+x,32,9+x,29);r(h,13+x,25,2,8);r(h,10+x,28,8,2);r(m,15+x,32,2,3);
 }else if(id==='charger'){
 // Furnace ram: low, broad mechanical beast, horned prow and glowing lantern core.
 p(INK,23,29,39,28,43,34,42,42,36,44,29,44,28,39,22,40);p(s,26,31,38,30,41,34,40,41,36,42,31,42,31,38,25,37);r(l,35,39,4,2);
 p(INK,15,16,28,11,39,15,45,23,43,33,34,38,18,35,12,28);p(m,16,18,28,13,38,17,43,24,41,32,34,36,19,33,14,28);p(l,20,17,28,15,36,18,40,22,34,25,22,23);p(s,34,26,41,24,40,32,34,35,26,33,27,28);r(h,26,17,8,1);r(t,36,21,2,6);
 p(INK,27,20,36,20,39,25,36,32,27,32,24,27);p('#a65b2b',28,21,35,21,37,26,34,30,28,30,26,26);p(e,29,23,33,22,35,26,32,29,28,27);r(h,30,24,2,3);r(s,33,22,1,8);
 let x=-atk,y=dy;p(INK,5+x,19+y,10+x,12+y,17+x,12+y,23+x,17+y,25+x,27+y,19+x,33+y,7+x,32+y,2+x,26+y);p(m,7+x,20+y,11+x,14+y,17+x,14+y,21+x,18+y,23+x,26+y,18+x,31+y,8+x,30+y,4+x,26+y);p(l,8+x,19+y,12+x,15+y,18+x,16+y,19+x,20+y,13+x,22+y,6+x,24+y);p(INK,5+x,23+y,14+x,21+y,18+x,23+y,15+x,26+y,5+x,27+y);r(e,7+x,23+y,6,2);
 p(INK,11+x,15+y,5+x,12+y,2+x,7+y,1+x,15+y,5+x,22+y,11+x,24+y,14+x,20+y);p(t,6+x,14+y,3+x,10+y,3+x,15+y,7+x,20+y,11+x,21+y,12+x,19+y);r(h,4+x,14+y,1,3);
 p(INK,15,29,23,30,24,37,20,44,9,44,8,40,12,34);p(m,16,31,21,32,22,37,18,42,11,42,11,39,14,34);p(l,15,32,20,33,19,36,13,37);r(h,12,40,6,1);
 }else if(id==='support'){
 // Spore oracle: asymmetrical mushroom crown, pale stem, root-feet and spore focus.
 let y=dy,x=-atk;p(INK,20,21,29,21,33,28,38,37,35,43,29,41,24,44,17,41,11,44,10,40,15,32);p(s,21,23,28,23,31,29,35,37,33,41,29,39,24,42,18,39,13,42,12,40,17,32);p(t,20,24,26,24,27,31,24,38,19,39,15,41,19,33);p(h,21,26,23,25,23,33,21,36);p(m,28,28,31,31,32,37,28,38,25,35);r(l,28,32,2,4);
 p(INK,11,18+y,11,12+y,16,5+y,23,2+y,31,4+y,38,9+y,42,17+y,39,21+y,31,23+y,21,22+y,10,24+y,5,20+y);p(m,12,18+y,13,12+y,18,7+y,24,4+y,30,6+y,36,11+y,40,17+y,37,19+y,30,21+y,21,20+y,11,22+y,7,20+y);p(l,13,16+y,18,8+y,24,5+y,29,7+y,31,10+y,23,11+y,19,15+y,11,18+y);p(h,20,8+y,24,6+y,27,7+y,26,9+y,21,10+y);p(s,9,20+y,20,18+y,30,19+y,38,17+y,36,20+y,30,21+y,21,20+y,12,22+y);r(t,15,12+y,3,2);r(t,29,9+y,3,2);r(h,33,14+y,2,2);r(t,23,15+y,2,2);
 p(INK,14,22+y,25,21+y,29,25+y,25,29+y,17,28+y,12,26+y);p(t,15,23+y,24,23+y,26,25+y,24,27+y,17,27+y,14,25+y);r(INK,14,23+y,4,3);r(e,15,24+y,2,1);r(s,21,25+y,2,1);
 // Left-facing root arm and floating spores, no permanent circular aura.
 p(INK,20,28,15,28,11+x,31,6+x,30,3+x,33,7+x,36,13+x,35,19,33,23,31);p(t,20,29,15,30,11+x,33,6+x,32,5+x,33,8+x,34,13+x,34,19,32);r(e,5+x,25,2,2);r(l,9+x,23,1,1);r(e,3+x,20,1,2);r(h,10+x,18,2,1);
 }else if(id==='ember_imp'){
 // Fire variant of the approved imp silhouette, larger flame crown and volcanic claws.
 let x=-atk+hurt,y=dy;p(INK,26,31,34,29,40,21,39,15,42,11,46,18,44,26,39,35,31,39);p(s,29,32,35,31,41,24,43,18,44,20,42,28,37,35,30,37);p(l,40,18,42,13,44,18,42,22);r(e,42,17,1,2);
 p(INK,23,31,33,30,35,39,39,41,38,44,27,44,25,39,19,40);p(s,27,33,31,33,33,40,36,42,28,42);r(t,29,41,4,1);
 p(INK,15,24,30,23,35,29,31,38,24,40,22,44,11,44,9,41,15,36);p(m,17,25,29,25,32,29,30,35,22,39,20,42,12,42,17,36);p(l,17,26,24,26,24,31,19,35,15,34);p(s,25,30,31,29,29,36,24,38,22,34);r(t,21,29,2,5);r(e,21,31,1,2);
 p(INK,7+x,14+y,8+x,8+y,12+x,4+y,14+x,9+y,18+x,8+y,20+x,0+y,23+x,6+y,27+x,3+y,29+x,10+y,27+x,15+y,31+x,19+y,27+x,25+y,18+x,28+y,8+x,24+y,4+x,20+y);p(l,9+x,13+y,10+x,8+y,12+x,6+y,14+x,12+y,18+x,11+y,20+x,3+y,23+x,9+y,26+x,6+y,27+x,11+y,24+x,15+y,28+x,18+y,26+x,23+y,18+x,25+y,9+x,22+y,6+x,20+y);p(t,18+x,12+y,20+x,6+y,22+x,11+y,21+x,15+y,16+x,16+y);r(e,20+x,9+y,1,4);p(m,11+x,16+y,20+x,15+y,26+x,18+y,25+x,22+y,18+x,25+y,9+x,22+y);p(INK,6+x,18+y,15+x,17+y,19+x,19+y,14+x,21+y,7+x,21+y);r(e,8+x,18+y,5,2);r(t,9+x,23+y,5,1);
 p(INK,17,27,12-atk,28,5-atk,33,3-atk,37,9-atk,39,19,34,23,30);p(l,17,28,12-atk,30,7-atk,34,5-atk,37,9-atk,37,18,32,21,30);r(e,5-atk,35,2,1);
 }else if(id==='iron_warden'){
 let y=dy;
 // Tower-shield sentinel: tall angular helm, stone/iron cuirass, massive barrier shield.
 p(INK,24,20,35,19,41,27,42,38,38,44,29,44,26,37,22,44,14,44,13,39,16,30);p(s,25,22,34,21,39,28,40,37,36,42,31,42,28,35,23,37,20,42,16,42,15,39,18,30);p(m,25,24,31,23,35,27,34,34,28,34,23,29);p(l,26,24,31,24,33,27,27,28);r(t,28,34,8,2);r(h,33,39,4,1);
 p(INK,20,12+y,23,5+y,29,1+y,36,5+y,39,13+y,35,22+y,25,24+y,18,20+y);p(m,22,13+y,25,6+y,29,3+y,34,6+y,37,13+y,33,20+y,25,22+y,20,19+y);p(l,23,12+y,26,7+y,29,5+y,33,8+y,28,10+y,23,15+y);r(h,27,7+y,2,4);p(INK,20,15+y,33,13+y,35,16+y,31,18+y,22,19+y);r(e,22,15+y,6,2);r(t,29,12+y,1,6);
 p(INK,34,21,40,19,45,24,45,31,40,35,34,31);p(m,35,22,40,21,43,25,43,30,39,33,36,30);p(l,36,23,40,22,42,25,38,27);r(h,38,23,3,1);
 let x=-atk;p(INK,3+x,14,11+x,9,21+x,12,25+x,20,24+x,32,17+x,43,9+x,43,3+x,34,1+x,22);p(t,4+x,15,11+x,11,20+x,14,23+x,21,22+x,31,16+x,41,10+x,41,5+x,33,3+x,22);p(s,6+x,17,11+x,14,19+x,16,21+x,22,20+x,30,15+x,38,11+x,38,7+x,32,5+x,23);p(m,8+x,18,12+x,15,13+x,37,9+x,32,7+x,23);p(l,14+x,16,18+x,18,19+x,22,18+x,30,15+x,35);r(e,11+x,20,3,12);r(e,7+x,24,11,3);r(h,12+x,21,1,9);r(t,8+x,17,2,2);r(t,17+x,30,2,2);
 }else if(id==='rune_golem'){
 // Asymmetric rune-carved rock guardian: no pot helmet, broad facets and split crystal spine.
 p(INK,26,28,38,29,42,36,44,43,39,44,28,44,25,38,19,41,17,44,6,44,4,41,9,35,13,29);p(s,28,31,37,31,40,36,42,42,30,42,28,37);p(m,12,32,20,31,23,36,19,40,16,42,7,42,10,37);p(l,12,33,18,33,20,36,14,38,9,38);r(h,10,40,5,1);r(m,32,40,7,1);
 p(INK,12,14,20,9,31,9,39,14,44,24,40,34,31,39,18,37,9,30,6,22);p(s,13,16,21,11,30,11,38,16,42,24,38,33,30,37,19,35,11,29,8,22);p(m,13,17,20,12,28,13,33,19,28,25,15,26,9,22);p(l,15,17,21,14,27,15,28,18,23,20,14,21);r(h,17,16,5,1);p(m,32,21,38,18,40,25,36,32,30,35,24,30);p(l,34,22,38,21,37,26,32,29,30,27);p(INK,19,25,27,23,32,28,28,34,20,33,16,29);p(e,20,27,26,25,29,28,26,32,21,31,18,29);r(t,22,27,3,2);r(s,24,26,1,5);
 // jagged crystal crest behind head
 p(INK,26,11,26,5,30,0,34,6,33,13,38,8,41,3,43,11,41,18,34,18);p(m,28,10,28,5,30,2,32,7,31,12);p(l,30,4,31,7,30,11,29,7);r(e,30,4,1,5);p(l,36,14,40,6,41,11,39,15);r(e,40,9,1,4);
 let x=-atk,y=dy;p(INK,8+x,13+y,14+x,6+y,23+x,5+y,29+x,10+y,29+x,17+y,24+x,23+y,14+x,24+y,6+x,19+y);p(m,10+x,14+y,15+x,8+y,23+x,7+y,27+x,11+y,27+x,17+y,23+x,21+y,15+x,22+y,8+x,18+y);p(l,11+x,13+y,15+x,9+y,22+x,8+y,24+x,11+y,20+x,14+y,10+x,16+y);r(h,15+x,10+y,5,1);p(INK,8+x,15+y,21+x,13+y,25+x,15+y,20+x,18+y,9+x,19+y);r(e,10+x,15+y,6,2);r(l,20+x,19+y,3,1);
 p(INK,9,23,14,22,18,28,16-atk,33,18-atk,38,11-atk,43,3-atk,41,1-atk,35,4,29);p(m,9,25,14,24,16,28,14-atk,33,16-atk,38,11-atk,41,5-atk,39,3-atk,35,6,29);p(l,8,26,13,25,14,28,10,31,5,32);p(s,7-atk,34,15-atk,35,14-atk,38,10-atk,40,5-atk,38);r(e,7-atk,35,5,1);r(e,9-atk,33,1,5);r(h,7,27,4,1);
 }else if(id==='void_imp'){
 // Fire frog: broad head, folded rear leg and ember throat.
 let x=-atk+hurt,y=dy;
 p(INK,19,22,30,17,39,20,45,29,43,38,36,44,23,44,18,39,9,43,3,42,3,37,11,31);
 p(s,22,24,30,19,38,22,43,29,41,37,35,42,24,42,20,37,11,41,5,40,6,37,13,32);
 p(m,22,25,29,21,35,23,39,30,34,35,25,37,18,33);p(l,26,24,30,23,35,25,35,28,28,29);p(m,29,34,36,30,40,34,37,39,28,41,24,39);r(h,32,35,4,2);r(t,31,40,7,1);
 p(INK,5+x,19+y,11+x,14+y,14+x,8+y,20+x,9+y,23+x,15+y,29+x,17+y,31+x,25+y,25+x,32+y,11+x,33+y,3+x,29+y,2+x,23+y);
 p(m,7+x,20+y,13+x,15+y,15+x,10+y,19+x,11+y,21+x,17+y,28+x,19+y,29+x,25+y,24+x,30+y,12+x,31+y,5+x,28+y,4+x,23+y);
 p(l,7+x,21+y,14+x,17+y,17+x,13+y,20+x,18+y,24+x,20+y,17+x,24+y,6+x,25+y);r(INK,11+x,17+y,7,5);r(e,12+x,18+y,5,3);r(INK,13+x,18+y,1,3);r(INK,4+x,26+y,18,2);p(t,7+x,28+y,20+x,28+y,24+x,31+y,18+x,36+y,9+x,34+y);r(h,12+x,30+y,6,2);
 p(INK,22,31,25,34,19-atk,39,17-atk,44,9-atk,44,8-atk,41,15-atk,37);p(m,22,33,23,35,17-atk,40,16-atk,42,10-atk,42,11-atk,40);r(t,12-atk,41,3,1);
 p(INK,28,20,28,13,32,8,34,14,38,11,38,21);p(l,30,19,30,14,32,11,33,17,36,14,36,20);r(e,32,17,2,3);
 }else if(id==='aether_warden'){
 // Wind ward keeper: floating fabric and two open prismatic shield plates.
 let y=dy,x=-atk;
 p(INK,19,21+y,31,19+y,37,27+y,43,38+y,33,36+y,26,43+y,19,37+y,10,42+y,14,31+y);
 p(s,20,23+y,30,21+y,35,28+y,40,36+y,32,34+y,26,40+y,20,35+y,13,39+y,16,31+y);p(m,23,23+y,28,23+y,32,30+y,26,37+y,23,33+y,17,36+y);p(l,23,24+y,25,24+y,24,32+y,19,35+y,21,28+y);p(t,29,28+y,32,31+y,29,35+y,27,36+y);p(l,33,33+y,38,35+y,32,33+y,27,39+y,28,35+y);
 p(INK,14,16+y,19,6+y,26,2+y,32,7+y,35,15+y,30,23+y,21,25+y,12,20+y);p(m,16,16+y,21,7+y,26,4+y,30,8+y,33,15+y,28,21+y,21,23+y,14,19+y);p(l,19,12+y,23,6+y,26,5+y,29,9+y,24,11+y,18,16+y);p(INK,15,16+y,24,13+y,28,16+y,25,20+y,18,21+y);r(e,17,16+y,6,2);r(h,24,7+y,2,2);
 p(INK,20,26+y,13+x,23+y,9+x,25+y,9+x,29+y,17,32+y,24,29+y);p(t,20,27+y,13+x,25+y,11+x,27+y,16,30+y,21,28+y);
 p(INK,4+x,9+y,9+x,5+y,14+x,12+y,12+x,20+y,7+x,23+y,2+x,17+y);p(m,5+x,10+y,9+x,8+y,12+x,13+y,10+x,19+y,7+x,21+y,4+x,17+y);p(h,6+x,12+y,9+x,10+y,10+x,14+y,7+x,18+y,5+x,16+y);r(e,7+x,13+y,1,4);
 p(INK,5+x,28+y,10+x,30+y,12+x,36+y,8+x,42+y,3+x,37+y,1+x,32+y);p(l,5+x,30+y,8+x,31+y,10+x,36+y,8+x,39+y,5+x,36+y,3+x,32+y);r(h,5+x,32+y,2,4);
 }else if(id==='obsidian_golem'){
 // Stone boar with an angular back, plated shoulders and prominent tusk.
 let x=-atk+hurt,y=dy;
 p(INK,20,24,28,16,37,15,44,23,46,32,42,39,43,44,34,44,30,38,22,38,20,44,13,44,12,38,13,31);
 p(s,22,25,29,18,37,17,42,24,44,32,40,38,41,42,35,42,32,36,23,36,18,42,15,42,14,38,15,31);p(m,24,24,30,19,36,19,40,24,37,29,28,31,21,28);p(l,27,23,31,20,36,21,38,24,33,26,26,26);p(m,36,31,42,28,42,35,37,38,32,35);r(l,35,32,4,2);p(INK,24,24,25,13,31,10,34,17,37,12,40,19,38,23);p(l,26,21,27,14,31,12,32,18,35,20);r(h,29,14,1,3);
 p(INK,9+x,21+y,15+x,14+y,22+x,15+y,28+x,22+y,26+x,31+y,19+x,37+y,8+x,36+y,2+x,31+y,2+x,25+y);p(m,10+x,22+y,16+x,16+y,21+x,17+y,26+x,22+y,24+x,30+y,18+x,35+y,9+x,34+y,4+x,30+y,4+x,26+y);p(l,11+x,22+y,16+x,18+y,20+x,18+y,22+x,22+y,16+x,26+y,8+x,26+y);p(INK,7+x,25+y,16+x,23+y,20+x,25+y,16+x,28+y,8+x,28+y);r(e,9+x,25+y,4,2);p(s,3+x,29+y,9+x,28+y,13+x,31+y,9+x,34+y,4+x,32+y);p(INK,10+x,32+y,4+x,34+y,1+x,30+y,1+x,37+y,5+x,39+y,13+x,35+y);p(t,10+x,33+y,5+x,36+y,2+x,34+y,3+x,37+y,6+x,37+y);r(h,5+x,36+y,2,1);
 p(INK,20,31,27,32,27,40,24,44,16,44,16,40);p(m,21,33,25,34,25,39,23,42,18,42,18,40);r(l,20,40,4,1);
 }else if(id==='chrono_sage'){
 // Hourglass sage; animated focus has a clearly different silhouette from the ward keeper.
 let x=-atk,y=dy;
 p(INK,17,19,31,19,36,28,39,40,33,44,18,44,10,40,13,29);p(s,19,21,30,21,34,29,37,39,32,42,19,42,12,39,15,29);p(m,21,22,27,23,29,33,26,42,20,42,16,39,18,31);p(l,21,24,23,24,22,36,19,39,20,29);p(t,31,29,34,33,35,39,32,40,30,34);r(t,25,30,2,7);r(h,25,32,1,3);
 p(INK,13,14+y,15,7+y,23,3+y,31,5+y,35,12+y,33,21+y,26,25+y,17,23+y,11,18+y);p(m,15,14+y,17,8+y,23,5+y,30,7+y,33,12+y,31,20+y,26,23+y,18,21+y,13,18+y);p(t,17,12+y,22,7+y,28,7+y,30,10+y,24,11+y,16,16+y);p(INK,14,15+y,24,13+y,29,16+y,27,21+y,18,22+y,13,19+y);r(e,16,16+y,4,2);p(l,16,19+y,24,18+y,27,20+y,24,23+y,21,28+y,18,23+y);r(h,22,21+y,2,3);
 p(INK,3+x,9,13+x,9,13+x,12,11+x,13,11+x,19,8+x,23,11+x,27,11+x,33,13+x,34,13+x,37,3+x,37,3+x,34,5+x,33,5+x,27,8+x,23,5+x,19,5+x,13,3+x,12);r(t,4+x,10,8,2);r(t,4+x,34,8,2);p(l,6+x,14,10+x,14,10+x,18,8+x,21,6+x,18);p(l,6+x,28,8+x,25,10+x,28,10+x,32,6+x,32);r(e,7+x,pose==='attack'?16:29,2,3);r(e,8+x,22,1,3);p(INK,20,27,13+x,25,11+x,27,13+x,30,21,32,24,29);p(m,20,28,14+x,27,13+x,28,17,30,21,30);
 }else if(id==='ward_scribe'){
 // Floating scroll spirit, ink ribbon cloak and a distinct open parchment focus.
 let x=-atk,y=dy;
 p(INK,23,12+y,32,12+y,39,19+y,41,28+y,37,36+y,43,40+y,32,39+y,25,44+y,20,37+y,12,42+y,15,32+y,10,26+y,16,19+y);
 p(s,24,14+y,31,14+y,37,20+y,39,28+y,35,36+y,39,38+y,31,37+y,25,41+y,21,35+y,15,38+y,17,31+y,12,26+y,18,20+y);p(m,23,17+y,30,16+y,35,22+y,32,29+y,25,32+y,24,38+y,20,32+y,17,26+y);p(l,21,19+y,26,18+y,29,20+y,25,25+y,20,27+y,18,25+y);p(t,29,32+y,33,31+y,31,36+y,27,39+y);r(h,24,20+y,4,1);
 p(INK,15,17+y,19,8+y,26,5+y,33,8+y,35,16+y,30,22+y,21,24+y,13,21+y);p(m,17,17+y,21,9+y,26,7+y,31,9+y,33,16+y,29,20+y,21,22+y,15,20+y);p(t,19,15+y,23,10+y,28,9+y,30,12+y,24,13+y,18,18+y);p(INK,15,17+y,24,14+y,28,17+y,25,20+y,18,21+y);r(e,17,17+y,5,2);
 p(INK,2+x,21+y,7+x,18+y,14+x,19+y,19+x,23+y,19+x,34+y,13+x,37+y,6+x,35+y,3+x,37+y,0+x,33+y,3+x,28+y);p(t,3+x,23+y,7+x,20+y,13+x,21+y,17+x,24+y,17+x,33+y,13+x,35+y,6+x,33+y,3+x,35+y,2+x,32+y,5+x,28+y);p(h,7+x,22+y,12+x,23+y,14+x,25+y,13+x,32+y,7+x,31+y);r(s,7+x,25+y,5,1);r(s,8+x,28+y,5,1);r(m,10+x,30+y,3,1);r(e,4+x,20+y,1,2);
 }else if(id==='ward_keeper'){
 // Furnace beetle: six readably separated legs, glowing elytra and pincers.
 let x=-atk+hurt,y=dy;
 for(const [a,b,c,d] of [[19,30,13,43],[27,32,25,44],[34,29,40,43]]){p(INK,a,b,a+5,b+2,c+3,d-2,c+4,d,c-2,d,c-3,d-4);p(m,a+1,b+2,a+3,b+3,c+1,d-2,c-1,d-2);}
 p(INK,13,18,22,9,34,10,42,17,46,28,41,36,27,39,17,35,11,28);p(s,15,19,23,11,33,12,40,18,44,28,39,34,27,37,18,33,13,28);p(m,17,19,24,13,33,14,39,19,40,24,31,27,19,25);p(l,23,14,30,14,34,16,32,18,23,19,19,21);p(m,31,29,40,26,42,29,38,33,29,35,23,33);p(INK,19,24,30,21,42,22,43,25,30,24,19,28);r(e,23,24,4,1);r(e,31,22,4,1);r(h,35,23,2,1);r(t,31,32,5,1);
 p(INK,6+x,22+y,12+x,17+y,20+x,19+y,24+x,26+y,21+x,33+y,13+x,37+y,5+x,34+y,2+x,29+y);p(m,7+x,23+y,13+x,19+y,19+x,21+y,22+x,26+y,19+x,32+y,13+x,35+y,6+x,32+y,4+x,29+y);p(l,9+x,22+y,13+x,21+y,18+x,23+y,13+x,26+y,7+x,26+y);r(INK,6+x,27+y,10,4);r(e,7+x,28+y,5,2);p(INK,8+x,31+y,4+x,32+y,0+x,29+y,0+x,35+y,4+x,39+y,12+x,36+y);p(t,7+x,33+y,4+x,35+y,1+x,33+y,3+x,37+y,6+x,37+y);p(INK,12+x,19+y,6+x,13+y,2+x,15+y,2+x,17+y,7+x,17+y,11+x,23+y);r(h,4+x,15+y,2,1);
 }else if(id==='rune_ram'){
 // Stone ram: curled horn, bulky shoulders and narrow hooves.
 let x=-atk+hurt,y=dy;
 p(INK,18,24,25,16,37,17,44,23,46,32,40,38,41,44,34,44,33,36,24,37,22,44,15,44,14,40,16,32);p(s,20,25,26,18,36,19,42,24,44,32,38,37,39,42,35,42,35,34,23,35,20,42,17,42,16,40,18,32);p(m,22,25,27,20,36,21,40,25,37,31,27,33,20,30);p(l,27,21,33,22,36,25,30,27,25,26);p(INK,26,28,31,24,35,28,31,33,27,31);p(e,28,28,31,26,33,28,31,31);r(h,30,28,2,1);
 p(INK,6+x,18+y,12+x,13+y,22+x,15+y,26+x,22+y,24+x,31+y,17+x,36+y,8+x,35+y,2+x,31+y,2+x,24+y);p(m,7+x,20+y,13+x,15+y,21+x,17+y,24+x,22+y,22+x,30+y,17+x,34+y,9+x,33+y,4+x,30+y,4+x,25+y);p(l,7+x,23+y,13+x,19+y,17+x,21+y,16+x,26+y,6+x,28+y);r(INK,6+x,26+y,8,3);r(e,7+x,26+y,4,2);p(s,4+x,30+y,12+x,29+y,16+x,32+y,11+x,34+y,5+x,32+y);
 p(INK,9+x,18+y,8+x,11+y,13+x,5+y,22+x,4+y,29+x,10+y,31+x,19+y,27+x,25+y,20+x,27+y,14+x,22+y,15+x,16+y,21+x,13+y,25+x,17+y,22+x,21+y,20+x,18+y,18+x,20+y,22+x,23+y,26+x,20+y,26+x,13+y,21+x,9+y,16+x,10+y,13+x,17+y);
 p(t,10+x,17+y,10+x,11+y,14+x,7+y,21+x,6+y,27+x,11+y,29+x,19+y,26+x,23+y,21+x,25+y,16+x,21+y,17+x,17+y,21+x,15+y,23+x,17+y,21+x,19+y,19+x,18+y,18+x,21+y,22+x,24+y,27+x,21+y,28+x,13+y,22+x,8+y,15+x,9+y,12+x,15+y);r(h,14+x,8+y,5,1);r(l,26+x,15+y,1,5);p(INK,21,33,27,34,25,40,25,44,17,44,17,41);p(m,22,35,25,35,23,40,23,42,19,42,19,40);r(h,20,41,3,1);
 }else if(id==='ink_ray'){
 // Left-facing manta ray in a three-quarter swimming pose. One continuous diamond-shaped disc,
 // broad swept pectoral fins, paired cephalic lobes and a slender whip tail.
 let y=dy,x=-atk+hurt,f=pose==='idle'?[0,2,-2][step%3]:Math.round(atk/2);
 const q=(c,...v)=>p(c,...v.map((n,i)=>clamp(n+(i%2?y:x),0,i%2?47:47)));
 const b=(c,a,d,w,h)=>r(c,a+x,d+y,w,h);
 // Long tapering whip, attached to the rear of the flattened disc.
 q(INK,29,24,34,24,38,27,41,29,45,28,47,25,47,28,45,31,41,32,37,30,33,28,28,28);
 q(m,30,25,34,25,38,28,41,30,45,29,46,27,46,29,44,30,41,31,37,29,33,27,30,27);
 b(l,34,26,2,1);b(t,45,28,1,1);
 // Far wing: sweeping triangular leading edge, pointed tip, curved trailing margin.
 q(INK,8,22,13,17,21,11,30,6-f,35,6-f,31,11-f,28,16-f,29,20,34,24,30,28,22,29,15,26);
 q(s,11,22,15,18,22,12,31,8-f,32,8-f,29,13-f,26,17-f,28,21,32,24,29,26,22,27,15,25);
 q(m,14,21,21,15,30,9-f,26,15-f,24,19,27,22,23,24,18,25);
 q(l,18,19,23,14,29,10-f,25,15-f,22,20,19,21);
 // The near fin grows from the same body rather than looking like a separate vertical wing.
 q(INK,3,22,8,20,14,20,20,19,26,20,32,24,34,27,29,30,26,33,27,39+f,31,43+f,23,41+f,17,36+f,12,32,6,29,3,28,1,30,0,27,1,24);
 q(m,4,23,9,21,14,22,20,21,26,22,31,25,32,27,28,29,24,33,25,38+f,28,41+f,23,39+f,18,34+f,12,30,7,28,4,27,2,28,2,25);
 q(l,7,23,13,23,19,22,25,23,29,25,26,27,20,27,14,26,9,25,5,26);
 q(h,11,23,17,22,22,23,19,24,13,24);
 q(s,10,29,15,27,21,28,27,28,24,31,22,34+f,25,38+f,27,40+f,22,38+f,16,33+f);
 q(l,13,29,18,29,21,31,22,35+f,25,38+f,20,35+f,17,32);q(t,20,34+f,22,35+f,24,38+f,22,37+f);
 // Flattened head, lateral eyes and subtle paired lobes framing its mouth.
 q(INK,2,22,4,21,7,22,6,24,3,24);q(l,2,22,4,22,5,23,3,23);
 b(INK,5,24,5,3);b(e,6,24,2,1);b(t,8,25,1,1);
 b(s,2,26,4,1);b(h,10,27,3,1);b(t,24,26,2,1);
 }else if(id==='prism_crab'){
 // Low armored crustacean; far and near legs with separated dark joints.
 let x=-atk,y=dy;
 for(const [a,b,c,d] of [[19,26,9,41],[26,28,23,43],[35,26,43,42]]){p(INK,a,b,a+5,b+2,c+3,d-7,c+4,d,c-2,d,c-3,d-7);p(s,a+1,b+2,a+3,b+3,c+1,d-6,c+2,d-2,c,d-2,c-1,d-6);}
 p(INK,12,20,17,11,29,8,40,13,46,23,44,31,37,35,20,35,11,29);
 p(s,14,21,19,13,29,10,38,15,44,23,42,30,36,33,21,33,13,28);p(m,16,21,21,14,29,12,37,16,42,23,35,27,22,27);p(l,22,15,29,13,35,16,30,21,19,23);p(h,26,14,30,14,32,16,25,17);
 p(INK,20,16,23,8,29,2,33,8,32,15,26,21);p(t,22,15,24,9,29,4,31,9,30,14,26,19);p(h,24,10,29,5,28,12,25,16);r(e,27,8,1,4);
 p(INK,33,18,37,9,43,5,45,15,41,22);p(l,35,17,39,10,42,8,43,15,40,20);p(h,39,11,42,9,41,15,38,17);
 p(INK,16,27,21,25,37,26,38,31,33,34,20,33);p(m,19,28,23,27,35,28,35,31,29,32,21,31);r(e,20,28,4,2);r(e,28,28,4,2);r(INK,22,29,1,1);r(INK,30,29,1,1);
 // Forward claw opens on attack, second claw anchors the silhouette.
 p(INK,16,26,11+x,23-y,7+x,17-y,10+x,13-y,16+x,14-y,20+x,20-y,20,28,16,33,9+x,32,6+x,27);p(m,16,27,12+x,25-y,9+x,17-y,12+x,15-y,15+x,16-y,18+x,21-y,18,28,15,31,10+x,30,8+x,27);p(l,11+x,17-y,13+x,16-y,17+x,20-y,15+x,23-y,11+x,21-y);r(h,12+x,17-y,2,2);
 p(INK,10+x,32,4+x,29,1+x,32,0,38,5+x,41,12+x,38,16,33,12,30);p(m,9+x,33,5+x,31,2,33,2,37,5+x,39,11+x,36,14,33);p(l,3,33,7+x,33,11+x,34,6+x,36,3,35);
 for(const [a,c] of [[21,17],[31,30],[40,45]]){p(INK,a,32,a+5,31,c+1,37,c+1,42,c-3,44,c-4,42,c-3,37);p(m,a+1,33,a+3,33,c-1,38,c-1,42,c-2,42,c-2,38);r(l,a+1,33,2,1);}
 }else if(id==='lantern_wisp'){
 // A haunted brass lantern suspended in a tapering spirit, not a humanoid mage.
 let y=dy,x=-atk+hurt, f=pose==='idle'?step%3:0;
 p(INK,18,19+y,28,15+y,39,22+y,44,30+y,38,35+y,42,40+y,34,38+y,29,43+y,23,40+y,17,43+y,19,34+y,10,30+y);
 p(s,20,21+y,28,17+y,37,23+y,41,30+y,36,35+y,39,38+y,33,36+y,29,41+y,24,38+y,20,40+y,21,33+y,13,29+y);p(m,29,19+y,36,24+y,38,29+y,32,33+y,31,38+y,27,34+y,28,27+y);p(t,32,22+y,36,25+y,35,29+y,30,32+y,32,27+y);r(h,34,25+y,2,1);
 // Crown, hook and oxidized brass lamp ribs.
 p(INK,11+x,8+y,14+x,4+y,23+x,2+y,30+x,7+y,30+x,13+y,26+x,15+y,25+x,10+y,22+x,7+y,17+x,8+y,15+x,13+y);p(l,13+x,8+y,16+x,5+y,22+x,4+y,28+x,8+y,28+x,12+y,26+x,10+y,23+x,6+y,17+x,7+y,15+x,11+y);r(h,19+x,5+y,4,1);
 p(INK,9+x,13+y,15+x,9+y,25+x,9+y,32+x,13+y,30+x,17+y,32+x,32+y,28+x,36+y,12+x,36+y,7+x,32+y,9+x,17+y);p(l,10+x,14+y,16+x,11+y,24+x,11+y,30+x,14+y,28+x,16+y,30+x,31+y,27+x,34+y,13+x,34+y,9+x,31+y,11+x,16+y);p(s,13+x,16+y,27+x,16+y,28+x,29+y,25+x,31+y,14+x,31+y,11+x,29+y);
 p('#8b4d55',15+x,19+y,23+x,17+y,26+x,22+y,25+x,29+y,16+x,29+y,13+x,25+y);p(l,16+x,28+y,14+x,24+y,18+x,20+y-f,19+x,23+y,23+x,18+y-f,25+x,25+y,23+x,29+y);p(e,18+x,28+y,17+x,25+y,20+x,22+y,22+x,25+y,22+x,28+y);
 r(m,12+x,16+y,2,15);r(h,13+x,17+y,1,12);r(m,25+x,16+y,2,15);r(h,25+x,18+y,1,11);r(l,18+x,16+y,2,16);r(h,18+x,17+y,1,12);r(h,12+x,13+y,14,1);r(h,14+x,32+y,12,1);r(e,19+x,12+y,2,1);
 }else if(id==='scroll_moth'){
 // Archive moth with parchment wings, dark scalloped borders and readable rune bands.
 let y=dy,x=-atk+hurt,f=pose==='idle'?[0,3,-2][step%3]:atk;
 p(INK,20,26+y,21,13+y,27,5+y-f,38,2+y-f,45,6+y-f,46,14+y,38,24+y,45,29+y,42,36+y,31,36+y,22,31+y);p(m,22,25+y,23,14+y,28,7+y-f,37,4+y-f,43,8+y-f,44,13+y,36,24+y,43,29+y,40,34+y,32,34+y,24,30+y);p(l,24,21+y,27,10+y-f,36,6+y-f,41,9+y-f,40,14+y,34,21+y);p(h,30,9+y-f,36,7+y-f,38,8+y-f,35,12+y-f,29,13+y);p(s,29,23+y,36,25+y,40,29+y,37,32+y,32,31+y,26,28+y);r(t,33,17+y,5,1);r(t,35,15+y,1,5);
 // Near wing is more luminous and hangs lower than the far wing.
 p(INK,18,25+y,10,19+y,5,11+y+f,7,4+y+f,15,2+y+f,23,6+y+f,30,16+y,29,23+y,24,26+y,30,29+y,30,37+y+f,24,43+y+f,15,42+y+f,9,36+y,11,30+y);
 p(l,18,24+y,12,18+y,7,11+y+f,9,6+y+f,15,4+y+f,22,8+y+f,28,16+y,27,22+y,22,26+y,28,30+y,28,36+y+f,23,41+y+f,16,40+y+f,11,36+y,13,31+y);p(h,10,8+y+f,15,6+y+f,21,9+y+f,25,15+y,20,20+y,15,16+y,10,12+y+f);p(m,13,32+y,18,28+y,24,30+y,26,35+y+f,22,39+y+f,16,38+y+f);p(h,15,33+y,20,31+y,23,33+y,21,36+y+f,16,36+y+f);
 p(s,8,11+y+f,15,14+y,20,20+y,23,23+y,20,24+y,13,19+y);r(s,12,9+y+f,2,5);r(s,10,11+y+f,6,1);r(m,18,13+y,4,1);r(m,19,15+y,4,1);r(s,16,33+y,7,1);r(t,18,31+y,2,4);r(s,24,17+y,2,3);
 // Body and antennae overlay the wings.
 p(INK,9+x,24+y,15+x,20+y,22,23+y,29,28+y,35,32+y,29,35+y,20,31+y,12+x,31+y,6+x,28+y);p(s,10+x,25+y,15+x,22+y,21,25+y,28,30+y,32,32+y,28,33+y,19,29+y,12+x,29+y,8+x,28+y);p(m,12+x,23+y,16+x,23+y,20,26+y,17,28+y,10+x,27+y);r(e,9+x,25+y,3,2);r(INK,8+x,21+y,1,3);r(t,6+x,18+y,1,4);r(INK,5+x,16+y,2,2);r(s,4+x,24+y,3,1);r(h,21,26+y,2,1);
 }else if(id==='chain_hound'){
 // Chained hound, articulated collar, narrow muzzle and long forelegs.
 let x=-atk+hurt,y=dy,f=pose==='idle'?step%3:0;
 p(INK,34,19,40,16-f,44,10-f,46,13-f,45,19,42,24,36,28);p(s,35,21,40,18-f,44,13-f,44,18,40,24,36,25);p(l,40,19,43,15-f,43,19,40,22);
 p(INK,29,29,39,26,43,32,38,39,40,42,39,44,32,44,29,40,33,34,25,35);p(s,31,30,38,28,40,32,36,38,37,42,34,42,32,39,35,33,28,33);p(m,34,30,38,29,38,33,35,36);
 p(INK,13,18,21,13,34,15,42,21,43,28,35,33,24,31,20,37,21,42,20,44,12,44,11,41,14,35,11,27);p(m,15,19,22,15,33,17,40,22,41,27,34,31,23,29,18,37,19,42,14,42,13,41,16,35,13,27);p(l,18,19,23,17,32,19,36,22,29,25,20,24,16,27);p(h,22,18,29,19,32,21,26,22,21,21);p(s,28,26,38,24,39,27,33,30,25,28);p(s,18,29,22,26,23,29,18,35,17,41,14,41);
 p(INK,30,30,37,31,35,39,38,42,37,44,28,44,27,41,31,37);p(m,32,32,35,33,33,39,35,42,30,42,29,41,33,37);r(l,31,40,3,1);
 p(INK,6+x,16+y,6+x,8+y,10+x,5+y,16+x,12+y,19+x,7+y,22+x,10+y,22+x,18+y,26,23+y,21,29+y,14,30+y,7+x,26+y,1+x,27+y,0,23+y,4+x,20+y);
 p(m,7+x,16+y,8+x,9+y,10+x,7+y,16+x,14+y,19+x,10+y,20+x,11+y,20+x,18+y,24,23+y,20,27+y,14,28+y,7+x,24+y,2,25+y,2,23+y,6+x,20+y);p(l,8+x,16+y,12+x,14+y,17+x,16+y,19+x,20+y,13+x,21+y,6+x,21+y);p(h,9+x,16+y,13+x,15+y,12+x,18+y,8+x,19+y);p(s,11+x,9+y,14+x,14+y,10+x,13+y);r(INK,6+x,19+y,6,3);r(e,7+x,19+y,3,2);r(INK,1,23+y,6,2);r(h,6+x,24+y,2,2);
 // Collar and separate linked chain along the flank.
 p(INK,19,17,24,18,27,27,23,31,19,30,17,23);p(t,20,18,23,19,25,26,22,29,20,28,19,23);r(h,20,20,2,5);r(s,23,25,2,2);r(e,21,28,2,2);
 for(const [a,b] of [[25,22],[29,23],[33,23],[36,25],[38,29]]){r(INK,a,b,5,4);r(t,a+1,b,3,1);r(t,a,b+1,1,2);r(t,a+4,b+1,1,2);r(l,a+1,b+3,3,1);r(h,a+1,b,1,1);}
 }else if(id==='prism_watcher'){
 // Floor-11 prism custodian: ceremonial faceted crown, enamel armor, split mantle and prism staff.
 // More authored facets and ornament than regular mobs; still below Major Boss scale.
 let y=dy,x=-Math.min(2,atk)+hurt,f=pose==='idle'?step%3:Math.min(2,atk);
 const dark='#201d33',metal='#867aa7',silver='#b7b0d2',gold='#c4ad83',glint='#f6e4b5',teal='#478caa',ice='#b8f7ed';
 const q=(c,...v)=>p(c,...v.map((n,i)=>n+(i%2?y:0)));
 // Dark floating mantle, tapered split hem and inset textile folds.
 q(INK,17,17,29,17,36,22,40,35,37,42,33,44,27,40,24,44,20,42,15,44,10,40,13,28);
 q(s,18,19,29,19,34,24,38,35,35,40,33,42,27,38,24,42,20,40,15,42,12,39,15,29);
 q('#39334f',18,25,23,26,22,35,19,40,15,40,17,33);q(m,28,24,34,26,36,35,33,40,29,36,31,31);q(m,22,30,26,31,27,38,24,41,21,39);
 q(m,13,39,16,40,19,38,20,39,16,42);q(m,30,37,33,40,35,39,34,42,31,40);
 // Crown-like crystalline vanes behind shoulders. Distinct light and dark facets, thin gold sockets.
 for(const [a,b,c,d] of [[32,16,35,2],[37,23,43,8],[37,31,46,23]]){
  p(INK,a-3,b,a-1,b-5,c,d,c+2,d+5,c+1,d+11,a+4,b+4,a,b+7);
  p(m,a-1,b,a+1,b-4,c,d+2,c+1,d+7,c,d+11,a+2,b+4,a,b+5);
  p(l,a+1,b-3,c,d+3,c,d+8,a+1,b+2);p(s,a+1,b+2,c,d+8,c,d+11,a+2,b+4);
  r(h,c,d+3,1,4);r(t,a+1,b,1,2);p(gold,a-1,b+2,a+3,b+2,a+2,b+5,a,b+5);
 }
 // Long neck joint and chest armor with clear enamel panels.
 q(INK,17,17,27,16,34,21,36,29,29,35,24,39,19,35,14,29,14,23);
 q(m,18,19,27,18,32,22,34,28,28,33,24,37,20,33,16,28,16,23);
 q(l,18,20,23,19,27,21,25,25,20,28,16,25);q(h,18,21,23,20,24,21,20,23,17,23);
 q(s,28,21,32,23,33,27,28,31,25,32,26,26);q(metal,29,23,32,24,31,27,28,28);
 q(gold,17,28,20,30,24,33,28,31,32,28,31,30,24,35,19,32);q(glint,20,30,23,32,25,32,24,33);
 // Floating core inset in a dark beveled socket.
 q(INK,23,23,28,26,28,31,24,34,20,31,20,27);q(teal,23,25,27,27,27,30,24,32,21,30,21,27);q(t,23,26,26,27,25,30,23,31,22,29);q(ice,23,26,24,26,25,28,23,30,22,28);
 // Near pauldron and articulated arm, foreground hand extended left.
 q(INK,13,20,17,19,21,23,18,28,13,29,9,33,5+x,32,5+x,28,10,24);
 q(m,13,21,17,21,19,23,17,26,13,27,8,31,7+x,31,7+x,28,11,25);
 q(l,12,22,16,21,18,23,15,25,11,25);q(silver,13,22,16,22,15,23,12,24);q(gold,11,25,15,26,13,28,11,27);
 q(s,8,27,11,26,10,29,8,30,7+x,29);q(t,6+x,29,8,28,9,29,8,31,6+x,31);
 // Far shoulder and floating gauntlet.
 q(INK,32,20,38,20,42,24,42,29,39,33,34,31,31,26);
 q(m,33,22,37,22,40,25,40,28,38,31,35,29,33,25);q(l,34,23,37,23,39,25,37,27,34,26);q(h,35,23,38,24,37,25,34,25);q(gold,35,28,38,29,40,27,39,30,37,31);q(s,35,26,37,27,37,28,35,28);
 // Helmet: angular priestly crown, split visor and luminous narrow eye facing left.
 const head=(c,...v)=>p(c,...v.map((n,i)=>n+(i%2?y:x)));
 head(INK,13,14,15,8,18,6,18,2,21,5,24,1,26,5,30,4,29,8,33,13,31,18,26,23,19,22,13,19,10,17);
 head(m,14,14,17,9,21,7,24,3,26,7,28,6,28,9,31,13,29,17,25,21,20,20,15,18,12,17);
 head(l,15,13,18,9,24,5,24,9,21,13,15,15);head(h,18,10,23,6,22,9,19,11,16,13);
 head(s,27,9,30,13,29,17,25,20,23,18,25,13);head(metal,26,10,28,11,27,14,25,15);
 head(gold,15,8,18,6,18,3,20,6,24,2,25,5,22,8,18,10);head(glint,18,7,20,6,22,5,21,7,19,8);
 head(INK,12,15,17,13,23,13,25,15,21,18,15,18,12,17);
 head(teal,13,15,17,14,22,14,23,15,21,16,15,17);r(ice,16+x,14+y,5,1);r(e,16+x,15+y,2,1);
 head(l,15,18,20,18,23,17,22,20,19,21,16,20);r(silver,18+x,19+y,3,1);
 // Ritual staff: dark shaft, metal collars, a faceted suspended prism in a pronged cradle.
 p(INK,4+x,16,8+x,16,9+x,37+y,7+x,43,4+x,42,5+x,34+y);
 p(gold,6+x,17,7+x,17,8+x,37+y,7+x,41,6+x,40,6+x,33+y);r(glint,6+x,20,1,8);r(metal,5+x,35+y,3,2);
 p(INK,2+x,17-f,1+x,11-f,4+x,5-f,7+x,2-f,11+x,6-f,13+x,12-f,11+x,17-f,7+x,20-f);
 p(gold,3+x,16-f,2+x,11-f,4+x,7-f,5+x,9-f,4+x,13-f,6+x,17-f,7+x,19-f,10+x,16-f,11+x,12-f,10+x,9-f,11+x,8-f,12+x,12-f,10+x,17-f,7+x,19-f);
 p(t,5+x,10-f,7+x,4-f,10+x,10-f,9+x,14-f,7+x,17-f,5+x,14-f);p(teal,7+x,6-f,9+x,10-f,8+x,14-f,7+x,16-f,7+x,11-f);p(ice,6+x,10-f,7+x,6-f,7+x,11-f,6+x,13-f);r(e,6+x,10-f,1,2);
 // Tiny inlaid accents (not random texture).
 r(gold,17,36+y,2,1);r(gold,30,36+y,2,1);r(silver,22,39+y,1,2);r(t,32,18,2,1);
 }else if(a.family==='imp'){
 // curled tail, back leg, hunched chest, horns, claws. Face left.
 p(INK,29,32,36,30,39,24,37,18,40,16,43,20,43,27,39,35,30,39);p(s,30,33,36,32,40,27,41,21,42,23,41,29,37,35,30,37);p(l,38,20,40,17,42,20,41,23);
 p(INK,23,32,33,31,34,39,38,41,38,44,27,44,26,39,20,40);p(s,27,34,32,34,32,40,36,42,28,42);r(l,29,40,4,1);
 p(INK,15,25,29,24,34,29,32,38,24,41,22,44,11,44,10,41,15,37);p(m,17,26,28,26,32,30,30,36,22,39,20,42,12,42,17,37);p(l,18,27,24,28,23,34,19,37,15,36);p(s,26,29,30,30,29,36,24,38,23,34);
 let x=-atk+hurt,y=dy;
 p(INK,9+x,13+y,8+x,7+y,11+x,3+y,13+x,10+y,20+x,10+y,26+x,4+y,28+x,9+y,27+x,15+y,31+x,19+y,28+x,25+y,19+x,28+y,9+x,24+y,5+x,21+y,7+x,17+y);
 p(t,10+x,7+y,11+x,5+y,12+x,12+y,10+x,13+y);p(t,24+x,10+y,26+x,6+y,27+x,10+y,25+x,15+y);
 p(m,10+x,13+y,20+x,12+y,27+x,16+y,29+x,21+y,25+x,24+y,18+x,26+y,9+x,23+y,7+x,21+y);p(l,11+x,14+y,20+x,14+y,25+x,17+y,18+x,19+y,9+x,18+y);p(h,12+x,14+y,18+x,14+y,16+x,16+y,11+x,16+y);p(s,18+x,21+y,27+x,20+y,25+x,24+y,18+x,25+y,10+x,23+y);
 r(INK,8+x,18+y,9,4);r(e,9+x,18+y,5,2);r(INK,11+x,18+y,1,2);r(t,10+x,23+y,4,1);
 p(INK,16,28,12-atk,30,5-atk,34,4-atk,38,10-atk,39,19,34,23,30);p(l,16,29,12-atk,32,7-atk,35,6-atk,37,10-atk,37,18,33,20,30);r(t,5-atk,36,2,1);
 if(id==='ember_imp'){p(INK,16+x,12+y,15+x,6+y,20+x,1+y,21+x,7+y,24+x,12+y);p(l,17+x,11+y,17+x,7+y,20+x,3+y,20+x,8+y,22+x,11+y);r(e,19+x,7+y,1,4);}else{r(s,23+x,16+y,2,2);r(s,25+x,18+y,2,1);r(s,23,32,2,2);}
 }else if(a.family==='slime'){
 let k=dy*2-atk; p(INK,5,42,4,39,8,32+k,13,28+k,22,26+k,32,28+k,40,33+k,43,39,41,43,34,44,13,44);p(s,6,40,10,33+k,15,30+k,23,28+k,31,30+k,39,35+k,41,40,35,43,13,43);p(m,8,38,12,32+k,22,29+k,31,31+k,37,35+k,35,40,26,42,13,41);p(l,13,32+k,22,30+k,29,32+k,24,35+k,13,36+k,10,38);r(h,15,32+k,6,1);r(t,13,34+k,3,1);r(INK,10,36,4,4);r(e,11,36,2,2);r(INK,19,36,4,4);r(e,20,36,2,2);r(INK,14,41,5,1);r(l,31,39,5,1);
 }
 // Optional fusion motifs, separate from the approved base slime.
 if(id==='swarm'&&variant==='magma'){p(INK,23,29+dy*2-atk,26,26+dy*2-atk,30,30+dy*2-atk,28,36);r(e,26,31,1,3);r(e,28,34,3,1);}
 if(id==='swarm'&&variant==='hail'){let k=dy*2-atk;p(INK,23,29+k,26,21+k,30,28+k,29,34+k);p(h,25,29+k,26,23+k,28,28+k,27,32+k);r(e,26,26+k,1,3);}
 if(id==='swarm'&&variant==='plasma'){r(e,28,34,2,2);r(h,30,33,2,1);r(e,32,35,2,1);r(h,34,34,1,2);}
 // Crop by true opaque bounds, preserving native baseline and horizontal pivot.
 const runs=[];let minX=W,maxX=0,minY=H,maxY=0;for(let y=0;y<H;y++){for(let x=0;x<W;){let c=g[y][x];if(!c){x++;continue;}let start=x;while(x<W&&g[y][x]===c)x++;runs.push([start,y,x-start,c]);minX=Math.min(minX,start);maxX=Math.max(maxX,x-1);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}}
 return {runs,bounds:{minX,maxX,minY,maxY},density};
}
function drawEnemyV2(ctx,id,x,baseline,{pose='idle',time=0,progress=0,reducedMotion=false,scale=1,variant=null}={}){
 id=Object.hasOwn(DRAW_ID_ALIASES,id)?DRAW_ID_ALIASES[id]:id;
 const a=profiles[id];if(!a||!['idle','attack','hurt'].includes(pose))return false;
 let step=reducedMotion?0:pose==='idle'?Math.floor(time/360)%3:Math.round(clamp(progress,0,1)*8);variant=id==='swarm'&&Object.hasOwn(SLIME_VARIANTS,variant)?variant:null;let key=id+':'+pose+':'+step+(variant?':'+variant:'');let art=cache.get(key);if(!art){art=build(id,step,pose,variant);cache.set(key,art);}let base=cache.get(id+':idle:0');if(!base){base=build(id,0,'idle');cache.set(id+':idle:0',base);}
 const den=base.density||1,sc=scale*a.height/(PY*den-base.bounds.minY),left=Math.round(x-PX*den*sc),top=Math.round(baseline-PY*den*sc);for(const [u,v,n,c] of art.runs){let x0=Math.round(left+u*sc),x1=Math.round(left+(u+n)*sc),y0=Math.round(top+v*sc),y1=Math.round(top+(v+1)*sc);if(x1>x0&&y1>y0){ctx.fillStyle=c;ctx.fillRect(x0,y0,x1-x0,y1-y0);}}
 return true;
}


export { ENEMY_ART_V2, ENEMY_ID_RENAMES, drawEnemyV2 };
