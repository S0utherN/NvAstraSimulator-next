import{c$ as G,d0 as ze,d1 as k,d2 as de,d3 as me,d4 as Ie,d5 as ge,d6 as Le,d7 as g,d8 as pe,d9 as Xe,cM as We,da as Ge,b as He,bA as qe,db as Ze,dc as xe}from"./boot-BsU45uZE.js";import{F as _t}from"./app-BiYnEGhl.js";import{z as Ve,a as $e,b as Ye,r as Ke}from"./seed-C66snoD7.js";import{N as B,b as O,h as Ee,u as be,r as M,p as J,s as H,G as Qe,c as L,d as je,H as V,e as ve,f as K,g as Te,l as Ct,C as rt,R as ot,Z as ct}from"./levels-BzEYxaKo.js";import"./vendor-DHsdD_W9.js";import"./hosting-Dqkzsjpg.js";import"./error-log-BaVTIT4h.js";const Je=20,ti=.25,ei=6,ii=61,si=(i,t)=>{const e=O*t,s=i*(2*O+i);return s/(e+Math.sqrt(e*e+s))},ni=i=>new Float32Array(i*B*2).fill(1),W=8,tt=256;function Bt(){return G.map(i=>ze(i))}function Ot(i){const t=[];for(let e=0;e<i.length;e++)(i[e]===0||i[e]===1)&&t.push(e);if(t.length>4)throw new RangeError("zoneMeterChannels: more than four main-curtain components");return t}function kt(i){for(let t=0;t<i.length;t++)if(i[t]===2)return t;return-1}function ai(i,t,e){const s=Math.PI/180,n=Math.tan(Math.min(80,Math.max(.01,i))*s),a=W,o=e??Math.min(tt,Math.max(4*a,Math.ceil(2*n/Math.tan(Math.max(.001,t)*s)/a)*a));if(o%a||o>tt)throw new RangeError(`zoneMeterGrid: side ${o} not a multiple of ${a} up to ${tt}`);let r=0;for(let u=0;u<o;u++)for(let h=0;h<o;h++)ri(h,u,o)&&r++;return{n:o,tanR:n,count:r}}const ri=(i,t,e)=>{const s=2*i+1-e,n=2*t+1-e;return s*s+n*n<=e*e};function oi(i){const t=Math.hypot(i[0],i[1],i[2]),e=[i[0]/t,i[1]/t,i[2]/t];let s=e[1],n=-e[0];const a=Math.hypot(s,n);return a<1e-6?(s=1,n=0):(s/=a,n/=a),{F:e,R:[s,n,0],U:[n*e[2],-s*e[2],s*e[1]-n*e[0]]}}function Dt(i){if(!i.length)return null;const t=G.length,e=new Float64Array(t),s=new Float64Array(t);let n=0;for(const a of i){const o=a.A??a.B,r=a.B??a.A;if(!o||!r){n++;continue}const u=Math.min(1,Math.max(0,a.alpha)),h=Math.max(0,a.share);for(let c=0;c<t;c++){const f=o.count?o.sums[c]/o.count:0,l=r.count?r.sums[c]/r.count:0;e[c]=e[c]+h*((1-u)*f+u*l),s[c]=s[c]+h*((1-u)*o.box[c]+u*r.box[c])}}return{means:e,box:s,pending:n}}const ui=(i,t)=>G.map(e=>t[e]>0?i[e]*t[e]:0);function Ut(i,t,e,s,n){ui(i,t);let a=0,o=0;s&&G.forEach((u,h)=>{(e[h]===0||e[h]===1||e[h]===2)&&(a+=i[u]*s.means[h],o+=i[u]*s.box[h])});const r=ci();return{mean:a+r.mean,peak:o+r.peak}}function ci(i,t,e){return{mean:0,peak:0}}const hi=[{cell:2.4,epoch:5,prob:.6,w:[.18,.45],lnS:.9,life:[5,14],drift:.15,seed:61},{cell:6.8,epoch:8,prob:.55,w:[.35,.9],lnS:.6,life:[8,22],drift:.12,seed:62}];let Ae=1,Re=1;function fi(i,t,e=0,s={f:0,lam:0,fb:0}){let n=0,a=0,o=0;for(const r of hi){const u=Math.ceil(r.life[1]/r.epoch)+1,h=Math.floor(i/r.cell);for(let c=Math.floor(t/r.epoch)-u;c<=Math.floor(t/r.epoch);c++)for(let f=h-2;f<=h+2;f++){const l=Ee(f,c,9e3+r.seed+131*e);if(be(l)>=r.prob)continue;const m=(c+M(l,1))*r.epoch,d=J(r.life,M(l,2)),x=(t-m)/d;if(!(x>0&&x<1))continue;const p=(f+M(l,3))*r.cell+r.drift*(2*M(l,4)-1)*(t-m),b=J(r.w,M(l,5)),E=(i-p)/b;if(E*E>16)continue;const T=Math.sqrt(-2*Math.log(Math.max(1e-9,M(l,6))))*Math.cos(2*Math.PI*M(l,7)),v=Math.exp(r.lnS*T-.5*r.lnS*r.lnS)*H(x/.25)*(1-H((x-.7)/.3)),R=v*Math.exp(-.5*E*E),w=M(l,8);n+=R,a+=R*w*w*w,r.cell>5&&(o+=R)}}return s.f=n*Ae,s.fb=o*Re,s.lam=n>1e-9?a/n:.3,s}{let i=0,t=0,e=0;const s={f:0,lam:0,fb:0};for(let n=0;n<6e3;n++)fi(n*.731+13,50+n*.37,0,s),i+=s.f,t+=s.fb,e++;Ae=e/i,Re=e/t}const zt=[116,109,102,96],It=[30,26,22,18],li=3.5;function di(i){const t=Te(i,0,1)*3,e=Math.min(2,Math.floor(t)),s=t-e;return{peak:Ct(zt[e],zt[e+1],s),up:Ct(It[e],It[e+1],s),lo:li}}const mi=i=>1/(1+Math.exp(-(i-101)/2.5)),pi=i=>1-H((i-(K-30))/30),gt=2.2,Lt=4.5,Xt=1.6,Wt=Math.sqrt(Math.PI/2);function xi(i,t,e){const s=i-t.peak,n=s>=0?Math.exp(-s/t.up):Math.exp(-.5*(s/gt)**2),a=s>=0?Math.exp(-.5*(s/Lt)**2):Math.exp(-.5*(s/Xt)**2);return(1-e)*n+e*(gt*Wt+t.up)/((Xt+Lt)*Wt)*a}const Gt=20,Ei=120,bi=i=>Te(.3+.6*i,.3,.85),vi=.8;function Ti(i,t,e){const s=i-(t.peak+1+12*e*e);return s<=0?0:(1-Math.exp(-s/(6+8*e)))*Math.exp(-s/(Gt+(Ei-Gt)*e))}let ht=null;function Ai(){if(ht)return ht;const i=je,t=[new Float32Array(B*i),new Float32Array(B*i)],e=[new Float32Array(B*L*i),new Float32Array(B*L*i)];for(let s=0;s<B;s++){const n=s/(B-1),a=di(n),o=bi(n);a.up*=vi;for(let r=0;r<i;r++){const u=V+r*ve,h=pi(u),c=mi(u),f=xi(u,a,o)*h;t[0][s*i+r]=f,t[1][s*i+r]=f*c;for(let l=0;l<L;l++){const m=Ti(u,a,l/(L-1))*h,d=(s*L+l)*i+r;e[0][d]=m,e[1][d]=m*c}}}return ht={n:i,low:t,ray:e,nlam:L}}const Ri=1,Ht=.7;function wi(i,t,e,s,n){const a=i.pulse5,o=[];if(a==null)return o;const r=Math.ceil((360/a.vz[0]+3)/a.P)+1;for(let u=Math.floor(t/a.P)-r;u<=Math.floor(t/a.P)+1;u++)for(let h=Math.floor((s-500)/a.cell);h<=Math.floor((n+500)/a.cell);h++){const c=Ee(h,u,7331+101*e);be(c)>=a.prob||o.push({t0:(u+.8*M(c,1))*a.P,vz:J(a.vz,M(c,2)),amp:a.amp*(.6+.4*M(c,3)),xc:(h+M(c,4))*a.cell,w:J(a.w,M(c,5)),lag:(M(c,6)<.5?-1:1)*J(a.lag,M(c,7))/100})}return o}function _i(i,t,e){const s=(t-i.xc)/i.w,n=Math.exp(-.5*s*s);if(n<.02)return null;const a=e-(i.t0+(t-i.xc)*i.lag);if(!(a>0))return null;const o=70+i.vz*a;return o>420?null:[i.amp*n*H(a/.3)*Math.exp(-Math.max(0,o-110)/180)*(Ht+(1-Ht)*H((o-100)/25)),o]}const we=70,_e=.25,ut=1401;function yi(i){const t=Ai(),e=t.n,s=new Float32Array(ut),n=i.pulse5;if(!n)return s;const a=Math.round(i.hard0*(B-1)),o=t.low[0],r=t.ray[0],u=(a*L+3)*e;let h=0;for(let c=0;c<e;c++)h+=o[a*e+c]+.15*r[u+c];for(let c=0;c<ut;c++){const f=we+c*_e;let l=0;for(let m=0;m<e;m++){const d=V+m*ve;l+=(o[a*e+m]+.15*r[u+m])*Qe((d-f)/n.sig)}s[c]=l/h}return s}function Si(i,t){const e=Math.min(ut-1,Math.max(0,(t-we)/_e)),s=Math.min(ut-2,Math.floor(e)),n=e-s;return i[s]*(1-n)+i[s+1]*n}const ft=4,Fi=2,ye=800;function Mi(i,t,e,s,n,a=Ri){const o=Fi,r=Math.max(1,Math.min(ye,Math.ceil((n-s)/o))),u=new Float32Array(r*12),h=new Float64Array(r),c=new Uint8Array(r);for(const f of i){const l=Math.max(0,Math.floor((f.xc-2.8*f.w-s)/o)),m=Math.min(r-1,Math.ceil((f.xc+2.8*f.w-s)/o));for(let d=l;d<=m;d++){const x=_i(f,s+(d+.5)*o,t);if(!x)continue;h[d]=h[d]+x[0]*Si(e,x[1]),c[d]=Math.min(255,c[d]+1);let p=Math.min(ft,c[d])-1;const b=E=>(E>>1)*4*r+4*d+2*(E&1);if(!(p===ft-1&&c[d]>ft&&!(x[0]>u[b(p)+1]))){for(;p>0&&x[0]>u[b(p-1)+1];){const E=b(p),T=b(p-1);u[E]=u[T],u[E+1]=u[T+1],p--}u[b(p)]=x[1],u[b(p)+1]=x[0]}}}for(let f=0;f<r;f++)u[8*r+4*f]=1/(1+a*h[f]),u[8*r+4*f+1]=c[f];return{x0:s,dx:o,n:r,data:u}}function Ni(i,t,e,s,n,a=16){if(!i.pulse5||t.noPulse||t.ticks)return{events:[],dropped:0};const o=wi(i,e,t.seed??0,s,n).filter(r=>{const u=Math.max(s,r.xc-2.8*r.w),h=Math.min(n,r.xc+2.8*r.w);return h>=u?[u,h,Math.min(h,Math.max(u,r.xc))].some(c=>{const f=e-(r.t0+(c-r.xc)*r.lag);return f>0&&70+r.vz*f<=420}):!1});return o.sort((r,u)=>u.amp-r.amp),{events:o.slice(0,a),dropped:Math.max(0,o.length-a)}}const F={DX:8,HALF:720,SIG_N:16,HP:62,H0:150,H1:620,NSEG:24,TAU_RAD:110,Q200:.098,QH:42},nt=Math.round(2*F.HALF/F.DX)+1,Pi=i=>1/(1/F.TAU_RAD+F.Q200*Math.exp(-(i-200)/F.QH)),Ci=i=>i<=F.H0?0:H((i-F.H0)/20)*Math.exp(-(i-F.H0)/F.HP)*(Pi(i)/F.TAU_RAD)*(1-H((i-(F.H1-60))/60));let lt=null;function Bi(){if(lt)return lt;const i=F,t=4700,e=(i.H1-i.H0)/t,s=new Float64Array(t+1);for(let o=0;o<t;o++)s[o+1]=s[o]+Ci(i.H0+(o+.5)*e)*e;const n=[];let a=0;for(let o=0;o<i.NSEG;o++){const r=s[t]*(o+.5)/i.NSEG;for(;s[a+1]<r;)a++;n.push(i.H0+(a+(r-s[a])/(s[a+1]-s[a]))*e)}return lt={mid:n,norm:s[t]}}const Se=.06,Oi=8,ki=2,at=(i,t)=>i[0]*t[0]+i[1]*t[1]+i[2]*t[2],Fe=(i,t)=>[i[1]*t[2]-i[2]*t[1],i[2]*t[0]-i[0]*t[2],i[0]*t[1]-i[1]*t[0]],dt=i=>{const t=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/t,i[1]/t,i[2]/t]};function Di(i){const t={axis:[0,0,1],rate:0};if(i.length<2)return t;const e=i[0],s=i[i.length-1],n=(s.t-e.t)/1e3;if(!(n>.001))return t;const a=Fe(e.d,s.d),o=Math.hypot(a[0],a[1],a[2]),r=Math.atan2(o,at(e.d,s.d))*180/Math.PI;return o>1e-9?{axis:[a[0]/o,a[1]/o,a[2]/o],rate:r/n}:t}function mt(i,t){const e=at(t,i.f);if(!(e>.001))return 0;const s=Math.max(Math.abs(at(t,i.r)/(e*i.tanH)),Math.abs(at(t,i.up)/(e*i.tanH)));if(s>1)return 0;const n=Math.min(1,Math.max(0,(1-s)/Se));return Math.max(1e-6,n*n*(3-2*n))}const Me=(i,t)=>Math.min(1,Math.max(0,i*Math.max(1,t)/Math.min(Oi,Math.max(1,t))));function Ui(i,t,e,s,n){if(i>=1&&t>=1)return{a:1-s,b:s,c:0};const a=i*(1-s),o=t*(n+(s-n)*i);return{a,b:o,c:Math.max(0,1-a-o)*e}}function qt(i,t,e,s,n,a,o,r=25,u=1){const h=dt(i),c=Math.hypot(h[0],h[1])>1e-6?dt([h[1],-h[0],0]):[1,0,0],f=Fe(c,h),l=Math.tan(t),m=Me(a,o),d={n:0,nA:0,nB:0,nC:0,sA:0,sB:0,sC:0,none:0,fallbackOnly:0,shown:0};for(let p=0;p<r;p++)for(let b=0;b<r;b++){const E=(2*b+1-r)/r,T=(2*p+1-r)/r;if(E*E+T*T>1)continue;const v=dt([h[0]+l*(E*c[0]+T*f[0]),h[1]+l*(E*c[1]+T*f[1]),h[2]+l*(E*c[2]+T*f[2])]),R=e?mt(e,v):0,w=s?mt(s,v):0,_=n==="cube"?1:n?mt(n,v):0,A=Ui(R,w,0,a,m),y=A.a*u,S=A.b*u,C={a:y,b:S,c:Math.max(0,1-y-S)*_};d.n++,R>0&&d.nA++,w>0&&d.nB++,_>0&&d.nC++,d.sA+=C.a,d.sB+=C.b,d.sC+=C.c,R<=0&&w<=0&&_<=0?d.none++:R<=0&&w<=0&&d.fallbackOnly++,d.shown+=C.a+C.b+C.c}const x=Math.max(1,d.n);return d.none/=x,d.fallbackOnly/=x,d.shown/=x,d}const P=i=>{const t=String(i);return/[.eE]/.test(t)?t:t+".0"},yt=[];for(const i of[-1,1])for(const t of[-1,1])for(const e of[-1,1])yt.push(`c ${i<0?"-":"+"} A ${t<0?"-":"+"} E ${e<0?"-":"+"} N`);const pt=["rPL0","rPL1","rPF00","rPF01","rPF10","rPF11"],xt=["rGL0","rGL1","rGF00","rGF01","rGF10","rGF11"],zi=["wl0","wl1","wf00","wf01","wf10","wf11"],q=(i,t)=>i.map((e,s)=>`${zi[s]} * cf(${e}, ${t}.0, yy)`).join(" + "),Ii=k+`out vec4 o; void main() { o = vec4(0.0); }
`,gi=k+`
uniform sampler2D uT;
out vec4 o;
void main() { o = vec4(textureLod(uT, vec2(0.5, 0.5), 0.0).r, 0.25, 0.0, 0.0); }
`,Li=k+`
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
// (task BH, zone-curtain-gl.md §AJ: the map's waves over the foot x — profile.ts pulseTable; uPTD (x0, dx, cells, on))
uniform sampler2D uPT;
uniform vec4 uPTD;
flat out vec4 vRx, vRy, vAn, vP0, vP1, vP2, vG0, vG1, vG2, vQa, vQb, vPx, vW0, vW1;
const float RE = ${P(O)}, REFH = ${P(ot)}, COTD = ${rt}, HLO = ${P(V)}, NCH = ${P(B)}, TWO_PI = 6.283185307179586;
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
  vP0 = ${q(pt,0)};
  vG0 = ${q(xt,0)};
  if (info.y > 1.5) {
    vP1 = ${q(pt,1)};
    vG1 = ${q(xt,1)};
  }
  if (info.y > 2.5) {
    vP2 = ${q(pt,2)};
    vG2 = ${q(xt,2)};
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
${yt.map((i,t)=>`  vec3 p${t} = pj(${i});`).join(`
`)}
  float zmin = min(min(min(p0.z, p1.z), min(p2.z, p3.z)), min(min(p4.z, p5.z), min(p6.z, p7.z)));
  float zmax = max(max(max(p0.z, p1.z), max(p2.z, p3.z)), max(max(p4.z, p5.z), max(p6.z, p7.z)));
  vec3 q0 = pj(c - A), q1 = pj(c + A);
  vec2 ax = q1.xy - q0.xy;
  float axl = length(ax);
  vec2 dr = axl > 1e-6 ? ax / axl : vec2(1.0, 0.0);
  vec2 pr = vec2(-dr.y, dr.x);
${[0,1,2,3,4,5,6,7].map(i=>`  vec2 s${i} = vec2(dot(p${i}.xy, dr), dot(p${i}.xy, pr));`).join(`
`)}
  vec2 lo = min(min(min(s0, s1), min(s2, s3)), min(min(s4, s5), min(s6, s7))) - vec2(uPx);
  vec2 hi = max(max(max(s0, s1), max(s2, s3)), max(max(s4, s5), max(s6, s7))) + vec2(uPx);
  float big = max(max(abs(lo.x), abs(lo.y)), max(abs(hi.x), abs(hi.y)));
  float mode = 0.0;
  if (zmin < 0.5 || big > 1e4) mode = 1.0;
  if (zmax < 0.5) mode = 2.0;
  // (task BG, §AI: the segment's box wholly outside one side plane of the map is not drawn — it reaches no pixel of it.
  // Before, a box within half a kilometre of the observer's plane square to the axis — a part near 90° off the map's
  // axis, which a moving view's wide cull (up to 89°) and the fallback's hold — drew a whole-map quad: one slice of a
  // moving map 190–450 ms on the integrated GPU, every fragment adding 0)
${yt.map((i,t)=>`  vec4 o${t} = outs(${i});`).join(`
`)}
  vec4 om = min(min(min(o0, o1), min(o2, o3)), min(min(o4, o5), min(o6, o7)));
  if (max(max(om.x, om.y), max(om.z, om.w)) > 0.0) mode = 2.0;
  vQa = vec4(lo, hi); vQb = vec4(dr, info.y, mode);
}
`,Xi=["vRx","vRy","vAn","vP0","vP1","vP2","vG0","vG1","vG2","vQa","vQb","vPx","vW0","vW1"],z=56,Wi=k+`
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
flat out vec4 vRx, vRy, vAn, vP0, vP1, vP2, vG0, vG1, vG2, vPx, vW0, vW1;
flat out float vCh;
void main() {
  vRx = aRx; vRy = aRy; vAn = aAn; vP0 = aP0; vP1 = aP1; vP2 = aP2; vG0 = aG0; vG1 = aG1; vG2 = aG2; vPx = aPx; vW0 = aW0; vW1 = aW1; vCh = aQb.z;
  vec2 dr = aQb.xy, pr = vec2(-dr.y, dr.x), st = mix(aQa.xy, aQa.zw, aQ), pos = dr * st.x + pr * st.y;
  if (aQb.w > 0.5) pos = mix(vec2(-1.0), vec2(1.0), aQ);
  if (aQb.w > 1.5) pos = vec2(2.0);
  gl_Position = vec4(pos, 0.0, 1.0);
}
`,Gi=k+`
uniform vec3 uF, uR, uU;
uniform float uTanH, uSize, uOff, uYOff, uBW, uN, uCut2;
uniform sampler2D uTab;
uniform vec4 uTabD;
uniform float uTexH;
uniform float uPInv;
flat in vec4 vRx, vRy, vAn, vP0, vP1, vP2, vG0, vG1, vG2, vPx, vW0, vW1;
flat in float vCh;
out vec4 oCol;
const float RE = ${P(O)}, SQ_PI_2 = 1.2533141373155003, NZF = ${Je.toFixed(1)}, ZST = ${ti}, POCT = ${ei.toFixed(1)}, SMAX = ${(ii-1).toFixed(1)};
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
  float px = (2.0 * (gl_FragCoord.x - uOff) / uSize - 1.0) * uTanH, py = (2.0 * (gl_FragCoord.y - uYOff) / uSize - 1.0) * uTanH;
  vec3 d = normalize(uF + px * uR + py * uU);
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
`,Ne=`
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
vec4 atlasCubic(sampler2D t, vec2 u, float n, float h, float ox) {
  vec2 i = floor(u - 0.5) + 0.5, f = u - i;
  vec4 wx = crW(f.x), wy = crW(f.y);
  vec3 x = (i.x + ox + vec3(-1.0, wx.z / (wx.y + wx.z), 2.0)) / (5.0 * n);
  vec3 y = (i.y + vec3(-1.0, wy.z / (wy.y + wy.z), 2.0)) / h;
  vec3 X = vec3(wx.x, wx.y + wx.z, wx.w), Y = vec3(wy.x, wy.y + wy.z, wy.w);
  vec4 a = X.x * textureLod(t, vec2(x.x, y.x), 0.0) + X.y * textureLod(t, vec2(x.y, y.x), 0.0) + X.z * textureLod(t, vec2(x.z, y.x), 0.0);
  vec4 b = X.x * textureLod(t, vec2(x.x, y.y), 0.0) + X.y * textureLod(t, vec2(x.y, y.y), 0.0) + X.z * textureLod(t, vec2(x.z, y.y), 0.0);
  vec4 c = X.x * textureLod(t, vec2(x.x, y.z), 0.0) + X.y * textureLod(t, vec2(x.y, y.z), 0.0) + X.z * textureLod(t, vec2(x.z, y.z), 0.0);
  return max(Y.x * a + Y.y * b + Y.z * c, vec4(0.0));
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
  float r = clamp((1.0 - m) * ${P(1/Se)}, 0.0, 1.0);
  return max(1e-6, r * r * (3.0 - 2.0 * r));
}
// Task BH (zone-curtain-gl.md §AJ): the wide map — the observer's cube in east / north / up, five gnomonic faces side by
// side in one target (sim/zone-curtain/wide.ts: 0 north, 1 east, 2 south, 3 west, 4 zenith; face k's tile from column k·n),
// T = (tan of a face's half side with its edge texels, n). The face is the direction's largest axis (below the horizon a
// side face, read clamped: nothing is drawn there). gS as samp's; it covers every direction (1).
float cubeAt(vec3 d, vec2 T, sampler2D C, sampler2D E) {
  vec3 a = abs(d);
  float k = 0.0; vec2 q = vec2(0.0);
  if (d.z >= a.x && d.z >= a.y) { k = 4.0; q = d.xy / d.z; }
  else if (a.y >= a.x) { if (d.y > 0.0) { k = 0.0; q = vec2(d.x, d.z) / d.y; } else { k = 2.0; q = vec2(d.x, -d.z) / d.y; } }
  else { if (d.x > 0.0) { k = 1.0; q = vec2(-d.y, d.z) / d.x; } else { k = 3.0; q = vec2(-d.y, -d.z) / d.x; } }
  vec2 u = (q / T.x + 1.0) * 0.5 * T.y;
  if (uAtlasFilter > 0.5) {
    vec2 size = vec2(textureSize(C, 0));
    float env = size.y - T.y;
    vec2 cu = (u + vec2(k * T.y, 0.0)) / size;
    vec2 eu = (u * (env / T.y) + vec2(k * env, T.y)) / size;
    vec4 e = textureLod(E, eu, 0.0);
    vec2 c = uCubic > 0.5 ? atlasCubic(C, u, T.y, size.y, k * T.y).xy : textureLod(C, cu, 0.0).xy;
    gS = vec4(c + e.xy, e.z, 1.0);
    return 1.0;
  }
  vec4 e = bil(E, 0.5 * u, 0.5 * T.y, int(k * 0.5 * T.y + 0.5));
  gS = vec4(cub(C, u, T.y, int(k * T.y + 0.5)).xy + e.xy, e.z, 1.0);
  return 1.0;
}
`,Pe=Ne+`uniform vec3 aF, aR, aU, bF, bR, bU;
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
    cubeAt(d, cT, cC, cE); vec3 W = gS.xyz;
    cubeAt(d, cT, dC, dE); W = mix(W, gS.xyz, uAlphaW);
    v += (1.0 - w) * uKC * W; w = 1.0;
  }
  return vec4(v, w);
}
`,Hi=k+`
uniform vec3 uF, uR, uU;
uniform float uTanH, uSize;
out vec4 o;
`+Pe+`
void main() {
  float px = (2.0 * gl_FragCoord.x / uSize - 1.0) * uTanH, py = (2.0 * gl_FragCoord.y / uSize - 1.0) * uTanH;
  o = mapsAt(normalize(uF + px * uR + py * uU));
}
`,qi=de("STAR_SKY")+me+Ie+ge+`
uniform float uRate[5];
uniform int uClass[5];
uniform sampler2D u_auExt;
uniform int u_auExtOn;
uniform float u_auRatioCap;
out vec4 o;
`+Pe+`
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
`,Zi=k+`
uniform vec3 uF, uR, uU;
uniform float uTanH, uSize, uOff, uYOff;
uniform sampler2D uLine;
uniform vec2 uObs;
out vec4 oCol;
const float RE = ${P(O)}, REFH = ${P(ot)}, COTD = ${rt}, X0 = ${P(-720)}, DXL = ${P(F.DX)}, FMAX = ${P(nt-1.001)}, SIGN = ${P(F.SIG_N)};
const float NORM = ${P(1/(Math.sqrt(2*Math.PI)*F.SIG_N*F.NSEG))};
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
  float px = (2.0 * (gl_FragCoord.x - uOff) / uSize - 1.0) * uTanH, py = (2.0 * (gl_FragCoord.y - uYOff) / uSize - 1.0) * uTanH;
  vec3 d = normalize(uF + px * uR + py * uU);
  oCol = vec4(0.0);
  if (!(d.z > 0.02)) return;
  gU = d.z; gCh = length(d.xy); gHe = gCh > 1e-9 ? d.x / gCh : 0.0; gHn = gCh > 1e-9 ? d.y / gCh : 1.0; gRu = RE * gU;
  float I = 0.0;
${Bi().mid.map(i=>`  I += redAt(${P(i)});`).join(`
`)}
  oCol = vec4(0.0, 0.0, I * NORM, 0.0);
}
`,Vi=`
uniform sampler2D u_auExt;
uniform int u_auExtOn;
float auExt(int c, float x) {
  if (u_auExtOn == 0) return 1.0;
  int i0 = int(floor(x)), i1 = min(i0 + 1, u_hzNodes - 1);
  return mix(texelFetch(u_auExt, ivec2(i0, c), 0).r, texelFetch(u_auExt, ivec2(i1, c), 0).r, x - float(i0));
}
`,$i=de("STAR_SKY")+me+`
uniform vec3 uMF, uMR, uMU;
uniform float uTanR, uN;
uniform vec3 mF, mR, mU;
uniform vec2 mT;
uniform float mCube;
uniform sampler2D mC, mE;
uniform int uComp[4], uCls[4];
uniform float uK[4];
out vec4 o;
`+Vi+Ne+`
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
`,Yi=k+`
uniform sampler2D uS;
uniform float uN;
uniform vec4 uW;
out vec4 o;
vec4 at(ivec2 q, int n) { return q.x < 0 || q.y < 0 || q.x >= n || q.y >= n ? vec4(0.0) : texelFetch(uS, q, 0); }
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  int blk = p.x / 3, kind = p.x - 3 * blk, n = int(uN);
  ivec2 b0 = ivec2(blk, p.y) * ${W};
  vec4 s = vec4(0.0), bb = vec4(0.0);
  float best = -1.0, cnt = 0.0;
  for (int j = 0; j < ${W}; j++) for (int i = 0; i < ${W}; i++) {
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
`,Ki=k+`
uniform sampler2D uB;
uniform int uNB, uOff;
out vec4 o;
void main() {
  int kind = int(gl_FragCoord.x) - uOff;
  vec4 s = vec4(0.0), bb = vec4(0.0);
  float best = -1.0, cnt = 0.0;
  for (int j = 0; j < ${tt/W}; j++) {
    if (j >= uNB) break;
    for (int i = 0; i < ${tt/W}; i++) {
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
`,Et={maxTextureSize:4096,maxVertexAttribs:15,maxTfInterleaved:z,maxVertexTextureUnits:3,maxTextureUnits:16,maxFragmentUniformVectors:64,maxVertexUniformVectors:64},Zt={filter:.02,blend:.001},Mt=i=>i?"rgba32f":"rgba16f",Qi={maxTextureSize:"MAX_TEXTURE_SIZE",maxVertexAttribs:"MAX_VERTEX_ATTRIBS",maxTfInterleaved:"MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS",maxVertexTextureUnits:"MAX_VERTEX_TEXTURE_IMAGE_UNITS",maxTextureUnits:"MAX_TEXTURE_IMAGE_UNITS",maxFragmentUniformVectors:"MAX_FRAGMENT_UNIFORM_VECTORS",maxVertexUniformVectors:"MAX_VERTEX_UNIFORM_VECTORS"};function Vt(i){if(!i.colorBufferFloat)return"EXT_color_buffer_float missing (float colour targets)";if(!i.fence)return"fenceSync missing (the meter's read-back)";for(const t of Object.keys(Et))if(!(i[t]>=Et[t]))return`${Qi[t]} ${i[t]} < ${Et[t]}`;return i.probeError?`probe: ${i.probeError}`:i.filterProbe===null||!(Math.abs(i.filterProbe-.5)<=Zt.filter)?`RGBA16F linear filtering: probe ${i.filterProbe} (0.5 expected)`:i.blendProbe===null||!(Math.abs(i.blendProbe-.5)<=Zt.blend)?`additive blending into ${Mt(i.floatBlend).toUpperCase()}: probe ${i.blendProbe} (0.5 expected)`:null}const $t=.5,ji=8,Ji=i=>Math.min(Math.max(0,i),$t/ji)/$t;function ts(i){const t=Le("auroral-zone",i);return G.map(e=>t[e])}function bt(i,t,e,s,n,a=1){const o=i.length,r=new Float32Array(o),u=new Float32Array(o),h=Math.min(1,Math.max(0,n));for(let c=0;c<o;c++){const f=t[c]===0||t[c]===1||t[c]===2,l=e[c];r[c]=f&&l>0?i[c]*(s/l)*h*a:0,u[c]=f?i[c]*(1-h):i[c]}return{map:r,coarse:u}}const U=12,I=["core","env","glow"],es=i=>[(-i*i*i+2*i*i-i)/2,(3*i*i*i-5*i*i+2)/2,(-3*i*i*i+4*i*i+i)/2,(i*i*i-i*i)/2],Yt=(i,t)=>({w:i==="linear"?[0,1-t,t,0]:es(t),u2:t,wc:i==="cubicw"?1:0});function is(i,t,e,s){const n=Math.PI/180,a=i*n,o=t*n,r=[Math.sin(a)*Math.cos(o),Math.cos(a)*Math.cos(o),Math.sin(o)],u=[Math.cos(a),-Math.sin(a),0],h=[r[1]*u[2]-r[2]*u[1],r[2]*u[0]-r[0]*u[2],r[0]*u[1]-r[1]*u[0]].map(f=>-f),c=h[2]<0?h.map(f=>-f):h;return{f:r,r:u,up:c,tanH:Math.tan(.5*e*n),size:s}}function Kt(i,t,e,s,n=5,a=1){const o=Math.PI/180,r=Math.tan(.5*e*o),u=Math.min(80,.5*e+n),h=Math.tan(u*o),c=2*Math.max(2,Math.round(.5*s*a*h/r));return is(i,t,2*u,c)}const Qt=4,ss=[[[0,1,0],[1,0,0],[0,0,1]],[[1,0,0],[0,-1,0],[0,0,1]],[[0,-1,0],[-1,0,0],[0,0,1]],[[-1,0,0],[0,1,0],[0,0,1]],[[0,0,1],[1,0,0],[0,1,0]]];function jt(i,t=2){const e=t/2,s=Math.max(8,Math.round(1/(e*Math.tan(i*Math.PI/180)))*e),n=2*(s+Qt),a=(s+Qt)/s;return ss.map(([o,r,u])=>({f:[...o],r:[...r],up:[...u],tanH:a,size:n}))}const vt=48,ns=6;function as(i,t,e,s,n,a){const o=Math.max(...i.map(f=>f.n)),r=s.map(()=>[]),u=f=>f.findIndex(l=>l!==0),h=s.map(f=>{const l=u(f.f);return{f:l,positive:f.f[l]>0,r:u(f.r),u:u(f.up),tan:f.tanH*(1+a)}}),c=e.reduce((f,l)=>f+Math.max(0,-l),0);for(let f=0;f<o;f+=vt){const l=f/vt*ns;let m=1/0,d=-1/0,x=1/0,p=-1/0,b=0,E=0;for(const N of t)l>=N.length||(m=Math.min(m,N[l]),d=Math.max(d,N[l+1]),x=Math.min(x,N[l+2]),p=Math.max(p,N[l+3]),b=Math.max(b,N[l+4]),E=Math.max(E,N[l+5]));if(m>d)continue;const T=(d-m)*c,v=(p-x)*c;m-=T,d+=T,x-=v+(K-ot)*rt,p+=v-(V-ot)*rt;const R=Math.max(m*m,d*d)+Math.max(x*x,p*p),w=R/(O*O),_=(1+V/O)*(1-w/6),A=1+K/O,y=A*n*Math.sqrt(1+c)*(Math.sqrt(b)+Math.sqrt(E))+4,S=[Math.min(_*m,A*m)-y,Math.min(_*x,A*x)-y,V-(O+K)*w/2-y],C=[Math.max(_*d,A*d)+y,Math.max(_*p,A*p)+y,K+y];for(let N=0;N<h.length;N++){const D=h[N],Nt=D.positive?C[D.f]:-S[D.f],et=Nt*D.tan;if(w<=.0625&&(Nt<.49||S[D.r]>et||C[D.r]<-et||S[D.u]>et||C[D.u]<-et))continue;const $=r[N],Y=$[$.length-1],Pt=Math.min(vt,o-f);Y&&Y[0]+Y[1]===f?$[$.length-1]=[Y[0],Y[1]+Pt]:$.push([f,Pt])}}return r}const Ce=[8,12,16,24],Jt=2.6,rs=.75,te=3,os=16,us=6,cs=40,ee=55,hs=40,ie=(i=Ce[0])=>({n:i,down:0,changes:0});function se(i){if(i.length<us)return null;const t=[...i].sort((e,s)=>e-s);return t[t.length>>1]}function fs(i,t,e){const s=Ce,n=s.indexOf(i.n);if(n<0||t===null)return i;const a=h=>({n:h,down:0,changes:i.changes+(h!==i.n?1:0)});if(t!==void 0){const h=l=>s.find(m=>t/m<=l)??s[s.length-1],c=h(Jt),f=h(Jt*rs);return c>i.n?a(c):f<i.n?i.down+1>=te?a(s[n-1]):{...i,down:i.down+1}:i.down?{...i,down:0}:i}if(e>1/cs&&n<s.length-1)return{...a(s[n+1]),cool:hs};const o=i.cool??0,r=Math.max(0,o-1),u=h=>o?{...h,cool:r}:h;return o>0&&e<1/ee?{...i,down:0,cool:r}:e<1/ee&&n>0?i.down+1>=te?a(s[n-1]):u({...i,down:i.down+1}):i.down||o?u({...i,down:0}):i}const ls=12,ds=1.6,ms=.25,ps=.3,xs=Math.LN2/.4;function Es(i,t,e,s,n=ls,a=ds){const o=Math.max(0,s-i.t),r=-Math.expm1(-o/n),u=Math.exp(-o/ms),h=Math.exp(xs*o),c=(f,l)=>{if(!(l>0)||!(f>0))return Math.max(0,l);const m=f+r*(l-f),d=l*a,x=l/a,p=m>d?d+(m-d)*u:m<x?x-(x-m)*u:m;return Math.min(f*h,Math.max(f/h,p))};return{t:s,mean:c(i.mean,t),peak:c(i.peak,e)}}const bs=6,Tt={N:8,dt:.25,margin:5,envBands:16,cut:4,mode:"cubic",maxMapSize:512,pitchDegMax:.25,fixedAtlas:!1},vs=16,St=3,X=6,ne=16*X*St,it=(i,t)=>{i.push(t),i.length>600&&i.shift()};function ae(i,t,e){const s=i.msg.red,n=t.msg.red;if(!s||!n)return null;const a=s.A.length,o=new Float32Array(a),r=new Float32Array(a);for(let u=0;u<a;u++)o[u]=s.A[u]+(n.A[u]-s.A[u])*e,r[u]=s.Y[u]+(n.Y[u]-s.Y[u])*e;return{A:o,Y:r}}const re=.5,At=16,Ts=2,As=300,Rs=.6,ws=.12,_s=.32,st=8,oe=4,ue=16,ys=16,ce=64,Z=[.25,1/3,.5],Ss=.75,Fs=.4,he=12,Ms=3e3,Rt=()=>({A:null,B:null,acc:null,job:null,slice:0,rot:0,startedAt:0});let wt=null;function Ns(i,t){const e=i.createProgram(),s=!!i.getExtension("KHR_parallel_shader_compile");t.programs.add(e);const n=[[i.VERTEX_SHADER,Li],[i.FRAGMENT_SHADER,Ii]].map(([c,f])=>{const l=i.createShader(c);return i.shaderSource(l,f),i.compileShader(l),i.attachShader(e,l),{s:l}});i.transformFeedbackVaryings(e,Xi,i.INTERLEAVED_ATTRIBS),i.linkProgram(e);let a=!1,o=null;const r=()=>!s||i.getProgramParameter(e,37297)===!0;t.deferred.set(e,{shaders:n,ready:r});const u=()=>{if(!(a||o||!n.length))try{for(const{s:c}of n)if(!i.getShaderParameter(c,i.COMPILE_STATUS))throw new Error(`zoneCurtainExpand compile: ${i.getShaderInfoLog(c)}`);if(!i.getProgramParameter(e,i.LINK_STATUS))throw new Error(`zoneCurtainExpand link: ${i.getProgramInfoLog(e)}`);a=!0}catch(c){o=c instanceof Error?c:new Error(String(c))}finally{for(const{s:c}of n)i.getAttachedShaders(e)?.includes(c)&&i.detachShader(e,c),i.deleteShader(c);n.length=0,t.deferred.delete(e)}},h=new Map;return{prog:e,loc:{get:c=>(h.has(c)||h.set(c,i.getUniformLocation(e,c)),h.get(c))},done:()=>a||o!==null||r(),check:()=>{if(u(),o)throw o}}}const fe=120,Ps=1e3,Cs=30,Bs=i=>[{set:"core",tgt:"core",tab:0,pulse:1},{set:"env",tgt:"env",tab:i,pulse:1},{set:"glow",tgt:"env",tab:i,pulse:0}],le=new Float32Array([0,0,1,0,0,1,1,1]),Be=(i,t)=>({level:Math.min(3,Math.max(0,Math.round(i))),seed:t}),Os=(i,t)=>({...Be(i,t),weather:{seed:t}});function ks(i,t,e,s,n){const a=[];for(let o=0;o<i.length;o+=bs){const r={t0:i[o],vz:i[o+1],amp:i[o+2],xc:i[o+3],w:i[o+4],lag:i[o+5]},u=Math.max(e,r.xc-2.8*r.w),h=Math.min(s,r.xc+2.8*r.w);h>=u&&[u,h,Math.min(h,Math.max(u,r.xc))].some(c=>{const f=t-(r.t0+(c-r.xc)*r.lag);return f>0&&70+r.vz*f<=420})&&a.push(r)}return a.sort((o,r)=>r.amp-o.amp),{events:a.slice(0,n),dropped:Math.max(0,a.length-n)}}const Oe=[0,1,2,3,15];function Q(i){const t=n=>i.getParameter(n),e=t(i.ACTIVE_TEXTURE),s=Oe.map(n=>(i.activeTexture(i.TEXTURE0+n),t(i.TEXTURE_BINDING_2D)));return i.activeTexture(e),{prog:t(i.CURRENT_PROGRAM),vao:t(i.VERTEX_ARRAY_BINDING),array:t(i.ARRAY_BUFFER_BINDING),copyRead:t(i.COPY_READ_BUFFER_BINDING),copyWrite:t(i.COPY_WRITE_BUFFER_BINDING),tfo:t(i.TRANSFORM_FEEDBACK_BINDING),tfBuffer:t(i.TRANSFORM_FEEDBACK_BUFFER_BINDING),discard:i.isEnabled(i.RASTERIZER_DISCARD),blend:i.isEnabled(i.BLEND),viewport:t(i.VIEWPORT),scissor:i.isEnabled(i.SCISSOR_TEST),drawFb:t(i.DRAW_FRAMEBUFFER_BINDING),readFb:t(i.READ_FRAMEBUFFER_BINDING),cull:i.isEnabled(i.CULL_FACE),depth:i.isEnabled(i.DEPTH_TEST),unpack:t(i.UNPACK_ALIGNMENT),unit:e,tex:s}}function j(i,t){if(i.isContextLost()||!t.viewport)return;const e=(s,n)=>{n?i.enable(s):i.disable(s)};e(i.RASTERIZER_DISCARD,t.discard),i.bindTransformFeedback(i.TRANSFORM_FEEDBACK,t.tfo),i.bindBuffer(i.TRANSFORM_FEEDBACK_BUFFER,t.tfBuffer),i.bindVertexArray(t.vao),i.bindBuffer(i.ARRAY_BUFFER,t.array),i.bindBuffer(i.COPY_READ_BUFFER,t.copyRead),i.bindBuffer(i.COPY_WRITE_BUFFER,t.copyWrite),i.vertexAttrib4f(12,0,0,0,1),i.useProgram(t.prog),e(i.BLEND,t.blend),i.blendFunc(i.ONE,i.ONE),i.blendEquation(i.FUNC_ADD),e(i.CULL_FACE,t.cull),e(i.DEPTH_TEST,t.depth),e(i.SCISSOR_TEST,t.scissor),i.viewport(t.viewport[0],t.viewport[1],t.viewport[2],t.viewport[3]),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,t.drawFb),i.bindFramebuffer(i.READ_FRAMEBUFFER,t.readFb),i.pixelStorei(i.UNPACK_ALIGNMENT,t.unpack),Oe.forEach((s,n)=>{i.activeTexture(i.TEXTURE0+s),i.bindTexture(i.TEXTURE_2D,t.tex[n]??null)}),i.activeTexture(t.unit)}function Ds(i,t,e){const s=performance.now(),n=h=>Number(i.getParameter(h)),a=i.getSupportedExtensions()??[],o=!!i.getExtension("EXT_color_buffer_float"),r=e||!!i.getExtension("EXT_float_blend"),u={colorBufferFloat:o,floatBlend:r,fence:typeof i.fenceSync=="function",maxTextureSize:n(i.MAX_TEXTURE_SIZE),maxVertexAttribs:n(i.MAX_VERTEX_ATTRIBS),maxTfInterleaved:n(i.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS),maxVertexTextureUnits:n(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureUnits:n(i.MAX_TEXTURE_IMAGE_UNITS),maxFragmentUniformVectors:n(i.MAX_FRAGMENT_UNIFORM_VECTORS),maxVertexUniformVectors:n(i.MAX_VERTEX_UNIFORM_VECTORS),filterProbe:null,blendProbe:null,probeError:null,reason:null,target:Mt(r),timerQuery:a.includes("EXT_disjoint_timer_query_webgl2"),floatLinear:a.includes("OES_texture_float_linear"),probeMs:0};if(Vt({...u,filterProbe:.5,blendProbe:.5})===null){const h=Q(i),c=i.getParameter(i.PIXEL_PACK_BUFFER_BINDING);let f=null,l=null,m=null,d=null;try{i.activeTexture(i.TEXTURE15),f=t.texture(2,1,i.RGBA16F,i.RGBA,i.FLOAT,new Float32Array([0,0,0,0,1,1,1,1])),i.bindTexture(i.TEXTURE_2D,f),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),l=t.target(1,1,r?i.RGBA32F:i.RGBA16F,i.RGBA),m=t.program("zoneCurtainProbe",g,gi),d=i.createVertexArray(),i.bindVertexArray(d),i.useProgram(m.prog),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,f),i.uniform1i(m.loc.get("uT"),0),i.bindFramebuffer(i.FRAMEBUFFER,l.fbo),i.viewport(0,0,1,1),i.disable(i.SCISSOR_TEST),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.clearBufferfv(i.COLOR,0,[0,0,0,0]),i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE),i.blendEquation(i.FUNC_ADD),i.drawArrays(i.TRIANGLES,0,3),i.drawArrays(i.TRIANGLES,0,3);const x=new Float32Array(4);i.bindBuffer(i.PIXEL_PACK_BUFFER,null),i.readPixels(0,0,1,1,i.RGBA,i.FLOAT,x);const p=i.getError();p!==i.NO_ERROR&&(u.probeError=`GL error 0x${p.toString(16)}`),u.filterProbe=x[0]/2,u.blendProbe=x[1]}catch(x){u.probeError=(x instanceof Error?x.message:String(x)).split(`
`)[0].slice(0,200)}finally{d&&i.deleteVertexArray(d),m&&(i.deleteProgram(m.prog),t.programs.delete(m.prog)),l&&t.deleteTarget(l),f&&t.deleteTexture(f),j(i,h),i.bindBuffer(i.PIXEL_PACK_BUFFER,c)}}return u.reason=Vt(u),u.probeMs=performance.now()-s,u}class Us{opt;caps=null;stats={frames:0,maps:0,misses:0,miss3:0,states:0,workerMs:[],uploadBytes:0,tablesMs:null,tableLayers:[],slots:{core:0,env:0,glow:0},segsLastSlice:0,eventsDropped:0,mainMs:[],glErrors:0,failed:null,target:"",stillFrames:0,restarts:0,composed:0,w:0,meterReads:0,meterBack:0,meterTimeouts:0,meterLatency:0,meterMs:[],meterN:0,meterSteps:[],collectMs:[],collectSteps:[],redPasses:0,first:{made:typeof performance<"u"?performance.now():0,programs:null,linked:null,tables:null,state:null,maps:null,metered:null,faded:null,tablesCached:!1},lostCalls:0,follow:{rate:0,wideMaps:0,wideFrames:0,wideMs:0,wideSize:0,wideMisses:0,fine:0,fineDropped:0,standingMaps:0},auto:{n:0,via:"",sliceMs:null,mapMs:null,changes:0},workerMsParts:[]};lost(t){return t.isContextLost()?(this.stats.lostCalls++,!0):!1}debugMeterN=null;meterIn=null;debugW=null;debugCompose=!0;debugFadeHold=!1;debugClassGain=null;debugRedOff=!1;debugRedSource=null;debugN=null;get nNow(){return this.nCur}nCur;autoN=ie();wide=Rt();standSince=null;phi=0;phiAt=null;debugWide=!0;debugFine=!0;get atlasActive(){return this.opt.fixedAtlas&&this.debugN===null&&this.debugWide}debugAtlasCull=!0;atlasSlots={kept:0,all:0,faces:[0,0,0,0,0]};newAtlas(){return this.newWideMap(jt(_s,oe),!0)}debugWideMoving=null;shown=[];noteShown(t,e,s,n){this.shown.push({at:performance.now(),lag:t-e,onTime:!n.miss&&!n.miss3&&e>s+1e-6}),this.shown.length>300&&this.shown.shift()}updateRate(t=5e3){const e=performance.now(),s=this.shown.filter(a=>e-a.at<=t),n=s.map(a=>a.lag).sort((a,o)=>a-o);return{perS:1e3*s.length/t,onTimePerS:1e3*s.filter(a=>a.onTime).length/t,lagMed:n.length?n[n.length>>1]:null,lagP90:n.length?n[Math.floor(.9*(n.length-1))]:null,n:s.length}}tq=void 0;autoCost=[];timeBegin(t){const e=this.tq;if(!e||e.pend.length>=6||t.getQuery(e.ext.TIME_ELAPSED_EXT,t.CURRENT_QUERY))return null;const s=t.createQuery();return s&&t.beginQuery(e.ext.TIME_ELAPSED_EXT,s),s}timeEnd(t,e,s){const n=this.tq;t.endQuery(n.ext.TIME_ELAPSED_EXT),n.pend.push({q:e,n:s})}timePoll(t){if(this.tq===void 0){const n=this.caps?.timerQuery===!1?null:t.getExtension("EXT_disjoint_timer_query_webgl2");this.tq=n?{ext:n,pend:[]}:null}const e=this.tq;if(!e||!e.pend.length)return;const s=!!t.getParameter(e.ext.GPU_DISJOINT_EXT);for(;e.pend.length&&t.getQueryParameter(e.pend[0].q,t.QUERY_RESULT_AVAILABLE);){const n=e.pend.shift();if(!s){const a=Number(t.getQueryParameter(n.q,t.QUERY_RESULT))/1e6;this.autoCost.push(a*n.n),this.autoCost.length>os&&this.autoCost.shift(),this.stats.auto.sliceMs=a}t.deleteQuery(n.q)}}seed;debugMaps=null;debugHold=!1;debugScene=null;debugSceneExtra=null;res=null;worker=null;makeWorker;key="";scene=null;tables=null;tablesAsked=!1;ring=[];pending=[];inFlight=!1;nextT=0;reqId=0;cap={core:0,env:0,glow:0};pX=null;pR=null;pD=null;pC=null;pRed=null;redTex=null;progQueue=[];tableWorker=null;pM=[];mS=null;mB=null;mF=null;pbos=[];reads=[];extIds=new WeakMap;extNext=1;vaoX=null;vaoR=null;vaoD=null;quad=null;tfo=null;out=null;kTex=null;ptPool=[];refCpu=new Map;accFmt=0;A=null;B=null;acc=null;Ta=0;Tb=0;cur=null;slice=0;fdts=[];lastT=null;waitSince=null;hist=[];omega={axis:[0,0,1],rate:0};view=null;trash=[];w=0;lastWall=null;unmetered=0;retiring=null;retShare=0;retOut=null;outAt=null;holdS=0;retiringShare(t){return this.retiring?this.retShare*(this.retOut??1-t):0}meterPairs(){if(this.retOut===null||!this.retiring||this.debugMaps||this.debugW!==null)return this.pairs();if(!this.programReady())return[];const t=[],e=this.maps(),s=this.retShare*(1-this.w);return s>0&&t.push({m:this.retiring,share:s}),e&&this.w>0&&t.push({m:e,share:this.w}),t}weather;wx=null;constructor(t={},e,s=0,n=!1){this.opt={...Tt,...t},this.nCur=this.opt.N,this.seed=s>>>0,this.weather=n,this.autoN=ie(this.opt.N),this.makeWorker=e??(()=>new Worker(new URL(""+new URL("zone-curtain.worker-ZtnixFBJ.js",import.meta.url).href,import.meta.url),{type:"module"}))}maps(){if(this.debugMaps)return this.debugMaps;if(!this.linked)return null;const t=this.wide,e=t.A??(this.opt.fixedAtlas?t.B:null),s=this.opt.fixedAtlas?st:At,n=this.debugWide&&e&&t.B?{A:e,B:t.B,alpha:Math.min(1,t.rot/(5*s))}:null;return!this.atlasActive&&this.A&&this.B?{A:this.A,B:this.B,alpha:this.alphaNow(),wide:n,fine:n?this.phi:1}:n?{A:n.A,B:n.B,alpha:n.alpha,wide:n,fine:0}:null}coverageNow(t,e,s=25){const n=this.debugMaps??this.maps();if(!n)return{n:0,nA:0,nB:0,nC:0,sA:0,sB:0,sC:0,none:1,fallbackOnly:0,shown:0};const a=n.fine??1,o=qt(t,e,a>0?n.A.cam:null,a>0?n.B.cam:null,n.wide?"cube":null,n.alpha,this.nCur,s,a);return{...o,shown:o.shown*this.weight()}}coverageOfView(t=15){const e=this.view;return e?this.coverageNow(e.dir,e.fovDeg*Math.PI/360,t):null}layersOf(t){const e=[];for(const{m:s,share:n}of t){const a=s.fine??1;a>0&&e.push({A:s.A,B:s.B,alpha:s.alpha,share:n*a}),s.wide&&a<1&&e.push({A:s.wide.A,B:s.wide.B,alpha:s.wide.alpha,share:n*(1-a)})}return e}alphaNow(){return Math.min(1,this.rotFrames/Math.max(1,this.rotN))}rotFrames=0;rotN=Tt.N;pairs(){if(!this.programReady())return[];if(this.debugMaps)return[{m:this.debugMaps,share:this.debugW??this.w}];const t=[],e=this.maps(),s=this.debugW??this.w;if(this.retiring&&this.debugW===null){const n=this.retiringShare(s);n>0&&t.push({m:this.retiring,share:n})}return e&&s>0&&t.push({m:e,share:s}),t}weight(){return(this.debugMaps??this.maps())&&this.programReady()?this.debugW??this.w:0}shares(){let t=0,e=0;for(const s of this.pairs())s.m===this.retiring?e=s.share:t=s.share;return{current:t,retiring:e}}coarseRates(t,e){return this.debugW!==null?this.debugW>0?bt(t,e,t,1,this.debugW).coarse:t:this.stats.failed?t:bt(t,e,t,1,1).coarse}compose(t,e,s,n,a,o,r){const u=this.pairs(),h=this.pC;if(!u.length||!h||!this.debugCompose||this.lost(t))return!1;t.useProgram(h.prog),o(h),t.uniform1iv(h.loc.get("uClass"),Int32Array.from(s));const c=ts(n),f=this.debugClassGain;for(const{m:l,share:m}of u){this.bindMaps(t,h,l,2);const d=bt(e,s,c,l.A.kR,m,a).map;if(f)for(let x=0;x<d.length;x++)d[x]=d[x]*(f[s[x]]??1);t.uniform1fv(h.loc.get("uRate"),d),r()}return t.activeTexture(t.TEXTURE0),this.stats.composed++,!0}meterField(){const t=e=>this.readingOf(e);return Dt(this.layersOf(this.meterPairs()).map(e=>({A:t(e.A),B:t(e.B),alpha:e.alpha,share:e.share})))}meterStats(t,e){const s=Ut(t,e,Bt(),this.meterField()),n=this.retOut===null?s.mean:Ut(t,e,Bt(),Dt(this.layersOf(this.pairs()).map(h=>({A:this.readingOf(h.A),B:this.readingOf(h.B),alpha:h.alpha,share:h.share})))).mean,a=typeof performance<"u"?performance.now()/1e3:0,o=this.slowLight;if(this.debugMeterFast)return this.slowLight=null,{...s,shown:n};const r=this.retiring||this.w<1?ps:this.debugGainTau??void 0,u=o&&a-o.t>=0&&a-o.t<2?Es(o,s.mean,s.peak,a,r):{t:a,mean:s.mean,peak:s.peak};return this.slowLight=u,{mean:u.mean,peak:u.peak,shown:n}}slowLight=null;debugMeterFast=!1;debugGainTau=null;meter(t,e){if(this.stats.failed||!this.pM.length||this.lost(t)||!this.programReady())return;this.reads.some(p=>p.passed)&&(this.catchUp&&t.deleteSync(this.catchUp),this.catchUp=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0));const s=this.debugMaps?null:this.maps(),n=[];for(const p of this.layersOf(this.meterPairs()).sort((b,E)=>E.share-b.share))n.push(p.A,p.B);if(s&&(n.push(s.A,s.B),s.wide&&n.push(s.wide.A,s.wide.B)),!n.length)return;const a=2*e.radiusDeg,o=ai(e.radiusDeg,Math.min(this.opt.pitchDegMax,a/128),this.debugMeterN??void 0);let r=0;e.ext&&(r=this.extIds.get(e.ext)??0,r||(r=this.extNext++,this.extIds.set(e.ext,r)));const u=`${e.axis.map(p=>p.toFixed(4)).join(",")}|${o.n}|${o.tanR.toFixed(6)}|${r}`,h=[];for(const p of n)h.length>=St||h.includes(p)||p.readKey===u||this.reads.some(b=>b.items.some(E=>E.M===p&&E.gen===p.gen&&E.key===u))||h.push(p);const c=G.map(p=>e.rates[p]??0);this.meterIn={axis:[...e.axis],radiusDeg:e.radiusDeg,n:o.n,tanR:o.tanR,count:o.count,level:e.level,cls:Array.from(e.cls),weights:c};const f=this.w<1||this.retiring!==null||this.debugMaps!==null||this.debugW!==null||h.some(p=>p.reading!==null&&p.readKey==="");if(h.length&&!f&&(this.reads.length>0||performance.now()-this.lastReduceAt<Ps)&&(h.length=0),!h.length)return;this.lastReduceAt=performance.now();const l=this.steps,m=performance.now(),d=Q(t),x=t.getParameter(t.PIXEL_PACK_BUFFER_BINDING);l.fill(0),l[1]=performance.now()-m;try{const p=Ot(e.cls),b=kt(e.cls);h.forEach((_,A)=>this.reduce(t,_,e,o,A));const E=performance.now(),T=this.res;let v=this.pbos.pop();v||(v=t.createBuffer(),T.buffers.add(v),t.bindBuffer(t.PIXEL_PACK_BUFFER,v),t.bufferData(t.PIXEL_PACK_BUFFER,ne,t.STREAM_READ),T.recordBuffer(v,ne)),t.bindFramebuffer(t.FRAMEBUFFER,this.mF.fbo),t.bindBuffer(t.PIXEL_PACK_BUFFER,v),t.readPixels(0,0,X*h.length,1,t.RGBA,t.FLOAT,0),t.bindBuffer(t.PIXEL_PACK_BUFFER,null);const R=performance.now();l[5]=R-E;const w=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);if(l[6]=performance.now()-R,!w)throw this.pbos.push(v),new Error("fenceSync returned null");this.reads.push({items:h.map(_=>({M:_,gen:_.gen,key:u,chan:p,red:b})),sync:w,pbo:v,frames:0}),t.activeTexture(t.TEXTURE0),this.stats.meterReads+=h.length,this.stats.meterN=o.n}catch(p){this.lost(t)||(this.stats.failed=`zoneCurtainMeter: ${p instanceof Error?p.message:String(p)}`)}finally{const p=performance.now();j(t,d),t.bindBuffer(t.PIXEL_PACK_BUFFER,x);const b=performance.now();l[0]=b-m,l[7]=b-p,it(this.stats.meterMs,l[0]),it(this.stats.meterSteps,Array.from(l))}}steps=new Float64Array(8);lastReduceAt=-1/0;lastReading=null;catchUp=null;readingOf(t){return t.reading??(this.debugMaps?null:this.lastReading)}collect(t){if(!this.reads.length||this.stats.failed||this.lost(t))return;const e=performance.now(),s=t.getParameter(t.PIXEL_PACK_BUFFER_BINDING),n=[0,0,0];try{this.poll(t,n)}catch(a){this.lost(t)||(this.stats.failed=`zoneCurtainMeter: ${a instanceof Error?a.message:String(a)}`)}finally{t.bindBuffer(t.PIXEL_PACK_BUFFER,s),n[0]=performance.now()-e,it(this.stats.collectMs,n[0]),it(this.stats.collectSteps,n)}}poll(t,e){for(const s of[...this.reads]){const n=performance.now(),a=s.passed?t.ALREADY_SIGNALED:t.clientWaitSync(s.sync,0,0);e[1]=e[1]+performance.now()-n;const o=a===t.ALREADY_SIGNALED||a===t.CONDITION_SATISFIED;if(o&&!s.passed){s.passed=!0,s.frames++;continue}if(s.passed&&this.catchUp&&++s.frames<=fe/2){const r=t.clientWaitSync(this.catchUp,0,0);if(r!==t.ALREADY_SIGNALED&&r!==t.CONDITION_SATISFIED&&r!==t.WAIT_FAILED)continue}if(!(!o&&a!==t.WAIT_FAILED&&++s.frames<=fe)){if(this.reads.splice(this.reads.indexOf(s),1),t.deleteSync(s.sync),o){const r=new Float32Array(4*X*s.items.length),u=performance.now();t.bindBuffer(t.PIXEL_PACK_BUFFER,s.pbo),t.getBufferSubData(t.PIXEL_PACK_BUFFER,0,r),e[2]=e[2]+performance.now()-u,s.items.forEach((h,c)=>{const f=4*X*c,l=G.length,m=new Float64Array(l),d=new Float64Array(l);h.chan.forEach((x,p)=>{m[x]=r[f+p],d[x]=r[f+4+p]}),h.red>=0&&(m[h.red]=r[f+12],d[h.red]=r[f+16]),h.M.gen===h.gen&&(h.M.reading={sums:m,count:r[f+8],box:d,boxTotal:r[f+9]+(h.red>=0?Math.max(0,r[f+21]):0)},h.M.readKey=h.key,this.lastReading=h.M.reading)}),this.stats.meterBack+=s.items.length,this.stats.meterLatency=s.frames}else this.stats.meterTimeouts+=s.items.length;this.pbos.push(s.pbo)}}}reduce(t,e,s,n,a){const o=Ot(s.cls),r=kt(s.cls);this.reduceSet(t,e,s,n,o,X*a),r>=0&&this.reduceSet(t,e,s,n,[r],X*a+3)}reduceSet(t,e,s,n,a,o){const r=this.res,u=n.n,h=u/W,c=this.pM[0],f=this.pM[1],l=this.pM[2],m=this.steps,d=performance.now(),x=(A,y,S)=>{if(A&&A.w===y&&A.h===S)return A;if(A){const N=A;this.defer(()=>r.deleteTarget(N))}t.activeTexture(t.TEXTURE15);const C=r.target(y,S,t.RGBA32F,t.RGBA);return t.activeTexture(t.TEXTURE0),C},p=this.mS=x(this.mS,u,u),b=this.mB=x(this.mB,3*h,h),E=this.mF=x(this.mF,X*St,1),T=oi(s.axis),v=this.meterIn.weights,R=[0,1,2,3].map(A=>a[A]??0),w=[0,1,2,3].map(A=>a[A]!==void 0?e.kR:0),_=[0,1,2,3].map(A=>a[A]!==void 0?v[a[A]]??0:0);t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),t.bindVertexArray(this.vaoD),t.useProgram(c.prog),s.bind(c),t.uniform3fv(c.loc.get("uMF"),T.F),t.uniform3fv(c.loc.get("uMR"),T.R),t.uniform3fv(c.loc.get("uMU"),T.U),t.uniform1f(c.loc.get("uTanR"),n.tanR),t.uniform1f(c.loc.get("uN"),u),t.uniform3fv(c.loc.get("mF"),e.cam.f),t.uniform3fv(c.loc.get("mR"),e.cam.r),t.uniform3fv(c.loc.get("mU"),e.cam.up),t.uniform2f(c.loc.get("mT"),e.cam.tanH,e.n),t.uniform1f(c.loc.get("mCube"),e.cube?1:0),t.uniform1f(c.loc.get("uAtlasFilter"),e.filtered?1:0),t.uniform1f(c.loc.get("uCubic"),this.debugCubic?1:0),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,e.core.tex),t.uniform1i(c.loc.get("mC"),2),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,e.env.tex),t.uniform1i(c.loc.get("mE"),3),t.uniform1iv(c.loc.get("uComp"),Int32Array.from(R)),t.uniform1iv(c.loc.get("uCls"),Int32Array.from(R.map(A=>s.cls[A]??0))),t.uniform1fv(c.loc.get("uK"),Float32Array.from(w)),t.bindFramebuffer(t.FRAMEBUFFER,p.fbo),t.viewport(0,0,u,u),t.drawArrays(t.TRIANGLES,0,3),t.useProgram(f.prog),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,p.tex),t.uniform1i(f.loc.get("uS"),2),t.uniform1f(f.loc.get("uN"),u),t.uniform4fv(f.loc.get("uW"),Float32Array.from(_)),t.bindFramebuffer(t.FRAMEBUFFER,b.fbo),t.viewport(0,0,3*h,h),t.drawArrays(t.TRIANGLES,0,3),t.useProgram(l.prog),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,b.tex),t.uniform1i(l.loc.get("uB"),2),t.uniform1i(l.loc.get("uNB"),h),t.uniform1i(l.loc.get("uOff"),o),t.bindFramebuffer(t.FRAMEBUFFER,E.fbo),t.viewport(o,0,3,1),t.drawArrays(t.TRIANGLES,0,3),m[4]=m[4]+performance.now()-d}debugMeterSamples(t){return this.mS?this.readTarget(t,this.mS):null}frame(t){if(this.stats.failed||this.debugHold||this.lost(t.gl))return;const e=performance.now(),s=t.gl,n=Q(s);this.holdS=Math.max(0,t.holdS??0);try{this.res=t.res,this.flush();const a=this.debugScene??(this.weather?Os:Be)(t.level,t.seed),o=this.debugSceneExtra&&!this.debugScene?{...a,...this.debugSceneExtra}:a,r=this.debugScene?JSON.stringify(o):`${o.level}|${o.seed}${this.debugSceneExtra?"|"+JSON.stringify(this.debugSceneExtra):""}`,u=this.ring.length?this.ring[0].t:null,h=this.lastT!==null&&t.tModel<this.lastT-1e-6,c=this.lastT!==null&&(t.tModel>this.lastT+5||h&&(u===null||t.tModel<u-1e-6));this.worker&&(r!==this.key||c)&&this.restart(r!==this.key),this.key=r,this.scene=o,this.worker||this.start(t),this.pX?this.askPrograms(1):this.programs(s,t),this.take(s),this.timePoll(s);const f=this.lastT!==null&&t.tModel===this.lastT;if(this.track(t),this.want(t.tModel),t.dtSeconds>0&&!f&&(this.fdts.push(t.dtSeconds),this.fdts.length>31&&this.fdts.shift()),this.lastT=t.tModel,this.atlasActive){this.tables&&this.ring.length>=4&&this.programReady()&&((!f||!this.wide.B)&&this.wideStep(s,t,!0)&&this.stats.frames++,f&&this.wide.B&&this.stats.stillFrames++),this.trim();return}const l=performance.now(),m=this.debugN===null&&this.omega.rate>=ki;m?this.standSince=null:this.standSince??=l;const d=this.debugFine&&(this.debugN!==null||this.standSince!==null&&l-this.standSince>=As);if(this.stepFine(d,l,f),this.stats.follow.rate=this.omega.rate,!this.tables||this.ring.length<4||!this.programReady()){this.ring.length>ue&&this.trim();return}const x=!f&&this.wideStep(s,t,m||!this.debugFine);if(m&&this.slice>0&&(this.slice=0,this.stats.follow.fineDropped++),!d){this.trim(),x&&this.stats.frames++;return}if(this.slice===0){const v=this.debugN??Math.max(t.lite?vs:this.opt.N,this.tq?this.autoN.n:this.tq===null?ys:this.opt.N);this.nCur=v}const p=this.fdt(),b=this.nCur,E=f&&!!this.A&&!!this.B&&this.standingNeedsMap();if(E&&this.slice>0&&this.cur&&Math.abs(this.cur.T-t.tModel)>1e-6&&(this.slice=0),!this.A||!this.B){const v=performance.now();if(this.waitSince??=v,this.ring[this.ring.length-1].t<t.tModel+2*b*p+this.dtCur&&v-this.waitSince<1500)return;this.waitSince=null,this.A=this.fillMap(s,this.newMap(t),t.tModel),this.B=this.fillMap(s,this.newMap(t),t.tModel+b*p),this.Ta=this.A.T,this.Tb=this.B.T,this.slice=0,this.stats.first.maps??=performance.now(),this.rotFrames=0,this.rotN=b}else if(f&&!E){this.stats.stillFrames++;return}if(this.slice===0){if(this.acc=this.recenter(t,this.acc),this.cur=this.job(E?t.tModel:t.tModel+2*b*p,this.acc.cam),this.acc.T=this.cur.T,this.acc.kR=this.cur.X.S[1].msg.kR,this.stats.maps++,this.cur.miss&&this.stats.misses++,E&&this.stats.follow.standingMaps++,this.clearMap(s,this.acc),this.drawRed(s,this.acc,this.cur),this.rotN=b,this.debugN===null&&this.tq){this.autoN=fs(this.autoN,se(this.autoCost),p);const v=this.stats.auto;v.n=this.autoN.n,v.changes=this.autoN.changes,v.via="timer",v.mapMs=se(this.autoCost)}else if(this.debugN===null&&this.tq===null){const v=this.stats.auto;v.n=b,v.via="frames"}}const T=this.timeBegin(s);if(this.drawSlice(s,this.acc,this.cur,this.slice,b),T&&this.timeEnd(s,T,b),++this.slice===b){this.noteShown(t.tModel,this.acc.T,this.Tb,this.cur);const v=this.A;this.A=this.B,this.B=this.acc,this.acc=v,this.Ta=this.Tb,this.Tb=this.B.T,this.slice=0,this.rotFrames=E?b:0}else this.rotFrames++;this.trim(),this.stats.frames++}catch(a){this.lost(s)||(this.stats.failed=a instanceof Error?a.message:String(a))}finally{this.fade(),j(s,n);const a=performance.now()-e;this.stats.mainMs.push(a),this.stats.mainMs.length>600&&this.stats.mainMs.shift()}}dispose(){this.worker?.terminate(),this.worker=null,this.tableWorker?.terminate(),this.tableWorker=null,this.progQueue=[];const t=this.res;if(t&&!t.gl.isContextLost()){const e=t.gl;this.flush();for(const a of this.ring)for(const o of I)t.deleteBuffer(a.buf[o]);const s=this.wide,n=new Set([this.A,this.B,this.acc,s.A,s.B,s.acc,this.retiring?.A,this.retiring?.B,this.retiring?.wide?.A,this.retiring?.wide?.B]);for(const a of n)a&&(t.deleteTarget(a.core),t.deleteTarget(a.env));for(const a of this.tables??[])t.deleteTexture(a.tex),t.deleteTexture(a.coef);this.kTex&&t.deleteTexture(this.kTex),this.redTex&&t.deleteTexture(this.redTex);for(const a of this.ptPool)t.deleteTexture(a.tex);this.out&&t.deleteBuffer(this.out.buf),this.quad&&t.deleteBuffer(this.quad);for(const a of[this.vaoX,this.vaoR,this.vaoD])a&&(e.deleteVertexArray(a),t.vaos.delete(a));this.tfo&&e.deleteTransformFeedback(this.tfo),this.pD&&(e.deleteProgram(this.pD.prog),t.programs.delete(this.pD.prog));for(const a of[this.pX,this.pR,this.pRed,this.pC,...this.pM]){if(!a)continue;t.programs.delete(a.prog);const o=()=>{if(!e.isContextLost()){if(!a.done()){setTimeout(o,50);return}try{a.check()}catch{}e.deleteProgram(a.prog),t.deferred.delete(a.prog)}};o()}for(const a of[this.mS,this.mB,this.mF])a&&t.deleteTarget(a);for(const a of this.reads)e.deleteSync(a.sync),this.pbos.push(a.pbo);this.catchUp&&(e.deleteSync(this.catchUp),this.catchUp=null);for(const a of this.pbos)t.deleteBuffer(a);for(const a of this.tq?.pend??[])e.deleteQuery(a.q)}this.tq=void 0,this.pM=[],this.mS=this.mB=this.mF=null,this.pbos=[],this.reads=[],this.linked=!1,this.wide=Rt(),this.phi=0,this.phiAt=null,this.standSince=null,this.res=null,this.ring=[],this.pending=[],this.tables=null,this.tablesAsked=!1,this.A=this.B=this.acc=null,this.cur=null,this.trash=[],this.retiring=null,this.retShare=0,this.retOut=null,this.outAt=null,this.w=0,this.lastWall=null,this.pX=this.pR=this.pD=this.pC=this.pRed=null,this.redTex=null,this.vaoX=this.vaoR=this.vaoD=null,this.quad=null,this.tfo=null,this.out=null,this.kTex=null,this.ptPool=[],this.cap={core:0,env:0,glow:0},this.inFlight=!1,this.lastT=null,this.key=""}start(t){const e=this.makeWorker();if(e.onmessage=s=>this.onMessage(s.data),e.onerror=s=>{this.stats.failed=`worker: ${s.message}`},this.worker=e,this.inFlight=!1,this.nextT=t.tModel-this.dtCur,this.post({cmd:"init",scene:this.scene,obs:[0,0],red:this.debugRedSource??"dynamic",light:!this.debugEmitStd,atlas:this.opt.fixedAtlas}),!this.tablesAsked){this.tablesAsked=!0;const s=this.opt.envBands===16?[16]:[16,this.opt.envBands],n=s.join(",");if(wt?.bands===n)this.pendingTables=wt.tables,this.stats.tablesMs=0,this.stats.first.tablesCached=!0;else{const a=this.tableWorker=this.makeWorker();a.onmessage=o=>{const r=o.data;if(r.cmd==="tables"){wt={bands:n,tables:r.tables},this.pendingTables=r.tables,this.stats.tablesMs=r.ms;for(const u of this.waiters.splice(0))u()}else r.cmd==="error"&&(this.stats.failed=`worker: ${r.message}`);a.terminate(),this.tableWorker===a&&(this.tableWorker=null)},a.onerror=o=>{this.stats.failed=`worker: ${o.message}`},a.postMessage({cmd:"tables",bands:s})}}}post(t){this.worker.postMessage(t)}restart(t=!1){this.worker?.terminate(),this.worker=null,this.stats.restarts++,t&&(this.lastReading=null,this.wx=null);const e=this.res,s=this.ring;e&&this.defer(()=>{for(const u of s)for(const h of I)e.deleteBuffer(u.buf[h])}),this.ring=[],this.pending=[],this.cur=null,this.slice=0,this.cap={core:0,env:0,glow:0},this.waitSince=null;const n=this.maps(),a=this.wide,o=n?this.w:0,r=this.retiringShare(this.w);if(n&&o>0&&o>=r){const u=this.retiring;u&&this.defer(()=>this.delPair(u)),this.retiring={...n,wide:n.wide?{...n.wide}:null},this.retShare=o}else{for(const u of new Set([this.A,this.B,a.A,a.B]))u&&this.defer(()=>this.delMap(u));this.retiring&&(this.retShare=r)}if(a.acc){const u=a.acc;this.defer(()=>this.delMap(u))}this.wide=Rt(),this.phi=0,this.phiAt=null,this.retOut=this.retiring&&(t||this.retOut!==null)?1:null,this.outAt=null,this.A=this.B=null,this.w=0,!this.tables&&!this.pendingTables&&!this.tableWorker&&(this.tablesAsked=!1)}debugWorkerSlow=1;debugEmitStd=!1;dtCur=Tt.dt;dtAt=-1/0;get dtNow(){return this.dtCur}batchP90(){const t=this.stats.workerMs.slice(-he);if(t.length<4)return 0;const e=[...t].sort((s,n)=>s-n);return e[Math.floor(.9*(e.length-1))]/1e3}adaptDt(){if(this.debugEmitStd||this.opt.dt!==Z[0]||this.stats.workerMs.length<he)return;const t=performance.now();if(t-this.dtAt<Ms)return;const e=this.batchP90(),s=Z.indexOf(this.dtCur);s<0||(e>Ss*this.dtCur&&s<Z.length-1?(this.dtCur=Z[s+1],this.dtAt=t):s>0&&e<Fs*Z[s-1]&&(this.dtCur=Z[s-1],this.dtAt=t))}slowed=new WeakSet;onMessage(t){if(t.cmd==="state"&&this.debugWorkerSlow>1&&!this.slowed.has(t)){const e=this.debugWorkerSlow,s=this.worker,n={...t,ms:{...t.ms,total:t.ms.total*e}};this.slowed.add(n),setTimeout(()=>{this.worker===s&&this.onMessage(n)},(e-1)*t.ms.total);return}if(t.cmd==="error"){this.stats.failed=`worker: ${t.message}`;return}if(t.cmd==="tables"){this.pendingTables=t.tables,this.stats.tablesMs=t.ms;return}if(t.cmd==="state"){this.inFlight=!1,this.pending.push(t),this.stats.workerMs.push(t.ms.total),this.stats.workerMs.length>120&&this.stats.workerMs.shift(),this.stats.workerMsParts.push(t.ms),this.stats.workerMsParts.length>120&&this.stats.workerMsParts.shift(),this.adaptDt(),this.lastT!==null&&this.want(this.lastT);for(const e of this.waiters.splice(0))e()}}pendingTables=null;waiters=[];want(t){if(this.inFlight||!this.worker)return;const e=this.opt.fixedAtlas?st:At,n=2*Math.max(this.nCur,this.debugWide?5*e:0)*this.fdt()+2*this.dtCur+.3+(this.debugEmitStd?0:this.batchP90());this.nextT<=t+n&&(this.inFlight=!0,this.post({cmd:"state",id:++this.reqId,t:this.nextT,cull:null}),this.nextT+=this.dtCur)}take(t){for(this.pendingTables&&(this.uploadTables(t,this.pendingTables),this.pendingTables=null);this.pending.length;){const e=this.pending.shift(),s=this.res,n={},a={};for(const o of I)this.grow(t,o,e.sets[o].n),a[o]=e.sets[o].n;for(const o of I){const r=t.createBuffer();s.buffers.add(r),t.bindBuffer(t.ARRAY_BUFFER,r),t.bufferData(t.ARRAY_BUFFER,Math.max(1,this.cap[o])*U*4,t.DYNAMIC_DRAW),s.recordBuffer(r,Math.max(1,this.cap[o])*U*4),a[o]&&t.bufferSubData(t.ARRAY_BUFFER,0,e.sets[o].data,0,a[o]*U),this.stats.uploadBytes+=a[o]*U*4,n[o]=r}t.bindBuffer(t.ARRAY_BUFFER,null),this.ring.push({t:e.t,k:e.k,n:a,buf:n,msg:e}),this.stats.states++,this.stats.first.state??=performance.now(),e.wx&&(this.wx=e.wx);for(const o of I)this.stats.slots[o]=Math.max(this.stats.slots[o],a[o])}}grow(t,e,s){if(s<=this.cap[e])return;const n=Math.max(4096,Math.ceil(s*1.5/1024)*1024),a=this.res,o=[];for(const r of this.ring){const u=t.createBuffer();a.buffers.add(u),t.bindBuffer(t.COPY_WRITE_BUFFER,u),t.bufferData(t.COPY_WRITE_BUFFER,n*U*4,t.DYNAMIC_DRAW),a.recordBuffer(u,n*U*4),r.n[e]&&(t.bindBuffer(t.COPY_READ_BUFFER,r.buf[e]),t.copyBufferSubData(t.COPY_READ_BUFFER,t.COPY_WRITE_BUFFER,0,0,r.n[e]*U*4)),o.push(r.buf[e]),r.buf[e]=u}o.length&&this.defer(()=>{for(const r of o)a.deleteBuffer(r)}),t.bindBuffer(t.COPY_READ_BUFFER,null),t.bindBuffer(t.COPY_WRITE_BUFFER,null),this.cap[e]=n}trim(){const t=this.res,e=s=>!!(this.cur?.X.S.includes(s)||this.wide.job?.X.S.includes(s));for(;this.ring.length>ue&&!e(this.ring[0]);){const s=this.ring.shift();this.defer(()=>{for(const n of I)t.deleteBuffer(s.buf[n])})}}stepFine(t,e,s){const n=this.phiAt===null?0:Math.min(.25,Math.max(0,(e-this.phiAt)/1e3));this.phiAt=e,!(s&&this.A&&this.B)&&(this.wide.A&&this.wide.B?t&&this.A&&this.B&&!this.standingNeedsMap()?this.phi=Math.min(1,this.phi+n/Rs):this.phi=Math.max(0,this.phi-n/ws):this.phi=this.A&&this.B?1:0,this.stats.follow.fine=this.phi)}delPair(t){for(const e of new Set([t.A,t.B,t.wide?.A,t.wide?.B]))e&&this.delMap(e)}fade(){const t=performance.now(),e=this.lastWall===null?0:Ji((t-this.lastWall)/1e3);if(this.lastWall=t,this.debugFadeHold)return;const s=this.maps(),n=!!s&&!!s.A.reading&&!!s.B.reading;this.unmetered=s&&!n?this.unmetered+1:0,n&&(this.stats.first.metered??=t),this.w>=1&&(this.stats.first.faded??=t);const a=s!==null&&this.programReady()&&(n||this.w>0||this.unmetered>Cs);this.retiring&&this.retOut!==null&&a&&(this.retOut=Math.max(0,this.retOut-e)),this.retOut===0&&this.outAt===null&&(this.outAt=t);const o=!!this.retiring&&this.retOut!==null&&(this.retOut>0||t-(this.outAt??t)<1e3*this.holdS),r=a&&(!o||this.w>0);if(this.w=r?Math.min(1,this.w+e):0,this.retiring&&this.w>=1){const u=this.retiring;this.retiring=null,this.retShare=0,this.retOut=null,this.outAt=null,this.defer(()=>this.delPair(u))}this.stats.w=this.w}programReady(){if(this.linked)return!0;if(this.progQueue.length||!this.pX||!this.pR||!this.pRed||!this.pC||this.pM.length<3)return!1;const t=[this.pX,this.pR,this.pRed,this.pC,...this.pM];if(!t.every(e=>e.done()))return!1;try{for(const e of t)e.check();return this.linked=!0,this.stats.first.linked??=performance.now(),!0}catch(e){return this.stats.failed=`zoneCurtainCompose: ${e instanceof Error?e.message:String(e)}`,!1}}askPrograms(t){for(let e=0;e<t&&this.progQueue.length;e++)this.progQueue.shift()()}linked=!1;defer(t){this.trash.push(t)}flush(){if(this.trash.length)for(const t of this.trash.splice(0))t()}fdt(){if(!this.fdts.length)return 1/60;const t=[...this.fdts].sort((e,s)=>e-s);return Math.min(.1,Math.max(1/240,t[t.length>>1]))}programs(t,e){const s=e.res;if(!t.getExtension("EXT_color_buffer_float"))throw new Error("EXT_color_buffer_float missing");this.accFmt=Mt(e.floatBlend||!!t.getExtension("EXT_float_blend"))==="rgba32f"?t.RGBA32F:t.RGBA16F,this.stats.target=this.accFmt===t.RGBA32F?"rgba32f":"rgba16f",this.stats.first.programs??=performance.now(),this.progQueue=[()=>{this.pX=Ns(t,s)},()=>{this.pR=s.programDeferred("zoneCurtainRaster",Wi,Gi)},()=>{this.pRed=s.programDeferred("zoneCurtainRed",g,Zi)},()=>{this.pC=s.programDeferred("zoneCurtainCompose",g,qi)},()=>{this.pM.push(s.programDeferred("zoneCurtainMeter",g,$i))},()=>{this.pM.push(s.programDeferred("zoneCurtainMeterBlock",g,Yi))},()=>{this.pM.push(s.programDeferred("zoneCurtainMeterFinal",g,Ki))}],t.getExtension("KHR_parallel_shader_compile")?this.askPrograms(1/0):this.askPrograms(1),t.activeTexture(t.TEXTURE15),this.redTex=s.texture(nt,1,t.RG32F,t.RG,t.FLOAT,new Float32Array(2*nt)),t.activeTexture(t.TEXTURE0),this.vaoX=t.createVertexArray(),this.vaoR=t.createVertexArray(),this.vaoD=t.createVertexArray();for(const a of[this.vaoX,this.vaoR,this.vaoD])s.vaos.add(a);this.quad=t.createBuffer(),s.buffers.add(this.quad),s.recordBuffer(this.quad,le.byteLength),t.bindVertexArray(this.vaoR),t.bindBuffer(t.ARRAY_BUFFER,this.quad),t.bufferData(t.ARRAY_BUFFER,le,t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0);for(let a=1;a<=14;a++)t.enableVertexAttribArray(a),t.vertexAttribDivisor(a,1);t.bindVertexArray(this.vaoX);for(let a=0;a<12;a++)t.enableVertexAttribArray(a);t.disableVertexAttribArray(12),t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,null),this.tfo=t.createTransformFeedback();const n=t.createBuffer();s.buffers.add(n),this.out={buf:n,cap:0},t.activeTexture(t.TEXTURE15),this.kTex=s.texture(9,B,t.RG32F,t.RG,t.FLOAT,ni(9)),t.activeTexture(t.TEXTURE0)}uploadTables(t,e){const s=this.res;t.activeTexture(t.TEXTURE15),this.tables=e.map(n=>{const a=s.texture(n.meta.tiledW,n.meta.tiledH,t.RGBA16F,t.RGBA,t.HALF_FLOAT,n.half);t.bindTexture(t.TEXTURE_2D,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR);const o=s.texture(n.coefW,n.coefH,t.RGBA32F,t.RGBA,t.FLOAT,n.coef);return{meta:n.meta,tex:a,coef:o}}),t.activeTexture(t.TEXTURE0),this.stats.tableLayers=e.map(n=>n.meta.layers),this.stats.first.tables??=performance.now()}ptOf(t,e,s,n){if(!t.length)return null;const a=this.scene.level;let o=this.refCpu.get(a);return o||(o=yi(ct[a]),this.refCpu.set(a,o)),Mi(t,e,o,s,n)}wavesOf(t,e,s,n){const a=ct[this.scene.level],[o,r]=n?[-760,760]:this.footRange(s);return{x0:o,x1:r,ev:t.msg.wx?ks(t.msg.wx.pulses,e,o,r,ce):Ni(a,this.scene,e,o,r,ce)}}ptTexOf(t,e){let s=this.ptPool.find(o=>o.job===e);if(s)return s.tex;const n=this.res;t.activeTexture(t.TEXTURE15),this.ptPool.length<3?(s={tex:n.texture(ye,3,t.RGBA32F,t.RGBA,t.FLOAT,null),job:null},this.ptPool.push(s)):(s=this.ptPool.shift(),this.ptPool.push(s));const a=e.pt;return t.bindTexture(t.TEXTURE_2D,s.tex),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.texSubImage2D(t.TEXTURE_2D,0,0,0,a.n,3,t.RGBA,t.FLOAT,a.data),t.activeTexture(t.TEXTURE0),s.job=e,s.tex}mapCameraOf(t,e=this.opt.margin,s=1){const[n,a,o]=t.dir,r=Math.atan2(n,a)*180/Math.PI,u=Math.asin(Math.max(-1,Math.min(1,o)))*180/Math.PI,h=Math.min(150,Math.max(.5,t.fovDeg)),c=Math.min(t.pitchDeg??this.opt.pitchDegMax,h/128)*s;let f=Kt(r,u,h,Math.round(h/c),e);return f.size>this.opt.maxMapSize&&(f=Kt(r,u,h,Math.round(h/c*this.opt.maxMapSize/f.size),e)),f}track(t){const e=performance.now(),s=[t.dir[0],t.dir[1],t.dir[2]],n=this.hist;for(this.view={dir:s,fovDeg:t.fovDeg},n.push({t:e,d:s});n.length>2&&e-n[0].t>150;)n.shift();this.omega=n.length>=2&&e-n[0].t<=400?Di(n):{axis:[0,0,1],rate:0}}standingNeedsMap(){const t=this.view;if(!t||!this.A||!this.B)return!1;const e=qt(t.dir,t.fovDeg*Math.PI/360,this.A.cam,this.B.cam,null,this.alphaNow(),this.nCur,9);return e.sA+e.sB<e.n-.001}wideStep(t,e,s){const n=this.wide;if(!this.debugWide||this.debugMaps)return!1;const a=this.opt.fixedAtlas,o=a?st:At,r=o*5,u=this.debugWideMoving??(a?1:s?Ts:1);for(let h=0;h<u;h++){n.job||(n.acc??=a?this.newAtlas():this.newWideMap(jt(re)),n.job=this.job(e.tModel+2*(r/u)*this.fdt(),n.acc.cam,!0),a&&this.cullAtlas(n.acc,n.job),n.acc.T=n.job.T,n.acc.kR=n.job.X.S[1].msg.kR,n.slice=0,n.startedAt=performance.now(),n.job.miss&&this.stats.follow.wideMisses++,this.clearMap(t,n.acc),this.drawRed(t,n.acc,n.job));const c=this.faceOf(n.acc,n.slice%5),f=this.expandSlice(t,n.job.X,Math.floor(n.slice/5),o,c,n.job);if(this.rasterSlice(t,c,f,n.job),++n.slice===r){a&&(this.noteShown(e.tModel,n.acc.T,n.B?.T??-1/0,n.job),this.stats.first.maps??=performance.now());const l=n.A;n.A=n.B,n.B=n.acc,n.acc=l,n.job=null,n.rot=0;const m=this.stats.follow;m.wideMaps++,m.wideFrames=r/u,m.wideMs=performance.now()-n.startedAt,m.wideSize=n.B.n}else n.rot++}return!0}cullAtlas(t,e){const s=e.X.S;if(!this.debugAtlasCull||s.some(o=>!o.msg.bounds))return;const n={},a=this.atlasSlots;a.faces.fill(0),a.all=0;for(const o of I){const r=s.map(c=>c.msg.sets[o]),u=Math.max(...r.map(c=>c.n)),h=as(r,s.map(c=>c.msg.bounds[o]),e.X.w,t.cube,this.opt.cut,2/(o==="core"?t.n:t.env.h));for(let c=0;c<h.length;c++)for(const[,f]of h[c])a.faces[c]=a.faces[c]+f;a.all+=u*h.length,n[o]=h}a.kept=a.faces.reduce((o,r)=>o+r,0),e.spans=n}newWideMap(t,e=!1){const s=this.res,n=s.gl,a=t[0].size;n.activeTexture(n.TEXTURE15);const o=a/(e?oe:2),r=s.target(5*a,a+(e?o:0),e?n.RGBA16F:this.accFmt,n.RGBA),u=e?{...r,w:5*o,h:o,y0:a}:s.target(5*o,o,this.accFmt,n.RGBA),h={cam:t[0],n:a,core:r,env:u,T:0,kR:0,reading:null,readKey:"",gen:0,red:null,cube:t,filtered:e};return e&&(n.bindTexture(n.TEXTURE_2D,r.tex),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR)),n.activeTexture(n.TEXTURE0),h}faceOf(t,e){const s=t.n,n=t.env.h;return{...t,faceIndex:e,cam:t.cube[e],core:{...t.core,w:s,h:s,x0:e*s},env:{...t.env,w:n,h:n,x0:e*n}}}newMap(t,e=this.mapCameraOf(t)){const s=this.res,n=s.gl;n.activeTexture(n.TEXTURE15);const a={cam:e,n:e.size,core:s.target(e.size,e.size,this.accFmt,n.RGBA),env:s.target(e.size/2,e.size/2,this.accFmt,n.RGBA),T:0,kR:0,reading:null,readKey:"",gen:0,red:null};return n.activeTexture(n.TEXTURE0),a}delMap(t){const e=this.res;e&&(e.deleteTarget(t.core),t.env.fbo!==t.core.fbo&&e.deleteTarget(t.env))}recenter(t,e){const s=this.mapCameraOf(t);if(e&&e.n===s.size)return e.cam=s,e;if(e){const n=e;this.defer(()=>this.delMap(n))}return this.newMap(t,s)}clearMap(t,e){e.reading=null,e.readKey="",e.gen++,t.disable(t.SCISSOR_TEST);for(const s of e.filtered?[e.core]:[e.core,e.env])t.bindFramebuffer(t.FRAMEBUFFER,s.fbo),t.viewport(0,0,s.w,s.h),t.clearBufferfv(t.COLOR,0,[0,0,0,0])}job(t,e,s=!1){const n=this.ring;let a=-1;for(let p=0;p<n.length-1;p++)n[p].t<=t+1e-9&&(a=p);let o=!1;a<0&&(a=0),t>n[n.length-1].t+1e-9&&(o=!0,t=n[n.length-1].t,a=n.length-2);const r=!n[a+2],u=n[Math.max(0,a-1)],h=n[a],c=n[a+1],f=n[a+2]??(this.stats.miss3++,c),l=Math.min(1,Math.max(0,(t-h.t)/(c.t-h.t))),{x0:m,x1:d,ev:x}=this.wavesOf(h,t,e,s);return this.stats.eventsDropped+=x.dropped,{T:t,X:{S:[u,h,c,f],...Yt(this.opt.mode,l)},events:x.events,dropped:x.dropped,miss:o,red:ae(h,c,l),miss3:r,pt:this.ptOf(x.events,t,m,d)}}footRange(t){let e=1/0,s=-1/0;for(const n of[-1,0,1])for(const a of[-1,0,1]){const o=[0,1,2].map(h=>t.f[h]+n*t.tanH*t.r[h]+a*t.tanH*t.up[h]),r=Math.hypot(o[0],o[1],o[2]),u=o[2]/r;if(!(u>.02)){e=Math.min(e,-700),s=Math.max(s,700);continue}for(const h of[84,300]){const c=si(h,u)*o[0]/r;e=Math.min(e,c),s=Math.max(s,c)}}return[Math.max(-760,e-60),Math.min(760,s+60)]}fillMap(t,e,s){const n=this.job(s,e.cam,!!e.cube),a=e.filtered?st:this.nCur;e.filtered&&this.cullAtlas(e,n),e.T=n.T,e.kR=n.X.S[1].msg.kR,e.pt=n.pt,this.clearMap(t,e),this.drawRed(t,e,n);for(let o=0;o<a;o++)this.drawSlice(t,e,n,o,a);return e}drawRed(t,e,s){e.red=s.red;const n=this.pRed;if(!n||!this.redTex||!s.red||this.debugRedOff)return;const a=nt,o=new Float32Array(2*a);for(let u=0;u<a;u++)o[2*u]=s.red.A[u],o[2*u+1]=s.red.Y[u];t.activeTexture(t.TEXTURE15),t.bindTexture(t.TEXTURE_2D,this.redTex),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.texSubImage2D(t.TEXTURE_2D,0,0,0,a,1,t.RG,t.FLOAT,o),t.useProgram(n.prog),t.bindVertexArray(this.vaoD),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD),t.colorMask(!1,!1,!0,!1);const r=u=>n.loc.get(u);t.uniform2f(r("uObs"),0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.redTex),t.uniform1i(r("uLine"),0),t.bindFramebuffer(t.FRAMEBUFFER,e.env.fbo);for(const u of e.cube?e.cube.map((h,c)=>this.faceOf(e,c)):[e]){const h=u.cam,c=u.env,f=c.x0??0,l=c.y0??0;t.viewport(f,l,c.w,c.h),t.uniform3fv(r("uF"),h.f),t.uniform3fv(r("uR"),h.r),t.uniform3fv(r("uU"),h.up),t.uniform1f(r("uTanH"),h.tanH),t.uniform1f(r("uSize"),c.w),t.uniform1f(r("uOff"),f),t.uniform1f(r("uYOff"),l),t.drawArrays(t.TRIANGLES,0,3)}t.colorMask(!0,!0,!0,!0),t.disable(t.BLEND),t.bindVertexArray(null),this.stats.redPasses++}drawSlice(t,e,s,n,a){let o=[];for(const r of e.cube?e.cube.map((u,h)=>this.faceOf(e,h)):[e])o=this.expandSlice(t,s.X,n,a,r,s),this.rasterSlice(t,r,o,s);return o}groups(){return Bs(this.tables.length>1?1:0)}sliceSegs(t,e){let s=0;for(const n of this.groups()){const a=this.tables[n.tab].meta,o=Math.ceil(a.B/e);s+=o*Math.max(...t.S.map(r=>r.n[n.set]))}return s}expandSlice(t,e,s,n,a,o=null){const r=this.pX,u=this.out,h=this.groups(),c=a.cam,f=h.map(E=>a.faceIndex!==void 0&&o?.spans?o.spans[E.set][a.faceIndex]:[[0,Math.max(...e.S.map(T=>T.n[E.set]))]]),l=f.map(E=>E.reduce((T,[,v])=>T+v,0)),m=h.reduce((E,T,v)=>E+Math.ceil(this.tables[T.tab].meta.B/n)*l[v],0);if(!m)return this.stats.segsLastSlice=0,[];m*z*4>u.cap&&(u.cap=Math.ceil(m*z*4*1.25),t.bindBuffer(t.ARRAY_BUFFER,u.buf),t.bufferData(t.ARRAY_BUFFER,u.cap,t.DYNAMIC_COPY),this.res.recordBuffer(u.buf,u.cap),t.bindBuffer(t.ARRAY_BUFFER,null)),t.useProgram(r.prog),t.bindVertexArray(this.vaoX),t.enable(t.RASTERIZER_DISCARD);const d=E=>r.loc.get(E);t.uniform3fv(d("uF"),c.f),t.uniform3fv(d("uR"),c.r),t.uniform3fv(d("uU"),c.up),t.uniform1f(d("uTanH"),c.tanH),t.uniform4fv(d("uCW"),Float32Array.from(e.w)),t.uniform1f(d("uU2"),e.u2),t.uniform1f(d("uWC"),e.wc),t.uniform1f(d("uSlice"),s),t.uniform1f(d("uNS"),n),t.uniform1f(d("uCutB"),this.opt.cut),t.uniform1f(d("uObsX"),0);const x=o?.pt??null;if(x){const E=this.ptTexOf(t,o);t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,E)}t.uniform1i(d("uPT"),3),t.uniform4f(d("uPTD"),x?.x0??0,x?.dx??1,x?.n??1,x?1:0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,this.kTex),t.uniform1i(d("uK"),1),t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,this.tfo),m&&(t.bindBufferRange(t.TRANSFORM_FEEDBACK_BUFFER,0,u.buf,0,m*z*4),t.beginTransformFeedback(t.POINTS));const p=[];let b=0;for(const[E,T]of h.entries()){const v=this.tables[T.tab],R=v.meta,w=Math.ceil(R.B/n),_=l[E];if(!_){p.push({tgt:T.tgt,tab:T.tab,pulse:T.pulse,first:b,count:0});continue}t.uniform1f(d("uPx"),2/a[T.tgt].w),t.uniform1f(d("uB"),R.B),t.uniform1f(d("uBW"),R.bandW),t.uniform1f(d("uNG"),R.ngroup),t.uniform1f(d("uGR"),R.groupRows),t.uniform1f(d("uNL"),R.nl),t.uniform1f(d("uPulse"),T.pulse),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,v.coef),t.uniform1i(d("uCoef"),2),e.S.forEach((A,y)=>{t.bindBuffer(t.ARRAY_BUFFER,A.buf[T.set]);for(let S=0;S<3;S++)t.vertexAttribPointer(3*y+S,4,t.FLOAT,!1,U*4,16*S)}),t.bindBuffer(t.ARRAY_BUFFER,null);for(let A=0;A<w;A++){t.vertexAttrib1f(12,A);for(const[y,S]of f[E])t.drawArrays(t.POINTS,y,S)}p.push({tgt:T.tgt,tab:T.tab,pulse:T.pulse,first:b,count:w*_}),b+=w*_}return m&&t.endTransformFeedback(),t.bindBufferBase(t.TRANSFORM_FEEDBACK_BUFFER,0,null),t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,null),t.disable(t.RASTERIZER_DISCARD),t.bindVertexArray(null),t.activeTexture(t.TEXTURE0),this.stats.segsLastSlice=b,p}rasterSlice(t,e,s,n){if(!s.length)return;const a=this.pR,o=e.cam,r=c=>a.loc.get(c);t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.useProgram(a.prog),t.bindVertexArray(this.vaoR),t.uniform3fv(r("uF"),o.f),t.uniform3fv(r("uR"),o.r),t.uniform3fv(r("uU"),o.up),t.uniform1f(r("uTanH"),o.tanH),t.uniform1f(r("uCut2"),this.opt.cut**2),t.uniform1f(r("uPInv"),1/(ct[this.scene.level].pulse5?.sig??14)),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD);let u=null,h=-1;t.bindBuffer(t.ARRAY_BUFFER,this.out.buf);for(const c of s){if(!c.count)continue;const f=c.tgt==="env"?e.env:e.core;if(f!==u){f.fbo!==u?.fbo&&t.bindFramebuffer(t.FRAMEBUFFER,f.fbo),u=f;const l=f,m=l.x0??0,d=l.y0??0;t.viewport(m,d,f.w,f.h),t.uniform1f(r("uSize"),f.w),t.uniform1f(r("uOff"),m),t.uniform1f(r("uYOff"),d)}if(c.tab!==h){h=c.tab;const l=this.tables[c.tab],m=l.meta;t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,l.tex),t.uniform1i(r("uTab"),0),t.uniform1f(r("uBW"),m.bandW),t.uniform1f(r("uN"),m.n),t.uniform4f(r("uTabD"),m.width,m.height,m.tilesX,m.tiledW),t.uniform1f(r("uTexH"),m.tiledH)}for(let l=0;l<14;l++)t.vertexAttribPointer(1+l,4,t.FLOAT,!1,z*4,(c.first*z+4*l)*4);t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,c.count)}t.bindBuffer(t.ARRAY_BUFFER,null),t.disable(t.BLEND),t.bindVertexArray(null),t.activeTexture(t.TEXTURE0)}bindMaps(t,e,s,n){const a=s.wide??null,o=s.fine??1;[["a",s.A,n],["b",s.B,n+2],["c",a?.A??s.A,n+4],["d",a?.B??s.B,n+6]].forEach(([r,u,h])=>{(r==="a"||r==="b")&&(t.uniform3fv(e.loc.get(r+"F"),u.cam.f),t.uniform3fv(e.loc.get(r+"R"),u.cam.r),t.uniform3fv(e.loc.get(r+"U"),u.cam.up),t.uniform2f(e.loc.get(r+"T"),u.cam.tanH,u.n)),t.activeTexture(t.TEXTURE0+h),t.bindTexture(t.TEXTURE_2D,u.core.tex),t.uniform1i(e.loc.get(r+"C"),h),t.activeTexture(t.TEXTURE1+h),t.bindTexture(t.TEXTURE_2D,u.env.tex),t.uniform1i(e.loc.get(r+"E"),h+1)}),t.uniform2f(e.loc.get("cT"),a?a.A.cam.tanH:1,a?a.A.n:2),t.uniform1f(e.loc.get("uAlpha"),s.alpha),t.uniform1f(e.loc.get("uReveal"),Me(s.alpha,this.nCur)),t.uniform1f(e.loc.get("uFine"),a?o:1),t.uniform1f(e.loc.get("uHasW"),a?1:0),t.uniform1f(e.loc.get("uAlphaW"),a?.alpha??0),t.uniform1f(e.loc.get("uKC"),a&&s.A.kR>0?a.A.kR/s.A.kR:1),t.uniform1f(e.loc.get("uCubic"),this.debugCubic?1:0),t.uniform1f(e.loc.get("uAtlasFilter"),a?.A.filtered?1:0)}debugCubic=!0;display(t,e,s,n,a,o,r=null,u=1){const h=this.res;this.pD??=h.program("zoneCurtainDisplay",g,Hi);const c=this.pD;t.useProgram(c.prog),t.bindVertexArray(this.vaoD),t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo),t.viewport(0,0,e.w,e.h),t.uniform3fv(c.loc.get("uF"),s.f),t.uniform3fv(c.loc.get("uR"),s.r),t.uniform3fv(c.loc.get("uU"),s.up),t.uniform1f(c.loc.get("uTanH"),s.tanH),t.uniform1f(c.loc.get("uSize"),e.w);const f=r&&"A"in r&&"alpha"in r?r:null;this.bindMaps(t,c,{A:n,B:a,alpha:o,wide:f,fine:u},0),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null),t.activeTexture(t.TEXTURE0)}debugShown(t,e,s){const n=this.maps();n&&((n.fine??1)===0&&n.wide?this.display(t,e,s,n.wide.A,n.wide.B,n.wide.alpha,n.wide,0):this.display(t,e,s,n.A,n.B,n.alpha,n.wide??null,n.fine??1))}debugShownOf(t,e,s,n){n.cube?this.display(t,e,s,n,n,0,{A:n,B:n,alpha:0},0):this.display(t,e,s,n,n,0,null,1)}debugReferenceKinds=["fine","wide"];debugReference(t,e,s){if(this.lastT===null||this.ring.length<4)return null;const n=Q(t),a={dir:[s.dir[0],s.dir[1],s.dir[2]],fovDeg:s.fovDeg};try{const o=Math.min(this.opt.pitchDegMax,Math.min(150,Math.max(.5,s.fovDeg))/128),r=this.newMap(a,e==="wide"?this.mapCameraOf(a,this.opt.margin,re/o):this.mapCameraOf(a));return this.fillMap(t,r,this.lastT)}finally{j(t,n)}}debugReferenceDone(t){this.delMap(t)}debugState(){return{ring:this.ring.map(t=>({t:t.t,k:t.k,sets:t.msg.sets})),tables:this.tables?.map(t=>t.meta)??null,scene:this.scene,A:this.A,B:this.B,Ta:this.Ta,Tb:this.Tb,trash:this.trash.length,w:this.w,retiring:this.retiring!==null,retShare:this.retShare}}debugJob(t,e,s,n){const a=t.map(h=>this.ring[h]),{x0:o,x1:r,ev:u}=this.wavesOf(a[1],s,n,!1);return{T:s,X:{S:a,...Yt(this.opt.mode,e)},events:u.events,dropped:u.dropped,miss:!1,red:ae(a[1],a[2],e),pt:this.ptOf(u.events,s,o,r)}}async debugRun(t,e,s,n,a){this.res=e,this.worker&&this.restart(),this.flush(),this.scene=s,this.key=JSON.stringify(s),this.lastT=null,this.start({tModel:n[0]+this.opt.dt}),this.pX||this.programs(t,{res:e,floatBlend:a}),this.askPrograms(1/0),this.inFlight=!0;for(const u of n)this.post({cmd:"state",id:++this.reqId,t:u,cull:null});const o=performance.now();for(;this.pending.length<n.length||!(this.tables||this.pendingTables)||!this.programReady();){if(this.stats.failed)throw new Error(this.stats.failed);if(performance.now()-o>12e4)throw new Error("zoneCurtain debugRun: no states after 120 s");await new Promise(u=>{this.waiters.push(u),setTimeout(u,100)})}const r=Q(t);try{this.take(t)}finally{j(t,r)}}readOut(t,e,s){const n=new Float32Array(s*z);return t.bindBuffer(t.ARRAY_BUFFER,this.out.buf),t.getBufferSubData(t.ARRAY_BUFFER,e*z*4,n),t.bindBuffer(t.ARRAY_BUFFER,null),n}readTarget(t,e){const s=new Float32Array(e.w*e.h*4);return t.bindFramebuffer(t.FRAMEBUFFER,e.fbo),t.readPixels(e.x0??0,e.y0??0,e.w,e.h,t.RGBA,t.FLOAT,s),s}}function ke(i,t=i.view.centerMm){const e=i.horizonFrame,s=i.view.point,n=i.view.skyFrame,a=i.geometry.focalMm;if(!e||!n)return null;const o=[t[0]/a,t[1]/a,1],r=[0,1,2].map(f=>s[f]*o[0]+s[3+f]*o[1]+s[6+f]*o[2]);if(!(r[2]>1e-6))return null;const u=[0,1,2].map(f=>n.axis[f]+r[0]/r[2]*n.west[f]+r[1]/r[2]*n.north[f]),h=Math.hypot(u[0],u[1],u[2]),c=f=>(u[0]*f[0]+u[1]*f[1]+u[2]*f[2])/h;return[c(e.east),c(e.north),c(e.zenith)]}const De={on:Ve(typeof location<"u"?location.search:null)},Ft=new WeakMap,zs=xe.prototype.active;xe.prototype.active=function(i){const t=zs.call(this,i),e=this;return Ft.delete(this),t&&e.prog===null&&e.state&&this.setup?.scene==="auroral-zone"&&(this.zoneCurtain?this.zoneCurtain.atlasActive:De.on)&&(Is(this,i,e.state),Ft.set(this,i)),t};function Is(i,t,e){if(Ft.get(i)===t)return i.zoneCurtain;const s=ke(t);if(!s)return i.zoneCurtain;let n=i.zoneCurtain;n||(n=i.zoneCurtain=new Us({fixedAtlas:De.on},void 0,$e({pinned:_t.zoneSeed,automated:typeof navigator<"u"&&navigator.webdriver===!0,reducedMotion:We(),random:Ke}),Ye(typeof location<"u"?location.search:null,typeof navigator<"u"&&navigator.webdriver===!0)),n.caps=Ds(t.gl,t.res,t.floatBlend),n.caps.reason&&(n.stats.failed=`capability: ${n.caps.reason}`),n.caps.reason&&console.warn("[zoneCurtain] this device cannot run the new curtain; the old aurora stays:",n.caps.reason));const a=t.geometry,o=2*Math.atan(a.cathodeRadiusMm/a.focalMm)*180/Math.PI,r=Ge(a.pitchMm,a.focalMm)*Math.atan(a.pitchMm/a.focalMm)*180/Math.PI,u=gs(t.gl),h=n.stats.frames,c=He.getState().view.integrationMs,f=c>0?c/1e3:qe;return n.frame({gl:t.gl,res:t.res,tModel:e.timeS-(i.setup?.startS??0),dir:s,fovDeg:o,level:e.level??0,seed:n.seed,floatBlend:t.floatBlend,dtSeconds:t.dtSeconds,lite:e.detail==="lite",pitchDeg:r,holdS:f}),u&&Ls(t.gl,u,n.stats.frames>h),n}const Ue={on:!1,sliceMs:[],otherMs:[],disjoint:0,queries:[]};function gs(i){const t=Ue;if(!t.on&&!t.queries.length)return null;const e=i.getExtension("EXT_disjoint_timer_query_webgl2");if(!e)return null;for(;t.queries.length;){const{q:n,slice:a}=t.queries[0];if(!i.getQueryParameter(n,i.QUERY_RESULT_AVAILABLE))break;t.queries.shift(),i.getParameter(e.GPU_DISJOINT_EXT)?t.disjoint++:(a?t.sliceMs:t.otherMs).push(Number(i.getQueryParameter(n,i.QUERY_RESULT))/1e6),i.deleteQuery(n)}if(!t.on||t.queries.length>=8)return null;const s=i.createQuery();return s&&i.beginQuery(e.TIME_ELAPSED_EXT,s),s}function Ls(i,t,e){const s=i.getExtension("EXT_disjoint_timer_query_webgl2");i.endQuery(s.TIME_ELAPSED_EXT),Ue.queries.push({q:t,slice:e})}function $s(i,t,e,s,n,a){const o=_t.zoneCurtainDebug>0?_t.zoneCurtainDebug:1;i.compose(t.gl,s.u_auRate,s.u_auClass,e.level??0,o,r=>{t.viewUniforms(r),t.bindHorizon(r,0),t.bindLut(r,1),t.res.bindTex(10,n,r,"u_auExt"),t.res.bindTex(11,a,r,"u_cloud"),pe(t.gl,r,{u_auExtOn:s.u_auExtOn,u_auRatioCap:s.u_auRatioCap,...Xe(e.cloud)})},()=>t.draw())}function Ys(i,t,e,s){const n=ke(t,[0,0]);if(!n)return;const a=t.geometry,o=Ze(e);i.meter(t.gl,{axis:n,radiusDeg:Math.atan(a.cathodeRadiusMm/a.focalMm)*180/Math.PI,level:e.level??0,cls:o.u_auClass,rates:e.rates,ext:e.extinction,bind:r=>{t.bindHorizon(r,0),t.bindLut(r,1),t.res.bindTex(4,s,r,"u_auExt"),pe(t.gl,r,{u_auExtOn:o.u_auExtOn})}})}export{ke as viewAxisEnu,De as zoneAtlas,$s as zoneCompose,Is as zoneFrame,Ue as zoneGpuTimer,Ys as zoneMeter};
