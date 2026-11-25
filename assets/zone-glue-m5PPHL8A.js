import{c$ as W,d0 as Ie,d1 as O,d2 as de,d3 as me,d4 as Le,d5 as Xe,d6 as We,d7 as g,d8 as pe,d9 as Ge,cM as He,da as qe,b as Ze,bA as Ve,db as Ye,dc as xe}from"./boot-CBhWqpzB.js";import{F as At}from"./app-Dn7om62z.js";import{z as $e,a as Ke,b as Qe,r as je}from"./seed-C66snoD7.js";import{N as B,b as D,h as ve,u as Ee,r as N,p as Q,s as G,G as Je,c as I,d as ts,H as Z,e as be,f as Y,g as Te,l as Bt,D as es,C as it,R as nt,Z as rt}from"./levels-Be_TILPh.js";import"./vendor-DHsdD_W9.js";import"./hosting-3HDP7C0c.js";import"./error-log-Ceop1PcD.js";const ss=20,is=.25,ns=6,as=61,rs=(s,t)=>{const e=D*t,i=s*(2*D+s);return i/(e+Math.sqrt(e*e+i))},os=s=>new Float32Array(s*B*2).fill(1),X=8,j=256;function Dt(){return W.map(s=>Ie(s))}function Ot(s){const t=[];for(let e=0;e<s.length;e++)(s[e]===0||s[e]===1)&&t.push(e);if(t.length>4)throw new RangeError("zoneMeterChannels: more than four main-curtain components");return t}function kt(s){for(let t=0;t<s.length;t++)if(s[t]===2)return t;return-1}function cs(s,t,e){const i=Math.PI/180,n=Math.tan(Math.min(80,Math.max(.01,s))*i),a=X,o=e??Math.min(j,Math.max(4*a,Math.ceil(2*n/Math.tan(Math.max(.001,t)*i)/a)*a));if(o%a||o>j)throw new RangeError(`zoneMeterGrid: side ${o} not a multiple of ${a} up to ${j}`);let r=0;for(let c=0;c<o;c++)for(let h=0;h<o;h++)us(h,c,o)&&r++;return{n:o,tanR:n,count:r}}const us=(s,t,e)=>{const i=2*s+1-e,n=2*t+1-e;return i*i+n*n<=e*e};function hs(s){const t=Math.hypot(s[0],s[1],s[2]),e=[s[0]/t,s[1]/t,s[2]/t];let i=e[1],n=-e[0];const a=Math.hypot(i,n);return a<1e-6?(i=1,n=0):(i/=a,n/=a),{F:e,R:[i,n,0],U:[n*e[2],-i*e[2],i*e[1]-n*e[0]]}}function Ut(s){if(!s.length)return null;const t=W.length,e=new Float64Array(t),i=new Float64Array(t);let n=0;for(const a of s){const o=a.A??a.B,r=a.B??a.A;if(!o||!r){n++;continue}const c=Math.min(1,Math.max(0,a.alpha)),h=Math.max(0,a.share);for(let u=0;u<t;u++){const f=o.count?o.sums[u]/o.count:0,l=r.count?r.sums[u]/r.count:0;e[u]=e[u]+h*((1-c)*f+c*l),i[u]=i[u]+h*((1-c)*o.box[u]+c*r.box[u])}}return{means:e,box:i,pending:n}}const fs=(s,t)=>W.map(e=>t[e]>0?s[e]*t[e]:0);function zt(s,t,e,i,n){fs(s,t);let a=0,o=0;i&&W.forEach((c,h)=>{(e[h]===0||e[h]===1||e[h]===2)&&(a+=s[c]*i.means[h],o+=s[c]*i.box[h])});const r=ls();return{mean:a+r.mean,peak:o+r.peak}}function ls(s,t,e){return{mean:0,peak:0}}const ds=[{cell:2.4,epoch:5,prob:.6,w:[.18,.45],lnS:.9,life:[5,14],drift:.15,seed:61},{cell:6.8,epoch:8,prob:.55,w:[.35,.9],lnS:.6,life:[8,22],drift:.12,seed:62}];let Ae=1,Re=1;function ms(s,t,e=0,i={f:0,lam:0,fb:0}){let n=0,a=0,o=0;for(const r of ds){const c=Math.ceil(r.life[1]/r.epoch)+1,h=Math.floor(s/r.cell);for(let u=Math.floor(t/r.epoch)-c;u<=Math.floor(t/r.epoch);u++)for(let f=h-2;f<=h+2;f++){const l=ve(f,u,9e3+r.seed+131*e);if(Ee(l)>=r.prob)continue;const m=(u+N(l,1))*r.epoch,d=Q(r.life,N(l,2)),x=(t-m)/d;if(!(x>0&&x<1))continue;const p=(f+N(l,3))*r.cell+r.drift*(2*N(l,4)-1)*(t-m),E=Q(r.w,N(l,5)),v=(s-p)/E;if(v*v>16)continue;const b=Math.sqrt(-2*Math.log(Math.max(1e-9,N(l,6))))*Math.cos(2*Math.PI*N(l,7)),T=Math.exp(r.lnS*b-.5*r.lnS*r.lnS)*G(x/.25)*(1-G((x-.7)/.3)),w=T*Math.exp(-.5*v*v),_=N(l,8);n+=w,a+=w*_*_*_,r.cell>5&&(o+=w)}}return i.f=n*Ae,i.fb=o*Re,i.lam=n>1e-9?a/n:.3,i}{let s=0,t=0,e=0;const i={f:0,lam:0,fb:0};for(let n=0;n<6e3;n++)ms(n*.731+13,50+n*.37,0,i),s+=i.f,t+=i.fb,e++;Ae=e/s,Re=e/t}const gt=[116,109,102,96],It=[30,26,22,18],ps=3.5;function xs(s){const t=Te(s,0,1)*3,e=Math.min(2,Math.floor(t)),i=t-e;return{peak:Bt(gt[e],gt[e+1],i),up:Bt(It[e],It[e+1],i),lo:ps}}const vs=s=>1/(1+Math.exp(-(s-101)/2.5)),Es=s=>1-G((s-(Y-30))/30),Lt=2.2,Xt=4.5,Wt=1.6,Gt=Math.sqrt(Math.PI/2);function bs(s,t,e){const i=s-t.peak,n=i>=0?Math.exp(-i/t.up):Math.exp(-.5*(i/Lt)**2),a=i>=0?Math.exp(-.5*(i/Xt)**2):Math.exp(-.5*(i/Wt)**2);return(1-e)*n+e*(Lt*Gt+t.up)/((Wt+Xt)*Gt)*a}const Ht=20,Ts=120,As=s=>Te(.3+.6*s,.3,.85),Rs=.8;function ws(s,t,e){const i=s-(t.peak+1+12*e*e);return i<=0?0:(1-Math.exp(-i/(6+8*e)))*Math.exp(-i/(Ht+(Ts-Ht)*e))}let ot=null;function _s(){if(ot)return ot;const s=ts,t=[new Float32Array(B*s),new Float32Array(B*s)],e=[new Float32Array(B*I*s),new Float32Array(B*I*s)];for(let i=0;i<B;i++){const n=i/(B-1),a=xs(n),o=As(n);a.up*=Rs;for(let r=0;r<s;r++){const c=Z+r*be,h=Es(c),u=vs(c),f=bs(c,a,o)*h;t[0][i*s+r]=f,t[1][i*s+r]=f*u;for(let l=0;l<I;l++){const m=ws(c,a,l/(I-1))*h,d=(i*I+l)*s+r;e[0][d]=m,e[1][d]=m*u}}}return ot={n:s,low:t,ray:e,nlam:I}}const ys=1,qt=.7;function Ss(s,t,e,i,n){const a=s.pulse5,o=[];if(a==null)return o;const r=Math.ceil((360/a.vz[0]+3)/a.P)+1;for(let c=Math.floor(t/a.P)-r;c<=Math.floor(t/a.P)+1;c++)for(let h=Math.floor((i-500)/a.cell);h<=Math.floor((n+500)/a.cell);h++){const u=ve(h,c,7331+101*e);Ee(u)>=a.prob||o.push({t0:(c+.8*N(u,1))*a.P,vz:Q(a.vz,N(u,2)),amp:a.amp*(.6+.4*N(u,3)),xc:(h+N(u,4))*a.cell,w:Q(a.w,N(u,5)),lag:(N(u,6)<.5?-1:1)*Q(a.lag,N(u,7))/100})}return o}function Fs(s,t,e){const i=(t-s.xc)/s.w,n=Math.exp(-.5*i*i);if(n<.02)return null;const a=e-(s.t0+(t-s.xc)*s.lag);if(!(a>0))return null;const o=70+s.vz*a;return o>420?null:[s.amp*n*G(a/.3)*Math.exp(-Math.max(0,o-110)/180)*(qt+(1-qt)*G((o-100)/25)),o]}const we=70,_e=.25,at=1401;function Ms(s){const t=_s(),e=t.n,i=new Float32Array(at),n=s.pulse5;if(!n)return i;const a=Math.round(s.hard0*(B-1)),o=t.low[0],r=t.ray[0],c=(a*I+3)*e;let h=0;for(let u=0;u<e;u++)h+=o[a*e+u]+.15*r[c+u];for(let u=0;u<at;u++){const f=we+u*_e;let l=0;for(let m=0;m<e;m++){const d=Z+m*be;l+=(o[a*e+m]+.15*r[c+m])*Je((d-f)/n.sig)}i[u]=l/h}return i}function Cs(s,t){const e=Math.min(at-1,Math.max(0,(t-we)/_e)),i=Math.min(at-2,Math.floor(e)),n=e-i;return s[i]*(1-n)+s[i+1]*n}const ct=4,Ns=2,ye=800;function Ps(s,t,e,i,n,a=ys){const o=Ns,r=Math.max(1,Math.min(ye,Math.ceil((n-i)/o))),c=new Float32Array(r*12),h=new Float64Array(r),u=new Uint8Array(r);for(const f of s){const l=Math.max(0,Math.floor((f.xc-2.8*f.w-i)/o)),m=Math.min(r-1,Math.ceil((f.xc+2.8*f.w-i)/o));for(let d=l;d<=m;d++){const x=Fs(f,i+(d+.5)*o,t);if(!x)continue;h[d]=h[d]+x[0]*Cs(e,x[1]),u[d]=Math.min(255,u[d]+1);let p=Math.min(ct,u[d])-1;const E=v=>(v>>1)*4*r+4*d+2*(v&1);if(!(p===ct-1&&u[d]>ct&&!(x[0]>c[E(p)+1]))){for(;p>0&&x[0]>c[E(p-1)+1];){const v=E(p),b=E(p-1);c[v]=c[b],c[v+1]=c[b+1],p--}c[E(p)]=x[1],c[E(p)+1]=x[0]}}}for(let f=0;f<r;f++)c[8*r+4*f]=1/(1+a*h[f]),c[8*r+4*f+1]=u[f];return{x0:i,dx:o,n:r,data:c}}function Bs(s,t,e,i,n,a=16){if(!s.pulse5||t.noPulse||t.ticks)return{events:[],dropped:0};const o=Ss(s,e,t.seed??0,i,n).filter(r=>{const c=Math.max(i,r.xc-2.8*r.w),h=Math.min(n,r.xc+2.8*r.w);return h>=c?[c,h,Math.min(h,Math.max(c,r.xc))].some(u=>{const f=e-(r.t0+(u-r.xc)*r.lag);return f>0&&70+r.vz*f<=420}):!1});return o.sort((r,c)=>c.amp-r.amp),{events:o.slice(0,a),dropped:Math.max(0,o.length-a)}}const F={DX:8,HALF:720,SIG_N:16,HP:62,H0:150,H1:620,NSEG:24,TAU_RAD:110,Q200:.098,QH:42},et=Math.round(2*F.HALF/F.DX)+1,Ds=s=>1/(1/F.TAU_RAD+F.Q200*Math.exp(-(s-200)/F.QH)),Os=s=>s<=F.H0?0:G((s-F.H0)/20)*Math.exp(-(s-F.H0)/F.HP)*(Ds(s)/F.TAU_RAD)*(1-G((s-(F.H1-60))/60));let ut=null;function ks(){if(ut)return ut;const s=F,t=4700,e=(s.H1-s.H0)/t,i=new Float64Array(t+1);for(let o=0;o<t;o++)i[o+1]=i[o]+Os(s.H0+(o+.5)*e)*e;const n=[];let a=0;for(let o=0;o<s.NSEG;o++){const r=i[t]*(o+.5)/s.NSEG;for(;i[a+1]<r;)a++;n.push(s.H0+(a+(r-i[a])/(i[a+1]-i[a]))*e)}return ut={mid:n,norm:i[t]}}const Se=(90-es)*Math.PI/180,Rt=Math.cos(Se),wt=Math.sin(Se),Zt=4,Us=[[[0,1,0],[1,0,0],[0,0,1]],[[1,0,0],[0,-1,0],[0,0,1]],[[0,-1,0],[-1,0,0],[0,0,1]],[[-1,0,0],[0,1,0],[0,0,1]],[[0,0,1],[1,0,0],[0,1,0]]];function Fe(s,t=2){const e=t/2,i=Math.max(8,Math.round(1/(e*Math.tan(s*Math.PI/180)))*e),n=2*(i+Zt),a=(i+Zt)/i;return Us.map(([o,r,c])=>({f:[...o],r:[...r],up:[...c],tanH:a,size:n}))}function zs(s,t){const e=([i,n,a])=>[i,Rt*n-wt*a,wt*n+Rt*a];return Fe(s,t).map(i=>({...i,f:e(i.f),r:e(i.r),up:e(i.up)}))}function gs(s,t){return s<4?{x0:s%2*2*t,y0:s<2?0:t/2,w:2*t,h:t/2}:{x0:4*t,y0:0,w:t,h:t}}function Is(s,t,e){const i=s===1||s===3;return{x0:(s+ +(s>1)+ +(s>3))*e,y0:t,w:i?2*e:e,h:e}}const Me=.06,Ls=8,Xs=2,st=(s,t)=>s[0]*t[0]+s[1]*t[1]+s[2]*t[2],Ce=(s,t)=>[s[1]*t[2]-s[2]*t[1],s[2]*t[0]-s[0]*t[2],s[0]*t[1]-s[1]*t[0]],ht=s=>{const t=Math.hypot(s[0],s[1],s[2])||1;return[s[0]/t,s[1]/t,s[2]/t]};function Ws(s){const t={axis:[0,0,1],rate:0};if(s.length<2)return t;const e=s[0],i=s[s.length-1],n=(i.t-e.t)/1e3;if(!(n>.001))return t;const a=Ce(e.d,i.d),o=Math.hypot(a[0],a[1],a[2]),r=Math.atan2(o,st(e.d,i.d))*180/Math.PI;return o>1e-9?{axis:[a[0]/o,a[1]/o,a[2]/o],rate:r/n}:t}function ft(s,t){const e=st(t,s.f);if(!(e>.001))return 0;const i=Math.max(Math.abs(st(t,s.r)/(e*s.tanH)),Math.abs(st(t,s.up)/(e*s.tanH)));if(i>1)return 0;const n=Math.min(1,Math.max(0,(1-i)/Me));return Math.max(1e-6,n*n*(3-2*n))}const Ne=(s,t)=>Math.min(1,Math.max(0,s*Math.max(1,t)/Math.min(Ls,Math.max(1,t))));function Gs(s,t,e,i,n){if(s>=1&&t>=1)return{a:1-i,b:i,c:0};const a=s*(1-i),o=t*(n+(i-n)*s);return{a,b:o,c:Math.max(0,1-a-o)*e}}function Vt(s,t,e,i,n,a,o,r=25,c=1){const h=ht(s),u=Math.hypot(h[0],h[1])>1e-6?ht([h[1],-h[0],0]):[1,0,0],f=Ce(u,h),l=Math.tan(t),m=Ne(a,o),d={n:0,nA:0,nB:0,nC:0,sA:0,sB:0,sC:0,none:0,fallbackOnly:0,shown:0};for(let p=0;p<r;p++)for(let E=0;E<r;E++){const v=(2*E+1-r)/r,b=(2*p+1-r)/r;if(v*v+b*b>1)continue;const T=ht([h[0]+l*(v*u[0]+b*f[0]),h[1]+l*(v*u[1]+b*f[1]),h[2]+l*(v*u[2]+b*f[2])]),w=e?ft(e,T):0,_=i?ft(i,T):0,y=n==="cube"?1:n?ft(n,T):0,A=Gs(w,_,0,a,m),M=A.a*c,C=A.b*c,R={a:M,b:C,c:Math.max(0,1-M-C)*y};d.n++,w>0&&d.nA++,_>0&&d.nB++,y>0&&d.nC++,d.sA+=R.a,d.sB+=R.b,d.sC+=R.c,w<=0&&_<=0&&y<=0?d.none++:w<=0&&_<=0&&d.fallbackOnly++,d.shown+=R.a+R.b+R.c}const x=Math.max(1,d.n);return d.none/=x,d.fallbackOnly/=x,d.shown/=x,d}const S=s=>{const t=String(s);return/[.eE]/.test(t)?t:t+".0"},_t=[];for(const s of[-1,1])for(const t of[-1,1])for(const e of[-1,1])_t.push(`c ${s<0?"-":"+"} A ${t<0?"-":"+"} E ${e<0?"-":"+"} N`);const lt=["rPL0","rPL1","rPF00","rPF01","rPF10","rPF11"],dt=["rGL0","rGL1","rGF00","rGF01","rGF10","rGF11"],Hs=["wl0","wl1","wf00","wf01","wf10","wf11"],H=(s,t)=>s.map((e,i)=>`${Hs[i]} * cf(${e}, ${t}.0, yy)`).join(" + "),qs=O+`out vec4 o; void main() { o = vec4(0.0); }
`,Zs=O+`
uniform sampler2D uT;
out vec4 o;
void main() { o = vec4(textureLod(uT, vec2(0.5, 0.5), 0.0).r, 0.25, 0.0, 0.0); }
`,Vs=O+`
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
uniform float uTanH, uPx, uTightBounds;
uniform vec4 uCW;
uniform float uU2, uWC;
uniform float uSlice, uNS;
uniform float uB, uBW, uCutB;
uniform float uNG, uGR, uNL;
uniform float uObsX, uPulse;
uniform sampler2D uCoef;
uniform sampler2D uK;
// (task BH, zone-curtain-gl.md §AJ: the map's waves over the foot x — profile.ts pulseTable; uPTD (x0, dx, cells, on))
uniform sampler2D uPT;
uniform vec4 uPTD;
flat out vec4 vRx, vRy, vAn, vP0, vP1, vP2, vG0, vG1, vG2, vQa, vQb, vPx, vW0, vW1;
const float RE = ${S(D)}, REFH = ${S(nt)}, COTD = ${it}, HLO = ${S(Z)}, NCH = ${S(B)}, TWO_PI = 6.283185307179586;
vec3 pj(vec3 P) { float z = dot(P, uF), iz = 1.0 / (max(z, 1e-3) * uTanH); return vec3(dot(P, uR) * iz, dot(P, uU) * iz, z); }
// (task BG, zone-curtain-gl.md §AI: a point's distances outside the map's four side planes, the field widened by the
// quad's pixel margin — the half spaces through the observer hold the frustum whatever the point's depth sign)
vec4 outs(vec3 P) { float z = dot(P, uF) * uTanH * (1.0 + uPx), r = dot(P, uR), u = dot(P, uU); return vec4(r - z, -r - z, u - z, -u - z); }
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
  vQa = vec4(0.0); vQb = vec4(0.0, 0.0, 0.0, 2.0); vPx = vec4(0.0); vW0 = vec4(0.0); vW1 = vec4(0.0);
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
  vP0 = ${H(lt,0)};
  vG0 = ${H(dt,0)};
  if (info.y > 1.5) {
    vP1 = ${H(lt,1)};
    vG1 = ${H(dt,1)};
  }
  if (info.y > 2.5) {
    vP2 = ${H(lt,2)};
    vG2 = ${H(dt,2)};
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
  // (task BH: the part's cell of the wave table — its strongest four waves (front, amplitude) and the normalisation, once
  // per segment here instead of every wave in every fragment)
  if (uPulse > 0.5 && uPTD.w > 0.5) {
    float fx = clamp(floor((x + uObsX - uPTD.x) / uPTD.y), 0.0, uPTD.z - 1.0);
    vW0 = texelFetch(uPT, ivec2(int(fx), 0), 0);
    vW1 = texelFetch(uPT, ivec2(int(fx), 1), 0);
    amp *= texelFetch(uPT, ivec2(int(fx), 2), 0).x;
  }
  vRx = vec4(rx, amp); vRy = vec4(ry, info.x); vAn = vec4(an, ha); vPx = vec4(x + uObsX, uPulse, 0.0, 0.0);
${_t.map((s,t)=>`  vec3 p${t} = pj(${s});`).join(`
`)}
  float zmin = min(min(min(p0.z, p1.z), min(p2.z, p3.z)), min(min(p4.z, p5.z), min(p6.z, p7.z)));
  float zmax = max(max(max(p0.z, p1.z), max(p2.z, p3.z)), max(max(p4.z, p5.z), max(p6.z, p7.z)));
  vec3 q0 = pj(c - A), q1 = pj(c + A);
  vec2 ax = q1.xy - q0.xy;
  float axl = length(ax);
  vec2 dr = axl > 1e-6 ? ax / axl : vec2(1.0, 0.0);
  vec2 pr = vec2(-dr.y, dr.x);
${[0,1,2,3,4,5,6,7].map(s=>`  vec2 s${s} = vec2(dot(p${s}.xy, dr), dot(p${s}.xy, pr));`).join(`
`)}
  vec2 lo = min(min(min(s0, s1), min(s2, s3)), min(min(s4, s5), min(s6, s7))) - vec2(uPx);
  vec2 hi = max(max(max(s0, s1), max(s2, s3)), max(max(s4, s5), max(s6, s7))) + vec2(uPx);
  // Across the projected centreline every point on the segment axis has the same coordinate.
  // Its 4-sigma ellipse is inside the old box. Bound its width by its support along this
  // plane normal, divided by the smallest possible perspective depth of the old box.
  if (uTightBounds > 0.5 && zmin > 0.5 && axl > 1e-6) {
    float mid = dot(q0.xy, pr);
    vec3 plane = pr.x*uR + pr.y*uU - (mid*uTanH)*uF;
    float east = dot(plane,e), north = dot(plane,nn);
    float radius = uCutB * length(vec2(sx*(east + co*north), sy*north));
    float allowance = (sagL + 0.05) * (abs(east)/le + abs(north)/ln);
    float halfWidth = (radius + allowance)/(zmin*uTanH) + uPx;
    lo.y = max(lo.y, mid - halfWidth);
    hi.y = min(hi.y, mid + halfWidth);
  }
  float big = max(max(abs(lo.x), abs(lo.y)), max(abs(hi.x), abs(hi.y)));
  float mode = 0.0;
  if (zmin < 0.5 || big > 1e4) mode = 1.0;
  if (zmax < 0.5) mode = 2.0;
  // (task BG, §AI: the segment's box wholly outside one side plane of the map is not drawn — it reaches no pixel of it.
  // Before, a box within half a kilometre of the observer's plane square to the axis — a part near 90° off the map's
  // axis, which a moving view's wide cull (up to 89°) and the fallback's hold — drew a whole-map quad: one slice of a
  // moving map 190–450 ms on the integrated GPU, every fragment adding 0)
${_t.map((s,t)=>`  vec4 o${t} = outs(${s});`).join(`
`)}
  vec4 om = min(min(min(o0, o1), min(o2, o3)), min(min(o4, o5), min(o6, o7)));
  if (max(max(om.x, om.y), max(om.z, om.w)) > 0.0) mode = 2.0;
  vQa = vec4(lo, hi); vQb = vec4(dr, info.y, mode);
}
`,Ys=["vRx","vRy","vAn","vP0","vP1","vP2","vG0","vG1","vG2","vQa","vQb","vPx","vW0","vW1"],z=56,$s=O+`
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
layout(location = 13) in vec4 aW0;
layout(location = 14) in vec4 aW1;
uniform float uSwapXY;
flat out vec4 vRx, vRy, vAn, vP0, vP1, vP2, vG0, vG1, vG2, vPx, vW0, vW1;
flat out float vCh;
void main() {
  vRx = aRx; vRy = aRy; vAn = aAn; vP0 = aP0; vP1 = aP1; vP2 = aP2; vG0 = aG0; vG1 = aG1; vG2 = aG2; vPx = aPx; vW0 = aW0; vW1 = aW1; vCh = aQb.z;
  vec2 dr = aQb.xy, pr = vec2(-dr.y, dr.x), st = mix(aQa.xy, aQa.zw, aQ), pos = dr * st.x + pr * st.y;
  if (aQb.w > 0.5) pos = mix(vec2(-1.0), vec2(1.0), aQ);
  if (uSwapXY > 0.5) pos = pos.yx;
  if (aQb.w > 1.5) pos = vec2(2.0);
  gl_Position = vec4(pos, 0.0, 1.0);
}
`,Ks=O+`
uniform vec3 uF, uR, uU;
uniform vec2 uRasterSize;
uniform float uTanH, uOff, uYOff, uBW, uN, uCut2, uSwapXY;
uniform sampler2D uTab;
uniform vec4 uTabD;
uniform float uTexH;
uniform float uPInv;
flat in vec4 vRx, vRy, vAn, vP0, vP1, vP2, vG0, vG1, vG2, vPx, vW0, vW1;
flat in float vCh;
out vec4 oCol;
const float RE = ${S(D)}, SQ_PI_2 = 1.2533141373155003, NZF = ${ss.toFixed(1)}, ZST = ${is}, POCT = ${ns.toFixed(1)}, SMAX = ${(as-1).toFixed(1)};
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
float gGZ, gM, gK; vec2 gTC;
bool look(vec3 E, vec3 V) {
  float k2 = dot(V, V), mr = k2 > 1e-20 ? -dot(E, V) / k2 : 0.5, m = clamp(mr, 0.0, 1.0);
  vec3 C = E + m * V;
  float d2 = dot(C, C);
  if (d2 > uCut2) return false;
  float k = sqrt(k2), g = exp(-0.5 * d2), x, Z;
  if (!(k2 > 1e-20) || (mr > 0.0 && mr < 1.0)) { x = m * uN; Z = massI(k, m); }
  else { float z = abs(dot(C, V)) / k; x = (mr <= 0.0 ? uN + 1.0 : uN + 2.0 + NZF) + min(NZF, z / ZST); Z = massS(k, z); }
  gGZ = g * Z; gTC = vec2(x, min(SMAX, POCT * log2(1.0 + k))); gM = m; gK = k;
  return true;
}
// Task BH (zone-curtain-gl.md §AJ; profile.ts pulseBandWeight): a wave's weight on the band's window — the height Gaussian
// at the window's place on the traversal (h_a + m·Δh), widened by the window's spread along it (variance min(1/k², 1/12))
float gWc, gWb, gWq;
float wave(float hw, float A) { float z = (gWc - hw) * uPInv + gM * gWb; return A * exp(-0.5 * z * z / gWq) * inversesqrt(gWq); }
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
void main() {
  // (task BH, §AJ: uOff — the tile's first column: a wide map's face drawn into its place in the shared target; 0 for a fine map)
  vec2 p = (2.0 * (gl_FragCoord.xy - vec2(uOff, uYOff)) / uRasterSize - 1.0) * uTanH;
  if (uSwapXY > 0.5) p = p.yx;
  vec3 d = normalize(uF + p.x * uR + p.y * uU);
  oCol = vec4(0.0);
  if (!(d.z > 0.02)) return;
  float ha = vAn.w, la = shellL(ha, d.z), dl = shellL(ha + uBW, d.z) - la;
  vec3 P = la * d - vAn.xyz;
  vec2 E = vec2(dot(vRx.xyz, P), dot(vRy.xyz, P)), V = dl * vec2(dot(vRx.xyz, d), dot(vRy.xyz, d));
  vec2 acc = vec2(0.0);
  float hits = 0.0;
  if (look(vec3(E, 0.0), vec3(V, 0.0))) {
    float f = 1.0;
    // (task BH: the part's waves from the expansion — the strongest first, none: A0 0; the normalisation is in vRx.w)
    if (vW0.y > 0.0) {
      gWc = ha; gWb = uBW * uPInv; gWq = 1.0 + gWb * gWb * (gK * gK > 12.0 ? 1.0 / (gK * gK) : 1.0 / 12.0);
      f += wave(vW0.x, vW0.y) + wave(vW0.z, vW0.w) + wave(vW1.x, vW1.y) + wave(vW1.z, vW1.w);
    }
    acc = gGZ * f * resp(); hits = 1.0;
  }
  oCol = vec4(acc * (vRx.w * dl), 0.0, hits);
}
`,Pe=`
// (task BH, zone-curtain-gl.md §AJ: ox — the tile's first column in the target: the wide map's five faces lie side by side
// in one target, each read clamped to its own tile; a fine map's ox is 0)
vec4 bil(sampler2D t, vec2 u, float n, int ox) {
  vec2 x = u - 0.5, i = clamp(floor(x), vec2(0.0), vec2(n - 2.0)), f = clamp(x - i, 0.0, 1.0);
  ivec2 p = ivec2(i) + ivec2(ox, 0);
  vec4 a = texelFetch(t, p, 0), b = texelFetch(t, p + ivec2(1, 0), 0), c = texelFetch(t, p + ivec2(0, 1), 0), d = texelFetch(t, p + ivec2(1, 1), 0);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
// Task AX item 3b (zone-curtain-gl.md §AF): the core map magnified 4–5 times onto the fine cells bilinearly drew a slanted
// ray's edge as steps of a map cell; Catmull–Rom (interpolating: the cells' own values kept, its integral the cells' sum)
// draws it smooth. 16 texelFetch, written out (no arrays); clamped at the map's edge; negative undershoot set to 0. uCubic 0:
// the bilinear (checks; the meter and the display set it alike).
uniform float uCubic;
uniform float uAtlasFilter;
vec4 crRow(sampler2D t, int y, int x0, int m, vec4 w, int ox) {
  return w.x * texelFetch(t, ivec2(clamp(x0 - 1, 0, m) + ox, y), 0) + w.y * texelFetch(t, ivec2(clamp(x0, 0, m) + ox, y), 0)
    + w.z * texelFetch(t, ivec2(clamp(x0 + 1, 0, m) + ox, y), 0) + w.w * texelFetch(t, ivec2(clamp(x0 + 2, 0, m) + ox, y), 0);
}
vec4 crW(float f) { return vec4(f * (-0.5 + f * (1.0 - 0.5 * f)), 1.0 + f * f * (-2.5 + 1.5 * f), f * (0.5 + f * (2.0 - 1.5 * f)), f * f * (-0.5 + 0.5 * f)); }
vec4 cub(sampler2D t, vec2 u, float n, int ox) {
  if (uCubic < 0.5) return bil(t, u, n, ox);
  vec2 x = u - 0.5, i = floor(x), f = x - i;
  vec4 wx = crW(f.x), wy = crW(f.y);
  int m = int(n) - 1, x0 = int(i.x), y0 = int(i.y);
  vec4 s = wy.x * crRow(t, clamp(y0 - 1, 0, m), x0, m, wx, ox) + wy.y * crRow(t, clamp(y0, 0, m), x0, m, wx, ox)
    + wy.z * crRow(t, clamp(y0 + 1, 0, m), x0, m, wx, ox) + wy.w * crRow(t, clamp(y0 + 2, 0, m), x0, m, wx, ox);
  return max(s, vec4(0.0));
}
// The middle Catmull–Rom weights are nonnegative. Combine those two taps with
// half-float linear filtering, retaining the two negative lobes explicitly.
// A cube face has four guard texels on each edge, so no tap crosses into its neighbor.
struct CubicFootprint {
  vec3 x, y, X, Y;
  float total;
};
CubicFootprint atlasCubicFootprint(vec2 u, float n, float h, float ox) {
  vec2 i = floor(u - 0.5) + 0.5, f = u - i;
  vec4 wx = crW(f.x), wy = crW(f.y);
  vec3 x = (i.x + ox + vec3(-1.0, wx.z / (wx.y + wx.z), 2.0)) / (5.0 * n);
  vec3 y = (i.y + vec3(-1.0, wy.z / (wy.y + wy.z), 2.0)) / h;
  vec3 X = vec3(wx.x, wx.y + wx.z, wx.w), Y = vec3(wy.x, wy.y + wy.z, wy.w);
  float total = 1.0 - (X.x + X.z) * (Y.x + Y.z);
  return CubicFootprint(x, y, X, Y, total);
}
vec2 atlasCubic(sampler2D t, CubicFootprint s) {
  vec2 b = s.X.x * textureLod(t, vec2(s.x.x, s.y.y), 0.0).xy + s.X.y * textureLod(t, vec2(s.x.y, s.y.y), 0.0).xy
    + s.X.z * textureLod(t, vec2(s.x.z, s.y.y), 0.0).xy;
  vec2 v = s.Y.x * textureLod(t, vec2(s.x.y, s.y.x), 0.0).xy + s.Y.z * textureLod(t, vec2(s.x.y, s.y.z), 0.0).xy;
  return max((s.Y.y * b + s.X.y * v) / s.total, vec2(0.0));
}
// A monotone cubic along field lines keeps a bright lower edge from ringing into dark sky.
// The main chart stores that direction vertically, the rotated envelopes horizontally.
struct CurveFootprint {
  vec2 a, b, c, d;
  float f;
};
CurveFootprint atlasCurveFootprint(vec2 texel, vec2 axis, vec2 size) {
  float pos = dot(texel, axis), f = fract(pos - 0.5);
  vec2 mid = texel - f * axis;
  return CurveFootprint((mid - axis) / size, mid / size, (mid + axis) / size, (mid + 2.0 * axis) / size, f);
}
vec3 monotoneAlong(sampler2D t, CurveFootprint s) {
  vec3 a = textureLod(t, s.a, 0.0).xyz;
  vec3 b = textureLod(t, s.b, 0.0).xyz;
  vec3 c = textureLod(t, s.c, 0.0).xyz;
  vec3 d = textureLod(t, s.d, 0.0).xyz;
  float f = s.f;
  vec3 step = c-b, dir = sign(step), limit = 2.0*abs(step);
  vec3 m0 = dir*clamp(0.5*(c-a)*dir, vec3(0.0), limit);
  vec3 m1 = dir*clamp(0.5*(d-b)*dir, vec3(0.0), limit);
  return mix(b,c,f*f*(3.0-2.0*f)) + f*(1.0-f)*((1.0-f)*m0-f*m1);
}
vec4 gS;
// (task AX, zone-curtain-gl.md §AF: the value is the map's edge weight — 1 inside, a smoothstep to 0 across the outer
// ZONE_EDGE of its half side, at least 1e-6 anywhere in the square; 0 outside. The meter tests it > 0 only.)
float samp(vec3 d, vec3 F, vec3 R, vec3 U, vec2 T, sampler2D C, sampler2D E) {
  gS = vec4(0.0);
  float z = dot(d, F);
  if (!(z > 1e-3)) return 0.0;
  vec2 q = vec2(dot(d, R), dot(d, U)) / (z * T.x);
  float m = max(abs(q.x), abs(q.y));
  if (m > 1.0) return 0.0;
  vec2 u = (q + 1.0) * 0.5 * T.y;
  vec4 e = bil(E, 0.5 * u, 0.5 * T.y, 0);
  gS = vec4(cub(C, u, T.y, 0).xy + e.xy, e.z, 1.0);
  float r = clamp((1.0 - m) * ${S(1/Me)}, 0.0, 1.0);
  return max(1e-6, r * r * (3.0 - 2.0 * r));
}
// Task BH (zone-curtain-gl.md §AJ): the wide map — the observer's cube in east / north / up, five gnomonic faces side by
// side in one target (sim/zone-curtain/wide.ts: 0 north, 1 east, 2 south, 3 west, 4 zenith; face k's tile from column k·n),
// T = (tan of a face's half side with its edge texels, n). The face is the direction's largest axis (below the horizon a
// side face, read clamped: nothing is drawn there). gS as samp's; it covers every direction (1).
vec3 cubeCoords(vec3 d, vec2 T) {
  if (uAtlasFilter > 0.5) {
    const float c = ${S(Rt)}, s = ${S(wt)};
    d.yz = vec2(c*d.y + s*d.z, c*d.z - s*d.y);
  }
  vec3 a = abs(d);
  float k = 0.0; vec2 q = vec2(0.0);
  if (d.z >= a.x && d.z >= a.y) { k = 4.0; q = d.xy / d.z; }
  else if (a.y >= a.x) { if (d.y > 0.0) { k = 0.0; q = vec2(d.x, d.z) / d.y; } else { k = 2.0; q = vec2(d.x, -d.z) / d.y; } }
  else { if (d.x > 0.0) { k = 1.0; q = vec2(-d.y, d.z) / d.x; } else { k = 3.0; q = vec2(-d.y, -d.z) / d.x; } }
  return vec3((q / T.x + 1.0) * 0.5 * T.y, k);
}
vec3 atlasLight(vec2 core, vec3 envelope) { return vec3(core + envelope.xy, envelope.z); }
// The two times share a chart and texel footprint. Reconstruct and clamp each
// time separately before interpolating the light. Alpha zero also serves the meter.
vec3 atlasPair(vec3 loc, vec2 T, sampler2D C, sampler2D E, sampler2D D, sampler2D F, float alpha) {
  vec2 u = loc.xy, size = vec2(textureSize(C, 0));
  float k = loc.z, env = size.y - T.y, ox = 4.0 * T.y;
  bool side = k == 1.0 || k == 3.0;
  bool rectCore = k < 3.5;
  vec2 core = rectCore ? u*vec2(2.0, 0.5) + vec2(mod(k, 2.0)*2.0*T.y, k > 1.5 ? T.y*0.5 : 0.0) : u + vec2(ox, 0.0);
  vec2 epos = u * (env / T.y);
  if (side) epos = vec2(2.0 * epos.y, epos.x);
  // Two transposed envelopes each occupy two columns of the row band.
  float ec = k + step(1.5, k) + step(3.5, k);
  epos += vec2(ec * env, T.y);
  if (uCubic < 0.5) {
    vec2 cuv = core / size, euv = epos / size;
    vec3 a = atlasLight(textureLod(C, cuv, 0.0).xy, textureLod(E, euv, 0.0).xyz);
    if (alpha <= 0.0) return a;
    vec3 b = atlasLight(textureLod(D, cuv, 0.0).xy, textureLod(F, euv, 0.0).xyz);
    return mix(a, b, alpha);
  }
  if (side) {
    CurveFootprint cc = atlasCurveFootprint(core, vec2(0.0, 1.0), size);
    CurveFootprint ee = atlasCurveFootprint(epos, vec2(1.0, 0.0), size);
    vec3 a = atlasLight(monotoneAlong(C, cc).xy, monotoneAlong(E, ee));
    if (alpha <= 0.0) return a;
    vec3 b = atlasLight(monotoneAlong(D, cc).xy, monotoneAlong(F, ee));
    return mix(a, b, alpha);
  }
  if (rectCore) {
    CurveFootprint cc = atlasCurveFootprint(core, vec2(0.0, 1.0), size);
    vec2 euv = epos / size;
    vec3 a = atlasLight(monotoneAlong(C, cc).xy, textureLod(E, euv, 0.0).xyz);
    if (alpha <= 0.0) return a;
    vec3 b = atlasLight(monotoneAlong(D, cc).xy, textureLod(F, euv, 0.0).xyz);
    return mix(a, b, alpha);
  }
  CubicFootprint cc = atlasCubicFootprint(u, T.y, size.y, ox);
  vec2 euv = epos / size;
  vec3 a = atlasLight(atlasCubic(C, cc), textureLod(E, euv, 0.0).xyz);
  if (alpha <= 0.0) return a;
  vec3 b = atlasLight(atlasCubic(D, cc), textureLod(F, euv, 0.0).xyz);
  return mix(a, b, alpha);
}
float cubeAt(vec3 d, vec2 T, sampler2D C, sampler2D E) {
  vec3 loc = cubeCoords(d, T);
  if (uAtlasFilter > 0.5) {
    gS = vec4(atlasPair(loc, T, C, E, C, E, 0.0), 1.0);
    return 1.0;
  }
  float k = loc.z;
  vec2 u = loc.xy;
  vec4 e = bil(E, 0.5 * u, 0.5 * T.y, int(k * 0.5 * T.y + 0.5));
  gS = vec4(cub(C, u, T.y, int(k * T.y + 0.5)).xy + e.xy, e.z, 1.0);
  return 1.0;
}
`,Be=Pe+`uniform vec3 aF, aR, aU, bF, bR, bU;
uniform vec2 aT, bT, cT;
uniform sampler2D aC, aE, bC, bE, cC, cE, dC, dE;
uniform float uAlpha, uReveal, uFine, uHasW, uAlphaW, uKC;
// The two finished fine maps crossfaded by α (DISP6_FS), task AX (sim/zone-curtain/follow.ts displayWeights, the same
// arithmetic): both whole → (1 − α, α); else A at ea·(1 − α), B at eb·mix(ρ, α, ea) — sky only the newer B covers comes
// in with the reveal ρ. Task BH (§AJ): their weights × uFine (the fine layer's share: 0 while the view moves, in over
// 0.6 s once it stands) over the wide pair (C, D: cubeAt, crossfaded by uAlphaW, × uKC — its kR over A's), which fills
// whatever the fine weights leave (uHasW 0: no wide pair yet). xyz: prompt, 557.7, 630.0; w: the weight shown (1: whole).
vec4 mapsAt(vec3 d) {
  float wa = 0.0, wb = 0.0;
  vec3 v = vec3(0.0);
  if (uFine > 0.0) {
    float ea = samp(d, aF, aR, aU, aT, aC, aE); vec4 A = gS;
    float eb = samp(d, bF, bR, bU, bT, bC, bE); vec4 B = gS;
    if (ea >= 1.0 && eb >= 1.0) { wa = 1.0 - uAlpha; wb = uAlpha; }
    else { wa = ea * (1.0 - uAlpha); wb = eb * mix(uReveal, uAlpha, ea); }
    wa *= uFine; wb *= uFine;
    v = wa * A.xyz + wb * B.xyz;
  }
  float w = wa + wb;
  if (uHasW > 0.5 && w < 1.0) {
    vec3 W;
    if (uAtlasFilter > 0.5) W = atlasPair(cubeCoords(d, cT), cT, cC, cE, dC, dE, uAlphaW);
    else {
      cubeAt(d, cT, cC, cE); W = gS.xyz;
      cubeAt(d, cT, dC, dE); W = mix(W, gS.xyz, uAlphaW);
    }
    v += (1.0 - w) * uKC * W; w = 1.0;
  }
  return vec4(v, w);
}
`,Qs=O+`
uniform vec3 uF, uR, uU;
uniform float uTanH, uSize;
out vec4 o;
`+Be+`
void main() {
  float px = (2.0 * gl_FragCoord.x / uSize - 1.0) * uTanH, py = (2.0 * gl_FragCoord.y / uSize - 1.0) * uTanH;
  o = mapsAt(normalize(uF + px * uR + py * uU));
}
`,js=de("STAR_SKY")+me+Le+Xe+`
uniform float uRate[5];
uniform int uClass[5];
uniform sampler2D u_auExt;
uniform int u_auExtOn;
uniform float u_auRatioCap;
out vec4 o;
`+Be+`
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
`,Js=O+`
uniform vec3 uF, uR, uU;
uniform vec2 uRasterSize;
uniform float uTanH, uOff, uYOff, uSwapXY;
uniform sampler2D uLine;
uniform vec2 uObs;
out vec4 oCol;
const float RE = ${S(D)}, REFH = ${S(nt)}, COTD = ${it}, X0 = ${S(-720)}, DXL = ${S(F.DX)}, FMAX = ${S(et-1.001)}, SIGN = ${S(F.SIG_N)};
const float NORM = ${S(1/(Math.sqrt(2*Math.PI)*F.SIG_N*F.NSEG))};
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
  vec2 p = (2.0 * (gl_FragCoord.xy - vec2(uOff, uYOff)) / uRasterSize - 1.0) * uTanH;
  if (uSwapXY > 0.5) p = p.yx;
  vec3 d = normalize(uF + p.x * uR + p.y * uU);
  oCol = vec4(0.0);
  if (!(d.z > 0.02)) return;
  gU = d.z; gCh = length(d.xy); gHe = gCh > 1e-9 ? d.x / gCh : 0.0; gHn = gCh > 1e-9 ? d.y / gCh : 1.0; gRu = RE * gU;
  float I = 0.0;
${ks().mid.map(s=>`  I += redAt(${S(s)});`).join(`
`)}
  oCol = vec4(0.0, 0.0, I * NORM, 0.0);
}
`,ti=`
uniform sampler2D u_auExt;
uniform int u_auExtOn;
float auExt(int c, float x) {
  if (u_auExtOn == 0) return 1.0;
  int i0 = int(floor(x)), i1 = min(i0 + 1, u_hzNodes - 1);
  return mix(texelFetch(u_auExt, ivec2(i0, c), 0).r, texelFetch(u_auExt, ivec2(i1, c), 0).r, x - float(i0));
}
`,ei=de("STAR_SKY")+me+`
uniform vec3 uMF, uMR, uMU;
uniform float uTanR, uN;
uniform vec3 mF, mR, mU;
uniform vec2 mT;
uniform float mCube;
uniform sampler2D mC, mE;
uniform int uComp[4], uCls[4];
uniform float uK[4];
out vec4 o;
`+ti+Pe+`
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
  // (task BH, §AJ: mCube — the map is the wide one, its five faces in one target)
  float cov = 0.0;
  if (mCube > 0.5) cov = cubeAt(d, mT, mC, mE); else cov = samp(d, mF, mR, mU, mT, mC, mE);
  if (!(cov > 0.0)) { o = vec4(0.0); return; }
  vec3 m = gS.xyz;
  float x = hzX(up), sky0 = lutAt(1, 0.0).x;
  float off = sky0 > 0.0 ? max(0.0, lutAt(1, atan(uTanR * length(g))).x) / sky0 : 1.0;
  o = vec4(chan(0, m, x), chan(1, m, x), chan(2, m, x), chan(3, m, x)) * off;
}
`,si=O+`
uniform sampler2D uS;
uniform float uN;
uniform vec4 uW;
out vec4 o;
vec4 at(ivec2 q, int n) { return q.x < 0 || q.y < 0 || q.x >= n || q.y >= n ? vec4(0.0) : texelFetch(uS, q, 0); }
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  int blk = p.x / 3, kind = p.x - 3 * blk, n = int(uN);
  ivec2 b0 = ivec2(blk, p.y) * ${X};
  vec4 s = vec4(0.0), bb = vec4(0.0);
  float best = -1.0, cnt = 0.0;
  for (int j = 0; j < ${X}; j++) for (int i = 0; i < ${X}; i++) {
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
`,ii=O+`
uniform sampler2D uB;
uniform int uNB, uOff;
out vec4 o;
void main() {
  int kind = int(gl_FragCoord.x) - uOff;
  vec4 s = vec4(0.0), bb = vec4(0.0);
  float best = -1.0, cnt = 0.0;
  for (int j = 0; j < ${j/X}; j++) {
    if (j >= uNB) break;
    for (int i = 0; i < ${j/X}; i++) {
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
`,mt={maxTextureSize:4096,maxVertexAttribs:15,maxTfInterleaved:z,maxVertexTextureUnits:3,maxTextureUnits:16,maxFragmentUniformVectors:64,maxVertexUniformVectors:64},Yt={filter:.02,blend:.001},Ft=s=>s?"rgba32f":"rgba16f",ni={maxTextureSize:"MAX_TEXTURE_SIZE",maxVertexAttribs:"MAX_VERTEX_ATTRIBS",maxTfInterleaved:"MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS",maxVertexTextureUnits:"MAX_VERTEX_TEXTURE_IMAGE_UNITS",maxTextureUnits:"MAX_TEXTURE_IMAGE_UNITS",maxFragmentUniformVectors:"MAX_FRAGMENT_UNIFORM_VECTORS",maxVertexUniformVectors:"MAX_VERTEX_UNIFORM_VECTORS"};function $t(s){if(!s.colorBufferFloat)return"EXT_color_buffer_float missing (float colour targets)";if(!s.fence)return"fenceSync missing (the meter's read-back)";for(const t of Object.keys(mt))if(!(s[t]>=mt[t]))return`${ni[t]} ${s[t]} < ${mt[t]}`;return s.probeError?`probe: ${s.probeError}`:s.filterProbe===null||!(Math.abs(s.filterProbe-.5)<=Yt.filter)?`RGBA16F linear filtering: probe ${s.filterProbe} (0.5 expected)`:s.blendProbe===null||!(Math.abs(s.blendProbe-.5)<=Yt.blend)?`additive blending into ${Ft(s.floatBlend).toUpperCase()}: probe ${s.blendProbe} (0.5 expected)`:null}const Kt=.5,ai=8,ri=s=>Math.min(Math.max(0,s),Kt/ai)/Kt;function oi(s){const t=We("auroral-zone",s);return W.map(e=>t[e])}function pt(s,t,e,i,n,a=1){const o=s.length,r=new Float32Array(o),c=new Float32Array(o),h=Math.min(1,Math.max(0,n));for(let u=0;u<o;u++){const f=t[u]===0||t[u]===1||t[u]===2,l=e[u];r[u]=f&&l>0?s[u]*(i/l)*h*a:0,c[u]=f?s[u]*(1-h):s[u]}return{map:r,coarse:c}}const k=12,U=["core","env","glow"],ci=s=>[(-s*s*s+2*s*s-s)/2,(3*s*s*s-5*s*s+2)/2,(-3*s*s*s+4*s*s+s)/2,(s*s*s-s*s)/2],Qt=(s,t)=>({w:s==="linear"?[0,1-t,t,0]:ci(t),u2:t,wc:s==="cubicw"?1:0});function ui(s,t,e,i){const n=Math.PI/180,a=s*n,o=t*n,r=[Math.sin(a)*Math.cos(o),Math.cos(a)*Math.cos(o),Math.sin(o)],c=[Math.cos(a),-Math.sin(a),0],h=[r[1]*c[2]-r[2]*c[1],r[2]*c[0]-r[0]*c[2],r[0]*c[1]-r[1]*c[0]].map(f=>-f),u=h[2]<0?h.map(f=>-f):h;return{f:r,r:c,up:u,tanH:Math.tan(.5*e*n),size:i}}function jt(s,t,e,i,n=5,a=1){const o=Math.PI/180,r=Math.tan(.5*e*o),c=Math.min(80,.5*e+n),h=Math.tan(c*o),u=2*Math.max(2,Math.round(.5*i*a*h/r));return ui(s,t,2*c,u)}const xt=48,hi=6;function fi(s,t,e,i,n,a){const o=Math.max(...s.map(u=>u.n)),r=i.map(()=>[]),c=i.map(u=>{const f=u.tanH*(1+a);return[u.r,u.up].flatMap(l=>[-1,1].map(m=>u.f.map((d,x)=>f*d+m*l[x])))}),h=e.reduce((u,f)=>u+Math.max(0,-f),0);for(let u=0;u<o;u+=xt){const f=u/xt*hi;let l=1/0,m=-1/0,d=1/0,x=-1/0,p=0,E=0;for(const R of t)f>=R.length||(l=Math.min(l,R[f]),m=Math.max(m,R[f+1]),d=Math.min(d,R[f+2]),x=Math.max(x,R[f+3]),p=Math.max(p,R[f+4]),E=Math.max(E,R[f+5]));if(l>m)continue;const v=(m-l)*h,b=(x-d)*h;l-=v,m+=v,d-=b+(Y-nt)*it,x+=b-(Z-nt)*it;const T=Math.max(l*l,m*m)+Math.max(d*d,x*x),w=T/(D*D),_=(1+Z/D)*(1-w/6),y=1+Y/D,A=y*n*Math.sqrt(1+h)*(Math.sqrt(p)+Math.sqrt(E))+4,M=[Math.min(_*l,y*l)-A,Math.min(_*d,y*d)-A,Z-(D+Y)*w/2-A],C=[Math.max(_*m,y*m)+A,Math.max(_*x,y*x)+A,Y+A];for(let R=0;R<c.length;R++){if(w<=.0625&&c[R].some(([Ct,Nt,Pt])=>Ct*(Ct<0?M[0]:C[0])+Nt*(Nt<0?M[1]:C[1])+Pt*(Pt<0?M[2]:C[2])<0))continue;const P=r[R],V=P[P.length-1],Mt=Math.min(xt,o-u);V&&V[0]+V[1]===u?P[P.length-1]=[V[0],V[1]+Mt]:P.push([u,Mt])}}return r}const De=[8,12,16,24],Jt=2.6,li=.75,te=3,di=16,mi=6,pi=40,ee=55,xi=40,se=(s=De[0])=>({n:s,down:0,changes:0});function ie(s){if(s.length<mi)return null;const t=[...s].sort((e,i)=>e-i);return t[t.length>>1]}function vi(s,t,e){const i=De,n=i.indexOf(s.n);if(n<0||t===null)return s;const a=h=>({n:h,down:0,changes:s.changes+(h!==s.n?1:0)});if(t!==void 0){const h=l=>i.find(m=>t/m<=l)??i[i.length-1],u=h(Jt),f=h(Jt*li);return u>s.n?a(u):f<s.n?s.down+1>=te?a(i[n-1]):{...s,down:s.down+1}:s.down?{...s,down:0}:s}if(e>1/pi&&n<i.length-1)return{...a(i[n+1]),cool:xi};const o=s.cool??0,r=Math.max(0,o-1),c=h=>o?{...h,cool:r}:h;return o>0&&e<1/ee?{...s,down:0,cool:r}:e<1/ee&&n>0?s.down+1>=te?a(i[n-1]):c({...s,down:s.down+1}):s.down||o?c({...s,down:0}):s}const Ei=12,bi=1.6,Ti=.25,Ai=.3,Ri=Math.LN2/.4;function wi(s,t,e,i,n=Ei,a=bi){const o=Math.max(0,i-s.t),r=-Math.expm1(-o/n),c=Math.exp(-o/Ti),h=Math.exp(Ri*o),u=(f,l)=>{if(!(l>0)||!(f>0))return Math.max(0,l);const m=f+r*(l-f),d=l*a,x=l/a,p=m>d?d+(m-d)*c:m<x?x-(x-m)*c:m;return Math.min(f*h,Math.max(f/h,p))};return{t:i,mean:u(s.mean,t),peak:u(s.peak,e)}}const _i=6,vt={N:8,dt:.25,margin:5,envBands:16,cut:4,mode:"cubic",maxMapSize:512,pitchDegMax:.25,fixedAtlas:!1},yi=16,yt=3,L=6,ne=16*L*yt,J=(s,t)=>{s.push(t),s.length>600&&s.shift()};function ae(s,t,e){const i=s.msg.red,n=t.msg.red;if(!i||!n)return null;const a=i.A.length,o=new Float32Array(a),r=new Float32Array(a);for(let c=0;c<a;c++)o[c]=i.A[c]+(n.A[c]-i.A[c])*e,r[c]=i.Y[c]+(n.Y[c]-i.Y[c])*e;return{A:o,Y:r}}const re=.5,Et=16,Si=2,Fi=300,Mi=.6,Ci=.12,Ni=.32,tt=8,oe=4,ce=16,Pi=16,ue=64,q=[.25,1/3,.5],Bi=.75,Di=.4,he=12,Oi=3e3,bt=()=>({A:null,B:null,acc:null,job:null,slice:0,rot:0,startedAt:0});let Tt=null;function ki(s,t){const e=s.createProgram(),i=!!s.getExtension("KHR_parallel_shader_compile");t.programs.add(e);const n=[[s.VERTEX_SHADER,Vs],[s.FRAGMENT_SHADER,qs]].map(([u,f])=>{const l=s.createShader(u);return s.shaderSource(l,f),s.compileShader(l),s.attachShader(e,l),{s:l}});s.transformFeedbackVaryings(e,Ys,s.INTERLEAVED_ATTRIBS),s.linkProgram(e);let a=!1,o=null;const r=()=>!i||s.getProgramParameter(e,37297)===!0;t.deferred.set(e,{shaders:n,ready:r});const c=()=>{if(!(a||o||!n.length))try{for(const{s:u}of n)if(!s.getShaderParameter(u,s.COMPILE_STATUS))throw new Error(`zoneCurtainExpand compile: ${s.getShaderInfoLog(u)}`);if(!s.getProgramParameter(e,s.LINK_STATUS))throw new Error(`zoneCurtainExpand link: ${s.getProgramInfoLog(e)}`);a=!0}catch(u){o=u instanceof Error?u:new Error(String(u))}finally{for(const{s:u}of n)s.getAttachedShaders(e)?.includes(u)&&s.detachShader(e,u),s.deleteShader(u);n.length=0,t.deferred.delete(e)}},h=new Map;return{prog:e,loc:{get:u=>(h.has(u)||h.set(u,s.getUniformLocation(e,u)),h.get(u))},done:()=>a||o!==null||r(),check:()=>{if(c(),o)throw o}}}const fe=120,Ui=1e3,zi=30,gi=s=>[{set:"core",tgt:"core",tab:0,pulse:1},{set:"env",tgt:"env",tab:s,pulse:1},{set:"glow",tgt:"env",tab:s,pulse:0}],le=new Float32Array([0,0,1,0,0,1,1,1]),Oe=(s,t)=>({level:Math.min(3,Math.max(0,Math.round(s))),seed:t}),Ii=(s,t)=>({...Oe(s,t),weather:{seed:t}});function Li(s,t,e,i,n){const a=[];for(let o=0;o<s.length;o+=_i){const r={t0:s[o],vz:s[o+1],amp:s[o+2],xc:s[o+3],w:s[o+4],lag:s[o+5]},c=Math.max(e,r.xc-2.8*r.w),h=Math.min(i,r.xc+2.8*r.w);h>=c&&[c,h,Math.min(h,Math.max(c,r.xc))].some(u=>{const f=t-(r.t0+(u-r.xc)*r.lag);return f>0&&70+r.vz*f<=420})&&a.push(r)}return a.sort((o,r)=>r.amp-o.amp),{events:a.slice(0,n),dropped:Math.max(0,a.length-n)}}const ke=[0,1,2,3,15];function $(s){const t=n=>s.getParameter(n),e=t(s.ACTIVE_TEXTURE),i=ke.map(n=>(s.activeTexture(s.TEXTURE0+n),t(s.TEXTURE_BINDING_2D)));return s.activeTexture(e),{prog:t(s.CURRENT_PROGRAM),vao:t(s.VERTEX_ARRAY_BINDING),array:t(s.ARRAY_BUFFER_BINDING),copyRead:t(s.COPY_READ_BUFFER_BINDING),copyWrite:t(s.COPY_WRITE_BUFFER_BINDING),tfo:t(s.TRANSFORM_FEEDBACK_BINDING),tfBuffer:t(s.TRANSFORM_FEEDBACK_BUFFER_BINDING),discard:s.isEnabled(s.RASTERIZER_DISCARD),blend:s.isEnabled(s.BLEND),viewport:t(s.VIEWPORT),scissor:s.isEnabled(s.SCISSOR_TEST),drawFb:t(s.DRAW_FRAMEBUFFER_BINDING),readFb:t(s.READ_FRAMEBUFFER_BINDING),cull:s.isEnabled(s.CULL_FACE),depth:s.isEnabled(s.DEPTH_TEST),unpack:t(s.UNPACK_ALIGNMENT),unit:e,tex:i}}function K(s,t){if(s.isContextLost()||!t.viewport)return;const e=(i,n)=>{n?s.enable(i):s.disable(i)};e(s.RASTERIZER_DISCARD,t.discard),s.bindTransformFeedback(s.TRANSFORM_FEEDBACK,t.tfo),s.bindBuffer(s.TRANSFORM_FEEDBACK_BUFFER,t.tfBuffer),s.bindVertexArray(t.vao),s.bindBuffer(s.ARRAY_BUFFER,t.array),s.bindBuffer(s.COPY_READ_BUFFER,t.copyRead),s.bindBuffer(s.COPY_WRITE_BUFFER,t.copyWrite),s.vertexAttrib4f(12,0,0,0,1),s.useProgram(t.prog),e(s.BLEND,t.blend),s.blendFunc(s.ONE,s.ONE),s.blendEquation(s.FUNC_ADD),e(s.CULL_FACE,t.cull),e(s.DEPTH_TEST,t.depth),e(s.SCISSOR_TEST,t.scissor),s.viewport(t.viewport[0],t.viewport[1],t.viewport[2],t.viewport[3]),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,t.drawFb),s.bindFramebuffer(s.READ_FRAMEBUFFER,t.readFb),s.pixelStorei(s.UNPACK_ALIGNMENT,t.unpack),ke.forEach((i,n)=>{s.activeTexture(s.TEXTURE0+i),s.bindTexture(s.TEXTURE_2D,t.tex[n]??null)}),s.activeTexture(t.unit)}function Xi(s,t,e){const i=performance.now(),n=h=>Number(s.getParameter(h)),a=s.getSupportedExtensions()??[],o=!!s.getExtension("EXT_color_buffer_float"),r=e||!!s.getExtension("EXT_float_blend"),c={colorBufferFloat:o,floatBlend:r,fence:typeof s.fenceSync=="function",maxTextureSize:n(s.MAX_TEXTURE_SIZE),maxVertexAttribs:n(s.MAX_VERTEX_ATTRIBS),maxTfInterleaved:n(s.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS),maxVertexTextureUnits:n(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureUnits:n(s.MAX_TEXTURE_IMAGE_UNITS),maxFragmentUniformVectors:n(s.MAX_FRAGMENT_UNIFORM_VECTORS),maxVertexUniformVectors:n(s.MAX_VERTEX_UNIFORM_VECTORS),filterProbe:null,blendProbe:null,probeError:null,reason:null,target:Ft(r),timerQuery:a.includes("EXT_disjoint_timer_query_webgl2"),floatLinear:a.includes("OES_texture_float_linear"),probeMs:0};if($t({...c,filterProbe:.5,blendProbe:.5})===null){const h=$(s),u=s.getParameter(s.PIXEL_PACK_BUFFER_BINDING);let f=null,l=null,m=null,d=null;try{s.activeTexture(s.TEXTURE15),f=t.texture(2,1,s.RGBA16F,s.RGBA,s.FLOAT,new Float32Array([0,0,0,0,1,1,1,1])),s.bindTexture(s.TEXTURE_2D,f),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),l=t.target(1,1,r?s.RGBA32F:s.RGBA16F,s.RGBA),m=t.program("zoneCurtainProbe",g,Zs),d=s.createVertexArray(),s.bindVertexArray(d),s.useProgram(m.prog),s.activeTexture(s.TEXTURE0),s.bindTexture(s.TEXTURE_2D,f),s.uniform1i(m.loc.get("uT"),0),s.bindFramebuffer(s.FRAMEBUFFER,l.fbo),s.viewport(0,0,1,1),s.disable(s.SCISSOR_TEST),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.clearBufferfv(s.COLOR,0,[0,0,0,0]),s.enable(s.BLEND),s.blendFunc(s.ONE,s.ONE),s.blendEquation(s.FUNC_ADD),s.drawArrays(s.TRIANGLES,0,3),s.drawArrays(s.TRIANGLES,0,3);const x=new Float32Array(4);s.bindBuffer(s.PIXEL_PACK_BUFFER,null),s.readPixels(0,0,1,1,s.RGBA,s.FLOAT,x);const p=s.getError();p!==s.NO_ERROR&&(c.probeError=`GL error 0x${p.toString(16)}`),c.filterProbe=x[0]/2,c.blendProbe=x[1]}catch(x){c.probeError=(x instanceof Error?x.message:String(x)).split(`
`)[0].slice(0,200)}finally{d&&s.deleteVertexArray(d),m&&(s.deleteProgram(m.prog),t.programs.delete(m.prog)),l&&t.deleteTarget(l),f&&t.deleteTexture(f),K(s,h),s.bindBuffer(s.PIXEL_PACK_BUFFER,u)}}return c.reason=$t(c),c.probeMs=performance.now()-i,c}class Wi{opt;caps=null;stats={frames:0,maps:0,misses:0,miss3:0,states:0,workerMs:[],uploadBytes:0,tablesMs:null,tableLayers:[],slots:{core:0,env:0,glow:0},segsLastSlice:0,eventsDropped:0,mainMs:[],glErrors:0,failed:null,target:"",stillFrames:0,restarts:0,composed:0,w:0,meterReads:0,meterBack:0,meterTimeouts:0,meterLatency:0,meterMs:[],meterN:0,meterSteps:[],collectMs:[],collectSteps:[],redPasses:0,first:{made:typeof performance<"u"?performance.now():0,programs:null,linked:null,tables:null,state:null,maps:null,metered:null,faded:null,tablesCached:!1},lostCalls:0,follow:{rate:0,wideMaps:0,wideFrames:0,wideMs:0,wideSize:0,wideMisses:0,fine:0,fineDropped:0,standingMaps:0},auto:{n:0,via:"",sliceMs:null,mapMs:null,changes:0},workerMsParts:[]};lost(t){return t.isContextLost()?(this.stats.lostCalls++,!0):!1}debugMeterN=null;meterIn=null;debugW=null;debugCompose=!0;debugFadeHold=!1;debugClassGain=null;debugRedOff=!1;debugRedSource=null;debugN=null;get nNow(){return this.nCur}nCur;autoN=se();wide=bt();standSince=null;phi=0;phiAt=null;debugWide=!0;debugFine=!0;get atlasActive(){return this.opt.fixedAtlas&&this.debugN===null&&this.debugWide}debugAtlasCull=!0;atlasSlots={kept:0,all:0,faces:[0,0,0,0,0]};newAtlas(){return this.newWideMap(zs(Ni,oe),!0)}debugWideMoving=null;shown=[];noteShown(t,e,i,n){this.shown.push({at:performance.now(),lag:t-e,onTime:!n.miss&&!n.miss3&&e>i+1e-6}),this.shown.length>300&&this.shown.shift()}updateRate(t=5e3){const e=performance.now(),i=this.shown.filter(a=>e-a.at<=t),n=i.map(a=>a.lag).sort((a,o)=>a-o);return{perS:1e3*i.length/t,onTimePerS:1e3*i.filter(a=>a.onTime).length/t,lagMed:n.length?n[n.length>>1]:null,lagP90:n.length?n[Math.floor(.9*(n.length-1))]:null,n:i.length}}tq=void 0;autoCost=[];timeBegin(t){const e=this.tq;if(!e||e.pend.length>=6||t.getQuery(e.ext.TIME_ELAPSED_EXT,t.CURRENT_QUERY))return null;const i=t.createQuery();return i&&t.beginQuery(e.ext.TIME_ELAPSED_EXT,i),i}timeEnd(t,e,i){const n=this.tq;t.endQuery(n.ext.TIME_ELAPSED_EXT),n.pend.push({q:e,n:i})}timePoll(t){if(this.tq===void 0){const n=this.caps?.timerQuery===!1?null:t.getExtension("EXT_disjoint_timer_query_webgl2");this.tq=n?{ext:n,pend:[]}:null}const e=this.tq;if(!e||!e.pend.length)return;const i=!!t.getParameter(e.ext.GPU_DISJOINT_EXT);for(;e.pend.length&&t.getQueryParameter(e.pend[0].q,t.QUERY_RESULT_AVAILABLE);){const n=e.pend.shift();if(!i){const a=Number(t.getQueryParameter(n.q,t.QUERY_RESULT))/1e6;this.autoCost.push(a*n.n),this.autoCost.length>di&&this.autoCost.shift(),this.stats.auto.sliceMs=a}t.deleteQuery(n.q)}}seed;debugMaps=null;debugHold=!1;debugScene=null;debugSceneExtra=null;res=null;worker=null;makeWorker;key="";scene=null;tables=null;tablesAsked=!1;ring=[];pending=[];inFlight=!1;nextT=0;reqId=0;cap={core:0,env:0,glow:0};pX=null;pR=null;pD=null;pC=null;pRed=null;redTex=null;progQueue=[];tableWorker=null;pM=[];mS=null;mB=null;mF=null;pbos=[];reads=[];extIds=new WeakMap;extNext=1;expandInputs=new Map;vaoR=null;vaoD=null;quad=null;tfo=null;out=null;kTex=null;ptPool=[];refCpu=new Map;accFmt=0;A=null;B=null;acc=null;Ta=0;Tb=0;cur=null;slice=0;fdts=[];lastT=null;waitSince=null;hist=[];omega={axis:[0,0,1],rate:0};view=null;trash=[];w=0;lastWall=null;unmetered=0;retiring=null;retShare=0;retOut=null;outAt=null;holdS=0;retiringShare(t){return this.retiring?this.retShare*(this.retOut??1-t):0}meterPairs(){if(this.retOut===null||!this.retiring||this.debugMaps||this.debugW!==null)return this.pairs();if(!this.programReady())return[];const t=[],e=this.maps(),i=this.retShare*(1-this.w);return i>0&&t.push({m:this.retiring,share:i}),e&&this.w>0&&t.push({m:e,share:this.w}),t}weather;wx=null;constructor(t={},e,i=0,n=!1){this.opt={...vt,...t},this.nCur=this.opt.N,this.seed=i>>>0,this.weather=n,this.autoN=se(this.opt.N),this.makeWorker=e??(()=>new Worker(new URL(""+new URL("zone-curtain.worker-ZtnixFBJ.js",import.meta.url).href,import.meta.url),{type:"module"}))}maps(){if(this.debugMaps)return this.debugMaps;if(!this.linked)return null;const t=this.wide,e=t.A??(this.opt.fixedAtlas?t.B:null),i=this.opt.fixedAtlas?tt:Et,n=this.debugWide&&e&&t.B?{A:e,B:t.B,alpha:Math.min(1,t.rot/(5*i))}:null;return!this.atlasActive&&this.A&&this.B?{A:this.A,B:this.B,alpha:this.alphaNow(),wide:n,fine:n?this.phi:1}:n?{A:n.A,B:n.B,alpha:n.alpha,wide:n,fine:0}:null}coverageNow(t,e,i=25){const n=this.debugMaps??this.maps();if(!n)return{n:0,nA:0,nB:0,nC:0,sA:0,sB:0,sC:0,none:1,fallbackOnly:0,shown:0};const a=n.fine??1,o=Vt(t,e,a>0?n.A.cam:null,a>0?n.B.cam:null,n.wide?"cube":null,n.alpha,this.nCur,i,a);return{...o,shown:o.shown*this.weight()}}coverageOfView(t=15){const e=this.view;return e?this.coverageNow(e.dir,e.fovDeg*Math.PI/360,t):null}layersOf(t){const e=[];for(const{m:i,share:n}of t){const a=i.fine??1;a>0&&e.push({A:i.A,B:i.B,alpha:i.alpha,share:n*a}),i.wide&&a<1&&e.push({A:i.wide.A,B:i.wide.B,alpha:i.wide.alpha,share:n*(1-a)})}return e}alphaNow(){return Math.min(1,this.rotFrames/Math.max(1,this.rotN))}rotFrames=0;rotN=vt.N;pairs(){if(!this.programReady())return[];if(this.debugMaps)return[{m:this.debugMaps,share:this.debugW??this.w}];const t=[],e=this.maps(),i=this.debugW??this.w;if(this.retiring&&this.debugW===null){const n=this.retiringShare(i);n>0&&t.push({m:this.retiring,share:n})}return e&&i>0&&t.push({m:e,share:i}),t}weight(){return(this.debugMaps??this.maps())&&this.programReady()?this.debugW??this.w:0}shares(){let t=0,e=0;for(const i of this.pairs())i.m===this.retiring?e=i.share:t=i.share;return{current:t,retiring:e}}coarseRates(t,e){return this.debugW!==null?this.debugW>0?pt(t,e,t,1,this.debugW).coarse:t:this.stats.failed?t:pt(t,e,t,1,1).coarse}compose(t,e,i,n,a,o,r){const c=this.pairs(),h=this.pC;if(!c.length||!h||!this.debugCompose||this.lost(t))return!1;t.useProgram(h.prog),o(h),t.uniform1iv(h.loc.get("uClass"),Int32Array.from(i));const u=oi(n),f=this.debugClassGain;for(const{m:l,share:m}of c){this.bindMaps(t,h,l,2);const d=pt(e,i,u,l.A.kR,m,a).map;if(f)for(let x=0;x<d.length;x++)d[x]=d[x]*(f[i[x]]??1);t.uniform1fv(h.loc.get("uRate"),d),r()}return t.activeTexture(t.TEXTURE0),this.stats.composed++,!0}meterField(){const t=e=>this.readingOf(e);return Ut(this.layersOf(this.meterPairs()).map(e=>({A:t(e.A),B:t(e.B),alpha:e.alpha,share:e.share})))}meterStats(t,e){const i=zt(t,e,Dt(),this.meterField()),n=this.retOut===null?i.mean:zt(t,e,Dt(),Ut(this.layersOf(this.pairs()).map(h=>({A:this.readingOf(h.A),B:this.readingOf(h.B),alpha:h.alpha,share:h.share})))).mean,a=typeof performance<"u"?performance.now()/1e3:0,o=this.slowLight;if(this.debugMeterFast)return this.slowLight=null,{...i,shown:n};const r=this.retiring||this.w<1?Ai:this.debugGainTau??void 0,c=o&&a-o.t>=0&&a-o.t<2?wi(o,i.mean,i.peak,a,r):{t:a,mean:i.mean,peak:i.peak};return this.slowLight=c,{mean:c.mean,peak:c.peak,shown:n}}slowLight=null;debugMeterFast=!1;debugGainTau=null;meter(t,e){if(this.stats.failed||!this.pM.length||this.lost(t)||!this.programReady())return;this.reads.some(p=>p.passed)&&(this.catchUp&&t.deleteSync(this.catchUp),this.catchUp=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0));const i=this.debugMaps?null:this.maps(),n=[];for(const p of this.layersOf(this.meterPairs()).sort((E,v)=>v.share-E.share))n.push(p.A,p.B);if(i&&(n.push(i.A,i.B),i.wide&&n.push(i.wide.A,i.wide.B)),!n.length)return;const a=2*e.radiusDeg,o=cs(e.radiusDeg,Math.min(this.opt.pitchDegMax,a/128),this.debugMeterN??void 0);let r=0;e.ext&&(r=this.extIds.get(e.ext)??0,r||(r=this.extNext++,this.extIds.set(e.ext,r)));const c=`${e.axis.map(p=>p.toFixed(4)).join(",")}|${o.n}|${o.tanR.toFixed(6)}|${r}`,h=[];for(const p of n)h.length>=yt||h.includes(p)||p.readKey===c||this.reads.some(E=>E.items.some(v=>v.M===p&&v.gen===p.gen&&v.key===c))||h.push(p);const u=W.map(p=>e.rates[p]??0);this.meterIn={axis:[...e.axis],radiusDeg:e.radiusDeg,n:o.n,tanR:o.tanR,count:o.count,level:e.level,cls:Array.from(e.cls),weights:u};const f=this.w<1||this.retiring!==null||this.debugMaps!==null||this.debugW!==null||h.some(p=>p.reading!==null&&p.readKey==="");if(h.length&&!f&&(this.reads.length>0||performance.now()-this.lastReduceAt<Ui)&&(h.length=0),!h.length)return;this.lastReduceAt=performance.now();const l=this.steps,m=performance.now(),d=$(t),x=t.getParameter(t.PIXEL_PACK_BUFFER_BINDING);l.fill(0),l[1]=performance.now()-m;try{const p=Ot(e.cls),E=kt(e.cls);h.forEach((y,A)=>this.reduce(t,y,e,o,A));const v=performance.now(),b=this.res;let T=this.pbos.pop();T||(T=t.createBuffer(),b.buffers.add(T),t.bindBuffer(t.PIXEL_PACK_BUFFER,T),t.bufferData(t.PIXEL_PACK_BUFFER,ne,t.STREAM_READ),b.recordBuffer(T,ne)),t.bindFramebuffer(t.FRAMEBUFFER,this.mF.fbo),t.bindBuffer(t.PIXEL_PACK_BUFFER,T),t.readPixels(0,0,L*h.length,1,t.RGBA,t.FLOAT,0),t.bindBuffer(t.PIXEL_PACK_BUFFER,null);const w=performance.now();l[5]=w-v;const _=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);if(l[6]=performance.now()-w,!_)throw this.pbos.push(T),new Error("fenceSync returned null");this.reads.push({items:h.map(y=>({M:y,gen:y.gen,key:c,chan:p,red:E})),sync:_,pbo:T,frames:0}),t.activeTexture(t.TEXTURE0),this.stats.meterReads+=h.length,this.stats.meterN=o.n}catch(p){this.lost(t)||(this.stats.failed=`zoneCurtainMeter: ${p instanceof Error?p.message:String(p)}`)}finally{const p=performance.now();K(t,d),t.bindBuffer(t.PIXEL_PACK_BUFFER,x);const E=performance.now();l[0]=E-m,l[7]=E-p,J(this.stats.meterMs,l[0]),J(this.stats.meterSteps,Array.from(l))}}steps=new Float64Array(8);lastReduceAt=-1/0;lastReading=null;catchUp=null;readingOf(t){return t.reading??(this.debugMaps?null:this.lastReading)}collect(t){if(!this.reads.length||this.stats.failed||this.lost(t))return;const e=performance.now(),i=t.getParameter(t.PIXEL_PACK_BUFFER_BINDING),n=[0,0,0];try{this.poll(t,n)}catch(a){this.lost(t)||(this.stats.failed=`zoneCurtainMeter: ${a instanceof Error?a.message:String(a)}`)}finally{t.bindBuffer(t.PIXEL_PACK_BUFFER,i),n[0]=performance.now()-e,J(this.stats.collectMs,n[0]),J(this.stats.collectSteps,n)}}poll(t,e){for(const i of[...this.reads]){const n=performance.now(),a=i.passed?t.ALREADY_SIGNALED:t.clientWaitSync(i.sync,0,0);e[1]=e[1]+performance.now()-n;const o=a===t.ALREADY_SIGNALED||a===t.CONDITION_SATISFIED;if(o&&!i.passed){i.passed=!0,i.frames++;continue}if(i.passed&&this.catchUp&&++i.frames<=fe/2){const r=t.clientWaitSync(this.catchUp,0,0);if(r!==t.ALREADY_SIGNALED&&r!==t.CONDITION_SATISFIED&&r!==t.WAIT_FAILED)continue}if(!(!o&&a!==t.WAIT_FAILED&&++i.frames<=fe)){if(this.reads.splice(this.reads.indexOf(i),1),t.deleteSync(i.sync),o){const r=new Float32Array(4*L*i.items.length),c=performance.now();t.bindBuffer(t.PIXEL_PACK_BUFFER,i.pbo),t.getBufferSubData(t.PIXEL_PACK_BUFFER,0,r),e[2]=e[2]+performance.now()-c,i.items.forEach((h,u)=>{const f=4*L*u,l=W.length,m=new Float64Array(l),d=new Float64Array(l);h.chan.forEach((x,p)=>{m[x]=r[f+p],d[x]=r[f+4+p]}),h.red>=0&&(m[h.red]=r[f+12],d[h.red]=r[f+16]),h.M.gen===h.gen&&(h.M.reading={sums:m,count:r[f+8],box:d,boxTotal:r[f+9]+(h.red>=0?Math.max(0,r[f+21]):0)},h.M.readKey=h.key,this.lastReading=h.M.reading)}),this.stats.meterBack+=i.items.length,this.stats.meterLatency=i.frames}else this.stats.meterTimeouts+=i.items.length;this.pbos.push(i.pbo)}}}reduce(t,e,i,n,a){const o=Ot(i.cls),r=kt(i.cls);this.reduceSet(t,e,i,n,o,L*a),r>=0&&this.reduceSet(t,e,i,n,[r],L*a+3)}reduceSet(t,e,i,n,a,o){const r=this.res,c=n.n,h=c/X,u=this.pM[0],f=this.pM[1],l=this.pM[2],m=this.steps,d=performance.now(),x=(A,M,C)=>{if(A&&A.w===M&&A.h===C)return A;if(A){const P=A;this.defer(()=>r.deleteTarget(P))}t.activeTexture(t.TEXTURE15);const R=r.target(M,C,t.RGBA32F,t.RGBA);return t.activeTexture(t.TEXTURE0),R},p=this.mS=x(this.mS,c,c),E=this.mB=x(this.mB,3*h,h),v=this.mF=x(this.mF,L*yt,1),b=hs(i.axis),T=this.meterIn.weights,w=[0,1,2,3].map(A=>a[A]??0),_=[0,1,2,3].map(A=>a[A]!==void 0?e.kR:0),y=[0,1,2,3].map(A=>a[A]!==void 0?T[a[A]]??0:0);t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),t.bindVertexArray(this.vaoD),t.useProgram(u.prog),i.bind(u),t.uniform3fv(u.loc.get("uMF"),b.F),t.uniform3fv(u.loc.get("uMR"),b.R),t.uniform3fv(u.loc.get("uMU"),b.U),t.uniform1f(u.loc.get("uTanR"),n.tanR),t.uniform1f(u.loc.get("uN"),c),t.uniform3fv(u.loc.get("mF"),e.cam.f),t.uniform3fv(u.loc.get("mR"),e.cam.r),t.uniform3fv(u.loc.get("mU"),e.cam.up),t.uniform2f(u.loc.get("mT"),e.cam.tanH,e.n),t.uniform1f(u.loc.get("mCube"),e.cube?1:0),t.uniform1f(u.loc.get("uAtlasFilter"),e.filtered?1:0),t.uniform1f(u.loc.get("uCubic"),this.debugCubic?1:0),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,e.core.tex),t.uniform1i(u.loc.get("mC"),2),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,e.env.tex),t.uniform1i(u.loc.get("mE"),3),t.uniform1iv(u.loc.get("uComp"),Int32Array.from(w)),t.uniform1iv(u.loc.get("uCls"),Int32Array.from(w.map(A=>i.cls[A]??0))),t.uniform1fv(u.loc.get("uK"),Float32Array.from(_)),t.bindFramebuffer(t.FRAMEBUFFER,p.fbo),t.viewport(0,0,c,c),t.drawArrays(t.TRIANGLES,0,3),t.useProgram(f.prog),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,p.tex),t.uniform1i(f.loc.get("uS"),2),t.uniform1f(f.loc.get("uN"),c),t.uniform4fv(f.loc.get("uW"),Float32Array.from(y)),t.bindFramebuffer(t.FRAMEBUFFER,E.fbo),t.viewport(0,0,3*h,h),t.drawArrays(t.TRIANGLES,0,3),t.useProgram(l.prog),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,E.tex),t.uniform1i(l.loc.get("uB"),2),t.uniform1i(l.loc.get("uNB"),h),t.uniform1i(l.loc.get("uOff"),o),t.bindFramebuffer(t.FRAMEBUFFER,v.fbo),t.viewport(o,0,3,1),t.drawArrays(t.TRIANGLES,0,3),m[4]=m[4]+performance.now()-d}debugMeterSamples(t){return this.mS?this.readTarget(t,this.mS):null}frame(t){if(this.stats.failed||this.debugHold||this.lost(t.gl))return;const e=performance.now(),i=t.gl,n=$(i);this.holdS=Math.max(0,t.holdS??0);try{this.res=t.res,this.flush();const a=this.debugScene??(this.weather?Ii:Oe)(t.level,t.seed),o=this.debugSceneExtra&&!this.debugScene?{...a,...this.debugSceneExtra}:a,r=this.debugScene?JSON.stringify(o):`${o.level}|${o.seed}${this.debugSceneExtra?"|"+JSON.stringify(this.debugSceneExtra):""}`,c=this.ring.length?this.ring[0].t:null,h=this.lastT!==null&&t.tModel<this.lastT-1e-6,u=this.lastT!==null&&(t.tModel>this.lastT+5||h&&(c===null||t.tModel<c-1e-6));this.worker&&(r!==this.key||u)&&this.restart(r!==this.key),this.key=r,this.scene=o,this.worker||this.start(t),this.pX?this.askPrograms(1):this.programs(i,t),this.take(i),this.timePoll(i);const f=this.lastT!==null&&t.tModel===this.lastT;if(this.track(t),this.want(t.tModel),t.dtSeconds>0&&!f&&(this.fdts.push(t.dtSeconds),this.fdts.length>31&&this.fdts.shift()),this.lastT=t.tModel,this.atlasActive){this.tables&&this.ring.length>=4&&this.programReady()&&((!f||!this.wide.B)&&this.wideStep(i,t,!0)&&this.stats.frames++,f&&this.wide.B&&this.stats.stillFrames++),this.trim();return}const l=performance.now(),m=this.debugN===null&&this.omega.rate>=Xs;m?this.standSince=null:this.standSince??=l;const d=this.debugFine&&(this.debugN!==null||this.standSince!==null&&l-this.standSince>=Fi);if(this.stepFine(d,l,f),this.stats.follow.rate=this.omega.rate,!this.tables||this.ring.length<4||!this.programReady()){this.ring.length>ce&&this.trim();return}const x=!f&&this.wideStep(i,t,m||!this.debugFine);if(m&&this.slice>0&&(this.slice=0,this.stats.follow.fineDropped++),!d){this.trim(),x&&this.stats.frames++;return}if(this.slice===0){const T=this.debugN??Math.max(t.lite?yi:this.opt.N,this.tq?this.autoN.n:this.tq===null?Pi:this.opt.N);this.nCur=T}const p=this.fdt(),E=this.nCur,v=f&&!!this.A&&!!this.B&&this.standingNeedsMap();if(v&&this.slice>0&&this.cur&&Math.abs(this.cur.T-t.tModel)>1e-6&&(this.slice=0),!this.A||!this.B){const T=performance.now();if(this.waitSince??=T,this.ring[this.ring.length-1].t<t.tModel+2*E*p+this.dtCur&&T-this.waitSince<1500)return;this.waitSince=null,this.A=this.fillMap(i,this.newMap(t),t.tModel),this.B=this.fillMap(i,this.newMap(t),t.tModel+E*p),this.Ta=this.A.T,this.Tb=this.B.T,this.slice=0,this.stats.first.maps??=performance.now(),this.rotFrames=0,this.rotN=E}else if(f&&!v){this.stats.stillFrames++;return}if(this.slice===0){if(this.acc=this.recenter(t,this.acc),this.cur=this.job(v?t.tModel:t.tModel+2*E*p,this.acc.cam),this.acc.T=this.cur.T,this.acc.kR=this.cur.X.S[1].msg.kR,this.stats.maps++,this.cur.miss&&this.stats.misses++,v&&this.stats.follow.standingMaps++,this.clearMap(i,this.acc),this.drawRed(i,this.acc,this.cur),this.rotN=E,this.debugN===null&&this.tq){this.autoN=vi(this.autoN,ie(this.autoCost),p);const T=this.stats.auto;T.n=this.autoN.n,T.changes=this.autoN.changes,T.via="timer",T.mapMs=ie(this.autoCost)}else if(this.debugN===null&&this.tq===null){const T=this.stats.auto;T.n=E,T.via="frames"}}const b=this.timeBegin(i);if(this.drawSlice(i,this.acc,this.cur,this.slice,E),b&&this.timeEnd(i,b,E),++this.slice===E){this.noteShown(t.tModel,this.acc.T,this.Tb,this.cur);const T=this.A;this.A=this.B,this.B=this.acc,this.acc=T,this.Ta=this.Tb,this.Tb=this.B.T,this.slice=0,this.rotFrames=v?E:0}else this.rotFrames++;this.trim(),this.stats.frames++}catch(a){this.lost(i)||(this.stats.failed=a instanceof Error?a.message:String(a))}finally{this.fade(),K(i,n);const a=performance.now()-e;this.stats.mainMs.push(a),this.stats.mainMs.length>600&&this.stats.mainMs.shift()}}dispose(){this.worker?.terminate(),this.worker=null,this.tableWorker?.terminate(),this.tableWorker=null,this.progQueue=[];const t=this.res;if(t&&!t.gl.isContextLost()){const e=t.gl;this.flush();for(const a of this.ring)for(const o of U)t.deleteBuffer(a.buf[o]);const i=this.wide,n=new Set([this.A,this.B,this.acc,i.A,i.B,i.acc,this.retiring?.A,this.retiring?.B,this.retiring?.wide?.A,this.retiring?.wide?.B]);for(const a of n)a&&(t.deleteTarget(a.core),t.deleteTarget(a.env));for(const a of this.tables??[])t.deleteTexture(a.tex),t.deleteTexture(a.coef);this.kTex&&t.deleteTexture(this.kTex),this.redTex&&t.deleteTexture(this.redTex);for(const a of this.ptPool)t.deleteTexture(a.tex);this.out&&t.deleteBuffer(this.out.buf),this.quad&&t.deleteBuffer(this.quad);for(const a of[...Array.from(this.expandInputs.values(),o=>o.vao),this.vaoR,this.vaoD])a&&(e.deleteVertexArray(a),t.vaos.delete(a));this.tfo&&e.deleteTransformFeedback(this.tfo),this.pD&&(e.deleteProgram(this.pD.prog),t.programs.delete(this.pD.prog));for(const a of[this.pX,this.pR,this.pRed,this.pC,...this.pM]){if(!a)continue;t.programs.delete(a.prog);const o=()=>{if(!e.isContextLost()){if(!a.done()){setTimeout(o,50);return}try{a.check()}catch{}e.deleteProgram(a.prog),t.deferred.delete(a.prog)}};o()}for(const a of[this.mS,this.mB,this.mF])a&&t.deleteTarget(a);for(const a of this.reads)e.deleteSync(a.sync),this.pbos.push(a.pbo);this.catchUp&&(e.deleteSync(this.catchUp),this.catchUp=null);for(const a of this.pbos)t.deleteBuffer(a);for(const a of this.tq?.pend??[])e.deleteQuery(a.q)}this.tq=void 0,this.pM=[],this.mS=this.mB=this.mF=null,this.pbos=[],this.reads=[],this.linked=!1,this.wide=bt(),this.phi=0,this.phiAt=null,this.standSince=null,this.res=null,this.ring=[],this.pending=[],this.tables=null,this.tablesAsked=!1,this.A=this.B=this.acc=null,this.cur=null,this.trash=[],this.retiring=null,this.retShare=0,this.retOut=null,this.outAt=null,this.w=0,this.lastWall=null,this.pX=this.pR=this.pD=this.pC=this.pRed=null,this.redTex=null,this.vaoR=this.vaoD=null,this.quad=null,this.tfo=null,this.out=null,this.kTex=null,this.ptPool=[],this.expandInputs.clear(),this.cap={core:0,env:0,glow:0},this.inFlight=!1,this.lastT=null,this.key=""}start(t){const e=this.makeWorker();if(e.onmessage=i=>this.onMessage(i.data),e.onerror=i=>{this.stats.failed=`worker: ${i.message}`},this.worker=e,this.inFlight=!1,this.nextT=t.tModel-this.dtCur,this.post({cmd:"init",scene:this.scene,obs:[0,0],red:this.debugRedSource??"dynamic",light:!this.debugEmitStd,atlas:this.opt.fixedAtlas}),!this.tablesAsked){this.tablesAsked=!0;const i=this.opt.envBands===16?[16]:[16,this.opt.envBands],n=i.join(",");if(Tt?.bands===n)this.pendingTables=Tt.tables,this.stats.tablesMs=0,this.stats.first.tablesCached=!0;else{const a=this.tableWorker=this.makeWorker();a.onmessage=o=>{const r=o.data;if(r.cmd==="tables"){Tt={bands:n,tables:r.tables},this.pendingTables=r.tables,this.stats.tablesMs=r.ms;for(const c of this.waiters.splice(0))c()}else r.cmd==="error"&&(this.stats.failed=`worker: ${r.message}`);a.terminate(),this.tableWorker===a&&(this.tableWorker=null)},a.onerror=o=>{this.stats.failed=`worker: ${o.message}`},a.postMessage({cmd:"tables",bands:i})}}}post(t){this.worker.postMessage(t)}restart(t=!1){this.worker?.terminate(),this.worker=null,this.stats.restarts++,t&&(this.lastReading=null,this.wx=null);const e=this.res,i=this.ring;e&&this.defer(()=>{for(const c of i)for(const h of U)e.deleteBuffer(c.buf[h])}),this.ring=[],this.pending=[],this.cur=null,this.slice=0,this.cap={core:0,env:0,glow:0},this.waitSince=null;const n=this.maps(),a=this.wide,o=n?this.w:0,r=this.retiringShare(this.w);if(n&&o>0&&o>=r){const c=this.retiring;c&&this.defer(()=>this.delPair(c)),this.retiring={...n,wide:n.wide?{...n.wide}:null},this.retShare=o}else{for(const c of new Set([this.A,this.B,a.A,a.B]))c&&this.defer(()=>this.delMap(c));this.retiring&&(this.retShare=r)}if(a.acc){const c=a.acc;this.defer(()=>this.delMap(c))}this.wide=bt(),this.phi=0,this.phiAt=null,this.retOut=this.retiring&&(t||this.retOut!==null)?1:null,this.outAt=null,this.A=this.B=null,this.w=0,!this.tables&&!this.pendingTables&&!this.tableWorker&&(this.tablesAsked=!1)}debugWorkerSlow=1;debugEmitStd=!1;dtCur=vt.dt;dtAt=-1/0;get dtNow(){return this.dtCur}batchP90(){const t=this.stats.workerMs.slice(-he);if(t.length<4)return 0;const e=[...t].sort((i,n)=>i-n);return e[Math.floor(.9*(e.length-1))]/1e3}adaptDt(){if(this.debugEmitStd||this.opt.dt!==q[0]||this.stats.workerMs.length<he)return;const t=performance.now();if(t-this.dtAt<Oi)return;const e=this.batchP90(),i=q.indexOf(this.dtCur);i<0||(e>Bi*this.dtCur&&i<q.length-1?(this.dtCur=q[i+1],this.dtAt=t):i>0&&e<Di*q[i-1]&&(this.dtCur=q[i-1],this.dtAt=t))}slowed=new WeakSet;onMessage(t){if(t.cmd==="state"&&this.debugWorkerSlow>1&&!this.slowed.has(t)){const e=this.debugWorkerSlow,i=this.worker,n={...t,ms:{...t.ms,total:t.ms.total*e}};this.slowed.add(n),setTimeout(()=>{this.worker===i&&this.onMessage(n)},(e-1)*t.ms.total);return}if(t.cmd==="error"){this.stats.failed=`worker: ${t.message}`;return}if(t.cmd==="tables"){this.pendingTables=t.tables,this.stats.tablesMs=t.ms;return}if(t.cmd==="state"){this.inFlight=!1,this.pending.push(t),this.stats.workerMs.push(t.ms.total),this.stats.workerMs.length>120&&this.stats.workerMs.shift(),this.stats.workerMsParts.push(t.ms),this.stats.workerMsParts.length>120&&this.stats.workerMsParts.shift(),this.adaptDt(),this.lastT!==null&&this.want(this.lastT);for(const e of this.waiters.splice(0))e()}}pendingTables=null;waiters=[];want(t){if(this.inFlight||!this.worker)return;const e=this.opt.fixedAtlas?tt:Et,n=2*Math.max(this.nCur,this.debugWide?5*e:0)*this.fdt()+2*this.dtCur+.3+(this.debugEmitStd?0:this.batchP90());this.nextT<=t+n&&(this.inFlight=!0,this.post({cmd:"state",id:++this.reqId,t:this.nextT,cull:null}),this.nextT+=this.dtCur)}take(t){for(this.pendingTables&&(this.uploadTables(t,this.pendingTables),this.pendingTables=null);this.pending.length;){const e=this.pending.shift(),i=this.res,n={},a={};for(const o of U)this.grow(t,o,e.sets[o].n),a[o]=e.sets[o].n;for(const o of U){const r=t.createBuffer();i.buffers.add(r),t.bindBuffer(t.ARRAY_BUFFER,r),t.bufferData(t.ARRAY_BUFFER,Math.max(1,this.cap[o])*k*4,t.DYNAMIC_DRAW),i.recordBuffer(r,Math.max(1,this.cap[o])*k*4),a[o]&&t.bufferSubData(t.ARRAY_BUFFER,0,e.sets[o].data,0,a[o]*k),this.stats.uploadBytes+=a[o]*k*4,n[o]=r}t.bindBuffer(t.ARRAY_BUFFER,null),this.ring.push({t:e.t,k:e.k,n:a,buf:n,msg:e}),this.stats.states++,this.stats.first.state??=performance.now(),e.wx&&(this.wx=e.wx);for(const o of U)this.stats.slots[o]=Math.max(this.stats.slots[o],a[o])}}grow(t,e,i){if(i<=this.cap[e])return;const n=Math.max(4096,Math.ceil(i*1.5/1024)*1024),a=this.res,o=[];for(const r of this.ring){const c=t.createBuffer();a.buffers.add(c),t.bindBuffer(t.COPY_WRITE_BUFFER,c),t.bufferData(t.COPY_WRITE_BUFFER,n*k*4,t.DYNAMIC_DRAW),a.recordBuffer(c,n*k*4),r.n[e]&&(t.bindBuffer(t.COPY_READ_BUFFER,r.buf[e]),t.copyBufferSubData(t.COPY_READ_BUFFER,t.COPY_WRITE_BUFFER,0,0,r.n[e]*k*4)),o.push(r.buf[e]),r.buf[e]=c}o.length&&this.defer(()=>{for(const r of o)a.deleteBuffer(r)}),t.bindBuffer(t.COPY_READ_BUFFER,null),t.bindBuffer(t.COPY_WRITE_BUFFER,null),this.cap[e]=n}trim(){const t=this.res,e=i=>!!(this.cur?.X.S.includes(i)||this.wide.job?.X.S.includes(i));for(;this.ring.length>ce&&!e(this.ring[0]);){const i=this.ring.shift();this.defer(()=>{for(const n of U)t.deleteBuffer(i.buf[n])})}}stepFine(t,e,i){const n=this.phiAt===null?0:Math.min(.25,Math.max(0,(e-this.phiAt)/1e3));this.phiAt=e,!(i&&this.A&&this.B)&&(this.wide.A&&this.wide.B?t&&this.A&&this.B&&!this.standingNeedsMap()?this.phi=Math.min(1,this.phi+n/Mi):this.phi=Math.max(0,this.phi-n/Ci):this.phi=this.A&&this.B?1:0,this.stats.follow.fine=this.phi)}delPair(t){for(const e of new Set([t.A,t.B,t.wide?.A,t.wide?.B]))e&&this.delMap(e)}fade(){const t=performance.now(),e=this.lastWall===null?0:ri((t-this.lastWall)/1e3);if(this.lastWall=t,this.debugFadeHold)return;const i=this.maps(),n=!!i&&!!i.A.reading&&!!i.B.reading;this.unmetered=i&&!n?this.unmetered+1:0,n&&(this.stats.first.metered??=t),this.w>=1&&(this.stats.first.faded??=t);const a=i!==null&&this.programReady()&&(n||this.w>0||this.unmetered>zi);this.retiring&&this.retOut!==null&&a&&(this.retOut=Math.max(0,this.retOut-e)),this.retOut===0&&this.outAt===null&&(this.outAt=t);const o=!!this.retiring&&this.retOut!==null&&(this.retOut>0||t-(this.outAt??t)<1e3*this.holdS),r=a&&(!o||this.w>0);if(this.w=r?Math.min(1,this.w+e):0,this.retiring&&this.w>=1){const c=this.retiring;this.retiring=null,this.retShare=0,this.retOut=null,this.outAt=null,this.defer(()=>this.delPair(c))}this.stats.w=this.w}programReady(){if(this.linked)return!0;if(this.progQueue.length||!this.pX||!this.pR||!this.pRed||!this.pC||this.pM.length<3)return!1;const t=[this.pX,this.pR,this.pRed,this.pC,...this.pM];if(!t.every(e=>e.done()))return!1;try{for(const e of t)e.check();return this.linked=!0,this.stats.first.linked??=performance.now(),!0}catch(e){return this.stats.failed=`zoneCurtainCompose: ${e instanceof Error?e.message:String(e)}`,!1}}askPrograms(t){for(let e=0;e<t&&this.progQueue.length;e++)this.progQueue.shift()()}linked=!1;defer(t){this.trash.push(t)}flush(){if(this.trash.length)for(const t of this.trash.splice(0))t()}fdt(){if(!this.fdts.length)return 1/60;const t=[...this.fdts].sort((e,i)=>e-i);return Math.min(.1,Math.max(1/240,t[t.length>>1]))}programs(t,e){const i=e.res;if(!t.getExtension("EXT_color_buffer_float"))throw new Error("EXT_color_buffer_float missing");this.accFmt=Ft(e.floatBlend||!!t.getExtension("EXT_float_blend"))==="rgba32f"?t.RGBA32F:t.RGBA16F,this.stats.target=this.accFmt===t.RGBA32F?"rgba32f":"rgba16f",this.stats.first.programs??=performance.now(),this.progQueue=[()=>{this.pX=ki(t,i)},()=>{this.pR=i.programDeferred("zoneCurtainRaster",$s,Ks)},()=>{this.pRed=i.programDeferred("zoneCurtainRed",g,Js)},()=>{this.pC=i.programDeferred("zoneCurtainCompose",g,js)},()=>{this.pM.push(i.programDeferred("zoneCurtainMeter",g,ei))},()=>{this.pM.push(i.programDeferred("zoneCurtainMeterBlock",g,si))},()=>{this.pM.push(i.programDeferred("zoneCurtainMeterFinal",g,ii))}],t.getExtension("KHR_parallel_shader_compile")?this.askPrograms(1/0):this.askPrograms(1),t.activeTexture(t.TEXTURE15),this.redTex=i.texture(et,1,t.RG32F,t.RG,t.FLOAT,new Float32Array(2*et)),t.activeTexture(t.TEXTURE0),this.vaoR=t.createVertexArray(),this.vaoD=t.createVertexArray();for(const a of[this.vaoR,this.vaoD])i.vaos.add(a);this.quad=t.createBuffer(),i.buffers.add(this.quad),i.recordBuffer(this.quad,le.byteLength),t.bindVertexArray(this.vaoR),t.bindBuffer(t.ARRAY_BUFFER,this.quad),t.bufferData(t.ARRAY_BUFFER,le,t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0);for(let a=1;a<=14;a++)t.enableVertexAttribArray(a),t.vertexAttribDivisor(a,1);for(const a of U){const o=t.createVertexArray();i.vaos.add(o),t.bindVertexArray(o);for(let r=0;r<12;r++)t.enableVertexAttribArray(r);this.expandInputs.set(a,{vao:o,buffers:[]})}t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,null),this.tfo=t.createTransformFeedback();const n=t.createBuffer();i.buffers.add(n),this.out={buf:n,cap:0},t.activeTexture(t.TEXTURE15),this.kTex=i.texture(9,B,t.RG32F,t.RG,t.FLOAT,os(9)),t.activeTexture(t.TEXTURE0)}uploadTables(t,e){const i=this.res;t.activeTexture(t.TEXTURE15),this.tables=e.map(n=>{const a=i.texture(n.meta.tiledW,n.meta.tiledH,t.RGBA16F,t.RGBA,t.HALF_FLOAT,n.half);t.bindTexture(t.TEXTURE_2D,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR);const o=i.texture(n.coefW,n.coefH,t.RGBA32F,t.RGBA,t.FLOAT,n.coef);return{meta:n.meta,tex:a,coef:o}}),t.activeTexture(t.TEXTURE0),this.stats.tableLayers=e.map(n=>n.meta.layers),this.stats.first.tables??=performance.now()}ptOf(t,e,i,n){if(!t.length)return null;const a=this.scene.level;let o=this.refCpu.get(a);return o||(o=Ms(rt[a]),this.refCpu.set(a,o)),Ps(t,e,o,i,n)}wavesOf(t,e,i,n){const a=rt[this.scene.level],[o,r]=n?[-760,760]:this.footRange(i);return{x0:o,x1:r,ev:t.msg.wx?Li(t.msg.wx.pulses,e,o,r,ue):Bs(a,this.scene,e,o,r,ue)}}ptTexOf(t,e){let i=this.ptPool.find(o=>o.job===e);if(i)return i.tex;const n=this.res;t.activeTexture(t.TEXTURE15),this.ptPool.length<3?(i={tex:n.texture(ye,3,t.RGBA32F,t.RGBA,t.FLOAT,null),job:null},this.ptPool.push(i)):(i=this.ptPool.shift(),this.ptPool.push(i));const a=e.pt;return t.bindTexture(t.TEXTURE_2D,i.tex),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.texSubImage2D(t.TEXTURE_2D,0,0,0,a.n,3,t.RGBA,t.FLOAT,a.data),t.activeTexture(t.TEXTURE0),i.job=e,i.tex}mapCameraOf(t,e=this.opt.margin,i=1){const[n,a,o]=t.dir,r=Math.atan2(n,a)*180/Math.PI,c=Math.asin(Math.max(-1,Math.min(1,o)))*180/Math.PI,h=Math.min(150,Math.max(.5,t.fovDeg)),u=Math.min(t.pitchDeg??this.opt.pitchDegMax,h/128)*i;let f=jt(r,c,h,Math.round(h/u),e);return f.size>this.opt.maxMapSize&&(f=jt(r,c,h,Math.round(h/u*this.opt.maxMapSize/f.size),e)),f}track(t){const e=performance.now(),i=[t.dir[0],t.dir[1],t.dir[2]],n=this.hist;for(this.view={dir:i,fovDeg:t.fovDeg},n.push({t:e,d:i});n.length>2&&e-n[0].t>150;)n.shift();this.omega=n.length>=2&&e-n[0].t<=400?Ws(n):{axis:[0,0,1],rate:0}}standingNeedsMap(){const t=this.view;if(!t||!this.A||!this.B)return!1;const e=Vt(t.dir,t.fovDeg*Math.PI/360,this.A.cam,this.B.cam,null,this.alphaNow(),this.nCur,9);return e.sA+e.sB<e.n-.001}wideStep(t,e,i){const n=this.wide;if(!this.debugWide||this.debugMaps)return!1;const a=this.opt.fixedAtlas,o=a?tt:Et,r=o*5,c=this.debugWideMoving??(a?1:i?Si:1);for(let h=0;h<c;h++){n.job||(n.acc??=a?this.newAtlas():this.newWideMap(Fe(re)),n.job=this.job(e.tModel+2*(r/c)*this.fdt(),n.acc.cam,!0),a&&this.cullAtlas(n.acc,n.job),n.acc.T=n.job.T,n.acc.kR=n.job.X.S[1].msg.kR,n.slice=0,n.startedAt=performance.now(),n.job.miss&&this.stats.follow.wideMisses++,this.clearMap(t,n.acc),this.drawRed(t,n.acc,n.job));const u=this.faceOf(n.acc,n.slice%5),f=this.expandSlice(t,n.job.X,Math.floor(n.slice/5),o,u,n.job);if(this.rasterSlice(t,u,f,n.job),++n.slice===r){a&&(this.noteShown(e.tModel,n.acc.T,n.B?.T??-1/0,n.job),this.stats.first.maps??=performance.now());const l=n.A;n.A=n.B,n.B=n.acc,n.acc=l,n.job=null,n.rot=0;const m=this.stats.follow;m.wideMaps++,m.wideFrames=r/c,m.wideMs=performance.now()-n.startedAt,m.wideSize=n.B.n}else n.rot++}return!0}cullAtlas(t,e){const i=e.X.S;if(!this.debugAtlasCull||i.some(o=>!o.msg.bounds))return;const n={},a=this.atlasSlots;a.faces.fill(0),a.all=0;for(const o of U){const r=i.map(u=>u.msg.sets[o]),c=Math.max(...r.map(u=>u.n)),h=fi(r,i.map(u=>u.msg.bounds[o]),e.X.w,t.cube,this.opt.cut,2/(o==="core"?t.n/2:t.env.h));for(let u=0;u<h.length;u++)for(const[,f]of h[u])a.faces[u]=a.faces[u]+f;a.all+=c*h.length,n[o]=h}a.kept=a.faces.reduce((o,r)=>o+r,0),e.spans=n}newWideMap(t,e=!1){const i=this.res,n=i.gl,a=t[0].size;n.activeTexture(n.TEXTURE15);const o=a/(e?oe:2),r=i.target(5*a,a+(e?o:0),e?n.RGBA16F:this.accFmt,n.RGBA),c=e?{...r,w:7*o,h:o,y0:a}:i.target(5*o,o,this.accFmt,n.RGBA),h={cam:t[0],n:a,core:r,env:c,T:0,kR:0,reading:null,readKey:"",gen:0,red:null,cube:t,filtered:e};return e&&(n.bindTexture(n.TEXTURE_2D,r.tex),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR)),n.activeTexture(n.TEXTURE0),h}faceOf(t,e){const i=t.n,n=t.env.h,a={...t.core,...t.filtered?gs(e,i):{w:i,h:i,x0:e*i}},o={...t.env,...t.filtered?Is(e,i,n):{w:n,h:n,x0:e*n}};return{...t,faceIndex:e,cam:t.cube[e],core:a,env:o}}newMap(t,e=this.mapCameraOf(t)){const i=this.res,n=i.gl;n.activeTexture(n.TEXTURE15);const a={cam:e,n:e.size,core:i.target(e.size,e.size,this.accFmt,n.RGBA),env:i.target(e.size/2,e.size/2,this.accFmt,n.RGBA),T:0,kR:0,reading:null,readKey:"",gen:0,red:null};return n.activeTexture(n.TEXTURE0),a}delMap(t){const e=this.res;e&&(e.deleteTarget(t.core),t.env.fbo!==t.core.fbo&&e.deleteTarget(t.env))}recenter(t,e){const i=this.mapCameraOf(t);if(e&&e.n===i.size)return e.cam=i,e;if(e){const n=e;this.defer(()=>this.delMap(n))}return this.newMap(t,i)}clearMap(t,e){e.reading=null,e.readKey="",e.gen++,t.disable(t.SCISSOR_TEST);for(const i of e.filtered?[e.core]:[e.core,e.env])t.bindFramebuffer(t.FRAMEBUFFER,i.fbo),t.viewport(0,0,i.w,i.h),t.clearBufferfv(t.COLOR,0,[0,0,0,0])}job(t,e,i=!1){const n=this.ring;let a=-1;for(let p=0;p<n.length-1;p++)n[p].t<=t+1e-9&&(a=p);let o=!1;a<0&&(a=0),t>n[n.length-1].t+1e-9&&(o=!0,t=n[n.length-1].t,a=n.length-2);const r=!n[a+2],c=n[Math.max(0,a-1)],h=n[a],u=n[a+1],f=n[a+2]??(this.stats.miss3++,u),l=Math.min(1,Math.max(0,(t-h.t)/(u.t-h.t))),{x0:m,x1:d,ev:x}=this.wavesOf(h,t,e,i);return this.stats.eventsDropped+=x.dropped,{T:t,X:{S:[c,h,u,f],...Qt(this.opt.mode,l)},events:x.events,dropped:x.dropped,miss:o,red:ae(h,u,l),miss3:r,pt:this.ptOf(x.events,t,m,d)}}footRange(t){let e=1/0,i=-1/0;for(const n of[-1,0,1])for(const a of[-1,0,1]){const o=[0,1,2].map(h=>t.f[h]+n*t.tanH*t.r[h]+a*t.tanH*t.up[h]),r=Math.hypot(o[0],o[1],o[2]),c=o[2]/r;if(!(c>.02)){e=Math.min(e,-700),i=Math.max(i,700);continue}for(const h of[84,300]){const u=rs(h,c)*o[0]/r;e=Math.min(e,u),i=Math.max(i,u)}}return[Math.max(-760,e-60),Math.min(760,i+60)]}fillMap(t,e,i){const n=this.job(i,e.cam,!!e.cube),a=e.filtered?tt:this.nCur;e.filtered&&this.cullAtlas(e,n),e.T=n.T,e.kR=n.X.S[1].msg.kR,e.pt=n.pt,this.clearMap(t,e),this.drawRed(t,e,n);for(let o=0;o<a;o++)this.drawSlice(t,e,n,o,a);return e}drawRed(t,e,i){e.red=i.red;const n=this.pRed;if(!n||!this.redTex||!i.red||this.debugRedOff)return;const a=et,o=new Float32Array(2*a);for(let c=0;c<a;c++)o[2*c]=i.red.A[c],o[2*c+1]=i.red.Y[c];t.activeTexture(t.TEXTURE15),t.bindTexture(t.TEXTURE_2D,this.redTex),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.texSubImage2D(t.TEXTURE_2D,0,0,0,a,1,t.RG,t.FLOAT,o),t.useProgram(n.prog),t.bindVertexArray(this.vaoD),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD),t.colorMask(!1,!1,!0,!1);const r=c=>n.loc.get(c);t.uniform2f(r("uObs"),0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.redTex),t.uniform1i(r("uLine"),0),t.bindFramebuffer(t.FRAMEBUFFER,e.env.fbo);for(const c of e.cube?e.cube.map((h,u)=>this.faceOf(e,u)):[e]){const h=c.cam,u=c.env,f=u.x0??0,l=u.y0??0;t.viewport(f,l,u.w,u.h),t.uniform3fv(r("uF"),h.f),t.uniform3fv(r("uR"),h.r),t.uniform3fv(r("uU"),h.up),t.uniform1f(r("uTanH"),h.tanH),t.uniform2f(r("uRasterSize"),u.w,u.h),t.uniform1f(r("uSwapXY"),u.w>u.h?1:0),t.uniform1f(r("uOff"),f),t.uniform1f(r("uYOff"),l),t.drawArrays(t.TRIANGLES,0,3)}t.colorMask(!0,!0,!0,!0),t.disable(t.BLEND),t.bindVertexArray(null),this.stats.redPasses++}drawSlice(t,e,i,n,a){let o=[];for(const r of e.cube?e.cube.map((c,h)=>this.faceOf(e,h)):[e])o=this.expandSlice(t,i.X,n,a,r,i),this.rasterSlice(t,r,o,i);return o}groups(){return gi(this.tables.length>1?1:0)}sliceSegs(t,e){let i=0;for(const n of this.groups()){const a=this.tables[n.tab].meta,o=Math.ceil(a.B/e);i+=o*Math.max(...t.S.map(r=>r.n[n.set]))}return i}expandSlice(t,e,i,n,a,o=null){const r=this.pX,c=this.out,h=this.groups(),u=a.cam,f=h.map(v=>a.faceIndex!==void 0&&o?.spans?o.spans[v.set][a.faceIndex]:[[0,Math.max(...e.S.map(b=>b.n[v.set]))]]),l=f.map(v=>v.reduce((b,[,T])=>b+T,0)),m=h.reduce((v,b,T)=>v+Math.ceil(this.tables[b.tab].meta.B/n)*l[T],0);if(!m)return this.stats.segsLastSlice=0,[];m*z*4>c.cap&&(c.cap=Math.ceil(m*z*4*1.25),t.bindBuffer(t.ARRAY_BUFFER,c.buf),t.bufferData(t.ARRAY_BUFFER,c.cap,t.DYNAMIC_COPY),this.res.recordBuffer(c.buf,c.cap),t.bindBuffer(t.ARRAY_BUFFER,null)),t.useProgram(r.prog),t.enable(t.RASTERIZER_DISCARD);const d=v=>r.loc.get(v);t.uniform3fv(d("uF"),u.f),t.uniform3fv(d("uR"),u.r),t.uniform3fv(d("uU"),u.up),t.uniform1f(d("uTanH"),u.tanH),t.uniform4fv(d("uCW"),Float32Array.from(e.w)),t.uniform1f(d("uU2"),e.u2),t.uniform1f(d("uWC"),e.wc),t.uniform1f(d("uSlice"),i),t.uniform1f(d("uNS"),n),t.uniform1f(d("uCutB"),this.opt.cut),t.uniform1f(d("uObsX"),0),t.uniform1f(d("uTightBounds"),a.filtered?1:0);const x=o?.pt??null;if(x){const v=this.ptTexOf(t,o);t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,v)}t.uniform1i(d("uPT"),3),t.uniform4f(d("uPTD"),x?.x0??0,x?.dx??1,x?.n??1,x?1:0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,this.kTex),t.uniform1i(d("uK"),1),t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,this.tfo),m&&(t.bindBufferRange(t.TRANSFORM_FEEDBACK_BUFFER,0,c.buf,0,m*z*4),t.beginTransformFeedback(t.POINTS));const p=[];let E=0;for(const[v,b]of h.entries()){const T=this.tables[b.tab],w=T.meta,_=Math.ceil(w.B/n),y=l[v];if(!y){p.push({tgt:b.tgt,tab:b.tab,pulse:b.pulse,first:E,count:0});continue}t.uniform1f(d("uPx"),2/Math.min(a[b.tgt].w,a[b.tgt].h)),t.uniform1f(d("uB"),w.B),t.uniform1f(d("uBW"),w.bandW),t.uniform1f(d("uNG"),w.ngroup),t.uniform1f(d("uGR"),w.groupRows),t.uniform1f(d("uNL"),w.nl),t.uniform1f(d("uPulse"),b.pulse),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,T.coef),t.uniform1i(d("uCoef"),2);const A=this.expandInputs.get(b.set);t.bindVertexArray(A.vao),e.S.forEach((M,C)=>{const R=M.buf[b.set];if(A.buffers[C]!==R){t.bindBuffer(t.ARRAY_BUFFER,R);for(let P=0;P<3;P++)t.vertexAttribPointer(3*C+P,4,t.FLOAT,!1,k*4,16*P);A.buffers[C]=R}}),t.bindBuffer(t.ARRAY_BUFFER,null);for(let M=0;M<_;M++){t.vertexAttrib1f(12,M);for(const[C,R]of f[v])t.drawArrays(t.POINTS,C,R)}p.push({tgt:b.tgt,tab:b.tab,pulse:b.pulse,first:E,count:_*y}),E+=_*y}return m&&t.endTransformFeedback(),t.bindBufferBase(t.TRANSFORM_FEEDBACK_BUFFER,0,null),t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,null),t.disable(t.RASTERIZER_DISCARD),t.bindVertexArray(null),t.activeTexture(t.TEXTURE0),this.stats.segsLastSlice=E,p}rasterSlice(t,e,i,n){if(!i.length)return;const a=this.pR,o=e.cam,r=u=>a.loc.get(u);t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.useProgram(a.prog),t.bindVertexArray(this.vaoR),t.uniform3fv(r("uF"),o.f),t.uniform3fv(r("uR"),o.r),t.uniform3fv(r("uU"),o.up),t.uniform1f(r("uTanH"),o.tanH),t.uniform1f(r("uCut2"),this.opt.cut**2),t.uniform1f(r("uPInv"),1/(rt[this.scene.level].pulse5?.sig??14)),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD);let c=null,h=-1;t.bindBuffer(t.ARRAY_BUFFER,this.out.buf);for(const u of i){if(!u.count)continue;const f=u.tgt==="env"?e.env:e.core;if(f!==c){f.fbo!==c?.fbo&&t.bindFramebuffer(t.FRAMEBUFFER,f.fbo),c=f;const l=f,m=l.x0??0,d=l.y0??0;t.viewport(m,d,f.w,f.h),t.uniform2f(r("uRasterSize"),f.w,f.h),t.uniform1f(r("uOff"),m),t.uniform1f(r("uYOff"),d),t.uniform1f(r("uSwapXY"),u.tgt==="env"&&f.w>f.h?1:0)}if(u.tab!==h){h=u.tab;const l=this.tables[u.tab],m=l.meta;t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,l.tex),t.uniform1i(r("uTab"),0),t.uniform1f(r("uBW"),m.bandW),t.uniform1f(r("uN"),m.n),t.uniform4f(r("uTabD"),m.width,m.height,m.tilesX,m.tiledW),t.uniform1f(r("uTexH"),m.tiledH)}for(let l=0;l<14;l++)t.vertexAttribPointer(1+l,4,t.FLOAT,!1,z*4,(u.first*z+4*l)*4);t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,u.count)}t.bindBuffer(t.ARRAY_BUFFER,null),t.disable(t.BLEND),t.bindVertexArray(null),t.activeTexture(t.TEXTURE0)}bindMaps(t,e,i,n){const a=i.wide??null,o=i.fine??1;if(a?.A.filtered&&a.B.filtered&&o===0){const r=a.alpha===1?a.B:a.A,c=r===a.B?0:a.alpha;t.activeTexture(t.TEXTURE0+n),t.bindTexture(t.TEXTURE_2D,r.core.tex),t.activeTexture(t.TEXTURE1+n),t.bindTexture(t.TEXTURE_2D,a.B.core.tex);for(const h of["aC","aE","bC","bE","cC","cE"])t.uniform1i(e.loc.get(h),n);t.uniform1i(e.loc.get("dC"),n+1),t.uniform1i(e.loc.get("dE"),n+1),t.uniform2f(e.loc.get("cT"),a.A.cam.tanH,a.A.n),t.uniform1f(e.loc.get("uFine"),0),t.uniform1f(e.loc.get("uHasW"),1),t.uniform1f(e.loc.get("uAlphaW"),c),t.uniform1f(e.loc.get("uKC"),i.A.kR>0?a.A.kR/i.A.kR:1),t.uniform1f(e.loc.get("uCubic"),this.debugCubic?1:0),t.uniform1f(e.loc.get("uAtlasFilter"),1);return}[["a",i.A,n],["b",i.B,n+2],["c",a?.A??i.A,n+4],["d",a?.B??i.B,n+6]].forEach(([r,c,h])=>{(r==="a"||r==="b")&&(t.uniform3fv(e.loc.get(r+"F"),c.cam.f),t.uniform3fv(e.loc.get(r+"R"),c.cam.r),t.uniform3fv(e.loc.get(r+"U"),c.cam.up),t.uniform2f(e.loc.get(r+"T"),c.cam.tanH,c.n)),t.activeTexture(t.TEXTURE0+h),t.bindTexture(t.TEXTURE_2D,c.core.tex),t.uniform1i(e.loc.get(r+"C"),h),t.activeTexture(t.TEXTURE1+h),t.bindTexture(t.TEXTURE_2D,c.env.tex),t.uniform1i(e.loc.get(r+"E"),h+1)}),t.uniform2f(e.loc.get("cT"),a?a.A.cam.tanH:1,a?a.A.n:2),t.uniform1f(e.loc.get("uAlpha"),i.alpha),t.uniform1f(e.loc.get("uReveal"),Ne(i.alpha,this.nCur)),t.uniform1f(e.loc.get("uFine"),a?o:1),t.uniform1f(e.loc.get("uHasW"),a?1:0),t.uniform1f(e.loc.get("uAlphaW"),a?.alpha??0),t.uniform1f(e.loc.get("uKC"),a&&i.A.kR>0?a.A.kR/i.A.kR:1),t.uniform1f(e.loc.get("uCubic"),this.debugCubic?1:0),t.uniform1f(e.loc.get("uAtlasFilter"),a?.A.filtered?1:0)}debugCubic=!0;display(t,e,i,n,a,o,r=null,c=1){const h=this.res;this.pD??=h.program("zoneCurtainDisplay",g,Qs);const u=this.pD;t.useProgram(u.prog),t.bindVertexArray(this.vaoD),t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo),t.viewport(0,0,e.w,e.h),t.uniform3fv(u.loc.get("uF"),i.f),t.uniform3fv(u.loc.get("uR"),i.r),t.uniform3fv(u.loc.get("uU"),i.up),t.uniform1f(u.loc.get("uTanH"),i.tanH),t.uniform1f(u.loc.get("uSize"),e.w);const f=r&&"A"in r&&"alpha"in r?r:null;this.bindMaps(t,u,{A:n,B:a,alpha:o,wide:f,fine:c},0),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null),t.activeTexture(t.TEXTURE0)}debugShown(t,e,i){const n=this.maps();n&&((n.fine??1)===0&&n.wide?this.display(t,e,i,n.wide.A,n.wide.B,n.wide.alpha,n.wide,0):this.display(t,e,i,n.A,n.B,n.alpha,n.wide??null,n.fine??1))}debugShownOf(t,e,i,n){n.cube?this.display(t,e,i,n,n,0,{A:n,B:n,alpha:0},0):this.display(t,e,i,n,n,0,null,1)}debugReferenceKinds=["fine","wide"];debugReference(t,e,i){if(this.lastT===null||this.ring.length<4)return null;const n=$(t),a={dir:[i.dir[0],i.dir[1],i.dir[2]],fovDeg:i.fovDeg};try{const o=Math.min(this.opt.pitchDegMax,Math.min(150,Math.max(.5,i.fovDeg))/128),r=this.newMap(a,e==="wide"?this.mapCameraOf(a,this.opt.margin,re/o):this.mapCameraOf(a));return this.fillMap(t,r,this.lastT)}finally{K(t,n)}}debugReferenceDone(t){this.delMap(t)}debugState(){return{ring:this.ring.map(t=>({t:t.t,k:t.k,sets:t.msg.sets})),tables:this.tables?.map(t=>t.meta)??null,scene:this.scene,A:this.A,B:this.B,Ta:this.Ta,Tb:this.Tb,trash:this.trash.length,w:this.w,retiring:this.retiring!==null,retShare:this.retShare}}debugJob(t,e,i,n){const a=t.map(h=>this.ring[h]),{x0:o,x1:r,ev:c}=this.wavesOf(a[1],i,n,!1);return{T:i,X:{S:a,...Qt(this.opt.mode,e)},events:c.events,dropped:c.dropped,miss:!1,red:ae(a[1],a[2],e),pt:this.ptOf(c.events,i,o,r)}}async debugRun(t,e,i,n,a){this.res=e,this.worker&&this.restart(),this.flush(),this.scene=i,this.key=JSON.stringify(i),this.lastT=null,this.start({tModel:n[0]+this.opt.dt}),this.pX||this.programs(t,{res:e,floatBlend:a}),this.askPrograms(1/0),this.inFlight=!0;for(const c of n)this.post({cmd:"state",id:++this.reqId,t:c,cull:null});const o=performance.now();for(;this.pending.length<n.length||!(this.tables||this.pendingTables)||!this.programReady();){if(this.stats.failed)throw new Error(this.stats.failed);if(performance.now()-o>12e4)throw new Error("zoneCurtain debugRun: no states after 120 s");await new Promise(c=>{this.waiters.push(c),setTimeout(c,100)})}const r=$(t);try{this.take(t)}finally{K(t,r)}}readOut(t,e,i){const n=new Float32Array(i*z);return t.bindBuffer(t.ARRAY_BUFFER,this.out.buf),t.getBufferSubData(t.ARRAY_BUFFER,e*z*4,n),t.bindBuffer(t.ARRAY_BUFFER,null),n}readTarget(t,e){const i=new Float32Array(e.w*e.h*4);return t.bindFramebuffer(t.FRAMEBUFFER,e.fbo),t.readPixels(e.x0??0,e.y0??0,e.w,e.h,t.RGBA,t.FLOAT,i),i}}function Ue(s,t=s.view.centerMm){const e=s.horizonFrame,i=s.view.point,n=s.view.skyFrame,a=s.geometry.focalMm;if(!e||!n)return null;const o=[t[0]/a,t[1]/a,1],r=[0,1,2].map(f=>i[f]*o[0]+i[3+f]*o[1]+i[6+f]*o[2]);if(!(r[2]>1e-6))return null;const c=[0,1,2].map(f=>n.axis[f]+r[0]/r[2]*n.west[f]+r[1]/r[2]*n.north[f]),h=Math.hypot(c[0],c[1],c[2]),u=f=>(c[0]*f[0]+c[1]*f[1]+c[2]*f[2])/h;return[u(e.east),u(e.north),u(e.zenith)]}const ze={on:$e(typeof location<"u"?location.search:null)},St=new WeakMap,Gi=xe.prototype.active;xe.prototype.active=function(s){const t=Gi.call(this,s),e=this;return St.delete(this),t&&e.prog===null&&e.state&&this.setup?.scene==="auroral-zone"&&(this.zoneCurtain?this.zoneCurtain.atlasActive:ze.on)&&(Hi(this,s,e.state),St.set(this,s)),t};function Hi(s,t,e){if(St.get(s)===t)return s.zoneCurtain;const i=Ue(t);if(!i)return s.zoneCurtain;let n=s.zoneCurtain;n||(n=s.zoneCurtain=new Wi({fixedAtlas:ze.on},void 0,Ke({pinned:At.zoneSeed,automated:typeof navigator<"u"&&navigator.webdriver===!0,reducedMotion:He(),random:je}),Qe(typeof location<"u"?location.search:null,typeof navigator<"u"&&navigator.webdriver===!0)),n.caps=Xi(t.gl,t.res,t.floatBlend),n.caps.reason&&(n.stats.failed=`capability: ${n.caps.reason}`),n.caps.reason&&console.warn("[zoneCurtain] this device cannot run the new curtain; the old aurora stays:",n.caps.reason));const a=t.geometry,o=2*Math.atan(a.cathodeRadiusMm/a.focalMm)*180/Math.PI,r=qe(a.pitchMm,a.focalMm)*Math.atan(a.pitchMm/a.focalMm)*180/Math.PI,c=qi(t.gl),h=n.stats.frames,u=Ze.getState().view.integrationMs,f=u>0?u/1e3:Ve;return n.frame({gl:t.gl,res:t.res,tModel:e.timeS-(s.setup?.startS??0),dir:i,fovDeg:o,level:e.level??0,seed:n.seed,floatBlend:t.floatBlend,dtSeconds:t.dtSeconds,lite:e.detail==="lite",pitchDeg:r,holdS:f}),c&&Zi(t.gl,c,n.stats.frames>h),n}const ge={on:!1,sliceMs:[],otherMs:[],disjoint:0,queries:[]};function qi(s){const t=ge;if(!t.on&&!t.queries.length)return null;const e=s.getExtension("EXT_disjoint_timer_query_webgl2");if(!e)return null;for(;t.queries.length;){const{q:n,slice:a}=t.queries[0];if(!s.getQueryParameter(n,s.QUERY_RESULT_AVAILABLE))break;t.queries.shift(),s.getParameter(e.GPU_DISJOINT_EXT)?t.disjoint++:(a?t.sliceMs:t.otherMs).push(Number(s.getQueryParameter(n,s.QUERY_RESULT))/1e6),s.deleteQuery(n)}if(!t.on||t.queries.length>=8)return null;const i=s.createQuery();return i&&s.beginQuery(e.TIME_ELAPSED_EXT,i),i}function Zi(s,t,e){const i=s.getExtension("EXT_disjoint_timer_query_webgl2");s.endQuery(i.TIME_ELAPSED_EXT),ge.queries.push({q:t,slice:e})}function tn(s,t,e,i,n,a){const o=At.zoneCurtainDebug>0?At.zoneCurtainDebug:1;s.compose(t.gl,i.u_auRate,i.u_auClass,e.level??0,o,r=>{t.viewUniforms(r),t.bindHorizon(r,0),t.bindLut(r,1),t.res.bindTex(10,n,r,"u_auExt"),t.res.bindTex(11,a,r,"u_cloud"),pe(t.gl,r,{u_auExtOn:i.u_auExtOn,u_auRatioCap:i.u_auRatioCap,...Ge(e.cloud)})},()=>t.draw())}function en(s,t,e,i){const n=Ue(t,[0,0]);if(!n)return;const a=t.geometry,o=Ye(e);s.meter(t.gl,{axis:n,radiusDeg:Math.atan(a.cathodeRadiusMm/a.focalMm)*180/Math.PI,level:e.level??0,cls:o.u_auClass,rates:e.rates,ext:e.extinction,bind:r=>{t.bindHorizon(r,0),t.bindLut(r,1),t.res.bindTex(4,i,r,"u_auExt"),pe(t.gl,r,{u_auExtOn:o.u_auExtOn})}})}export{Ue as viewAxisEnu,ze as zoneAtlas,tn as zoneCompose,Hi as zoneFrame,ge as zoneGpuTimer,en as zoneMeter};
