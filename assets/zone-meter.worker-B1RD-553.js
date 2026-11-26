function ml(t,e=!1){const o=new URLSearchParams(t??"");if(e)for(const c of["tour","eyecal","news","ach"])o.has(c)||o.set(c,"0");if(e)for(const c of["meteors","aurora"])o.has(c)||o.set(c,"0");const s=o.get("lang"),a=o.get("warp"),n=o.get("skyCheck"),r=Number(o.get("zoneCurtainDebug")??0),i=o.get("zoneSeed"),l=i===null||i.trim()===""?NaN:Number(i);return{hasLocation:t!==null,lang:s==="zh"||s==="en"?s:null,noGl:o.has("nogl"),crashTest:o.has("crashtest"),devHooks:o.get("sky")==="free"||n==="1",skyCheck:n==="1",skyCheckValue:n,verify:o.has("verify"),verifyQuick:o.get("verify")==="quick",tour:o.get("tour"),ach:o.get("ach"),news:o.get("news"),eyecal:o.get("eyecal"),intro:o.has("intro"),adapt:o.get("adapt")==="1",warp:a==="1"?1:a==="2"?2:a==="3"?3:null,zoomPitch:o.get("zoomPitch"),deepStars:o.get("deepStars"),starSubtract:o.get("starSubtract")==="1",installSheet:o.get("installSheet")==="1",continuousHighlight:o.get("continuousHighlight")!=="0",shaderFail:o.get("shaderFail"),spotPairOff:o.get("spotPair")==="0",probeFault:o.get("probeFault"),meteors:o.get("meteors"),aurora:o.get("aurora"),decodeWorkers:o.get("decodeWorkers")==="1"?1:o.get("decodeWorkers")==="2"?2:null,zoneCurtain:o.get("zoneCurtain")==="1"||r>0,zoneCurtainDebug:Number.isFinite(r)&&r>0?r:0,zoneSeed:Number.isInteger(l)?l>>>0:null,search:t??""}}const pl=t=>!1,_l=typeof location>"u"?null:location.search??"",Ua=ml(_l,pl()),Ui={bench:"iit-eyepiece-bench",deskMenus:"iit-desk-menus",deskCards:"iit-desk-cards-v1",quality:"iit-eyepiece-quality",warp:"iit-eyepiece-warp",eyeGamma:"iit-eye-gamma",eyeGammaAsked:"iit-eye-gamma-asked",eyeVision:"iit-eye-vision-v1",tubeVision:"iit-tube-vision-v1",eyeEv:"iit-eye-ev",starShapeEye:"iit-star-shape",starShapeTube:"iit-star-shape-tube",telescopeAperture:"iit-telescope-aperture",observerOptics:"iit-observer-optics",advancedGroups:"iit-eyepiece-advanced",dragHint:"iit-eyepiece-drag-hint",tourSeen:"iit-onboarding-seen-v3",tourSeenV2:"iit-onboarding-seen-v2",tourSeenV1:"iit-onboarding-seen-v1",skyAssist:"iit-sky-assist-v1",horizon:"iit-horizon",arLocation:"iit-ar-location",arIntroSeen:"iit-ar-intro-seen",fullLens:"iit-full-lens",debugMode:"iit-debug-mode-v1",installHint:"iit-install-hint",installSheet:"iit-install-sheet",myTube:"iit-my-tube",achievements:"iit-achievements",theme:"iit-theme-v1",themeRedView:"iit-theme-red-view-v1",themeMotion:"iit-theme-motion-v1",lang:"iit-lang",offlineAll:"iit-offline-all",offlineOnInstall:"iit-offline-on-install",storageRecord:"iit-storage-record",errorLog:"iit-error-log",visits:"iit-visits",seenVersion:"iit-seen-version",swAutoUpdate:"iit-sw-auto-update",inAppHint:"iit-inapp-hint"},G=(t,e,o,s="local")=>({name:t,key:Ui[t],storage:s,feature:e,clear:o}),xl=[G("bench","filter workbench: tab, comparison, sliders",!0),G("deskMenus","desktop: which floating cards are open",!0),G("deskCards","desktop: where the floating cards were dragged",!0),G("quality","picture quality choice",!0),G("warp","frame interpolation choice",!0),G("eyeGamma","naked eye: calibrated screen gamma",!0),G("eyeGammaAsked","naked eye: the calibration was offered",!0),G("eyeVision","naked eye: visual model tuning (D181)",!0),G("tubeVision","tube screen: visual model tuning (D183)",!0),G("eyeEv","naked eye: debug display EV (D179)",!0),G("starShapeEye","star reshaping strength, naked eye",!0),G("starShapeTube","star reshaping strength, tube",!0),G("telescopeAperture","aperture of the telescope last taken off (D120)",!0),G("observerOptics","optics kept across observer switches (D121)",!0),G("advancedGroups",'which "advanced" groups are unfolded',!0),G("dragHint","the eyepiece drag hint was seen",!0),G("tourSeen","guide version last shown",!0),G("tourSeenV2","guide seen (before 1.1.0)",!0),G("tourSeenV1","guide seen (0.9.x)",!0),G("skyAssist","sky overlays: switches and sliders",!0),G("horizon","horizon mode: typed latitude, landscape",!0),G("arLocation","AR / horizon: last position (0.01 deg)",!0),G("arIntroSeen","AR mode: introduction seen",!0),G("fullLens","full screen: the wide lens picked there (16 mm by default)",!0),G("debugMode","debug mode switch",!0),G("installHint","install hint dismissed for good",!0),G("installSheet","install sheet: times shown, snooze",!0),G("myTube","my tube (the user's own parameters; reset in the tube panel)",!1),G("achievements","achievements, visited targets, share flag (reset in the achievements drawer)",!1),G("theme","theme choice",!1),G("themeRedView","theme: red view",!1),G("themeMotion","theme: background motion",!1),G("lang","interface language",!1),G("offlineAll","offline: keep all data",!1),G("offlineOnInstall","offline: download when installed",!1),G("storageRecord","offline: storage diagnostics",!1),G("errorLog","local error log (cleared in the settings)",!1),G("visits","visit count (install prompt timing)",!1),G("seenVersion","release notes: version last seen",!1),G("swAutoUpdate","automatic update switch throttle",!1,"session"),G("inAppHint","in-app browser hint closed",!1,"session")],vl=new Set(xl.filter(t=>t.storage==="session").map(t=>t.name)),gl=t=>vl.has(t)?sessionStorage:localStorage,Al=t=>gl(t).getItem(Ui[t]);function yl(){if(Ua.lang)return Ua.lang;try{const t=Al("lang");if(t==="zh"||t==="en")return t}catch{}return navigator.webdriver||/^zh\b/i.test(navigator.language||"")?"zh":"en"}const bl=typeof window>"u"?"zh":yl();let wl={};function E(t,e){let o=t;if(bl==="en"){const a=wl[t];a!==void 0&&(o=a)}if(!e)return o;const s=e;return o.replace(/\{(\w+)\}/g,(a,n)=>n in s?String(s[n]):a)}class Ft extends Error{}class so extends Error{}const Ts={1:t=>t==="rate",sky:t=>t.startsWith("rateSky"),aurora:t=>t.startsWith("aurora"),cloud:t=>t.startsWith("cloud"),meteors:t=>t==="transientHaloAdd",handheld:t=>t==="sampleShift"};function Fs(t,e){const o=Ua.shaderFail;return!o||!o.split(",").some(s=>(Object.prototype.hasOwnProperty.call(Ts,s)?Ts[s]:a=>a===s)(t))?e:`#version 300 es
precision highp float;
out vec4 outColor;
void main() { outColor = undeclaredSymbolForShaderFailTest; }
`}class Ml{constructor(e){this.gl=e}gl;textures=new Set;framebuffers=new Set;programs=new Set;buffers=new Set;vaos=new Set;renderbuffers=new Set;textureBytes=new Map;bufferBytes=new Map;renderbufferBytes=new Map;textureShapes=new WeakMap;peakBytes=0;deferred=new Map;usage(){let e=0,o=0,s=0;for(const n of this.textures)for(const r of this.textureBytes.get(n)?.values()??[])e+=r;for(const n of this.buffers)o+=this.bufferBytes.get(n)??0;for(const n of this.renderbuffers)s+=this.renderbufferBytes.get(n)??0;const a=e+o+s;return this.peakBytes=Math.max(this.peakBytes,a),{textureBytes:e,bufferBytes:o,renderbufferBytes:s,totalBytes:a,peakBytes:this.peakBytes,textures:this.textures.size,buffers:this.buffers.size,renderbuffers:this.renderbuffers.size,framebuffers:this.framebuffers.size,programs:this.programs.size,vaos:this.vaos.size}}recordTexture(e,o,s,a,n=0,r=1){const i=this.gl,l=a===i.R8?1:a===i.RGBA8||a===i.RGB10_A2||a===i.R32F||a===i.R32I||a===i.RG16F?4:a===i.R16F?2:a===i.RG32F||a===i.RGBA16F||a===i.RGBA16UI?8:a===i.RGBA32F?16:null;if(l===null)throw new Error(`Unaccounted texture format 0x${a.toString(16)}`);let c=this.textureBytes.get(e);c||(c=new Map,this.textureBytes.set(e,c)),c.set(n,o*s*r*l),this.usage(),n===0&&this.textureShapes.set(e,`${o}×${s}${r>1?`×${r}`:""} ${l} B`)}textureBreakdown(){const e=new Map;for(const o of this.textures){const s=this.textureShapes.get(o)??"?",a=e.get(s)??{count:0,bytes:0};a.count++;for(const n of this.textureBytes.get(o)?.values()??[])a.bytes+=n;e.set(s,a)}return[...e].map(([o,s])=>({shape:o,count:s.count,mb:Math.round(s.bytes/1048576)})).sort((o,s)=>s.mb-o.mb)}recordBuffer(e,o){this.bufferBytes.set(e,o),this.usage()}recordRenderbuffer(e,o){this.renderbuffers.add(e),this.renderbufferBytes.set(e,o),this.usage()}checkAllocation(e){const o=this.gl.getError();if(o!==this.gl.NO_ERROR)throw new Ft(`${e}: GPU allocation failed (0x${o.toString(16)}).`)}transaction(e){const o=new Set(this.textures),s=new Set(this.framebuffers),a=new Set(this.buffers),n=new Set(this.renderbuffers);try{return e()}catch(r){for(const i of this.textures)o.has(i)||this.deleteTexture(i);for(const i of this.framebuffers)s.has(i)||(this.gl.deleteFramebuffer(i),this.framebuffers.delete(i));for(const i of this.buffers)a.has(i)||this.deleteBuffer(i);for(const i of this.renderbuffers)n.has(i)||this.deleteRenderbuffer(i);throw this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),r}}texture(e,o,s,a,n,r){const i=this.gl,l=i.getParameter(i.MAX_TEXTURE_SIZE);if(!(Number.isInteger(e)&&Number.isInteger(o)&&e>0&&o>0&&e<=l&&o<=l))throw new Ft(`Texture ${e}×${o} exceeds GPU dimension limit ${l}.`);const c=i.createTexture();if(!c)throw new Ft("GPU texture creation failed.");this.textures.add(c);try{i.bindTexture(i.TEXTURE_2D,c),i.pixelStorei(i.UNPACK_ALIGNMENT,1),i.texImage2D(i.TEXTURE_2D,0,s,e,o,0,a,n,r);for(const[u,h]of[[i.TEXTURE_MIN_FILTER,i.NEAREST],[i.TEXTURE_MAG_FILTER,i.NEAREST],[i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE],[i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE]])i.texParameteri(i.TEXTURE_2D,u,h);return this.checkAllocation(`Texture ${e}×${o}`),this.recordTexture(c,e,o,s),c}catch(u){throw this.deleteTexture(c),u}}target(e,o,s,a){const n=this.gl,r=s===n.R16F?n.HALF_FLOAT:s===n.RGBA8?n.UNSIGNED_BYTE:s===n.RGB10_A2?n.UNSIGNED_INT_2_10_10_10_REV:n.FLOAT,i=this.texture(e,o,s,a,r,null),l=n.createFramebuffer();if(!l)throw this.deleteTexture(i),new Ft("GPU framebuffer creation failed.");this.framebuffers.add(l),n.bindFramebuffer(n.FRAMEBUFFER,l),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,i,0);const c=n.checkFramebufferStatus(n.FRAMEBUFFER);if(c!==n.FRAMEBUFFER_COMPLETE)throw this.deleteTarget({tex:i,fbo:l,internal:s,format:a,w:e,h:o}),new Ft(E("浮点渲染目标不可用（0x{0}）。",[c.toString(16)]));return{tex:i,fbo:l,internal:s,format:a,w:e,h:o}}deleteTexture(e){this.gl.deleteTexture(e),this.textures.delete(e),this.textureBytes.delete(e)}deleteBuffer(e){this.gl.deleteBuffer(e),this.buffers.delete(e),this.bufferBytes.delete(e)}deleteRenderbuffer(e){this.gl.deleteRenderbuffer(e),this.renderbuffers.delete(e),this.renderbufferBytes.delete(e)}deleteTarget(e){this.gl.deleteFramebuffer(e.fbo),this.framebuffers.delete(e.fbo),this.deleteTexture(e.tex)}bindTarget(e){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,e.fbo),this.gl.viewport(0,0,e.w,e.h)}bindTex(e,o,s,a){const n=this.gl;n.activeTexture(n.TEXTURE0+e),n.bindTexture(n.TEXTURE_2D,o),n.uniform1i(s.loc.get(a),e)}program(e,o,s){const a=this.gl,n=a.createProgram();this.programs.add(n);const r=[];try{for(const[c,u]of[[a.VERTEX_SHADER,o],[a.FRAGMENT_SHADER,Fs(e,s)]]){const h=a.createShader(c);if(r.push(h),a.shaderSource(h,u),a.compileShader(h),!a.getShaderParameter(h,a.COMPILE_STATUS))throw new so(E("着色器编译失败（{0} / {1}）：{2}",[e,c===a.VERTEX_SHADER?E("顶点"):E("片元"),a.getShaderInfoLog(h)||E("驱动未返回详情")]));a.attachShader(n,h)}if(a.linkProgram(n),!a.getProgramParameter(n,a.LINK_STATUS))throw new so(E("着色器链接失败（{0}）：{1}",[e,a.getProgramInfoLog(n)||E("驱动未返回详情")]))}catch(c){throw a.deleteProgram(n),this.programs.delete(n),c}finally{for(const c of r)a.isProgram(n)&&a.getAttachedShaders(n)?.includes(c)&&a.detachShader(n,c),a.deleteShader(c)}const i=new Map;return{prog:n,loc:{get:c=>(i.has(c)||i.set(c,a.getUniformLocation(n,c)),i.get(c))}}}programDeferred(e,o,s){const a=this.gl,n=a.createProgram(),r=!!a.getExtension("KHR_parallel_shader_compile");this.programs.add(n);const i=[[a.VERTEX_SHADER,o],[a.FRAGMENT_SHADER,Fs(e,s)]].map(([p,d])=>{const _=a.createShader(p);return a.shaderSource(_,d),a.compileShader(_),a.attachShader(n,_),{s:_,type:p}});a.linkProgram(n);let l=!1,c=null;const u=()=>{if(!(l||c||!i.length))try{for(const{s:p,type:d}of i)if(!a.getShaderParameter(p,a.COMPILE_STATUS))throw new so(E("着色器编译失败（{0} / {1}）：{2}",[e,d===a.VERTEX_SHADER?E("顶点"):E("片元"),a.getShaderInfoLog(p)||E("驱动未返回详情")]));if(!a.getProgramParameter(n,a.LINK_STATUS))throw new so(E("着色器链接失败（{0}）：{1}",[e,a.getProgramInfoLog(n)||E("驱动未返回详情")]));l=!0}catch(p){c=p instanceof Error?p:new Error(String(p))}finally{for(const{s:p}of i)a.getAttachedShaders(n)?.includes(p)&&a.detachShader(n,p),a.deleteShader(p);i.length=0,this.deferred.delete(n)}},h=()=>!r||a.getProgramParameter(n,37297)===!0;this.deferred.set(n,{shaders:i,ready:h});const f=()=>{l||c||!this.deferred.has(n)||a.isContextLost()||(h()?u():setTimeout(f,50))};setTimeout(f,50);const m=new Map;return{prog:n,loc:{get:p=>(m.has(p)||m.set(p,a.getUniformLocation(n,p)),m.get(p))},done:()=>l||c!==null||h(),check:()=>{if(u(),c)throw c}}}deleteAll(){const e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null),e.useProgram(null);for(const o of this.framebuffers)e.deleteFramebuffer(o);for(const o of this.textures)e.deleteTexture(o);for(const o of this.buffers)e.deleteBuffer(o);for(const o of this.vaos)e.deleteVertexArray(o);for(const o of this.renderbuffers)e.deleteRenderbuffer(o);for(const[o,s]of this.deferred){this.programs.delete(o);const a=()=>{if(!e.isContextLost()){if(!s.ready()){setTimeout(a,50);return}for(const{s:n}of s.shaders)e.detachShader(o,n),e.deleteShader(n);s.shaders.length=0,e.deleteProgram(o)}};a()}this.deferred.clear();for(const o of this.programs)e.deleteProgram(o);this.framebuffers.clear(),this.textures.clear(),this.buffers.clear(),this.vaos.clear(),this.programs.clear(),this.renderbuffers.clear(),this.textureBytes.clear(),this.bufferBytes.clear(),this.renderbufferBytes.clear()}}const fe=6371,Oi=78,Eo=110,Et=1/Math.tan(Oi*Math.PI/180),$e=84,ht=300,Qe=.5,J=81,ze=9,Ie=Math.round((ht-$e)/Qe)+2,no=2,Se=640;function ye(t){return t|=0,t=Math.imul(t^t>>>16,2146121005),t=Math.imul(t^t>>>15,2221713035),(t^t>>>16)>>>0}function Ee(t,e,o){return ye(Math.imul(t|0,2654435761)^ye(Math.imul(e|0,2246822507)^(o|0)))}const be=t=>t/4294967296,y=(t,e)=>be(ye(t+Math.imul(e,1663821227)|0)),io=(t,e,o)=>be(Ee(t,e,o))*2-1,U=t=>t<=0?0:t>=1?1:t*t*(3-2*t);function D(t,e,o){const s=Math.floor(t),a=Math.floor(e),n=t-s,r=e-a,i=n*n*(3-2*n),l=r*r*(3-2*r),c=io(s,a,o),u=io(s+1,a,o),h=io(s,a+1,o),f=io(s+1,a+1,o);return c+(u-c)*i+(h+(f-h)*i-c-(u-c)*i)*l}const Ue=t=>Math.exp(-.5*t*t),Ne=(t,e,o)=>t+(e-t)*o,N=(t,e)=>t[0]+(t[1]-t[0])*e,$=(t,e,o)=>t<e?e:t>o?o:t,Ko=(t={})=>({cellKm:80,epochS:8,prob:.55,train:[1,3],a:[2.5,5],th:[1.8,3.2],lifePerKm:[1.5,2.1],v:[1.5,4],sign:-1,off:.2,hard:.55,...t}),qo=(t={})=>({cellKm:190,epochS:14,prob:.55,train:[1,3],a:[7,15],th:[2,3.6],lifePerKm:[1.2,1.6],v:[.8,2.4],sign:-1,off:.2,hard:.5,...t}),Ns=(t={})=>({cellKm:420,epochS:40,prob:.5,train:[1,2],a:[15,24],th:[2.4,3.8],lifePerKm:[1.9,2.6],v:[.4,1.4],sign:1,off:.1,hard:.4,...t}),El=[{name:"弱",y0:235,surge:{period:600,amp:[3,8],adv:[.3,.45],dwell:[0,.2],jitter:.6,drift:3,driftS:900},meander:[[520,14,.05,.3],[190,4,.1,2.1],[140,4.5,.04,.8],[85,2.2,-.06,2.4]],ripple:0,vTex:.1,G:.16,gAlong:.6,hard0:.38,hardGain:.15,sigma:1.5,sigmaVar:.35,envShare:.7,envSigma:7.6,rayGlow:.04,foldThick:.6,waves:null,act:null,vort:null,blobs:null,layers:null,sRange:[-620,620]},{name:"中",y0:175,surge:{period:420,amp:[6,20],adv:[.3,.45],dwell:[0,.25],jitter:.6,drift:6,driftS:700},meander:[[480,18,.08,1.1],[170,6,.12,.4]],ripple:.25,vTex:.3,G:.3,gAlong:.3,hard0:.42,hardGain:.35,sigma:1.6,sigmaVar:.35,envShare:.55,envSigma:6.8,rayGlow:.05,foldThick:1.2,act:{epochS:200,life:[260,340],rise:60,region:[-150,150],v:[-.12,.12],widthKm:110,gain:2},waves:[[70,1.6,1.2],[38,.8,-1.8]],vort:{gated:!0,classes:[Ko({prob:.5,th:[1.2,2.4]}),qo({cellKm:260,a:[6,12],th:[1.4,2.6]})]},blobs:{cellKm:60,epochS:4,prob:.45,w:[5,12],u:[2,7],life:[4,9],amp:[.35,.8],gated:!0},layers:{d:[[2.5,5,.55]]},sRange:[-620,620]},{name:"强",y0:150,surge:{period:300,amp:[15,45],adv:[.3,.45],dwell:[.05,.3],jitter:.6,drift:10,driftS:600},meander:[[440,22,.12,.7],[150,8,.2,2.9]],ripple:.3,vTex:.5,G:.33,gAlong:.3,hard0:.48,hardGain:.4,sigma:1.6,sigmaVar:.4,envShare:.5,envSigma:6.4,rayGlow:.05,foldThick:1.2,act:null,waves:[[85,2.4,1.6],[48,1.3,-2.2]],vort:{classes:[Ko({prob:.45}),qo(),Ns()]},blobs:{cellKm:50,epochS:3.5,prob:.5,w:[4,10],u:[3,9],life:[3,7],amp:[.5,1.2]},layers:{d:[[2.5,6,.65],[-3.5,-1.5,.4]]},sRange:[-620,620]},{name:"大磁暴",y0:120,surge:{period:270,amp:[80,165],adv:[.28,.42],dwell:[.05,.3],jitter:.6,drift:12,driftS:500},meander:[[400,28,.15,2.2],[140,10,.25,1.3]],ripple:.3,vTex:.7,G:.35,gAlong:.3,hard0:.52,hardGain:.42,sigma:1.6,sigmaVar:.45,envShare:.45,envSigma:6.4,rayGlow:.06,foldThick:1.2,act:null,waves:[[90,3,2],[50,1.6,-2.6]],vort:{classes:[Ko({prob:.5}),qo({prob:.6,a:[8,16],th:[2.2,3.8]}),Ns({cellKm:400,prob:.6,a:[18,30],th:[3.2,5]})]},blobs:{cellKm:45,epochS:3,prob:.55,w:[4,10],u:[4,12],life:[3,7],amp:[.6,1.4]},layers:{d:[[3,7.5,.7],[-4,-2,.45]]},sRange:[-620,620]}],Rl=[1.8,6,11.5,22],Sl=[{hem:.1,hemAct:0,ray:0,chi:0,bundle:0},{hem:.12,hemAct:.32,ray:.36,chi:0,bundle:.3},{hem:.14,hemAct:.36,ray:.48,chi:0,bundle:.33},{hem:.15,hemAct:.4,ray:.55,chi:0,bundle:.36}],Xo=(t,e,o,s,a)=>({P:t,prob:e,amp:o,vz:[40,70],sig:14,cell:240,w:s,lag:a}),_e=El.map((t,e)=>{const{layers:o,...s}=t,a=Sl[e];return{...s,kR:Rl[e],fine:{...a,ray:a.ray*.75,chi:e===0?0:.04},foldTilt:[0,.16,.2,.22][e],weakAlong:e===0?{amp:.55,scales:[80,34,19],v:[.25,-.5,.35]}:null,layers4:o==null?null:{d:o.d,s0:.35,s:.45,w0:1.3},solid:e===0?null:{env:[1.5,.3],sigma:[1.25,.75]},pulse5:[null,Xo(9,.7,2.8,[90,180],[.15,.5]),Xo(6,.8,3.4,[90,200],[.15,.5]),Xo(4.5,.85,3.9,[90,200],[.15,.5])][e]??null,glow:e===0?null:{amp:.003,sig:45,off:-15,chi:.2}}});_e.length;function ro(t,e,o){return e*t.period+t.jitter*t.period*(be(ye(Math.imul(e,2654435761)+77+Math.imul(o,31)|0))-.5)}function Tl(t,e){const o=_e[t.level],s=o.surge,a=t.seed??0;let n=Math.floor(e/s.period);e<ro(s,n,a)?n--:e>=ro(s,n+1,a)&&n++;const r=ro(s,n,a),i=ro(s,n+1,a),l=(e-r)/(i-r),c=ye(Math.imul(n,40503)+991+Math.imul(a,17)|0),u=N(s.amp,y(c,1)),h=N(s.adv,y(c,2)),f=N(s.dwell,y(c,3)),m=l<h?U(l/h):l<h+f?1:1-U((l-h-f)/(1-h-f)),p=s.drift*D(e/s.driftS,.5,8080+a);return{y:o.y0+p-u*m}}function Fl(t,e){return t.y!=null?t.y:Tl(t,e).y+(t.yShift??0)}function jt(t,e,o,s=0){const a=t.act;if(a==null)return 0;let n=1;const r=Math.ceil(a.life[1]/a.epochS)+1;for(let i=Math.floor(o/a.epochS)-r;i<=Math.floor(o/a.epochS);i++){const l=ye(Math.imul(i,2654435761)+5151+Math.imul(s,13)|0),c=(i+.3*y(l,1))*a.epochS,u=N(a.life,y(l,2)),h=o-c;if(!(h>0&&h<u))continue;const f=U(h/a.rise)*(1-U((h-u+a.rise)/a.rise)),m=N(a.region,y(l,3))+N(a.v,y(l,4))*h;n*=1-f*Ue((e-m)/a.widthKm)}return 1-n}const Ro=t=>t<=0||t>=1?0:U(t/.45)*(1-U((t-.55)/.45)),Nl=t=>U((t-.75)/.2);function kl(t,e,o,s,a,n,r){const i=e.train??[1,3],l=2*e.a[1]*e.lifePerKm[1],c=Math.ceil(l/e.epochS)+1;for(let u=Math.floor(o/e.epochS)-c;u<=Math.floor((o+.3*l)/e.epochS);u++)for(let h=Math.floor(a[0]/e.cellKm)-1;h<=Math.floor(a[1]/e.cellKm)+1;h++){const f=Ee(h,u,s+7*r);if(be(f)>=e.prob)continue;const m=N(e.a,y(f,5)),p=m*N(e.lifePerKm,y(f,2)),d=(u+y(f,1))*e.epochS;if(!(o>d-.4*p&&o<d+2*p))continue;const _=(y(f,8)<.5?-1:1)*N(e.v,y(f,4)),v=e.sign*N(e.th,y(f,6)),A=y(f,9)<e.hard,g=i[0]+Math.floor((i[1]-i[0]+.999)*y(f,11));let w=(h+y(f,3))*e.cellKm,b=0;for(let T=0;T<g;T++){const k=ye(f+Math.imul(T+1,668265263)|0),R=m*(.55+.95*y(k,1)),F=R*p/m*(.8+.5*y(k,2)),S=d+p*(y(k,3)-.5)*.7;if(T>0&&(w+=(2.5+4.5*y(k,4))*.5*(R+b)),b=R,y(k,8)<.2&&T>0||!(o>S&&o<S+F))continue;const M={cls:r,s0:w,t0:S,life:F,v:_*(.8+.4*y(k,9)),a:R,th:v*(.45+.7*y(k,5)),off:e.off*(2*y(k,6)-1),hp:A?.6+.4*y(k,7):.3*y(k,7),g:1};t.vort.gated&&(M.g=jt(t,M.s0+M.v*.5*F,S+.5*F,s),M.g<.1)||n.push(M)}}}function Ll(t,e){const o=_e[t.level],s=[];if(t.vortices!=null)for(const a of t.vortices)e>a.t0&&e<a.t0+a.life&&s.push({g:1,hp:.3,off:0,cls:9,...a});if(!(t.noFolds||o.vort==null||t.vortices!=null&&!t.autoToo)){const a=t.sRange??o.sRange,n=4321+(t.seed??0);o.vort.classes.forEach((r,i)=>kl(o,r,e,n,a,s,i))}for(const a of s){const n=(e-a.t0)/a.life;a.tau=n,a.e=Ro(n)*a.g,a.sc=a.s0+a.v*(e-a.t0),a.pk=Nl(Ro(n))*a.g}return s.filter(a=>a.e>1e-4).sort((a,n)=>a.a-n.a)}function Cl(t,e){const o=_e[t.level],s=o.blobs,a=[];if(s==null||t.noBlobs)return a;const[n,r]=t.sRange??o.sRange,i=777+(t.seed??0),l=Math.ceil(s.life[1]/s.epochS)+1;for(let c=Math.floor(e/s.epochS)-l;c<=Math.floor(e/s.epochS);c++)for(let u=Math.floor(n/s.cellKm)-1;u<=Math.floor(r/s.cellKm)+1;u++){const h=Ee(u,c,i);if(be(h)>=s.prob)continue;const f=(c+y(h,1))*s.epochS,m=N(s.life,y(h,2)),p=(e-f)/m;if(!(p>0&&p<1))continue;const d=(y(h,3)<.5?-1:1)*N(s.u,y(h,4)),_=(u+y(h,5))*s.cellKm;let v=1;s.gated&&(v=jt(o,_,f,i),v<.1)||a.push({s:_+d*(e-f),w:N(s.w,y(h,6)),amp:N(s.amp,y(h,7))*v*U(p/.3)*(1-U((p-.6)/.4)),u:d})}return a}function Pl(t,e,o,s){const a=e.waves!==void 0?e.waves:t.waves;if(a==null)return 0;let n=0;for(let r=0;r<a.length;r++){const[i,l,c]=a[r],u=.6+.5*D(o/160,s/45,6100+r);n+=l*u*Math.sin(2*Math.PI*(o-c*s)/i+1.7*r)}return n}function ks(t,e,o,s,a){let n=a;for(const[i,l,c,u]of t.meander??e.meander)n+=l*Math.sin(2*Math.PI*(o-c*s)/i+u);const r=t.ripple??e.ripple;return r>0&&(n+=r*(D((o-2*s)/13,s/6,4101)+.3*D((o-2*s)/5,s/3,4102))),n+Pl(e,t,o,s)}const as=t=>{const e=1+.5*t;return 1/(e*e)},ss=t=>t<=3?1:t>=5?0:1-U((t-3)/2);function Ul(t,e){const o=_e[t.level],s=Fl(t,e),a=Ll(t,e),n=Cl(t,e),r=a.map(u=>({v:u,cx:u.sc,cy:ks(t,o,u.sc,e,s)+u.off*u.a,ia2:1/(u.a*u.a),r2max:25*u.a*u.a,th:u.th*u.e})),i=u=>ks(t,o,u,e,s),l=u=>{let h=u,f=i(u);for(const m of r){const p=h-m.cx,d=f-m.cy,_=p*p+d*d;if(_>m.r2max)continue;const v=_*m.ia2,A=m.th*as(v)*ss(Math.sqrt(v)),g=Math.cos(A),w=Math.sin(A);h=m.cx+g*p-w*d,f=m.cy+w*p+g*d}return[h,f]},c=Di(r,n,i);return{pos:l,base:i,info:c,yc:s,vortices:a,blobs:n,swirls:r}}function Di(t,e,o){return s=>{let a=s,n=o(s),r=0,i=0,l=0,c=0;for(const h of t){const f=a-h.cx,m=n-h.cy,p=f*f+m*m;if(p>h.r2max)continue;const d=p*h.ia2,_=Math.exp(-d/4.5)*h.v.e;h.v.a>=6&&(r+=_),i+=Math.exp(-d/2)*h.v.e,l+=_*h.v.hp*h.v.pk,c+=_;const v=h.th*as(d)*ss(Math.sqrt(d)),A=Math.cos(v),g=Math.sin(v);a=h.cx+A*f-g*m,n=h.cy+g*f+A*m}let u=0;for(const h of e){const f=(s-h.s)/h.w;f*f<64&&(u+=h.amp*(Math.exp(-.5*f*f)-.5*Math.exp(-.125*f*f)))}return{infl:Math.min(1,r),core:Math.min(1,i),hard:c>1e-6?l/c:0,sw:Math.min(1,c),blob:u}}}function Ol(t){const o=new Float64Array(8).fill(NaN),s=new Float64Array(8),a=new Float64Array(8).fill(NaN),n=new Array(8);let r=0,i=0;const l=t.swirls,c=h=>{for(let m=0;m<8;m++)if(o[m]===h)return s[m];const f=t.base(h);return o[r]=h,s[r]=f,r=r+1&7,f};return{...t,pos:h=>{for(let d=0;d<8;d++)if(a[d]===h)return n[d];let f=h,m=c(h);for(const d of l){const _=f-d.cx,v=m-d.cy,A=_*_+v*v;if(A>d.r2max)continue;const g=A*d.ia2,w=d.th*as(g)*ss(Math.sqrt(g)),b=Math.cos(w),T=Math.sin(w);f=d.cx+b*_-T*v,m=d.cy+T*_+b*v}const p=[f,m];return a[i]=h,n[i]=p,i=i+1&7,p},base:c,info:Di(l,t.blobs,c)}}const So=[{cell:2.4,epoch:5,prob:.6,w:[.18,.45],lnS:.9,life:[5,14],drift:.15,seed:61},{cell:6.8,epoch:8,prob:.55,w:[.35,.9],lnS:.6,life:[8,22],drift:.12,seed:62}];let zi=1,Ii=1;const Bi=So.map(t=>({cell:NaN,time:NaN,seed:NaN,count:0,events:new Float64Array(20*(Math.ceil(t.life[1]/t.epoch)+2))}));function Dl(t,e,o,s){const a=So[t],n=Bi[t],r=Math.floor(o/a.epoch);let i=0;for(let l=r-Math.ceil(a.life[1]/a.epoch)-1;l<=r;l++)for(let c=e-2;c<=e+2;c++){const u=Ee(c,l,9e3+a.seed+131*s);if(be(u)>=a.prob)continue;const h=(l+y(u,1))*a.epoch,f=N(a.life,y(u,2)),m=(o-h)/f;if(!(m>0&&m<1))continue;n.events[i++]=(c+y(u,3))*a.cell+a.drift*(2*y(u,4)-1)*(o-h),n.events[i++]=N(a.w,y(u,5));const p=Math.sqrt(-2*Math.log(Math.max(1e-9,y(u,6))))*Math.cos(2*Math.PI*y(u,7));n.events[i++]=Math.exp(a.lnS*p-.5*a.lnS*a.lnS)*U(m/.25)*(1-U((m-.7)/.3)),n.events[i++]=y(u,8)}n.cell=e,n.time=o,n.seed=s,n.count=i}function Gi(t,e,o=0,s={f:0,lam:0,fb:0}){let a=0,n=0,r=0;for(let i=0;i<So.length;i++){const l=So[i],c=Math.floor(t/l.cell),u=Bi[i];(u.cell!==c||u.time!==e||u.seed!==o)&&Dl(i,c,e,o);for(let h=0;h<u.count;h+=4){const f=(t-u.events[h])/u.events[h+1];if(f*f>16)continue;const m=u.events[h+2]*Math.exp(-.5*f*f),p=u.events[h+3];a+=m,n+=m*p*p*p,l.cell>5&&(r+=m)}}return s.f=a*zi,s.fb=r*Ii,s.lam=a>1e-9?n/a:.3,s}{let t=0,e=0,o=0;const s={f:0,lam:0,fb:0};for(let a=0;a<6e3;a++)Gi(a*.731+13,50+a*.37,0,s),t+=s.f,e+=s.fb,o++;zi=o/t,Ii=o/e}const zl={f:0,lam:0,fb:0};function Po(t,e,o,s,a,n,r=0){const i=e.fine;if(t.ticks){const B=t.ticks,ee=Math.round(o/B.spacing),Z=o-ee*B.spacing,W=B.only==null||B.only===ee?Math.exp(-.5*(Z/B.sigma)**2):0;return{F:(B.only==null?B.base:0)+W,chi:B.chi??.5,ray:1,lam:.4,sigma:B.core??.7,env:0}}const l=a?a.infl:0,c=a?a.blob:0,u=Math.max(0,c),h=a?a.sw:0,f=o-e.vTex*s+(t.uShift??0),m=D(f/150,s/200,101),p=D(f/36,s/50,202),d=D(f/9,s/14,303),_=.7*D(f/70,s/180,811)+.3*D(f/26,s/90,812),v=1*m+.6*p+.15*d;let A=Math.exp(e.G*2.2*v-.5*(e.G*2.2)**2*.3)*Math.exp(e.gAlong*1.6*_-.5*(e.gAlong*1.6)**2*.2);if(e.weakAlong){const B=e.weakAlong;let ee=0;B.scales.forEach((Z,W)=>{ee+=[.6,.3,.2][W]*D((o-B.v[W]*s)/Z,s/400,8200+W)}),A*=Math.exp(B.amp*2*ee-.5*(B.amp*2)**2*.15)}const[g,w]=t.sRange??e.sRange;A*=U((o-g)/90)*U((w-o)/90),e.act!=null&&(A*=1+e.act.gain*n),t.onset!=null&&(A*=U((s-t.onset[0])/t.onset[1])),A*=Math.max(.25,1+c);const b=Math.max(l,n,.5*Math.min(1,u));let T=1,k=1,R=1,F=.3;if(!t.noFine){const B=Gi(f,s,t.seed??0,zl);T=B.f,R=B.fb,k=.35*B.f+.65*B.fb,F=B.lam}i.ray>0||(F=.3);const S=.5+.5*(.8*D(f/22,s/30,406)+.4*m),M=U((S-(1-i.bundle))/.2),P=i.hem+i.hemAct*b*M;A*=1-P+P*k;const L=.5*m+.6*p+.2*d,C=e.foldTilt*Math.sin(r)*h,O=$(e.hard0+e.hardGain*L+.08*u+(e.act!=null?.12*n:0)+i.chi*(Math.min(R,2.5)-1)+C-(t.chiDrop??0),0,1),z=e.rayGlow+i.ray*b*Math.sqrt(b)*M*Math.min(T,2.5)+.04*b;let j=e.sigma*(1+e.sigmaVar*D(f/60,s/120,606))*(t.sigmaK??1),q=e.envShare*(1+.4*D(f/80,s/150,707));if(e.solid&&!t.noSolid){const B=U(.5+.9*L+.5*D(f/12,s/25,909)+.12*(Math.min(k,2.5)-1));q*=Ne(e.solid.env[0],e.solid.env[1],B),j*=Ne(e.solid.sigma[0],e.solid.sigma[1],B)}return{F:A,chi:O,ray:z,lam:F,sigma:j,env:$(q,.05,.9)}}function $i(t,e,o){const s=t.layers4;if(s==null)return null;const a=[[0,s.w0,s.s0]];let n=s.w0;s.d.forEach(([r,i,l],c)=>{const u=.5+.6*D(e/70,o/50,9100+c),h=l*$(.15+1.1*(.5+.7*D(e/33,o/28,9200+c)),0,1.4);a.push([r+(i-r)*$(u,0,1),h,s.s]),n+=h});for(const r of a)r[1]/=n;return a}const Ls=[116,109,102,96],Cs=[30,26,22,18],Il=3.5;function Bl(t){const e=$(t,0,1)*3,o=Math.min(2,Math.floor(e)),s=e-o;return{peak:Ne(Ls[o],Ls[o+1],s),up:Ne(Cs[o],Cs[o+1],s),lo:Il}}const Gl=t=>1/(1+Math.exp(-(t-101)/2.5)),$l=t=>1-U((t-(ht-30))/30),Ps=2.2,Us=4.5,Os=1.6,Ds=Math.sqrt(Math.PI/2);function Wl(t,e,o){const s=t-e.peak,a=s>=0?Math.exp(-s/e.up):Math.exp(-.5*(s/Ps)**2),n=s>=0?Math.exp(-.5*(s/Us)**2):Math.exp(-.5*(s/Os)**2);return(1-o)*a+o*(Ps*Ds+e.up)/((Os+Us)*Ds)*n}const zs=20,Hl=120,Kl=t=>$(.3+.6*t,.3,.85),ql=.8;function Xl(t,e,o){const s=t-(e.peak+1+12*o*o);return s<=0?0:(1-Math.exp(-s/(6+8*o)))*Math.exp(-s/(zs+(Hl-zs)*o))}let Yo=null;function ns(){if(Yo)return Yo;const t=Ie,e=[new Float32Array(J*t),new Float32Array(J*t)],o=[new Float32Array(J*ze*t),new Float32Array(J*ze*t)];for(let s=0;s<J;s++){const a=s/(J-1),n=Bl(a),r=Kl(a);n.up*=ql;for(let i=0;i<t;i++){const l=$e+i*Qe,c=$l(l),u=Gl(l),h=Wl(l,n,r)*c;e[0][s*t+i]=h,e[1][s*t+i]=h*u;for(let f=0;f<ze;f++){const m=Xl(l,n,f/(ze-1))*c,p=(s*ze+f)*t+i;o[0][p]=m,o[1][p]=m*u}}}return Yo={n:t,low:e,ray:o,nlam:ze}}function Oa(){const t=ns(),e=ze,o=new Float32Array(Ie*e*J*4);for(let s=0;s<J;s++)for(let a=0;a<e;a++)for(let n=0;n<Ie;n++){const r=4*((s*e+a)*Ie+n),i=s*Ie+n,l=(s*ze+a)*Ie+n;o[r]=t.low[0][i],o[r+1]=t.low[1][i],o[r+2]=t.ray[0][l],o[r+3]=t.ray[1][l]}return{data:o,w:Ie,h:e,d:J}}const Yl=1,Is=.7;function Vl(t,e,o,s,a){const n=t.pulse5,r=[];if(n==null)return r;const i=Math.ceil((360/n.vz[0]+3)/n.P)+1;for(let l=Math.floor(e/n.P)-i;l<=Math.floor(e/n.P)+1;l++)for(let c=Math.floor((s-500)/n.cell);c<=Math.floor((a+500)/n.cell);c++){const u=Ee(c,l,7331+101*o);be(u)>=n.prob||r.push({t0:(l+.8*y(u,1))*n.P,vz:N(n.vz,y(u,2)),amp:n.amp*(.6+.4*y(u,3)),xc:(c+y(u,4))*n.cell,w:N(n.w,y(u,5)),lag:(y(u,6)<.5?-1:1)*N(n.lag,y(u,7))/100})}return r}function Zl(t,e,o){const s=(e-t.xc)/t.w,a=Math.exp(-.5*s*s);if(a<.02)return null;const n=o-(t.t0+(e-t.xc)*t.lag);if(!(n>0))return null;const r=70+t.vz*n;return r>420?null:[t.amp*a*U(n/.3)*Math.exp(-Math.max(0,r-110)/180)*(Is+(1-Is)*U((r-100)/25)),r]}const Wi=70,Hi=.25,To=1401;function jl(t){const e=ns(),o=e.n,s=new Float32Array(To),a=t.pulse5;if(!a)return s;const n=Math.round(t.hard0*(J-1)),r=e.low[0],i=e.ray[0],l=(n*ze+3)*o;let c=0;for(let u=0;u<o;u++)c+=r[n*o+u]+.15*i[l+u];for(let u=0;u<To;u++){const h=Wi+u*Hi;let f=0;for(let m=0;m<o;m++){const p=$e+m*Qe;f+=(r[n*o+m]+.15*i[l+m])*Ue((p-h)/a.sig)}s[u]=f/c}return s}function Ql(t,e){const o=Math.min(To-1,Math.max(0,(e-Wi)/Hi)),s=Math.min(To-2,Math.floor(o)),a=o-s;return t[s]*(1-a)+t[s+1]*a}const Vo=4,Jl=2,Ki=800;function ec(t,e,o,s,a,n=Yl){const r=Jl,i=Math.max(1,Math.min(Ki,Math.ceil((a-s)/r))),l=new Float32Array(i*12),c=new Float64Array(i),u=new Uint8Array(i);for(const h of t){const f=Math.max(0,Math.floor((h.xc-2.8*h.w-s)/r)),m=Math.min(i-1,Math.ceil((h.xc+2.8*h.w-s)/r));for(let p=f;p<=m;p++){const d=Zl(h,s+(p+.5)*r,e);if(!d)continue;c[p]=c[p]+d[0]*Ql(o,d[1]),u[p]=Math.min(255,u[p]+1);let _=Math.min(Vo,u[p])-1;const v=A=>(A>>1)*4*i+4*p+2*(A&1);if(!(_===Vo-1&&u[p]>Vo&&!(d[0]>l[v(_)+1]))){for(;_>0&&d[0]>l[v(_-1)+1];){const A=v(_),g=v(_-1);l[A]=l[g],l[A+1]=l[g+1],_--}l[v(_)]=d[1],l[v(_)+1]=d[0]}}}for(let h=0;h<i;h++)l[8*i+4*h]=1/(1+n*c[h]),l[8*i+4*h+1]=u[h];return{x0:s,dx:r,n:i,data:l}}function tc(t,e,o,s,a,n=16){if(!t.pulse5||e.noPulse||e.ticks)return{events:[],dropped:0};const r=Vl(t,o,e.seed??0,s,a).filter(i=>{const l=Math.max(s,i.xc-2.8*i.w),c=Math.min(a,i.xc+2.8*i.w);return c>=l?[l,c,Math.min(c,Math.max(l,i.xc))].some(u=>{const h=o-(i.t0+(u-i.xc)*i.lag);return h>0&&70+i.vz*h<=420}):!1});return r.sort((i,l)=>l.amp-i.amp),{events:r.slice(0,n),dropped:Math.max(0,r.length-n)}}function oc(t,e,o,s,a){const n=t.glow;if(!n||e.noGlow||e.ticks)return null;const[r,i]=e.sRange??t.sRange,l=(e.glowGain??1)*n.amp;return[o.base(s)+n.off,l*(.6+.8*(.5+.5*D(s/180,a/300,1717)))*U((s-r)/90)*U((i-s)/90)]}const ac=t=>Math.round((t.glow?.chi??0)*(J-1)),sc=12,nc=.26,ic=.6,rc=.4,lc=.3,cc=1,uc=.22,hc=.03,fc=.12;class Fo{out=[];keys;frac;km;maxLen;cell;keyId;c=null;kc=null;ks=0;np=0;w=0;wr=0;x=0;y=0;xx=0;xy=0;yy=0;sxx=0;sxy=0;syy=0;chi=0;lam=0;len=0;lx=null;ly=0;k=0;turn=0;tx=null;ty=0;smin=0;s0=null;s1=null;ox=0;oy=0;constructor(e,o,s,a=null,n=null){this.frac=a!=null?1:e,this.km=a,this.maxLen=o,this.cell=a??(this.frac>0?s:0),this.keyId=n,this.keys=n!=null?[]:null,this.reset()}reset(){this.w=0,this.wr=0,this.x=0,this.y=0,this.xx=0,this.xy=0,this.yy=0,this.sxx=0,this.sxy=0,this.syy=0,this.chi=0,this.lam=0,this.len=0,this.lx=null,this.k=0,this.turn=0,this.tx=null,this.smin=0,this.s0=null,this.s1=null}add(e,o,s,a,n,r,i,l,c,u){if(!(r>0))return;if(this.s0==null&&(this.s0=u),this.s1=u,this.cell>0){const m=Math.floor(u/this.cell);this.w>0&&m!==this.c&&this.flush(),this.c=m}if(this.lx!=null){const m=Math.hypot(e-this.lx,o-this.ly);this.w>0&&m>this.maxLen?this.flush():(this.len+=m,this.tx!=null&&m>1e-9&&(this.turn+=Math.acos($(((e-this.lx)*this.tx+(o-this.ly)*this.ty)/m,-1,1))),m>1e-9&&(this.tx=(e-this.lx)/m,this.ty=(o-this.ly)/m),this.w>0&&this.turn>nc&&this.flush())}this.lx=e,this.ly=o,this.k++,this.k===1&&(this.ox=e,this.oy=o);const h=e-this.ox,f=o-this.oy;this.w+=r,this.wr+=i,this.x+=r*h,this.y+=r*f,this.xx+=r*h*h,this.xy+=r*h*f,this.yy+=r*f*f,this.sxx+=r*s,this.sxy+=r*a,this.syy+=r*n,this.chi+=r*l,this.lam+=i*c,this.smin+=r*Math.sqrt(Math.max(1e-6,.5*(s+n)-Math.sqrt(Math.max(0,.25*(s-n)**2+a*a)))),(!(this.frac>0)||this.km==null&&this.len>=Math.min(this.maxLen,this.frac*this.smin/this.w))&&this.flush()}flush(){if(this.w>0){const e=this.w,o=this.x/e,s=this.y/e;let a=this.sxx/e+this.xx/e-o*o,n=this.sxy/e+this.xy/e-o*s,r=this.syy/e+this.yy/e-s*s;if(this.km!=null&&this.k>1&&this.len>0&&this.s1>this.s0){const i=this.km*this.len/(this.s1-this.s0),l=this.lx-this.ox,c=this.ly-this.oy,u=Math.hypot(l,c)||1,h=l/u,f=c/u,m=h*h*a+2*h*f*n+f*f*r,p=(ic*i)**2-m;p>0&&(a+=p*h*h,n+=p*h*f,r+=p*f*f)}if(this.out.push(this.ox+o,this.oy+s,e,this.wr,a,n,r,this.chi/e,this.wr>0?this.lam/this.wr:.3,0,0,0),this.keys){const i=this.cell>0?this.c:this.np;i===this.kc?this.ks++:(this.kc=i,this.ks=0),this.keys.push(this.keyId*1e8+(i+1e5)*100+Math.min(99,this.ks))}}this.np++,this.reset()}}function qi(t,e,o,s=6){const a=Math.atan(e*Math.SQRT2)*180/Math.PI;return{f:t,cosMax:Math.cos(Math.min(89,a+s)*Math.PI/180),obs:o}}function dc(t,e,o,s){const a=t-s[0],n=e-(o-110)*Et-s[1],r=Math.hypot(a,n)||1e-9,i=r/fe,l=(fe+o)*Math.sin(i),c=(fe+o)*Math.cos(i)-fe,u=Math.hypot(l,c);return[l*a/r/u,l*n/r/u,c/u]}const Xi=(t,e,o,s)=>{const a=dc(e,o,s,t.obs);return a[0]*t.f[0]+a[1]*t.f[1]+a[2]*t.f[2]>t.cosMax};function Yi(t,e,o,s,a,n={}){const r=-Se,i=Math.max(e,r-60),l=Math.min(o,-r+60),c=n.ds??.2,u=n.split??.22,h=n.adapt??0,f=h>0?(p,d,_,v,A)=>{const g=Math.hypot(v[0]-d[0],v[1]-d[1]);if(A<s){const w=.5*(p+_),b=t.pos(w),T=Math.hypot(b[0]-.5*(d[0]+v[0]),b[1]-.5*(d[1]+v[1]));if(g+h*8*T/Math.max(g,1e-6)>u){f(p,d,w,b,A+1),f(w,b,_,v,A+1);return}}a(p,_)}:(p,d,_,v,A)=>{if(A<s&&Math.hypot(v[0]-d[0],v[1]-d[1])>u){const g=.5*(p+_),w=t.pos(g);f(p,d,g,w,A+1),f(g,w,_,v,A+1)}else a(p,_)};let m=[[i,l]];if(n.view){const p=n.view,d=8,_=Math.ceil((l-i)/d),v=new Uint8Array(_+2);for(let A=0;A<=_;A++){const g=Math.min(l,i+A*d),[w,b]=t.pos(g);for(const T of[84,150,300])if(Xi(p,w,b,T)){v[A]=1;break}}m=[];for(let A=0;A<_;A++)if(v[A]||v[A+1]||A>0&&v[A-1]||v[A+2]){const g=i+A*d,w=Math.min(l,g+d),b=m[m.length-1];b&&Math.abs(b[1]-g)<1e-9?b[1]=w:m.push([g,w])}}for(const[p,d]of m){let _=p,v=t.pos(p);const A=Math.max(1,Math.round((d-p)/c)),g=(d-p)/A;for(let w=1;w<=A;w++){const b=p+w*g,T=t.pos(b);f(_,v,b,T,0),_=b,v=T}}}function is(t,e){return[{scene:t,L:_e[t.level],rel:1,fl:Ul(t,e)}]}const Zo={mergeKm:.5,mergeEnv:.8,ds:.2,split:.2,adapt:7.5};function mc(t,e,o={},s=0){const a=t.scene,n=t.L,r=t.rel,i=o.memo===!1?t.fl:Ol(t.fl),l=[],c=new Fo(o.mergeEnv??0,o.maxLenEnv??8,o.cellEnv??4,null,o.keys?s:null),u=()=>new Fo(o.mergeCore??0,o.maxLen??2,o.cellCore??1,o.mergeKm??null,o.keys?s+1+l.length:null),h=a.foldThick??n.foldThick,f=!a.ticks&&!a.noLayers,m=a.seed??0,p=.5,d=a.iso?null:uc,_=f&&n.layers4?1+n.layers4.d.length:1;for(let M=0;M<_;M++)l.push(u());const v=a.kR??n.kR,A=i.yc,[g,w]=a.sRange??n.sRange,b=(M,P,L,C,O,z,j,q,B)=>M.add(P,L,C*C,0,C*C,O,z,j,q,B),T=(M,P,L,C,O,z,j,q,B,ee,Z)=>{const W=d??z,Y=W*W,ue=z*z;M.add(P,L,Y*C*C+ue*O*O,(Y-ue)*C*O,Y*O*O+ue*C*C,j,q,B,ee,Z)};let k=0;Yi(i,g,w,9,(M,P)=>{const L=.5*(M+P),[C,O]=i.pos(L),z=a.ticks?null:i.info(L),j=n.act!=null?jt(n,L,e,m):0,q=i.pos(L-p),B=i.pos(L+p),ee=i.base(L-p),Z=i.base(L+p),W=B[0]-q[0],Y=B[1]-q[1],ue=Math.hypot(W,Y)||1,te=W/ue,le=Y/ue,V=Math.atan2(Y,W)-Math.atan2(Z-ee,2*p),ne=Math.cos(V),de=ne>0?1-ne*ne:1,se=Po(a,n,L,e,z,j,V),me=(P-M)*se.F*r;if(!(me>1e-7))return;k++;const X=$(se.chi,0,1),Q=$(se.lam,0,1);let H=h,xe=0;a.foldThick==null&&z&&z.sw>0&&(H=Ne(h,Ne(cc,rc,z.hard),z.sw),xe=Ne(0,lc*(1-z.hard),z.sw));const ve=Math.max(.3,se.sigma)*(1+H*de),ge=$(se.env+xe*de,0,.95),tt=me*(1-ge),ot=f?$i(n,L,e):null;if(ot){const De=-le,Te=te;ot.forEach(([ke,at,Le],Ce)=>{const st=tt*at;T(l[Ce],C+De*ke,O+Te*ke,te,le,Math.max(.22,ve*Le),st,st*se.ray,$(X-hc*ke,0,1),Q,L)})}else T(l[0],C,O,te,le,ve,tt,tt*se.ray,X,Q,L);if(ge>0){const De=n.envSigma*(a.sigmaK?1.3:1),Te=me*ge;b(c,C,O-.4*De,De,Te,Te*.5*se.ray,Math.max(0,X-fc),Q,L)}},{...o,split:o.split??.2,ds:o.ds??.2});for(const M of l)M.flush();c.flush();const R=Float64Array.from(l.flatMap(M=>M.out)),F=Float64Array.from(c.out),S={core:Float32Array.from(R),env:Float32Array.from(F),kR:v,yc:A,n:k};return o.keys&&(S.coreKeys=Float64Array.from(l.flatMap(M=>M.keys)),S.envKeys=Float64Array.from(c.keys)),o.f64&&(S.core64=R,S.env64=F),S}const Nt=16;function pc(t,e,o,s=null){const a=_e[t.level],n=a.glow,r=[],i=[];if(!n||t.noGlow||t.ticks)return{parts:new Float32Array(0),keys:new Float64Array(0)};const l=n.sig,c=ac(a)/(J-1),u=.6*Nt,h=-Se-60,f=Math.floor(h/Nt),m=Math.ceil(-h/Nt);for(let p=f;p<=m;p++){const d=(p+.5)*Nt,_=oc(a,t,o,d,e);!_||!(_[1]>1e-9)||s&&![-2,0,2].some(v=>[84,150,300].some(A=>Xi(s,d,_[0]+v*l,A)))||(r.push(d,_[0],_[1]*Math.sqrt(2*Math.PI)*l*Nt,0,u*u,0,l*l,c,.3,0,0,0),i.push(p+1e5))}return{parts:Float32Array.from(r),keys:Float64Array.from(i)}}const we=12,_c=65535;function jo(){let t=new Map,e=new Map,o=[],s=0,a=0;return{get n(){return s},step(n){const r=new Int32Array(n.length);let i=0,l=0;for(let c=0;c<n.length;c++){const u=n[c];let h=t.get(u);h==null&&(h=o.length?o.pop():s++,t.set(u,h),i++),r[c]=h,e.set(u,a)}for(const[c,u]of t)a-e.get(c)>=3&&(t.delete(c),e.delete(c),o.push(u),l++);return a++,{slots:r,born:i,freed:l,n:s,live:t.size}},save:()=>({slot:new Map(t),last:new Map(e),free:o.slice(),n:s,k:a}),restore(n){t=new Map(n.slot),e=new Map(n.last),o=n.free.slice(),s=n.n,a=n.k}}}function xc(t,e,o,s){const a=new Float32Array(o*we);for(let n=0,r=e.length;n<r;n++){const i=e[n],l=i*we,c=sc*n;a[l]=t[c]-s[0],a[l+1]=t[c+1]-s[1],a[l+2]=t[c+2],a[l+3]=t[c+3],a[l+4]=t[c+4],a[l+5]=t[c+5],a[l+6]=t[c+6],a[l+7]=t[c+7],a[l+8]=t[c+8],a[l+9]=i%16,a[l+10]=_c,a[l+11]=1}return a}const Re=["core","env","glow"],vc=()=>({core:jo(),env:jo(),glow:jo()});function Vi(t,e,o){let s=0,a=0,n=0;const r={};for(const i of Re){const l=e[i].step(t[i].keys);r[i]={data:xc(t[i].parts,l.slots,l.n,o),n:l.n},s+=l.born,a+=l.freed,n+=l.live}return{sets:r,born:s,freed:a,live:n}}const ft=48,Da=6;function Qo({n:t,data:e}){const o=new Float64Array(Math.ceil(t/ft)*Da);for(let s=0;s<t;s+=ft){let a=1/0,n=-1/0,r=1/0,i=-1/0,l=0,c=0;for(let u=s*we,h=Math.min(t,s+ft)*we;u<h;u+=we){if(!e[u+11])continue;const f=e[u],m=e[u+1];a=Math.min(a,f),n=Math.max(n,f),r=Math.min(r,m),i=Math.max(i,m),l=Math.max(l,e[u+4]),c=Math.max(c,e[u+6])}o.set([a,n,r,i,l,c],s/ft*Da)}return o}function gc(t,e,o,s,a,n,r){const i=Math.max(...t.map(h=>h.n)),l=s.map(()=>[]),c=s.map((h,f)=>{const m=h.tanH*(1+n),p=[h.r,h.up].flatMap(_=>[-1,1].map(v=>h.f.map((A,g)=>m*A+v*_[g]))),d=r?.[f];return d?[...p,...d]:p}),u=o.reduce((h,f)=>h+Math.max(0,-f),0);for(let h=0;h<i;h+=ft){const f=h/ft*Da;let m=1/0,p=-1/0,d=1/0,_=-1/0,v=0,A=0;for(const P of e)f>=P.length||(m=Math.min(m,P[f]),p=Math.max(p,P[f+1]),d=Math.min(d,P[f+2]),_=Math.max(_,P[f+3]),v=Math.max(v,P[f+4]),A=Math.max(A,P[f+5]));if(m>p)continue;const g=(p-m)*u,w=(_-d)*u;m-=g,p+=g,d-=w+(ht-Eo)*Et,_+=w-($e-Eo)*Et;const b=Math.max(m*m,p*p)+Math.max(d*d,_*_),T=b/(fe*fe),k=(1+$e/fe)*(1-T/6),R=1+ht/fe,F=R*a*Math.sqrt(1+u)*(Math.sqrt(v)+Math.sqrt(A))+4,S=[Math.min(k*m,R*m)-F,Math.min(k*d,R*d)-F,$e-(fe+ht)*T/2-F],M=[Math.max(k*p,R*p)+F,Math.max(k*_,R*_)+F,ht+F];for(let P=0;P<c.length;P++){if(T<=.0625&&c[P].some(([z,j,q])=>z*(z<0?S[0]:M[0])+j*(j<0?S[1]:M[1])+q*(q<0?S[2]:M[2])<0))continue;const L=l[P],C=L[L.length-1],O=Math.min(ft,i-h);C&&C[0]+C[1]===h?L[L.length-1]=[C[0],C[1]+O]:L.push([h,O])}}return l}const Ao=20,za=.25,Zi=6,Be=61,Ac=5,yc=12,Ht=256,Kt=193,ji=5,Qi=16,Ji=Math.sqrt(Math.PI/2);function No(t){const e=1/(1+.5*t);return e*Math.exp(-1.26551223+e*(1.00002368+e*(.37409196+e*(.09678418+e*(-.18628806+e*(.27886807+e*(-1.13520398+e*(1.48851587+e*(-.82215223+e*.17087277)))))))))}function bc(t,e){if(t<.25){const a=1-e,n=t*t,r=(a**3+e**3)/3,i=(a**5+e**5)/5,l=(a**7+e**7)/7;return 1-.5*n*r+.125*n*n*i-n*n*n*l/48}const o=t*e/Math.SQRT2,s=t*(1-e)/Math.SQRT2;return Ji/t*(2-No(o)*Math.exp(-o*o)-No(s)*Math.exp(-s*s))}const wc=[.0694318442029737,.3300094782075719,.6699905217924281,.9305681557970263],Mc=[.1739274225687269,.3260725774312731,.3260725774312731,.1739274225687269];function Ec(t,e){if(t<.25){let a=0;for(let n=0;n<4;n++){const r=wc[n];a+=Mc[n]*Math.exp(-e*t*r-.5*t*t*r*r)}return a}const o=e/Math.SQRT2,s=(e+t)/Math.SQRT2;return Ji/t*(No(o)-No(s)*Math.exp(-e*t-.5*t*t))}function Rc(){const t=Ht,e=Kt,o=new Float32Array(t*e*2);for(let s=0;s<e;s++){const a=2**(Qi*s/(e-1))-1,n=Math.max(1,a);for(let r=0;r<t;r++){const i=ji*r/(t-1),l=2*(s*t+r);o[l]=n*bc(a,Math.min(.5,i/Math.max(2,a))),o[l+1]=n*Ec(a,i)}}return or(o)}const Sc=(t,e)=>{const o=fe*e,s=t*(2*fe+t);return s/(o+Math.sqrt(o*o+s))};function Tc(t){const e=t+1+2*(Ao+1),o=new Float64Array(e*Be*(t+1)),s=[.1834346424956498,.525532409916329,.7966664774136267,.9602898564975363],a=[.362683783378362,.3137066458778873,.2223810344533745,.1012285362903763],n=new Float64Array(t+1);for(let r=0;r<Be;r++){const i=2**(r/Zi)-1;for(let l=0;l<e;l++){let c=0,u;l<=t?u=l/t:l<=t+1+Ao?(c=-1,u=(l-t-1)*za):(c=1,u=(l-t-2-Ao)*za);const h=_=>c===0?Math.exp(-.5*(i*(_-u))**2):(()=>{const v=c<0?_:1-_;return Math.exp(-u*i*v-.5*i*i*v*v)})(),f=c===0?Math.max(0,i>0?u-9/i:0):c<0?0:Math.max(0,i>0?1-9/i:0),m=c===0?Math.min(1,i>0?u+9/i:1):c<0?Math.min(1,i>0?9/i:1):1;n.fill(0);let p=0;for(let _=f;_<m-1e-14;){const v=(Math.floor(_*t+1e-9)+1)/t,A=Math.min(m,v,_+(i>0?1/i:1)),g=.5*(A-_),w=.5*(_+A);for(let b=0;b<4;b++)for(const T of[-1,1]){const k=w+T*g*s[b],R=a[b]*g*h(k),F=k*t,S=Math.min(t-1,Math.max(0,Math.floor(F))),M=F-S;n[S]=n[S]+R*(1-M),n[S+1]=n[S+1]+R*M,p+=R}_=A}const d=(r*e+l)*(t+1);for(let _=0;_<=t;_++)o[d+_]=p>0?n[_]/p:_===Math.round(u*t)?1:0}}return{width:e,alpha:o}}function Fc(t,e,o){const s=t[0].length,a=t.map(l=>Float64Array.from(l)),n=[],r=t.map(()=>[]);let i=0;for(;;){i=0;let l=-1,c=0;for(let m=0;m<a.length;m++)for(let p=0;p<s;p++){const d=Math.abs(a[m][p]);d>i&&(i=d,l=m,c=p)}if(i<=e||n.length>=o||l<0)break;const u=Float64Array.from(a[l]);let h=0;for(const m of u)h=Math.max(h,Math.abs(m));for(let m=0;m<s;m++)u[m]=u[m]/h;const f=u[c];for(let m=0;m<a.length;m++){const p=a[m],d=p[c]/f;if(r[m].push(d),d!==0)for(let _=0;_<s;_++)p[_]=p[_]-d*u[_]}n.push(u)}return{basis:n,coef:r.map(l=>Float64Array.from(l)),resid:i}}function er(t){const e=Nc(t);return{meta:{B:t.B,n:t.n,bandW:t.bandW,width:t.width,height:t.height,layers:t.layers,nl:t.nl,groupRows:t.groupRows,ngroup:t.ngroup,tol:t.tol,tiledW:t.tiled.w,tiledH:t.tiled.h,tilesX:t.tiled.tilesX,residMax:t.stats.residMax,rankMax:t.stats.rankMax,ms:t.stats.ms},half:or(t.tiled.data),coef:e.data,coefW:e.w,coefH:e.h}}function Ia(t,e=16,o=.002,s=yc,a=Ac){const n=typeof performance<"u"?performance.now():0,r=Math.ceil((J-1)/a),i=Math.round((ht-$e)/Qe/e),l=i*Qe,c=t.h,u=t.data,{width:h,alpha:f}=Tc(i),m=(M,P,L,C)=>u[4*((M*c+P)*Ie+L)+C],p=new Float64Array(J*c*4);for(let M=0;M<J;M++)for(let P=0;P<c;P++)for(let L=0;L<4;L++){let C=0;for(let O=0;O<Ie;O++)C=Math.max(C,Math.abs(m(M,P,O,L)));p[(M*c+P)*4+L]=C}const d=[],_=[];let v=0,A=0,g=0;const w=[...Array(c).keys()];for(let M=0;M<e;M++){const P=M*i,L=[];for(let C=0;C<r;C++){const O=C*a,z=Math.min(J-1,O+a),j=z-O+1,q=[],B=[];for(const[te,le]of[[0,[0]],[1,[0]],[2,w],[3,w]])for(let V=O;V<=z;V++)for(const ne of le){const de=p[(V*c+ne)*4+te],se=new Float64Array(i+1);if(de>0)for(let me=0;me<=i;me++)se[me]=m(V,ne,P+me,te)/de;q.push(se),B.push({pk:de})}const ee=Fc(q,o,s),Z=ee.basis.length;A=Math.max(A,Z),g=Math.max(g,ee.resid);const W=new Float64Array(q.length*Math.max(1,Z));B.forEach((te,le)=>{for(let V=0;V<Z;V++)W[le*Z+V]=te.pk*ee.coef[le][V]});const Y=Math.ceil(Z/4),ue=v;v+=Y;for(let te=0;te<Y;te++){const le=new Float32Array(h*Be*4);for(let V=0;V<Be;V++)for(let ne=0;ne<h;ne++){const de=(V*h+ne)*(i+1);for(let se=0;se<4;se++){const me=4*te+se;if(me>=Z)break;let X=0;const Q=ee.basis[me];for(let H=0;H<=i;H++)X+=f[de+H]*Q[H];le[(V*h+ne)*4+se]=X}}_.push(le)}L.push({r:Z,chunks:Y,layer0:ue,coef:W,c0:O,nc:j,nl:c,resid:ee.resid})}d.push({i0:P,ha:$e+M*l,groups:L})}const b=Math.min(Math.floor(4096/h),v),T=Math.ceil(v/b),k=b*h,R=T*Be,F=new Float32Array(k*R*4);for(let M=0;M<v;M++){const P=M%b*h,L=Math.floor(M/b)*Be,C=_[M];for(let O=0;O<Be;O++)F.set(C.subarray(O*h*4,(O+1)*h*4),((L+O)*k+P)*4)}const S=typeof performance<"u"?performance.now()-n:0;return{B:e,n:i,bandW:l,width:h,height:Be,layers:v,tiled:{data:F,w:k,h:R,tilesX:b},bands:d,nl:c,groupRows:a,ngroup:r,tol:o,stats:{rankMax:A,residMax:g,ms:S}}}function tr(t,e){if(e===16)return Ia(t,16);let o=null;for(const s of[5,3,2,1])if(o=Ia(t,e,.002,12,s),o.stats.residMax<=.0021)break;return o}function Nc(t){const e=t.ngroup,o=i=>2*i.nc+2*i.nc*i.nl;let s=0;for(const i of t.bands)for(const l of i.groups)s=Math.max(s,o(l));const a=1+3*s,n=t.B*e,r=new Float32Array(a*n*4);return t.bands.forEach((i,l)=>i.groups.forEach((c,u)=>{const h=l*e+u,f=h*a*4,m=c.r;r.set([c.layer0,c.chunks,c.nc,m],f);for(let p=0;p<o(c);p++)for(let d=0;d<m;d++)r[f+4*(1+3*p+(d>>2))+(d&3)]=c.coef[p*m+d]})),{data:r,w:a,h:n}}const kc=t=>new Float32Array(t*J*2).fill(1);function or(t){const e=new Uint16Array(t.length),o=new Float32Array(1),s=new Uint32Array(o.buffer);for(let a=0;a<t.length;a++){o[0]=t[a];const n=s[0],r=n>>>16&32768,i=n>>>23&255,l=n&8388607;if(i===255){e[a]=r|31744|(l?512:0);continue}const c=i-127+15;if(c>=31){e[a]=r|31744;continue}if(c<=0){if(c<-10){e[a]=r;continue}const f=l|8388608,m=14-c,p=f>>>m,d=f&(1<<m)-1,_=1<<m-1;e[a]=r|p+(d>_||d===_&&p&1?1:0);continue}let u=c<<10|l>>>13;const h=l&8191;(h>4096||h===4096&&u&1)&&u++,e[a]=r|u}return e}const ae={DX:8,HALF:720,SIG_ALONG:24,SIG_N:16,HP:62,H0:150,H1:620,NSEG:24,TAU_RAD:110,Q200:.098,QH:42,YE0:.5,YR0:.15,YR1:.8,RAY_SMOOTH:12,DS:2},Gt=Math.round(2*ae.HALF/ae.DX)+1,Lc={R0:.1,E0:3,RMIN:.01,RMAX:3,RAY_KEV:[2,.3],RAY_HARD:1.5},Qt=3,ar={chiShift:0,lamShift:0,rayK:1},Jo=[116,109,102,96],Cc=t=>{const e=$(t,0,1)*3,o=Math.min(2,Math.floor(e)),s=e-o;return Jo[o]+(Jo[o+1]-Jo[o])*s},sr=t=>10*Math.exp((107-Cc(t))/11),je=Lc,nr=(t,e=Qt)=>e*$(je.R0*Math.pow(t/je.E0,-1.4),je.RMIN,je.RMAX),ir=(t,e=Qt)=>nr(sr(t),e),rr=(t,e,o=Qt)=>nr(Math.exp(Math.log(je.RAY_KEV[0])+(Math.log(je.RAY_KEV[1])-Math.log(je.RAY_KEV[0]))*e)*Math.pow(sr(t)/10,je.RAY_HARD),o),Pc=t=>1/(1/ae.TAU_RAD+ae.Q200*Math.exp(-(t-200)/ae.QH)),Uc=t=>t<=ae.H0?0:U((t-ae.H0)/20)*Math.exp(-(t-ae.H0)/ae.HP)*(Pc(t)/ae.TAU_RAD)*(1-U((t-(ae.H1-60))/60));let ea=null;function Oc(){if(ea)return ea;const t=ae,e=4700,o=(t.H1-t.H0)/e,s=new Float64Array(e+1);for(let r=0;r<e;r++)s[r+1]=s[r]+Uc(t.H0+(r+.5)*o)*o;const a=[];let n=0;for(let r=0;r<t.NSEG;r++){const i=s[e]*(r+.5)/t.NSEG;for(;s[n+1]<i;)n++;a.push(t.H0+(n+(i-s[n])/(s[n+1]-s[n]))*o)}return ea={mid:a,norm:s[e]}}let ta=null;function lr(){if(ta)return ta;const t=ns(),e=new Float64Array(J),o=new Float64Array(J),s=new Float64Array(J*t.nlam);for(let a=0;a<J;a++){let n=0,r=0;for(let i=0;i<t.n;i++)n+=t.low[0][a*t.n+i],r+=t.low[1][a*t.n+i];e[a]=n*Qe,o[a]=r*Qe;for(let i=0;i<t.nlam;i++){let l=0;for(let c=0;c<t.n;c++)l+=t.ray[1][(a*t.nlam+i)*t.n+c];s[a*t.nlam+i]=l*Qe}}return ta={Clow:e,ClowG:o,Cray:s,nlam:t.nlam}}const Dc=()=>lr(),Ba={kind:"dynamic",K:Qt,weather:ar};function zc(t,e,o,s){const a=lr(),n=o.kind==="dynamic"?o:null,r=n?.weather??ar,i=n?.K??Qt,l={arc:0,ray:0,green:0,parts:0};for(const{scene:c,L:u,rel:h,fl:f}of is(t,e)){const m=c.seed??0,p={...c,noFine:!0},d=!!c.ticks,_=d?.25:ae.DS,[v,A]=c.sRange??u.sRange,g=Math.max(v,-Se-60),w=Math.min(A,Se+60),b=[];for(let R=g+.5*_;R<w;R+=_){const F=d?null:f.info(R),S=u.act!=null&&!d?jt(u,R,e,m):0,M=Po(p,u,R,e,F,S,0),P=_*M.F*h;b.push(P>1e-7?{s:R,w:P,chi:$(M.chi+r.chiShift,0,1),lam:$(M.lam+r.lamShift,0,1),ray:M.ray*r.rayK}:null)}const T=d?0:Math.round(2.5*ae.RAY_SMOOTH/_),k=[];for(let R=-T;R<=T;R++)k.push(Math.exp(-.5*(R*_/ae.RAY_SMOOTH)**2));for(let R=0;R<b.length;R++){const F=b[R];if(!F)continue;let S=0,M=0;for(let Y=-T;Y<=T;Y++){const ue=b[R+Y];ue&&(S+=k[Y+T]*ue.ray,M+=k[Y+T])}const P=M>0?S/M:F.ray,{w:L,chi:C,lam:O}=F,[z,j]=f.pos(F.s),q=Math.round(C*(J-1)),B=Math.round(O*(a.nlam-1)),ee=n?L*ir(C,i)*a.ClowG[q]:L*ae.YE0*Math.exp(-3.2*C)*a.Clow[q],Z=L*P*(n?rr(C,O,i):ae.YR0+ae.YR1*O)*a.Cray[q*a.nlam+B],W=L*(a.ClowG[q]+P*a.Cray[q*a.nlam+B]);s&&s(z,j,ee,Z,W),l.arc+=ee,l.ray+=Z,l.green+=W,l.parts++}}return l}function Ic(t,e,o=Ba){const s=ae,a=Gt,n=new Float64Array(a),r=new Float64Array(a),i=zc(t,e,o,(_,v,A,g)=>{const w=(_+s.HALF)/s.DX,b=Math.floor(w),T=w-b,k=(A+g)/s.DX;b>=0&&b<a-1&&(n[b]=n[b]+k*(1-T),n[b+1]=n[b+1]+k*T,r[b]=r[b]+k*(1-T)*v,r[b+1]=r[b+1]+k*T*v)}),l=Math.ceil(3*s.SIG_ALONG/s.DX),c=[],u=new Float64Array(a),h=new Float64Array(a);let f=0;for(let _=-l;_<=l;_++){const v=Math.exp(-.5*(_*s.DX/s.SIG_ALONG)**2);c.push(v),f+=v}for(let _=0;_<a;_++)for(let v=-l;v<=l;v++){const A=_+v;A>=0&&A<a&&(u[_]=u[_]+c[v+l]*n[A]/f,h[_]=h[_]+c[v+l]*r[A]/f)}const m=new Float32Array(a),p=is(t,e)[0].fl;let d=0;for(let _=0;_<a;_++)u[_]>d&&(d=u[_]);for(let _=0;_<a;_++)m[_]=u[_]>1e-6*d?h[_]/u[_]:p.base(-720+_*s.DX);return{n:a,x0:-720,dx:s.DX,A:Float32Array.from(u),Y:m,kR:t.kR??_e[t.level].kR,sigN:s.SIG_N,t:e,totals:i}}const Bc=t=>(t.arc+t.ray)/Math.max(1e-300,t.green),Ge=t=>(t|=0,t=Math.imul(t^t>>>16,2146121005),t=Math.imul(t^t>>>15,2221713035),(t^t>>>16)>>>0),qt=t=>t/4294967296,oe=(t,e)=>qt(Ge(t+Math.imul(e,1663821227)|0)),ie=(t,e)=>t[0]+(t[1]-t[0])*e,Mt=(t,e,o)=>t<e?e:t>o?o:t,re=t=>t<=0?0:t>=1?1:t*t*t*(t*(6*t-15)+10);function kt(t,e){const o=Math.floor(t),s=t-o,a=qt(Ge(Math.imul(o,2654435761)^Ge(e|0)))*2-1,n=qt(Ge(Math.imul(o+1,2654435761)^Ge(e|0)))*2-1;return a+(n-a)*re(s)}const cr=[{name:"弱",P:1500,jit:.5,pEvent:.3,A:[.35,.7],Aq:[.05,.2],gain:2.2,fade:[.1,.3],pFade:.5,sigF:.14,chiAct:.14,chiRec:.06,sigChi:.03,chiF:.1,lag:[60,120],yG:[4,12],yX:[0,8],tX:[120,240],pPuls:.25,nSteps:[1,2],stepGap:[90,200],stepH:[.3,.6],stepDecay:[.25,.45],tauD:[80,160],sigB:.26,PB:260},{name:"中",P:900,jit:.5,pEvent:.7,A:[.45,1],Aq:[.1,.3],gain:3,fade:[.15,.4],pFade:.5,sigF:.18,chiAct:.2,chiRec:.08,sigChi:.04,chiF:.12,lag:[60,120],yG:[12,30],yX:[10,35],tX:[100,200],pPuls:.4,nSteps:[2,3],stepGap:[60,150],stepH:[.35,.75],stepDecay:[.3,.5],tauD:[60,140],sigB:.2,PB:200},{name:"强",P:660,jit:.5,pEvent:.85,A:[.5,1],Aq:[.15,.35],gain:2.8,fade:[.15,.45],pFade:.5,sigF:.2,chiAct:.24,chiRec:.1,sigChi:.045,chiF:.12,lag:[50,110],yG:[20,50],yX:[30,80],tX:[90,180],pPuls:.5,nSteps:[2,4],stepGap:[50,130],stepH:[.4,.85],stepDecay:[.3,.55],tauD:[50,120],sigB:.16,PB:180},{name:"大磁暴",P:480,jit:.45,pEvent:.95,A:[.6,1],Aq:[.2,.4],gain:3.2,fade:[.1,.4],pFade:.4,sigF:.22,chiAct:.26,chiRec:.1,sigChi:.05,chiF:.12,lag:[40,100],yG:[60,140],yX:[60,130],tX:[80,160],pPuls:.5,nSteps:[3,5],stepGap:[40,110],stepH:[.45,.9],stepDecay:[.3,.55],tauD:[40,100],sigB:.14,PB:160}],Gc=cr.map((t,e)=>({...t,...[{nSteps:[1,2],stepH:[.4,.7]},{P:960,gain:2.6,nSteps:[2,4],stepGap:[55,130],stepH:[.65,.95],stepDecay:[.8,.95],tauD:[25,55],yG:[10,24],yX:[8,24]},{P:760,gain:2.3,nSteps:[3,5],stepGap:[45,100],stepH:[.7,1],stepDecay:[.85,.98],tauD:[20,45],yG:[15,32],yX:[20,45]},{P:560,gain:2.7,nSteps:[3,5],stepGap:[40,90],stepH:[.75,1],stepDecay:[.85,.98],tauD:[18,42],yG:[8,22],yX:[30,60]}][e],v9:!0})),pt={stretch:1},Ga=9,$c=[.38,.42,.48,.52],oa=[116,109,102,96],Wc=t=>{const e=Mt(t,0,1)*3,o=Math.min(2,Math.floor(e)),s=e-o;return oa[o]+(oa[o+1]-oa[o])*s},Hc=t=>10*Math.exp((107-t)/11),Kc=[3,9],qc=[1,8];function ur(t,e){return Math.imul(e|0,625341585)^Math.imul(t+1,1759714724)|0}function ko(t,e,o){return(e+t.jit*(qt(Ge(Math.imul(e,2654435761)+77+o|0))-.5))*t.P*pt.stretch}function $a(t,e,o){const s=pt.stretch;let a=Math.floor(o/(t.P*s));return o<ko(t,a,e)?a--:o>=ko(t,a+1,e)&&a++,hr(t,e,a)}function hr(t,e,o){const s=pt.stretch,a=ko(t,o,e),n=ko(t,o+1,e),r=n-a,i=Ge(Math.imul(o,40503)+991+e|0),l=oe(i,1)<t.pEvent,c=t.v9?ie([.05,.2],oe(i,2)):ie([.08,.3],oe(i,2)),u=c+(t.v9?ie([.16,.28],oe(i,3)):ie([.22,.38],oe(i,3)));let h=Math.min(.82,u+ie([.12,.24],oe(i,4)));const f=Math.min(ie(l?[20,60]:[60,150],oe(i,6)),.6*(h-u)*r),m=l?t.nSteps[0]+Math.floor((t.nSteps[1]-t.nSteps[0]+.999)*oe(i,16)):1,p=[];let d=0;for(let g=0;g<m;g++){const w=Ge(i+Math.imul(g+1,795562403)|0);g&&(d+=ie(t.stepGap,oe(w,1))*s);const b=g?ie([20,45],oe(w,2)):f;if(g&&u+(d+b+40*s)/r>.8)break;p.push({t:d,r:b,h:g?ie(t.stepH,oe(w,3)):1,d:ie(t.stepDecay,oe(w,4)),tau:ie(t.tauD,oe(w,5))*s})}const _=p[p.length-1];h=Math.max(h,Math.min(.8,u+(_.t+_.r+.6*_.tau)/r));let v=0;for(const g of p){let w=0;for(const b of p){if(b.t>g.t)break;const T=g.t+g.r-b.t;w+=b.h*re(T/b.r)*(1-b.d*re((T-b.r)/b.tau))}v=Math.max(v,w)}const A=p.reduce((g,w)=>g+w.h,0);return{k:o,a,b:n,D:r,event:l,uq:c,uo:u,ue:h,to:a+u*r,steps:p,norm:v,hs:A,A:ie(l?t.A:t.Aq,oe(i,5)),rise:f,fade:oe(i,7)<t.pFade?ie(t.fade,oe(i,8)):0,lag:ie(t.lag,oe(i,9))*s,yG:ie(t.yG,oe(i,10)),yX:l?ie(t.yX,oe(i,11)):0,tX:Math.min(ie(t.tX,oe(i,12))*s,.8*(1-u)*r),puls:l&&oe(i,13)<t.pPuls,pulsOn:ie(Kc,oe(i,14)**2),pulsOff:ie(qc,oe(i,15)**2)}}function Bs(t,e){let o=0;for(const s of t.steps){const a=e-t.to-s.t;if(!(a>0))break;o+=s.h*re(a/s.r)*(1-s.d*re((a-s.r)/s.tau))}return o/t.norm}const rs=t=>t===9?Gc:cr,fr=(t,e)=>qt(Ge(e^1374496523))*64*t.P*pt.stretch;function dr(t,e,o,s=8){const a=rs(s)[t],n=ur(t,e),r=pt.stretch,i=o+fr(a,n),l=$a(a,n,i),c=(i-l.a)/l.D,u=i-l.to,h=Math.min(.97-l.ue,Math.max(.35*(1-l.ue),110*r/l.D)),f=re(u/l.rise),m=re((c-l.ue)/h),p=1-re((c-.88)/.12),d=re((c-l.uq)/(.3*(l.uo-l.uq)))*(1-f),_=f*(1-m),v=m*p,A=l.ue+.45*(1-l.ue),g=l.puls?v*re((c-A)/.08):0,w=v-g,b=Math.max(0,1-d-_-v),T=Math.max(0,1-(c-l.ue)/(1-l.ue)),k=Bs(l,i),R=l.A*(k*(1-m)+.3*v*T),F=l.A*(Bs(l,i-l.lag)*(1-m)+.3*v*T),S=.75*kt(i/(240*r),n+11)+.5*kt(i/(75*r),n+12),M=kt(i/(a.PB*r),n+13)+.4*kt(i/(.37*a.PB*r),n+14),P=Math.exp(a.sigF*S+a.sigB*M)*(1+(a.gain-1)*R)*(1-l.fade*d),L=a.chiAct*F-a.chiRec*w+a.chiF*(a.sigF*S+a.sigB*M)+a.sigChi*kt(i/(150*r),n+21);let C=0;const O=Math.max(40,1.5*l.tX/l.steps.length);for(const j of l.steps){const q=u-j.t;if(!(q>0))break;C+=j.h/l.hs*re(q/Math.min(O,.9*(l.b-l.to-j.t)))}const z=-l.yG*re((c-l.uq)/(l.uo-l.uq))+(l.yG+l.yX)*C-l.yX*re((c-l.ue)/(1-l.ue));return{C:a,c:l,u:c,tp:i,w:{quiet:b,growth:d,expansion:_,recovery:w,pulsating:g},act:R,flux:P,dChi:L,dY:z}}const Gs=new Map;function Xc(t=8){let e=Gs.get(t);return e||(e=rs(t).map((o,s)=>{let a=0,n=0,r=0,i=0;for(let l=0;l<4;l++)for(let c=0;c<6e3;c++){const u=dr(s,9001+l,c*(o.P*pt.stretch/23.7),t);a+=u.flux,n+=u.act,r+=u.dChi,i++}return{flux:a/i,act:n/i,dChi:r/i}}),Gs.set(t,e),e)}function Yc(t,e,o,s,a=9){const n=Mt(Math.round(t),0,3),r=rs(a)[n],i=ur(n,e),l=fr(r,i),c=[],u=$a(r,i,o+l).k,h=$a(r,i,s+l).k;for(let f=u;f<=h;f++){const m=hr(r,i,f);m.steps.forEach((p,d)=>{const _=m.to+p.t-l;_>=o&&_<=s&&c.push({t:_,r:p.r,h:p.h,d:p.d,tau:p.tau,q:d,k:f,A:m.A,event:m.event,n:m.steps.length})})}return c}const $s=["quiet","growth","expansion","recovery","pulsating"],Vc={quiet:"平静",growth:"增长",expansion:"膨胀",recovery:"恢复",pulsating:"脉动"};function Xt(t,e,o,s=8){const a=Mt(Math.round(t),0,3),n=dr(a,e,o,s),r=Xc(s)[a],{c:i,w:l}=n;let c=$s[0];for(const b of $s)l[b]>l[c]&&(c=b);const u=Math.min(1,i.A/.45),h=l.expansion*u,f=l.recovery*u,m=l.pulsating*u,p=n.act,d=p-r.act,_=n.flux/r.flux,v=n.dChi-r.dChi,A=f+m,g=Mt($c[a]+v,0,1),w=Wc(g);return{t:o,level:a,seed:e,phase:{name:c,nameCn:Vc[c],...l,cycle:i.k,u:n.u,event:i.event,strength:u},drivers:{act:p,flux:_,dChi:v,dY:n.dY},derived:{kRK:_,chiMean:g,peakKm:w,eKeV:Hc(w),rayK:Math.max(.2,1+1.2*d),lamShift:Mt(-.6*v+.08*A,-.25,.25),fineK:Math.max(.3,1+.8*d),vortK:Math.max(0,1+1.5*d),speedK:Math.max(.4,1+.8*d),pulseK:Math.max(0,1+1.2*d),sigmaK:1+.5*A-.15*h,envShift:.15*A-.1*h,glowK:1+1.5*f+3*m-.5*l.growth,glowSigK:1+.3*A,companionK:Math.max(0,1+.5*l.growth+1*h-.5*A),gapK:1+2*A-.5*h,fragK:1+3*A,pulsating:m,pulsOnS:i.pulsOn,pulsOffS:i.pulsOff}}}const Lt=new Map,Zc=8;function jc(t,e,o=8){const s=t+"|"+e+"|"+pt.stretch+(o===8?"":"|v"+o);let a=Lt.get(s);if(!a){const n=Xt(t,e,0,o).derived.speedK;a={pos:[0],neg:[0],kp:[n],kn:[n]},Lt.size>=Zc&&Lt.delete(Lt.keys().next().value),Lt.set(s,a)}return a}function Qc(t,e,o,s=8){const a=Mt(Math.round(t),0,3),n=jc(a,e,s),r=o<0,i=Math.abs(o),l=Math.floor(i),c=i-l,u=r?n.neg:n.pos,h=r?n.kn:n.kp;for(;u.length<=l+1;){const d=u.length,_=Xt(a,e,r?-d:d,s).derived.speedK;h.push(_),u.push(u[d-1]+.5*(h[d-1]+_))}const f=h[l],m=h[l+1],p=c*f+.5*c*c*(m-f);return r?-(u[l]+p):u[l]+p}const Jc="growth2";function e0(t,e,o=Jc,s=0,a=4e3){let n=Xt(t,e,s,9).phase.expansion,r=null;for(let i=s+1;i<a;i+=1){const l=Xt(t,e,i,9),c=l.phase.expansion;if(l.phase.growth>.5&&r==null&&(r=i),l.phase.quiet>.6&&(r=null),n<=.5&&c>.5&&l.phase.event){if(o==="onset")return{onset:i,T0:Math.max(s,i-10)};if(o==="quiet")return{onset:i,T0:Math.max(s,i-170)};const u=r??i-60;return{onset:i,T0:Math.round(Math.max(s,.5*(u+i)))}}n=c}return{onset:s,T0:s}}const t0=[1.8,7,18,22],Pe=t=>({side:1,cell:500,epoch:150,prob:.4,off:[40,68],rel:[.35,.6],len:[180,360],kind:"long",brk:.25,...t}),aa=t=>Pe({kind:"short",cell:300,epoch:120,prob:.03,len:[50,100],rel:[.3,.5],...t}),o0=[null,{amp:.003,sig:45,off:-15,chi:.2,cut:-4,cutW:10},{amp:.003,sig:45,off:-15,chi:.2,cut:-4,cutW:10},{amp:.002,sig:30,off:-40,chi:.2,cut:-4,cutW:10}],mr=[{cell:500,epoch:200,prob:.2,mix:[.55,.45,0]},{cell:380,epoch:150,prob:.35,mix:[.45,.4,.15]},{cell:300,epoch:120,prob:.5,mix:[.4,.45,.15]},{cell:300,epoch:115,prob:.5,mix:[.4,.45,.15]}],_t=_e.map((t,e)=>({...t,kR:t0[e],glow:o0[e],fineArcs:[null,null,{cell:160,epoch:40,prob:.3},{cell:150,epoch:36,prob:.45}][e]??null,comp8:[null,[Pe({cell:640,epoch:220,prob:.35,off:[42,66],rel:[.3,.5],len:[170,300],brk:.15}),aa({prob:.02})],[Pe({cell:560,epoch:150,prob:.5,off:[42,70],rel:[.35,.65],len:[190,380],brk:.3}),Pe({cell:620,epoch:170,prob:.35,off:[90,120],rel:[.25,.45],len:[180,340],brk:.3}),Pe({side:-1,cell:620,epoch:170,prob:.35,off:[42,66],rel:[.25,.5],len:[170,320],brk:.3}),Pe({kind:"full",cell:900,epoch:320,prob:.3,off:[46,70],rel:[.7,1],len:[340,560],brk:0}),aa({prob:.04})],[Pe({cell:520,epoch:140,prob:.55,off:[42,74],rel:[.35,.8],len:[200,400],brk:.35}),Pe({cell:600,epoch:160,prob:.45,off:[90,125],rel:[.25,.5],len:[180,360],brk:.35}),Pe({side:-1,cell:600,epoch:160,prob:.45,off:[42,72],rel:[.3,.6],len:[180,360],brk:.35}),Pe({kind:"full",cell:900,epoch:320,prob:.3,off:[46,74],rel:[.7,1],len:[340,580],brk:0}),aa({prob:.05})]][e]??null,episodes8:mr[e]})),Ws=.4,a0=_t.map(t=>({...t,act:null,fine:{...t.fine,bundle:Math.max(t.fine.bundle,.36),hem:Ws*t.fine.hem,hemAct:Ws*t.fine.hemAct}})),s0=t=>({cellKm:80,epochS:8,prob:.4,train:[1,2],a:[1.8,3.5],th:[1.4,2.6],lifePerKm:[1.5,2.1],v:[1.5,4],sign:-1,off:.2,hard:.55,...t}),n0=t=>({cellKm:170,epochS:14,prob:.5,train:[1,2],a:[4,8],th:[1.6,3],lifePerKm:[1.2,1.6],v:[.8,2.4],sign:-1,off:.2,hard:.5,...t}),i0=[1,2,3].map(t=>({..._e[t],name:_e[t].name+"·伴弧动法r7",act:null,blobs:null,vort:{classes:[s0({prob:[0,.35,.4,.45][t]}),n0({prob:[0,.4,.5,.55][t]})]}})),r0={0:10,1:10,2:11,3:12},Uo=t=>t>=10?i0[t-10]:_e[t],Hs=16,l0=28,pr=.22,c0=.38,u0=.8,h0=7919,sa=new Map,f0=6e4;let Ks="";function d0(t,e){if(!t.weather||t.ticks)return null;const o=t.level,s=t.weather.seed??t.seed??0,a=o+"|"+s;(a!==Ks||sa.size>f0)&&(sa.clear(),Ks=a);const n=sa,r=l=>{let c=n.get(l);return c||(c=Xt(o,s,l,Ga),n.set(l,c)),c},i=r(e);return{lv:o,seed:s,t:e,at:r,now:i,D:Qc(o,s,e,Ga),vortK:l=>Math.min(1/.45,r(l).derived.vortK),pulseK:l=>r(l).derived.pulseK}}function qs(t,e){if(!e)return t;const o=e.now.derived;return{...t,fine:{...t.fine,ray:t.fine.ray*o.rayK,hem:t.fine.hem*o.fineK,hemAct:t.fine.hemAct*o.fineK},act:t.act?{...t.act,gain:1}:t.act}}function _r(t,e){if(!e)return;const o=e.now.derived;t.lam=$(t.lam+o.lamShift,0,1),t.sigma*=o.sigmaK,t.env=$(t.env+o.envShift,.05,.9)}function Oo(t,e,o,s,a){if(!a||t.act==null)return jt(t,e,o,s);const n=t.act,r=$(a.at(o).drivers.act/.45,0,1);if(!(r>0))return 0;const i=150*D(o/500,.5,5151+s);return r*Ue((e-i)/(2*n.widthKm))}const m0=.2;function lo(t,e,o){return e*t.period+t.jitter*t.period*(be(ye(Math.imul(e,2654435761)+77+Math.imul(o,31)|0))-.5)}function p0(t,e){const o=_e[t.level],s=o.surge,a=t.seed??0;let n=Math.floor(e/s.period);e<lo(s,n,a)?n--:e>=lo(s,n+1,a)&&n++;const r=lo(s,n,a),i=lo(s,n+1,a),l=(e-r)/(i-r),c=ye(Math.imul(n,40503)+991+Math.imul(a,17)|0),u=N(s.amp,y(c,1)),h=N(s.adv,y(c,2)),f=N(s.dwell,y(c,3)),m=l<h?U(l/h):l<h+f?1:1-U((l-h-f)/(1-h-f)),p=s.drift*D(e/s.driftS,.5,8080+a);return{y:o.y0+p-u*m,amp:u,shape:m}}function _0(t,e,o){if(t.y!=null)return t.y;const s=p0(t,e);return o?s.y+(1-m0)*s.amp*s.shape+o.now.drivers.dY+(t.yShift??0):s.y+(t.yShift??0)}const x0=t=>U((t-.75)/.2);function v0(t,e,o,s,a,n,r,i){const l=e.train??[1,3],c=2*e.a[1]*e.lifePerKm[1],u=Math.ceil(c/e.epochS)+1;for(let h=Math.floor(o/e.epochS)-u;h<=Math.floor((o+.3*c)/e.epochS);h++)for(let f=Math.floor(a[0]/e.cellKm)-1;f<=Math.floor(a[1]/e.cellKm)+1;f++){const m=Ee(f,h,s+7*r),p=(h+y(m,1))*e.epochS;if(be(m)>=(i?e.prob*i.vortK(p):e.prob))continue;const d=N(e.a,y(m,5)),_=d*N(e.lifePerKm,y(m,2));if(!(o>p-.4*_&&o<p+2*_))continue;const v=(y(m,8)<.5?-1:1)*N(e.v,y(m,4)),A=e.sign*N(e.th,y(m,6)),g=y(m,9)<e.hard,w=l[0]+Math.floor((l[1]-l[0]+.999)*y(m,11));let b=(f+y(m,3))*e.cellKm,T=0;for(let k=0;k<w;k++){const R=ye(m+Math.imul(k+1,668265263)|0),F=d*(.55+.95*y(R,1)),S=F*_/d*(.8+.5*y(R,2)),M=p+_*(y(R,3)-.5)*.7;if(k>0&&(b+=(2.5+4.5*y(R,4))*.5*(F+T)),T=F,y(R,8)<.2&&k>0||!(o>M&&o<M+S))continue;const P={cls:r,s0:b,t0:M,life:S,v:v*(.8+.4*y(R,9)),a:F,th:A*(.45+.7*y(R,5)),off:e.off*(2*y(R,6)-1),hp:g?.6+.4*y(R,7):.3*y(R,7),g:1};t.vort.gated&&(P.g=Oo(t,P.s0+P.v*.5*S,M+.5*S,s,i),P.g<.1)||n.push(P)}}}function g0(t,e,o){const s=Uo(t.level),a=[];if(!(t.noFolds||s.vort==null)){const n=t.sRange??s.sRange,r=4321+(t.seed??0);s.vort.classes.forEach((i,l)=>v0(s,i,e,r,n,a,l,o))}for(const n of a){const r=(e-n.t0)/n.life;n.tau=r,n.e=Ro(r)*n.g,n.sc=n.s0+n.v*(e-n.t0),n.pk=x0(Ro(r))*n.g}return a.filter(n=>n.e>1e-4).sort((n,r)=>n.a-r.a)}function A0(t,e,o){const s=Uo(t.level),a=s.blobs,n=[];if(a==null||t.noBlobs)return n;const[r,i]=t.sRange??s.sRange,l=777+(t.seed??0),c=Math.ceil(a.life[1]/a.epochS)+1;for(let u=Math.floor(e/a.epochS)-c;u<=Math.floor(e/a.epochS);u++)for(let h=Math.floor(r/a.cellKm)-1;h<=Math.floor(i/a.cellKm)+1;h++){const f=Ee(h,u,l),m=(u+y(f,1))*a.epochS;if(be(f)>=(o?a.prob*o.vortK(m):a.prob))continue;const p=N(a.life,y(f,2)),d=(e-m)/p;if(!(d>0&&d<1))continue;const _=(y(f,3)<.5?-1:1)*N(a.u,y(f,4)),v=(h+y(f,5))*a.cellKm;let A=1;a.gated&&(A=Oo(s,v,m,l,o),A<.1)||n.push({s:v+_*(e-m),w:N(a.w,y(f,6)),amp:N(a.amp,y(f,7))*A*U(d/.3)*(1-U((d-.6)/.4)),u:_})}return n}function y0(t,e,o,s,a){const n=e.waves!==void 0?e.waves:t.waves;if(n==null)return 0;let r=0;for(let i=0;i<n.length;i++){const[l,c,u]=n[i],h=.6+.5*D(o/160,s/45,6100+i);r+=c*h*Math.sin(2*Math.PI*(o-u*a)/l+1.7*i)}return r}function b0(t,e,o,s,a,n){let r=a;for(const[l,c,u,h]of t.meander??e.meander)r+=c*Math.sin(2*Math.PI*(o-u*s)/l+h);const i=t.ripple??e.ripple;return i>0&&(r+=i*(D((o-2*s)/13,s/6,4101)+.3*D((o-2*s)/5,s/3,4102))),r+y0(e,t,o,s,n)}const Xs=t=>{const e=1+.5*t;return 1/(e*e)},Ys=t=>t<=3?1:t>=5?0:1-U((t-3)/2),xr=[null,{H:[16,30],w:[14,22],Oe:[10,22],Lc:[1.6,2.4],v:[1.4,2.6],B:[.3,.6],tauR:[16,30],wB:[70,120],life:[55,100],Td:[18,30],pole:1},{H:[34,58],w:[16,26],Oe:[22,42],Lc:[1.6,2.6],v:[2.5,4.5],B:[.12,.35],tauR:[24,42],wB:[90,150],life:[60,120],Td:[18,32],pole:1},{H:[42,72],w:[18,28],Oe:[26,50],Lc:[1.6,2.6],v:[3,5.5],B:[.45,.9],tauR:[20,36],wB:[100,160],life:[55,110],Td:[16,30],pole:1}],w0=420;function Vs(t,e,o,s,a=!1){const n=xr[t],r=ye(Math.imul(o.k,739982445)+Math.imul(o.q+1,695872825)+Math.imul(e+17,2246822507)+t+(a?1540483477:0)|0);let i=$(o.h*(o.event?1:.4)*Math.min(1,o.A/.6),0,1.15);if(i<.25)return null;if(a){if(y(r,20)>=.6)return null;i*=.65}const l=o.t+(a?4+14*y(r,21):2*y(r,1)),c=$(.6*o.r,8,18);let u=y(r,2)<(a?.5:.7)?-1:1,h=N(n.v,y(r,3))*(o.q===0?1:.85),f=a?N([-300,300],y(r,22)):null,m=!1;if(!a&&s&&y(r,9)<.55){const _=Wa(s,l);_&&_.A>.2&&Math.abs(_.sh)<90&&(f=_.sh,u=s.dir,h=.8*s.v+.2*h,m=!0)}f==null&&(f=y(r,4)<.7?-u*N([0,110],y(r,5)):N([-350,350],y(r,6)));const p=N(n.w,y(r,7)),d=p+N(n.Oe,y(r,12))*(a?.8:1);return{key:`${o.k}/${o.q}${a?"b":""}`,tb:l,Tg:c,life:N(n.life,y(r,8)),Td:N(n.Td,y(r,10)),d:o.d,tauD:o.tau,aS:i,dir:u,v:h,s0:f,w:p,H:N(n.H,y(r,11))*(a?.75:1),O:d,Lc:d*N(n.Lc,y(r,16)),B:N(n.B,y(r,13)),tauR:N(n.tauR,y(r,14)),wB:N(n.wB,y(r,15)),pole:n.pole,deepen:m,seed:r>>>9&1023}}function Wa(t,e){const o=e-t.tb;if(!(o>-.5&&o<t.life+t.Td))return null;const s=t.aS*re(o/t.Tg)*(1-.35*t.d*re((o-t.Tg)/Math.max(10,t.tauD)))*(1-re((o-t.life)/t.Td));if(!(s>1e-4))return null;const a=Math.max(0,o),n=t.v*(.55*a+.45*60*(1-Math.exp(-a/60)));return{A:s,sh:t.s0+t.dir*n,D:n,tau:o}}const rt=new Map,M0=2e4;let Zs="";function E0(t,e,o){if(!xr[t])return[];const s=t+"|"+e;s!==Zs&&(rt.clear(),Zs=s);const a=Yc(t,e,o-w0,o+1,Ga),n=[];let r=null,i=null;for(const l of a){const c=`${t}|${e}|${l.k}|${l.q}`;let u=rt.get(c);if(u===void 0&&(u=Vs(t,e,l,i===l.k?r:null),rt.size>M0&&rt.clear(),rt.set(c,u)),u){r=u,i=l.k;const m=Wa(u,o);m&&n.push({f:u,...m})}const h=c+"b";let f=rt.get(h);if(f===void 0&&(f=Vs(t,e,l,null,!0),rt.set(h,f)),f){const m=Wa(f,o);m&&n.push({f,...m})}}return n}function vr(t,e,o){let s=0,a=0,n=0,r=0,i=0,l=0,c=0;for(const u of t){const h=u.f,f=h.w,m=(e-u.sh)*h.dir;if(m>3*f||m<-(u.D+2.5*h.wB))continue;const p=re(.5-m/(2*f)),d=m<-f?Math.exp((m+f)/(h.v*h.tauR)):1,_=re((m+u.D+h.wB)/h.wB),v=u.A*_;a+=h.pole*h.H*v*p*d;const A=re(.5-m/f);s+=h.dir*h.O*v*A*(m<-.5*f?Ue((m+.5*f)/h.Lc):1);const g=m+.5*f,w=.65+.35*D(e/11,(u.tau??0)/4,9201+h.seed);n+=h.B*v*w*Ue(g/(g>0?.6*f:.8*h.O)),r+=v*p*(1-d),c+=v*Math.max(p*d,Ue(m/(2*f))),i+=v*Ue((m+.5*f)/(.5*h.O+.8*f)),m>0&&(l+=.22*u.A*re((m-.5*f)/f)*Ue(m/220))}return o.dx=s,o.dy=a,o.head=n,o.loose=Math.min(1,r),o.ray=Math.min(1.2,i),o.ahead=Math.min(.6,l),o.near=c,o}function gr(t){const o=new Float64Array(16).fill(NaN),s=Array.from({length:16},()=>({dx:0,dy:0,head:0,loose:0,ray:0,ahead:0,near:0}));let a=0;return n=>{for(let i=0;i<16;i++)if(o[i]===n)return s[i];const r=s[a];return o[a]=n,vr(t,n,r),a=(a+1)%16,r}}function js(t,e,o=null,s=null){const a=Uo(t.level),n=_0(t,e,o),r=A0(t,e,o),i=o?o.D:e;let l=g0(t,e,o);o&&(l=l.map(b=>b.cls!==1?b:{...b,th:.8*b.th,e:b.e*(1-.7*re((b.tau-.4)/.35))}).filter(b=>b.e>1e-4));const u=t.baseFn??(b=>b0(t,a,b,e,n,i)),h=s&&s.length?s:null,f=h?gr(h):null,m=h?b=>u(b)+f(b).dy:u,p=h?b=>b+f(b).dx:null,d=l.map(b=>({v:b,cx:p?p(b.sc):b.sc,cy:m(b.sc)+b.off*b.a,ia2:1/(b.a*b.a),r2max:25*b.a*b.a,th:b.th*b.e})),_=new Map,v=b=>{const T=Math.floor(b/32);let k=_.get(T);if(k)return k;k=[];let R=T*32,F=R+32;for(const S of d){const M=Math.sqrt(S.r2max)+1e-8;S.cx+M<R||S.cx-M>F||(k.push(S),R=Math.min(R,S.cx-M),F=Math.max(F,S.cx+M))}return _.set(T,k),k};return{pos:b=>{let T=p?p(b):b,k=m(b);for(const R of v(T)){const F=T-R.cx,S=k-R.cy,M=F*F+S*S;if(M>R.r2max)continue;const P=M*R.ia2,L=R.th*Xs(P)*Ys(Math.sqrt(P)),C=Math.cos(L),O=Math.sin(L);T=R.cx+C*F-O*S,k=R.cy+O*F+C*S}return[T,k]},base:m,base0:u,info:b=>{let T=p?p(b):b,k=m(b),R=0,F=0,S=0,M=0;for(const C of v(T)){const O=T-C.cx,z=k-C.cy,j=O*O+z*z;if(j>C.r2max)continue;const q=j*C.ia2,B=Math.exp(-q/4.5)*C.v.e;C.v.a>=6&&(R+=B),F+=Math.exp(-q/2)*C.v.e,S+=B*C.v.hp*C.v.pk,M+=B;const ee=C.th*Xs(q)*Ys(Math.sqrt(q)),Z=Math.cos(ee),W=Math.sin(ee);T=C.cx+Z*O-W*z,k=C.cy+W*O+Z*z}let P=0;for(const C of r){const O=(b-C.s)/C.w;O*O<64&&(P+=C.amp*(Math.exp(-.5*O*O)-.5*Math.exp(-.125*O*O)))}const L={infl:Math.min(1,R),core:Math.min(1,F),hard:M>1e-6?S/M:0,sw:Math.min(1,M),blob:P};if(f){const C=f(b);L.fHead=C.head,L.fLoose=C.loose,L.fRay=C.ray,L.fAhead=C.ahead}return L},yc:n,vortices:l,blobs:r,swirls:d,folds:h,baseAng:f?b=>{const T=f(b-.5),k=b-.5+T.dx,R=u(b-.5)+T.dy,F=f(b+.5);return Math.atan2(u(b+.5)+F.dy-R,b+.5+F.dx-k)}:null}}function Qs(t,e){return{...t,pos:o=>{const s=t.pos(o);return[s[0],s[1]+e(o)]},base:o=>t.base(o)+e(o)}}const Js={breath:.55,lamAmp:.32};function R0(t,e,o,s,a){const n=e+977*(s&7),r=.5+.5*D(n/9,o/6.5,9301)+.25*D(n/4.2,o/3.1,9302);t.ray*=1-Js.breath*$(1-r,0,1);const i=.6*D(n/55,o/40,9311)+.4*D(n/31,o/22,9312);t.lam=$(t.lam+Js.lamAmp*i*(.4+.6*a),0,1)}const Do=(t,e,o)=>.65*D(t/3.2,e/7,3900+o)+.35*D(t/8,e/16,3950+o);function ls(t,e,o){const s=(o-t.t0)/t.T;if(!(s>0&&s<1))return 1;const a=U(s/.25)*(1-U((s-.72)/.28));if(!(a>0))return 1;const n=o-t.t0,r=1+t.br*Math.sin(2*Math.PI*n/t.Tb+t.ph),i=t.sc+t.v*n+t.wob*(Math.sin(2*Math.PI*n/t.Tw+t.ph)-Math.sin(t.ph)),l=Math.abs(e-i)-.5*t.Lg*a*r+t.rag*Do(e,o,t.seed);return 1-a*(1-U(l/t.ramp))}const S0=6;function T0(t,e,o,s){const a=(o-t.t0)/t.T;if(s[0]=1,s[1]=1,!(a>0&&a<1))return s;const n=U((e-(t.sc-t.half)+.5*t.tap)/t.tap)*U((t.sc+t.half-e+.5*t.tap)/t.tap);if(!(n>0))return s;const r=(1-Math.exp(-a*t.T/(t.efold??S0)))*(1-U((a-.8)/.2))*n,i=e-t.v*(o-t.t0),l=Math.floor(i/t.lam),c=t.ramp,u=t.rag*Do(e,o,t.seed);let h=0,f=1;for(let p=l-1;p<=l+1;p++){const d=Ee(p,t.seed,5711),_=(p+.5+.3*(y(d,1)-.5))*t.lam,v=.5*t.lam*N(t.duty,y(d,2)),A=U((v-Math.abs(i-_)+u)/c+.5);A>h&&(h=A,f=N([.5,1.4],y(d,3))*(.85+.3*(.5+.5*D(p*1.3,o/12,5800+t.seed))))}const m=Math.max(h,t.floor);return s[0]=1-r*(1-m),s[1]=1+r*(f-1)*h,s}function Ar(t,e,o,s){const a=(o-t.t0)/t.T;if(s[0]=1,s[1]=1,!(a>0&&a<1))return s;const n=U((e-(t.sc-t.half)+.5*t.tap)/t.tap)*U((t.sc+t.half-e+.5*t.tap)/t.tap);if(!(n>0))return s;const r=(1-Math.exp(-a*t.T/(t.efold??6)))*(1-U((a-.8)/.2))*n,i=e-t.v*(o-t.t0),l=i+.4*t.lam*D(i/(1.6*t.lam),.37*t.seed,5733),c=Math.floor(l/t.lam),u=t.ramp,h=t.rag*Do(e,o,t.seed),f=t.duty9??[.25,.8];let m=0,p=1;for(let _=c-1;_<=c+1;_++){const v=Ee(_,t.seed,5711),A=(_+.5+.5*(y(v,1)-.5))*t.lam,g=.5*t.lam*N(f,y(v,2)),w=U((g-Math.abs(l-A)+h)/u+.5);w>m&&(m=w,p=(.45+1.05*y(v,3)**1.8)*(.85+.3*(.5+.5*D(_*1.3,o/12,5800+t.seed))))}const d=Math.max(m,t.floor);return s[0]=1-r*(1-d),s[1]=1+r*(p-1)*m,s}function Ha(t,e,o,s,a={}){const n=y(e,9)<.5?-1:1;if(t==="fade")return{type:t,t0:o,T:N([40,90],y(e,3)),sc:s,half:N([60,150],y(e,5)),tap:50,depth:N([.25,.4],y(e,6)),seed:e>>>10&1023};if(t==="gapA")return{type:t,t0:o,T:N([40,80],y(e,3)),sc:s,Lg:N([25,60],y(e,5)),ramp:N([8,14],y(e,6)),v:n*N([1,2.5],y(e,7)),br:N([.25,.4],y(e,12)),Tb:N([10,18],y(e,13)),wob:N([8,18],y(e,14)),Tw:N([14,26],y(e,15)),ph:6.283*y(e,16),rag:N([4,7],y(e,17)),seed:e>>>10&1023,...a};const r=N([45,120],y(e,5)**1.6);return{type:t,t0:o,T:N([40,80],y(e,3)),sc:s,half:N([90,170],y(e,6)),tap:40,lam:r,duty:[.3,.65],ramp:Math.max(6,.12*r),v:n*N([.3,1.2],y(e,8)),floor:N([.08,.16],y(e,12)),rag:N([3,6],y(e,13)),seed:e>>>10&1023,...a}}function F0(t,e,o,s){const a=[];for(let n=Math.floor(e/t.epoch)-1;n<=Math.floor(e/t.epoch);n++)for(let r=-Math.ceil(540/t.cell);r<Math.ceil(540/t.cell);r++){const i=Ee(r,n,6007+151*o),l=(n+.4*y(i,2))*t.epoch;let c=1,u=1,h=1;if(s){const d=s.at(l);u=d.derived.gapK,h=d.derived.gapK*(1+1.5*d.phase.growth),c=Math.max(1,u,h)}if(be(i)>=t.prob*c)continue;const f=y(i,1),m=f<t.mix[0]?"fade":f<t.mix[0]+t.mix[1]?"gapA":"beadsB";if(s&&y(i,11)>=(m==="fade"?1:m==="gapA"?u:h)/c)continue;const p=Ha(m,i,l,(r+y(i,4))*t.cell);e>p.t0&&e<p.t0+p.T&&a.push(p)}return a}function N0(t,e,o,s,a){const n=F0(mr[e],o,s,a);if(e===0){for(const r of n)if(r.type==="gapA"){const i=ye(r.seed*977+5|0);r.ramp=N([35,55],y(i,1)),r.rag=N([8,14],y(i,2)),r.Lg*=.7}}for(const r of n)r.type==="beadsB"&&(r.floor*=.5);return n}const It=[1,1],na=[1,1],vt={f:1,e:1,dchi:0,sig:1,rag:!1};function k0(t,e,o){let s=1,a=1,n=0,r=1,i=!1;for(const l of t)if(l.type==="fade"){const c=U((e-(l.sc-l.half)+.5*l.tap)/l.tap)*U((l.sc+l.half-e+.5*l.tap)/l.tap);if(!(c>0))continue;const u=(o-l.t0)/l.T;if(!(u>0&&u<1))continue;const h=U(u/.15)*(1-U((u-.72)/.2)),f=U((u-.12)/.3)*(1-U((u-.7)/.3));s*=1-c*(1-l.depth)*f,n-=.28*c*h,r*=1+.35*c*h}else if(l.type==="gapA"){const c=ls(l,e,o);s*=c,a*=c,i=!0}else Ar(l,e,o,It),s*=It[0]*It[1],a*=It[0],i=!0;return vt.f=s,vt.e=a,vt.dchi=n,vt.sig=r,vt.rag=i,vt}function L0(t,e,o){let s=1,a=!1;if(t)for(const n of t)n.type==="gapA"?(s*=ls(n,e,o),a=!0):n.type==="beadsB"&&(s*=Ar(n,e,o,It)[0],a=!0);return a?-2*(1-s):0}function C0(t,e,o,s,a,n){const r=e*o;r<1&&(t.F=t.F>0?Math.pow(t.F,r):0),t.sigma*=.5+.5*e,t.ray*=s*(n?Math.pow(e,.8)*(1+.6*4*e*(1-e)):e*e*e),t.lam*=a*(n?.8+.2*e:.2+.8*e),n&&(t.env*=.35+.65*e),t.chi-=pr*(1-e)}function P0(t,e,o,s,a,n){const r=(n?Math.max(e,.6):e)*o;r<1&&(t.F=t.F>0?Math.pow(t.F,r):0),t.sigma*=.5+.5*e,t.ray*=s*(n?Math.pow(e,.8)*(1+.6*4*e*(1-e)):e*e*e),t.lam*=a*(n?.8+.2*e:.2+.8*e),n&&(t.env*=.35+.65*e),t.chi-=pr*(1-e)}const U0=260;function O0(t,e,o,s,a=620){if(!t.comp8)return[];const n=[];t.comp8.forEach((i,l)=>{const c=Math.floor(e/i.epoch),u=Math.floor((e-U0)/i.epoch)-1;for(let h=u;h<=c;h++)for(let f=-Math.ceil(540/i.cell);f<Math.ceil(540/i.cell);f++){const m=Ee(f,h,35003+977*l+131*o),p=(h+y(m,1))*i.epoch;let d=1;if(s){const v=s.at(p);d=v.derived.companionK*(i.kind==="full"?.5+1.5*v.phase.expansion:1)}if(be(m)>=i.prob*d)continue;const _=D0(i,m,p,(f+.15+.7*y(m,2))*i.cell,a);_.key=l*1e6+(m>>>12&1048575),_.slot=l,n.push(_)}});const r=[];for(const i of n){if(!(e>i.tb&&e<i.tb+i.T))continue;let l=!0;for(const c of n)if(!(c===i||c.slot!==i.slot||!(c.tb<i.tb||c.tb===i.tb&&c.key<i.key)||!(c.tb+c.T>i.tb))&&c.ext[0]-40<i.ext[1]&&i.ext[0]-40<c.ext[1]){l=!1;break}l&&r.push(i)}return r}function D0(t,e,o,s,a=620){const n=t.kind,r=N(t.len,y(e,6)),i=.5*r;s=$(s,-a+i,a-i);const l=t.appear??(y(e,4)<.5?"fade":"end"),c=y(e,5)<.5?-1:1,u=N([1.8,3.2],y(e,27)),h=l==="end"?r/u:N([16,30],y(e,2)*.999+5e-4),f=N(n==="full"?[45,80]:n==="short"?[20,45]:[35,70],y(e,3)),m=N([14,24],y(e,26)),p=t.side*N(t.off,y(e,7)),d=N([1.2,2.6],y(e,34)),_={tb:o,kind:n,side:t.side,sC:s,L:r,appear:l,dir:c,vg:u,Tg:h,Ta:f,Td:m,T:h+f+m,off:p,rel:N(t.rel,y(e,8)),wedge:N([-.12,.12],y(e,9)),und:[N([90,220],y(e,10)),N([2,5],y(e,11)),(y(e,12)<.5?-1:1)*N([.3,.8],y(e,13)),6.283*y(e,14)],vs:(y(e,15)<.5?-1:1)*N([.3,1],y(e,16)),lat:[N([5,12],y(e,17)),N([120,240],y(e,18)),6.283*y(e,33)],seed:e>>>8&65535,w1:[N([55,95],y(e,19)),N([1,2],y(e,20)),N([-2.5,2.5],y(e,21)),6.283*y(e,22)],w2:[N([28,50],y(e,23)),N([.4,.9],y(e,24)),N([-2.5,2.5],y(e,25)),6.283*y(e,29)],tapB:N([.1,.18],y(e,28)),tapF:N([.24,.4],y(e,30)),curl:(y(e,31)<.5?-1:1)*N([1,4],y(e,32)),vh:d,sigH:N([30,48],y(e,35)),b0:N([.5,.65],y(e,36)),pX:-.4*r+d*N([.35,.6],y(e,37))*f,P:N([12,28],y(e,38)),sigP:N([25,40],y(e,39)),relax:N([25,45],y(e,40)),clL:N([30,60],y(e,41)),HZ:N([50,80],y(e,42)),lamK:c0*$((Math.abs(p)-25)/45,.4,1),brk:null,ext:[0,0],key:0,slot:0};if(y(e,43)<t.brk){const g=o+h+.15*f,w=Math.max(20,.8*f+.3*m),b=s+_.vs*(g-o),T=_.seed&1023,k=ye(e+1013904242|0);_.brk=y(e,44)<.5?Ha("gapA",k,g,b,{T:w,Lg:N([18,40],y(e,45)),ramp:N([6,10],y(e,46)),v:_.vs+N([-1.5,1.5],y(e,47)),seed:T}):Ha("beadsB",k,g,b,{T:w,half:1e4,tap:1,lam:N([40,70],y(e,45)),ramp:6,v:_.vs+N([-.8,.8],y(e,47)),seed:T})}const v=Math.abs(_.vs)*_.T,A=l==="end"?_.HZ:0;return _.ext=[s-i-v*(_.vs<0?1:0)-(c<0?A:0),s+i+v*(_.vs>0?1:0)+(c>0?A:0)],_}function z0(t,e){const o=e-t.tb;if(!(o>0&&o<t.T))return null;const s=t.sC+t.vs*o;let n=.88+.24*D(e/25,.5,3100+(t.seed&1023)),r=1,i=0,l=0,c=1,u=1,h,f=.5,m=0,p=1;if(o<t.Tg){const k=o/t.Tg;if(t.appear==="end")h="伸进来",f=-.5+Math.min(1,t.vg*o/t.L),m=1-U((k-.8)/.2),n*=.55+.45*U(t.vg*o/90),c=.7,p=.3+.7*U((k-.7)/.3);else{h="淡入";const R=U(k);n*=R*R,r=Ne(2.2,1,Math.sqrt(R)),i=.3*(1-R),l=-.2*(1-R),c=.05+.65*R**3,u=R*R}}else if(o<t.Tg+t.Ta)h="活跃",c=.7+.3*U((o-t.Tg)/12);else{const k=(o-t.Tg-t.Ta)/t.Td;h="变淡变散",n*=1-U((k-.08)/.92),r=1+.9*U(k),i=.3*U(k),l=-.25*U(k/.6),c=1-U(k/.45),u=1-U(k/.5)}let d=0,_=0,v=s;const A=s+t.dir*(t.pX+.6*t.sigP),g=o-t.Tg;if(g>0){const k=(t.h0??-.4*t.L)+t.vh*g;v=s+t.dir*k,d=U(g/10)*(1-U((k/t.L-.28)/.14));const R=k-t.pX;_=(R<0?U(1+R/70):1-U(R/(t.vh*t.relax)))*U(g/8)}const w=.5*t.L,b=t.dir>0?s-w:s-w-(m>0?t.HZ:0),T=t.dir>0?s+w+(m>0?t.HZ:0):s+w;return{amp:n,c:s,xf:f,head:m,tapK:p,Ah:d,sh:v,Ap:_,sp:A,lo:b,hi:T,sigmaK:r,envAdd:i,chiShift:l,rayK:c,fine:u,phase:h,tau:o}}const he={f:0,e:0,ef:0,rb:1,lamAdd:0,eF:1,clump:1,sigmaK:1,envAdd:0,chiShift:0,rayK:1,fine:1,rag:!1};function I0(t,e,o,s){const a=(o-e.c)*t.dir/t.L,n=a+4*Do(o,s,t.seed&1023)/t.L,r=U((.5+n)/t.tapB),i=U((e.xf-n)/(t.tapF*e.tapK));let l=r*i,c=1,u=0,h=!1,f=0;if(e.head>0){const v=(a-e.xf)*t.L,A=e.head*.3*(1-U(v/t.HZ))*U((v+40)/40)*r;h=A>.5*l||i<.98&&a>e.xf-t.tapF*e.tapK,l=l+A*(1-l),c=1+6*A/.3,u=.35*A/.3,f=-.3*A/.3}if(!(l>0))return he.f=0,he.e=0,he;const m=1-(1-t.b0)*e.Ah*(1-Ue((o-e.sh)/t.sigH));let p=e.amp*l*m;if(he.ef=U((.5-Math.abs(a))/.45),he.rag=h,t.brk){const v=t.brk;let A;v.type==="gapA"?A=ls(v,o,s):(T0(v,o,s,na),A=na[0],p*=na[1]),p*=A,l*=A,A<1&&(he.rag=!0)}const d=3300+(t.seed&1023),_=o-e.c;return he.clump=.1+.9*U((D(_/t.clL,s/35,d)-.05)/.4)*U((D(_/9,s/18,d+7)+.1)/.45),he.f=p,he.e=l,he.rb=c,he.lamAdd=u,he.eF=i,he.sigmaK=e.sigmaK,he.envAdd=e.envAdd+f,he.chiShift=e.chiShift,he.rayK=e.rayK,he.fine=e.fine,he}function B0(t,e,o,s){const a=(o-e.c)*t.dir/t.L,n=t.und,r=s-t.tb,i=Math.abs(t.off)*(1+t.wedge*2*$(a,-.6,.6))+n[1]*Math.sin(2*Math.PI*(o-n[2]*s)/n[0]+n[3]),l=t.lat[0]*Math.sin(2*Math.PI*r/t.lat[1]+t.lat[2])-t.lat[0]*Math.sin(t.lat[2]),c=(o-e.sp)*t.dir,u=e.Ap*t.P*Ue(c/(t.sigP*(c<0?1.7:.55))),h=U((e.xf-a)/(t.tapF*e.tapK));return t.side*Math.max(30,i+l-u)-t.curl*(1-h)}const G0=(t,e,o)=>t.w1[1]*Math.sin(2*Math.PI*(e-t.w1[2]*o)/t.w1[0]+t.w1[3])+t.w2[1]*Math.sin(2*Math.PI*(e-t.w2[2]*o)/t.w2[0]+t.w2[3]),Ze={rel:.65,push:.7,dim:.55,vs:[1.2,2.4],wedge:[.3,.55],und:[6,12],ray:.7,offMin:[62,80]};function $0(t,e){if(t.v9)return t;const o=ye(Math.imul(t.seed|0,625341585)+5369127|0),s={...t,v9:!0};return s.off=(t.off<0?-1:1)*Math.max(Math.abs(t.off),N(Ze.offMin,y(o,13))),s.w1=[N([90,200],y(o,1)),N([4,9],y(o,2)),N([-2,2],y(o,3)),6.283*y(o,4)],s.w2=[N([45,80],y(o,5)),N([1,2.5],y(o,6)),N([-2.5,2.5],y(o,7)),6.283*y(o,8)],s.wedge=(t.wedge<0?-1:1)*Math.max(Math.abs(t.wedge??0),N(Ze.wedge,y(o,9))),s.und=[t.und[0]<120?N([120,260],y(o,10)):t.und[0],Math.max(t.und[1],N(Ze.und,y(o,11))),t.und[2],t.und[3]],s.rel=t.rel*Ze.rel,s.vs=(t.vs<0?-1:1)*N(Ze.vs,y(o,12)),s}const W0={dx:0,dy:0,head:0,loose:0,ray:0,ahead:0,near:0};function H0(t,e,o,s,a,n,r,i){const l=t.comp,c=t.W??null,u=l.ev,h=I0(u,l.state,o,s);let f=h.f;const m=h.e*i;if(!(f>0)||!(m>0))return null;const{ef:p,rb:d,lamAdd:_,clump:v,fine:A,sigmaK:g,envAdd:w,chiShift:b,rag:T,rayK:k}=h,R=a&&{...a,infl:Math.max(a.infl,.85*k*v)},F=u.seed&1023,S=o+5.5*D(o/17,s/30,9500+F)+2.5*D(o/6.3,s/13,9510+F),M=.2+1.4*U(.5+.9*D(o/28,s/40,9520+F)),P={...e,fine:{...e.fine,hem:e.fine.hem*M,hemAct:e.fine.hemAct*M}},L=Po(t,P,S,s,R,n,r);_r(L,c),L.chi=$(L.chi-.07*Math.max(0,D(o/4.1,s/9,9530+F)),0,1);{const C=L.ray-e.rayGlow;C>0&&e.fine.ray>0&&(L.ray=e.rayGlow+C/(1+C/(1.6*e.fine.ray)))}if(C0(L,m,A*Math.min(1,p/Math.max(m,1e-6)),1,u.lamK,T),l.folds){const C=l.fe?l.fe(o):vr(l.folds,o,W0);f*=1-Ze.dim*Math.min(1,C.near)}if(L.F*=f*i,L.ray*=d*Ze.ray,L.lam=$(L.lam+_,0,1),L.sigma*=g,L.env=$(L.env+w,.05,.92),L.chi=$(L.chi+b,0,1),c&&a&&a.core>.03){const C=.5+.5*D(o/7,s/4.5,9402+F),O=Math.min(1,a.core)*(.5+.5*C);L.F*=1-.45*O,L.ray*=1-.55*O}return L}function yr(t,e,o,s,a,n,r,i){if(t.comp)return H0(t,e,o,s,a,n,r,i);const l=a&&a.fRay!=null?a:null;let c=a,u=0;if(a&&t.W&&a.infl>0){const f=U(.5+.9*D(o/9,s/5,9411));c={...a,infl:a.infl*(.3+.7*f)}}l&&l.fRay>0&&(u=U((.55*D(o/42,s/9,9101)+.45*D(o/17,s/5,9102)+.2)/.55),c={...c,infl:Math.max(c.infl,Math.min(.7,.7*l.fRay*(.2+.8*u)))});const h=Po(t,e,o,s,c,n,r);if(_r(h,t.W??null),t.eps&&t.eps.length){let f=1,m=1,p=!1;const d=k0(t.eps,o,s);m*=d.f,f*=d.e,h.chi+=d.dchi,h.sigma*=d.sig,p=d.rag&&d.e<1,P0(h,f,1,1,1,p),h.F*=m,h.chi=$(h.chi,0,1)}if(t.W&&(R0(h,o,s,t.seed??0,c?Math.max(c.infl,n):n),a&&a.core>.03)){const f=.5+.5*D(o/7,s/4.5,9401),m=Math.min(1,a.core)*(.5+.5*f);h.F*=1-.55*m,h.ray*=1-.7*m,h.lam=$(h.lam-.25*m,0,1)}if(l){const f=l.fLoose;h.F*=(1+l.fHead)*(1-.45*f)*(1-l.fAhead),f>0&&(h.sigma*=1+.9*f,h.env=$(h.env+.25*f,.05,.92),h.chi=$(h.chi-.12*f,0,1),h.ray*=1-.5*f),l.fRay>0&&(h.lam=$(h.lam+.2*l.fRay*u,0,1))}return h}function K0(t,e){const o=_t[t.level],s=t.seed??0,a=d0(t,e),n=!t.ticks,r=n&&!t.noEpisodes?N0(o,t.level,e,s,a):null,i={...t,eps:r,W:a};a&&(i.chiDrop=(t.chiDrop??0)-a.now.drivers.dChi,i.uShift=(t.uShift??0)+o.vTex*(e-a.D));let l=null;n&&!t.noFolds&&!t.noFold9&&a&&(l=E0(t.level,a.seed,e)),i.folds=l;let c=js(i,e,a,l);if(r&&r.some(g=>g.type!=="fade")){const g=c;c=Qs(g,w=>L0(r,w,e)),c.raw=g,c.baseAng=g.baseAng}const u=qs(o,a),h=[{scene:i,L:u,rel:1,fl:c,isMain:!0}];if(!n||t.noComp)return h;const f=t.autoComp===!1?[]:O0(o,e,s,a).map(g=>$0(g)),m=Uo(t.level),p=(t.meander??m.meander).filter(g=>g[0]>=300),d=l&&l.length?l:null,_=d?gr(d):null,v=g=>{let w=c.yc;for(const[b,T,k,R]of p)w+=T*Math.sin(2*Math.PI*(g-k*e)/b+R);return _?w+Ze.push*_(g).dy:w},A=qs(a0[t.level],a);for(const g of f){const w=z0(g,e);if(!w||!(w.amp>.003))continue;const T={level:r0[g.dynLevel??t.level]??11,y:c.yc,baseFn:R=>v(R)+G0(g,R,e),waves:null,ripple:0,seed:s+g.seed,sRange:[-3e3,3e3],uShift:1e3+7*g.seed+(a?A.vTex*(e-a.D):0),noBlobs:!0,comp:{ev:g,state:w,folds:d,fe:_},W:a,...a?{chiDrop:-a.now.drivers.dChi}:{}},k=Qs(js(T,e,a),R=>B0(g,w,R,e));h.push({scene:T,L:A,rel:g.rel*(t.compGain??1),fl:k,isMain:!1,ev:g,state:w})}return h.splice(1,h.length-1,...h.slice(1).sort((g,w)=>w.rel*w.state.amp-g.rel*g.state.amp)),h}function q0(t,e,o=0){const s=t.fineArcs,a=[];if(!s)return a;for(let n=Math.floor(e/s.epoch)-1;n<=Math.floor(e/s.epoch);n++)for(let r=-Math.ceil(700/s.cell);r<=Math.ceil(700/s.cell);r++){const i=Ee(r,n,7011+171*o);if(be(i)>=s.prob)continue;const l={t0:(n+y(i,1))*s.epoch,life:N([5,30],y(i,2)),sc:(r+y(i,3))*s.cell,half:N([20,50],y(i,4)),n:1+Math.floor(3.999*y(i,5)*y(i,5)+.6),sp:N([.9,2.5],y(i,6)),w1:N([.2,.45],y(i,7)),q:N([.35,.8],y(i,8)),e:n,c:r};l.n=Math.min(4,l.n),e>l.t0&&e<l.t0+l.life&&a.push(l)}return a}function X0(t,e,o,s){return s.length=0,t.forEach((a,n)=>{const r=U((e-(a.sc-a.half)+7)/15)*U((a.sc+a.half-e+7)/15);if(!(r>0))return;const i=(o-a.t0)/a.life,l=U(i/.15)*(1-U((i-.75)/.25));if(!(l>0))return;const c=1-.35*i;for(let u=0;u<a.n;u++)s.push([-(1.3*a.sp+u*a.sp)*c,r*l*a.w1*a.q**u,n*4+u])}),s}const co=22;function Y0(){const t=new Map;return{add(e,o){const s=Math.floor(e/co)*4096+Math.floor(o/co);let a=t.get(s);a||t.set(s,a=[]),a.push(e,o)},dist(e,o){const s=Math.floor(e/co),a=Math.floor(o/co);let n=1e9;for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){const l=t.get((s+r)*4096+a+i);if(l)for(let c=0;c<l.length;c+=2){const u=(l[c]-e)**2+(l[c+1]-o)**2;u<n&&(n=u)}}return Math.sqrt(n)}}}function V0(t,e,o,s,a){const n=_t[t.level],r=n.glow;if(!r||t.noGlow||t.ticks)return null;const i=-Se,l=Math.round(2*Se/no),[c,u]=t.sRange??n.sRange,h=(t.glowGain??1)*r.amp*(a?a.now.derived.glowK:1),f=new Float64Array(l).fill(1e9);for(let _=0;_<s.length;_+=2){const v=Math.floor((s[_]-i)/no);for(let A=v-2;A<=v+2;A++)A>=0&&A<l&&s[_+1]<f[A]&&(f[A]=s[_+1])}for(let _=0;_<l;_++)f[_]<1e8||(f[_]=o.base(i+(_+.5)*no));const m=new Float32Array(l),p=new Float32Array(l),d=new Float32Array(l);for(let _=0;_<l;_++){let v=0,A=0;for(let b=Math.max(0,_-3);b<=Math.min(l-1,_+3);b++)v+=f[b],A++;const g=i+(_+.5)*no,w=v/A;m[_]=w+r.off,d[_]=w+r.cut,p[_]=h*(.6+.8*(.5+.5*D(g/180,e/300,1717)))*U((g-c)/90)*U((u-g)/90)}return{x0:i,ex:l,Y:m,A:p,cut:d,sig:r.sig*(a?a.now.derived.glowSigK:1),row:Math.round(r.chi*(J-1)),cutW:r.cutW}}const Z0={pulseWK:.3,pulseCellK:.35,pulseLagK:2,pulseAmpK:[1,1,.85,.75]};function en(t,e,o,s,a,n,r=null,i=0){const l=t.pulse5,c=[];if(l==null)return c;const u=r?{...l,cell:l.cell*r.pulseCellK,w:[l.w[0]*r.pulseWK,l.w[1]*r.pulseWK],lag:[l.lag[0]*r.pulseLagK,l.lag[1]*r.pulseLagK],amp:l.amp*(r.pulseAmpK[i]??1)}:l,h=Math.ceil((360/u.vz[0]+3)/u.P)+1;for(let f=Math.floor(e/u.P)-h;f<=Math.floor(e/u.P)+1;f++)for(let m=Math.floor((s-500)/u.cell);m<=Math.floor((a+500)/u.cell);m++){const p=Ee(m,f,7331+101*o),d=(f+.8*y(p,1))*u.P;be(p)>=u.prob*(n?n.pulseK(d):1)||c.push({t0:d,vz:N(u.vz,y(p,2)),amp:u.amp*(.6+.4*y(p,3)),xc:(m+y(p,4))*u.cell,w:N(u.w,y(p,5)),lag:(y(p,6)<.5?-1:1)*N(u.lag,y(p,7))/100})}return c}const j0=t=>({...t,pulse5:t.pulse5?{...t.pulse5,amp:u0*t.pulse5.amp}:null}),Q0=(t,e)=>(t.kR??_t[t.level].kR)*(e?e.now.derived.kRK:1),J0=.4,eu=.3,tu=1,ou=.22,tn=.03,au=.12;function su(t){const o=new Float64Array(8).fill(NaN),s=new Float64Array(8),a=new Float64Array(8).fill(NaN),n=new Array(8);let r=0,i=0;return{...t,pos:u=>{for(let f=0;f<8;f++)if(a[f]===u)return n[f];const h=t.pos(u);return a[i]=u,n[i]=h,i=i+1&7,h},base:u=>{for(let f=0;f<8;f++)if(o[f]===u)return s[f];const h=t.base(u);return o[r]=u,s[r]=h,r=r+1&7,h}}}const nu=(t,e)=>100+4*((t.e&4095)*16+t.c+8)+e;function gt(t,e,o){let s=0;for(const a of t){const n=a[o];n&&(e.set(n,s),s+=n.length)}return e}const iu={ds:.4,split:.4};function ru(t,e,o={}){const s=K0(t,e),a=s[0].fl,n=s[0].scene.W??null,r=_t[t.level],i=t.noFineArcs||t.ticks?[]:q0(r,e,t.seed??0),l=[],c=Y0(),u=[],h=[],f=[],m=[],p=[];let d=0,_=0,v=0;const A=o.keys??!0,g=t.iso?null:ou,w=.5;for(const S of s){const M=S.isMain||!o.comp?o:{...o,...o.comp},{scene:P,L,rel:C,isMain:O}=S,z=M.memo===!1?S.fl:su(S.fl),j=O?0:1e7+8*S.ev.key,q=P.seed??0,B=P.foldThick??L.foldThick,ee=!P.ticks&&!P.noLayers,Z=new Fo(M.mergeEnv??0,M.maxLenEnv??8,M.cellEnv??4,null,A?j:null),W=[],Y=X=>new Fo(M.mergeCore??0,M.maxLen??2,M.cellCore??1,M.mergeKm??null,A?X:null),ue=ee&&L.layers4?1+L.layers4.d.length:1;for(let X=0;X<ue;X++)W.push(Y(j+1+X));const te=new Map,le=[],V=O?null:[],ne=(X,Q,H,xe,ve,ge,tt,ot,De,Te,ke)=>{const at=g??ge,Le=at*at,Ce=ge*ge;X.add(Q,H,Le*xe*xe+Ce*ve*ve,(Le-Ce)*xe*ve,Le*ve*ve+Ce*xe*xe,tt,ot,De,Te,ke)};let[de,se]=P.sRange??L.sRange;O||(de=S.state.lo-2,se=S.state.hi+2),Yi(z,de,se,9,(X,Q)=>{const H=.5*(X+Q),[xe,ve]=z.pos(H),ge=P.ticks?null:z.info(H),tt=L.act!=null?Oo(L,H,e,q,n):0,ot=z.pos(H-w),De=z.pos(H+w),Te=De[0]-ot[0],ke=De[1]-ot[1],at=Math.hypot(Te,ke)||1,Le=Te/at,Ce=ke/at;let st;if(z.baseAng)st=Math.atan2(ke,Te)-z.baseAng(H);else{const Ae=z.base(H-w),Xe=z.base(H+w);st=Math.atan2(ke,Te)-Math.atan2(Xe-Ae,2*w)}const Go=Math.cos(st),As=Go>0?1-Go*Go:1;let $o=1,ys=1e9;if(!O&&(ys=c.dist(xe,ve),$o=U((ys-Hs)/(l0-Hs)),!($o>0)))return;const nt=yr(P,L,H,e,ge,tt,st,$o);if(!nt)return;const Jt=(Q-X)*nt.F*C;if(V&&V.push(xe,ve,Jt/(Q-X)),!(Jt>1e-7))return;d++,O||_++;const eo=$(nt.chi,0,1),Wo=nt.ray,to=$(nt.lam,0,1);let bs=B,ws=0;P.foldThick==null&&ge&&ge.sw>0&&(bs=Ne(B,Ne(tu,J0,ge.hard),ge.sw),ws=Ne(0,eu*(1-ge.hard),ge.sw));const Ms=Math.max(.3,nt.sigma)*(1+bs*As),Ho=$(nt.env+ws*As,0,.95),oo=Jt*(1-Ho),Es=ee?$i(L,H+(P.uShift??0),e):null,Rs=-Ce,Ss=Le;if(Es?Es.forEach(([Ae,Xe,xt],it)=>{const ao=oo*Xe;ne(W[it],xe+Rs*Ae,ve+Ss*Ae,Le,Ce,Math.max(.22,Ms*xt),ao,ao*Wo,$(eo-tn*Ae,0,1),to,H)}):ne(W[0],xe,ve,Le,Ce,Ms,oo,oo*Wo,eo,to,H),O&&i.length)for(const[Ae,Xe,xt]of X0(i,H,e,l)){let it=te.get(xt);if(!it){const ao=i[xt>>2];it=Y(nu(ao,xt&3)),te.set(xt,it),le.push(it)}ne(it,xe+Rs*Ae,ve+Ss*Ae,Le,Ce,.28,oo*Xe,0,$(eo-tn*Ae,0,1),to,H)}if(Ho>0){const Ae=L.envSigma,Xe=Jt*Ho;Z.add(xe,ve-.4*Ae,Ae*Ae,0,Ae*Ae,Xe,Xe*.5*Wo,Math.max(0,eo-au),to,H)}},{...M,split:M.split??.2,ds:M.ds??.2});for(const X of W)X.flush();for(const X of le)X.flush();Z.flush(),m.push(h.reduce((X,Q)=>X+Q.out.length/12,0)),p.push(f.reduce((X,Q)=>X+Q.out.length/12,0)),h.push(...W,...le),f.push(Z);const me=S.fl;if(O)for(let X=Math.max(de,-Se-60);X<=Math.min(se,Se+60);X+=1){const Q=me.pos(X);c.add(Q[0],Q[1]),u.push(Q[0],Q[1])}else{v++;let X=0;for(let H=2;H<V.length;H+=3)X=Math.max(X,V[H]);let Q=0;for(let H=0;H<V.length;H+=3)V[H+2]>.15*X&&Q++%5===0&&c.add(V[H],V[H+1])}}m.push(h.reduce((S,M)=>S+M.out.length/12,0)),p.push(f.reduce((S,M)=>S+M.out.length/12,0));const b=V0(t,e,a,u,n),T=lu(b,o.view??null),k=m[m.length-1],R=p[p.length-1],F={core:gt(h,new Float32Array(k*12),"out"),env:gt(f,new Float32Array(R*12),"out"),coreKeys:gt(h,new Float64Array(A?k:0),"keys"),envKeys:gt(f,new Float64Array(A?R:0),"keys"),glow:Float32Array.from(T.parts),glowKeys:Float64Array.from(T.keys),kR:Q0(t,n),yc:a.yc,n:d,nComp:v,compPts:_,sheets:s,W:n,glowCols:b,coreAt:m,envAt:p};return o.f64&&(F.core64=gt(h,new Float64Array(F.core.length),"out"),F.env64=gt(f,new Float64Array(F.env.length),"out"),F.glow64=Float64Array.from(T.parts)),F}const Ct=16,ia=12;function lu(t,e){const o=[],s=[];if(!t)return{parts:o,keys:s};const a=t.row/(J-1),n=.6*Ct,r=.6*ia,i=-Se-60,l=Math.floor(i/Ct),c=Math.ceil(-i/Ct),u=1/(2*t.sig*t.sig),h=2.6*t.sig;for(let f=l;f<=c;f++){const m=(f+.5)*Ct,p=(m-t.x0)/2-.5,d=Math.floor(p),_=p-d;if(!(d>=0&&d<t.ex-1))continue;const v=t.Y[d]+(t.Y[d+1]-t.Y[d])*_,A=t.A[d]+(t.A[d+1]-t.A[d])*_,g=t.cut[d]+(t.cut[d+1]-t.cut[d])*_;if(A>1e-12)for(let w=0;;w++){const b=g-(w+.5)*ia,T=b-v;if(!(T>-h))break;if(!(T<h))continue;const k=A*Math.exp(-T*T*u)*U((g-b)/t.cutW)*Ct*ia;k>1e-9&&(e&&![-2,0,2].some(R=>[84,150,300].some(F=>cu(e,m,b+R*r,F)))||(o.push(m,b,k,0,n*n,0,r*r,a,.3,0,0,0),s.push((f+1e5)*64+w)))}}return{parts:o,keys:s}}function cu(t,e,o,s){const a=e-t.obs[0],n=o-(s-110)*Et-t.obs[1],r=Math.hypot(a,n)||1e-9,i=r/fe,l=(fe+s)*Math.sin(i),c=(fe+s)*Math.cos(i)-fe,u=Math.hypot(l,c);return l*a/r/u*t.f[0]+l*n/r/u*t.f[1]+c/u*t.f[2]>t.cosMax}function uu(t,e){const o=t.sheets[0].scene,s=_t[o.level],a=o.seed??0,n=-Se;if(!s.pulse5||o.noPulse||o.ticks)return{main:[],comp:null};const r=o.dev??null;return{main:en(s,e,a,n,-n,t.W,r,o.level),comp:t.sheets.length>1?en(j0(s),e,a+h0,n,-n,t.W,r,o.level):null}}const hu=2.7;function fu(t,e,o=hu,s=2){const a=ae,n=Dc(),r=Math.round(2*a.HALF/a.DX)+1,i=new Float64Array(r),l=new Float64Array(r),c=t.W,u=(F,S,M)=>{const P=(F+a.HALF)/a.DX,L=Math.floor(P),C=P-L;L>=0&&L<r-1&&(i[L]=i[L]+M*(1-C),i[L+1]=i[L+1]+M*C,l[L]=l[L]+M*(1-C)*S,l[L+1]=l[L+1]+M*C*S)};let h=0,f=0,m=0,p=0;const d=Math.round(2.5*a.RAY_SMOOTH/s),_=[];for(let F=-d;F<=d;F++)_.push(Math.exp(-.5*(F*s/a.RAY_SMOOTH)**2));for(const F of t.sheets){const{scene:S,L:M,rel:P,fl:L,isMain:C}=F,O={...S,noFine:!0},z=S.seed??0;let[j,q]=S.sRange??M.sRange;C||(j=F.state.lo-2,q=F.state.hi+2);const B=Math.max(j,-Se-60),ee=Math.min(q,Se+60),Z=[];for(let W=B+.5*s;W<ee;W+=s){const Y=L.info(W),ue=M.act!=null?Oo(M,W,e,z,c):0,te=yr(O,M,W,e,Y,ue,0,1);if(!te){Z.push(null);continue}const[le,V]=L.pos(W),ne=te.F*P;Z.push(ne>1e-7?{px:le,py:V,w:ne,chi:$(te.chi,0,1),lam:$(te.lam,0,1),ray:te.ray}:null)}for(let W=0;W<Z.length;W++){const Y=Z[W];if(!Y)continue;let ue=0,te=0;for(let Q=-d;Q<=d;Q++){const H=Z[W+Q];H&&(ue+=_[Q+d]*H.ray,te+=_[Q+d])}const le=te>0?ue/te:Y.ray,V=Math.round(Y.chi*(J-1)),ne=Math.round(Y.lam*(n.nlam-1)),de=Y.w*s,se=de*ir(Y.chi,o)*n.ClowG[V],me=de*le*rr(Y.chi,Y.lam,o)*n.Cray[V*n.nlam+ne],X=de*(n.ClowG[V]+le*n.Cray[V*n.nlam+ne]);u(Y.px,Y.py,(se+me)/a.DX),h+=se,f+=me,m+=X,p++}}const v=Math.ceil(3*a.SIG_ALONG/a.DX),A=[];let g=0;for(let F=-v;F<=v;F++){const S=Math.exp(-.5*(F*a.DX/a.SIG_ALONG)**2);A.push(S),g+=S}const w=new Float64Array(r),b=new Float64Array(r);for(let F=0;F<r;F++)for(let S=-v;S<=v;S++){const M=F+S;M>=0&&M<r&&(w[F]=w[F]+A[S+v]*i[M]/g,b[F]=b[F]+A[S+v]*l[M]/g)}let T=0;for(let F=0;F<r;F++)w[F]>T&&(T=w[F]);const k=t.sheets[0].fl.base,R=new Float32Array(r);for(let F=0;F<r;F++)R[F]=w[F]>1e-6*T?b[F]/w[F]:k(-720+F*a.DX);return{n:r,x0:-720,dx:a.DX,A:Float32Array.from(w),Y:R,kR:t.kR,sigN:a.SIG_N,t:e,ratio:(h+f)/Math.max(1e-12,m),arcShare:h/Math.max(1e-12,h+f),totals:{arc:h,ray:f,green:m,parts:p}}}function du(t,e){const o=t.W;if(!o)return null;const s=o.now;return{phase:s.phase.name,phaseCn:s.phase.nameCn,flux:s.derived.kRK,act:s.drivers.act,dY:s.drivers.dY,comps:t.nComp,folds:t.sheets[0].scene.folds?.length??0,t:e}}const mu=[[],[{north:108,from:-650,to:470,flux:.15,width:3.6,rayLength:.16},{north:-137,from:-420,to:540,flux:.13,width:2.7,rayLength:.18}],[{north:112,from:-650,to:475,flux:.2,width:3.8,rayLength:.19},{north:-91,from:-540,to:630,flux:.18,width:2.9,rayLength:.24},{north:-223,from:-635,to:400,flux:.18,width:3.6,rayLength:.18}],[{north:186,from:-665,to:620,flux:.23,width:3.8,rayLength:.19},{north:83,from:-500,to:645,flux:.24,width:3.1,rayLength:.25},{north:-53,follow:.45,from:-570,to:480,flux:.2,width:3.2,rayLength:.23},{north:-263,follow:.6,from:-650,to:520,flux:.19,width:3.9,rayLength:.19}]],Pt=22;function br(t,e,o,s){const a=mu[t.level];if(!a?.length||t.ticks)return s;const n=[],r=[],i=t.onset?U((e-t.onset[0])/t.onset[1]):1;if(i<=0)return s;for(const[f,m]of a.entries()){const p=12931+1643*(t.seed??0)+431*f,d=e*.018+p*.17,_=o*(m.follow??1)+m.north+9*D(.5,e/83,p),v=m.from+36*D(.2,e/125,p+5),A=m.to+42*D(1.2,e/110,p+5),g=2*Math.PI/(415+43*f),w=2*Math.PI/(154+23*f);for(let b=Math.ceil(v/Pt);b*Pt<A;b++){const T=b*Pt,k=g*T+d,R=w*T-.6*d,F=_+16*Math.sin(k)+5*Math.sin(R),S=16*g*Math.cos(k)+5*w*Math.cos(R),M=U((T-v)/(90+12*f))*U((A-T)/(146-11*f)),P=T-(.35-.22*f)*e,L=.65*D(P/138,e/55,p+1)+.35*D(P/63,e/33,p+2),C=i*Pt*m.flux*M*(.12+.88*U((L+.35)/.85));if(C<=1e-7)continue;const O=(.6*Pt)**2,z=m.width**2/(1+S*S),j=.4+.08*D(P/119,e/78,p+3),q=.14+.1*U(.55+L);n.push(T,F,C,C*q,O,O*S,O*S*S+z,j,m.rayLength,0,0,0),r.push(-((f+1)*1e3+b))}}const{parts:l,keys:c}=s,u=new Float32Array(l.length+n.length),h=new Float64Array(c.length+r.length);return u.set(l),u.set(n,l.length),h.set(c),h.set(r,c.length),{parts:u,keys:h}}const on=6,pu={ds:.4,split:.4},_u=12,Fe=()=>typeof performance<"u"?performance.now():Date.now();function ra(t){return t.cmd==="tables"?t.tables.flatMap(e=>[e.half.buffer,e.coef.buffer,...e.windowMass?[e.windowMass.buffer]:[]]):t.cmd==="state"?[t.sets.core.data.buffer,t.sets.env.data.buffer,t.sets.glow.data.buffer,t.red.A.buffer,t.red.Y.buffer,...t.wx?[t.wx.pulses.buffer]:[]]:[]}function xu(t,e,o,s,a,n,r,i,l){const c=t.cull?qi(t.cull.f,t.cull.tanH,a,t.cull.margin):null,u=t.t+o,h=ru(e,u,{...i,keys:!0,view:c,comp:iu}),f={parts:h.glow,keys:h.glowKeys},m=l?br(e,u,h.yc,f):f,p=Fe(),d=_t[e.level].kR,_=h.kR/d;for(const S of[h.core,h.env,m.parts])for(let M=0;M<S.length;M+=12)S[M+2]=S[M+2]*_,S[M+3]=S[M+3]*_;const v=Fe(),A=Vi({core:{parts:h.core,keys:h.coreKeys},env:{parts:h.env,keys:h.envKeys},glow:m},s,a),g=Fe(),w=fu(h,u),b=new Float32Array(w.A.length);for(let S=0;S<b.length;S++)b[S]=w.A[S]*_;const T=uu(h,u).main,k=new Float32Array(on*T.length);T.forEach((S,M)=>k.set([S.t0-o,S.vz,S.amp,S.xc,S.w,S.lag],on*M));const R=du(h,u),F=Fe();return{cmd:"state",id:t.id,t:t.t,k:n,sets:A.sets,born:A.born,freed:A.freed,live:A.live,kR:d,red:{A:b,Y:w.Y,ratio:w.ratio,ms:F-g},ms:{emit:p-r,glow:v-p,slots:g-v,red:F-g,total:F-r},wx:{tModel:u,pulses:k,summary:R,comps:h.nComp,folds:R?.folds??0,yc:h.yc}}}function vu(t){let e=null,o=[0,0],s=null,a=0,n=Ba,r=0,i=[],l=!0,c=!1,u=Zo;const h=()=>{if(!l)return;const f=s;i.push({k:a-1,s:{core:f.core.save(),env:f.env.save(),glow:f.glow.save()}}),i.length>_u&&i.shift()};return f=>{const m=Fe();if(f.cmd==="init"){l=!f.forwardOnly,c=!!f.atlas,u={...Zo,...f.light?pu:{},...f.spacingKm===void 0?{}:{mergeKm:f.spacingKm}},e=f.scene,o=f.obs,s=vc(),a=0,i=[],n=f.red==="fixed"?{kind:"fixed"}:Ba,Oa();const S=e.weather;r=S?e.tOffset??e0(e.level,S.seed??e.seed??0).T0:0,S&&e.dev===void 0&&(e={...e,dev:Z0});const M={cmd:"init",ms:Fe()-m};t(M,[]);return}if(f.cmd==="tables"){const S=Oa(),M=f.bands.map(L=>er(f.atlasFast?Ia(S,L):tr(S,L)));f.atlasFast&&M[0]&&(M[0].windowMass=Rc());const P={cmd:"tables",tables:M,ms:Fe()-m};t(P,ra(P));return}if(!e||!s)throw new Error("zone-curtain worker: state before init");if(f.after!==void 0&&f.after!==a-1){const S=i.find(M=>M.k===f.after);if(!S)throw new Error(`zone-curtain worker: no slots kept for state ${f.after}`);for(const M of Re)s[M].restore(S.s[M]);a=f.after+1,i=i.filter(M=>M.k<=f.after)}if(e.weather){const S=xu(f,e,r,s,o,a++,m,u,c);h(),t(S,ra(S));return}const p=f.cull?qi(f.cull.f,f.cull.tanH,o,f.cull.margin):null,d=is(e,f.t)[0],_=mc(d,f.t,{...Zo,keys:!0,view:p}),v=Fe(),A=pc(e,f.t,d.fl,p),g=c?br(e,f.t,d.fl.yc,A):A,w=Fe(),b=Vi({core:{parts:_.core,keys:_.coreKeys},env:{parts:_.env,keys:_.envKeys},glow:g},s,o),T=Fe(),k=Ic(e,f.t,n),R=Fe(),F={cmd:"state",id:f.id,t:f.t,k:a++,sets:b.sets,born:b.born,freed:b.freed,live:b.live,kR:_.kR,red:{A:k.A,Y:k.Y,ratio:Bc(k.totals),ms:R-T},ms:{emit:v-m,glow:w-v,slots:T-w,red:R-T,total:R-m}};h(),t(F,ra(F))}}const wr=4,an=360*wr,We=46;function gu(t){return Math.sqrt(Math.asin(Math.min(1,Math.max(0,t)))*2/Math.PI)*(We-1)}function Au(t,e){const o=(e%360+360)%360*wr,s=Math.min(Math.floor(o),an-1),a=s===an-1?0:s+1;return t[s]*(1-(o-s))+t[a]*(o-s)}const yu=`
// Jarzynski & Olano 2020, "Hash Functions for GPU Rendering", pcg4d.
uvec4 pcg4d(uvec4 v) {
  v = v * 1664525u + 1013904223u;
  v.x += v.y * v.w; v.y += v.z * v.x; v.z += v.x * v.y; v.w += v.y * v.z;
  v ^= v >> 16u;
  v.x += v.y * v.w; v.y += v.z * v.x; v.z += v.x * v.y; v.w += v.y * v.z;
  return v;
}

uvec4 g_key;
uvec4 g_block;
int g_used;

void rngInit(uvec4 key) { g_key = key; g_block = pcg4d(key); g_used = 0; }

// Uniform on (0, 1], 24-bit resolution; never returns 0 so log() is safe.
float rngU01() {
  if (g_used == 4) { g_block = pcg4d(g_block ^ g_key.wzyx); g_used = 0; }
  uint u = g_block[g_used];
  g_used++;
  return (float(u >> 8u) + 1.0) * (1.0 / 16777216.0);
}

float rngNormal() {
  float r = sqrt(-2.0 * log(rngU01()));
  return r * cos(6.283185307179586 * rngU01());
}

const float LOG_FACT[10] = float[10](0.0, 0.0, 0.6931471805599453, 1.791759469228055,
  3.1780538303479458, 4.787491742782046, 6.579251212010101, 8.525161361065415,
  10.60460290274525, 12.801827480081469);

// log(mu^k e^-mu / k!) written as a Stirling difference so float32 does not
// cancel k*log(mu) against log(k!) for large means.
float logPoissonPmf(float k, float mu) {
  if (k < 10.0) return -mu + k * log(mu) - LOG_FACT[int(k)];
  float inv = 1.0 / k;
  return -k * log(k / mu) + (k - mu) - 0.5 * log(k) - 0.9189385332046727
    - inv / 12.0 + inv * inv * inv / 360.0;
}

float poissonSample(float mu) {
  if (mu <= 0.0) return 0.0;
  if (mu < 10.0) {
    float limit = exp(-mu), p = 1.0, n = 0.0;
    for (int i = 0; i < 96; i++) {
      p *= rngU01();
      if (p <= limit) return n;
      n += 1.0;
    }
    return n;
  }
  if (mu >= 1.0e4) {
    // Skewness 1/sqrt(mu) <= 0.01: continuity-corrected normal.
    return max(0.0, floor(mu + sqrt(mu) * rngNormal() + 0.5));
  }
  // PTRS, Hoermann 1993 (same constants as physics/noise/distributions.ts).
  float b = 0.931 + 2.53 * sqrt(mu), a = -0.059 + 0.02483 * b;
  float invAlpha = 1.1239 + 1.1328 / (b - 3.4), vr = 0.9277 - 3.6224 / (b - 2.0);
  for (int i = 0; i < 64; i++) {
    float u = rngU01() - 0.5, v = rngU01(), us = 0.5 - abs(u);
    float k = floor((2.0 * a / us + b) * u + mu + 0.43);
    if (k < 0.0) continue;
    if (us >= 0.07 && v <= vr) return k;
    if (us < 0.013 && v > us) continue;
    if (log(v) + log(invAlpha) - log(a / (us * us) + b) <= logPoissonPmf(k, mu)) return k;
  }
  return floor(mu + 0.5);
}

// Marsaglia-Tsang, scale 1; shape < 1 boosted by U^(1/shape).
float gammaSample(float shape) {
  float boost = 1.0;
  if (shape < 1.0) { boost = pow(rngU01(), 1.0 / shape); shape += 1.0; }
  float d = shape - 1.0 / 3.0, c = 1.0 / sqrt(9.0 * d);
  for (int i = 0; i < 64; i++) {
    float x = rngNormal(), t = 1.0 + c * x;
    if (t <= 0.0) continue;
    float v = t * t * t, u = rngU01();
    if (u < 1.0 - 0.0331 * x * x * x * x || log(u) < 0.5 * x * x + d * (1.0 - v + log(v))) return d * v * boost;
  }
  return d * boost;
}

// Output charge (electrons) for n input events with mean gain G and excess
// noise factor F2 = E[g^2]/E[g]^2: sum of n Gamma(1/(F2-1)) gains.
float mcpCharge(float n, float gain, float f2) {
  if (n <= 0.0) return 0.0;
  if (f2 <= 1.0000001) return n * gain;
  return gammaSample(n / (f2 - 1.0)) * (f2 - 1.0) * gain;
}
`,Ut={gain:.3,sat:.25,hzMin:3,hzMax:14},ce=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
`,Je=t=>ce.replace("#version 300 es",`#version 300 es
#define ${t}`),bu=/^[ \t]*\/\*@slot:([\w-]+)\*\/[ \t]*\n/gm,et=t=>t.replace(bu,""),Ye=ce+`
const vec2 P[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() { gl_Position = vec4(P[gl_VertexID], 0.0, 1.0); }
`,Oe=`
uniform sampler2D u_lut;
uniform int u_nodes;
uniform float u_maxAngle;
vec4 lutAt(int row, float angle) {
  float x = clamp(angle / u_maxAngle, 0.0, 1.0) * float(u_nodes - 1);
  int i0 = int(floor(x));
  int i1 = min(i0 + 1, u_nodes - 1);
  return mix(texelFetch(u_lut, ivec2(i0, row), 0), texelFetch(u_lut, ivec2(i1, row), 0), x - float(i0));
}
uniform int u_tNodes;
uniform vec2 u_logT;          // log(Tmin), log(Tmax)
float starWeight(float temperature, float angle) {
  float x = clamp((log(temperature) - u_logT.x) / (u_logT.y - u_logT.x), 0.0, 1.0) * float(u_tNodes - 1);
  int k0 = int(floor(x));
  int k1 = min(k0 + 1, u_tNodes - 1);
  return mix(lutAt(2 + k0, angle).x, lutAt(2 + k1, angle).x, x - float(k0));
}
#if defined(SKY_DIRECT) || defined(STAR_SKY)
// Horizon mode (D155), free sky only. u_hz (RGBA32F, HZ_WIDTH wide): columns 0..u_hzNodes-1 are altitude nodes at
// 90 (i / (n - 1))^2 degrees (dense near the horizon). Row 0: the four map channels' atmospheric factor, row 1: x the
// sky's factor, y (column 0) the ground's rate over the reference sky rate; rows 2..: each star colour temperature's
// factor (x). All are relative to the spectral LUT's own altitude (u_lut is computed there). Row 2 + u_tNodes: the
// landscape, per quarter degree of azimuth (column = 4 x azimuth): x = sin of the true altitude below which the ground hides
// the sky (refraction and the silhouette, D156), 4 columns per degree (1440 wide). u_hzOn 0: nothing here is read.
uniform sampler2D u_hz;
uniform int u_hzOn;
uniform int u_hzNodes;
uniform vec3 u_zenith, u_hzNorth, u_hzEast;  // ICRS unit vectors of the observer's up, north and east
uniform float u_hzEdgeMax;                   // the edge row's maximum: above it nothing can be hidden (skips the azimuth lookup)
float hzX(float s) { return sqrt(asin(clamp(s, 0.0, 1.0)) * 0.63661977) * float(u_hzNodes - 1); }
vec4 hzAt(int row, float x) {
  int i0 = int(floor(x));
  int i1 = min(i0 + 1, u_hzNodes - 1);
  return mix(texelFetch(u_hz, ivec2(i0, row), 0), texelFetch(u_hz, ivec2(i1, row), 0), x - float(i0));
}
// sin(altitude) of the ground's edge towards direction d (linear between quarter degrees of azimuth).
float hzEdge(vec3 d) {
  float az = degrees(atan(dot(d, u_hzEast), dot(d, u_hzNorth)));
  float a = (az < 0.0 ? az + 360.0 : az) * 4.0;
  int i0 = min(int(floor(a)), 1439);
  int i1 = i0 == 1439 ? 0 : i0 + 1;
  int row = 2 + u_tNodes;
  return mix(texelFetch(u_hz, ivec2(i0, row), 0).x, texelFetch(u_hz, ivec2(i1, row), 0).x, a - float(i0));
}
// A catalogue star's factor: 0 behind the ground, else its colour's atmospheric factor at its altitude.
float hzStar(vec3 d, float temperature) {
  if (u_hzOn == 0) return 1.0;
  float s = dot(d, u_zenith);
  if (s < u_hzEdgeMax) { if (s < hzEdge(d)) return 0.0; }
  float x = hzX(s);
  float t = clamp((log(temperature) - u_logT.x) / (u_logT.y - u_logT.x), 0.0, 1.0) * float(u_tNodes - 1);
  int k0 = int(floor(t));
  int k1 = min(k0 + 1, u_tNodes - 1);
  return mix(hzAt(2 + k0, x).x, hzAt(2 + k1, x).x, t - float(k0));
}
#ifdef SKY_DIRECT
// 1.3.2 (D170, sim/horizon-table.ts moonGain): the moonlight share of the sky's factor (row 1 z) rescaled by the
// direction's angle from the Moon over the table geometry's at its altitude, Krisciunas & Schaefer's Rayleigh + Mie
// terms with the band's weights; rho at least 2 degrees. u_moonOn 0: the table's factor as it is.
uniform int u_moonOn;
uniform vec3 u_moonDir;    // the Moon's direction (ICRS)
uniform vec2 u_moonTable;  // sin(Moon altitude), cos(Moon altitude) cos(view centre's azimuth from the Moon)
uniform vec2 u_moonMix;    // the band's Rayleigh and Mie weights
float moonScatter(float c) {
  float r = max(2.0, degrees(acos(clamp(c, -1.0, 1.0))));
  float k = cos(radians(r));
  return u_moonMix.x * (1.06 + k * k) + u_moonMix.y * pow(10.0, 0.79 - r / 40.0);
}
float hzMoon(vec3 d, float s, vec4 row1) {
  if (u_moonOn == 0) return row1.x;
  float cTable = s * u_moonTable.x + sqrt(max(0.0, 1.0 - s * s)) * u_moonTable.y;
  return row1.x + row1.z * (moonScatter(dot(d, u_moonDir)) / moonScatter(cTable) - 1.0);
}
// D171: the Moon's disk on the sky's factor (radiance over the LUT's sky): x sunlit, y earthshine, z angular radius (rad).
// A sphere lit from u_sunDir: the point of the disk at d has the normal -m sqrt(1 - r^2) + o r (o: the direction of d
// from the disk's centre m on the sky, r its distance over the radius); sunlit where it faces the Sun. The edge is
// anti-aliased over one cell (edgeTan, the cell pitch in TAN units). The angle comes from |d - m (d.m)| = sin, not acos.
uniform vec3 u_moonDisk;
uniform vec3 u_sunDir;
float moonDisk(vec3 d, float edgeTan) {
  if (u_moonOn == 0 || u_moonDisk.x <= 0.0) return 0.0;
  float c = dot(d, u_moonDir);
  if (c <= 0.0) return 0.0;
  vec3 o = d - u_moonDir * c;
  float a = u_moonDisk.z, ang = asin(min(1.0, length(o)));
  if (ang > a + edgeTan) return 0.0;
  float cover = clamp((a - ang) / max(edgeTan, 1e-7) + 0.5, 0.0, 1.0), r = min(ang / a, 1.0);
  vec3 n = -u_moonDir * sqrt(max(0.0, 1.0 - r * r)) + (ang > 0.0 ? normalize(o) : vec3(0.0)) * r;
  float lit = smoothstep(-0.03, 0.03, dot(n, u_sunDir));
  return cover * mix(u_moonDisk.y, u_moonDisk.x, lit);
}
#endif
// 1.3.2 (D169, small twinkle at the zenith, large at the horizon): a star's own airmass (Kasten & Young 1989, true altitude, at least 0) over the
// airmass the seeing was computed at (u_hzXRef; 0 = no rescaling). Image motion grows as its square root (tilt variance
// ~ r0^-5/3 ~ X), the scintillation index (u_scintIndex, unsaturated, at u_hzXRef) as the cube (Young), saturating at 1.
uniform float u_hzXRef;
uniform float u_scintIndex;
float hzAirmass(float s) { float h = max(degrees(asin(clamp(s, -1.0, 1.0))), 0.0); return 1.0 / (sin(radians(h)) + 0.50572 * pow(h + 6.07995, -1.6364)); }
vec2 hzSeeing(vec3 d, float tiltMm, float scint) {
  if (u_hzOn == 0 || u_hzXRef <= 0.0) return vec2(tiltMm, scint);
  float q = hzAirmass(dot(d, u_zenith)) / u_hzXRef;
  return vec2(tiltMm * sqrt(q), scint > 0.0 ? sqrt(log(1.0 + min(1.0, u_scintIndex * q * q * q))) : 0.0);
}
#endif
`,Mr=`
#ifdef STAR_SKY
layout(location=0) in vec4 a_dir;             // ICRS unit vector, F_lambda(550 nm) W/m^2/nm
layout(location=1) in uint a_seed;            // stable global sky ID
layout(location=2) in float a_T;              // colour temperature K
uniform vec3 u_axis, u_west, u_north;         // the virtual plane's TAN frame (tangent point = the view axis)
vec4 starAttr() { float dz = dot(a_dir.xyz, u_axis); return vec4(dz > 1e-6 ? vec2(dot(a_dir.xyz, u_west), dot(a_dir.xyz, u_north)) / dz : vec2(1e9), a_dir.w, a_T); }
#else
layout(location=0) in vec4 a_star;            // TAN-plane X (west+), Y (north+), F_lambda(550 nm) W/m^2/nm, colour temperature K
layout(location=1) in uint a_seed;            // original catalogue ordinal or stable global sky ID
vec4 starAttr() { return a_star; }
#endif
`,cs=Mr+`
uniform vec2 u_originMm;   // mm position of texel (0,0) centre
uniform float u_pitchMm;
uniform float u_focalMm;
uniform float u_cathodeR;
uniform float u_sceneScale;
uniform vec2 u_size;
// Moving seeing (0 = static): one-axis rms image motion (mm), log-normal scintillation sigma, time (s), frame.
uniform float u_tiltMm;
uniform float u_scint;
uniform float u_time;       // exposure midpoint (s)
uniform float u_exposureS;  // rectangular window duration (s)
uniform uint u_frame;
uniform mat3 u_point;      // camera -> atlas axes (telescope pointing); its transpose maps atlas -> camera
out vec2 v_cell;
out float v_rate;
#ifdef STAR_SKY
// 1.4.0-pre.3 (sim/twinkle.ts): the horizon mode's twinkle. Amplitude: the variance saturates softly (and lower than the old
// hard clip at 1) as TW_SAT * tanh(TW_GAIN * index / TW_SAT); time: see main(). Only the free sky's stars; the default sky keeps hzSeeing's.
const float TW_GAIN = ${Ut.gain.toFixed(4)};
const float TW_SAT = ${Ut.sat.toFixed(4)};
const float TW_HZ_MIN = ${Ut.hzMin.toFixed(4)};
const float TW_HZ_LN = ${Math.log(Ut.hzMax/Ut.hzMin).toFixed(6)};  // ln(max / min): f = min * exp(h * this), h in [0, 1)
float hzTwinkleSigma(vec3 d) {
  float q = hzAirmass(dot(d, u_zenith)) / u_hzXRef;
  return sqrt(log(1.0 + TW_SAT * tanh(TW_GAIN * u_scintIndex * q * q * q / TW_SAT)));
}
#endif
/*@slot:star-vs-uniforms*/
uint hashU(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hashF(uint x) { return float(hashU(x) >> 8) * (1.0 / 16777216.0); }
void main() {
  vec4 star = starAttr();
  vec3 cam = transpose(u_point) * vec3(star.xy, 1.0);
  vec2 mm = cam.z > 1e-6 ? cam.xy / cam.z * u_focalMm : vec2(1e9);
  float r = length(mm);
  // Point source: total rate = F550 * w(T, angle) * f^2 (w already includes the band width).
  float rate = star.z * starWeight(star.w, atan(r / u_focalMm)) * u_sceneScale * u_focalMm * u_focalMm * 1.0e-3;
  vec2 seeing = vec2(u_tiltMm, u_scint);
#ifdef STAR_SKY
  rate *= hzStar(a_dir.xyz, star.w);  // D155 horizon mode: hidden by the ground, else its altitude's extinction (1 when off)
  seeing = hzSeeing(a_dir.xyz, u_tiltMm, u_scint);  // 1.3.2 horizon mode: its own airmass (unchanged when off)
  if (u_hzOn != 0 && u_hzXRef > 0.0 && u_scint > 0.0) seeing.y = hzTwinkleSigma(a_dir.xyz);  // 1.4.0-pre.3: the horizon's twinkle law
#endif
  uint id = a_seed * 7919u + 17u;
  if (seeing.x > 0.0) {
    // Exact rectangular average of three sinusoids per star/axis (0.7-14 Hz).
    // The unresolved within-window motion is an input-side Gaussian ensemble-variance blur.
    // Equal amplitudes a with 3 a^2 / 2 = tilt^2. Different stars move independently
    // (separations far beyond the isoplanatic angle).
    vec2 d = vec2(0.0);
    for (int k = 0; k < 6; k++) {
      uint h = hashU(id + uint(k) * 104729u);
      float f = 0.7 * exp(hashF(h) * 3.0), ph = 6.2831853 * hashF(h ^ 0x9e3779b9u);
      float v = sin(6.2831853 * f * u_time + ph);
      // Live observation keeps the original instantaneous path; only frozen snapshots integrate a trajectory.
      if (u_exposureS > 0.0) {
        float z = 3.14159265 * f * u_exposureS;
        v *= abs(z) < 1e-6 ? 1.0 : sin(z) / z;
      }
      if (k < 3) d.x += v; else d.y += v;
    }
    mm += d * seeing.x * 0.8164966;
  }
  if (seeing.y > 0.0) {
    // Finite-exposure scintillation: unit-mean log-normal approximation scaled by window duration.
    float u1 = max(1e-7, hashF(hashU(id ^ (u_frame * 2654435761u)))), u2 = hashF(hashU(id + u_frame * 40503u + 1u));
    float n = sqrt(-2.0 * log(u1)) * cos(6.2831853 * u2);
#ifdef STAR_SKY
    if (u_hzOn != 0 && u_hzXRef > 0.0) {
      // 1.4.0-pre.3 (sim/twinkle.ts): in horizon mode the star's log-intensity wanders smoothly (four sinusoids of
      // TW_HZ_MIN..TW_HZ_MAX hertz, unit variance) instead of a new random number every frame.
      n = 0.0;
      for (int k = 0; k < 4; k++) {
        uint h = hashU(id + uint(k) * 15485863u + 7u);
        n += cos(6.2831853 * TW_HZ_MIN * exp(hashF(h) * TW_HZ_LN) * u_time + 6.2831853 * hashF(h ^ 0x85ebca6bu));
      }
      n *= 0.7071068;
    }
#endif
    rate *= exp(seeing.y * n - 0.5 * seeing.y * seeing.y);
  }
  v_rate = rate;
  vec2 cell = (mm - u_originMm) / u_pitchMm;
  v_cell = cell;
  gl_PointSize = 3.0;
/*@slot:star-vs-size*/
  gl_Position = r > u_cathodeR || !(rate > 0.0) ? vec4(2.0, 2.0, 2.0, 1.0) : vec4((cell + 0.5) / u_size * 2.0 - 1.0, 0.0, 1.0);
}
`;et(ce+Oe+cs);et(Je("STAR_SKY")+Oe+cs);const wu=ce+`
in vec2 v_cell;
in float v_rate;
out vec4 o;
/*@slot:star-fs-uniforms*/
void main() {
  vec2 d = abs(gl_FragCoord.xy - 0.5 - v_cell);
  vec2 w = max(vec2(0.0), 1.0 - d);
  o = vec4(v_rate * w.x * w.y, 0.0, 0.0, 0.0);
/*@slot:star-fs-main*/
}
`;et(wu);const Mu=Mr+`
uniform vec2 u_originMm;
uniform float u_pitchMm;
uniform float u_focalMm;
uniform float u_cathodeR;
uniform vec2 u_size;
uniform mat3 u_point;
uniform float u_radius;
out vec2 v_cell;
out float v_logFlux;
void main() {
  vec4 star = starAttr();
  vec3 cam = transpose(u_point) * vec3(star.xy, 1.0);
  vec2 mm = cam.z > 1e-6 ? cam.xy / cam.z * u_focalMm : vec2(1e9);
  vec2 cell = (mm - u_originMm) / u_pitchMm;
  v_cell = cell;
  v_logFlux = log(max(star.z, 1e-30));
  gl_PointSize = 2.0 * u_radius + 2.0;
  gl_Position = length(mm) > u_cathodeR ? vec4(2.0, 2.0, 2.0, 1.0) : vec4((cell + 0.5) / u_size * 2.0 - 1.0, 0.0, 1.0);
}
`;Je("STAR_SKY")+Mu;const Eu=ce+`
uniform float u_radius;
uniform float u_variance;
in vec2 v_cell;
in float v_logFlux;
out vec4 o;
/*@slot:star-map-uniforms*/
void main() {
  vec2 d = v_cell - (gl_FragCoord.xy - 0.5);
  float r2 = dot(d, d);
  if (r2 > u_radius * u_radius) discard;
/*@slot:star-map-main*/
  // ln F550 spans about -40..-10 here; the score only orders stars, so any monotone map into [0, 1] will do.
  gl_FragDepth = clamp((0.5 * r2 / u_variance - v_logFlux) / 160.0, 0.0, 1.0);
  o = vec4(d, 0.0, 1.0);
}
`;et(Eu);const Ru=`
#ifdef SKY_DIRECT
uniform vec3 u_axis, u_west, u_north;  // the virtual plane's TAN frame in ICRS (tangent point = the view axis)
uniform float u_pixelTan;              // HEALPix pixel spacing of the primary order (TAN units): sub-samples per cell
uniform float u_subSlack;              // an extension's slack: cells this much (in pixels) larger than a map pixel keep one fewer sample row; 0 in the product
#else
uniform sampler2D u_atlas;   // RGBA32F: Hα, [O III] 5007, [S II] (W/m^2/sr), continuum (W/m^2/sr/nm @550); Hα < 0 = invalid
// D119 (sim/cluster-profile.ts): a globular cluster's modelled unresolved light, added to the continuum. R32F table:
// column i at ln r = u_profileGeom.z + i / u_profileGeom.w around u_profileGeom.xy (TAN), row j smoothed by a Gaussian
// of sigma0 2^j; samples that lie a distance s apart read sigma = s (between two rows). u_profileSize.x = 0: none.
uniform sampler2D u_profile;
uniform ivec2 u_profileSize;
uniform vec4 u_profileGeom;
uniform float u_profileLogSigma0;
#endif
uniform int u_atlasSize;
uniform float u_atlasStep;   // TAN-plane units per atlas pixel
uniform vec2 u_atlasRef;     // pixel-centre coordinate of the tangent point
uniform sampler2D u_level0;  // finer levels: RGBA Hα, [O III] or -1, [S II] or -1 (keep coarser), validity
uniform sampler2D u_level1;
uniform sampler2D u_level2;  // levels 2-4: further non-overlapping regional patches (D88, D89)
uniform sampler2D u_level3;
uniform sampler2D u_level4;
uniform int u_levels;
uniform ivec2 u_levelSize[5];
uniform float u_levelStep[5];
uniform vec2 u_levelOrigin[5]; // TAN coordinate of level pixel (0,0) centre
// D123: 1 = a continuum level (R holds the F550 continuum, G/B unused): it replaces the continuum band, not the lines.
uniform float u_levelCont[5];
// D124: mip levels 1..u_mips of the atlas and of every level (MIP_FS: 2x2 means, a mip texel invalid where any of its
// four is). A cell reads each image at the coarsest mip whose texels are at most half the cell (the full-resolution
// image when it is coarser than that), so it needs at most 2 x 2 sub-samples where it took up to 8 x 8.
uniform int u_mips;
uniform mat3 u_point;        // camera -> atlas axes (telescope pointing)
uniform float u_cellTan;     // cell pitch in TAN units: sub-samples average the cell area (flux-conserving)
uniform sampler2D u_stars;   // R16F/R32F: star electron/s per texel x1e-3, bright stars (static mean positions)
uniform sampler2D u_starsFaint; // same, the fainter stars, which never move with the seeing (0.6.1)
uniform vec2 u_originMm;
uniform float u_pitchMm;
uniform float u_focalMm;
uniform float u_cathodeR;
uniform float u_sceneScale;
uniform float u_starsInRate;  // 1: bright stars are part of the static rate; 0: rendered per frame (moving seeing)
uniform float u_maxSub;       // cap on k (8 at rest; lower while the view is dragged)
// D79 (naked eye, blurred base map): 0 = everything; 1 = target + sky only; 2 = the stars added to u_base (R rate, G mask,
// both blurred: 1.3.3 normalises the rate by the mask).
uniform int u_part;
uniform sampler2D u_base;
/*@slot:rate-outputs*/
out vec4 o;
/*@slot:rate-outputs-end*/

// D124: the mip of an image of pixel step "step" for this cell (see u_mips): the coarsest whose texels are at most half
// the cell, so 2 x 2 to 4 x 4 sub-samples; an image less than four texels across the cell is read at full resolution as
// before. "single": a one-sample cell (a drag) reads the coarsest mip whose texels are at most the cell.
int mipFor(float step, bool single) {
  float r = u_cellTan / (step * (single ? 1.0 : 2.0));
  return r < 2.0 ? 0 : min(u_mips, int(floor(log2(r) + 1e-4)));
}
// Mip m of an image: texel j covers full-resolution texels [2^m j, 2^m (j + 1)), centre at 2^m (j + 0.5) - 0.5.
vec2 mipCoord(vec2 s, int m) { return m == 0 ? s : (s + 0.5) / float(1 << m) - 0.5; }
// A complete mipmap halves rounding down (renderer.buildMips stops before a side would reach 1).
ivec2 mipSize(ivec2 size, int m) { return size >> m; }
#ifndef SKY_DIRECT
vec4 atlasTexel(ivec2 q, int m) {
  int n = u_atlasSize >> m;
  if (q.x < 0 || q.y < 0 || q.x >= n || q.y >= n) return vec4(-1.0);
  return texelFetch(u_atlas, q, m);
}
vec4 atlasBilinear(vec2 tan, int m, out bool ok) {
  vec2 s = mipCoord(tan / u_atlasStep + u_atlasRef, m);
  ivec2 i0 = ivec2(floor(s));
  vec2 f = s - vec2(i0);
  vec4 a = atlasTexel(i0, m), b = atlasTexel(i0 + ivec2(1, 0), m), c = atlasTexel(i0 + ivec2(0, 1), m), d = atlasTexel(i0 + ivec2(1, 1), m);
  ok = min(min(a.x, b.x), min(c.x, d.x)) >= 0.0;
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float profileRow(int j, int i, float fx) {
  return mix(texelFetch(u_profile, ivec2(i, j), 0).r, texelFetch(u_profile, ivec2(i + 1, j), 0).r, fx);
}
float profileAt(vec2 t, float spacing) {
  if (u_profileSize.x == 0) return 0.0;
  float x = max(0.0, (log(max(length(t - u_profileGeom.xy), 1e-12)) - u_profileGeom.z) * u_profileGeom.w);
  if (x >= float(u_profileSize.x - 1)) return 0.0;
  float y = clamp((log(max(spacing, 1e-30)) - u_profileLogSigma0) * 1.44269504, 0.0, float(u_profileSize.y - 1));
  int i = int(x), j0 = int(y), j1 = min(j0 + 1, u_profileSize.y - 1);
  float fx = x - float(i);
  return mix(profileRow(j0, i, fx), profileRow(j1, i, fx), y - float(j0));
}
#endif
vec4 levelTexel(int k, ivec2 q, int m) {
  ivec2 n = mipSize(u_levelSize[k], m);
  if (q.x < 0 || q.y < 0 || q.x >= n.x || q.y >= n.y) return vec4(0.0);
  return k == 0 ? texelFetch(u_level0, q, m) : k == 1 ? texelFetch(u_level1, q, m) : k == 2 ? texelFetch(u_level2, q, m) : k == 3 ? texelFetch(u_level3, q, m) : texelFetch(u_level4, q, m);
}
// Bilinear level sample at mip m; w = coverage weight (0 outside, feathered over 6 full-resolution px at the edge).
vec4 levelSample(int k, vec2 tan, int m, out float w) {
  vec2 s0 = (tan - u_levelOrigin[k]) / u_levelStep[k];
  float edge = min(min(s0.x, s0.y), min(float(u_levelSize[k].x - 1) - s0.x, float(u_levelSize[k].y - 1) - s0.y));
  // Outside the feather's support the contribution is exactly zero. Wide fields spend most pixels here.
  if (edge <= 0.0) { w = 0.0; return vec4(0.0); }
  vec2 s = mipCoord(s0, m);
  ivec2 i0 = ivec2(floor(s));
  vec2 f = s - vec2(i0);
  vec4 a = levelTexel(k, i0, m), b = levelTexel(k, i0 + ivec2(1, 0), m), c = levelTexel(k, i0 + ivec2(0, 1), m), d = levelTexel(k, i0 + ivec2(1, 1), m);
  if (m == 0) {
    w = min(min(a.w, b.w), min(c.w, d.w)) * clamp(edge / 6.0, 0.0, 1.0);
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  // A mip texel's A is the share of its area the level covers (MIP_FS): the corners count by bilinear weight x share,
  // the level's value is their weighted mean, and a band unmeasured (-1) in most of that weight keeps the coarser one.
  vec4 q = vec4((1.0 - f.x) * (1.0 - f.y), f.x * (1.0 - f.y), (1.0 - f.x) * f.y, f.x * f.y) * vec4(a.w, b.w, c.w, d.w);
  float W = q.x + q.y + q.z + q.w;
  w = W * clamp(edge / 6.0, 0.0, 1.0);
  if (!(W > 0.0)) return vec4(0.0);
  vec4 y = vec4(a.y, b.y, c.y, d.y), z = vec4(a.z, b.z, c.z, d.z), qy = q * step(0.0, y), qz = q * step(0.0, z);
  float Wy = dot(qy, vec4(1.0)), Wz = dot(qz, vec4(1.0));
  return vec4(dot(q, vec4(a.x, b.x, c.x, d.x)) / W, 2.0 * Wy >= W ? dot(qy, y) / Wy : -1.0, 2.0 * Wz >= W ? dot(qz, z) / Wz : -1.0, W);
}
bool inLevel(int k, vec2 tan, float margin) {
  vec2 lo = u_levelOrigin[k] - margin, hi = u_levelOrigin[k] + vec2(u_levelSize[k]) * u_levelStep[k] + margin;
  return all(greaterThan(tan, lo)) && all(lessThan(tan, hi));
}

void main() {
/*@slot:rate-main*/
  ivec2 p = ivec2(gl_FragCoord.xy);
  vec2 mm = u_originMm + vec2(p) * u_pitchMm;
  float r = length(mm);
  if (r > u_cathodeR) { o = vec4(0.0); return; }
  float star = (u_starsInRate * texelFetch(u_stars, p, 0).r + texelFetch(u_starsFaint, p, 0).r) * 1.0e3 / (u_pitchMm * u_pitchMm);
  // 1.3.3 (the user's dark ring at the field's edge in naked-eye drags with staged frames): u_base holds the blurred map AND the blurred cathode
  // mask (G); dividing by it averages over the cathode only, so the blur no longer darkens the edge with the dark beyond
  // the field stop. That dark rim moved with the sky when frames were staged (a ring inside the field); the field stop's
  // edge is the display's, which stays put.
  if (u_part == 2) { vec2 base = texelFetch(u_base, p, 0).rg; o = vec4(base.r / max(base.g, 0.05) + star, 1.0, 0.0, 0.0); return; }
  float angle = atan(r / u_focalMm);
  vec4 w = lutAt(0, angle);
  vec4 sky = lutAt(1, angle);
  // Ideal rectilinear objective: the direction (x/f, y/f, 1) in camera axes, rotated into the atlas and projected.
  vec3 v = u_point * vec3(mm / u_focalMm, 1.0);
  bool front = v.z > 1e-6;
  vec2 tan = front ? v.xy / v.z : vec2(1e9);
  // k x k sub-samples over the cell: at least one per source pixel (base or level, at the mip it is read from), at most 8 x 8.
#ifdef RATE_SINGLE_SAMPLE
  const int n = 1;
  const bool single = true;
#else
  const bool single = false;
#endif
#ifndef SKY_DIRECT
  int baseMip = mipFor(u_atlasStep, single);
  int levelMip[5];
  for (int l = 0; l < 5; l++) levelMip[l] = l < u_levels ? mipFor(u_levelStep[l], single) : 0;
#endif
#ifndef RATE_SINGLE_SAMPLE
#ifdef SKY_DIRECT
  float k = ceil(u_cellTan / u_pixelTan - u_subSlack);
#else
  float k = ceil(u_cellTan / (u_atlasStep * float(1 << baseMip)));
  for (int l = 0; l < 5; l++) if (l < u_levels && inLevel(l, tan, u_cellTan)) k = max(k, ceil(u_cellTan / (u_levelStep[l] * float(1 << levelMip[l]))));
#endif
  int n = int(clamp(k, 1.0, min(8.0, max(1.0, u_maxSub))));
#endif
  vec4 bands = vec4(0.0);
  bool valid = front;
  for (int j = 0; j < 8; j++) {
    if (j >= n) break;
    for (int i = 0; i < 8; i++) {
      if (i >= n) break;
      vec2 t = tan + ((vec2(float(i), float(j)) + 0.5) / float(n) - 0.5) * u_cellTan;
#ifdef SKY_DIRECT
      vec4 b = skyValue(normalize(u_axis + t.x * u_west + t.y * u_north));
      bool ok = b.x >= 0.0;
#else
      bool ok;
      vec4 b = atlasBilinear(t, baseMip, ok);
      for (int l = 0; l < 5; l++) {
        if (l >= u_levels) break;
        float wl;
        vec4 h = levelSample(l, t, levelMip[l], wl);
        if (wl > 0.0) {
          if (u_levelCont[l] > 0.5) b.w = mix(b.w, h.x, wl);
          else b.xyz = vec3(mix(b.x, h.x, wl), h.y >= 0.0 ? mix(b.y, h.y, wl) : b.y, h.z >= 0.0 ? mix(b.z, h.z, wl) : b.z);
        }
      }
      b.w += profileAt(t, u_cellTan / float(n));
#endif
      valid = valid && ok;
      bands += b;
    }
  }
  bands /= float(n * n);
#ifdef SKY_DIRECT
  // The runtime check reads the sampled bands themselves (u_part 3, one sample per cell, RGBA target).
  if (u_part == 3) { o = valid ? bands : vec4(-1.0, 0.0, 0.0, 0.0); return; }
#endif
  float target = valid ? u_sceneScale * (dot(bands.xyz, w.xyz) + bands.w * w.w) : 0.0;
#ifdef SKY_DIRECT
  // D155 horizon mode: the cell centre's altitude scales each map channel (extinction) and the sky (brighter low down);
  // below the ground's edge the map is hidden and the ground's own radiance (sky illuminance x albedo / pi) replaces
  // the sky. Everything enters before the tube, so noise, halo and ABC act on it as on the sky. Off: untouched.
  float hzSky = 1.0;
  if (u_hzOn == 1 && front) {
    vec3 d = normalize(u_axis + tan.x * u_west + tan.y * u_north);
    float hs = dot(d, u_zenith);
    if (hs < u_hzEdgeMax && hs < hzEdge(d)) { bands = vec4(0.0); target = 0.0; hzSky = texelFetch(u_hz, ivec2(0, 1), 0).y; }
    else {
      float hx = hzX(hs);
      bands *= hzAt(0, hx);
      target = valid ? u_sceneScale * (dot(bands.xyz, w.xyz) + bands.w * w.w) : 0.0;
      hzSky = hzMoon(d, hs, hzAt(1, hx)) + moonDisk(d, u_cellTan);
    }
    sky *= hzSky;
  }
#endif
/*@slot:rate-cover*/
  o = vec4(target + sky.x + (u_part == 1 ? 0.0 : star), 1.0, 0.0, 0.0);
/*@slot:rate-colour*/
}
`,Su=et(Ru),Tu=ce+Oe+Su;Tu.replace("#version 300 es",`#version 300 es
#define RATE_SINGLE_SAMPLE`);const Fu=ce+`
uniform sampler2D u_prev;
uniform sampler2D u_after;
uniform sampler2D u_before;
uniform sampler2D u_acc;
uniform sampler2D u_glow;
uniform float u_factor;
uniform float u_accScale;
uniform float u_alpha;
uniform float u_skyI;
uniform int u_hasCur;
uniform int u_k;
uniform ivec4 u_region;   // x0, y0, x1, y1 (fine cells, exclusive)
// Thin cloud round 3: u_hasT 1 = the picture went through the cloud: the halo and the own light × its direct beam T_dir
// (u_tdir: the cloud's rateEff, B, read at the light's cell + u_tShift); 0: as before, bit for bit.
uniform sampler2D u_tdir;
uniform int u_hasT;
uniform ivec2 u_tShift;
out vec4 o;
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy), lim = textureSize(u_prev, 0) - 1;
  vec2 prev = texelFetch(u_prev, c, 0).rg, cur = vec2(0.0);
  bool even = (u_k / 2) * 2 == u_k;
  ivec2 m = even ? ((2 * c + 1) * u_k) / 2 : ((2 * c + 1) * u_k - 1) / 2;
  bool inside = m.x >= u_region.x && m.y >= u_region.y && m.x < u_region.z && m.y < u_region.w;
  // The first cell carries a share of this node's halo (all ≥ 0): none there, none at the node — and the meteor's own
  // light (its core: always inside its halo) not taken either; most of the grid stops here.
  if (u_hasCur == 1 && inside && texelFetch(u_after, m, 0).r != texelFetch(u_before, m, 0).r) {
    vec2 w = vec2(even ? 1.5 : 1.0);
    if (m.x + 1 >= u_region.z) w.x = 1.0;
    if (m.y + 1 >= u_region.w) w.y = 1.0;
    float halo = 0.0, own = 0.0, n = 0.0;
    for (int j = 0; j < 2; j++) for (int i = 0; i < 2; i++) {
      ivec2 q = m + ivec2(i, j);
      if (q.x >= u_region.z || q.y >= u_region.w) continue;
      halo += (i == 0 ? w.x : 1.0 - w.x) * (j == 0 ? w.y : 1.0 - w.y) * (texelFetch(u_after, q, 0).r - texelFetch(u_before, q, 0).r);
    }
    // Round 4: the own light centred on the node (the display reads it there): the two cells either side for an even k,
    // the cell on it for an odd one.
    ivec2 o0 = even ? m - 1 : m;
    for (int j = 0; j < 2; j++) for (int i = 0; i < 2; i++) {
      ivec2 q = o0 + ivec2(i, j);
      if ((!even && (i > 0 || j > 0)) || q.x < u_region.x || q.y < u_region.y || q.x >= u_region.z || q.y >= u_region.w) continue;
      own += texelFetch(u_before, q, 0).r; n += 1.0;
    }
    cur = vec2(max(0.0, halo), n > 0.0 ? max(0.0, own / n) : 0.0) * u_factor;
    if (u_hasT == 1) cur *= texelFetch(u_tdir, clamp(m + u_tShift, ivec2(0), textureSize(u_tdir, 0) - 1), 0).b;
  }
  vec2 now = u_alpha >= 1.0 ? cur : prev + u_alpha * (cur - prev);
  float sky = 0.0, weight = 0.0;
  // The local sky only within the blurs' reach of a halo (the last blurred map, twice as coarse, has its glow there).
  if (inside && texelFetch(u_glow, c / 2, 0).r > 0.0) {
    float near = max(texelFetch(u_prev, clamp(c + ivec2(1, 0), ivec2(0), lim), 0).r, texelFetch(u_prev, clamp(c - ivec2(1, 0), ivec2(0), lim), 0).r);
    near = max(near, max(texelFetch(u_prev, clamp(c + ivec2(0, 1), ivec2(0), lim), 0).r, texelFetch(u_prev, clamp(c - ivec2(0, 1), ivec2(0), lim), 0).r));
    if (max(near, max(now.x, prev.x)) < 0.05 * u_skyI && max(now.y, prev.y) < 0.5 * u_skyI) {
      float s = 0.0, k = 0.0;
      for (int j = 0; j < 2; j++) for (int i = 0; i < 2; i++) {
        ivec2 q = m + ivec2(i, j);
        if (q.x >= u_region.z || q.y >= u_region.w) continue;
        s += texelFetch(u_acc, q, 0).r; k += 1.0;
      }
      sky = min(s / k * u_accScale, 4.0 * u_skyI); weight = 1.0;
    }
  }
  o = vec4(now, sky * weight, weight);
}
`;Fu.replace("out vec4 o;",`
uniform float u_cloudSkyScale;
uniform int u_prevCloudy;
out vec4 o;`).replace("  if (u_hasCur == 1 && inside && texelFetch(u_after, m, 0).r != texelFetch(u_before, m, 0).r) {",`  vec2 cloud = vec2(1.0, 0.0);
  if (u_hasT == 1 && inside) cloud = texelFetch(u_tdir, clamp(m + u_tShift, ivec2(0), textureSize(u_tdir, 0) - 1), 0).ba;
  if (u_hasCur == 1 && inside && texelFetch(u_after, m, 0).r != texelFetch(u_before, m, 0).r) {`).replace("if (u_hasT == 1) cur *= texelFetch(u_tdir, clamp(m + u_tShift, ivec2(0), textureSize(u_tdir, 0) - 1), 0).b;","if (u_hasT == 1) cur *= cloud.x;").replace("if (inside && texelFetch(u_glow, c / 2, 0).r > 0.0) {",`
  // In cloud, use the composed background at the node, including its scatter, under the halo and the head itself.
  if (u_hasT == 1 && inside) {
    vec2 old = texelFetch(u_prev, c, 0).ba;
    float background = cloud.y * u_cloudSkyScale;
    sky = u_alpha >= 1.0 || u_prevCloudy == 0 || old.y == 0.0 ? background : old.x + u_alpha * (background - old.x);
    weight = 1.0;
  } else if (inside && texelFetch(u_glow, c / 2, 0).r > 0.0) {`);const Nu=ce+yu+`
uniform sampler2D u_rate;   // R: electron/s/mm^2 after input diffusion, G: cathode mask
uniform float u_areaTime;   // texel area (mm^2) x frame time (s)
uniform float u_dark;       // event/s/mm^2
uniform float u_gain;
uniform float u_f2;
uniform uint u_frame;
uniform uint u_seed;
uniform int u_mean;
uniform float u_ramp;       // power-on ramp of the photocathode signal only
uniform sampler2D u_starsDyn; // per-frame star rate (moving seeing), texel units x1e-3 e/s
uniform float u_starsScale;   // 1e3 / pitch^2 x (1 - halo weight), or 0
uniform float u_snowRate;     // bright scintillations ("snow"), event/s/mm^2
uniform float u_snowCharge;   // their mean charge in single-electron units (exponential distribution)
// 1.4 (sim/tube-saturation.ts, 示意): the MCP's local saturation — knee and ceiling of the expected output density
// (e/s/mm²); x <= 0 (never set): none.
uniform vec2 u_mcpSat;
/*@slot:sample-uniforms*/
// 0.9.46: two RG32F targets (formerly one RGBA32F), so the output spot reads 8 instead of 16 bytes per tap.
layout(location = 0) out vec2 oCharge;   // R: ordinary charge, G: snow charge
layout(location = 1) out vec2 oExpected; // their conditional expectations
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  vec2 rv = texelFetch(u_rate, p, 0).rg;
/*@slot:sample-rate-fetch*/
  float signal = rv.r + u_starsScale * texelFetch(u_starsDyn, p, 0).r;
  float mu = (signal * u_ramp + u_dark * rv.g) * u_areaTime;
  float muSnow = u_snowRate * rv.g * u_areaTime;
  // R: ordinary events (output spot = tube PSF); G: snow events (wider spot, see SPOT_H_FS).
  vec2 expected = vec2(mu * u_gain, muSnow * u_snowCharge * u_gain);
  // 1.4 highlight round (T1): past the knee a channel's gain drops (the output tends to the ceiling, slope 1 at the
  // knee: sim/tube-saturation.ts saturatedDensity); the charge drawn below is scaled alike. Below the knee, or with
  // u_mcpSat unset, nothing here changes a value.
  float depress = 1.0;
  if (u_mcpSat.x > 0.0) {
    float density = expected.x / u_areaTime, room = u_mcpSat.y - u_mcpSat.x;
    if (density > u_mcpSat.x) { depress = (u_mcpSat.x + room * (1.0 - exp((u_mcpSat.x - density) / room))) / density; expected.x *= depress; }
  }
  if (u_mean == 1) { oCharge = expected; oExpected = expected; return; }
  rngInit(uvec4(uint(p.x), uint(p.y), u_frame, u_seed));
  float q = mcpCharge(poissonSample(mu), u_gain, u_f2), qs = 0.0;
/*@slot:sample-lattice*/
  if (depress < 1.0) q *= depress;
  if (u_snowRate > 0.0) {
    float k = poissonSample(muSnow);
    if (k > 0.0) qs = gammaSample(k) * u_snowCharge * u_gain;
  }
  oCharge = vec2(q, qs); oExpected = expected;
}
`;et(Nu);const ku=ce+`
uniform sampler2D u_frame;
uniform sampler2D u_prev;
uniform sampler2D u_expected;
uniform float u_invAreaTime;
uniform float u_alpha;
// D125: the view moved; the running sum is read at p + u_shift (whole pixels, renderer.reprojection). Where that lies
// outside the last frame's region or field (u_originMm: that grid's origin) there is no history: this frame alone.
uniform int u_reproject;
uniform ivec2 u_shift;
uniform ivec4 u_region;
uniform vec2 u_originMm;
uniform float u_pitchMm;
uniform float u_cathodeR;
out vec4 o;
/*@slot:accum-uniforms*/
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  vec2 cur = vec2(texelFetch(u_frame, p, 0).r, texelFetch(u_expected, p, 0).r) * u_invAreaTime;
/*@slot:accum-main*/
  ivec2 q = p;
  if (u_reproject == 1) {
    q = p + u_shift;
    if (q.x < u_region.x || q.y < u_region.y || q.x >= u_region.z || q.y >= u_region.w || length(u_originMm + vec2(q) * u_pitchMm) > u_cathodeR) { o = vec4(cur, 0.0, 0.0); return; }
  }
  vec2 prev = texelFetch(u_prev, q, 0).rg;
  o = vec4(u_alpha >= 1.0 ? cur : prev + u_alpha * (cur - prev), 0.0, 0.0);
}
`;et(ku);const Lu=ce+Oe+`
uniform int u_eyeTube;
uniform float u_focalMm;
uniform vec2 u_eyeTubeMechanism; // working gain, dark rate (MCP input); display-only sky reference
uniform float u_eyeReferenceY; // fixed display scale; independent of all sky components
uniform float u_eyeSourceGain; // D114: 2^EV from the total sky SQM, on the source increment only
uniform vec4 u_eyeSourceShoulder;
// D181 the visual model on the virtual eye tube (eye-vision.ts; D183: also on the tube's screen, where
// u_eyeTubeMechanism is (1, 0) and x is the screen's cd/m² per intensity). u_eyeVisionCurve: x cd/m² at the eye per unit of
// (intensity / gain - dark rate), y the response's centre sigma (cd/m², adaptation included), z its exponent n, w the
// white level. u_eyeVisionBlur: x 1 = u_medium holds the Gaussian blur of the picture's part below the threshold (soft-
// clipped as in PAIR_BLUR_FS), y that threshold (screen intensity), z the clip's sharpness, w the blur's sigma (mm, for
// the field stop's edge).
uniform int u_eyeVision;
uniform vec4 u_eyeVisionCurve;
uniform vec4 u_eyeVisionBlur;
uniform float u_eyeSP;
uniform sampler2D u_intensity; // electron/s/mm^2 at the screen
uniform sampler2D u_medium;
uniform sampler2D u_coarse;
uniform int u_eyeMode;
uniform vec2 u_eyeContrast; // contrast threshold and field adapting intensity, independent of EV
uniform int u_eyeLocal;     // 1 (naked eye, D68): each band's contrast is taken against the next coarser band, not the pixel itself
uniform int u_margin;
uniform vec2 u_half;           // canvas half-size, px
uniform float u_viewRadius;    // the eyepiece's round field stop (px); 1.3.2: very large on the full-screen view (none)
// D116: grid texels per canvas pixel (1 at rest; below 1 while a dragged free sky runs on a reduced grid) and the
// texel coordinate of the view centre (margin + n / 2, margin + ny / 2). Texel positions are scaled about the view centre.
uniform float u_viewScale;
uniform vec2 u_gridCentre;
// D152: 1 = the shown picture was accumulated in another view (frames staged): each pixel reads the picture where the
// picture's camera saw this pixel's sky. u_warpD = M − I with picture direction M·(mm / focal, 1); u_warpMm: the live
// view centre, the picture grid's origin (mm); u_warpScale: focal, grid pitch (mm). Past u_warpHalf.x texels from the
// picture's centre (u_warpBox 1, the full-screen view: past u_warpHalf on either axis) the picture has nothing: see u_fill.
uniform int u_warp;
uniform mat3 u_warpD;
uniform vec4 u_warpMm;
uniform vec2 u_warpScale;
uniform vec2 u_warpHalf;
uniform int u_warpBox;
// 1.3.3: 1 = the picture is from another horizon instant (the time slider): only its sky follows the turn. u_enuNow /
// u_enuThen take a camera direction (mm / focal, 1) of the live view / of the picture to the observer's (east, north,
// up); u_skyline is the ground's edge (sin of the true altitude per quarter degree of azimuth), u_skylineMax its top.
uniform int u_warpGround;
uniform mat3 u_enuNow;
uniform mat3 u_enuThen;
uniform highp sampler2D u_skyline;
uniform float u_skylineMax;
bool onGround(vec3 v) {
  float s = v.z / length(v);
  if (s >= u_skylineMax) return false;
  float az = degrees(atan(v.x, v.y));
  float a = (az < 0.0 ? az + 360.0 : az) * 4.0;
  int i0 = min(int(floor(a)), 1439);
  int i1 = i0 == 1439 ? 0 : i0 + 1;
  return s < mix(texelFetch(u_skyline, ivec2(i0, 0), 0).x, texelFetch(u_skyline, ivec2(i1, 0), 0).x, a - float(i0));
}
// 1.1.3: 1 = sky the picture never saw is drawn from the rate map of the frame in flight (u_fillRate: R rate, G cathode
// mask; u_fillStars: its moving stars), made for a view u_fillD = M − I and grid origin u_fillOrigin (mm) away, as its
// expected light: u_fillMech = stars' scale, power-on ramp, dark rate, gain; u_fillSnow = the snow's mean charge rate.
uniform int u_fill;
uniform mat3 u_fillD;
uniform vec2 u_fillOrigin;
uniform sampler2D u_fillRate;
uniform sampler2D u_fillStars;
uniform vec4 u_fillMech;
uniform float u_fillSnow;
uniform vec3 u_xyz;            // XYZ per (electron/s/mm^2) at the screen
uniform float u_scale;         // 683 / 10 cd/m^2 * 2^EV
uniform float u_gammaInv;
uniform vec2 u_centerMm;
uniform float u_pitchMm;
uniform float u_cathodeR;
// Highlight shoulder (display only): knee (display luminance), log slope k, log normalizer, level of the peak; k <= 0 = off.
uniform vec4 u_shoulder;
uniform vec2 u_auroraShoulder; // first-channel ceiling, transition share
// 1.4 highlight round 2 (sim/meteor-highlight.ts): bright meteors' heads on the tube's display. u_hlLocal: x 1 = on (0 or
// never set: off, nothing below changes a value), y u_hlMap's linear scale, z the veil's strength, w the own light's gate
// (× the map's own light); u_hlGlow: x the glow's gain, y its floor, z 1 / ln(1 + full / floor), w u_hlHalo's scale
// (display Y); u_hlCore: x white, y the own light's start (× the sky), z 1 / ln(its span), w the glow's ceiling;
// u_hlOwn (round 4): x the halo's share in the own light's start, y the own light's, zw the veil's exemption's start and
// end (× the sky); u_hlUv: xy 1 / (the halo's coarse factor × u_hlHalo's size), zw the same for u_hlMap (twice
// as coarse). renderer hlTargets: u_hlHalo the integrated map (R the halo, G the meteors' own light, on the halo's own
// coarse nodes), u_hlMap (HL_BLUR_V_FS) R the blurred halo, B the local sky.
uniform vec4 u_hlLocal;
uniform vec4 u_hlGlow;
uniform vec4 u_hlCore;
uniform vec4 u_hlOwn;
uniform vec4 u_hlUv;
uniform sampler2D u_hlMap;
uniform sampler2D u_hlHalo;
// D115 star reshaping (display only; renderer.setStarShape): thinner bright catalogue stars, same light.
uniform sampler2D u_starMap;  // RG = offset to the star covering this texel (texels), A = 1; see STAR_MAP_FS
uniform vec4 u_starShape;     // c0 (1 = off), knee (x white), physical PSF variance (texel^2), SHARP_REF (D118)
uniform vec4 u_starProfA;     // peak-normalised amplitudes of the grid's star profile, four Gaussian components (sum 1)
uniform vec4 u_starProfV;     // their variances (texel^2)
uniform vec4 u_starProfW;     // D118: the components' light shares (sum 1)
uniform vec4 u_starProfP;     // D118: their physical variances (texel^2; no deposit or tap discretisation)
uniform float u_starSynth;    // D118: 1 = draw sharp stars' cores from the PSF at this finer canvas's pixels
uniform int u_compose;        // D118: 1 = finer canvas; outside bright stars' discs copy u_gridDisplay (the grid-sized picture)
uniform sampler2D u_gridDisplay;
uniform float u_starRing;     // radius of the background ring around a star (texels)
uniform float u_starNoise;    // D118: the star's own light is reshaped above this many noise sigmas of its background ring
uniform float u_starWhite;    // "white" for the star reshaping: this display-linear level (the shoulder's top is the scene's brightest)
uniform sampler2D u_gridBright; // D118: texels a star was reshaped in, written by the grid-sized pass (R8)
// 1.4 bright edges supersampled (gpu/display-upsample.ts): 1 = inside a bright meteor's glow, a cell next to a clipped
// one is drawn by edgeSupersampled. Set with the heads' uniforms only (read only while u_hlLocal.x is on).
uniform int u_hlEdges;
layout(location = 0) out vec4 o;
// D118: second target of the grid-sized pass, 1 where a star was reshaped (discarded when drawing to the canvas).
layout(location = 1) out vec4 oBright;
float starReshaped = 0.0;
const mat3 XYZ_TO_SRGB = mat3(3.2406255, -0.9689307, 0.0557101,
                              -1.537208, 1.8757561, -0.2040211,
                              -0.4986286, 0.0415175, 1.0569959);
float encodeSrgb(float v) { return v <= 0.0031308 ? 12.92 * v : 1.055 * pow(v, 1.0 / 2.4) - 0.055; }
float contrastBand(float delta, float base, float threshold) {
  if (threshold <= 0.0) return delta;
  float t = max(base, 1e-12) * threshold, d2 = delta * delta;
  return delta * d2 / (d2 + t * t);
}
float limitT(float t, float c, float grey) {
  float d = c - grey;
  if (d < 0.0) return min(t, grey / -d);
  if (d > 0.0) return min(t, (1.0 - grey) / d);
  return t;
}
// The virtual eye is monochrome, but retains the same shoulder, gamut and gamma as the tube. D121: above the shoulder's
// top the log shoulder's slow rise ends in an exponential approach to white (same slope at the top), so a core brighter
// than the sampled peak (a knot between the readout's samples) keeps some gradation instead of clipping.
vec3 eyeTubeTone(float intensity, vec4 shoulder) {
  vec3 xyz = u_xyz * (max(0.0, intensity) * u_scale);
  if (shoulder.y > 0.0 && xyz.y > shoulder.x) {
    float knee = shoulder.x, y = xyz.y, top = shoulder.w;
    float shown = knee + (top - knee) * log(1.0 + shoulder.y * (y - knee)) / shoulder.z;
    if (shown > top) shown = top + (1.0 - top) * (1.0 - exp(-(shown - top) / (1.0 - top)));
    xyz *= shown / y;
  }
  vec3 rgb = XYZ_TO_SRGB * xyz;
  float grey = min(1.0, xyz.y), t = 1.0;
  t = limitT(t, rgb.r, grey); t = limitT(t, rgb.g, grey); t = limitT(t, rgb.b, grey);
  return pow(clamp(grey + t * (rgb - grey), 0.0, 1.0), vec3(u_gammaInv));
}
// CIE 191:2010 mesopic weight (same bisection as eyeMesopicWeight in naked-eye.ts).
float mesopicWeight(float p, float s) {
  if (max(p, s) <= 0.005) return 0.0;
  if (min(p, s) >= 5.0) return 1.0;
  const float V0 = 683.0 / 1699.0;
  float lo = 0.0, hi = 1.0;
  for (int i = 0; i < 14; i++) {
    float m = 0.5 * (lo + hi), l = (m * p + (1.0 - m) * V0 * s) / (m + (1.0 - m) * V0);
    if (clamp(0.767 + 0.3334 * log(max(l, 1e-30)) * 0.4342945, 0.0, 1.0) > m) lo = m; else hi = m;
  }
  return 0.5 * (lo + hi);
}
// Luminance before the highlight shoulder that it shows as y (inverse of the log shoulder; identity when off or below the knee).
float unshoulder(vec4 sh, float y) {
  if (sh.y <= 0.0 || y <= sh.x) return y;
  y = min(y, sh.x + 0.999 * (sh.w - sh.x));
  return sh.x + (exp((y - sh.x) * sh.z / (sh.w - sh.x)) - 1.0) / sh.y;
}
// The virtual eye's gain on a source increment over a sky of screen intensity "total": D84 de Vries-Rose x D114's sky gain.
float eyeSourceSensitivity(float total, float perIntensity) {
  return u_eyeSourceGain * sqrt(2.0 * u_eyeReferenceY / (u_eyeReferenceY + total * perIntensity));
}
// D181: the luminance at the eye (cd/m²) of a screen intensity, and the visual model's display-linear response to it.
float eyeVisionLum(float intensity) { return max(0.0, intensity / u_eyeTubeMechanism.x - u_eyeTubeMechanism.y) * u_eyeVisionCurve.x; }
float eyeVisionY(float L) { float x = pow(max(L, 0.0) / u_eyeVisionCurve.y, u_eyeVisionCurve.z); return u_eyeVisionCurve.w * x / (1.0 + x); }
// The part of an intensity below the threshold c.x (PAIR_BLUR_FS's soft clip, sharpness c.y).
float visionBelow(float r, vec2 c) {
  if (r <= 0.0) return r;
  float l = c.y * log2(r / c.x);
  return l > 60.0 ? c.x : r * exp2(-log2(1.0 + exp2(l)) / c.y);
}
// D182: a triangular dither of +-1 code (interleaved gradient noise, Jimenez 2014) on the naked eye's sRGB before the
// 8-bit canvas: its dark, smooth gradients (sky glow, the blurred Milky Way) sit on a few codes near black and stepped
// into visible bands. Fixed in the pixel grid, so a still view stays still.
float ditherCode() {
  vec2 p = gl_FragCoord.xy, q = p + vec2(17.0, 31.0);
  float a = fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
  float b = fract(52.9829189 * fract(dot(q, vec2(0.06711056, 0.00583715))));
  return (a + b - 1.0) / 255.0;
}
/*@slot:display-functions*/
// erf, |error| < 2e-4 (Winitzki): the blurred picture's share of the cathode at the field stop.
float erfApprox(float x) { float a = x * x; return sign(x) * sqrt(1.0 - exp(-a * (1.2732395 + 0.147 * a) / (1.0 + 0.147 * a))); }
// D115: screen intensity above b that this pixel shows as white (tube; or the virtual eye's source path).
float whiteExcess(float b, vec2 mm) {
  float perIntensity = max(u_xyz.y * u_scale, 1e-30);
  if (u_eyeVision == 1) {
    // D183 (the virtual eye tube or the tube's screen): the knee (KNEE x this) lands where the response shows what the
    // classic knee shows, KNEE x white before gamma (at most KNEE x the curve's own white). D181 put white itself at the
    // response 0.8: at the asymptote once the curve's white was 0.8 (D182's default), and on a soft curve (n 0.7) the
    // visible discs lie far below it anyway, so the star reshaping did nothing.
    float y = u_starShape.y * min(u_starWhite, u_eyeVisionCurve.w);
    float L = u_eyeVisionCurve.y * pow(y / (u_eyeVisionCurve.w - y), 1.0 / u_eyeVisionCurve.z);
    return ((L / u_eyeVisionCurve.x + u_eyeTubeMechanism.y) * u_eyeTubeMechanism.x - b) / u_starShape.y;
  }
  if (u_eyeTube == 1) {
    float total = max(0.0, lutAt(1, atan(length(mm) / u_focalMm)).x + u_eyeTubeMechanism.y) * u_eyeTubeMechanism.x;
    float sensitivity = eyeSourceSensitivity(total, perIntensity);
    float source = unshoulder(u_eyeSourceShoulder, u_starWhite) / perIntensity - u_eyeReferenceY / perIntensity;
    return min(b, total) + source / sensitivity - b;
  }
  return unshoulder(u_shoulder, u_starWhite) / perIntensity - b;
}
ivec2 starTexel(vec2 p) { return clamp(ivec2(floor(p + 0.5)), ivec2(0), textureSize(u_intensity, 0) - 1); }
#define CE(a, b) { float lo = min(a, b); b = max(a, b); a = lo; }
// D115/D118: the star's own light in texel q (index units, centres at integers): its excess over the background b
// above the noise allowance, at most a generous (wider) model of its profile scaled to the measured peak.
float starOwnAt(vec2 q, vec2 c, float b, float allowance, float peak) {
  vec2 d = q - c;
  float excess = texelFetch(u_intensity, starTexel(q), 0).r - b;
  return min(max(excess - allowance, 0.0), peak * dot(u_starProfA, exp(-0.5 * dot(d, d) / (1.6 * u_starProfV))));
}
// D115: the star at texel position c seen from texel p. Background = median of eight texels on a ring just outside the
// star's disc, peak = brightest of the 3x3 around its centre (both from the picture itself, so moving and twinkling
// stars and the tube's noise are taken as they are). A peak above the knee K is lowered to K (P/K)^c (c < 1) by scaling
// the star's whole profile, which stays smooth and round: the white core and the visible disc shrink, brighter stars
// still grow (more slowly), and stars that only just reached white turn a little grey, so the brightest stand out.
// (Sharpening the profile instead made blocky cores: a steep edge aliases on the grid.) Only the star's own light is
// scaled: not a neighbour inside its disc, nor the noise in its faint wings.
float reshapeStar(vec2 p, vec2 c, float intensity, vec2 mm) {
  float peak = 0.0, sum = 0.0; vec2 peakAt = c;
  for (int dy = -1; dy <= 1; dy++) for (int dx = -1; dx <= 1; dx++) {
    vec2 q = vec2(starTexel(c + vec2(dx, dy)));
    float t = texelFetch(u_intensity, ivec2(q), 0).r; sum += t;
    if (t > peak) { peak = t; peakAt = q; }
  }
  float s0 = texelFetch(u_intensity, starTexel(c + vec2(u_starRing, 0.0)), 0).r, s1 = texelFetch(u_intensity, starTexel(c - vec2(u_starRing, 0.0)), 0).r;
  float s2 = texelFetch(u_intensity, starTexel(c + vec2(0.0, u_starRing)), 0).r, s3 = texelFetch(u_intensity, starTexel(c - vec2(0.0, u_starRing)), 0).r;
  float e = u_starRing * 0.7071068;
  float s4 = texelFetch(u_intensity, starTexel(c + vec2(e, e)), 0).r, s5 = texelFetch(u_intensity, starTexel(c - vec2(e, e)), 0).r;
  float s6 = texelFetch(u_intensity, starTexel(c + vec2(e, -e)), 0).r, s7 = texelFetch(u_intensity, starTexel(c + vec2(-e, e)), 0).r;
  CE(s0, s2) CE(s1, s3) CE(s4, s6) CE(s5, s7) CE(s0, s4) CE(s1, s5) CE(s2, s6) CE(s3, s7)
  CE(s0, s1) CE(s2, s3) CE(s4, s5) CE(s6, s7) CE(s2, s4) CE(s3, s5) CE(s1, s4) CE(s3, s6) CE(s1, s2) CE(s3, s4) CE(s5, s6)
  float b = 0.5 * (s3 + s4), x = intensity - b, w = whiteExcess(b, mm), knee = u_starShape.y * w;
  peak -= b;
  // The model's amplitude at the star's true centre: the brightest texel may sit up to half a texel off it (a star on a
  // texel edge puts half its light in each neighbour), so it is divided by the profile there (D118).
  vec2 dp = peakAt - c;
  float top = peak / max(dot(u_starProfA, exp(-0.5 * dot(dp, dp) / u_starProfV)), 0.05);
  if (x <= 0.0 || knee <= 0.0 || top <= knee) return intensity;
  starReshaped = 1.0;
  vec2 d = p - c;
  // D118: the allowance is the local noise (the ring's interquartile spread / 1.35, times u_starNoise sigmas), not a
  // fixed share of white: a fixed 4 % was never scaled and stayed as a faint glow ring around the shrunken core. In a
  // noiseless view (naked eye, mean frame) it is ~0 and the whole wing shrinks with the core.
  float r2 = dot(d, d), allowance = u_starNoise * (s5 - s2) / 1.349;
  // The star's own light here is at most this generous (wider) model of its profile; above the allowance (which keeps
  // the background's noise as it is) that part is scaled, the rest (a neighbour, noise) is left. No weight depends on
  // the pixel's own value, so the mapping stays monotone: no dark rings. Taken at the four texel centres around this
  // pixel and interpolated exactly as the picture is (bilinear on a finer canvas; the texel itself at rest), so between
  // texels nothing of the star is left behind (D118).
  vec2 i0 = floor(p), f = p - i0;
  float own = min(x, mix(mix(starOwnAt(i0, c, b, allowance, top), starOwnAt(i0 + vec2(1.0, 0.0), c, b, allowance, top), f.x),
    mix(starOwnAt(i0 + vec2(0.0, 1.0), c, b, allowance, top), starOwnAt(i0 + vec2(1.0, 1.0), c, b, allowance, top), f.x), f.y));
  // Unscaled only at the very edge of the disc (radius u_starRing - 1 = 8 sigma of the broadest component), so a
  // very wide star can never show a seam there.
  float edge = 1.0 - smoothstep(0.85 * (u_starRing - 1.0), u_starRing - 1.0, sqrt(r2));
  // D118: the exponent follows the pixel actually drawn (u_viewScale texels a side; 1 at rest on a full grid).
  float pixel = u_viewScale * u_viewScale / 6.0, c0 = u_starShape.x;
  float cExp = c0 * clamp(u_starShape.z / (u_starShape.z + pixel) / u_starShape.w, 0.1, 1.0);
  float shaped = own * (peak > knee ? pow(knee * pow(peak / knee, cExp) / peak, edge) : 1.0);
  if (u_starSynth > 0.0) {
    // D118: on a canvas finer than the grid, draw the core of the star's own light from its flux (the 3x3 sum; a sharp
    // star keeps nearly all of it there) and the physical PSF at these pixels, centred on its catalogue position, so a
    // star on a texel corner is no longer a 2x2 block. Its peak is compressed like the D115 one; blended in above the
    // knee so the stars just reaching it change smoothly.
    vec4 vt = u_starProfP + pixel, at = u_starProfW / vt;
    float norm = dot(at, vec4(1.0)), coreTop = max(sum - 9.0 * b, 0.0) * norm / 6.2831853;
    float topShown = coreTop > knee ? knee * pow(coreTop / knee, cExp) : coreTop;
    float core = topShown * dot(at / norm, exp(-0.5 * r2 / vt));
    shaped = mix(shaped, core, u_starSynth * smoothstep(knee, 2.0 * knee, coreTop) * edge);
  }
  return intensity - own + shaped;
}
// Catmull-Rom (Keys, a = -0.5) of a picture at p in texel units (centres at half-integers), 4x4 texels, clamped at the
// edges and to the display range (the kernel overshoots a little at sharp edges).
vec4 catmullRom(sampler2D s, vec2 p) {
  vec2 q = p - 0.5, i0 = floor(q), f = q - i0;
  vec2 f2 = f * f, f3 = f2 * f;
  vec2 w0 = 0.5 * (-f3 + 2.0 * f2 - f), w1 = 0.5 * (3.0 * f3 - 5.0 * f2 + 2.0), w2 = 0.5 * (-3.0 * f3 + 4.0 * f2 + f), w3 = 0.5 * (f3 - f2);
  ivec2 lim = textureSize(s, 0) - 1, b = ivec2(i0) - 1;
  vec4 row[4];
  for (int j = 0; j < 4; j++) {
    int y = clamp(b.y + j, 0, lim.y);
    row[j] = w0.x * texelFetch(s, ivec2(clamp(b.x, 0, lim.x), y), 0) + w1.x * texelFetch(s, ivec2(clamp(b.x + 1, 0, lim.x), y), 0)
      + w2.x * texelFetch(s, ivec2(clamp(b.x + 2, 0, lim.x), y), 0) + w3.x * texelFetch(s, ivec2(clamp(b.x + 3, 0, lim.x), y), 0);
  }
  return clamp(w0.y * row[0] + w1.y * row[1] + w2.y * row[2] + w3.y * row[3], 0.0, 1.0);
}
// 1.4 highlight round 2 (sim/meteor-highlight.ts meteorHighlight): filtered reads of the maps at texel position p
// (centres at half-integers; u_hlHalo bilinear on the halo's own coarse nodes: the halo and the own light as the add
// pass had them). The pixel relative to the halo (its flat disc and steep edge become the local sky's level S, at least
// the pixel's own up to S); round 4: around the halo the sky's detail veiled toward S (brighter pixels keep their light),
// the meteor's own light inside the halo white by its level against the sky (its expected light ye less the sky and the
// halo, gated by the map's own light), then the glow of the halo blurred. Continuous, monotone in y; an empty map
// changes nothing.
float meteorHighlight(float y, float ye, vec2 p) {
  vec4 m = texture(u_hlMap, p * u_hlUv.zw);
  float g = m.x * u_hlLocal.y, W = u_hlCore.x, S = max(m.z * u_hlLocal.y, 1e-6);
  // Away from every halo the blurred one is 0 or a few 10⁻⁵ of the sky (its Gaussian's tail: veil and glow under 10⁻⁴ of
  // the pixel there; the halo and its own light are well inside).
  if (g <= 1e-5 * S) return y;
  // The halo, at least a quarter of what a fine cell either way has: the output spot spreads the picture's halo past its
  // steep edge (well under that), while a trail crossing the edge keeps its contrast against the halo where it is.
  vec2 q = p * u_hlUv.xy, c1 = u_hlUv.xy, ho = texture(u_hlHalo, q).rg;
  float A = max(ho.x, 0.25 * max(max(texture(u_hlHalo, q + vec2(c1.x, 0.0)).r, texture(u_hlHalo, q - vec2(c1.x, 0.0)).r),
    max(texture(u_hlHalo, q + vec2(0.0, c1.y)).r, texture(u_hlHalo, q - vec2(0.0, c1.y)).r)));
  A = max(A * u_hlGlow.w, 0.0);
  float O = max(ho.y * u_hlGlow.w, 0.0);
  float h = A / (S + A), yk = max(y * (1.0 - h), min(y, S));
  // The veil (v·g / (S + v·g): the halo's share at its edge, where g is half its disc); pixels past the exemption (× S,
  // smooth) keep their light.
  float vg = u_hlLocal.z * g;
  float t = yk + vg / (S + vg) * (1.0 - smoothstep(u_hlOwn.z, u_hlOwn.w, yk / S)) * (S - yk);
  // The own light (most pixels have none: no logarithm there).
  float f = min(max(0.0, ye - S - A), u_hlLocal.w * O), f0 = u_hlCore.y * S + u_hlOwn.x * A + u_hlOwn.y * O;
  if (f > f0) t += max(0.0, W - t) * h * min(1.0, log(f / f0) * u_hlCore.z);
  // The glow takes the pixel the share G of the way to the ceiling (cyan, below the first channel's clip).
  float G = min(1.0, u_hlGlow.x * log(1.0 + g / u_hlGlow.y) * u_hlGlow.z);
  return t + max(0.0, u_hlCore.w - t) * G;
}
// A light (screen intensity, its expected light ye) as the bright meteors' heads show it (their maps at hp).
float hlIntensity(float intensity, float ye, vec2 hp) {
  float yPer = max(u_xyz.y * u_scale, 1e-30);
  return meteorHighlight(intensity * yPer, max(ye, 0.0) * yPer, hp) / yPer;
}
// The tube's display of a light (screen intensity): the highlight shoulder, the phosphor's colour brought into the
// display's gamut towards grey; display-linear, before gamma.
vec3 tubeLinear(float intensity) {
  vec3 xyz = u_xyz * (intensity * u_scale);
  // Above the knee: y -> knee + (top - knee) ln(1 + k (y - knee)) / ln(1 + k (peak - knee)); same slope at the knee.
  if (u_shoulder.y > 0.0 && xyz.y > u_shoulder.x) {
    float knee = u_shoulder.x, y = xyz.y;
    xyz *= (knee + (u_shoulder.w - knee) * log(1.0 + u_shoulder.y * (y - knee)) / u_shoulder.z) / y;
  }
  // Finish the shoulder above its nominal top when the aurora's measured peak trails what is in the picture.
  // Unit slope at the knee and a smooth ceiling below the first clipping channel preserve the phosphor colour.
  if (u_auroraShoulder.y > 0.0) {
    float knee = u_auroraShoulder.x * (0.9 / 0.972), y = xyz.y;
    if (y > knee) {
      float width = u_auroraShoulder.x - knee, excess = y - knee;
      xyz *= mix(1.0, (knee + width * (excess / (width + excess))) / y, u_auroraShoulder.y);
    }
  }
  vec3 rgb = XYZ_TO_SRGB * xyz;
  float grey = min(1.0, xyz.y), t = 1.0;
  t = limitT(t, rgb.r, grey); t = limitT(t, rgb.g, grey); t = limitT(t, rgb.b, grey);
  return clamp(grey + t * (rgb - grey), 0.0, 1.0);
}
// Bright edges supersampled (gpu/display-upsample.ts). Each of the 3 × 3 cells around "pixel" is clipped or not as the
// display draws it (the heads' display at its centre, hlIntensity, then the shoulder and the gamut: its brightest channel
// at EDGE_LEVEL). 3 × 3 sub-cell samples of this cell take that light bilinearly in log between the centres and are
// clipped from halfway (in log) between the dimmest clipped and the brightest unclipped of the centres each one reads
// (taken over the whole 3 × 3, a bright head's corner put grey nubs on a straight side); the cell becomes its own
// colour and the other side's brightest one in proportion to its sub-samples on each side. So the white's edge cuts the
// cells' steps along the light's own contour, and on average sits where the cells put it (halfway between centres): the
// white keeps its width. (Clipping the interpolated light at the clip itself put the edge most of the way to the next
// centre — a head's core is many times white, its glow just under it — and widened the white past round 5's widths; the
// expected light's contour, smoother, left grey nubs where the head's white does not follow it; the heads' display
// evaluated between centres left spikes where the head narrows, its maps being tuned at the centres.) Only inside the
// glow (meteorHighlight's own test at this cell) and where the 3 × 3 has both sides; elsewhere the cell's own display,
// lin, bit for bit.
const float EDGE_LEVEL = 0.95;
vec3 edgeSupersampled(ivec2 pixel, float own, vec3 lin) {
  vec4 m = texture(u_hlMap, (vec2(pixel) + 0.5) * u_hlUv.zw);
  if (m.x * u_hlLocal.y <= 1e-5 * max(m.z * u_hlLocal.y, 1e-6)) return lin;
  ivec2 lim = textureSize(u_intensity, 0) - 1;
  bool inside = max(lin.r, max(lin.g, lin.b)) >= EDGE_LEVEL;
  // Each centre's light (log) and side; the dimmest clipped and the brightest unclipped centre; the other side's
  // brightest light (the white, or the glow next to it).
  // (Clipped cells' lights are offset by +1e4 in k*: one number carries the light and the side.)
  vec3 k0 = vec3(0.0), k1 = vec3(0.0), k2 = vec3(0.0);
  float other = -1.0;
  for (int j = 0; j < 3; j++) for (int i = 0; i < 3; i++) {
    float x = own;
    ivec2 c = clamp(pixel + ivec2(i - 1, j - 1), ivec2(0), lim);
    vec2 v = texelFetch(u_intensity, c, 0).rg;
    if (i != 1 || j != 1) x = hlIntensity(max(v.r, 0.0), v.g, vec2(c) + 0.5);
    vec3 d = tubeLinear(x);
    bool clipped = max(d.r, max(d.g, d.b)) >= EDGE_LEVEL;
    float l = log(max(x, 1e-30)) + (clipped ? 1e4 : 0.0);
    if (j == 0) k0[i] = l; else if (j == 1) k1[i] = l; else k2[i] = l;
    if (clipped != inside) other = max(other, x);
  }
  if (other < 0.0) return lin;
  // Sub-sample (i, j) at (i − 1, j − 1) / 3 of a cell from the centre reads the centres a (this cell), b (beside it),
  // c (above or below), d (diagonal): their light bilinear in log, clipped from halfway (in log) between the dimmest
  // clipped and the brightest unclipped of those four (none of the other side: it stays on this cell's). n on the other
  // side.
  float n = 0.0;
  for (int j = 0; j < 3; j++) for (int i = 0; i < 3; i++) {
    vec3 row = j == 0 ? k0 : j == 1 ? k1 : k2;
    vec4 q = vec4(k1[1], k1[i], row[1], row[i]);
    bvec4 hot = greaterThan(q, vec4(5e3));
    q -= vec4(hot) * 1e4;
    float wMin = min(min(hot.x ? q.x : 1e30, hot.y ? q.y : 1e30), min(hot.z ? q.z : 1e30, hot.w ? q.w : 1e30));
    float gMax = max(max(hot.x ? -1e30 : q.x, hot.y ? -1e30 : q.y), max(hot.z ? -1e30 : q.z, hot.w ? -1e30 : q.w));
    if (wMin > 1e29 || gMax < -1e29) continue;
    float ax = i == 1 ? 0.0 : 1.0 / 3.0, ay = j == 1 ? 0.0 : 1.0 / 3.0;
    bool clipped = mix(mix(q.x, q.y, ax), mix(q.z, q.w, ax), ay) >= 0.5 * (wMin + gMax);
    n += clipped != inside ? 1.0 : 0.0;
  }
  return n == 0.0 ? lin : mix(lin, tubeLinear(other), n / 9.0);
}
void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 rel = frag - u_half;
  float view = clamp(u_viewRadius - length(rel) + 0.5, 0.0, 1.0);
  oBright = vec4(0.0);
  if (view <= 0.0) { o = vec4(0.0); return; }
  vec2 mm = u_centerMm + rel * u_pitchMm;
  float cath = clamp((u_cathodeR - length(mm)) / u_pitchMm + 0.5, 0.0, 1.0);
  // At rest u_viewScale is 1 and this is exactly ivec2(frag) + u_margin (frag sits at a half-integer).
  vec2 tex = rel * u_viewScale + u_gridCentre;
  // 1.1.3: this pixel's expected light from the frame in flight (u_fill), or -1.
  float filled = -1.0;
  if (u_warp == 1) {
    // The field stop (view circle, cathode mask) stays; the sky moved under it. A pure move lands on whole texels
    // (centres at half-integers keep floor() exact against float rounding).
    vec2 live = tex;
    vec3 c = vec3((u_warpMm.xy + (tex - u_gridCentre) * u_warpScale.y) / u_warpScale.x, 1.0);
    vec3 r = c + u_warpD * c;
    // 1.3.3: across a new instant the ground stays where it is; a sky pixel whose sky the picture had behind the ground
    // (or outside it) keeps the picture's own pixel until the next one.
    bool turned = u_warpGround == 1;
    if (r.z > 0.0 && !(turned && onGround(u_enuNow * c))) {
      tex = (u_warpScale.x * r.xy / r.z - u_warpMm.zw) / u_warpScale.y + 0.5;
      vec2 d = tex - u_gridCentre;
      float l = length(d), R = u_warpHalf.x;
      bool outside = u_warpBox == 1 ? any(greaterThan(abs(d), u_warpHalf)) : l > R;
      if (turned && (outside || onGround(u_enuThen * r))) { tex = live; outside = false; }
      if (outside) {
        // Sky the picture never saw (the leading edge until the next picture) is drawn from the frame in flight, which
        // began at the view ahead: its rates, as expected light without the grain. 1.1.4 repeated the edge texel and
        // pre.3 mirrored the picture at its circle (pulled in to half the radius past 1.5 radii), both of which drew
        // radial streaks once a fast drag left much of the field uncovered (the user's "optical flow" on fast flicks). Where
        // the frame in flight has nothing either, small gaps keep the mirror and larger ones the picture unmoved.
        if (u_fill == 1) {
          vec3 rf = c + u_fillD * c;
          vec2 tf = (u_warpScale.x * rf.xy / rf.z - u_fillOrigin) / u_warpScale.y + 0.5, df = tf - u_gridCentre;
          if (rf.z > 0.0 && (u_warpBox == 1 ? all(lessThanEqual(abs(df), u_warpHalf)) : length(df) <= R)) {
            ivec2 q = ivec2(floor(tf));
            vec2 rv = texelFetch(u_fillRate, q, 0).rg;
            if (rv.g > 0.5) filled = ((rv.r / rv.g + u_fillMech.x * texelFetch(u_fillStars, q, 0).r) * u_fillMech.y + u_fillMech.z) * u_fillMech.w + u_fillSnow;
          }
        }
        if (filled < 0.0) {
          if (u_warpBox == 1) {
            // The full-screen view mirrors at its picture's edges, each axis on its own, as the round view does at its circle.
            vec2 a = abs(d);
            tex = all(lessThan(a, 1.5 * u_warpHalf)) ? u_gridCentre + sign(d) * mix(a, 2.0 * u_warpHalf - a, step(u_warpHalf, a)) : live;
          } else tex = l < 1.5 * R ? u_gridCentre + d * ((2.0 * R - l) / l) : live;
        }
      }
    }
  }
  ivec2 pixel = ivec2(floor(tex));
  if (u_compose == 1 && filled < 0.0) {
    // D118: only texels where the grid-sized pass reshaped a star are drawn again at these pixels; elsewhere that
    // pass's picture is copied. 0.9.59: Catmull-Rom, not bilinear: the browser's own scaling of a grid-sized canvas is
    // sharper than bilinear, and the bilinear copy softened the Milky Way's fine structure by about 14 % on phones.
    ivec2 g = clamp(pixel - ivec2(u_margin), ivec2(0), textureSize(u_gridBright, 0) - 1);
    if (texelFetch(u_gridBright, g, 0).r < 0.5) {
      o = catmullRom(u_gridDisplay, tex - float(u_margin));
      return;
    }
  }
  vec2 screen;
  if (filled >= 0.0) screen = vec2(filled);
  else if (u_viewScale < 1.0) {
    // D116: a coarser drag grid is drawn bilinearly between texel centres (the grain softens; no new statistics).
    vec2 q = tex - 0.5; ivec2 i0 = ivec2(floor(q)), lim = textureSize(u_intensity, 0) - 1; vec2 f = q - vec2(i0);
    vec2 a = texelFetch(u_intensity, clamp(i0, ivec2(0), lim), 0).rg, b = texelFetch(u_intensity, clamp(i0 + ivec2(1, 0), ivec2(0), lim), 0).rg;
    vec2 c = texelFetch(u_intensity, clamp(i0 + ivec2(0, 1), ivec2(0), lim), 0).rg, d = texelFetch(u_intensity, clamp(i0 + ivec2(1, 1), ivec2(0), lim), 0).rg;
    screen = mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  } else screen = texelFetch(u_intensity, pixel, 0).rg;
  float intensity = max(screen.r, 0.0);
  if (u_eyeMode == 2 && u_eyeContrast.x > 0.0 && filled >= 0.0) {
    // Expected light has no finer detail than its coarse band.
    float adapting = max(u_eyeContrast.y, 1e-12);
    intensity = max(0.0, adapting + contrastBand(intensity - adapting, adapting, u_eyeContrast.x));
  } else if (u_eyeMode == 2 && u_eyeContrast.x > 0.0) {
    float medium = texelFetch(u_medium, pixel, 0).r, coarse = texelFetch(u_coarse, pixel, 0).r;
    float adapting = max(u_eyeContrast.y, 1e-12), base = max(screen.g, adapting * 0.1), threshold = u_eyeContrast.x;
    // Naked eye: an increment is judged against its surroundings (a star is far above the sky around it).
    float baseMedium = u_eyeLocal == 1 ? max(coarse, adapting * 0.1) : base, baseFine = u_eyeLocal == 1 ? max(medium, adapting * 0.1) : base;
    intensity = max(0.0, adapting + contrastBand(coarse - adapting, adapting, threshold)
      + contrastBand(medium - coarse, baseMedium, threshold * 1.3)
      + contrastBand(screen.r - medium, baseFine, threshold * 2.0));
  }
  if (u_starShape.x < 1.0 && filled < 0.0) {
    vec4 star = texelFetch(u_starMap, pixel, 0);
    // Positions in texel-index units (texel centres at integers): this pixel's own, sub-texel on a finer canvas (D118).
    if (star.a > 0.0) intensity = reshapeStar(tex - 0.5, vec2(pixel) + star.xy, intensity, mm);
  }
  if (u_eyeVision == 1) {
    // D181: the luminance at the eye; its part below the threshold is seen blurred (rod pooling), the excess sharp.
    float L = eyeVisionLum(intensity);
    if (u_eyeVisionBlur.x > 0.5 && filled < 0.0) {
      // The blur averaged in the dark beyond the field stop: divide by the share of the cathode it covered.
      float edge = 0.5 + 0.5 * erfApprox((u_cathodeR - length(mm)) / (u_eyeVisionBlur.w * 1.4142136));
      vec2 clip = u_eyeVisionBlur.yz;
      L = eyeVisionLum(texelFetch(u_medium, pixel, 0).r / max(edge, 0.05)) + L - eyeVisionLum(visionBelow(intensity, clip));
    }
    /*@slot:display-vision-hdr*/
    float y = clamp(eyeVisionY(L), 0.0, 1.0);
    if (u_eyeTube == 1) {
      float lin = pow(y, u_gammaInv);
/*@slot:display-vision-colour*/
      o = vec4(vec3(clamp(encodeSrgb(lin) + ditherCode(), 0.0, 1.0)) * cath * view, view); oBright = vec4(starReshaped);
      return;
    }
    // D183: the tube's screen through the same model: its phosphor's colour at the response's luminance, brought into
    // the display's gamut towards grey as the classic path does. No dither: the tube's own grain breaks up bands, and a
    // dither fixed in the screen's pixels would differ between a staged picture moved by the warp and its redraw.
    vec3 rgb = XYZ_TO_SRGB * (u_xyz * (y / max(u_xyz.y, 1e-30)));
    float t = 1.0;
    t = limitT(t, rgb.r, y); t = limitT(t, rgb.g, y); t = limitT(t, rgb.b, y);
    vec3 lin = pow(clamp(y + t * (rgb - y), 0.0, 1.0), vec3(u_gammaInv));
    o = vec4(vec3(encodeSrgb(lin.r), encodeSrgb(lin.g), encodeSrgb(lin.b)) * cath * view, view); oBright = vec4(starReshaped);
    return;
  }
  if (u_eyeTube == 1) {
    vec4 sky = lutAt(1, atan(length(mm) / u_focalMm));
    // D84: every sky component is background. D83's moving natural-sky reference boosted detail with airglow.
    // Isolate the source, apply bounded sensitivity that decreases with TOTAL sky, then the fixed response.
    float total = max(0.0, sky.x + u_eyeTubeMechanism.y) * u_eyeTubeMechanism.x;
    // Preserve dark blurred edges: the analytic background cannot exceed what the pixel actually received.
    float background = min(intensity, total), perIntensity = max(u_xyz.y * u_scale, 1e-30);
    float reference = u_eyeReferenceY / perIntensity;
    // D114: times the sky-linked gain, which keeps rising where this bounded sqrt flattens (darker than the default sky).
    float sensitivity = eyeSourceSensitivity(total, perIntensity);
    float source = (intensity - background) * sensitivity;
    vec3 increment = max(vec3(0.0), eyeTubeTone(reference + source, u_eyeSourceShoulder) - eyeTubeTone(reference, u_eyeSourceShoulder));
    vec3 lin = clamp(eyeTubeTone(background, u_shoulder) + increment, 0.0, 1.0);
    vec3 srgb = clamp(vec3(encodeSrgb(lin.r), encodeSrgb(lin.g), encodeSrgb(lin.b)) + ditherCode(), 0.0, 1.0);
    o = vec4(srgb * cath * view, view); oBright = vec4(starReshaped);
    return;
  }
  // The meteors' maps at the cell's centre the intensity was read at (a coarser drag grid reads between centres).
  bool hl = u_hlLocal.x > 0.0 && filled < 0.0;
  if (hl) intensity = hlIntensity(intensity, screen.g, u_viewScale < 1.0 ? tex : vec2(pixel) + 0.5);
  vec3 lin = tubeLinear(intensity);
  // 1.4 bright edges supersampled, on the resting grid without the star reshaping (a staged picture's warp lands on
  // whole cells: the cell's own result moves with it).
  if (hl && u_hlEdges == 1 && u_viewScale == 1.0 && u_starShape.x >= 1.0 && u_eyeMode != 2) lin = edgeSupersampled(pixel, intensity, lin);
  lin = pow(lin, vec3(u_gammaInv));
  vec3 srgb = vec3(encodeSrgb(lin.r), encodeSrgb(lin.g), encodeSrgb(lin.b));
  o = vec4(srgb * cath * view, view); oBright = vec4(starReshaped);
}
`,Er=et(Lu);Er.replace("float meteorHighlight(",`float highlightSky(vec4 blurred, vec2 p) {
  vec2 cloud = texture(u_hlHalo, p * u_hlUv.xy).ba;
  if (cloud.y > 0.0) return max(cloud.x / cloud.y * u_hlGlow.w, 1e-6);
  return max(blurred.z * u_hlLocal.y, 1e-6);
}
float meteorHighlight(`).replace("S = max(m.z * u_hlLocal.y, 1e-6);","S = highlightSky(m, p);").replace("1e-5 * max(m.z * u_hlLocal.y, 1e-6)) return lin;","1e-5 * highlightSky(m, vec2(pixel) + 0.5)) return lin;");Er.replace("float whiteExcess(float b, vec2 mm)",`
uniform sampler2D u_eyeCloudRate; // rateEff.a is diffuse sky before the cathode mask
uniform ivec2 u_eyeCloudShift;
float eyeCloudSky(vec2 mm, ivec2 cell) {
  // With a frame in flight the cloud map belongs to its projected view.
  if (u_fill == 1) {
    vec3 c = vec3(mm / u_warpScale.x, 1.0);
    vec3 f = c + u_fillD * c;
    if (f.z > 0.0) cell = ivec2(floor((u_warpScale.x * f.xy / f.z - u_fillOrigin) / u_warpScale.y + 0.5));
  }
  ivec2 p = cell + u_eyeCloudShift;
  if (all(greaterThanEqual(p, ivec2(0))) && all(lessThan(p, textureSize(u_eyeCloudRate, 0)))) return texelFetch(u_eyeCloudRate, p, 0).a;
  return lutAt(1, atan(length(mm) / u_focalMm)).x;
}
float whiteExcess(float b, vec2 mm, ivec2 cell)`).replace("lutAt(1, atan(length(mm) / u_focalMm)).x + u_eyeTubeMechanism.y","eyeCloudSky(mm, cell) + u_eyeTubeMechanism.y").replace("whiteExcess(b, mm)","whiteExcess(b, mm, starTexel(p))").replace("vec4 sky = lutAt(1, atan(length(mm) / u_focalMm));","float sky = eyeCloudSky(mm, pixel);").replace("sky.x + u_eyeTubeMechanism.y","sky + u_eyeTubeMechanism.y");Je("STAR_SKY")+Oe+cs;const Cu=[{id:"n2-nir",name:"N2 first positive + N2+ Meinel",reference:"OI 557.7",tauS:0,heightsKm:[100,110,125],features:[{fromNm:1042.8,toNm:1050.8,r:335,id:"N2_1PG (0,0)"},{fromNm:883.3,toNm:891.3,r:849,id:"N2_1PG (1,0)"},{fromNm:767.3,toNm:775.3,r:654,id:"N2_1PG (2,0)",rTable:440},{fromNm:860.2,toNm:868.2,r:618,id:"N2_1PG (2,1)"},{fromNm:980.9,toNm:988.9,r:120,id:"N2_1PG (2,2)"},{fromNm:679.5,toNm:687.5,r:99,id:"N2_1PG (3,0)",rTable:102},{fromNm:754.7,toNm:762.7,r:548.9,id:"N2_1PG (3,1)",rTable:565},{fromNm:846.3,toNm:854.3,r:199,id:"N2_1PG (3,2)"},{fromNm:960,toNm:968,r:244,id:"N2_1PG (3,3)"},{fromNm:610.7,toNm:618.7,r:19.3,id:"N2_1PG (4,0)",rTable:17},{fromNm:670.9,toNm:678.9,r:222.3,id:"N2_1PG (4,1)",rTable:229},{fromNm:742.4,toNm:750.4,r:476.5,id:"N2_1PG (4,2)",rTable:498},{fromNm:829,toNm:837,r:9,id:"N2_1PG (4,3)"},{fromNm:935.6,toNm:943.6,r:149,id:"N2_1PG (4,4)"},{fromNm:1067.6,toNm:1075.6,r:43,id:"N2_1PG (4,5)"},{fromNm:604.7,toNm:612.7,r:35.3,id:"N2_1PG (5,1)",rTable:31},{fromNm:662.5,toNm:670.5,r:223.2,id:"N2_1PG (5,2)",rTable:230},{fromNm:730.7,toNm:738.7,r:260.3,id:"N2_1PG (5,3)",rTable:272},{fromNm:599,toNm:607,r:40.9,id:"N2_1PG (6,2)",rTable:36},{fromNm:654.4,toNm:662.4,r:187.3,id:"N2_1PG (6,3)",rTable:193},{fromNm:719.4,toNm:727.4,r:148.3,id:"N2_1PG (6,4)",rTable:155},{fromNm:796.6,toNm:804.6,r:52.5,id:"N2_1PG (6,5)",rTable:40},{fromNm:593.4,toNm:601.4,r:46.6,id:"N2_1PG (7,3)",rTable:41},{fromNm:646.5,toNm:654.5,r:138.8,id:"N2_1PG (7,4)",rTable:143},{fromNm:707.3,toNm:715.3,r:41.1,id:"N2_1PG (7,5)",rTable:43},{fromNm:781.7,toNm:789.7,r:85,id:"N2_1PG (7,6)",rTable:49},{fromNm:587.9,toNm:595.9,r:39.8,id:"N2_1PG (8,4)",rTable:35},{fromNm:638.9,toNm:646.9,r:85.8,id:"N2_1PG (8,5)",rTable:88},{fromNm:582.6,toNm:590.6,r:31.8,id:"N2_1PG (9,5)",rTable:28},{fromNm:631.5,toNm:639.5,r:50,id:"N2_1PG (9,6)"},{fromNm:577.5,toNm:585.5,r:18.6,id:"N2_1PG (10,6)",rTable:17},{fromNm:623.7,toNm:631.7,r:15,id:"N2_1PG (10,7)",rTable:14},{fromNm:572.4,toNm:580.4,r:14.1,id:"N2_1PG (11,7)",rTable:14},{fromNm:567.5,toNm:575.5,r:15,id:"N2_1PG (12,8)"},{fromNm:560.4,toNm:568.4,r:5,id:"N2_1PG (13,9)"},{fromNm:914.6,toNm:929.3,r:971,id:"N2+ Meinel (1,0)"},{fromNm:782.9,toNm:795.5,r:1321.3,id:"N2+ Meinel (2,0)",rTable:762},{fromNm:943.1,toNm:958.2,r:428,id:"N2+ Meinel (2,1)"},{fromNm:685.4,toNm:697.1,r:115.5,id:"N2+ Meinel (3,0)",rTable:119},{fromNm:805.5,toNm:818.7,r:285,id:"N2+ Meinel (3,1)"},{fromNm:973.3,toNm:989,r:46,id:"N2+ Meinel (3,2)"},{fromNm:610.7,toNm:621.7,r:29.6,id:"N2+ Meinel (4,0)",rTable:26},{fromNm:704.3,toNm:716.3,r:98.6,id:"N2+ Meinel (4,1)",rTable:103},{fromNm:829.6,toNm:843,r:111,id:"N2+ Meinel (4,2)"},{fromNm:626.9,toNm:638,r:32.4,id:"N2+ Meinel (5,1)",rTable:32},{fromNm:724.1,toNm:736.3,r:63.2,id:"N2+ Meinel (5,2)",rTable:66}],note:"prompt; near infrared; 800 nm and beyond rests on the 1974 table as reproduced in the 1985 handbook, without a measured check; below 800 nm scaled to the TREx frame (trexShape)"},{id:"n2-blue",name:"N2+ first negative + N2 second positive",reference:"OI 557.7",tauS:0,heightsKm:[100,110,125],features:[{fromNm:387.9,toNm:391.4,r:980,id:"N2plus_1NG (0,0)"},{fromNm:424.3,toNm:427.8,r:323,id:"N2plus_1NG (0,1)"},{fromNm:467.4,toNm:470.9,r:88,id:"N2plus_1NG (0,2)"},{fromNm:519.3,toNm:522.8,r:14,id:"N2plus_1NG (0,3)"},{fromNm:583,toNm:586.5,r:2,id:"N2plus_1NG (0,4)"},{fromNm:662.7,toNm:666.2,r:1,id:"N2plus_1NG (0,5)"},{fromNm:354.8,toNm:358.3,r:51,id:"N2plus_1NG (1,0)"},{fromNm:385,toNm:388.5,r:42,id:"N2plus_1NG (1,1)"},{fromNm:420.2,toNm:423.7,r:47,id:"N2plus_1NG (1,2)"},{fromNm:461.7,toNm:465.2,r:20,id:"N2plus_1NG (1,3)"},{fromNm:511.4,toNm:514.9,r:5,id:"N2plus_1NG (1,4)"},{fromNm:571.8,toNm:575.3,r:2,id:"N2plus_1NG (1,5)"},{fromNm:352.9,toNm:356.4,r:11,id:"N2plus_1NG (2,1)"},{fromNm:382.3,toNm:385.8,r:1,id:"N2plus_1NG (2,2)"},{fromNm:416.5,toNm:420,r:5,id:"N2plus_1NG (2,3)"},{fromNm:456.5,toNm:460,r:3,id:"N2plus_1NG (2,4)"},{fromNm:504.2,toNm:507.7,r:2,id:"N2plus_1NG (2,5)"},{fromNm:452.1,toNm:455.6,r:2,id:"N2plus_1NG (3,5)"},{fromNm:448.2,toNm:451.7,r:1,id:"N2plus_1NG (4,6)"},{fromNm:376.5,toNm:380.5,r:56,id:"N2_2PG (0,2)"},{fromNm:401.9,toNm:405.9,r:19,id:"N2_2PG (0,3)"},{fromNm:430.4,toNm:434.4,r:5,id:"N2_2PG (0,4)"},{fromNm:462.6,toNm:466.6,r:1,id:"N2_2PG (0,5)"},{fromNm:371.5,toNm:375.5,r:62,id:"N2_2PG (1,3)"},{fromNm:395.8,toNm:399.8,r:26,id:"N2_2PG (1,4)"},{fromNm:422.8,toNm:426.8,r:11,id:"N2_2PG (1,5)"},{fromNm:453.3,toNm:457.3,r:3,id:"N2_2PG (1,6)"},{fromNm:487.8,toNm:491.8,r:1,id:"N2_2PG (1,7)"},{fromNm:367,toNm:371,r:18,id:"N2_2PG (2,4)"},{fromNm:390.2,toNm:394.2,r:12,id:"N2_2PG (2,5)"},{fromNm:416,toNm:420,r:4,id:"N2_2PG (2,6)"},{fromNm:444.9,toNm:448.9,r:3,id:"N2_2PG (2,7)"},{fromNm:410,toNm:414,r:3,id:"N2_2PG (3,7)"}],note:"prompt; blue-violet"},{id:"green",name:"O I 557.7",reference:"OI 557.7",tauS:.8,heightsKm:[100,110,125],features:[{nm:557.7,r:1e3,id:"O I 557.7"}],note:"the reference line; quenched below about 100 km (not modelled here)"},{id:"red",name:"O I 630.0 / 636.4",reference:"OI 630.0",tauS:110,heightsKm:[220,300,400],features:[{nm:630,r:1e3,id:"O I 630.0"},{nm:636.4,r:333.3,id:"O I 636.4"}],perKR5577:{arc:.1,range:[.02,.2]},note:"per 1 kR of 630.0; in an ordinary arc 630.0 is `perKR5577.arc` of the green line (survey: 0.02–0.2), in soft high aurora it exceeds it"},{id:"nir-atomic",name:"O I 777.4, O I 844.6, O2 (0,1) 864.5",reference:"OI 557.7",tauS:0,heightsKm:[100,110,125],features:[{nm:777.4,r:96,id:"O I 777.4"},{nm:844.6,r:115,id:"O I 844.6"},{fromNm:860,toNm:869,r:245,id:"O2 atmospheric (0,1)",range:[64,489]}],note:"treated as prompt (the plan); the O2 band is in fact slow (about 12 s) and its value is derived, range 64–489"}],Pu={labels:["weak","medium","strong","great storm"],auroralZoneGreenKR:[1,10,100,100]},Uu={"low-latitude-red":{rise:{knots:[[0,3.93],[60,4.41],[120,5.03],[180,5.82],[210,6.37],[270,7.86],[330,10.1],[390,13.77],[450,20.28],[480,27.3],[510,36.6],[540,48],[560,57],[580,68],[600,81]]}}},Ou=6371;var Du={components:Cu,levels:Pu,scenes:Uu,earthRadiusKm:Ou};const Tt=Du,zu=Tt,He=Tt.components.map(t=>t.id),Iu=t=>Tt.components.find(e=>e.id===t),Bu=Tt.levels.labels.length;function Gu(t,e){const o=Math.min(Bu-1,Math.max(0,Math.round(e)));{const s=Tt.levels.auroralZoneGreenKR[o];return{"n2-nir":s,"n2-blue":s,green:s,red:s*(Iu("red").perKR5577?.arc??.1),"nir-atomic":s}}}const $u=Tt.scenes["low-latitude-red"].rise;(()=>{const t=$u.knots,e=t.length,o=t.slice(1).map((s,a)=>(s[1]-t[a][1])/(s[0]-t[a][0]));return t.map((s,a)=>{if(a===0||a===e-1||o[a-1]*o[a]<=0)return 0;const n=t[a][0]-t[a-1][0],r=t[a+1][0]-t[a][0],i=2*r+n,l=r+2*n;return(i+l)/(i/o[a-1]+l/o[a])})})();const Rr=Math.PI/180,Ka=zu.earthRadiusKm,Wu=110,Hu=[107,240,300],Ku=[8,60,80],qu=[25,80,150];function Xu(t){const e=Math.abs(t),o=1/(1+.3275911*e),s=o*(.254829592+o*(-.284496736+o*(1.421413741+o*(-1.453152027+o*1.061405429))))*Math.exp(-e*e);return t>=0?s:2-s}function Yu(t,e){const o=Hu[t],s=Ku[t],a=qu[t],n=s*Math.sqrt(Math.PI/2),r=n+a,i=e*r;if(i>=n)return o-a*Math.log(1-(i-n)/a);let l=0,c=12;for(let u=0;u<80;u++){const h=(l+c)/2;Xu(h/Math.SQRT2)*n>i?l=h:c=h}return o-s*(l+c)/2}const Sr=t=>{const e=new Float64Array(9),o=new Float64Array(9),s=[];for(let a=0;a<3;a++){const n=t[a];s.push(n.length),n.forEach((r,i)=>{e[a*3+i]=Yu(a,r),o[a*3+i]=1/n.length})}return{km:e,w:o,n:s}},us=Sr([[1/6,1/2,5/6],[1/6,1/2,5/6],[1/6,1/2,5/6]]),hs=Sr([[1/4,3/4],[1/2],[1/2]]),sn=us.km,Vu=us.w,nn=hs.km,Zu=hs.w,rn=us.n,ln=hs.n,Tr=120,ju=.22,Qu=.56,cn=140,Ju=1.5,eh=18,th=.15,oh=5,ah=2.4,sh=.55,nh=.9,ih=2,rh=1.4,Ke=12,lh=2,ch=1,uh=.75,Fr=.5,Nr=2.5,hh=.15,fh=2.4,dh=1.8,mh=1.4,ph=.9,_h=3,xh=1-Fr-1/(2*Nr),vh=[.8,.6,.35,.25],gh=[.6,.9,1.1,1.2],Ah=[2,2.5,4,4],yh=[.1,.15,.2,.2],bh=Float64Array.from([0,.5,1,0,.5,1,0,.5,1]),wh=Float64Array.from([.15,.85,0,.5,0,0,.5,0,0]),la=.4,Mh=10,Eh=20,un=78,hn=60,Rh=125,Sh=95,Th=[la,.7,la,la],Fh=[64,165,196,248],Nh=[[0,150,300,450],[-400,-250,300,450],[-500,-300,400,600],[-700,-450,600,800]],fn=4,kr=.2,Lr=4095,kh=[1,1,3,3],Lh=[[0,0],[.5,.9],[1,1.5],[1.3,1.9]],Ch=[1,.9411,.6457,.4731];Math.max(...Ch.map((t,e)=>t*(1+kh[e]*Lh[e][1])))-1;const Ph=.25,Uh=.25,Oh=25,dn=[6,22],Dh=Float64Array.from([3,6,14,12,22,40,12,22,40]),zh=Float64Array.from([4,10,0,22,0,0,22,0,0]),Ih=1.5,Bh=8.5,Gh=3,$h=[1300,620,310],Wh=[2*Math.PI/2600,2*Math.PI/1400,2*Math.PI/700],mn=[-Math.PI/8,-Math.PI/24,Math.PI/24,Math.PI/8],Hh=.8,Kh=.4,pn=[-Math.PI/5,-Math.PI/15,Math.PI/15,Math.PI/5],Cr=4,qh=[2.6,4.2,7.3,13],Xh=[.3,.4,.45,.35],Yh=Xh.map(t=>hh*t),Vh=.25,fs=Vh*Rr,Zh=8,jh=12,Qh=2.4,Jh=.3,ef=1,Pr=70,tf=[[250,120,-400,-600],[-60,-150,-500,-700],[-60,-150,-500,-700],[-60,-150,-550,-750]],of=[4,.1,.02,.01],ca=95,af=[4,.1,.025,.013],sf=.4,nf=.12,_n=Pr*1.2,xn=62,ds=3,vn=8,ua=3e3,uo=[600,800],gn=.25,rf=[30,120,230,370,540,760],Ur=rf.length,lf=Ur/2,An=-.155,ha=[.35,.415],cf=[.85,1,1.1,1.3],Or=105,yn=25,Lo=700,bn=Math.sqrt(Lo*(2*Ka+Lo)),uf=95,hf=140,ff=.18,wn=.045,df=.22,Mn=.18,mf=11,pf=[42,.92,.075,.7],At=[.75,.18,.58,.42,.68,.065],_f=[585,330,4.2,.88,2.6],xf=[155,50,.16],vf=[1200,700,.18,.75],gf=[560,700,980,1040],fa=[89,.158,10],En=[3,7],Rn=[.36,.24],Af=.43,da=[4,30],Sn=[825,.05],yf=[805,105,14],bf=.93,wf=.32,Tn=[29,56],Fn=[4.4,3],Nn=[.51,1.15],Mf=445,Ef=320,Rf=.06,Sf=Rf*Rr,Tf=[128,48,16,8,3],Ot=24576,Ff=[1.24,.86,.43,.58,.95],Nf=8.8,kn=[.34,.22],kf=.57,Lf=.42,Cf=.82,Pf=.52,ma=[.65,2.5,.88],Uf=.42,Ln=1.48,Of=.18,Df=[2,-1,3,-2,1,-3],zf=[3,2,4,-3,2,-4],If=.6,Bf=.15,Gf=.1,$f=.4,dt=[2.3,3.1,4.3],Dr=.75,Cn=.3,Wf=.5,Ve=[.12,.45,.35,.4,.4,.2],Hf=400,Pn=.25,Kf=80,qf=30,Xf=60,Yf=.85,Vf=[.4,.7,1,1],Un=1.5,On=80,ho=.25,fo=[20,25,60,110],Zf=.6,jf=30,Dn=.6,mo=[.12,1.55,1.85],zn=360,zr=90,Qf=60,Jf=160,Ir=.12,Br=.12,ed=.6,td=Or+zr*((1-Ir)*Math.max(...dt)+Br),od={foldLambdaKm:$h,rayLambdaKm:qh};function ad(t){return t==="red"?2:t==="green"?1:0}const In=10,sd=1.5,nd=.5,id=.7,rd=2.5;function Bn(t){let e=t>>>0;return e=(e^e>>>16)>>>0,e=Math.imul(e,2146121005)>>>0,e=(e^e>>>15)>>>0,e=Math.imul(e,2221713035)>>>0,e=(e^e>>>16)>>>0,e}const ld=t=>{const e=Math.min(1,Math.max(0,t));return e*e*(3-2*e)},cd=Ju,ud=2,Gr=2,hd=(t,e)=>(Math.imul(t&4095,e)>>>20)/4096;function fd(t,e,o,s,a,n){const r=Math.abs(a),i=e+a*o,l=Math.floor(i),c=i-l,u=c*c*(3-2*c),h=l+a*s,f=n*r*s,m=n*r*o,p=v=>{const A=(t^Math.imul(v&4095,668265261))>>>0,g=m+hd(v,2654435761),w=Math.floor(g),b=g-w,T=b*b*(3-2*b),k=f+w,R=Bn((A^Math.imul(k,374761393))>>>0),F=Bn((A^Math.imul(k+1,374761393))>>>0),S=1/Math.sqrt((1-T)*(1-T)+T*T);return[0,1,2,3].map(M=>{const P=R>>>8*M&255,L=F>>>8*M&255;return Math.min(1,Math.max(0,.5+((P+(L-P)*T)/255-.5)*S))})},d=p(h),_=p(h+1);return[0,1,2,3].map(v=>d[v]+(_[v]-d[v])*u)}const dd=3,md=[4,10,16,22],pa=[.22,.32],_a=[.55,.85],Gn=[.35,.3],pd=.4,xa=[.65,1],Dt=[.5,.8,.85],_d=1.5,xd=2.2,K=Float64Array.from([101,107,125,175]),vd=(t,e)=>{let o=0;for(let s=0;s+1<t.length;s++)o+=(t[s+1]-t[s])*(e[s]+e[s+1])/2;return Float64Array.from(e.map(s=>s/o))},Me=vd(K,[0,1,Math.exp(-18/25),0]),gd=Float64Array.from([0,.5,1]),Ad=125,$r=4,$n=180,Wn=140,Yt=.5,Vt=1.5,Wr=.7,yd=12,va=.35,bd=[va,.55,va,va],wd=18/68,Md=.1,Ed=20,Rd=2,Sd=[.6,1,1.6,1.8],Td=.6,Fd=2,Hr=3,Kr=10,Nd=[2,1.5,1,.7],qa=2.5,qe=Ke,kd=.2,ga=[.15,.4],po=[35,.45,15,110],Aa=[.4,.4,2.2],ya=[.4,1.2,5],Ld=.55;function ms(t){const e=[-39.69683028665376,220.9460984245205,-275.9285104469687,138.357751867269,-30.66479806614716,2.506628277459239],o=[-54.47609879822406,161.5858368580409,-155.6989798598866,66.80131188771972,-13.28068155288572],s=[-.007784894002430293,-.3223964580411365,-2.400758277161838,-2.549732539343734,4.374664141464968,2.938163982698783],a=[.007784695709041462,.3224671290700398,2.445134137142996,3.754408661907416];if(t<.02425){const i=Math.sqrt(-2*Math.log(t));return(((((s[0]*i+s[1])*i+s[2])*i+s[3])*i+s[4])*i+s[5])/((((a[0]*i+a[1])*i+a[2])*i+a[3])*i+1)}if(t>1-.02425)return-ms(1-t);const n=t-.5,r=n*n;return(((((e[0]*r+e[1])*r+e[2])*r+e[3])*r+e[4])*r+e[5])*n/(((((o[0]*r+o[1])*r+o[2])*r+o[3])*r+o[4])*r+1)}const ps=(t,e,o,s,a,n)=>{const r=Float64Array.from({length:16},(l,c)=>a(Math.min(s,Math.max(o,t*Math.exp(e*ms((c+.5)/16))))));let i=0;for(const l of r)i+=l;return r.map(l=>l*n*16/i)},Cd=ps(po[0],po[1],po[2],po[3],t=>Math.exp(-18/t)/Math.exp(-18/25),1),Pd=ps(1,Aa[0],Aa[1],Aa[2],t=>t,1),Ud=ps(qa,ya[0],ya[1],ya[2],t=>t,qa),Od=t=>{const e=ga[0],o=ga[1]-ga[0],s=e+o/2;return[e,o,t<1?(1-t*s)/(1-t):1]},Xa=Math.round(256*kd),ba=Od(Xa/256),Dd=.08,zd=[.5,.75,1,1.25],Rt=[.5,1.2],Id=.3,Bd=.4,Ya=zd.map(t=>Math.min(128,Math.round(256*Dd*t))),Gd=Ya.map(t=>t/256*.5*(Rt[0]+Rt[1])),$d=4096*(Ke/qe),Hn=4,Wd=2,Hd=.55,Kd=.82,qd=.86,Kn=[.4,1.2],qn=[.31,.45],Xn=[.014,.036],Xd=.45,Yd=.35,wt=89,Vd=4,Yn=[-8,12],Zd=7,jd=2,wa=.1,Qd=.9,Jd=12,em=.2,tm=25,om=4,am=.6,qr=[0,.1,.25,.35],Xr=.9,Yr=(t,e,o)=>Float64Array.from({length:16},(s,a)=>Math.min(o,Math.max(e,t*ms((a+.5)/16)))),sm=Yr(Vd,Yn[0],Yn[1]),nm=[6,5.6,5.6,5.7],im=.6,Vn=[1.5,25],rm=.8,lm=.8,Vr=nm.map(t=>Yr(im,Math.log(Vn[0]/t),Math.log(Vn[1]/t)).map(e=>t*Math.exp(e))),cm=[1.17,1.25,1.23,1.17],um=Vr.map((t,e)=>Math.min(1,(Hr+Kr/2)/(t.reduce((o,s)=>o+s,0)/16)/cm[e])),Ma=[.06,.3],hm=.65,fm=15,dm=2.5,mm=.6,pm=Float64Array.from({length:16},(t,e)=>Ma[0]*(Ma[1]/Ma[0])**((e+.5)/16)),_m=Math.round(256*hm),xm=6,vm=10,gm=qr.map(t=>{if(!(t>0))return 2;const e=[];for(let a=0;a<4096;a++)e.push(fd((Math.imul(a,2654435761)^625341585)>>>0,.37+a*.731,.3,17,1,Gr)[2]);let o=0,s=1;for(let a=0;a<40;a++){const n=.5*(o+s);let r=0;for(const i of e)r+=ld((i-n)/Xr+.5);r/e.length>t?o=n:s=n}return .5*(o+s)}),Am=2,ym=1,bm=1,wm=1/110,Mm=.098,Em=42,Rm=qe/.7429,Sm=()=>{const t=K,e=Me,o=t.length;let s=0;const a=2e3;for(let n=0;n<a;n++){const r=(n+.5)/a,i=Yt+Vt*r*r,l=Array.from(e);l[o-2]=l[o-2]*(1+Wr*r*r);for(let c=0;c+1<o;c++)s+=(t[c+1]-t[c])*(c+2===o?i:1)*.5*(l[c]+l[c+1])/a}return 1/s},_s=Sm(),Zn=[-4,Yt+Vt+1],Tm=1.5,Fm=10,jn=4,Qn=2,Nm=40,km=.15;if(Me[0]!==0||Me[Me.length-1]!==0||K.length!==4)throw new Error("aurora-morph: the curtain profile has 4 nodes, no density at its ends (zoneCurtainE)");const Lm=(Math.PI/qe)**2,zt={size:256},Ea=["veil","north-america","butterfly","crescent"];E("M42 猎户星云"),E("北天 NSNS"),E("马头与火焰星云"),E("马头"),E("北天 NSNS"),E("M27 哑铃星云"),E("北天 NSNS"),E("NGC 2237 玫瑰星云"),E("玫瑰"),E("北天 NSNS"),E("M31 仙女座星系"),E("北天 NSNS 连续谱"),E("M8 礁湖星云"),E("南天 SHASSA + VPHAS+"),E("M16 鹰状星云"),E("NSNS + VPHAS+ 核心"),E("NGC 7293 上帝之眼"),E("上帝之眼"),E("南天 SHASSA + DSS2"),E("NGC 3372 船底座大星云"),E("船底座"),E("南天 SHASSA + VPHAS+"),E("心脏／灵魂星云"),E("心脏／灵魂"),E("NSNS · Gaia G<16（外圈 G<14.5 按需）"),E("英仙座双星团"),E("双星团"),E("NGC 869 / 884 · Gaia G<17"),E("NGC 7000 北美洲星云"),E("北美洲星云"),E("NSNS 三线 · 可拖到面纱、新月、蝴蝶"),E("北美／鹈鹕、面纱、蝴蝶 IC 1318、新月四块 Hα／OIII／SII 精细层：先载入望远镜附近的一块，拖向别处时再补载，到达前那里先显示较粗的公共细节层。局部星表补到 Gaia G<16；区域之外拖出时补到 G<14.5。"),E("NGC 6888 新月星云"),E("新月"),E("NSNS 三线精细层"),E("北美／鹈鹕、面纱、蝴蝶 IC 1318、新月四块 Hα／OIII／SII 精细层：先载入望远镜附近的一块，拖向别处时再补载，到达前那里先显示较粗的公共细节层。局部星表补到 Gaia G<16；区域之外拖出时补到 G<14.5。"),E("面纱星云 · 天鹅座环"),E("面纱"),E("NSNS 三线精细层"),E("北美／鹈鹕、面纱、蝴蝶 IC 1318、新月四块 Hα／OIII／SII 精细层：先载入望远镜附近的一块，拖向别处时再补载，到达前那里先显示较粗的公共细节层。局部星表补到 Gaia G<16；区域之外拖出时补到 G<14.5。"),E("象鼻星云 IC 1396"),E("象鼻"),E("NSNS 三线 · Gaia G<16（外圈 G<14.5 按需）"),E("加州星云 NGC 1499"),E("加州"),E("NSNS 三线 · Gaia G<16（外圈 G<14.5 按需）"),E("飞蝠星云 Sh2-129 · 乌贼 Ou4"),E("飞蝠／乌贼"),E("NSNS 三线 · Gaia G<16（外圈 G<14.5 按需）"),E("西门子 147 · Sh2-240"),E("西门子 147"),E("NSNS 三线 · Gaia G<16（外圈 G<14.5 按需）"),E("火焰星 IC 405 · 蝌蚪 IC 410"),E("火焰星／蝌蚪"),E("NSNS 三线 · Gaia G<16（外圈 G<14.5 按需）"),E("气泡星云 NGC 7635 · M52"),E("气泡"),E("NSNS 三线 · Gaia G<16"),E("洞穴星云 Sh2-155"),E("洞穴"),E("NSNS 三线 · Gaia G<16"),E("水母星云 IC 443"),E("水母"),E("NSNS 三线 · Gaia G<16"),E("圣诞树／锥状星云 NGC 2264"),E("圣诞树"),E("NSNS 三线 · Gaia G<16"),E("吃豆人星云 NGC 281"),E("吃豆人"),E("NSNS 三线 · Gaia G<16"),E("半人马 ω 球状星团"),E("半人马 ω"),E("Gaia G<{0} · 核心光按模型",[18]),E("杜鹃座 47 球状星团"),E("杜鹃 47"),E("Gaia G<{0} · 核心光按模型",[18]),E("M22 人马座球状星团"),E("Gaia G<{0} · 核心光按模型",[16.5]),E("M13 武仙座球状星团"),E("Gaia G<{0} · 核心光按模型",[18]),E("M4 天蝎座球状星团"),E("Gaia G<{0} · 核心光按模型",[18]),E("M5 巨蛇座球状星团"),E("Gaia G<{0} · 核心光按模型",[18]),E("NGC 6752 孔雀座球状星团"),E("Gaia G<{0} · 核心光按模型",[18]),E("NGC 6397 天坛座球状星团"),E("Gaia G<{0} · 核心光按模型",[18]),E("M33 三角座星系"),E("NSNS · Pan-STARRS g · Gaia G<{0}",[19]),E("M51 涡状星系"),E("NSNS · Pan-STARRS g · Gaia G<{0}",[19]),E("M81 波德星系 · M82 雪茄星系"),E("M81／M82"),E("NSNS · Pan-STARRS g · Gaia G<{0}",[19]),E("M101 风车星系"),E("NSNS · Pan-STARRS g · Gaia G<{0}",[19]),E("狮子座三重奏 M65 · M66 · NGC 3628"),E("狮子座三重奏"),E("NSNS · Pan-STARRS g · Gaia G<{0}",[19]),E("海鸥星云 IC 2177"),E("海鸥星云"),E("NSNS · Gaia G<16（外圈 G<14.5 按需）"),E("M1 蟹状星云"),E("蟹状星云"),E("NSNS 三线 + PS1 形态 · Gaia G<17"),E("M45 昴星团"),E("昴星团"),E("NSNS · Pan-STARRS g · Gaia G<{0}",[17]),E("M104 草帽星系"),E("草帽星系"),E("NSNS 连续谱 + PS1 形态 · Gaia G<19"),E("猎户座 · 巴纳德环"),E("巴纳德环"),E("天鹅座"),E("天鹅座"),E("仙王—仙后"),E("仙王—仙后"),E("英仙—御夫"),E("英仙—御夫"),E("银心"),E("银心"),E("甘姆星云 · 船底座"),E("甘姆"),E("大麦哲伦云"),E("大麦哲伦云");E("普通二代"),E("红拓二代"),E("经典美三"),E("蓝延伸三代"),E("定制版三代");E("双窄"),E("红外通过"),E("无滤镜");class zo extends Map{constructor(e){super(),this.limit=e}limit;get(e){const o=super.get(e);return o!==void 0&&(super.delete(e),super.set(e,o)),o}set(e,o){for(super.delete(e),super.set(e,o);this.size>this.limit;)super.delete(this.keys().next().value);return this}}E("前置（物镜前）"),E("后置（物镜后）"),E("减焦镜前"),E("目镜入光端"),E("目镜与夜视物镜之间"),E("夜视物镜后");Array.from({length:161},(t,e)=>300+5*e);new zo(16);new zo(16);new zo(64);new zo(4);const Zr=1,jr=1;function Jn(t,e,o){if(!t)return 1;const s=Math.floor(o),a=Math.min(s+1,We-1);return t[e*We+s]*(1-(o-s))+t[e*We+a]*(o-s)}const x=t=>{if(!Number.isFinite(t))throw new RangeError(`transient-shaders: ${t} is not a GLSL float`);const e=t.toPrecision(9);return/[.e]/.test(e)?e:`${e}.0`},I=(t,e)=>`const float ${t}[${e.length}] = float[${e.length}](${Array.from(e,x).join(", ")});
`,Bt=2*Math.PI,Io=`
uniform mat3 u_point;                  // camera -> virtual plane axes (the telescope's pointing)
uniform vec3 u_axis, u_west, u_north;  // the virtual plane's TAN frame in ICRS
uniform vec2 u_originMm;               // mm position of texel (0, 0)'s centre
uniform float u_pitchMm;
uniform float u_focalMm;
uniform float u_cathodeR;
// xyz: the cell's ICRS unit direction; w: 1, or 0 outside the cathode or behind the plane (xyz then 0).
vec4 cellDir(ivec2 p) {
  vec2 mm = u_originMm + vec2(p) * u_pitchMm;
  if (length(mm) > u_cathodeR) return vec4(0.0);
  vec3 v = u_point * vec3(mm / u_focalMm, 1.0);
  if (!(v.z > 1e-6)) return vec4(0.0);
  vec2 t = v.xy / v.z;
  return vec4(normalize(u_axis + t.x * u_west + t.y * u_north), 1.0);
}
`,Qr=`
uint hashU(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hashF(uint x) { return float(hashU(x) >> 8) * (1.0 / 16777216.0); }
float atanSeries(float t) {
  float t2 = t * t;
  return t * (1.0 - t2 * (0.333333333 - t2 * (0.2 - t2 * (0.142857143 - t2 * (0.111111111 - t2 * 0.0909090909)))));
}
float atanP(float y, float x) {
  float ax = abs(x), ay = abs(y);
  if (!(ax > 0.0) && !(ay > 0.0)) return x < 0.0 ? 3.14159265 : 0.0;
  bool swap = ay > ax;
  float t = swap ? ax / ay : ay / ax;
  t = t / (1.0 + sqrt(1.0 + t * t));
  t = t / (1.0 + sqrt(1.0 + t * t));
  float a = 4.0 * atanSeries(t);
  if (swap) a = 1.57079633 - a;
  if (x < 0.0) a = 3.14159265 - a;
  return y < 0.0 ? -a : a;
}
float sinSeries(float r) { float r2 = r * r; return r * (1.0 - r2 * (0.166666667 - r2 * (0.00833333333 - r2 * (1.98412698e-4 - r2 * 2.75573192e-6)))); }
float cosSeries(float r) { float r2 = r * r; return 1.0 - r2 * (0.5 - r2 * (0.0416666667 - r2 * (0.00138888889 - r2 * (2.48015873e-5 - r2 * 2.75573192e-7)))); }
float cosR(float x) {
  float k = floor(x * 0.636619772 + 0.5), r = (x - k * 1.5703125) - k * 4.83826795e-4;
  int q = int(k) & 3;
  return q == 0 ? cosSeries(r) : q == 1 ? -sinSeries(r) : q == 2 ? -cosSeries(r) : sinSeries(r);
}
float sinR(float x) {
  float k = floor(x * 0.636619772 + 0.5), r = (x - k * 1.5703125) - k * 4.83826795e-4;
  int q = int(k) & 3;
  return q == 0 ? sinSeries(r) : q == 1 ? cosSeries(r) : q == 2 ? -sinSeries(r) : -cosSeries(r);
}
`,xs=`
uniform sampler2D u_cloud;
uniform int u_cloudMode;
uniform vec4 u_cloudOffset;
uniform vec4 u_cloudTile;
uniform vec4 u_cloudShape;
uniform vec2 u_cloudTau;
float cloudTexel(ivec2 q) { return texelFetch(u_cloud, q, 0).r; }
float cloudNoise(vec2 uv) {
  vec2 x = fract(uv) * ${x(zt.size)} - 0.5;
  vec2 x0 = floor(x), f = x - x0;
  ivec2 a = (ivec2(x0) + ${zt.size}) & ${zt.size-1}, b = (ivec2(x0) + ${zt.size+1}) & ${zt.size-1};
  return mix(mix(cloudTexel(ivec2(a.x, a.y)), cloudTexel(ivec2(b.x, a.y)), f.x), mix(cloudTexel(ivec2(a.x, b.y)), cloudTexel(ivec2(b.x, b.y)), f.x), f.y);
}
float cloudFactor(float n) { return max(0.0, 1.0 + u_cloudShape.x * (n - u_cloudShape.y)); }
float cloudPair(vec2 q) { return u_cloudTile.z * cloudNoise(q * u_cloudTile.x - u_cloudOffset.xy) + u_cloudTile.w * cloudNoise(q * u_cloudTile.y - u_cloudOffset.zw); }
// The slant optical depth tau * factor * air mass along the ICRS direction d; 0 on the ground or without a cloud.
float cloudTauN(vec3 d) {
  if (u_cloudMode == 1) {
    float up = dot(d, u_zenith);
    if (!(up > 0.0)) return 0.0;
    if (up < u_hzEdgeMax) { if (up < hzEdge(d)) return 0.0; }
    float s = max(up, u_cloudShape.w), k = u_cloudShape.z / s;
    vec2 q = vec2(dot(d, u_hzEast), dot(d, u_hzNorth)) * k;
    return u_cloudTau.x * cloudFactor(cloudPair(q)) / s;
  }
  if (u_cloudMode == 2) {
    vec3 w = d * d * d * d, g = degrees(d);
    float sum = w.x + w.y + w.z;
    float n = (w.z * cloudPair(g.xy) + w.x * cloudPair(g.yz) + w.y * cloudPair(g.zx)) / (sum > 0.0 ? sum : 1.0);
    return u_cloudTau.x * cloudFactor(n);
  }
  return 0.0;
}
`,ei=od,ti=t=>{const e=[];for(let o=0;o<ds;o++)for(let s=0;s<vn;s++)e.push(t((o+1)*Bt*s/vn));return e},Cm=t=>I("AU_SHELL_KM",t?nn:sn)+I("AU_SHELL_W",t?Zu:Vu)+`const int AU_NS_E = ${(t?ln:rn)[0]};
const int AU_NS_F = ${(t?ln:rn)[1]};
`+I("AU_FOLD_K",ei.foldLambdaKm.map(e=>Bt/e))+I("AU_WARP_KAPPA",Wh)+I("AU_RAY_K",ei.rayLambdaKm.map(e=>Bt/e))+I("AU_PH_S",ti(Math.sin))+I("AU_PH_C",ti(Math.cos))+`const uint AU_ARC_PRESENT[${fn}] = uint[${fn}](${Fh.map(e=>`${e}u`).join(", ")});
`+I("AU_SHELL_SLAB",t?zh:Dh)+I("AU_SHELL_TOP",t?wh:bh)+I("AU_BUNCH_OFF",vh)+I("AU_RAY_BETA",gh)+I("AU_FINE_FOLD",Ah)+I("AU_FINE_BRIGHT",yh)+`const vec4 AU_RAY_DCV = vec4(${Yh.map(x).join(", ")});
`+I("AU_OVAL",Nh.flat())+I("AU_PBAND",tf.flat())+I("AU_DIFFUSE",of)+I("AU_CK",K)+I("AU_CRAY_BETA",Sd)+I("AU_CRAY_W",Nd)+I("AU_FLAME_LV",Vf)+I("AU_CW",Array.from({length:K.length-1},(e,o)=>(Me[o]+Me[o+1])*(K[o+1]-K[o])))+I("AU_CRN",Array.from(Me,e=>e*_s))+I("AU_CTOPS",gd)+I("AU_ARC_AMP0",Th)+I("AU_CALONG0",bd)+I("AU_INV_RH",Array.from(t?nn:sn,e=>1/(Ka+e)))+[["AU_CPRECAP",Nm],["AU_CUT2",$n*$n],["AU_CFADE2",Wn*Wn],["AU_CROSS2",jn*jn],["AU_CROSS_EPS2",Tm**2],["AU_RAY_DEPTH2",Qn*Qn],["AU_FINE_K2",(Math.PI/Ke)**2],["AU_CTOP_MIN",Yt],["AU_CTOP_SPAN",Vt],["AU_CMID_EPS",km],["AU_CTALL_R",Wr],["AU_NZ_MIX",wd],["AU_ENV_SHARE",Md],["AU_ENV_W0",Ed],["AU_ENV_K",Rd],["AU_RAY_FM",_h],["AU_LR0",Hh],["AU_LRD",Kh/3],["AU_SQRT2PI",Math.sqrt(2*Math.PI)],["AU_NT_P",.3275911*Math.SQRT1_2]].map(([e,o])=>`const float ${e} = ${x(o)};
`).join("")+[["AU_R",Ka],["AU_REF_H",Wu],["AU_PREFILTER",fs],["AU_ARC_CELL",Tr],["AU_ARC_PRECAP",Oh],["AU_MERGE_K",Ih],["AU_MERGE_S",Bh],["AU_N_KM",cn],["AU_MEANDER",eh],["AU_FOLD_PRE",Bt/(2*cn)],["AU_F_KM",Ke],["AU_FINE_PRE",Bt/(2*Ke)],["AU_MORPH_C",lh],["AU_MORPH_F",ch],["AU_GATE_T",Fr],["AU_GATE_G",Nr],["AU_GATE_MEAN",xh],["AU_RAY_TALL",fh],["AU_RAY_SHORT",dh],["AU_RAY_HMAX",mh],["AU_RAY_MAX",ph],["AU_ALONG_FLOOR",th],["AU_ALONG_GAIN",oh],["AU_ALONG_MAX",ah],["AU_THICK0",sh],["AU_THICK_D",nh],["AU_BUNCH_GAIN",ih],["AU_BUNCH_MAX",rh],["AU_ARC_FOLD0",Ph],["AU_ARC_FOLD_STEP",Uh],["AU_SLAB_E",dn[0]],["AU_SLAB_F",dn[1]],["AU_ARC_POS0",ju],["AU_ARC_POS_SPAN",Qu],["AU_ARC_W0",Mh],["AU_ARC_DW",Eh],["AU_CARC_W0",Hr],["AU_CARC_DW",Kr],["AU_ARC_REACH2",un*un],["AU_ARC_FADE2",hn*hn],["AU_PATCH_RN0",Zh],["AU_PATCH_DRN",jh],["AU_PATCH_ASPECT",Qh],["AU_PATCH_DUTY",Jh],["AU_PATCH_SHARE",ef],["AU_PATCH_CELL",Pr],["AU_PATCH_A0",sf],["AU_PATCH_DA",nf/255],["AU_PATCH_REACH2",_n*_n],["AU_PATCH_FADE2",xn*xn],["AU_ARC_TALL",uh],["AU_TWO_OVER_PI",2/Math.PI],["AU_PULSE_GREEN",Wf]].map(([e,o])=>`const float ${e} = ${x(o)};
`).join(""),St=["x","y","z","w"],Pm=()=>{const t=K,e=t.length,o=`vec${e}`,s=l=>St[l],a=2,n=(Ad-t[a])/(t[a+1]-t[a]),r=[];for(let l=0;l<e;l++)r.push(`  vec2 k${l} = shellGL(AU_CK[${l}], up, ch);`);r.push(`  ${o} LL = ${o}(${Array.from(t,(l,c)=>`k${c}.y`).join(", ")}), GG = ${o}(${Array.from(t,(l,c)=>`k${c}.x`).join(", ")});`),r.push(`  ${o} XN = GG * hn + (${o}(${Array.from(t,x).join(", ")}) - AU_REF_H) * u_auCotDip, XE = GG * he;`),r.push("  vec2 kLo = shellGL(AU_CLOW, up, ch);"),r.push("  float LLo = kLo.y, dXo = kLo.x * hn + (AU_CLOW - AU_REF_H) * u_auCotDip - XN.x, dEo = kLo.x * he - XE.x;");for(let l=0;l+1<e;l++)r.push(`  float o${l} = (LL.${s(l+1)} - LL.${s(l)}) / ${x(t[l+1]-t[l])};`);const i=l=>l===0?"o0":l===e-1?`o${e-2}`:`0.5 * (o${l-1} + o${l})`;return r.push(`  ${o} OB = ${o}(${Array.from(t,(l,c)=>i(c)).join(", ")});`),r.push(`  ${o} SN = min(${o}(AU_CPRECAP), LL * ${x(fs*Fd)} * sqrt(1.0 + max(${o}(0.0), hn * hn * (OB * OB - 1.0))));`),r.push(`  ${o} FA = exp(-0.5 * (AU_FOLD_PRE * AU_PREFILTER * LL) * (AU_FOLD_PRE * AU_PREFILTER * LL));`),r.push(`  float slant = ${Array.from({length:e-1},(l,c)=>`(LL.${s(c+1)} - LL.${s(c)}) * ${x(.5*(Me[c]+Me[c+1]))}`).join(" + ")};`),r.push(`  float xr = XN.${s(a)} + (XN.${s(a+1)} - XN.${s(a)}) * ${x(n)}, xer = XE.${s(a)} + (XE.${s(a+1)} - XE.${s(a)}) * ${x(n)};`),r.push(`  ${o} XQN = XN, XQ = XE;`),r.push("  if (u_auFold[4].x != 0.0) swirl4(XQN, XQ);"),r.push(`  ${o} WX1, WY1, WX2, WY2;`),r.push(`  ${o} XW = XQN - auWarp4(XQN, XQ, WX1, WY1, WX2, WY2);`),r.push(`  float xw = XW.${s(a)} + (XW.${s(a+1)} - XW.${s(a)}) * ${x(n)}, snr = SN.${s(a)} + (SN.${s(a+1)} - SN.${s(a)}) * ${x(n)};`),r.join(`
`)},Co=$d-1,Um=()=>{const t=K;if(t.length!==4)throw new Error("transient-shaders: the curtain profile has 4 nodes (vec4)");return`
// ½·erfc(z/√2) (the normal tail beyond z ≥ 0) and e^(−z²/2), both classes (aurora-morph.ts normTail; A&S 7.1.26).
vec4 normTail2(vec2 z) {
  vec2 e = exp(-0.5 * z * z), t = 1.0 / (1.0 + AU_NT_P * z);
  return vec4(0.5 * t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))) * e, e);
}
// One straight piece of the line of sight through a sheet, both E classes (aurora-morph.ts curtainSlab); ta / tb: the
// ends' normTail2(|d|/σ'), computed once per node (shared by the pieces either side).
// Round 15 (aurora-morph.ts curtainSlabAB): the piece's column split by its ends' densities, (A, B) of both classes as
// (A.xy, B.xy): the column = ra·A + rb·B.
vec4 curtainSlabAB(vec2 da, vec2 db, vec4 ta, vec4 tb, float dL, float sp) {
  vec2 D = db - da, mid = step(abs(D), vec2(AU_CMID_EPS * sp)), Ds = mix(D, vec2(1.0), mid);
  vec2 pa = mix(ta.xy, 1.0 - ta.xy, step(0.0, da)), pb = mix(tb.xy, 1.0 - tb.xy, step(0.0, db));
  vec2 dPhi = mix(pb - pa, (2.0 * step(0.0, da + db) - 1.0) * (ta.xy - tb.xy), step(0.0, da * db));
  vec2 k = dL / Ds, Q = (sp * ${x(1/Math.sqrt(2*Math.PI))} * (ta.zw - tb.zw) - da * dPhi) / Ds;
  vec2 dx = D / sp, em = sqrt(ta.zw * tb.zw) * (1.0 + dx * dx * 0.125), km = vec2(dL / (6.0 * AU_SQRT2PI * sp));
  return mix(vec4(max(vec2(0.0), k * (dPhi - Q)), max(vec2(0.0), k * Q)), vec4(km * (ta.zw + 2.0 * em), km * (2.0 * em + tb.zw)), vec4(mid, mid));
}
// Round 15 (aurora-morph.ts rayAttr, rayNode): a ray's attributes (T1, T2, g, s) at x in the rays' frame (the fine
// lattice's offset × ARC_FINE_KM / RAY_ID_KM, sign sf), deviations × att. Node indices mod AU_RAYID_WRAP (|i| < 2^15).
// Round 18 (aurora-morph.ts rayNode, B5): + gt0, g·T₀ of the deep feet (the top of byte 0, by level).
vec4 rayNode(uint x, int lv, out float gt0) {
  float b0 = float(x & 255u);
  float t1 = b0 < ${x(Xa)} ? ${x(ba[0])} + ${x(ba[1]/Math.max(1,Xa))} * (b0 + 0.5) : ${x(ba[2])};
  float g = AU_RG[int((x >> 16u) & 15u)];
  gt0 = b0 >= AU_DEEP_LO[lv] ? g * (${x(Rt[0])} + AU_DEEP_K[lv] * (b0 - AU_DEEP_LO[lv] + 0.5)) : 0.0;
  return vec4(g * t1, g * AU_RT2[int((x >> 8u) & 15u)], g, AU_RS[int((x >> 24u) & 15u)]);
}
vec4 rayAttr(uint h, float x, float f, int wh, int sf, float att, int lv, out float gt0) {
  float p = x * ${x(1/qe)} + float(sf * ${Ke/qe}) * f, fi = floor(p), s = p - fi;
  s = s * s * (3.0 - 2.0 * s);
  int ia = (int(fi) + sf * ${Ke/qe} * wh) & ${Co};
  int ib = (ia + 1) & ${Co};
  float ta, tb;
  vec4 a = rayNode(hashU(h ^ (uint(ia) * 0x2f8a63c1u)), lv, ta), b = rayNode(hashU(h ^ (uint(ib) * 0x2f8a63c1u)), lv, tb);
  const vec4 m = vec4(1.0, 1.0, 1.0, ${x(qa)});
  gt0 = AU_DEEP_M[lv] + (ta + (tb - ta) * s - AU_DEEP_M[lv]) * att;
  return m + (a + (b - a) * s - m) * att;
}
// Log precipitation flux along one field line (aurora-morph.ts zoneRayPrecipitation).
vec2 zoneRayPrecipitation(uint h, float x, float f, int wh, int sf, float coarse, float mid, float att) {
  float wide = ${x(Hd)} * (2.0 * coarse - 1.0) + ${x(Kd)} * att * (2.0 * mid - 1.0);
  float gate = smooth01(${x(Kn[0])} + ${x(Kn[1])} * wide);
  float att2 = att * att;
  float fine = 0.5;
  if (gate * att2 > 0.0) {
    float p = ${x(Hn)} * (x / AU_F_KM + float(sf) * f), fi = floor(p), t = p - fi;
    int i = int(fi) + ${Hn} * sf * wh, eb = AU_FLOW_LF * wh;
    float lf = float(AU_FLOW_LF) * f;
    vec2 a = flowNode(h ^ 0x959cbaddu, i, lf, eb).xy, b = flowNode(h ^ 0x959cbaddu, i + 1, lf, eb).xy;
    fine = a.x + (b.x - a.x) * smooth01(t) + ${x(Wd)} * t * (1.0 - t) * ((1.0 - t) * (2.0 * a.y - 1.0) - t * (2.0 * b.y - 1.0));
  }
  float logFlux = ${x(qn[0])} * wide + ${x(qd)} * gate * att2 * (2.0 * fine - 1.0)
    - ${x(Xn[0])} - ${x(Xn[1])} * att;
  return vec2(${x(qn[1])} * (exp2(logFlux) - 1.0), 1.0 + ${x(Xd)} * gate);
}
// Relative emission at a node (aurora-morph.ts zoneCurtainE rayAt), common to both species' profiles.
float rayAt(float xc, float gT, float s, float cBeta, float icn) {
  float e = xc * (1.0 + ${x(Yd)} * s * xc) * gT;
  float br = e * inversesqrt(1.0 + e * e * ${x(1/Ld**2)}), dk = xc / (1.0 + max(-xc, 0.0) * icn);
  return 1.0 + cBeta * mix(dk, br, step(0.0, xc));
}
// (cos x, sin x) with one Cody–Waite reduction (cosR / sinR's).
vec2 sinCosR(float x) {
  float k = floor(x * 0.636619772 + 0.5), r = (x - k * 1.5703125) - k * 4.83826795e-4;
  int q = int(k) & 3;
  float s = sinSeries(r), co = cosSeries(r);
  return q == 0 ? vec2(co, s) : q == 1 ? vec2(-s, co) : q == 2 ? vec2(-co, -s) : vec2(s, -co);
}
// z in [-1, 1] from the byte at bit s of w: its two nibbles summed (aurora-morph.ts zNib).
float zNib(uint w, uint s) { return float(((w >> s) & 15u) + ((w >> (s + 4u)) & 15u)) * ${x(1/15)} - 1.0; }
// Round 12b: the flame wave on arc h at the crossing (xs along the arc, hs its height), the prompt class's lift − 1
// (aurora-morph.ts flameZone; u_auFold[7].xy, [8].x the clocks, [8].y the window factor).
// Round 14 (aurora-morph.ts flameWave): one wave of epoch ep — a sharp front with a tail below, widening as it climbs,
// ending at its own height, its life faded in and out over the two periods it is drawn.
float flameWave(uint h, float xs, float hs, float x0, float ep, float P) {
  float age = x0 - ep;
  uint hp = hashU(h ^ (uint(int(ep) & 4095) * 0x9e3779b1u)), hq = (hp * 0x2c1b3c6du) ^ (hp >> 16u);
  if (float((hq >> 24u) & 255u) >= ${x(256*Dr)}) return 0.0;
  uint hr = hashU(hq ^ 0x5851f42du);
  // Round 16 (cost): nothing to draw — the wave not born yet or gone (life 0), its front still below this height for any
  // lag (q ≥ 1: front 0), or past its end for any lag (rise ≥ end: fin 0) — before the three cosines (the same 0).
  float life = smooth01(age * ${x(1/mo[0])}) * (1.0 - smooth01((age - ${x(mo[1])}) * ${x(1/(mo[2]-mo[1]))}));
  float eb = float(hr & 255u), end = eb < ${x(256*ho)} ? ${x(fo[0])} + ${x(fo[1]/(256*ho))} * eb
    : ${x(fo[2])} + ${x(fo[3]/(256-256*ho))} * (eb - ${x(256*ho)});
  float t0 = ${x(qf)} * (1.0 + ${x(Ve[3])} * zNib(hp, 16u)), vf = ${x(Kf)} * (1.0 + ${x(Ve[2])} * zNib(hp, 8u));
  float tb = (age - ${x(Cn)} - ${x(Ve[0])} * zNib(hp, 0u)) * P, lagMax = ${x(1.001*Pn*(1+Dn))};
  float hfMax = ${x(K[0])} - t0 + vf * (tb + lagMax), hfMin = ${x(K[0])} - t0 + vf * (tb - lagMax);
  if (!(life > 0.0) || hs - hfMax >= t0 * (1.0 + max(0.0, hfMax - ${x(K[0])}) * ${x(1/On)}) || max(0.0, hfMin - ${x(K[0])}) >= end) return 0.0;
  float ik =${x(2*Math.PI/Hf)} / (1.0 + ${x(Ve[4])} * zNib(hp, 24u));
  float c = 0.5 + 0.5 * cosR(xs * ik + float(hq & 255u) * ${x(2*Math.PI/256)});
  float lag = ${x(Pn)} * (cosR(xs * ik * ${x(1/.618)} + float((hq >> 8u) & 255u) * ${x(2*Math.PI/256)})
    + ${x(Dn/255)} * float((hr >> 8u) & 255u) * cosR(xs * ik * ${x(1/.27)} + float((hr >> 16u) & 255u) * ${x(2*Math.PI/256)}));
  float tau = (age - ${x(Cn)} - ${x(Ve[0])} * zNib(hp, 0u)) * P - lag;
  float hf = ${x(K[0])} - t0 + vf * tau;
  float rise = max(0.0, hf - ${x(K[0])}), q = (hs - hf) / (t0 * (1.0 + rise * ${x(1/On)}));
  float b = max(0.0, 1.0 - q * q), front = q >= 0.0 ? b * b : exp(-q * q * ${x(1/(Un*Un))});
  float fs = max(${x(Zf)} * end, ${x(jf)}), fin = 1.0 - smooth01((rise - end + fs) / fs);
  return (1.0 + ${x(Ve[1])} * zNib(hq, 16u)) * c * front * fin * life;
}
float flameZone(uint h, float xs, float hs, int lv) {
  int j = int((h >> 13u) % 3u);
  float x0 = (j == 0 ? u_auFold[7].x : j == 1 ? u_auFold[7].y : u_auFold[8].x) + float((h >> 26u) & 7u) * 0.125, ep = floor(x0);
  float P = j == 0 ? ${x(dt[0])} : j == 1 ? ${x(dt[1])} : ${x(dt[2])};
  return u_auFold[8].y * ${x(Yf)} * AU_FLAME_LV[lv] * exp(-max(0.0, hs - ${x(K[0])}) * ${x(1/Xf)})
    * (flameWave(h, xs, hs, x0, ep, P) + flameWave(h, xs, hs, x0, ep - 1.0, P));
}
// Round 18 (aurora-morph.ts curtainProfile): the node densities (ρ101, ρ107, ρ125) of both classes for the lower edge's
// shift e and the hem's weight, rescaled to the e = 0 profile's column (r2: ρ125's base over the peak; topS: the top piece).
void curtainProfile(vec2 e, vec2 hem, float r2, float topS, out vec2 a, out vec2 b, out vec2 c) {
  vec2 a0 = mix(max(-e * AU_LE_A1, vec2(0.0)), min(vec2(AU_LE_R101), AU_LE_A0 / max(AU_LE_A2 + e, vec2(1e-6))), step(e, vec2(-AU_LE_S0)));
  b = clamp(1.0 - e * AU_LE_I107, AU_LE_R107, 1.0); c = r2 * (1.0 + max(e, 0.0) * AU_LE_I125);
  a = a0 + hem * max((1.0 + AU_HEM_GAIN) * b - a0, vec2(0.0));
  float k12 = AU_CK_1 + AU_CK_2 * topS;
  vec2 sc = AU_CRN1 * (AU_CK_01 + k12 * r2) / (AU_CK_L0 * a + AU_CK_01 * b + k12 * c);
  a *= sc; b *= sc; c *= sc;
}
// The E layer's arcs as curtains along the line of sight, (prompt, 557.7) (aurora-morph.ts zoneCurtainE).
// Round 8: XN / XE / xr are the turned and warped coordinates (zoneMorph: XW, XQ, xw); slant, snr for the envelope.
// Round 9: WX1 … WY2 the warp's 620 / 310 km parts at the nodes (each arc's own layer shift, aurora-morph.ts layerCoef).
// Round 18: LLo, dXo the CURTAIN_LOW_KM node's slant distance and x_n step from node 0 (aurora-morph.ts curtainNodes).
vec2 curtainE(vec4 XN, vec4 XE, vec4 LL, vec4 SN, vec4 FA, float xr, int lv, float slant, float snr, vec4 WX1, vec4 WY1, vec4 WX2, vec4 WY2, float vs, float LLo, float dXo) {
  // Round 12b: the vortex's shear vs (aurora-morph.ts vortexStrain): the sheets widened, the rays faded.
  float vs2 = ${x(In)} * vs * ${x(In)} * vs, vRay = 1.0 / (1.0 + ${x(sd)} * vs);
  float ef = arcV(12), offC = arcV(14), offF = arcV(15);
  int c = int(floor((xr - arcV(0)) / AU_ARC_CELL - 0.5)), eb = int(arcV(13) + 0.5), wC = int(arcV(28) + 0.5), wF = int(arcV(29) + 0.5);
  uint present = AU_ARC_PRESENT[lv];
  vec2 o0 = vec2(arcV(0), arcV(16)), sh = vec2(arcV(9), arcV(25)), col = vec2(0.0);
  // Round 10: the waves' ray gain and envelope share (aurora-morph.ts zoneWave, fold slots 11, 13).
  // Round 18 (B3): the share per arc (AU_SKIRT), the waves' change of it esW.
  float cBeta = AU_CRAY_BETA[lv] * (1.0 + u_auFold[5].y), esW = u_auFold[6].y;
  // Round 12: the rays' dark side eased to a floor (aurora-morph.ts CURTAIN_RAY_DARK).
  float icn = cBeta * ${x(1/Td)};
  for (int dc = -1; dc <= ${$r-2}; dc++) {
    int id = c + dc;
    uint h0 = hashU(uint(id + 1024) * 65536u + 4099u);
    float x = ef + float(h0 >> 8u) * (1.0 / 16777216.0), fx = floor(x), u = x - fx;
    uint h = hashU(h0 ^ (uint((eb + int(fx)) & ${Lr}) * 0x9e3779b1u));
    if ((h & 255u) >= present) continue;
    float pos = (float(id) + AU_ARC_POS0 + AU_ARC_POS_SPAN * float((h >> 8u) & 255u) / 256.0) * AU_ARC_CELL;
    int j = int((h >> 24u) & 1u), qd = int((h >> 25u) & 7u);
    vec2 drift = vec2(arcV(1 + 2 * j) * AU_PH_S[qd] + arcV(2 + 2 * j) * AU_PH_C[qd], arcV(17 + 2 * j) * AU_PH_S[qd] + arcV(18 + 2 * j) * AU_PH_C[qd]);
    float rel = xr - o0.x - pos - drift.x, cut = smooth01((AU_CUT2 - rel * rel) / (AU_CUT2 - AU_CFADE2));
    if (!(cut > 0.0)) continue;
    vec2 band = vec2(arcBand(o0.x + pos + drift.x - sh.x, lv), arcBand(o0.y + pos + drift.y - sh.y, lv));
    if (!(band.x > 0.0 || band.y > 0.0)) continue;
    uint hc = h ^ 0x85ebca6bu;
    // The meander at each node's own place along the arc; d (km) from the sheet's centre plane, per class.
    // Round 8: the coarse lattice at nodes 1 and 3; node 0 = node 1, node 2 = the blend at its height's share.
    // Round 14: in the arc's own moving frame (aurora-morph.ts arcFlow: sm the coarse frame's ±1, ±2, sf the fine frame's
    // sign), the nodes living (noiseFlow); the fold events at the same two nodes (foldEvents: km, break).
    uint ha = hashU(h ^ 0x632be5abu);
    int sf = (ha & 2u) != 0u ? -1 : 1, sm = sf * (1 + int(ha & 1u));
    // Round 16 (cost): the three nodes' fold events from three shared cells (foldEvents3, aurora-morph.ts).
    vec4 n1 = noiseFlow(hc, XE.y / AU_N_KM, offC, wC, sm, AU_FLOW_LC), n3 = noiseFlow(hc, XE.w / AU_N_KM, offC, wC, sm, AU_FLOW_LC);
    vec4 n0 = n1, n2 = n1 + (n3 - n1) * AU_NZ_MIX;
    uint hfe = h ^ 0x4cf5ad43u;
    vec2 fe1, fe2, fe3;
    foldEvents3(hfe, vec3(XE.y, XE.z, XE.w) / AU_N_KM + float(sm) * offC, offC, wC, sm, lv, fe1, fe2, fe3);
    float brk = (fe1.y + fe2.y + fe3.y) * (1.0 / 3.0);
    // Round 9: + the arc's layer shift (aurora-morph.ts layerCoef: δ₁ from AU_LD1, δ₂ one of the 8 phases, r₂ from 2 bits).
    // Round 14: δ₂ one of AU_LD2 (±π/5, ±π/15), r₂ 0.8–1.2 — neighbouring sheets out of step but never through each other.
    int ql1 = int(((h >> 10u) ^ (h >> 19u)) & 3u), ql2 = int(((h >> 3u) ^ (h >> 27u)) & 3u);
    float lr2 = AU_LR0 + AU_LRD * float(((h >> 14u) ^ (h >> 23u)) & 3u);
    vec4 f = AU_CMEANDER * FA * (2.0 * vec4(n0.x, n1.x, n2.x, n3.x) - 1.0) + vec4(fe1.x, fe1.x, fe2.x, fe3.x) + WX1 * AU_LD1C[ql1] - WY1 * AU_LD1S[ql1] + WX2 * (lr2 * AU_LD2C[ql2] - 1.0) - WY2 * (lr2 * AU_LD2S[ql2]);
    vec4 d0 = XN - o0.x - pos - drift.x - f, d1 = XN - o0.y - pos - drift.y - f;
    // Where the line of sight crosses the sheet (class 0): each piece's zero of d (regularised), weighted.
    float W = 0.0, XS = 0.0, LS = 0.0, SS = 0.0, DX = 0.0, DD = 0.0, HS = 0.0;
    vec4 NZ = vec4(0.0);
${[0,1,2].map(o=>{const s=St[o],a=St[o+1],n=o===0?Zn[0]:0,r=o===2?Zn[1]:1,i=n===0&&r===1,l=.5+Fm/((t[o+1]-t[o])*(r-n));return`    {
      float a0 = d0.${s}, g0 = d0.${a} - a0, a = ${n===0?"a0":`a0 + g0 * ${x(n)}`}, b = ${r===1?`d0.${a}`:`a0 + g0 * ${x(r)}`}, D = a - b;
      float dm = a * b <= 0.0 ? 0.0 : min(abs(a), abs(b)), w = AU_CW[${o}] / (1.0 + dm * dm / AU_CROSS2);
      float t = ${i?"":`${x(n)} + ${x(r-n)} * `}(0.5 + clamp((a + b) * D / (2.0 * (D * D + AU_CROSS_EPS2 + dm * dm)), ${x(-l)}, ${x(l)})), tc = clamp(t, 0.0, 1.0);
      float hz = ${x(t[o])} + ${x(t[o+1]-t[o])} * t;
      W += w; XS += w * (XE.${s} + (XE.${a} - XE.${s}) * t); LS += w * (LL.${s} + (LL.${a} - LL.${s}) * t); SS += w * (SN.${s} + (SN.${a} - SN.${s}) * t);
      NZ += w * (n${o} + (n${o+1} - n${o}) * tc); DX += w * abs(XE.${a} - XE.${s}); DD += w * abs(g0);
      HS += w * hz;
    }`}).join(`
`)}
    float xs = XS / W, ls = LS / W, sns = SS / W, ratio = DX / max(DD, 1e-3);
    vec4 nzs = NZ / W;
    float sr2 = (ls * AU_PREFILTER) * (ls * AU_PREFILTER) + (sns * sns + AU_RAY_DEPTH2) * ratio * ratio;
    // Round 18 (B1, aurora-morph.ts curtainSigma): each arc's own width by level, along it × e^(A(2w − 1)), thicker in a fold.
    float sigma = AU_CFWHM[lv * 16 + int((h >> 20u) & 15u)] * exp(AU_THICK_A * (2.0 * nzs.w - 1.0)) * (1.0 + AU_THICK_F * abs(fe2.x) / AU_FOLD_KM[lv]);
    float sp = sqrt(sigma * sigma + sns * sns + vs2);
    float al = max(0.0, nzs.y - AU_ALONG_FLOOR), ag = AU_ALONG_GAIN * al * al;
    int qb0 = int(((h >> 12u) ^ (h >> 21u)) & 7u), qb1 = int(((h >> 5u) ^ (h >> 18u)) & 7u);
    vec2 own = vec2(1.0 + arcV(5) * AU_PH_S[qb0] + arcV(6) * AU_PH_C[qb0] + arcV(7) * AU_PH_S[qb1] + arcV(8) * AU_PH_C[qb1],
                    1.0 + arcV(21) * AU_PH_S[qb0] + arcV(22) * AU_PH_C[qb0] + arcV(23) * AU_PH_S[qb1] + arcV(24) * AU_PH_C[qb1]);
    vec2 base = band * own * ((AU_ARC_AMP0[lv] + (1.0 - AU_ARC_AMP0[lv]) * float((h >> 16u) & 15u) / 15.0) * smooth01(min(u, 1.0 - u) * ${x(1/kr)}) * cut * AU_WNORM[lv]);
    // Round 8: the curtain's diffuse envelope (aurora-morph.ts CURTAIN_ENV_*) at the reference foot.
    // Round 18 (B3, aurora-morph.ts SKIRT_*): one-sided, each arc's own share and side, read at the 107 km node; its
    // brightness along the arc the coarse lattice's alone, no flame wave (aurora-morph.ts zoneCurtainE).
    float se = AU_SKIRT_W0 + AU_SKIRT_K * sigma, se2 = se * se + SN.y * SN.y, es = AU_SKIRT[int((ha >> 12u) & 15u)] + esW;
    vec2 dr = vec2(d0.y, d1.y) + (((ha >> 16u) & 255u) < ${_m}u ? AU_SKIRT_OFF : -AU_SKIRT_OFF) * se;
    col += base * ((es * (AU_CALONG0[lv] + (1.0 - AU_CALONG0[lv]) * min(AU_ALONG_MAX, ag)) * slant * sigma / sqrt(se2)) * exp(-0.5 * dr * dr / se2));
    // Round 18 (cost, aurora-morph.ts CURTAIN_FAR): a sheet whose every node (the CURTAIN_LOW_KM node to the tallest top)
    // lies on one side of the line of sight beyond CURTAIN_FAR·σ' + CURTAIN_FAR_KM (the fine pleats' reach): its envelope only.
    vec4 fa0 = vec4(d0.x + dXo, d0.xyz), fa1 = vec4(d1.x + dXo, d1.xyz);
    vec4 fb = vec4(d0.w, d0.z + ${x(Yt+Vt)} * (d0.w - d0.z), d1.w, d1.z + ${x(Yt+Vt)} * (d1.w - d1.z));
    float thr = AU_FAR * sp + AU_FAR_KM;
    if (all(greaterThan(fa0, vec4(thr))) && all(greaterThan(fa1, vec4(thr))) && all(greaterThan(fb, vec4(thr)))) continue;
    if (all(lessThan(fa0, vec4(-thr))) && all(lessThan(fa1, vec4(-thr))) && all(lessThan(fb, vec4(-thr)))) continue;
    float fineAtt = exp(-0.5 * AU_FINE_K2 * sr2);
    vec4 nf = noiseFlow(h ^ 0xc2b2ae35u, xs / AU_F_KM, offF, wF, sf, AU_FLOW_LF);
    float ff = AU_FINE_FOLD[lv] * fineAtt * (nf.x - nf.y) * (1.0 + AU_BREAK_PLEAT * brk);
    float along = AU_CALONG0[lv] + (1.0 - AU_CALONG0[lv]) * min(AU_ALONG_MAX, ag * (1.0 + AU_FINE_BRIGHT[lv] * fineAtt * (nf.x + nf.z - 1.0)));
    // Both E classes see the same precipitation at the crossing, with different emission profiles.
    float xsr = xs + AU_RAY_FM * fineAtt * (nf.x - nf.z);
    vec2 rain = zoneRayPrecipitation(h, xsr, offF, wF, sf, nzs.z, nf.w, fineAtt);
    float drive = rain.x * vRay;
    float zz = nzs.z * nzs.z, topS = AU_CTOP_MIN + AU_CTOP_SPAN * zz;
    // The densities at the nodes × CURTAIN_NORM, the top piece's lower node lifted where rayed.
    // Round 18 (B4): the lower edge moved by e (aurora-morph.ts lowerE, curtainProfile), both classes.
    float e = AU_LE0[int((ha >> 8u) & 15u)] + AU_LE_C * (1.0 - 2.0 * nzs.y) + AU_LE_F * (nf.y - 0.5) * fineAtt;
    vec2 pa, pb, pc;
    // Round 18 (B8, B7): the prompt class AU_PROMPT_LOW lower, its hem (aurora-morph.ts hemWeight) where the fine lattice says.
    float hw = AU_HEM_SHARE[lv] + (smooth01((nf.z - AU_HEM_THR[lv]) * AU_HEM_ISOFT + 0.5) - AU_HEM_SHARE[lv]) * fineAtt;
    curtainProfile(vec2(e - AU_PROMPT_LOW, e), vec2(hw, 0.0), AU_CR21 * (1.0 + AU_CTALL_R * zz), topS, pa, pb, pc);
    // Each node's d (both classes; the top node at the arc's own height) and its normal tail, once.
    vec2 q0 = vec2(d0.x, d1.x) - ff, q1 = vec2(d0.y, d1.y) - ff, q2 = vec2(d0.z, d1.z) - ff, q3 = q2 + (vec2(d0.w, d1.w) - ff - q2) * topS;
    vec4 t0 = normTail2(abs(q0) / sp), t1 = normTail2(abs(q1) / sp), t2 = normTail2(abs(q2) / sp), t3 = normTail2(abs(q3) / sp);
    // Round 15: each ray's own attributes (aurora-morph.ts rayAttr: T1, T2, g, s) and its factor at the nodes 1 and 2
    // (rayAt); the pieces' columns split by node (curtainSlabAB: C1, C2 the columns of the 107 and 125 km densities).
    // (Round 16: the rays' lattice is the fine lattice's 12 km: its pre-filter is fineAtt.)
    float gt0;
    vec4 ra = rayAttr(h ^ 0x1b873593u, xsr, offF, wF, sf, fineAtt, lv, gt0);
    float tall2 = clamp(1.0 + AU_RAY_TALL * nf.w - AU_RAY_SHORT, 0.0, AU_RAY_HMAX);
    float R1 = rayAt(min(AU_RAY_MAX, drive), ra.x, ra.w, cBeta, icn);
    float R2 = rayAt(min(AU_RAY_MAX, tall2 * drive), ra.y, ra.w, cBeta, icn);
    vec4 s0 = curtainSlabAB(q0, q1, t0, t1, LL.y - LL.x, sp), s1 = curtainSlabAB(q1, q2, t1, t2, LL.z - LL.y, sp), s2 = curtainSlabAB(q2, q3, t2, t3, (LL.w - LL.z) * topS, sp);
    // Round 18 (B4): + the piece from the CURTAIN_LOW_KM node (no density) to node 0 (ρ101); node 0's rays: node 1's dark side only.
    vec2 qL = q0 + dXo;
    vec4 sL = curtainSlabAB(qL, q0, normTail2(abs(qL) / sp), t0, LL.x - LLo, sp);
    vec2 C0 = pa * (sL.zw + s0.xy), C1 = pb * (s0.zw + s1.xy), C2 = pc * (s1.zw + s2.xy);
    // Round 18 (B5): + the deep feet (aurora-morph.ts zoneCurtainE D0): T₀ × the ray's excess, over ρ107, the 557.7 × AU_DEEP_G.
    vec2 D0 = max(R1 - 1.0, 0.0) * (gt0 / ra.x) * vec2(1.0, AU_DEEP_G);
    // Round 18b: each foot to its own depth (aurora-morph.ts DEEP_Q_MIN): the piece below node 0 × q, q = T₀ / T₀max.
    vec2 deepB = vec2(0.0);
    if (D0.x != 0.0) {
      float qDp = clamp(rain.y * gt0 / (max(ra.z, 1e-3) * ${x(Rt[1])}), ${x(Bd)}, 1.0);
      vec2 qF = q0 + dXo * qDp;
      deepB = curtainSlabAB(qF, q0, normTail2(abs(qF) / sp), t0, (LL.x - LLo) * qDp, sp).zw;
    }
    vec2 pl = C0 + C1 + C2, cc = C0 * min(R1, 1.0) + pb * (deepB + s0.xy) * D0 + C1 * R1 + C2 * R2;
    // Round 13: the sheet's own grazing gain eased to CURTAIN_STRETCH_MAX (aurora-morph.ts).
    vec2 gq = pl * ${x(1/(Me[1]*_s*rd))}, gq2 = gq * gq;
    cc *= inversesqrt(sqrt(1.0 + gq2 * gq2));
    // Round 12b: the flame wave (flameZone) on the curtain, 557.7 at AU_PULSE_GREEN of it (round 18: the sheet's alone).
    float fl = u_auFold[8].y > 0.0 ? flameZone(h, xs, HS / W, lv) : 0.0;
    col += base * (along * (1.0 - es) * sigma * AU_SQRT2PI) * cc * (1.0 + fl * vec2(1.0, AU_PULSE_GREEN));
  }
  // Round 12b: the arcs' sum eased towards CURTAIN_GRAZE_CAP × the profile's slant (aurora-morph.ts).
  // Round 13: the knee to the 4th power (aurora-morph.ts).
  vec2 gr = col * (${x(1/id)} / slant), gr2 = gr * gr;
  return col * inversesqrt(sqrt(1.0 + gr2 * gr2)) * (1.0 + vec2(arcV(10), arcV(26)));
}
`},Om=()=>`
float arcSumF3(vec3 FXG, vec3 FXE, vec3 FSN2, vec3 FFA, vec3 FWB, vec3 FTOP, vec3 FRL, vec3 FRR, vec4 lw, int lv) {
  float ef = arcV(44), offC = arcV(14), offF = arcV(15);
  int eb = int(arcV(45) + 0.5), wC = int(arcV(28) + 0.5), wF = int(arcV(29) + 0.5);
  uint present = AU_ARC_PRESENT[lv];
  int c = int(floor((AU_NS_F == 3 ? FXG.y : FXG.x) * ${x(1/Tr)} - 0.5));
  vec3 acc = vec3(0.0);
  for (int dc = -1; dc <= ${$r-2}; dc++) {
    int id = c + dc;
    uint h0 = hashU(uint(id + 1024) * 65536u + 4099u);
    float x = ef + float(h0 >> 8u) * (1.0 / 16777216.0), fx = floor(x), u = x - fx;
    uint h = hashU(h0 ^ (uint((eb + int(fx)) & ${Lr}) * 0x9e3779b1u));
    if ((h & 255u) >= present) continue;
    float pos = (float(id) + AU_ARC_POS0 + AU_ARC_POS_SPAN * float((h >> 8u) & 255u) / 256.0) * AU_ARC_CELL;
    int qb0 = int(((h >> 12u) ^ (h >> 21u)) & 7u), qb1 = int(((h >> 5u) ^ (h >> 18u)) & 7u);
    float own = 1.0 + arcV(37) * AU_PH_S[qb0] + arcV(38) * AU_PH_C[qb0] + arcV(39) * AU_PH_S[qb1] + arcV(40) * AU_PH_C[qb1];
    int j = int((h >> 24u) & 1u), qd = int((h >> 25u) & 7u);
    float drift = arcV(33 + 2 * j) * AU_PH_S[qd] + arcV(34 + 2 * j) * AU_PH_C[qd];
    uint ha = hashU(h ^ 0x632be5abu);
    int sf = (ha & 2u) != 0u ? -1 : 1, sm = sf * (1 + int(ha & 1u));
    int ql1 = int(((h >> 10u) ^ (h >> 19u)) & 3u), ql2 = int(((h >> 3u) ^ (h >> 27u)) & 3u);
    float lr2 = AU_LR0 + AU_LRD * float(((h >> 14u) ^ (h >> 23u)) & 3u);
    float shift = lw.x * AU_LD1C[ql1] - lw.y * AU_LD1S[ql1] + lw.z * (lr2 * AU_LD2C[ql2] - 1.0) - lw.w * (lr2 * AU_LD2S[ql2]);
    float sig0 = (AU_ARC_W0 + AU_ARC_DW * float((h >> 20u) & 15u) / 15.0) / 2.35482004;
    float a0 = (AU_ARC_AMP0[lv] + (1.0 - AU_ARC_AMP0[lv]) * float((h >> 16u) & 15u) / 15.0) * smooth01(min(u, 1.0 - u) * ${x(1/kr)}) * own;
    // The arc's coarse lattice and its rays' red once, at the middle shell (aurora-morph.ts arcSumF3).
    float xm = AU_NS_F == 3 ? FXE.y : FXE.x;
    vec4 nz = noiseFlow(h ^ 0x85ebca6bu, xm / AU_N_KM, offC, wC, sm, AU_FLOW_LC);
    vec2 rt = redAttr(h ^ 0x1b873593u, FXE.x - float(sf) * FRL.x, offF, wF, sf, 1.0) - 1.0;
    float al = max(0.0, nz.y - AU_ALONG_FLOOR), along = a0 * min(AU_ALONG_MAX, AU_ALONG_GAIN * al * al), tall = AU_ARC_TALL * (2.0 * nz.z - 1.0);
    float sigma = sig0 * (AU_THICK0 + AU_THICK_D * nz.w), sg2 = sigma * sigma, wr = min(1.0, clamp(AU_BUNCH_GAIN * nz.z - AU_BUNCH_OFF[lv], 0.0, AU_BUNCH_MAX));
    float mea = AU_MEANDER * (2.0 * nz.x - 1.0);
${[0,1,2].map(t=>{const e=St[t];return`    if (${t} < AU_NS_F) {
      float dn = FXG.${e} - pos - drift, d = dn - (mea * FFA.${e} + shift), s2 = sg2 + FSN2.${e}, tp = 2.0 * FTOP.${e} - 1.0;
      acc.${e} += along * (1.0 + tp * tall) * sqrt(sg2 / s2) * exp(-0.5 * d * d / s2) * smooth01((AU_ARC_REACH2 - d * d) / (AU_ARC_REACH2 - AU_ARC_FADE2))
        * smooth01((AU_ARC_NOM2 - dn * dn) / (AU_ARC_NOM2 - AU_ARC_NOMF2)) * (1.0 + wr * FRR.${e} * (AU_RED_B * rt.x + tp * AU_RED_H * rt.y));
    }`}).join(`
`)}
  }
  return dot(acc, FWB) * (1.0 + arcV(42)) * AU_RED_GAIN;
}
`,Dm=(t,e)=>`
const int AU_FOLDS = ${Gh};
const int AU_RAYS = ${t};
const int AU_HARMONICS = ${e};
uniform vec4 u_auArcY[12];
uniform vec2 u_auFold[9];
uniform vec2 u_auRay[12];
uniform vec2 u_auPatch[36];
uniform vec2 u_auPillar[12];
uniform vec2 u_auBundle[12];
uniform vec3 u_auLowDrift;
uniform int u_auScene;
uniform vec4 u_auLow;
uniform float u_auCotDip;
uniform float u_auRate[5];
uniform int u_auClass[5];
uniform sampler2D u_auExt;
uniform int u_auExtOn;
uniform float u_auRatioCap;
out vec4 o;
float smooth01(float x) { float t = clamp(x, 0.0, 1.0); return t * t * (3.0 - 2.0 * t); }
float arcV(int idx) { return u_auArcY[idx >> 2][idx & 3]; }
`,zm=()=>I("AU_LD1C",mn.map(t=>Math.cos(t)-1))+I("AU_LD1S",mn.map(Math.sin))+I("AU_LD2C",pn.map(Math.cos))+I("AU_LD2S",pn.map(Math.sin))+`const float AU_ARC_NOM2 = ${x(Rh**2)};
const float AU_ARC_NOMF2 = ${x(Sh**2)};
const int AU_FLOW_LC = ${ud};
const int AU_FLOW_LF = ${Gr};
const int AU_FOLD_LIFE = ${dd};
`+I("AU_FOLD_KM",md)+I("AU_RT2",Cd)+I("AU_RG",Pd)+I("AU_RS",Ud)+`const float AU_RAYID_K2 = ${x(Lm)};
const float AU_RED_GAIN = ${x(Am)};
const float AU_RED_B = ${x(ym)};
const float AU_RED_H = ${x(bm)};
`+I("AU_LE0",sm)+[["AU_CLOW",wt],["AU_LE_C",Zd],["AU_LE_F",jd],["AU_LE_S0",wa*(K[1]-K[0])],["AU_LE_A1",1/(K[1]-K[0])],["AU_LE_A0",wa*(K[0]-wt)],["AU_LE_A2",K[0]-wt+wa*(K[1]-K[0])],["AU_LE_R101",Qd],["AU_LE_I107",1/Jd],["AU_LE_R107",em],["AU_LE_I125",1/tm],["AU_CRN1",Me[1]*_s],["AU_CR21",Me[2]/Me[1]],["AU_CK_L0",K[1]-wt],["AU_CK_01",K[2]-K[0]],["AU_CK_1",K[2]-K[1]],["AU_CK_2",K[3]-K[2]],["AU_DEEP_G",Id],["AU_PROMPT_LOW",om],["AU_HEM_GAIN",am],["AU_HEM_ISOFT",1/Xr]].map(([t,e])=>`const float ${t} = ${x(e)};
`).join("")+I("AU_DEEP_LO",Ya.map(t=>256-t))+I("AU_DEEP_K",Ya.map(t=>(Rt[1]-Rt[0])/Math.max(1,t)))+I("AU_DEEP_M",Gd)+I("AU_HEM_SHARE",qr)+I("AU_HEM_THR",gm)+I("AU_CFWHM",Vr.flatMap(t=>Array.from(t,e=>e/2.3548200450309493)))+I("AU_WNORM",um)+`const float AU_THICK_A = ${x(rm)};
const float AU_THICK_F = ${x(lm)};
`+I("AU_ZDIFFUSE",af)+`const float AU_FAR = ${x(xm)};
const float AU_FAR_KM = ${x(vm)};
`+I("AU_SKIRT",pm)+`const float AU_SKIRT_W0 = ${x(fm)};
const float AU_SKIRT_K = ${x(dm)};
const float AU_SKIRT_OFF = ${x(mm)};
`+[["AU_FOLD_CTR0",Gn[0]],["AU_FOLD_CTRD",Gn[1]/255],["AU_FOLD_W0",pa[0]],["AU_FOLD_DW",(pa[1]-pa[0])/255],["AU_FOLD_R2",_a[1]**2],["AU_FOLD_IRF",1/(_a[1]**2-_a[0]**2)],["AU_BREAK_PLEAT",_d],["AU_CMEANDER",yd]].map(([t,e])=>`const float ${t} = ${x(e)};
`).join(""),Im=()=>zm()+`
// The level index (u_auArcY slot 11, the same in every class).
int auLevel() { return int(arcV(11) + 0.5); }
// The arcs' band at xn for level lv (aurora-morph.ts arcBand; the caller subtracts the class's band shift). Round 10: the
// poleward edges moved by a wave's widening u_auFold[5].x (km).
float arcBand(float xn, int lv) { int b = lv * 4; return smooth01((xn - AU_OVAL[b]) / (AU_OVAL[b + 1] - AU_OVAL[b])) * smooth01((AU_OVAL[b + 3] + u_auFold[5].x - xn) / (AU_OVAL[b + 3] - AU_OVAL[b + 2])); }
// Four channels of 1-D value noise in [0, 1] at u (lattice units), seed h (aurora-morph.ts noise4): lattice mod 4096.
// A node's four channels: channel n swings between the hash's byte n and byte n + 1 (mod 4) on a smoothed triangle wave of
// tau + the node's phase (byte 2 / 256) + n/4 (aurora-morph.ts noise4, round 5).
vec4 noiseNode(uint a, float tau) {
  vec4 b = vec4(float(a & 255u), float((a >> 8u) & 255u), float((a >> 16u) & 255u), float(a >> 24u));
  vec4 m = fract(tau + b.z * (1.0 / 256.0) + vec4(0.0, 0.25, 0.5, 0.75));
  vec4 t = 1.0 - abs(2.0 * m - 1.0);
  return (b + (b.yzwx - b) * (t * t * (3.0 - 2.0 * t))) * (1.0 / 255.0);
}
vec4 noise4(uint h, float u, float tau, int whole) {
  float fi = floor(u), f = u - fi, s = f * f * (3.0 - 2.0 * f);
  int i = int(fi) + whole;
  vec4 va = noiseNode(hashU(h ^ (uint(i & 4095) * 0x27d4eb2du)), tau), vb = noiseNode(hashU(h ^ (uint((i + 1) & 4095) * 0x27d4eb2du)), tau);
  return va + (vb - va) * s;
}
vec2 smooth01(vec2 x) { vec2 t = clamp(x, 0.0, 1.0); return t * t * (3.0 - 2.0 * t); }
// Round 14 (aurora-morph.ts noiseFlow): node i of seed h, its value crossfading between the hashes of its lives eb + ⌊lf + φᵢ⌋
// and the next (φᵢ the node's own phase); the four 8-bit channels in [0, 1].
vec4 flowNode(uint h, int i, float lf, int eb) {
  uint ci = uint(i & 4095), hi = h ^ (ci * 0x27d4eb2du);
  float lam = lf + float((ci * 0x9e3779b1u) >> 20u) * (1.0 / 4096.0), el = floor(lam), w = lam - el;
  int e = eb + int(el);
  uint a = hashU(hi ^ (uint(e) * 0x165667b1u)), b = hashU(hi ^ (uint(e + 1) * 0x165667b1u));
  vec4 va = vec4(float(a & 255u), float((a >> 8u) & 255u), float((a >> 16u) & 255u), float(a >> 24u));
  vec4 vb = vec4(float(b & 255u), float((b >> 8u) & 255u), float((b >> 16u) & 255u), float(b >> 24u));
  float s = w * w * (3.0 - 2.0 * w);
  return clamp(0.5 + ((va + (vb - va) * s) * (1.0 / 255.0) - 0.5) * inversesqrt((1.0 - s) * (1.0 - s) + s * s), 0.0, 1.0);
}
// Value noise at u (lattice units) in an arc's moving frame u + sm·(wh + f), its nodes living at lk·|sm| lives per unit travelled.
vec4 noiseFlow(uint h, float u, float f, int wh, int sm, int lk) {
  int m = sm < 0 ? -sm : sm;
  float p = u + float(sm) * f, fi = floor(p), s = p - fi;
  s = s * s * (3.0 - 2.0 * s);
  int i = int(fi) + sm * wh, eb = lk * m * wh;
  float lf = float(lk * m) * f;
  vec4 va = flowNode(h, i, lf, eb), vb = flowNode(h, i + 1, lf, eb);
  return va + (vb - va) * s;
}
// Round 16 (cost): foldEvents' event of cell c (its life's hash, centre, half-width, A·E, phase; B its break) and its
// packet at xi (foldEvents' terms one by one), and the three curtain nodes' events from shared cells.
vec4 foldCell(uint h, float c, float f, int wh, int sm, int lv, out float B) {
  int m = sm < 0 ? -sm : sm, cg = int(c) + sm * wh;
  uint ci = uint(cg & 4095);
  float lam = float(AU_FOLD_LIFE * m) * f + float((ci * 0x85ebca77u) >> 20u) * (1.0 / 4096.0), el = floor(lam), a = lam - el;
  int e = AU_FOLD_LIFE * m * wh + int(el);
  uint H = hashU(h ^ (ci * 0x27d4eb2du) ^ (uint(e) * 0x165667b1u));
  float A = AU_FOLD_KM[lv] * (0.35 + 0.65 / 255.0 * float(H & 255u)) * ((H & 0x80000000u) != 0u ? -1.0 : 1.0);
  float E = smooth01(a * ${x(1/pd)}) * (1.0 - smooth01((a - ${x(xa[0])}) * ${x(1/(xa[1]-xa[0]))}));
  B = smooth01((a - ${x(Dt[0])}) * ${x(1/(Dt[1]-Dt[0]))}) * (1.0 - smooth01((a - ${x(Dt[2])}) * ${x(1/(1-Dt[2]))}));
  return vec4(c + AU_FOLD_CTR0 + AU_FOLD_CTRD * float((H >> 8u) & 255u), AU_FOLD_W0 + AU_FOLD_DW * float((H >> 16u) & 255u), A * E, float((H >> 24u) & 127u) * ${x(2*Math.PI/128)});
}
vec2 foldAt(float xi, vec4 P, float B) {
  float d = xi - P.x, z = d / P.y, g = exp(-z * z) * smooth01((AU_FOLD_R2 - d * d) * AU_FOLD_IRF);
  return vec2(P.z * cosR(${x(xd)} * z + P.w), B) * g;
}
void foldEvents3(uint h, vec3 xi, float f, int wh, int sm, int lv, out vec2 fe1, out vec2 fe2, out vec2 fe3) {
  vec3 c0 = floor(xi - 0.5);
  float cm = min(c0.x, min(c0.y, c0.z));
  {
    float B0, B1, B2;
    vec4 P0 = foldCell(h, cm, f, wh, sm, lv, B0), P1 = foldCell(h, cm + 1.0, f, wh, sm, lv, B1), P2 = foldCell(h, cm + 2.0, f, wh, sm, lv, B2);
    // Each node's two cells (its own c0 and c0 + 1) picked, then foldEvents' two packets.
    bool l1 = c0.x == cm, l2 = c0.y == cm, l3 = c0.z == cm;
    fe1 = foldAt(xi.x, l1 ? P0 : P1, l1 ? B0 : B1) + foldAt(xi.x, l1 ? P1 : P2, l1 ? B1 : B2);
    fe2 = foldAt(xi.y, l2 ? P0 : P1, l2 ? B0 : B1) + foldAt(xi.y, l2 ? P1 : P2, l2 ? B1 : B2);
    fe3 = foldAt(xi.z, l3 ? P0 : P1, l3 ? B0 : B1) + foldAt(xi.z, l3 ? P1 : P2, l3 ? B1 : B2);
  }
}
// Round 16 (aurora-morph.ts redTrail, redAttr): a shell's red trail (L km, ρ) at height h; the rays' lattice (rayAttr's
// nodes and frame) as (g·T2, T2), deviations × att.
vec2 redTrail(float h) {
  float L = ${x(cd)} / (${x(wm)} + ${x(Mm)} * exp((200.0 - h) * ${x(1/Em)}));
  return vec2(L, inversesqrt(1.0 + L * ${x(2/Rm)}));
}
vec2 redAttr(uint h, float x, float f, int wh, int sf, float att) {
  float p = x * ${x(1/qe)} + float(sf * ${Ke/qe}) * f, fi = floor(p), s = p - fi;
  s = s * s * (3.0 - 2.0 * s);
  int ia = (int(fi) + sf * ${Ke/qe} * wh) & ${Co};
  int ib = (ia + 1) & ${Co};
  uint a = hashU(h ^ (uint(ia) * 0x2f8a63c1u)), b = hashU(h ^ (uint(ib) * 0x2f8a63c1u));
  float ta = AU_RT2[int((a >> 8u) & 15u)], tb = AU_RT2[int((b >> 8u) & 15u)];
  vec2 va = vec2(AU_RG[int((a >> 16u) & 15u)] * ta, ta), vb = vec2(AU_RG[int((b >> 16u) & 15u)] * tb, tb);
  return 1.0 + (va + (vb - va) * s - 1.0) * att;
}
${Om()}${Um()}
// Round 8: (cos x, sin x) of four angles (sinCosR's reduction and series, vectorised; the quadrant by steps).
vec4 sinSeries(vec4 r) { vec4 r2 = r * r; return r * (1.0 - r2 * (0.166666667 - r2 * (0.00833333333 - r2 * (1.98412698e-4 - r2 * 2.75573192e-6)))); }
vec4 cosSeries(vec4 r) { vec4 r2 = r * r; return 1.0 - r2 * (0.5 - r2 * (0.0416666667 - r2 * (0.00138888889 - r2 * (2.48015873e-5 - r2 * 2.75573192e-7)))); }
void sinCos4(vec4 x, out vec4 c, out vec4 s) {
  vec4 k = floor(x * 0.636619772 + 0.5), r = (x - k * 1.5703125) - k * 4.83826795e-4, q = k - 4.0 * floor(k * 0.25);
  vec4 s0 = sinSeries(r), c0 = cosSeries(r), odd = step(0.5, q) - step(1.5, q) + step(2.5, q);
  s = (1.0 - 2.0 * step(1.5, q)) * mix(s0, c0, odd);
  c = (1.0 - 2.0 * (step(0.5, q) - step(2.5, q))) * mix(c0, s0, odd);
}
// The vortex (aurora-morph.ts swirlAt): (x_n, x_e) turned about u_auFold[3] by u_auFold[4].x · exp(−r² · u_auFold[4].y).
void swirl4(inout vec4 xn, inout vec4 xe) {
  vec4 dn = xn - u_auFold[3].x, de = xe - u_auFold[3].y, c, s;
  sinCos4(u_auFold[4].x * exp(-(dn * dn + de * de) * u_auFold[4].y), c, s);
  xn = u_auFold[3].x + c * dn - s * de; xe = u_auFold[3].y + s * dn + c * de;
}
// The common warp (aurora-morph.ts warpAt): Σ_m (A cos Φ) cos θ + (A sin Φ) sin θ, θ = K_m x_e + κ_m x_n.
// Round 9 (warpParts): also the 620 / 310 km terms' A cos(θ − Φ), A sin(θ − Φ) (x1, y1, x2, y2: the layers' shifts).
vec4 auWarp4(vec4 xn, vec4 xe, out vec4 x1, out vec4 y1, out vec4 x2, out vec4 y2) {
  vec4 c, s;
  sinCos4(AU_FOLD_K[0] * xe + AU_WARP_KAPPA[0] * xn, c, s);
  vec4 w = u_auFold[0].x * c + u_auFold[0].y * s;
  sinCos4(AU_FOLD_K[1] * xe + AU_WARP_KAPPA[1] * xn, c, s);
  x1 = u_auFold[1].x * c + u_auFold[1].y * s; y1 = u_auFold[1].x * s - u_auFold[1].y * c;
  sinCos4(AU_FOLD_K[2] * xe + AU_WARP_KAPPA[2] * xn, c, s);
  x2 = u_auFold[2].x * c + u_auFold[2].y * s; y2 = u_auFold[2].x * s - u_auFold[2].y * c;
  return w + x1 + x2;
}
// The pulsating zone of classes 0 and 1: its diffuse glow × (1 + the patches' lifts) (aurora-morph.ts morphAt's patch part).
// The pulsating zone's band at xn (aurora-morph.ts patchMask).
float patchMask(float xn, int lv) {
  int pb = lv * 4;
  return smooth01((AU_PBAND[pb] - xn) / (AU_PBAND[pb] - AU_PBAND[pb + 1])) * smooth01((xn - AU_PBAND[pb + 3]) / (AU_PBAND[pb + 2] - AU_PBAND[pb + 3]));
}
// Round 7: the band's value given (the mean over the E profile's nodes), the patches at (xn, xe).
vec2 patchSum(float mask, float xn, float xe, int lv) {
  vec2 patches = vec2(0.0);
  if (mask > 0.0) {
    int cx = int(floor(xe / AU_PATCH_CELL)), cy = int(floor(xn / AU_PATCH_CELL));
    for (int dy = -1; dy <= 1; dy++) for (int dx = -1; dx <= 1; dx++) {
      uint h = hashU(uint(cx + dx + 1024) * 65536u + uint(cy + dy + 1024));
      float px = (float(cx + dx) + 0.2 + 0.6 * hashF(h ^ 0x68e31da4u)) * AU_PATCH_CELL, py = (float(cy + dy) + 0.2 + 0.6 * hashF(h ^ 0xb5297a4du)) * AU_PATCH_CELL;
      // Round 16 (cost): beyond the patch's reach its cut is 0 — skip its size, period and harmonics.
      if ((xe - px) * (xe - px) + (xn - py) * (xn - py) >= AU_PATCH_REACH2) continue;
      float rn = AU_PATCH_RN0 + AU_PATCH_DRN * hashF(h ^ 0x1b56c4e9u), re = AU_PATCH_ASPECT * rn;
      uint hj = hashU(h ^ 0x7f4a7c15u);
      int j = int(hj % 4u), q = int(hashU(h ^ 0x2545f491u) % 8u);
      float a = AU_PATCH_A0 + AU_PATCH_DA * float((hj >> 8u) & 255u);
      vec2 s = vec2(0.0);
      for (int n = 0; n < AU_HARMONICS; n++) {
        float sn = AU_PH_S[n * 8 + q], cn = AU_PH_C[n * 8 + q];
        vec2 a0 = u_auPatch[j * 3 + n], a1 = u_auPatch[(4 + j) * 3 + n];
        s += vec2(sn * a0.x + cn * a0.y, sn * a1.x + cn * a1.y);
      }
      vec2 on = clamp(AU_PATCH_DUTY + s, 0.0, 1.0);
      float ddx = xe - px, ddy = xn - py, e2 = ddx * ddx + ddy * ddy;
      float cut = smooth01((AU_PATCH_REACH2 - e2) / (AU_PATCH_REACH2 - AU_PATCH_FADE2));
      patches += on * (a * exp(-(ddx * ddx / (re * re) + ddy * ddy / (rn * rn))) * cut);
    }
  }
  return (AU_ZDIFFUSE[lv] * (1.0 + u_auFold[6].x) * mask) * (1.0 + patches);
}
// Obliquity 1/cos(chi) at a thin shell of height h (km), sin(elevation) sinE (aurora-morph.ts shellObliquity).
float shellObliquity(float sinE, float h) {
  float c = AU_R * sqrt(max(0.0, 1.0 - sinE * sinE)) / (AU_R + h);
  return 1.0 / sqrt(max(1e-6, 1.0 - c * c));
}
// A shell's crossing: (ground distance to its sub-point, slant distance L) km (aurora-morph.ts zoneSlantMorph).
vec2 shellGL(float h, float up, float ch) {
  float ru = AU_R * up;
  float L = (2.0 * AU_R * h + h * h) / (ru + sqrt(ru * ru + 2.0 * AU_R * h + h * h));
  return vec2(AU_R * atanP(L * ch, AU_R + L * up), L);
}
// A shell's sample: its ground distance kept within the merge limit of the middle shell's gm (third round), carried down the
// field to 110 km: (x_n, x_e, the east–west footprint L·PREFILTER_RAD, the north–south one with the slab's spread).
vec4 shellSample(float h, vec2 gl, float gm, float ob, float hn, float he, float slab) {
  float c2 = hn * hn * (ob * ob - 1.0), sx = gl.y * AU_PREFILTER, sn = sqrt(sx * sx * (1.0 + c2) + slab * slab * c2);
  float sp = min(AU_ARC_PRECAP, sn), lim = AU_MERGE_K * sqrt(AU_MERGE_S * AU_MERGE_S + sp * sp) / max(abs(hn), 0.05);
  float g = gm + clamp(gl.x - gm, -lim, lim);
  return vec4(g * hn + (h - AU_REF_H) * u_auCotDip, g * he, sx, sn);
}
// Auroral zone: the slant columns (prompt, 557.7, 630.0) along (east, north, up) (aurora-morph.ts zoneSlantMorph, three classes).
vec3 zoneMorph(float east, float north, float up) {
  float ch = sqrt(east * east + north * north);
  float hn = ch > 1e-9 ? north / ch : 1.0, he = ch > 1e-9 ? east / ch : 0.0;
  vec3 m = vec3(0.0);
  // E (round 7): the arcs as standing curtains through the profile's nodes (curtainE), the pulsating zone once at the
  // reference foot × the profile's slant. The arcs' north–south footprint at a node: × √(1 + ĥn²(o² − 1)) of the east–west
  // one, o the chord obliquity of its pieces.
${Pm()}
  int lv = auLevel();
  float xb = xw - arcV(9);
  vec2 cE = vec2(0.0);
  // Round 12b: the vortex's shear at the reference foot (aurora-morph.ts vortexStrain).
  float vs = 0.0;
  if (u_auFold[4].x != 0.0) { float dn = xr - u_auFold[3].x, de = xer - u_auFold[3].y, u = (dn * dn + de * de) * u_auFold[4].y; vs = abs(u_auFold[4].x) * (2.0 * u + ${x(nd)}) * exp(-u); }
  // Outside the oval's reach of every arc the cut admits (180 km + drift + the 557.7's lag): nothing to draw.
  if (!(xb + 200.0 <= AU_OVAL[lv * 4] || xb - 200.0 >= AU_OVAL[lv * 4 + 3] + u_auFold[5].x)) cE = curtainE(XW, XQ, LL, SN, FA, xw, lv, slant, snr, WX1, WY1, WX2, WY2, vs, LLo, dXo);
  float pm = (${Array.from(K,(t,e)=>`patchMask(XN.${St[e]}, lv)`).join(" + ")}) * ${x(1/K.length)};
  // Round 18 (B9, aurora-morph.ts patchFoot): the pulsating layer read at ZONE_PATCH_KM.
  m.xy = cE + slant * patchSum(pm, ${ca>=K[0]?"xr, xer":`XN.x + dXo * ${x((K[0]-ca)/(K[0]-wt))}, XE.x + dEo * ${x((K[0]-ca)/(K[0]-wt))}`}, lv);
  // F: the shells (crossings merged towards the middle one's, slab spreads AU_SLAB_F).
  vec2 f0 = shellGL(AU_SHELL_KM[3], up, ch);
  vec2 f1 = AU_NS_F > 1 ? shellGL(AU_SHELL_KM[4], up, ch) : f0;
  vec2 f2 = AU_NS_F > 2 ? shellGL(AU_SHELL_KM[5], up, ch) : f1;
  float gmF = AU_NS_F == 3 ? f1.x : AU_NS_F == 2 ? 0.5 * (f0.x + f1.x) : f0.x;
  // Round 8: the vortex and the warp once at the middle crossing, as a shift of every shell (aurora-morph.ts zoneSlantMorph).
  float qn = gmF * hn, qe = gmF * he, wf = 0.0;
  if (u_auFold[4].x != 0.0) {
    float dn = qn - u_auFold[3].x, de = qe - u_auFold[3].y;
    vec2 cs = sinCosR(u_auFold[4].x * exp(-(dn * dn + de * de) * u_auFold[4].y));
    qn = u_auFold[3].x + cs.x * dn - cs.y * de; qe = u_auFold[3].y + cs.y * dn + cs.x * de;
  }
  // Round 14: the 620 / 310 km terms' A cos(θ − Φ), A sin(θ − Φ) kept (lw: the arcs' layer shifts, aurora-morph.ts warpParts).
  vec4 lw = vec4(0.0);
  for (int i = 0; i < AU_FOLDS; i++) {
    vec2 cs = sinCosR(AU_FOLD_K[i] * qe + AU_WARP_KAPPA[i] * qn);
    vec2 xy = vec2(u_auFold[i].x * cs.x + u_auFold[i].y * cs.y, u_auFold[i].x * cs.y - u_auFold[i].y * cs.x);
    wf += xy.x;
    if (i == 1) lw.xy = xy; else if (i == 2) lw.zw = xy;
  }
  float dNF = qn - wf - gmF * hn, dEF = qe - gmF * he;
  // Round 16: the shells' samples (x_n − the arcs' origin, x_e, the pre-filters, weight × obliquity × band, place in the
  // layer, red trail), then all shells in one pass over the arcs (aurora-morph.ts zoneSlantMorph, arcSumF3).
  vec3 FXG = vec3(0.0), FXE = vec3(0.0), FSN2 = vec3(0.0), FFA = vec3(0.0), FWB = vec3(0.0), FTOP = vec3(0.0), FRL = vec3(0.0), FRR = vec3(0.0);
${[0,1,2].map(t=>{const e=St[t];return`  if (${t} < AU_NS_F) {
    float h = AU_SHELL_KM[${3+t}], ob = shellObliquity(up, h);
    vec4 x = shellSample(h, f${t}, gmF, ob, hn, he, AU_SHELL_SLAB[${3+t}]);
    float xn = x.x + dNF, fk = AU_FOLD_PRE * x.z, snc = min(AU_ARC_PRECAP, x.w);
    vec2 rd = redTrail(h);
    FXG.${e} = xn - arcV(32); FXE.${e} = x.y + dEF; FSN2.${e} = snc * snc; FFA.${e} = exp(-0.5 * fk * fk);
    FWB.${e} = AU_SHELL_W[${3+t}] * ob * arcBand(xn - arcV(41), lv); FTOP.${e} = AU_SHELL_TOP[${3+t}]; FRL.${e} = rd.x; FRR.${e} = rd.y * exp(-0.5 * AU_RAYID_K2 * x.z * x.z);
  }`}).join(`
`)}
  m.z = arcSumF3(FXG, FXE, FSN2, FFA, FWB, FTOP, FRL, FRR, lw, lv);
  return m;
}
`,Bm=t=>{const e=O=>x(1/O),o=Tf,s=Ff,a=2*Math.PI,n=Or,r=Qf,[i,l,c,u]=gf,[h,f,m]=yf,[p,d,_,v]=pf,[A,g,w,b,T]=_f,[k,R,F]=xf,[S,M,P,L]=vf,C=t?`(1.0 - ${x(P)} * smooth01((${x(S)} - x0) * ${e(M)}) * (1.0 - ${x(L)} * corona)) * `:"";return`
const int AU_LOW_SHEETS = ${t?lf:Ur};
const float AU_LOW_PREFILTER = ${x(t?fs:Sf)};
${I("AU_LOW_TOPLV",cf)}${I("AU_LOW_DK",Df)}${I("AU_LOW_BK",zf)}
// z in [-1, 1] from the byte at bit s of w: its two nibbles summed (aurora-morph.ts zNib).
float zNib(uint w, uint s) { return float(((w >> s) & 15u) + ((w >> (s + 4u)) & 15u)) * ${e(15)} - 1.0; }
float lowP(int i) { return u_auPillar[i >> 1][i & 1]; }
float lowB(int i) { return u_auBundle[i >> 1][i & 1]; }
// The rays' soft knee x/sqrt(1 + x²/κ²), ik2 = 1/κ² (aurora-morph.ts lowKnee).
float lowKnee(float x, float ik2) { return x * inversesqrt(1.0 + x * x * ik2); }
// Curtain-local source; mirrors precipitationProfile in aurora-morph.ts.
float precipitationNoise(float x, float invKm, float period, uint seed) {
  float t = x * invKm, cell = floor(t), f = t - cell;
  uint a = hashU(uint(mod(cell, period)) * 65536u + seed);
  uint b = hashU(uint(mod(cell + 1.0, period)) * 65536u + seed);
  float va = float(a & 255u) * ${x(2/255)} - 1.0, vb = float(b & 255u) * ${x(2/255)} - 1.0;
  float da = float((a >> 8u) & 255u) * ${x(3/255)} - 1.5, db = float((b >> 8u) & 255u) * ${x(3/255)} - 1.5;
  return mix(va, vb, smooth01(f)) + f * (1.0 - f) * ((1.0 - f) * da - f * db);
}
float precipitationFilter(float q) {
  float d = 1.0 + q * q;
  return 1.0 / (d * d);
}
vec3 precipitationProfile(float xs, float h, float sx, float sh, float driftKm, float travelKm,
    float lifePhase, float swingPhase, uint seed, float top, float nozzleKm, float nozzleMix, float shortTail, float threads) {
  float x = xs - travelKm;
  float a = precipitationNoise(x + 19.7, ${e(o[0])}, ${x(Ot/o[0])}, seed + 11u);
  float b = precipitationNoise(x - 51.3, ${e(o[1])}, ${x(Ot/o[1])}, seed + 61u);
  float c = precipitationNoise(x + 6.7, ${e(o[2])}, ${x(Ot/o[2])}, seed + 131u);
  float pa = precipitationFilter(sx * ${x(1.6/o[0])}), pb = precipitationFilter(sx * ${x(1.6/o[1])}), pc = precipitationFilter(sx * ${x(1.6/o[2])});
  float logFlux = ${x(s[0])} * pa * a + ${x(s[1])} * pb * b + ${x(s[2])} * pc * c;
  float missingVar = ${x(s[0]**2)} * (1.0 - pa * pa) + ${x(s[1]**2)} * (1.0 - pb * pb) + ${x(s[2]**2)} * (1.0 - pc * pc);
  float flux = exp(${x(Ln)} * logFlux + ${x(.5*Ln**2*Of)} * missingVar);
  float hardness = smooth01(0.48 + 0.43 * logFlux);
  float dr = h - (176.0 - 36.0 * hardness + 6.0 * b * pb), dp = h - (${x(n+8)} - 16.0 * hardness);
  float nozzle = nozzleKm - ${x(fa[2])} * hardness + ${x(En[0])} * b * pb + ${x(En[1])} * c * pc;
  float tailCut = shortTail * (1.0 - ${x(kf)} * nozzleMix);
  float redUp = (49.0 + 61.0 * smooth01(0.5 + 0.42 * b * pb + 0.28 * logFlux)) * top * (1.0 - ${x(kn[0])} * tailCut);
  float above = max(0.0, dr), below = min(0.0, dr), pBelow = min(0.0, dp), width = 25.0 + 7.0 * hardness;
  float taper = smooth01(above * ${e(105)}), upper = nozzleMix * smooth01((h - nozzle - 14.0) * ${e(58)});
  float fineFoot = precipitationFilter(sx * ${x(1.6/o[3])}), thinFoot = precipitationFilter(sx * ${x(1.6/o[4])});
  float ridge = 0.0, modulation = 0.0, fineGain = 1.0, coverage = 0.0;
  if (fineFoot > 0.003) {
    float u = xs - driftKm + ${x(Nf)} * c, f = precipitationNoise(u + 2.4, ${e(o[3])}, ${x(Ot/o[3])}, seed + 193u);
    float g = thinFoot > 0.003 ? precipitationNoise(u - 1.1, ${e(o[4])}, ${x(Ot/o[4])}, seed + 269u) : 0.0;
    float thin = thinFoot / fineFoot * g;
    float detail = ${x(s[3])} * f + ${x(s[4])} * (1.0 + ${x(Cf)} * upper) * thin;
    float fluxGate = smooth01(0.60 + 0.53 * logFlux);
    float resolved = smooth01((fineFoot - 0.003) * ${e(.018)});
    float gate = (fluxGate + upper * (0.66 - 0.76 * fluxGate)) * resolved;
    modulation = gate * fineFoot;
    ridge = modulation * smooth01((detail + 0.16 - 0.28 * taper) * ${e(1.02)});
    float contrast = ${x(ma[0])} * fineFoot * f + ${x(ma[1])} * thinFoot * g;
    fineGain += ${x(ma[2])} * upper * contrast * inversesqrt(1.0 + contrast * contrast);
    if (threads > 0.0) {
      float fineShare = ${x(At[0])} + ${x(At[1])} * f * inversesqrt(1.0 + f * f);
      float thinShare = ${x(At[2])} + ${x(At[3])} * thin * inversesqrt(0.22 + thin * thin);
      coverage = ${x(At[4])} * fineFoot / (fineFoot + ${x(At[5])}) * fineShare * thinShare * resolved;
    }
  }
  float phase = fract(lifePhase + 0.37 * a + 0.29 * b + float(seed) * ${e(601)});
  float lifeR = smooth01(min(phase - ${x(Gf)}, 1.0 - phase) * ${e($f)});
  float lifeP = smooth01(min(phase, ${x(If)} - phase) * ${e(Bf)});
  float swing = cosR(${x(a)} * (swingPhase + 0.32 * a + float(seed) * ${e(911)}));
  float redShape = exp(-above * above / ((above + 25.0) * redUp) - 0.5 * below * below / (width * width + sh * sh));
  float root = mix(dr + 23.0, h - nozzle, nozzleMix);
  float rootSigma = mix(17.0 + 7.0 * hardness + 5.0 * smooth01(root * ${e(35)}), 14.0 + 4.0 * hardness, nozzleMix);
  float invRootSigma = inversesqrt(rootSigma * rootSigma + sh * sh), zRoot = root * invRootSigma;
  float rootQ2 = zRoot * zRoot, core = exp(-0.5 * rootQ2);
  float wing = 1.0 - smooth01((rootQ2 - ${x(da[0])}) * ${e(da[1]-da[0])});
  float rootProfile = mix(core, fineGain / (1.0 + ${x(Rn[0])} * rootQ2), step(0.0, root) * ${x(Rn[1])} * nozzleMix * wing)
    + ${x(Af)} * nozzleMix * core;
  float redRoot = rootSigma * invRootSigma * rootProfile;
  float rootGate = smooth01((logFlux + 0.22 + 0.50 * b * pb + 0.35 * c * pc) * 0.95);
  float redNozzle = 21.0 * rootGate * smooth01((nozzle - 85.0) * ${e(45)});
  float promptNozzle = (39.0 + 54.0 * smooth01((125.0 - nozzle) * ${e(35)})) * rootGate;
  float promptUp = (36.0 + 14.0 * hardness) * (1.0 - ${x(kn[1])} * tailCut);
  float promptShape = exp(-max(0.0,dp) / promptUp - 0.5 * pBelow * pBelow / (256.0 + sh * sh));
  float decayHeight = max(0.0, h - nozzle - 23.0) * (1.0 - ${x(Lf)} * nozzleMix) / (51.0 + 27.0 * hardness);
  float rayFade = mix(1.0, 1.0 / (1.0 + decayHeight * (1.0 + 0.5 * decayHeight)), nozzleMix);
  float rootLift = 1.0 + 0.32 * nozzleMix * ridge;
  float columnGain = fineGain / (1.0 + ${x(Pf)} * upper * max(0.0, logFlux));
  float stem = ((0.25 - 0.16 * nozzleMix) * (1.0 - 0.8 * modulation) + 1.03 * ridge * rayFade + 0.12 * (1.0 - shortTail)) * columnGain;
  float promptStem = (0.72 - 0.62 * modulation + 1.43 * ridge * rayFade + 0.12 * (1.0 - shortTail)) * columnGain;
  return vec3(flux * vec2((0.74 + 0.26 * lifeR) * (1.0 + 0.07 * swing) * (redRoot * rootLift * mix(0.12 + 1.85 * rootGate, redNozzle, nozzleMix) + redShape * stem),
    (0.61 + 0.39 * lifeP) * (1.0 + 0.21 * swing) * (promptShape * promptStem + nozzleMix * promptNozzle * redRoot * rootLift)), coverage);
}
// The flame waves on curtain s at x_s, height H (aurora-morph.ts flameLow; u_auFold[7].xy, [8].x the clocks, [8].y the window factor).
float flameLow(int s, float xs, float H) {
  float xc = xs * ${e(zn)}, c0 = floor(xc), dl = xc - c0 - 0.5, tp = cosR(${x(Math.PI)} * dl), sum = 0.0;
  for (int i = 0; i < 2; i++) {
    float cf = i == 0 ? c0 : c0 + (dl >= 0.0 ? 1.0 : -1.0), tap = 0.5 + (i == 0 ? 0.5 : -0.5) * tp;
    uint h = hashU(uint(int(cf) & 4095) * 65536u + (9541u + 131u * uint(s)));
    int j = int((h >> 13u) % 3u);
    float x0 = (j == 0 ? u_auFold[7].x : j == 1 ? u_auFold[7].y : u_auFold[8].x) + float((h >> 26u) & 7u) * 0.125, ep = floor(x0), ph = x0 - ep;
    uint hp = hashU(h ^ (uint(ep) * 0x9e3779b1u)), hq = (hp * 0x2c1b3c6du) ^ (hp >> 16u);
    if (float((hq >> 24u) & 255u) >= ${x(256*Dr)}) continue;
    float P = j == 0 ? ${x(dt[0])} : j == 1 ? ${x(dt[1])} : ${x(dt[2])};
    float lam = ${x(zn)} * (1.0 + ${x(Ve[4])} * zNib(hp, 24u));
    float lobe = 0.5 + 0.5 * cosR(${x(a)} * xs / lam + float(hq & 255u) * ${x(a/256)});
    float tau = (ph - ${x(Ir)}) * P - ${x(Br)} * cosR(${x(a/.618)} * xs / lam + float((hq >> 8u) & 255u) * ${x(a/256)});
    float q = (H - ${x(n-r)} - ${x(zr)} * tau) * ${e(r)}, b = max(0.0, 1.0 - q * q);
    sum += tap * (1.0 + ${x(Ve[1])} * zNib(hq, 16u)) * lobe * (0.5 - 0.5 * cosR(${x(a)} * ph)) * b * b;
  }
  return u_auFold[8].y * ${x(ed)} * sum * exp(-max(0.0, H - ${x(n)}) * ${e(Jf)});
}
// Low latitude: (prompt, 557.7, 630.0) along (east, north, up) (aurora-morph.ts lowColumns).
vec3 lowMorph(float east, float north, float up) {
  float a = east * u_auLow.x + north * u_auLow.y, b = east * u_auLow.y - north * u_auLow.x, ru = AU_R * up, ru2 = ru * ru;
  float kLo = lowB(0), kHi = lowB(1), dc0 = a + lowB(2) * up, bb = b * b * ${x(.5/ua)}, ce = AU_R * sqrt(max(0.0, 1.0 - up * up));
  // The diffuse band: each shell's crossing in G0 and its mask (x: E, the green under the band; y: the red).
  vec2 dif = vec2(0.0);
  for (int i = 0; i < 3; i++) {
    if (i < AU_NS_F) {
      float h = AU_SHELL_KM[6 + i], L = (2.0 * AU_R * h + h * h) / (ru + sqrt(ru2 + 2.0 * AU_R * h + h * h)), G = L * dc0 - L * L * bb, c = ce * AU_INV_RH[6 + i];
      float m = smooth01((G - kLo) * ${e(uo[0])} + ${x(gn)}) * smooth01((kHi - G) * ${e(uo[1])} + 0.5);
      if (m > 0.0) dif.y += AU_SHELL_W[6 + i] * inversesqrt(max(1e-6, 1.0 - c * c)) * m;
    }
    if (i < AU_NS_E) {
      float h = AU_SHELL_KM[i], L = (2.0 * AU_R * h + h * h) / (ru + sqrt(ru2 + 2.0 * AU_R * h + h * h)), G = L * dc0 - L * L * bb, c = ce * AU_INV_RH[i];
      float m = smooth01((G - kLo) * ${e(uo[0])} + ${x(gn)}) * smooth01((kHi - G) * ${e(uo[1])} + 0.5);
      if (m > 0.0) dif.x += AU_SHELL_W[i] * inversesqrt(max(1e-6, 1.0 - c * c)) * m;
    }
  }
  int lv = int(arcV(11) + 0.5);
  vec3 m = vec3(0.0), masked = vec3(0.0);
  float x0 = lowB(3);
  float nozzleMix = lv == 1 ? smooth01((x0 - ${x(i)}) * ${e(l-i)}) * smooth01((${x(u)} - x0) * ${e(u-c)}) : 0.0;
  float nozzleKm = ${x(fa[0])} + ${x(fa[1])} * (clamp(x0, ${x(l)}, ${x(c)}) - ${x(l)})
    - ${x(Sn[1])} * max(0.0, min(${x(c)}, x0) - ${x(Sn[0])})
    - ${x(m)} * smooth01((${x(h)} - x0) * ${e(f)});
  float farRedKnee = mix(${x(Fn[0])}, ${x(Tn[0])}, nozzleMix);
  float farFootKnee = mix(${x(Fn[1])}, ${x(Tn[1])}, nozzleMix);
  float corona = lowB(5);
  float nearWidth = (1.0 - ${x(b)} * corona) * smooth01((${x(A)} - x0) * ${e(g)});
  float rayPrefilter = AU_LOW_PREFILTER * (1.0 + ${x(w)} * nearWidth);
  float softFoot = ${x(T)} * nearWidth;
  float rayAngular = inversesqrt(max(0.05, 1.0 - b * b));
  float top = AU_LOW_TOPLV[lv], side = b + ${x(An)} * up, side2 = side * side * ${x(.5/ua)};
  for (int s = 0; s < AU_LOW_SHEETS; s++) {
    float K = lowB(6 + 3 * s), c = lowB(7 + 3 * s), w = lowB(8 + 3 * s), D = a + c * up, disc = D * D - 4.0 * side2 * K;
    if (!(disc > 0.0)) continue;
    float sq = sqrt(disc), sum = D + sq;
    float near = K > 0.0 && sum > 0.0 ? 2.0 * K / sum : 0.0;
    float far = K < 0.0 && D < 0.0 ? 2.0 * K / (D - sq)
      : sum > 0.0 && sum < side2 * ${x(2*bn)} ? sum / (2.0 * side2) : 0.0;
    float slant = inversesqrt(disc + ${x(df**2)}), grazingFade = smooth01(disc * ${e(Mn**2)}), grazing = grazingFade * slant;
    float thickness = ${x(mf)} * slant;
    float threads = corona * smooth01(-K * ${e(p)}) * grazingFade;
    float transverseThickness = thickness * (1.0 - ${x(d)} * threads);
    float sheetAngular = abs(side) / max(sq, ${x(Mn)});
    int id = ${t?"2 * s":"s"};
    for (int crossing = 0; crossing < 2; crossing++) {
      float L = crossing == 0 ? near : far;
      if (!(L > 0.0 && L < ${x(bn)})) continue;
      float l2 = L * L + 2.0 * AU_R * L * up, H = l2 / (sqrt(l2 + AU_R * AU_R) + AU_R);
      if (!(H > ${x(yn)} && H < ${x(Lo)})) continue;
      float xs = L * side, bSlope = xs * ${e(ua)}, cSlope = c - ${x(An)} * bSlope;
      float gn = sqrt(1.0 + cSlope * cSlope + bSlope * bSlope);
      float edge = smooth01((H - ${x(yn)}) * ${e(uf)}) * smooth01((${x(Lo)} - H) * ${e(hf)});
      float ob = grazing * edge * gn, pitch = L * AU_LOW_PREFILTER;
      float angular = L * rayPrefilter * (rayAngular + sheetAngular * gn);
      float sx = length(vec3(angular, side * transverseThickness, softFoot)), sh = length(vec2(pitch, (ru + L) / (AU_R + H) * thickness));
      vec3 rays = precipitationProfile(xs, H, sx, sh, AU_LOW_DK[id] * lowP(0), AU_LOW_BK[id] * lowP(2),
        lowP(4), lowP(6), 1347u + 977u * uint(id), top, nozzleKm, nozzleMix, 1.0 - corona, threads);
      float nearCore = 1.0 - ${x(F)} * corona * smooth01((${x(k)} - L) * ${e(R)});
      float weight = w * nearCore;
      float covered = weight * (1.0 - ${x(1-_)} * threads * (1.0 - rays.z));
      float close = smooth01((${x(Mf)} - L) * ${e(Ef)});
      float redKnee = mix(farRedKnee, ${x(Nn[0])}, close), footKnee = mix(farFootKnee, ${x(Nn[1])}, close);
      float red = lowKnee(ob * ${x(bf)} * u_auLow.w * rays.x, 1.0 / (redKnee * redKnee));
      float prompt = lowKnee(ob * ${x(wf)} * u_auLow.w * rays.y, 1.0 / (footKnee * footKnee));
      float fl = u_auFold[8].y > 0.0 && H < ${x(td)} ? flameLow(id, xs, H) : 0.0;
      vec3 column = vec3(prompt * (1.0 + fl * vec2(1.0, AU_PULSE_GREEN)), red);
      m += covered * column;
      if (threads > 0.0) masked += (weight - covered) * column;
    }
  }
  if (corona > 0.0) {
    vec3 q = (m + masked) * vec3(${e(ha[1])}, ${e(ha[1])}, ${e(ha[0])});
    m *= mix(vec3(1.0), inversesqrt(vec3(1.0) + q * q), corona);
  }
  float diffuseGain = mix(1.0, ${x(Uf)}, nozzleMix) * (1.0 - ${x(v)} * corona * smooth01(-a * ${e(.6)}));
  return ${C}m + diffuseGain * vec3(${x(wn)} * dif.x, ${x(wn)} * dif.x, ${x(ff)} * dif.y);
}
// Close to the horizon the extinction table is steep. This polynomial is asin(up) through up^7;
// its truncation error below 0.25 is much smaller than the D3D11 built-in's error there.
float lowExtinctionIndex(float up) {
  if (up >= 0.25) return hzX(up);
  float q = up * up;
  float elevation = up * (1.0 + q * (0.1666666667 + q * (0.075 + q * 0.04464285714)));
  return sqrt(elevation * 0.63661977) * float(u_hzNodes - 1);
}
`},Gm=t=>`
float auExt(int c, float x) {
  if (u_auExtOn == 0) return 1.0;
  int i0 = int(floor(x)), i1 = min(i0 + 1, u_hzNodes - 1);
  return mix(texelFetch(u_auExt, ivec2(i0, c), 0).r, texelFetch(u_auExt, ivec2(i1, c), 0).r, x - float(i0));
}
void main() {
  vec4 cd = cellDir(ivec2(gl_FragCoord.xy));
  if (cd.w == 0.0 || u_hzOn == 0) { o = vec4(0.0); return; }
  vec3 d = cd.xyz;
  float up = dot(d, u_zenith);
  if (!(up > 0.0)) { o = vec4(0.0); return; }
  if (up < u_hzEdgeMax) { if (up < hzEdge(d)) { o = vec4(0.0); return; } }
  float east = dot(d, u_hzEast), north = dot(d, u_hzNorth);
  vec3 m = ${t==="zone"?"zoneMorph":"lowMorph"}(east, north, up);
  float x = ${t==="zone"?"hzX(up)":"lowExtinctionIndex(up)"}, v = 0.0;
  for (int c = 0; c < 5; c++) {
    int k = u_auClass[c];
    v += u_auRate[c] * (k == 0 ? m.x : k == 1 ? m.y : m.z) * auExt(c, x);
  }
  if (u_cloudMode != 0) {
    float tn = cloudTauN(d);
    if (tn > 0.0) v *= min(u_auRatioCap, exp(min(tn, 80.0)) / (1.0 + u_cloudTau.y * tn));
  }
  o = vec4(v, 0.0, 0.0, 0.0);
}
`,Bo=(t,e,o,s)=>Je("STAR_SKY")+Oe+Io+Qr+xs+Cm(o)+Dm(t,e)+(s==="zone"?Im():Bm(o))+Gm(s);Bo(Cr,ds,!1,"zone");Bo(Cr,ds,!1,"low");Bo(Zr,jr,!0,"zone");Bo(Zr,jr,!0,"low");Je("STAR_SKY")+Oe+Io+Qr+xs+`
uniform sampler2D u_rate;
uniform sampler2D u_rateSky;
uniform sampler2D u_meanMap;
uniform sampler2D u_halo;
uniform int u_hlBackground;
uniform vec4 u_haloGrid;
uniform sampler2D u_light;
uniform float u_lightScale;
uniform float u_cloudCity;
uniform vec4 u_cloudMoon;
uniform float u_cloudG;
uniform vec2 u_cloudShift;
out vec4 o;
// Cubic B-spline weights at fraction f (texels i − 1 .. i + 2).
vec4 bspline(float f) {
  float f2 = f * f, f3 = f2 * f, g = 1.0 - f;
  return vec4(g * g * g, 3.0 * f3 - 6.0 * f2 + 4.0, -3.0 * f3 + 3.0 * f2 + 3.0 * f + 1.0, f3) / 6.0;
}
// The halo grid at cell c: a cubic B-spline over the texel centres (4 × 4 texels, clamped to the grid; bilinear left the
// coarse texels' steps visible at a bright halo's edge), transient-reference.ts cloudHaloAt.
float haloAt(vec2 c) {
  ivec2 n = textureSize(u_halo, 0);
  vec2 u = (c - u_haloGrid.xy) / u_haloGrid.z, f0 = floor(u), f = u - f0;
  vec4 wx = bspline(f.x), wy = bspline(f.y);
  ivec2 i0 = ivec2(f0) - 1;
  float s = 0.0;
  for (int j = 0; j < 4; j++) {
    float row = 0.0;
    for (int i = 0; i < 4; i++) row += wx[i] * texelFetch(u_halo, clamp(i0 + ivec2(i, j), ivec2(0), n - 1), 0).r;
    s += wy[j] * row;
  }
  return s;
}
// Henyey-Greenstein (4 pi normalised) at cos(angle) c, the angle at least 2 degrees (transient-meter.ts moonCloudRatio).
float hg(float c) {
  float g = u_cloudG, k = min(c, ${x(Math.cos(2*Math.PI/180))});
  return (1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * k, 1.5);
}
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  // The hand-held view's whole-cell shift k: the sample reads this map at p + k, so the cell shown at d = p − k is this one:
  // its rate and stars are the map's own (p), its per-frame light, its direction (the cloud, the Moon, the field angle)
  // are the shown cell's (d). k = 0 is d = p, the unshifted composite.
  ivec2 d = p - ivec2(u_cloudShift);
  vec2 rv = texelFetch(u_rate, p, 0).rg;
  float sky = texelFetch(u_rateSky, p, 0).r;
  vec4 mean = texelFetch(u_meanMap, ivec2(0), 0);
  float veil = mean.g > 0.0 ? max(0.0, mean.r) / mean.g : 0.0;
  ivec2 ts = textureSize(u_light, 0);
  bool inside = d.x >= 0 && d.y >= 0 && d.x < ts.x && d.y < ts.y;
  float light = u_lightScale > 0.0 && inside ? texelFetch(u_light, d, 0).r * u_lightScale : 0.0;
  float halo = u_lightScale > 0.0 && u_haloGrid.w > 0.0 ? haloAt(vec2(d)) * u_lightScale : 0.0;
  vec4 cd = cellDir(d);
  float tn = cd.w > 0.0 ? cloudTauN(cd.xyz) : 0.0;
  float tTot = 1.0 / (1.0 + u_cloudTau.y * tn), tDir = exp(-tn);
  float moon = u_cloudMoon.w > 0.0 && tn > 0.0 ? u_cloudMoon.w * tn * hg(dot(cd.xyz, u_cloudMoon.xyz)) : 0.0;
  // The layer's own light reaches the cathode through the optics as the sky's does: the LUT's sky row at the cell's field
  // angle over the axis's (vignetting, the filter's angle shift, a field stop).
  float sky0 = lutAt(1, 0.0).x, off = sky0 > 0.0 ? max(0.0, lutAt(1, atanP(length(u_originMm + vec2(d) * u_pitchMm), u_focalMm)).x) / sky0 : 1.0;
  float r = (rv.r + light) * tDir + (tTot - tDir) * (sky + rv.g * off * (veil + halo)) + rv.g * off * ((1.0 - tTot) * u_cloudCity + moon);
  // B: the direct beam for meteor heads. A: diffuse sky for the classic eye display, or the underlying cloud
  // background for the tube's meteor highlight (including atmospheric scatter, excluding the direct meteor).
  float eyeSky = rv.g > 1e-6 ? sky * tTot / rv.g + off * ((1.0 - tTot) * u_cloudCity + moon) : 0.0;
  float background = rv.g * (eyeSky + (tTot - tDir) * off * (veil + halo));
  o = vec4(r, rv.g, tDir, u_hlBackground == 1 ? background : eyeSky);
}
`;Je("SKY_DIRECT")+Oe+Io+"";const mt=8,$t=256;function oi(){return He.map(t=>ad(t))}function Va(t){const e=[];for(let o=0;o<t.length;o++)(t[o]===0||t[o]===1)&&e.push(o);if(e.length>4)throw new RangeError("zoneMeterChannels: more than four main-curtain components");return e}function Za(t){for(let e=0;e<t.length;e++)if(t[e]===2)return e;return-1}function $m(t,e,o){const s=Math.PI/180,a=Math.tan(Math.min(80,Math.max(.01,t))*s),n=mt,r=o??Math.min($t,Math.max(4*n,Math.ceil(2*a/Math.tan(Math.max(.001,e)*s)/n)*n));if(r%n||r>$t)throw new RangeError(`zoneMeterGrid: side ${r} not a multiple of ${n} up to ${$t}`);let i=0;for(let l=0;l<r;l++)for(let c=0;c<r;c++)vs(c,l,r)&&i++;return{n:r,tanR:a,count:i}}const vs=(t,e,o)=>{const s=2*t+1-o,a=2*e+1-o;return s*s+a*a<=o*o};function ja(t){const e=Math.hypot(t[0],t[1],t[2]),o=[t[0]/e,t[1]/e,t[2]/e];let s=o[1],a=-o[0];const n=Math.hypot(s,a);return n<1e-6?(s=1,a=0):(s/=n,a/=n),{F:o,R:[s,a,0],U:[a*o[2],-s*o[2],s*o[1]-a*o[0]]}}function Wm(t,e,o,s,a){if(!vs(s,a,e))return null;const n=(2*s+1-e)/e,r=(2*a+1-e)/e,{F:i,R:l,U:c}=t,u=[0,1,2].map(f=>i[f]+o*(n*l[f]+r*c[f])),h=Math.hypot(u[0],u[1],u[2]);return{d:u.map(f=>f/h),angle:Math.atan(o*Math.hypot(n,r))}}function ai(t,e,o,s){const a=He.length,n=new Float64Array(a),r=new Float64Array(a),i=(f,m,p)=>f<0||m<0||f>=e||m>=e?0:t[4*(m*e+f)+p];let l=0,c=-1,u=-1,h=-1;for(let f=0;f<e;f++)for(let m=0;m<e;m++){if(!vs(m,f,e))continue;l++;for(let d=0;d<o.length;d++)n[o[d]]=n[o[d]]+i(m,f,d);let p=0;for(let d=0;d<o.length;d++){let _=0;for(let v=-1;v<=1;v++)for(let A=-1;A<=1;A++)_+=i(m+A,f+v,d);p+=s[d]*_/9}p>c&&(c=p,u=m,h=f)}if(u>=0)for(let f=0;f<o.length;f++){let m=0;for(let p=-1;p<=1;p++)for(let d=-1;d<=1;d++)m+=i(u+d,h+p,f);r[o[f]]=m/9}return{sums:n,count:l,box:r,boxTotal:Math.max(0,c)}}function si(t){if(!t.length)return null;const e=He.length,o=new Float64Array(e),s=new Float64Array(e);let a=0;for(const n of t){const r=n.A??n.B,i=n.B??n.A;if(!r||!i){a++;continue}const l=Math.min(1,Math.max(0,n.alpha)),c=Math.max(0,n.share);for(let u=0;u<e;u++){const h=r.count?r.sums[u]/r.count:0,f=i.count?i.sums[u]/i.count:0;o[u]=o[u]+c*((1-l)*h+l*f),s[u]=s[u]+c*((1-l)*r.box[u]+l*i.box[u])}}return{means:o,box:s,pending:a}}const Hm=(t,e)=>He.map(o=>e[o]>0?t[o]*e[o]:0);function ni(t,e,o,s,a){Hm(t,e);let n=0,r=0;s&&He.forEach((l,c)=>{(o[c]===0||o[c]===1||o[c]===2)&&(n+=t[l]*s.means[c],r+=t[l]*s.box[c])});const i=Km();return{mean:n+i.mean,peak:r+i.peak}}function Km(t,e,o){return{mean:0,peak:0}}const Jr=(90-Oi)*Math.PI/180,Qa=Math.cos(Jr),Ja=Math.sin(Jr),ii=4,qm=[[[0,1,0],[1,0,0],[0,0,1]],[[1,0,0],[0,-1,0],[0,0,1]],[[0,-1,0],[-1,0,0],[0,0,1]],[[-1,0,0],[0,1,0],[0,0,1]],[[0,0,1],[1,0,0],[0,1,0]]];function el(t,e=2){const o=e/2,s=Math.max(8,Math.round(1/(o*Math.tan(t*Math.PI/180)))*o),a=2*(s+ii),n=(s+ii)/s;return qm.map(([r,i,l])=>({f:[...r],r:[...i],up:[...l],tanH:n,size:a}))}function Xm(t,e){const o=([s,a,n])=>[s,Qa*a-Ja*n,Ja*a+Qa*n];return el(t,e).map(s=>({...s,f:o(s.f),r:o(s.r),up:o(s.up)}))}function Ym(t,e){return t<4?{x0:t%2*2*e,y0:t<2?0:e/2,w:2*e,h:e/2}:{x0:4*e,y0:0,w:e,h:e}}function Vm(t,e,o){const s=t===1||t===3;return{x0:(t+ +(t>1)+ +(t>3))*o,y0:e,w:s?2*o:o,h:o}}const tl=.06,Zm=8,jm=2,yo=(t,e)=>t[0]*e[0]+t[1]*e[1]+t[2]*e[2],ol=(t,e)=>[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]],Ra=t=>{const e=Math.hypot(t[0],t[1],t[2])||1;return[t[0]/e,t[1]/e,t[2]/e]};function Qm(t){const e={axis:[0,0,1],rate:0};if(t.length<2)return e;const o=t[0],s=t[t.length-1],a=(s.t-o.t)/1e3;if(!(a>.001))return e;const n=ol(o.d,s.d),r=Math.hypot(n[0],n[1],n[2]),i=Math.atan2(r,yo(o.d,s.d))*180/Math.PI;return r>1e-9?{axis:[n[0]/r,n[1]/r,n[2]/r],rate:i/a}:e}function Sa(t,e){const o=yo(e,t.f);if(!(o>.001))return 0;const s=Math.max(Math.abs(yo(e,t.r)/(o*t.tanH)),Math.abs(yo(e,t.up)/(o*t.tanH)));if(s>1)return 0;const a=Math.min(1,Math.max(0,(1-s)/tl));return Math.max(1e-6,a*a*(3-2*a))}const al=(t,e)=>Math.min(1,Math.max(0,t*Math.max(1,e)/Math.min(Zm,Math.max(1,e))));function Jm(t,e,o,s,a){if(t>=1&&e>=1)return{a:1-s,b:s,c:0};const n=t*(1-s),r=e*(a+(s-a)*t);return{a:n,b:r,c:Math.max(0,1-n-r)*o}}function ri(t,e,o,s,a,n,r,i=25,l=1){const c=Ra(t),u=Math.hypot(c[0],c[1])>1e-6?Ra([c[1],-c[0],0]):[1,0,0],h=ol(u,c),f=Math.tan(e),m=al(n,r),p={n:0,nA:0,nB:0,nC:0,sA:0,sB:0,sC:0,none:0,fallbackOnly:0,shown:0};for(let _=0;_<i;_++)for(let v=0;v<i;v++){const A=(2*v+1-i)/i,g=(2*_+1-i)/i;if(A*A+g*g>1)continue;const w=Ra([c[0]+f*(A*u[0]+g*h[0]),c[1]+f*(A*u[1]+g*h[1]),c[2]+f*(A*u[2]+g*h[2])]),b=o?Sa(o,w):0,T=s?Sa(s,w):0,k=a==="cube"?1:a?Sa(a,w):0,R=Jm(b,T,0,n,m),F=R.a*l,S=R.b*l,M={a:F,b:S,c:Math.max(0,1-F-S)*k};p.n++,b>0&&p.nA++,T>0&&p.nB++,k>0&&p.nC++,p.sA+=M.a,p.sB+=M.b,p.sC+=M.c,b<=0&&T<=0&&k<=0?p.none++:b<=0&&T<=0&&p.fallbackOnly++,p.shown+=M.a+M.b+M.c}const d=Math.max(1,p.n);return p.none/=d,p.fallbackOnly/=d,p.shown/=d,p}const pe=t=>{const e=String(t);return/[.eE]/.test(e)?e:e+".0"},es=[];for(const t of[-1,1])for(const e of[-1,1])for(const o of[-1,1])es.push(`c ${t<0?"-":"+"} A ${e<0?"-":"+"} E ${o<0?"-":"+"} N`);const Ta=["rPL0","rPL1","rPF00","rPF01","rPF10","rPF11"],Fa=["rGL0","rGL1","rGF00","rGF01","rGF10","rGF11"],e1=["wl0","wl1","wf00","wf01","wf10","wf11"],yt=(t,e)=>t.map((o,s)=>`${e1[s]} * cf(${o}, ${e}.0, yy)`).join(" + "),t1=ce+`out vec4 o; void main() { o = vec4(0.0); }
`,o1=ce+`
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
const float RE = ${pe(fe)}, REFH = ${pe(Eo)}, COTD = ${Et}, HLO = ${pe($e)}, NCH = ${pe(J)}, TWO_PI = 6.283185307179586;
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
  vP0 = ${yt(Ta,0)};
  vG0 = ${yt(Fa,0)};
  if (info.y > 1.5) {
    vP1 = ${yt(Ta,1)};
    vG1 = ${yt(Fa,1)};
  }
  if (info.y > 2.5) {
    vP2 = ${yt(Ta,2)};
    vG2 = ${yt(Fa,2)};
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
${es.map((t,e)=>`  vec3 p${e} = pj(${t});`).join(`
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
${es.map((t,e)=>`  vec4 o${e} = outs(${t});`).join(`
`)}
  vec4 om = min(min(min(o0, o1), min(o2, o3)), min(min(o4, o5), min(o6, o7)));
  if (max(max(om.x, om.y), max(om.z, om.w)) > 0.0) mode = 2.0;
  vQa = vec4(lo, hi); vQb = vec4(dr, info.y, mode);
}
`,Zt=["vRx","vRy","vAn","vP0","vP1","vP2","vG0","vG1","vG2","vQa","vQb","vW0","vW1"],lt=Zt.length*4,li=ce+`
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
`,sl=t=>ce+`
uniform vec3 uF, uR, uU;
uniform vec2 uRasterSize;
uniform float uTanH, uOff, uYOff, uBW, uN, uCut2, uSwapXY;
uniform sampler2D uTab;${t?`
uniform sampler2D uWindowMass;`:""}
uniform vec4 uTabD;
uniform float uTexH;
uniform float uPInv;
flat in vec4 vRx, vRy, vAn, vP0, vP1, vP2, vG0, vG1, vG2, vW0, vW1;
flat in float vCh;
out vec4 oCol;
const float RE = ${pe(fe)}, SQ_PI_2 = 1.2533141373155003, NZF = ${Ao.toFixed(1)}, ZST = ${za}, POCT = ${Zi.toFixed(1)}, SMAX = ${(Be-1).toFixed(1)};
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
  ${t?`float k = sqrt(k2), lk = log2(1.0 + k), g = exp(-0.5 * d2), x;
  bool inside = !(k2 > 1e-20) || (mr > 0.0 && mr < 1.0);
  float sx;
  if (inside) {
    x = m * uN;
    sx = min(m, 1.0-m) * max(2.0,k);
  } else {
    sx = abs(dot(C,V)) / k;
    x = (mr <= 0.0 ? uN + 1.0 : uN + 2.0 + NZF) + min(NZF, sx / ZST);
  }
  vec2 uv = (vec2(0.5) + vec2(${(Ht-1).toFixed(1)}, ${(Kt-1).toFixed(1)})
    * min(vec2(1.0), vec2(sx/${ji.toFixed(1)},lk/${Qi.toFixed(1)})))
    / vec2(${Ht.toFixed(1)}, ${Kt.toFixed(1)});
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
`,ci=sl(!1),a1=sl(!0),nl=t=>`
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
  ${t?`vec3 step = 2.0*(c-b), lo = min(step,vec3(0.0)), hi = max(step,vec3(0.0));
  vec3 m0=clamp(0.5*(c-a),lo,hi), m1=clamp(0.5*(d-b),lo,hi);`:`vec3 step = c-b, dir = sign(step), limit = 2.0*abs(step);
  vec3 m0 = dir*clamp(0.5*(c-a)*dir, vec3(0.0), limit);
  vec3 m1 = dir*clamp(0.5*(d-b)*dir, vec3(0.0), limit);`}
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
  float r = clamp((1.0 - m) * ${pe(1/tl)}, 0.0, 1.0);
  return max(1e-6, r * r * (3.0 - 2.0 * r));
}
// Task BH (zone-curtain-gl.md §AJ): the wide map — the observer's cube in east / north / up, five gnomonic faces side by
// side in one target (sim/zone-curtain/wide.ts: 0 north, 1 east, 2 south, 3 west, 4 zenith; face k's tile from column k·n),
// T = (tan of a face's half side with its edge texels, n). The face is the direction's largest axis (below the horizon a
// side face, read clamped: nothing is drawn there). gS as samp's; it covers every direction (1).
vec3 cubeCoords(vec3 d, vec2 T) {
  if (uAtlasFilter > 0.5) {
    const float c = ${pe(Qa)}, s = ${pe(Ja)};
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
`,gs=nl(!1),il=gs+`uniform vec3 aF, aR, aU, bF, bR, bU;
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
`,s1=ce+`
uniform vec3 uF, uR, uU;
uniform float uTanH, uSize;
out vec4 o;
`+il+`
void main() {
  float px = (2.0 * gl_FragCoord.x / uSize - 1.0) * uTanH, py = (2.0 * gl_FragCoord.y / uSize - 1.0) * uTanH;
  o = mapsAt(normalize(uF + px * uR + py * uU));
}
`,rl=(t,e)=>Je("STAR_SKY")+Oe+Io+xs+`
uniform float uRate[5];
uniform int uClass[5];
uniform sampler2D u_auExt;
uniform int u_auExtOn;
uniform float u_auRatioCap;
out vec4 o;
`+t+`
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
`,ui=rl(il,`float x = hzX(up), v = 0.0;
  for (int c = 0; c < 5; c++) {
    int k = uClass[c];
    v += uRate[c] * (k == 0 ? m.x : k == 1 ? m.y : m.z) * auExt(c, x);
  }`),n1=rl(nl(!0)+`
uniform vec2 cT;
uniform sampler2D cC, dC;
uniform float uAlphaW, uKC;
uniform vec3 uLight[${We}];
vec4 mapsAt(vec3 d) {
  return vec4(uKC * atlasPair(cubeCoords(d, cT), cT, cC, cC, dC, dC, uAlphaW), 1.0);
}
`,`float x = hzX(up);
  int i = int(floor(x));
  float v = dot(m.xyz, mix(uLight[i], uLight[min(i + 1, ${We-1})], x - float(i)));`),i1=ce+`
uniform vec3 uF, uR, uU;
uniform vec2 uRasterSize;
uniform float uTanH, uOff, uYOff, uSwapXY;
uniform sampler2D uLine;
uniform vec2 uObs;
out vec4 oCol;
const float RE = ${pe(fe)}, REFH = ${pe(Eo)}, COTD = ${Et}, X0 = ${pe(-720)}, DXL = ${pe(ae.DX)}, FMAX = ${pe(Gt-1.001)}, SIGN = ${pe(ae.SIG_N)};
const float NORM = ${pe(1/(Math.sqrt(2*Math.PI)*ae.SIG_N*ae.NSEG))};
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
${Oc().mid.map(t=>`  I += redAt(${pe(t)});`).join(`
`)}
  oCol = vec4(0.0, 0.0, I * NORM, 0.0);
}
`,r1=`
uniform sampler2D u_auExt;
uniform int u_auExtOn;
float auExt(int c, float x) {
  if (u_auExtOn == 0) return 1.0;
  int i0 = int(floor(x)), i1 = min(i0 + 1, u_hzNodes - 1);
  return mix(texelFetch(u_auExt, ivec2(i0, c), 0).r, texelFetch(u_auExt, ivec2(i1, c), 0).r, x - float(i0));
}
`,l1=Je("STAR_SKY")+Oe+`
uniform vec3 uMF, uMR, uMU;
uniform float uTanR, uN;
uniform vec3 mF, mR, mU;
uniform vec2 mT;
uniform float mCube;
uniform sampler2D mC, mE;
uniform int uComp[4], uCls[4];
uniform float uK[4];
out vec4 o;
`+r1+gs+`
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
`,c1=ce+`
uniform sampler2D uS;
uniform float uN;
uniform vec4 uW;
out vec4 o;
vec4 at(ivec2 q, int n) { return q.x < 0 || q.y < 0 || q.x >= n || q.y >= n ? vec4(0.0) : texelFetch(uS, q, 0); }
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  int blk = p.x / 3, kind = p.x - 3 * blk, n = int(uN);
  ivec2 b0 = ivec2(blk, p.y) * ${mt};
  vec4 s = vec4(0.0), bb = vec4(0.0);
  float best = -1.0, cnt = 0.0;
  for (int j = 0; j < ${mt}; j++) for (int i = 0; i < ${mt}; i++) {
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
`,u1=ce+gs+`
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
`,h1=ce+`
uniform sampler2D uB;
uniform int uNB, uOff;
out vec4 o;
void main() {
  int kind = int(gl_FragCoord.x) - uOff;
  vec4 s = vec4(0.0), bb = vec4(0.0);
  float best = -1.0, cnt = 0.0;
  for (int j = 0; j < ${$t/mt}; j++) {
    if (j >= uNB) break;
    for (int i = 0; i < ${$t/mt}; i++) {
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
`;1+Zt.length;const f1=t=>t?"rgba32f":"rgba16f",hi=.5,d1=8,m1=t=>Math.min(Math.max(0,t),hi/d1)/hi;function p1(t){const e=Gu("auroral-zone",t);return He.map(o=>e[o])}function _1(t,e,o,s){t.fill(0);for(let a=0;a<e.length;a++){const n=o[a],r=e[a];for(let i=0;i<We;i++){const l=3*i+n;t[l]=t[l]+r*(s?s[a*We+i]:1)}}}function Na(t,e,o,s,a,n=1){const r=t.length,i=new Float32Array(r),l=new Float32Array(r),c=Math.min(1,Math.max(0,a));for(let u=0;u<r;u++){const h=e[u]===0||e[u]===1||e[u]===2,f=o[u];i[u]=h&&f>0?t[u]*(s/f)*c*n:0,l[u]=h?t[u]*(1-c):t[u]}return{map:i,coarse:l}}const x1=t=>[(-t*t*t+2*t*t-t)/2,(3*t*t*t-5*t*t+2)/2,(-3*t*t*t+4*t*t+t)/2,(t*t*t-t*t)/2],fi=(t,e)=>({w:t==="linear"?[0,1-e,e,0]:x1(e),u2:e,wc:t==="cubicw"?1:0});function v1(t,e,o,s){const a=Math.PI/180,n=t*a,r=e*a,i=[Math.sin(n)*Math.cos(r),Math.cos(n)*Math.cos(r),Math.sin(r)],l=[Math.cos(n),-Math.sin(n),0],c=[i[1]*l[2]-i[2]*l[1],i[2]*l[0]-i[0]*l[2],i[0]*l[1]-i[1]*l[0]].map(h=>-h),u=c[2]<0?c.map(h=>-h):c;return{f:i,r:l,up:u,tanH:Math.tan(.5*o*a),size:s}}function di(t,e,o,s,a=5,n=1){const r=Math.PI/180,i=Math.tan(.5*o*r),l=Math.min(80,.5*o+a),c=Math.tan(l*r),u=2*Math.max(2,Math.round(.5*s*n*c/i));return v1(t,e,2*l,u)}class g1{clock=null;shown=null;advance(e,o,s,a){const n=this.clock;this.clock=e,s!==null&&(this.shown??=o??s,!(n===null||e<=n||o===null)&&(this.shown=Math.min(s,this.shown+(s-o)/Math.max(1,a))))}alpha(e,o){return o>e&&this.shown!==null?Math.min(1,Math.max(0,(this.shown-e)/(o-e))):0}mayRotate(e){return e===null||this.shown!==null&&this.shown>=e-1e-8}}function A1(t,e,o,s,a){const n=t+2*e,r=a===null?n:Math.max(a+e/4,Math.min(a+2*e,n)),i=Math.max(o,r);return a!==null&&Math.min(s,i)<=a+1e-8?null:i}const ll=[8,12,16,24],mi=2.6,y1=.75,pi=3,b1=16,w1=6,M1=40,_i=55,E1=40,xi=(t=ll[0])=>({n:t,down:0,changes:0});function vi(t){if(t.length<w1)return null;const e=[...t].sort((o,s)=>o-s);return e[e.length>>1]}function R1(t,e,o){const s=ll,a=s.indexOf(t.n);if(a<0||e===null)return t;const n=c=>({n:c,down:0,changes:t.changes+(c!==t.n?1:0)});if(e!==void 0){const c=f=>s.find(m=>e/m<=f)??s[s.length-1],u=c(mi),h=c(mi*y1);return u>t.n?n(u):h<t.n?t.down+1>=pi?n(s[a-1]):{...t,down:t.down+1}:t.down?{...t,down:0}:t}if(o>1/M1&&a<s.length-1)return{...n(s[a+1]),cool:E1};const r=t.cool??0,i=Math.max(0,r-1),l=c=>r?{...c,cool:i}:c;return r>0&&o<1/_i?{...t,down:0,cool:i}:o<1/_i&&a>0?t.down+1>=pi?n(s[a-1]):l({...t,down:t.down+1}):t.down||r?l({...t,down:0}):t}const S1=12,T1=1.6,F1=.25,N1=.3,k1=.22,L1=1.5;function bo(t,e){const o=t.axis[0]*e.axis[0]+t.axis[1]*e.axis[1]+t.axis[2]*e.axis[2],s=Math.min(t.radiusDeg,e.radiusDeg),a=.15*s*Math.PI/180;return o>=Math.cos(a)&&Math.abs(t.radiusDeg-e.radiusDeg)<.05*s}function C1(t,e,o){return t?bo(t,e)?t:{...e,fastUntil:o+L1}:{...e,fastUntil:-1/0}}const cl=Math.LN2/.4;function P1(t,e,o,s,a=S1,n=T1){const r=Math.max(0,s-t.t),i=-Math.expm1(-r/a),l=Math.exp(-r/F1),c=Math.exp(cl*r),u=(h,f)=>{if(!(f>0)||!(h>0))return Math.max(0,f);const m=h+i*(f-h),p=f*n,d=f/n,_=m>p?p+(m-p)*l:m<d?d-(d-m)*l:m;return Math.min(h*c,Math.max(h/c,_))};return{t:s,mean:u(t.mean,e),peak:u(t.peak,o)}}function U1(t,e,o,s,a=k1){const n=Math.max(0,s-t.t),r=-Math.expm1(-n/a),i=Math.exp(cl*n),l=(c,u)=>{const h=.5*u,f=c+r*(u-c);return Math.min((c+h)*i-h,Math.max((c+h)/i-h,f))};return{t:s,mean:l(t.mean,e),peak:l(t.peak,o)}}const gi=.05,O1=32,Ai=.12,D1=.2;function z1(t,e,o,s){if(!t||o<t.t||o-t.t>2)return{t:o,target:e,shown:e};const a=o-t.t;if(!s)return{t:o,target:e,shown:e+(t.shown-t.target)*Math.exp(-a/D1)};const n=Math.min(e+gi,Math.max(e-gi,t.shown)),r=t.shown-Math.expm1(-a/O1)*(n-t.shown),i=Math.min(e+Ai,Math.max(e-Ai,r));return{t:o,target:e,shown:i}}const Wt=(t,e)=>t[0]*e[0]+t[1]*e[1]+t[2]*e[2];function I1(t,e){let o=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([a,n])=>t.f.map((r,i)=>r+t.tanH*(a*t.r[i]+n*t.up[i])));const s=[[0,0,1],...[e.r,e.up].flatMap(a=>[-1,1].map(n=>e.f.map((r,i)=>r+n*a[i])))];for(const a of s){if(!o.length)break;const n=[];let r=o.at(-1),i=Wt(a,r)+1e-6;for(const l of o){const c=Wt(a,l)+1e-6;i>=0!=c>=0&&n.push(r.map((u,h)=>u+(l[h]-u)*i/(i-c))),c>=0&&n.push(l),r=l,i=c}o=n}return o}function yi(t,e,o,s){const{x0:a=0,y0:n=0,w:r,h:i}=o;let l=r,c=0,u=i,h=0;for(const _ of t){const v=Wt(_,e.f)*e.tanH,A=(1+Wt(_,s?e.up:e.r)/v)*r/2,g=(1+Wt(_,s?e.r:e.up)/v)*i/2;l=Math.min(l,A),c=Math.max(c,A),u=Math.min(u,g),h=Math.max(h,g)}const f=Math.max(0,Math.floor(l)-3),m=Math.min(r,Math.ceil(c)+3),p=Math.max(0,Math.floor(u)-3),d=Math.min(i,Math.ceil(h)+3);return[a+f,n+p,m-f,d-p]}function bi(t,e,[o,s,a,n],r){if(a<=0||n<=0||a===e.w&&n===e.h)return[];const{x0:i=0,y0:l=0}=e,c=(u,h,f,m)=>{const p=(2*Math.max(0,h-1)/m-1)*t.tanH,d=(2*Math.min(m,h+f+1)/m-1)*t.tanH;return[u.map((_,v)=>_-p*t.f[v]),u.map((_,v)=>d*t.f[v]-_)]};return[...c(r?t.up:t.r,o-i,a,e.w),...c(r?t.r:t.up,s-l,n,e.h)]}const B1=6,ka={N:8,dt:.25,margin:5,envBands:16,cut:4,mode:"cubic",maxMapSize:512,pitchDegMax:.25,fixedAtlas:!1},G1=16,ts=3,ut=6,wi=16*ut*ts,ct=(t,e)=>{t.push(e),t.length>600&&t.shift()};function Mi(t,e,o){const s=t.msg.red,a=e.msg.red;if(!s||!a)return null;const n=s.A.length,r=new Float32Array(n),i=new Float32Array(n);for(let l=0;l<n;l++)r[l]=s.A[l]+(a.A[l]-s.A[l])*o,i[l]=s.Y[l]+(a.Y[l]-s.Y[l])*o;return{A:r,Y:i}}const Ei=.5,La=16,$1=2,W1=300,H1=.6,K1=.12,q1=.32,X1=4,Ri=4,ul=8,Y1=8,Si=16,V1=16,Ti=64,bt=[.25,1/3,.5],Z1=.75,j1=.4,Fi=12,Q1=3e3,Ca=()=>({A:null,B:null,acc:null,job:null,slice:0,rot:0,startedAt:0,time:new g1});let Pa=null;function J1(t,e){const o=t.createProgram(),s=!!t.getExtension("KHR_parallel_shader_compile");e.programs.add(o);const a=[[t.VERTEX_SHADER,o1],[t.FRAGMENT_SHADER,t1]].map(([u,h])=>{const f=t.createShader(u);return t.shaderSource(f,h),t.compileShader(f),t.attachShader(o,f),{s:f}});t.transformFeedbackVaryings(o,Zt,t.INTERLEAVED_ATTRIBS),t.linkProgram(o);let n=!1,r=null;const i=()=>!s||t.getProgramParameter(o,37297)===!0;e.deferred.set(o,{shaders:a,ready:i});const l=()=>{if(!(n||r||!a.length))try{for(const{s:u}of a)if(!t.getShaderParameter(u,t.COMPILE_STATUS))throw new Error(`zoneCurtainExpand compile: ${t.getShaderInfoLog(u)}`);if(!t.getProgramParameter(o,t.LINK_STATUS))throw new Error(`zoneCurtainExpand link: ${t.getProgramInfoLog(o)}`);n=!0}catch(u){r=u instanceof Error?u:new Error(String(u))}finally{for(const{s:u}of a)t.getAttachedShaders(o)?.includes(u)&&t.detachShader(o,u),t.deleteShader(u);a.length=0,e.deferred.delete(o)}},c=new Map;return{prog:o,loc:{get:u=>(c.has(u)||c.set(u,t.getUniformLocation(o,u)),c.get(u))},done:()=>n||r!==null||i(),check:()=>{if(l(),r)throw r}}}const Ni=120,ki=1e3,ep=30,tp=t=>[{set:"core",tgt:"core",tab:0,pulse:1},{set:"env",tgt:"env",tab:t,pulse:1},{set:"glow",tgt:"env",tab:t,pulse:0}],Li=new Float32Array([0,0,1,0,0,1,1,1]),hl=(t,e)=>({level:Math.min(3,Math.max(0,Math.round(t))),seed:e}),op=(t,e)=>({...hl(t,e),weather:{seed:e}});function ap(t,e,o,s,a){const n=[];for(let r=0;r<t.length;r+=B1){const i={t0:t[r],vz:t[r+1],amp:t[r+2],xc:t[r+3],w:t[r+4],lag:t[r+5]},l=Math.max(o,i.xc-2.8*i.w),c=Math.min(s,i.xc+2.8*i.w);c>=l&&[l,c,Math.min(c,Math.max(l,i.xc))].some(u=>{const h=e-(i.t0+(u-i.xc)*i.lag);return h>0&&70+i.vz*h<=420})&&n.push(i)}return n.sort((r,i)=>i.amp-r.amp),{events:n.slice(0,a),dropped:Math.max(0,n.length-a)}}const fl=[0,1,2,3,15];function _o(t){const e=a=>t.getParameter(a),o=e(t.ACTIVE_TEXTURE),s=fl.map(a=>(t.activeTexture(t.TEXTURE0+a),e(t.TEXTURE_BINDING_2D)));return t.activeTexture(o),{prog:e(t.CURRENT_PROGRAM),vao:e(t.VERTEX_ARRAY_BINDING),array:e(t.ARRAY_BUFFER_BINDING),copyRead:e(t.COPY_READ_BUFFER_BINDING),copyWrite:e(t.COPY_WRITE_BUFFER_BINDING),tfo:e(t.TRANSFORM_FEEDBACK_BINDING),tfBuffer:e(t.TRANSFORM_FEEDBACK_BUFFER_BINDING),discard:t.isEnabled(t.RASTERIZER_DISCARD),blend:t.isEnabled(t.BLEND),viewport:e(t.VIEWPORT),scissor:t.isEnabled(t.SCISSOR_TEST),drawFb:e(t.DRAW_FRAMEBUFFER_BINDING),readFb:e(t.READ_FRAMEBUFFER_BINDING),cull:t.isEnabled(t.CULL_FACE),depth:t.isEnabled(t.DEPTH_TEST),unpack:e(t.UNPACK_ALIGNMENT),unit:o,tex:s}}function xo(t,e){if(t.isContextLost()||!e.viewport)return;const o=(s,a)=>{a?t.enable(s):t.disable(s)};o(t.RASTERIZER_DISCARD,e.discard),t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,e.tfo),t.bindBuffer(t.TRANSFORM_FEEDBACK_BUFFER,e.tfBuffer),t.bindVertexArray(e.vao),t.bindBuffer(t.ARRAY_BUFFER,e.array),t.bindBuffer(t.COPY_READ_BUFFER,e.copyRead),t.bindBuffer(t.COPY_WRITE_BUFFER,e.copyWrite),t.vertexAttrib4f(12,0,0,0,1),t.useProgram(e.prog),o(t.BLEND,e.blend),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD),o(t.CULL_FACE,e.cull),o(t.DEPTH_TEST,e.depth),o(t.SCISSOR_TEST,e.scissor),t.viewport(e.viewport[0],e.viewport[1],e.viewport[2],e.viewport[3]),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,e.drawFb),t.bindFramebuffer(t.READ_FRAMEBUFFER,e.readFb),t.pixelStorei(t.UNPACK_ALIGNMENT,e.unpack),fl.forEach((s,a)=>{t.activeTexture(t.TEXTURE0+s),t.bindTexture(t.TEXTURE_2D,e.tex[a]??null)}),t.activeTexture(e.unit)}class sp{opt;caps=null;stats={frames:0,maps:0,misses:0,miss3:0,states:0,workerMs:[],uploadBytes:0,tablesMs:null,tableLayers:[],slots:{core:0,env:0,glow:0},segsLastSlice:0,eventsDropped:0,mainMs:[],glErrors:0,failed:null,target:"",stillFrames:0,restarts:0,composed:0,w:0,meterReads:0,meterBack:0,meterTimeouts:0,meterLatency:0,meterMs:[],meterN:0,meterSteps:[],collectMs:[],collectSteps:[],meterWorkerMs:[],redPasses:0,first:{made:typeof performance<"u"?performance.now():0,programs:null,linked:null,tables:null,state:null,maps:null,metered:null,faded:null,tablesCached:!1},lostCalls:0,follow:{rate:0,wideMaps:0,wideFrames:0,wideMs:0,wideSize:0,wideMisses:0,fine:0,fineDropped:0,standingMaps:0},auto:{n:0,via:"",sliceMs:null,mapMs:null,changes:0},workerMsParts:[]};lost(e){return e.isContextLost()?(this.stats.lostCalls++,!0):!1}debugMeterN=null;meterIn=null;debugW=null;debugCompose=!0;debugFadeHold=!1;debugClassGain=null;debugRedOff=!1;debugRedSource=null;debugN=null;get nNow(){return this.nCur}nCur;autoN=xi();wide=Ca();standSince=null;phi=0;phiAt=null;debugWide=!0;debugFine=!0;get atlasActive(){return this.opt.fixedAtlas&&this.debugN===null&&this.debugWide}debugAtlasCull=!0;debugAtlasPixelPadding=!0;debugAtlasReference=typeof location<"u"&&new URLSearchParams(location.search).get("zoneAtlasBake")==="reference";get fastAtlasBake(){return this.opt.fixedAtlas&&!this.debugAtlasReference}get atlasBakeSlices(){return this.fastAtlasBake?X1:Y1}atlasSlots={kept:0,all:0,faces:[0,0,0,0,0]};newAtlas(){return this.newWideMap(Xm(q1,Ri),!0)}debugWideMoving=null;shown=[];noteShown(e,o,s,a){this.shown.push({at:performance.now(),lag:e-o,onTime:!a.miss&&!a.miss3&&o>s+1e-6}),this.shown.length>300&&this.shown.shift()}atlasPresentation(){const e=this.wide,{clock:o,shown:s}=e.time;if(!this.atlasActive||o===null||s===null||!e.B)return null;const a=e.A?.T??e.B.T,n=e.B.T;return{clock:o,shown:s,lag:o-s,a,b:n,alpha:e.time.alpha(a,n)}}updateRate(e=5e3){const o=performance.now(),s=this.shown.filter(n=>o-n.at<=e),a=s.map(n=>n.lag).sort((n,r)=>n-r);return{perS:1e3*s.length/e,onTimePerS:1e3*s.filter(n=>n.onTime).length/e,lagMed:a.length?a[a.length>>1]:null,lagP90:a.length?a[Math.floor(.9*(a.length-1))]:null,n:s.length}}tq=void 0;autoCost=[];timeBegin(e){const o=this.tq;if(!o||o.pend.length>=6||e.getQuery(o.ext.TIME_ELAPSED_EXT,e.CURRENT_QUERY))return null;const s=e.createQuery();return s&&e.beginQuery(o.ext.TIME_ELAPSED_EXT,s),s}timeEnd(e,o,s){const a=this.tq;e.endQuery(a.ext.TIME_ELAPSED_EXT),a.pend.push({q:o,n:s})}timePoll(e){if(this.tq===void 0){const a=this.caps?.timerQuery===!1?null:e.getExtension("EXT_disjoint_timer_query_webgl2");this.tq=a?{ext:a,pend:[]}:null}const o=this.tq;if(!o||!o.pend.length)return;const s=!!e.getParameter(o.ext.GPU_DISJOINT_EXT);for(;o.pend.length&&e.getQueryParameter(o.pend[0].q,e.QUERY_RESULT_AVAILABLE);){const a=o.pend.shift();if(!s){const n=Number(e.getQueryParameter(a.q,e.QUERY_RESULT))/1e6;this.autoCost.push(n*a.n),this.autoCost.length>b1&&this.autoCost.shift(),this.stats.auto.sliceMs=n}e.deleteQuery(a.q)}}seed;debugMaps=null;debugHold=!1;debugScene=null;debugSceneExtra=null;res=null;worker=null;makeWorker;key="";scene=null;tables=null;referenceTables=null;referenceRaster=null;windowMass=null;tablesAsked=!1;ring=[];pending=[];inFlight=!1;nextT=0;reqId=0;cap={core:0,env:0,glow:0};pX=null;pR=null;pD=null;pC=null;referenceCompose=null;spectralRows=new Float32Array(3*We);lastSpectrum=null;pRed=null;redTex=null;progQueue=[];tableWorker=null;pM=[];mS=null;mB=null;mF=null;pbos=[];reads=[];extIds=new WeakMap;extNext=1;expandInputs=new Map;vaoR=null;vaoD=null;quad=null;tfo=null;out=null;kTex=null;ptPool=[];refCpu=new Map;accFmt=0;A=null;B=null;acc=null;Ta=0;Tb=0;cur=null;slice=0;fdts=[];lastT=null;waitSince=null;hist=[];omega={axis:[0,0,1],rate:0};view=null;trash=[];w=0;lastWall=null;unmetered=0;retiring=null;retShare=0;retOut=null;outAt=null;holdS=0;retiringShare(e){return this.retiring?this.retShare*(this.retOut??1-e):0}meterPairs(){if(this.retOut===null||!this.retiring||this.debugMaps||this.debugW!==null)return this.pairs();if(!this.programReady())return[];const e=[],o=this.maps(),s=this.retShare*(1-this.w);return s>0&&e.push({m:this.retiring,share:s}),o&&this.w>0&&e.push({m:o,share:this.w}),e}weather;wx=null;constructor(e={},o,s=0,a=!1){this.opt={...ka,...e},this.nCur=this.opt.N,this.seed=s>>>0,this.weather=a,this.autoN=xi(this.opt.N),this.makeWorker=o??(()=>new Worker(new URL(""+new URL("zone-curtain.worker-CCmuWdOu.js",import.meta.url).href,import.meta.url),{type:"module"}))}maps(){if(this.debugMaps)return this.debugMaps;if(!this.linked)return null;const e=this.wide,o=e.A??(this.opt.fixedAtlas?e.B:null),s=this.opt.fixedAtlas?this.atlasBakeSlices:La,a=this.debugWide&&o&&e.B?{A:o,B:e.B,alpha:this.atlasActive?e.time.alpha(o.T,e.B.T):Math.min(1,e.rot/(5*s))}:null;return!this.atlasActive&&this.A&&this.B?{A:this.A,B:this.B,alpha:this.alphaNow(),wide:a,fine:a?this.phi:1}:a?{A:a.A,B:a.B,alpha:a.alpha,wide:a,fine:0}:null}coverageNow(e,o,s=25){const a=this.debugMaps??this.maps();if(!a)return{n:0,nA:0,nB:0,nC:0,sA:0,sB:0,sC:0,none:1,fallbackOnly:0,shown:0};const n=a.fine??1,r=ri(e,o,n>0?a.A.cam:null,n>0?a.B.cam:null,a.wide?"cube":null,a.alpha,this.nCur,s,n);return{...r,shown:r.shown*this.weight()}}coverageOfView(e=15){const o=this.view;return o?this.coverageNow(o.dir,o.fovDeg*Math.PI/360,e):null}layersOf(e){const o=[];for(const{m:s,share:a}of e){const n=s.fine??1;n>0&&o.push({A:s.A,B:s.B,alpha:s.alpha,share:a*n}),s.wide&&n<1&&o.push({A:s.wide.A,B:s.wide.B,alpha:s.wide.alpha,share:a*(1-n)})}return o}alphaNow(){return Math.min(1,this.rotFrames/Math.max(1,this.rotN))}rotFrames=0;rotN=ka.N;pairs(){if(!this.programReady())return[];if(this.debugMaps)return[{m:this.debugMaps,share:this.debugW??this.w}];const e=[],o=this.maps(),s=this.debugW??this.w;if(this.retiring&&this.debugW===null){const a=this.retiringShare(s);a>0&&e.push({m:this.retiring,share:a})}return o&&s>0&&e.push({m:o,share:s}),e}weight(){return(this.debugMaps??this.maps())&&this.programReady()?this.debugW??this.w:0}shares(){let e=0,o=0;for(const s of this.pairs())s.m===this.retiring?o=s.share:e=s.share;return{current:e,retiring:o}}coarseRates(e,o){return this.debugW!==null?this.debugW>0?Na(e,o,e,1,this.debugW).coarse:e:this.stats.failed?e:Na(e,o,e,1,1).coarse}compose(e,o,s,a,n,r,i,l){const c=this.pairs();if(!c.length||!this.pC||!this.debugCompose||this.lost(e))return!1;const u=this.opt.fixedAtlas&&l!==void 0&&c.every(({m:p})=>p.fine===0&&p.wide?.A.filtered&&p.wide.B.filtered),h=this.opt.fixedAtlas&&!u?this.referenceCompose??=this.res.program("zoneCurtainReferenceCompose",Ye,ui):this.pC;e.useProgram(h.prog),r(h),u||e.uniform1iv(h.loc.get("uClass"),Int32Array.from(s));const f=p1(a),m=this.debugClassGain;for(const{m:p,share:d}of c){this.bindMaps(e,h,p,2,u);const _=Na(o,s,f,p.A.kR,d,n).map;if(m)for(let v=0;v<_.length;v++)_[v]=_[v]*(m[s[v]]??1);u?this.bindSpectrum(e,h,l??null,_,s):e.uniform1fv(h.loc.get("uRate"),_),i()}return e.activeTexture(e.TEXTURE0),this.stats.composed++,!0}bindSpectrum(e,o,s,a,n){const r=this.lastSpectrum;r&&r.ext===s&&a.every((i,l)=>i===r.rate[l]&&n[l]===r.cls[l])||(_1(this.spectralRows,a,n,s),e.uniform3fv(o.loc.get("uLight[0]"),this.spectralRows),this.lastSpectrum={ext:s,rate:a,cls:Int32Array.from(n)})}meterField(e){const o=s=>e&&s.readKey!==e.key?e.row:this.readingOf(s);return si(this.layersOf(this.meterPairs()).map(s=>({A:o(s.A),B:o(s.B),alpha:s.alpha,share:s.share})))}meterStats(e,o){const s=performance.now()/1e3,a=this.slowLight,n=this.retiring!==null||this.w<1,r=this.meteredView,i=!n&&!this.meterHeld&&!!r&&s<r.fastUntil&&bo(this.meterPose,r),l=ni(e,o,oi(),this.meterField(i?this.meteredReading:void 0)),c=this.retOut===null?l.mean:ni(e,o,oi(),si(this.layersOf(this.pairs()).map(f=>({A:this.readingOf(f.A),B:this.readingOf(f.B),alpha:f.alpha,share:f.share})))).mean;if(this.debugMeterFast)return this.slowLight=null,{...l,shown:c};const u=n?N1:this.debugGainTau??void 0;let h={t:s,mean:l.mean,peak:l.peak};return a&&s-a.t>=0&&s-a.t<2&&(h=i?U1(a,l.mean,l.peak,s,u):P1(a,l.mean,l.peak,s,u)),this.slowLight=h,{mean:h.mean,peak:h.peak,shown:c}}slowLight=null;meteredView=null;meteredReading;meterPose={axis:[0,0,1],radiusDeg:0};get highlightMeterStale(){const e=this.meteredView;return!this.stats.failed&&!!e&&(!bo(this.meterPose,e)||performance.now()/1e3<e.fastUntil)}displayEv=null;clearDisplayEv(){this.displayEv=null}followDisplayEv(e,o,s,a){const n=this.displayEv?.controls===s?this.displayEv:null,r=z1(n,e,o,a&&!this.meterHeld&&!this.highlightMeterStale&&!this.retiring&&this.w>=1);return this.displayEv={...r,controls:s},r.shown}acceptMeteredView(e,o,s,a){this.meterHeld||this.debugMaps||!bo(this.meterPose,e)||(this.meteredView=C1(this.meteredView,{axis:e.axis,radiusDeg:e.radiusDeg},a/1e3),this.meteredReading={key:o,row:s})}debugMeterFast=!1;debugGainTau=null;meterOptics=null;meterWake;meterHeld=!1;debugKeepStates=!1;meterWorker=null;meterWorkerReady=!1;meterNoInputAt=null;meterWaitingAt=null;meterActiveMs=0;meterLastCollect=null;meterOpticsKey="";meterLuts=new WeakMap;meterLutId=0;meterRequest=null;meterResult=null;meterId=0;meterMapId=0;meterPausedForDrag=!1;meterFrame=0;meterGrid=null;get meterBackend(){return this.stats.failed?"legacy":this.useBackgroundMeter()?"worker":"gpu-reference"}get meterFading(){return!this.stats.failed&&this.useBackgroundMeter()&&!this.debugHold&&this.w<1}enableBackgroundMeter(e){try{const o=this.meterWorker=e();o.onmessage=({data:s})=>{this.meterWorker===o&&(s.cmd==="ready"?(this.meterWorkerReady=!0,this.meterWake?.()):s.cmd==="error"?this.failBackgroundMeter(s.message):this.meterRequest?.id===s.id&&(this.meterResult=s,this.meterWake?.()))},o.onerror=s=>{this.meterWorker===o&&this.failBackgroundMeter(s.message||"worker unavailable")},o.onmessageerror=()=>{this.meterWorker===o&&this.failBackgroundMeter("invalid worker message")},this.postMeter({cmd:"init",envBands:this.opt.envBands,cut:this.opt.cut,atlasFast:this.fastAtlasBake})}catch(o){this.failBackgroundMeter(o instanceof Error?o.message:String(o))}}failBackgroundMeter(e){this.stats.meterTimeouts+=this.meterRequest?.maps.length??0,this.meterWorker?.terminate(),this.meterWorker=null,this.meterWorkerReady=!1,this.meterRequest=this.meterResult=null,this.stats.failed=`zoneCurtainMeterWorker: ${e}`,this.meterWake?.()}postMeter(e,o=[]){if(this.meterWorker)try{this.meterWorker.postMessage(e,o)}catch(s){this.failBackgroundMeter(s instanceof Error?s.message:String(s))}}useBackgroundMeter(){return!!this.meterWorker&&this.debugMaps===null&&this.debugMeterN===null}backgroundSample(e){const o=this.meterOptics,s=performance.now(),a=this.maps(),n=this.retiring;if(!this.meterWorkerReady||!a&&!n)return;if(!o){this.meterActiveMs-(this.meterNoInputAt??=this.meterActiveMs)>5e3&&this.failBackgroundMeter("optical field unavailable");return}this.meterNoInputAt=null;const r=a&&(!a.A.reading||!a.B.reading)&&this.w===0;if(r&&this.meterActiveMs-(this.meterWaitingAt??=this.meterActiveMs)>5e3){this.failBackgroundMeter("initial readings could not be used");return}if(r||(this.meterWaitingAt=null),this.meterHeld&&!e.snapshot&&this.w>=1&&!n){this.meterPausedForDrag=!0;return}const i=this.meterShape(e.radiusDeg),l=e.ext?this.extinctionKey(e.ext):0;let c=this.meterLuts.get(o.sky.buffer);c===void 0&&this.meterLuts.set(o.sky.buffer,c=++this.meterLutId);const u=He.map(g=>e.rates[g]??0),h=Math.max(...u)||1,f=`${i.n}|${i.tanR.toFixed(6)}|${l}|${o.key}|${c}|${u.map(g=>(g/h).toFixed(7)).join(",")}`,m=this.meterOpticsKey!==f;if(this.meterOpticsKey=f,this.meterRequest||!this.meterPausedForDrag&&!e.snapshot&&!m&&!r&&s-this.lastReduceAt<ki)return;this.meterPausedForDrag=!1;const p=`${e.axis.map(g=>g.toFixed(4)).join(",")}|${f}`,d=a?[a.A,a.B]:[];a?.wide&&d.push(a.wide.A,a.wide.B),n&&(d.push(n.A,n.B),n.wide&&d.push(n.wide.A,n.wide.B));const _=[...new Set(d)].filter(g=>g.meterJob&&g.readKey!==p).slice(0,2);if(!_.length)return;const v=Array.from(e.cls);this.meterIn={axis:[...e.axis],radiusDeg:e.radiusDeg,n:i.n,tanR:i.tanR,count:i.count,level:e.level,cls:v,weights:u},this.lastReduceAt=s;const A=++this.meterId;this.meterRequest={id:A,key:p,opticsKey:f,optics:o,axis:e.axis,radiusDeg:e.radiusDeg,start:this.meterActiveMs,frame:this.meterFrame,maps:_.map(g=>({map:g,gen:g.gen}))},this.stats.meterReads+=_.length,this.stats.meterN=i.n,this.postMeter({cmd:"measure",id:A,view:{axis:e.axis,n:i.n,tanR:i.tanR,cls:v,weights:u,ext:e.ext,optics:o},jobs:_.map(g=>g.meterJob)}),ct(this.stats.meterMs,performance.now()-s)}collectBackground(){this.meterFrame++;const e=performance.now(),o=this.meterRequest,s=this.meterResult;if(this.meterLastCollect!==null&&(this.meterActiveMs+=Math.min(250,e-this.meterLastCollect)),this.meterLastCollect=e,!s&&(!this.meterWorkerReady&&this.meterActiveMs>1e4||o&&this.meterActiveMs-o.start>5e3)){this.failBackgroundMeter("worker did not return a reading");return}if(!o||!s)return;this.meterRequest=this.meterResult=null;const a=this.meterOptics,n=o.opticsKey!==this.meterOpticsKey||!a||o.optics.sky.buffer!==a.sky.buffer||o.optics.key!==a.key;let r=null;for(const[i,{map:l,gen:c}]of o.maps.entries()){const u=s.rows[i];if(!u||l.gen!==c||n){this.stats.meterTimeouts++;continue}l.reading=u,l.meterJob?.level===this.scene?.level&&(this.lastReading=r=u),l.readKey=o.key,this.stats.meterBack++}r&&this.acceptMeteredView(o,o.key,r,e),this.stats.meterLatency=this.meterFrame-o.frame;for(const i of s.ms)ct(this.stats.meterWorkerMs,i);ct(this.stats.collectMs,performance.now()-e)}meterShape(e){const o=this.meterGrid,s=this.debugMeterN;if(o&&o.radius===e&&o.override===s)return o.value;const a=$m(e,Math.min(this.opt.pitchDegMax,2*e/128),s??void 0);return this.meterGrid={radius:e,override:s,value:a},a}extinctionKey(e){const o=this.extIds.get(e);if(o!==void 0)return o;const s=this.extNext++;return this.extIds.set(e,s),s}meter(e,o){if(this.meterPose.axis=o.axis,this.meterPose.radiusDeg=o.radiusDeg,this.stats.failed)return;if(this.useBackgroundMeter()){this.backgroundSample(o);return}if(!this.pM.length||this.lost(e)||!this.programReady())return;this.reads.some(d=>d.passed)&&(this.catchUp&&e.deleteSync(this.catchUp),this.catchUp=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0));const s=this.debugMaps?null:this.maps(),a=[];for(const d of this.layersOf(this.meterPairs()).sort((_,v)=>v.share-_.share))a.push(d.A,d.B);if(s&&(a.push(s.A,s.B),s.wide&&a.push(s.wide.A,s.wide.B)),!a.length)return;const n=this.meterShape(o.radiusDeg),r=o.ext?this.extinctionKey(o.ext):0,i=`${o.axis.map(d=>d.toFixed(4)).join(",")}|${n.n}|${n.tanR.toFixed(6)}|${r}`,l=[];for(const d of a)l.length>=ts||l.includes(d)||d.readKey===i||this.reads.some(_=>_.items.some(v=>v.M===d&&v.gen===d.gen&&v.key===i))||l.push(d);const c=He.map(d=>o.rates[d]??0);this.meterIn={axis:[...o.axis],radiusDeg:o.radiusDeg,n:n.n,tanR:n.tanR,count:n.count,level:o.level,cls:Array.from(o.cls),weights:c};const u=this.w<1||this.retiring!==null||this.debugMaps!==null||this.debugW!==null||l.some(d=>d.reading!==null&&d.readKey==="");if(l.length&&!u&&(this.reads.length>0||performance.now()-this.lastReduceAt<ki)&&(l.length=0),!l.length)return;this.lastReduceAt=performance.now();const h=this.steps,f=performance.now(),m=_o(e),p=e.getParameter(e.PIXEL_PACK_BUFFER_BINDING);h.fill(0),h[1]=performance.now()-f;try{const d=Va(o.cls),_=Za(o.cls);l.forEach((T,k)=>this.reduce(e,T,o,n,k));const v=performance.now(),A=this.res;let g=this.pbos.pop();g||(g=e.createBuffer(),A.buffers.add(g),e.bindBuffer(e.PIXEL_PACK_BUFFER,g),e.bufferData(e.PIXEL_PACK_BUFFER,wi,e.STREAM_READ),A.recordBuffer(g,wi)),e.bindFramebuffer(e.FRAMEBUFFER,this.mF.fbo),e.bindBuffer(e.PIXEL_PACK_BUFFER,g),e.readPixels(0,0,ut*l.length,1,e.RGBA,e.FLOAT,0),e.bindBuffer(e.PIXEL_PACK_BUFFER,null);const w=performance.now();h[5]=w-v;const b=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0);if(h[6]=performance.now()-w,!b)throw this.pbos.push(g),new Error("fenceSync returned null");this.reads.push({items:l.map(T=>({M:T,gen:T.gen,key:i,chan:d,red:_})),sync:b,pbo:g,frames:0,axis:o.axis,radiusDeg:o.radiusDeg}),e.activeTexture(e.TEXTURE0),this.stats.meterReads+=l.length,this.stats.meterN=n.n}catch(d){this.lost(e)||(this.stats.failed=`zoneCurtainMeter: ${d instanceof Error?d.message:String(d)}`)}finally{const d=performance.now();xo(e,m),e.bindBuffer(e.PIXEL_PACK_BUFFER,p);const _=performance.now();h[0]=_-f,h[7]=_-d,ct(this.stats.meterMs,h[0]),ct(this.stats.meterSteps,Array.from(h))}}steps=new Float64Array(8);lastReduceAt=-1/0;lastReading=null;catchUp=null;readingOf(e){return e.reading??(this.debugMaps?null:this.lastReading)}collect(e){if(this.useBackgroundMeter()){this.collectBackground();return}if(!this.reads.length||this.stats.failed||this.lost(e))return;const o=performance.now(),s=e.getParameter(e.PIXEL_PACK_BUFFER_BINDING),a=[0,0,0];try{this.poll(e,a)}catch(n){this.lost(e)||(this.stats.failed=`zoneCurtainMeter: ${n instanceof Error?n.message:String(n)}`)}finally{e.bindBuffer(e.PIXEL_PACK_BUFFER,s),a[0]=performance.now()-o,ct(this.stats.collectMs,a[0]),ct(this.stats.collectSteps,a)}}poll(e,o){for(const s of[...this.reads]){const a=performance.now(),n=s.passed?e.ALREADY_SIGNALED:e.clientWaitSync(s.sync,0,0);o[1]=o[1]+performance.now()-a;const r=n===e.ALREADY_SIGNALED||n===e.CONDITION_SATISFIED;if(r&&!s.passed){s.passed=!0,s.frames++;continue}if(s.passed&&this.catchUp&&++s.frames<=Ni/2){const i=e.clientWaitSync(this.catchUp,0,0);if(i!==e.ALREADY_SIGNALED&&i!==e.CONDITION_SATISFIED&&i!==e.WAIT_FAILED)continue}if(!(!r&&n!==e.WAIT_FAILED&&++s.frames<=Ni)){if(this.reads.splice(this.reads.indexOf(s),1),e.deleteSync(s.sync),r){const i=new Float32Array(4*ut*s.items.length),l=performance.now();e.bindBuffer(e.PIXEL_PACK_BUFFER,s.pbo),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,i),o[2]=o[2]+performance.now()-l;let c=null;for(const[u,h]of s.items.entries()){const f=4*ut*u,m=He.length,p=new Float64Array(m),d=new Float64Array(m);h.chan.forEach((_,v)=>{p[_]=i[f+v],d[_]=i[f+4+v]}),h.red>=0&&(p[h.red]=i[f+12],d[h.red]=i[f+16]),h.M.gen===h.gen&&(h.M.reading={sums:p,count:i[f+8],box:d,boxTotal:i[f+9]+(h.red>=0?Math.max(0,i[f+21]):0)},h.M.readKey=h.key,this.lastReading=h.M.reading,c={key:h.key,row:h.M.reading})}c&&this.acceptMeteredView(s,c.key,c.row,l),this.stats.meterBack+=s.items.length,this.stats.meterLatency=s.frames}else this.stats.meterTimeouts+=s.items.length;this.pbos.push(s.pbo)}}}reduce(e,o,s,a,n){const r=Va(s.cls),i=Za(s.cls);this.reduceSet(e,o,s,a,r,ut*n),i>=0&&this.reduceSet(e,o,s,a,[i],ut*n+3)}reduceSet(e,o,s,a,n,r){const i=this.res,l=a.n,c=l/mt,u=this.pM[0],h=this.pM[1],f=this.pM[2],m=this.steps,p=performance.now(),d=(R,F,S)=>{if(R&&R.w===F&&R.h===S)return R;if(R){const P=R;this.defer(()=>i.deleteTarget(P))}e.activeTexture(e.TEXTURE15);const M=i.target(F,S,e.RGBA32F,e.RGBA);return e.activeTexture(e.TEXTURE0),M},_=this.mS=d(this.mS,l,l),v=this.mB=d(this.mB,3*c,c),A=this.mF=d(this.mF,ut*ts,1),g=ja(s.axis),w=this.meterIn.weights,b=[0,1,2,3].map(R=>n[R]??0),T=[0,1,2,3].map(R=>n[R]!==void 0?o.kR:0),k=[0,1,2,3].map(R=>n[R]!==void 0?w[n[R]]??0:0);e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.bindVertexArray(this.vaoD),e.useProgram(u.prog),s.bind(u),e.uniform3fv(u.loc.get("uMF"),g.F),e.uniform3fv(u.loc.get("uMR"),g.R),e.uniform3fv(u.loc.get("uMU"),g.U),e.uniform1f(u.loc.get("uTanR"),a.tanR),e.uniform1f(u.loc.get("uN"),l),e.uniform3fv(u.loc.get("mF"),o.cam.f),e.uniform3fv(u.loc.get("mR"),o.cam.r),e.uniform3fv(u.loc.get("mU"),o.cam.up),e.uniform2f(u.loc.get("mT"),o.cam.tanH,o.n),e.uniform1f(u.loc.get("mCube"),o.cube?1:0),e.uniform1f(u.loc.get("uAtlasFilter"),o.filtered?1:0),e.uniform1f(u.loc.get("uCubic"),this.debugCubic?1:0),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,o.core.tex),e.uniform1i(u.loc.get("mC"),2),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,o.env.tex),e.uniform1i(u.loc.get("mE"),3),e.uniform1iv(u.loc.get("uComp"),Int32Array.from(b)),e.uniform1iv(u.loc.get("uCls"),Int32Array.from(b.map(R=>s.cls[R]??0))),e.uniform1fv(u.loc.get("uK"),Float32Array.from(T)),e.bindFramebuffer(e.FRAMEBUFFER,_.fbo),e.viewport(0,0,l,l),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(h.prog),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,_.tex),e.uniform1i(h.loc.get("uS"),2),e.uniform1f(h.loc.get("uN"),l),e.uniform4fv(h.loc.get("uW"),Float32Array.from(k)),e.bindFramebuffer(e.FRAMEBUFFER,v.fbo),e.viewport(0,0,3*c,c),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(f.prog),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,v.tex),e.uniform1i(f.loc.get("uB"),2),e.uniform1i(f.loc.get("uNB"),c),e.uniform1i(f.loc.get("uOff"),r),e.bindFramebuffer(e.FRAMEBUFFER,A.fbo),e.viewport(r,0,3,1),e.drawArrays(e.TRIANGLES,0,3),m[4]=m[4]+performance.now()-p}debugMeterSamples(e){return this.mS?this.readTarget(e,this.mS):null}frame(e){if(this.stats.failed||this.debugHold||this.lost(e.gl))return;const o=performance.now(),s=e.gl,a=_o(s);this.holdS=Math.max(0,e.holdS??0);try{this.res=e.res,this.flush();const n=this.debugScene??(this.weather?op:hl)(e.level,e.seed),r=this.debugSceneExtra&&!this.debugScene?{...n,...this.debugSceneExtra}:n,i=this.debugScene?JSON.stringify(r):`${r.level}|${r.seed}${this.debugSceneExtra?"|"+JSON.stringify(this.debugSceneExtra):""}`,l=this.ring.length?this.ring[0].t:null,c=this.lastT!==null&&e.tModel<this.lastT-1e-6,u=this.lastT!==null&&(e.tModel>this.lastT+5||c&&(l===null||e.tModel<l-1e-6));this.worker&&(i!==this.key||u)&&this.restart(i!==this.key),this.key=i,this.scene=r,this.worker||this.start(e),this.pX?this.askPrograms(1):this.programs(s,e),this.take(s),this.timePoll(s);const h=this.lastT!==null&&e.tModel===this.lastT;if(this.track(e),this.want(e.tModel),e.dtSeconds>0&&!h&&(this.fdts.push(e.dtSeconds),this.fdts.length>31&&this.fdts.shift()),this.lastT=e.tModel,this.atlasActive){this.wide.time.advance(e.tModel,this.wide.A?.T??null,this.wide.B?.T??null,5*this.atlasBakeSlices/(this.debugWideMoving??1)),this.tables&&this.ring.length>=4&&this.programReady()&&((!h||!this.wide.B)&&this.wideStep(s,e,!0)&&this.stats.frames++,h&&this.wide.B&&this.stats.stillFrames++),this.trim();return}const f=performance.now(),m=this.debugN===null&&this.omega.rate>=jm;m?this.standSince=null:this.standSince??=f;const p=this.debugFine&&(this.debugN!==null||this.standSince!==null&&f-this.standSince>=W1);if(this.stepFine(p,f,h),this.stats.follow.rate=this.omega.rate,!this.tables||this.ring.length<4||!this.programReady()){this.ring.length>Si&&this.trim();return}const d=!h&&this.wideStep(s,e,m||!this.debugFine);if(m&&this.slice>0&&(this.slice=0,this.stats.follow.fineDropped++),!p){this.trim(),d&&this.stats.frames++;return}if(this.slice===0){const w=this.debugN??Math.max(e.lite?G1:this.opt.N,this.tq?this.autoN.n:this.tq===null?V1:this.opt.N);this.nCur=w}const _=this.fdt(),v=this.nCur,A=h&&!!this.A&&!!this.B&&this.standingNeedsMap();if(A&&this.slice>0&&this.cur&&Math.abs(this.cur.T-e.tModel)>1e-6&&(this.slice=0),!this.A||!this.B){const w=performance.now();if(this.waitSince??=w,this.ring[this.ring.length-1].t<e.tModel+2*v*_+this.dtCur&&w-this.waitSince<1500)return;this.waitSince=null,this.A=this.fillMap(s,this.newMap(e),e.tModel),this.B=this.fillMap(s,this.newMap(e),e.tModel+v*_),this.Ta=this.A.T,this.Tb=this.B.T,this.slice=0,this.stats.first.maps??=performance.now(),this.rotFrames=0,this.rotN=v}else if(h&&!A){this.stats.stillFrames++;return}if(this.slice===0){if(this.acc=this.recenter(e,this.acc),this.cur=this.job(A?e.tModel:e.tModel+2*v*_,this.acc.cam),this.acc.T=this.cur.T,this.acc.kR=this.cur.X.S[1].msg.kR,this.stats.maps++,this.cur.miss&&this.stats.misses++,A&&this.stats.follow.standingMaps++,this.clearMap(s,this.acc),this.rememberMeterJob(this.acc,this.cur),this.drawRed(s,this.acc,this.cur),this.rotN=v,this.debugN===null&&this.tq){this.autoN=R1(this.autoN,vi(this.autoCost),_);const w=this.stats.auto;w.n=this.autoN.n,w.changes=this.autoN.changes,w.via="timer",w.mapMs=vi(this.autoCost)}else if(this.debugN===null&&this.tq===null){const w=this.stats.auto;w.n=v,w.via="frames"}}const g=this.timeBegin(s);if(this.drawSlice(s,this.acc,this.cur,this.slice,v),g&&this.timeEnd(s,g,v),++this.slice===v){this.noteShown(e.tModel,this.acc.T,this.Tb,this.cur);const w=this.A;this.A=this.B,this.B=this.acc,this.acc=w,this.Ta=this.Tb,this.Tb=this.B.T,this.slice=0,this.rotFrames=A?v:0}else this.rotFrames++;this.trim(),this.stats.frames++}catch(n){this.lost(s)||(this.stats.failed=n instanceof Error?n.message:String(n))}finally{this.fade(),xo(s,a);const n=performance.now()-o;this.stats.mainMs.push(n),this.stats.mainMs.length>600&&this.stats.mainMs.shift()}}dispose(){this.meterWorker?.terminate(),this.meterWorker=null,this.meterRequest=null,this.meterResult=null,this.worker?.terminate(),this.worker=null,this.tableWorker?.terminate(),this.tableWorker=null,this.progQueue=[];const e=this.res;if(e&&!e.gl.isContextLost()){const o=e.gl;this.flush();for(const n of this.ring)for(const r of Re)e.deleteBuffer(n.buf[r]);const s=this.wide,a=new Set([this.A,this.B,this.acc,s.A,s.B,s.acc,this.retiring?.A,this.retiring?.B,this.retiring?.wide?.A,this.retiring?.wide?.B]);for(const n of a)n&&(e.deleteTarget(n.core),e.deleteTarget(n.env));for(const n of[...this.tables??[],...this.referenceTables??[]])e.deleteTexture(n.tex),e.deleteTexture(n.coef);this.windowMass&&e.deleteTexture(this.windowMass),this.referenceRaster&&(o.deleteProgram(this.referenceRaster.prog),e.programs.delete(this.referenceRaster.prog)),this.kTex&&e.deleteTexture(this.kTex),this.redTex&&e.deleteTexture(this.redTex);for(const n of this.ptPool)e.deleteTexture(n.tex);this.out&&e.deleteBuffer(this.out.buf),this.quad&&e.deleteBuffer(this.quad);for(const n of[...Array.from(this.expandInputs.values(),r=>r.vao),this.vaoR,this.vaoD])n&&(o.deleteVertexArray(n),e.vaos.delete(n));this.tfo&&o.deleteTransformFeedback(this.tfo),this.pD&&(o.deleteProgram(this.pD.prog),e.programs.delete(this.pD.prog)),this.referenceCompose&&(o.deleteProgram(this.referenceCompose.prog),e.programs.delete(this.referenceCompose.prog));for(const n of[this.pX,this.pR,this.pRed,this.pC,...this.pM]){if(!n)continue;e.programs.delete(n.prog);const r=()=>{if(!o.isContextLost()){if(!n.done()){setTimeout(r,50);return}try{n.check()}catch{}o.deleteProgram(n.prog),e.deferred.delete(n.prog)}};r()}for(const n of[this.mS,this.mB,this.mF])n&&e.deleteTarget(n);for(const n of this.reads)o.deleteSync(n.sync),this.pbos.push(n.pbo);this.catchUp&&(o.deleteSync(this.catchUp),this.catchUp=null);for(const n of this.pbos)e.deleteBuffer(n);for(const n of this.tq?.pend??[])o.deleteQuery(n.q)}this.tq=void 0,this.pM=[],this.mS=this.mB=this.mF=null,this.pbos=[],this.reads=[],this.linked=!1,this.wide=Ca(),this.phi=0,this.phiAt=null,this.standSince=null,this.res=null,this.ring=[],this.pending=[],this.tables=null,this.tablesAsked=!1,this.A=this.B=this.acc=null,this.cur=null,this.trash=[],this.retiring=null,this.retShare=0,this.retOut=null,this.outAt=null,this.w=0,this.lastWall=null,this.pX=this.pR=this.pD=this.pC=this.pRed=null,this.redTex=null,this.vaoR=this.vaoD=null,this.quad=null,this.tfo=null,this.out=null,this.kTex=null,this.ptPool=[],this.expandInputs.clear(),this.referenceCompose=null,this.lastSpectrum=null,this.referenceTables=null,this.referenceRaster=null,this.windowMass=null,this.cap={core:0,env:0,glow:0},this.inFlight=!1,this.lastT=null,this.key=""}start(e){const o=this.makeWorker();if(o.onmessage=s=>this.onMessage(s.data),o.onerror=s=>{this.stats.failed=`worker: ${s.message}`},this.worker=o,this.inFlight=!1,this.nextT=e.tModel-this.dtCur,this.post({cmd:"init",scene:this.scene,obs:[0,0],red:this.debugRedSource??"dynamic",light:!this.debugEmitStd,atlas:this.opt.fixedAtlas,forwardOnly:this.opt.fixedAtlas,...this.fastAtlasBake&&!this.debugEmitStd?{spacingKm:1}:{}}),!this.tablesAsked){this.tablesAsked=!0;const s=this.fastAtlasBake?[ul]:this.referenceBands(),a=(this.fastAtlasBake?"atlas:":"")+s.join(",");if(Pa?.bands===a)this.pendingTables=Pa.tables,this.stats.tablesMs=0,this.stats.first.tablesCached=!0;else{const n=this.tableWorker=this.makeWorker();n.onmessage=r=>{const i=r.data;if(i.cmd==="tables"){Pa={bands:a,tables:i.tables},this.pendingTables=i.tables,this.stats.tablesMs=i.ms;for(const l of this.waiters.splice(0))l()}else i.cmd==="error"&&(this.stats.failed=`worker: ${i.message}`);n.terminate(),this.tableWorker===n&&(this.tableWorker=null)},n.onerror=r=>{this.stats.failed=`worker: ${r.message}`},n.postMessage({cmd:"tables",bands:s,atlasFast:this.fastAtlasBake})}}}post(e){this.worker.postMessage(e)}restart(e=!1){this.worker?.terminate(),this.worker=null,this.stats.restarts++,e&&(this.lastReading=null,this.wx=null);const o=this.res,s=this.ring;s.length&&this.postMeter({cmd:"forget",ids:s.map(l=>l.msg.id)}),o&&this.defer(()=>{for(const l of s)for(const c of Re)o.deleteBuffer(l.buf[c])}),this.ring=[],this.pending=[],this.cur=null,this.slice=0,this.cap={core:0,env:0,glow:0},this.waitSince=null;const a=this.maps(),n=this.wide,r=a?this.w:0,i=this.retiringShare(this.w);if(a&&r>0&&r>=i){const l=this.retiring;l&&this.defer(()=>this.delPair(l)),this.retiring={...a,wide:a.wide?{...a.wide}:null},this.retShare=r}else{for(const l of new Set([this.A,this.B,n.A,n.B]))l&&this.defer(()=>this.delMap(l));this.retiring&&(this.retShare=i)}if(n.acc){const l=n.acc;this.defer(()=>this.delMap(l))}this.wide=Ca(),this.phi=0,this.phiAt=null,this.retOut=this.retiring&&(e||this.retOut!==null)?1:null,this.outAt=null,this.A=this.B=null,this.w=0,!this.tables&&!this.pendingTables&&!this.tableWorker&&(this.tablesAsked=!1)}debugWorkerSlow=1;debugEmitStd=!1;dtCur=ka.dt;dtAt=-1/0;get dtNow(){return this.dtCur}batchP90(){const e=this.stats.workerMs.slice(-Fi);if(e.length<4)return 0;const o=[...e].sort((s,a)=>s-a);return o[Math.floor(.9*(o.length-1))]/1e3}adaptDt(){if(this.debugEmitStd||this.opt.dt!==bt[0]||this.stats.workerMs.length<Fi)return;const e=performance.now();if(e-this.dtAt<Q1)return;const o=this.batchP90(),s=bt.indexOf(this.dtCur);s<0||(o>Z1*this.dtCur&&s<bt.length-1?(this.dtCur=bt[s+1],this.dtAt=e):s>0&&o<j1*bt[s-1]&&(this.dtCur=bt[s-1],this.dtAt=e))}slowed=new WeakSet;onMessage(e){if(e.cmd==="state"&&this.debugWorkerSlow>1&&!this.slowed.has(e)){const o=this.debugWorkerSlow,s=this.worker,a={...e,ms:{...e.ms,total:e.ms.total*o}};this.slowed.add(a),setTimeout(()=>{this.worker===s&&this.onMessage(a)},(o-1)*e.ms.total);return}if(e.cmd==="error"){this.stats.failed=`worker: ${e.message}`;return}if(e.cmd==="tables"){this.pendingTables=e.tables,this.stats.tablesMs=e.ms;return}if(e.cmd==="state"){this.inFlight=!1,this.pending.push(e),this.stats.workerMs.push(e.ms.total),this.stats.workerMs.length>120&&this.stats.workerMs.shift(),this.stats.workerMsParts.push(e.ms),this.stats.workerMsParts.length>120&&this.stats.workerMsParts.shift(),this.adaptDt(),this.lastT!==null&&this.want(this.lastT);for(const o of this.waiters.splice(0))o()}}pendingTables=null;waiters=[];want(e){if(this.inFlight||!this.worker)return;const o=this.opt.fixedAtlas?this.atlasBakeSlices:La,a=2*Math.max(this.nCur,this.debugWide?5*o:0)*this.fdt()+2*this.dtCur+.3+(this.debugEmitStd?0:this.batchP90());this.nextT<=e+a&&(this.inFlight=!0,this.post({cmd:"state",id:++this.reqId,t:this.nextT,cull:null}),this.nextT+=this.dtCur)}take(e,o=!1){for(this.pendingTables&&(this.uploadTables(e,this.pendingTables),this.pendingTables=null);this.pending.length;){const s=this.pending.shift(),a=this.res,n={},r={};for(const i of Re)this.grow(e,i,s.sets[i].n),r[i]=s.sets[i].n;for(const i of Re){const l=e.createBuffer();a.buffers.add(l),e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferData(e.ARRAY_BUFFER,Math.max(1,this.cap[i])*we*4,e.DYNAMIC_DRAW),a.recordBuffer(l,Math.max(1,this.cap[i])*we*4),r[i]&&e.bufferSubData(e.ARRAY_BUFFER,0,s.sets[i].data,0,r[i]*we),this.stats.uploadBytes+=r[i]*we*4,n[i]=l}e.bindBuffer(e.ARRAY_BUFFER,null),this.ring.push({t:s.t,k:s.k,n:r,buf:n,msg:s}),this.stats.states++,this.stats.first.state??=performance.now(),s.wx&&(this.wx=s.wx);for(const i of Re)this.stats.slots[i]=Math.max(this.stats.slots[i],r[i]);this.meterWorker&&!o&&!this.debugHold&&this.postMeter({cmd:"state",state:s},this.debugKeepStates?[]:Re.map(i=>s.sets[i].data.buffer))}}grow(e,o,s){if(s<=this.cap[o])return;const a=Math.max(4096,Math.ceil(s*1.5/1024)*1024),n=this.res,r=[];for(const i of this.ring){const l=e.createBuffer();n.buffers.add(l),e.bindBuffer(e.COPY_WRITE_BUFFER,l),e.bufferData(e.COPY_WRITE_BUFFER,a*we*4,e.DYNAMIC_DRAW),n.recordBuffer(l,a*we*4),i.n[o]&&(e.bindBuffer(e.COPY_READ_BUFFER,i.buf[o]),e.copyBufferSubData(e.COPY_READ_BUFFER,e.COPY_WRITE_BUFFER,0,0,i.n[o]*we*4)),r.push(i.buf[o]),i.buf[o]=l}r.length&&this.defer(()=>{for(const i of r)n.deleteBuffer(i)}),e.bindBuffer(e.COPY_READ_BUFFER,null),e.bindBuffer(e.COPY_WRITE_BUFFER,null),this.cap[o]=a}trim(){const e=this.res,o=a=>!!(this.cur?.X.S.includes(a)||this.wide.job?.X.S.includes(a)),s=[];for(;this.ring.length>Si&&!o(this.ring[0]);){const a=this.ring.shift();s.push(a.msg.id),this.defer(()=>{for(const n of Re)e.deleteBuffer(a.buf[n])})}s.length&&this.postMeter({cmd:"forget",ids:s})}stepFine(e,o,s){const a=this.phiAt===null?0:Math.min(.25,Math.max(0,(o-this.phiAt)/1e3));this.phiAt=o,!(s&&this.A&&this.B)&&(this.wide.A&&this.wide.B?e&&this.A&&this.B&&!this.standingNeedsMap()?this.phi=Math.min(1,this.phi+a/H1):this.phi=Math.max(0,this.phi-a/K1):this.phi=this.A&&this.B?1:0,this.stats.follow.fine=this.phi)}delPair(e){for(const o of new Set([e.A,e.B,e.wide?.A,e.wide?.B]))o&&this.delMap(o)}fade(){const e=performance.now(),o=this.lastWall===null?0:m1((e-this.lastWall)/1e3);if(this.lastWall=e,this.debugFadeHold)return;const s=this.maps(),a=!!s&&!!s.A.reading&&!!s.B.reading;this.unmetered=s&&!a?this.unmetered+1:0,a&&(this.stats.first.metered??=e),this.w>=1&&(this.stats.first.faded??=e);const n=s!==null&&this.programReady()&&(a||this.w>0||!this.useBackgroundMeter()&&this.unmetered>ep);this.retiring&&this.retOut!==null&&n&&(this.retOut=Math.max(0,this.retOut-o)),this.retOut===0&&this.outAt===null&&(this.outAt=e);const r=!!this.retiring&&this.retOut!==null&&(this.retOut>0||e-(this.outAt??e)<1e3*this.holdS),i=n&&(!r||this.w>0);if(this.w=i?Math.min(1,this.w+o):0,this.retiring&&this.w>=1){const l=this.retiring;this.retiring=null,this.retShare=0,this.retOut=null,this.outAt=null,this.defer(()=>this.delPair(l))}this.stats.w=this.w}programReady(){if(this.linked)return!0;if(this.progQueue.length||!this.pX||!this.pR||!this.pRed||!this.pC||this.pM.length<3)return!1;const e=[this.pX,this.pR,this.pRed,this.pC,...this.pM];if(!e.every(o=>o.done()))return!1;try{for(const o of e)o.check();return this.linked=!0,this.stats.first.linked??=performance.now(),!0}catch(o){return this.stats.failed=`zoneCurtainCompose: ${o instanceof Error?o.message:String(o)}`,!1}}askPrograms(e){for(let o=0;o<e&&this.progQueue.length;o++)this.progQueue.shift()()}linked=!1;defer(e){this.trash.push(e)}flush(){if(this.trash.length)for(const e of this.trash.splice(0))e()}fdt(){if(!this.fdts.length)return 1/60;const e=[...this.fdts].sort((o,s)=>o-s);return Math.min(.1,Math.max(1/240,e[e.length>>1]))}programs(e,o,s=!1){const a=o.res;if(!e.getExtension("EXT_color_buffer_float"))throw new Error("EXT_color_buffer_float missing");this.accFmt=f1(o.floatBlend||!!e.getExtension("EXT_float_blend"))==="rgba32f"?e.RGBA32F:e.RGBA16F,this.stats.target=this.accFmt===e.RGBA32F?"rgba32f":"rgba16f",this.stats.first.programs??=performance.now(),this.progQueue=[()=>{this.pX=J1(e,a)},()=>{this.pR=a.programDeferred("zoneCurtainRaster",li,this.fastAtlasBake?a1:ci)},()=>{this.pRed=a.programDeferred("zoneCurtainRed",Ye,i1)}],s||this.progQueue.push(()=>{this.pC=a.programDeferred("zoneCurtainCompose",Ye,this.opt.fixedAtlas?n1:ui)},()=>{this.pM.push(a.programDeferred("zoneCurtainMeter",Ye,l1))},()=>{this.pM.push(a.programDeferred("zoneCurtainMeterBlock",Ye,c1))},()=>{this.pM.push(a.programDeferred("zoneCurtainMeterFinal",Ye,h1))}),e.getExtension("KHR_parallel_shader_compile")?this.askPrograms(1/0):this.askPrograms(1),e.activeTexture(e.TEXTURE15),this.redTex=a.texture(Gt,1,e.RG32F,e.RG,e.FLOAT,new Float32Array(2*Gt)),e.activeTexture(e.TEXTURE0),this.vaoR=e.createVertexArray(),this.vaoD=e.createVertexArray();for(const r of[this.vaoR,this.vaoD])a.vaos.add(r);this.quad=e.createBuffer(),a.buffers.add(this.quad),a.recordBuffer(this.quad,Li.byteLength),e.bindVertexArray(this.vaoR),e.bindBuffer(e.ARRAY_BUFFER,this.quad),e.bufferData(e.ARRAY_BUFFER,Li,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);for(let r=1;r<=Zt.length;r++)e.enableVertexAttribArray(r),e.vertexAttribDivisor(r,1);for(const r of Re){const i=e.createVertexArray();a.vaos.add(i),e.bindVertexArray(i);for(let l=0;l<12;l++)e.enableVertexAttribArray(l);this.expandInputs.set(r,{vao:i,buffers:[]})}e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null),this.tfo=e.createTransformFeedback();const n=e.createBuffer();a.buffers.add(n),this.out={buf:n,cap:0},e.activeTexture(e.TEXTURE15),this.kTex=a.texture(9,J,e.RG32F,e.RG,e.FLOAT,kc(9)),e.activeTexture(e.TEXTURE0)}localMeterMap=null;localMeterAtlas=null;localMeterAtlasId=-1;localMeterCrops=[];localMeterStateUse=[];localMeterSample=null;localMeterCull=!0;initMeterRaster(e,o,s=!0){const a=e.gl;this.localMeterCull=s,this.res=e,this.programs(a,{res:e,floatBlend:!!a.getExtension("EXT_float_blend")},!0),this.askPrograms(1/0);for(const n of[this.pX,this.pR,this.pRed])n.check();this.uploadTables(a,o),this.localMeterSample=e.program("zoneCurtainMeterMap",Ye,u1)}meterRasterOf(e,o,s,a){const n=this.res,r=a.n,{F:i,R:l,U:c}=ja(a.axis),u={f:[i[0],i[1],i[2]],r:[l[0],l[1],l[2]],up:[c[0],c[1],c[2]],tanH:a.tanR,size:r};let h=this.localMeterMap;if(!h||h.n!==r){h&&n.deleteTarget(h.core);const p=n.target(r,r,e.RGBA32F,e.RGBA);h=this.localMeterMap={cam:u,n:r,core:p,env:p,T:o.t,kR:o.kR,reading:null,readKey:"",gen:0,red:null,faceIndex:0}}h.cam=u,this.meterAtlasOf(e,o,s,h),e.bindFramebuffer(e.FRAMEBUFFER,h.core.fbo);const f=new Float32Array(r*r*4);e.readPixels(0,0,r,r,e.RGBA,e.FLOAT,f);const m=e.getError();if(m!==e.NO_ERROR||e.isContextLost())throw new Error(`worker meter raster WebGL error ${m}`);return f}meterGpuStates(e,o){const s=new Set(o.map(a=>a.id));this.localMeterStateUse=[...s,...this.localMeterStateUse.filter(a=>!s.has(a))].slice(0,8),this.ring=this.ring.filter(a=>{if(this.localMeterStateUse.includes(a.msg.id))return!0;for(const n of Re)this.res.deleteBuffer(a.buf[n]);return!1});for(const a of new Set(o))this.ring.some(n=>n.msg.id===a.id)||this.pending.push(a);this.take(e,!0),this.flush()}meterAtlasOf(e,o,s,a){const n=this.res,r=a.cam,i=o.atlas,l=i[0].size;this.localMeterAtlas?.n!==l&&(this.localMeterAtlas&&this.delMap(this.localMeterAtlas),this.localMeterAtlas=this.newWideMap(i,!0),this.localMeterAtlasId=-1);const c=this.localMeterAtlas,u=[];for(let d=0;d<i.length;d++){const _=I1(r,i[d]);if(!_.length)continue;const{cube:v,...A}=this.faceOf(c,d);A.meterCrop={core:yi(_,A.cam,A.core,!1),env:yi(_,A.cam,A.env,A.env.w>A.env.h)},u.push(A)}const h=(d,[_,v,A,g])=>d[0]<=_&&d[1]<=v&&d[0]+d[2]>=_+A&&d[1]+d[3]>=v+g;if(!(this.localMeterAtlasId===o.id&&u.every(d=>{const _=this.localMeterCrops[d.faceIndex],v=d.meterCrop;return _&&h(_.core,v.core)&&h(_.env,v.env)}))){this.clearMap(e,c),this.meterGpuStates(e,s);const d=o.ids.map(g=>this.ring.find(w=>w.msg.id===g));this.scene={level:o.level};const _={T:o.t,X:{...o.interp,S:d},events:[],dropped:0,miss:!1,red:o.red,pt:o.pulse},v=this.localMeterCull?{core:[],env:[]}:void 0;if(v)for(const g of u){const w=g.faceIndex,b=g.meterCrop;v.core[w]=bi(g.cam,g.core,b.core,!1),v.env[w]=bi(g.cam,g.env,b.env,g.env.w>g.env.h)}this.cullAtlas(c,_,v);const A=this.atlasBakeSlices;this.localMeterCrops=[];for(const g of u){this.drawRed(e,g,_);for(let w=0;w<A;w++)this.drawSlice(e,g,_,w,A),e.flush();this.localMeterCrops[g.faceIndex]=g.meterCrop}this.localMeterAtlasId=o.id}const m=this.localMeterSample,p=d=>m.loc.get(d);e.bindFramebuffer(e.FRAMEBUFFER,a.core.fbo),e.viewport(0,0,a.n,a.n),e.useProgram(m.prog),e.bindVertexArray(this.vaoD),e.uniform3fv(p("uMF"),r.f),e.uniform3fv(p("uMR"),r.r),e.uniform3fv(p("uMU"),r.up),e.uniform2f(p("mT"),c.cam.tanH,c.n),e.uniform1f(p("uN"),a.n),e.uniform1f(p("uTanR"),r.tanH),e.uniform1f(p("uAtlasFilter"),1),e.uniform1f(p("uCubic"),1),n.bindTex(0,c.core.tex,m,"uMap"),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}referenceBands(){return this.opt.envBands===16?[16]:[16,this.opt.envBands]}tablesFor(e,o){return!this.fastAtlasBake||o?this.tables:this.referenceTables??=this.res.transaction(()=>this.tableTextures(e,this.referenceBands().map(s=>er(tr(Oa(),s)))))}tableTextures(e,o){const s=this.res;e.activeTexture(e.TEXTURE15);try{return o.map(a=>{const n=s.texture(a.meta.tiledW,a.meta.tiledH,e.RGBA16F,e.RGBA,e.HALF_FLOAT,a.half);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR);const r=s.texture(a.coefW,a.coefH,e.RGBA32F,e.RGBA,e.FLOAT,a.coef);return{meta:a.meta,tex:n,coef:r}})}finally{e.activeTexture(e.TEXTURE0)}}uploadTables(e,o){const s=this.res,a=o[0]?.windowMass;if(this.fastAtlasBake&&(!a||a.length!==2*Ht*Kt))throw new Error("invalid atlas window mass texture");const{tables:n,windowMass:r}=s.transaction(()=>{const i=this.tableTextures(e,o);let l=this.windowMass;if(a&&!l){e.activeTexture(e.TEXTURE15);try{l=s.texture(Ht,Kt,e.RG16F,e.RG,e.HALF_FLOAT,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR)}finally{e.activeTexture(e.TEXTURE0)}}return{tables:i,windowMass:l}});this.tables=n,this.windowMass=r,this.stats.tableLayers=o.map(i=>i.meta.layers),this.stats.first.tables??=performance.now()}ptOf(e,o,s,a){if(!e.length)return null;const n=this.scene.level;let r=this.refCpu.get(n);return r||(r=jl(_e[n]),this.refCpu.set(n,r)),ec(e,o,r,s,a)}wavesOf(e,o,s,a){const n=_e[this.scene.level],[r,i]=a?[-760,760]:this.footRange(s);return{x0:r,x1:i,ev:e.msg.wx?ap(e.msg.wx.pulses,o,r,i,Ti):tc(n,this.scene,o,r,i,Ti)}}ptTexOf(e,o){let s=this.ptPool.find(r=>r.job===o);if(s)return s.tex;const a=this.res;e.activeTexture(e.TEXTURE15),this.ptPool.length<3?(s={tex:a.texture(Ki,3,e.RGBA32F,e.RGBA,e.FLOAT,null),job:null},this.ptPool.push(s)):(s=this.ptPool.shift(),this.ptPool.push(s));const n=o.pt;return e.bindTexture(e.TEXTURE_2D,s.tex),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texSubImage2D(e.TEXTURE_2D,0,0,0,n.n,3,e.RGBA,e.FLOAT,n.data),e.activeTexture(e.TEXTURE0),s.job=o,s.tex}mapCameraOf(e,o=this.opt.margin,s=1){const[a,n,r]=e.dir,i=Math.atan2(a,n)*180/Math.PI,l=Math.asin(Math.max(-1,Math.min(1,r)))*180/Math.PI,c=Math.min(150,Math.max(.5,e.fovDeg)),u=Math.min(e.pitchDeg??this.opt.pitchDegMax,c/128)*s;let h=di(i,l,c,Math.round(c/u),o);return h.size>this.opt.maxMapSize&&(h=di(i,l,c,Math.round(c/u*this.opt.maxMapSize/h.size),o)),h}track(e){const o=performance.now(),s=[e.dir[0],e.dir[1],e.dir[2]],a=this.hist;for(this.view={dir:s,fovDeg:e.fovDeg},a.push({t:o,d:s});a.length>2&&o-a[0].t>150;)a.shift();this.omega=a.length>=2&&o-a[0].t<=400?Qm(a):{axis:[0,0,1],rate:0}}standingNeedsMap(){const e=this.view;if(!e||!this.A||!this.B)return!1;const o=ri(e.dir,e.fovDeg*Math.PI/360,this.A.cam,this.B.cam,null,this.alphaNow(),this.nCur,9);return o.sA+o.sB<o.n-.001}wideStep(e,o,s){const a=this.wide;if(!this.debugWide||this.debugMaps)return!1;const n=this.opt.fixedAtlas,r=n?this.atlasBakeSlices:La,i=r*5,l=this.debugWideMoving??(n?1:s?$1:1);let c=!1;for(let u=0;u<l;u++){if(!a.job){const h=i/l*this.fdt(),f=this.atlasActive?A1(o.tModel,h,this.ring[0].t,this.ring.at(-1).t,a.B?.T??null):o.tModel+2*h;if(f===null)return c;a.acc??=n?this.newAtlas():this.newWideMap(el(Ei)),a.job=this.job(f,a.acc.cam,!0),n&&this.cullAtlas(a.acc,a.job),a.acc.T=a.job.T,a.acc.kR=a.job.X.S[1].msg.kR,a.slice=0,a.startedAt=performance.now(),a.job.miss&&this.stats.follow.wideMisses++,this.clearMap(e,a.acc),this.rememberMeterJob(a.acc,a.job),this.drawRed(e,a.acc,a.job)}if(a.slice<i){const h=this.faceOf(a.acc,a.slice%5),f=this.expandSlice(e,a.job.X,Math.floor(a.slice/5),r,h,a.job);this.rasterSlice(e,h,f,a.job),a.slice++,c=!0}if(a.slice===i){if(this.atlasActive&&!a.time.mayRotate(a.B?.T??null))return c;n&&(this.noteShown(o.tModel,a.acc.T,a.B?.T??-1/0,a.job),this.stats.first.maps??=performance.now(),a.time.shown??=a.acc.T);const h=a.A;a.A=a.B,a.B=a.acc,a.acc=h,a.job=null,a.rot=0;const f=this.stats.follow;f.wideMaps++,f.wideFrames=i/l,f.wideMs=performance.now()-a.startedAt,f.wideSize=a.B.n}else a.rot++}return c}cullAtlas(e,o,s){const a=o.X.S;if(!this.debugAtlasCull||a.some(i=>!i.msg.bounds))return;const n={},r=this.atlasSlots;r.faces.fill(0),r.all=0;for(const i of Re){const l=a.map(f=>f.msg.sets[i]),c=Math.max(...l.map(f=>f.n)),u=i==="core"?"core":"env",h=gc(l,a.map(f=>f.msg.bounds[i]),o.X.w,e.cube,this.opt.cut,2/(u==="core"?e.n/2:e.env.h),s?.[u]);for(let f=0;f<h.length;f++)for(const[,m]of h[f])r.faces[f]=r.faces[f]+m;r.all+=c*h.length,n[i]=h}r.kept=r.faces.reduce((i,l)=>i+l,0),o.spans=n}newWideMap(e,o=!1){const s=this.res,a=s.gl,n=e[0].size;a.activeTexture(a.TEXTURE15);const r=n/(o?Ri:2),i=s.target(5*n,n+(o?r:0),o?a.RGBA16F:this.accFmt,a.RGBA),l=o?{...i,w:7*r,h:r,y0:n}:s.target(5*r,r,this.accFmt,a.RGBA),c={cam:e[0],n,core:i,env:l,T:0,kR:0,reading:null,readKey:"",gen:0,red:null,cube:e,filtered:o};return o&&(a.bindTexture(a.TEXTURE_2D,i.tex),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR)),a.activeTexture(a.TEXTURE0),c}faceOf(e,o){const s=e.n,a=e.env.h,n={...e.core,...e.filtered?Ym(o,s):{w:s,h:s,x0:o*s}},r={...e.env,...e.filtered?Vm(o,s,a):{w:a,h:a,x0:o*a}};return{...e,faceIndex:o,cam:e.cube[o],core:n,env:r}}newMap(e,o=this.mapCameraOf(e)){const s=this.res,a=s.gl;a.activeTexture(a.TEXTURE15);const n={cam:o,n:o.size,core:s.target(o.size,o.size,this.accFmt,a.RGBA),env:s.target(o.size/2,o.size/2,this.accFmt,a.RGBA),T:0,kR:0,reading:null,readKey:"",gen:0,red:null};return a.activeTexture(a.TEXTURE0),n}delMap(e){this.releaseMeterJob(e),e.gen++;const o=this.res;o&&(o.deleteTarget(e.core),e.env.fbo!==e.core.fbo&&o.deleteTarget(e.env))}recenter(e,o){const s=this.mapCameraOf(e);if(o&&o.n===s.size)return o.cam=s,o;if(o){const a=o;this.defer(()=>this.delMap(a))}return this.newMap(e,s)}clearMap(e,o){this.releaseMeterJob(o),o.reading=null,o.readKey="",o.gen++,e.disable(e.SCISSOR_TEST);for(const s of o.core.fbo===o.env.fbo?[o.core]:[o.core,o.env])e.bindFramebuffer(e.FRAMEBUFFER,s.fbo),e.viewport(0,0,s.w,s.h),e.clearBufferfv(e.COLOR,0,[0,0,0,0])}rememberMeterJob(e,o){if(!this.useBackgroundMeter()||this.debugHold||!e.filtered||!e.cube)return;const{S:s,w:a,u2:n,wc:r}=o.X,i=s.map(l=>l.msg.id);e.meterJob={id:++this.meterMapId,t:o.T,level:this.scene.level,ids:i,interp:{w:a,u2:n,wc:r},kR:s[1].msg.kR,red:o.red,pulse:o.pt,atlas:e.cube,atlasFast:this.fastAtlasBake},this.postMeter({cmd:"pin",ids:i})}releaseMeterJob(e){e.meterJob&&(this.postMeter({cmd:"unpin",ids:e.meterJob.ids}),e.meterJob=null)}job(e,o,s=!1){const a=this.ring;let n=-1;for(let _=0;_<a.length-1;_++)a[_].t<=e+1e-9&&(n=_);let r=!1;n<0&&(n=0),e>a[a.length-1].t+1e-9&&(r=!0,e=a[a.length-1].t,n=a.length-2);const i=!a[n+2],l=a[Math.max(0,n-1)],c=a[n],u=a[n+1],h=a[n+2]??(this.stats.miss3++,u),f=Math.min(1,Math.max(0,(e-c.t)/(u.t-c.t))),{x0:m,x1:p,ev:d}=this.wavesOf(c,e,o,s);return this.stats.eventsDropped+=d.dropped,{T:e,X:{S:[l,c,u,h],...fi(this.opt.mode,f)},events:d.events,dropped:d.dropped,miss:r,red:Mi(c,u,f),miss3:i,pt:this.ptOf(d.events,e,m,p)}}footRange(e){let o=1/0,s=-1/0;for(const a of[-1,0,1])for(const n of[-1,0,1]){const r=[0,1,2].map(c=>e.f[c]+a*e.tanH*e.r[c]+n*e.tanH*e.up[c]),i=Math.hypot(r[0],r[1],r[2]),l=r[2]/i;if(!(l>.02)){o=Math.min(o,-700),s=Math.max(s,700);continue}for(const c of[84,300]){const u=Sc(c,l)*r[0]/i;o=Math.min(o,u),s=Math.max(s,u)}}return[Math.max(-760,o-60),Math.min(760,s+60)]}fillMap(e,o,s){const a=this.job(s,o.cam,!!o.cube),n=o.filtered?this.atlasBakeSlices:this.nCur;o.filtered&&this.cullAtlas(o,a),o.T=a.T,o.kR=a.X.S[1].msg.kR,o.pt=a.pt,this.clearMap(e,o),this.rememberMeterJob(o,a),this.drawRed(e,o,a);for(let r=0;r<n;r++)this.drawSlice(e,o,a,r,n);return o}drawRed(e,o,s){o.red=s.red;const a=this.pRed;if(!a||!this.redTex||!s.red||this.debugRedOff)return;const n=Gt,r=new Float32Array(2*n);for(let l=0;l<n;l++)r[2*l]=s.red.A[l],r[2*l+1]=s.red.Y[l];e.activeTexture(e.TEXTURE15),e.bindTexture(e.TEXTURE_2D,this.redTex),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texSubImage2D(e.TEXTURE_2D,0,0,0,n,1,e.RG,e.FLOAT,r),e.useProgram(a.prog),e.bindVertexArray(this.vaoD),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD),e.colorMask(!1,!1,!0,!1);const i=l=>a.loc.get(l);e.uniform2f(i("uObs"),0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.redTex),e.uniform1i(i("uLine"),0),e.bindFramebuffer(e.FRAMEBUFFER,o.env.fbo);for(const l of o.cube?o.cube.map((c,u)=>this.faceOf(o,u)):[o]){const c=l.cam,u=l.env,h=u.x0??0,f=u.y0??0;e.viewport(h,f,u.w,u.h),l.meterCrop&&(e.enable(e.SCISSOR_TEST),e.scissor(...l.meterCrop.env)),e.uniform3fv(i("uF"),c.f),e.uniform3fv(i("uR"),c.r),e.uniform3fv(i("uU"),c.up),e.uniform1f(i("uTanH"),c.tanH),e.uniform2f(i("uRasterSize"),u.w,u.h),e.uniform1f(i("uSwapXY"),u.w>u.h?1:0),e.uniform1f(i("uOff"),h),e.uniform1f(i("uYOff"),f),e.drawArrays(e.TRIANGLES,0,3)}e.colorMask(!0,!0,!0,!0),e.disable(e.BLEND),e.bindVertexArray(null),o.meterCrop&&e.disable(e.SCISSOR_TEST),this.stats.redPasses++}drawSlice(e,o,s,a,n){let r=[];for(const i of o.cube?o.cube.map((l,c)=>this.faceOf(o,c)):[o])r=this.expandSlice(e,s.X,a,n,i,s),this.rasterSlice(e,i,r,s);return r}groups(e=this.tables){return tp(e.length>1?1:0)}sliceSegs(e,o,s){const a=this.tablesFor(this.res.gl,s?!!s.filtered:this.opt.fixedAtlas);return this.groups(a).reduce((n,r)=>n+Math.ceil(a[r.tab].meta.B/o)*Math.max(...e.S.map(i=>i.n[r.set])),0)}expandSlice(e,o,s,a,n,r=null){const i=this.tablesFor(e,!!n.filtered),l=this.pX,c=this.out,u=this.groups(i),h=n.cam,f=u.map(g=>n.faceIndex!==void 0&&r?.spans?r.spans[g.set][n.faceIndex]:[[0,Math.max(...o.S.map(w=>w.n[g.set]))]]),m=f.map(g=>g.reduce((w,[,b])=>w+b,0)),p=u.reduce((g,w,b)=>g+Math.ceil(i[w.tab].meta.B/a)*m[b],0);if(!p)return this.stats.segsLastSlice=0,[];p*lt*4>c.cap&&(c.cap=Math.ceil(p*lt*4*1.25),e.bindBuffer(e.ARRAY_BUFFER,c.buf),e.bufferData(e.ARRAY_BUFFER,c.cap,e.DYNAMIC_COPY),this.res.recordBuffer(c.buf,c.cap),e.bindBuffer(e.ARRAY_BUFFER,null)),e.useProgram(l.prog),e.enable(e.RASTERIZER_DISCARD);const d=g=>l.loc.get(g);e.uniform3fv(d("uF"),h.f),e.uniform3fv(d("uR"),h.r),e.uniform3fv(d("uU"),h.up),e.uniform1f(d("uTanH"),h.tanH),e.uniform4fv(d("uCW"),Float32Array.from(o.w)),e.uniform1f(d("uU2"),o.u2),e.uniform1f(d("uWC"),o.wc),e.uniform1f(d("uSlice"),s),e.uniform1f(d("uNS"),a),e.uniform1f(d("uCutB"),this.opt.cut),e.uniform1f(d("uObsX"),0),e.uniform1f(d("uTightBounds"),n.filtered?1:0);const _=r?.pt??null;if(_){const g=this.ptTexOf(e,r);e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,g)}e.uniform1i(d("uPT"),3),e.uniform4f(d("uPTD"),_?.x0??0,_?.dx??1,_?.n??1,_?1:0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,this.kTex),e.uniform1i(d("uK"),1),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,this.tfo),p&&(e.bindBufferRange(e.TRANSFORM_FEEDBACK_BUFFER,0,c.buf,0,p*lt*4),e.beginTransformFeedback(e.POINTS));const v=[];let A=0;for(const[g,w]of u.entries()){const b=i[w.tab],T=b.meta,k=Math.ceil(T.B/a),R=m[g];if(!R){v.push({tgt:w.tgt,tab:w.tab,pulse:w.pulse,first:A,count:0});continue}const{w:F,h:S}=n[w.tgt],M=w.tgt==="env"&&F>S;e.uniform1f(d("uPx"),2/Math.min(F,S)),n.filtered&&this.debugAtlasPixelPadding?e.uniform2f(d("uAtlasPixel"),2/(M?S:F),2/(M?F:S)):e.uniform2f(d("uAtlasPixel"),0,0),e.uniform1f(d("uB"),T.B),e.uniform1f(d("uBW"),T.bandW),e.uniform1f(d("uNG"),T.ngroup),e.uniform1f(d("uGR"),T.groupRows),e.uniform1f(d("uNL"),T.nl),e.uniform1f(d("uPulse"),w.pulse),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,b.coef),e.uniform1i(d("uCoef"),2);const P=this.expandInputs.get(w.set);e.bindVertexArray(P.vao),o.S.forEach((L,C)=>{const O=L.buf[w.set];if(P.buffers[C]!==O){e.bindBuffer(e.ARRAY_BUFFER,O);for(let z=0;z<3;z++)e.vertexAttribPointer(3*C+z,4,e.FLOAT,!1,we*4,16*z);P.buffers[C]=O}}),e.bindBuffer(e.ARRAY_BUFFER,null);for(let L=0;L<k;L++){e.vertexAttrib1f(12,L);for(const[C,O]of f[g])e.drawArrays(e.POINTS,C,O)}v.push({tgt:w.tgt,tab:w.tab,pulse:w.pulse,first:A,count:k*R}),A+=k*R}return p&&e.endTransformFeedback(),e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER,0,null),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,null),e.disable(e.RASTERIZER_DISCARD),e.bindVertexArray(null),e.activeTexture(e.TEXTURE0),this.stats.segsLastSlice=A,v}rasterSlice(e,o,s,a){if(!s.length)return;const n=this.fastAtlasBake&&o.filtered,r=this.tablesFor(e,!!o.filtered),i=this.fastAtlasBake&&!n?this.referenceRaster??=this.res.program("zoneCurtainReferenceRaster",li,ci):this.pR,l=o.cam,c=f=>i.loc.get(f);e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.useProgram(i.prog),e.bindVertexArray(this.vaoR),n&&this.res.bindTex(1,this.windowMass,i,"uWindowMass"),e.uniform3fv(c("uF"),l.f),e.uniform3fv(c("uR"),l.r),e.uniform3fv(c("uU"),l.up),e.uniform1f(c("uTanH"),l.tanH),e.uniform1f(c("uCut2"),this.opt.cut**2),e.uniform1f(c("uPInv"),1/(_e[this.scene.level].pulse5?.sig??14)),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD);let u=null,h=-1;e.bindBuffer(e.ARRAY_BUFFER,this.out.buf);for(const f of s){if(!f.count)continue;const m=f.tgt==="env"?o.env:o.core;if(m!==u){m.fbo!==u?.fbo&&e.bindFramebuffer(e.FRAMEBUFFER,m.fbo),u=m;const p=m,d=p.x0??0,_=p.y0??0;e.viewport(d,_,m.w,m.h),e.uniform2f(c("uRasterSize"),m.w,m.h),e.uniform1f(c("uOff"),d),e.uniform1f(c("uYOff"),_),o.meterCrop&&(e.enable(e.SCISSOR_TEST),e.scissor(...o.meterCrop[f.tgt])),e.uniform1f(c("uSwapXY"),f.tgt==="env"&&m.w>m.h?1:0)}if(f.tab!==h){h=f.tab;const p=r[f.tab],d=p.meta;e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,p.tex),e.uniform1i(c("uTab"),0),e.uniform1f(c("uBW"),d.bandW),e.uniform1f(c("uN"),d.n),e.uniform4f(c("uTabD"),d.width,d.height,d.tilesX,d.tiledW),e.uniform1f(c("uTexH"),d.tiledH)}for(let p=0;p<Zt.length;p++)e.vertexAttribPointer(1+p,4,e.FLOAT,!1,lt*4,(f.first*lt+4*p)*4);e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,f.count)}e.bindBuffer(e.ARRAY_BUFFER,null),e.disable(e.BLEND),e.bindVertexArray(null),e.activeTexture(e.TEXTURE0),o.meterCrop&&e.disable(e.SCISSOR_TEST)}bindMaps(e,o,s,a,n=!1){const r=s.wide??null,i=s.fine??1;if(r?.A.filtered&&r.B.filtered&&i===0){const l=r.alpha===1?r.B:r.A,c=l===r.B?0:r.alpha;if(e.activeTexture(e.TEXTURE0+a),e.bindTexture(e.TEXTURE_2D,l.core.tex),e.activeTexture(e.TEXTURE1+a),e.bindTexture(e.TEXTURE_2D,r.B.core.tex),e.uniform1i(o.loc.get("cC"),a),e.uniform1i(o.loc.get("dC"),a+1),!n){for(const u of["aC","aE","bC","bE","cE"])e.uniform1i(o.loc.get(u),a);e.uniform1i(o.loc.get("dE"),a+1),e.uniform1f(o.loc.get("uFine"),0),e.uniform1f(o.loc.get("uHasW"),1)}e.uniform2f(o.loc.get("cT"),r.A.cam.tanH,r.A.n),e.uniform1f(o.loc.get("uAlphaW"),c),e.uniform1f(o.loc.get("uKC"),s.A.kR>0?r.A.kR/s.A.kR:1),e.uniform1f(o.loc.get("uCubic"),this.debugCubic?1:0),e.uniform1f(o.loc.get("uAtlasFilter"),1);return}[["a",s.A,a],["b",s.B,a+2],["c",r?.A??s.A,a+4],["d",r?.B??s.B,a+6]].forEach(([l,c,u])=>{(l==="a"||l==="b")&&(e.uniform3fv(o.loc.get(l+"F"),c.cam.f),e.uniform3fv(o.loc.get(l+"R"),c.cam.r),e.uniform3fv(o.loc.get(l+"U"),c.cam.up),e.uniform2f(o.loc.get(l+"T"),c.cam.tanH,c.n)),e.activeTexture(e.TEXTURE0+u),e.bindTexture(e.TEXTURE_2D,c.core.tex),e.uniform1i(o.loc.get(l+"C"),u),e.activeTexture(e.TEXTURE1+u),e.bindTexture(e.TEXTURE_2D,c.env.tex),e.uniform1i(o.loc.get(l+"E"),u+1)}),e.uniform2f(o.loc.get("cT"),r?r.A.cam.tanH:1,r?r.A.n:2),e.uniform1f(o.loc.get("uAlpha"),s.alpha),e.uniform1f(o.loc.get("uReveal"),al(s.alpha,this.nCur)),e.uniform1f(o.loc.get("uFine"),r?i:1),e.uniform1f(o.loc.get("uHasW"),r?1:0),e.uniform1f(o.loc.get("uAlphaW"),r?.alpha??0),e.uniform1f(o.loc.get("uKC"),r&&s.A.kR>0?r.A.kR/s.A.kR:1),e.uniform1f(o.loc.get("uCubic"),this.debugCubic?1:0),e.uniform1f(o.loc.get("uAtlasFilter"),r?.A.filtered?1:0)}debugCubic=!0;display(e,o,s,a,n,r,i=null,l=1){const c=this.res;this.pD??=c.program("zoneCurtainDisplay",Ye,s1);const u=this.pD;e.useProgram(u.prog),e.bindVertexArray(this.vaoD),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,o.fbo),e.viewport(0,0,o.w,o.h),e.uniform3fv(u.loc.get("uF"),s.f),e.uniform3fv(u.loc.get("uR"),s.r),e.uniform3fv(u.loc.get("uU"),s.up),e.uniform1f(u.loc.get("uTanH"),s.tanH),e.uniform1f(u.loc.get("uSize"),o.w);const h=i&&"A"in i&&"alpha"in i?i:null;this.bindMaps(e,u,{A:a,B:n,alpha:r,wide:h,fine:l},0),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),e.activeTexture(e.TEXTURE0)}debugShown(e,o,s){const a=this.maps();a&&((a.fine??1)===0&&a.wide?this.display(e,o,s,a.wide.A,a.wide.B,a.wide.alpha,a.wide,0):this.display(e,o,s,a.A,a.B,a.alpha,a.wide??null,a.fine??1))}debugShownOf(e,o,s,a){a.cube?this.display(e,o,s,a,a,0,{A:a,B:a,alpha:0},0):this.display(e,o,s,a,a,0,null,1)}debugReferenceKinds=["fine","wide"];debugReference(e,o,s){if(this.lastT===null||this.ring.length<4)return null;const a=_o(e),n={dir:[s.dir[0],s.dir[1],s.dir[2]],fovDeg:s.fovDeg};try{const r=Math.min(this.opt.pitchDegMax,Math.min(150,Math.max(.5,s.fovDeg))/128),i=this.newMap(n,o==="wide"?this.mapCameraOf(n,this.opt.margin,Ei/r):this.mapCameraOf(n));return this.fillMap(e,i,this.lastT)}finally{xo(e,a)}}debugReferenceDone(e){this.delMap(e)}debugState(){return{ring:this.ring.map(e=>({t:e.t,k:e.k,sets:e.msg.sets})),tables:this.tables?.map(e=>e.meta)??null,scene:this.scene,A:this.A,B:this.B,Ta:this.Ta,Tb:this.Tb,trash:this.trash.length,w:this.w,retiring:this.retiring!==null,retShare:this.retShare}}debugJob(e,o,s,a){const n=e.map(c=>this.ring[c]),{x0:r,x1:i,ev:l}=this.wavesOf(n[1],s,a,!1);return{T:s,X:{S:n,...fi(this.opt.mode,o)},events:l.events,dropped:l.dropped,miss:!1,red:Mi(n[1],n[2],o),pt:this.ptOf(l.events,s,r,i)}}async debugRun(e,o,s,a,n){this.res=o,this.worker&&this.restart(),this.flush(),this.scene=s,this.key=JSON.stringify(s),this.lastT=null,this.start({tModel:a[0]+this.opt.dt}),this.pX||this.programs(e,{res:o,floatBlend:n}),this.askPrograms(1/0),this.inFlight=!0;for(const l of a)this.post({cmd:"state",id:++this.reqId,t:l,cull:null});const r=performance.now();for(;this.pending.length<a.length||!(this.tables||this.pendingTables)||!this.programReady();){if(this.stats.failed)throw new Error(this.stats.failed);if(performance.now()-r>12e4)throw new Error("zoneCurtain debugRun: no states after 120 s");await new Promise(l=>{this.waiters.push(l),setTimeout(l,100)})}const i=_o(e);try{this.take(e,!0)}finally{xo(e,i)}}readOut(e,o,s){const a=new Float32Array(s*lt);return e.bindBuffer(e.ARRAY_BUFFER,this.out.buf),e.getBufferSubData(e.ARRAY_BUFFER,o*lt*4,a),e.bindBuffer(e.ARRAY_BUFFER,null),a}readTarget(e,o){const s=new Float32Array(o.w*o.h*4);return e.bindFramebuffer(e.FRAMEBUFFER,o.fbo),e.readPixels(o.x0??0,o.y0??0,o.w,o.h,e.RGBA,e.FLOAT,s),s}}function np(t,e,o){const{axis:s,n:a,tanR:n,cls:r,weights:i,ext:l,optics:c}=e,u=ja(s),h=Va(r),f=Za(r),m=a*a,p=new Float64Array(4*m),d=f>=0?new Float64Array(4*m):null,_=c.sky[0]??0,v=c.sky.length/4-1;for(let g=0;g<a;g++)for(let w=0;w<a;w++){const b=Wm(u,a,n,w,g);if(!b)continue;const[T,k,R]=b.d;if(R<=0||R<Au(c.edge,Math.atan2(T,k)*180/Math.PI))continue;const F=gu(R),S=4*(g*a+w),M=Math.min(1,Math.max(0,b.angle/c.maxAngleRad))*v,P=Math.floor(M),L=_>0?Math.max(0,c.sky[4*P]*(1-(M-P))+c.sky[4*Math.min(P+1,v)]*(M-P))/_:1;h.forEach((C,O)=>{p[S+O]=t[S+r[C]]*o*L*Jn(l,C,F)}),d&&(d[S]=t[S+2]*o*L*Jn(l,f,F))}const A=ai(p,a,h,h.map(g=>i[g]??0));if(d){const g=ai(d,a,[f],[i[f]??0]);A.sums[f]=g.sums[f],A.box[f]=g.box[f],A.boxTotal+=g.boxTotal}return A}const vo=globalThis,go=new Map,os=new Map;let wo=null,Ci=!1,Mo=16,dl=4;function Pi(t){const e=os.get(t);if(e)return e;const o=new sp({fixedAtlas:t,envBands:Mo,cut:dl}),s=[];vu(n=>{n.cmd==="tables"&&s.push(...n.tables)})({cmd:"tables",bands:t?[ul]:Mo===16?[16]:[16,Mo],atlasFast:t}),o.initMeterRaster(wo,s);const a={pass:o,lastMap:-1};return os.set(t,a),a}vo.onmessage=({data:t})=>{if(!Ci)try{if(t.cmd==="init"){const a=new OffscreenCanvas(1,1).getContext("webgl2",{antialias:!1,depth:!1,stencil:!1,alpha:!1});if(!a||!a.getExtension("EXT_color_buffer_float"))throw new Error("worker WebGL2 float targets unavailable");wo=new Ml(a),Mo=t.envBands,dl=t.cut,Pi(t.atlasFast),vo.postMessage({cmd:"ready"});return}if(t.cmd==="state"){const a=t.state;a.bounds??={core:Qo(a.sets.core),env:Qo(a.sets.env),glow:Qo(a.sets.glow)},go.set(a.id,{msg:a,inRing:!0,pins:0});return}if(t.cmd!=="measure"){for(const a of t.ids){const n=go.get(a);n&&(t.cmd==="forget"?n.inRing=!1:n.pins+=t.cmd==="pin"?1:-1,!n.inRing&&n.pins===0&&go.delete(a))}return}if(!wo)throw new Error("meter not initialized");const e=Array(t.jobs.length).fill(null),o=[],s=t.jobs.map((a,n)=>({job:a,i:n,cached:os.get(a.atlasFast)?.lastMap===a.id}));s.sort((a,n)=>Number(n.cached)-Number(a.cached));for(const{job:a,i:n}of s){const r=performance.now(),i=a.ids.map(u=>go.get(u)?.msg);if(!i.every(u=>u!==void 0))continue;const l=Pi(a.atlasFast),c=l.pass.meterRasterOf(wo.gl,a,i,t.view);l.lastMap=a.id,e[n]=np(c,t.view,a.kR),o.push(performance.now()-r)}vo.postMessage({cmd:"result",id:t.id,rows:e,ms:o})}catch(e){Ci=!0,vo.postMessage({cmd:"error",message:e instanceof Error?e.message:String(e)})}};
