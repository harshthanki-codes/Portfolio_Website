"use client";import{i as e,t}from"./react.SIfiwpqq.js";import{C as n,I as r,Q as i,R as a,S as o,W as s,_ as c,a as l,c as u,et as ee,i as d,k as f,l as te,n as ne,p,s as m,tt as re,u as h,v as ie,z as g}from"./three.module.BVjy_19e.js";import{t as _}from"./jsx-runtime.XNvk5S4D.js";var v=e(t(),1),y=_();function b({color1:e=`orange`,color2:t=`orange`,color3:_=`orange`,mouseForce:b=20,cursorSize:x=100,isViscous:S=!1,viscous:C=30,iterationsViscous:w=32,iterationsPoisson:T=32,dt:E=.014,BFECC:D=!0,resolution:O=.5,isBounce:k=!1,autoDemo:A=!0,autoSpeed:j=.5,autoIntensity:M=2.2,takeoverDuration:N=.25,autoResumeDelay:P=3e3,autoRampDuration:F=.6,style:I,className:L}){let R=(0,v.useRef)(null),z=(0,v.useRef)(null),B=(0,v.useRef)(null),V=(0,v.useRef)(null),H=(0,v.useRef)(null),U=(0,v.useRef)(!0),W=(0,v.useRef)(null);return(0,v.useEffect)(()=>{if(!R.current)return;class v{width=0;height=0;aspect=1;pixelRatio=1;container=null;renderer=null;clock=null;delta=0;time=0;init(e){this.container=e,this.pixelRatio=Math.min(window.devicePixelRatio||1,2),this.resize(),this.renderer=new ne({antialias:!0,alpha:!0}),this.renderer.autoClear=!1,this.renderer.setClearColor(new h(0),0),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height),this.renderer.domElement.style.width=`100%`,this.renderer.domElement.style.height=`100%`,this.renderer.domElement.style.display=`block`,this.clock=new te,this.clock.start()}resize(){if(!this.container)return;let e=this.container.getBoundingClientRect();this.width=Math.max(1,Math.floor(e.width)),this.height=Math.max(1,Math.floor(e.height)),this.aspect=this.width/this.height,this.renderer&&this.renderer.setSize(this.width,this.height,!1)}update(){this.clock&&(this.delta=this.clock.getDelta(),this.time+=this.delta)}dispose(){this.renderer&&=(this.renderer.dispose(),null)}}class y{container=null;mouseMoved=!1;coords=new i;coords_old=new i;diff=new i;timer=null;isHoverInside=!1;hasUserControl=!1;isAutoActive=!1;autoIntensity=2;takeoverActive=!1;takeoverStartTime=0;takeoverDuration=.25;takeoverFrom=new i;takeoverTo=new i;onInteract=null;init(e){this.container=e,e.addEventListener(`mousemove`,this._onMouseMove,!1),e.addEventListener(`touchstart`,this._onTouchStart,!1),e.addEventListener(`touchmove`,this._onTouchMove,!1),e.addEventListener(`mouseenter`,this._onMouseEnter,!1),e.addEventListener(`mouseleave`,this._onMouseLeave,!1),e.addEventListener(`touchend`,this._onTouchEnd,!1)}dispose(){this.container&&(this.container.removeEventListener(`mousemove`,this._onMouseMove,!1),this.container.removeEventListener(`touchstart`,this._onTouchStart,!1),this.container.removeEventListener(`touchmove`,this._onTouchMove,!1),this.container.removeEventListener(`mouseenter`,this._onMouseEnter,!1),this.container.removeEventListener(`mouseleave`,this._onMouseLeave,!1),this.container.removeEventListener(`touchend`,this._onTouchEnd,!1))}setCoords(e,t){if(!this.container)return;this.timer&&clearTimeout(this.timer);let n=this.container.getBoundingClientRect(),r=(e-n.left)/n.width,i=(t-n.top)/n.height;this.coords.set(r*2-1,-(i*2-1)),this.mouseMoved=!0,this.timer=setTimeout(()=>{this.mouseMoved=!1},100)}setNormalized(e,t){this.coords.set(e,t),this.mouseMoved=!0}_onMouseMove=e=>{if(this.onInteract&&this.onInteract(),this.isAutoActive&&!this.hasUserControl&&!this.takeoverActive&&this.container){let t=this.container.getBoundingClientRect(),n=(e.clientX-t.left)/t.width,r=(e.clientY-t.top)/t.height;this.takeoverFrom.copy(this.coords),this.takeoverTo.set(n*2-1,-(r*2-1)),this.takeoverStartTime=performance.now(),this.takeoverActive=!0,this.hasUserControl=!0,this.isAutoActive=!1;return}this.setCoords(e.clientX,e.clientY),this.hasUserControl=!0};_onTouchStart=e=>{if(e.touches.length===1){let t=e.touches[0];this.onInteract&&this.onInteract(),this.setCoords(t.pageX,t.pageY),this.hasUserControl=!0}};_onTouchMove=e=>{if(e.touches.length===1){let t=e.touches[0];this.onInteract&&this.onInteract(),this.setCoords(t.pageX,t.pageY)}};_onTouchEnd=()=>{this.isHoverInside=!1};_onMouseEnter=()=>{this.isHoverInside=!0};_onMouseLeave=()=>{this.isHoverInside=!1};update(){if(this.takeoverActive){let e=(performance.now()-this.takeoverStartTime)/(this.takeoverDuration*1e3);if(e>=1)this.takeoverActive=!1,this.coords.copy(this.takeoverTo),this.coords_old.copy(this.coords),this.diff.set(0,0);else{let t=e*e*(3-2*e);this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo,t)}}this.diff.subVectors(this.coords,this.coords_old),this.coords_old.copy(this.coords),this.coords_old.x===0&&this.coords_old.y===0&&this.diff.set(0,0),this.isAutoActive&&!this.takeoverActive&&this.diff.multiplyScalar(this.autoIntensity)}}class I{mouse;manager;enabled;speed;resumeDelay;rampDurationMs;active=!1;current=new i(0,0);target=new i;lastTime=performance.now();activationTime=0;margin=.2;_tmpDir=new i;constructor(e,t,n){this.mouse=e,this.manager=t,this.enabled=n.enabled,this.speed=n.speed,this.resumeDelay=n.resumeDelay||3e3,this.rampDurationMs=(n.rampDuration||0)*1e3,this.pickNewTarget()}pickNewTarget(){let e=Math.random;this.target.set((e()*2-1)*(1-this.margin),(e()*2-1)*(1-this.margin))}forceStop(){this.active=!1,this.mouse.isAutoActive=!1}update(){if(!this.enabled)return;let e=performance.now();if(e-this.manager.lastUserInteraction<this.resumeDelay){this.active&&this.forceStop();return}if(this.mouse.isHoverInside){this.active&&this.forceStop();return}if(this.active||(this.active=!0,this.current.copy(this.mouse.coords),this.lastTime=e,this.activationTime=e),!this.active)return;this.mouse.isAutoActive=!0;let t=(e-this.lastTime)/1e3;this.lastTime=e,t>.2&&(t=.016);let n=this._tmpDir.subVectors(this.target,this.current),r=n.length();if(r<.01){this.pickNewTarget();return}n.normalize();let i=1;if(this.rampDurationMs>0){let t=Math.min(1,(e-this.activationTime)/this.rampDurationMs);i=t*t*(3-2*t)}let a=this.speed*t*i,o=Math.min(a,r);this.current.addScaledVector(n,o),this.mouse.setNormalized(this.current.x,this.current.y)}}let L=`
      attribute vec3 position;
      uniform vec2 px;
      uniform vec2 boundarySpace;
      varying vec2 uv;
      precision highp float;
      void main(){
        vec3 pos = position;
        vec2 scale = 1.0 - boundarySpace * 2.0;
        pos.xy = pos.xy * scale;
        uv = vec2(0.5)+(pos.xy)*0.5;
        gl_Position = vec4(pos, 1.0);
      }
    `,G=`
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform bool isBFECC;
      uniform vec2 fboSize;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
        if(isBFECC == false){
          vec2 vel = texture2D(velocity, uv).xy;
          vec2 uv2 = uv - vel * dt * ratio;
          vec2 newVel = texture2D(velocity, uv2).xy;
          gl_FragColor = vec4(newVel, 0.0, 0.0);
        } else {
          vec2 spot_new = uv;
          vec2 vel_old = texture2D(velocity, uv).xy;
          vec2 spot_old = spot_new - vel_old * dt * ratio;
          vec2 vel_new1 = texture2D(velocity, spot_old).xy;
          vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
          vec2 error = spot_new2 - spot_new;
          vec2 spot_new3 = spot_new - error / 2.0;
          vec2 vel_2 = texture2D(velocity, spot_new3).xy;
          vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
          vec2 newVel2 = texture2D(velocity, spot_old2).xy;
          gl_FragColor = vec4(newVel2, 0.0, 0.0);
        }
      }
    `,K=new v,q=new y;class J{props;uniforms;scene;camera;material=null;geometry=null;plane=null;constructor(e){this.props=e||{},this.uniforms=this.props.material?.uniforms,this.scene=new s,this.camera=new m}init(){this.uniforms&&(this.material=new g(this.props.material),this.geometry=new r(2,2),this.plane=new f(this.geometry,this.material),this.scene.add(this.plane))}run(){K.renderer&&(K.renderer.setRenderTarget(this.props.output||null),K.renderer.render(this.scene,this.camera),K.renderer.setRenderTarget(null))}}class ae extends J{line=null;constructor(e){super({material:{vertexShader:L,fragmentShader:G,uniforms:{boundarySpace:{value:e.cellScale},px:{value:e.cellScale},fboSize:{value:e.fboSize},velocity:{value:e.src.texture},dt:{value:e.dt},isBFECC:{value:!0}}},output:e.dst}),this.init()}init(){super.init(),this.createBoundary()}createBoundary(){let e=new l,t=new Float32Array([-1,-1,0,-1,1,0,-1,1,0,1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0]);e.setAttribute(`position`,new d(t,3));let n=new g({vertexShader:`
      attribute vec3 position;
      uniform vec2 px;
      precision highp float;
      varying vec2 uv;
      void main(){
        vec3 pos = position;
        uv = 0.5 + pos.xy * 0.5;
        vec2 n = sign(pos.xy);
        pos.xy = abs(pos.xy) - px * 1.0;
        pos.xy *= n;
        gl_Position = vec4(pos, 1.0);
      }
    `,fragmentShader:G,uniforms:this.uniforms});this.line=new o(e,n),this.scene.add(this.line)}update({dt:e,isBounce:t,BFECC:n}){this.uniforms.dt.value=e,this.line&&(this.line.visible=t),this.uniforms.isBFECC.value=n,super.run()}}class oe extends J{mouse=null;constructor(e){super({output:e.dst}),this.init(e)}init(e){if(super.init(),!e)return;let t=new r(1,1),n=new g({vertexShader:`
      precision highp float;
      attribute vec3 position;
      attribute vec2 uv;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main(){
        vec2 pos = position.xy * scale * 2.0 * px + center;
        vUv = uv;
        gl_Position = vec4(pos, 0.0, 1.0);
      }
    `,fragmentShader:`
      precision highp float;
      uniform vec2 force;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main(){
        vec2 circle = (vUv - 0.5) * 2.0;
        float d = 1.0 - min(length(circle), 1.0);
        d *= d;
        gl_FragColor = vec4(force * d, 0.0, 1.0);
      }
    `,blending:2,depthWrite:!1,uniforms:{px:{value:e.cellScale},force:{value:new i(0,0)},center:{value:new i(0,0)},scale:{value:new i(e.cursor_size,e.cursor_size)}}});this.mouse=new f(t,n),this.scene.add(this.mouse)}update(e){let t=q.diff.x/2*e.mouse_force,n=q.diff.y/2*e.mouse_force,r=e.cursor_size*e.cellScale.x,i=e.cursor_size*e.cellScale.y,a=Math.min(Math.max(q.coords.x,-1+r+e.cellScale.x*2),1-r-e.cellScale.x*2),o=Math.min(Math.max(q.coords.y,-1+i+e.cellScale.y*2),1-i-e.cellScale.y*2);if(this.mouse){let r=this.mouse.material.uniforms;r.force.value.set(t,n),r.center.value.set(a,o),r.scale.value.set(e.cursor_size,e.cursor_size)}super.run()}}class se extends J{constructor(e){super({material:{vertexShader:L,fragmentShader:`
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D velocity_new;
      uniform float v;
      uniform vec2 px;
      uniform float dt;
      varying vec2 uv;
      void main(){
        vec2 old = texture2D(velocity, uv).xy;
        vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
        vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
        vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
        vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
        vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
        newv /= 4.0 * (1.0 + v * dt);
        gl_FragColor = vec4(newv, 0.0, 0.0);
      }
    `,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},velocity_new:{value:e.dst_.texture},v:{value:e.viscous},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update({viscous:e,iterations:t,dt:n}){let r,i;this.uniforms.v.value=e;for(let e=0;e<t;e++)e%2==0?(r=this.props.output0,i=this.props.output1):(r=this.props.output1,i=this.props.output0),this.uniforms.velocity_new.value=r.texture,this.props.output=i,this.uniforms.dt.value=n,super.run();return i}}class ce extends J{constructor(e){super({material:{vertexShader:L,fragmentShader:`
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;
        float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;
        float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;
        float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;
        float divergence = (x1 - x0 + y1 - y0) / 2.0;
        gl_FragColor = vec4(divergence / dt);
      }
    `,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update({vel:e}){this.uniforms.velocity.value=e.texture,super.run()}}class le extends J{constructor(e){super({material:{vertexShader:L,fragmentShader:`
      precision highp float;
      uniform sampler2D pressure;
      uniform sampler2D divergence;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
        float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
        float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
        float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
        float div = texture2D(divergence, uv).r;
        float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
        gl_FragColor = vec4(newP);
      }
    `,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.dst_.texture},divergence:{value:e.src.texture},px:{value:e.cellScale}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update({iterations:e}){let t,n;for(let r=0;r<e;r++)r%2==0?(t=this.props.output0,n=this.props.output1):(t=this.props.output1,n=this.props.output0),this.uniforms.pressure.value=t.texture,this.props.output=n,super.run();return n}}class ue extends J{constructor(e){super({material:{vertexShader:L,fragmentShader:`
      precision highp float;
      uniform sampler2D pressure;
      uniform sampler2D velocity;
      uniform vec2 px;
      uniform float dt;
      varying vec2 uv;
      void main(){
        float step = 1.0;
        float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;
        float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;
        float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;
        float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;
        vec2 v = texture2D(velocity, uv).xy;
        vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
        v = v - gradP * dt;
        gl_FragColor = vec4(v, 0.0, 1.0);
      }
    `,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.src_p.texture},velocity:{value:e.src_v.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update({vel:e,pressure:t}){this.uniforms.velocity.value=e.texture,this.uniforms.pressure.value=t.texture,super.run()}}class de{options;fbos;fboSize=new i;cellScale=new i;boundarySpace=new i;advection=null;externalForce=null;viscous=null;divergence=null;poisson=null;pressure=null;constructor(e){this.options=e,this.fbos={vel_0:null,vel_1:null,vel_viscous0:null,vel_viscous1:null,div:null,pressure_0:null,pressure_1:null},this.init()}init(){this.calcSize(),this.createAllFBO(),this.createShaderPass()}calcSize(){let e=Math.max(1,Math.round(this.options.resolution*K.width)),t=Math.max(1,Math.round(this.options.resolution*K.height)),n=1/e,r=1/t;this.cellScale.set(n,r),this.fboSize.set(e,t)}getFloatType(){return typeof navigator>`u`?c:/(iPad|iPhone|iPod)/i.test(navigator.userAgent)?ie:c}createAllFBO(){let e={type:this.getFloatType(),depthBuffer:!1,stencilBuffer:!1,minFilter:n,magFilter:n,wrapS:u,wrapT:u};for(let t in this.fbos)this.fbos[t]=new re(this.fboSize.x,this.fboSize.y,e)}createShaderPass(){this.advection=new ae({cellScale:this.cellScale,fboSize:this.fboSize,dt:this.options.dt,src:this.fbos.vel_0,dst:this.fbos.vel_1}),this.externalForce=new oe({cellScale:this.cellScale,cursor_size:this.options.cursor_size,dst:this.fbos.vel_1}),this.viscous=new se({cellScale:this.cellScale,boundarySpace:this.boundarySpace,viscous:this.options.viscous,src:this.fbos.vel_1,dst:this.fbos.vel_viscous1,dst_:this.fbos.vel_viscous0,dt:this.options.dt}),this.divergence=new ce({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.vel_viscous0,dst:this.fbos.div,dt:this.options.dt}),this.poisson=new le({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.div,dst:this.fbos.pressure_1,dst_:this.fbos.pressure_0}),this.pressure=new ue({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src_p:this.fbos.pressure_0,src_v:this.fbos.vel_viscous0,dst:this.fbos.vel_0,dt:this.options.dt})}resize(){this.calcSize();for(let e in this.fbos)this.fbos[e].setSize(this.fboSize.x,this.fboSize.y)}update(){this.options.isBounce?this.boundarySpace.set(0,0):this.boundarySpace.copy(this.cellScale),this.advection&&this.advection.update({dt:this.options.dt,isBounce:this.options.isBounce,BFECC:this.options.BFECC}),this.externalForce&&this.externalForce.update({cursor_size:this.options.cursor_size,mouse_force:this.options.mouse_force,cellScale:this.cellScale});let e=this.fbos.vel_1;if(this.options.isViscous&&this.viscous&&(e=this.viscous.update({viscous:this.options.viscous,iterations:this.options.iterations_viscous,dt:this.options.dt})),this.divergence&&this.divergence.update({vel:e}),this.poisson){let t=this.poisson.update({iterations:this.options.iterations_poisson});this.pressure&&this.pressure.update({vel:e,pressure:t})}}}class fe{simulation;scene;camera;output=null;constructor(){this.scene=new s,this.camera=new m;let o=[e,t,_].filter(Boolean);function c(e){let t;t=Array.isArray(e)&&e.length>0?e.length===1?[e[0],e[0]]:e:[`#ffffff`,`#ffffff`];let r=t.length,i=new Uint8Array(r*4);for(let e=0;e<r;e++){let n=new h(t[e]);i[e*4+0]=Math.round(n.r*255),i[e*4+1]=Math.round(n.g*255),i[e*4+2]=Math.round(n.b*255),i[e*4+3]=255}let o=new p(i,r,1,a);return o.magFilter=n,o.minFilter=n,o.wrapS=u,o.wrapT=u,o.needsUpdate=!0,o}let l=c(o),d=new ee(0,0,0,0);this.simulation=new de({iterations_poisson:T,iterations_viscous:w,mouse_force:b,resolution:O,cursor_size:x,viscous:C,isBounce:k,dt:E,isViscous:S,BFECC:D}),this.output=new f(new r(2,2),new g({vertexShader:L,fragmentShader:`
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D palette;
      uniform vec4 bgColor;
      varying vec2 uv;
      void main(){
        vec2 vel = texture2D(velocity, uv).xy;
        float lenv = clamp(length(vel), 0.0, 1.0);
        vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
        vec3 outRGB = mix(bgColor.rgb, c, lenv);
        float outA = mix(bgColor.a, 1.0, lenv);
        gl_FragColor = vec4(outRGB, outA);
      }
    `,transparent:!0,depthWrite:!1,uniforms:{velocity:{value:this.simulation.fbos.vel_0.texture},boundarySpace:{value:new i},palette:{value:l},bgColor:{value:d}}})),this.scene.add(this.output)}resize(){this.simulation.resize()}update(){this.simulation.update(),K.renderer&&(K.renderer.setRenderTarget(null),K.renderer.render(this.scene,this.camera))}}class pe{output=null;running=!1;autoDriver=null;lastUserInteraction=0;constructor(e){e&&(K.init(e),q.init(e),e.prepend(K.renderer.domElement),this.output=new fe,this.lastUserInteraction=performance.now(),q.onInteract=()=>{this.lastUserInteraction=performance.now(),this.autoDriver&&this.autoDriver.forceStop()},q.autoIntensity=M,q.takeoverDuration=N,this.autoDriver=new I(q,this,{enabled:A,speed:j,resumeDelay:P,rampDuration:F}))}resize(){K.resize(),this.output&&this.output.resize()}render(){this.autoDriver&&this.autoDriver.update(),q.update(),K.update(),this.output&&this.output.update()}loop=()=>{this.running&&(this.render(),V.current=requestAnimationFrame(this.loop))};start(){this.running||(this.running=!0,this.loop())}pause(){this.running=!1,V.current&&=(cancelAnimationFrame(V.current),null)}dispose(){this.pause(),q.dispose(),K.dispose()}}let Y=R.current;Y.querySelector(`canvas`)&&(Y.innerHTML=``),Y.appendChild(document.createElement(`style`)).textContent=`
          .liquid-ether-container { position: relative; overflow: hidden; width: 100%; height: 100%; touch-action: none; }
        `;let X=new pe(Y);z.current=X,X.start();let Z=new ResizeObserver(()=>{W.current&&cancelAnimationFrame(W.current),W.current=requestAnimationFrame(()=>{z.current&&z.current.resize()})});Z.observe(Y),B.current=Z;let Q=new IntersectionObserver(e=>{let t=e[0].isIntersecting;U.current=t,z.current&&(t&&!document.hidden?z.current.start():z.current.pause())},{threshold:0});Q.observe(Y),H.current=Q;let $=()=>{document.hidden?z.current&&z.current.pause():U.current&&z.current&&z.current.start()};return document.addEventListener(`visibilitychange`,$),()=>{V.current&&cancelAnimationFrame(V.current),B.current&&B.current.disconnect(),H.current&&H.current.disconnect(),document.removeEventListener(`visibilitychange`,$),z.current&&z.current.dispose(),Y&&Y.querySelector(`canvas`)&&(Y.innerHTML=``),K.dispose(),q.dispose()}},[e,t,_,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F]),(0,y.jsx)(`div`,{ref:R,className:`liquid-ether-container ${L||``}`,style:{...I,width:I?.width??`100%`,height:I?.height??`100%`,position:`relative`,overflow:`hidden`}})}export{b as default};