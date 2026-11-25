import{d0 as Y,d1 as Es,d2 as I,d3 as Ht,d4 as qt,d5 as As,d6 as Ts,d7 as pe,d8 as ws,d9 as W,da as Zt,db as Rs,cN as ys,dc as Ms,b as $t,bC as _s,dd as Yt}from"./boot-BX-lBCH5.js";import{F as $e}from"./app-BS7pUnal.js";import{A as Ss,c as Fs,d as Cs,w as ks,a as Bs,b as gs,z as Ns,e as Ps,f as Os,r as Ds}from"./wide-Bng6fG5m.js";import{N as g,c as X,H as K,b as L,d as oe,e as we,h as Kt,u as Vt,r as O,p as fe,s as re,f as G,G as Us,g as jt,l as rt,C as Re,R as ye}from"./constants-DQwyJCQD.js";import{Z as ge}from"./levels-DpYprAWu.js";import"./vendor-DHsdD_W9.js";import"./hosting-DzxV42li.js";import"./error-log-BRCSZ18_.js";const ie=8,de=256;function Ye(){return Y.map(i=>Es(i))}function at(i){const e=[];for(let t=0;t<i.length;t++)(i[t]===0||i[t]===1)&&e.push(t);if(e.length>4)throw new RangeError("zoneMeterChannels: more than four main-curtain components");return e}function nt(i){for(let e=0;e<i.length;e++)if(i[e]===2)return e;return-1}function zs(i,e,t){const r=Math.PI/180,s=Math.tan(Math.min(80,Math.max(.01,i))*r),a=ie,n=t??Math.min(de,Math.max(4*a,Math.ceil(2*s/Math.tan(Math.max(.001,e)*r)/a)*a));if(n%a||n>de)throw new RangeError(`zoneMeterGrid: side ${n} not a multiple of ${a} up to ${de}`);let o=0;for(let c=0;c<n;c++)for(let h=0;h<n;h++)Ls(h,c,n)&&o++;return{n,tanR:s,count:o}}const Ls=(i,e,t)=>{const r=2*i+1-t,s=2*e+1-t;return r*r+s*s<=t*t};function ot(i){const e=Math.hypot(i[0],i[1],i[2]),t=[i[0]/e,i[1]/e,i[2]/e];let r=t[1],s=-t[0];const a=Math.hypot(r,s);return a<1e-6?(r=1,s=0):(r/=a,s/=a),{F:t,R:[r,s,0],U:[s*t[2],-r*t[2],r*t[1]-s*t[0]]}}function ct(i){if(!i.length)return null;const e=Y.length,t=new Float64Array(e),r=new Float64Array(e);let s=0;for(const a of i){const n=a.A??a.B,o=a.B??a.A;if(!n||!o){s++;continue}const c=Math.min(1,Math.max(0,a.alpha)),h=Math.max(0,a.share);for(let u=0;u<e;u++){const l=n.count?n.sums[u]/n.count:0,m=o.count?o.sums[u]/o.count:0;t[u]=t[u]+h*((1-c)*l+c*m),r[u]=r[u]+h*((1-c)*n.box[u]+c*o.box[u])}}return{means:t,box:r,pending:s}}const Is=(i,e)=>Y.map(t=>e[t]>0?i[t]*e[t]:0);function ut(i,e,t,r,s){Is(i,e);let a=0,n=0;r&&Y.forEach((c,h)=>{(t[h]===0||t[h]===1||t[h]===2)&&(a+=i[c]*r.means[h],n+=i[c]*r.box[h])});const o=Ws();return{mean:a+o.mean,peak:n+o.peak}}function Ws(i,e,t){return{mean:0,peak:0}}const Ee=20,Ke=.25,Qt=6,H=61,Xs=5,Gs=12,Me=256,_e=193,Hs=5,qs=16,Zs=(i,e)=>{const t=L*e,r=i*(2*L+i);return r/(t+Math.sqrt(t*t+r))};function $s(i){const e=i+1+2*(Ee+1),t=new Float64Array(e*H*(i+1)),r=[.1834346424956498,.525532409916329,.7966664774136267,.9602898564975363],s=[.362683783378362,.3137066458778873,.2223810344533745,.1012285362903763],a=new Float64Array(i+1);for(let n=0;n<H;n++){const o=2**(n/Qt)-1;for(let c=0;c<e;c++){let h=0,u;c<=i?u=c/i:c<=i+1+Ee?(h=-1,u=(c-i-1)*Ke):(h=1,u=(c-i-2-Ee)*Ke);const l=x=>h===0?Math.exp(-.5*(o*(x-u))**2):(()=>{const b=h<0?x:1-x;return Math.exp(-u*o*b-.5*o*o*b*b)})(),m=h===0?Math.max(0,o>0?u-9/o:0):h<0?0:Math.max(0,o>0?1-9/o:0),p=h===0?Math.min(1,o>0?u+9/o:1):h<0?Math.min(1,o>0?9/o:1):1;a.fill(0);let d=0;for(let x=m;x<p-1e-14;){const b=(Math.floor(x*i+1e-9)+1)/i,E=Math.min(p,b,x+(o>0?1/o:1)),v=.5*(E-x),A=.5*(x+E);for(let R=0;R<4;R++)for(const y of[-1,1]){const M=A+y*v*r[R],w=s[R]*v*l(M),k=M*i,C=Math.min(i-1,Math.max(0,Math.floor(k))),T=k-C;a[C]=a[C]+w*(1-T),a[C+1]=a[C+1]+w*T,d+=w}x=E}const f=(n*e+c)*(i+1);for(let x=0;x<=i;x++)t[f+x]=d>0?a[x]/d:x===Math.round(u*i)?1:0}}return{width:e,alpha:t}}function Ys(i,e,t){const r=i[0].length,s=i.map(c=>Float64Array.from(c)),a=[],n=i.map(()=>[]);let o=0;for(;;){o=0;let c=-1,h=0;for(let p=0;p<s.length;p++)for(let d=0;d<r;d++){const f=Math.abs(s[p][d]);f>o&&(o=f,c=p,h=d)}if(o<=e||a.length>=t||c<0)break;const u=Float64Array.from(s[c]);let l=0;for(const p of u)l=Math.max(l,Math.abs(p));for(let p=0;p<r;p++)u[p]=u[p]/l;const m=u[h];for(let p=0;p<s.length;p++){const d=s[p],f=d[h]/m;if(n[p].push(f),f!==0)for(let x=0;x<r;x++)d[x]=d[x]-f*u[x]}a.push(u)}return{basis:a,coef:n.map(c=>Float64Array.from(c)),resid:o}}function Ks(i){const e=js(i);return{meta:{B:i.B,n:i.n,bandW:i.bandW,width:i.width,height:i.height,layers:i.layers,nl:i.nl,groupRows:i.groupRows,ngroup:i.ngroup,tol:i.tol,tiledW:i.tiled.w,tiledH:i.tiled.h,tilesX:i.tiled.tilesX,residMax:i.stats.residMax,rankMax:i.stats.rankMax,ms:i.stats.ms},half:Js(i.tiled.data),coef:e.data,coefW:e.w,coefH:e.h}}function ht(i,e=16,t=.002,r=Gs,s=Xs){const a=typeof performance<"u"?performance.now():0,n=Math.ceil((g-1)/s),o=Math.round((oe-K)/we/e),c=o*we,h=i.h,u=i.data,{width:l,alpha:m}=$s(o),p=(T,_,S,B)=>u[4*((T*h+_)*X+S)+B],d=new Float64Array(g*h*4);for(let T=0;T<g;T++)for(let _=0;_<h;_++)for(let S=0;S<4;S++){let B=0;for(let F=0;F<X;F++)B=Math.max(B,Math.abs(p(T,_,F,S)));d[(T*h+_)*4+S]=B}const f=[],x=[];let b=0,E=0,v=0;const A=[...Array(h).keys()];for(let T=0;T<e;T++){const _=T*o,S=[];for(let B=0;B<n;B++){const F=B*s,U=Math.min(g-1,F+s),be=U-F+1,ke=[],tt=[];for(const[q,j]of[[0,[0]],[1,[0]],[2,A],[3,A]])for(let D=F;D<=U;D++)for(const Q of j){const ue=d[(D*h+Q)*4+q],J=new Float64Array(o+1);if(ue>0)for(let ee=0;ee<=o;ee++)J[ee]=p(D,Q,_+ee,q)/ue;ke.push(J),tt.push({pk:ue})}const ce=Ys(ke,t,r),V=ce.basis.length;E=Math.max(E,V),v=Math.max(v,ce.resid);const st=new Float64Array(ke.length*Math.max(1,V));tt.forEach((q,j)=>{for(let D=0;D<V;D++)st[j*V+D]=q.pk*ce.coef[j][D]});const Be=Math.ceil(V/4),bs=b;b+=Be;for(let q=0;q<Be;q++){const j=new Float32Array(l*H*4);for(let D=0;D<H;D++)for(let Q=0;Q<l;Q++){const ue=(D*l+Q)*(o+1);for(let J=0;J<4;J++){const ee=4*q+J;if(ee>=V)break;let it=0;const vs=ce.basis[ee];for(let ve=0;ve<=o;ve++)it+=m[ue+ve]*vs[ve];j[(D*l+Q)*4+J]=it}}x.push(j)}S.push({r:V,chunks:Be,layer0:bs,coef:st,c0:F,nc:be,nl:h,resid:ce.resid})}f.push({i0:_,ha:K+T*c,groups:S})}const R=Math.min(Math.floor(4096/l),b),y=Math.ceil(b/R),M=R*l,w=y*H,k=new Float32Array(M*w*4);for(let T=0;T<b;T++){const _=T%R*l,S=Math.floor(T/R)*H,B=x[T];for(let F=0;F<H;F++)k.set(B.subarray(F*l*4,(F+1)*l*4),((S+F)*M+_)*4)}const C=typeof performance<"u"?performance.now()-a:0;return{B:e,n:o,bandW:c,width:l,height:H,layers:b,tiled:{data:k,w:M,h:w,tilesX:R},bands:f,nl:h,groupRows:s,ngroup:n,tol:t,stats:{rankMax:E,residMax:v,ms:C}}}function Vs(i,e){if(e===16)return ht(i,16);let t=null;for(const r of[5,3,2,1])if(t=ht(i,e,.002,12,r),t.stats.residMax<=.0021)break;return t}function js(i){const e=i.ngroup,t=o=>2*o.nc+2*o.nc*o.nl;let r=0;for(const o of i.bands)for(const c of o.groups)r=Math.max(r,t(c));const s=1+3*r,a=i.B*e,n=new Float32Array(s*a*4);return i.bands.forEach((o,c)=>o.groups.forEach((h,u)=>{const l=c*e+u,m=l*s*4,p=h.r;n.set([h.layer0,h.chunks,h.nc,p],m);for(let d=0;d<t(h);d++)for(let f=0;f<p;f++)n[m+4*(1+3*d+(f>>2))+(f&3)]=h.coef[d*p+f]})),{data:n,w:s,h:a}}const Qs=i=>new Float32Array(i*g*2).fill(1);function Js(i){const e=new Uint16Array(i.length),t=new Float32Array(1),r=new Uint32Array(t.buffer);for(let s=0;s<i.length;s++){t[0]=i[s];const a=r[0],n=a>>>16&32768,o=a>>>23&255,c=a&8388607;if(o===255){e[s]=n|31744|(c?512:0);continue}const h=o-127+15;if(h>=31){e[s]=n|31744;continue}if(h<=0){if(h<-10){e[s]=n;continue}const m=c|8388608,p=14-h,d=m>>>p,f=m&(1<<p)-1,x=1<<p-1;e[s]=n|d+(f>x||f===x&&d&1?1:0);continue}let u=h<<10|c>>>13;const l=c&8191;(l>4096||l===4096&&u&1)&&u++,e[s]=n|u}return e}const Se=[{cell:2.4,epoch:5,prob:.6,w:[.18,.45],lnS:.9,life:[5,14],drift:.15,seed:61},{cell:6.8,epoch:8,prob:.55,w:[.35,.9],lnS:.6,life:[8,22],drift:.12,seed:62}];let Jt=1,es=1;const ts=Se.map(i=>({cell:NaN,time:NaN,seed:NaN,count:0,events:new Float64Array(20*(Math.ceil(i.life[1]/i.epoch)+2))}));function ei(i,e,t,r){const s=Se[i],a=ts[i],n=Math.floor(t/s.epoch);let o=0;for(let c=n-Math.ceil(s.life[1]/s.epoch)-1;c<=n;c++)for(let h=e-2;h<=e+2;h++){const u=Kt(h,c,9e3+s.seed+131*r);if(Vt(u)>=s.prob)continue;const l=(c+O(u,1))*s.epoch,m=fe(s.life,O(u,2)),p=(t-l)/m;if(!(p>0&&p<1))continue;a.events[o++]=(h+O(u,3))*s.cell+s.drift*(2*O(u,4)-1)*(t-l),a.events[o++]=fe(s.w,O(u,5));const d=Math.sqrt(-2*Math.log(Math.max(1e-9,O(u,6))))*Math.cos(2*Math.PI*O(u,7));a.events[o++]=Math.exp(s.lnS*d-.5*s.lnS*s.lnS)*re(p/.25)*(1-re((p-.7)/.3)),a.events[o++]=O(u,8)}a.cell=e,a.time=t,a.seed=r,a.count=o}function ti(i,e,t=0,r={f:0,lam:0,fb:0}){let s=0,a=0,n=0;for(let o=0;o<Se.length;o++){const c=Se[o],h=Math.floor(i/c.cell),u=ts[o];(u.cell!==h||u.time!==e||u.seed!==t)&&ei(o,h,e,t);for(let l=0;l<u.count;l+=4){const m=(i-u.events[l])/u.events[l+1];if(m*m>16)continue;const p=u.events[l+2]*Math.exp(-.5*m*m),d=u.events[l+3];s+=p,a+=p*d*d*d,c.cell>5&&(n+=p)}}return r.f=s*Jt,r.fb=n*es,r.lam=s>1e-9?a/s:.3,r}{let i=0,e=0,t=0;const r={f:0,lam:0,fb:0};for(let s=0;s<6e3;s++)ti(s*.731+13,50+s*.37,0,r),i+=r.f,e+=r.fb,t++;Jt=t/i,es=t/e}const lt=[116,109,102,96],ft=[30,26,22,18],si=3.5;function ii(i){const e=jt(i,0,1)*3,t=Math.min(2,Math.floor(e)),r=e-t;return{peak:rt(lt[t],lt[t+1],r),up:rt(ft[t],ft[t+1],r),lo:si}}const ri=i=>1/(1+Math.exp(-(i-101)/2.5)),ai=i=>1-re((i-(oe-30))/30),dt=2.2,mt=4.5,pt=1.6,xt=Math.sqrt(Math.PI/2);function ni(i,e,t){const r=i-e.peak,s=r>=0?Math.exp(-r/e.up):Math.exp(-.5*(r/dt)**2),a=r>=0?Math.exp(-.5*(r/mt)**2):Math.exp(-.5*(r/pt)**2);return(1-t)*s+t*(dt*xt+e.up)/((pt+mt)*xt)*a}const bt=20,oi=120,ci=i=>jt(.3+.6*i,.3,.85),ui=.8;function hi(i,e,t){const r=i-(e.peak+1+12*t*t);return r<=0?0:(1-Math.exp(-r/(6+8*t)))*Math.exp(-r/(bt+(oi-bt)*t))}let Ne=null;function ss(){if(Ne)return Ne;const i=X,e=[new Float32Array(g*i),new Float32Array(g*i)],t=[new Float32Array(g*G*i),new Float32Array(g*G*i)];for(let r=0;r<g;r++){const s=r/(g-1),a=ii(s),n=ci(s);a.up*=ui;for(let o=0;o<i;o++){const c=K+o*we,h=ai(c),u=ri(c),l=ni(c,a,n)*h;e[0][r*i+o]=l,e[1][r*i+o]=l*u;for(let m=0;m<G;m++){const p=hi(c,a,m/(G-1))*h,d=(r*G+m)*i+o;t[0][d]=p,t[1][d]=p*u}}}return Ne={n:i,low:e,ray:t,nlam:G}}function li(){const i=ss(),e=G,t=new Float32Array(X*e*g*4);for(let r=0;r<g;r++)for(let s=0;s<e;s++)for(let a=0;a<X;a++){const n=4*((r*e+s)*X+a),o=r*X+a,c=(r*G+s)*X+a;t[n]=i.low[0][o],t[n+1]=i.low[1][o],t[n+2]=i.ray[0][c],t[n+3]=i.ray[1][c]}return{data:t,w:X,h:e,d:g}}const fi=1,vt=.7;function di(i,e,t,r,s){const a=i.pulse5,n=[];if(a==null)return n;const o=Math.ceil((360/a.vz[0]+3)/a.P)+1;for(let c=Math.floor(e/a.P)-o;c<=Math.floor(e/a.P)+1;c++)for(let h=Math.floor((r-500)/a.cell);h<=Math.floor((s+500)/a.cell);h++){const u=Kt(h,c,7331+101*t);Vt(u)>=a.prob||n.push({t0:(c+.8*O(u,1))*a.P,vz:fe(a.vz,O(u,2)),amp:a.amp*(.6+.4*O(u,3)),xc:(h+O(u,4))*a.cell,w:fe(a.w,O(u,5)),lag:(O(u,6)<.5?-1:1)*fe(a.lag,O(u,7))/100})}return n}function mi(i,e,t){const r=(e-i.xc)/i.w,s=Math.exp(-.5*r*r);if(s<.02)return null;const a=t-(i.t0+(e-i.xc)*i.lag);if(!(a>0))return null;const n=70+i.vz*a;return n>420?null:[i.amp*s*re(a/.3)*Math.exp(-Math.max(0,n-110)/180)*(vt+(1-vt)*re((n-100)/25)),n]}const is=70,rs=.25,Fe=1401;function pi(i){const e=ss(),t=e.n,r=new Float32Array(Fe),s=i.pulse5;if(!s)return r;const a=Math.round(i.hard0*(g-1)),n=e.low[0],o=e.ray[0],c=(a*G+3)*t;let h=0;for(let u=0;u<t;u++)h+=n[a*t+u]+.15*o[c+u];for(let u=0;u<Fe;u++){const l=is+u*rs;let m=0;for(let p=0;p<t;p++){const d=K+p*we;m+=(n[a*t+p]+.15*o[c+p])*Us((d-l)/s.sig)}r[u]=m/h}return r}function xi(i,e){const t=Math.min(Fe-1,Math.max(0,(e-is)/rs)),r=Math.min(Fe-2,Math.floor(t)),s=t-r;return i[r]*(1-s)+i[r+1]*s}const Pe=4,bi=2,as=800;function vi(i,e,t,r,s,a=fi){const n=bi,o=Math.max(1,Math.min(as,Math.ceil((s-r)/n))),c=new Float32Array(o*12),h=new Float64Array(o),u=new Uint8Array(o);for(const l of i){const m=Math.max(0,Math.floor((l.xc-2.8*l.w-r)/n)),p=Math.min(o-1,Math.ceil((l.xc+2.8*l.w-r)/n));for(let d=m;d<=p;d++){const f=mi(l,r+(d+.5)*n,e);if(!f)continue;h[d]=h[d]+f[0]*xi(t,f[1]),u[d]=Math.min(255,u[d]+1);let x=Math.min(Pe,u[d])-1;const b=E=>(E>>1)*4*o+4*d+2*(E&1);if(!(x===Pe-1&&u[d]>Pe&&!(f[0]>c[b(x)+1]))){for(;x>0&&f[0]>c[b(x-1)+1];){const E=b(x),v=b(x-1);c[E]=c[v],c[E+1]=c[v+1],x--}c[b(x)]=f[1],c[b(x)+1]=f[0]}}}for(let l=0;l<o;l++)c[8*o+4*l]=1/(1+a*h[l]),c[8*o+4*l+1]=u[l];return{x0:r,dx:n,n:o,data:c}}function Ei(i,e,t,r,s,a=16){if(!i.pulse5||e.noPulse||e.ticks)return{events:[],dropped:0};const n=di(i,t,e.seed??0,r,s).filter(o=>{const c=Math.max(r,o.xc-2.8*o.w),h=Math.min(s,o.xc+2.8*o.w);return h>=c?[c,h,Math.min(h,Math.max(c,o.xc))].some(u=>{const l=t-(o.t0+(u-o.xc)*o.lag);return l>0&&70+o.vz*l<=420}):!1});return n.sort((o,c)=>c.amp-o.amp),{events:n.slice(0,a),dropped:Math.max(0,n.length-a)}}const P={DX:8,HALF:720,SIG_N:16,HP:62,H0:150,H1:620,NSEG:24,TAU_RAD:110,Q200:.098,QH:42},Ae=Math.round(2*P.HALF/P.DX)+1,Ai=i=>1/(1/P.TAU_RAD+P.Q200*Math.exp(-(i-200)/P.QH)),Ti=i=>i<=P.H0?0:re((i-P.H0)/20)*Math.exp(-(i-P.H0)/P.HP)*(Ai(i)/P.TAU_RAD)*(1-re((i-(P.H1-60))/60));let Oe=null;function wi(){if(Oe)return Oe;const i=P,e=4700,t=(i.H1-i.H0)/e,r=new Float64Array(e+1);for(let n=0;n<e;n++)r[n+1]=r[n]+Ti(i.H0+(n+.5)*t)*t;const s=[];let a=0;for(let n=0;n<i.NSEG;n++){const o=r[e]*(n+.5)/i.NSEG;for(;r[a+1]<o;)a++;s.push(i.H0+(a+(o-r[a])/(r[a+1]-r[a]))*t)}return Oe={mid:s,norm:r[e]}}const ns=.06,Ri=8,yi=2,Te=(i,e)=>i[0]*e[0]+i[1]*e[1]+i[2]*e[2],os=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],De=i=>{const e=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/e,i[1]/e,i[2]/e]};function Mi(i){const e={axis:[0,0,1],rate:0};if(i.length<2)return e;const t=i[0],r=i[i.length-1],s=(r.t-t.t)/1e3;if(!(s>.001))return e;const a=os(t.d,r.d),n=Math.hypot(a[0],a[1],a[2]),o=Math.atan2(n,Te(t.d,r.d))*180/Math.PI;return n>1e-9?{axis:[a[0]/n,a[1]/n,a[2]/n],rate:o/s}:e}function Ue(i,e){const t=Te(e,i.f);if(!(t>.001))return 0;const r=Math.max(Math.abs(Te(e,i.r)/(t*i.tanH)),Math.abs(Te(e,i.up)/(t*i.tanH)));if(r>1)return 0;const s=Math.min(1,Math.max(0,(1-r)/ns));return Math.max(1e-6,s*s*(3-2*s))}const cs=(i,e)=>Math.min(1,Math.max(0,i*Math.max(1,e)/Math.min(Ri,Math.max(1,e))));function _i(i,e,t,r,s){if(i>=1&&e>=1)return{a:1-r,b:r,c:0};const a=i*(1-r),n=e*(s+(r-s)*i);return{a,b:n,c:Math.max(0,1-a-n)*t}}function Et(i,e,t,r,s,a,n,o=25,c=1){const h=De(i),u=Math.hypot(h[0],h[1])>1e-6?De([h[1],-h[0],0]):[1,0,0],l=os(u,h),m=Math.tan(e),p=cs(a,n),d={n:0,nA:0,nB:0,nC:0,sA:0,sB:0,sC:0,none:0,fallbackOnly:0,shown:0};for(let x=0;x<o;x++)for(let b=0;b<o;b++){const E=(2*b+1-o)/o,v=(2*x+1-o)/o;if(E*E+v*v>1)continue;const A=De([h[0]+m*(E*u[0]+v*l[0]),h[1]+m*(E*u[1]+v*l[1]),h[2]+m*(E*u[2]+v*l[2])]),R=t?Ue(t,A):0,y=r?Ue(r,A):0,M=s==="cube"?1:s?Ue(s,A):0,w=_i(R,y,0,a,p),k=w.a*c,C=w.b*c,T={a:k,b:C,c:Math.max(0,1-k-C)*M};d.n++,R>0&&d.nA++,y>0&&d.nB++,M>0&&d.nC++,d.sA+=T.a,d.sB+=T.b,d.sC+=T.c,R<=0&&y<=0&&M<=0?d.none++:R<=0&&y<=0&&d.fallbackOnly++,d.shown+=T.a+T.b+T.c}const f=Math.max(1,d.n);return d.none/=f,d.fallbackOnly/=f,d.shown/=f,d}const N=i=>{const e=String(i);return/[.eE]/.test(e)?e:e+".0"},Ve=[];for(const i of[-1,1])for(const e of[-1,1])for(const t of[-1,1])Ve.push(`c ${i<0?"-":"+"} A ${e<0?"-":"+"} E ${t<0?"-":"+"} N`);const ze=["rPL0","rPL1","rPF00","rPF01","rPF10","rPF11"],Le=["rGL0","rGL1","rGF00","rGF01","rGF10","rGF11"],Si=["wl0","wl1","wf00","wf01","wf10","wf11"],ae=(i,e)=>i.map((t,r)=>`${Si[r]} * cf(${t}, ${e}.0, yy)`).join(" + "),Fi=I+`out vec4 o; void main() { o = vec4(0.0); }
`,Ci=I+`
uniform sampler2D uT;
out vec4 o;
void main() { o = vec4(textureLod(uT, vec2(0.5, 0.5), 0.0).r, 0.25, 0.0, 0.0); }
`,ki=I+`
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
const float RE = ${N(L)}, REFH = ${N(ye)}, COTD = ${Re}, HLO = ${N(K)}, NCH = ${N(g)}, TWO_PI = 6.283185307179586;
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
  vP0 = ${ae(ze,0)};
  vG0 = ${ae(Le,0)};
  if (info.y > 1.5) {
    vP1 = ${ae(ze,1)};
    vG1 = ${ae(Le,1)};
  }
  if (info.y > 2.5) {
    vP2 = ${ae(ze,2)};
    vG2 = ${ae(Le,2)};
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
${Ve.map((i,e)=>`  vec3 p${e} = pj(${i});`).join(`
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
${Ve.map((i,e)=>`  vec4 o${e} = outs(${i});`).join(`
`)}
  vec4 om = min(min(min(o0, o1), min(o2, o3)), min(min(o4, o5), min(o6, o7)));
  if (max(max(om.x, om.y), max(om.z, om.w)) > 0.0) mode = 2.0;
  vQa = vec4(lo, hi); vQb = vec4(dr, info.y, mode);
}
`,xe=["vRx","vRy","vAn","vP0","vP1","vP2","vG0","vG1","vG2","vQa","vQb","vW0","vW1"],$=xe.length*4,At=I+`
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
`,us=i=>I+`
uniform vec3 uF, uR, uU;
uniform vec2 uRasterSize;
uniform float uTanH, uOff, uYOff, uBW, uN, uCut2, uSwapXY;
uniform sampler2D uTab;${i?`
uniform sampler2D uWindowMass;`:""}
uniform vec4 uTabD;
uniform float uTexH;
uniform float uPInv;
flat in vec4 vRx, vRy, vAn, vP0, vP1, vP2, vG0, vG1, vG2, vW0, vW1;
flat in float vCh;
out vec4 oCol;
const float RE = ${N(L)}, SQ_PI_2 = 1.2533141373155003, NZF = ${Ee.toFixed(1)}, ZST = ${Ke}, POCT = ${Qt.toFixed(1)}, SMAX = ${(H-1).toFixed(1)};
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
  ${i?`float k = sqrt(k2), lk = log2(1.0 + k), g = exp(-0.5 * d2), x;
  bool inside = !(k2 > 1e-20) || (mr > 0.0 && mr < 1.0);
  float sx;
  if (inside) {
    x = m * uN;
    sx = min(m, 1.0-m) * max(2.0,k);
  } else {
    sx = abs(dot(C,V)) / k;
    x = (mr <= 0.0 ? uN + 1.0 : uN + 2.0 + NZF) + min(NZF, sx / ZST);
  }
  vec2 uv = (vec2(0.5) + vec2(${(Me-1).toFixed(1)}, ${(_e-1).toFixed(1)})
    * min(vec2(1.0), vec2(sx/${Hs.toFixed(1)},lk/${qs.toFixed(1)})))
    / vec2(${Me.toFixed(1)}, ${_e.toFixed(1)});
  vec2 masses = textureLod(uWindowMass, uv, 0.0).rg;
  float Z = (inside ? masses.x : masses.y) / max(1.0,k);
  gGZ = g * Z; gTC = vec2(x, min(SMAX, POCT * lk)); gM = m; gK = k;`:`float k = sqrt(k2), g = exp(-0.5 * d2), x, Z;
  if (!(k2 > 1e-20) || (mr > 0.0 && mr < 1.0)) { x = m * uN; Z = massI(k, m); }
  else { float z = abs(dot(C, V)) / k; x = (mr <= 0.0 ? uN + 1.0 : uN + 2.0 + NZF) + min(NZF, z / ZST); Z = massS(k, z); }
  gGZ = g * Z; gTC = vec2(x, min(SMAX, POCT * log2(1.0 + k))); gM = m; gK = k;`}
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
`,Tt=us(!1),Bi=us(!0),Ce=`
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
  float r = clamp((1.0 - m) * ${N(1/ns)}, 0.0, 1.0);
  return max(1e-6, r * r * (3.0 - 2.0 * r));
}
// Task BH (zone-curtain-gl.md §AJ): the wide map — the observer's cube in east / north / up, five gnomonic faces side by
// side in one target (sim/zone-curtain/wide.ts: 0 north, 1 east, 2 south, 3 west, 4 zenith; face k's tile from column k·n),
// T = (tan of a face's half side with its edge texels, n). The face is the direction's largest axis (below the horizon a
// side face, read clamped: nothing is drawn there). gS as samp's; it covers every direction (1).
vec3 cubeCoords(vec3 d, vec2 T) {
  if (uAtlasFilter > 0.5) {
    const float c = ${N(Ss)}, s = ${N(Fs)};
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
`,hs=Ce+`uniform vec3 aF, aR, aU, bF, bR, bU;
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
`,gi=I+`
uniform vec3 uF, uR, uU;
uniform float uTanH, uSize;
out vec4 o;
`+hs+`
void main() {
  float px = (2.0 * gl_FragCoord.x / uSize - 1.0) * uTanH, py = (2.0 * gl_FragCoord.y / uSize - 1.0) * uTanH;
  o = mapsAt(normalize(uF + px * uR + py * uU));
}
`,ls=(i,e)=>Ht("STAR_SKY")+qt+As+Ts+`
uniform float uRate[5];
uniform int uClass[5];
uniform sampler2D u_auExt;
uniform int u_auExtOn;
uniform float u_auRatioCap;
out vec4 o;
`+i+`
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
`,wt=ls(hs,`float x = hzX(up), v = 0.0;
  for (int c = 0; c < 5; c++) {
    int k = uClass[c];
    v += uRate[c] * (k == 0 ? m.x : k == 1 ? m.y : m.z) * auExt(c, x);
  }`),Ni=ls(Ce+`
uniform vec2 cT;
uniform sampler2D cC, dC;
uniform float uAlphaW, uKC;
uniform vec3 uLight[${pe}];
vec4 mapsAt(vec3 d) {
  return vec4(uKC * atlasPair(cubeCoords(d, cT), cT, cC, cC, dC, dC, uAlphaW), 1.0);
}
`,`float x = hzX(up);
  int i = int(floor(x));
  float v = dot(m.xyz, mix(uLight[i], uLight[min(i + 1, ${pe-1})], x - float(i)));`),Pi=I+`
uniform vec3 uF, uR, uU;
uniform vec2 uRasterSize;
uniform float uTanH, uOff, uYOff, uSwapXY;
uniform sampler2D uLine;
uniform vec2 uObs;
out vec4 oCol;
const float RE = ${N(L)}, REFH = ${N(ye)}, COTD = ${Re}, X0 = ${N(-720)}, DXL = ${N(P.DX)}, FMAX = ${N(Ae-1.001)}, SIGN = ${N(P.SIG_N)};
const float NORM = ${N(1/(Math.sqrt(2*Math.PI)*P.SIG_N*P.NSEG))};
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
${wi().mid.map(i=>`  I += redAt(${N(i)});`).join(`
`)}
  oCol = vec4(0.0, 0.0, I * NORM, 0.0);
}
`,Oi=`
uniform sampler2D u_auExt;
uniform int u_auExtOn;
float auExt(int c, float x) {
  if (u_auExtOn == 0) return 1.0;
  int i0 = int(floor(x)), i1 = min(i0 + 1, u_hzNodes - 1);
  return mix(texelFetch(u_auExt, ivec2(i0, c), 0).r, texelFetch(u_auExt, ivec2(i1, c), 0).r, x - float(i0));
}
`,Di=Ht("STAR_SKY")+qt+`
uniform vec3 uMF, uMR, uMU;
uniform float uTanR, uN;
uniform vec3 mF, mR, mU;
uniform vec2 mT;
uniform float mCube;
uniform sampler2D mC, mE;
uniform int uComp[4], uCls[4];
uniform float uK[4];
out vec4 o;
`+Oi+Ce+`
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
`,Ui=I+`
uniform sampler2D uS;
uniform float uN;
uniform vec4 uW;
out vec4 o;
vec4 at(ivec2 q, int n) { return q.x < 0 || q.y < 0 || q.x >= n || q.y >= n ? vec4(0.0) : texelFetch(uS, q, 0); }
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  int blk = p.x / 3, kind = p.x - 3 * blk, n = int(uN);
  ivec2 b0 = ivec2(blk, p.y) * ${ie};
  vec4 s = vec4(0.0), bb = vec4(0.0);
  float best = -1.0, cnt = 0.0;
  for (int j = 0; j < ${ie}; j++) for (int i = 0; i < ${ie}; i++) {
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
`,zi=I+Ce+`
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
`,Li=I+`
uniform sampler2D uB;
uniform int uNB, uOff;
out vec4 o;
void main() {
  int kind = int(gl_FragCoord.x) - uOff;
  vec4 s = vec4(0.0), bb = vec4(0.0);
  float best = -1.0, cnt = 0.0;
  for (int j = 0; j < ${de/ie}; j++) {
    if (j >= uNB) break;
    for (int i = 0; i < ${de/ie}; i++) {
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
`,Ie={maxTextureSize:4096,maxVertexAttribs:1+xe.length,maxTfInterleaved:$,maxVertexTextureUnits:3,maxTextureUnits:16,maxFragmentUniformVectors:64,maxVertexUniformVectors:64},Rt={filter:.02,blend:.001},et=i=>i?"rgba32f":"rgba16f",Ii={maxTextureSize:"MAX_TEXTURE_SIZE",maxVertexAttribs:"MAX_VERTEX_ATTRIBS",maxTfInterleaved:"MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS",maxVertexTextureUnits:"MAX_VERTEX_TEXTURE_IMAGE_UNITS",maxTextureUnits:"MAX_TEXTURE_IMAGE_UNITS",maxFragmentUniformVectors:"MAX_FRAGMENT_UNIFORM_VECTORS",maxVertexUniformVectors:"MAX_VERTEX_UNIFORM_VECTORS"};function yt(i){if(!i.colorBufferFloat)return"EXT_color_buffer_float missing (float colour targets)";if(!i.fence)return"fenceSync missing (the meter's read-back)";for(const e of Object.keys(Ie))if(!(i[e]>=Ie[e]))return`${Ii[e]} ${i[e]} < ${Ie[e]}`;return i.probeError?`probe: ${i.probeError}`:i.filterProbe===null||!(Math.abs(i.filterProbe-.5)<=Rt.filter)?`RGBA16F linear filtering: probe ${i.filterProbe} (0.5 expected)`:i.blendProbe===null||!(Math.abs(i.blendProbe-.5)<=Rt.blend)?`additive blending into ${et(i.floatBlend).toUpperCase()}: probe ${i.blendProbe} (0.5 expected)`:null}const Mt=.5,Wi=8,Xi=i=>Math.min(Math.max(0,i),Mt/Wi)/Mt;function Gi(i){const e=ws("auroral-zone",i);return Y.map(t=>e[t])}function Hi(i,e,t,r){i.fill(0);for(let s=0;s<e.length;s++){const a=t[s],n=e[s];for(let o=0;o<pe;o++){const c=3*o+a;i[c]=i[c]+n*(r?r[s*pe+o]:1)}}}function We(i,e,t,r,s,a=1){const n=i.length,o=new Float32Array(n),c=new Float32Array(n),h=Math.min(1,Math.max(0,s));for(let u=0;u<n;u++){const l=e[u]===0||e[u]===1||e[u]===2,m=t[u];o[u]=l&&m>0?i[u]*(r/m)*h*a:0,c[u]=l?i[u]*(1-h):i[u]}return{map:o,coarse:c}}const Z=12,z=["core","env","glow"],qi=i=>[(-i*i*i+2*i*i-i)/2,(3*i*i*i-5*i*i+2)/2,(-3*i*i*i+4*i*i+i)/2,(i*i*i-i*i)/2],_t=(i,e)=>({w:i==="linear"?[0,1-e,e,0]:qi(e),u2:e,wc:i==="cubicw"?1:0});function Zi(i,e,t,r){const s=Math.PI/180,a=i*s,n=e*s,o=[Math.sin(a)*Math.cos(n),Math.cos(a)*Math.cos(n),Math.sin(n)],c=[Math.cos(a),-Math.sin(a),0],h=[o[1]*c[2]-o[2]*c[1],o[2]*c[0]-o[0]*c[2],o[0]*c[1]-o[1]*c[0]].map(l=>-l),u=h[2]<0?h.map(l=>-l):h;return{f:o,r:c,up:u,tanH:Math.tan(.5*t*s),size:r}}function St(i,e,t,r,s=5,a=1){const n=Math.PI/180,o=Math.tan(.5*t*n),c=Math.min(80,.5*t+s),h=Math.tan(c*n),u=2*Math.max(2,Math.round(.5*r*a*h/o));return Zi(i,e,2*c,u)}class $i{clock=null;shown=null;advance(e,t,r,s){const a=this.clock;this.clock=e,r!==null&&(this.shown??=t??r,!(a===null||e<=a||t===null)&&(this.shown=Math.min(r,this.shown+(r-t)/Math.max(1,s))))}alpha(e,t){return t>e&&this.shown!==null?Math.min(1,Math.max(0,(this.shown-e)/(t-e))):0}mayRotate(e){return e===null||this.shown!==null&&this.shown>=e-1e-8}}function Yi(i,e,t,r,s){const a=i+2*e,n=s===null?a:Math.max(s+e/4,Math.min(s+2*e,a)),o=Math.max(t,n);return s!==null&&Math.min(r,o)<=s+1e-8?null:o}const Xe=48,Ki=6;function Vi(i,e,t,r,s,a){const n=Math.max(...i.map(u=>u.n)),o=r.map(()=>[]),c=r.map(u=>{const l=u.tanH*(1+a);return[u.r,u.up].flatMap(m=>[-1,1].map(p=>u.f.map((d,f)=>l*d+p*m[f])))}),h=t.reduce((u,l)=>u+Math.max(0,-l),0);for(let u=0;u<n;u+=Xe){const l=u/Xe*Ki;let m=1/0,p=-1/0,d=1/0,f=-1/0,x=0,b=0;for(const T of e)l>=T.length||(m=Math.min(m,T[l]),p=Math.max(p,T[l+1]),d=Math.min(d,T[l+2]),f=Math.max(f,T[l+3]),x=Math.max(x,T[l+4]),b=Math.max(b,T[l+5]));if(m>p)continue;const E=(p-m)*h,v=(f-d)*h;m-=E,p+=E,d-=v+(oe-ye)*Re,f+=v-(K-ye)*Re;const A=Math.max(m*m,p*p)+Math.max(d*d,f*f),R=A/(L*L),y=(1+K/L)*(1-R/6),M=1+oe/L,w=M*s*Math.sqrt(1+h)*(Math.sqrt(x)+Math.sqrt(b))+4,k=[Math.min(y*m,M*m)-w,Math.min(y*d,M*d)-w,K-(L+oe)*R/2-w],C=[Math.max(y*p,M*p)+w,Math.max(y*f,M*f)+w,oe+w];for(let T=0;T<c.length;T++){if(R<=.0625&&c[T].some(([F,U,be])=>F*(F<0?k[0]:C[0])+U*(U<0?k[1]:C[1])+be*(be<0?k[2]:C[2])<0))continue;const _=o[T],S=_[_.length-1],B=Math.min(Xe,n-u);S&&S[0]+S[1]===u?_[_.length-1]=[S[0],S[1]+B]:_.push([u,B])}}return o}const fs=[8,12,16,24],Ft=2.6,ji=.75,Ct=3,Qi=16,Ji=6,er=40,kt=55,tr=40,Bt=(i=fs[0])=>({n:i,down:0,changes:0});function gt(i){if(i.length<Ji)return null;const e=[...i].sort((t,r)=>t-r);return e[e.length>>1]}function sr(i,e,t){const r=fs,s=r.indexOf(i.n);if(s<0||e===null)return i;const a=h=>({n:h,down:0,changes:i.changes+(h!==i.n?1:0)});if(e!==void 0){const h=m=>r.find(p=>e/p<=m)??r[r.length-1],u=h(Ft),l=h(Ft*ji);return u>i.n?a(u):l<i.n?i.down+1>=Ct?a(r[s-1]):{...i,down:i.down+1}:i.down?{...i,down:0}:i}if(t>1/er&&s<r.length-1)return{...a(r[s+1]),cool:tr};const n=i.cool??0,o=Math.max(0,n-1),c=h=>n?{...h,cool:o}:h;return n>0&&t<1/kt?{...i,down:0,cool:o}:t<1/kt&&s>0?i.down+1>=Ct?a(r[s-1]):c({...i,down:i.down+1}):i.down||n?c({...i,down:0}):i}const ir=12,rr=1.6,ar=.25,nr=.3,or=Math.LN2/.4;function cr(i,e,t,r,s=ir,a=rr){const n=Math.max(0,r-i.t),o=-Math.expm1(-n/s),c=Math.exp(-n/ar),h=Math.exp(or*n),u=(l,m)=>{if(!(m>0)||!(l>0))return Math.max(0,m);const p=l+o*(m-l),d=m*a,f=m/a,x=p>d?d+(p-d)*c:p<f?f-(f-p)*c:p;return Math.min(l*h,Math.max(l/h,x))};return{t:r,mean:u(i.mean,e),peak:u(i.peak,t)}}const me=(i,e)=>i[0]*e[0]+i[1]*e[1]+i[2]*e[2];function ur(i,e){let t=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([s,a])=>i.f.map((n,o)=>n+i.tanH*(s*i.r[o]+a*i.up[o])));const r=[[0,0,1],...[e.r,e.up].flatMap(s=>[-1,1].map(a=>e.f.map((n,o)=>n+a*s[o])))];for(const s of r){if(!t.length)break;const a=[];let n=t.at(-1),o=me(s,n)+1e-6;for(const c of t){const h=me(s,c)+1e-6;o>=0!=h>=0&&a.push(n.map((u,l)=>u+(c[l]-u)*o/(o-h))),h>=0&&a.push(c),n=c,o=h}t=a}return t}function Nt(i,e,t,r){const{x0:s=0,y0:a=0,w:n,h:o}=t;let c=n,h=0,u=o,l=0;for(const x of i){const b=me(x,e.f)*e.tanH,E=(1+me(x,r?e.up:e.r)/b)*n/2,v=(1+me(x,r?e.r:e.up)/b)*o/2;c=Math.min(c,E),h=Math.max(h,E),u=Math.min(u,v),l=Math.max(l,v)}const m=Math.max(0,Math.floor(c)-3),p=Math.min(n,Math.ceil(h)+3),d=Math.max(0,Math.floor(u)-3),f=Math.min(o,Math.ceil(l)+3);return[s+m,a+d,p-m,f-d]}const hr=6,Ge={N:8,dt:.25,margin:5,envBands:16,cut:4,mode:"cubic",maxMapSize:512,pitchDegMax:.25,fixedAtlas:!1},lr=16,je=3,se=6,Pt=16*se*je,te=(i,e)=>{i.push(e),i.length>600&&i.shift()};function Ot(i,e,t){const r=i.msg.red,s=e.msg.red;if(!r||!s)return null;const a=r.A.length,n=new Float32Array(a),o=new Float32Array(a);for(let c=0;c<a;c++)n[c]=r.A[c]+(s.A[c]-r.A[c])*t,o[c]=r.Y[c]+(s.Y[c]-r.Y[c])*t;return{A:n,Y:o}}const Dt=.5,He=16,fr=2,dr=300,mr=.6,pr=.12,xr=.32,br=4,Ut=4,vr=8,Er=8,zt=16,Ar=16,Lt=64,ne=[.25,1/3,.5],Tr=.75,wr=.4,It=12,Rr=3e3,qe=()=>({A:null,B:null,acc:null,job:null,slice:0,rot:0,startedAt:0,time:new $i});let Ze=null;function yr(i,e){const t=i.createProgram(),r=!!i.getExtension("KHR_parallel_shader_compile");e.programs.add(t);const s=[[i.VERTEX_SHADER,ki],[i.FRAGMENT_SHADER,Fi]].map(([u,l])=>{const m=i.createShader(u);return i.shaderSource(m,l),i.compileShader(m),i.attachShader(t,m),{s:m}});i.transformFeedbackVaryings(t,xe,i.INTERLEAVED_ATTRIBS),i.linkProgram(t);let a=!1,n=null;const o=()=>!r||i.getProgramParameter(t,37297)===!0;e.deferred.set(t,{shaders:s,ready:o});const c=()=>{if(!(a||n||!s.length))try{for(const{s:u}of s)if(!i.getShaderParameter(u,i.COMPILE_STATUS))throw new Error(`zoneCurtainExpand compile: ${i.getShaderInfoLog(u)}`);if(!i.getProgramParameter(t,i.LINK_STATUS))throw new Error(`zoneCurtainExpand link: ${i.getProgramInfoLog(t)}`);a=!0}catch(u){n=u instanceof Error?u:new Error(String(u))}finally{for(const{s:u}of s)i.getAttachedShaders(t)?.includes(u)&&i.detachShader(t,u),i.deleteShader(u);s.length=0,e.deferred.delete(t)}},h=new Map;return{prog:t,loc:{get:u=>(h.has(u)||h.set(u,i.getUniformLocation(t,u)),h.get(u))},done:()=>a||n!==null||o(),check:()=>{if(c(),n)throw n}}}const Wt=120,Xt=1e3,Mr=30,_r=i=>[{set:"core",tgt:"core",tab:0,pulse:1},{set:"env",tgt:"env",tab:i,pulse:1},{set:"glow",tgt:"env",tab:i,pulse:0}],Gt=new Float32Array([0,0,1,0,0,1,1,1]),ds=(i,e)=>({level:Math.min(3,Math.max(0,Math.round(i))),seed:e}),Sr=(i,e)=>({...ds(i,e),weather:{seed:e}});function Fr(i,e,t,r,s){const a=[];for(let n=0;n<i.length;n+=hr){const o={t0:i[n],vz:i[n+1],amp:i[n+2],xc:i[n+3],w:i[n+4],lag:i[n+5]},c=Math.max(t,o.xc-2.8*o.w),h=Math.min(r,o.xc+2.8*o.w);h>=c&&[c,h,Math.min(h,Math.max(c,o.xc))].some(u=>{const l=e-(o.t0+(u-o.xc)*o.lag);return l>0&&70+o.vz*l<=420})&&a.push(o)}return a.sort((n,o)=>o.amp-n.amp),{events:a.slice(0,s),dropped:Math.max(0,a.length-s)}}const ms=[0,1,2,3,15];function he(i){const e=s=>i.getParameter(s),t=e(i.ACTIVE_TEXTURE),r=ms.map(s=>(i.activeTexture(i.TEXTURE0+s),e(i.TEXTURE_BINDING_2D)));return i.activeTexture(t),{prog:e(i.CURRENT_PROGRAM),vao:e(i.VERTEX_ARRAY_BINDING),array:e(i.ARRAY_BUFFER_BINDING),copyRead:e(i.COPY_READ_BUFFER_BINDING),copyWrite:e(i.COPY_WRITE_BUFFER_BINDING),tfo:e(i.TRANSFORM_FEEDBACK_BINDING),tfBuffer:e(i.TRANSFORM_FEEDBACK_BUFFER_BINDING),discard:i.isEnabled(i.RASTERIZER_DISCARD),blend:i.isEnabled(i.BLEND),viewport:e(i.VIEWPORT),scissor:i.isEnabled(i.SCISSOR_TEST),drawFb:e(i.DRAW_FRAMEBUFFER_BINDING),readFb:e(i.READ_FRAMEBUFFER_BINDING),cull:i.isEnabled(i.CULL_FACE),depth:i.isEnabled(i.DEPTH_TEST),unpack:e(i.UNPACK_ALIGNMENT),unit:t,tex:r}}function le(i,e){if(i.isContextLost()||!e.viewport)return;const t=(r,s)=>{s?i.enable(r):i.disable(r)};t(i.RASTERIZER_DISCARD,e.discard),i.bindTransformFeedback(i.TRANSFORM_FEEDBACK,e.tfo),i.bindBuffer(i.TRANSFORM_FEEDBACK_BUFFER,e.tfBuffer),i.bindVertexArray(e.vao),i.bindBuffer(i.ARRAY_BUFFER,e.array),i.bindBuffer(i.COPY_READ_BUFFER,e.copyRead),i.bindBuffer(i.COPY_WRITE_BUFFER,e.copyWrite),i.vertexAttrib4f(12,0,0,0,1),i.useProgram(e.prog),t(i.BLEND,e.blend),i.blendFunc(i.ONE,i.ONE),i.blendEquation(i.FUNC_ADD),t(i.CULL_FACE,e.cull),t(i.DEPTH_TEST,e.depth),t(i.SCISSOR_TEST,e.scissor),i.viewport(e.viewport[0],e.viewport[1],e.viewport[2],e.viewport[3]),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,e.drawFb),i.bindFramebuffer(i.READ_FRAMEBUFFER,e.readFb),i.pixelStorei(i.UNPACK_ALIGNMENT,e.unpack),ms.forEach((r,s)=>{i.activeTexture(i.TEXTURE0+r),i.bindTexture(i.TEXTURE_2D,e.tex[s]??null)}),i.activeTexture(e.unit)}function Cr(i,e,t){const r=performance.now(),s=h=>Number(i.getParameter(h)),a=i.getSupportedExtensions()??[],n=!!i.getExtension("EXT_color_buffer_float"),o=t||!!i.getExtension("EXT_float_blend"),c={colorBufferFloat:n,floatBlend:o,fence:typeof i.fenceSync=="function",maxTextureSize:s(i.MAX_TEXTURE_SIZE),maxVertexAttribs:s(i.MAX_VERTEX_ATTRIBS),maxTfInterleaved:s(i.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS),maxVertexTextureUnits:s(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureUnits:s(i.MAX_TEXTURE_IMAGE_UNITS),maxFragmentUniformVectors:s(i.MAX_FRAGMENT_UNIFORM_VECTORS),maxVertexUniformVectors:s(i.MAX_VERTEX_UNIFORM_VECTORS),filterProbe:null,blendProbe:null,probeError:null,reason:null,target:et(o),timerQuery:a.includes("EXT_disjoint_timer_query_webgl2"),floatLinear:a.includes("OES_texture_float_linear"),probeMs:0};if(yt({...c,filterProbe:.5,blendProbe:.5})===null){const h=he(i),u=i.getParameter(i.PIXEL_PACK_BUFFER_BINDING);let l=null,m=null,p=null,d=null;try{i.activeTexture(i.TEXTURE15),l=e.texture(2,1,i.RGBA16F,i.RGBA,i.FLOAT,new Float32Array([0,0,0,0,1,1,1,1])),i.bindTexture(i.TEXTURE_2D,l),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),m=e.target(1,1,o?i.RGBA32F:i.RGBA16F,i.RGBA),p=e.program("zoneCurtainProbe",W,Ci),d=i.createVertexArray(),i.bindVertexArray(d),i.useProgram(p.prog),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,l),i.uniform1i(p.loc.get("uT"),0),i.bindFramebuffer(i.FRAMEBUFFER,m.fbo),i.viewport(0,0,1,1),i.disable(i.SCISSOR_TEST),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.clearBufferfv(i.COLOR,0,[0,0,0,0]),i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE),i.blendEquation(i.FUNC_ADD),i.drawArrays(i.TRIANGLES,0,3),i.drawArrays(i.TRIANGLES,0,3);const f=new Float32Array(4);i.bindBuffer(i.PIXEL_PACK_BUFFER,null),i.readPixels(0,0,1,1,i.RGBA,i.FLOAT,f);const x=i.getError();x!==i.NO_ERROR&&(c.probeError=`GL error 0x${x.toString(16)}`),c.filterProbe=f[0]/2,c.blendProbe=f[1]}catch(f){c.probeError=(f instanceof Error?f.message:String(f)).split(`
`)[0].slice(0,200)}finally{d&&i.deleteVertexArray(d),p&&(i.deleteProgram(p.prog),e.programs.delete(p.prog)),m&&e.deleteTarget(m),l&&e.deleteTexture(l),le(i,h),i.bindBuffer(i.PIXEL_PACK_BUFFER,u)}}return c.reason=yt(c),c.probeMs=performance.now()-r,c}class kr{opt;caps=null;stats={frames:0,maps:0,misses:0,miss3:0,states:0,workerMs:[],uploadBytes:0,tablesMs:null,tableLayers:[],slots:{core:0,env:0,glow:0},segsLastSlice:0,eventsDropped:0,mainMs:[],glErrors:0,failed:null,target:"",stillFrames:0,restarts:0,composed:0,w:0,meterReads:0,meterBack:0,meterTimeouts:0,meterLatency:0,meterMs:[],meterN:0,meterSteps:[],collectMs:[],collectSteps:[],meterWorkerMs:[],redPasses:0,first:{made:typeof performance<"u"?performance.now():0,programs:null,linked:null,tables:null,state:null,maps:null,metered:null,faded:null,tablesCached:!1},lostCalls:0,follow:{rate:0,wideMaps:0,wideFrames:0,wideMs:0,wideSize:0,wideMisses:0,fine:0,fineDropped:0,standingMaps:0},auto:{n:0,via:"",sliceMs:null,mapMs:null,changes:0},workerMsParts:[]};lost(e){return e.isContextLost()?(this.stats.lostCalls++,!0):!1}debugMeterN=null;meterIn=null;debugW=null;debugCompose=!0;debugFadeHold=!1;debugClassGain=null;debugRedOff=!1;debugRedSource=null;debugN=null;get nNow(){return this.nCur}nCur;autoN=Bt();wide=qe();standSince=null;phi=0;phiAt=null;debugWide=!0;debugFine=!0;get atlasActive(){return this.opt.fixedAtlas&&this.debugN===null&&this.debugWide}debugAtlasCull=!0;debugAtlasPixelPadding=!0;debugAtlasReference=typeof location<"u"&&new URLSearchParams(location.search).get("zoneAtlasBake")==="reference";get fastAtlasBake(){return this.opt.fixedAtlas&&!this.debugAtlasReference}get atlasBakeSlices(){return this.fastAtlasBake?br:Er}atlasSlots={kept:0,all:0,faces:[0,0,0,0,0]};newAtlas(){return this.newWideMap(Cs(xr,Ut),!0)}debugWideMoving=null;shown=[];noteShown(e,t,r,s){this.shown.push({at:performance.now(),lag:e-t,onTime:!s.miss&&!s.miss3&&t>r+1e-6}),this.shown.length>300&&this.shown.shift()}atlasPresentation(){const e=this.wide,{clock:t,shown:r}=e.time;if(!this.atlasActive||t===null||r===null||!e.B)return null;const s=e.A?.T??e.B.T,a=e.B.T;return{clock:t,shown:r,lag:t-r,a:s,b:a,alpha:e.time.alpha(s,a)}}updateRate(e=5e3){const t=performance.now(),r=this.shown.filter(a=>t-a.at<=e),s=r.map(a=>a.lag).sort((a,n)=>a-n);return{perS:1e3*r.length/e,onTimePerS:1e3*r.filter(a=>a.onTime).length/e,lagMed:s.length?s[s.length>>1]:null,lagP90:s.length?s[Math.floor(.9*(s.length-1))]:null,n:r.length}}tq=void 0;autoCost=[];timeBegin(e){const t=this.tq;if(!t||t.pend.length>=6||e.getQuery(t.ext.TIME_ELAPSED_EXT,e.CURRENT_QUERY))return null;const r=e.createQuery();return r&&e.beginQuery(t.ext.TIME_ELAPSED_EXT,r),r}timeEnd(e,t,r){const s=this.tq;e.endQuery(s.ext.TIME_ELAPSED_EXT),s.pend.push({q:t,n:r})}timePoll(e){if(this.tq===void 0){const s=this.caps?.timerQuery===!1?null:e.getExtension("EXT_disjoint_timer_query_webgl2");this.tq=s?{ext:s,pend:[]}:null}const t=this.tq;if(!t||!t.pend.length)return;const r=!!e.getParameter(t.ext.GPU_DISJOINT_EXT);for(;t.pend.length&&e.getQueryParameter(t.pend[0].q,e.QUERY_RESULT_AVAILABLE);){const s=t.pend.shift();if(!r){const a=Number(e.getQueryParameter(s.q,e.QUERY_RESULT))/1e6;this.autoCost.push(a*s.n),this.autoCost.length>Qi&&this.autoCost.shift(),this.stats.auto.sliceMs=a}e.deleteQuery(s.q)}}seed;debugMaps=null;debugHold=!1;debugScene=null;debugSceneExtra=null;res=null;worker=null;makeWorker;key="";scene=null;tables=null;referenceTables=null;referenceRaster=null;windowMass=null;tablesAsked=!1;ring=[];pending=[];inFlight=!1;nextT=0;reqId=0;cap={core:0,env:0,glow:0};pX=null;pR=null;pD=null;pC=null;referenceCompose=null;spectralRows=new Float32Array(3*pe);lastSpectrum=null;pRed=null;redTex=null;progQueue=[];tableWorker=null;pM=[];mS=null;mB=null;mF=null;pbos=[];reads=[];extIds=new WeakMap;extNext=1;expandInputs=new Map;vaoR=null;vaoD=null;quad=null;tfo=null;out=null;kTex=null;ptPool=[];refCpu=new Map;accFmt=0;A=null;B=null;acc=null;Ta=0;Tb=0;cur=null;slice=0;fdts=[];lastT=null;waitSince=null;hist=[];omega={axis:[0,0,1],rate:0};view=null;trash=[];w=0;lastWall=null;unmetered=0;retiring=null;retShare=0;retOut=null;outAt=null;holdS=0;retiringShare(e){return this.retiring?this.retShare*(this.retOut??1-e):0}meterPairs(){if(this.retOut===null||!this.retiring||this.debugMaps||this.debugW!==null)return this.pairs();if(!this.programReady())return[];const e=[],t=this.maps(),r=this.retShare*(1-this.w);return r>0&&e.push({m:this.retiring,share:r}),t&&this.w>0&&e.push({m:t,share:this.w}),e}weather;wx=null;constructor(e={},t,r=0,s=!1){this.opt={...Ge,...e},this.nCur=this.opt.N,this.seed=r>>>0,this.weather=s,this.autoN=Bt(this.opt.N),this.makeWorker=t??(()=>new Worker(new URL(""+new URL("zone-curtain.worker-ClFgLTBk.js",import.meta.url).href,import.meta.url),{type:"module"}))}maps(){if(this.debugMaps)return this.debugMaps;if(!this.linked)return null;const e=this.wide,t=e.A??(this.opt.fixedAtlas?e.B:null),r=this.opt.fixedAtlas?this.atlasBakeSlices:He,s=this.debugWide&&t&&e.B?{A:t,B:e.B,alpha:this.atlasActive?e.time.alpha(t.T,e.B.T):Math.min(1,e.rot/(5*r))}:null;return!this.atlasActive&&this.A&&this.B?{A:this.A,B:this.B,alpha:this.alphaNow(),wide:s,fine:s?this.phi:1}:s?{A:s.A,B:s.B,alpha:s.alpha,wide:s,fine:0}:null}coverageNow(e,t,r=25){const s=this.debugMaps??this.maps();if(!s)return{n:0,nA:0,nB:0,nC:0,sA:0,sB:0,sC:0,none:1,fallbackOnly:0,shown:0};const a=s.fine??1,n=Et(e,t,a>0?s.A.cam:null,a>0?s.B.cam:null,s.wide?"cube":null,s.alpha,this.nCur,r,a);return{...n,shown:n.shown*this.weight()}}coverageOfView(e=15){const t=this.view;return t?this.coverageNow(t.dir,t.fovDeg*Math.PI/360,e):null}layersOf(e){const t=[];for(const{m:r,share:s}of e){const a=r.fine??1;a>0&&t.push({A:r.A,B:r.B,alpha:r.alpha,share:s*a}),r.wide&&a<1&&t.push({A:r.wide.A,B:r.wide.B,alpha:r.wide.alpha,share:s*(1-a)})}return t}alphaNow(){return Math.min(1,this.rotFrames/Math.max(1,this.rotN))}rotFrames=0;rotN=Ge.N;pairs(){if(!this.programReady())return[];if(this.debugMaps)return[{m:this.debugMaps,share:this.debugW??this.w}];const e=[],t=this.maps(),r=this.debugW??this.w;if(this.retiring&&this.debugW===null){const s=this.retiringShare(r);s>0&&e.push({m:this.retiring,share:s})}return t&&r>0&&e.push({m:t,share:r}),e}weight(){return(this.debugMaps??this.maps())&&this.programReady()?this.debugW??this.w:0}shares(){let e=0,t=0;for(const r of this.pairs())r.m===this.retiring?t=r.share:e=r.share;return{current:e,retiring:t}}coarseRates(e,t){return this.debugW!==null?this.debugW>0?We(e,t,e,1,this.debugW).coarse:e:this.stats.failed?e:We(e,t,e,1,1).coarse}compose(e,t,r,s,a,n,o,c){const h=this.pairs();if(!h.length||!this.pC||!this.debugCompose||this.lost(e))return!1;const u=this.opt.fixedAtlas&&c!==void 0&&h.every(({m:d})=>d.fine===0&&d.wide?.A.filtered&&d.wide.B.filtered),l=this.opt.fixedAtlas&&!u?this.referenceCompose??=this.res.program("zoneCurtainReferenceCompose",W,wt):this.pC;e.useProgram(l.prog),n(l),u||e.uniform1iv(l.loc.get("uClass"),Int32Array.from(r));const m=Gi(s),p=this.debugClassGain;for(const{m:d,share:f}of h){this.bindMaps(e,l,d,2,u);const x=We(t,r,m,d.A.kR,f,a).map;if(p)for(let b=0;b<x.length;b++)x[b]=x[b]*(p[r[b]]??1);u?this.bindSpectrum(e,l,c??null,x,r):e.uniform1fv(l.loc.get("uRate"),x),o()}return e.activeTexture(e.TEXTURE0),this.stats.composed++,!0}bindSpectrum(e,t,r,s,a){const n=this.lastSpectrum;n&&n.ext===r&&s.every((o,c)=>o===n.rate[c]&&a[c]===n.cls[c])||(Hi(this.spectralRows,s,a,r),e.uniform3fv(t.loc.get("uLight[0]"),this.spectralRows),this.lastSpectrum={ext:r,rate:s,cls:Int32Array.from(a)})}meterField(){const e=t=>this.readingOf(t);return ct(this.layersOf(this.meterPairs()).map(t=>({A:e(t.A),B:e(t.B),alpha:t.alpha,share:t.share})))}meterStats(e,t){const r=ut(e,t,Ye(),this.meterField()),s=this.retOut===null?r.mean:ut(e,t,Ye(),ct(this.layersOf(this.pairs()).map(h=>({A:this.readingOf(h.A),B:this.readingOf(h.B),alpha:h.alpha,share:h.share})))).mean,a=typeof performance<"u"?performance.now()/1e3:0,n=this.slowLight;if(this.debugMeterFast)return this.slowLight=null,{...r,shown:s};const o=this.retiring||this.w<1?nr:this.debugGainTau??void 0,c=n&&a-n.t>=0&&a-n.t<2?cr(n,r.mean,r.peak,a,o):{t:a,mean:r.mean,peak:r.peak};return this.slowLight=c,{mean:c.mean,peak:c.peak,shown:s}}slowLight=null;debugMeterFast=!1;debugGainTau=null;meterOptics=null;meterWake;meterHeld=!1;debugKeepStates=!1;meterWorker=null;meterWorkerReady=!1;meterNoInputAt=null;meterWaitingAt=null;meterActiveMs=0;meterLastCollect=null;meterOpticsKey="";meterLuts=new WeakMap;meterLutId=0;meterRequest=null;meterResult=null;meterId=0;meterMapId=0;meterPausedForDrag=!1;meterFrame=0;meterGrid=null;get meterBackend(){return this.stats.failed?"legacy":this.useBackgroundMeter()?"worker":"gpu-reference"}get meterFading(){return!this.stats.failed&&this.useBackgroundMeter()&&!this.debugHold&&this.w<1}enableBackgroundMeter(e){try{const t=this.meterWorker=e();t.onmessage=({data:r})=>{this.meterWorker===t&&(r.cmd==="ready"?(this.meterWorkerReady=!0,this.meterWake?.()):r.cmd==="error"?this.failBackgroundMeter(r.message):this.meterRequest?.id===r.id&&(this.meterResult=r,this.meterWake?.()))},t.onerror=r=>{this.meterWorker===t&&this.failBackgroundMeter(r.message||"worker unavailable")},t.onmessageerror=()=>{this.meterWorker===t&&this.failBackgroundMeter("invalid worker message")},this.postMeter({cmd:"init",envBands:this.opt.envBands,cut:this.opt.cut,atlasFast:this.fastAtlasBake})}catch(t){this.failBackgroundMeter(t instanceof Error?t.message:String(t))}}failBackgroundMeter(e){this.stats.meterTimeouts+=this.meterRequest?.maps.length??0,this.meterWorker?.terminate(),this.meterWorker=null,this.meterWorkerReady=!1,this.meterRequest=this.meterResult=null,this.stats.failed=`zoneCurtainMeterWorker: ${e}`,this.meterWake?.()}postMeter(e,t=[]){if(this.meterWorker)try{this.meterWorker.postMessage(e,t)}catch(r){this.failBackgroundMeter(r instanceof Error?r.message:String(r))}}useBackgroundMeter(){return!!this.meterWorker&&this.debugMaps===null&&this.debugMeterN===null}backgroundSample(e){const t=this.meterOptics,r=performance.now(),s=this.maps(),a=this.retiring;if(!this.meterWorkerReady||!s&&!a)return;if(!t){this.meterActiveMs-(this.meterNoInputAt??=this.meterActiveMs)>5e3&&this.failBackgroundMeter("optical field unavailable");return}this.meterNoInputAt=null;const n=s&&(!s.A.reading||!s.B.reading)&&this.w===0;if(n&&this.meterActiveMs-(this.meterWaitingAt??=this.meterActiveMs)>5e3){this.failBackgroundMeter("initial readings could not be used");return}if(n||(this.meterWaitingAt=null),this.meterHeld&&!e.snapshot&&this.w>=1&&!a){this.meterPausedForDrag=!0;return}const o=this.meterShape(e.radiusDeg),c=e.ext?this.extinctionKey(e.ext):0;let h=this.meterLuts.get(t.sky.buffer);h===void 0&&this.meterLuts.set(t.sky.buffer,h=++this.meterLutId);const u=Y.map(v=>e.rates[v]??0),l=Math.max(...u)||1,m=`${o.n}|${o.tanR.toFixed(6)}|${c}|${t.key}|${h}|${u.map(v=>(v/l).toFixed(7)).join(",")}`,p=this.meterOpticsKey!==m;if(this.meterOpticsKey=m,this.meterRequest||!this.meterPausedForDrag&&!e.snapshot&&!p&&!n&&r-this.lastReduceAt<Xt)return;this.meterPausedForDrag=!1;const d=`${e.axis.map(v=>v.toFixed(4)).join(",")}|${m}`,f=s?[s.A,s.B]:[];s?.wide&&f.push(s.wide.A,s.wide.B),a&&(f.push(a.A,a.B),a.wide&&f.push(a.wide.A,a.wide.B));const x=[...new Set(f)].filter(v=>v.meterJob&&v.readKey!==d).slice(0,2);if(!x.length)return;const b=Array.from(e.cls);this.meterIn={axis:[...e.axis],radiusDeg:e.radiusDeg,n:o.n,tanR:o.tanR,count:o.count,level:e.level,cls:b,weights:u},this.lastReduceAt=r;const E=++this.meterId;this.meterRequest={id:E,key:d,opticsKey:m,optics:t,start:this.meterActiveMs,frame:this.meterFrame,maps:x.map(v=>({map:v,gen:v.gen}))},this.stats.meterReads+=x.length,this.stats.meterN=o.n,this.postMeter({cmd:"measure",id:E,view:{axis:e.axis,n:o.n,tanR:o.tanR,cls:b,weights:u,ext:e.ext,optics:t},jobs:x.map(v=>v.meterJob)}),te(this.stats.meterMs,performance.now()-r)}collectBackground(){this.meterFrame++;const e=performance.now(),t=this.meterRequest,r=this.meterResult;if(this.meterLastCollect!==null&&(this.meterActiveMs+=Math.min(250,e-this.meterLastCollect)),this.meterLastCollect=e,!r&&(!this.meterWorkerReady&&this.meterActiveMs>1e4||t&&this.meterActiveMs-t.start>5e3)){this.failBackgroundMeter("worker did not return a reading");return}if(!t||!r)return;this.meterRequest=this.meterResult=null;const s=this.meterOptics,a=t.opticsKey!==this.meterOpticsKey||!s||t.optics.sky.buffer!==s.sky.buffer||t.optics.key!==s.key;t.maps.forEach(({map:n,gen:o},c)=>{const h=r.rows[c];if(!h||n.gen!==o||a){this.stats.meterTimeouts++;return}n.reading=h,n.meterJob?.level===this.scene?.level&&(this.lastReading=h),n.readKey=t.key,this.stats.meterBack++}),this.stats.meterLatency=this.meterFrame-t.frame;for(const n of r.ms)te(this.stats.meterWorkerMs,n);te(this.stats.collectMs,performance.now()-e)}meterShape(e){const t=this.meterGrid,r=this.debugMeterN;if(t&&t.radius===e&&t.override===r)return t.value;const s=zs(e,Math.min(this.opt.pitchDegMax,2*e/128),r??void 0);return this.meterGrid={radius:e,override:r,value:s},s}extinctionKey(e){const t=this.extIds.get(e);if(t!==void 0)return t;const r=this.extNext++;return this.extIds.set(e,r),r}meter(e,t){if(this.stats.failed)return;if(this.useBackgroundMeter()){this.backgroundSample(t);return}if(!this.pM.length||this.lost(e)||!this.programReady())return;this.reads.some(f=>f.passed)&&(this.catchUp&&e.deleteSync(this.catchUp),this.catchUp=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0));const r=this.debugMaps?null:this.maps(),s=[];for(const f of this.layersOf(this.meterPairs()).sort((x,b)=>b.share-x.share))s.push(f.A,f.B);if(r&&(s.push(r.A,r.B),r.wide&&s.push(r.wide.A,r.wide.B)),!s.length)return;const a=this.meterShape(t.radiusDeg),n=t.ext?this.extinctionKey(t.ext):0,o=`${t.axis.map(f=>f.toFixed(4)).join(",")}|${a.n}|${a.tanR.toFixed(6)}|${n}`,c=[];for(const f of s)c.length>=je||c.includes(f)||f.readKey===o||this.reads.some(x=>x.items.some(b=>b.M===f&&b.gen===f.gen&&b.key===o))||c.push(f);const h=Y.map(f=>t.rates[f]??0);this.meterIn={axis:[...t.axis],radiusDeg:t.radiusDeg,n:a.n,tanR:a.tanR,count:a.count,level:t.level,cls:Array.from(t.cls),weights:h};const u=this.w<1||this.retiring!==null||this.debugMaps!==null||this.debugW!==null||c.some(f=>f.reading!==null&&f.readKey==="");if(c.length&&!u&&(this.reads.length>0||performance.now()-this.lastReduceAt<Xt)&&(c.length=0),!c.length)return;this.lastReduceAt=performance.now();const l=this.steps,m=performance.now(),p=he(e),d=e.getParameter(e.PIXEL_PACK_BUFFER_BINDING);l.fill(0),l[1]=performance.now()-m;try{const f=at(t.cls),x=nt(t.cls);c.forEach((y,M)=>this.reduce(e,y,t,a,M));const b=performance.now(),E=this.res;let v=this.pbos.pop();v||(v=e.createBuffer(),E.buffers.add(v),e.bindBuffer(e.PIXEL_PACK_BUFFER,v),e.bufferData(e.PIXEL_PACK_BUFFER,Pt,e.STREAM_READ),E.recordBuffer(v,Pt)),e.bindFramebuffer(e.FRAMEBUFFER,this.mF.fbo),e.bindBuffer(e.PIXEL_PACK_BUFFER,v),e.readPixels(0,0,se*c.length,1,e.RGBA,e.FLOAT,0),e.bindBuffer(e.PIXEL_PACK_BUFFER,null);const A=performance.now();l[5]=A-b;const R=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0);if(l[6]=performance.now()-A,!R)throw this.pbos.push(v),new Error("fenceSync returned null");this.reads.push({items:c.map(y=>({M:y,gen:y.gen,key:o,chan:f,red:x})),sync:R,pbo:v,frames:0}),e.activeTexture(e.TEXTURE0),this.stats.meterReads+=c.length,this.stats.meterN=a.n}catch(f){this.lost(e)||(this.stats.failed=`zoneCurtainMeter: ${f instanceof Error?f.message:String(f)}`)}finally{const f=performance.now();le(e,p),e.bindBuffer(e.PIXEL_PACK_BUFFER,d);const x=performance.now();l[0]=x-m,l[7]=x-f,te(this.stats.meterMs,l[0]),te(this.stats.meterSteps,Array.from(l))}}steps=new Float64Array(8);lastReduceAt=-1/0;lastReading=null;catchUp=null;readingOf(e){return e.reading??(this.debugMaps?null:this.lastReading)}collect(e){if(this.useBackgroundMeter()){this.collectBackground();return}if(!this.reads.length||this.stats.failed||this.lost(e))return;const t=performance.now(),r=e.getParameter(e.PIXEL_PACK_BUFFER_BINDING),s=[0,0,0];try{this.poll(e,s)}catch(a){this.lost(e)||(this.stats.failed=`zoneCurtainMeter: ${a instanceof Error?a.message:String(a)}`)}finally{e.bindBuffer(e.PIXEL_PACK_BUFFER,r),s[0]=performance.now()-t,te(this.stats.collectMs,s[0]),te(this.stats.collectSteps,s)}}poll(e,t){for(const r of[...this.reads]){const s=performance.now(),a=r.passed?e.ALREADY_SIGNALED:e.clientWaitSync(r.sync,0,0);t[1]=t[1]+performance.now()-s;const n=a===e.ALREADY_SIGNALED||a===e.CONDITION_SATISFIED;if(n&&!r.passed){r.passed=!0,r.frames++;continue}if(r.passed&&this.catchUp&&++r.frames<=Wt/2){const o=e.clientWaitSync(this.catchUp,0,0);if(o!==e.ALREADY_SIGNALED&&o!==e.CONDITION_SATISFIED&&o!==e.WAIT_FAILED)continue}if(!(!n&&a!==e.WAIT_FAILED&&++r.frames<=Wt)){if(this.reads.splice(this.reads.indexOf(r),1),e.deleteSync(r.sync),n){const o=new Float32Array(4*se*r.items.length),c=performance.now();e.bindBuffer(e.PIXEL_PACK_BUFFER,r.pbo),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,o),t[2]=t[2]+performance.now()-c,r.items.forEach((h,u)=>{const l=4*se*u,m=Y.length,p=new Float64Array(m),d=new Float64Array(m);h.chan.forEach((f,x)=>{p[f]=o[l+x],d[f]=o[l+4+x]}),h.red>=0&&(p[h.red]=o[l+12],d[h.red]=o[l+16]),h.M.gen===h.gen&&(h.M.reading={sums:p,count:o[l+8],box:d,boxTotal:o[l+9]+(h.red>=0?Math.max(0,o[l+21]):0)},h.M.readKey=h.key,this.lastReading=h.M.reading)}),this.stats.meterBack+=r.items.length,this.stats.meterLatency=r.frames}else this.stats.meterTimeouts+=r.items.length;this.pbos.push(r.pbo)}}}reduce(e,t,r,s,a){const n=at(r.cls),o=nt(r.cls);this.reduceSet(e,t,r,s,n,se*a),o>=0&&this.reduceSet(e,t,r,s,[o],se*a+3)}reduceSet(e,t,r,s,a,n){const o=this.res,c=s.n,h=c/ie,u=this.pM[0],l=this.pM[1],m=this.pM[2],p=this.steps,d=performance.now(),f=(w,k,C)=>{if(w&&w.w===k&&w.h===C)return w;if(w){const _=w;this.defer(()=>o.deleteTarget(_))}e.activeTexture(e.TEXTURE15);const T=o.target(k,C,e.RGBA32F,e.RGBA);return e.activeTexture(e.TEXTURE0),T},x=this.mS=f(this.mS,c,c),b=this.mB=f(this.mB,3*h,h),E=this.mF=f(this.mF,se*je,1),v=ot(r.axis),A=this.meterIn.weights,R=[0,1,2,3].map(w=>a[w]??0),y=[0,1,2,3].map(w=>a[w]!==void 0?t.kR:0),M=[0,1,2,3].map(w=>a[w]!==void 0?A[a[w]]??0:0);e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.bindVertexArray(this.vaoD),e.useProgram(u.prog),r.bind(u),e.uniform3fv(u.loc.get("uMF"),v.F),e.uniform3fv(u.loc.get("uMR"),v.R),e.uniform3fv(u.loc.get("uMU"),v.U),e.uniform1f(u.loc.get("uTanR"),s.tanR),e.uniform1f(u.loc.get("uN"),c),e.uniform3fv(u.loc.get("mF"),t.cam.f),e.uniform3fv(u.loc.get("mR"),t.cam.r),e.uniform3fv(u.loc.get("mU"),t.cam.up),e.uniform2f(u.loc.get("mT"),t.cam.tanH,t.n),e.uniform1f(u.loc.get("mCube"),t.cube?1:0),e.uniform1f(u.loc.get("uAtlasFilter"),t.filtered?1:0),e.uniform1f(u.loc.get("uCubic"),this.debugCubic?1:0),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,t.core.tex),e.uniform1i(u.loc.get("mC"),2),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,t.env.tex),e.uniform1i(u.loc.get("mE"),3),e.uniform1iv(u.loc.get("uComp"),Int32Array.from(R)),e.uniform1iv(u.loc.get("uCls"),Int32Array.from(R.map(w=>r.cls[w]??0))),e.uniform1fv(u.loc.get("uK"),Float32Array.from(y)),e.bindFramebuffer(e.FRAMEBUFFER,x.fbo),e.viewport(0,0,c,c),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(l.prog),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,x.tex),e.uniform1i(l.loc.get("uS"),2),e.uniform1f(l.loc.get("uN"),c),e.uniform4fv(l.loc.get("uW"),Float32Array.from(M)),e.bindFramebuffer(e.FRAMEBUFFER,b.fbo),e.viewport(0,0,3*h,h),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(m.prog),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,b.tex),e.uniform1i(m.loc.get("uB"),2),e.uniform1i(m.loc.get("uNB"),h),e.uniform1i(m.loc.get("uOff"),n),e.bindFramebuffer(e.FRAMEBUFFER,E.fbo),e.viewport(n,0,3,1),e.drawArrays(e.TRIANGLES,0,3),p[4]=p[4]+performance.now()-d}debugMeterSamples(e){return this.mS?this.readTarget(e,this.mS):null}frame(e){if(this.stats.failed||this.debugHold||this.lost(e.gl))return;const t=performance.now(),r=e.gl,s=he(r);this.holdS=Math.max(0,e.holdS??0);try{this.res=e.res,this.flush();const a=this.debugScene??(this.weather?Sr:ds)(e.level,e.seed),n=this.debugSceneExtra&&!this.debugScene?{...a,...this.debugSceneExtra}:a,o=this.debugScene?JSON.stringify(n):`${n.level}|${n.seed}${this.debugSceneExtra?"|"+JSON.stringify(this.debugSceneExtra):""}`,c=this.ring.length?this.ring[0].t:null,h=this.lastT!==null&&e.tModel<this.lastT-1e-6,u=this.lastT!==null&&(e.tModel>this.lastT+5||h&&(c===null||e.tModel<c-1e-6));this.worker&&(o!==this.key||u)&&this.restart(o!==this.key),this.key=o,this.scene=n,this.worker||this.start(e),this.pX?this.askPrograms(1):this.programs(r,e),this.take(r),this.timePoll(r);const l=this.lastT!==null&&e.tModel===this.lastT;if(this.track(e),this.want(e.tModel),e.dtSeconds>0&&!l&&(this.fdts.push(e.dtSeconds),this.fdts.length>31&&this.fdts.shift()),this.lastT=e.tModel,this.atlasActive){this.wide.time.advance(e.tModel,this.wide.A?.T??null,this.wide.B?.T??null,5*this.atlasBakeSlices/(this.debugWideMoving??1)),this.tables&&this.ring.length>=4&&this.programReady()&&((!l||!this.wide.B)&&this.wideStep(r,e,!0)&&this.stats.frames++,l&&this.wide.B&&this.stats.stillFrames++),this.trim();return}const m=performance.now(),p=this.debugN===null&&this.omega.rate>=yi;p?this.standSince=null:this.standSince??=m;const d=this.debugFine&&(this.debugN!==null||this.standSince!==null&&m-this.standSince>=dr);if(this.stepFine(d,m,l),this.stats.follow.rate=this.omega.rate,!this.tables||this.ring.length<4||!this.programReady()){this.ring.length>zt&&this.trim();return}const f=!l&&this.wideStep(r,e,p||!this.debugFine);if(p&&this.slice>0&&(this.slice=0,this.stats.follow.fineDropped++),!d){this.trim(),f&&this.stats.frames++;return}if(this.slice===0){const A=this.debugN??Math.max(e.lite?lr:this.opt.N,this.tq?this.autoN.n:this.tq===null?Ar:this.opt.N);this.nCur=A}const x=this.fdt(),b=this.nCur,E=l&&!!this.A&&!!this.B&&this.standingNeedsMap();if(E&&this.slice>0&&this.cur&&Math.abs(this.cur.T-e.tModel)>1e-6&&(this.slice=0),!this.A||!this.B){const A=performance.now();if(this.waitSince??=A,this.ring[this.ring.length-1].t<e.tModel+2*b*x+this.dtCur&&A-this.waitSince<1500)return;this.waitSince=null,this.A=this.fillMap(r,this.newMap(e),e.tModel),this.B=this.fillMap(r,this.newMap(e),e.tModel+b*x),this.Ta=this.A.T,this.Tb=this.B.T,this.slice=0,this.stats.first.maps??=performance.now(),this.rotFrames=0,this.rotN=b}else if(l&&!E){this.stats.stillFrames++;return}if(this.slice===0){if(this.acc=this.recenter(e,this.acc),this.cur=this.job(E?e.tModel:e.tModel+2*b*x,this.acc.cam),this.acc.T=this.cur.T,this.acc.kR=this.cur.X.S[1].msg.kR,this.stats.maps++,this.cur.miss&&this.stats.misses++,E&&this.stats.follow.standingMaps++,this.clearMap(r,this.acc),this.rememberMeterJob(this.acc,this.cur),this.drawRed(r,this.acc,this.cur),this.rotN=b,this.debugN===null&&this.tq){this.autoN=sr(this.autoN,gt(this.autoCost),x);const A=this.stats.auto;A.n=this.autoN.n,A.changes=this.autoN.changes,A.via="timer",A.mapMs=gt(this.autoCost)}else if(this.debugN===null&&this.tq===null){const A=this.stats.auto;A.n=b,A.via="frames"}}const v=this.timeBegin(r);if(this.drawSlice(r,this.acc,this.cur,this.slice,b),v&&this.timeEnd(r,v,b),++this.slice===b){this.noteShown(e.tModel,this.acc.T,this.Tb,this.cur);const A=this.A;this.A=this.B,this.B=this.acc,this.acc=A,this.Ta=this.Tb,this.Tb=this.B.T,this.slice=0,this.rotFrames=E?b:0}else this.rotFrames++;this.trim(),this.stats.frames++}catch(a){this.lost(r)||(this.stats.failed=a instanceof Error?a.message:String(a))}finally{this.fade(),le(r,s);const a=performance.now()-t;this.stats.mainMs.push(a),this.stats.mainMs.length>600&&this.stats.mainMs.shift()}}dispose(){this.meterWorker?.terminate(),this.meterWorker=null,this.meterRequest=null,this.meterResult=null,this.worker?.terminate(),this.worker=null,this.tableWorker?.terminate(),this.tableWorker=null,this.progQueue=[];const e=this.res;if(e&&!e.gl.isContextLost()){const t=e.gl;this.flush();for(const a of this.ring)for(const n of z)e.deleteBuffer(a.buf[n]);const r=this.wide,s=new Set([this.A,this.B,this.acc,r.A,r.B,r.acc,this.retiring?.A,this.retiring?.B,this.retiring?.wide?.A,this.retiring?.wide?.B]);for(const a of s)a&&(e.deleteTarget(a.core),e.deleteTarget(a.env));for(const a of[...this.tables??[],...this.referenceTables??[]])e.deleteTexture(a.tex),e.deleteTexture(a.coef);this.windowMass&&e.deleteTexture(this.windowMass),this.referenceRaster&&(t.deleteProgram(this.referenceRaster.prog),e.programs.delete(this.referenceRaster.prog)),this.kTex&&e.deleteTexture(this.kTex),this.redTex&&e.deleteTexture(this.redTex);for(const a of this.ptPool)e.deleteTexture(a.tex);this.out&&e.deleteBuffer(this.out.buf),this.quad&&e.deleteBuffer(this.quad);for(const a of[...Array.from(this.expandInputs.values(),n=>n.vao),this.vaoR,this.vaoD])a&&(t.deleteVertexArray(a),e.vaos.delete(a));this.tfo&&t.deleteTransformFeedback(this.tfo),this.pD&&(t.deleteProgram(this.pD.prog),e.programs.delete(this.pD.prog)),this.referenceCompose&&(t.deleteProgram(this.referenceCompose.prog),e.programs.delete(this.referenceCompose.prog));for(const a of[this.pX,this.pR,this.pRed,this.pC,...this.pM]){if(!a)continue;e.programs.delete(a.prog);const n=()=>{if(!t.isContextLost()){if(!a.done()){setTimeout(n,50);return}try{a.check()}catch{}t.deleteProgram(a.prog),e.deferred.delete(a.prog)}};n()}for(const a of[this.mS,this.mB,this.mF])a&&e.deleteTarget(a);for(const a of this.reads)t.deleteSync(a.sync),this.pbos.push(a.pbo);this.catchUp&&(t.deleteSync(this.catchUp),this.catchUp=null);for(const a of this.pbos)e.deleteBuffer(a);for(const a of this.tq?.pend??[])t.deleteQuery(a.q)}this.tq=void 0,this.pM=[],this.mS=this.mB=this.mF=null,this.pbos=[],this.reads=[],this.linked=!1,this.wide=qe(),this.phi=0,this.phiAt=null,this.standSince=null,this.res=null,this.ring=[],this.pending=[],this.tables=null,this.tablesAsked=!1,this.A=this.B=this.acc=null,this.cur=null,this.trash=[],this.retiring=null,this.retShare=0,this.retOut=null,this.outAt=null,this.w=0,this.lastWall=null,this.pX=this.pR=this.pD=this.pC=this.pRed=null,this.redTex=null,this.vaoR=this.vaoD=null,this.quad=null,this.tfo=null,this.out=null,this.kTex=null,this.ptPool=[],this.expandInputs.clear(),this.referenceCompose=null,this.lastSpectrum=null,this.referenceTables=null,this.referenceRaster=null,this.windowMass=null,this.cap={core:0,env:0,glow:0},this.inFlight=!1,this.lastT=null,this.key=""}start(e){const t=this.makeWorker();if(t.onmessage=r=>this.onMessage(r.data),t.onerror=r=>{this.stats.failed=`worker: ${r.message}`},this.worker=t,this.inFlight=!1,this.nextT=e.tModel-this.dtCur,this.post({cmd:"init",scene:this.scene,obs:[0,0],red:this.debugRedSource??"dynamic",light:!this.debugEmitStd,atlas:this.opt.fixedAtlas,forwardOnly:this.opt.fixedAtlas,...this.fastAtlasBake&&!this.debugEmitStd?{spacingKm:1}:{}}),!this.tablesAsked){this.tablesAsked=!0;const r=this.fastAtlasBake?[vr]:this.referenceBands(),s=(this.fastAtlasBake?"atlas:":"")+r.join(",");if(Ze?.bands===s)this.pendingTables=Ze.tables,this.stats.tablesMs=0,this.stats.first.tablesCached=!0;else{const a=this.tableWorker=this.makeWorker();a.onmessage=n=>{const o=n.data;if(o.cmd==="tables"){Ze={bands:s,tables:o.tables},this.pendingTables=o.tables,this.stats.tablesMs=o.ms;for(const c of this.waiters.splice(0))c()}else o.cmd==="error"&&(this.stats.failed=`worker: ${o.message}`);a.terminate(),this.tableWorker===a&&(this.tableWorker=null)},a.onerror=n=>{this.stats.failed=`worker: ${n.message}`},a.postMessage({cmd:"tables",bands:r,atlasFast:this.fastAtlasBake})}}}post(e){this.worker.postMessage(e)}restart(e=!1){this.worker?.terminate(),this.worker=null,this.stats.restarts++,e&&(this.lastReading=null,this.wx=null);const t=this.res,r=this.ring;r.length&&this.postMeter({cmd:"forget",ids:r.map(c=>c.msg.id)}),t&&this.defer(()=>{for(const c of r)for(const h of z)t.deleteBuffer(c.buf[h])}),this.ring=[],this.pending=[],this.cur=null,this.slice=0,this.cap={core:0,env:0,glow:0},this.waitSince=null;const s=this.maps(),a=this.wide,n=s?this.w:0,o=this.retiringShare(this.w);if(s&&n>0&&n>=o){const c=this.retiring;c&&this.defer(()=>this.delPair(c)),this.retiring={...s,wide:s.wide?{...s.wide}:null},this.retShare=n}else{for(const c of new Set([this.A,this.B,a.A,a.B]))c&&this.defer(()=>this.delMap(c));this.retiring&&(this.retShare=o)}if(a.acc){const c=a.acc;this.defer(()=>this.delMap(c))}this.wide=qe(),this.phi=0,this.phiAt=null,this.retOut=this.retiring&&(e||this.retOut!==null)?1:null,this.outAt=null,this.A=this.B=null,this.w=0,!this.tables&&!this.pendingTables&&!this.tableWorker&&(this.tablesAsked=!1)}debugWorkerSlow=1;debugEmitStd=!1;dtCur=Ge.dt;dtAt=-1/0;get dtNow(){return this.dtCur}batchP90(){const e=this.stats.workerMs.slice(-It);if(e.length<4)return 0;const t=[...e].sort((r,s)=>r-s);return t[Math.floor(.9*(t.length-1))]/1e3}adaptDt(){if(this.debugEmitStd||this.opt.dt!==ne[0]||this.stats.workerMs.length<It)return;const e=performance.now();if(e-this.dtAt<Rr)return;const t=this.batchP90(),r=ne.indexOf(this.dtCur);r<0||(t>Tr*this.dtCur&&r<ne.length-1?(this.dtCur=ne[r+1],this.dtAt=e):r>0&&t<wr*ne[r-1]&&(this.dtCur=ne[r-1],this.dtAt=e))}slowed=new WeakSet;onMessage(e){if(e.cmd==="state"&&this.debugWorkerSlow>1&&!this.slowed.has(e)){const t=this.debugWorkerSlow,r=this.worker,s={...e,ms:{...e.ms,total:e.ms.total*t}};this.slowed.add(s),setTimeout(()=>{this.worker===r&&this.onMessage(s)},(t-1)*e.ms.total);return}if(e.cmd==="error"){this.stats.failed=`worker: ${e.message}`;return}if(e.cmd==="tables"){this.pendingTables=e.tables,this.stats.tablesMs=e.ms;return}if(e.cmd==="state"){this.inFlight=!1,this.pending.push(e),this.stats.workerMs.push(e.ms.total),this.stats.workerMs.length>120&&this.stats.workerMs.shift(),this.stats.workerMsParts.push(e.ms),this.stats.workerMsParts.length>120&&this.stats.workerMsParts.shift(),this.adaptDt(),this.lastT!==null&&this.want(this.lastT);for(const t of this.waiters.splice(0))t()}}pendingTables=null;waiters=[];want(e){if(this.inFlight||!this.worker)return;const t=this.opt.fixedAtlas?this.atlasBakeSlices:He,s=2*Math.max(this.nCur,this.debugWide?5*t:0)*this.fdt()+2*this.dtCur+.3+(this.debugEmitStd?0:this.batchP90());this.nextT<=e+s&&(this.inFlight=!0,this.post({cmd:"state",id:++this.reqId,t:this.nextT,cull:null}),this.nextT+=this.dtCur)}take(e,t=!1){for(this.pendingTables&&(this.uploadTables(e,this.pendingTables),this.pendingTables=null);this.pending.length;){const r=this.pending.shift(),s=this.res,a={},n={};for(const o of z)this.grow(e,o,r.sets[o].n),n[o]=r.sets[o].n;for(const o of z){const c=e.createBuffer();s.buffers.add(c),e.bindBuffer(e.ARRAY_BUFFER,c),e.bufferData(e.ARRAY_BUFFER,Math.max(1,this.cap[o])*Z*4,e.DYNAMIC_DRAW),s.recordBuffer(c,Math.max(1,this.cap[o])*Z*4),n[o]&&e.bufferSubData(e.ARRAY_BUFFER,0,r.sets[o].data,0,n[o]*Z),this.stats.uploadBytes+=n[o]*Z*4,a[o]=c}e.bindBuffer(e.ARRAY_BUFFER,null),this.ring.push({t:r.t,k:r.k,n,buf:a,msg:r}),this.stats.states++,this.stats.first.state??=performance.now(),r.wx&&(this.wx=r.wx);for(const o of z)this.stats.slots[o]=Math.max(this.stats.slots[o],n[o]);this.meterWorker&&!t&&!this.debugHold&&this.postMeter({cmd:"state",state:r},this.debugKeepStates?[]:z.map(o=>r.sets[o].data.buffer))}}grow(e,t,r){if(r<=this.cap[t])return;const s=Math.max(4096,Math.ceil(r*1.5/1024)*1024),a=this.res,n=[];for(const o of this.ring){const c=e.createBuffer();a.buffers.add(c),e.bindBuffer(e.COPY_WRITE_BUFFER,c),e.bufferData(e.COPY_WRITE_BUFFER,s*Z*4,e.DYNAMIC_DRAW),a.recordBuffer(c,s*Z*4),o.n[t]&&(e.bindBuffer(e.COPY_READ_BUFFER,o.buf[t]),e.copyBufferSubData(e.COPY_READ_BUFFER,e.COPY_WRITE_BUFFER,0,0,o.n[t]*Z*4)),n.push(o.buf[t]),o.buf[t]=c}n.length&&this.defer(()=>{for(const o of n)a.deleteBuffer(o)}),e.bindBuffer(e.COPY_READ_BUFFER,null),e.bindBuffer(e.COPY_WRITE_BUFFER,null),this.cap[t]=s}trim(){const e=this.res,t=s=>!!(this.cur?.X.S.includes(s)||this.wide.job?.X.S.includes(s)),r=[];for(;this.ring.length>zt&&!t(this.ring[0]);){const s=this.ring.shift();r.push(s.msg.id),this.defer(()=>{for(const a of z)e.deleteBuffer(s.buf[a])})}r.length&&this.postMeter({cmd:"forget",ids:r})}stepFine(e,t,r){const s=this.phiAt===null?0:Math.min(.25,Math.max(0,(t-this.phiAt)/1e3));this.phiAt=t,!(r&&this.A&&this.B)&&(this.wide.A&&this.wide.B?e&&this.A&&this.B&&!this.standingNeedsMap()?this.phi=Math.min(1,this.phi+s/mr):this.phi=Math.max(0,this.phi-s/pr):this.phi=this.A&&this.B?1:0,this.stats.follow.fine=this.phi)}delPair(e){for(const t of new Set([e.A,e.B,e.wide?.A,e.wide?.B]))t&&this.delMap(t)}fade(){const e=performance.now(),t=this.lastWall===null?0:Xi((e-this.lastWall)/1e3);if(this.lastWall=e,this.debugFadeHold)return;const r=this.maps(),s=!!r&&!!r.A.reading&&!!r.B.reading;this.unmetered=r&&!s?this.unmetered+1:0,s&&(this.stats.first.metered??=e),this.w>=1&&(this.stats.first.faded??=e);const a=r!==null&&this.programReady()&&(s||this.w>0||!this.useBackgroundMeter()&&this.unmetered>Mr);this.retiring&&this.retOut!==null&&a&&(this.retOut=Math.max(0,this.retOut-t)),this.retOut===0&&this.outAt===null&&(this.outAt=e);const n=!!this.retiring&&this.retOut!==null&&(this.retOut>0||e-(this.outAt??e)<1e3*this.holdS),o=a&&(!n||this.w>0);if(this.w=o?Math.min(1,this.w+t):0,this.retiring&&this.w>=1){const c=this.retiring;this.retiring=null,this.retShare=0,this.retOut=null,this.outAt=null,this.defer(()=>this.delPair(c))}this.stats.w=this.w}programReady(){if(this.linked)return!0;if(this.progQueue.length||!this.pX||!this.pR||!this.pRed||!this.pC||this.pM.length<3)return!1;const e=[this.pX,this.pR,this.pRed,this.pC,...this.pM];if(!e.every(t=>t.done()))return!1;try{for(const t of e)t.check();return this.linked=!0,this.stats.first.linked??=performance.now(),!0}catch(t){return this.stats.failed=`zoneCurtainCompose: ${t instanceof Error?t.message:String(t)}`,!1}}askPrograms(e){for(let t=0;t<e&&this.progQueue.length;t++)this.progQueue.shift()()}linked=!1;defer(e){this.trash.push(e)}flush(){if(this.trash.length)for(const e of this.trash.splice(0))e()}fdt(){if(!this.fdts.length)return 1/60;const e=[...this.fdts].sort((t,r)=>t-r);return Math.min(.1,Math.max(1/240,e[e.length>>1]))}programs(e,t,r=!1){const s=t.res;if(!e.getExtension("EXT_color_buffer_float"))throw new Error("EXT_color_buffer_float missing");this.accFmt=et(t.floatBlend||!!e.getExtension("EXT_float_blend"))==="rgba32f"?e.RGBA32F:e.RGBA16F,this.stats.target=this.accFmt===e.RGBA32F?"rgba32f":"rgba16f",this.stats.first.programs??=performance.now(),this.progQueue=[()=>{this.pX=yr(e,s)},()=>{this.pR=s.programDeferred("zoneCurtainRaster",At,this.fastAtlasBake?Bi:Tt)},()=>{this.pRed=s.programDeferred("zoneCurtainRed",W,Pi)}],r||this.progQueue.push(()=>{this.pC=s.programDeferred("zoneCurtainCompose",W,this.opt.fixedAtlas?Ni:wt)},()=>{this.pM.push(s.programDeferred("zoneCurtainMeter",W,Di))},()=>{this.pM.push(s.programDeferred("zoneCurtainMeterBlock",W,Ui))},()=>{this.pM.push(s.programDeferred("zoneCurtainMeterFinal",W,Li))}),e.getExtension("KHR_parallel_shader_compile")?this.askPrograms(1/0):this.askPrograms(1),e.activeTexture(e.TEXTURE15),this.redTex=s.texture(Ae,1,e.RG32F,e.RG,e.FLOAT,new Float32Array(2*Ae)),e.activeTexture(e.TEXTURE0),this.vaoR=e.createVertexArray(),this.vaoD=e.createVertexArray();for(const n of[this.vaoR,this.vaoD])s.vaos.add(n);this.quad=e.createBuffer(),s.buffers.add(this.quad),s.recordBuffer(this.quad,Gt.byteLength),e.bindVertexArray(this.vaoR),e.bindBuffer(e.ARRAY_BUFFER,this.quad),e.bufferData(e.ARRAY_BUFFER,Gt,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);for(let n=1;n<=xe.length;n++)e.enableVertexAttribArray(n),e.vertexAttribDivisor(n,1);for(const n of z){const o=e.createVertexArray();s.vaos.add(o),e.bindVertexArray(o);for(let c=0;c<12;c++)e.enableVertexAttribArray(c);this.expandInputs.set(n,{vao:o,buffers:[]})}e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null),this.tfo=e.createTransformFeedback();const a=e.createBuffer();s.buffers.add(a),this.out={buf:a,cap:0},e.activeTexture(e.TEXTURE15),this.kTex=s.texture(9,g,e.RG32F,e.RG,e.FLOAT,Qs(9)),e.activeTexture(e.TEXTURE0)}localMeterMap=null;localMeterAtlas=null;localMeterAtlasId=-1;localMeterCrops=[];localMeterStateUse=[];localMeterSample=null;initMeterRaster(e,t){const r=e.gl;this.res=e,this.programs(r,{res:e,floatBlend:!!r.getExtension("EXT_float_blend")},!0),this.askPrograms(1/0);for(const s of[this.pX,this.pR,this.pRed])s.check();this.uploadTables(r,t),this.localMeterSample=e.program("zoneCurtainMeterMap",W,zi)}meterRasterOf(e,t,r,s){const a=this.res,n=s.n,{F:o,R:c,U:h}=ot(s.axis),u={f:[o[0],o[1],o[2]],r:[c[0],c[1],c[2]],up:[h[0],h[1],h[2]],tanH:s.tanR,size:n};let l=this.localMeterMap;if(!l||l.n!==n){l&&a.deleteTarget(l.core);const d=a.target(n,n,e.RGBA32F,e.RGBA);l=this.localMeterMap={cam:u,n,core:d,env:d,T:t.t,kR:t.kR,reading:null,readKey:"",gen:0,red:null,faceIndex:0}}l.cam=u,this.meterAtlasOf(e,t,r,l),e.bindFramebuffer(e.FRAMEBUFFER,l.core.fbo);const m=new Float32Array(n*n*4);e.readPixels(0,0,n,n,e.RGBA,e.FLOAT,m);const p=e.getError();if(p!==e.NO_ERROR||e.isContextLost())throw new Error(`worker meter raster WebGL error ${p}`);return m}meterGpuStates(e,t){const r=new Set(t.map(s=>s.id));this.localMeterStateUse=[...r,...this.localMeterStateUse.filter(s=>!r.has(s))].slice(0,8),this.ring=this.ring.filter(s=>{if(this.localMeterStateUse.includes(s.msg.id))return!0;for(const a of z)this.res.deleteBuffer(s.buf[a]);return!1});for(const s of new Set(t))this.ring.some(a=>a.msg.id===s.id)||this.pending.push(s);this.take(e,!0),this.flush()}meterAtlasOf(e,t,r,s){const a=this.res,n=s.cam,o=t.atlas,c=o[0].size;this.localMeterAtlas?.n!==c&&(this.localMeterAtlas&&this.delMap(this.localMeterAtlas),this.localMeterAtlas=this.newWideMap(o,!0),this.localMeterAtlasId=-1);const h=this.localMeterAtlas,u=[];for(let f=0;f<o.length;f++){const x=ur(n,o[f]);if(!x.length)continue;const{cube:b,...E}=this.faceOf(h,f);E.meterCrop={core:Nt(x,E.cam,E.core,!1),env:Nt(x,E.cam,E.env,E.env.w>E.env.h)},u.push(E)}const l=(f,[x,b,E,v])=>f[0]<=x&&f[1]<=b&&f[0]+f[2]>=x+E&&f[1]+f[3]>=b+v;if(!(this.localMeterAtlasId===t.id&&u.every(f=>{const x=this.localMeterCrops[f.faceIndex],b=f.meterCrop;return x&&l(x.core,b.core)&&l(x.env,b.env)}))){this.clearMap(e,h),this.meterGpuStates(e,r);const f=t.ids.map(E=>this.ring.find(v=>v.msg.id===E));this.scene={level:t.level};const x={T:t.t,X:{...t.interp,S:f},events:[],dropped:0,miss:!1,red:t.red,pt:t.pulse};this.cullAtlas(h,x);const b=this.atlasBakeSlices;this.localMeterCrops=[];for(const E of u){this.drawRed(e,E,x);for(let v=0;v<b;v++)this.drawSlice(e,E,x,v,b);this.localMeterCrops[E.faceIndex]=E.meterCrop}this.localMeterAtlasId=t.id}const p=this.localMeterSample,d=f=>p.loc.get(f);e.bindFramebuffer(e.FRAMEBUFFER,s.core.fbo),e.viewport(0,0,s.n,s.n),e.useProgram(p.prog),e.bindVertexArray(this.vaoD),e.uniform3fv(d("uMF"),n.f),e.uniform3fv(d("uMR"),n.r),e.uniform3fv(d("uMU"),n.up),e.uniform2f(d("mT"),h.cam.tanH,h.n),e.uniform1f(d("uN"),s.n),e.uniform1f(d("uTanR"),n.tanH),e.uniform1f(d("uAtlasFilter"),1),e.uniform1f(d("uCubic"),1),a.bindTex(0,h.core.tex,p,"uMap"),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}referenceBands(){return this.opt.envBands===16?[16]:[16,this.opt.envBands]}tablesFor(e,t){return!this.fastAtlasBake||t?this.tables:this.referenceTables??=this.res.transaction(()=>this.tableTextures(e,this.referenceBands().map(r=>Ks(Vs(li(),r)))))}tableTextures(e,t){const r=this.res;e.activeTexture(e.TEXTURE15);try{return t.map(s=>{const a=r.texture(s.meta.tiledW,s.meta.tiledH,e.RGBA16F,e.RGBA,e.HALF_FLOAT,s.half);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR);const n=r.texture(s.coefW,s.coefH,e.RGBA32F,e.RGBA,e.FLOAT,s.coef);return{meta:s.meta,tex:a,coef:n}})}finally{e.activeTexture(e.TEXTURE0)}}uploadTables(e,t){const r=this.res,s=t[0]?.windowMass;if(this.fastAtlasBake&&(!s||s.length!==2*Me*_e))throw new Error("invalid atlas window mass texture");const{tables:a,windowMass:n}=r.transaction(()=>{const o=this.tableTextures(e,t);let c=this.windowMass;if(s&&!c){e.activeTexture(e.TEXTURE15);try{c=r.texture(Me,_e,e.RG16F,e.RG,e.HALF_FLOAT,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR)}finally{e.activeTexture(e.TEXTURE0)}}return{tables:o,windowMass:c}});this.tables=a,this.windowMass=n,this.stats.tableLayers=t.map(o=>o.meta.layers),this.stats.first.tables??=performance.now()}ptOf(e,t,r,s){if(!e.length)return null;const a=this.scene.level;let n=this.refCpu.get(a);return n||(n=pi(ge[a]),this.refCpu.set(a,n)),vi(e,t,n,r,s)}wavesOf(e,t,r,s){const a=ge[this.scene.level],[n,o]=s?[-760,760]:this.footRange(r);return{x0:n,x1:o,ev:e.msg.wx?Fr(e.msg.wx.pulses,t,n,o,Lt):Ei(a,this.scene,t,n,o,Lt)}}ptTexOf(e,t){let r=this.ptPool.find(n=>n.job===t);if(r)return r.tex;const s=this.res;e.activeTexture(e.TEXTURE15),this.ptPool.length<3?(r={tex:s.texture(as,3,e.RGBA32F,e.RGBA,e.FLOAT,null),job:null},this.ptPool.push(r)):(r=this.ptPool.shift(),this.ptPool.push(r));const a=t.pt;return e.bindTexture(e.TEXTURE_2D,r.tex),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texSubImage2D(e.TEXTURE_2D,0,0,0,a.n,3,e.RGBA,e.FLOAT,a.data),e.activeTexture(e.TEXTURE0),r.job=t,r.tex}mapCameraOf(e,t=this.opt.margin,r=1){const[s,a,n]=e.dir,o=Math.atan2(s,a)*180/Math.PI,c=Math.asin(Math.max(-1,Math.min(1,n)))*180/Math.PI,h=Math.min(150,Math.max(.5,e.fovDeg)),u=Math.min(e.pitchDeg??this.opt.pitchDegMax,h/128)*r;let l=St(o,c,h,Math.round(h/u),t);return l.size>this.opt.maxMapSize&&(l=St(o,c,h,Math.round(h/u*this.opt.maxMapSize/l.size),t)),l}track(e){const t=performance.now(),r=[e.dir[0],e.dir[1],e.dir[2]],s=this.hist;for(this.view={dir:r,fovDeg:e.fovDeg},s.push({t,d:r});s.length>2&&t-s[0].t>150;)s.shift();this.omega=s.length>=2&&t-s[0].t<=400?Mi(s):{axis:[0,0,1],rate:0}}standingNeedsMap(){const e=this.view;if(!e||!this.A||!this.B)return!1;const t=Et(e.dir,e.fovDeg*Math.PI/360,this.A.cam,this.B.cam,null,this.alphaNow(),this.nCur,9);return t.sA+t.sB<t.n-.001}wideStep(e,t,r){const s=this.wide;if(!this.debugWide||this.debugMaps)return!1;const a=this.opt.fixedAtlas,n=a?this.atlasBakeSlices:He,o=n*5,c=this.debugWideMoving??(a?1:r?fr:1);let h=!1;for(let u=0;u<c;u++){if(!s.job){const l=o/c*this.fdt(),m=this.atlasActive?Yi(t.tModel,l,this.ring[0].t,this.ring.at(-1).t,s.B?.T??null):t.tModel+2*l;if(m===null)return h;s.acc??=a?this.newAtlas():this.newWideMap(ks(Dt)),s.job=this.job(m,s.acc.cam,!0),a&&this.cullAtlas(s.acc,s.job),s.acc.T=s.job.T,s.acc.kR=s.job.X.S[1].msg.kR,s.slice=0,s.startedAt=performance.now(),s.job.miss&&this.stats.follow.wideMisses++,this.clearMap(e,s.acc),this.rememberMeterJob(s.acc,s.job),this.drawRed(e,s.acc,s.job)}if(s.slice<o){const l=this.faceOf(s.acc,s.slice%5),m=this.expandSlice(e,s.job.X,Math.floor(s.slice/5),n,l,s.job);this.rasterSlice(e,l,m,s.job),s.slice++,h=!0}if(s.slice===o){if(this.atlasActive&&!s.time.mayRotate(s.B?.T??null))return h;a&&(this.noteShown(t.tModel,s.acc.T,s.B?.T??-1/0,s.job),this.stats.first.maps??=performance.now(),s.time.shown??=s.acc.T);const l=s.A;s.A=s.B,s.B=s.acc,s.acc=l,s.job=null,s.rot=0;const m=this.stats.follow;m.wideMaps++,m.wideFrames=o/c,m.wideMs=performance.now()-s.startedAt,m.wideSize=s.B.n}else s.rot++}return h}cullAtlas(e,t){const r=t.X.S;if(!this.debugAtlasCull||r.some(n=>!n.msg.bounds))return;const s={},a=this.atlasSlots;a.faces.fill(0),a.all=0;for(const n of z){const o=r.map(u=>u.msg.sets[n]),c=Math.max(...o.map(u=>u.n)),h=Vi(o,r.map(u=>u.msg.bounds[n]),t.X.w,e.cube,this.opt.cut,2/(n==="core"?e.n/2:e.env.h));for(let u=0;u<h.length;u++)for(const[,l]of h[u])a.faces[u]=a.faces[u]+l;a.all+=c*h.length,s[n]=h}a.kept=a.faces.reduce((n,o)=>n+o,0),t.spans=s}newWideMap(e,t=!1){const r=this.res,s=r.gl,a=e[0].size;s.activeTexture(s.TEXTURE15);const n=a/(t?Ut:2),o=r.target(5*a,a+(t?n:0),t?s.RGBA16F:this.accFmt,s.RGBA),c=t?{...o,w:7*n,h:n,y0:a}:r.target(5*n,n,this.accFmt,s.RGBA),h={cam:e[0],n:a,core:o,env:c,T:0,kR:0,reading:null,readKey:"",gen:0,red:null,cube:e,filtered:t};return t&&(s.bindTexture(s.TEXTURE_2D,o.tex),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.LINEAR)),s.activeTexture(s.TEXTURE0),h}faceOf(e,t){const r=e.n,s=e.env.h,a={...e.core,...e.filtered?Bs(t,r):{w:r,h:r,x0:t*r}},n={...e.env,...e.filtered?gs(t,r,s):{w:s,h:s,x0:t*s}};return{...e,faceIndex:t,cam:e.cube[t],core:a,env:n}}newMap(e,t=this.mapCameraOf(e)){const r=this.res,s=r.gl;s.activeTexture(s.TEXTURE15);const a={cam:t,n:t.size,core:r.target(t.size,t.size,this.accFmt,s.RGBA),env:r.target(t.size/2,t.size/2,this.accFmt,s.RGBA),T:0,kR:0,reading:null,readKey:"",gen:0,red:null};return s.activeTexture(s.TEXTURE0),a}delMap(e){this.releaseMeterJob(e),e.gen++;const t=this.res;t&&(t.deleteTarget(e.core),e.env.fbo!==e.core.fbo&&t.deleteTarget(e.env))}recenter(e,t){const r=this.mapCameraOf(e);if(t&&t.n===r.size)return t.cam=r,t;if(t){const s=t;this.defer(()=>this.delMap(s))}return this.newMap(e,r)}clearMap(e,t){this.releaseMeterJob(t),t.reading=null,t.readKey="",t.gen++,e.disable(e.SCISSOR_TEST);for(const r of t.core.fbo===t.env.fbo?[t.core]:[t.core,t.env])e.bindFramebuffer(e.FRAMEBUFFER,r.fbo),e.viewport(0,0,r.w,r.h),e.clearBufferfv(e.COLOR,0,[0,0,0,0])}rememberMeterJob(e,t){if(!this.useBackgroundMeter()||this.debugHold||!e.filtered||!e.cube)return;const{S:r,w:s,u2:a,wc:n}=t.X,o=r.map(c=>c.msg.id);e.meterJob={id:++this.meterMapId,t:t.T,level:this.scene.level,ids:o,interp:{w:s,u2:a,wc:n},kR:r[1].msg.kR,red:t.red,pulse:t.pt,atlas:e.cube,atlasFast:this.fastAtlasBake},this.postMeter({cmd:"pin",ids:o})}releaseMeterJob(e){e.meterJob&&(this.postMeter({cmd:"unpin",ids:e.meterJob.ids}),e.meterJob=null)}job(e,t,r=!1){const s=this.ring;let a=-1;for(let x=0;x<s.length-1;x++)s[x].t<=e+1e-9&&(a=x);let n=!1;a<0&&(a=0),e>s[s.length-1].t+1e-9&&(n=!0,e=s[s.length-1].t,a=s.length-2);const o=!s[a+2],c=s[Math.max(0,a-1)],h=s[a],u=s[a+1],l=s[a+2]??(this.stats.miss3++,u),m=Math.min(1,Math.max(0,(e-h.t)/(u.t-h.t))),{x0:p,x1:d,ev:f}=this.wavesOf(h,e,t,r);return this.stats.eventsDropped+=f.dropped,{T:e,X:{S:[c,h,u,l],..._t(this.opt.mode,m)},events:f.events,dropped:f.dropped,miss:n,red:Ot(h,u,m),miss3:o,pt:this.ptOf(f.events,e,p,d)}}footRange(e){let t=1/0,r=-1/0;for(const s of[-1,0,1])for(const a of[-1,0,1]){const n=[0,1,2].map(h=>e.f[h]+s*e.tanH*e.r[h]+a*e.tanH*e.up[h]),o=Math.hypot(n[0],n[1],n[2]),c=n[2]/o;if(!(c>.02)){t=Math.min(t,-700),r=Math.max(r,700);continue}for(const h of[84,300]){const u=Zs(h,c)*n[0]/o;t=Math.min(t,u),r=Math.max(r,u)}}return[Math.max(-760,t-60),Math.min(760,r+60)]}fillMap(e,t,r){const s=this.job(r,t.cam,!!t.cube),a=t.filtered?this.atlasBakeSlices:this.nCur;t.filtered&&this.cullAtlas(t,s),t.T=s.T,t.kR=s.X.S[1].msg.kR,t.pt=s.pt,this.clearMap(e,t),this.rememberMeterJob(t,s),this.drawRed(e,t,s);for(let n=0;n<a;n++)this.drawSlice(e,t,s,n,a);return t}drawRed(e,t,r){t.red=r.red;const s=this.pRed;if(!s||!this.redTex||!r.red||this.debugRedOff)return;const a=Ae,n=new Float32Array(2*a);for(let c=0;c<a;c++)n[2*c]=r.red.A[c],n[2*c+1]=r.red.Y[c];e.activeTexture(e.TEXTURE15),e.bindTexture(e.TEXTURE_2D,this.redTex),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texSubImage2D(e.TEXTURE_2D,0,0,0,a,1,e.RG,e.FLOAT,n),e.useProgram(s.prog),e.bindVertexArray(this.vaoD),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD),e.colorMask(!1,!1,!0,!1);const o=c=>s.loc.get(c);e.uniform2f(o("uObs"),0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.redTex),e.uniform1i(o("uLine"),0),e.bindFramebuffer(e.FRAMEBUFFER,t.env.fbo);for(const c of t.cube?t.cube.map((h,u)=>this.faceOf(t,u)):[t]){const h=c.cam,u=c.env,l=u.x0??0,m=u.y0??0;e.viewport(l,m,u.w,u.h),c.meterCrop&&(e.enable(e.SCISSOR_TEST),e.scissor(...c.meterCrop.env)),e.uniform3fv(o("uF"),h.f),e.uniform3fv(o("uR"),h.r),e.uniform3fv(o("uU"),h.up),e.uniform1f(o("uTanH"),h.tanH),e.uniform2f(o("uRasterSize"),u.w,u.h),e.uniform1f(o("uSwapXY"),u.w>u.h?1:0),e.uniform1f(o("uOff"),l),e.uniform1f(o("uYOff"),m),e.drawArrays(e.TRIANGLES,0,3)}e.colorMask(!0,!0,!0,!0),e.disable(e.BLEND),e.bindVertexArray(null),t.meterCrop&&e.disable(e.SCISSOR_TEST),this.stats.redPasses++}drawSlice(e,t,r,s,a){let n=[];for(const o of t.cube?t.cube.map((c,h)=>this.faceOf(t,h)):[t])n=this.expandSlice(e,r.X,s,a,o,r),this.rasterSlice(e,o,n,r);return n}groups(e=this.tables){return _r(e.length>1?1:0)}sliceSegs(e,t,r){const s=this.tablesFor(this.res.gl,r?!!r.filtered:this.opt.fixedAtlas);return this.groups(s).reduce((a,n)=>a+Math.ceil(s[n.tab].meta.B/t)*Math.max(...e.S.map(o=>o.n[n.set])),0)}expandSlice(e,t,r,s,a,n=null){const o=this.tablesFor(e,!!a.filtered),c=this.pX,h=this.out,u=this.groups(o),l=a.cam,m=u.map(v=>a.faceIndex!==void 0&&n?.spans?n.spans[v.set][a.faceIndex]:[[0,Math.max(...t.S.map(A=>A.n[v.set]))]]),p=m.map(v=>v.reduce((A,[,R])=>A+R,0)),d=u.reduce((v,A,R)=>v+Math.ceil(o[A.tab].meta.B/s)*p[R],0);if(!d)return this.stats.segsLastSlice=0,[];d*$*4>h.cap&&(h.cap=Math.ceil(d*$*4*1.25),e.bindBuffer(e.ARRAY_BUFFER,h.buf),e.bufferData(e.ARRAY_BUFFER,h.cap,e.DYNAMIC_COPY),this.res.recordBuffer(h.buf,h.cap),e.bindBuffer(e.ARRAY_BUFFER,null)),e.useProgram(c.prog),e.enable(e.RASTERIZER_DISCARD);const f=v=>c.loc.get(v);e.uniform3fv(f("uF"),l.f),e.uniform3fv(f("uR"),l.r),e.uniform3fv(f("uU"),l.up),e.uniform1f(f("uTanH"),l.tanH),e.uniform4fv(f("uCW"),Float32Array.from(t.w)),e.uniform1f(f("uU2"),t.u2),e.uniform1f(f("uWC"),t.wc),e.uniform1f(f("uSlice"),r),e.uniform1f(f("uNS"),s),e.uniform1f(f("uCutB"),this.opt.cut),e.uniform1f(f("uObsX"),0),e.uniform1f(f("uTightBounds"),a.filtered?1:0);const x=n?.pt??null;if(x){const v=this.ptTexOf(e,n);e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,v)}e.uniform1i(f("uPT"),3),e.uniform4f(f("uPTD"),x?.x0??0,x?.dx??1,x?.n??1,x?1:0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,this.kTex),e.uniform1i(f("uK"),1),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,this.tfo),d&&(e.bindBufferRange(e.TRANSFORM_FEEDBACK_BUFFER,0,h.buf,0,d*$*4),e.beginTransformFeedback(e.POINTS));const b=[];let E=0;for(const[v,A]of u.entries()){const R=o[A.tab],y=R.meta,M=Math.ceil(y.B/s),w=p[v];if(!w){b.push({tgt:A.tgt,tab:A.tab,pulse:A.pulse,first:E,count:0});continue}const{w:k,h:C}=a[A.tgt],T=A.tgt==="env"&&k>C;e.uniform1f(f("uPx"),2/Math.min(k,C)),a.filtered&&this.debugAtlasPixelPadding?e.uniform2f(f("uAtlasPixel"),2/(T?C:k),2/(T?k:C)):e.uniform2f(f("uAtlasPixel"),0,0),e.uniform1f(f("uB"),y.B),e.uniform1f(f("uBW"),y.bandW),e.uniform1f(f("uNG"),y.ngroup),e.uniform1f(f("uGR"),y.groupRows),e.uniform1f(f("uNL"),y.nl),e.uniform1f(f("uPulse"),A.pulse),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,R.coef),e.uniform1i(f("uCoef"),2);const _=this.expandInputs.get(A.set);e.bindVertexArray(_.vao),t.S.forEach((S,B)=>{const F=S.buf[A.set];if(_.buffers[B]!==F){e.bindBuffer(e.ARRAY_BUFFER,F);for(let U=0;U<3;U++)e.vertexAttribPointer(3*B+U,4,e.FLOAT,!1,Z*4,16*U);_.buffers[B]=F}}),e.bindBuffer(e.ARRAY_BUFFER,null);for(let S=0;S<M;S++){e.vertexAttrib1f(12,S);for(const[B,F]of m[v])e.drawArrays(e.POINTS,B,F)}b.push({tgt:A.tgt,tab:A.tab,pulse:A.pulse,first:E,count:M*w}),E+=M*w}return d&&e.endTransformFeedback(),e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER,0,null),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,null),e.disable(e.RASTERIZER_DISCARD),e.bindVertexArray(null),e.activeTexture(e.TEXTURE0),this.stats.segsLastSlice=E,b}rasterSlice(e,t,r,s){if(!r.length)return;const a=this.fastAtlasBake&&t.filtered,n=this.tablesFor(e,!!t.filtered),o=this.fastAtlasBake&&!a?this.referenceRaster??=this.res.program("zoneCurtainReferenceRaster",At,Tt):this.pR,c=t.cam,h=m=>o.loc.get(m);e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.useProgram(o.prog),e.bindVertexArray(this.vaoR),a&&this.res.bindTex(1,this.windowMass,o,"uWindowMass"),e.uniform3fv(h("uF"),c.f),e.uniform3fv(h("uR"),c.r),e.uniform3fv(h("uU"),c.up),e.uniform1f(h("uTanH"),c.tanH),e.uniform1f(h("uCut2"),this.opt.cut**2),e.uniform1f(h("uPInv"),1/(ge[this.scene.level].pulse5?.sig??14)),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD);let u=null,l=-1;e.bindBuffer(e.ARRAY_BUFFER,this.out.buf);for(const m of r){if(!m.count)continue;const p=m.tgt==="env"?t.env:t.core;if(p!==u){p.fbo!==u?.fbo&&e.bindFramebuffer(e.FRAMEBUFFER,p.fbo),u=p;const d=p,f=d.x0??0,x=d.y0??0;e.viewport(f,x,p.w,p.h),e.uniform2f(h("uRasterSize"),p.w,p.h),e.uniform1f(h("uOff"),f),e.uniform1f(h("uYOff"),x),t.meterCrop&&(e.enable(e.SCISSOR_TEST),e.scissor(...t.meterCrop[m.tgt])),e.uniform1f(h("uSwapXY"),m.tgt==="env"&&p.w>p.h?1:0)}if(m.tab!==l){l=m.tab;const d=n[m.tab],f=d.meta;e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,d.tex),e.uniform1i(h("uTab"),0),e.uniform1f(h("uBW"),f.bandW),e.uniform1f(h("uN"),f.n),e.uniform4f(h("uTabD"),f.width,f.height,f.tilesX,f.tiledW),e.uniform1f(h("uTexH"),f.tiledH)}for(let d=0;d<xe.length;d++)e.vertexAttribPointer(1+d,4,e.FLOAT,!1,$*4,(m.first*$+4*d)*4);e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,m.count)}e.bindBuffer(e.ARRAY_BUFFER,null),e.disable(e.BLEND),e.bindVertexArray(null),e.activeTexture(e.TEXTURE0),t.meterCrop&&e.disable(e.SCISSOR_TEST)}bindMaps(e,t,r,s,a=!1){const n=r.wide??null,o=r.fine??1;if(n?.A.filtered&&n.B.filtered&&o===0){const c=n.alpha===1?n.B:n.A,h=c===n.B?0:n.alpha;if(e.activeTexture(e.TEXTURE0+s),e.bindTexture(e.TEXTURE_2D,c.core.tex),e.activeTexture(e.TEXTURE1+s),e.bindTexture(e.TEXTURE_2D,n.B.core.tex),e.uniform1i(t.loc.get("cC"),s),e.uniform1i(t.loc.get("dC"),s+1),!a){for(const u of["aC","aE","bC","bE","cE"])e.uniform1i(t.loc.get(u),s);e.uniform1i(t.loc.get("dE"),s+1),e.uniform1f(t.loc.get("uFine"),0),e.uniform1f(t.loc.get("uHasW"),1)}e.uniform2f(t.loc.get("cT"),n.A.cam.tanH,n.A.n),e.uniform1f(t.loc.get("uAlphaW"),h),e.uniform1f(t.loc.get("uKC"),r.A.kR>0?n.A.kR/r.A.kR:1),e.uniform1f(t.loc.get("uCubic"),this.debugCubic?1:0),e.uniform1f(t.loc.get("uAtlasFilter"),1);return}[["a",r.A,s],["b",r.B,s+2],["c",n?.A??r.A,s+4],["d",n?.B??r.B,s+6]].forEach(([c,h,u])=>{(c==="a"||c==="b")&&(e.uniform3fv(t.loc.get(c+"F"),h.cam.f),e.uniform3fv(t.loc.get(c+"R"),h.cam.r),e.uniform3fv(t.loc.get(c+"U"),h.cam.up),e.uniform2f(t.loc.get(c+"T"),h.cam.tanH,h.n)),e.activeTexture(e.TEXTURE0+u),e.bindTexture(e.TEXTURE_2D,h.core.tex),e.uniform1i(t.loc.get(c+"C"),u),e.activeTexture(e.TEXTURE1+u),e.bindTexture(e.TEXTURE_2D,h.env.tex),e.uniform1i(t.loc.get(c+"E"),u+1)}),e.uniform2f(t.loc.get("cT"),n?n.A.cam.tanH:1,n?n.A.n:2),e.uniform1f(t.loc.get("uAlpha"),r.alpha),e.uniform1f(t.loc.get("uReveal"),cs(r.alpha,this.nCur)),e.uniform1f(t.loc.get("uFine"),n?o:1),e.uniform1f(t.loc.get("uHasW"),n?1:0),e.uniform1f(t.loc.get("uAlphaW"),n?.alpha??0),e.uniform1f(t.loc.get("uKC"),n&&r.A.kR>0?n.A.kR/r.A.kR:1),e.uniform1f(t.loc.get("uCubic"),this.debugCubic?1:0),e.uniform1f(t.loc.get("uAtlasFilter"),n?.A.filtered?1:0)}debugCubic=!0;display(e,t,r,s,a,n,o=null,c=1){const h=this.res;this.pD??=h.program("zoneCurtainDisplay",W,gi);const u=this.pD;e.useProgram(u.prog),e.bindVertexArray(this.vaoD),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,t.fbo),e.viewport(0,0,t.w,t.h),e.uniform3fv(u.loc.get("uF"),r.f),e.uniform3fv(u.loc.get("uR"),r.r),e.uniform3fv(u.loc.get("uU"),r.up),e.uniform1f(u.loc.get("uTanH"),r.tanH),e.uniform1f(u.loc.get("uSize"),t.w);const l=o&&"A"in o&&"alpha"in o?o:null;this.bindMaps(e,u,{A:s,B:a,alpha:n,wide:l,fine:c},0),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),e.activeTexture(e.TEXTURE0)}debugShown(e,t,r){const s=this.maps();s&&((s.fine??1)===0&&s.wide?this.display(e,t,r,s.wide.A,s.wide.B,s.wide.alpha,s.wide,0):this.display(e,t,r,s.A,s.B,s.alpha,s.wide??null,s.fine??1))}debugShownOf(e,t,r,s){s.cube?this.display(e,t,r,s,s,0,{A:s,B:s,alpha:0},0):this.display(e,t,r,s,s,0,null,1)}debugReferenceKinds=["fine","wide"];debugReference(e,t,r){if(this.lastT===null||this.ring.length<4)return null;const s=he(e),a={dir:[r.dir[0],r.dir[1],r.dir[2]],fovDeg:r.fovDeg};try{const n=Math.min(this.opt.pitchDegMax,Math.min(150,Math.max(.5,r.fovDeg))/128),o=this.newMap(a,t==="wide"?this.mapCameraOf(a,this.opt.margin,Dt/n):this.mapCameraOf(a));return this.fillMap(e,o,this.lastT)}finally{le(e,s)}}debugReferenceDone(e){this.delMap(e)}debugState(){return{ring:this.ring.map(e=>({t:e.t,k:e.k,sets:e.msg.sets})),tables:this.tables?.map(e=>e.meta)??null,scene:this.scene,A:this.A,B:this.B,Ta:this.Ta,Tb:this.Tb,trash:this.trash.length,w:this.w,retiring:this.retiring!==null,retShare:this.retShare}}debugJob(e,t,r,s){const a=e.map(h=>this.ring[h]),{x0:n,x1:o,ev:c}=this.wavesOf(a[1],r,s,!1);return{T:r,X:{S:a,..._t(this.opt.mode,t)},events:c.events,dropped:c.dropped,miss:!1,red:Ot(a[1],a[2],t),pt:this.ptOf(c.events,r,n,o)}}async debugRun(e,t,r,s,a){this.res=t,this.worker&&this.restart(),this.flush(),this.scene=r,this.key=JSON.stringify(r),this.lastT=null,this.start({tModel:s[0]+this.opt.dt}),this.pX||this.programs(e,{res:t,floatBlend:a}),this.askPrograms(1/0),this.inFlight=!0;for(const c of s)this.post({cmd:"state",id:++this.reqId,t:c,cull:null});const n=performance.now();for(;this.pending.length<s.length||!(this.tables||this.pendingTables)||!this.programReady();){if(this.stats.failed)throw new Error(this.stats.failed);if(performance.now()-n>12e4)throw new Error("zoneCurtain debugRun: no states after 120 s");await new Promise(c=>{this.waiters.push(c),setTimeout(c,100)})}const o=he(e);try{this.take(e,!0)}finally{le(e,o)}}readOut(e,t,r){const s=new Float32Array(r*$);return e.bindBuffer(e.ARRAY_BUFFER,this.out.buf),e.getBufferSubData(e.ARRAY_BUFFER,t*$*4,s),e.bindBuffer(e.ARRAY_BUFFER,null),s}readTarget(e,t){const r=new Float32Array(t.w*t.h*4);return e.bindFramebuffer(e.FRAMEBUFFER,t.fbo),e.readPixels(t.x0??0,t.y0??0,t.w,t.h,e.RGBA,e.FLOAT,r),r}}const Br=Ye();function ps(i,e=i.view.centerMm){const t=i.horizonFrame,r=i.view.point,s=i.view.skyFrame,a=i.geometry.focalMm;if(!t||!s)return null;const n=[e[0]/a,e[1]/a,1],o=[0,1,2].map(l=>r[l]*n[0]+r[3+l]*n[1]+r[6+l]*n[2]);if(!(o[2]>1e-6))return null;const c=[0,1,2].map(l=>s.axis[l]+o[0]/o[2]*s.west[l]+o[1]/o[2]*s.north[l]),h=Math.hypot(c[0],c[1],c[2]),u=l=>(c[0]*l[0]+c[1]*l[1]+c[2]*l[2])/h;return[u(t.east),u(t.north),u(t.zenith)]}const Qe={testSeed:null,on:Ns(typeof location<"u"?location.search:null)},Je=new WeakMap,gr=Yt.prototype.active;Yt.prototype.active=function(i){this.zoneCurtain&&(this.zoneCurtain.meterOptics=this.setup?.zoneMeterOptics??null,this.zoneCurtain.meterWake=this.setup?.zoneMeterWake,this.zoneCurtain.meterHeld=this.setup?.zoneMeterHeld??!1);const e=gr.call(this,i),t=this;return Je.delete(this),e&&t.prog===null&&t.state&&this.setup?.scene==="auroral-zone"&&(this.zoneCurtain?this.zoneCurtain.atlasActive:Qe.on)&&(Nr(this,i,t.state),Je.set(this,i)),e};function Nr(i,e,t){if(Je.get(i)===e)return i.zoneCurtain;const r=ps(e);if(!r)return i.zoneCurtain;let s=i.zoneCurtain;if(!s){s=i.zoneCurtain=new kr({fixedAtlas:Qe.on},void 0,Ps({pinned:Qe.testSeed??$e.zoneSeed,automated:typeof navigator<"u"&&navigator.webdriver===!0,reducedMotion:ys(),random:Ds}),Os(typeof location<"u"?location.search:null,typeof navigator<"u"&&navigator.webdriver===!0)),s.caps=Cr(e.gl,e.res,e.floatBlend),s.caps.reason&&(s.stats.failed=`capability: ${s.caps.reason}`),s.caps.reason&&console.warn("[zoneCurtain] this device cannot run the new curtain; the old aurora stays:",s.caps.reason);const m=new URLSearchParams(typeof location>"u"?"":location.search);s.debugKeepStates=m.get("zoneKeepStates")==="1",!s.stats.failed&&s.opt.fixedAtlas&&m.get("zoneMeterRef")!=="1"&&s.enableBackgroundMeter(()=>new Worker(new URL(""+new URL("zone-meter.worker-B_D2m5Y_.js",import.meta.url).href,import.meta.url),{type:"module"}))}s.meterOptics=i.setup?.zoneMeterOptics??null,s.meterWake=i.setup?.zoneMeterWake,s.meterHeld=i.setup?.zoneMeterHeld??!1;const a=e.geometry,n=2*Math.atan(a.cathodeRadiusMm/a.focalMm)*180/Math.PI,o=Ms(a.pitchMm,a.focalMm)*Math.atan(a.pitchMm/a.focalMm)*180/Math.PI,c=Pr(e.gl,s),h=s.stats.frames,u=$t.getState().view.integrationMs,l=u>0?u/1e3:_s;return s.frame({gl:e.gl,res:e.res,tModel:t.timeS-(i.setup?.startS??0),dir:r,fovDeg:n,level:t.level??0,seed:s.seed,floatBlend:e.floatBlend,dtSeconds:e.dtSeconds,lite:t.detail==="lite",pitchDeg:o,holdS:l}),c&&Or(e.gl,c,s.stats.frames>h),s}const xs={on:!1,sliceMs:[],otherMs:[],disjoint:0,queries:[]};function Pr(i,e){const t=xs;if(!t.on&&!t.queries.length||e.caps?.timerQuery===!1)return null;const r=i.getExtension("EXT_disjoint_timer_query_webgl2");if(!r)return null;for(;t.queries.length;){const{q:a,slice:n}=t.queries[0];if(!i.getQueryParameter(a,i.QUERY_RESULT_AVAILABLE))break;t.queries.shift(),i.getParameter(r.GPU_DISJOINT_EXT)?t.disjoint++:(n?t.sliceMs:t.otherMs).push(Number(i.getQueryParameter(a,i.QUERY_RESULT))/1e6),i.deleteQuery(a)}if(!t.on||t.queries.length>=8)return null;const s=i.createQuery();return s&&i.beginQuery(r.TIME_ELAPSED_EXT,s),s}function Or(i,e,t){const r=i.getExtension("EXT_disjoint_timer_query_webgl2");i.endQuery(r.TIME_ELAPSED_EXT),xs.queries.push({q:e,slice:t})}function Hr(i,e,t,r,s,a){const n=$e.zoneCurtainDebug>0?$e.zoneCurtainDebug:1;i.compose(e.gl,r.u_auRate,r.u_auClass,t.level??0,n,o=>{e.viewUniforms(o),e.bindHorizon(o,0),e.bindLut(o,1),e.res.bindTex(10,s,o,"u_auExt"),e.res.bindTex(11,a,o,"u_cloud"),Zt(e.gl,o,{u_auExtOn:r.u_auExtOn,u_auRatioCap:r.u_auRatioCap,...Rs(t.cloud)})},()=>e.draw(),t.extinction)}function qr(i,e,t,r){const s=ps(e,[0,0]);if(!s)return;const a=e.geometry;i.meter(e.gl,{axis:s,radiusDeg:Math.atan(a.cathodeRadiusMm/a.focalMm)*180/Math.PI,level:t.level??0,cls:Br,rates:t.rates,ext:t.extinction,snapshot:$t.getState().view.paused,bind:n=>{e.bindHorizon(n,0),e.bindLut(n,1),e.res.bindTex(4,r,n,"u_auExt"),Zt(e.gl,n,{u_auExtOn:t.extinction?1:0})}})}export{ps as viewAxisEnu,Qe as zoneAtlas,Hr as zoneCompose,Nr as zoneFrame,xs as zoneGpuTimer,qr as zoneMeter};
