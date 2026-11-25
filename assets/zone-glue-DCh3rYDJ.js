import{d0 as W,d1 as Gt,d2 as D,d3 as Et,d4 as Tt,d5 as Ht,d6 as qt,d7 as re,d8 as Zt,d9 as z,da as At,db as $t,cN as Yt,dc as Vt,b as Rt,bC as Kt,dd as wt}from"./boot-CLtiYmVN.js";import{F as Me}from"./app-Bea29ZzF.js";import{A as Qt,c as jt,d as Jt,w as es,a as ts,b as ss,z as is,e as rs,f as ns,r as as}from"./wide-BAA_do7w.js";import{N as P,b as O,h as yt,u as _t,r as F,p as te,s as $,G as os,c as H,d as cs,H as Q,e as St,f as j,g as Mt,l as De,C as ce,R as ue}from"./constants-aa40kg3i.js";import{Z as le}from"./levels-DpYprAWu.js";import"./vendor-DHsdD_W9.js";import"./hosting-COfAt13E.js";import"./error-log-2Lr6dY2_.js";const Z=8,se=256;function Fe(){return W.map(r=>Gt(r))}function ze(r){const e=[];for(let t=0;t<r.length;t++)(r[t]===0||r[t]===1)&&e.push(t);if(e.length>4)throw new RangeError("zoneMeterChannels: more than four main-curtain components");return e}function Ue(r){for(let e=0;e<r.length;e++)if(r[e]===2)return e;return-1}function us(r,e,t){const i=Math.PI/180,s=Math.tan(Math.min(80,Math.max(.01,r))*i),n=Z,a=t??Math.min(se,Math.max(4*n,Math.ceil(2*s/Math.tan(Math.max(.001,e)*i)/n)*n));if(a%n||a>se)throw new RangeError(`zoneMeterGrid: side ${a} not a multiple of ${n} up to ${se}`);let o=0;for(let c=0;c<a;c++)for(let h=0;h<a;h++)hs(h,c,a)&&o++;return{n:a,tanR:s,count:o}}const hs=(r,e,t)=>{const i=2*r+1-t,s=2*e+1-t;return i*i+s*s<=t*t};function Le(r){const e=Math.hypot(r[0],r[1],r[2]),t=[r[0]/e,r[1]/e,r[2]/e];let i=t[1],s=-t[0];const n=Math.hypot(i,s);return n<1e-6?(i=1,s=0):(i/=n,s/=n),{F:t,R:[i,s,0],U:[s*t[2],-i*t[2],i*t[1]-s*t[0]]}}function Ie(r){if(!r.length)return null;const e=W.length,t=new Float64Array(e),i=new Float64Array(e);let s=0;for(const n of r){const a=n.A??n.B,o=n.B??n.A;if(!a||!o){s++;continue}const c=Math.min(1,Math.max(0,n.alpha)),h=Math.max(0,n.share);for(let u=0;u<e;u++){const f=a.count?a.sums[u]/a.count:0,d=o.count?o.sums[u]/o.count:0;t[u]=t[u]+h*((1-c)*f+c*d),i[u]=i[u]+h*((1-c)*a.box[u]+c*o.box[u])}}return{means:t,box:i,pending:s}}const fs=(r,e)=>W.map(t=>e[t]>0?r[t]*e[t]:0);function We(r,e,t,i,s){fs(r,e);let n=0,a=0;i&&W.forEach((c,h)=>{(t[h]===0||t[h]===1||t[h]===2)&&(n+=r[c]*i.means[h],a+=r[c]*i.box[h])});const o=ls();return{mean:n+o.mean,peak:a+o.peak}}function ls(r,e,t){return{mean:0,peak:0}}const ds=20,ms=.25,ps=6,xs=61,bs=(r,e)=>{const t=O*e,i=r*(2*O+r);return i/(t+Math.sqrt(t*t+i))},vs=r=>new Float32Array(r*P*2).fill(1),Es=[{cell:2.4,epoch:5,prob:.6,w:[.18,.45],lnS:.9,life:[5,14],drift:.15,seed:61},{cell:6.8,epoch:8,prob:.55,w:[.35,.9],lnS:.6,life:[8,22],drift:.12,seed:62}];let Ft=1,Ct=1;function Ts(r,e,t=0,i={f:0,lam:0,fb:0}){let s=0,n=0,a=0;for(const o of Es){const c=Math.ceil(o.life[1]/o.epoch)+1,h=Math.floor(r/o.cell);for(let u=Math.floor(e/o.epoch)-c;u<=Math.floor(e/o.epoch);u++)for(let f=h-2;f<=h+2;f++){const d=yt(f,u,9e3+o.seed+131*t);if(_t(d)>=o.prob)continue;const m=(u+F(d,1))*o.epoch,l=te(o.life,F(d,2)),p=(e-m)/l;if(!(p>0&&p<1))continue;const x=(f+F(d,3))*o.cell+o.drift*(2*F(d,4)-1)*(e-m),v=te(o.w,F(d,5)),E=(r-x)/v;if(E*E>16)continue;const b=Math.sqrt(-2*Math.log(Math.max(1e-9,F(d,6))))*Math.cos(2*Math.PI*F(d,7)),T=Math.exp(o.lnS*b-.5*o.lnS*o.lnS)*$(p/.25)*(1-$((p-.7)/.3)),R=T*Math.exp(-.5*E*E),y=F(d,8);s+=R,n+=R*y*y*y,o.cell>5&&(a+=R)}}return i.f=s*Ft,i.fb=a*Ct,i.lam=s>1e-9?n/s:.3,i}{let r=0,e=0,t=0;const i={f:0,lam:0,fb:0};for(let s=0;s<6e3;s++)Ts(s*.731+13,50+s*.37,0,i),r+=i.f,e+=i.fb,t++;Ft=t/r,Ct=t/e}const Xe=[116,109,102,96],Ge=[30,26,22,18],As=3.5;function Rs(r){const e=Mt(r,0,1)*3,t=Math.min(2,Math.floor(e)),i=e-t;return{peak:De(Xe[t],Xe[t+1],i),up:De(Ge[t],Ge[t+1],i),lo:As}}const ws=r=>1/(1+Math.exp(-(r-101)/2.5)),ys=r=>1-$((r-(j-30))/30),He=2.2,qe=4.5,Ze=1.6,$e=Math.sqrt(Math.PI/2);function _s(r,e,t){const i=r-e.peak,s=i>=0?Math.exp(-i/e.up):Math.exp(-.5*(i/He)**2),n=i>=0?Math.exp(-.5*(i/qe)**2):Math.exp(-.5*(i/Ze)**2);return(1-t)*s+t*(He*$e+e.up)/((Ze+qe)*$e)*n}const Ye=20,Ss=120,Ms=r=>Mt(.3+.6*r,.3,.85),Fs=.8;function Cs(r,e,t){const i=r-(e.peak+1+12*t*t);return i<=0?0:(1-Math.exp(-i/(6+8*t)))*Math.exp(-i/(Ye+(Ss-Ye)*t))}let de=null;function ks(){if(de)return de;const r=cs,e=[new Float32Array(P*r),new Float32Array(P*r)],t=[new Float32Array(P*H*r),new Float32Array(P*H*r)];for(let i=0;i<P;i++){const s=i/(P-1),n=Rs(s),a=Ms(s);n.up*=Fs;for(let o=0;o<r;o++){const c=Q+o*St,h=ys(c),u=ws(c),f=_s(c,n,a)*h;e[0][i*r+o]=f,e[1][i*r+o]=f*u;for(let d=0;d<H;d++){const m=Cs(c,n,d/(H-1))*h,l=(i*H+d)*r+o;t[0][l]=m,t[1][l]=m*u}}}return de={n:r,low:e,ray:t,nlam:H}}const Bs=1,Ve=.7;function Ns(r,e,t,i,s){const n=r.pulse5,a=[];if(n==null)return a;const o=Math.ceil((360/n.vz[0]+3)/n.P)+1;for(let c=Math.floor(e/n.P)-o;c<=Math.floor(e/n.P)+1;c++)for(let h=Math.floor((i-500)/n.cell);h<=Math.floor((s+500)/n.cell);h++){const u=yt(h,c,7331+101*t);_t(u)>=n.prob||a.push({t0:(c+.8*F(u,1))*n.P,vz:te(n.vz,F(u,2)),amp:n.amp*(.6+.4*F(u,3)),xc:(h+F(u,4))*n.cell,w:te(n.w,F(u,5)),lag:(F(u,6)<.5?-1:1)*te(n.lag,F(u,7))/100})}return a}function gs(r,e,t){const i=(e-r.xc)/r.w,s=Math.exp(-.5*i*i);if(s<.02)return null;const n=t-(r.t0+(e-r.xc)*r.lag);if(!(n>0))return null;const a=70+r.vz*n;return a>420?null:[r.amp*s*$(n/.3)*Math.exp(-Math.max(0,a-110)/180)*(Ve+(1-Ve)*$((a-100)/25)),a]}const kt=70,Bt=.25,he=1401;function Ps(r){const e=ks(),t=e.n,i=new Float32Array(he),s=r.pulse5;if(!s)return i;const n=Math.round(r.hard0*(P-1)),a=e.low[0],o=e.ray[0],c=(n*H+3)*t;let h=0;for(let u=0;u<t;u++)h+=a[n*t+u]+.15*o[c+u];for(let u=0;u<he;u++){const f=kt+u*Bt;let d=0;for(let m=0;m<t;m++){const l=Q+m*St;d+=(a[n*t+m]+.15*o[c+m])*os((l-f)/s.sig)}i[u]=d/h}return i}function Os(r,e){const t=Math.min(he-1,Math.max(0,(e-kt)/Bt)),i=Math.min(he-2,Math.floor(t)),s=t-i;return r[i]*(1-s)+r[i+1]*s}const me=4,Ds=2,Nt=800;function zs(r,e,t,i,s,n=Bs){const a=Ds,o=Math.max(1,Math.min(Nt,Math.ceil((s-i)/a))),c=new Float32Array(o*12),h=new Float64Array(o),u=new Uint8Array(o);for(const f of r){const d=Math.max(0,Math.floor((f.xc-2.8*f.w-i)/a)),m=Math.min(o-1,Math.ceil((f.xc+2.8*f.w-i)/a));for(let l=d;l<=m;l++){const p=gs(f,i+(l+.5)*a,e);if(!p)continue;h[l]=h[l]+p[0]*Os(t,p[1]),u[l]=Math.min(255,u[l]+1);let x=Math.min(me,u[l])-1;const v=E=>(E>>1)*4*o+4*l+2*(E&1);if(!(x===me-1&&u[l]>me&&!(p[0]>c[v(x)+1]))){for(;x>0&&p[0]>c[v(x-1)+1];){const E=v(x),b=v(x-1);c[E]=c[b],c[E+1]=c[b+1],x--}c[v(x)]=p[1],c[v(x)+1]=p[0]}}}for(let f=0;f<o;f++)c[8*o+4*f]=1/(1+n*h[f]),c[8*o+4*f+1]=u[f];return{x0:i,dx:a,n:o,data:c}}function Us(r,e,t,i,s,n=16){if(!r.pulse5||e.noPulse||e.ticks)return{events:[],dropped:0};const a=Ns(r,t,e.seed??0,i,s).filter(o=>{const c=Math.max(i,o.xc-2.8*o.w),h=Math.min(s,o.xc+2.8*o.w);return h>=c?[c,h,Math.min(h,Math.max(c,o.xc))].some(u=>{const f=t-(o.t0+(u-o.xc)*o.lag);return f>0&&70+o.vz*f<=420}):!1});return a.sort((o,c)=>c.amp-o.amp),{events:a.slice(0,n),dropped:Math.max(0,a.length-n)}}const M={DX:8,HALF:720,SIG_N:16,HP:62,H0:150,H1:620,NSEG:24,TAU_RAD:110,Q200:.098,QH:42},ae=Math.round(2*M.HALF/M.DX)+1,Ls=r=>1/(1/M.TAU_RAD+M.Q200*Math.exp(-(r-200)/M.QH)),Is=r=>r<=M.H0?0:$((r-M.H0)/20)*Math.exp(-(r-M.H0)/M.HP)*(Ls(r)/M.TAU_RAD)*(1-$((r-(M.H1-60))/60));let pe=null;function Ws(){if(pe)return pe;const r=M,e=4700,t=(r.H1-r.H0)/e,i=new Float64Array(e+1);for(let a=0;a<e;a++)i[a+1]=i[a]+Is(r.H0+(a+.5)*t)*t;const s=[];let n=0;for(let a=0;a<r.NSEG;a++){const o=i[e]*(a+.5)/r.NSEG;for(;i[n+1]<o;)n++;s.push(r.H0+(n+(o-i[n])/(i[n+1]-i[n]))*t)}return pe={mid:s,norm:i[e]}}const gt=.06,Xs=8,Gs=2,oe=(r,e)=>r[0]*e[0]+r[1]*e[1]+r[2]*e[2],Pt=(r,e)=>[r[1]*e[2]-r[2]*e[1],r[2]*e[0]-r[0]*e[2],r[0]*e[1]-r[1]*e[0]],xe=r=>{const e=Math.hypot(r[0],r[1],r[2])||1;return[r[0]/e,r[1]/e,r[2]/e]};function Hs(r){const e={axis:[0,0,1],rate:0};if(r.length<2)return e;const t=r[0],i=r[r.length-1],s=(i.t-t.t)/1e3;if(!(s>.001))return e;const n=Pt(t.d,i.d),a=Math.hypot(n[0],n[1],n[2]),o=Math.atan2(a,oe(t.d,i.d))*180/Math.PI;return a>1e-9?{axis:[n[0]/a,n[1]/a,n[2]/a],rate:o/s}:e}function be(r,e){const t=oe(e,r.f);if(!(t>.001))return 0;const i=Math.max(Math.abs(oe(e,r.r)/(t*r.tanH)),Math.abs(oe(e,r.up)/(t*r.tanH)));if(i>1)return 0;const s=Math.min(1,Math.max(0,(1-i)/gt));return Math.max(1e-6,s*s*(3-2*s))}const Ot=(r,e)=>Math.min(1,Math.max(0,r*Math.max(1,e)/Math.min(Xs,Math.max(1,e))));function qs(r,e,t,i,s){if(r>=1&&e>=1)return{a:1-i,b:i,c:0};const n=r*(1-i),a=e*(s+(i-s)*r);return{a:n,b:a,c:Math.max(0,1-n-a)*t}}function Ke(r,e,t,i,s,n,a,o=25,c=1){const h=xe(r),u=Math.hypot(h[0],h[1])>1e-6?xe([h[1],-h[0],0]):[1,0,0],f=Pt(u,h),d=Math.tan(e),m=Ot(n,a),l={n:0,nA:0,nB:0,nC:0,sA:0,sB:0,sC:0,none:0,fallbackOnly:0,shown:0};for(let x=0;x<o;x++)for(let v=0;v<o;v++){const E=(2*v+1-o)/o,b=(2*x+1-o)/o;if(E*E+b*b>1)continue;const T=xe([h[0]+d*(E*u[0]+b*f[0]),h[1]+d*(E*u[1]+b*f[1]),h[2]+d*(E*u[2]+b*f[2])]),R=t?be(t,T):0,y=i?be(i,T):0,_=s==="cube"?1:s?be(s,T):0,A=qs(R,y,0,n,m),C=A.a*c,B=A.b*c,w={a:C,b:B,c:Math.max(0,1-C-B)*_};l.n++,R>0&&l.nA++,y>0&&l.nB++,_>0&&l.nC++,l.sA+=w.a,l.sB+=w.b,l.sC+=w.c,R<=0&&y<=0&&_<=0?l.none++:R<=0&&y<=0&&l.fallbackOnly++,l.shown+=w.a+w.b+w.c}const p=Math.max(1,l.n);return l.none/=p,l.fallbackOnly/=p,l.shown/=p,l}const S=r=>{const e=String(r);return/[.eE]/.test(e)?e:e+".0"},Ce=[];for(const r of[-1,1])for(const e of[-1,1])for(const t of[-1,1])Ce.push(`c ${r<0?"-":"+"} A ${e<0?"-":"+"} E ${t<0?"-":"+"} N`);const ve=["rPL0","rPL1","rPF00","rPF01","rPF10","rPF11"],Ee=["rGL0","rGL1","rGF00","rGF01","rGF10","rGF11"],Zs=["wl0","wl1","wf00","wf01","wf10","wf11"],Y=(r,e)=>r.map((t,i)=>`${Zs[i]} * cf(${t}, ${e}.0, yy)`).join(" + "),$s=D+`out vec4 o; void main() { o = vec4(0.0); }
`,Ys=D+`
uniform sampler2D uT;
out vec4 o;
void main() { o = vec4(textureLod(uT, vec2(0.5, 0.5), 0.0).r, 0.25, 0.0, 0.0); }
`,Vs=D+`
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
uniform vec2 uAtlasPixel;
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
flat out vec4 vRx, vRy, vAn, vP0, vP1, vP2, vG0, vG1, vG2, vQa, vQb, vW0, vW1;
const float RE = ${S(O)}, REFH = ${S(ue)}, COTD = ${ce}, HLO = ${S(Q)}, NCH = ${S(P)}, TWO_PI = 6.283185307179586;
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
  vQa = vec4(0.0); vQb = vec4(0.0, 0.0, 0.0, 2.0); vW0 = vec4(0.0); vW1 = vec4(0.0);
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
  vP0 = ${Y(ve,0)};
  vG0 = ${Y(Ee,0)};
  if (info.y > 1.5) {
    vP1 = ${Y(ve,1)};
    vG1 = ${Y(Ee,1)};
  }
  if (info.y > 2.5) {
    vP2 = ${Y(ve,2)};
    vG2 = ${Y(Ee,2)};
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
  vRx = vec4(rx, amp); vRy = vec4(ry, info.x); vAn = vec4(an, ha);
${Ce.map((r,e)=>`  vec3 p${e} = pj(${r});`).join(`
`)}
  float zmin = min(min(min(p0.z, p1.z), min(p2.z, p3.z)), min(min(p4.z, p5.z), min(p6.z, p7.z)));
  float zmax = max(max(max(p0.z, p1.z), max(p2.z, p3.z)), max(max(p4.z, p5.z), max(p6.z, p7.z)));
  vec3 q0 = pj(c - A), q1 = pj(c + A);
  vec2 ax = q1.xy - q0.xy;
  float axl = length(ax);
  vec2 dr = axl > 1e-6 ? ax / axl : vec2(1.0, 0.0);
  vec2 pr = vec2(-dr.y, dr.x);
${[0,1,2,3,4,5,6,7].map(r=>`  vec2 s${r} = vec2(dot(p${r}.xy, dr), dot(p${r}.xy, pr));`).join(`
`)}
  // Project a whole texel along each box axis. The coarse row pitch should
  // not pad a near-vertical strand by four columns on a rectangular tile.
  vec2 pad = vec2(uPx);
  if (uAtlasPixel.x > 0.0) pad = min(pad, vec2(dot(abs(dr), uAtlasPixel), dot(abs(pr), uAtlasPixel)));
  vec2 lo = min(min(min(s0, s1), min(s2, s3)), min(min(s4, s5), min(s6, s7))) - pad;
  vec2 hi = max(max(max(s0, s1), max(s2, s3)), max(max(s4, s5), max(s6, s7))) + pad;
  // Across the projected centreline every point on the segment axis has the same coordinate.
  // Its 4-sigma ellipse is inside the old box. Bound its width by its support along this
  // plane normal, divided by the smallest possible perspective depth of the old box.
  if (uTightBounds > 0.5 && zmin > 0.5 && axl > 1e-6) {
    float mid = dot(q0.xy, pr);
    vec3 plane = pr.x*uR + pr.y*uU - (mid*uTanH)*uF;
    float east = dot(plane,e), north = dot(plane,nn);
    float radius = uCutB * length(vec2(sx*(east + co*north), sy*north));
    float allowance = (sagL + 0.05) * (abs(east)/le + abs(north)/ln);
    float halfWidth = (radius + allowance)/(zmin*uTanH) + pad.y;
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
${Ce.map((r,e)=>`  vec4 o${e} = outs(${r});`).join(`
`)}
  vec4 om = min(min(min(o0, o1), min(o2, o3)), min(min(o4, o5), min(o6, o7)));
  if (max(max(om.x, om.y), max(om.z, om.w)) > 0.0) mode = 2.0;
  vQa = vec4(lo, hi); vQb = vec4(dr, info.y, mode);
}
`,ne=["vRx","vRy","vAn","vP0","vP1","vP2","vG0","vG1","vG2","vQa","vQb","vW0","vW1"],I=ne.length*4,Ks=D+`
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
layout(location = 12) in vec4 aW0;
layout(location = 13) in vec4 aW1;
uniform float uSwapXY;
flat out vec4 vRx, vRy, vAn, vP0, vP1, vP2, vG0, vG1, vG2, vW0, vW1;
flat out float vCh;
void main() {
  vRx = aRx; vRy = aRy; vAn = aAn; vP0 = aP0; vP1 = aP1; vP2 = aP2; vG0 = aG0; vG1 = aG1; vG2 = aG2; vW0 = aW0; vW1 = aW1; vCh = aQb.z;
  vec2 dr = aQb.xy, pr = vec2(-dr.y, dr.x), st = mix(aQa.xy, aQa.zw, aQ), pos = dr * st.x + pr * st.y;
  if (aQb.w > 0.5) pos = mix(vec2(-1.0), vec2(1.0), aQ);
  if (uSwapXY > 0.5) pos = pos.yx;
  if (aQb.w > 1.5) pos = vec2(2.0);
  gl_Position = vec4(pos, 0.0, 1.0);
}
`,Qs=D+`
uniform vec3 uF, uR, uU;
uniform vec2 uRasterSize;
uniform float uTanH, uOff, uYOff, uBW, uN, uCut2, uSwapXY;
uniform sampler2D uTab;
uniform vec4 uTabD;
uniform float uTexH;
uniform float uPInv;
flat in vec4 vRx, vRy, vAn, vP0, vP1, vP2, vG0, vG1, vG2, vW0, vW1;
flat in float vCh;
out vec4 oCol;
const float RE = ${S(O)}, SQ_PI_2 = 1.2533141373155003, NZF = ${ds.toFixed(1)}, ZST = ${ms}, POCT = ${ps.toFixed(1)}, SMAX = ${(xs-1).toFixed(1)};
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
`,fe=`
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
  float r = clamp((1.0 - m) * ${S(1/gt)}, 0.0, 1.0);
  return max(1e-6, r * r * (3.0 - 2.0 * r));
}
// Task BH (zone-curtain-gl.md §AJ): the wide map — the observer's cube in east / north / up, five gnomonic faces side by
// side in one target (sim/zone-curtain/wide.ts: 0 north, 1 east, 2 south, 3 west, 4 zenith; face k's tile from column k·n),
// T = (tan of a face's half side with its edge texels, n). The face is the direction's largest axis (below the horizon a
// side face, read clamped: nothing is drawn there). gS as samp's; it covers every direction (1).
vec3 cubeCoords(vec3 d, vec2 T) {
  if (uAtlasFilter > 0.5) {
    const float c = ${S(Qt)}, s = ${S(jt)};
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
`,Dt=fe+`uniform vec3 aF, aR, aU, bF, bR, bU;
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
`,js=D+`
uniform vec3 uF, uR, uU;
uniform float uTanH, uSize;
out vec4 o;
`+Dt+`
void main() {
  float px = (2.0 * gl_FragCoord.x / uSize - 1.0) * uTanH, py = (2.0 * gl_FragCoord.y / uSize - 1.0) * uTanH;
  o = mapsAt(normalize(uF + px * uR + py * uU));
}
`,zt=(r,e)=>Et("STAR_SKY")+Tt+Ht+qt+`
uniform float uRate[5];
uniform int uClass[5];
uniform sampler2D u_auExt;
uniform int u_auExtOn;
uniform float u_auRatioCap;
out vec4 o;
`+r+`
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
  ${e}
  if (u_cloudMode != 0) {
    float tn = cloudTauN(cd.xyz);
    if (tn > 0.0) v *= min(u_auRatioCap, exp(min(tn, 80.0)) / (1.0 + u_cloudTau.y * tn));
  }
  float r = length(u_originMm + vec2(p) * u_pitchMm), sky0 = lutAt(1, 0.0).x;
  float off = sky0 > 0.0 ? max(0.0, lutAt(1, atan(r / u_focalMm)).x) / sky0 : 1.0;
  o = vec4(v * off, 0.0, 0.0, 0.0);
}
`,Qe=zt(Dt,`float x = hzX(up), v = 0.0;
  for (int c = 0; c < 5; c++) {
    int k = uClass[c];
    v += uRate[c] * (k == 0 ? m.x : k == 1 ? m.y : m.z) * auExt(c, x);
  }`),Js=zt(fe+`
uniform vec2 cT;
uniform sampler2D cC, dC;
uniform float uAlphaW, uKC;
uniform vec3 uLight[${re}];
vec4 mapsAt(vec3 d) {
  return vec4(uKC * atlasPair(cubeCoords(d, cT), cT, cC, cC, dC, dC, uAlphaW), 1.0);
}
`,`float x = hzX(up);
  int i = int(floor(x));
  float v = dot(m.xyz, mix(uLight[i], uLight[min(i + 1, ${re-1})], x - float(i)));`),ei=D+`
uniform vec3 uF, uR, uU;
uniform vec2 uRasterSize;
uniform float uTanH, uOff, uYOff, uSwapXY;
uniform sampler2D uLine;
uniform vec2 uObs;
out vec4 oCol;
const float RE = ${S(O)}, REFH = ${S(ue)}, COTD = ${ce}, X0 = ${S(-720)}, DXL = ${S(M.DX)}, FMAX = ${S(ae-1.001)}, SIGN = ${S(M.SIG_N)};
const float NORM = ${S(1/(Math.sqrt(2*Math.PI)*M.SIG_N*M.NSEG))};
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
${Ws().mid.map(r=>`  I += redAt(${S(r)});`).join(`
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
`,si=Et("STAR_SKY")+Tt+`
uniform vec3 uMF, uMR, uMU;
uniform float uTanR, uN;
uniform vec3 mF, mR, mU;
uniform vec2 mT;
uniform float mCube;
uniform sampler2D mC, mE;
uniform int uComp[4], uCls[4];
uniform float uK[4];
out vec4 o;
`+ti+fe+`
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
`,ii=D+`
uniform sampler2D uS;
uniform float uN;
uniform vec4 uW;
out vec4 o;
vec4 at(ivec2 q, int n) { return q.x < 0 || q.y < 0 || q.x >= n || q.y >= n ? vec4(0.0) : texelFetch(uS, q, 0); }
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  int blk = p.x / 3, kind = p.x - 3 * blk, n = int(uN);
  ivec2 b0 = ivec2(blk, p.y) * ${Z};
  vec4 s = vec4(0.0), bb = vec4(0.0);
  float best = -1.0, cnt = 0.0;
  for (int j = 0; j < ${Z}; j++) for (int i = 0; i < ${Z}; i++) {
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
`,ri=D+fe+`
uniform vec3 uMF, uMR, uMU;
uniform vec2 mT;
uniform float uTanR, uN;
uniform sampler2D uMap;
out vec4 o;
void main() {
  vec2 ab = 2.0 * floor(gl_FragCoord.xy) + 1.0 - uN;
  if (dot(ab, ab) > uN * uN) { o = vec4(0.0); return; }
  vec2 g = ab / uN;
  vec3 d = normalize(uMF + uTanR * (g.x * uMR + g.y * uMU));
  if (d.z <= 0.0) { o = vec4(0.0); return; }
  cubeAt(d, mT, uMap, uMap);
  o = gS;
}
`,ni=D+`
uniform sampler2D uB;
uniform int uNB, uOff;
out vec4 o;
void main() {
  int kind = int(gl_FragCoord.x) - uOff;
  vec4 s = vec4(0.0), bb = vec4(0.0);
  float best = -1.0, cnt = 0.0;
  for (int j = 0; j < ${se/Z}; j++) {
    if (j >= uNB) break;
    for (int i = 0; i < ${se/Z}; i++) {
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
`,Te={maxTextureSize:4096,maxVertexAttribs:1+ne.length,maxTfInterleaved:I,maxVertexTextureUnits:3,maxTextureUnits:16,maxFragmentUniformVectors:64,maxVertexUniformVectors:64},je={filter:.02,blend:.001},ge=r=>r?"rgba32f":"rgba16f",ai={maxTextureSize:"MAX_TEXTURE_SIZE",maxVertexAttribs:"MAX_VERTEX_ATTRIBS",maxTfInterleaved:"MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS",maxVertexTextureUnits:"MAX_VERTEX_TEXTURE_IMAGE_UNITS",maxTextureUnits:"MAX_TEXTURE_IMAGE_UNITS",maxFragmentUniformVectors:"MAX_FRAGMENT_UNIFORM_VECTORS",maxVertexUniformVectors:"MAX_VERTEX_UNIFORM_VECTORS"};function Je(r){if(!r.colorBufferFloat)return"EXT_color_buffer_float missing (float colour targets)";if(!r.fence)return"fenceSync missing (the meter's read-back)";for(const e of Object.keys(Te))if(!(r[e]>=Te[e]))return`${ai[e]} ${r[e]} < ${Te[e]}`;return r.probeError?`probe: ${r.probeError}`:r.filterProbe===null||!(Math.abs(r.filterProbe-.5)<=je.filter)?`RGBA16F linear filtering: probe ${r.filterProbe} (0.5 expected)`:r.blendProbe===null||!(Math.abs(r.blendProbe-.5)<=je.blend)?`additive blending into ${ge(r.floatBlend).toUpperCase()}: probe ${r.blendProbe} (0.5 expected)`:null}const et=.5,oi=8,ci=r=>Math.min(Math.max(0,r),et/oi)/et;function ui(r){const e=Zt("auroral-zone",r);return W.map(t=>e[t])}function hi(r,e,t,i){r.fill(0);for(let s=0;s<e.length;s++){const n=t[s],a=e[s];for(let o=0;o<re;o++){const c=3*o+n;r[c]=r[c]+a*(i?i[s*re+o]:1)}}}function Ae(r,e,t,i,s,n=1){const a=r.length,o=new Float32Array(a),c=new Float32Array(a),h=Math.min(1,Math.max(0,s));for(let u=0;u<a;u++){const f=e[u]===0||e[u]===1||e[u]===2,d=t[u];o[u]=f&&d>0?r[u]*(i/d)*h*n:0,c[u]=f?r[u]*(1-h):r[u]}return{map:o,coarse:c}}const L=12,g=["core","env","glow"],fi=r=>[(-r*r*r+2*r*r-r)/2,(3*r*r*r-5*r*r+2)/2,(-3*r*r*r+4*r*r+r)/2,(r*r*r-r*r)/2],tt=(r,e)=>({w:r==="linear"?[0,1-e,e,0]:fi(e),u2:e,wc:r==="cubicw"?1:0});function li(r,e,t,i){const s=Math.PI/180,n=r*s,a=e*s,o=[Math.sin(n)*Math.cos(a),Math.cos(n)*Math.cos(a),Math.sin(a)],c=[Math.cos(n),-Math.sin(n),0],h=[o[1]*c[2]-o[2]*c[1],o[2]*c[0]-o[0]*c[2],o[0]*c[1]-o[1]*c[0]].map(f=>-f),u=h[2]<0?h.map(f=>-f):h;return{f:o,r:c,up:u,tanH:Math.tan(.5*t*s),size:i}}function st(r,e,t,i,s=5,n=1){const a=Math.PI/180,o=Math.tan(.5*t*a),c=Math.min(80,.5*t+s),h=Math.tan(c*a),u=2*Math.max(2,Math.round(.5*i*n*h/o));return li(r,e,2*c,u)}const Re=48,di=6;function mi(r,e,t,i,s,n){const a=Math.max(...r.map(u=>u.n)),o=i.map(()=>[]),c=i.map(u=>{const f=u.tanH*(1+n);return[u.r,u.up].flatMap(d=>[-1,1].map(m=>u.f.map((l,p)=>f*l+m*d[p])))}),h=t.reduce((u,f)=>u+Math.max(0,-f),0);for(let u=0;u<a;u+=Re){const f=u/Re*di;let d=1/0,m=-1/0,l=1/0,p=-1/0,x=0,v=0;for(const w of e)f>=w.length||(d=Math.min(d,w[f]),m=Math.max(m,w[f+1]),l=Math.min(l,w[f+2]),p=Math.max(p,w[f+3]),x=Math.max(x,w[f+4]),v=Math.max(v,w[f+5]));if(d>m)continue;const E=(m-d)*h,b=(p-l)*h;d-=E,m+=E,l-=b+(j-ue)*ce,p+=b-(Q-ue)*ce;const T=Math.max(d*d,m*m)+Math.max(l*l,p*p),R=T/(O*O),y=(1+Q/O)*(1-R/6),_=1+j/O,A=_*s*Math.sqrt(1+h)*(Math.sqrt(x)+Math.sqrt(v))+4,C=[Math.min(y*d,_*d)-A,Math.min(y*l,_*l)-A,Q-(O+j)*R/2-A],B=[Math.max(y*m,_*m)+A,Math.max(y*p,_*p)+A,j+A];for(let w=0;w<c.length;w++){if(R<=.0625&&c[w].some(([X,Pe,Oe])=>X*(X<0?C[0]:B[0])+Pe*(Pe<0?C[1]:B[1])+Oe*(Oe<0?C[2]:B[2])<0))continue;const k=o[w],N=k[k.length-1],U=Math.min(Re,a-u);N&&N[0]+N[1]===u?k[k.length-1]=[N[0],N[1]+U]:k.push([u,U])}}return o}const Ut=[8,12,16,24],it=2.6,pi=.75,rt=3,xi=16,bi=6,vi=40,nt=55,Ei=40,at=(r=Ut[0])=>({n:r,down:0,changes:0});function ot(r){if(r.length<bi)return null;const e=[...r].sort((t,i)=>t-i);return e[e.length>>1]}function Ti(r,e,t){const i=Ut,s=i.indexOf(r.n);if(s<0||e===null)return r;const n=h=>({n:h,down:0,changes:r.changes+(h!==r.n?1:0)});if(e!==void 0){const h=d=>i.find(m=>e/m<=d)??i[i.length-1],u=h(it),f=h(it*pi);return u>r.n?n(u):f<r.n?r.down+1>=rt?n(i[s-1]):{...r,down:r.down+1}:r.down?{...r,down:0}:r}if(t>1/vi&&s<i.length-1)return{...n(i[s+1]),cool:Ei};const a=r.cool??0,o=Math.max(0,a-1),c=h=>a?{...h,cool:o}:h;return a>0&&t<1/nt?{...r,down:0,cool:o}:t<1/nt&&s>0?r.down+1>=rt?n(i[s-1]):c({...r,down:r.down+1}):r.down||a?c({...r,down:0}):r}const Ai=12,Ri=1.6,wi=.25,yi=.3,_i=Math.LN2/.4;function Si(r,e,t,i,s=Ai,n=Ri){const a=Math.max(0,i-r.t),o=-Math.expm1(-a/s),c=Math.exp(-a/wi),h=Math.exp(_i*a),u=(f,d)=>{if(!(d>0)||!(f>0))return Math.max(0,d);const m=f+o*(d-f),l=d*n,p=d/n,x=m>l?l+(m-l)*c:m<p?p-(p-m)*c:m;return Math.min(f*h,Math.max(f/h,x))};return{t:i,mean:u(r.mean,e),peak:u(r.peak,t)}}const ie=(r,e)=>r[0]*e[0]+r[1]*e[1]+r[2]*e[2];function Mi(r,e){let t=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([s,n])=>r.f.map((a,o)=>a+r.tanH*(s*r.r[o]+n*r.up[o])));const i=[[0,0,1],...[e.r,e.up].flatMap(s=>[-1,1].map(n=>e.f.map((a,o)=>a+n*s[o])))];for(const s of i){if(!t.length)break;const n=[];let a=t.at(-1),o=ie(s,a)+1e-6;for(const c of t){const h=ie(s,c)+1e-6;o>=0!=h>=0&&n.push(a.map((u,f)=>u+(c[f]-u)*o/(o-h))),h>=0&&n.push(c),a=c,o=h}t=n}return t}function ct(r,e,t,i){const{x0:s=0,y0:n=0,w:a,h:o}=t;let c=a,h=0,u=o,f=0;for(const x of r){const v=ie(x,e.f)*e.tanH,E=(1+ie(x,i?e.up:e.r)/v)*a/2,b=(1+ie(x,i?e.r:e.up)/v)*o/2;c=Math.min(c,E),h=Math.max(h,E),u=Math.min(u,b),f=Math.max(f,b)}const d=Math.max(0,Math.floor(c)-3),m=Math.min(a,Math.ceil(h)+3),l=Math.max(0,Math.floor(u)-3),p=Math.min(o,Math.ceil(f)+3);return[s+d,n+l,m-d,p-l]}const Fi=6,we={N:8,dt:.25,margin:5,envBands:16,cut:4,mode:"cubic",maxMapSize:512,pitchDegMax:.25,fixedAtlas:!1},Ci=16,ke=3,q=6,ut=16*q*ke,G=(r,e)=>{r.push(e),r.length>600&&r.shift()};function ht(r,e,t){const i=r.msg.red,s=e.msg.red;if(!i||!s)return null;const n=i.A.length,a=new Float32Array(n),o=new Float32Array(n);for(let c=0;c<n;c++)a[c]=i.A[c]+(s.A[c]-i.A[c])*t,o[c]=i.Y[c]+(s.Y[c]-i.Y[c])*t;return{A:a,Y:o}}const ft=.5,ye=16,ki=2,Bi=300,Ni=.6,gi=.12,Pi=.32,V=8,lt=4,dt=16,Oi=16,mt=64,K=[.25,1/3,.5],Di=.75,zi=.4,pt=12,Ui=3e3,_e=()=>({A:null,B:null,acc:null,job:null,slice:0,rot:0,startedAt:0});let Se=null;function Li(r,e){const t=r.createProgram(),i=!!r.getExtension("KHR_parallel_shader_compile");e.programs.add(t);const s=[[r.VERTEX_SHADER,Vs],[r.FRAGMENT_SHADER,$s]].map(([u,f])=>{const d=r.createShader(u);return r.shaderSource(d,f),r.compileShader(d),r.attachShader(t,d),{s:d}});r.transformFeedbackVaryings(t,ne,r.INTERLEAVED_ATTRIBS),r.linkProgram(t);let n=!1,a=null;const o=()=>!i||r.getProgramParameter(t,37297)===!0;e.deferred.set(t,{shaders:s,ready:o});const c=()=>{if(!(n||a||!s.length))try{for(const{s:u}of s)if(!r.getShaderParameter(u,r.COMPILE_STATUS))throw new Error(`zoneCurtainExpand compile: ${r.getShaderInfoLog(u)}`);if(!r.getProgramParameter(t,r.LINK_STATUS))throw new Error(`zoneCurtainExpand link: ${r.getProgramInfoLog(t)}`);n=!0}catch(u){a=u instanceof Error?u:new Error(String(u))}finally{for(const{s:u}of s)r.getAttachedShaders(t)?.includes(u)&&r.detachShader(t,u),r.deleteShader(u);s.length=0,e.deferred.delete(t)}},h=new Map;return{prog:t,loc:{get:u=>(h.has(u)||h.set(u,r.getUniformLocation(t,u)),h.get(u))},done:()=>n||a!==null||o(),check:()=>{if(c(),a)throw a}}}const xt=120,bt=1e3,Ii=30,Wi=r=>[{set:"core",tgt:"core",tab:0,pulse:1},{set:"env",tgt:"env",tab:r,pulse:1},{set:"glow",tgt:"env",tab:r,pulse:0}],vt=new Float32Array([0,0,1,0,0,1,1,1]),Lt=(r,e)=>({level:Math.min(3,Math.max(0,Math.round(r))),seed:e}),Xi=(r,e)=>({...Lt(r,e),weather:{seed:e}});function Gi(r,e,t,i,s){const n=[];for(let a=0;a<r.length;a+=Fi){const o={t0:r[a],vz:r[a+1],amp:r[a+2],xc:r[a+3],w:r[a+4],lag:r[a+5]},c=Math.max(t,o.xc-2.8*o.w),h=Math.min(i,o.xc+2.8*o.w);h>=c&&[c,h,Math.min(h,Math.max(c,o.xc))].some(u=>{const f=e-(o.t0+(u-o.xc)*o.lag);return f>0&&70+o.vz*f<=420})&&n.push(o)}return n.sort((a,o)=>o.amp-a.amp),{events:n.slice(0,s),dropped:Math.max(0,n.length-s)}}const It=[0,1,2,3,15];function J(r){const e=s=>r.getParameter(s),t=e(r.ACTIVE_TEXTURE),i=It.map(s=>(r.activeTexture(r.TEXTURE0+s),e(r.TEXTURE_BINDING_2D)));return r.activeTexture(t),{prog:e(r.CURRENT_PROGRAM),vao:e(r.VERTEX_ARRAY_BINDING),array:e(r.ARRAY_BUFFER_BINDING),copyRead:e(r.COPY_READ_BUFFER_BINDING),copyWrite:e(r.COPY_WRITE_BUFFER_BINDING),tfo:e(r.TRANSFORM_FEEDBACK_BINDING),tfBuffer:e(r.TRANSFORM_FEEDBACK_BUFFER_BINDING),discard:r.isEnabled(r.RASTERIZER_DISCARD),blend:r.isEnabled(r.BLEND),viewport:e(r.VIEWPORT),scissor:r.isEnabled(r.SCISSOR_TEST),drawFb:e(r.DRAW_FRAMEBUFFER_BINDING),readFb:e(r.READ_FRAMEBUFFER_BINDING),cull:r.isEnabled(r.CULL_FACE),depth:r.isEnabled(r.DEPTH_TEST),unpack:e(r.UNPACK_ALIGNMENT),unit:t,tex:i}}function ee(r,e){if(r.isContextLost()||!e.viewport)return;const t=(i,s)=>{s?r.enable(i):r.disable(i)};t(r.RASTERIZER_DISCARD,e.discard),r.bindTransformFeedback(r.TRANSFORM_FEEDBACK,e.tfo),r.bindBuffer(r.TRANSFORM_FEEDBACK_BUFFER,e.tfBuffer),r.bindVertexArray(e.vao),r.bindBuffer(r.ARRAY_BUFFER,e.array),r.bindBuffer(r.COPY_READ_BUFFER,e.copyRead),r.bindBuffer(r.COPY_WRITE_BUFFER,e.copyWrite),r.vertexAttrib4f(12,0,0,0,1),r.useProgram(e.prog),t(r.BLEND,e.blend),r.blendFunc(r.ONE,r.ONE),r.blendEquation(r.FUNC_ADD),t(r.CULL_FACE,e.cull),t(r.DEPTH_TEST,e.depth),t(r.SCISSOR_TEST,e.scissor),r.viewport(e.viewport[0],e.viewport[1],e.viewport[2],e.viewport[3]),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,e.drawFb),r.bindFramebuffer(r.READ_FRAMEBUFFER,e.readFb),r.pixelStorei(r.UNPACK_ALIGNMENT,e.unpack),It.forEach((i,s)=>{r.activeTexture(r.TEXTURE0+i),r.bindTexture(r.TEXTURE_2D,e.tex[s]??null)}),r.activeTexture(e.unit)}function Hi(r,e,t){const i=performance.now(),s=h=>Number(r.getParameter(h)),n=r.getSupportedExtensions()??[],a=!!r.getExtension("EXT_color_buffer_float"),o=t||!!r.getExtension("EXT_float_blend"),c={colorBufferFloat:a,floatBlend:o,fence:typeof r.fenceSync=="function",maxTextureSize:s(r.MAX_TEXTURE_SIZE),maxVertexAttribs:s(r.MAX_VERTEX_ATTRIBS),maxTfInterleaved:s(r.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS),maxVertexTextureUnits:s(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureUnits:s(r.MAX_TEXTURE_IMAGE_UNITS),maxFragmentUniformVectors:s(r.MAX_FRAGMENT_UNIFORM_VECTORS),maxVertexUniformVectors:s(r.MAX_VERTEX_UNIFORM_VECTORS),filterProbe:null,blendProbe:null,probeError:null,reason:null,target:ge(o),timerQuery:n.includes("EXT_disjoint_timer_query_webgl2"),floatLinear:n.includes("OES_texture_float_linear"),probeMs:0};if(Je({...c,filterProbe:.5,blendProbe:.5})===null){const h=J(r),u=r.getParameter(r.PIXEL_PACK_BUFFER_BINDING);let f=null,d=null,m=null,l=null;try{r.activeTexture(r.TEXTURE15),f=e.texture(2,1,r.RGBA16F,r.RGBA,r.FLOAT,new Float32Array([0,0,0,0,1,1,1,1])),r.bindTexture(r.TEXTURE_2D,f),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),d=e.target(1,1,o?r.RGBA32F:r.RGBA16F,r.RGBA),m=e.program("zoneCurtainProbe",z,Ys),l=r.createVertexArray(),r.bindVertexArray(l),r.useProgram(m.prog),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,f),r.uniform1i(m.loc.get("uT"),0),r.bindFramebuffer(r.FRAMEBUFFER,d.fbo),r.viewport(0,0,1,1),r.disable(r.SCISSOR_TEST),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.clearBufferfv(r.COLOR,0,[0,0,0,0]),r.enable(r.BLEND),r.blendFunc(r.ONE,r.ONE),r.blendEquation(r.FUNC_ADD),r.drawArrays(r.TRIANGLES,0,3),r.drawArrays(r.TRIANGLES,0,3);const p=new Float32Array(4);r.bindBuffer(r.PIXEL_PACK_BUFFER,null),r.readPixels(0,0,1,1,r.RGBA,r.FLOAT,p);const x=r.getError();x!==r.NO_ERROR&&(c.probeError=`GL error 0x${x.toString(16)}`),c.filterProbe=p[0]/2,c.blendProbe=p[1]}catch(p){c.probeError=(p instanceof Error?p.message:String(p)).split(`
`)[0].slice(0,200)}finally{l&&r.deleteVertexArray(l),m&&(r.deleteProgram(m.prog),e.programs.delete(m.prog)),d&&e.deleteTarget(d),f&&e.deleteTexture(f),ee(r,h),r.bindBuffer(r.PIXEL_PACK_BUFFER,u)}}return c.reason=Je(c),c.probeMs=performance.now()-i,c}class qi{opt;caps=null;stats={frames:0,maps:0,misses:0,miss3:0,states:0,workerMs:[],uploadBytes:0,tablesMs:null,tableLayers:[],slots:{core:0,env:0,glow:0},segsLastSlice:0,eventsDropped:0,mainMs:[],glErrors:0,failed:null,target:"",stillFrames:0,restarts:0,composed:0,w:0,meterReads:0,meterBack:0,meterTimeouts:0,meterLatency:0,meterMs:[],meterN:0,meterSteps:[],collectMs:[],collectSteps:[],meterWorkerMs:[],redPasses:0,first:{made:typeof performance<"u"?performance.now():0,programs:null,linked:null,tables:null,state:null,maps:null,metered:null,faded:null,tablesCached:!1},lostCalls:0,follow:{rate:0,wideMaps:0,wideFrames:0,wideMs:0,wideSize:0,wideMisses:0,fine:0,fineDropped:0,standingMaps:0},auto:{n:0,via:"",sliceMs:null,mapMs:null,changes:0},workerMsParts:[]};lost(e){return e.isContextLost()?(this.stats.lostCalls++,!0):!1}debugMeterN=null;meterIn=null;debugW=null;debugCompose=!0;debugFadeHold=!1;debugClassGain=null;debugRedOff=!1;debugRedSource=null;debugN=null;get nNow(){return this.nCur}nCur;autoN=at();wide=_e();standSince=null;phi=0;phiAt=null;debugWide=!0;debugFine=!0;get atlasActive(){return this.opt.fixedAtlas&&this.debugN===null&&this.debugWide}debugAtlasCull=!0;debugAtlasPixelPadding=!0;atlasSlots={kept:0,all:0,faces:[0,0,0,0,0]};newAtlas(){return this.newWideMap(Jt(Pi,lt),!0)}debugWideMoving=null;shown=[];noteShown(e,t,i,s){this.shown.push({at:performance.now(),lag:e-t,onTime:!s.miss&&!s.miss3&&t>i+1e-6}),this.shown.length>300&&this.shown.shift()}updateRate(e=5e3){const t=performance.now(),i=this.shown.filter(n=>t-n.at<=e),s=i.map(n=>n.lag).sort((n,a)=>n-a);return{perS:1e3*i.length/e,onTimePerS:1e3*i.filter(n=>n.onTime).length/e,lagMed:s.length?s[s.length>>1]:null,lagP90:s.length?s[Math.floor(.9*(s.length-1))]:null,n:i.length}}tq=void 0;autoCost=[];timeBegin(e){const t=this.tq;if(!t||t.pend.length>=6||e.getQuery(t.ext.TIME_ELAPSED_EXT,e.CURRENT_QUERY))return null;const i=e.createQuery();return i&&e.beginQuery(t.ext.TIME_ELAPSED_EXT,i),i}timeEnd(e,t,i){const s=this.tq;e.endQuery(s.ext.TIME_ELAPSED_EXT),s.pend.push({q:t,n:i})}timePoll(e){if(this.tq===void 0){const s=this.caps?.timerQuery===!1?null:e.getExtension("EXT_disjoint_timer_query_webgl2");this.tq=s?{ext:s,pend:[]}:null}const t=this.tq;if(!t||!t.pend.length)return;const i=!!e.getParameter(t.ext.GPU_DISJOINT_EXT);for(;t.pend.length&&e.getQueryParameter(t.pend[0].q,e.QUERY_RESULT_AVAILABLE);){const s=t.pend.shift();if(!i){const n=Number(e.getQueryParameter(s.q,e.QUERY_RESULT))/1e6;this.autoCost.push(n*s.n),this.autoCost.length>xi&&this.autoCost.shift(),this.stats.auto.sliceMs=n}e.deleteQuery(s.q)}}seed;debugMaps=null;debugHold=!1;debugScene=null;debugSceneExtra=null;res=null;worker=null;makeWorker;key="";scene=null;tables=null;tablesAsked=!1;ring=[];pending=[];inFlight=!1;nextT=0;reqId=0;cap={core:0,env:0,glow:0};pX=null;pR=null;pD=null;pC=null;referenceCompose=null;spectralRows=new Float32Array(3*re);lastSpectrum=null;pRed=null;redTex=null;progQueue=[];tableWorker=null;pM=[];mS=null;mB=null;mF=null;pbos=[];reads=[];extIds=new WeakMap;extNext=1;expandInputs=new Map;vaoR=null;vaoD=null;quad=null;tfo=null;out=null;kTex=null;ptPool=[];refCpu=new Map;accFmt=0;A=null;B=null;acc=null;Ta=0;Tb=0;cur=null;slice=0;fdts=[];lastT=null;waitSince=null;hist=[];omega={axis:[0,0,1],rate:0};view=null;trash=[];w=0;lastWall=null;unmetered=0;retiring=null;retShare=0;retOut=null;outAt=null;holdS=0;retiringShare(e){return this.retiring?this.retShare*(this.retOut??1-e):0}meterPairs(){if(this.retOut===null||!this.retiring||this.debugMaps||this.debugW!==null)return this.pairs();if(!this.programReady())return[];const e=[],t=this.maps(),i=this.retShare*(1-this.w);return i>0&&e.push({m:this.retiring,share:i}),t&&this.w>0&&e.push({m:t,share:this.w}),e}weather;wx=null;constructor(e={},t,i=0,s=!1){this.opt={...we,...e},this.nCur=this.opt.N,this.seed=i>>>0,this.weather=s,this.autoN=at(this.opt.N),this.makeWorker=t??(()=>new Worker(new URL(""+new URL("zone-curtain.worker-ZtnixFBJ.js",import.meta.url).href,import.meta.url),{type:"module"}))}maps(){if(this.debugMaps)return this.debugMaps;if(!this.linked)return null;const e=this.wide,t=e.A??(this.opt.fixedAtlas?e.B:null),i=this.opt.fixedAtlas?V:ye,s=this.debugWide&&t&&e.B?{A:t,B:e.B,alpha:Math.min(1,e.rot/(5*i))}:null;return!this.atlasActive&&this.A&&this.B?{A:this.A,B:this.B,alpha:this.alphaNow(),wide:s,fine:s?this.phi:1}:s?{A:s.A,B:s.B,alpha:s.alpha,wide:s,fine:0}:null}coverageNow(e,t,i=25){const s=this.debugMaps??this.maps();if(!s)return{n:0,nA:0,nB:0,nC:0,sA:0,sB:0,sC:0,none:1,fallbackOnly:0,shown:0};const n=s.fine??1,a=Ke(e,t,n>0?s.A.cam:null,n>0?s.B.cam:null,s.wide?"cube":null,s.alpha,this.nCur,i,n);return{...a,shown:a.shown*this.weight()}}coverageOfView(e=15){const t=this.view;return t?this.coverageNow(t.dir,t.fovDeg*Math.PI/360,e):null}layersOf(e){const t=[];for(const{m:i,share:s}of e){const n=i.fine??1;n>0&&t.push({A:i.A,B:i.B,alpha:i.alpha,share:s*n}),i.wide&&n<1&&t.push({A:i.wide.A,B:i.wide.B,alpha:i.wide.alpha,share:s*(1-n)})}return t}alphaNow(){return Math.min(1,this.rotFrames/Math.max(1,this.rotN))}rotFrames=0;rotN=we.N;pairs(){if(!this.programReady())return[];if(this.debugMaps)return[{m:this.debugMaps,share:this.debugW??this.w}];const e=[],t=this.maps(),i=this.debugW??this.w;if(this.retiring&&this.debugW===null){const s=this.retiringShare(i);s>0&&e.push({m:this.retiring,share:s})}return t&&i>0&&e.push({m:t,share:i}),e}weight(){return(this.debugMaps??this.maps())&&this.programReady()?this.debugW??this.w:0}shares(){let e=0,t=0;for(const i of this.pairs())i.m===this.retiring?t=i.share:e=i.share;return{current:e,retiring:t}}coarseRates(e,t){return this.debugW!==null?this.debugW>0?Ae(e,t,e,1,this.debugW).coarse:e:this.stats.failed?e:Ae(e,t,e,1,1).coarse}compose(e,t,i,s,n,a,o,c){const h=this.pairs();if(!h.length||!this.pC||!this.debugCompose||this.lost(e))return!1;const u=this.opt.fixedAtlas&&c!==void 0&&h.every(({m:l})=>l.fine===0&&l.wide?.A.filtered&&l.wide.B.filtered),f=this.opt.fixedAtlas&&!u?this.referenceCompose??=this.res.program("zoneCurtainReferenceCompose",z,Qe):this.pC;e.useProgram(f.prog),a(f),u||e.uniform1iv(f.loc.get("uClass"),Int32Array.from(i));const d=ui(s),m=this.debugClassGain;for(const{m:l,share:p}of h){this.bindMaps(e,f,l,2,u);const x=Ae(t,i,d,l.A.kR,p,n).map;if(m)for(let v=0;v<x.length;v++)x[v]=x[v]*(m[i[v]]??1);u?this.bindSpectrum(e,f,c??null,x,i):e.uniform1fv(f.loc.get("uRate"),x),o()}return e.activeTexture(e.TEXTURE0),this.stats.composed++,!0}bindSpectrum(e,t,i,s,n){const a=this.lastSpectrum;a&&a.ext===i&&s.every((o,c)=>o===a.rate[c]&&n[c]===a.cls[c])||(hi(this.spectralRows,s,n,i),e.uniform3fv(t.loc.get("uLight[0]"),this.spectralRows),this.lastSpectrum={ext:i,rate:s,cls:Int32Array.from(n)})}meterField(){const e=t=>this.readingOf(t);return Ie(this.layersOf(this.meterPairs()).map(t=>({A:e(t.A),B:e(t.B),alpha:t.alpha,share:t.share})))}meterStats(e,t){const i=We(e,t,Fe(),this.meterField()),s=this.retOut===null?i.mean:We(e,t,Fe(),Ie(this.layersOf(this.pairs()).map(h=>({A:this.readingOf(h.A),B:this.readingOf(h.B),alpha:h.alpha,share:h.share})))).mean,n=typeof performance<"u"?performance.now()/1e3:0,a=this.slowLight;if(this.debugMeterFast)return this.slowLight=null,{...i,shown:s};const o=this.retiring||this.w<1?yi:this.debugGainTau??void 0,c=a&&n-a.t>=0&&n-a.t<2?Si(a,i.mean,i.peak,n,o):{t:n,mean:i.mean,peak:i.peak};return this.slowLight=c,{mean:c.mean,peak:c.peak,shown:s}}slowLight=null;debugMeterFast=!1;debugGainTau=null;meterOptics=null;meterWake;debugKeepStates=!1;meterWorker=null;meterWorkerReady=!1;meterNoInputAt=null;meterWaitingAt=null;meterActiveMs=0;meterLastCollect=null;meterOpticsKey="";meterLuts=new WeakMap;meterLutId=0;meterRequest=null;meterResult=null;meterId=0;meterFrame=0;meterGrid=null;get meterBackend(){return this.stats.failed?"legacy":this.useBackgroundMeter()?"worker":"gpu-reference"}get meterFading(){return!this.stats.failed&&this.useBackgroundMeter()&&!this.debugHold&&this.w<1}enableBackgroundMeter(e){try{const t=this.meterWorker=e();t.onmessage=({data:i})=>{this.meterWorker===t&&(i.cmd==="ready"?(this.meterWorkerReady=!0,this.meterWake?.()):i.cmd==="error"?this.failBackgroundMeter(i.message):this.meterRequest?.id===i.id&&(this.meterResult=i,this.meterWake?.()))},t.onerror=i=>{this.meterWorker===t&&this.failBackgroundMeter(i.message||"worker unavailable")},t.onmessageerror=()=>{this.meterWorker===t&&this.failBackgroundMeter("invalid worker message")},this.postMeter({cmd:"init",envBands:this.opt.envBands,cut:this.opt.cut})}catch(t){this.failBackgroundMeter(t instanceof Error?t.message:String(t))}}failBackgroundMeter(e){this.stats.meterTimeouts+=this.meterRequest?.maps.length??0,this.meterWorker?.terminate(),this.meterWorker=null,this.meterWorkerReady=!1,this.meterRequest=this.meterResult=null,this.stats.failed=`zoneCurtainMeterWorker: ${e}`,this.meterWake?.()}postMeter(e,t=[]){if(this.meterWorker)try{this.meterWorker.postMessage(e,t)}catch(i){this.failBackgroundMeter(i instanceof Error?i.message:String(i))}}useBackgroundMeter(){return!!this.meterWorker&&this.debugMaps===null&&this.debugMeterN===null}backgroundSample(e){const t=this.meterOptics,i=performance.now(),s=this.maps(),n=this.retiring;if(!this.meterWorkerReady||!s&&!n)return;if(!t){this.meterActiveMs-(this.meterNoInputAt??=this.meterActiveMs)>5e3&&this.failBackgroundMeter("optical field unavailable");return}this.meterNoInputAt=null;const a=s&&(!s.A.reading||!s.B.reading)&&this.w===0;if(a&&this.meterActiveMs-(this.meterWaitingAt??=this.meterActiveMs)>5e3){this.failBackgroundMeter("initial readings could not be used");return}a||(this.meterWaitingAt=null);const o=this.meterShape(e.radiusDeg),c=e.ext?this.extinctionKey(e.ext):0;let h=this.meterLuts.get(t.sky.buffer);h===void 0&&this.meterLuts.set(t.sky.buffer,h=++this.meterLutId);const u=W.map(b=>e.rates[b]??0),f=Math.max(...u)||1,d=`${o.n}|${o.tanR.toFixed(6)}|${c}|${t.key}|${h}|${u.map(b=>(b/f).toFixed(7)).join(",")}`,m=this.meterOpticsKey!==d;if(this.meterOpticsKey=d,this.meterRequest||!e.snapshot&&!m&&!a&&i-this.lastReduceAt<bt)return;const l=`${e.axis.map(b=>b.toFixed(4)).join(",")}|${d}`,p=s?[s.A,s.B]:[];s?.wide&&p.push(s.wide.A,s.wide.B),n&&(p.push(n.A,n.B),n.wide&&p.push(n.wide.A,n.wide.B));const x=[...new Set(p)].filter(b=>b.meterJob&&b.readKey!==l).slice(0,2);if(!x.length)return;const v=Array.from(e.cls);this.meterIn={axis:[...e.axis],radiusDeg:e.radiusDeg,n:o.n,tanR:o.tanR,count:o.count,level:e.level,cls:v,weights:u},this.lastReduceAt=i;const E=++this.meterId;this.meterRequest={id:E,key:l,opticsKey:d,optics:t,start:this.meterActiveMs,frame:this.meterFrame,maps:x.map(b=>({map:b,gen:b.gen}))},this.stats.meterReads+=x.length,this.stats.meterN=o.n,this.postMeter({cmd:"measure",id:E,view:{axis:e.axis,n:o.n,tanR:o.tanR,cls:v,weights:u,ext:e.ext,optics:t},jobs:x.map(b=>b.meterJob)}),G(this.stats.meterMs,performance.now()-i)}collectBackground(){this.meterFrame++;const e=performance.now(),t=this.meterRequest,i=this.meterResult;if(this.meterLastCollect!==null&&(this.meterActiveMs+=Math.min(250,e-this.meterLastCollect)),this.meterLastCollect=e,!i&&(!this.meterWorkerReady&&this.meterActiveMs>1e4||t&&this.meterActiveMs-t.start>5e3)){this.failBackgroundMeter("worker did not return a reading");return}if(!t||!i)return;this.meterRequest=this.meterResult=null;const s=this.meterOptics,n=t.opticsKey!==this.meterOpticsKey||!s||t.optics.sky.buffer!==s.sky.buffer||t.optics.key!==s.key;t.maps.forEach(({map:a,gen:o},c)=>{const h=i.rows[c];if(!h||a.gen!==o||n){this.stats.meterTimeouts++;return}a.reading=h,a.meterJob?.level===this.scene?.level&&(this.lastReading=h),a.readKey=t.key,this.stats.meterBack++}),this.stats.meterLatency=this.meterFrame-t.frame;for(const a of i.ms)G(this.stats.meterWorkerMs,a);G(this.stats.collectMs,performance.now()-e)}meterShape(e){const t=this.meterGrid,i=this.debugMeterN;if(t&&t.radius===e&&t.override===i)return t.value;const s=us(e,Math.min(this.opt.pitchDegMax,2*e/128),i??void 0);return this.meterGrid={radius:e,override:i,value:s},s}extinctionKey(e){const t=this.extIds.get(e);if(t!==void 0)return t;const i=this.extNext++;return this.extIds.set(e,i),i}meter(e,t){if(this.stats.failed)return;if(this.useBackgroundMeter()){this.backgroundSample(t);return}if(!this.pM.length||this.lost(e)||!this.programReady())return;this.reads.some(p=>p.passed)&&(this.catchUp&&e.deleteSync(this.catchUp),this.catchUp=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0));const i=this.debugMaps?null:this.maps(),s=[];for(const p of this.layersOf(this.meterPairs()).sort((x,v)=>v.share-x.share))s.push(p.A,p.B);if(i&&(s.push(i.A,i.B),i.wide&&s.push(i.wide.A,i.wide.B)),!s.length)return;const n=this.meterShape(t.radiusDeg),a=t.ext?this.extinctionKey(t.ext):0,o=`${t.axis.map(p=>p.toFixed(4)).join(",")}|${n.n}|${n.tanR.toFixed(6)}|${a}`,c=[];for(const p of s)c.length>=ke||c.includes(p)||p.readKey===o||this.reads.some(x=>x.items.some(v=>v.M===p&&v.gen===p.gen&&v.key===o))||c.push(p);const h=W.map(p=>t.rates[p]??0);this.meterIn={axis:[...t.axis],radiusDeg:t.radiusDeg,n:n.n,tanR:n.tanR,count:n.count,level:t.level,cls:Array.from(t.cls),weights:h};const u=this.w<1||this.retiring!==null||this.debugMaps!==null||this.debugW!==null||c.some(p=>p.reading!==null&&p.readKey==="");if(c.length&&!u&&(this.reads.length>0||performance.now()-this.lastReduceAt<bt)&&(c.length=0),!c.length)return;this.lastReduceAt=performance.now();const f=this.steps,d=performance.now(),m=J(e),l=e.getParameter(e.PIXEL_PACK_BUFFER_BINDING);f.fill(0),f[1]=performance.now()-d;try{const p=ze(t.cls),x=Ue(t.cls);c.forEach((y,_)=>this.reduce(e,y,t,n,_));const v=performance.now(),E=this.res;let b=this.pbos.pop();b||(b=e.createBuffer(),E.buffers.add(b),e.bindBuffer(e.PIXEL_PACK_BUFFER,b),e.bufferData(e.PIXEL_PACK_BUFFER,ut,e.STREAM_READ),E.recordBuffer(b,ut)),e.bindFramebuffer(e.FRAMEBUFFER,this.mF.fbo),e.bindBuffer(e.PIXEL_PACK_BUFFER,b),e.readPixels(0,0,q*c.length,1,e.RGBA,e.FLOAT,0),e.bindBuffer(e.PIXEL_PACK_BUFFER,null);const T=performance.now();f[5]=T-v;const R=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0);if(f[6]=performance.now()-T,!R)throw this.pbos.push(b),new Error("fenceSync returned null");this.reads.push({items:c.map(y=>({M:y,gen:y.gen,key:o,chan:p,red:x})),sync:R,pbo:b,frames:0}),e.activeTexture(e.TEXTURE0),this.stats.meterReads+=c.length,this.stats.meterN=n.n}catch(p){this.lost(e)||(this.stats.failed=`zoneCurtainMeter: ${p instanceof Error?p.message:String(p)}`)}finally{const p=performance.now();ee(e,m),e.bindBuffer(e.PIXEL_PACK_BUFFER,l);const x=performance.now();f[0]=x-d,f[7]=x-p,G(this.stats.meterMs,f[0]),G(this.stats.meterSteps,Array.from(f))}}steps=new Float64Array(8);lastReduceAt=-1/0;lastReading=null;catchUp=null;readingOf(e){return e.reading??(this.debugMaps?null:this.lastReading)}collect(e){if(this.useBackgroundMeter()){this.collectBackground();return}if(!this.reads.length||this.stats.failed||this.lost(e))return;const t=performance.now(),i=e.getParameter(e.PIXEL_PACK_BUFFER_BINDING),s=[0,0,0];try{this.poll(e,s)}catch(n){this.lost(e)||(this.stats.failed=`zoneCurtainMeter: ${n instanceof Error?n.message:String(n)}`)}finally{e.bindBuffer(e.PIXEL_PACK_BUFFER,i),s[0]=performance.now()-t,G(this.stats.collectMs,s[0]),G(this.stats.collectSteps,s)}}poll(e,t){for(const i of[...this.reads]){const s=performance.now(),n=i.passed?e.ALREADY_SIGNALED:e.clientWaitSync(i.sync,0,0);t[1]=t[1]+performance.now()-s;const a=n===e.ALREADY_SIGNALED||n===e.CONDITION_SATISFIED;if(a&&!i.passed){i.passed=!0,i.frames++;continue}if(i.passed&&this.catchUp&&++i.frames<=xt/2){const o=e.clientWaitSync(this.catchUp,0,0);if(o!==e.ALREADY_SIGNALED&&o!==e.CONDITION_SATISFIED&&o!==e.WAIT_FAILED)continue}if(!(!a&&n!==e.WAIT_FAILED&&++i.frames<=xt)){if(this.reads.splice(this.reads.indexOf(i),1),e.deleteSync(i.sync),a){const o=new Float32Array(4*q*i.items.length),c=performance.now();e.bindBuffer(e.PIXEL_PACK_BUFFER,i.pbo),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,o),t[2]=t[2]+performance.now()-c,i.items.forEach((h,u)=>{const f=4*q*u,d=W.length,m=new Float64Array(d),l=new Float64Array(d);h.chan.forEach((p,x)=>{m[p]=o[f+x],l[p]=o[f+4+x]}),h.red>=0&&(m[h.red]=o[f+12],l[h.red]=o[f+16]),h.M.gen===h.gen&&(h.M.reading={sums:m,count:o[f+8],box:l,boxTotal:o[f+9]+(h.red>=0?Math.max(0,o[f+21]):0)},h.M.readKey=h.key,this.lastReading=h.M.reading)}),this.stats.meterBack+=i.items.length,this.stats.meterLatency=i.frames}else this.stats.meterTimeouts+=i.items.length;this.pbos.push(i.pbo)}}}reduce(e,t,i,s,n){const a=ze(i.cls),o=Ue(i.cls);this.reduceSet(e,t,i,s,a,q*n),o>=0&&this.reduceSet(e,t,i,s,[o],q*n+3)}reduceSet(e,t,i,s,n,a){const o=this.res,c=s.n,h=c/Z,u=this.pM[0],f=this.pM[1],d=this.pM[2],m=this.steps,l=performance.now(),p=(A,C,B)=>{if(A&&A.w===C&&A.h===B)return A;if(A){const k=A;this.defer(()=>o.deleteTarget(k))}e.activeTexture(e.TEXTURE15);const w=o.target(C,B,e.RGBA32F,e.RGBA);return e.activeTexture(e.TEXTURE0),w},x=this.mS=p(this.mS,c,c),v=this.mB=p(this.mB,3*h,h),E=this.mF=p(this.mF,q*ke,1),b=Le(i.axis),T=this.meterIn.weights,R=[0,1,2,3].map(A=>n[A]??0),y=[0,1,2,3].map(A=>n[A]!==void 0?t.kR:0),_=[0,1,2,3].map(A=>n[A]!==void 0?T[n[A]]??0:0);e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.bindVertexArray(this.vaoD),e.useProgram(u.prog),i.bind(u),e.uniform3fv(u.loc.get("uMF"),b.F),e.uniform3fv(u.loc.get("uMR"),b.R),e.uniform3fv(u.loc.get("uMU"),b.U),e.uniform1f(u.loc.get("uTanR"),s.tanR),e.uniform1f(u.loc.get("uN"),c),e.uniform3fv(u.loc.get("mF"),t.cam.f),e.uniform3fv(u.loc.get("mR"),t.cam.r),e.uniform3fv(u.loc.get("mU"),t.cam.up),e.uniform2f(u.loc.get("mT"),t.cam.tanH,t.n),e.uniform1f(u.loc.get("mCube"),t.cube?1:0),e.uniform1f(u.loc.get("uAtlasFilter"),t.filtered?1:0),e.uniform1f(u.loc.get("uCubic"),this.debugCubic?1:0),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,t.core.tex),e.uniform1i(u.loc.get("mC"),2),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,t.env.tex),e.uniform1i(u.loc.get("mE"),3),e.uniform1iv(u.loc.get("uComp"),Int32Array.from(R)),e.uniform1iv(u.loc.get("uCls"),Int32Array.from(R.map(A=>i.cls[A]??0))),e.uniform1fv(u.loc.get("uK"),Float32Array.from(y)),e.bindFramebuffer(e.FRAMEBUFFER,x.fbo),e.viewport(0,0,c,c),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(f.prog),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,x.tex),e.uniform1i(f.loc.get("uS"),2),e.uniform1f(f.loc.get("uN"),c),e.uniform4fv(f.loc.get("uW"),Float32Array.from(_)),e.bindFramebuffer(e.FRAMEBUFFER,v.fbo),e.viewport(0,0,3*h,h),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(d.prog),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,v.tex),e.uniform1i(d.loc.get("uB"),2),e.uniform1i(d.loc.get("uNB"),h),e.uniform1i(d.loc.get("uOff"),a),e.bindFramebuffer(e.FRAMEBUFFER,E.fbo),e.viewport(a,0,3,1),e.drawArrays(e.TRIANGLES,0,3),m[4]=m[4]+performance.now()-l}debugMeterSamples(e){return this.mS?this.readTarget(e,this.mS):null}frame(e){if(this.stats.failed||this.debugHold||this.lost(e.gl))return;const t=performance.now(),i=e.gl,s=J(i);this.holdS=Math.max(0,e.holdS??0);try{this.res=e.res,this.flush();const n=this.debugScene??(this.weather?Xi:Lt)(e.level,e.seed),a=this.debugSceneExtra&&!this.debugScene?{...n,...this.debugSceneExtra}:n,o=this.debugScene?JSON.stringify(a):`${a.level}|${a.seed}${this.debugSceneExtra?"|"+JSON.stringify(this.debugSceneExtra):""}`,c=this.ring.length?this.ring[0].t:null,h=this.lastT!==null&&e.tModel<this.lastT-1e-6,u=this.lastT!==null&&(e.tModel>this.lastT+5||h&&(c===null||e.tModel<c-1e-6));this.worker&&(o!==this.key||u)&&this.restart(o!==this.key),this.key=o,this.scene=a,this.worker||this.start(e),this.pX?this.askPrograms(1):this.programs(i,e),this.take(i),this.timePoll(i);const f=this.lastT!==null&&e.tModel===this.lastT;if(this.track(e),this.want(e.tModel),e.dtSeconds>0&&!f&&(this.fdts.push(e.dtSeconds),this.fdts.length>31&&this.fdts.shift()),this.lastT=e.tModel,this.atlasActive){this.tables&&this.ring.length>=4&&this.programReady()&&((!f||!this.wide.B)&&this.wideStep(i,e,!0)&&this.stats.frames++,f&&this.wide.B&&this.stats.stillFrames++),this.trim();return}const d=performance.now(),m=this.debugN===null&&this.omega.rate>=Gs;m?this.standSince=null:this.standSince??=d;const l=this.debugFine&&(this.debugN!==null||this.standSince!==null&&d-this.standSince>=Bi);if(this.stepFine(l,d,f),this.stats.follow.rate=this.omega.rate,!this.tables||this.ring.length<4||!this.programReady()){this.ring.length>dt&&this.trim();return}const p=!f&&this.wideStep(i,e,m||!this.debugFine);if(m&&this.slice>0&&(this.slice=0,this.stats.follow.fineDropped++),!l){this.trim(),p&&this.stats.frames++;return}if(this.slice===0){const T=this.debugN??Math.max(e.lite?Ci:this.opt.N,this.tq?this.autoN.n:this.tq===null?Oi:this.opt.N);this.nCur=T}const x=this.fdt(),v=this.nCur,E=f&&!!this.A&&!!this.B&&this.standingNeedsMap();if(E&&this.slice>0&&this.cur&&Math.abs(this.cur.T-e.tModel)>1e-6&&(this.slice=0),!this.A||!this.B){const T=performance.now();if(this.waitSince??=T,this.ring[this.ring.length-1].t<e.tModel+2*v*x+this.dtCur&&T-this.waitSince<1500)return;this.waitSince=null,this.A=this.fillMap(i,this.newMap(e),e.tModel),this.B=this.fillMap(i,this.newMap(e),e.tModel+v*x),this.Ta=this.A.T,this.Tb=this.B.T,this.slice=0,this.stats.first.maps??=performance.now(),this.rotFrames=0,this.rotN=v}else if(f&&!E){this.stats.stillFrames++;return}if(this.slice===0){if(this.acc=this.recenter(e,this.acc),this.cur=this.job(E?e.tModel:e.tModel+2*v*x,this.acc.cam),this.acc.T=this.cur.T,this.acc.kR=this.cur.X.S[1].msg.kR,this.stats.maps++,this.cur.miss&&this.stats.misses++,E&&this.stats.follow.standingMaps++,this.clearMap(i,this.acc),this.rememberMeterJob(this.acc,this.cur),this.drawRed(i,this.acc,this.cur),this.rotN=v,this.debugN===null&&this.tq){this.autoN=Ti(this.autoN,ot(this.autoCost),x);const T=this.stats.auto;T.n=this.autoN.n,T.changes=this.autoN.changes,T.via="timer",T.mapMs=ot(this.autoCost)}else if(this.debugN===null&&this.tq===null){const T=this.stats.auto;T.n=v,T.via="frames"}}const b=this.timeBegin(i);if(this.drawSlice(i,this.acc,this.cur,this.slice,v),b&&this.timeEnd(i,b,v),++this.slice===v){this.noteShown(e.tModel,this.acc.T,this.Tb,this.cur);const T=this.A;this.A=this.B,this.B=this.acc,this.acc=T,this.Ta=this.Tb,this.Tb=this.B.T,this.slice=0,this.rotFrames=E?v:0}else this.rotFrames++;this.trim(),this.stats.frames++}catch(n){this.lost(i)||(this.stats.failed=n instanceof Error?n.message:String(n))}finally{this.fade(),ee(i,s);const n=performance.now()-t;this.stats.mainMs.push(n),this.stats.mainMs.length>600&&this.stats.mainMs.shift()}}dispose(){this.meterWorker?.terminate(),this.meterWorker=null,this.meterRequest=null,this.meterResult=null,this.worker?.terminate(),this.worker=null,this.tableWorker?.terminate(),this.tableWorker=null,this.progQueue=[];const e=this.res;if(e&&!e.gl.isContextLost()){const t=e.gl;this.flush();for(const n of this.ring)for(const a of g)e.deleteBuffer(n.buf[a]);const i=this.wide,s=new Set([this.A,this.B,this.acc,i.A,i.B,i.acc,this.retiring?.A,this.retiring?.B,this.retiring?.wide?.A,this.retiring?.wide?.B]);for(const n of s)n&&(e.deleteTarget(n.core),e.deleteTarget(n.env));for(const n of this.tables??[])e.deleteTexture(n.tex),e.deleteTexture(n.coef);this.kTex&&e.deleteTexture(this.kTex),this.redTex&&e.deleteTexture(this.redTex);for(const n of this.ptPool)e.deleteTexture(n.tex);this.out&&e.deleteBuffer(this.out.buf),this.quad&&e.deleteBuffer(this.quad);for(const n of[...Array.from(this.expandInputs.values(),a=>a.vao),this.vaoR,this.vaoD])n&&(t.deleteVertexArray(n),e.vaos.delete(n));this.tfo&&t.deleteTransformFeedback(this.tfo),this.pD&&(t.deleteProgram(this.pD.prog),e.programs.delete(this.pD.prog)),this.referenceCompose&&(t.deleteProgram(this.referenceCompose.prog),e.programs.delete(this.referenceCompose.prog));for(const n of[this.pX,this.pR,this.pRed,this.pC,...this.pM]){if(!n)continue;e.programs.delete(n.prog);const a=()=>{if(!t.isContextLost()){if(!n.done()){setTimeout(a,50);return}try{n.check()}catch{}t.deleteProgram(n.prog),e.deferred.delete(n.prog)}};a()}for(const n of[this.mS,this.mB,this.mF])n&&e.deleteTarget(n);for(const n of this.reads)t.deleteSync(n.sync),this.pbos.push(n.pbo);this.catchUp&&(t.deleteSync(this.catchUp),this.catchUp=null);for(const n of this.pbos)e.deleteBuffer(n);for(const n of this.tq?.pend??[])t.deleteQuery(n.q)}this.tq=void 0,this.pM=[],this.mS=this.mB=this.mF=null,this.pbos=[],this.reads=[],this.linked=!1,this.wide=_e(),this.phi=0,this.phiAt=null,this.standSince=null,this.res=null,this.ring=[],this.pending=[],this.tables=null,this.tablesAsked=!1,this.A=this.B=this.acc=null,this.cur=null,this.trash=[],this.retiring=null,this.retShare=0,this.retOut=null,this.outAt=null,this.w=0,this.lastWall=null,this.pX=this.pR=this.pD=this.pC=this.pRed=null,this.redTex=null,this.vaoR=this.vaoD=null,this.quad=null,this.tfo=null,this.out=null,this.kTex=null,this.ptPool=[],this.expandInputs.clear(),this.referenceCompose=null,this.lastSpectrum=null,this.cap={core:0,env:0,glow:0},this.inFlight=!1,this.lastT=null,this.key=""}start(e){const t=this.makeWorker();if(t.onmessage=i=>this.onMessage(i.data),t.onerror=i=>{this.stats.failed=`worker: ${i.message}`},this.worker=t,this.inFlight=!1,this.nextT=e.tModel-this.dtCur,this.post({cmd:"init",scene:this.scene,obs:[0,0],red:this.debugRedSource??"dynamic",light:!this.debugEmitStd,atlas:this.opt.fixedAtlas}),!this.tablesAsked){this.tablesAsked=!0;const i=this.opt.envBands===16?[16]:[16,this.opt.envBands],s=i.join(",");if(Se?.bands===s)this.pendingTables=Se.tables,this.stats.tablesMs=0,this.stats.first.tablesCached=!0;else{const n=this.tableWorker=this.makeWorker();n.onmessage=a=>{const o=a.data;if(o.cmd==="tables"){Se={bands:s,tables:o.tables},this.pendingTables=o.tables,this.stats.tablesMs=o.ms;for(const c of this.waiters.splice(0))c()}else o.cmd==="error"&&(this.stats.failed=`worker: ${o.message}`);n.terminate(),this.tableWorker===n&&(this.tableWorker=null)},n.onerror=a=>{this.stats.failed=`worker: ${a.message}`},n.postMessage({cmd:"tables",bands:i})}}}post(e){this.worker.postMessage(e)}restart(e=!1){this.worker?.terminate(),this.worker=null,this.stats.restarts++,e&&(this.lastReading=null,this.wx=null);const t=this.res,i=this.ring;i.length&&this.postMeter({cmd:"forget",ids:i.map(c=>c.msg.id)}),t&&this.defer(()=>{for(const c of i)for(const h of g)t.deleteBuffer(c.buf[h])}),this.ring=[],this.pending=[],this.cur=null,this.slice=0,this.cap={core:0,env:0,glow:0},this.waitSince=null;const s=this.maps(),n=this.wide,a=s?this.w:0,o=this.retiringShare(this.w);if(s&&a>0&&a>=o){const c=this.retiring;c&&this.defer(()=>this.delPair(c)),this.retiring={...s,wide:s.wide?{...s.wide}:null},this.retShare=a}else{for(const c of new Set([this.A,this.B,n.A,n.B]))c&&this.defer(()=>this.delMap(c));this.retiring&&(this.retShare=o)}if(n.acc){const c=n.acc;this.defer(()=>this.delMap(c))}this.wide=_e(),this.phi=0,this.phiAt=null,this.retOut=this.retiring&&(e||this.retOut!==null)?1:null,this.outAt=null,this.A=this.B=null,this.w=0,!this.tables&&!this.pendingTables&&!this.tableWorker&&(this.tablesAsked=!1)}debugWorkerSlow=1;debugEmitStd=!1;dtCur=we.dt;dtAt=-1/0;get dtNow(){return this.dtCur}batchP90(){const e=this.stats.workerMs.slice(-pt);if(e.length<4)return 0;const t=[...e].sort((i,s)=>i-s);return t[Math.floor(.9*(t.length-1))]/1e3}adaptDt(){if(this.debugEmitStd||this.opt.dt!==K[0]||this.stats.workerMs.length<pt)return;const e=performance.now();if(e-this.dtAt<Ui)return;const t=this.batchP90(),i=K.indexOf(this.dtCur);i<0||(t>Di*this.dtCur&&i<K.length-1?(this.dtCur=K[i+1],this.dtAt=e):i>0&&t<zi*K[i-1]&&(this.dtCur=K[i-1],this.dtAt=e))}slowed=new WeakSet;onMessage(e){if(e.cmd==="state"&&this.debugWorkerSlow>1&&!this.slowed.has(e)){const t=this.debugWorkerSlow,i=this.worker,s={...e,ms:{...e.ms,total:e.ms.total*t}};this.slowed.add(s),setTimeout(()=>{this.worker===i&&this.onMessage(s)},(t-1)*e.ms.total);return}if(e.cmd==="error"){this.stats.failed=`worker: ${e.message}`;return}if(e.cmd==="tables"){this.pendingTables=e.tables,this.stats.tablesMs=e.ms;return}if(e.cmd==="state"){this.inFlight=!1,this.pending.push(e),this.stats.workerMs.push(e.ms.total),this.stats.workerMs.length>120&&this.stats.workerMs.shift(),this.stats.workerMsParts.push(e.ms),this.stats.workerMsParts.length>120&&this.stats.workerMsParts.shift(),this.adaptDt(),this.lastT!==null&&this.want(this.lastT);for(const t of this.waiters.splice(0))t()}}pendingTables=null;waiters=[];want(e){if(this.inFlight||!this.worker)return;const t=this.opt.fixedAtlas?V:ye,s=2*Math.max(this.nCur,this.debugWide?5*t:0)*this.fdt()+2*this.dtCur+.3+(this.debugEmitStd?0:this.batchP90());this.nextT<=e+s&&(this.inFlight=!0,this.post({cmd:"state",id:++this.reqId,t:this.nextT,cull:null}),this.nextT+=this.dtCur)}take(e,t=!1){for(this.pendingTables&&(this.uploadTables(e,this.pendingTables),this.pendingTables=null);this.pending.length;){const i=this.pending.shift(),s=this.res,n={},a={};for(const o of g)this.grow(e,o,i.sets[o].n),a[o]=i.sets[o].n;for(const o of g){const c=e.createBuffer();s.buffers.add(c),e.bindBuffer(e.ARRAY_BUFFER,c),e.bufferData(e.ARRAY_BUFFER,Math.max(1,this.cap[o])*L*4,e.DYNAMIC_DRAW),s.recordBuffer(c,Math.max(1,this.cap[o])*L*4),a[o]&&e.bufferSubData(e.ARRAY_BUFFER,0,i.sets[o].data,0,a[o]*L),this.stats.uploadBytes+=a[o]*L*4,n[o]=c}e.bindBuffer(e.ARRAY_BUFFER,null),this.ring.push({t:i.t,k:i.k,n:a,buf:n,msg:i}),this.stats.states++,this.stats.first.state??=performance.now(),i.wx&&(this.wx=i.wx);for(const o of g)this.stats.slots[o]=Math.max(this.stats.slots[o],a[o]);this.meterWorker&&!t&&!this.debugHold&&this.postMeter({cmd:"state",state:i},this.debugKeepStates?[]:g.map(o=>i.sets[o].data.buffer))}}grow(e,t,i){if(i<=this.cap[t])return;const s=Math.max(4096,Math.ceil(i*1.5/1024)*1024),n=this.res,a=[];for(const o of this.ring){const c=e.createBuffer();n.buffers.add(c),e.bindBuffer(e.COPY_WRITE_BUFFER,c),e.bufferData(e.COPY_WRITE_BUFFER,s*L*4,e.DYNAMIC_DRAW),n.recordBuffer(c,s*L*4),o.n[t]&&(e.bindBuffer(e.COPY_READ_BUFFER,o.buf[t]),e.copyBufferSubData(e.COPY_READ_BUFFER,e.COPY_WRITE_BUFFER,0,0,o.n[t]*L*4)),a.push(o.buf[t]),o.buf[t]=c}a.length&&this.defer(()=>{for(const o of a)n.deleteBuffer(o)}),e.bindBuffer(e.COPY_READ_BUFFER,null),e.bindBuffer(e.COPY_WRITE_BUFFER,null),this.cap[t]=s}trim(){const e=this.res,t=s=>!!(this.cur?.X.S.includes(s)||this.wide.job?.X.S.includes(s)),i=[];for(;this.ring.length>dt&&!t(this.ring[0]);){const s=this.ring.shift();i.push(s.msg.id),this.defer(()=>{for(const n of g)e.deleteBuffer(s.buf[n])})}i.length&&this.postMeter({cmd:"forget",ids:i})}stepFine(e,t,i){const s=this.phiAt===null?0:Math.min(.25,Math.max(0,(t-this.phiAt)/1e3));this.phiAt=t,!(i&&this.A&&this.B)&&(this.wide.A&&this.wide.B?e&&this.A&&this.B&&!this.standingNeedsMap()?this.phi=Math.min(1,this.phi+s/Ni):this.phi=Math.max(0,this.phi-s/gi):this.phi=this.A&&this.B?1:0,this.stats.follow.fine=this.phi)}delPair(e){for(const t of new Set([e.A,e.B,e.wide?.A,e.wide?.B]))t&&this.delMap(t)}fade(){const e=performance.now(),t=this.lastWall===null?0:ci((e-this.lastWall)/1e3);if(this.lastWall=e,this.debugFadeHold)return;const i=this.maps(),s=!!i&&!!i.A.reading&&!!i.B.reading;this.unmetered=i&&!s?this.unmetered+1:0,s&&(this.stats.first.metered??=e),this.w>=1&&(this.stats.first.faded??=e);const n=i!==null&&this.programReady()&&(s||this.w>0||!this.useBackgroundMeter()&&this.unmetered>Ii);this.retiring&&this.retOut!==null&&n&&(this.retOut=Math.max(0,this.retOut-t)),this.retOut===0&&this.outAt===null&&(this.outAt=e);const a=!!this.retiring&&this.retOut!==null&&(this.retOut>0||e-(this.outAt??e)<1e3*this.holdS),o=n&&(!a||this.w>0);if(this.w=o?Math.min(1,this.w+t):0,this.retiring&&this.w>=1){const c=this.retiring;this.retiring=null,this.retShare=0,this.retOut=null,this.outAt=null,this.defer(()=>this.delPair(c))}this.stats.w=this.w}programReady(){if(this.linked)return!0;if(this.progQueue.length||!this.pX||!this.pR||!this.pRed||!this.pC||this.pM.length<3)return!1;const e=[this.pX,this.pR,this.pRed,this.pC,...this.pM];if(!e.every(t=>t.done()))return!1;try{for(const t of e)t.check();return this.linked=!0,this.stats.first.linked??=performance.now(),!0}catch(t){return this.stats.failed=`zoneCurtainCompose: ${t instanceof Error?t.message:String(t)}`,!1}}askPrograms(e){for(let t=0;t<e&&this.progQueue.length;t++)this.progQueue.shift()()}linked=!1;defer(e){this.trash.push(e)}flush(){if(this.trash.length)for(const e of this.trash.splice(0))e()}fdt(){if(!this.fdts.length)return 1/60;const e=[...this.fdts].sort((t,i)=>t-i);return Math.min(.1,Math.max(1/240,e[e.length>>1]))}programs(e,t,i=!1){const s=t.res;if(!e.getExtension("EXT_color_buffer_float"))throw new Error("EXT_color_buffer_float missing");this.accFmt=ge(t.floatBlend||!!e.getExtension("EXT_float_blend"))==="rgba32f"?e.RGBA32F:e.RGBA16F,this.stats.target=this.accFmt===e.RGBA32F?"rgba32f":"rgba16f",this.stats.first.programs??=performance.now(),this.progQueue=[()=>{this.pX=Li(e,s)},()=>{this.pR=s.programDeferred("zoneCurtainRaster",Ks,Qs)},()=>{this.pRed=s.programDeferred("zoneCurtainRed",z,ei)}],i||this.progQueue.push(()=>{this.pC=s.programDeferred("zoneCurtainCompose",z,this.opt.fixedAtlas?Js:Qe)},()=>{this.pM.push(s.programDeferred("zoneCurtainMeter",z,si))},()=>{this.pM.push(s.programDeferred("zoneCurtainMeterBlock",z,ii))},()=>{this.pM.push(s.programDeferred("zoneCurtainMeterFinal",z,ni))}),e.getExtension("KHR_parallel_shader_compile")?this.askPrograms(1/0):this.askPrograms(1),e.activeTexture(e.TEXTURE15),this.redTex=s.texture(ae,1,e.RG32F,e.RG,e.FLOAT,new Float32Array(2*ae)),e.activeTexture(e.TEXTURE0),this.vaoR=e.createVertexArray(),this.vaoD=e.createVertexArray();for(const a of[this.vaoR,this.vaoD])s.vaos.add(a);this.quad=e.createBuffer(),s.buffers.add(this.quad),s.recordBuffer(this.quad,vt.byteLength),e.bindVertexArray(this.vaoR),e.bindBuffer(e.ARRAY_BUFFER,this.quad),e.bufferData(e.ARRAY_BUFFER,vt,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);for(let a=1;a<=ne.length;a++)e.enableVertexAttribArray(a),e.vertexAttribDivisor(a,1);for(const a of g){const o=e.createVertexArray();s.vaos.add(o),e.bindVertexArray(o);for(let c=0;c<12;c++)e.enableVertexAttribArray(c);this.expandInputs.set(a,{vao:o,buffers:[]})}e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null),this.tfo=e.createTransformFeedback();const n=e.createBuffer();s.buffers.add(n),this.out={buf:n,cap:0},e.activeTexture(e.TEXTURE15),this.kTex=s.texture(9,P,e.RG32F,e.RG,e.FLOAT,vs(9)),e.activeTexture(e.TEXTURE0)}localMeterMap=null;localMeterAtlas=null;localMeterSample=null;initMeterRaster(e,t){const i=e.gl;this.res=e,this.programs(i,{res:e,floatBlend:!!i.getExtension("EXT_float_blend")},!0),this.askPrograms(1/0);for(const s of[this.pX,this.pR,this.pRed])s.check();this.uploadTables(i,t),this.localMeterSample=e.program("zoneCurtainMeterMap",z,ri)}meterRasterOf(e,t,i,s){const n=this.res,a=s.n,{F:o,R:c,U:h}=Le(s.axis),u={f:[o[0],o[1],o[2]],r:[c[0],c[1],c[2]],up:[h[0],h[1],h[2]],tanH:s.tanR,size:a};this.ring=this.ring.filter(x=>{if(t.ids.includes(x.msg.id))return!0;for(const v of g)n.deleteBuffer(x.buf[v]);return!1});for(const x of new Set(i))this.ring.some(v=>v.msg.id===x.id)||this.pending.push(x);this.take(e,!0),this.flush();const f=t.ids.map(x=>this.ring.find(v=>v.msg.id===x));this.scene={level:t.level};const d={T:t.t,X:{...t.interp,S:f},events:[],dropped:0,miss:!1,red:t.red,pt:t.pulse};let m=this.localMeterMap;if(!m||m.n!==a){m&&n.deleteTarget(m.core);const x=n.target(a,a,e.RGBA32F,e.RGBA);m=this.localMeterMap={cam:u,n:a,core:x,env:x,T:t.t,kR:t.kR,reading:null,readKey:"",gen:0,red:null,faceIndex:0}}m.cam=u,this.meterAtlasOf(e,t.atlas,m,d),e.bindFramebuffer(e.FRAMEBUFFER,m.core.fbo);const l=new Float32Array(a*a*4);e.readPixels(0,0,a,a,e.RGBA,e.FLOAT,l);const p=e.getError();if(p!==e.NO_ERROR||e.isContextLost())throw new Error(`worker meter raster WebGL error ${p}`);return l}meterAtlasOf(e,t,i,s){const n=this.res,a=i.cam;this.localMeterAtlas&&this.localMeterAtlas.n!==t[0].size&&this.delMap(this.localMeterAtlas);const o=this.localMeterAtlas?.n===t[0].size?this.localMeterAtlas:this.localMeterAtlas=this.newWideMap(t,!0);this.clearMap(e,o),this.cullAtlas(o,s);for(let u=0;u<t.length;u++){const f=Mi(a,t[u]);if(!f.length)continue;const{cube:d,...m}=this.faceOf(o,u);m.meterCrop={core:ct(f,m.cam,m.core,!1),env:ct(f,m.cam,m.env,m.env.w>m.env.h)},this.drawRed(e,m,s);for(let l=0;l<V;l++)this.drawSlice(e,m,s,l,V)}const c=this.localMeterSample,h=u=>c.loc.get(u);e.bindFramebuffer(e.FRAMEBUFFER,i.core.fbo),e.viewport(0,0,i.n,i.n),e.useProgram(c.prog),e.bindVertexArray(this.vaoD),e.uniform3fv(h("uMF"),a.f),e.uniform3fv(h("uMR"),a.r),e.uniform3fv(h("uMU"),a.up),e.uniform2f(h("mT"),o.cam.tanH,o.n),e.uniform1f(h("uN"),i.n),e.uniform1f(h("uTanR"),a.tanH),e.uniform1f(h("uAtlasFilter"),1),e.uniform1f(h("uCubic"),1),n.bindTex(0,o.core.tex,c,"uMap"),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}uploadTables(e,t){const i=this.res;e.activeTexture(e.TEXTURE15),this.tables=t.map(s=>{const n=i.texture(s.meta.tiledW,s.meta.tiledH,e.RGBA16F,e.RGBA,e.HALF_FLOAT,s.half);e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR);const a=i.texture(s.coefW,s.coefH,e.RGBA32F,e.RGBA,e.FLOAT,s.coef);return{meta:s.meta,tex:n,coef:a}}),e.activeTexture(e.TEXTURE0),this.stats.tableLayers=t.map(s=>s.meta.layers),this.stats.first.tables??=performance.now()}ptOf(e,t,i,s){if(!e.length)return null;const n=this.scene.level;let a=this.refCpu.get(n);return a||(a=Ps(le[n]),this.refCpu.set(n,a)),zs(e,t,a,i,s)}wavesOf(e,t,i,s){const n=le[this.scene.level],[a,o]=s?[-760,760]:this.footRange(i);return{x0:a,x1:o,ev:e.msg.wx?Gi(e.msg.wx.pulses,t,a,o,mt):Us(n,this.scene,t,a,o,mt)}}ptTexOf(e,t){let i=this.ptPool.find(a=>a.job===t);if(i)return i.tex;const s=this.res;e.activeTexture(e.TEXTURE15),this.ptPool.length<3?(i={tex:s.texture(Nt,3,e.RGBA32F,e.RGBA,e.FLOAT,null),job:null},this.ptPool.push(i)):(i=this.ptPool.shift(),this.ptPool.push(i));const n=t.pt;return e.bindTexture(e.TEXTURE_2D,i.tex),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texSubImage2D(e.TEXTURE_2D,0,0,0,n.n,3,e.RGBA,e.FLOAT,n.data),e.activeTexture(e.TEXTURE0),i.job=t,i.tex}mapCameraOf(e,t=this.opt.margin,i=1){const[s,n,a]=e.dir,o=Math.atan2(s,n)*180/Math.PI,c=Math.asin(Math.max(-1,Math.min(1,a)))*180/Math.PI,h=Math.min(150,Math.max(.5,e.fovDeg)),u=Math.min(e.pitchDeg??this.opt.pitchDegMax,h/128)*i;let f=st(o,c,h,Math.round(h/u),t);return f.size>this.opt.maxMapSize&&(f=st(o,c,h,Math.round(h/u*this.opt.maxMapSize/f.size),t)),f}track(e){const t=performance.now(),i=[e.dir[0],e.dir[1],e.dir[2]],s=this.hist;for(this.view={dir:i,fovDeg:e.fovDeg},s.push({t,d:i});s.length>2&&t-s[0].t>150;)s.shift();this.omega=s.length>=2&&t-s[0].t<=400?Hs(s):{axis:[0,0,1],rate:0}}standingNeedsMap(){const e=this.view;if(!e||!this.A||!this.B)return!1;const t=Ke(e.dir,e.fovDeg*Math.PI/360,this.A.cam,this.B.cam,null,this.alphaNow(),this.nCur,9);return t.sA+t.sB<t.n-.001}wideStep(e,t,i){const s=this.wide;if(!this.debugWide||this.debugMaps)return!1;const n=this.opt.fixedAtlas,a=n?V:ye,o=a*5,c=this.debugWideMoving??(n?1:i?ki:1);for(let h=0;h<c;h++){s.job||(s.acc??=n?this.newAtlas():this.newWideMap(es(ft)),s.job=this.job(t.tModel+2*(o/c)*this.fdt(),s.acc.cam,!0),n&&this.cullAtlas(s.acc,s.job),s.acc.T=s.job.T,s.acc.kR=s.job.X.S[1].msg.kR,s.slice=0,s.startedAt=performance.now(),s.job.miss&&this.stats.follow.wideMisses++,this.clearMap(e,s.acc),this.rememberMeterJob(s.acc,s.job),this.drawRed(e,s.acc,s.job));const u=this.faceOf(s.acc,s.slice%5),f=this.expandSlice(e,s.job.X,Math.floor(s.slice/5),a,u,s.job);if(this.rasterSlice(e,u,f,s.job),++s.slice===o){n&&(this.noteShown(t.tModel,s.acc.T,s.B?.T??-1/0,s.job),this.stats.first.maps??=performance.now());const d=s.A;s.A=s.B,s.B=s.acc,s.acc=d,s.job=null,s.rot=0;const m=this.stats.follow;m.wideMaps++,m.wideFrames=o/c,m.wideMs=performance.now()-s.startedAt,m.wideSize=s.B.n}else s.rot++}return!0}cullAtlas(e,t){const i=t.X.S;if(!this.debugAtlasCull||i.some(a=>!a.msg.bounds))return;const s={},n=this.atlasSlots;n.faces.fill(0),n.all=0;for(const a of g){const o=i.map(u=>u.msg.sets[a]),c=Math.max(...o.map(u=>u.n)),h=mi(o,i.map(u=>u.msg.bounds[a]),t.X.w,e.cube,this.opt.cut,2/(a==="core"?e.n/2:e.env.h));for(let u=0;u<h.length;u++)for(const[,f]of h[u])n.faces[u]=n.faces[u]+f;n.all+=c*h.length,s[a]=h}n.kept=n.faces.reduce((a,o)=>a+o,0),t.spans=s}newWideMap(e,t=!1){const i=this.res,s=i.gl,n=e[0].size;s.activeTexture(s.TEXTURE15);const a=n/(t?lt:2),o=i.target(5*n,n+(t?a:0),t?s.RGBA16F:this.accFmt,s.RGBA),c=t?{...o,w:7*a,h:a,y0:n}:i.target(5*a,a,this.accFmt,s.RGBA),h={cam:e[0],n,core:o,env:c,T:0,kR:0,reading:null,readKey:"",gen:0,red:null,cube:e,filtered:t};return t&&(s.bindTexture(s.TEXTURE_2D,o.tex),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.LINEAR)),s.activeTexture(s.TEXTURE0),h}faceOf(e,t){const i=e.n,s=e.env.h,n={...e.core,...e.filtered?ts(t,i):{w:i,h:i,x0:t*i}},a={...e.env,...e.filtered?ss(t,i,s):{w:s,h:s,x0:t*s}};return{...e,faceIndex:t,cam:e.cube[t],core:n,env:a}}newMap(e,t=this.mapCameraOf(e)){const i=this.res,s=i.gl;s.activeTexture(s.TEXTURE15);const n={cam:t,n:t.size,core:i.target(t.size,t.size,this.accFmt,s.RGBA),env:i.target(t.size/2,t.size/2,this.accFmt,s.RGBA),T:0,kR:0,reading:null,readKey:"",gen:0,red:null};return s.activeTexture(s.TEXTURE0),n}delMap(e){this.releaseMeterJob(e),e.gen++;const t=this.res;t&&(t.deleteTarget(e.core),e.env.fbo!==e.core.fbo&&t.deleteTarget(e.env))}recenter(e,t){const i=this.mapCameraOf(e);if(t&&t.n===i.size)return t.cam=i,t;if(t){const s=t;this.defer(()=>this.delMap(s))}return this.newMap(e,i)}clearMap(e,t){this.releaseMeterJob(t),t.reading=null,t.readKey="",t.gen++,e.disable(e.SCISSOR_TEST);for(const i of t.core.fbo===t.env.fbo?[t.core]:[t.core,t.env])e.bindFramebuffer(e.FRAMEBUFFER,i.fbo),e.viewport(0,0,i.w,i.h),e.clearBufferfv(e.COLOR,0,[0,0,0,0])}rememberMeterJob(e,t){if(!this.useBackgroundMeter()||this.debugHold||!e.filtered||!e.cube)return;const{S:i,w:s,u2:n,wc:a}=t.X,o=i.map(c=>c.msg.id);e.meterJob={t:t.T,level:this.scene.level,ids:o,interp:{w:s,u2:n,wc:a},kR:i[1].msg.kR,red:t.red,pulse:t.pt,atlas:e.cube},this.postMeter({cmd:"pin",ids:o})}releaseMeterJob(e){e.meterJob&&(this.postMeter({cmd:"unpin",ids:e.meterJob.ids}),e.meterJob=null)}job(e,t,i=!1){const s=this.ring;let n=-1;for(let x=0;x<s.length-1;x++)s[x].t<=e+1e-9&&(n=x);let a=!1;n<0&&(n=0),e>s[s.length-1].t+1e-9&&(a=!0,e=s[s.length-1].t,n=s.length-2);const o=!s[n+2],c=s[Math.max(0,n-1)],h=s[n],u=s[n+1],f=s[n+2]??(this.stats.miss3++,u),d=Math.min(1,Math.max(0,(e-h.t)/(u.t-h.t))),{x0:m,x1:l,ev:p}=this.wavesOf(h,e,t,i);return this.stats.eventsDropped+=p.dropped,{T:e,X:{S:[c,h,u,f],...tt(this.opt.mode,d)},events:p.events,dropped:p.dropped,miss:a,red:ht(h,u,d),miss3:o,pt:this.ptOf(p.events,e,m,l)}}footRange(e){let t=1/0,i=-1/0;for(const s of[-1,0,1])for(const n of[-1,0,1]){const a=[0,1,2].map(h=>e.f[h]+s*e.tanH*e.r[h]+n*e.tanH*e.up[h]),o=Math.hypot(a[0],a[1],a[2]),c=a[2]/o;if(!(c>.02)){t=Math.min(t,-700),i=Math.max(i,700);continue}for(const h of[84,300]){const u=bs(h,c)*a[0]/o;t=Math.min(t,u),i=Math.max(i,u)}}return[Math.max(-760,t-60),Math.min(760,i+60)]}fillMap(e,t,i){const s=this.job(i,t.cam,!!t.cube),n=t.filtered?V:this.nCur;t.filtered&&this.cullAtlas(t,s),t.T=s.T,t.kR=s.X.S[1].msg.kR,t.pt=s.pt,this.clearMap(e,t),this.rememberMeterJob(t,s),this.drawRed(e,t,s);for(let a=0;a<n;a++)this.drawSlice(e,t,s,a,n);return t}drawRed(e,t,i){t.red=i.red;const s=this.pRed;if(!s||!this.redTex||!i.red||this.debugRedOff)return;const n=ae,a=new Float32Array(2*n);for(let c=0;c<n;c++)a[2*c]=i.red.A[c],a[2*c+1]=i.red.Y[c];e.activeTexture(e.TEXTURE15),e.bindTexture(e.TEXTURE_2D,this.redTex),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texSubImage2D(e.TEXTURE_2D,0,0,0,n,1,e.RG,e.FLOAT,a),e.useProgram(s.prog),e.bindVertexArray(this.vaoD),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD),e.colorMask(!1,!1,!0,!1);const o=c=>s.loc.get(c);e.uniform2f(o("uObs"),0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.redTex),e.uniform1i(o("uLine"),0),e.bindFramebuffer(e.FRAMEBUFFER,t.env.fbo);for(const c of t.cube?t.cube.map((h,u)=>this.faceOf(t,u)):[t]){const h=c.cam,u=c.env,f=u.x0??0,d=u.y0??0;e.viewport(f,d,u.w,u.h),c.meterCrop&&(e.enable(e.SCISSOR_TEST),e.scissor(...c.meterCrop.env)),e.uniform3fv(o("uF"),h.f),e.uniform3fv(o("uR"),h.r),e.uniform3fv(o("uU"),h.up),e.uniform1f(o("uTanH"),h.tanH),e.uniform2f(o("uRasterSize"),u.w,u.h),e.uniform1f(o("uSwapXY"),u.w>u.h?1:0),e.uniform1f(o("uOff"),f),e.uniform1f(o("uYOff"),d),e.drawArrays(e.TRIANGLES,0,3)}e.colorMask(!0,!0,!0,!0),e.disable(e.BLEND),e.bindVertexArray(null),t.meterCrop&&e.disable(e.SCISSOR_TEST),this.stats.redPasses++}drawSlice(e,t,i,s,n){let a=[];for(const o of t.cube?t.cube.map((c,h)=>this.faceOf(t,h)):[t])a=this.expandSlice(e,i.X,s,n,o,i),this.rasterSlice(e,o,a,i);return a}groups(){return Wi(this.tables.length>1?1:0)}sliceSegs(e,t){let i=0;for(const s of this.groups()){const n=this.tables[s.tab].meta,a=Math.ceil(n.B/t);i+=a*Math.max(...e.S.map(o=>o.n[s.set]))}return i}expandSlice(e,t,i,s,n,a=null){const o=this.pX,c=this.out,h=this.groups(),u=n.cam,f=h.map(E=>n.faceIndex!==void 0&&a?.spans?a.spans[E.set][n.faceIndex]:[[0,Math.max(...t.S.map(b=>b.n[E.set]))]]),d=f.map(E=>E.reduce((b,[,T])=>b+T,0)),m=h.reduce((E,b,T)=>E+Math.ceil(this.tables[b.tab].meta.B/s)*d[T],0);if(!m)return this.stats.segsLastSlice=0,[];m*I*4>c.cap&&(c.cap=Math.ceil(m*I*4*1.25),e.bindBuffer(e.ARRAY_BUFFER,c.buf),e.bufferData(e.ARRAY_BUFFER,c.cap,e.DYNAMIC_COPY),this.res.recordBuffer(c.buf,c.cap),e.bindBuffer(e.ARRAY_BUFFER,null)),e.useProgram(o.prog),e.enable(e.RASTERIZER_DISCARD);const l=E=>o.loc.get(E);e.uniform3fv(l("uF"),u.f),e.uniform3fv(l("uR"),u.r),e.uniform3fv(l("uU"),u.up),e.uniform1f(l("uTanH"),u.tanH),e.uniform4fv(l("uCW"),Float32Array.from(t.w)),e.uniform1f(l("uU2"),t.u2),e.uniform1f(l("uWC"),t.wc),e.uniform1f(l("uSlice"),i),e.uniform1f(l("uNS"),s),e.uniform1f(l("uCutB"),this.opt.cut),e.uniform1f(l("uObsX"),0),e.uniform1f(l("uTightBounds"),n.filtered?1:0);const p=a?.pt??null;if(p){const E=this.ptTexOf(e,a);e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,E)}e.uniform1i(l("uPT"),3),e.uniform4f(l("uPTD"),p?.x0??0,p?.dx??1,p?.n??1,p?1:0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,this.kTex),e.uniform1i(l("uK"),1),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,this.tfo),m&&(e.bindBufferRange(e.TRANSFORM_FEEDBACK_BUFFER,0,c.buf,0,m*I*4),e.beginTransformFeedback(e.POINTS));const x=[];let v=0;for(const[E,b]of h.entries()){const T=this.tables[b.tab],R=T.meta,y=Math.ceil(R.B/s),_=d[E];if(!_){x.push({tgt:b.tgt,tab:b.tab,pulse:b.pulse,first:v,count:0});continue}const{w:A,h:C}=n[b.tgt],B=b.tgt==="env"&&A>C;e.uniform1f(l("uPx"),2/Math.min(A,C)),n.filtered&&this.debugAtlasPixelPadding?e.uniform2f(l("uAtlasPixel"),2/(B?C:A),2/(B?A:C)):e.uniform2f(l("uAtlasPixel"),0,0),e.uniform1f(l("uB"),R.B),e.uniform1f(l("uBW"),R.bandW),e.uniform1f(l("uNG"),R.ngroup),e.uniform1f(l("uGR"),R.groupRows),e.uniform1f(l("uNL"),R.nl),e.uniform1f(l("uPulse"),b.pulse),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,T.coef),e.uniform1i(l("uCoef"),2);const w=this.expandInputs.get(b.set);e.bindVertexArray(w.vao),t.S.forEach((k,N)=>{const U=k.buf[b.set];if(w.buffers[N]!==U){e.bindBuffer(e.ARRAY_BUFFER,U);for(let X=0;X<3;X++)e.vertexAttribPointer(3*N+X,4,e.FLOAT,!1,L*4,16*X);w.buffers[N]=U}}),e.bindBuffer(e.ARRAY_BUFFER,null);for(let k=0;k<y;k++){e.vertexAttrib1f(12,k);for(const[N,U]of f[E])e.drawArrays(e.POINTS,N,U)}x.push({tgt:b.tgt,tab:b.tab,pulse:b.pulse,first:v,count:y*_}),v+=y*_}return m&&e.endTransformFeedback(),e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER,0,null),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,null),e.disable(e.RASTERIZER_DISCARD),e.bindVertexArray(null),e.activeTexture(e.TEXTURE0),this.stats.segsLastSlice=v,x}rasterSlice(e,t,i,s){if(!i.length)return;const n=this.pR,a=t.cam,o=u=>n.loc.get(u);e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.useProgram(n.prog),e.bindVertexArray(this.vaoR),e.uniform3fv(o("uF"),a.f),e.uniform3fv(o("uR"),a.r),e.uniform3fv(o("uU"),a.up),e.uniform1f(o("uTanH"),a.tanH),e.uniform1f(o("uCut2"),this.opt.cut**2),e.uniform1f(o("uPInv"),1/(le[this.scene.level].pulse5?.sig??14)),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD);let c=null,h=-1;e.bindBuffer(e.ARRAY_BUFFER,this.out.buf);for(const u of i){if(!u.count)continue;const f=u.tgt==="env"?t.env:t.core;if(f!==c){f.fbo!==c?.fbo&&e.bindFramebuffer(e.FRAMEBUFFER,f.fbo),c=f;const d=f,m=d.x0??0,l=d.y0??0;e.viewport(m,l,f.w,f.h),e.uniform2f(o("uRasterSize"),f.w,f.h),e.uniform1f(o("uOff"),m),e.uniform1f(o("uYOff"),l),t.meterCrop&&(e.enable(e.SCISSOR_TEST),e.scissor(...t.meterCrop[u.tgt])),e.uniform1f(o("uSwapXY"),u.tgt==="env"&&f.w>f.h?1:0)}if(u.tab!==h){h=u.tab;const d=this.tables[u.tab],m=d.meta;e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,d.tex),e.uniform1i(o("uTab"),0),e.uniform1f(o("uBW"),m.bandW),e.uniform1f(o("uN"),m.n),e.uniform4f(o("uTabD"),m.width,m.height,m.tilesX,m.tiledW),e.uniform1f(o("uTexH"),m.tiledH)}for(let d=0;d<ne.length;d++)e.vertexAttribPointer(1+d,4,e.FLOAT,!1,I*4,(u.first*I+4*d)*4);e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,u.count)}e.bindBuffer(e.ARRAY_BUFFER,null),e.disable(e.BLEND),e.bindVertexArray(null),e.activeTexture(e.TEXTURE0),t.meterCrop&&e.disable(e.SCISSOR_TEST)}bindMaps(e,t,i,s,n=!1){const a=i.wide??null,o=i.fine??1;if(a?.A.filtered&&a.B.filtered&&o===0){const c=a.alpha===1?a.B:a.A,h=c===a.B?0:a.alpha;if(e.activeTexture(e.TEXTURE0+s),e.bindTexture(e.TEXTURE_2D,c.core.tex),e.activeTexture(e.TEXTURE1+s),e.bindTexture(e.TEXTURE_2D,a.B.core.tex),e.uniform1i(t.loc.get("cC"),s),e.uniform1i(t.loc.get("dC"),s+1),!n){for(const u of["aC","aE","bC","bE","cE"])e.uniform1i(t.loc.get(u),s);e.uniform1i(t.loc.get("dE"),s+1),e.uniform1f(t.loc.get("uFine"),0),e.uniform1f(t.loc.get("uHasW"),1)}e.uniform2f(t.loc.get("cT"),a.A.cam.tanH,a.A.n),e.uniform1f(t.loc.get("uAlphaW"),h),e.uniform1f(t.loc.get("uKC"),i.A.kR>0?a.A.kR/i.A.kR:1),e.uniform1f(t.loc.get("uCubic"),this.debugCubic?1:0),e.uniform1f(t.loc.get("uAtlasFilter"),1);return}[["a",i.A,s],["b",i.B,s+2],["c",a?.A??i.A,s+4],["d",a?.B??i.B,s+6]].forEach(([c,h,u])=>{(c==="a"||c==="b")&&(e.uniform3fv(t.loc.get(c+"F"),h.cam.f),e.uniform3fv(t.loc.get(c+"R"),h.cam.r),e.uniform3fv(t.loc.get(c+"U"),h.cam.up),e.uniform2f(t.loc.get(c+"T"),h.cam.tanH,h.n)),e.activeTexture(e.TEXTURE0+u),e.bindTexture(e.TEXTURE_2D,h.core.tex),e.uniform1i(t.loc.get(c+"C"),u),e.activeTexture(e.TEXTURE1+u),e.bindTexture(e.TEXTURE_2D,h.env.tex),e.uniform1i(t.loc.get(c+"E"),u+1)}),e.uniform2f(t.loc.get("cT"),a?a.A.cam.tanH:1,a?a.A.n:2),e.uniform1f(t.loc.get("uAlpha"),i.alpha),e.uniform1f(t.loc.get("uReveal"),Ot(i.alpha,this.nCur)),e.uniform1f(t.loc.get("uFine"),a?o:1),e.uniform1f(t.loc.get("uHasW"),a?1:0),e.uniform1f(t.loc.get("uAlphaW"),a?.alpha??0),e.uniform1f(t.loc.get("uKC"),a&&i.A.kR>0?a.A.kR/i.A.kR:1),e.uniform1f(t.loc.get("uCubic"),this.debugCubic?1:0),e.uniform1f(t.loc.get("uAtlasFilter"),a?.A.filtered?1:0)}debugCubic=!0;display(e,t,i,s,n,a,o=null,c=1){const h=this.res;this.pD??=h.program("zoneCurtainDisplay",z,js);const u=this.pD;e.useProgram(u.prog),e.bindVertexArray(this.vaoD),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,t.fbo),e.viewport(0,0,t.w,t.h),e.uniform3fv(u.loc.get("uF"),i.f),e.uniform3fv(u.loc.get("uR"),i.r),e.uniform3fv(u.loc.get("uU"),i.up),e.uniform1f(u.loc.get("uTanH"),i.tanH),e.uniform1f(u.loc.get("uSize"),t.w);const f=o&&"A"in o&&"alpha"in o?o:null;this.bindMaps(e,u,{A:s,B:n,alpha:a,wide:f,fine:c},0),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),e.activeTexture(e.TEXTURE0)}debugShown(e,t,i){const s=this.maps();s&&((s.fine??1)===0&&s.wide?this.display(e,t,i,s.wide.A,s.wide.B,s.wide.alpha,s.wide,0):this.display(e,t,i,s.A,s.B,s.alpha,s.wide??null,s.fine??1))}debugShownOf(e,t,i,s){s.cube?this.display(e,t,i,s,s,0,{A:s,B:s,alpha:0},0):this.display(e,t,i,s,s,0,null,1)}debugReferenceKinds=["fine","wide"];debugReference(e,t,i){if(this.lastT===null||this.ring.length<4)return null;const s=J(e),n={dir:[i.dir[0],i.dir[1],i.dir[2]],fovDeg:i.fovDeg};try{const a=Math.min(this.opt.pitchDegMax,Math.min(150,Math.max(.5,i.fovDeg))/128),o=this.newMap(n,t==="wide"?this.mapCameraOf(n,this.opt.margin,ft/a):this.mapCameraOf(n));return this.fillMap(e,o,this.lastT)}finally{ee(e,s)}}debugReferenceDone(e){this.delMap(e)}debugState(){return{ring:this.ring.map(e=>({t:e.t,k:e.k,sets:e.msg.sets})),tables:this.tables?.map(e=>e.meta)??null,scene:this.scene,A:this.A,B:this.B,Ta:this.Ta,Tb:this.Tb,trash:this.trash.length,w:this.w,retiring:this.retiring!==null,retShare:this.retShare}}debugJob(e,t,i,s){const n=e.map(h=>this.ring[h]),{x0:a,x1:o,ev:c}=this.wavesOf(n[1],i,s,!1);return{T:i,X:{S:n,...tt(this.opt.mode,t)},events:c.events,dropped:c.dropped,miss:!1,red:ht(n[1],n[2],t),pt:this.ptOf(c.events,i,a,o)}}async debugRun(e,t,i,s,n){this.res=t,this.worker&&this.restart(),this.flush(),this.scene=i,this.key=JSON.stringify(i),this.lastT=null,this.start({tModel:s[0]+this.opt.dt}),this.pX||this.programs(e,{res:t,floatBlend:n}),this.askPrograms(1/0),this.inFlight=!0;for(const c of s)this.post({cmd:"state",id:++this.reqId,t:c,cull:null});const a=performance.now();for(;this.pending.length<s.length||!(this.tables||this.pendingTables)||!this.programReady();){if(this.stats.failed)throw new Error(this.stats.failed);if(performance.now()-a>12e4)throw new Error("zoneCurtain debugRun: no states after 120 s");await new Promise(c=>{this.waiters.push(c),setTimeout(c,100)})}const o=J(e);try{this.take(e,!0)}finally{ee(e,o)}}readOut(e,t,i){const s=new Float32Array(i*I);return e.bindBuffer(e.ARRAY_BUFFER,this.out.buf),e.getBufferSubData(e.ARRAY_BUFFER,t*I*4,s),e.bindBuffer(e.ARRAY_BUFFER,null),s}readTarget(e,t){const i=new Float32Array(t.w*t.h*4);return e.bindFramebuffer(e.FRAMEBUFFER,t.fbo),e.readPixels(t.x0??0,t.y0??0,t.w,t.h,e.RGBA,e.FLOAT,i),i}}const Zi=Fe();function Wt(r,e=r.view.centerMm){const t=r.horizonFrame,i=r.view.point,s=r.view.skyFrame,n=r.geometry.focalMm;if(!t||!s)return null;const a=[e[0]/n,e[1]/n,1],o=[0,1,2].map(f=>i[f]*a[0]+i[3+f]*a[1]+i[6+f]*a[2]);if(!(o[2]>1e-6))return null;const c=[0,1,2].map(f=>s.axis[f]+o[0]/o[2]*s.west[f]+o[1]/o[2]*s.north[f]),h=Math.hypot(c[0],c[1],c[2]),u=f=>(c[0]*f[0]+c[1]*f[1]+c[2]*f[2])/h;return[u(t.east),u(t.north),u(t.zenith)]}const Be={testSeed:null,on:is(typeof location<"u"?location.search:null)},Ne=new WeakMap,$i=wt.prototype.active;wt.prototype.active=function(r){this.zoneCurtain&&(this.zoneCurtain.meterOptics=this.setup?.zoneMeterOptics??null,this.zoneCurtain.meterWake=this.setup?.zoneMeterWake);const e=$i.call(this,r),t=this;return Ne.delete(this),e&&t.prog===null&&t.state&&this.setup?.scene==="auroral-zone"&&(this.zoneCurtain?this.zoneCurtain.atlasActive:Be.on)&&(Yi(this,r,t.state),Ne.set(this,r)),e};function Yi(r,e,t){if(Ne.get(r)===e)return r.zoneCurtain;const i=Wt(e);if(!i)return r.zoneCurtain;let s=r.zoneCurtain;if(!s){s=r.zoneCurtain=new qi({fixedAtlas:Be.on},void 0,rs({pinned:Be.testSeed??Me.zoneSeed,automated:typeof navigator<"u"&&navigator.webdriver===!0,reducedMotion:Yt(),random:as}),ns(typeof location<"u"?location.search:null,typeof navigator<"u"&&navigator.webdriver===!0)),s.caps=Hi(e.gl,e.res,e.floatBlend),s.caps.reason&&(s.stats.failed=`capability: ${s.caps.reason}`),s.caps.reason&&console.warn("[zoneCurtain] this device cannot run the new curtain; the old aurora stays:",s.caps.reason);const d=new URLSearchParams(typeof location>"u"?"":location.search);s.debugKeepStates=d.get("zoneKeepStates")==="1",!s.stats.failed&&s.opt.fixedAtlas&&d.get("zoneMeterRef")!=="1"&&s.enableBackgroundMeter(()=>new Worker(new URL(""+new URL("zone-meter.worker-B0nItbDs.js",import.meta.url).href,import.meta.url),{type:"module"}))}s.meterOptics=r.setup?.zoneMeterOptics??null,s.meterWake=r.setup?.zoneMeterWake;const n=e.geometry,a=2*Math.atan(n.cathodeRadiusMm/n.focalMm)*180/Math.PI,o=Vt(n.pitchMm,n.focalMm)*Math.atan(n.pitchMm/n.focalMm)*180/Math.PI,c=Vi(e.gl,s),h=s.stats.frames,u=Rt.getState().view.integrationMs,f=u>0?u/1e3:Kt;return s.frame({gl:e.gl,res:e.res,tModel:t.timeS-(r.setup?.startS??0),dir:i,fovDeg:a,level:t.level??0,seed:s.seed,floatBlend:e.floatBlend,dtSeconds:e.dtSeconds,lite:t.detail==="lite",pitchDeg:o,holdS:f}),c&&Ki(e.gl,c,s.stats.frames>h),s}const Xt={on:!1,sliceMs:[],otherMs:[],disjoint:0,queries:[]};function Vi(r,e){const t=Xt;if(!t.on&&!t.queries.length||e.caps?.timerQuery===!1)return null;const i=r.getExtension("EXT_disjoint_timer_query_webgl2");if(!i)return null;for(;t.queries.length;){const{q:n,slice:a}=t.queries[0];if(!r.getQueryParameter(n,r.QUERY_RESULT_AVAILABLE))break;t.queries.shift(),r.getParameter(i.GPU_DISJOINT_EXT)?t.disjoint++:(a?t.sliceMs:t.otherMs).push(Number(r.getQueryParameter(n,r.QUERY_RESULT))/1e6),r.deleteQuery(n)}if(!t.on||t.queries.length>=8)return null;const s=r.createQuery();return s&&r.beginQuery(i.TIME_ELAPSED_EXT,s),s}function Ki(r,e,t){const i=r.getExtension("EXT_disjoint_timer_query_webgl2");r.endQuery(i.TIME_ELAPSED_EXT),Xt.queries.push({q:e,slice:t})}function nr(r,e,t,i,s,n){const a=Me.zoneCurtainDebug>0?Me.zoneCurtainDebug:1;r.compose(e.gl,i.u_auRate,i.u_auClass,t.level??0,a,o=>{e.viewUniforms(o),e.bindHorizon(o,0),e.bindLut(o,1),e.res.bindTex(10,s,o,"u_auExt"),e.res.bindTex(11,n,o,"u_cloud"),At(e.gl,o,{u_auExtOn:i.u_auExtOn,u_auRatioCap:i.u_auRatioCap,...$t(t.cloud)})},()=>e.draw(),t.extinction)}function ar(r,e,t,i){const s=Wt(e,[0,0]);if(!s)return;const n=e.geometry;r.meter(e.gl,{axis:s,radiusDeg:Math.atan(n.cathodeRadiusMm/n.focalMm)*180/Math.PI,level:t.level??0,cls:Zi,rates:t.rates,ext:t.extinction,snapshot:Rt.getState().view.paused,bind:a=>{e.bindHorizon(a,0),e.bindLut(a,1),e.res.bindTex(4,i,a,"u_auExt"),At(e.gl,a,{u_auExtOn:t.extinction?1:0})}})}export{Wt as viewAxisEnu,Be as zoneAtlas,nr as zoneCompose,Yi as zoneFrame,Xt as zoneGpuTimer,ar as zoneMeter};
