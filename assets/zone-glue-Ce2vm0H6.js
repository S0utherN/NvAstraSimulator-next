import{c$ as O,d0 as Ce,d1 as U,d2 as oe,d3 as ue,d4 as Pe,d5 as Be,d6 as ke,d7 as I,d8 as ce,d9 as Ue,cM as De,da as Oe,b as Ie,bA as ge,db as Le}from"./boot-DeoC7ls4.js";import{F as _t}from"./app-BtxufmaN.js";import{N as P,b as Q,G as ze,c as g,d as Ge,H as Ft,e as he,h as fe,u as le,r as y,p as Z,s as K,f as Xe,g as de,l as Ct,C as me,R as pe,Z as W}from"./levels-BzEYxaKo.js";import"./vendor-DHsdD_W9.js";import"./hosting-Dfo1Phyr.js";import"./error-log-dzmUGNEi.js";function He(e){return e.pinned!==null?e.pinned>>>0:e.automated||e.reducedMotion?0:e.random()>>>0}function We(e,t){const s=e?new URLSearchParams(e).get("zoneWeather"):null;return s==="0"?!1:s==="1"?!0:!t}function qe(){try{const e=new Uint32Array(1);return crypto.getRandomValues(e),e[0]}catch{return Math.floor(Math.random()*4294967296)>>>0}}const $e=20,Ze=.25,Ve=6,Ye=61,Qe=(e,t)=>{const s=Q*t,i=e*(2*Q+e);return i/(s+Math.sqrt(s*s+i))},Ke=e=>new Float32Array(e*P*2).fill(1),Pt=[116,109,102,96],Bt=[30,26,22,18],je=3.5;function Je(e){const t=de(e,0,1)*3,s=Math.min(2,Math.floor(t)),i=t-s;return{peak:Ct(Pt[s],Pt[s+1],i),up:Ct(Bt[s],Bt[s+1],i),lo:je}}const ts=e=>1/(1+Math.exp(-(e-101)/2.5)),es=e=>1-K((e-(Xe-30))/30),kt=2.2,Ut=4.5,Dt=1.6,Ot=Math.sqrt(Math.PI/2);function ss(e,t,s){const i=e-t.peak,n=i>=0?Math.exp(-i/t.up):Math.exp(-.5*(i/kt)**2),r=i>=0?Math.exp(-.5*(i/Ut)**2):Math.exp(-.5*(i/Dt)**2);return(1-s)*n+s*(kt*Ot+t.up)/((Dt+Ut)*Ot)*r}const It=20,is=120,ns=e=>de(.3+.6*e,.3,.85),rs=.8;function as(e,t,s){const i=e-(t.peak+1+12*s*s);return i<=0?0:(1-Math.exp(-i/(6+8*s)))*Math.exp(-i/(It+(is-It)*s))}let ct=null;function os(){if(ct)return ct;const e=Ge,t=[new Float32Array(P*e),new Float32Array(P*e)],s=[new Float32Array(P*g*e),new Float32Array(P*g*e)];for(let i=0;i<P;i++){const n=i/(P-1),r=Je(n),o=ns(n);r.up*=rs;for(let a=0;a<e;a++){const u=Ft+a*he,c=es(u),h=ts(u),f=ss(u,r,o)*c;t[0][i*e+a]=f,t[1][i*e+a]=f*h;for(let l=0;l<g;l++){const d=as(u,r,l/(g-1))*c,m=(i*g+l)*e+a;s[0][m]=d,s[1][m]=d*h}}}return ct={n:e,low:t,ray:s,nlam:g}}const us=1;function cs(e,t,s,i,n){const r=e.pulse5,o=[];if(r==null)return o;const a=Math.ceil((360/r.vz[0]+3)/r.P)+1;for(let u=Math.floor(t/r.P)-a;u<=Math.floor(t/r.P)+1;u++)for(let c=Math.floor((i-500)/r.cell);c<=Math.floor((n+500)/r.cell);c++){const h=fe(c,u,7331+101*s);le(h)>=r.prob||o.push({t0:(u+.8*y(h,1))*r.P,vz:Z(r.vz,y(h,2)),amp:r.amp*(.6+.4*y(h,3)),xc:(c+y(h,4))*r.cell,w:Z(r.w,y(h,5)),lag:(y(h,6)<.5?-1:1)*Z(r.lag,y(h,7))/100})}return o}const Ee=70,be=.25,j=1401;function hs(e){const t=os(),s=t.n,i=new Float32Array(j),n=e.pulse5;if(!n)return i;const r=Math.round(e.hard0*(P-1)),o=t.low[0],a=t.ray[0],u=(r*g+3)*s;let c=0;for(let h=0;h<s;h++)c+=o[r*s+h]+.15*a[u+h];for(let h=0;h<j;h++){const f=Ee+h*be;let l=0;for(let d=0;d<s;d++){const m=Ft+d*he;l+=(o[r*s+d]+.15*a[u+d])*ze((m-f)/n.sig)}i[h]=l/c}return i}function ht(e,t,s,i,n,r=16){if(!e.pulse5||t.noPulse||t.ticks)return{events:[],dropped:0};const o=cs(e,s,t.seed??0,i,n).filter(a=>{const u=Math.max(i,a.xc-2.8*a.w),c=Math.min(n,a.xc+2.8*a.w);return c>=u?[u,c,Math.min(c,Math.max(u,a.xc))].some(h=>{const f=s-(a.t0+(h-a.xc)*a.lag);return f>0&&70+a.vz*f<=420}):!1});return o.sort((a,u)=>u.amp-a.amp),{events:o.slice(0,r),dropped:Math.max(0,o.length-r)}}const z=8,V=256;function gt(){return O.map(e=>Ce(e))}function Lt(e){const t=[];for(let s=0;s<e.length;s++)(e[s]===0||e[s]===1)&&t.push(s);if(t.length>4)throw new RangeError("zoneMeterChannels: more than four main-curtain components");return t}function zt(e){for(let t=0;t<e.length;t++)if(e[t]===2)return t;return-1}function fs(e,t,s){const i=Math.PI/180,n=Math.tan(Math.min(80,Math.max(.01,e))*i),r=z,o=s??Math.min(V,Math.max(4*r,Math.ceil(2*n/Math.tan(Math.max(.001,t)*i)/r)*r));if(o%r||o>V)throw new RangeError(`zoneMeterGrid: side ${o} not a multiple of ${r} up to ${V}`);let a=0;for(let u=0;u<o;u++)for(let c=0;c<o;c++)ls(c,u,o)&&a++;return{n:o,tanR:n,count:a}}const ls=(e,t,s)=>{const i=2*e+1-s,n=2*t+1-s;return i*i+n*n<=s*s};function ds(e){const t=Math.hypot(e[0],e[1],e[2]),s=[e[0]/t,e[1]/t,e[2]/t];let i=s[1],n=-s[0];const r=Math.hypot(i,n);return r<1e-6?(i=1,n=0):(i/=r,n/=r),{F:s,R:[i,n,0],U:[n*s[2],-i*s[2],i*s[1]-n*s[0]]}}function ft(e){if(!e.length)return null;const t=O.length,s=new Float64Array(t),i=new Float64Array(t);let n=0;for(const r of e){const o=r.A??r.B,a=r.B??r.A;if(!o||!a){n++;continue}const u=Math.min(1,Math.max(0,r.alpha)),c=Math.max(0,r.share);for(let h=0;h<t;h++){const f=o.count?o.sums[h]/o.count:0,l=a.count?a.sums[h]/a.count:0;s[h]=s[h]+c*((1-u)*f+u*l),i[h]=i[h]+c*((1-u)*o.box[h]+u*a.box[h])}}return{means:s,box:i,pending:n}}const ms=(e,t)=>O.map(s=>t[s]>0?e[s]*t[s]:0);function Gt(e,t,s,i,n){ms(e,t);let r=0,o=0;i&&O.forEach((u,c)=>{(s[c]===0||s[c]===1||s[c]===2)&&(r+=e[u]*i.means[c],o+=e[u]*i.box[c])});const a=ps();return{mean:r+a.mean,peak:o+a.peak}}function ps(e,t,s){return{mean:0,peak:0}}const Es=[{cell:2.4,epoch:5,prob:.6,w:[.18,.45],lnS:.9,life:[5,14],drift:.15,seed:61},{cell:6.8,epoch:8,prob:.55,w:[.35,.9],lnS:.6,life:[8,22],drift:.12,seed:62}];let xe=1,ve=1;function bs(e,t,s=0,i={f:0,lam:0,fb:0}){let n=0,r=0,o=0;for(const a of Es){const u=Math.ceil(a.life[1]/a.epoch)+1,c=Math.floor(e/a.cell);for(let h=Math.floor(t/a.epoch)-u;h<=Math.floor(t/a.epoch);h++)for(let f=c-2;f<=c+2;f++){const l=fe(f,h,9e3+a.seed+131*s);if(le(l)>=a.prob)continue;const d=(h+y(l,1))*a.epoch,m=Z(a.life,y(l,2)),p=(t-d)/m;if(!(p>0&&p<1))continue;const b=(f+y(l,3))*a.cell+a.drift*(2*y(l,4)-1)*(t-d),R=Z(a.w,y(l,5)),E=(e-b)/R;if(E*E>16)continue;const A=Math.sqrt(-2*Math.log(Math.max(1e-9,y(l,6))))*Math.cos(2*Math.PI*y(l,7)),T=Math.exp(a.lnS*A-.5*a.lnS*a.lnS)*K(p/.25)*(1-K((p-.7)/.3)),w=T*Math.exp(-.5*E*E),x=y(l,8);n+=w,r+=w*x*x*x,a.cell>5&&(o+=w)}}return i.f=n*xe,i.fb=o*ve,i.lam=n>1e-9?r/n:.3,i}{let e=0,t=0,s=0;const i={f:0,lam:0,fb:0};for(let n=0;n<6e3;n++)bs(n*.731+13,50+n*.37,0,i),e+=i.f,t+=i.fb,s++;xe=s/e,ve=s/t}const S={DX:8,HALF:720,SIG_N:16,HP:62,H0:150,H1:620,NSEG:24,TAU_RAD:110,Q200:.098,QH:42},nt=Math.round(2*S.HALF/S.DX)+1,xs=e=>1/(1/S.TAU_RAD+S.Q200*Math.exp(-(e-200)/S.QH)),vs=e=>e<=S.H0?0:K((e-S.H0)/20)*Math.exp(-(e-S.H0)/S.HP)*(xs(e)/S.TAU_RAD)*(1-K((e-(S.H1-60))/60));let lt=null;function Rs(){if(lt)return lt;const e=S,t=4700,s=(e.H1-e.H0)/t,i=new Float64Array(t+1);for(let o=0;o<t;o++)i[o+1]=i[o]+vs(e.H0+(o+.5)*s)*s;const n=[];let r=0;for(let o=0;o<e.NSEG;o++){const a=i[t]*(o+.5)/e.NSEG;for(;i[r+1]<a;)r++;n.push(e.H0+(r+(a-i[r])/(i[r+1]-i[r]))*s)}return lt={mid:n,norm:i[t]}}const Re=.06,Ts=8,ut=2,Y=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],St=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],rt=e=>{const t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]};function As(e){const t={axis:[0,0,1],rate:0};if(e.length<2)return t;const s=e[0],i=e[e.length-1],n=(i.t-s.t)/1e3;if(!(n>.001))return t;const r=St(s.d,i.d),o=Math.hypot(r[0],r[1],r[2]),a=Math.atan2(o,Y(s.d,i.d))*180/Math.PI;return o>1e-9?{axis:[r[0]/o,r[1]/o,r[2]/o],rate:a/n}:t}function $(e,t,s){const i=s*Math.PI/180,n=Math.cos(i),r=Math.sin(i),o=Y(t,e),a=St(t,e);return rt([e[0]*n+a[0]*r+t[0]*o*(1-n),e[1]*n+a[1]*r+t[1]*o*(1-n),e[2]*n+a[2]*r+t[2]*o*(1-n)])}const _s=1.25,Xt=10;function Ht(e,t,s){if(!(e>=ut))return{moving:!1,N:s,pitchScale:1,marginDeg:5,leadDeg:0};const i=Math.min(s,Math.max(8,Math.round(.25/Math.max(.001,t))));return{moving:!0,N:i,pitchScale:_s,marginDeg:Math.min(30,5+e*i*t+1),leadDeg:Math.min(45,e*2*i*t)}}function ws(e,t){return t.rate>=ut?{f:$(e,t.axis,Math.min(60,t.rate*.75)),extraDeg:Math.min(75,t.rate*.8)}:{f:[e[0],e[1],e[2]],extraDeg:0}}function dt(e,t){const s=Y(t,e.f);if(!(s>.001))return 0;const i=Math.max(Math.abs(Y(t,e.r)/(s*e.tanH)),Math.abs(Y(t,e.up)/(s*e.tanH)));if(i>1)return 0;const n=Math.min(1,Math.max(0,(1-i)/Re));return Math.max(1e-6,n*n*(3-2*n))}const Te=(e,t)=>Math.min(1,Math.max(0,e*Math.max(1,t)/Math.min(Ts,Math.max(1,t))));function Ms(e,t,s,i,n){if(e>=1&&t>=1)return{a:1-i,b:i,c:0};const r=e*(1-i),o=t*(n+(i-n)*e);return{a:r,b:o,c:Math.max(0,1-r-o)*s}}function mt(e,t,s,i,n,r,o,a=25){const u=rt(e),c=Math.hypot(u[0],u[1])>1e-6?rt([u[1],-u[0],0]):[1,0,0],h=St(c,u),f=Math.tan(t),l=Te(r,o),d={n:0,nA:0,nB:0,nC:0,sA:0,sB:0,sC:0,none:0,fallbackOnly:0,shown:0};for(let p=0;p<a;p++)for(let b=0;b<a;b++){const R=(2*b+1-a)/a,E=(2*p+1-a)/a;if(R*R+E*E>1)continue;const A=rt([u[0]+f*(R*c[0]+E*h[0]),u[1]+f*(R*c[1]+E*h[1]),u[2]+f*(R*c[2]+E*h[2])]),T=s?dt(s,A):0,w=i?dt(i,A):0,x=n?dt(n,A):0,_=Ms(T,w,x,r,l);d.n++,T>0&&d.nA++,w>0&&d.nB++,x>0&&d.nC++,d.sA+=_.a,d.sB+=_.b,d.sC+=_.c,T<=0&&w<=0&&x<=0?d.none++:T<=0&&w<=0&&d.fallbackOnly++,d.shown+=_.a+_.b+_.c}const m=Math.max(1,d.n);return d.none/=m,d.fallbackOnly/=m,d.shown/=m,d}function Fs(e,t,s,i,n){const r=O.length,o=new Float64Array(r),a=new Float64Array(r),u=t??s,c=s??t;let h=u&&c?0:1;const f=[[u,e.nA?e.sA/e.nA:0],[c,e.nB?e.sB/e.nB:0],[i,e.nC?e.sC/e.nC:0]];e.sC>0&&!i&&h++;for(const[l,d]of f)if(!(!l||!(d>0)))for(let m=0;m<r;m++)o[m]=o[m]+n*d*(l.count?l.sums[m]/l.count:0),a[m]=a[m]+n*d*l.box[m];return{means:o,box:a,pending:h}}const F=e=>{const t=String(e);return/[.eE]/.test(t)?t:t+".0"},wt=[];for(const e of[-1,1])for(const t of[-1,1])for(const s of[-1,1])wt.push(`c ${e<0?"-":"+"} A ${t<0?"-":"+"} E ${s<0?"-":"+"} N`);const pt=["rPL0","rPL1","rPF00","rPF01","rPF10","rPF11"],Et=["rGL0","rGL1","rGF00","rGF01","rGF10","rGF11"],Ss=["wl0","wl1","wf00","wf01","wf10","wf11"],X=(e,t)=>e.map((s,i)=>`${Ss[i]} * cf(${s}, ${t}.0, yy)`).join(" + "),ys=U+`out vec4 o; void main() { o = vec4(0.0); }
`,Ns=U+`
uniform sampler2D uT;
out vec4 o;
void main() { o = vec4(textureLod(uT, vec2(0.5, 0.5), 0.0).r, 0.25, 0.0, 0.0); }
`,Cs=U+`
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
const float RE = ${F(Q)}, REFH = ${F(pe)}, COTD = ${me}, HLO = ${F(Ft)}, NCH = ${F(P)}, TWO_PI = 6.283185307179586;
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
  vP0 = ${X(pt,0)};
  vG0 = ${X(Et,0)};
  if (info.y > 1.5) {
    vP1 = ${X(pt,1)};
    vG1 = ${X(Et,1)};
  }
  if (info.y > 2.5) {
    vP2 = ${X(pt,2)};
    vG2 = ${X(Et,2)};
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
${wt.map((e,t)=>`  vec3 p${t} = pj(${e});`).join(`
`)}
  float zmin = min(min(min(p0.z, p1.z), min(p2.z, p3.z)), min(min(p4.z, p5.z), min(p6.z, p7.z)));
  float zmax = max(max(max(p0.z, p1.z), max(p2.z, p3.z)), max(max(p4.z, p5.z), max(p6.z, p7.z)));
  vec3 q0 = pj(c - A), q1 = pj(c + A);
  vec2 ax = q1.xy - q0.xy;
  float axl = length(ax);
  vec2 dr = axl > 1e-6 ? ax / axl : vec2(1.0, 0.0);
  vec2 pr = vec2(-dr.y, dr.x);
${[0,1,2,3,4,5,6,7].map(e=>`  vec2 s${e} = vec2(dot(p${e}.xy, dr), dot(p${e}.xy, pr));`).join(`
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
${wt.map((e,t)=>`  vec4 o${t} = outs(${e});`).join(`
`)}
  vec4 om = min(min(min(o0, o1), min(o2, o3)), min(min(o4, o5), min(o6, o7)));
  if (max(max(om.x, om.y), max(om.z, om.w)) > 0.0) mode = 2.0;
  vQa = vec4(lo, hi); vQb = vec4(dr, info.y, mode);
}
`,Ps=["vRx","vRy","vAn","vP0","vP1","vP2","vG0","vG1","vG2","vQa","vQb","vPx"],D=48,Bs=U+`
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
`,k=16,ks=U+`
uniform vec3 uF, uR, uU;
uniform float uTanH, uSize, uBW, uN, uCut2;
uniform sampler2D uTab;
uniform vec4 uTabD;
uniform float uTexH;
uniform int uNE;
uniform vec4 uE[${2*k}];
uniform float uPInv, uPCons;
uniform sampler2D uRef;
flat in vec4 vRx, vRy, vAn, vP0, vP1, vP2, vG0, vG1, vG2, vPx;
flat in float vCh;
out vec4 oCol;
const float RE = ${F(Q)}, SQ_PI_2 = 1.2533141373155003, NZF = ${$e.toFixed(1)}, ZST = ${Ze}, POCT = ${Ve.toFixed(1)}, SMAX = ${(Ye-1).toFixed(1)};
const float REF_HW0 = ${F(Ee)}, REF_STEP = ${F(be)}, REF_MAX = ${F(j-1)};
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
    for (int i = 0; i < ${k}; i++) {
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
`,Ae=`
vec4 bil(sampler2D t, vec2 u, float n) {
  vec2 x = u - 0.5, i = clamp(floor(x), vec2(0.0), vec2(n - 2.0)), f = clamp(x - i, 0.0, 1.0);
  ivec2 p = ivec2(i);
  vec4 a = texelFetch(t, p, 0), b = texelFetch(t, p + ivec2(1, 0), 0), c = texelFetch(t, p + ivec2(0, 1), 0), d = texelFetch(t, p + ivec2(1, 1), 0);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
// Task AX item 3b (zone-curtain-gl.md §AF): the core map magnified 4–5 times onto the fine cells bilinearly drew a slanted
// ray's edge as steps of a map cell; Catmull–Rom (interpolating: the cells' own values kept, its integral the cells' sum)
// draws it smooth. 16 texelFetch, written out (no arrays); clamped at the map's edge; negative undershoot set to 0. uCubic 0:
// the bilinear (checks; the meter and the display set it alike).
uniform float uCubic;
vec4 crRow(sampler2D t, int y, int x0, int m, vec4 w) {
  return w.x * texelFetch(t, ivec2(clamp(x0 - 1, 0, m), y), 0) + w.y * texelFetch(t, ivec2(clamp(x0, 0, m), y), 0)
    + w.z * texelFetch(t, ivec2(clamp(x0 + 1, 0, m), y), 0) + w.w * texelFetch(t, ivec2(clamp(x0 + 2, 0, m), y), 0);
}
vec4 crW(float f) { return vec4(f * (-0.5 + f * (1.0 - 0.5 * f)), 1.0 + f * f * (-2.5 + 1.5 * f), f * (0.5 + f * (2.0 - 1.5 * f)), f * f * (-0.5 + 0.5 * f)); }
vec4 cub(sampler2D t, vec2 u, float n) {
  if (uCubic < 0.5) return bil(t, u, n);
  vec2 x = u - 0.5, i = floor(x), f = x - i;
  vec4 wx = crW(f.x), wy = crW(f.y);
  int m = int(n) - 1, x0 = int(i.x), y0 = int(i.y);
  vec4 s = wy.x * crRow(t, clamp(y0 - 1, 0, m), x0, m, wx) + wy.y * crRow(t, clamp(y0, 0, m), x0, m, wx)
    + wy.z * crRow(t, clamp(y0 + 1, 0, m), x0, m, wx) + wy.w * crRow(t, clamp(y0 + 2, 0, m), x0, m, wx);
  return max(s, vec4(0.0));
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
  vec4 e = bil(E, 0.5 * u, 0.5 * T.y);
  gS = vec4(cub(C, u, T.y).xy + e.xy, e.z, 1.0);
  float r = clamp((1.0 - m) * ${F(1/Re)}, 0.0, 1.0);
  return max(1e-6, r * r * (3.0 - 2.0 * r));
}
`,_e=Ae+`uniform vec3 aF, aR, aU, bF, bR, bU, cF, cR, cU;
uniform vec2 aT, bT, cT;
uniform sampler2D aC, aE, bC, bE, cC, cE;
uniform float uAlpha, uReveal, uHasC, uKC;
// The two finished maps crossfaded by α (DISP6_FS), task AX (sim/zone-curtain/follow.ts displayWeights, the same
// arithmetic): both whole → mix(A, B, α), as before; else A at ea·(1 − α), B at eb·mix(ρ, α, ea) — sky only the newer B
// covers (a drag uncovered it) comes in with the reveal ρ, not the crossfade — and the fallback map C (uHasC) fills the
// rest with its own edge weight (× uKC: its kR over A's, the pattern being per kR and the composition at A's). xyz: prompt,
// 557.7, 630.0; w: the weight shown (1: whole).
vec4 mapsAt(vec3 d) {
  float ea = samp(d, aF, aR, aU, aT, aC, aE); vec4 A = gS;
  float eb = samp(d, bF, bR, bU, bT, bC, bE); vec4 B = gS;
  if (ea >= 1.0 && eb >= 1.0) return vec4(mix(A.xyz, B.xyz, uAlpha), 1.0);
  float wa = ea * (1.0 - uAlpha), wb = eb * mix(uReveal, uAlpha, ea);
  vec3 v = wa * A.xyz + wb * B.xyz;
  float w = wa + wb;
  if (uHasC > 0.5 && w < 1.0) { float ec = samp(d, cF, cR, cU, cT, cC, cE); float wc = (1.0 - w) * ec; v += wc * uKC * gS.xyz; w += wc; }
  return vec4(v, w);
}
`,Us=U+`
uniform vec3 uF, uR, uU;
uniform float uTanH, uSize;
out vec4 o;
`+_e+`
void main() {
  float px = (2.0 * gl_FragCoord.x / uSize - 1.0) * uTanH, py = (2.0 * gl_FragCoord.y / uSize - 1.0) * uTanH;
  o = mapsAt(normalize(uF + px * uR + py * uU));
}
`,Ds=oe("STAR_SKY")+ue+Pe+Be+`
uniform float uRate[5];
uniform int uClass[5];
uniform sampler2D u_auExt;
uniform int u_auExtOn;
uniform float u_auRatioCap;
out vec4 o;
`+_e+`
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
`,Os=U+`
uniform vec3 uF, uR, uU;
uniform float uTanH, uSize;
uniform sampler2D uLine;
uniform vec2 uObs;
out vec4 oCol;
const float RE = ${F(Q)}, REFH = ${F(pe)}, COTD = ${me}, X0 = ${F(-720)}, DXL = ${F(S.DX)}, FMAX = ${F(nt-1.001)}, SIGN = ${F(S.SIG_N)};
const float NORM = ${F(1/(Math.sqrt(2*Math.PI)*S.SIG_N*S.NSEG))};
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
${Rs().mid.map(e=>`  I += redAt(${F(e)});`).join(`
`)}
  oCol = vec4(0.0, 0.0, I * NORM, 0.0);
}
`,Is=`
uniform sampler2D u_auExt;
uniform int u_auExtOn;
float auExt(int c, float x) {
  if (u_auExtOn == 0) return 1.0;
  int i0 = int(floor(x)), i1 = min(i0 + 1, u_hzNodes - 1);
  return mix(texelFetch(u_auExt, ivec2(i0, c), 0).r, texelFetch(u_auExt, ivec2(i1, c), 0).r, x - float(i0));
}
`,gs=oe("STAR_SKY")+ue+`
uniform vec3 uMF, uMR, uMU;
uniform float uTanR, uN;
uniform vec3 mF, mR, mU;
uniform vec2 mT;
uniform sampler2D mC, mE;
uniform int uComp[4], uCls[4];
uniform float uK[4];
out vec4 o;
`+Is+Ae+`
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
`,Ls=U+`
uniform sampler2D uS;
uniform float uN;
uniform vec4 uW;
out vec4 o;
vec4 at(ivec2 q, int n) { return q.x < 0 || q.y < 0 || q.x >= n || q.y >= n ? vec4(0.0) : texelFetch(uS, q, 0); }
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  int blk = p.x / 3, kind = p.x - 3 * blk, n = int(uN);
  ivec2 b0 = ivec2(blk, p.y) * ${z};
  vec4 s = vec4(0.0), bb = vec4(0.0);
  float best = -1.0, cnt = 0.0;
  for (int j = 0; j < ${z}; j++) for (int i = 0; i < ${z}; i++) {
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
`,zs=U+`
uniform sampler2D uB;
uniform int uNB, uOff;
out vec4 o;
void main() {
  int kind = int(gl_FragCoord.x) - uOff;
  vec4 s = vec4(0.0), bb = vec4(0.0);
  float best = -1.0, cnt = 0.0;
  for (int j = 0; j < ${V/z}; j++) {
    if (j >= uNB) break;
    for (int i = 0; i < ${V/z}; i++) {
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
`,bt={maxTextureSize:4096,maxVertexAttribs:13,maxTfInterleaved:D,maxVertexTextureUnits:3,maxTextureUnits:16,maxFragmentUniformVectors:64,maxVertexUniformVectors:64},Wt={filter:.02,blend:.001},yt=e=>e?"rgba32f":"rgba16f",Gs={maxTextureSize:"MAX_TEXTURE_SIZE",maxVertexAttribs:"MAX_VERTEX_ATTRIBS",maxTfInterleaved:"MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS",maxVertexTextureUnits:"MAX_VERTEX_TEXTURE_IMAGE_UNITS",maxTextureUnits:"MAX_TEXTURE_IMAGE_UNITS",maxFragmentUniformVectors:"MAX_FRAGMENT_UNIFORM_VECTORS",maxVertexUniformVectors:"MAX_VERTEX_UNIFORM_VECTORS"};function qt(e){if(!e.colorBufferFloat)return"EXT_color_buffer_float missing (float colour targets)";if(!e.fence)return"fenceSync missing (the meter's read-back)";for(const t of Object.keys(bt))if(!(e[t]>=bt[t]))return`${Gs[t]} ${e[t]} < ${bt[t]}`;return e.probeError?`probe: ${e.probeError}`:e.filterProbe===null||!(Math.abs(e.filterProbe-.5)<=Wt.filter)?`RGBA16F linear filtering: probe ${e.filterProbe} (0.5 expected)`:e.blendProbe===null||!(Math.abs(e.blendProbe-.5)<=Wt.blend)?`additive blending into ${yt(e.floatBlend).toUpperCase()}: probe ${e.blendProbe} (0.5 expected)`:null}const $t=.5,Xs=8,Hs=e=>Math.min(Math.max(0,e),$t/Xs)/$t;function Ws(e){const t=ke("auroral-zone",e);return O.map(s=>t[s])}function xt(e,t,s,i,n,r=1){const o=e.length,a=new Float32Array(o),u=new Float32Array(o),c=Math.min(1,Math.max(0,n));for(let h=0;h<o;h++){const f=t[h]===0||t[h]===1||t[h]===2,l=s[h];a[h]=f&&l>0?e[h]*(i/l)*c*r:0,u[h]=f?e[h]*(1-c):e[h]}return{map:a,coarse:u}}const N=12,C=["core","env","glow"],qs=e=>[(-e*e*e+2*e*e-e)/2,(3*e*e*e-5*e*e+2)/2,(-3*e*e*e+4*e*e+e)/2,(e*e*e-e*e)/2],vt=(e,t)=>({w:e==="linear"?[0,1-t,t,0]:qs(t),u2:t,wc:e==="cubicw"?1:0});function $s(e,t,s,i){const n=Math.PI/180,r=e*n,o=t*n,a=[Math.sin(r)*Math.cos(o),Math.cos(r)*Math.cos(o),Math.sin(o)],u=[Math.cos(r),-Math.sin(r),0],c=[a[1]*u[2]-a[2]*u[1],a[2]*u[0]-a[0]*u[2],a[0]*u[1]-a[1]*u[0]].map(f=>-f),h=c[2]<0?c.map(f=>-f):c;return{f:a,r:u,up:h,tanH:Math.tan(.5*s*n),size:i}}function Zt(e,t,s,i,n=5,r=1){const o=Math.PI/180,a=Math.tan(.5*s*o),u=Math.min(80,.5*s+n),c=Math.tan(u*o),h=2*Math.max(2,Math.round(.5*i*r*c/a));return $s(e,t,2*u,h)}const we=[8,12,16,24],Vt=2.6,Zs=.75,Yt=3,Vs=16,Ys=6,Qs=40,Qt=55,Ks=40,Kt=(e=we[0])=>({n:e,down:0,changes:0});function jt(e){if(e.length<Ys)return null;const t=[...e].sort((s,i)=>s-i);return t[t.length>>1]}function js(e,t,s){const i=we,n=i.indexOf(e.n);if(n<0||t===null)return e;const r=c=>({n:c,down:0,changes:e.changes+(c!==e.n?1:0)});if(t!==void 0){const c=l=>i.find(d=>t/d<=l)??i[i.length-1],h=c(Vt),f=c(Vt*Zs);return h>e.n?r(h):f<e.n?e.down+1>=Yt?r(i[n-1]):{...e,down:e.down+1}:e.down?{...e,down:0}:e}if(s>1/Qs&&n<i.length-1)return{...r(i[n+1]),cool:Ks};const o=e.cool??0,a=Math.max(0,o-1),u=c=>o?{...c,cool:a}:c;return o>0&&s<1/Qt?{...e,down:0,cool:a}:s<1/Qt&&n>0?e.down+1>=Yt?r(i[n-1]):u({...e,down:e.down+1}):e.down||o?u({...e,down:0}):e}const Js=12,ti=1.6,ei=.25,si=.3,ii=Math.LN2/.4;function ni(e,t,s,i,n=Js,r=ti){const o=Math.max(0,i-e.t),a=-Math.expm1(-o/n),u=Math.exp(-o/ei),c=Math.exp(ii*o),h=(f,l)=>{if(!(l>0)||!(f>0))return Math.max(0,l);const d=f+a*(l-f),m=l*r,p=l/r,b=d>m?m+(d-m)*u:d<p?p-(p-d)*u:d;return Math.min(f*c,Math.max(f/c,b))};return{t:i,mean:h(e.mean,t),peak:h(e.peak,s)}}const ri=6,st={N:8,dt:.25,margin:5,envBands:16,cut:4,mode:"cubic",maxMapSize:512,pitchDegMax:.25},ai=16,Mt=3,L=6,Jt=16*L*Mt,it=(e,t)=>{e.push(t),e.length>600&&e.shift()};function Rt(e,t,s){const i=e.msg.red,n=t.msg.red;if(!i||!n)return null;const r=i.A.length,o=new Float32Array(r),a=new Float32Array(r);for(let u=0;u<r;u++)o[u]=i.A[u]+(n.A[u]-i.A[u])*s,a[u]=i.Y[u]+(n.Y[u]-i.Y[u])*s;return{A:o,Y:a}}const te=3,oi=30,ui=38,Me=40,ci=16,ee=2e3,hi=10,fi=400,q=2,li=.2,di=4,se=2,mi=8,H=[.25,1/3,.5],pi=.75,Ei=.4,ie=12,bi=3e3,ne=()=>({worker:null,asked:!1,pending:null,cam:null,askedAt:0,state:null,acc:null,job:null,slice:0,N:Me,map:null,builtAt:0,moving:!1,reqId:-1,drop:-1});let Tt=null;function xi(e,t){const s=e.createProgram(),i=!!e.getExtension("KHR_parallel_shader_compile");t.programs.add(s);const n=[[e.VERTEX_SHADER,Cs],[e.FRAGMENT_SHADER,ys]].map(([h,f])=>{const l=e.createShader(h);return e.shaderSource(l,f),e.compileShader(l),e.attachShader(s,l),{s:l}});e.transformFeedbackVaryings(s,Ps,e.INTERLEAVED_ATTRIBS),e.linkProgram(s);let r=!1,o=null;const a=()=>!i||e.getProgramParameter(s,37297)===!0;t.deferred.set(s,{shaders:n,ready:a});const u=()=>{if(!(r||o||!n.length))try{for(const{s:h}of n)if(!e.getShaderParameter(h,e.COMPILE_STATUS))throw new Error(`zoneCurtainExpand compile: ${e.getShaderInfoLog(h)}`);if(!e.getProgramParameter(s,e.LINK_STATUS))throw new Error(`zoneCurtainExpand link: ${e.getProgramInfoLog(s)}`);r=!0}catch(h){o=h instanceof Error?h:new Error(String(h))}finally{for(const{s:h}of n)e.getAttachedShaders(s)?.includes(h)&&e.detachShader(s,h),e.deleteShader(h);n.length=0,t.deferred.delete(s)}},c=new Map;return{prog:s,loc:{get:h=>(c.has(h)||c.set(h,e.getUniformLocation(s,h)),c.get(h))},done:()=>r||o!==null||a(),check:()=>{if(u(),o)throw o}}}const re=120,vi=1e3,Ri=30,Ti=e=>[{set:"core",tgt:"core",tab:0,pulse:1},{set:"env",tgt:"env",tab:e,pulse:1},{set:"glow",tgt:"env",tab:e,pulse:0}],ae=new Float32Array([0,0,1,0,0,1,1,1]),Fe=(e,t)=>({level:Math.min(3,Math.max(0,Math.round(e))),seed:t}),Ai=(e,t)=>({...Fe(e,t),weather:{seed:t}});function At(e,t,s,i,n){const r=[];for(let o=0;o<e.length;o+=ri){const a={t0:e[o],vz:e[o+1],amp:e[o+2],xc:e[o+3],w:e[o+4],lag:e[o+5]},u=Math.max(s,a.xc-2.8*a.w),c=Math.min(i,a.xc+2.8*a.w);c>=u&&[u,c,Math.min(c,Math.max(u,a.xc))].some(h=>{const f=t-(a.t0+(h-a.xc)*a.lag);return f>0&&70+a.vz*f<=420})&&r.push(a)}return r.sort((o,a)=>a.amp-o.amp),{events:r.slice(0,n),dropped:Math.max(0,r.length-n)}}const Se=[0,1,2,15];function at(e){const t=n=>e.getParameter(n),s=t(e.ACTIVE_TEXTURE),i=Se.map(n=>(e.activeTexture(e.TEXTURE0+n),t(e.TEXTURE_BINDING_2D)));return e.activeTexture(s),{prog:t(e.CURRENT_PROGRAM),vao:t(e.VERTEX_ARRAY_BINDING),array:t(e.ARRAY_BUFFER_BINDING),copyRead:t(e.COPY_READ_BUFFER_BINDING),copyWrite:t(e.COPY_WRITE_BUFFER_BINDING),tfo:t(e.TRANSFORM_FEEDBACK_BINDING),tfBuffer:t(e.TRANSFORM_FEEDBACK_BUFFER_BINDING),discard:e.isEnabled(e.RASTERIZER_DISCARD),blend:e.isEnabled(e.BLEND),viewport:t(e.VIEWPORT),scissor:e.isEnabled(e.SCISSOR_TEST),drawFb:t(e.DRAW_FRAMEBUFFER_BINDING),readFb:t(e.READ_FRAMEBUFFER_BINDING),cull:e.isEnabled(e.CULL_FACE),depth:e.isEnabled(e.DEPTH_TEST),unpack:t(e.UNPACK_ALIGNMENT),unit:s,tex:i}}function ot(e,t){if(e.isContextLost()||!t.viewport)return;const s=(i,n)=>{n?e.enable(i):e.disable(i)};s(e.RASTERIZER_DISCARD,t.discard),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,t.tfo),e.bindBuffer(e.TRANSFORM_FEEDBACK_BUFFER,t.tfBuffer),e.bindVertexArray(t.vao),e.bindBuffer(e.ARRAY_BUFFER,t.array),e.bindBuffer(e.COPY_READ_BUFFER,t.copyRead),e.bindBuffer(e.COPY_WRITE_BUFFER,t.copyWrite),e.vertexAttrib4f(12,0,0,0,1),e.useProgram(t.prog),s(e.BLEND,t.blend),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD),s(e.CULL_FACE,t.cull),s(e.DEPTH_TEST,t.depth),s(e.SCISSOR_TEST,t.scissor),e.viewport(t.viewport[0],t.viewport[1],t.viewport[2],t.viewport[3]),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,t.drawFb),e.bindFramebuffer(e.READ_FRAMEBUFFER,t.readFb),e.pixelStorei(e.UNPACK_ALIGNMENT,t.unpack),Se.forEach((i,n)=>{e.activeTexture(e.TEXTURE0+i),e.bindTexture(e.TEXTURE_2D,t.tex[n]??null)}),e.activeTexture(t.unit)}function _i(e,t,s){const i=performance.now(),n=c=>Number(e.getParameter(c)),r=e.getSupportedExtensions()??[],o=!!e.getExtension("EXT_color_buffer_float"),a=s||!!e.getExtension("EXT_float_blend"),u={colorBufferFloat:o,floatBlend:a,fence:typeof e.fenceSync=="function",maxTextureSize:n(e.MAX_TEXTURE_SIZE),maxVertexAttribs:n(e.MAX_VERTEX_ATTRIBS),maxTfInterleaved:n(e.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS),maxVertexTextureUnits:n(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureUnits:n(e.MAX_TEXTURE_IMAGE_UNITS),maxFragmentUniformVectors:n(e.MAX_FRAGMENT_UNIFORM_VECTORS),maxVertexUniformVectors:n(e.MAX_VERTEX_UNIFORM_VECTORS),filterProbe:null,blendProbe:null,probeError:null,reason:null,target:yt(a),timerQuery:r.includes("EXT_disjoint_timer_query_webgl2"),floatLinear:r.includes("OES_texture_float_linear"),probeMs:0};if(qt({...u,filterProbe:.5,blendProbe:.5})===null){const c=at(e),h=e.getParameter(e.PIXEL_PACK_BUFFER_BINDING);let f=null,l=null,d=null,m=null;try{e.activeTexture(e.TEXTURE15),f=t.texture(2,1,e.RGBA16F,e.RGBA,e.FLOAT,new Float32Array([0,0,0,0,1,1,1,1])),e.bindTexture(e.TEXTURE_2D,f),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),l=t.target(1,1,a?e.RGBA32F:e.RGBA16F,e.RGBA),d=t.program("zoneCurtainProbe",I,Ns),m=e.createVertexArray(),e.bindVertexArray(m),e.useProgram(d.prog),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,f),e.uniform1i(d.loc.get("uT"),0),e.bindFramebuffer(e.FRAMEBUFFER,l.fbo),e.viewport(0,0,1,1),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.clearBufferfv(e.COLOR,0,[0,0,0,0]),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD),e.drawArrays(e.TRIANGLES,0,3),e.drawArrays(e.TRIANGLES,0,3);const p=new Float32Array(4);e.bindBuffer(e.PIXEL_PACK_BUFFER,null),e.readPixels(0,0,1,1,e.RGBA,e.FLOAT,p);const b=e.getError();b!==e.NO_ERROR&&(u.probeError=`GL error 0x${b.toString(16)}`),u.filterProbe=p[0]/2,u.blendProbe=p[1]}catch(p){u.probeError=(p instanceof Error?p.message:String(p)).split(`
`)[0].slice(0,200)}finally{m&&e.deleteVertexArray(m),d&&(e.deleteProgram(d.prog),t.programs.delete(d.prog)),l&&t.deleteTarget(l),f&&t.deleteTexture(f),ot(e,c),e.bindBuffer(e.PIXEL_PACK_BUFFER,h)}}return u.reason=qt(u),u.probeMs=performance.now()-i,u}class wi{opt;caps=null;stats={frames:0,maps:0,misses:0,miss3:0,states:0,workerMs:[],uploadBytes:0,tablesMs:null,tableLayers:[],slots:{core:0,env:0,glow:0},segsLastSlice:0,eventsDropped:0,mainMs:[],glErrors:0,failed:null,target:"",stillFrames:0,restarts:0,composed:0,w:0,meterReads:0,meterBack:0,meterTimeouts:0,meterLatency:0,meterMs:[],meterN:0,meterSteps:[],collectMs:[],collectSteps:[],redPasses:0,first:{made:typeof performance<"u"?performance.now():0,programs:null,linked:null,tables:null,state:null,maps:null,metered:null,faded:null,tablesCached:!1},lostCalls:0,follow:{rate:0,movingMaps:0,fallbacks:0,fbFrames:0,fbMs:0,fbSize:0,fbFailed:null,standingMaps:0},auto:{n:0,via:"",sliceMs:null,mapMs:null,changes:0},workerMsParts:[]};lost(t){return t.isContextLost()?(this.stats.lostCalls++,!0):!1}debugMeterN=null;meterIn=null;debugW=null;debugCompose=!0;debugFadeHold=!1;debugClassGain=null;debugRedOff=!1;debugRedSource=null;debugN=null;get nNow(){return this.nCur}nCur;autoN=Kt();refresh={last:null,dts:[],id:0};settle=0;standPx=0;startRefresh(){if(this.refresh.id||typeof requestAnimationFrame>"u")return;const t=s=>{const i=this.refresh;i.last!==null&&(i.dts.push(s-i.last),i.dts.length>61&&i.dts.shift()),i.last=s,i.id=requestAnimationFrame(t)};this.refresh.id=requestAnimationFrame(t)}shown=[];noteShown(t,s,i,n){this.shown.push({at:performance.now(),lag:t-s,onTime:!n.miss&&!n.miss3&&s>i+1e-6}),this.shown.length>300&&this.shown.shift()}updateRate(t=5e3){const s=performance.now(),i=this.shown.filter(r=>s-r.at<=t),n=i.map(r=>r.lag).sort((r,o)=>r-o);return{perS:1e3*i.length/t,onTimePerS:1e3*i.filter(r=>r.onTime).length/t,lagMed:n.length?n[n.length>>1]:null,lagP90:n.length?n[Math.floor(.9*(n.length-1))]:null,n:i.length}}refreshS(){const t=this.refresh.dts;if(t.length<8)return this.fdt();const s=[...t].sort((i,n)=>i-n);return Math.min(.25,s[s.length>>1]/1e3)}tq=void 0;autoCost=[];timeBegin(t){const s=this.tq;if(!s||s.pend.length>=6||t.getQuery(s.ext.TIME_ELAPSED_EXT,t.CURRENT_QUERY))return null;const i=t.createQuery();return i&&t.beginQuery(s.ext.TIME_ELAPSED_EXT,i),i}timeEnd(t,s,i){const n=this.tq;t.endQuery(n.ext.TIME_ELAPSED_EXT),n.pend.push({q:s,n:i})}timePoll(t){if(this.tq===void 0){const n=this.caps?.timerQuery===!1?null:t.getExtension("EXT_disjoint_timer_query_webgl2");this.tq=n?{ext:n,pend:[]}:null}const s=this.tq;if(!s||!s.pend.length)return;const i=!!t.getParameter(s.ext.GPU_DISJOINT_EXT);for(;s.pend.length&&t.getQueryParameter(s.pend[0].q,t.QUERY_RESULT_AVAILABLE);){const n=s.pend.shift();if(!i){const r=Number(t.getQueryParameter(n.q,t.QUERY_RESULT))/1e6;this.autoCost.push(r*n.n),this.autoCost.length>Vs&&this.autoCost.shift(),this.stats.auto.sliceMs=r}t.deleteQuery(n.q)}}seed;debugMaps=null;debugHold=!1;debugScene=null;debugSceneExtra=null;res=null;worker=null;makeWorker;key="";scene=null;tables=null;tablesAsked=!1;ring=[];pending=[];inFlight=!1;nextT=0;reqId=0;asked=new Map;discard=new Set;resumeAfter=null;recullAt=-1/0;flightId=-1;recull={times:0,states:0};cap={core:0,env:0,glow:0};pX=null;pR=null;pD=null;pC=null;pRed=null;redTex=null;progQueue=[];tableWorker=null;pM=[];mS=null;mB=null;mF=null;pbos=[];reads=[];extIds=new WeakMap;extNext=1;vaoX=null;vaoR=null;vaoD=null;quad=null;tfo=null;out=null;kTex=null;refTex=null;refLevel=-1;accFmt=0;A=null;B=null;acc=null;Ta=0;Tb=0;cur=null;slice=0;fdts=[];lastT=null;waitSince=null;hist=[];omega={axis:[0,0,1],rate:0};plan=Ht(0,1/60,st.N);fb=ne();view=null;covCache=null;trash=[];w=0;lastWall=null;unmetered=0;retiring=null;retShare=0;retOut=null;outAt=null;holdS=0;retiringShare(t){return this.retiring?this.retShare*(this.retOut??1-t):0}meterPairs(){if(this.retOut===null||!this.retiring||this.debugMaps||this.debugW!==null)return this.pairs();if(!this.programReady())return[];const t=[],s=this.maps(),i=this.retShare*(1-this.w);return i>0&&t.push({m:this.retiring,share:i}),s&&this.w>0&&t.push({m:s,share:this.w}),t}weather;wx=null;constructor(t={},s,i=0,n=!1){this.opt={...st,...t},this.nCur=this.opt.N,this.seed=i>>>0,this.weather=n,this.autoN=Kt(this.opt.N),this.makeWorker=s??(()=>new Worker(new URL(""+new URL("zone-curtain.worker-BdBMQO_s.js",import.meta.url).href,import.meta.url),{type:"module"}))}maps(){return this.debugMaps?this.debugMaps:!this.A||!this.B||!this.linked?null:{A:this.A,B:this.B,alpha:this.alphaNow(),fallback:this.fb.map}}coverageNow(t,s,i=25){const n=this.debugMaps??this.maps();if(!n)return{n:0,nA:0,nB:0,nC:0,sA:0,sB:0,sC:0,none:1,fallbackOnly:0,shown:0};const r=mt(t,s,n.A.cam,n.B.cam,n.fallback?.cam??null,n.alpha,this.nCur,i);return{...r,shown:r.shown*this.weight()}}coverageOfView(t=15){const s=this.view;return s?this.coverageNow(s.dir,s.fovDeg*Math.PI/360,t):null}meterCoverage(t){const s=this.meterIn;if(!s)return null;const i=`${this.stats.frames}|${t.alpha}|${this.nCur}|${t.A.gen}|${t.B.gen}|${t.fallback?.gen??-1}|${s.axis.join(",")}|${s.radiusDeg}`;if(this.covCache?.key===i)return this.covCache.cov;const n=mt(s.axis,s.radiusDeg*Math.PI/180,t.A.cam,t.B.cam,t.fallback?.cam??null,t.alpha,this.nCur,16);return this.covCache={key:i,cov:n},n}alphaNow(){return Math.min(1,this.rotFrames/Math.max(1,this.rotN))}rotFrames=0;rotN=st.N;pairs(){if(!this.programReady())return[];if(this.debugMaps)return[{m:this.debugMaps,share:this.debugW??this.w}];const t=[],s=this.maps(),i=this.debugW??this.w;if(this.retiring&&this.debugW===null){const n=this.retiringShare(i);n>0&&t.push({m:this.retiring,share:n})}return s&&i>0&&t.push({m:s,share:i}),t}weight(){return(this.debugMaps??this.maps())&&this.programReady()?this.debugW??this.w:0}shares(){let t=0,s=0;for(const i of this.pairs())i.m===this.retiring?s=i.share:t=i.share;return{current:t,retiring:s}}coarseRates(t,s){return this.debugW!==null?this.debugW>0?xt(t,s,t,1,this.debugW).coarse:t:this.stats.failed?t:xt(t,s,t,1,1).coarse}compose(t,s,i,n,r,o,a){const u=this.pairs(),c=this.pC;if(!u.length||!c||!this.debugCompose||this.lost(t))return!1;t.useProgram(c.prog),o(c),t.uniform1iv(c.loc.get("uClass"),Int32Array.from(i));const h=Ws(n),f=this.debugClassGain;for(const{m:l,share:d}of u){this.bindMaps(t,c,l.A,l.B,l.fallback,l.alpha,2);const m=xt(s,i,h,l.A.kR,d,r).map;if(f)for(let p=0;p<m.length;p++)m[p]=m[p]*(f[i[p]]??1);t.uniform1fv(c.loc.get("uRate"),m),a()}return t.activeTexture(t.TEXTURE0),this.stats.composed++,!0}meterField(){const t=this.meterPairs(),s=this.debugMaps?null:this.maps(),i=s?this.meterCoverage(s):null,r=!i||i.nA===i.n&&i.nB===i.n&&i.sC===0&&Math.abs(i.sA+i.sB-i.n)<1e-6?void 0:t.find(c=>c.m===s),o=c=>this.readingOf(c);if(!r||!i||!s)return ft(t.map(({m:c,share:h})=>({A:o(c.A),B:o(c.B),alpha:c.alpha,share:h})));const a=Fs(i,o(s.A),o(s.B),s.fallback?o(s.fallback):null,r.share),u=ft(t.filter(c=>c!==r).map(({m:c,share:h})=>({A:o(c.A),B:o(c.B),alpha:c.alpha,share:h})));if(u)for(let c=0;c<a.means.length;c++)a.means[c]=a.means[c]+u.means[c],a.box[c]=a.box[c]+u.box[c];return{means:a.means,box:a.box,pending:a.pending+(u?.pending??0)}}meterStats(t,s){const i=Gt(t,s,gt(),this.meterField()),n=this.retOut===null?i.mean:Gt(t,s,gt(),ft(this.pairs().map(({m:c,share:h})=>({A:this.readingOf(c.A),B:this.readingOf(c.B),alpha:c.alpha,share:h})))).mean,r=typeof performance<"u"?performance.now()/1e3:0,o=this.slowLight;if(this.debugMeterFast)return this.slowLight=null,{...i,shown:n};const a=this.retiring||this.w<1?si:this.debugGainTau??void 0,u=o&&r-o.t>=0&&r-o.t<2?ni(o,i.mean,i.peak,r,a):{t:r,mean:i.mean,peak:i.peak};return this.slowLight=u,{mean:u.mean,peak:u.peak,shown:n}}slowLight=null;debugMeterFast=!1;debugGainTau=null;meter(t,s){if(this.stats.failed||!this.pM.length||this.lost(t)||!this.programReady())return;this.reads.some(E=>E.passed)&&(this.catchUp&&t.deleteSync(this.catchUp),this.catchUp=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0));const i=this.debugMaps?null:this.maps(),n=[...this.meterPairs().map(E=>E.m),...i?[i]:[]];if(!n.length)return;const r=2*s.radiusDeg,o=fs(s.radiusDeg,Math.min(this.opt.pitchDegMax,r/128),this.debugMeterN??void 0);let a=0;s.ext&&(a=this.extIds.get(s.ext)??0,a||(a=this.extNext++,this.extIds.set(s.ext,a)));const u=`${s.axis.map(E=>E.toFixed(4)).join(",")}|${o.n}|${o.tanR.toFixed(6)}|${a}`,c=[],h=this.debugMaps?null:i?.fallback??null,f=E=>E.fallback&&E.fallback===h&&!h.reading?[E.fallback,E.A,E.B]:E.fallback?[E.A,E.B,E.fallback]:[E.A,E.B];for(const E of n)for(const A of f(E))c.length>=Mt||c.includes(A)||A.readKey===u||this.reads.some(T=>T.items.some(w=>w.M===A&&w.gen===A.gen&&w.key===u))||c.push(A);const l=O.map(E=>s.rates[E]??0);this.meterIn={axis:[...s.axis],radiusDeg:s.radiusDeg,n:o.n,tanR:o.tanR,count:o.count,level:s.level,cls:Array.from(s.cls),weights:l};const d=this.w<1||this.retiring!==null||this.debugMaps!==null||this.debugW!==null||c.some(E=>E.reading!==null&&E.readKey==="");if(c.length&&!d&&(this.reads.length>0||performance.now()-this.lastReduceAt<vi)&&(c.length=0),!c.length)return;this.lastReduceAt=performance.now();const m=this.steps,p=performance.now(),b=at(t),R=t.getParameter(t.PIXEL_PACK_BUFFER_BINDING);m.fill(0),m[1]=performance.now()-p;try{const E=Lt(s.cls),A=zt(s.cls);c.forEach((M,G)=>this.reduce(t,M,s,o,G));const T=performance.now(),w=this.res;let x=this.pbos.pop();x||(x=t.createBuffer(),w.buffers.add(x),t.bindBuffer(t.PIXEL_PACK_BUFFER,x),t.bufferData(t.PIXEL_PACK_BUFFER,Jt,t.STREAM_READ),w.recordBuffer(x,Jt)),t.bindFramebuffer(t.FRAMEBUFFER,this.mF.fbo),t.bindBuffer(t.PIXEL_PACK_BUFFER,x),t.readPixels(0,0,L*c.length,1,t.RGBA,t.FLOAT,0),t.bindBuffer(t.PIXEL_PACK_BUFFER,null);const _=performance.now();m[5]=_-T;const v=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);if(m[6]=performance.now()-_,!v)throw this.pbos.push(x),new Error("fenceSync returned null");this.reads.push({items:c.map(M=>({M,gen:M.gen,key:u,chan:E,red:A})),sync:v,pbo:x,frames:0}),t.activeTexture(t.TEXTURE0),this.stats.meterReads+=c.length,this.stats.meterN=o.n}catch(E){this.lost(t)||(this.stats.failed=`zoneCurtainMeter: ${E instanceof Error?E.message:String(E)}`)}finally{const E=performance.now();ot(t,b),t.bindBuffer(t.PIXEL_PACK_BUFFER,R);const A=performance.now();m[0]=A-p,m[7]=A-E,it(this.stats.meterMs,m[0]),it(this.stats.meterSteps,Array.from(m))}}steps=new Float64Array(8);lastReduceAt=-1/0;lastReading=null;catchUp=null;readingOf(t){return t.reading??(this.debugMaps?null:this.lastReading)}collect(t){if(!this.reads.length||this.stats.failed||this.lost(t))return;const s=performance.now(),i=t.getParameter(t.PIXEL_PACK_BUFFER_BINDING),n=[0,0,0];try{this.poll(t,n)}catch(r){this.lost(t)||(this.stats.failed=`zoneCurtainMeter: ${r instanceof Error?r.message:String(r)}`)}finally{t.bindBuffer(t.PIXEL_PACK_BUFFER,i),n[0]=performance.now()-s,it(this.stats.collectMs,n[0]),it(this.stats.collectSteps,n)}}poll(t,s){for(const i of[...this.reads]){const n=performance.now(),r=i.passed?t.ALREADY_SIGNALED:t.clientWaitSync(i.sync,0,0);s[1]=s[1]+performance.now()-n;const o=r===t.ALREADY_SIGNALED||r===t.CONDITION_SATISFIED;if(o&&!i.passed){i.passed=!0,i.frames++;continue}if(i.passed&&this.catchUp&&++i.frames<=re/2){const a=t.clientWaitSync(this.catchUp,0,0);if(a!==t.ALREADY_SIGNALED&&a!==t.CONDITION_SATISFIED&&a!==t.WAIT_FAILED)continue}if(!(!o&&r!==t.WAIT_FAILED&&++i.frames<=re)){if(this.reads.splice(this.reads.indexOf(i),1),t.deleteSync(i.sync),o){const a=new Float32Array(4*L*i.items.length),u=performance.now();t.bindBuffer(t.PIXEL_PACK_BUFFER,i.pbo),t.getBufferSubData(t.PIXEL_PACK_BUFFER,0,a),s[2]=s[2]+performance.now()-u,i.items.forEach((c,h)=>{const f=4*L*h,l=O.length,d=new Float64Array(l),m=new Float64Array(l);c.chan.forEach((p,b)=>{d[p]=a[f+b],m[p]=a[f+4+b]}),c.red>=0&&(d[c.red]=a[f+12],m[c.red]=a[f+16]),c.M.gen===c.gen&&(c.M.reading={sums:d,count:a[f+8],box:m,boxTotal:a[f+9]+(c.red>=0?Math.max(0,a[f+21]):0)},c.M.readKey=c.key,this.lastReading=c.M.reading)}),this.stats.meterBack+=i.items.length,this.stats.meterLatency=i.frames}else this.stats.meterTimeouts+=i.items.length;this.pbos.push(i.pbo)}}}reduce(t,s,i,n,r){const o=Lt(i.cls),a=zt(i.cls);this.reduceSet(t,s,i,n,o,L*r),a>=0&&this.reduceSet(t,s,i,n,[a],L*r+3)}reduceSet(t,s,i,n,r,o){const a=this.res,u=n.n,c=u/z,h=this.pM[0],f=this.pM[1],l=this.pM[2],d=this.steps,m=performance.now(),p=(v,M,G)=>{if(v&&v.w===M&&v.h===G)return v;if(v){const tt=v;this.defer(()=>a.deleteTarget(tt))}t.activeTexture(t.TEXTURE15);const J=a.target(M,G,t.RGBA32F,t.RGBA);return t.activeTexture(t.TEXTURE0),J},b=this.mS=p(this.mS,u,u),R=this.mB=p(this.mB,3*c,c),E=this.mF=p(this.mF,L*Mt,1),A=ds(i.axis),T=this.meterIn.weights,w=[0,1,2,3].map(v=>r[v]??0),x=[0,1,2,3].map(v=>r[v]!==void 0?s.kR:0),_=[0,1,2,3].map(v=>r[v]!==void 0?T[r[v]]??0:0);t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),t.bindVertexArray(this.vaoD),t.useProgram(h.prog),i.bind(h),t.uniform3fv(h.loc.get("uMF"),A.F),t.uniform3fv(h.loc.get("uMR"),A.R),t.uniform3fv(h.loc.get("uMU"),A.U),t.uniform1f(h.loc.get("uTanR"),n.tanR),t.uniform1f(h.loc.get("uN"),u),t.uniform3fv(h.loc.get("mF"),s.cam.f),t.uniform3fv(h.loc.get("mR"),s.cam.r),t.uniform3fv(h.loc.get("mU"),s.cam.up),t.uniform2f(h.loc.get("mT"),s.cam.tanH,s.n),t.uniform1f(h.loc.get("uCubic"),this.debugCubic?1:0),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,s.core.tex),t.uniform1i(h.loc.get("mC"),2),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,s.env.tex),t.uniform1i(h.loc.get("mE"),3),t.uniform1iv(h.loc.get("uComp"),Int32Array.from(w)),t.uniform1iv(h.loc.get("uCls"),Int32Array.from(w.map(v=>i.cls[v]??0))),t.uniform1fv(h.loc.get("uK"),Float32Array.from(x)),t.bindFramebuffer(t.FRAMEBUFFER,b.fbo),t.viewport(0,0,u,u),t.drawArrays(t.TRIANGLES,0,3),t.useProgram(f.prog),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,b.tex),t.uniform1i(f.loc.get("uS"),2),t.uniform1f(f.loc.get("uN"),u),t.uniform4fv(f.loc.get("uW"),Float32Array.from(_)),t.bindFramebuffer(t.FRAMEBUFFER,R.fbo),t.viewport(0,0,3*c,c),t.drawArrays(t.TRIANGLES,0,3),t.useProgram(l.prog),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,R.tex),t.uniform1i(l.loc.get("uB"),2),t.uniform1i(l.loc.get("uNB"),c),t.uniform1i(l.loc.get("uOff"),o),t.bindFramebuffer(t.FRAMEBUFFER,E.fbo),t.viewport(o,0,3,1),t.drawArrays(t.TRIANGLES,0,3),d[4]=d[4]+performance.now()-m}debugMeterSamples(t){return this.mS?this.readTarget(t,this.mS):null}frame(t){if(this.stats.failed||this.debugHold||this.lost(t.gl))return;const s=performance.now(),i=t.gl,n=at(i);this.holdS=Math.max(0,t.holdS??0);try{this.res=t.res,this.flush();const r=this.debugScene??(this.weather?Ai:Fe)(t.level,t.seed),o=this.debugSceneExtra&&!this.debugScene?{...r,...this.debugSceneExtra}:r,a=this.debugScene?JSON.stringify(o):`${o.level}|${o.seed}${this.debugSceneExtra?"|"+JSON.stringify(this.debugSceneExtra):""}`,u=this.ring.length?this.ring[0].t:null,c=this.lastT!==null&&t.tModel<this.lastT-1e-6,h=this.lastT!==null&&(t.tModel>this.lastT+5||c&&(u===null||t.tModel<u-1e-6));this.worker&&(a!==this.key||h)&&this.restart(a!==this.key),this.key=a,this.scene=o,this.worker||this.start(t),this.startRefresh(),this.pX?this.askPrograms(1):this.programs(i,t),this.take(i),this.timePoll(i);const f=this.lastT!==null&&t.tModel===this.lastT;if(this.track(t),this.want(t.tModel),t.dtSeconds>0&&!f&&(this.fdts.push(t.dtSeconds),this.fdts.length>31&&this.fdts.shift()),this.lastT=t.tModel,!this.tables||this.ring.length<4||!this.programReady()){this.ring.length>7&&this.trim();return}if(this.slice>0&&!this.plan.moving&&this.debugN===null&&!f&&this.omega.rate>=Xt&&(this.slice=0),this.slice>0&&this.plan.moving&&this.debugN===null&&!f&&this.omega.rate<ut&&(this.slice=0),this.slice===0){const b=this.debugN??Math.max(t.lite?ai:this.opt.N,this.autoN.n),R=this.plan.moving;if(this.plan=Ht(this.debugN===null&&!f?this.omega.rate:0,this.fdt(),b),this.debugN===null){const E=this.mapCameraOf(t).size;if(this.standPx=E*E/b,this.plan.moving){const A=this.followCam(t),T=A.size*A.size/this.plan.N;T>q*this.standPx&&(this.plan={...this.plan,pitchScale:this.plan.pitchScale*Math.sqrt(T/(q*this.standPx))}),this.settle=se}else(R||this.settle>0)&&(R&&(this.settle=se),this.settle>0&&!f&&(this.settle--,this.plan={...this.plan,N:Math.min(b,Math.max(di,Math.ceil(b/q),Math.round(li/this.fdt())))}))}this.nCur=this.debugN??this.plan.N}const l=this.fdt(),d=this.nCur,m=f&&!!this.A&&!!this.B&&this.standingNeedsMap();if(m&&this.slice>0&&this.cur&&Math.abs(this.cur.T-t.tModel)>1e-6&&(this.slice=0),!this.A||!this.B){const b=performance.now();if(this.waitSince??=b,this.ring[this.ring.length-1].t<t.tModel+2*d*l+this.dtCur&&b-this.waitSince<1500)return;this.waitSince=null,this.A=this.fillMap(i,this.newMap(t),t.tModel),this.B=this.fillMap(i,this.newMap(t),t.tModel+d*l),this.Ta=this.A.T,this.Tb=this.B.T,this.slice=0,this.stats.first.maps??=performance.now(),this.rotFrames=0,this.rotN=d}else if(f&&!m){this.stats.stillFrames++;return}if(this.slice===0){this.acc=this.recenter(t,this.acc),this.plan.moving&&!m&&this.recullRing(t.tModel+2*d*l),this.cur=this.job(m?t.tModel:t.tModel+2*d*l,this.acc.cam),this.acc.T=this.cur.T,this.acc.kR=this.cur.X.S[1].msg.kR,this.stats.maps++,this.cur.miss&&this.stats.misses++;const b=this.stats.follow;if(b.rate=this.omega.rate,this.plan.moving&&b.movingMaps++,m&&b.standingMaps++,this.clearMap(i,this.acc),this.drawRed(i,this.acc,this.cur),this.rotN=d,this.debugN===null&&(this.tq||!this.plan.moving&&this.w>=1)){this.autoN=js(this.autoN,this.tq?jt(this.autoCost):void 0,this.tq?l:this.refreshS());const R=this.stats.auto;R.n=this.autoN.n,R.changes=this.autoN.changes,R.via=this.tq?"timer":this.tq===null?"frames":"",R.mapMs=jt(this.autoCost)}}const p=this.timeBegin(i);if(this.drawSlice(i,this.acc,this.cur,this.slice,d),p&&this.timeEnd(i,p,d),++this.slice===d){this.noteShown(t.tModel,this.acc.T,this.Tb,this.cur);const b=this.A;this.A=this.B,this.B=this.acc,this.acc=b,this.Ta=this.Tb,this.Tb=this.B.T,this.slice=0,this.rotFrames=m?d:0}else this.rotFrames++;this.fallbackStep(i,t,f),this.trim(),this.stats.frames++}catch(r){this.lost(i)||(this.stats.failed=r instanceof Error?r.message:String(r))}finally{this.fade(),ot(i,n);const r=performance.now()-s;this.stats.mainMs.push(r),this.stats.mainMs.length>600&&this.stats.mainMs.shift()}}dispose(){this.worker?.terminate(),this.worker=null,this.refresh.id&&typeof cancelAnimationFrame<"u"&&cancelAnimationFrame(this.refresh.id),this.refresh={last:null,dts:[],id:0},this.dropFallback(!!this.res&&!this.res.gl.isContextLost()),this.tableWorker?.terminate(),this.tableWorker=null,this.progQueue=[];const t=this.res;if(t&&!t.gl.isContextLost()){const s=t.gl;this.flush();for(const i of this.ring)for(const n of C)t.deleteBuffer(i.buf[n]);for(const i of[this.A,this.B,this.acc,this.retiring?.A,this.retiring?.B])i&&(t.deleteTarget(i.core),t.deleteTarget(i.env));for(const i of this.tables??[])t.deleteTexture(i.tex),t.deleteTexture(i.coef);this.kTex&&t.deleteTexture(this.kTex),this.redTex&&t.deleteTexture(this.redTex),this.refTex&&t.deleteTexture(this.refTex),this.out&&t.deleteBuffer(this.out.buf),this.quad&&t.deleteBuffer(this.quad);for(const i of[this.vaoX,this.vaoR,this.vaoD])i&&(s.deleteVertexArray(i),t.vaos.delete(i));this.tfo&&s.deleteTransformFeedback(this.tfo),this.pD&&(s.deleteProgram(this.pD.prog),t.programs.delete(this.pD.prog));for(const i of[this.pX,this.pR,this.pRed,this.pC,...this.pM]){if(!i)continue;t.programs.delete(i.prog);const n=()=>{if(!s.isContextLost()){if(!i.done()){setTimeout(n,50);return}try{i.check()}catch{}s.deleteProgram(i.prog),t.deferred.delete(i.prog)}};n()}for(const i of[this.mS,this.mB,this.mF])i&&t.deleteTarget(i);for(const i of this.reads)s.deleteSync(i.sync),this.pbos.push(i.pbo);this.catchUp&&(s.deleteSync(this.catchUp),this.catchUp=null);for(const i of this.pbos)t.deleteBuffer(i);for(const i of this.tq?.pend??[])s.deleteQuery(i.q)}this.tq=void 0,this.pM=[],this.mS=this.mB=this.mF=null,this.pbos=[],this.reads=[],this.linked=!1,this.asked.clear(),this.discard.clear(),this.resumeAfter=null,this.res=null,this.ring=[],this.pending=[],this.tables=null,this.tablesAsked=!1,this.A=this.B=this.acc=null,this.cur=null,this.trash=[],this.retiring=null,this.retShare=0,this.retOut=null,this.outAt=null,this.w=0,this.lastWall=null,this.pX=this.pR=this.pD=this.pC=this.pRed=null,this.redTex=null,this.vaoX=this.vaoR=this.vaoD=null,this.quad=null,this.tfo=null,this.out=null,this.kTex=null,this.refTex=null,this.refLevel=-1,this.cap={core:0,env:0,glow:0},this.inFlight=!1,this.lastT=null,this.key=""}start(t){const s=this.makeWorker();if(s.onmessage=i=>this.onMessage(i.data),s.onerror=i=>{this.stats.failed=`worker: ${i.message}`},this.worker=s,this.inFlight=!1,this.nextT=t.tModel-this.dtCur,this.post({cmd:"init",scene:this.scene,obs:[0,0],red:this.debugRedSource??"dynamic",light:!this.debugEmitStd}),!this.tablesAsked){this.tablesAsked=!0;const i=this.opt.envBands===16?[16]:[16,this.opt.envBands],n=i.join(",");if(Tt?.bands===n)this.pendingTables=Tt.tables,this.stats.tablesMs=0,this.stats.first.tablesCached=!0;else{const r=this.tableWorker=this.makeWorker();r.onmessage=o=>{const a=o.data;if(a.cmd==="tables"){Tt={bands:n,tables:a.tables},this.pendingTables=a.tables,this.stats.tablesMs=a.ms;for(const u of this.waiters.splice(0))u()}else a.cmd==="error"&&(this.stats.failed=`worker: ${a.message}`);r.terminate(),this.tableWorker===r&&(this.tableWorker=null)},r.onerror=o=>{this.stats.failed=`worker: ${o.message}`},r.postMessage({cmd:"tables",bands:i})}}}post(t){this.worker.postMessage(t)}restart(t=!1){this.worker?.terminate(),this.worker=null,this.stats.restarts++,this.dropFallback(),t&&(this.lastReading=null,this.wx=null);const s=this.res,i=this.ring;s&&this.defer(()=>{for(const u of i)for(const c of C)s.deleteBuffer(u.buf[c])}),this.ring=[],this.pending=[],this.cur=null,this.slice=0,this.cap={core:0,env:0,glow:0},this.waitSince=null,this.asked.clear(),this.discard.clear(),this.resumeAfter=null;const n=this.A,r=this.B,o=n&&r?this.w:0,a=this.retiringShare(this.w);if(n&&r&&o>0&&o>=a){const u=this.retiring;u&&this.defer(()=>{this.delMap(u.A),this.delMap(u.B)}),this.retiring={A:n,B:r,alpha:this.alphaNow(),fallback:null},this.retShare=o}else{for(const u of[n,r])u&&this.defer(()=>this.delMap(u));this.retiring&&(this.retShare=a)}this.retOut=this.retiring&&(t||this.retOut!==null)?1:null,this.outAt=null,this.A=this.B=null,this.w=0,!this.tables&&!this.pendingTables&&!this.tableWorker&&(this.tablesAsked=!1)}debugWorkerSlow=1;debugEmitStd=!1;dtCur=st.dt;dtAt=-1/0;get dtNow(){return this.dtCur}batchP90(){const t=this.stats.workerMs.slice(-ie);if(t.length<4)return 0;const s=[...t].sort((i,n)=>i-n);return s[Math.floor(.9*(s.length-1))]/1e3}adaptDt(){if(this.debugEmitStd||this.opt.dt!==H[0]||this.stats.workerMs.length<ie)return;const t=performance.now();if(t-this.dtAt<bi)return;const s=this.batchP90(),i=H.indexOf(this.dtCur);i<0||(s>pi*this.dtCur&&i<H.length-1?(this.dtCur=H[i+1],this.dtAt=t):i>0&&s<Ei*H[i-1]&&(this.dtCur=H[i-1],this.dtAt=t))}slowed=new WeakSet;onMessage(t){if(t.cmd==="state"&&this.debugWorkerSlow>1&&!this.slowed.has(t)){const s=this.debugWorkerSlow,i=this.worker,n={...t,ms:{...t.ms,total:t.ms.total*s}};this.slowed.add(n),setTimeout(()=>{this.worker===i&&this.onMessage(n)},(s-1)*t.ms.total);return}if(t.cmd==="error"){this.stats.failed=`worker: ${t.message}`;return}if(t.cmd==="tables"){this.pendingTables=t.tables,this.stats.tablesMs=t.ms;return}if(t.cmd==="state"){if(this.discard.delete(t.id)){this.asked.delete(t.id);return}this.inFlight=!1,this.pending.push(t),this.stats.workerMs.push(t.ms.total),this.stats.workerMs.length>120&&this.stats.workerMs.shift(),this.stats.workerMsParts.push(t.ms),this.stats.workerMsParts.length>120&&this.stats.workerMsParts.shift(),this.adaptDt(),this.lastT!==null&&this.want(this.lastT);for(const s of this.waiters.splice(0))s()}}pendingTables=null;waiters=[];want(t){if(this.inFlight||!this.worker)return;const s=2*this.nCur*this.fdt()+2*this.dtCur+.3+(this.debugEmitStd?0:this.batchP90());if(this.nextT<=t+s){this.inFlight=!0;const i=this.acc?.cam??this.B?.cam??null,n=i?ws(i.f,this.omega):null,r=i&&n?{f:n.f,tanH:i.tanH,margin:(this.debugEmitStd||!this.weather?14:mi)+n.extraDeg}:null,o=this.flightId=++this.reqId,a=this.resumeAfter;this.asked.set(o,r?{f:r.f,half:Math.min(89,Math.atan(r.tanH*Math.SQRT2)*180/Math.PI+r.margin)}:null),this.post(a===null?{cmd:"state",id:o,t:this.nextT,cull:r}:{cmd:"state",id:o,t:this.nextT,cull:r,after:a}),this.resumeAfter=null,this.nextT+=this.dtCur}}recullRing(t){const s=this.view,i=this.lastT,n=performance.now();if(!s||i===null||this.debugN!==null||!this.worker||n-this.recullAt<fi)return;const r=t+2*this.dtCur+1e-6,o=Math.atan(Math.tan(Math.min(150,s.fovDeg)*Math.PI/360)*Math.SQRT2)*180/Math.PI,a=f=>{const l=f.cone;if(!l)return!0;const d=$(s.dir,this.omega.axis,Math.min(60,this.omega.rate*Math.max(0,f.t-i)));return Math.acos(Math.max(-1,Math.min(1,d[0]*l.f[0]+d[1]*l.f[1]+d[2]*l.f[2])))*180/Math.PI+o+hi<=l.half},u=this.ring.findIndex((f,l)=>l>=4&&f.t>r&&!a(f));if(u<0)return;const c=this.ring.splice(u),h=this.res;this.defer(()=>{for(const f of c)for(const l of C)h.deleteBuffer(f.buf[l])}),this.inFlight&&this.discard.add(this.flightId),this.inFlight=!1,this.nextT=c[0].t,this.resumeAfter=this.ring[this.ring.length-1].k,this.recullAt=n,this.recull.times++,this.recull.states+=c.length,this.want(i)}take(t){for(this.pendingTables&&(this.uploadTables(t,this.pendingTables),this.pendingTables=null);this.pending.length;){const s=this.pending.shift(),i=this.res,n={},r={};for(const o of C)this.grow(t,o,s.sets[o].n),r[o]=s.sets[o].n;for(const o of C){const a=t.createBuffer();i.buffers.add(a),t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,Math.max(1,this.cap[o])*N*4,t.DYNAMIC_DRAW),i.recordBuffer(a,Math.max(1,this.cap[o])*N*4),r[o]&&t.bufferSubData(t.ARRAY_BUFFER,0,s.sets[o].data,0,r[o]*N),this.stats.uploadBytes+=r[o]*N*4,n[o]=a}t.bindBuffer(t.ARRAY_BUFFER,null),this.ring.push({t:s.t,k:s.k,n:r,buf:n,msg:s,cone:this.asked.get(s.id)??null}),this.asked.delete(s.id),this.stats.states++,this.stats.first.state??=performance.now(),s.wx&&(this.wx=s.wx);for(const o of C)this.stats.slots[o]=Math.max(this.stats.slots[o],r[o])}}grow(t,s,i){if(i<=this.cap[s])return;const n=Math.max(4096,Math.ceil(i*1.5/1024)*1024),r=this.res,o=[];for(const a of this.ring){const u=t.createBuffer();r.buffers.add(u),t.bindBuffer(t.COPY_WRITE_BUFFER,u),t.bufferData(t.COPY_WRITE_BUFFER,n*N*4,t.DYNAMIC_DRAW),r.recordBuffer(u,n*N*4),a.n[s]&&(t.bindBuffer(t.COPY_READ_BUFFER,a.buf[s]),t.copyBufferSubData(t.COPY_READ_BUFFER,t.COPY_WRITE_BUFFER,0,0,a.n[s]*N*4)),o.push(a.buf[s]),a.buf[s]=u}o.length&&this.defer(()=>{for(const a of o)r.deleteBuffer(a)}),t.bindBuffer(t.COPY_READ_BUFFER,null),t.bindBuffer(t.COPY_WRITE_BUFFER,null),this.cap[s]=n}trim(){const t=this.res;for(;this.ring.length>7&&!(this.cur&&this.cur.X.S.includes(this.ring[0]));){const s=this.ring.shift();this.defer(()=>{for(const i of C)t.deleteBuffer(s.buf[i])})}}fade(){const t=performance.now(),s=this.lastWall===null?0:Hs((t-this.lastWall)/1e3);if(this.lastWall=t,this.debugFadeHold)return;const i=this.maps(),n=!!i&&!!i.A.reading&&!!i.B.reading;this.unmetered=i&&!n?this.unmetered+1:0,n&&(this.stats.first.metered??=t),this.w>=1&&(this.stats.first.faded??=t);const r=i!==null&&this.programReady()&&(n||this.w>0||this.unmetered>Ri);this.retiring&&this.retOut!==null&&r&&(this.retOut=Math.max(0,this.retOut-s)),this.retOut===0&&this.outAt===null&&(this.outAt=t);const o=!!this.retiring&&this.retOut!==null&&(this.retOut>0||t-(this.outAt??t)<1e3*this.holdS),a=r&&(!o||this.w>0);if(this.w=a?Math.min(1,this.w+s):0,this.retiring&&this.w>=1){const u=this.retiring;this.retiring=null,this.retShare=0,this.retOut=null,this.outAt=null,this.defer(()=>{this.delMap(u.A),this.delMap(u.B)})}this.stats.w=this.w}programReady(){if(this.linked)return!0;if(this.progQueue.length||!this.pX||!this.pR||!this.pRed||!this.pC||this.pM.length<3)return!1;const t=[this.pX,this.pR,this.pRed,this.pC,...this.pM];if(!t.every(s=>s.done()))return!1;try{for(const s of t)s.check();return this.linked=!0,this.stats.first.linked??=performance.now(),!0}catch(s){return this.stats.failed=`zoneCurtainCompose: ${s instanceof Error?s.message:String(s)}`,!1}}askPrograms(t){for(let s=0;s<t&&this.progQueue.length;s++)this.progQueue.shift()()}linked=!1;defer(t){this.trash.push(t)}flush(){if(this.trash.length)for(const t of this.trash.splice(0))t()}fdt(){if(!this.fdts.length)return 1/60;const t=[...this.fdts].sort((s,i)=>s-i);return Math.min(.1,Math.max(1/240,t[t.length>>1]))}programs(t,s){const i=s.res;if(!t.getExtension("EXT_color_buffer_float"))throw new Error("EXT_color_buffer_float missing");this.accFmt=yt(s.floatBlend||!!t.getExtension("EXT_float_blend"))==="rgba32f"?t.RGBA32F:t.RGBA16F,this.stats.target=this.accFmt===t.RGBA32F?"rgba32f":"rgba16f",this.stats.first.programs??=performance.now(),this.progQueue=[()=>{this.pX=xi(t,i)},()=>{this.pR=i.programDeferred("zoneCurtainRaster",Bs,ks)},()=>{this.pRed=i.programDeferred("zoneCurtainRed",I,Os)},()=>{this.pC=i.programDeferred("zoneCurtainCompose",I,Ds)},()=>{this.pM.push(i.programDeferred("zoneCurtainMeter",I,gs))},()=>{this.pM.push(i.programDeferred("zoneCurtainMeterBlock",I,Ls))},()=>{this.pM.push(i.programDeferred("zoneCurtainMeterFinal",I,zs))}],t.getExtension("KHR_parallel_shader_compile")?this.askPrograms(1/0):this.askPrograms(1),t.activeTexture(t.TEXTURE15),this.redTex=i.texture(nt,1,t.RG32F,t.RG,t.FLOAT,new Float32Array(2*nt)),t.activeTexture(t.TEXTURE0),this.vaoX=t.createVertexArray(),this.vaoR=t.createVertexArray(),this.vaoD=t.createVertexArray();for(const r of[this.vaoX,this.vaoR,this.vaoD])i.vaos.add(r);this.quad=t.createBuffer(),i.buffers.add(this.quad),i.recordBuffer(this.quad,ae.byteLength),t.bindVertexArray(this.vaoR),t.bindBuffer(t.ARRAY_BUFFER,this.quad),t.bufferData(t.ARRAY_BUFFER,ae,t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0);for(let r=1;r<=12;r++)t.enableVertexAttribArray(r),t.vertexAttribDivisor(r,1);t.bindVertexArray(this.vaoX);for(let r=0;r<12;r++)t.enableVertexAttribArray(r);t.disableVertexAttribArray(12),t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,null),this.tfo=t.createTransformFeedback();const n=t.createBuffer();i.buffers.add(n),this.out={buf:n,cap:0},t.activeTexture(t.TEXTURE15),this.kTex=i.texture(9,P,t.RG32F,t.RG,t.FLOAT,Ke(9)),t.activeTexture(t.TEXTURE0)}uploadTables(t,s){const i=this.res;t.activeTexture(t.TEXTURE15),this.tables=s.map(n=>{const r=i.texture(n.meta.tiledW,n.meta.tiledH,t.RGBA16F,t.RGBA,t.HALF_FLOAT,n.half);t.bindTexture(t.TEXTURE_2D,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR);const o=i.texture(n.coefW,n.coefH,t.RGBA32F,t.RGBA,t.FLOAT,n.coef);return{meta:n.meta,tex:r,coef:o}}),t.activeTexture(t.TEXTURE0),this.stats.tableLayers=s.map(n=>n.meta.layers),this.stats.first.tables??=performance.now()}refFor(t,s){if(this.refTex&&this.refLevel===s)return this.refTex;const i=this.res,n=hs(W[s]);return t.activeTexture(t.TEXTURE15),this.refTex?(t.bindTexture(t.TEXTURE_2D,this.refTex),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.texSubImage2D(t.TEXTURE_2D,0,0,0,j,1,t.RED,t.FLOAT,n)):this.refTex=i.texture(j,1,t.R32F,t.RED,t.FLOAT,n),t.activeTexture(t.TEXTURE0),this.refLevel=s,this.refTex}mapCameraOf(t,s=this.opt.margin,i=1){const[n,r,o]=t.dir,a=Math.atan2(n,r)*180/Math.PI,u=Math.asin(Math.max(-1,Math.min(1,o)))*180/Math.PI,c=Math.min(150,Math.max(.5,t.fovDeg)),h=Math.min(t.pitchDeg??this.opt.pitchDegMax,c/128)*i;let f=Zt(a,u,c,Math.round(c/h),s);return f.size>this.opt.maxMapSize&&(f=Zt(a,u,c,Math.round(c/h*this.opt.maxMapSize/f.size),s)),f}track(t){const s=performance.now(),i=[t.dir[0],t.dir[1],t.dir[2]],n=this.hist;for(this.view={dir:i,fovDeg:t.fovDeg},n.push({t:s,d:i});n.length>2&&s-n[0].t>150;)n.shift();this.omega=n.length>=2&&s-n[0].t<=400?As(n):{axis:[0,0,1],rate:0}}standingNeedsMap(){const t=this.view,s=this.maps();if(!t||!s)return!1;const i=mt(t.dir,t.fovDeg*Math.PI/360,s.A.cam,s.B.cam,null,s.alpha,this.nCur,9);return i.sA+i.sB<i.n-.001}fallbackStep(t,s,i){const n=this.fb,r=this.res,o=performance.now();if(!this.A||!this.B||this.debugMaps||this.debugHold||this.stats.follow.fbFailed)return;if(!n.worker){const x=n.worker=this.makeWorker();x.onmessage=_=>{const v=_.data;v.cmd==="state"?v.id!==n.drop&&(n.pending=v):v.cmd==="error"&&(this.stats.follow.fbFailed=`worker: ${v.message}`)},x.onerror=_=>{this.stats.follow.fbFailed=`worker: ${_.message}`},x.postMessage({cmd:"init",scene:this.scene,obs:[0,0],red:this.debugRedSource??"dynamic",light:!this.debugEmitStd})}if(n.asked&&!n.moving&&this.omega.rate>=Xt){const x=n.acc,_=n.state;(x||_)&&this.defer(()=>{if(x&&this.delMap(x),_)for(const v of C)r.deleteBuffer(_.buf[v])}),!n.pending&&!x&&(n.drop=n.reqId),n.acc=null,n.job=null,n.state=null,n.pending=null,n.asked=!1,n.slice=0}if(n.pending&&!n.acc&&n.cam){const x=n.pending,_={},v={};n.pending=null;for(const B of C){v[B]=x.sets[B].n;const et=t.createBuffer();r.buffers.add(et),t.bindBuffer(t.ARRAY_BUFFER,et),t.bufferData(t.ARRAY_BUFFER,Math.max(1,v[B])*N*4,t.STATIC_DRAW),r.recordBuffer(et,Math.max(1,v[B])*N*4),v[B]&&t.bufferSubData(t.ARRAY_BUFFER,0,x.sets[B].data,0,v[B]*N),this.stats.uploadBytes+=v[B]*N*4,_[B]=et}t.bindBuffer(t.ARRAY_BUFFER,null);const M={t:x.t,k:x.k,n:v,buf:_,msg:x},G=W[this.scene.level],[J,tt]=this.footRange(n.cam),Nt=x.wx?At(x.wx.pulses,x.t,J,tt,k):ht(G,this.scene,x.t,J,tt,k);n.state=M,n.slice=0,n.job={T:x.t,X:{S:[M,M,M,M],...vt(this.opt.mode,0)},events:Nt.events,dropped:Nt.dropped,miss:!1,red:Rt(M,M,0)},t.activeTexture(t.TEXTURE15),n.acc={cam:n.cam,n:n.cam.size,core:r.target(n.cam.size,n.cam.size,this.accFmt,t.RGBA),env:r.target(n.cam.size/2,n.cam.size/2,this.accFmt,t.RGBA),T:x.t,kR:x.kR,reading:null,readKey:"",gen:0,red:null},t.activeTexture(t.TEXTURE0),this.clearMap(t,n.acc),this.drawRed(t,n.acc,n.job)}if(n.acc&&n.job){if(this.drawSlice(t,n.acc,n.job,n.slice,n.N),++n.slice>=n.N){const x=n.map,_=n.state;this.defer(()=>{x&&this.delMap(x);for(const M of C)r.deleteBuffer(_.buf[M])}),n.map=n.acc,n.acc=null,n.job=null,n.state=null,n.asked=!1,n.builtAt=o;const v=this.stats.follow;v.fallbacks++,v.fbMs=o-n.askedAt,v.fbFrames=n.N,v.fbSize=n.map.n}return}if(n.asked||i)return;const a=this.view,u=n.map?.cam,c=a.fovDeg/2,h=this.omega.rate>=ut,f=this.fdt(),l=h?Math.max(5,Math.min(ci,Math.round(.3/f))):Me,d=l*f+.15,m=h?$(a.dir,this.omega.axis,Math.min(60,this.omega.rate*(d+.5))):a.dir,p=u?Math.acos(Math.max(-1,Math.min(1,m[0]*u.f[0]+m[1]*u.f[1]+m[2]*u.f[2])))*180/Math.PI:0,b=!!u&&p+c>Math.atan(u.tanH)*180/Math.PI-4;if(n.map&&!b&&!h&&n.map.T-s.tModel>.15+(l*f-ee/1e3)/2)return;const R=Math.min(70-c,h?ui:oi),E=h?Math.min(R-10,this.omega.rate*(d+.3)):0,A={...s,dir:E>0?$(a.dir,this.omega.axis,E):a.dir};let T=this.mapCameraOf(A,R,te);h&&this.standPx>0&&T.size*T.size/l>q*this.standPx&&(T=this.mapCameraOf(A,R,te*Math.sqrt(T.size*T.size/l/(q*this.standPx)))),n.cam=T,n.asked=!0,n.askedAt=o,n.N=l,n.moving=h;const w=h?0:(ee/1e3+l*f)/2;n.worker.postMessage({cmd:"state",id:n.reqId=++this.reqId,t:s.tModel+d+w,cull:{f:[...T.f],tanH:T.tanH,margin:6}})}dropFallback(t=!1){const s=this.fb,i=this.res;s.worker?.terminate();const n=[s.map,s.acc].filter(a=>!!a),r=s.state,o=()=>{if(i){for(const a of n)this.delMap(a);if(r)for(const a of C)i.deleteBuffer(r.buf[a])}};t?o():this.defer(o),this.fb=ne()}followCam(t){const s=this.plan;return s.moving?this.mapCameraOf({...t,dir:$(t.dir,this.omega.axis,s.leadDeg)},s.marginDeg,s.pitchScale):this.mapCameraOf(t)}newMap(t,s=this.mapCameraOf(t)){const i=this.res,n=i.gl;n.activeTexture(n.TEXTURE15);const r={cam:s,n:s.size,core:i.target(s.size,s.size,this.accFmt,n.RGBA),env:i.target(s.size/2,s.size/2,this.accFmt,n.RGBA),T:0,kR:0,reading:null,readKey:"",gen:0,red:null};return n.activeTexture(n.TEXTURE0),r}delMap(t){const s=this.res;s&&(s.deleteTarget(t.core),s.deleteTarget(t.env))}recenter(t,s){const i=this.followCam(t);if(s&&s.n===i.size)return s.cam=i,s;if(s){const n=s;this.defer(()=>this.delMap(n))}return this.newMap(t,i)}clearMap(t,s){s.reading=null,s.readKey="",s.gen++,t.disable(t.SCISSOR_TEST);for(const i of[s.core,s.env])t.bindFramebuffer(t.FRAMEBUFFER,i.fbo),t.viewport(0,0,i.w,i.h),t.clearBufferfv(t.COLOR,0,[0,0,0,0])}job(t,s){const i=this.ring;let n=-1;for(let b=0;b<i.length-1;b++)i[b].t<=t+1e-9&&(n=b);let r=!1;n<0&&(n=0),t>i[i.length-1].t+1e-9&&(r=!0,t=i[i.length-1].t,n=i.length-2);const o=!i[n+2],a=i[Math.max(0,n-1)],u=i[n],c=i[n+1],h=i[n+2]??(this.stats.miss3++,c),f=Math.min(1,Math.max(0,(t-u.t)/(c.t-u.t))),l=W[this.scene.level],[d,m]=this.footRange(s),p=u.msg.wx?At(u.msg.wx.pulses,t,d,m,k):ht(l,this.scene,t,d,m,k);return this.stats.eventsDropped+=p.dropped,{T:t,X:{S:[a,u,c,h],...vt(this.opt.mode,f)},events:p.events,dropped:p.dropped,miss:r,red:Rt(u,c,f),miss3:o}}footRange(t){let s=1/0,i=-1/0;for(const n of[-1,0,1])for(const r of[-1,0,1]){const o=[0,1,2].map(c=>t.f[c]+n*t.tanH*t.r[c]+r*t.tanH*t.up[c]),a=Math.hypot(o[0],o[1],o[2]),u=o[2]/a;if(!(u>.02)){s=Math.min(s,-700),i=Math.max(i,700);continue}for(const c of[84,300]){const h=Qe(c,u)*o[0]/a;s=Math.min(s,h),i=Math.max(i,h)}}return[Math.max(-760,s-60),Math.min(760,i+60)]}fillMap(t,s,i){const n=this.job(i,s.cam),r=this.nCur;s.T=n.T,s.kR=n.X.S[1].msg.kR,this.clearMap(t,s),this.drawRed(t,s,n);for(let o=0;o<r;o++)this.drawSlice(t,s,n,o,r);return s}drawRed(t,s,i){s.red=i.red;const n=this.pRed;if(!n||!this.redTex||!i.red||this.debugRedOff)return;const r=nt,o=new Float32Array(2*r);for(let c=0;c<r;c++)o[2*c]=i.red.A[c],o[2*c+1]=i.red.Y[c];t.activeTexture(t.TEXTURE15),t.bindTexture(t.TEXTURE_2D,this.redTex),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.texSubImage2D(t.TEXTURE_2D,0,0,0,r,1,t.RG,t.FLOAT,o),t.useProgram(n.prog),t.bindVertexArray(this.vaoD),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.bindFramebuffer(t.FRAMEBUFFER,s.env.fbo),t.viewport(0,0,s.env.w,s.env.h),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD),t.colorMask(!1,!1,!0,!1);const a=c=>n.loc.get(c),u=s.cam;t.uniform3fv(a("uF"),u.f),t.uniform3fv(a("uR"),u.r),t.uniform3fv(a("uU"),u.up),t.uniform1f(a("uTanH"),u.tanH),t.uniform1f(a("uSize"),s.env.w),t.uniform2f(a("uObs"),0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.redTex),t.uniform1i(a("uLine"),0),t.drawArrays(t.TRIANGLES,0,3),t.colorMask(!0,!0,!0,!0),t.disable(t.BLEND),t.bindVertexArray(null),this.stats.redPasses++}drawSlice(t,s,i,n,r){const o=this.expandSlice(t,i.X,n,r,s);return this.rasterSlice(t,s,o,i),o}groups(){return Ti(this.tables.length>1?1:0)}sliceSegs(t,s){let i=0;for(const n of this.groups()){const r=this.tables[n.tab].meta,o=Math.ceil(r.B/s);i+=o*Math.max(...t.S.map(a=>a.n[n.set]))}return i}expandSlice(t,s,i,n,r){const o=this.pX,a=this.out,u=this.sliceSegs(s,n),c=r.cam;u*D*4>a.cap&&(a.cap=Math.ceil(u*D*4*1.25),t.bindBuffer(t.ARRAY_BUFFER,a.buf),t.bufferData(t.ARRAY_BUFFER,a.cap,t.DYNAMIC_COPY),this.res.recordBuffer(a.buf,a.cap),t.bindBuffer(t.ARRAY_BUFFER,null)),t.useProgram(o.prog),t.bindVertexArray(this.vaoX),t.enable(t.RASTERIZER_DISCARD);const h=d=>o.loc.get(d);t.uniform3fv(h("uF"),c.f),t.uniform3fv(h("uR"),c.r),t.uniform3fv(h("uU"),c.up),t.uniform1f(h("uTanH"),c.tanH),t.uniform4fv(h("uCW"),Float32Array.from(s.w)),t.uniform1f(h("uU2"),s.u2),t.uniform1f(h("uWC"),s.wc),t.uniform1f(h("uSlice"),i),t.uniform1f(h("uNS"),n),t.uniform1f(h("uCutB"),this.opt.cut),t.uniform1f(h("uObsX"),0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,this.kTex),t.uniform1i(h("uK"),1),t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,this.tfo),u&&(t.bindBufferRange(t.TRANSFORM_FEEDBACK_BUFFER,0,a.buf,0,u*D*4),t.beginTransformFeedback(t.POINTS));const f=[];let l=0;for(const d of this.groups()){const m=this.tables[d.tab],p=m.meta,b=Math.ceil(p.B/n),R=Math.max(...s.S.map(E=>E.n[d.set]));if(!R){f.push({tgt:d.tgt,tab:d.tab,pulse:d.pulse,first:l,count:0});continue}t.uniform1f(h("uPx"),2/(d.tgt==="env"?r.n/2:r.n)),t.uniform1f(h("uB"),p.B),t.uniform1f(h("uBW"),p.bandW),t.uniform1f(h("uNG"),p.ngroup),t.uniform1f(h("uGR"),p.groupRows),t.uniform1f(h("uNL"),p.nl),t.uniform1f(h("uPulse"),d.pulse),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,m.coef),t.uniform1i(h("uCoef"),2),s.S.forEach((E,A)=>{t.bindBuffer(t.ARRAY_BUFFER,E.buf[d.set]);for(let T=0;T<3;T++)t.vertexAttribPointer(3*A+T,4,t.FLOAT,!1,N*4,16*T)}),t.bindBuffer(t.ARRAY_BUFFER,null);for(let E=0;E<b;E++)t.vertexAttrib1f(12,E),t.drawArrays(t.POINTS,0,R);f.push({tgt:d.tgt,tab:d.tab,pulse:d.pulse,first:l,count:b*R}),l+=b*R}return u&&t.endTransformFeedback(),t.bindBufferBase(t.TRANSFORM_FEEDBACK_BUFFER,0,null),t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,null),t.disable(t.RASTERIZER_DISCARD),t.bindVertexArray(null),t.activeTexture(t.TEXTURE0),this.stats.segsLastSlice=l,f}rasterSlice(t,s,i,n){const r=this.pR,o=s.cam,a=l=>r.loc.get(l);t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.useProgram(r.prog),t.bindVertexArray(this.vaoR),t.uniform3fv(a("uF"),o.f),t.uniform3fv(a("uR"),o.r),t.uniform3fv(a("uU"),o.up),t.uniform1f(a("uTanH"),o.tanH),t.uniform1f(a("uCut2"),this.opt.cut**2);const u=new Float32Array(8*k);n.events.forEach((l,d)=>u.set([l.t0-n.T,l.xc,1/l.w,l.lag,l.vz,l.amp,0,0],8*d)),t.uniform1i(a("uNE"),n.events.length),t.uniform4fv(a("uE"),u),t.uniform1f(a("uPInv"),1/(W[this.scene.level].pulse5?.sig??14)),t.uniform1f(a("uPCons"),us);const c=this.refFor(t,this.scene.level);t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,c),t.uniform1i(a("uRef"),1),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD);let h=null,f=-1;t.bindBuffer(t.ARRAY_BUFFER,this.out.buf);for(const l of i){if(!l.count)continue;const d=l.tgt==="env"?s.env:s.core;if(d!==h&&(h=d,t.bindFramebuffer(t.FRAMEBUFFER,d.fbo),t.viewport(0,0,d.w,d.h),t.uniform1f(a("uSize"),d.w)),l.tab!==f){f=l.tab;const m=this.tables[l.tab],p=m.meta;t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,m.tex),t.uniform1i(a("uTab"),0),t.uniform1f(a("uBW"),p.bandW),t.uniform1f(a("uN"),p.n),t.uniform4f(a("uTabD"),p.width,p.height,p.tilesX,p.tiledW),t.uniform1f(a("uTexH"),p.tiledH)}for(let m=0;m<12;m++)t.vertexAttribPointer(1+m,4,t.FLOAT,!1,D*4,(l.first*D+4*m)*4);t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,l.count)}t.bindBuffer(t.ARRAY_BUFFER,null),t.disable(t.BLEND),t.bindVertexArray(null),t.activeTexture(t.TEXTURE0)}bindMaps(t,s,i,n,r,o,a){[["a",i,a],["b",n,a+2],["c",r??i,a+4]].forEach(([u,c,h])=>{t.uniform3fv(s.loc.get(u+"F"),c.cam.f),t.uniform3fv(s.loc.get(u+"R"),c.cam.r),t.uniform3fv(s.loc.get(u+"U"),c.cam.up),t.uniform2f(s.loc.get(u+"T"),c.cam.tanH,c.n),t.activeTexture(t.TEXTURE0+h),t.bindTexture(t.TEXTURE_2D,c.core.tex),t.uniform1i(s.loc.get(u+"C"),h),t.activeTexture(t.TEXTURE1+h),t.bindTexture(t.TEXTURE_2D,c.env.tex),t.uniform1i(s.loc.get(u+"E"),h+1)}),t.uniform1f(s.loc.get("uAlpha"),o),t.uniform1f(s.loc.get("uReveal"),Te(o,this.nCur)),t.uniform1f(s.loc.get("uHasC"),r?1:0),t.uniform1f(s.loc.get("uKC"),r&&i.kR>0?r.kR/i.kR:1),t.uniform1f(s.loc.get("uCubic"),this.debugCubic?1:0)}debugCubic=!0;display(t,s,i,n,r,o,a=null){const u=this.res;this.pD??=u.program("zoneCurtainDisplay",I,Us);const c=this.pD;t.useProgram(c.prog),t.bindVertexArray(this.vaoD),t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),t.bindFramebuffer(t.FRAMEBUFFER,s.fbo),t.viewport(0,0,s.w,s.h),t.uniform3fv(c.loc.get("uF"),i.f),t.uniform3fv(c.loc.get("uR"),i.r),t.uniform3fv(c.loc.get("uU"),i.up),t.uniform1f(c.loc.get("uTanH"),i.tanH),t.uniform1f(c.loc.get("uSize"),s.w),this.bindMaps(t,c,n,r,a,o,0),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null),t.activeTexture(t.TEXTURE0)}debugState(){return{ring:this.ring.map(t=>({t:t.t,k:t.k,sets:t.msg.sets})),tables:this.tables?.map(t=>t.meta)??null,scene:this.scene,A:this.A,B:this.B,Ta:this.Ta,Tb:this.Tb,trash:this.trash.length,w:this.w,retiring:this.retiring!==null,retShare:this.retShare}}debugJob(t,s,i,n){const r=t.map(f=>this.ring[f]),o=W[this.scene.level],[a,u]=this.footRange(n),c=r[1].msg.wx,h=c?At(c.pulses,i,a,u,k):ht(o,this.scene,i,a,u,k);return{T:i,X:{S:r,...vt(this.opt.mode,s)},events:h.events,dropped:h.dropped,miss:!1,red:Rt(r[1],r[2],s)}}async debugRun(t,s,i,n,r){this.res=s,this.worker&&this.restart(),this.flush(),this.scene=i,this.key=JSON.stringify(i),this.lastT=null,this.start({tModel:n[0]+this.opt.dt}),this.pX||this.programs(t,{res:s,floatBlend:r}),this.askPrograms(1/0),this.inFlight=!0;for(const u of n)this.post({cmd:"state",id:++this.reqId,t:u,cull:null});const o=performance.now();for(;this.pending.length<n.length||!(this.tables||this.pendingTables)||!this.programReady();){if(this.stats.failed)throw new Error(this.stats.failed);if(performance.now()-o>12e4)throw new Error("zoneCurtain debugRun: no states after 120 s");await new Promise(u=>{this.waiters.push(u),setTimeout(u,100)})}const a=at(t);try{this.take(t)}finally{ot(t,a)}}readOut(t,s,i){const n=new Float32Array(i*D);return t.bindBuffer(t.ARRAY_BUFFER,this.out.buf),t.getBufferSubData(t.ARRAY_BUFFER,s*D*4,n),t.bindBuffer(t.ARRAY_BUFFER,null),n}readTarget(t,s){const i=new Float32Array(s.w*s.h*4);return t.bindFramebuffer(t.FRAMEBUFFER,s.fbo),t.readPixels(0,0,s.w,s.h,t.RGBA,t.FLOAT,i),i}}function ye(e,t=e.view.centerMm){const s=e.horizonFrame,i=e.view.point,n=e.view.skyFrame,r=e.geometry.focalMm;if(!s||!n)return null;const o=[t[0]/r,t[1]/r,1],a=[0,1,2].map(f=>i[f]*o[0]+i[3+f]*o[1]+i[6+f]*o[2]);if(!(a[2]>1e-6))return null;const u=[0,1,2].map(f=>n.axis[f]+a[0]/a[2]*n.west[f]+a[1]/a[2]*n.north[f]),c=Math.hypot(u[0],u[1],u[2]),h=f=>(u[0]*f[0]+u[1]*f[1]+u[2]*f[2])/c;return[h(s.east),h(s.north),h(s.zenith)]}function ki(e,t,s){const i=ye(t);if(!i)return e.zoneCurtain;let n=e.zoneCurtain;n||(n=e.zoneCurtain=new wi({},void 0,He({pinned:_t.zoneSeed,automated:typeof navigator<"u"&&navigator.webdriver===!0,reducedMotion:De(),random:qe}),We(typeof location<"u"?location.search:null,typeof navigator<"u"&&navigator.webdriver===!0)),n.caps=_i(t.gl,t.res,t.floatBlend),n.caps.reason&&(n.stats.failed=`capability: ${n.caps.reason}`),n.caps.reason&&console.warn("[zoneCurtain] this device cannot run the new curtain; the old aurora stays:",n.caps.reason));const r=t.geometry,o=2*Math.atan(r.cathodeRadiusMm/r.focalMm)*180/Math.PI,a=Oe(r.pitchMm,r.focalMm)*Math.atan(r.pitchMm/r.focalMm)*180/Math.PI,u=Mi(t.gl),c=n.stats.frames,h=Ie.getState().view.integrationMs,f=h>0?h/1e3:ge;return n.frame({gl:t.gl,res:t.res,tModel:s.timeS-(e.setup?.startS??0),dir:i,fovDeg:o,level:s.level??0,seed:n.seed,floatBlend:t.floatBlend,dtSeconds:t.dtSeconds,lite:s.detail==="lite",pitchDeg:a,holdS:f}),u&&Fi(t.gl,u,n.stats.frames>c),n}const Ne={on:!1,sliceMs:[],otherMs:[],disjoint:0,queries:[]};function Mi(e){const t=Ne;if(!t.on&&!t.queries.length)return null;const s=e.getExtension("EXT_disjoint_timer_query_webgl2");if(!s)return null;for(;t.queries.length;){const{q:n,slice:r}=t.queries[0];if(!e.getQueryParameter(n,e.QUERY_RESULT_AVAILABLE))break;t.queries.shift(),e.getParameter(s.GPU_DISJOINT_EXT)?t.disjoint++:(r?t.sliceMs:t.otherMs).push(Number(e.getQueryParameter(n,e.QUERY_RESULT))/1e6),e.deleteQuery(n)}if(!t.on||t.queries.length>=8)return null;const i=e.createQuery();return i&&e.beginQuery(s.TIME_ELAPSED_EXT,i),i}function Fi(e,t,s){const i=e.getExtension("EXT_disjoint_timer_query_webgl2");e.endQuery(i.TIME_ELAPSED_EXT),Ne.queries.push({q:t,slice:s})}function Ui(e,t,s,i,n,r){const o=_t.zoneCurtainDebug>0?_t.zoneCurtainDebug:1;e.compose(t.gl,i.u_auRate,i.u_auClass,s.level??0,o,a=>{t.viewUniforms(a),t.bindHorizon(a,0),t.bindLut(a,1),t.res.bindTex(8,n,a,"u_auExt"),t.res.bindTex(9,r,a,"u_cloud"),ce(t.gl,a,{u_auExtOn:i.u_auExtOn,u_auRatioCap:i.u_auRatioCap,...Ue(s.cloud)})},()=>t.draw())}function Di(e,t,s,i){const n=ye(t,[0,0]);if(!n)return;const r=t.geometry,o=Le(s);e.meter(t.gl,{axis:n,radiusDeg:Math.atan(r.cathodeRadiusMm/r.focalMm)*180/Math.PI,level:s.level??0,cls:o.u_auClass,rates:s.rates,ext:s.extinction,bind:a=>{t.bindHorizon(a,0),t.bindLut(a,1),t.res.bindTex(4,i,a,"u_auExt"),ce(t.gl,a,{u_auExtOn:o.u_auExtOn})}})}export{ye as viewAxisEnu,Ui as zoneCompose,ki as zoneFrame,Ne as zoneGpuTimer,Di as zoneMeter};
