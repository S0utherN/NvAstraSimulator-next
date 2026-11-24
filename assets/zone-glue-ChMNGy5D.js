import{c$ as O,d0 as _e,d1 as U,d2 as Jt,d3 as te,d4 as Fe,d5 as Me,d6 as we,d7 as L,d8 as ee,d9 as Se,cM as ye,da as Ne,b as Ce,bA as Be,db as Pe}from"./boot-BcChhF6c.js";import{F as vt}from"./app-D3T6xnqM.js";import{N as C,b as Z,G as ke,c as z,d as Ue,H as At,e as re,h as se,u as ae,r as S,p as q,s as Y,f as De,g as ne,l as wt,C as ie,R as oe,Z as W}from"./levels-BzEYxaKo.js";import"./vendor-DHsdD_W9.js";import"./hosting-B0vk-hjX.js";import"./error-log-BO2DVqG-.js";function Oe(e){return e.pinned!==null?e.pinned>>>0:e.automated||e.reducedMotion?0:e.random()>>>0}function Ie(e,t){const r=e?new URLSearchParams(e).get("zoneWeather"):null;return r==="0"?!1:r==="1"?!0:!t}function Le(){try{const e=new Uint32Array(1);return crypto.getRandomValues(e),e[0]}catch{return Math.floor(Math.random()*4294967296)>>>0}}const ze=20,ge=.25,Xe=6,Ge=61,We=(e,t)=>{const r=Z*t,s=e*(2*Z+e);return s/(r+Math.sqrt(r*r+s))},He=e=>new Float32Array(e*C*2).fill(1),St=[116,109,102,96],yt=[30,26,22,18],qe=3.5;function $e(e){const t=ne(e,0,1)*3,r=Math.min(2,Math.floor(t)),s=t-r;return{peak:wt(St[r],St[r+1],s),up:wt(yt[r],yt[r+1],s),lo:qe}}const Ve=e=>1/(1+Math.exp(-(e-101)/2.5)),Ze=e=>1-Y((e-(De-30))/30),Nt=2.2,Ct=4.5,Bt=1.6,Pt=Math.sqrt(Math.PI/2);function Ye(e,t,r){const s=e-t.peak,a=s>=0?Math.exp(-s/t.up):Math.exp(-.5*(s/Nt)**2),i=s>=0?Math.exp(-.5*(s/Ct)**2):Math.exp(-.5*(s/Bt)**2);return(1-r)*a+r*(Nt*Pt+t.up)/((Bt+Ct)*Pt)*i}const kt=20,Qe=120,Ke=e=>ne(.3+.6*e,.3,.85),je=.8;function Je(e,t,r){const s=e-(t.peak+1+12*r*r);return s<=0?0:(1-Math.exp(-s/(6+8*r)))*Math.exp(-s/(kt+(Qe-kt)*r))}let nt=null;function tr(){if(nt)return nt;const e=Ue,t=[new Float32Array(C*e),new Float32Array(C*e)],r=[new Float32Array(C*z*e),new Float32Array(C*z*e)];for(let s=0;s<C;s++){const a=s/(C-1),i=$e(a),o=Ke(a);i.up*=je;for(let n=0;n<e;n++){const c=At+n*re,u=Ze(c),f=Ve(c),l=Ye(c,i,o)*u;t[0][s*e+n]=l,t[1][s*e+n]=l*f;for(let h=0;h<z;h++){const d=Je(c,i,h/(z-1))*u,m=(s*z+h)*e+n;r[0][m]=d,r[1][m]=d*f}}}return nt={n:e,low:t,ray:r,nlam:z}}const er=1;function rr(e,t,r,s,a){const i=e.pulse5,o=[];if(i==null)return o;const n=Math.ceil((360/i.vz[0]+3)/i.P)+1;for(let c=Math.floor(t/i.P)-n;c<=Math.floor(t/i.P)+1;c++)for(let u=Math.floor((s-500)/i.cell);u<=Math.floor((a+500)/i.cell);u++){const f=se(u,c,7331+101*r);ae(f)>=i.prob||o.push({t0:(c+.8*S(f,1))*i.P,vz:q(i.vz,S(f,2)),amp:i.amp*(.6+.4*S(f,3)),xc:(u+S(f,4))*i.cell,w:q(i.w,S(f,5)),lag:(S(f,6)<.5?-1:1)*q(i.lag,S(f,7))/100})}return o}const ce=70,ue=.25,Q=1401;function sr(e){const t=tr(),r=t.n,s=new Float32Array(Q),a=e.pulse5;if(!a)return s;const i=Math.round(e.hard0*(C-1)),o=t.low[0],n=t.ray[0],c=(i*z+3)*r;let u=0;for(let f=0;f<r;f++)u+=o[i*r+f]+.15*n[c+f];for(let f=0;f<Q;f++){const l=ce+f*ue;let h=0;for(let d=0;d<r;d++){const m=At+d*re;h+=(o[i*r+d]+.15*n[c+d])*ke((m-l)/a.sig)}s[f]=h/u}return s}function it(e,t,r,s,a,i=16){if(!e.pulse5||t.noPulse||t.ticks)return{events:[],dropped:0};const o=rr(e,r,t.seed??0,s,a).filter(n=>{const c=Math.max(s,n.xc-2.8*n.w),u=Math.min(a,n.xc+2.8*n.w);return u>=c?[c,u,Math.min(u,Math.max(c,n.xc))].some(f=>{const l=r-(n.t0+(f-n.xc)*n.lag);return l>0&&70+n.vz*l<=420}):!1});return o.sort((n,c)=>c.amp-n.amp),{events:o.slice(0,i),dropped:Math.max(0,o.length-i)}}const X=8,$=256;function Ut(){return O.map(e=>_e(e))}function Dt(e){const t=[];for(let r=0;r<e.length;r++)(e[r]===0||e[r]===1)&&t.push(r);if(t.length>4)throw new RangeError("zoneMeterChannels: more than four main-curtain components");return t}function Ot(e){for(let t=0;t<e.length;t++)if(e[t]===2)return t;return-1}function ar(e,t,r){const s=Math.PI/180,a=Math.tan(Math.min(80,Math.max(.01,e))*s),i=X,o=r??Math.min($,Math.max(4*i,Math.ceil(2*a/Math.tan(Math.max(.001,t)*s)/i)*i));if(o%i||o>$)throw new RangeError(`zoneMeterGrid: side ${o} not a multiple of ${i} up to ${$}`);let n=0;for(let c=0;c<o;c++)for(let u=0;u<o;u++)nr(u,c,o)&&n++;return{n:o,tanR:a,count:n}}const nr=(e,t,r)=>{const s=2*e+1-r,a=2*t+1-r;return s*s+a*a<=r*r};function ir(e){const t=Math.hypot(e[0],e[1],e[2]),r=[e[0]/t,e[1]/t,e[2]/t];let s=r[1],a=-r[0];const i=Math.hypot(s,a);return i<1e-6?(s=1,a=0):(s/=i,a/=i),{F:r,R:[s,a,0],U:[a*r[2],-s*r[2],s*r[1]-a*r[0]]}}function ot(e){if(!e.length)return null;const t=O.length,r=new Float64Array(t),s=new Float64Array(t);let a=0;for(const i of e){const o=i.A??i.B,n=i.B??i.A;if(!o||!n){a++;continue}const c=Math.min(1,Math.max(0,i.alpha)),u=Math.max(0,i.share);for(let f=0;f<t;f++){const l=o.count?o.sums[f]/o.count:0,h=n.count?n.sums[f]/n.count:0;r[f]=r[f]+u*((1-c)*l+c*h),s[f]=s[f]+u*((1-c)*o.box[f]+c*n.box[f])}}return{means:r,box:s,pending:a}}const or=(e,t)=>O.map(r=>t[r]>0?e[r]*t[r]:0);function It(e,t,r,s,a){or(e,t);let i=0,o=0;s&&O.forEach((c,u)=>{(r[u]===0||r[u]===1||r[u]===2)&&(i+=e[c]*s.means[u],o+=e[c]*s.box[u])});const n=cr();return{mean:i+n.mean,peak:o+n.peak}}function cr(e,t,r){return{mean:0,peak:0}}const ur=[{cell:2.4,epoch:5,prob:.6,w:[.18,.45],lnS:.9,life:[5,14],drift:.15,seed:61},{cell:6.8,epoch:8,prob:.55,w:[.35,.9],lnS:.6,life:[8,22],drift:.12,seed:62}];let fe=1,he=1;function fr(e,t,r=0,s={f:0,lam:0,fb:0}){let a=0,i=0,o=0;for(const n of ur){const c=Math.ceil(n.life[1]/n.epoch)+1,u=Math.floor(e/n.cell);for(let f=Math.floor(t/n.epoch)-c;f<=Math.floor(t/n.epoch);f++)for(let l=u-2;l<=u+2;l++){const h=se(l,f,9e3+n.seed+131*r);if(ae(h)>=n.prob)continue;const d=(f+S(h,1))*n.epoch,m=q(n.life,S(h,2)),p=(t-d)/m;if(!(p>0&&p<1))continue;const T=(l+S(h,3))*n.cell+n.drift*(2*S(h,4)-1)*(t-d),_=q(n.w,S(h,5)),E=(e-T)/_;if(E*E>16)continue;const A=Math.sqrt(-2*Math.log(Math.max(1e-9,S(h,6))))*Math.cos(2*Math.PI*S(h,7)),F=Math.exp(n.lnS*A-.5*n.lnS*n.lnS)*Y(p/.25)*(1-Y((p-.7)/.3)),b=F*Math.exp(-.5*E*E),R=S(h,8);a+=b,i+=b*R*R*R,n.cell>5&&(o+=b)}}return s.f=a*fe,s.fb=o*he,s.lam=a>1e-9?i/a:.3,s}{let e=0,t=0,r=0;const s={f:0,lam:0,fb:0};for(let a=0;a<6e3;a++)fr(a*.731+13,50+a*.37,0,s),e+=s.f,t+=s.fb,r++;fe=r/e,he=r/t}const w={DX:8,HALF:720,SIG_N:16,HP:62,H0:150,H1:620,NSEG:24,TAU_RAD:110,Q200:.098,QH:42},et=Math.round(2*w.HALF/w.DX)+1,hr=e=>1/(1/w.TAU_RAD+w.Q200*Math.exp(-(e-200)/w.QH)),lr=e=>e<=w.H0?0:Y((e-w.H0)/20)*Math.exp(-(e-w.H0)/w.HP)*(hr(e)/w.TAU_RAD)*(1-Y((e-(w.H1-60))/60));let ct=null;function dr(){if(ct)return ct;const e=w,t=4700,r=(e.H1-e.H0)/t,s=new Float64Array(t+1);for(let o=0;o<t;o++)s[o+1]=s[o]+lr(e.H0+(o+.5)*r)*r;const a=[];let i=0;for(let o=0;o<e.NSEG;o++){const n=s[t]*(o+.5)/e.NSEG;for(;s[i+1]<n;)i++;a.push(e.H0+(i+(n-s[i])/(s[i+1]-s[i]))*r)}return ct={mid:a,norm:s[t]}}const le=.06,mr=8,_t=2,V=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],Ft=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],rt=e=>{const t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]};function pr(e){const t={axis:[0,0,1],rate:0};if(e.length<2)return t;const r=e[0],s=e[e.length-1],a=(s.t-r.t)/1e3;if(!(a>.001))return t;const i=Ft(r.d,s.d),o=Math.hypot(i[0],i[1],i[2]),n=Math.atan2(o,V(r.d,s.d))*180/Math.PI;return o>1e-9?{axis:[i[0]/o,i[1]/o,i[2]/o],rate:n/a}:t}function H(e,t,r){const s=r*Math.PI/180,a=Math.cos(s),i=Math.sin(s),o=V(t,e),n=Ft(t,e);return rt([e[0]*a+n[0]*i+t[0]*o*(1-a),e[1]*a+n[1]*i+t[1]*o*(1-a),e[2]*a+n[2]*i+t[2]*o*(1-a)])}const Er=1.25,Lt=10;function zt(e,t,r){if(!(e>=_t))return{moving:!1,N:r,pitchScale:1,marginDeg:5,leadDeg:0};const s=Math.min(r,Math.max(8,Math.round(.25/Math.max(.001,t))));return{moving:!0,N:s,pitchScale:Er,marginDeg:Math.min(30,5+e*s*t+1),leadDeg:Math.min(45,e*2*s*t)}}function br(e,t){return t.rate>=_t?{f:H(e,t.axis,Math.min(60,t.rate*.75)),extraDeg:Math.min(75,t.rate*.8)}:{f:[e[0],e[1],e[2]],extraDeg:0}}function ut(e,t){const r=V(t,e.f);if(!(r>.001))return 0;const s=Math.max(Math.abs(V(t,e.r)/(r*e.tanH)),Math.abs(V(t,e.up)/(r*e.tanH)));if(s>1)return 0;const a=Math.min(1,Math.max(0,(1-s)/le));return Math.max(1e-6,a*a*(3-2*a))}const de=(e,t)=>Math.min(1,Math.max(0,e*Math.max(1,t)/Math.min(mr,Math.max(1,t))));function xr(e,t,r,s,a){if(e>=1&&t>=1)return{a:1-s,b:s,c:0};const i=e*(1-s),o=t*(a+(s-a)*e);return{a:i,b:o,c:Math.max(0,1-i-o)*r}}function ft(e,t,r,s,a,i,o,n=25){const c=rt(e),u=Math.hypot(c[0],c[1])>1e-6?rt([c[1],-c[0],0]):[1,0,0],f=Ft(u,c),l=Math.tan(t),h=de(i,o),d={n:0,nA:0,nB:0,nC:0,sA:0,sB:0,sC:0,none:0,fallbackOnly:0,shown:0};for(let p=0;p<n;p++)for(let T=0;T<n;T++){const _=(2*T+1-n)/n,E=(2*p+1-n)/n;if(_*_+E*E>1)continue;const A=rt([c[0]+l*(_*u[0]+E*f[0]),c[1]+l*(_*u[1]+E*f[1]),c[2]+l*(_*u[2]+E*f[2])]),F=r?ut(r,A):0,b=s?ut(s,A):0,R=a?ut(a,A):0,x=xr(F,b,R,i,h);d.n++,F>0&&d.nA++,b>0&&d.nB++,R>0&&d.nC++,d.sA+=x.a,d.sB+=x.b,d.sC+=x.c,F<=0&&b<=0&&R<=0?d.none++:F<=0&&b<=0&&d.fallbackOnly++,d.shown+=x.a+x.b+x.c}const m=Math.max(1,d.n);return d.none/=m,d.fallbackOnly/=m,d.shown/=m,d}function Rr(e,t,r,s,a){const i=O.length,o=new Float64Array(i),n=new Float64Array(i),c=t??r,u=r??t;let f=c&&u?0:1;const l=[[c,e.nA?e.sA/e.nA:0],[u,e.nB?e.sB/e.nB:0],[s,e.nC?e.sC/e.nC:0]];e.sC>0&&!s&&f++;for(const[h,d]of l)if(!(!h||!(d>0)))for(let m=0;m<i;m++)o[m]=o[m]+a*d*(h.count?h.sums[m]/h.count:0),n[m]=n[m]+a*d*h.box[m];return{means:o,box:n,pending:f}}const M=e=>{const t=String(e);return/[.eE]/.test(t)?t:t+".0"},me=[];for(const e of[-1,1])for(const t of[-1,1])for(const r of[-1,1])me.push(`c ${e<0?"-":"+"} A ${t<0?"-":"+"} E ${r<0?"-":"+"} N`);const ht=["rPL0","rPL1","rPF00","rPF01","rPF10","rPF11"],lt=["rGL0","rGL1","rGF00","rGF01","rGF10","rGF11"],vr=["wl0","wl1","wf00","wf01","wf10","wf11"],G=(e,t)=>e.map((r,s)=>`${vr[s]} * cf(${r}, ${t}.0, yy)`).join(" + "),Tr=U+`out vec4 o; void main() { o = vec4(0.0); }
`,Ar=U+`
uniform sampler2D uT;
out vec4 o;
void main() { o = vec4(textureLod(uT, vec2(0.5, 0.5), 0.0).r, 0.25, 0.0, 0.0); }
`,_r=U+`
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
const float RE = ${M(Z)}, REFH = ${M(oe)}, COTD = ${ie}, HLO = ${M(At)}, NCH = ${M(C)}, TWO_PI = 6.283185307179586;
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
  vP0 = ${G(ht,0)};
  vG0 = ${G(lt,0)};
  if (info.y > 1.5) {
    vP1 = ${G(ht,1)};
    vG1 = ${G(lt,1)};
  }
  if (info.y > 2.5) {
    vP2 = ${G(ht,2)};
    vG2 = ${G(lt,2)};
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
${me.map((e,t)=>`  vec3 p${t} = pj(${e});`).join(`
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
  vQa = vec4(lo, hi); vQb = vec4(dr, info.y, mode);
}
`,Fr=["vRx","vRy","vAn","vP0","vP1","vP2","vG0","vG1","vG2","vQa","vQb","vPx"],D=48,Mr=U+`
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
`,k=16,wr=U+`
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
const float RE = ${M(Z)}, SQ_PI_2 = 1.2533141373155003, NZF = ${ze.toFixed(1)}, ZST = ${ge}, POCT = ${Xe.toFixed(1)}, SMAX = ${(Ge-1).toFixed(1)};
const float REF_HW0 = ${M(ce)}, REF_STEP = ${M(ue)}, REF_MAX = ${M(Q-1)};
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
`,pe=`
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
  float r = clamp((1.0 - m) * ${M(1/le)}, 0.0, 1.0);
  return max(1e-6, r * r * (3.0 - 2.0 * r));
}
`,Ee=pe+`uniform vec3 aF, aR, aU, bF, bR, bU, cF, cR, cU;
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
`,Sr=U+`
uniform vec3 uF, uR, uU;
uniform float uTanH, uSize;
out vec4 o;
`+Ee+`
void main() {
  float px = (2.0 * gl_FragCoord.x / uSize - 1.0) * uTanH, py = (2.0 * gl_FragCoord.y / uSize - 1.0) * uTanH;
  o = mapsAt(normalize(uF + px * uR + py * uU));
}
`,yr=Jt("STAR_SKY")+te+Fe+Me+`
uniform float uRate[5];
uniform int uClass[5];
uniform sampler2D u_auExt;
uniform int u_auExtOn;
uniform float u_auRatioCap;
out vec4 o;
`+Ee+`
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
`,Nr=U+`
uniform vec3 uF, uR, uU;
uniform float uTanH, uSize;
uniform sampler2D uLine;
uniform vec2 uObs;
out vec4 oCol;
const float RE = ${M(Z)}, REFH = ${M(oe)}, COTD = ${ie}, X0 = ${M(-720)}, DXL = ${M(w.DX)}, FMAX = ${M(et-1.001)}, SIGN = ${M(w.SIG_N)};
const float NORM = ${M(1/(Math.sqrt(2*Math.PI)*w.SIG_N*w.NSEG))};
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
${dr().mid.map(e=>`  I += redAt(${M(e)});`).join(`
`)}
  oCol = vec4(0.0, 0.0, I * NORM, 0.0);
}
`,Cr=`
uniform sampler2D u_auExt;
uniform int u_auExtOn;
float auExt(int c, float x) {
  if (u_auExtOn == 0) return 1.0;
  int i0 = int(floor(x)), i1 = min(i0 + 1, u_hzNodes - 1);
  return mix(texelFetch(u_auExt, ivec2(i0, c), 0).r, texelFetch(u_auExt, ivec2(i1, c), 0).r, x - float(i0));
}
`,Br=Jt("STAR_SKY")+te+`
uniform vec3 uMF, uMR, uMU;
uniform float uTanR, uN;
uniform vec3 mF, mR, mU;
uniform vec2 mT;
uniform sampler2D mC, mE;
uniform int uComp[4], uCls[4];
uniform float uK[4];
out vec4 o;
`+Cr+pe+`
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
`,Pr=U+`
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
`,kr=U+`
uniform sampler2D uB;
uniform int uNB, uOff;
out vec4 o;
void main() {
  int kind = int(gl_FragCoord.x) - uOff;
  vec4 s = vec4(0.0), bb = vec4(0.0);
  float best = -1.0, cnt = 0.0;
  for (int j = 0; j < ${$/X}; j++) {
    if (j >= uNB) break;
    for (int i = 0; i < ${$/X}; i++) {
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
`,dt={maxTextureSize:4096,maxVertexAttribs:13,maxTfInterleaved:D,maxVertexTextureUnits:3,maxTextureUnits:16,maxFragmentUniformVectors:64,maxVertexUniformVectors:64},gt={filter:.02,blend:.001},Mt=e=>e?"rgba32f":"rgba16f",Ur={maxTextureSize:"MAX_TEXTURE_SIZE",maxVertexAttribs:"MAX_VERTEX_ATTRIBS",maxTfInterleaved:"MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS",maxVertexTextureUnits:"MAX_VERTEX_TEXTURE_IMAGE_UNITS",maxTextureUnits:"MAX_TEXTURE_IMAGE_UNITS",maxFragmentUniformVectors:"MAX_FRAGMENT_UNIFORM_VECTORS",maxVertexUniformVectors:"MAX_VERTEX_UNIFORM_VECTORS"};function Xt(e){if(!e.colorBufferFloat)return"EXT_color_buffer_float missing (float colour targets)";if(!e.fence)return"fenceSync missing (the meter's read-back)";for(const t of Object.keys(dt))if(!(e[t]>=dt[t]))return`${Ur[t]} ${e[t]} < ${dt[t]}`;return e.probeError?`probe: ${e.probeError}`:e.filterProbe===null||!(Math.abs(e.filterProbe-.5)<=gt.filter)?`RGBA16F linear filtering: probe ${e.filterProbe} (0.5 expected)`:e.blendProbe===null||!(Math.abs(e.blendProbe-.5)<=gt.blend)?`additive blending into ${Mt(e.floatBlend).toUpperCase()}: probe ${e.blendProbe} (0.5 expected)`:null}const Gt=.5,Dr=8,Or=e=>Math.min(Math.max(0,e),Gt/Dr)/Gt;function Ir(e){const t=we("auroral-zone",e);return O.map(r=>t[r])}function mt(e,t,r,s,a,i=1){const o=e.length,n=new Float32Array(o),c=new Float32Array(o),u=Math.min(1,Math.max(0,a));for(let f=0;f<o;f++){const l=t[f]===0||t[f]===1||t[f]===2,h=r[f];n[f]=l&&h>0?e[f]*(s/h)*u*i:0,c[f]=l?e[f]*(1-u):e[f]}return{map:n,coarse:c}}const y=12,N=["core","env","glow"],Lr=e=>[(-e*e*e+2*e*e-e)/2,(3*e*e*e-5*e*e+2)/2,(-3*e*e*e+4*e*e+e)/2,(e*e*e-e*e)/2],pt=(e,t)=>({w:e==="linear"?[0,1-t,t,0]:Lr(t),u2:t,wc:e==="cubicw"?1:0});function zr(e,t,r,s){const a=Math.PI/180,i=e*a,o=t*a,n=[Math.sin(i)*Math.cos(o),Math.cos(i)*Math.cos(o),Math.sin(o)],c=[Math.cos(i),-Math.sin(i),0],u=[n[1]*c[2]-n[2]*c[1],n[2]*c[0]-n[0]*c[2],n[0]*c[1]-n[1]*c[0]].map(l=>-l),f=u[2]<0?u.map(l=>-l):u;return{f:n,r:c,up:f,tanH:Math.tan(.5*r*a),size:s}}function Wt(e,t,r,s,a=5,i=1){const o=Math.PI/180,n=Math.tan(.5*r*o),c=Math.min(80,.5*r+a),u=Math.tan(c*o),f=2*Math.max(2,Math.round(.5*s*i*u/n));return zr(e,t,2*c,f)}const be=[8,12,16,24],Ht=2.6,gr=.75,qt=3,Xr=16,Gr=6,Wr=40,Hr=55,$t=(e=be[0])=>({n:e,down:0,changes:0});function Vt(e){if(e.length<Gr)return null;const t=[...e].sort((r,s)=>r-s);return t[t.length>>1]}function qr(e,t,r){const s=be,a=s.indexOf(e.n);if(a<0||t===null)return e;const i=o=>({n:o,down:0,changes:e.changes+(o!==e.n?1:0)});if(t!==void 0){const o=u=>s.find(f=>t/f<=u)??s[s.length-1],n=o(Ht),c=o(Ht*gr);return n>e.n?i(n):c<e.n?e.down+1>=qt?i(s[a-1]):{...e,down:e.down+1}:e.down?{...e,down:0}:e}return r>1/Wr&&a<s.length-1?i(s[a+1]):r<1/Hr&&a>0?e.down+1>=qt?i(s[a-1]):{...e,down:e.down+1}:e.down?{...e,down:0}:e}const $r=6,Et={N:8,dt:.25,margin:5,envBands:16,cut:4,mode:"cubic",maxMapSize:512,pitchDegMax:.25},Vr=16,Tt=3,g=6,Zt=16*g*Tt,tt=(e,t)=>{e.push(t),e.length>600&&e.shift()};function bt(e,t,r){const s=e.msg.red,a=t.msg.red;if(!s||!a)return null;const i=s.A.length,o=new Float32Array(i),n=new Float32Array(i);for(let c=0;c<i;c++)o[c]=s.A[c]+(a.A[c]-s.A[c])*r,n[c]=s.Y[c]+(a.Y[c]-s.Y[c])*r;return{A:o,Y:n}}const Zr=3,Yr=30,Qr=38,xe=40,Kr=16,Yt=2e3,jr=10,Jr=400,Qt=()=>({worker:null,asked:!1,pending:null,cam:null,askedAt:0,state:null,acc:null,job:null,slice:0,N:xe,map:null,builtAt:0,moving:!1,reqId:-1,drop:-1});let xt=null;function ts(e,t){const r=e.createProgram(),s=!!e.getExtension("KHR_parallel_shader_compile");t.programs.add(r);const a=[[e.VERTEX_SHADER,_r],[e.FRAGMENT_SHADER,Tr]].map(([f,l])=>{const h=e.createShader(f);return e.shaderSource(h,l),e.compileShader(h),e.attachShader(r,h),{s:h}});e.transformFeedbackVaryings(r,Fr,e.INTERLEAVED_ATTRIBS),e.linkProgram(r);let i=!1,o=null;const n=()=>!s||e.getProgramParameter(r,37297)===!0;t.deferred.set(r,{shaders:a,ready:n});const c=()=>{if(!(i||o||!a.length))try{for(const{s:f}of a)if(!e.getShaderParameter(f,e.COMPILE_STATUS))throw new Error(`zoneCurtainExpand compile: ${e.getShaderInfoLog(f)}`);if(!e.getProgramParameter(r,e.LINK_STATUS))throw new Error(`zoneCurtainExpand link: ${e.getProgramInfoLog(r)}`);i=!0}catch(f){o=f instanceof Error?f:new Error(String(f))}finally{for(const{s:f}of a)e.getAttachedShaders(r)?.includes(f)&&e.detachShader(r,f),e.deleteShader(f);a.length=0,t.deferred.delete(r)}},u=new Map;return{prog:r,loc:{get:f=>(u.has(f)||u.set(f,e.getUniformLocation(r,f)),u.get(f))},done:()=>i||o!==null||n(),check:()=>{if(c(),o)throw o}}}const Kt=120,es=1e3,rs=30,ss=e=>[{set:"core",tgt:"core",tab:0,pulse:1},{set:"env",tgt:"env",tab:e,pulse:1},{set:"glow",tgt:"env",tab:e,pulse:0}],jt=new Float32Array([0,0,1,0,0,1,1,1]),Re=(e,t)=>({level:Math.min(3,Math.max(0,Math.round(e))),seed:t}),as=(e,t)=>({...Re(e,t),weather:{seed:t}});function Rt(e,t,r,s,a){const i=[];for(let o=0;o<e.length;o+=$r){const n={t0:e[o],vz:e[o+1],amp:e[o+2],xc:e[o+3],w:e[o+4],lag:e[o+5]},c=Math.max(r,n.xc-2.8*n.w),u=Math.min(s,n.xc+2.8*n.w);u>=c&&[c,u,Math.min(u,Math.max(c,n.xc))].some(f=>{const l=t-(n.t0+(f-n.xc)*n.lag);return l>0&&70+n.vz*l<=420})&&i.push(n)}return i.sort((o,n)=>n.amp-o.amp),{events:i.slice(0,a),dropped:Math.max(0,i.length-a)}}const ve=[0,1,2,15];function st(e){const t=a=>e.getParameter(a),r=t(e.ACTIVE_TEXTURE),s=ve.map(a=>(e.activeTexture(e.TEXTURE0+a),t(e.TEXTURE_BINDING_2D)));return e.activeTexture(r),{prog:t(e.CURRENT_PROGRAM),vao:t(e.VERTEX_ARRAY_BINDING),array:t(e.ARRAY_BUFFER_BINDING),copyRead:t(e.COPY_READ_BUFFER_BINDING),copyWrite:t(e.COPY_WRITE_BUFFER_BINDING),tfo:t(e.TRANSFORM_FEEDBACK_BINDING),tfBuffer:t(e.TRANSFORM_FEEDBACK_BUFFER_BINDING),discard:e.isEnabled(e.RASTERIZER_DISCARD),blend:e.isEnabled(e.BLEND),viewport:t(e.VIEWPORT),scissor:e.isEnabled(e.SCISSOR_TEST),drawFb:t(e.DRAW_FRAMEBUFFER_BINDING),readFb:t(e.READ_FRAMEBUFFER_BINDING),cull:e.isEnabled(e.CULL_FACE),depth:e.isEnabled(e.DEPTH_TEST),unpack:t(e.UNPACK_ALIGNMENT),unit:r,tex:s}}function at(e,t){if(e.isContextLost()||!t.viewport)return;const r=(s,a)=>{a?e.enable(s):e.disable(s)};r(e.RASTERIZER_DISCARD,t.discard),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,t.tfo),e.bindBuffer(e.TRANSFORM_FEEDBACK_BUFFER,t.tfBuffer),e.bindVertexArray(t.vao),e.bindBuffer(e.ARRAY_BUFFER,t.array),e.bindBuffer(e.COPY_READ_BUFFER,t.copyRead),e.bindBuffer(e.COPY_WRITE_BUFFER,t.copyWrite),e.vertexAttrib4f(12,0,0,0,1),e.useProgram(t.prog),r(e.BLEND,t.blend),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD),r(e.CULL_FACE,t.cull),r(e.DEPTH_TEST,t.depth),r(e.SCISSOR_TEST,t.scissor),e.viewport(t.viewport[0],t.viewport[1],t.viewport[2],t.viewport[3]),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,t.drawFb),e.bindFramebuffer(e.READ_FRAMEBUFFER,t.readFb),e.pixelStorei(e.UNPACK_ALIGNMENT,t.unpack),ve.forEach((s,a)=>{e.activeTexture(e.TEXTURE0+s),e.bindTexture(e.TEXTURE_2D,t.tex[a]??null)}),e.activeTexture(t.unit)}function ns(e,t,r){const s=performance.now(),a=u=>Number(e.getParameter(u)),i=e.getSupportedExtensions()??[],o=!!e.getExtension("EXT_color_buffer_float"),n=r||!!e.getExtension("EXT_float_blend"),c={colorBufferFloat:o,floatBlend:n,fence:typeof e.fenceSync=="function",maxTextureSize:a(e.MAX_TEXTURE_SIZE),maxVertexAttribs:a(e.MAX_VERTEX_ATTRIBS),maxTfInterleaved:a(e.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS),maxVertexTextureUnits:a(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureUnits:a(e.MAX_TEXTURE_IMAGE_UNITS),maxFragmentUniformVectors:a(e.MAX_FRAGMENT_UNIFORM_VECTORS),maxVertexUniformVectors:a(e.MAX_VERTEX_UNIFORM_VECTORS),filterProbe:null,blendProbe:null,probeError:null,reason:null,target:Mt(n),timerQuery:i.includes("EXT_disjoint_timer_query_webgl2"),floatLinear:i.includes("OES_texture_float_linear"),probeMs:0};if(Xt({...c,filterProbe:.5,blendProbe:.5})===null){const u=st(e),f=e.getParameter(e.PIXEL_PACK_BUFFER_BINDING);let l=null,h=null,d=null,m=null;try{e.activeTexture(e.TEXTURE15),l=t.texture(2,1,e.RGBA16F,e.RGBA,e.FLOAT,new Float32Array([0,0,0,0,1,1,1,1])),e.bindTexture(e.TEXTURE_2D,l),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),h=t.target(1,1,n?e.RGBA32F:e.RGBA16F,e.RGBA),d=t.program("zoneCurtainProbe",L,Ar),m=e.createVertexArray(),e.bindVertexArray(m),e.useProgram(d.prog),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,l),e.uniform1i(d.loc.get("uT"),0),e.bindFramebuffer(e.FRAMEBUFFER,h.fbo),e.viewport(0,0,1,1),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.clearBufferfv(e.COLOR,0,[0,0,0,0]),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD),e.drawArrays(e.TRIANGLES,0,3),e.drawArrays(e.TRIANGLES,0,3);const p=new Float32Array(4);e.bindBuffer(e.PIXEL_PACK_BUFFER,null),e.readPixels(0,0,1,1,e.RGBA,e.FLOAT,p);const T=e.getError();T!==e.NO_ERROR&&(c.probeError=`GL error 0x${T.toString(16)}`),c.filterProbe=p[0]/2,c.blendProbe=p[1]}catch(p){c.probeError=(p instanceof Error?p.message:String(p)).split(`
`)[0].slice(0,200)}finally{m&&e.deleteVertexArray(m),d&&(e.deleteProgram(d.prog),t.programs.delete(d.prog)),h&&t.deleteTarget(h),l&&t.deleteTexture(l),at(e,u),e.bindBuffer(e.PIXEL_PACK_BUFFER,f)}}return c.reason=Xt(c),c.probeMs=performance.now()-s,c}class is{opt;caps=null;stats={frames:0,maps:0,misses:0,miss3:0,states:0,workerMs:[],uploadBytes:0,tablesMs:null,tableLayers:[],slots:{core:0,env:0,glow:0},segsLastSlice:0,eventsDropped:0,mainMs:[],glErrors:0,failed:null,target:"",stillFrames:0,restarts:0,composed:0,w:0,meterReads:0,meterBack:0,meterTimeouts:0,meterLatency:0,meterMs:[],meterN:0,meterSteps:[],collectMs:[],collectSteps:[],redPasses:0,first:{made:typeof performance<"u"?performance.now():0,programs:null,linked:null,tables:null,state:null,maps:null,metered:null,faded:null,tablesCached:!1},lostCalls:0,follow:{rate:0,movingMaps:0,fallbacks:0,fbFrames:0,fbMs:0,fbSize:0,fbFailed:null,standingMaps:0},auto:{n:0,via:"",sliceMs:null,mapMs:null,changes:0}};lost(t){return t.isContextLost()?(this.stats.lostCalls++,!0):!1}debugMeterN=null;meterIn=null;debugW=null;debugCompose=!0;debugFadeHold=!1;debugClassGain=null;debugRedOff=!1;debugRedSource=null;debugN=null;get nNow(){return this.nCur}nCur;autoN=$t();tq=void 0;autoCost=[];timeBegin(t){const r=this.tq;if(!r||r.pend.length>=6||t.getQuery(r.ext.TIME_ELAPSED_EXT,t.CURRENT_QUERY))return null;const s=t.createQuery();return s&&t.beginQuery(r.ext.TIME_ELAPSED_EXT,s),s}timeEnd(t,r,s){const a=this.tq;t.endQuery(a.ext.TIME_ELAPSED_EXT),a.pend.push({q:r,n:s})}timePoll(t){if(this.tq===void 0){const a=this.caps?.timerQuery===!1?null:t.getExtension("EXT_disjoint_timer_query_webgl2");this.tq=a?{ext:a,pend:[]}:null}const r=this.tq;if(!r||!r.pend.length)return;const s=!!t.getParameter(r.ext.GPU_DISJOINT_EXT);for(;r.pend.length&&t.getQueryParameter(r.pend[0].q,t.QUERY_RESULT_AVAILABLE);){const a=r.pend.shift();if(!s){const i=Number(t.getQueryParameter(a.q,t.QUERY_RESULT))/1e6;this.autoCost.push(i*a.n),this.autoCost.length>Xr&&this.autoCost.shift(),this.stats.auto.sliceMs=i}t.deleteQuery(a.q)}}seed;debugMaps=null;debugHold=!1;debugScene=null;res=null;worker=null;makeWorker;key="";scene=null;tables=null;tablesAsked=!1;ring=[];pending=[];inFlight=!1;nextT=0;reqId=0;asked=new Map;discard=new Set;resumeAfter=null;recullAt=-1/0;flightId=-1;recull={times:0,states:0};cap={core:0,env:0,glow:0};pX=null;pR=null;pD=null;pC=null;pRed=null;redTex=null;progQueue=[];tableWorker=null;pM=[];mS=null;mB=null;mF=null;pbos=[];reads=[];extIds=new WeakMap;extNext=1;vaoX=null;vaoR=null;vaoD=null;quad=null;tfo=null;out=null;kTex=null;refTex=null;refLevel=-1;accFmt=0;A=null;B=null;acc=null;Ta=0;Tb=0;cur=null;slice=0;fdts=[];lastT=null;waitSince=null;hist=[];omega={axis:[0,0,1],rate:0};plan=zt(0,1/60,Et.N);fb=Qt();view=null;covCache=null;trash=[];w=0;lastWall=null;unmetered=0;retiring=null;retShare=0;retOut=null;outAt=null;holdS=0;retiringShare(t){return this.retiring?this.retShare*(this.retOut??1-t):0}meterPairs(){if(this.retOut===null||!this.retiring||this.debugMaps||this.debugW!==null)return this.pairs();if(!this.programReady())return[];const t=[],r=this.maps(),s=this.retShare*(1-this.w);return s>0&&t.push({m:this.retiring,share:s}),r&&this.w>0&&t.push({m:r,share:this.w}),t}weather;wx=null;constructor(t={},r,s=0,a=!1){this.opt={...Et,...t},this.nCur=this.opt.N,this.seed=s>>>0,this.weather=a,this.autoN=$t(this.opt.N),this.makeWorker=r??(()=>new Worker(new URL(""+new URL("zone-curtain.worker-Dty7D8aV.js",import.meta.url).href,import.meta.url),{type:"module"}))}maps(){return this.debugMaps?this.debugMaps:!this.A||!this.B||!this.linked?null:{A:this.A,B:this.B,alpha:this.alphaNow(),fallback:this.fb.map}}coverageNow(t,r,s=25){const a=this.debugMaps??this.maps();if(!a)return{n:0,nA:0,nB:0,nC:0,sA:0,sB:0,sC:0,none:1,fallbackOnly:0,shown:0};const i=ft(t,r,a.A.cam,a.B.cam,a.fallback?.cam??null,a.alpha,this.nCur,s);return{...i,shown:i.shown*this.weight()}}coverageOfView(t=15){const r=this.view;return r?this.coverageNow(r.dir,r.fovDeg*Math.PI/360,t):null}meterCoverage(t){const r=this.meterIn;if(!r)return null;const s=`${this.stats.frames}|${t.alpha}|${this.nCur}|${t.A.gen}|${t.B.gen}|${t.fallback?.gen??-1}|${r.axis.join(",")}|${r.radiusDeg}`;if(this.covCache?.key===s)return this.covCache.cov;const a=ft(r.axis,r.radiusDeg*Math.PI/180,t.A.cam,t.B.cam,t.fallback?.cam??null,t.alpha,this.nCur,16);return this.covCache={key:s,cov:a},a}alphaNow(){return Math.min(1,this.rotFrames/Math.max(1,this.rotN))}rotFrames=0;rotN=Et.N;pairs(){if(!this.programReady())return[];if(this.debugMaps)return[{m:this.debugMaps,share:this.debugW??this.w}];const t=[],r=this.maps(),s=this.debugW??this.w;if(this.retiring&&this.debugW===null){const a=this.retiringShare(s);a>0&&t.push({m:this.retiring,share:a})}return r&&s>0&&t.push({m:r,share:s}),t}weight(){return(this.debugMaps??this.maps())&&this.programReady()?this.debugW??this.w:0}shares(){let t=0,r=0;for(const s of this.pairs())s.m===this.retiring?r=s.share:t=s.share;return{current:t,retiring:r}}coarseRates(t,r){return this.debugW!==null?this.debugW>0?mt(t,r,t,1,this.debugW).coarse:t:this.stats.failed?t:mt(t,r,t,1,1).coarse}compose(t,r,s,a,i,o,n){const c=this.pairs(),u=this.pC;if(!c.length||!u||!this.debugCompose||this.lost(t))return!1;t.useProgram(u.prog),o(u),t.uniform1iv(u.loc.get("uClass"),Int32Array.from(s));const f=Ir(a),l=this.debugClassGain;for(const{m:h,share:d}of c){this.bindMaps(t,u,h.A,h.B,h.fallback,h.alpha,2);const m=mt(r,s,f,h.A.kR,d,i).map;if(l)for(let p=0;p<m.length;p++)m[p]=m[p]*(l[s[p]]??1);t.uniform1fv(u.loc.get("uRate"),m),n()}return t.activeTexture(t.TEXTURE0),this.stats.composed++,!0}meterField(){const t=this.meterPairs(),r=this.debugMaps?null:this.maps(),s=r?this.meterCoverage(r):null,i=!s||s.nA===s.n&&s.nB===s.n&&s.sC===0&&Math.abs(s.sA+s.sB-s.n)<1e-6?void 0:t.find(u=>u.m===r),o=u=>this.readingOf(u);if(!i||!s||!r)return ot(t.map(({m:u,share:f})=>({A:o(u.A),B:o(u.B),alpha:u.alpha,share:f})));const n=Rr(s,o(r.A),o(r.B),r.fallback?o(r.fallback):null,i.share),c=ot(t.filter(u=>u!==i).map(({m:u,share:f})=>({A:o(u.A),B:o(u.B),alpha:u.alpha,share:f})));if(c)for(let u=0;u<n.means.length;u++)n.means[u]=n.means[u]+c.means[u],n.box[u]=n.box[u]+c.box[u];return{means:n.means,box:n.box,pending:n.pending+(c?.pending??0)}}meterStats(t,r){const s=It(t,r,Ut(),this.meterField()),a=this.retOut===null?s.mean:It(t,r,Ut(),ot(this.pairs().map(({m:i,share:o})=>({A:this.readingOf(i.A),B:this.readingOf(i.B),alpha:i.alpha,share:o})))).mean;return{...s,shown:a}}meter(t,r){if(this.stats.failed||!this.pM.length||this.lost(t)||!this.programReady())return;this.reads.some(E=>E.passed)&&(this.catchUp&&t.deleteSync(this.catchUp),this.catchUp=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0));const s=this.debugMaps?null:this.maps(),a=[...this.meterPairs().map(E=>E.m),...s?[s]:[]];if(!a.length)return;const i=2*r.radiusDeg,o=ar(r.radiusDeg,Math.min(this.opt.pitchDegMax,i/128),this.debugMeterN??void 0);let n=0;r.ext&&(n=this.extIds.get(r.ext)??0,n||(n=this.extNext++,this.extIds.set(r.ext,n)));const c=`${r.axis.map(E=>E.toFixed(4)).join(",")}|${o.n}|${o.tanR.toFixed(6)}|${n}`,u=[],f=this.debugMaps?null:s?.fallback??null,l=E=>E.fallback&&E.fallback===f&&!f.reading?[E.fallback,E.A,E.B]:E.fallback?[E.A,E.B,E.fallback]:[E.A,E.B];for(const E of a)for(const A of l(E))u.length>=Tt||u.includes(A)||A.readKey===c||this.reads.some(F=>F.items.some(b=>b.M===A&&b.gen===A.gen&&b.key===c))||u.push(A);const h=O.map(E=>r.rates[E]??0);this.meterIn={axis:[...r.axis],radiusDeg:r.radiusDeg,n:o.n,tanR:o.tanR,count:o.count,level:r.level,cls:Array.from(r.cls),weights:h};const d=this.w<1||this.retiring!==null||this.debugMaps!==null||this.debugW!==null||u.some(E=>E.reading!==null&&E.readKey==="");if(u.length&&!d&&(this.reads.length>0||performance.now()-this.lastReduceAt<es)&&(u.length=0),!u.length)return;this.lastReduceAt=performance.now();const m=this.steps,p=performance.now(),T=st(t),_=t.getParameter(t.PIXEL_PACK_BUFFER_BINDING);m.fill(0),m[1]=performance.now()-p;try{const E=Dt(r.cls),A=Ot(r.cls);u.forEach((B,I)=>this.reduce(t,B,r,o,I));const F=performance.now(),b=this.res;let R=this.pbos.pop();R||(R=t.createBuffer(),b.buffers.add(R),t.bindBuffer(t.PIXEL_PACK_BUFFER,R),t.bufferData(t.PIXEL_PACK_BUFFER,Zt,t.STREAM_READ),b.recordBuffer(R,Zt)),t.bindFramebuffer(t.FRAMEBUFFER,this.mF.fbo),t.bindBuffer(t.PIXEL_PACK_BUFFER,R),t.readPixels(0,0,g*u.length,1,t.RGBA,t.FLOAT,0),t.bindBuffer(t.PIXEL_PACK_BUFFER,null);const x=performance.now();m[5]=x-F;const v=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);if(m[6]=performance.now()-x,!v)throw this.pbos.push(R),new Error("fenceSync returned null");this.reads.push({items:u.map(B=>({M:B,gen:B.gen,key:c,chan:E,red:A})),sync:v,pbo:R,frames:0}),t.activeTexture(t.TEXTURE0),this.stats.meterReads+=u.length,this.stats.meterN=o.n}catch(E){this.lost(t)||(this.stats.failed=`zoneCurtainMeter: ${E instanceof Error?E.message:String(E)}`)}finally{const E=performance.now();at(t,T),t.bindBuffer(t.PIXEL_PACK_BUFFER,_);const A=performance.now();m[0]=A-p,m[7]=A-E,tt(this.stats.meterMs,m[0]),tt(this.stats.meterSteps,Array.from(m))}}steps=new Float64Array(8);lastReduceAt=-1/0;lastReading=null;catchUp=null;readingOf(t){return t.reading??(this.debugMaps?null:this.lastReading)}collect(t){if(!this.reads.length||this.stats.failed||this.lost(t))return;const r=performance.now(),s=t.getParameter(t.PIXEL_PACK_BUFFER_BINDING),a=[0,0,0];try{this.poll(t,a)}catch(i){this.lost(t)||(this.stats.failed=`zoneCurtainMeter: ${i instanceof Error?i.message:String(i)}`)}finally{t.bindBuffer(t.PIXEL_PACK_BUFFER,s),a[0]=performance.now()-r,tt(this.stats.collectMs,a[0]),tt(this.stats.collectSteps,a)}}poll(t,r){for(const s of[...this.reads]){const a=performance.now(),i=s.passed?t.ALREADY_SIGNALED:t.clientWaitSync(s.sync,0,0);r[1]=r[1]+performance.now()-a;const o=i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED;if(o&&!s.passed){s.passed=!0,s.frames++;continue}if(s.passed&&this.catchUp&&++s.frames<=Kt/2){const n=t.clientWaitSync(this.catchUp,0,0);if(n!==t.ALREADY_SIGNALED&&n!==t.CONDITION_SATISFIED&&n!==t.WAIT_FAILED)continue}if(!(!o&&i!==t.WAIT_FAILED&&++s.frames<=Kt)){if(this.reads.splice(this.reads.indexOf(s),1),t.deleteSync(s.sync),o){const n=new Float32Array(4*g*s.items.length),c=performance.now();t.bindBuffer(t.PIXEL_PACK_BUFFER,s.pbo),t.getBufferSubData(t.PIXEL_PACK_BUFFER,0,n),r[2]=r[2]+performance.now()-c,s.items.forEach((u,f)=>{const l=4*g*f,h=O.length,d=new Float64Array(h),m=new Float64Array(h);u.chan.forEach((p,T)=>{d[p]=n[l+T],m[p]=n[l+4+T]}),u.red>=0&&(d[u.red]=n[l+12],m[u.red]=n[l+16]),u.M.gen===u.gen&&(u.M.reading={sums:d,count:n[l+8],box:m,boxTotal:n[l+9]+(u.red>=0?Math.max(0,n[l+21]):0)},u.M.readKey=u.key,this.lastReading=u.M.reading)}),this.stats.meterBack+=s.items.length,this.stats.meterLatency=s.frames}else this.stats.meterTimeouts+=s.items.length;this.pbos.push(s.pbo)}}}reduce(t,r,s,a,i){const o=Dt(s.cls),n=Ot(s.cls);this.reduceSet(t,r,s,a,o,g*i),n>=0&&this.reduceSet(t,r,s,a,[n],g*i+3)}reduceSet(t,r,s,a,i,o){const n=this.res,c=a.n,u=c/X,f=this.pM[0],l=this.pM[1],h=this.pM[2],d=this.steps,m=performance.now(),p=(v,B,I)=>{if(v&&v.w===B&&v.h===I)return v;if(v){const j=v;this.defer(()=>n.deleteTarget(j))}t.activeTexture(t.TEXTURE15);const K=n.target(B,I,t.RGBA32F,t.RGBA);return t.activeTexture(t.TEXTURE0),K},T=this.mS=p(this.mS,c,c),_=this.mB=p(this.mB,3*u,u),E=this.mF=p(this.mF,g*Tt,1),A=ir(s.axis),F=this.meterIn.weights,b=[0,1,2,3].map(v=>i[v]??0),R=[0,1,2,3].map(v=>i[v]!==void 0?r.kR:0),x=[0,1,2,3].map(v=>i[v]!==void 0?F[i[v]]??0:0);t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),t.bindVertexArray(this.vaoD),t.useProgram(f.prog),s.bind(f),t.uniform3fv(f.loc.get("uMF"),A.F),t.uniform3fv(f.loc.get("uMR"),A.R),t.uniform3fv(f.loc.get("uMU"),A.U),t.uniform1f(f.loc.get("uTanR"),a.tanR),t.uniform1f(f.loc.get("uN"),c),t.uniform3fv(f.loc.get("mF"),r.cam.f),t.uniform3fv(f.loc.get("mR"),r.cam.r),t.uniform3fv(f.loc.get("mU"),r.cam.up),t.uniform2f(f.loc.get("mT"),r.cam.tanH,r.n),t.uniform1f(f.loc.get("uCubic"),this.debugCubic?1:0),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,r.core.tex),t.uniform1i(f.loc.get("mC"),2),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,r.env.tex),t.uniform1i(f.loc.get("mE"),3),t.uniform1iv(f.loc.get("uComp"),Int32Array.from(b)),t.uniform1iv(f.loc.get("uCls"),Int32Array.from(b.map(v=>s.cls[v]??0))),t.uniform1fv(f.loc.get("uK"),Float32Array.from(R)),t.bindFramebuffer(t.FRAMEBUFFER,T.fbo),t.viewport(0,0,c,c),t.drawArrays(t.TRIANGLES,0,3),t.useProgram(l.prog),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,T.tex),t.uniform1i(l.loc.get("uS"),2),t.uniform1f(l.loc.get("uN"),c),t.uniform4fv(l.loc.get("uW"),Float32Array.from(x)),t.bindFramebuffer(t.FRAMEBUFFER,_.fbo),t.viewport(0,0,3*u,u),t.drawArrays(t.TRIANGLES,0,3),t.useProgram(h.prog),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,_.tex),t.uniform1i(h.loc.get("uB"),2),t.uniform1i(h.loc.get("uNB"),u),t.uniform1i(h.loc.get("uOff"),o),t.bindFramebuffer(t.FRAMEBUFFER,E.fbo),t.viewport(o,0,3,1),t.drawArrays(t.TRIANGLES,0,3),d[4]=d[4]+performance.now()-m}debugMeterSamples(t){return this.mS?this.readTarget(t,this.mS):null}frame(t){if(this.stats.failed||this.debugHold||this.lost(t.gl))return;const r=performance.now(),s=t.gl,a=st(s);this.holdS=Math.max(0,t.holdS??0);try{this.res=t.res,this.flush();const i=this.debugScene??(this.weather?as:Re)(t.level,t.seed),o=this.debugScene?JSON.stringify(i):`${i.level}|${i.seed}`,n=this.ring.length?this.ring[0].t:null,c=this.lastT!==null&&t.tModel<this.lastT-1e-6,u=this.lastT!==null&&(t.tModel>this.lastT+5||c&&(n===null||t.tModel<n-1e-6));this.worker&&(o!==this.key||u)&&this.restart(o!==this.key),this.key=o,this.scene=i,this.worker||this.start(t),this.pX?this.askPrograms(1):this.programs(s,t),this.take(s),this.timePoll(s);const f=this.lastT!==null&&t.tModel===this.lastT;if(this.track(t),this.want(t.tModel),t.dtSeconds>0&&!f&&(this.fdts.push(t.dtSeconds),this.fdts.length>31&&this.fdts.shift()),this.lastT=t.tModel,!this.tables||this.ring.length<4||!this.programReady()){this.ring.length>7&&this.trim();return}if(this.slice>0&&!this.plan.moving&&this.debugN===null&&!f&&this.omega.rate>=Lt&&(this.slice=0),this.slice===0){const p=this.debugN??Math.max(t.lite?Vr:this.opt.N,this.autoN.n);this.plan=zt(this.debugN===null&&!f?this.omega.rate:0,this.fdt(),p),this.nCur=this.debugN??this.plan.N}const l=this.fdt(),h=this.nCur,d=f&&!!this.A&&!!this.B&&this.standingNeedsMap();if(d&&this.slice>0&&this.cur&&Math.abs(this.cur.T-t.tModel)>1e-6&&(this.slice=0),!this.A||!this.B){const p=performance.now();if(this.waitSince??=p,this.ring[this.ring.length-1].t<t.tModel+2*h*l+this.opt.dt&&p-this.waitSince<1500)return;this.waitSince=null,this.A=this.fillMap(s,this.newMap(t),t.tModel),this.B=this.fillMap(s,this.newMap(t),t.tModel+h*l),this.Ta=this.A.T,this.Tb=this.B.T,this.slice=0,this.stats.first.maps??=performance.now(),this.rotFrames=0,this.rotN=h}else if(f&&!d){this.stats.stillFrames++;return}if(this.slice===0){this.acc=this.recenter(t,this.acc),this.plan.moving&&!d&&this.recullRing(t.tModel+2*h*l),this.cur=this.job(d?t.tModel:t.tModel+2*h*l,this.acc.cam),this.acc.T=this.cur.T,this.acc.kR=this.cur.X.S[1].msg.kR,this.stats.maps++,this.cur.miss&&this.stats.misses++;const p=this.stats.follow;if(p.rate=this.omega.rate,this.plan.moving&&p.movingMaps++,d&&p.standingMaps++,this.clearMap(s,this.acc),this.drawRed(s,this.acc,this.cur),this.rotN=h,this.debugN===null){this.autoN=qr(this.autoN,this.tq?Vt(this.autoCost):void 0,l);const T=this.stats.auto;T.n=this.autoN.n,T.changes=this.autoN.changes,T.via=this.tq?"timer":this.tq===null?"frames":"",T.mapMs=Vt(this.autoCost)}}const m=this.timeBegin(s);if(this.drawSlice(s,this.acc,this.cur,this.slice,h),m&&this.timeEnd(s,m,h),++this.slice===h){const p=this.A;this.A=this.B,this.B=this.acc,this.acc=p,this.Ta=this.Tb,this.Tb=this.B.T,this.slice=0,this.rotFrames=d?h:0}else this.rotFrames++;this.fallbackStep(s,t,f),this.trim(),this.stats.frames++}catch(i){this.lost(s)||(this.stats.failed=i instanceof Error?i.message:String(i))}finally{this.fade(),at(s,a);const i=performance.now()-r;this.stats.mainMs.push(i),this.stats.mainMs.length>600&&this.stats.mainMs.shift()}}dispose(){this.worker?.terminate(),this.worker=null,this.dropFallback(!!this.res&&!this.res.gl.isContextLost()),this.tableWorker?.terminate(),this.tableWorker=null,this.progQueue=[];const t=this.res;if(t&&!t.gl.isContextLost()){const r=t.gl;this.flush();for(const s of this.ring)for(const a of N)t.deleteBuffer(s.buf[a]);for(const s of[this.A,this.B,this.acc,this.retiring?.A,this.retiring?.B])s&&(t.deleteTarget(s.core),t.deleteTarget(s.env));for(const s of this.tables??[])t.deleteTexture(s.tex),t.deleteTexture(s.coef);this.kTex&&t.deleteTexture(this.kTex),this.redTex&&t.deleteTexture(this.redTex),this.refTex&&t.deleteTexture(this.refTex),this.out&&t.deleteBuffer(this.out.buf),this.quad&&t.deleteBuffer(this.quad);for(const s of[this.vaoX,this.vaoR,this.vaoD])s&&(r.deleteVertexArray(s),t.vaos.delete(s));this.tfo&&r.deleteTransformFeedback(this.tfo),this.pD&&(r.deleteProgram(this.pD.prog),t.programs.delete(this.pD.prog));for(const s of[this.pX,this.pR,this.pRed,this.pC,...this.pM]){if(!s)continue;t.programs.delete(s.prog);const a=()=>{if(!r.isContextLost()){if(!s.done()){setTimeout(a,50);return}try{s.check()}catch{}r.deleteProgram(s.prog),t.deferred.delete(s.prog)}};a()}for(const s of[this.mS,this.mB,this.mF])s&&t.deleteTarget(s);for(const s of this.reads)r.deleteSync(s.sync),this.pbos.push(s.pbo);this.catchUp&&(r.deleteSync(this.catchUp),this.catchUp=null);for(const s of this.pbos)t.deleteBuffer(s);for(const s of this.tq?.pend??[])r.deleteQuery(s.q)}this.tq=void 0,this.pM=[],this.mS=this.mB=this.mF=null,this.pbos=[],this.reads=[],this.linked=!1,this.asked.clear(),this.discard.clear(),this.resumeAfter=null,this.res=null,this.ring=[],this.pending=[],this.tables=null,this.tablesAsked=!1,this.A=this.B=this.acc=null,this.cur=null,this.trash=[],this.retiring=null,this.retShare=0,this.retOut=null,this.outAt=null,this.w=0,this.lastWall=null,this.pX=this.pR=this.pD=this.pC=this.pRed=null,this.redTex=null,this.vaoX=this.vaoR=this.vaoD=null,this.quad=null,this.tfo=null,this.out=null,this.kTex=null,this.refTex=null,this.refLevel=-1,this.cap={core:0,env:0,glow:0},this.inFlight=!1,this.lastT=null,this.key=""}start(t){const r=this.makeWorker();if(r.onmessage=s=>this.onMessage(s.data),r.onerror=s=>{this.stats.failed=`worker: ${s.message}`},this.worker=r,this.inFlight=!1,this.nextT=t.tModel-this.opt.dt,this.post({cmd:"init",scene:this.scene,obs:[0,0],red:this.debugRedSource??"dynamic"}),!this.tablesAsked){this.tablesAsked=!0;const s=this.opt.envBands===16?[16]:[16,this.opt.envBands],a=s.join(",");if(xt?.bands===a)this.pendingTables=xt.tables,this.stats.tablesMs=0,this.stats.first.tablesCached=!0;else{const i=this.tableWorker=this.makeWorker();i.onmessage=o=>{const n=o.data;if(n.cmd==="tables"){xt={bands:a,tables:n.tables},this.pendingTables=n.tables,this.stats.tablesMs=n.ms;for(const c of this.waiters.splice(0))c()}else n.cmd==="error"&&(this.stats.failed=`worker: ${n.message}`);i.terminate(),this.tableWorker===i&&(this.tableWorker=null)},i.onerror=o=>{this.stats.failed=`worker: ${o.message}`},i.postMessage({cmd:"tables",bands:s})}}}post(t){this.worker.postMessage(t)}restart(t=!1){this.worker?.terminate(),this.worker=null,this.stats.restarts++,this.dropFallback(),t&&(this.lastReading=null,this.wx=null);const r=this.res,s=this.ring;r&&this.defer(()=>{for(const c of s)for(const u of N)r.deleteBuffer(c.buf[u])}),this.ring=[],this.pending=[],this.cur=null,this.slice=0,this.cap={core:0,env:0,glow:0},this.waitSince=null,this.asked.clear(),this.discard.clear(),this.resumeAfter=null;const a=this.A,i=this.B,o=a&&i?this.w:0,n=this.retiringShare(this.w);if(a&&i&&o>0&&o>=n){const c=this.retiring;c&&this.defer(()=>{this.delMap(c.A),this.delMap(c.B)}),this.retiring={A:a,B:i,alpha:this.alphaNow(),fallback:null},this.retShare=o}else{for(const c of[a,i])c&&this.defer(()=>this.delMap(c));this.retiring&&(this.retShare=n)}this.retOut=this.retiring&&(t||this.retOut!==null)?1:null,this.outAt=null,this.A=this.B=null,this.w=0,!this.tables&&!this.pendingTables&&!this.tableWorker&&(this.tablesAsked=!1)}debugWorkerSlow=1;slowed=new WeakSet;onMessage(t){if(t.cmd==="state"&&this.debugWorkerSlow>1&&!this.slowed.has(t)){const r=this.debugWorkerSlow,s=this.worker,a={...t,ms:{...t.ms,total:t.ms.total*r}};this.slowed.add(a),setTimeout(()=>{this.worker===s&&this.onMessage(a)},(r-1)*t.ms.total);return}if(t.cmd==="error"){this.stats.failed=`worker: ${t.message}`;return}if(t.cmd==="tables"){this.pendingTables=t.tables,this.stats.tablesMs=t.ms;return}if(t.cmd==="state"){if(this.discard.delete(t.id)){this.asked.delete(t.id);return}this.inFlight=!1,this.pending.push(t),this.stats.workerMs.push(t.ms.total),this.stats.workerMs.length>120&&this.stats.workerMs.shift(),this.lastT!==null&&this.want(this.lastT);for(const r of this.waiters.splice(0))r()}}pendingTables=null;waiters=[];want(t){if(this.inFlight||!this.worker)return;const r=2*this.nCur*this.fdt()+2*this.opt.dt+.3;if(this.nextT<=t+r){this.inFlight=!0;const s=this.acc?.cam??this.B?.cam??null,a=s?br(s.f,this.omega):null,i=s&&a?{f:a.f,tanH:s.tanH,margin:14+a.extraDeg}:null,o=this.flightId=++this.reqId,n=this.resumeAfter;this.asked.set(o,i?{f:i.f,half:Math.min(89,Math.atan(i.tanH*Math.SQRT2)*180/Math.PI+i.margin)}:null),this.post(n===null?{cmd:"state",id:o,t:this.nextT,cull:i}:{cmd:"state",id:o,t:this.nextT,cull:i,after:n}),this.resumeAfter=null,this.nextT+=this.opt.dt}}recullRing(t){const r=this.view,s=this.lastT,a=performance.now();if(!r||s===null||this.debugN!==null||!this.worker||a-this.recullAt<Jr)return;const i=t+2*this.opt.dt+1e-6,o=Math.atan(Math.tan(Math.min(150,r.fovDeg)*Math.PI/360)*Math.SQRT2)*180/Math.PI,n=l=>{const h=l.cone;if(!h)return!0;const d=H(r.dir,this.omega.axis,Math.min(60,this.omega.rate*Math.max(0,l.t-s)));return Math.acos(Math.max(-1,Math.min(1,d[0]*h.f[0]+d[1]*h.f[1]+d[2]*h.f[2])))*180/Math.PI+o+jr<=h.half},c=this.ring.findIndex((l,h)=>h>=4&&l.t>i&&!n(l));if(c<0)return;const u=this.ring.splice(c),f=this.res;this.defer(()=>{for(const l of u)for(const h of N)f.deleteBuffer(l.buf[h])}),this.inFlight&&this.discard.add(this.flightId),this.inFlight=!1,this.nextT=u[0].t,this.resumeAfter=this.ring[this.ring.length-1].k,this.recullAt=a,this.recull.times++,this.recull.states+=u.length,this.want(s)}take(t){for(this.pendingTables&&(this.uploadTables(t,this.pendingTables),this.pendingTables=null);this.pending.length;){const r=this.pending.shift(),s=this.res,a={},i={};for(const o of N)this.grow(t,o,r.sets[o].n),i[o]=r.sets[o].n;for(const o of N){const n=t.createBuffer();s.buffers.add(n),t.bindBuffer(t.ARRAY_BUFFER,n),t.bufferData(t.ARRAY_BUFFER,Math.max(1,this.cap[o])*y*4,t.DYNAMIC_DRAW),s.recordBuffer(n,Math.max(1,this.cap[o])*y*4),i[o]&&t.bufferSubData(t.ARRAY_BUFFER,0,r.sets[o].data,0,i[o]*y),this.stats.uploadBytes+=i[o]*y*4,a[o]=n}t.bindBuffer(t.ARRAY_BUFFER,null),this.ring.push({t:r.t,k:r.k,n:i,buf:a,msg:r,cone:this.asked.get(r.id)??null}),this.asked.delete(r.id),this.stats.states++,this.stats.first.state??=performance.now(),r.wx&&(this.wx=r.wx);for(const o of N)this.stats.slots[o]=Math.max(this.stats.slots[o],i[o])}}grow(t,r,s){if(s<=this.cap[r])return;const a=Math.max(4096,Math.ceil(s*1.5/1024)*1024),i=this.res,o=[];for(const n of this.ring){const c=t.createBuffer();i.buffers.add(c),t.bindBuffer(t.COPY_WRITE_BUFFER,c),t.bufferData(t.COPY_WRITE_BUFFER,a*y*4,t.DYNAMIC_DRAW),i.recordBuffer(c,a*y*4),n.n[r]&&(t.bindBuffer(t.COPY_READ_BUFFER,n.buf[r]),t.copyBufferSubData(t.COPY_READ_BUFFER,t.COPY_WRITE_BUFFER,0,0,n.n[r]*y*4)),o.push(n.buf[r]),n.buf[r]=c}o.length&&this.defer(()=>{for(const n of o)i.deleteBuffer(n)}),t.bindBuffer(t.COPY_READ_BUFFER,null),t.bindBuffer(t.COPY_WRITE_BUFFER,null),this.cap[r]=a}trim(){const t=this.res;for(;this.ring.length>7&&!(this.cur&&this.cur.X.S.includes(this.ring[0]));){const r=this.ring.shift();this.defer(()=>{for(const s of N)t.deleteBuffer(r.buf[s])})}}fade(){const t=performance.now(),r=this.lastWall===null?0:Or((t-this.lastWall)/1e3);if(this.lastWall=t,this.debugFadeHold)return;const s=this.maps(),a=!!s&&!!s.A.reading&&!!s.B.reading;this.unmetered=s&&!a?this.unmetered+1:0,a&&(this.stats.first.metered??=t),this.w>=1&&(this.stats.first.faded??=t);const i=s!==null&&this.programReady()&&(a||this.w>0||this.unmetered>rs);this.retiring&&this.retOut!==null&&i&&(this.retOut=Math.max(0,this.retOut-r)),this.retOut===0&&this.outAt===null&&(this.outAt=t);const o=!!this.retiring&&this.retOut!==null&&(this.retOut>0||t-(this.outAt??t)<1e3*this.holdS),n=i&&(!o||this.w>0);if(this.w=n?Math.min(1,this.w+r):0,this.retiring&&this.w>=1){const c=this.retiring;this.retiring=null,this.retShare=0,this.retOut=null,this.outAt=null,this.defer(()=>{this.delMap(c.A),this.delMap(c.B)})}this.stats.w=this.w}programReady(){if(this.linked)return!0;if(this.progQueue.length||!this.pX||!this.pR||!this.pRed||!this.pC||this.pM.length<3)return!1;const t=[this.pX,this.pR,this.pRed,this.pC,...this.pM];if(!t.every(r=>r.done()))return!1;try{for(const r of t)r.check();return this.linked=!0,this.stats.first.linked??=performance.now(),!0}catch(r){return this.stats.failed=`zoneCurtainCompose: ${r instanceof Error?r.message:String(r)}`,!1}}askPrograms(t){for(let r=0;r<t&&this.progQueue.length;r++)this.progQueue.shift()()}linked=!1;defer(t){this.trash.push(t)}flush(){if(this.trash.length)for(const t of this.trash.splice(0))t()}fdt(){if(!this.fdts.length)return 1/60;const t=[...this.fdts].sort((r,s)=>r-s);return Math.min(.1,Math.max(1/240,t[t.length>>1]))}programs(t,r){const s=r.res;if(!t.getExtension("EXT_color_buffer_float"))throw new Error("EXT_color_buffer_float missing");this.accFmt=Mt(r.floatBlend||!!t.getExtension("EXT_float_blend"))==="rgba32f"?t.RGBA32F:t.RGBA16F,this.stats.target=this.accFmt===t.RGBA32F?"rgba32f":"rgba16f",this.stats.first.programs??=performance.now(),this.progQueue=[()=>{this.pX=ts(t,s)},()=>{this.pR=s.programDeferred("zoneCurtainRaster",Mr,wr)},()=>{this.pRed=s.programDeferred("zoneCurtainRed",L,Nr)},()=>{this.pC=s.programDeferred("zoneCurtainCompose",L,yr)},()=>{this.pM.push(s.programDeferred("zoneCurtainMeter",L,Br))},()=>{this.pM.push(s.programDeferred("zoneCurtainMeterBlock",L,Pr))},()=>{this.pM.push(s.programDeferred("zoneCurtainMeterFinal",L,kr))}],t.getExtension("KHR_parallel_shader_compile")?this.askPrograms(1/0):this.askPrograms(1),t.activeTexture(t.TEXTURE15),this.redTex=s.texture(et,1,t.RG32F,t.RG,t.FLOAT,new Float32Array(2*et)),t.activeTexture(t.TEXTURE0),this.vaoX=t.createVertexArray(),this.vaoR=t.createVertexArray(),this.vaoD=t.createVertexArray();for(const i of[this.vaoX,this.vaoR,this.vaoD])s.vaos.add(i);this.quad=t.createBuffer(),s.buffers.add(this.quad),s.recordBuffer(this.quad,jt.byteLength),t.bindVertexArray(this.vaoR),t.bindBuffer(t.ARRAY_BUFFER,this.quad),t.bufferData(t.ARRAY_BUFFER,jt,t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0);for(let i=1;i<=12;i++)t.enableVertexAttribArray(i),t.vertexAttribDivisor(i,1);t.bindVertexArray(this.vaoX);for(let i=0;i<12;i++)t.enableVertexAttribArray(i);t.disableVertexAttribArray(12),t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,null),this.tfo=t.createTransformFeedback();const a=t.createBuffer();s.buffers.add(a),this.out={buf:a,cap:0},t.activeTexture(t.TEXTURE15),this.kTex=s.texture(9,C,t.RG32F,t.RG,t.FLOAT,He(9)),t.activeTexture(t.TEXTURE0)}uploadTables(t,r){const s=this.res;t.activeTexture(t.TEXTURE15),this.tables=r.map(a=>{const i=s.texture(a.meta.tiledW,a.meta.tiledH,t.RGBA16F,t.RGBA,t.HALF_FLOAT,a.half);t.bindTexture(t.TEXTURE_2D,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR);const o=s.texture(a.coefW,a.coefH,t.RGBA32F,t.RGBA,t.FLOAT,a.coef);return{meta:a.meta,tex:i,coef:o}}),t.activeTexture(t.TEXTURE0),this.stats.tableLayers=r.map(a=>a.meta.layers),this.stats.first.tables??=performance.now()}refFor(t,r){if(this.refTex&&this.refLevel===r)return this.refTex;const s=this.res,a=sr(W[r]);return t.activeTexture(t.TEXTURE15),this.refTex?(t.bindTexture(t.TEXTURE_2D,this.refTex),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.texSubImage2D(t.TEXTURE_2D,0,0,0,Q,1,t.RED,t.FLOAT,a)):this.refTex=s.texture(Q,1,t.R32F,t.RED,t.FLOAT,a),t.activeTexture(t.TEXTURE0),this.refLevel=r,this.refTex}mapCameraOf(t,r=this.opt.margin,s=1){const[a,i,o]=t.dir,n=Math.atan2(a,i)*180/Math.PI,c=Math.asin(Math.max(-1,Math.min(1,o)))*180/Math.PI,u=Math.min(150,Math.max(.5,t.fovDeg)),f=Math.min(t.pitchDeg??this.opt.pitchDegMax,u/128)*s;let l=Wt(n,c,u,Math.round(u/f),r);return l.size>this.opt.maxMapSize&&(l=Wt(n,c,u,Math.round(u/f*this.opt.maxMapSize/l.size),r)),l}track(t){const r=performance.now(),s=[t.dir[0],t.dir[1],t.dir[2]],a=this.hist;for(this.view={dir:s,fovDeg:t.fovDeg},a.push({t:r,d:s});a.length>2&&r-a[0].t>150;)a.shift();this.omega=a.length>=2&&r-a[0].t<=400?pr(a):{axis:[0,0,1],rate:0}}standingNeedsMap(){const t=this.view,r=this.maps();if(!t||!r)return!1;const s=ft(t.dir,t.fovDeg*Math.PI/360,r.A.cam,r.B.cam,null,r.alpha,this.nCur,9);return s.sA+s.sB<s.n-.001}fallbackStep(t,r,s){const a=this.fb,i=this.res,o=performance.now();if(!this.A||!this.B||this.debugMaps||this.debugHold||this.stats.follow.fbFailed)return;if(!a.worker){const b=a.worker=this.makeWorker();b.onmessage=R=>{const x=R.data;x.cmd==="state"?x.id!==a.drop&&(a.pending=x):x.cmd==="error"&&(this.stats.follow.fbFailed=`worker: ${x.message}`)},b.onerror=R=>{this.stats.follow.fbFailed=`worker: ${R.message}`},b.postMessage({cmd:"init",scene:this.scene,obs:[0,0],red:this.debugRedSource??"dynamic"})}if(a.asked&&!a.moving&&this.omega.rate>=Lt){const b=a.acc,R=a.state;(b||R)&&this.defer(()=>{if(b&&this.delMap(b),R)for(const x of N)i.deleteBuffer(R.buf[x])}),!a.pending&&!b&&(a.drop=a.reqId),a.acc=null,a.job=null,a.state=null,a.pending=null,a.asked=!1,a.slice=0}if(a.pending&&!a.acc&&a.cam){const b=a.pending,R={},x={};a.pending=null;for(const P of N){x[P]=b.sets[P].n;const J=t.createBuffer();i.buffers.add(J),t.bindBuffer(t.ARRAY_BUFFER,J),t.bufferData(t.ARRAY_BUFFER,Math.max(1,x[P])*y*4,t.STATIC_DRAW),i.recordBuffer(J,Math.max(1,x[P])*y*4),x[P]&&t.bufferSubData(t.ARRAY_BUFFER,0,b.sets[P].data,0,x[P]*y),this.stats.uploadBytes+=x[P]*y*4,R[P]=J}t.bindBuffer(t.ARRAY_BUFFER,null);const v={t:b.t,k:b.k,n:x,buf:R,msg:b},B=W[this.scene.level],[I,K]=this.footRange(a.cam),j=b.wx?Rt(b.wx.pulses,b.t,I,K,k):it(B,this.scene,b.t,I,K,k);a.state=v,a.slice=0,a.job={T:b.t,X:{S:[v,v,v,v],...pt(this.opt.mode,0)},events:j.events,dropped:j.dropped,miss:!1,red:bt(v,v,0)},t.activeTexture(t.TEXTURE15),a.acc={cam:a.cam,n:a.cam.size,core:i.target(a.cam.size,a.cam.size,this.accFmt,t.RGBA),env:i.target(a.cam.size/2,a.cam.size/2,this.accFmt,t.RGBA),T:b.t,kR:b.kR,reading:null,readKey:"",gen:0,red:null},t.activeTexture(t.TEXTURE0),this.clearMap(t,a.acc),this.drawRed(t,a.acc,a.job)}if(a.acc&&a.job){if(this.drawSlice(t,a.acc,a.job,a.slice,a.N),++a.slice>=a.N){const b=a.map,R=a.state;this.defer(()=>{b&&this.delMap(b);for(const v of N)i.deleteBuffer(R.buf[v])}),a.map=a.acc,a.acc=null,a.job=null,a.state=null,a.asked=!1,a.builtAt=o;const x=this.stats.follow;x.fallbacks++,x.fbMs=o-a.askedAt,x.fbFrames=a.N,x.fbSize=a.map.n}return}if(a.asked||s)return;const n=this.view,c=a.map?.cam,u=n.fovDeg/2,f=this.omega.rate>=_t,l=this.fdt(),h=f?Math.max(5,Math.min(Kr,Math.round(.3/l))):xe,d=h*l+.15,m=f?H(n.dir,this.omega.axis,Math.min(60,this.omega.rate*(d+.5))):n.dir,p=c?Math.acos(Math.max(-1,Math.min(1,m[0]*c.f[0]+m[1]*c.f[1]+m[2]*c.f[2])))*180/Math.PI:0,T=!!c&&p+u>Math.atan(c.tanH)*180/Math.PI-4;if(a.map&&!T&&!f&&a.map.T-r.tModel>.15+(h*l-Yt/1e3)/2)return;const _=Math.min(70-u,f?Qr:Yr),E=f?Math.min(_-10,this.omega.rate*(d+.3)):0,A=this.mapCameraOf({...r,dir:E>0?H(n.dir,this.omega.axis,E):n.dir},_,Zr);a.cam=A,a.asked=!0,a.askedAt=o,a.N=h,a.moving=f;const F=f?0:(Yt/1e3+h*l)/2;a.worker.postMessage({cmd:"state",id:a.reqId=++this.reqId,t:r.tModel+d+F,cull:{f:[...A.f],tanH:A.tanH,margin:6}})}dropFallback(t=!1){const r=this.fb,s=this.res;r.worker?.terminate();const a=[r.map,r.acc].filter(n=>!!n),i=r.state,o=()=>{if(s){for(const n of a)this.delMap(n);if(i)for(const n of N)s.deleteBuffer(i.buf[n])}};t?o():this.defer(o),this.fb=Qt()}followCam(t){const r=this.plan;return r.moving?this.mapCameraOf({...t,dir:H(t.dir,this.omega.axis,r.leadDeg)},r.marginDeg,r.pitchScale):this.mapCameraOf(t)}newMap(t,r=this.mapCameraOf(t)){const s=this.res,a=s.gl;a.activeTexture(a.TEXTURE15);const i={cam:r,n:r.size,core:s.target(r.size,r.size,this.accFmt,a.RGBA),env:s.target(r.size/2,r.size/2,this.accFmt,a.RGBA),T:0,kR:0,reading:null,readKey:"",gen:0,red:null};return a.activeTexture(a.TEXTURE0),i}delMap(t){const r=this.res;r&&(r.deleteTarget(t.core),r.deleteTarget(t.env))}recenter(t,r){const s=this.followCam(t);if(r&&r.n===s.size)return r.cam=s,r;if(r){const a=r;this.defer(()=>this.delMap(a))}return this.newMap(t,s)}clearMap(t,r){r.reading=null,r.readKey="",r.gen++,t.disable(t.SCISSOR_TEST);for(const s of[r.core,r.env])t.bindFramebuffer(t.FRAMEBUFFER,s.fbo),t.viewport(0,0,s.w,s.h),t.clearBufferfv(t.COLOR,0,[0,0,0,0])}job(t,r){const s=this.ring;let a=-1;for(let p=0;p<s.length-1;p++)s[p].t<=t+1e-9&&(a=p);let i=!1;a<0&&(a=0),t>s[s.length-1].t+1e-9&&(i=!0,t=s[s.length-1].t,a=s.length-2);const o=s[Math.max(0,a-1)],n=s[a],c=s[a+1],u=s[a+2]??(this.stats.miss3++,c),f=Math.min(1,Math.max(0,(t-n.t)/(c.t-n.t))),l=W[this.scene.level],[h,d]=this.footRange(r),m=n.msg.wx?Rt(n.msg.wx.pulses,t,h,d,k):it(l,this.scene,t,h,d,k);return this.stats.eventsDropped+=m.dropped,{T:t,X:{S:[o,n,c,u],...pt(this.opt.mode,f)},events:m.events,dropped:m.dropped,miss:i,red:bt(n,c,f)}}footRange(t){let r=1/0,s=-1/0;for(const a of[-1,0,1])for(const i of[-1,0,1]){const o=[0,1,2].map(u=>t.f[u]+a*t.tanH*t.r[u]+i*t.tanH*t.up[u]),n=Math.hypot(o[0],o[1],o[2]),c=o[2]/n;if(!(c>.02)){r=Math.min(r,-700),s=Math.max(s,700);continue}for(const u of[84,300]){const f=We(u,c)*o[0]/n;r=Math.min(r,f),s=Math.max(s,f)}}return[Math.max(-760,r-60),Math.min(760,s+60)]}fillMap(t,r,s){const a=this.job(s,r.cam),i=this.nCur;r.T=a.T,r.kR=a.X.S[1].msg.kR,this.clearMap(t,r),this.drawRed(t,r,a);for(let o=0;o<i;o++)this.drawSlice(t,r,a,o,i);return r}drawRed(t,r,s){r.red=s.red;const a=this.pRed;if(!a||!this.redTex||!s.red||this.debugRedOff)return;const i=et,o=new Float32Array(2*i);for(let u=0;u<i;u++)o[2*u]=s.red.A[u],o[2*u+1]=s.red.Y[u];t.activeTexture(t.TEXTURE15),t.bindTexture(t.TEXTURE_2D,this.redTex),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.texSubImage2D(t.TEXTURE_2D,0,0,0,i,1,t.RG,t.FLOAT,o),t.useProgram(a.prog),t.bindVertexArray(this.vaoD),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.bindFramebuffer(t.FRAMEBUFFER,r.env.fbo),t.viewport(0,0,r.env.w,r.env.h),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD),t.colorMask(!1,!1,!0,!1);const n=u=>a.loc.get(u),c=r.cam;t.uniform3fv(n("uF"),c.f),t.uniform3fv(n("uR"),c.r),t.uniform3fv(n("uU"),c.up),t.uniform1f(n("uTanH"),c.tanH),t.uniform1f(n("uSize"),r.env.w),t.uniform2f(n("uObs"),0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.redTex),t.uniform1i(n("uLine"),0),t.drawArrays(t.TRIANGLES,0,3),t.colorMask(!0,!0,!0,!0),t.disable(t.BLEND),t.bindVertexArray(null),this.stats.redPasses++}drawSlice(t,r,s,a,i){const o=this.expandSlice(t,s.X,a,i,r);return this.rasterSlice(t,r,o,s),o}groups(){return ss(this.tables.length>1?1:0)}sliceSegs(t,r){let s=0;for(const a of this.groups()){const i=this.tables[a.tab].meta,o=Math.ceil(i.B/r);s+=o*Math.max(...t.S.map(n=>n.n[a.set]))}return s}expandSlice(t,r,s,a,i){const o=this.pX,n=this.out,c=this.sliceSegs(r,a),u=i.cam;c*D*4>n.cap&&(n.cap=Math.ceil(c*D*4*1.25),t.bindBuffer(t.ARRAY_BUFFER,n.buf),t.bufferData(t.ARRAY_BUFFER,n.cap,t.DYNAMIC_COPY),this.res.recordBuffer(n.buf,n.cap),t.bindBuffer(t.ARRAY_BUFFER,null)),t.useProgram(o.prog),t.bindVertexArray(this.vaoX),t.enable(t.RASTERIZER_DISCARD);const f=d=>o.loc.get(d);t.uniform3fv(f("uF"),u.f),t.uniform3fv(f("uR"),u.r),t.uniform3fv(f("uU"),u.up),t.uniform1f(f("uTanH"),u.tanH),t.uniform4fv(f("uCW"),Float32Array.from(r.w)),t.uniform1f(f("uU2"),r.u2),t.uniform1f(f("uWC"),r.wc),t.uniform1f(f("uSlice"),s),t.uniform1f(f("uNS"),a),t.uniform1f(f("uCutB"),this.opt.cut),t.uniform1f(f("uObsX"),0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,this.kTex),t.uniform1i(f("uK"),1),t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,this.tfo),c&&(t.bindBufferRange(t.TRANSFORM_FEEDBACK_BUFFER,0,n.buf,0,c*D*4),t.beginTransformFeedback(t.POINTS));const l=[];let h=0;for(const d of this.groups()){const m=this.tables[d.tab],p=m.meta,T=Math.ceil(p.B/a),_=Math.max(...r.S.map(E=>E.n[d.set]));if(!_){l.push({tgt:d.tgt,tab:d.tab,pulse:d.pulse,first:h,count:0});continue}t.uniform1f(f("uPx"),2/(d.tgt==="env"?i.n/2:i.n)),t.uniform1f(f("uB"),p.B),t.uniform1f(f("uBW"),p.bandW),t.uniform1f(f("uNG"),p.ngroup),t.uniform1f(f("uGR"),p.groupRows),t.uniform1f(f("uNL"),p.nl),t.uniform1f(f("uPulse"),d.pulse),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,m.coef),t.uniform1i(f("uCoef"),2),r.S.forEach((E,A)=>{t.bindBuffer(t.ARRAY_BUFFER,E.buf[d.set]);for(let F=0;F<3;F++)t.vertexAttribPointer(3*A+F,4,t.FLOAT,!1,y*4,16*F)}),t.bindBuffer(t.ARRAY_BUFFER,null);for(let E=0;E<T;E++)t.vertexAttrib1f(12,E),t.drawArrays(t.POINTS,0,_);l.push({tgt:d.tgt,tab:d.tab,pulse:d.pulse,first:h,count:T*_}),h+=T*_}return c&&t.endTransformFeedback(),t.bindBufferBase(t.TRANSFORM_FEEDBACK_BUFFER,0,null),t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,null),t.disable(t.RASTERIZER_DISCARD),t.bindVertexArray(null),t.activeTexture(t.TEXTURE0),this.stats.segsLastSlice=h,l}rasterSlice(t,r,s,a){const i=this.pR,o=r.cam,n=h=>i.loc.get(h);t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.useProgram(i.prog),t.bindVertexArray(this.vaoR),t.uniform3fv(n("uF"),o.f),t.uniform3fv(n("uR"),o.r),t.uniform3fv(n("uU"),o.up),t.uniform1f(n("uTanH"),o.tanH),t.uniform1f(n("uCut2"),this.opt.cut**2);const c=new Float32Array(8*k);a.events.forEach((h,d)=>c.set([h.t0-a.T,h.xc,1/h.w,h.lag,h.vz,h.amp,0,0],8*d)),t.uniform1i(n("uNE"),a.events.length),t.uniform4fv(n("uE"),c),t.uniform1f(n("uPInv"),1/(W[this.scene.level].pulse5?.sig??14)),t.uniform1f(n("uPCons"),er);const u=this.refFor(t,this.scene.level);t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,u),t.uniform1i(n("uRef"),1),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD);let f=null,l=-1;t.bindBuffer(t.ARRAY_BUFFER,this.out.buf);for(const h of s){if(!h.count)continue;const d=h.tgt==="env"?r.env:r.core;if(d!==f&&(f=d,t.bindFramebuffer(t.FRAMEBUFFER,d.fbo),t.viewport(0,0,d.w,d.h),t.uniform1f(n("uSize"),d.w)),h.tab!==l){l=h.tab;const m=this.tables[h.tab],p=m.meta;t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,m.tex),t.uniform1i(n("uTab"),0),t.uniform1f(n("uBW"),p.bandW),t.uniform1f(n("uN"),p.n),t.uniform4f(n("uTabD"),p.width,p.height,p.tilesX,p.tiledW),t.uniform1f(n("uTexH"),p.tiledH)}for(let m=0;m<12;m++)t.vertexAttribPointer(1+m,4,t.FLOAT,!1,D*4,(h.first*D+4*m)*4);t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,h.count)}t.bindBuffer(t.ARRAY_BUFFER,null),t.disable(t.BLEND),t.bindVertexArray(null),t.activeTexture(t.TEXTURE0)}bindMaps(t,r,s,a,i,o,n){[["a",s,n],["b",a,n+2],["c",i??s,n+4]].forEach(([c,u,f])=>{t.uniform3fv(r.loc.get(c+"F"),u.cam.f),t.uniform3fv(r.loc.get(c+"R"),u.cam.r),t.uniform3fv(r.loc.get(c+"U"),u.cam.up),t.uniform2f(r.loc.get(c+"T"),u.cam.tanH,u.n),t.activeTexture(t.TEXTURE0+f),t.bindTexture(t.TEXTURE_2D,u.core.tex),t.uniform1i(r.loc.get(c+"C"),f),t.activeTexture(t.TEXTURE1+f),t.bindTexture(t.TEXTURE_2D,u.env.tex),t.uniform1i(r.loc.get(c+"E"),f+1)}),t.uniform1f(r.loc.get("uAlpha"),o),t.uniform1f(r.loc.get("uReveal"),de(o,this.nCur)),t.uniform1f(r.loc.get("uHasC"),i?1:0),t.uniform1f(r.loc.get("uKC"),i&&s.kR>0?i.kR/s.kR:1),t.uniform1f(r.loc.get("uCubic"),this.debugCubic?1:0)}debugCubic=!0;display(t,r,s,a,i,o,n=null){const c=this.res;this.pD??=c.program("zoneCurtainDisplay",L,Sr);const u=this.pD;t.useProgram(u.prog),t.bindVertexArray(this.vaoD),t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),t.bindFramebuffer(t.FRAMEBUFFER,r.fbo),t.viewport(0,0,r.w,r.h),t.uniform3fv(u.loc.get("uF"),s.f),t.uniform3fv(u.loc.get("uR"),s.r),t.uniform3fv(u.loc.get("uU"),s.up),t.uniform1f(u.loc.get("uTanH"),s.tanH),t.uniform1f(u.loc.get("uSize"),r.w),this.bindMaps(t,u,a,i,n,o,0),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null),t.activeTexture(t.TEXTURE0)}debugState(){return{ring:this.ring.map(t=>({t:t.t,k:t.k,sets:t.msg.sets})),tables:this.tables?.map(t=>t.meta)??null,scene:this.scene,A:this.A,B:this.B,Ta:this.Ta,Tb:this.Tb,trash:this.trash.length,w:this.w,retiring:this.retiring!==null,retShare:this.retShare}}debugJob(t,r,s,a){const i=t.map(l=>this.ring[l]),o=W[this.scene.level],[n,c]=this.footRange(a),u=i[1].msg.wx,f=u?Rt(u.pulses,s,n,c,k):it(o,this.scene,s,n,c,k);return{T:s,X:{S:i,...pt(this.opt.mode,r)},events:f.events,dropped:f.dropped,miss:!1,red:bt(i[1],i[2],r)}}async debugRun(t,r,s,a,i){this.res=r,this.worker&&this.restart(),this.flush(),this.scene=s,this.key=JSON.stringify(s),this.lastT=null,this.start({tModel:a[0]+this.opt.dt}),this.pX||this.programs(t,{res:r,floatBlend:i}),this.askPrograms(1/0),this.inFlight=!0;for(const c of a)this.post({cmd:"state",id:++this.reqId,t:c,cull:null});const o=performance.now();for(;this.pending.length<a.length||!(this.tables||this.pendingTables)||!this.programReady();){if(this.stats.failed)throw new Error(this.stats.failed);if(performance.now()-o>12e4)throw new Error("zoneCurtain debugRun: no states after 120 s");await new Promise(c=>{this.waiters.push(c),setTimeout(c,100)})}const n=st(t);try{this.take(t)}finally{at(t,n)}}readOut(t,r,s){const a=new Float32Array(s*D);return t.bindBuffer(t.ARRAY_BUFFER,this.out.buf),t.getBufferSubData(t.ARRAY_BUFFER,r*D*4,a),t.bindBuffer(t.ARRAY_BUFFER,null),a}readTarget(t,r){const s=new Float32Array(r.w*r.h*4);return t.bindFramebuffer(t.FRAMEBUFFER,r.fbo),t.readPixels(0,0,r.w,r.h,t.RGBA,t.FLOAT,s),s}}function Te(e,t=e.view.centerMm){const r=e.horizonFrame,s=e.view.point,a=e.view.skyFrame,i=e.geometry.focalMm;if(!r||!a)return null;const o=[t[0]/i,t[1]/i,1],n=[0,1,2].map(l=>s[l]*o[0]+s[3+l]*o[1]+s[6+l]*o[2]);if(!(n[2]>1e-6))return null;const c=[0,1,2].map(l=>a.axis[l]+n[0]/n[2]*a.west[l]+n[1]/n[2]*a.north[l]),u=Math.hypot(c[0],c[1],c[2]),f=l=>(c[0]*l[0]+c[1]*l[1]+c[2]*l[2])/u;return[f(r.east),f(r.north),f(r.zenith)]}function ps(e,t,r){const s=Te(t);if(!s)return e.zoneCurtain;let a=e.zoneCurtain;a||(a=e.zoneCurtain=new is({},void 0,Oe({pinned:vt.zoneSeed,automated:typeof navigator<"u"&&navigator.webdriver===!0,reducedMotion:ye(),random:Le}),Ie(typeof location<"u"?location.search:null,typeof navigator<"u"&&navigator.webdriver===!0)),a.caps=ns(t.gl,t.res,t.floatBlend),a.caps.reason&&(a.stats.failed=`capability: ${a.caps.reason}`),a.caps.reason&&console.warn("[zoneCurtain] this device cannot run the new curtain; the old aurora stays:",a.caps.reason));const i=t.geometry,o=2*Math.atan(i.cathodeRadiusMm/i.focalMm)*180/Math.PI,n=Ne(i.pitchMm,i.focalMm)*Math.atan(i.pitchMm/i.focalMm)*180/Math.PI,c=os(t.gl),u=a.stats.frames,f=Ce.getState().view.integrationMs,l=f>0?f/1e3:Be;return a.frame({gl:t.gl,res:t.res,tModel:r.timeS-(e.setup?.startS??0),dir:s,fovDeg:o,level:r.level??0,seed:a.seed,floatBlend:t.floatBlend,dtSeconds:t.dtSeconds,lite:r.detail==="lite",pitchDeg:n,holdS:l}),c&&cs(t.gl,c,a.stats.frames>u),a}const Ae={on:!1,sliceMs:[],otherMs:[],disjoint:0,queries:[]};function os(e){const t=Ae;if(!t.on&&!t.queries.length)return null;const r=e.getExtension("EXT_disjoint_timer_query_webgl2");if(!r)return null;for(;t.queries.length;){const{q:a,slice:i}=t.queries[0];if(!e.getQueryParameter(a,e.QUERY_RESULT_AVAILABLE))break;t.queries.shift(),e.getParameter(r.GPU_DISJOINT_EXT)?t.disjoint++:(i?t.sliceMs:t.otherMs).push(Number(e.getQueryParameter(a,e.QUERY_RESULT))/1e6),e.deleteQuery(a)}if(!t.on||t.queries.length>=8)return null;const s=e.createQuery();return s&&e.beginQuery(r.TIME_ELAPSED_EXT,s),s}function cs(e,t,r){const s=e.getExtension("EXT_disjoint_timer_query_webgl2");e.endQuery(s.TIME_ELAPSED_EXT),Ae.queries.push({q:t,slice:r})}function Es(e,t,r,s,a,i){const o=vt.zoneCurtainDebug>0?vt.zoneCurtainDebug:1;e.compose(t.gl,s.u_auRate,s.u_auClass,r.level??0,o,n=>{t.viewUniforms(n),t.bindHorizon(n,0),t.bindLut(n,1),t.res.bindTex(8,a,n,"u_auExt"),t.res.bindTex(9,i,n,"u_cloud"),ee(t.gl,n,{u_auExtOn:s.u_auExtOn,u_auRatioCap:s.u_auRatioCap,...Se(r.cloud)})},()=>t.draw())}function bs(e,t,r,s){const a=Te(t,[0,0]);if(!a)return;const i=t.geometry,o=Pe(r);e.meter(t.gl,{axis:a,radiusDeg:Math.atan(i.cathodeRadiusMm/i.focalMm)*180/Math.PI,level:r.level??0,cls:o.u_auClass,rates:r.rates,ext:r.extinction,bind:n=>{t.bindHorizon(n,0),t.bindLut(n,1),t.res.bindTex(4,s,n,"u_auExt"),ee(t.gl,n,{u_auExtOn:o.u_auExtOn})}})}export{Te as viewAxisEnu,Es as zoneCompose,ps as zoneFrame,Ae as zoneGpuTimer,bs as zoneMeter};
