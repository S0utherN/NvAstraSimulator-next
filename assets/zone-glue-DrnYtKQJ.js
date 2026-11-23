import{cU as D,cV as nt,cW as w,cX as ze,cY as Oe,cZ as it,c_ as st,c$ as ot,d0 as C,d1 as Ge,d2 as ut,cG as ct,d3 as ft,b as ht,bw as lt,d4 as mt}from"./boot-0BZuZZcx.js";import{F as oe}from"./app-BPL3o_R8.js";import"./vendor-DHsdD_W9.js";import"./hosting-BXJplvra.js";import"./error-log-CiigfXnx.js";function dt(t){return t.pinned!==null?t.pinned>>>0:t.automated||t.reducedMotion?0:t.random()>>>0}function pt(){try{const t=new Uint32Array(1);return crypto.getRandomValues(t),t[0]}catch{return Math.floor(Math.random()*4294967296)>>>0}}const H=6371,Et=78,Xe=110,He=1/Math.tan(Et*Math.PI/180),Y=84,We=300,fe=.5,y=81,N=9,bt=Math.round((We-Y)/fe)+2;function ue(t){return t|=0,t=Math.imul(t^t>>>16,2146121005),t=Math.imul(t^t>>>15,2221713035),(t^t>>>16)>>>0}function Ve(t,e,r){return ue(Math.imul(t|0,2654435761)^ue(Math.imul(e|0,2246822507)^(r|0)))}const he=t=>t/4294967296,A=(t,e)=>he(ue(t+Math.imul(e,1663821227)|0)),W=t=>t<=0?0:t>=1?1:t*t*(3-2*t),xt=t=>Math.exp(-.5*t*t),pe=(t,e,r)=>t+(e-t)*r,O=(t,e)=>t[0]+(t[1]-t[0])*e,$e=(t,e,r)=>t<e?e:t>r?r:t,vt=20,Rt=.25,Tt=6,At=61,_t=(t,e)=>{const r=H*e,a=t*(2*H+t);return a/(r+Math.sqrt(r*r+a))},Ft=t=>new Float32Array(t*y*2).fill(1),Ee=[116,109,102,96],be=[30,26,22,18],St=3.5;function yt(t){const e=$e(t,0,1)*3,r=Math.min(2,Math.floor(e)),a=e-r;return{peak:pe(Ee[r],Ee[r+1],a),up:pe(be[r],be[r+1],a),lo:St}}const Mt=t=>1/(1+Math.exp(-(t-101)/2.5)),wt=t=>1-W((t-(We-30))/30),xe=2.2,ve=4.5,Re=1.6,Te=Math.sqrt(Math.PI/2);function Pt(t,e,r){const a=t-e.peak,n=a>=0?Math.exp(-a/e.up):Math.exp(-.5*(a/xe)**2),s=a>=0?Math.exp(-.5*(a/ve)**2):Math.exp(-.5*(a/Re)**2);return(1-r)*n+r*(xe*Te+e.up)/((Re+ve)*Te)*s}const Ae=20,Bt=120,Ct=t=>$e(.3+.6*t,.3,.85),Nt=.8;function Ut(t,e,r){const a=t-(e.peak+1+12*r*r);return a<=0?0:(1-Math.exp(-a/(6+8*r)))*Math.exp(-a/(Ae+(Bt-Ae)*r))}let Q=null;function kt(){if(Q)return Q;const t=bt,e=[new Float32Array(y*t),new Float32Array(y*t)],r=[new Float32Array(y*N*t),new Float32Array(y*N*t)];for(let a=0;a<y;a++){const n=a/(y-1),s=yt(n),o=Ct(n);s.up*=Nt;for(let i=0;i<t;i++){const u=Y+i*fe,f=wt(u),c=Mt(u),h=Pt(u,s,o)*f;e[0][a*t+i]=h,e[1][a*t+i]=h*c;for(let l=0;l<N;l++){const d=Ut(u,s,l/(N-1))*f,p=(a*N+l)*t+i;r[0][p]=d,r[1][p]=d*c}}}return Q={n:t,low:e,ray:r,nlam:N}}const Dt=1;function Lt(t,e,r,a,n){const s=t.pulse5,o=[];if(s==null)return o;const i=Math.ceil((360/s.vz[0]+3)/s.P)+1;for(let u=Math.floor(e/s.P)-i;u<=Math.floor(e/s.P)+1;u++)for(let f=Math.floor((a-500)/s.cell);f<=Math.floor((n+500)/s.cell);f++){const c=Ve(f,u,7331+101*r);he(c)>=s.prob||o.push({t0:(u+.8*A(c,1))*s.P,vz:O(s.vz,A(c,2)),amp:s.amp*(.6+.4*A(c,3)),xc:(f+A(c,4))*s.cell,w:O(s.w,A(c,5)),lag:(A(c,6)<.5?-1:1)*O(s.lag,A(c,7))/100})}return o}const ge=70,qe=.25,V=1401;function It(t){const e=kt(),r=e.n,a=new Float32Array(V),n=t.pulse5;if(!n)return a;const s=Math.round(t.hard0*(y-1)),o=e.low[0],i=e.ray[0],u=(s*N+3)*r;let f=0;for(let c=0;c<r;c++)f+=o[s*r+c]+.15*i[u+c];for(let c=0;c<V;c++){const h=ge+c*qe;let l=0;for(let d=0;d<r;d++){const p=Y+d*fe;l+=(o[s*r+d]+.15*i[u+d])*xt((p-h)/n.sig)}a[c]=l/f}return a}function _e(t,e,r,a,n,s=16){if(!t.pulse5||e.noPulse||e.ticks)return{events:[],dropped:0};const o=Lt(t,r,e.seed??0,a,n).filter(i=>{const u=Math.max(a,i.xc-2.8*i.w),f=Math.min(n,i.xc+2.8*i.w);return f>=u?[u,f,Math.min(f,Math.max(u,i.xc))].some(c=>{const h=r-(i.t0+(c-i.xc)*i.lag);return h>0&&70+i.vz*h<=420}):!1});return o.sort((i,u)=>u.amp-i.amp),{events:o.slice(0,s),dropped:Math.max(0,o.length-s)}}const k=8,G=256;function Fe(){return D.map(t=>nt(t))}function Se(t){const e=[];for(let r=0;r<t.length;r++)(t[r]===0||t[r]===1)&&e.push(r);if(e.length>4)throw new RangeError("zoneMeterChannels: more than four main-curtain components");return e}function ye(t){for(let e=0;e<t.length;e++)if(t[e]===2)return e;return-1}function zt(t,e,r){const a=Math.PI/180,n=Math.tan(Math.min(80,Math.max(.01,t))*a),s=k,o=r??Math.min(G,Math.max(4*s,Math.ceil(2*n/Math.tan(Math.max(.001,e)*a)/s)*s));if(o%s||o>G)throw new RangeError(`zoneMeterGrid: side ${o} not a multiple of ${s} up to ${G}`);let i=0;for(let u=0;u<o;u++)for(let f=0;f<o;f++)Ot(f,u,o)&&i++;return{n:o,tanR:n,count:i}}const Ot=(t,e,r)=>{const a=2*t+1-r,n=2*e+1-r;return a*a+n*n<=r*r};function Gt(t){const e=Math.hypot(t[0],t[1],t[2]),r=[t[0]/e,t[1]/e,t[2]/e];let a=r[1],n=-r[0];const s=Math.hypot(a,n);return s<1e-6?(a=1,n=0):(a/=s,n/=s),{F:r,R:[a,n,0],U:[n*r[2],-a*r[2],a*r[1]-n*r[0]]}}function Me(t){if(!t.length)return null;const e=D.length,r=new Float64Array(e),a=new Float64Array(e);let n=0;for(const s of t){const o=s.A??s.B,i=s.B??s.A;if(!o||!i){n++;continue}const u=Math.min(1,Math.max(0,s.alpha)),f=Math.max(0,s.share);for(let c=0;c<e;c++){const h=o.count?o.sums[c]/o.count:0,l=i.count?i.sums[c]/i.count:0;r[c]=r[c]+f*((1-u)*h+u*l),a[c]=a[c]+f*((1-u)*o.box[c]+u*i.box[c])}}return{means:r,box:a,pending:n}}const Xt=(t,e)=>D.map(r=>e[r]>0?t[r]*e[r]:0);function we(t,e,r,a,n){Xt(t,e);let s=0,o=0;a&&D.forEach((u,f)=>{(r[f]===0||r[f]===1||r[f]===2)&&(s+=t[u]*a.means[f],o+=t[u]*a.box[f])});const i=Ht();return{mean:s+i.mean,peak:o+i.peak}}function Ht(t,e,r){return{mean:0,peak:0}}const j=(t={})=>({cellKm:80,epochS:8,prob:.55,train:[1,3],a:[2.5,5],th:[1.8,3.2],lifePerKm:[1.5,2.1],v:[1.5,4],sign:-1,off:.2,hard:.55,...t}),J=(t={})=>({cellKm:190,epochS:14,prob:.55,train:[1,3],a:[7,15],th:[2,3.6],lifePerKm:[1.2,1.6],v:[.8,2.4],sign:-1,off:.2,hard:.5,...t}),Pe=(t={})=>({cellKm:420,epochS:40,prob:.5,train:[1,2],a:[15,24],th:[2.4,3.8],lifePerKm:[1.9,2.6],v:[.4,1.4],sign:1,off:.1,hard:.4,...t}),Wt=[{name:"弱",y0:235,surge:{period:600,amp:[3,8],adv:[.3,.45],dwell:[0,.2],jitter:.6,drift:3,driftS:900},meander:[[520,14,.05,.3],[190,4,.1,2.1],[140,4.5,.04,.8],[85,2.2,-.06,2.4]],ripple:0,vTex:.1,G:.16,gAlong:.6,hard0:.38,hardGain:.15,sigma:1.5,sigmaVar:.35,envShare:.7,envSigma:7.6,rayGlow:.04,foldThick:.6,waves:null,act:null,vort:null,blobs:null,layers:null,sRange:[-620,620]},{name:"中",y0:175,surge:{period:420,amp:[6,20],adv:[.3,.45],dwell:[0,.25],jitter:.6,drift:6,driftS:700},meander:[[480,18,.08,1.1],[170,6,.12,.4]],ripple:.25,vTex:.3,G:.3,gAlong:.3,hard0:.42,hardGain:.35,sigma:1.6,sigmaVar:.35,envShare:.55,envSigma:6.8,rayGlow:.05,foldThick:1.2,act:{epochS:200,life:[260,340],rise:60,region:[-150,150],v:[-.12,.12],widthKm:110,gain:2},waves:[[70,1.6,1.2],[38,.8,-1.8]],vort:{gated:!0,classes:[j({prob:.5,th:[1.2,2.4]}),J({cellKm:260,a:[6,12],th:[1.4,2.6]})]},blobs:{cellKm:60,epochS:4,prob:.45,w:[5,12],u:[2,7],life:[4,9],amp:[.35,.8],gated:!0},layers:{d:[[2.5,5,.55]]},sRange:[-620,620]},{name:"强",y0:150,surge:{period:300,amp:[15,45],adv:[.3,.45],dwell:[.05,.3],jitter:.6,drift:10,driftS:600},meander:[[440,22,.12,.7],[150,8,.2,2.9]],ripple:.3,vTex:.5,G:.33,gAlong:.3,hard0:.48,hardGain:.4,sigma:1.6,sigmaVar:.4,envShare:.5,envSigma:6.4,rayGlow:.05,foldThick:1.2,act:null,waves:[[85,2.4,1.6],[48,1.3,-2.2]],vort:{classes:[j({prob:.45}),J(),Pe()]},blobs:{cellKm:50,epochS:3.5,prob:.5,w:[4,10],u:[3,9],life:[3,7],amp:[.5,1.2]},layers:{d:[[2.5,6,.65],[-3.5,-1.5,.4]]},sRange:[-620,620]},{name:"大磁暴",y0:120,surge:{period:270,amp:[80,165],adv:[.28,.42],dwell:[.05,.3],jitter:.6,drift:12,driftS:500},meander:[[400,28,.15,2.2],[140,10,.25,1.3]],ripple:.3,vTex:.7,G:.35,gAlong:.3,hard0:.52,hardGain:.42,sigma:1.6,sigmaVar:.45,envShare:.45,envSigma:6.4,rayGlow:.06,foldThick:1.2,act:null,waves:[[90,3,2],[50,1.6,-2.6]],vort:{classes:[j({prob:.5}),J({prob:.6,a:[8,16],th:[2.2,3.8]}),Pe({cellKm:400,prob:.6,a:[18,30],th:[3.2,5]})]},blobs:{cellKm:45,epochS:3,prob:.55,w:[4,10],u:[4,12],life:[3,7],amp:[.6,1.4]},layers:{d:[[3,7.5,.7],[-4,-2,.45]]},sRange:[-620,620]}],Vt=[1.8,6,11.5,22],$t=[{hem:.1,hemAct:0,ray:0,chi:0,bundle:0},{hem:.12,hemAct:.32,ray:.36,chi:0,bundle:.3},{hem:.14,hemAct:.36,ray:.48,chi:0,bundle:.33},{hem:.15,hemAct:.4,ray:.55,chi:0,bundle:.36}],ee=(t,e,r,a,n)=>({P:t,prob:e,amp:r,vz:[40,70],sig:14,cell:240,w:a,lag:n}),z=Wt.map((t,e)=>{const{layers:r,...a}=t,n=$t[e];return{...a,kR:Vt[e],fine:{...n,ray:n.ray*.75,chi:e===0?0:.04},foldTilt:[0,.16,.2,.22][e],weakAlong:e===0?{amp:.55,scales:[80,34,19],v:[.25,-.5,.35]}:null,layers4:r==null?null:{d:r.d,s0:.35,s:.45,w0:1.3},solid:e===0?null:{env:[1.5,.3],sigma:[1.25,.75]},pulse5:[null,ee(9,.7,2.8,[90,180],[.15,.5]),ee(6,.8,3.4,[90,200],[.15,.5]),ee(4.5,.85,3.9,[90,200],[.15,.5])][e]??null,glow:e===0?null:{amp:.003,sig:45,off:-15,chi:.2}}});z.length;const gt=[{cell:2.4,epoch:5,prob:.6,w:[.18,.45],lnS:.9,life:[5,14],drift:.15,seed:61},{cell:6.8,epoch:8,prob:.55,w:[.35,.9],lnS:.6,life:[8,22],drift:.12,seed:62}];let Ke=1,Ye=1;function qt(t,e,r=0,a={f:0,lam:0,fb:0}){let n=0,s=0,o=0;for(const i of gt){const u=Math.ceil(i.life[1]/i.epoch)+1,f=Math.floor(t/i.cell);for(let c=Math.floor(e/i.epoch)-u;c<=Math.floor(e/i.epoch);c++)for(let h=f-2;h<=f+2;h++){const l=Ve(h,c,9e3+i.seed+131*r);if(he(l)>=i.prob)continue;const d=(c+A(l,1))*i.epoch,p=O(i.life,A(l,2)),m=(e-d)/p;if(!(m>0&&m<1))continue;const E=(h+A(l,3))*i.cell+i.drift*(2*A(l,4)-1)*(e-d),_=O(i.w,A(l,5)),b=(t-E)/_;if(b*b>16)continue;const x=Math.sqrt(-2*Math.log(Math.max(1e-9,A(l,6))))*Math.cos(2*Math.PI*A(l,7)),F=Math.exp(i.lnS*x-.5*i.lnS*i.lnS)*W(m/.25)*(1-W((m-.7)/.3)),M=F*Math.exp(-.5*b*b),S=A(l,8);n+=M,s+=M*S*S*S,i.cell>5&&(o+=M)}}return a.f=n*Ke,a.fb=o*Ye,a.lam=n>1e-9?s/n:.3,a}{let t=0,e=0,r=0;const a={f:0,lam:0,fb:0};for(let n=0;n<6e3;n++)qt(n*.731+13,50+n*.37,0,a),t+=a.f,e+=a.fb,r++;Ke=r/t,Ye=r/e}const R={DX:8,HALF:720,SIG_N:16,HP:62,H0:150,H1:620,NSEG:24,TAU_RAD:110,Q200:.098,QH:42},g=Math.round(2*R.HALF/R.DX)+1,Kt=t=>1/(1/R.TAU_RAD+R.Q200*Math.exp(-(t-200)/R.QH)),Yt=t=>t<=R.H0?0:W((t-R.H0)/20)*Math.exp(-(t-R.H0)/R.HP)*(Kt(t)/R.TAU_RAD)*(1-W((t-(R.H1-60))/60));let te=null;function Zt(){if(te)return te;const t=R,e=4700,r=(t.H1-t.H0)/e,a=new Float64Array(e+1);for(let o=0;o<e;o++)a[o+1]=a[o]+Yt(t.H0+(o+.5)*r)*r;const n=[];let s=0;for(let o=0;o<t.NSEG;o++){const i=a[e]*(o+.5)/t.NSEG;for(;a[s+1]<i;)s++;n.push(t.H0+(s+(i-a[s])/(a[s+1]-a[s]))*r)}return te={mid:n,norm:a[e]}}const v=t=>{const e=String(t);return/[.eE]/.test(e)?e:e+".0"},Ze=[];for(const t of[-1,1])for(const e of[-1,1])for(const r of[-1,1])Ze.push(`c ${t<0?"-":"+"} A ${e<0?"-":"+"} E ${r<0?"-":"+"} N`);const re=["rPL0","rPL1","rPF00","rPF01","rPF10","rPF11"],ae=["rGL0","rGL1","rGF00","rGF01","rGF10","rGF11"],Qt=["wl0","wl1","wf00","wf01","wf10","wf11"],L=(t,e)=>t.map((r,a)=>`${Qt[a]} * cf(${r}, ${e}.0, yy)`).join(" + "),jt=w+`out vec4 o; void main() { o = vec4(0.0); }
`,Jt=w+`
uniform sampler2D uT;
out vec4 o;
void main() { o = vec4(textureLod(uT, vec2(0.5, 0.5), 0.0).r, 0.25, 0.0, 0.0); }
`,er=w+`
layout(location = 0) in vec4 aS0a;
layout(location = 1) in vec4 aS0b;
layout(location = 2) in vec4 aS0c;
layout(location = 3) in vec4 aS1a;
layout(location = 4) in vec4 aS1b;
layout(location = 5) in vec4 aS1c;
layout(location = 6) in vec4 aS2a;
layout(location = 7) in vec4 aS2b;
layout(location = 8) in vec4 aS2c;
layout(location = 9) in vec4 aS3a;
layout(location = 10) in vec4 aS3b;
layout(location = 11) in vec4 aS3c;
layout(location = 12) in float aJ;
uniform vec3 uF, uR, uU;
uniform float uTanH, uPx;
uniform vec4 uCW;
uniform float uU2, uWC;
uniform float uSlice, uNS;
uniform float uB, uBW, uCutB;
uniform float uNG, uGR, uNL;
uniform float uObsX, uPulse;
uniform sampler2D uCoef;
uniform sampler2D uK;
flat out vec4 vRx, vRy, vAn, vP0, vP1, vP2, vG0, vG1, vG2, vQa, vQb, vPx;
const float RE = ${v(H)}, REFH = ${v(Xe)}, COTD = ${He}, HLO = ${v(Y)}, NCH = ${v(y)}, TWO_PI = 6.283185307179586;
vec3 pj(vec3 P) { float z = dot(P, uF), iz = 1.0 / (max(z, 1e-3) * uTanH); return vec3(dot(P, uR) * iz, dot(P, uU) * iz, z); }
float sincS(float a2) { return 1.0 - a2 * (0.16666666666666666 - a2 * (0.008333333333333333 - a2 * (1.984126984126984e-4 - a2 * 2.755731922398589e-6))); }
float coscS(float a2) { return 0.5 - a2 * (0.041666666666666664 - a2 * (0.001388888888888889 - a2 * (2.48015873015873e-5 - a2 * 2.755731922398589e-7))); }
float sincD(float a2) { return -0.16666666666666666 + a2 * (0.016666666666666666 - a2 * (5.952380952380952e-4 - a2 * 1.1022927689594356e-5)); }
float coscD(float a2) { return -0.041666666666666664 + a2 * (0.002777777777777778 - a2 * (7.44047619047619e-5 - a2 * 1.1022927689594356e-6)); }
vec3 world(float x, float y, float h) {
  float n = y - (h - REFH) * COTD, a2 = (x * x + n * n) / (RE * RE), s = (RE + h) / RE * sincS(a2);
  return vec3(s * x, s * n, h - (RE + h) * a2 * coscS(a2));
}
vec4 cf(float row, float q, float yy) { return texelFetch(uCoef, ivec2(int(1.0 + 3.0 * row + q + 0.5), int(yy + 0.5)), 0); }
vec2 kAt(float l, float c) { return texelFetch(uK, ivec2(int(l + 0.5), int(c + 0.5)), 0).xy; }
void main() {
  vRx = vec4(0.0); vRy = vec4(0.0); vAn = vec4(0.0); vP0 = vec4(0.0); vP1 = vec4(0.0); vP2 = vec4(0.0); vG0 = vec4(0.0); vG1 = vec4(0.0); vG2 = vec4(0.0);
  vQa = vec4(0.0); vQb = vec4(0.0, 0.0, 0.0, 2.0); vPx = vec4(0.0);
  gl_Position = vec4(2.0, 2.0, 0.0, 1.0); gl_PointSize = 1.0;
  float on0 = aS0c.w, on1 = aS1c.w, on2 = aS2c.w, on3 = aS3c.w;
  if (on1 < 0.5 && on2 < 0.5) return;
  vec4 g1a = on1 > 0.5 ? aS1a : vec4(aS2a.xy, 0.0, 0.0), g1b = on1 > 0.5 ? aS1b : aS2b;
  vec4 g2a = on2 > 0.5 ? aS2a : vec4(aS1a.xy, 0.0, 0.0), g2b = on2 > 0.5 ? aS2b : aS1b;
  float l1 = on1 > 0.5 ? aS1c.x : aS2c.x, l2 = on2 > 0.5 ? aS2c.x : aS1c.x;
  vec4 g0a = on0 > 0.5 ? aS0a : vec4(g1a.xy, 0.0, 0.0), g0b = on0 > 0.5 ? aS0b : g1b;
  vec4 g3a = on3 > 0.5 ? aS3a : vec4(g2a.xy, 0.0, 0.0), g3b = on3 > 0.5 ? aS3b : g2b;
  float l0 = on0 > 0.5 ? aS0c.x : l1, l3 = on3 > 0.5 ? aS3c.x : l2;
  vec4 P0 = g0a * uCW.x + g1a * uCW.y + g2a * uCW.z + g3a * uCW.w;
  vec4 P1 = g0b * uCW.x + g1b * uCW.y + g2b * uCW.z + g3b * uCW.w;
  float lam = clamp(l0 * uCW.x + l1 * uCW.y + l2 * uCW.z + l3 * uCW.w, 0.0, 1.0);
  float ph = on1 > 0.5 ? aS1c.y : aS2c.y, mask = on1 > 0.5 ? aS1c.z : aS2c.z;
  float x = P0.x, y = P0.y, wl = max(P0.z, 0.0), wr = max(P0.w, 0.0), sxx = P1.x, sxy = P1.y, syy = P1.z, chi = clamp(P1.w, 0.0, 1.0);
  if (uWC > 0.5) { wl = clamp(wl, min(g1a.z, g2a.z), max(g1a.z, g2a.z)); wr = clamp(wr, min(g1a.w, g2a.w), max(g1a.w, g2a.w)); }
  if (!(sxx > 0.0 && sxx * syy - sxy * sxy > 0.0)) { vec4 Lb = g1b * (1.0 - uU2) + g2b * uU2; sxx = Lb.x; sxy = Lb.y; syy = Lb.z; }
  float dd = uSlice - ph + 16.0 * uNS, b = dd - uNS * floor((dd + 0.5) / uNS) + aJ * uNS;
  if (b > uB - 0.5) return;
  float bit = floor((mask + 0.5) * exp2(-b)); bit = bit - 2.0 * floor((bit + 0.5) * 0.5);
  if (bit < 0.5) return;
  float det = sxx * syy - sxy * sxy;
  if (!(det > 0.0) || !(wl > 0.0 || wr > 0.0)) return;
  float amp = 1.0 / (TWO_PI * sqrt(det)), sx = sqrt(sxx), co = sxy / sxx, sy = sqrt(syy - sxy * co);
  float tc = clamp(chi * (NCH - 1.0), 0.0, NCH - 1.0), ic = min(NCH - 2.0, floor(tc)), fc = tc - ic;
  float g = min(uNG - 1.0, floor((ic + 0.5) / uGR));
  float many = uNL > 1.5 ? 1.0 : 0.0, tl = many * clamp(lam * (uNL - 1.0), 0.0, uNL - 1.0), il = many * min(uNL - 2.0, floor(tl)), fl = tl - il, n1 = many;
  vec2 k00 = kAt(il, ic), k01 = kAt(il + n1, ic), k10 = kAt(il, ic + 1.0), k11 = kAt(il + n1, ic + 1.0);
  float kr = (k00.x * (1.0 - fl) + k01.x * fl) * (1.0 - fc) + (k10.x * (1.0 - fl) + k11.x * fl) * fc, kl = k00.y * (1.0 - fc) + k10.y * fc;
  float yy = b * uNG + g;
  vec4 info = texelFetch(uCoef, ivec2(0, int(yy + 0.5)), 0);
  float nc = info.z, cc = ic - g * uGR, nl = uNL;
  float rPL0 = cc, rPL1 = cc + 1.0, rGL0 = nc + cc, rGL1 = nc + cc + 1.0;
  float rPF00 = 2.0 * nc + cc * nl + il, rPF01 = rPF00 + n1, rPF10 = 2.0 * nc + (cc + 1.0) * nl + il, rPF11 = rPF10 + n1;
  float rGF00 = 2.0 * nc + (nc + cc) * nl + il, rGF01 = rGF00 + n1, rGF10 = 2.0 * nc + (nc + cc + 1.0) * nl + il, rGF11 = rGF10 + n1;
  float wl0 = wl * kl * (1.0 - fc), wl1 = wl * kl * fc, wf00 = wr * kr * (1.0 - fc) * (1.0 - fl), wf01 = wr * kr * (1.0 - fc) * fl * n1, wf10 = wr * kr * fc * (1.0 - fl), wf11 = wr * kr * fc * fl * n1;
  vP0 = ${L(re,0)};
  vG0 = ${L(ae,0)};
  if (info.y > 1.5) {
    vP1 = ${L(re,1)};
    vG1 = ${L(ae,1)};
  }
  if (info.y > 2.5) {
    vP2 = ${L(re,2)};
    vG2 = ${L(ae,2)};
  }
  float ha = HLO + b * uBW, hb = ha + uBW, hm = 0.5 * (ha + hb);
  vec3 p = world(x, y, ha), q = world(x, y, hb), cm = world(x, y, hm);
  vec3 sag = cm - 0.5 * (p + q), an = p + (2.0 / 3.0) * sag;
  float nm = y - (hm - REFH) * COTD, a2 = (x * x + nm * nm) / (RE * RE), km = (RE + hm) / RE, S = sincS(a2), Sd = sincD(a2) * 2.0 / (RE * RE), Cz = -(RE + hm) * (coscS(a2) + a2 * coscD(a2)) * 2.0 / (RE * RE);
  vec3 e = vec3(km * (S + x * x * Sd), km * nm * x * Sd, Cz * x), nn = vec3(km * x * nm * Sd, km * (S + nm * nm * Sd), Cz * nm);
  vec3 a = (q - p) / uBW, na = cross(nn, a), ae = cross(a, e);
  float jac = dot(e, na);
  vec3 re = na / jac, rn = ae / jac, rx = re / sx, ry = (rn - co * re) / sy;
  float sagL = length(sag), le = length(e), ln = length(nn), la = length(a) * uBW, hsx = uCutB * sx, hsy = uCutB * sqrt(syy);
  float mE = (hsx * le + sagL + 0.05) / le, mN = (hsy * ln + sagL + 0.05) / ln, mA = (0.5 * la + 0.5 + sagL) / la;
  vec3 c = an + 0.5 * uBW * a, A = mA * uBW * a, E = mE * e, N = mN * nn;
  vRx = vec4(rx, amp); vRy = vec4(ry, info.x); vAn = vec4(an, ha); vPx = vec4(x + uObsX, uPulse, 0.0, 0.0);
${Ze.map((t,e)=>`  vec3 p${e} = pj(${t});`).join(`
`)}
  float zmin = min(min(min(p0.z, p1.z), min(p2.z, p3.z)), min(min(p4.z, p5.z), min(p6.z, p7.z)));
  float zmax = max(max(max(p0.z, p1.z), max(p2.z, p3.z)), max(max(p4.z, p5.z), max(p6.z, p7.z)));
  vec3 q0 = pj(c - A), q1 = pj(c + A);
  vec2 ax = q1.xy - q0.xy;
  float axl = length(ax);
  vec2 dr = axl > 1e-6 ? ax / axl : vec2(1.0, 0.0);
  vec2 pr = vec2(-dr.y, dr.x);
${[0,1,2,3,4,5,6,7].map(t=>`  vec2 s${t} = vec2(dot(p${t}.xy, dr), dot(p${t}.xy, pr));`).join(`
`)}
  vec2 lo = min(min(min(s0, s1), min(s2, s3)), min(min(s4, s5), min(s6, s7))) - vec2(uPx);
  vec2 hi = max(max(max(s0, s1), max(s2, s3)), max(max(s4, s5), max(s6, s7))) + vec2(uPx);
  float big = max(max(abs(lo.x), abs(lo.y)), max(abs(hi.x), abs(hi.y)));
  float mode = 0.0;
  if (zmin < 0.5 || big > 1e4) mode = 1.0;
  if (zmax < 0.5) mode = 2.0;
  vQa = vec4(lo, hi); vQb = vec4(dr, info.y, mode);
}
`,tr=["vRx","vRy","vAn","vP0","vP1","vP2","vG0","vG1","vG2","vQa","vQb","vPx"],B=48,rr=w+`
layout(location = 0) in vec2 aQ;
layout(location = 1) in vec4 aRx;
layout(location = 2) in vec4 aRy;
layout(location = 3) in vec4 aAn;
layout(location = 4) in vec4 aP0;
layout(location = 5) in vec4 aP1;
layout(location = 6) in vec4 aP2;
layout(location = 7) in vec4 aG0;
layout(location = 8) in vec4 aG1;
layout(location = 9) in vec4 aG2;
layout(location = 10) in vec4 aQa;
layout(location = 11) in vec4 aQb;
layout(location = 12) in vec4 aPx;
flat out vec4 vRx, vRy, vAn, vP0, vP1, vP2, vG0, vG1, vG2, vPx;
flat out float vCh;
void main() {
  vRx = aRx; vRy = aRy; vAn = aAn; vP0 = aP0; vP1 = aP1; vP2 = aP2; vG0 = aG0; vG1 = aG1; vG2 = aG2; vPx = aPx; vCh = aQb.z;
  vec2 dr = aQb.xy, pr = vec2(-dr.y, dr.x), st = mix(aQa.xy, aQa.zw, aQ), pos = dr * st.x + pr * st.y;
  if (aQb.w > 0.5) pos = mix(vec2(-1.0), vec2(1.0), aQ);
  if (aQb.w > 1.5) pos = vec2(2.0);
  gl_Position = vec4(pos, 0.0, 1.0);
}
`,X=16,ar=w+`
uniform vec3 uF, uR, uU;
uniform float uTanH, uSize, uBW, uN, uCut2;
uniform sampler2D uTab;
uniform vec4 uTabD;
uniform float uTexH;
uniform int uNE;
uniform vec4 uE[${2*X}];
uniform float uPInv, uPCons;
uniform sampler2D uRef;
flat in vec4 vRx, vRy, vAn, vP0, vP1, vP2, vG0, vG1, vG2, vPx;
flat in float vCh;
out vec4 oCol;
const float RE = ${v(H)}, SQ_PI_2 = 1.2533141373155003, NZF = ${vt.toFixed(1)}, ZST = ${Rt}, POCT = ${Tt.toFixed(1)}, SMAX = ${(At-1).toFixed(1)};
const float REF_HW0 = ${v(ge)}, REF_STEP = ${v(qe)}, REF_MAX = ${v(V-1)};
float erfcx(float x) {
  float t = 1.0 / (1.0 + 0.5 * x);
  return t * exp(-1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
}
float massI(float k, float m) {
  if (k < 0.25) { float a = 1.0 - m, k2 = k * k, A2 = (a * a * a + m * m * m) / 3.0, A4 = (a * a * a * a * a + m * m * m * m * m) / 5.0, A6 = (pow(a, 7.0) + pow(m, 7.0)) / 7.0;
    return 1.0 - 0.5 * k2 * A2 + 0.125 * k2 * k2 * A4 - k2 * k2 * k2 * A6 / 48.0; }
  float x = k * m * 0.7071067811865476, y = k * (1.0 - m) * 0.7071067811865476;
  return SQ_PI_2 / k * (2.0 - erfcx(x) * exp(-x * x) - erfcx(y) * exp(-y * y));
}
float massS(float k, float z) {
  if (k < 0.25) {
    float s = 0.1739274225687269 * exp(-z * k * 0.0694318442029737 - 0.5 * k * k * 0.0048207809);
    s += 0.3260725774312731 * exp(-z * k * 0.3300094782075719 - 0.5 * k * k * 0.1089062557);
    s += 0.3260725774312731 * exp(-z * k * 0.6699905217924281 - 0.5 * k * k * 0.4488872757);
    s += 0.1739274225687269 * exp(-z * k * 0.9305681557970263 - 0.5 * k * k * 0.8659570714);
    return s; }
  float a = z * 0.7071067811865476, b = (z + k) * 0.7071067811865476;
  return SQ_PI_2 / k * (erfcx(a) - erfcx(b) * exp(-z * k - 0.5 * k * k));
}
float shellL(float h, float du) { float ru = RE * du, b = h * (2.0 * RE + h); return b / (ru + sqrt(ru * ru + b)); }
float gGZ; vec2 gTC;
bool look(vec3 E, vec3 V) {
  float k2 = dot(V, V), mr = k2 > 1e-20 ? -dot(E, V) / k2 : 0.5, m = clamp(mr, 0.0, 1.0);
  vec3 C = E + m * V;
  float d2 = dot(C, C);
  if (d2 > uCut2) return false;
  float k = sqrt(k2), g = exp(-0.5 * d2), x, Z;
  if (!(k2 > 1e-20) || (mr > 0.0 && mr < 1.0)) { x = m * uN; Z = massI(k, m); }
  else { float z = abs(dot(C, V)) / k; x = (mr <= 0.0 ? uN + 1.0 : uN + 2.0 + NZF) + min(NZF, z / ZST); Z = massS(k, z); }
  gGZ = g * Z; gTC = vec2(x, min(SMAX, POCT * log2(1.0 + k)));
  return true;
}
vec4 fetchL(float L) {
  float ty = floor(L / uTabD.z), tx = L - ty * uTabD.z;
  vec2 uv = (vec2(tx * uTabD.x, ty * uTabD.y) + gTC + 0.5) / vec2(uTabD.w, uTexH);
  return textureLod(uTab, uv, 0.0);
}
vec2 resp() {
  vec4 m0 = fetchL(vRy.w);
  vec2 r = vec2(dot(vP0, m0), dot(vG0, m0));
  if (vCh > 1.5) { vec4 m1 = fetchL(vRy.w + 1.0); r += vec2(dot(vP1, m1), dot(vG1, m1)); }
  if (vCh > 2.5) { vec4 m2 = fetchL(vRy.w + 2.0); r += vec2(dot(vP2, m2), dot(vG2, m2)); }
  return r;
}
float sm01(float x) { float c = clamp(x, 0.0, 1.0); return c * c * (3.0 - 2.0 * c); }
float refAt(float hw) {
  float xx = clamp((hw - REF_HW0) / REF_STEP, 0.0, REF_MAX), i0 = min(REF_MAX - 1.0, floor(xx));
  int i = int(i0 + 0.5);
  return mix(texelFetch(uRef, ivec2(i, 0), 0).r, texelFetch(uRef, ivec2(i + 1, 0), 0).r, xx - i0);
}
void main() {
  float px = (2.0 * gl_FragCoord.x / uSize - 1.0) * uTanH, py = (2.0 * gl_FragCoord.y / uSize - 1.0) * uTanH;
  vec3 d = normalize(uF + px * uR + py * uU);
  oCol = vec4(0.0);
  if (!(d.z > 0.02)) return;
  float ha = vAn.w, la = shellL(ha, d.z), dl = shellL(ha + uBW, d.z) - la;
  vec3 P = la * d - vAn.xyz;
  vec2 E = vec2(dot(vRx.xyz, P), dot(vRy.xyz, P)), V = dl * vec2(dot(vRx.xyz, d), dot(vRy.xyz, d));
  vec2 acc = vec2(0.0);
  float hits = 0.0;
  if (look(vec3(E, 0.0), vec3(V, 0.0))) { acc += gGZ * resp(); hits = 1.0; }
  if (vPx.y > 0.5 && uNE > 0) {
    float x = vPx.x, sAR = 0.0;
    for (int i = 0; i < ${X}; i++) {
      if (i >= uNE) break;
      vec4 e0 = uE[2 * i], e1 = uE[2 * i + 1];
      float dx = (x - e0.y) * e0.z, win = exp(-0.5 * dx * dx);
      if (win < 0.02) continue;
      float age = -(e0.x + (x - e0.y) * e0.w);
      if (!(age > 0.0)) continue;
      float hw = 70.0 + e1.x * age;
      if (hw > 420.0) continue;
      float A = e1.y * win * sm01(age / 0.3) * exp(-max(0.0, hw - 110.0) / 180.0) * (0.7 + 0.3 * sm01((hw - 100.0) / 25.0));
      sAR += A * refAt(hw);
      if (look(vec3(E, (ha - hw) * uPInv), vec3(V, uBW * uPInv))) acc += A * gGZ * resp();
    }
    acc /= 1.0 + uPCons * sAR;
  }
  oCol = vec4(acc * (vRx.w * dl), 0.0, hits);
}
`,Qe=`
vec4 bil(sampler2D t, vec2 u, float n) {
  vec2 x = u - 0.5, i = clamp(floor(x), vec2(0.0), vec2(n - 2.0)), f = clamp(x - i, 0.0, 1.0);
  ivec2 p = ivec2(i);
  vec4 a = texelFetch(t, p, 0), b = texelFetch(t, p + ivec2(1, 0), 0), c = texelFetch(t, p + ivec2(0, 1), 0), d = texelFetch(t, p + ivec2(1, 1), 0);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
vec4 gS;
float samp(vec3 d, vec3 F, vec3 R, vec3 U, vec2 T, sampler2D C, sampler2D E) {
  gS = vec4(0.0);
  float z = dot(d, F);
  if (!(z > 1e-3)) return 0.0;
  vec2 q = vec2(dot(d, R), dot(d, U)) / (z * T.x);
  if (abs(q.x) > 1.0 || abs(q.y) > 1.0) return 0.0;
  vec2 u = (q + 1.0) * 0.5 * T.y;
  vec4 e = bil(E, 0.5 * u, 0.5 * T.y);
  gS = vec4(bil(C, u, T.y).xy + e.xy, e.z, 1.0);
  return 1.0;
}
`,je=Qe+`uniform vec3 aF, aR, aU, bF, bR, bU, cF, cR, cU;
uniform vec2 aT, bT, cT;
uniform sampler2D aC, aE, bC, bE, cC, cE;
uniform float uAlpha, uFade, uHasC;
// The two finished maps crossfaded by α (DISP6_FS): A and B both cover → mix(A, B, α); only one → faded from / to the
// fallback map C (zero without one); neither → C. xyz: prompt, 557.7, 630.0; w: coverage (1 A or B, 0.5 only C, 0 none).
vec4 mapsAt(vec3 d) {
  float ca = samp(d, aF, aR, aU, aT, aC, aE); vec4 A = gS;
  float cb = samp(d, bF, bR, bU, bT, bC, bE); vec4 B = gS;
  float cc = 0.0; vec4 Cv = vec4(0.0);
  if (uHasC > 0.5 && !(ca > 0.0 && cb > 0.0)) { cc = samp(d, cF, cR, cU, cT, cC, cE); Cv = gS; }
  if (ca > 0.0 && cb > 0.0) return vec4(mix(A.xyz, B.xyz, uAlpha), 1.0);
  if (cb > 0.0) return vec4(uFade > 0.5 ? mix(Cv.xyz, B.xyz, uAlpha) : B.xyz, 1.0);
  if (ca > 0.0) return vec4(uFade > 0.5 ? mix(A.xyz, Cv.xyz, uAlpha) : A.xyz, 1.0);
  return vec4(Cv.xyz, 0.5 * cc);
}
`,nr=w+`
uniform vec3 uF, uR, uU;
uniform float uTanH, uSize;
out vec4 o;
`+je+`
void main() {
  float px = (2.0 * gl_FragCoord.x / uSize - 1.0) * uTanH, py = (2.0 * gl_FragCoord.y / uSize - 1.0) * uTanH;
  o = mapsAt(normalize(uF + px * uR + py * uU));
}
`,ir=ze("STAR_SKY")+Oe+it+st+`
uniform float uRate[5];
uniform int uClass[5];
uniform sampler2D u_auExt;
uniform int u_auExtOn;
uniform float u_auRatioCap;
out vec4 o;
`+je+`
float auExt(int c, float x) {
  if (u_auExtOn == 0) return 1.0;
  int i0 = int(floor(x)), i1 = min(i0 + 1, u_hzNodes - 1);
  return mix(texelFetch(u_auExt, ivec2(i0, c), 0).r, texelFetch(u_auExt, ivec2(i1, c), 0).r, x - float(i0));
}
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  vec4 cd = cellDir(p);
  if (cd.w == 0.0 || u_hzOn == 0) { o = vec4(0.0); return; }
  float up = dot(cd.xyz, u_zenith);
  if (!(up > 0.0)) { o = vec4(0.0); return; }
  if (up < u_hzEdgeMax) { if (up < hzEdge(cd.xyz)) { o = vec4(0.0); return; } }
  vec4 m = mapsAt(vec3(dot(cd.xyz, u_hzEast), dot(cd.xyz, u_hzNorth), up));
  float x = hzX(up), v = 0.0;
  for (int c = 0; c < 5; c++) {
    int k = uClass[c];
    v += uRate[c] * (k == 0 ? m.x : k == 1 ? m.y : m.z) * auExt(c, x);
  }
  if (u_cloudMode != 0) {
    float tn = cloudTauN(cd.xyz);
    if (tn > 0.0) v *= min(u_auRatioCap, exp(min(tn, 80.0)) / (1.0 + u_cloudTau.y * tn));
  }
  float r = length(u_originMm + vec2(p) * u_pitchMm), sky0 = lutAt(1, 0.0).x;
  float off = sky0 > 0.0 ? max(0.0, lutAt(1, atan(r / u_focalMm)).x) / sky0 : 1.0;
  o = vec4(v * off, 0.0, 0.0, 0.0);
}
`,sr=w+`
uniform vec3 uF, uR, uU;
uniform float uTanH, uSize;
uniform sampler2D uLine;
uniform vec2 uObs;
out vec4 oCol;
const float RE = ${v(H)}, REFH = ${v(Xe)}, COTD = ${He}, X0 = ${v(-720)}, DXL = ${v(R.DX)}, FMAX = ${v(g-1.001)}, SIGN = ${v(R.SIG_N)};
const float NORM = ${v(1/(Math.sqrt(2*Math.PI)*R.SIG_N*R.NSEG))};
float gU, gCh, gHe, gHn, gRu;
float redAt(float h) {
  float b = 2.0 * RE * h + h * h, rt = sqrt(gRu * gRu + b), l = b / (gRu + rt), g = RE * atan(l * gCh, RE + l * gU);
  float f = clamp((g * gHe + uObs.x - X0) / DXL, 0.0, FMAX), i0 = floor(f);
  int i = int(i0);
  vec2 L = mix(texelFetch(uLine, ivec2(i, 0), 0).xy, texelFetch(uLine, ivec2(i + 1, 0), 0).xy, f - i0);
  float un = (g * gHn + (h - REFH) * COTD + uObs.y - L.y) / SIGN;
  return L.x * exp(-0.5 * un * un) * (RE + h) / rt;
}
void main() {
  float px = (2.0 * gl_FragCoord.x / uSize - 1.0) * uTanH, py = (2.0 * gl_FragCoord.y / uSize - 1.0) * uTanH;
  vec3 d = normalize(uF + px * uR + py * uU);
  oCol = vec4(0.0);
  if (!(d.z > 0.02)) return;
  gU = d.z; gCh = length(d.xy); gHe = gCh > 1e-9 ? d.x / gCh : 0.0; gHn = gCh > 1e-9 ? d.y / gCh : 1.0; gRu = RE * gU;
  float I = 0.0;
${Zt().mid.map(t=>`  I += redAt(${v(t)});`).join(`
`)}
  oCol = vec4(0.0, 0.0, I * NORM, 0.0);
}
`,or=`
uniform sampler2D u_auExt;
uniform int u_auExtOn;
float auExt(int c, float x) {
  if (u_auExtOn == 0) return 1.0;
  int i0 = int(floor(x)), i1 = min(i0 + 1, u_hzNodes - 1);
  return mix(texelFetch(u_auExt, ivec2(i0, c), 0).r, texelFetch(u_auExt, ivec2(i1, c), 0).r, x - float(i0));
}
`,ur=ze("STAR_SKY")+Oe+`
uniform vec3 uMF, uMR, uMU;
uniform float uTanR, uN;
uniform vec3 mF, mR, mU;
uniform vec2 mT;
uniform sampler2D mC, mE;
uniform int uComp[4], uCls[4];
uniform float uK[4];
out vec4 o;
`+or+Qe+`
float chan(int k, vec3 m, float x) { return uK[k] * (uCls[k] == 0 ? m.x : uCls[k] == 1 ? m.y : m.z) * auExt(uComp[k], x); }
void main() {
  vec2 ab = 2.0 * floor(gl_FragCoord.xy) + 1.0 - uN;
  if (ab.x * ab.x + ab.y * ab.y > uN * uN || u_hzOn == 0) { o = vec4(0.0); return; }
  vec2 g = ab / uN;
  vec3 d = normalize(uMF + uTanR * (g.x * uMR + g.y * uMU));
  float up = d.z;
  if (!(up > 0.0)) { o = vec4(0.0); return; }
  vec3 di = d.x * u_hzEast + d.y * u_hzNorth + d.z * u_zenith;
  if (up < u_hzEdgeMax) { if (up < hzEdge(di)) { o = vec4(0.0); return; } }
  float cov = samp(d, mF, mR, mU, mT, mC, mE);
  if (!(cov > 0.0)) { o = vec4(0.0); return; }
  vec3 m = gS.xyz;
  float x = hzX(up), sky0 = lutAt(1, 0.0).x;
  float off = sky0 > 0.0 ? max(0.0, lutAt(1, atan(uTanR * length(g))).x) / sky0 : 1.0;
  o = vec4(chan(0, m, x), chan(1, m, x), chan(2, m, x), chan(3, m, x)) * off;
}
`,cr=w+`
uniform sampler2D uS;
uniform float uN;
uniform vec4 uW;
out vec4 o;
vec4 at(ivec2 q, int n) { return q.x < 0 || q.y < 0 || q.x >= n || q.y >= n ? vec4(0.0) : texelFetch(uS, q, 0); }
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  int blk = p.x / 3, kind = p.x - 3 * blk, n = int(uN);
  ivec2 b0 = ivec2(blk, p.y) * ${k};
  vec4 s = vec4(0.0), bb = vec4(0.0);
  float best = -1.0, cnt = 0.0;
  for (int j = 0; j < ${k}; j++) for (int i = 0; i < ${k}; i++) {
    ivec2 q = b0 + ivec2(i, j);
    float a = 2.0 * float(q.x) + 1.0 - uN, b = 2.0 * float(q.y) + 1.0 - uN;
    if (a * a + b * b > uN * uN) continue;
    cnt += 1.0;
    s += texelFetch(uS, q, 0);
    vec4 bx = vec4(0.0);
    for (int dj = -1; dj <= 1; dj++) for (int di = -1; di <= 1; di++) bx += at(q + ivec2(di, dj), n);
    bx /= 9.0;
    float t = dot(uW, bx);
    if (t > best) { best = t; bb = bx; }
  }
  o = kind == 0 ? s : kind == 1 ? bb : vec4(cnt, best, 0.0, 0.0);
}
`,fr=w+`
uniform sampler2D uB;
uniform int uNB, uOff;
out vec4 o;
void main() {
  int kind = int(gl_FragCoord.x) - uOff;
  vec4 s = vec4(0.0), bb = vec4(0.0);
  float best = -1.0, cnt = 0.0;
  for (int j = 0; j < ${G/k}; j++) {
    if (j >= uNB) break;
    for (int i = 0; i < ${G/k}; i++) {
      if (i >= uNB) break;
      ivec2 q = ivec2(3 * i, j);
      s += texelFetch(uB, q, 0);
      vec4 c = texelFetch(uB, q + ivec2(2, 0), 0);
      cnt += c.x;
      if (c.y > best) { best = c.y; bb = texelFetch(uB, q + ivec2(1, 0), 0); }
    }
  }
  o = kind == 0 ? s : kind == 1 ? bb : vec4(cnt, best, 0.0, 0.0);
}
`,ne={maxTextureSize:4096,maxVertexAttribs:13,maxTfInterleaved:B,maxVertexTextureUnits:3,maxTextureUnits:16,maxFragmentUniformVectors:64,maxVertexUniformVectors:64},Be={filter:.02,blend:.001},le=t=>t?"rgba32f":"rgba16f",hr={maxTextureSize:"MAX_TEXTURE_SIZE",maxVertexAttribs:"MAX_VERTEX_ATTRIBS",maxTfInterleaved:"MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS",maxVertexTextureUnits:"MAX_VERTEX_TEXTURE_IMAGE_UNITS",maxTextureUnits:"MAX_TEXTURE_IMAGE_UNITS",maxFragmentUniformVectors:"MAX_FRAGMENT_UNIFORM_VECTORS",maxVertexUniformVectors:"MAX_VERTEX_UNIFORM_VECTORS"};function Ce(t){if(!t.colorBufferFloat)return"EXT_color_buffer_float missing (float colour targets)";if(!t.fence)return"fenceSync missing (the meter's read-back)";for(const e of Object.keys(ne))if(!(t[e]>=ne[e]))return`${hr[e]} ${t[e]} < ${ne[e]}`;return t.probeError?`probe: ${t.probeError}`:t.filterProbe===null||!(Math.abs(t.filterProbe-.5)<=Be.filter)?`RGBA16F linear filtering: probe ${t.filterProbe} (0.5 expected)`:t.blendProbe===null||!(Math.abs(t.blendProbe-.5)<=Be.blend)?`additive blending into ${le(t.floatBlend).toUpperCase()}: probe ${t.blendProbe} (0.5 expected)`:null}const Ne=.5,lr=8,mr=t=>Math.min(Math.max(0,t),Ne/lr)/Ne;function dr(t){const e=ot("auroral-zone",t);return D.map(r=>e[r])}function ie(t,e,r,a,n,s=1){const o=t.length,i=new Float32Array(o),u=new Float32Array(o),f=Math.min(1,Math.max(0,n));for(let c=0;c<o;c++){const h=e[c]===0||e[c]===1||e[c]===2,l=r[c];i[c]=h&&l>0?t[c]*(a/l)*f*s:0,u[c]=h?t[c]*(1-f):t[c]}return{map:i,coarse:u}}const P=12,I=["core","env","glow"],pr=t=>[(-t*t*t+2*t*t-t)/2,(3*t*t*t-5*t*t+2)/2,(-3*t*t*t+4*t*t+t)/2,(t*t*t-t*t)/2],Ue=(t,e)=>({w:t==="linear"?[0,1-e,e,0]:pr(e),u2:e,wc:t==="cubicw"?1:0});function Er(t,e,r,a){const n=Math.PI/180,s=t*n,o=e*n,i=[Math.sin(s)*Math.cos(o),Math.cos(s)*Math.cos(o),Math.sin(o)],u=[Math.cos(s),-Math.sin(s),0],f=[i[1]*u[2]-i[2]*u[1],i[2]*u[0]-i[0]*u[2],i[0]*u[1]-i[1]*u[0]].map(h=>-h),c=f[2]<0?f.map(h=>-h):f;return{f:i,r:u,up:c,tanH:Math.tan(.5*r*n),size:a}}function ke(t,e,r,a,n=5,s=1){const o=Math.PI/180,i=Math.tan(.5*r*o),u=Math.min(80,.5*r+n),f=Math.tan(u*o),c=2*Math.max(2,Math.round(.5*a*s*f/i));return Er(t,e,2*u,c)}const br={N:8,dt:.25,margin:5,envBands:16,cut:4,mode:"cubic",maxMapSize:512,pitchDegMax:.25},xr=16,ce=2,U=6,De=16*U*ce,$=(t,e)=>{t.push(e),t.length>600&&t.shift()};function Le(t,e,r){const a=t.msg.red,n=e.msg.red;if(!a||!n)return null;const s=a.A.length,o=new Float32Array(s),i=new Float32Array(s);for(let u=0;u<s;u++)o[u]=a.A[u]+(n.A[u]-a.A[u])*r,i[u]=a.Y[u]+(n.Y[u]-a.Y[u])*r;return{A:o,Y:i}}let se=null;function vr(t,e){const r=t.createProgram(),a=!!t.getExtension("KHR_parallel_shader_compile");e.programs.add(r);const n=[[t.VERTEX_SHADER,er],[t.FRAGMENT_SHADER,jt]].map(([c,h])=>{const l=t.createShader(c);return t.shaderSource(l,h),t.compileShader(l),t.attachShader(r,l),{s:l}});t.transformFeedbackVaryings(r,tr,t.INTERLEAVED_ATTRIBS),t.linkProgram(r);let s=!1,o=null;const i=()=>!a||t.getProgramParameter(r,37297)===!0;e.deferred.set(r,{shaders:n,ready:i});const u=()=>{if(!(s||o||!n.length))try{for(const{s:c}of n)if(!t.getShaderParameter(c,t.COMPILE_STATUS))throw new Error(`zoneCurtainExpand compile: ${t.getShaderInfoLog(c)}`);if(!t.getProgramParameter(r,t.LINK_STATUS))throw new Error(`zoneCurtainExpand link: ${t.getProgramInfoLog(r)}`);s=!0}catch(c){o=c instanceof Error?c:new Error(String(c))}finally{for(const{s:c}of n)t.getAttachedShaders(r)?.includes(c)&&t.detachShader(r,c),t.deleteShader(c);n.length=0,e.deferred.delete(r)}},f=new Map;return{prog:r,loc:{get:c=>(f.has(c)||f.set(c,t.getUniformLocation(r,c)),f.get(c))},done:()=>s||o!==null||i(),check:()=>{if(u(),o)throw o}}}const Rr=120,Tr=30,Ar=t=>[{set:"core",tgt:"core",tab:0,pulse:1},{set:"env",tgt:"env",tab:t,pulse:1},{set:"glow",tgt:"env",tab:t,pulse:0}],Ie=new Float32Array([0,0,1,0,0,1,1,1]),_r=(t,e)=>({level:Math.min(3,Math.max(0,Math.round(t))),seed:e}),Je=[0,1,2,15];function q(t){const e=n=>t.getParameter(n),r=e(t.ACTIVE_TEXTURE),a=Je.map(n=>(t.activeTexture(t.TEXTURE0+n),e(t.TEXTURE_BINDING_2D)));return t.activeTexture(r),{prog:e(t.CURRENT_PROGRAM),vao:e(t.VERTEX_ARRAY_BINDING),array:e(t.ARRAY_BUFFER_BINDING),copyRead:e(t.COPY_READ_BUFFER_BINDING),copyWrite:e(t.COPY_WRITE_BUFFER_BINDING),tfo:e(t.TRANSFORM_FEEDBACK_BINDING),tfBuffer:e(t.TRANSFORM_FEEDBACK_BUFFER_BINDING),discard:t.isEnabled(t.RASTERIZER_DISCARD),blend:t.isEnabled(t.BLEND),viewport:e(t.VIEWPORT),scissor:t.isEnabled(t.SCISSOR_TEST),drawFb:e(t.DRAW_FRAMEBUFFER_BINDING),readFb:e(t.READ_FRAMEBUFFER_BINDING),cull:t.isEnabled(t.CULL_FACE),depth:t.isEnabled(t.DEPTH_TEST),unpack:e(t.UNPACK_ALIGNMENT),unit:r,tex:a}}function K(t,e){const r=(a,n)=>{n?t.enable(a):t.disable(a)};r(t.RASTERIZER_DISCARD,e.discard),t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,e.tfo),t.bindBuffer(t.TRANSFORM_FEEDBACK_BUFFER,e.tfBuffer),t.bindVertexArray(e.vao),t.bindBuffer(t.ARRAY_BUFFER,e.array),t.bindBuffer(t.COPY_READ_BUFFER,e.copyRead),t.bindBuffer(t.COPY_WRITE_BUFFER,e.copyWrite),t.vertexAttrib4f(12,0,0,0,1),t.useProgram(e.prog),r(t.BLEND,e.blend),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD),r(t.CULL_FACE,e.cull),r(t.DEPTH_TEST,e.depth),r(t.SCISSOR_TEST,e.scissor),t.viewport(e.viewport[0],e.viewport[1],e.viewport[2],e.viewport[3]),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,e.drawFb),t.bindFramebuffer(t.READ_FRAMEBUFFER,e.readFb),t.pixelStorei(t.UNPACK_ALIGNMENT,e.unpack),Je.forEach((a,n)=>{t.activeTexture(t.TEXTURE0+a),t.bindTexture(t.TEXTURE_2D,e.tex[n]??null)}),t.activeTexture(e.unit)}function Fr(t,e,r){const a=performance.now(),n=f=>Number(t.getParameter(f)),s=t.getSupportedExtensions()??[],o=!!t.getExtension("EXT_color_buffer_float"),i=r||!!t.getExtension("EXT_float_blend"),u={colorBufferFloat:o,floatBlend:i,fence:typeof t.fenceSync=="function",maxTextureSize:n(t.MAX_TEXTURE_SIZE),maxVertexAttribs:n(t.MAX_VERTEX_ATTRIBS),maxTfInterleaved:n(t.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS),maxVertexTextureUnits:n(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureUnits:n(t.MAX_TEXTURE_IMAGE_UNITS),maxFragmentUniformVectors:n(t.MAX_FRAGMENT_UNIFORM_VECTORS),maxVertexUniformVectors:n(t.MAX_VERTEX_UNIFORM_VECTORS),filterProbe:null,blendProbe:null,probeError:null,reason:null,target:le(i),timerQuery:s.includes("EXT_disjoint_timer_query_webgl2"),floatLinear:s.includes("OES_texture_float_linear"),probeMs:0};if(Ce({...u,filterProbe:.5,blendProbe:.5})===null){const f=q(t),c=t.getParameter(t.PIXEL_PACK_BUFFER_BINDING);let h=null,l=null,d=null,p=null;try{t.activeTexture(t.TEXTURE15),h=e.texture(2,1,t.RGBA16F,t.RGBA,t.FLOAT,new Float32Array([0,0,0,0,1,1,1,1])),t.bindTexture(t.TEXTURE_2D,h),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),l=e.target(1,1,i?t.RGBA32F:t.RGBA16F,t.RGBA),d=e.program("zoneCurtainProbe",C,Jt),p=t.createVertexArray(),t.bindVertexArray(p),t.useProgram(d.prog),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,h),t.uniform1i(d.loc.get("uT"),0),t.bindFramebuffer(t.FRAMEBUFFER,l.fbo),t.viewport(0,0,1,1),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.clearBufferfv(t.COLOR,0,[0,0,0,0]),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD),t.drawArrays(t.TRIANGLES,0,3),t.drawArrays(t.TRIANGLES,0,3);const m=new Float32Array(4);t.bindBuffer(t.PIXEL_PACK_BUFFER,null),t.readPixels(0,0,1,1,t.RGBA,t.FLOAT,m);const E=t.getError();E!==t.NO_ERROR&&(u.probeError=`GL error 0x${E.toString(16)}`),u.filterProbe=m[0]/2,u.blendProbe=m[1]}catch(m){u.probeError=(m instanceof Error?m.message:String(m)).split(`
`)[0].slice(0,200)}finally{p&&t.deleteVertexArray(p),d&&(t.deleteProgram(d.prog),e.programs.delete(d.prog)),l&&e.deleteTarget(l),h&&e.deleteTexture(h),K(t,f),t.bindBuffer(t.PIXEL_PACK_BUFFER,c)}}return u.reason=Ce(u),u.probeMs=performance.now()-a,u}class Sr{opt;caps=null;stats={frames:0,maps:0,misses:0,miss3:0,states:0,workerMs:[],uploadBytes:0,tablesMs:null,tableLayers:[],slots:{core:0,env:0,glow:0},segsLastSlice:0,eventsDropped:0,mainMs:[],glErrors:0,failed:null,target:"",stillFrames:0,restarts:0,composed:0,w:0,meterReads:0,meterBack:0,meterTimeouts:0,meterLatency:0,meterMs:[],meterN:0,meterSteps:[],collectMs:[],collectSteps:[],redPasses:0,first:{made:typeof performance<"u"?performance.now():0,programs:null,linked:null,tables:null,state:null,maps:null,metered:null,faded:null,tablesCached:!1}};debugMeterN=null;meterIn=null;debugW=null;debugCompose=!0;debugFadeHold=!1;debugClassGain=null;debugRedOff=!1;debugRedSource=null;debugN=null;get nNow(){return this.nCur}nCur;seed;debugMaps=null;debugHold=!1;debugScene=null;res=null;worker=null;makeWorker;key="";scene=null;tables=null;tablesAsked=!1;ring=[];pending=[];inFlight=!1;nextT=0;reqId=0;cap={core:0,env:0,glow:0};pX=null;pR=null;pD=null;pC=null;pRed=null;redTex=null;progQueue=[];tableWorker=null;pM=[];mS=null;mB=null;mF=null;pbos=[];reads=[];extIds=new WeakMap;extNext=1;vaoX=null;vaoR=null;vaoD=null;quad=null;tfo=null;out=null;kTex=null;refTex=null;refLevel=-1;accFmt=0;A=null;B=null;acc=null;Ta=0;Tb=0;cur=null;slice=0;fdts=[];lastT=null;waitSince=null;trash=[];w=0;lastWall=null;unmetered=0;retiring=null;retShare=0;retOut=null;outAt=null;holdS=0;retiringShare(e){return this.retiring?this.retShare*(this.retOut??1-e):0}meterPairs(){if(this.retOut===null||!this.retiring||this.debugMaps||this.debugW!==null)return this.pairs();if(!this.programReady())return[];const e=[],r=this.maps(),a=this.retShare*(1-this.w);return a>0&&e.push({m:this.retiring,share:a}),r&&this.w>0&&e.push({m:r,share:this.w}),e}constructor(e={},r,a=0){this.opt={...br,...e},this.nCur=this.opt.N,this.seed=a>>>0,this.makeWorker=r??(()=>new Worker(new URL(""+new URL("zone-curtain.worker-CRdV9wDS.js",import.meta.url).href,import.meta.url),{type:"module"}))}maps(){return this.debugMaps?this.debugMaps:!this.A||!this.B||!this.linked?null:{A:this.A,B:this.B,alpha:this.alphaAt(this.lastT??this.Ta),fallback:null}}alphaAt(e){return this.Tb>this.Ta?Math.min(1,Math.max(0,(e-this.Ta)/(this.Tb-this.Ta))):1}pairs(){if(!this.programReady())return[];if(this.debugMaps)return[{m:this.debugMaps,share:this.debugW??this.w}];const e=[],r=this.maps(),a=this.debugW??this.w;if(this.retiring&&this.debugW===null){const n=this.retiringShare(a);n>0&&e.push({m:this.retiring,share:n})}return r&&a>0&&e.push({m:r,share:a}),e}weight(){return(this.debugMaps??this.maps())&&this.programReady()?this.debugW??this.w:0}shares(){let e=0,r=0;for(const a of this.pairs())a.m===this.retiring?r=a.share:e=a.share;return{current:e,retiring:r}}coarseRates(e,r){return this.debugW!==null?this.debugW>0?ie(e,r,e,1,this.debugW).coarse:e:this.stats.failed?e:ie(e,r,e,1,1).coarse}compose(e,r,a,n,s,o,i){const u=this.pairs(),f=this.pC;if(!u.length||!f||!this.debugCompose)return!1;e.useProgram(f.prog),o(f),e.uniform1iv(f.loc.get("uClass"),Int32Array.from(a));const c=dr(n),h=this.debugClassGain;for(const{m:l,share:d}of u){this.bindMaps(e,f,l.A,l.B,l.fallback,l.alpha,2);const p=ie(r,a,c,l.A.kR,d,s).map;if(h)for(let m=0;m<p.length;m++)p[m]=p[m]*(h[a[m]]??1);e.uniform1fv(f.loc.get("uRate"),p),i()}return e.activeTexture(e.TEXTURE0),this.stats.composed++,!0}meterField(){return Me(this.meterPairs().map(({m:e,share:r})=>({A:e.A.reading,B:e.B.reading,alpha:e.alpha,share:r})))}meterStats(e,r){const a=we(e,r,Fe(),this.meterField()),n=this.retOut===null?a.mean:we(e,r,Fe(),Me(this.pairs().map(({m:s,share:o})=>({A:s.A.reading,B:s.B.reading,alpha:s.alpha,share:o})))).mean;return{...a,shown:n}}meter(e,r){if(this.stats.failed||!this.pM.length||!this.programReady())return;const a=this.debugMaps?null:this.maps(),n=[...this.meterPairs().map(m=>m.m),...a?[a]:[]];if(!n.length)return;const s=2*r.radiusDeg,o=zt(r.radiusDeg,Math.min(this.opt.pitchDegMax,s/128),this.debugMeterN??void 0);let i=0;r.ext&&(i=this.extIds.get(r.ext)??0,i||(i=this.extNext++,this.extIds.set(r.ext,i)));const u=`${r.axis.map(m=>m.toFixed(4)).join(",")}|${o.n}|${o.tanR.toFixed(6)}|${i}`,f=[];for(const m of n)for(const E of[m.A,m.B])f.length>=ce||f.includes(E)||E.readKey===u||this.reads.some(_=>_.items.some(b=>b.M===E&&b.gen===E.gen&&b.key===u))||f.push(E);const c=D.map(m=>r.rates[m]??0);if(this.meterIn={axis:[...r.axis],radiusDeg:r.radiusDeg,n:o.n,tanR:o.tanR,count:o.count,level:r.level,cls:Array.from(r.cls),weights:c},!f.length)return;const h=this.steps,l=performance.now(),d=q(e),p=e.getParameter(e.PIXEL_PACK_BUFFER_BINDING);h.fill(0),h[1]=performance.now()-l;try{const m=Se(r.cls),E=ye(r.cls);f.forEach((S,Z)=>this.reduce(e,S,r,o,Z));const _=performance.now(),b=this.res;let x=this.pbos.pop();x||(x=e.createBuffer(),b.buffers.add(x),e.bindBuffer(e.PIXEL_PACK_BUFFER,x),e.bufferData(e.PIXEL_PACK_BUFFER,De,e.STREAM_READ),b.recordBuffer(x,De)),e.bindFramebuffer(e.FRAMEBUFFER,this.mF.fbo),e.bindBuffer(e.PIXEL_PACK_BUFFER,x),e.readPixels(0,0,U*f.length,1,e.RGBA,e.FLOAT,0),e.bindBuffer(e.PIXEL_PACK_BUFFER,null);const F=performance.now();h[5]=F-_;const M=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0);if(h[6]=performance.now()-F,!M)throw this.pbos.push(x),new Error("fenceSync returned null");this.reads.push({items:f.map(S=>({M:S,gen:S.gen,key:u,chan:m,red:E})),sync:M,pbo:x,frames:0}),e.activeTexture(e.TEXTURE0),this.stats.meterReads+=f.length,this.stats.meterN=o.n}catch(m){this.stats.failed=`zoneCurtainMeter: ${m instanceof Error?m.message:String(m)}`}finally{const m=performance.now();K(e,d),e.bindBuffer(e.PIXEL_PACK_BUFFER,p);const E=performance.now();h[0]=E-l,h[7]=E-m,$(this.stats.meterMs,h[0]),$(this.stats.meterSteps,Array.from(h))}}steps=new Float64Array(8);collect(e){if(!this.reads.length||this.stats.failed)return;const r=performance.now(),a=e.getParameter(e.PIXEL_PACK_BUFFER_BINDING),n=[0,0,0];try{this.poll(e,n)}catch(s){this.stats.failed=`zoneCurtainMeter: ${s instanceof Error?s.message:String(s)}`}finally{e.bindBuffer(e.PIXEL_PACK_BUFFER,a),n[0]=performance.now()-r,$(this.stats.collectMs,n[0]),$(this.stats.collectSteps,n)}}poll(e,r){for(const a of[...this.reads]){const n=performance.now(),s=e.clientWaitSync(a.sync,0,0);r[1]=r[1]+performance.now()-n;const o=s===e.ALREADY_SIGNALED||s===e.CONDITION_SATISFIED;if(!(!o&&s!==e.WAIT_FAILED&&++a.frames<=Rr)){if(this.reads.splice(this.reads.indexOf(a),1),e.deleteSync(a.sync),o){const i=new Float32Array(4*U*a.items.length),u=performance.now();e.bindBuffer(e.PIXEL_PACK_BUFFER,a.pbo),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,i),r[2]=r[2]+performance.now()-u,a.items.forEach((f,c)=>{const h=4*U*c,l=D.length,d=new Float64Array(l),p=new Float64Array(l);f.chan.forEach((m,E)=>{d[m]=i[h+E],p[m]=i[h+4+E]}),f.red>=0&&(d[f.red]=i[h+12],p[f.red]=i[h+16]),f.M.gen===f.gen&&(f.M.reading={sums:d,count:i[h+8],box:p,boxTotal:i[h+9]+(f.red>=0?Math.max(0,i[h+21]):0)},f.M.readKey=f.key)}),this.stats.meterBack+=a.items.length,this.stats.meterLatency=a.frames}else this.stats.meterTimeouts+=a.items.length;this.pbos.push(a.pbo)}}}reduce(e,r,a,n,s){const o=Se(a.cls),i=ye(a.cls);this.reduceSet(e,r,a,n,o,U*s),i>=0&&this.reduceSet(e,r,a,n,[i],U*s+3)}reduceSet(e,r,a,n,s,o){const i=this.res,u=n.n,f=u/k,c=this.pM[0],h=this.pM[1],l=this.pM[2],d=this.steps,p=performance.now(),m=(T,me,de)=>{if(T&&T.w===me&&T.h===de)return T;if(T){const at=T;this.defer(()=>i.deleteTarget(at))}e.activeTexture(e.TEXTURE15);const rt=i.target(me,de,e.RGBA32F,e.RGBA);return e.activeTexture(e.TEXTURE0),rt},E=this.mS=m(this.mS,u,u),_=this.mB=m(this.mB,3*f,f),b=this.mF=m(this.mF,U*ce,1),x=Gt(a.axis),F=this.meterIn.weights,M=[0,1,2,3].map(T=>s[T]??0),S=[0,1,2,3].map(T=>s[T]!==void 0?r.kR:0),Z=[0,1,2,3].map(T=>s[T]!==void 0?F[s[T]]??0:0);e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.bindVertexArray(this.vaoD),e.useProgram(c.prog),a.bind(c),e.uniform3fv(c.loc.get("uMF"),x.F),e.uniform3fv(c.loc.get("uMR"),x.R),e.uniform3fv(c.loc.get("uMU"),x.U),e.uniform1f(c.loc.get("uTanR"),n.tanR),e.uniform1f(c.loc.get("uN"),u),e.uniform3fv(c.loc.get("mF"),r.cam.f),e.uniform3fv(c.loc.get("mR"),r.cam.r),e.uniform3fv(c.loc.get("mU"),r.cam.up),e.uniform2f(c.loc.get("mT"),r.cam.tanH,r.n),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,r.core.tex),e.uniform1i(c.loc.get("mC"),2),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,r.env.tex),e.uniform1i(c.loc.get("mE"),3),e.uniform1iv(c.loc.get("uComp"),Int32Array.from(M)),e.uniform1iv(c.loc.get("uCls"),Int32Array.from(M.map(T=>a.cls[T]??0))),e.uniform1fv(c.loc.get("uK"),Float32Array.from(S)),e.bindFramebuffer(e.FRAMEBUFFER,E.fbo),e.viewport(0,0,u,u),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(h.prog),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,E.tex),e.uniform1i(h.loc.get("uS"),2),e.uniform1f(h.loc.get("uN"),u),e.uniform4fv(h.loc.get("uW"),Float32Array.from(Z)),e.bindFramebuffer(e.FRAMEBUFFER,_.fbo),e.viewport(0,0,3*f,f),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(l.prog),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,_.tex),e.uniform1i(l.loc.get("uB"),2),e.uniform1i(l.loc.get("uNB"),f),e.uniform1i(l.loc.get("uOff"),o),e.bindFramebuffer(e.FRAMEBUFFER,b.fbo),e.viewport(o,0,3,1),e.drawArrays(e.TRIANGLES,0,3),d[4]=d[4]+performance.now()-p}debugMeterSamples(e){return this.mS?this.readTarget(e,this.mS):null}frame(e){if(this.stats.failed||this.debugHold)return;const r=performance.now(),a=e.gl,n=q(a);this.holdS=Math.max(0,e.holdS??0);try{this.res=e.res,this.flush();const s=this.debugScene??_r(e.level,e.seed),o=this.debugScene?JSON.stringify(s):`${s.level}|${s.seed}`,i=this.ring.length?this.ring[0].t:null,u=this.lastT!==null&&e.tModel<this.lastT-1e-6,f=this.lastT!==null&&(e.tModel>this.lastT+5||u&&(i===null||e.tModel<i-1e-6));this.worker&&(o!==this.key||f)&&this.restart(o!==this.key),this.key=o,this.scene=s,this.worker||this.start(e),this.pX?this.askPrograms(1):this.programs(a,e),this.take(a);const c=this.lastT!==null&&e.tModel===this.lastT;if(this.want(e.tModel),e.dtSeconds>0&&!c&&(this.fdts.push(e.dtSeconds),this.fdts.length>31&&this.fdts.shift()),this.lastT=e.tModel,!this.tables||this.ring.length<4||!this.programReady()){this.ring.length>7&&this.trim();return}this.slice===0&&(this.nCur=this.debugN??(e.lite?xr:this.opt.N));const h=this.fdt(),l=this.nCur;if(!this.A||!this.B){const d=performance.now();if(this.waitSince??=d,this.ring[this.ring.length-1].t<e.tModel+2*l*h+this.opt.dt&&d-this.waitSince<1500)return;this.waitSince=null,this.A=this.fillMap(a,this.newMap(e),e.tModel),this.B=this.fillMap(a,this.newMap(e),e.tModel+l*h),this.Ta=this.A.T,this.Tb=this.B.T,this.slice=0,this.stats.first.maps??=performance.now()}else if(c){this.stats.stillFrames++;return}if(this.slice===0&&(this.acc=this.recenter(e,this.acc),this.cur=this.job(e.tModel+2*l*h,this.acc.cam),this.acc.T=this.cur.T,this.acc.kR=this.cur.X.S[1].msg.kR,this.stats.maps++,this.cur.miss&&this.stats.misses++,this.clearMap(a,this.acc),this.drawRed(a,this.acc,this.cur)),this.drawSlice(a,this.acc,this.cur,this.slice,l),++this.slice===l){const d=this.A;this.A=this.B,this.B=this.acc,this.acc=d,this.Ta=this.Tb,this.Tb=this.B.T,this.slice=0}this.trim(),this.stats.frames++}catch(s){this.stats.failed=s instanceof Error?s.message:String(s)}finally{this.fade(),K(a,n);const s=performance.now()-r;this.stats.mainMs.push(s),this.stats.mainMs.length>600&&this.stats.mainMs.shift()}}dispose(){this.worker?.terminate(),this.worker=null,this.tableWorker?.terminate(),this.tableWorker=null,this.progQueue=[];const e=this.res;if(e&&!e.gl.isContextLost()){const r=e.gl;this.flush();for(const a of this.ring)for(const n of I)e.deleteBuffer(a.buf[n]);for(const a of[this.A,this.B,this.acc,this.retiring?.A,this.retiring?.B])a&&(e.deleteTarget(a.core),e.deleteTarget(a.env));for(const a of this.tables??[])e.deleteTexture(a.tex),e.deleteTexture(a.coef);this.kTex&&e.deleteTexture(this.kTex),this.redTex&&e.deleteTexture(this.redTex),this.refTex&&e.deleteTexture(this.refTex),this.out&&e.deleteBuffer(this.out.buf),this.quad&&e.deleteBuffer(this.quad);for(const a of[this.vaoX,this.vaoR,this.vaoD])a&&(r.deleteVertexArray(a),e.vaos.delete(a));this.tfo&&r.deleteTransformFeedback(this.tfo),this.pD&&(r.deleteProgram(this.pD.prog),e.programs.delete(this.pD.prog));for(const a of[this.pX,this.pR,this.pRed,this.pC,...this.pM]){if(!a)continue;e.programs.delete(a.prog);const n=()=>{if(!r.isContextLost()){if(!a.done()){setTimeout(n,50);return}try{a.check()}catch{}r.deleteProgram(a.prog),e.deferred.delete(a.prog)}};n()}for(const a of[this.mS,this.mB,this.mF])a&&e.deleteTarget(a);for(const a of this.reads)r.deleteSync(a.sync),this.pbos.push(a.pbo);for(const a of this.pbos)e.deleteBuffer(a)}this.pM=[],this.mS=this.mB=this.mF=null,this.pbos=[],this.reads=[],this.linked=!1,this.res=null,this.ring=[],this.pending=[],this.tables=null,this.tablesAsked=!1,this.A=this.B=this.acc=null,this.cur=null,this.trash=[],this.retiring=null,this.retShare=0,this.retOut=null,this.outAt=null,this.w=0,this.lastWall=null,this.pX=this.pR=this.pD=this.pC=this.pRed=null,this.redTex=null,this.vaoX=this.vaoR=this.vaoD=null,this.quad=null,this.tfo=null,this.out=null,this.kTex=null,this.refTex=null,this.refLevel=-1,this.cap={core:0,env:0,glow:0},this.inFlight=!1,this.lastT=null,this.key=""}start(e){const r=this.makeWorker();if(r.onmessage=a=>this.onMessage(a.data),r.onerror=a=>{this.stats.failed=`worker: ${a.message}`},this.worker=r,this.inFlight=!1,this.nextT=e.tModel-this.opt.dt,this.post({cmd:"init",scene:this.scene,obs:[0,0],red:this.debugRedSource??"dynamic"}),!this.tablesAsked){this.tablesAsked=!0;const a=this.opt.envBands===16?[16]:[16,this.opt.envBands],n=a.join(",");if(se?.bands===n)this.pendingTables=se.tables,this.stats.tablesMs=0,this.stats.first.tablesCached=!0;else{const s=this.tableWorker=this.makeWorker();s.onmessage=o=>{const i=o.data;if(i.cmd==="tables"){se={bands:n,tables:i.tables},this.pendingTables=i.tables,this.stats.tablesMs=i.ms;for(const u of this.waiters.splice(0))u()}else i.cmd==="error"&&(this.stats.failed=`worker: ${i.message}`);s.terminate(),this.tableWorker===s&&(this.tableWorker=null)},s.onerror=o=>{this.stats.failed=`worker: ${o.message}`},s.postMessage({cmd:"tables",bands:a})}}}post(e){this.worker.postMessage(e)}restart(e=!1){this.worker?.terminate(),this.worker=null,this.stats.restarts++;const r=this.res,a=this.ring;r&&this.defer(()=>{for(const u of a)for(const f of I)r.deleteBuffer(u.buf[f])}),this.ring=[],this.pending=[],this.cur=null,this.slice=0,this.cap={core:0,env:0,glow:0},this.waitSince=null;const n=this.A,s=this.B,o=n&&s?this.w:0,i=this.retiringShare(this.w);if(n&&s&&o>0&&o>=i){const u=this.retiring;u&&this.defer(()=>{this.delMap(u.A),this.delMap(u.B)}),this.retiring={A:n,B:s,alpha:this.alphaAt(this.lastT??this.Ta),fallback:null},this.retShare=o}else{for(const u of[n,s])u&&this.defer(()=>this.delMap(u));this.retiring&&(this.retShare=i)}this.retOut=this.retiring&&(e||this.retOut!==null)?1:null,this.outAt=null,this.A=this.B=null,this.w=0,!this.tables&&!this.pendingTables&&!this.tableWorker&&(this.tablesAsked=!1)}onMessage(e){if(e.cmd==="error"){this.stats.failed=`worker: ${e.message}`;return}if(e.cmd==="tables"){this.pendingTables=e.tables,this.stats.tablesMs=e.ms;return}if(e.cmd==="state"){this.inFlight=!1,this.pending.push(e),this.stats.workerMs.push(e.ms.total),this.stats.workerMs.length>120&&this.stats.workerMs.shift(),this.lastT!==null&&this.want(this.lastT);for(const r of this.waiters.splice(0))r()}}pendingTables=null;waiters=[];want(e){if(this.inFlight||!this.worker)return;const r=2*this.nCur*this.fdt()+2*this.opt.dt+.3;if(this.nextT<=e+r){this.inFlight=!0;const a=this.acc?.cam??this.B?.cam??null;this.post({cmd:"state",id:++this.reqId,t:this.nextT,cull:a?{f:[...a.f],tanH:a.tanH,margin:14}:null}),this.nextT+=this.opt.dt}}take(e){for(this.pendingTables&&(this.uploadTables(e,this.pendingTables),this.pendingTables=null);this.pending.length;){const r=this.pending.shift(),a=this.res,n={},s={};for(const o of I)this.grow(e,o,r.sets[o].n),s[o]=r.sets[o].n;for(const o of I){const i=e.createBuffer();a.buffers.add(i),e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,Math.max(1,this.cap[o])*P*4,e.DYNAMIC_DRAW),a.recordBuffer(i,Math.max(1,this.cap[o])*P*4),s[o]&&e.bufferSubData(e.ARRAY_BUFFER,0,r.sets[o].data,0,s[o]*P),this.stats.uploadBytes+=s[o]*P*4,n[o]=i}e.bindBuffer(e.ARRAY_BUFFER,null),this.ring.push({t:r.t,k:r.k,n:s,buf:n,msg:r}),this.stats.states++,this.stats.first.state??=performance.now();for(const o of I)this.stats.slots[o]=Math.max(this.stats.slots[o],s[o])}}grow(e,r,a){if(a<=this.cap[r])return;const n=Math.max(4096,Math.ceil(a*1.5/1024)*1024),s=this.res,o=[];for(const i of this.ring){const u=e.createBuffer();s.buffers.add(u),e.bindBuffer(e.COPY_WRITE_BUFFER,u),e.bufferData(e.COPY_WRITE_BUFFER,n*P*4,e.DYNAMIC_DRAW),s.recordBuffer(u,n*P*4),i.n[r]&&(e.bindBuffer(e.COPY_READ_BUFFER,i.buf[r]),e.copyBufferSubData(e.COPY_READ_BUFFER,e.COPY_WRITE_BUFFER,0,0,i.n[r]*P*4)),o.push(i.buf[r]),i.buf[r]=u}o.length&&this.defer(()=>{for(const i of o)s.deleteBuffer(i)}),e.bindBuffer(e.COPY_READ_BUFFER,null),e.bindBuffer(e.COPY_WRITE_BUFFER,null),this.cap[r]=n}trim(){const e=this.res;for(;this.ring.length>7&&!(this.cur&&this.cur.X.S.includes(this.ring[0]));){const r=this.ring.shift();this.defer(()=>{for(const a of I)e.deleteBuffer(r.buf[a])})}}fade(){const e=performance.now(),r=this.lastWall===null?0:mr((e-this.lastWall)/1e3);if(this.lastWall=e,this.debugFadeHold)return;const a=this.maps(),n=!!a&&!!a.A.reading&&!!a.B.reading;this.unmetered=a&&!n?this.unmetered+1:0,n&&(this.stats.first.metered??=e),this.w>=1&&(this.stats.first.faded??=e);const s=a!==null&&this.programReady()&&(n||this.w>0||this.unmetered>Tr);this.retiring&&this.retOut!==null&&s&&(this.retOut=Math.max(0,this.retOut-r)),this.retOut===0&&this.outAt===null&&(this.outAt=e);const o=!!this.retiring&&this.retOut!==null&&(this.retOut>0||e-(this.outAt??e)<1e3*this.holdS),i=s&&(!o||this.w>0);if(this.w=i?Math.min(1,this.w+r):0,this.retiring&&this.w>=1){const u=this.retiring;this.retiring=null,this.retShare=0,this.retOut=null,this.outAt=null,this.defer(()=>{this.delMap(u.A),this.delMap(u.B)})}this.stats.w=this.w}programReady(){if(this.linked)return!0;if(this.progQueue.length||!this.pX||!this.pR||!this.pRed||!this.pC||this.pM.length<3)return!1;const e=[this.pX,this.pR,this.pRed,this.pC,...this.pM];if(!e.every(r=>r.done()))return!1;try{for(const r of e)r.check();return this.linked=!0,this.stats.first.linked??=performance.now(),!0}catch(r){return this.stats.failed=`zoneCurtainCompose: ${r instanceof Error?r.message:String(r)}`,!1}}askPrograms(e){for(let r=0;r<e&&this.progQueue.length;r++)this.progQueue.shift()()}linked=!1;defer(e){this.trash.push(e)}flush(){if(this.trash.length)for(const e of this.trash.splice(0))e()}fdt(){if(!this.fdts.length)return 1/60;const e=[...this.fdts].sort((r,a)=>r-a);return Math.min(.1,Math.max(1/240,e[e.length>>1]))}programs(e,r){const a=r.res;if(!e.getExtension("EXT_color_buffer_float"))throw new Error("EXT_color_buffer_float missing");this.accFmt=le(r.floatBlend||!!e.getExtension("EXT_float_blend"))==="rgba32f"?e.RGBA32F:e.RGBA16F,this.stats.target=this.accFmt===e.RGBA32F?"rgba32f":"rgba16f",this.stats.first.programs??=performance.now(),this.progQueue=[()=>{this.pX=vr(e,a)},()=>{this.pR=a.programDeferred("zoneCurtainRaster",rr,ar)},()=>{this.pRed=a.programDeferred("zoneCurtainRed",C,sr)},()=>{this.pC=a.programDeferred("zoneCurtainCompose",C,ir)},()=>{this.pM.push(a.programDeferred("zoneCurtainMeter",C,ur))},()=>{this.pM.push(a.programDeferred("zoneCurtainMeterBlock",C,cr))},()=>{this.pM.push(a.programDeferred("zoneCurtainMeterFinal",C,fr))}],e.getExtension("KHR_parallel_shader_compile")?this.askPrograms(1/0):this.askPrograms(1),e.activeTexture(e.TEXTURE15),this.redTex=a.texture(g,1,e.RG32F,e.RG,e.FLOAT,new Float32Array(2*g)),e.activeTexture(e.TEXTURE0),this.vaoX=e.createVertexArray(),this.vaoR=e.createVertexArray(),this.vaoD=e.createVertexArray();for(const s of[this.vaoX,this.vaoR,this.vaoD])a.vaos.add(s);this.quad=e.createBuffer(),a.buffers.add(this.quad),a.recordBuffer(this.quad,Ie.byteLength),e.bindVertexArray(this.vaoR),e.bindBuffer(e.ARRAY_BUFFER,this.quad),e.bufferData(e.ARRAY_BUFFER,Ie,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);for(let s=1;s<=12;s++)e.enableVertexAttribArray(s),e.vertexAttribDivisor(s,1);e.bindVertexArray(this.vaoX);for(let s=0;s<12;s++)e.enableVertexAttribArray(s);e.disableVertexAttribArray(12),e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null),this.tfo=e.createTransformFeedback();const n=e.createBuffer();a.buffers.add(n),this.out={buf:n,cap:0},e.activeTexture(e.TEXTURE15),this.kTex=a.texture(9,y,e.RG32F,e.RG,e.FLOAT,Ft(9)),e.activeTexture(e.TEXTURE0)}uploadTables(e,r){const a=this.res;e.activeTexture(e.TEXTURE15),this.tables=r.map(n=>{const s=a.texture(n.meta.tiledW,n.meta.tiledH,e.RGBA16F,e.RGBA,e.HALF_FLOAT,n.half);e.bindTexture(e.TEXTURE_2D,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR);const o=a.texture(n.coefW,n.coefH,e.RGBA32F,e.RGBA,e.FLOAT,n.coef);return{meta:n.meta,tex:s,coef:o}}),e.activeTexture(e.TEXTURE0),this.stats.tableLayers=r.map(n=>n.meta.layers),this.stats.first.tables??=performance.now()}refFor(e,r){if(this.refTex&&this.refLevel===r)return this.refTex;const a=this.res,n=It(z[r]);return e.activeTexture(e.TEXTURE15),this.refTex?(e.bindTexture(e.TEXTURE_2D,this.refTex),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texSubImage2D(e.TEXTURE_2D,0,0,0,V,1,e.RED,e.FLOAT,n)):this.refTex=a.texture(V,1,e.R32F,e.RED,e.FLOAT,n),e.activeTexture(e.TEXTURE0),this.refLevel=r,this.refTex}mapCameraOf(e){const[r,a,n]=e.dir,s=Math.atan2(r,a)*180/Math.PI,o=Math.asin(Math.max(-1,Math.min(1,n)))*180/Math.PI,i=Math.min(150,Math.max(.5,e.fovDeg)),u=Math.min(e.pitchDeg??this.opt.pitchDegMax,i/128);let f=ke(s,o,i,Math.round(i/u),this.opt.margin);return f.size>this.opt.maxMapSize&&(f=ke(s,o,i,Math.round(i/u*this.opt.maxMapSize/f.size),this.opt.margin)),f}newMap(e,r=this.mapCameraOf(e)){const a=this.res,n=a.gl;n.activeTexture(n.TEXTURE15);const s={cam:r,n:r.size,core:a.target(r.size,r.size,this.accFmt,n.RGBA),env:a.target(r.size/2,r.size/2,this.accFmt,n.RGBA),T:0,kR:0,reading:null,readKey:"",gen:0,red:null};return n.activeTexture(n.TEXTURE0),s}delMap(e){const r=this.res;r&&(r.deleteTarget(e.core),r.deleteTarget(e.env))}recenter(e,r){const a=this.mapCameraOf(e);if(r&&r.n===a.size)return r.cam=a,r;if(r){const n=r;this.defer(()=>this.delMap(n))}return this.newMap(e,a)}clearMap(e,r){r.reading=null,r.readKey="",r.gen++,e.disable(e.SCISSOR_TEST);for(const a of[r.core,r.env])e.bindFramebuffer(e.FRAMEBUFFER,a.fbo),e.viewport(0,0,a.w,a.h),e.clearBufferfv(e.COLOR,0,[0,0,0,0])}job(e,r){const a=this.ring;let n=-1;for(let m=0;m<a.length-1;m++)a[m].t<=e+1e-9&&(n=m);let s=!1;n<0&&(n=0),e>a[a.length-1].t+1e-9&&(s=!0,e=a[a.length-1].t,n=a.length-2);const o=a[Math.max(0,n-1)],i=a[n],u=a[n+1],f=a[n+2]??(this.stats.miss3++,u),c=Math.min(1,Math.max(0,(e-i.t)/(u.t-i.t))),h=z[this.scene.level],[l,d]=this.footRange(r),p=_e(h,this.scene,e,l,d,X);return this.stats.eventsDropped+=p.dropped,{T:e,X:{S:[o,i,u,f],...Ue(this.opt.mode,c)},events:p.events,dropped:p.dropped,miss:s,red:Le(i,u,c)}}footRange(e){let r=1/0,a=-1/0;for(const n of[-1,0,1])for(const s of[-1,0,1]){const o=[0,1,2].map(f=>e.f[f]+n*e.tanH*e.r[f]+s*e.tanH*e.up[f]),i=Math.hypot(o[0],o[1],o[2]),u=o[2]/i;if(!(u>.02)){r=Math.min(r,-700),a=Math.max(a,700);continue}for(const f of[84,300]){const c=_t(f,u)*o[0]/i;r=Math.min(r,c),a=Math.max(a,c)}}return[Math.max(-760,r-60),Math.min(760,a+60)]}fillMap(e,r,a){const n=this.job(a,r.cam),s=this.nCur;r.T=n.T,r.kR=n.X.S[1].msg.kR,this.clearMap(e,r),this.drawRed(e,r,n);for(let o=0;o<s;o++)this.drawSlice(e,r,n,o,s);return r}drawRed(e,r,a){r.red=a.red;const n=this.pRed;if(!n||!this.redTex||!a.red||this.debugRedOff)return;const s=g,o=new Float32Array(2*s);for(let f=0;f<s;f++)o[2*f]=a.red.A[f],o[2*f+1]=a.red.Y[f];e.activeTexture(e.TEXTURE15),e.bindTexture(e.TEXTURE_2D,this.redTex),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texSubImage2D(e.TEXTURE_2D,0,0,0,s,1,e.RG,e.FLOAT,o),e.useProgram(n.prog),e.bindVertexArray(this.vaoD),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.bindFramebuffer(e.FRAMEBUFFER,r.env.fbo),e.viewport(0,0,r.env.w,r.env.h),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD),e.colorMask(!1,!1,!0,!1);const i=f=>n.loc.get(f),u=r.cam;e.uniform3fv(i("uF"),u.f),e.uniform3fv(i("uR"),u.r),e.uniform3fv(i("uU"),u.up),e.uniform1f(i("uTanH"),u.tanH),e.uniform1f(i("uSize"),r.env.w),e.uniform2f(i("uObs"),0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.redTex),e.uniform1i(i("uLine"),0),e.drawArrays(e.TRIANGLES,0,3),e.colorMask(!0,!0,!0,!0),e.disable(e.BLEND),e.bindVertexArray(null),this.stats.redPasses++}drawSlice(e,r,a,n,s){const o=this.expandSlice(e,a.X,n,s,r);return this.rasterSlice(e,r,o,a),o}groups(){return Ar(this.tables.length>1?1:0)}sliceSegs(e,r){let a=0;for(const n of this.groups()){const s=this.tables[n.tab].meta,o=Math.ceil(s.B/r);a+=o*Math.max(...e.S.map(i=>i.n[n.set]))}return a}expandSlice(e,r,a,n,s){const o=this.pX,i=this.out,u=this.sliceSegs(r,n),f=s.cam;u*B*4>i.cap&&(i.cap=Math.ceil(u*B*4*1.25),e.bindBuffer(e.ARRAY_BUFFER,i.buf),e.bufferData(e.ARRAY_BUFFER,i.cap,e.DYNAMIC_COPY),this.res.recordBuffer(i.buf,i.cap),e.bindBuffer(e.ARRAY_BUFFER,null)),e.useProgram(o.prog),e.bindVertexArray(this.vaoX),e.enable(e.RASTERIZER_DISCARD);const c=d=>o.loc.get(d);e.uniform3fv(c("uF"),f.f),e.uniform3fv(c("uR"),f.r),e.uniform3fv(c("uU"),f.up),e.uniform1f(c("uTanH"),f.tanH),e.uniform4fv(c("uCW"),Float32Array.from(r.w)),e.uniform1f(c("uU2"),r.u2),e.uniform1f(c("uWC"),r.wc),e.uniform1f(c("uSlice"),a),e.uniform1f(c("uNS"),n),e.uniform1f(c("uCutB"),this.opt.cut),e.uniform1f(c("uObsX"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,this.kTex),e.uniform1i(c("uK"),1),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,this.tfo),u&&(e.bindBufferRange(e.TRANSFORM_FEEDBACK_BUFFER,0,i.buf,0,u*B*4),e.beginTransformFeedback(e.POINTS));const h=[];let l=0;for(const d of this.groups()){const p=this.tables[d.tab],m=p.meta,E=Math.ceil(m.B/n),_=Math.max(...r.S.map(b=>b.n[d.set]));if(!_){h.push({tgt:d.tgt,tab:d.tab,pulse:d.pulse,first:l,count:0});continue}e.uniform1f(c("uPx"),2/(d.tgt==="env"?s.n/2:s.n)),e.uniform1f(c("uB"),m.B),e.uniform1f(c("uBW"),m.bandW),e.uniform1f(c("uNG"),m.ngroup),e.uniform1f(c("uGR"),m.groupRows),e.uniform1f(c("uNL"),m.nl),e.uniform1f(c("uPulse"),d.pulse),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,p.coef),e.uniform1i(c("uCoef"),2),r.S.forEach((b,x)=>{e.bindBuffer(e.ARRAY_BUFFER,b.buf[d.set]);for(let F=0;F<3;F++)e.vertexAttribPointer(3*x+F,4,e.FLOAT,!1,P*4,16*F)}),e.bindBuffer(e.ARRAY_BUFFER,null);for(let b=0;b<E;b++)e.vertexAttrib1f(12,b),e.drawArrays(e.POINTS,0,_);h.push({tgt:d.tgt,tab:d.tab,pulse:d.pulse,first:l,count:E*_}),l+=E*_}return u&&e.endTransformFeedback(),e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER,0,null),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,null),e.disable(e.RASTERIZER_DISCARD),e.bindVertexArray(null),e.activeTexture(e.TEXTURE0),this.stats.segsLastSlice=l,h}rasterSlice(e,r,a,n){const s=this.pR,o=r.cam,i=l=>s.loc.get(l);e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.useProgram(s.prog),e.bindVertexArray(this.vaoR),e.uniform3fv(i("uF"),o.f),e.uniform3fv(i("uR"),o.r),e.uniform3fv(i("uU"),o.up),e.uniform1f(i("uTanH"),o.tanH),e.uniform1f(i("uCut2"),this.opt.cut**2);const u=new Float32Array(8*X);n.events.forEach((l,d)=>u.set([l.t0-n.T,l.xc,1/l.w,l.lag,l.vz,l.amp,0,0],8*d)),e.uniform1i(i("uNE"),n.events.length),e.uniform4fv(i("uE"),u),e.uniform1f(i("uPInv"),1/(z[this.scene.level].pulse5?.sig??14)),e.uniform1f(i("uPCons"),Dt);const f=this.refFor(e,this.scene.level);e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,f),e.uniform1i(i("uRef"),1),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD);let c=null,h=-1;e.bindBuffer(e.ARRAY_BUFFER,this.out.buf);for(const l of a){if(!l.count)continue;const d=l.tgt==="env"?r.env:r.core;if(d!==c&&(c=d,e.bindFramebuffer(e.FRAMEBUFFER,d.fbo),e.viewport(0,0,d.w,d.h),e.uniform1f(i("uSize"),d.w)),l.tab!==h){h=l.tab;const p=this.tables[l.tab],m=p.meta;e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,p.tex),e.uniform1i(i("uTab"),0),e.uniform1f(i("uBW"),m.bandW),e.uniform1f(i("uN"),m.n),e.uniform4f(i("uTabD"),m.width,m.height,m.tilesX,m.tiledW),e.uniform1f(i("uTexH"),m.tiledH)}for(let p=0;p<12;p++)e.vertexAttribPointer(1+p,4,e.FLOAT,!1,B*4,(l.first*B+4*p)*4);e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,l.count)}e.bindBuffer(e.ARRAY_BUFFER,null),e.disable(e.BLEND),e.bindVertexArray(null),e.activeTexture(e.TEXTURE0)}bindMaps(e,r,a,n,s,o,i){[["a",a,i],["b",n,i+2],["c",s??a,i+4]].forEach(([u,f,c])=>{e.uniform3fv(r.loc.get(u+"F"),f.cam.f),e.uniform3fv(r.loc.get(u+"R"),f.cam.r),e.uniform3fv(r.loc.get(u+"U"),f.cam.up),e.uniform2f(r.loc.get(u+"T"),f.cam.tanH,f.n),e.activeTexture(e.TEXTURE0+c),e.bindTexture(e.TEXTURE_2D,f.core.tex),e.uniform1i(r.loc.get(u+"C"),c),e.activeTexture(e.TEXTURE1+c),e.bindTexture(e.TEXTURE_2D,f.env.tex),e.uniform1i(r.loc.get(u+"E"),c+1)}),e.uniform1f(r.loc.get("uAlpha"),o),e.uniform1f(r.loc.get("uFade"),1),e.uniform1f(r.loc.get("uHasC"),s?1:0)}display(e,r,a,n,s,o){const i=this.res;this.pD??=i.program("zoneCurtainDisplay",C,nr);const u=this.pD;e.useProgram(u.prog),e.bindVertexArray(this.vaoD),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,r.fbo),e.viewport(0,0,r.w,r.h),e.uniform3fv(u.loc.get("uF"),a.f),e.uniform3fv(u.loc.get("uR"),a.r),e.uniform3fv(u.loc.get("uU"),a.up),e.uniform1f(u.loc.get("uTanH"),a.tanH),e.uniform1f(u.loc.get("uSize"),r.w),this.bindMaps(e,u,n,s,null,o,0),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),e.activeTexture(e.TEXTURE0)}debugState(){return{ring:this.ring.map(e=>({t:e.t,k:e.k,sets:e.msg.sets})),tables:this.tables?.map(e=>e.meta)??null,scene:this.scene,A:this.A,B:this.B,Ta:this.Ta,Tb:this.Tb,trash:this.trash.length,w:this.w,retiring:this.retiring!==null,retShare:this.retShare}}debugJob(e,r,a,n){const s=e.map(c=>this.ring[c]),o=z[this.scene.level],[i,u]=this.footRange(n),f=_e(o,this.scene,a,i,u,X);return{T:a,X:{S:s,...Ue(this.opt.mode,r)},events:f.events,dropped:f.dropped,miss:!1,red:Le(s[1],s[2],r)}}async debugRun(e,r,a,n,s){this.res=r,this.worker&&this.restart(),this.flush(),this.scene=a,this.key=JSON.stringify(a),this.lastT=null,this.start({tModel:n[0]+this.opt.dt}),this.pX||this.programs(e,{res:r,floatBlend:s}),this.askPrograms(1/0),this.inFlight=!0;for(const u of n)this.post({cmd:"state",id:++this.reqId,t:u,cull:null});const o=performance.now();for(;this.pending.length<n.length||!(this.tables||this.pendingTables)||!this.programReady();){if(this.stats.failed)throw new Error(this.stats.failed);if(performance.now()-o>12e4)throw new Error("zoneCurtain debugRun: no states after 120 s");await new Promise(u=>{this.waiters.push(u),setTimeout(u,100)})}const i=q(e);try{this.take(e)}finally{K(e,i)}}readOut(e,r,a){const n=new Float32Array(a*B);return e.bindBuffer(e.ARRAY_BUFFER,this.out.buf),e.getBufferSubData(e.ARRAY_BUFFER,r*B*4,n),e.bindBuffer(e.ARRAY_BUFFER,null),n}readTarget(e,r){const a=new Float32Array(r.w*r.h*4);return e.bindFramebuffer(e.FRAMEBUFFER,r.fbo),e.readPixels(0,0,r.w,r.h,e.RGBA,e.FLOAT,a),a}}function et(t,e=t.view.centerMm){const r=t.horizonFrame,a=t.view.point,n=t.view.skyFrame,s=t.geometry.focalMm;if(!r||!n)return null;const o=[e[0]/s,e[1]/s,1],i=[0,1,2].map(h=>a[h]*o[0]+a[3+h]*o[1]+a[6+h]*o[2]);if(!(i[2]>1e-6))return null;const u=[0,1,2].map(h=>n.axis[h]+i[0]/i[2]*n.west[h]+i[1]/i[2]*n.north[h]),f=Math.hypot(u[0],u[1],u[2]),c=h=>(u[0]*h[0]+u[1]*h[1]+u[2]*h[2])/f;return[c(r.east),c(r.north),c(r.zenith)]}function Ur(t,e,r){const a=et(e);if(!a)return t.zoneCurtain;let n=t.zoneCurtain;n||(n=t.zoneCurtain=new Sr({},void 0,dt({pinned:oe.zoneSeed,automated:typeof navigator<"u"&&navigator.webdriver===!0,reducedMotion:ct(),random:pt})),n.caps=Fr(e.gl,e.res,e.floatBlend),n.caps.reason&&(n.stats.failed=`capability: ${n.caps.reason}`),n.caps.reason&&console.warn("[zoneCurtain] this device cannot run the new curtain; the old aurora stays:",n.caps.reason));const s=e.geometry,o=2*Math.atan(s.cathodeRadiusMm/s.focalMm)*180/Math.PI,i=ft(s.pitchMm,s.focalMm)*Math.atan(s.pitchMm/s.focalMm)*180/Math.PI,u=yr(e.gl),f=n.stats.frames,c=ht.getState().view.integrationMs,h=c>0?c/1e3:lt;return n.frame({gl:e.gl,res:e.res,tModel:r.timeS-(t.setup?.startS??0),dir:a,fovDeg:o,level:r.level??0,seed:n.seed,floatBlend:e.floatBlend,dtSeconds:e.dtSeconds,lite:r.detail==="lite",pitchDeg:i,holdS:h}),u&&Mr(e.gl,u,n.stats.frames>f),n}const tt={on:!1,sliceMs:[],otherMs:[],disjoint:0,queries:[]};function yr(t){const e=tt;if(!e.on&&!e.queries.length)return null;const r=t.getExtension("EXT_disjoint_timer_query_webgl2");if(!r)return null;for(;e.queries.length;){const{q:n,slice:s}=e.queries[0];if(!t.getQueryParameter(n,t.QUERY_RESULT_AVAILABLE))break;e.queries.shift(),t.getParameter(r.GPU_DISJOINT_EXT)?e.disjoint++:(s?e.sliceMs:e.otherMs).push(Number(t.getQueryParameter(n,t.QUERY_RESULT))/1e6),t.deleteQuery(n)}if(!e.on||e.queries.length>=8)return null;const a=t.createQuery();return a&&t.beginQuery(r.TIME_ELAPSED_EXT,a),a}function Mr(t,e,r){const a=t.getExtension("EXT_disjoint_timer_query_webgl2");t.endQuery(a.TIME_ELAPSED_EXT),tt.queries.push({q:e,slice:r})}function kr(t,e,r,a,n,s){const o=oe.zoneCurtainDebug>0?oe.zoneCurtainDebug:1;t.compose(e.gl,a.u_auRate,a.u_auClass,r.level??0,o,i=>{e.viewUniforms(i),e.bindHorizon(i,0),e.bindLut(i,1),e.res.bindTex(8,n,i,"u_auExt"),e.res.bindTex(9,s,i,"u_cloud"),Ge(e.gl,i,{u_auExtOn:a.u_auExtOn,u_auRatioCap:a.u_auRatioCap,...ut(r.cloud)})},()=>e.draw())}function Dr(t,e,r,a){const n=et(e,[0,0]);if(!n)return;const s=e.geometry,o=mt(r);t.meter(e.gl,{axis:n,radiusDeg:Math.atan(s.cathodeRadiusMm/s.focalMm)*180/Math.PI,level:r.level??0,cls:o.u_auClass,rates:r.rates,ext:r.extinction,bind:i=>{e.bindHorizon(i,0),e.bindLut(i,1),e.res.bindTex(4,a,i,"u_auExt"),Ge(e.gl,i,{u_auExtOn:o.u_auExtOn})}})}export{et as viewAxisEnu,kr as zoneCompose,Ur as zoneFrame,tt as zoneGpuTimer,Dr as zoneMeter};
