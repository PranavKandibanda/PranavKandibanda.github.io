import{r as p,j as i}from"./index-CLsirQkm.js";import{R as me,I as ve,F as Z,a as k,b as D,W as ge,B as J,S as ce,V as c,c as xe,U as Q,d as ee,e as le,M as ye,f as P,L as Se,g as we,h as be,u as _e,C as Me,_ as te,i as Ee,j as je,D as ne,k as Le}from"./extends-DGvObuyq.js";const de=parseInt(me.replace(/\D+/g,"")),fe=de>=125?"uv1":"uv2",ie=new J,I=new c;class X extends ve{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],o=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(o),this.setAttribute("position",new Z(e,3)),this.setAttribute("uv",new Z(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,o=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),o.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const o=new k(t,6,1);return this.setAttribute("instanceStart",new D(o,3,0)),this.setAttribute("instanceEnd",new D(o,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let o;e instanceof Float32Array?o=e:Array.isArray(e)&&(o=new Float32Array(e));const n=new k(o,t*2,1);return this.setAttribute("instanceColorStart",new D(n,t,0)),this.setAttribute("instanceColorEnd",new D(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ge(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new J);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),ie.setFromBufferAttribute(t),this.boundingBox.union(ie))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ce),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const o=this.boundingSphere.center;this.boundingBox.getCenter(o);let n=0;for(let s=0,u=e.count;s<u;s++)I.fromBufferAttribute(e,s),n=Math.max(n,o.distanceToSquared(I)),I.fromBufferAttribute(t,s),n=Math.max(n,o.distanceToSquared(I));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}class ue extends X{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,o=new Float32Array(2*t);for(let n=0;n<t;n+=3)o[2*n]=e[n],o[2*n+1]=e[n+1],o[2*n+2]=e[n+2],o[2*n+3]=e[n+3],o[2*n+4]=e[n+4],o[2*n+5]=e[n+5];return super.setPositions(o),this}setColors(e,t=3){const o=e.length-t,n=new Float32Array(2*o);if(t===3)for(let s=0;s<o;s+=t)n[2*s]=e[s],n[2*s+1]=e[s+1],n[2*s+2]=e[s+2],n[2*s+3]=e[s+3],n[2*s+4]=e[s+4],n[2*s+5]=e[s+5];else for(let s=0;s<o;s+=t)n[2*s]=e[s],n[2*s+1]=e[s+1],n[2*s+2]=e[s+2],n[2*s+3]=e[s+3],n[2*s+4]=e[s+4],n[2*s+5]=e[s+5],n[2*s+6]=e[s+6],n[2*s+7]=e[s+7];return super.setColors(n,t),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class K extends xe{constructor(e){super({type:"LineMaterial",uniforms:Q.clone(Q.merge([ee.common,ee.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new le(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${de>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(t){this.uniforms.diffuse.value=t}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(t){this.uniforms.linewidth.value=t}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(t){!!t!="USE_DASH"in this.defines&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(t){this.uniforms.dashScale.value=t}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(t){this.uniforms.dashSize.value=t}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(t){this.uniforms.dashOffset.value=t}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(t){this.uniforms.gapSize.value=t}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(t){this.uniforms.resolution.value.copy(t)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(t){!!t!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}const V=new P,se=new c,oe=new c,y=new P,S=new P,L=new P,F=new c,q=new we,w=new Se,re=new c,G=new J,W=new ce,A=new P;let z,B;function ae(d,e,t){return A.set(0,0,-e,1).applyMatrix4(d.projectionMatrix),A.multiplyScalar(1/A.w),A.x=B/t.width,A.y=B/t.height,A.applyMatrix4(d.projectionMatrixInverse),A.multiplyScalar(1/A.w),Math.abs(Math.max(A.x,A.y))}function Ae(d,e){const t=d.matrixWorld,o=d.geometry,n=o.attributes.instanceStart,s=o.attributes.instanceEnd,u=Math.min(o.instanceCount,n.count);for(let r=0,m=u;r<m;r++){w.start.fromBufferAttribute(n,r),w.end.fromBufferAttribute(s,r),w.applyMatrix4(t);const _=new c,f=new c;z.distanceSqToSegment(w.start,w.end,f,_),f.distanceTo(_)<B*.5&&e.push({point:f,pointOnLine:_,distance:z.origin.distanceTo(f),object:d,face:null,faceIndex:r,uv:null,[fe]:null})}}function ze(d,e,t){const o=e.projectionMatrix,s=d.material.resolution,u=d.matrixWorld,r=d.geometry,m=r.attributes.instanceStart,_=r.attributes.instanceEnd,f=Math.min(r.instanceCount,m.count),g=-e.near;z.at(1,L),L.w=1,L.applyMatrix4(e.matrixWorldInverse),L.applyMatrix4(o),L.multiplyScalar(1/L.w),L.x*=s.x/2,L.y*=s.y/2,L.z=0,F.copy(L),q.multiplyMatrices(e.matrixWorldInverse,u);for(let E=0,M=f;E<M;E++){if(y.fromBufferAttribute(m,E),S.fromBufferAttribute(_,E),y.w=1,S.w=1,y.applyMatrix4(q),S.applyMatrix4(q),y.z>g&&S.z>g)continue;if(y.z>g){const l=y.z-S.z,b=(y.z-g)/l;y.lerp(S,b)}else if(S.z>g){const l=S.z-y.z,b=(S.z-g)/l;S.lerp(y,b)}y.applyMatrix4(o),S.applyMatrix4(o),y.multiplyScalar(1/y.w),S.multiplyScalar(1/S.w),y.x*=s.x/2,y.y*=s.y/2,S.x*=s.x/2,S.y*=s.y/2,w.start.copy(y),w.start.z=0,w.end.copy(S),w.end.z=0;const x=w.closestPointToPointParameter(F,!0);w.at(x,re);const a=be.lerp(y.z,S.z,x),j=a>=-1&&a<=1,C=F.distanceTo(re)<B*.5;if(j&&C){w.start.fromBufferAttribute(m,E),w.end.fromBufferAttribute(_,E),w.start.applyMatrix4(u),w.end.applyMatrix4(u);const l=new c,b=new c;z.distanceSqToSegment(w.start,w.end,b,l),t.push({point:b,pointOnLine:l,distance:z.origin.distanceTo(b),object:d,face:null,faceIndex:E,uv:null,[fe]:null})}}}class he extends ye{constructor(e=new X,t=new K({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,o=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let u=0,r=0,m=t.count;u<m;u++,r+=2)se.fromBufferAttribute(t,u),oe.fromBufferAttribute(o,u),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+se.distanceTo(oe);const s=new k(n,2,1);return e.setAttribute("instanceDistanceStart",new D(s,1,0)),e.setAttribute("instanceDistanceEnd",new D(s,1,1)),this}raycast(e,t){const o=this.material.worldUnits,n=e.camera;n===null&&!o&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;z=e.ray;const u=this.matrixWorld,r=this.geometry,m=this.material;B=m.linewidth+s,r.boundingSphere===null&&r.computeBoundingSphere(),W.copy(r.boundingSphere).applyMatrix4(u);let _;if(o)_=B*.5;else{const g=Math.max(n.near,W.distanceToPoint(z.origin));_=ae(n,g,m.resolution)}if(W.radius+=_,z.intersectsSphere(W)===!1)return;r.boundingBox===null&&r.computeBoundingBox(),G.copy(r.boundingBox).applyMatrix4(u);let f;if(o)f=B*.5;else{const g=Math.max(n.near,G.distanceToPoint(z.origin));f=ae(n,g,m.resolution)}G.expandByScalar(f),z.intersectsBox(G)!==!1&&(o?Ae(this,t):ze(this,n,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(V),this.material.uniforms.resolution.value.set(V.z,V.w))}}class Ue extends he{constructor(e=new ue,t=new K({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const H=p.forwardRef(function({points:e,color:t=16777215,vertexColors:o,linewidth:n,lineWidth:s,segments:u,dashed:r,...m},_){var f,g;const E=_e(j=>j.size),M=p.useMemo(()=>u?new he:new Ue,[u]),[h]=p.useState(()=>new K),x=(o==null||(f=o[0])==null?void 0:f.length)===4?4:3,a=p.useMemo(()=>{const j=u?new X:new ue,C=e.map(l=>{const b=Array.isArray(l);return l instanceof c||l instanceof P?[l.x,l.y,l.z]:l instanceof le?[l.x,l.y,0]:b&&l.length===3?[l[0],l[1],l[2]]:b&&l.length===2?[l[0],l[1],0]:l});if(j.setPositions(C.flat()),o){t=16777215;const l=o.map(b=>b instanceof Me?b.toArray():b);j.setColors(l.flat(),x)}return j},[e,u,o,x]);return p.useLayoutEffect(()=>{M.computeLineDistances()},[e,M]),p.useLayoutEffect(()=>{r?h.defines.USE_DASH="":delete h.defines.USE_DASH,h.needsUpdate=!0},[r,h]),p.useEffect(()=>()=>{a.dispose(),h.dispose()},[a]),p.createElement("primitive",te({object:M,ref:_},m),p.createElement("primitive",{object:a,attach:"geometry"}),p.createElement("primitive",te({object:h,attach:"material",color:t,vertexColors:!!o,resolution:[E.width,E.height],linewidth:(g=n??s)!==null&&g!==void 0?g:1,dashed:r,transparent:x===4},m)))}),$=new Le([new c(3.2,.09,-2.8),new c(2.1,.09,-1.9),new c(.8,.09,-.9),new c(-.5,.09,-.6),new c(-1.55,.09,.3),new c(-1.65,.09,1.6),new c(-2.6,.09,2.3),new c(-3.5,.09,2.8)]),Be=$.getPoints(84).map(d=>[d.x,d.y,d.z]),Ce=[[3.2,.07,-2.8],[1.5,.07,.6],[.1,.07,1.3],[-1.5,.07,2.1],[-3.5,.07,2.8]],Oe=[[3.2,.07,-2.8],[1.2,.07,-3.2],[-1.5,.07,-2.1],[-2.4,.07,.3],[-3.5,.07,2.8]];function De({groupRef:d,wheelRef:e}){return i.jsxs("group",{ref:d,children:[i.jsxs("mesh",{castShadow:!0,position:[0,.34,0],children:[i.jsx("boxGeometry",{args:[1.12,.28,1.42]}),i.jsx("meshStandardMaterial",{color:"#d9d8cf",metalness:.65,roughness:.34})]}),i.jsxs("mesh",{castShadow:!0,position:[0,.51,-.09],children:[i.jsx("boxGeometry",{args:[.94,.12,1.05]}),i.jsx("meshStandardMaterial",{color:"#303f43",metalness:.45,roughness:.45})]}),i.jsxs("mesh",{position:[0,.586,-.33],children:[i.jsx("boxGeometry",{args:[.55,.018,.13]}),i.jsx("meshStandardMaterial",{color:"#cf7045",emissive:"#863b25",emissiveIntensity:.32})]}),i.jsx("group",{ref:e,children:[-.63,.63].map(t=>i.jsxs("group",{position:[t,.24,0],rotation:[0,0,Math.PI/2],children:[i.jsxs("mesh",{castShadow:!0,children:[i.jsx("cylinderGeometry",{args:[.25,.25,.15,24]}),i.jsx("meshStandardMaterial",{color:"#18252b",roughness:.8})]}),i.jsxs("mesh",{position:[0,.083,0],children:[i.jsx("cylinderGeometry",{args:[.11,.11,.006,20]}),i.jsx("meshStandardMaterial",{color:"#8b9997",metalness:.75,roughness:.3})]})]},t))}),i.jsxs("mesh",{castShadow:!0,position:[0,.66,.29],children:[i.jsx("cylinderGeometry",{args:[.16,.18,.16,24]}),i.jsx("meshStandardMaterial",{color:"#9caeac",metalness:.6,roughness:.32})]}),i.jsxs("mesh",{castShadow:!0,position:[0,.78,.29],children:[i.jsx("cylinderGeometry",{args:[.23,.23,.08,32]}),i.jsx("meshStandardMaterial",{color:"#242f33",metalness:.45,roughness:.35})]}),i.jsxs("mesh",{position:[0,.826,.29],children:[i.jsx("cylinderGeometry",{args:[.17,.17,.012,32]}),i.jsx("meshStandardMaterial",{color:"#cf7045",metalness:.3,roughness:.4})]}),i.jsxs("mesh",{position:[0,.24,-.72],children:[i.jsx("boxGeometry",{args:[.42,.1,.035]}),i.jsx("meshStandardMaterial",{color:"#e7bd89",emissive:"#a86632",emissiveIntensity:.6})]})]})}function Pe({progress:d,pointer:e,mobile:t}){const o=p.useRef(null),n=p.useRef(null),s=p.useRef(null),u=p.useRef(null),r=p.useRef(null),m=p.useRef(null),_=p.useMemo(()=>new c,[]),f=p.useMemo(()=>new c,[]),g=p.useMemo(()=>Array.from({length:42},(M,h)=>{const x=h*2.399963,a=Math.sqrt((h+.5)/42);return{x:Math.cos(x)*a,z:Math.sin(x)*a}}),[]),E=p.useMemo(()=>[{p:[-.15,.42,1.35],s:[1,.84,.94]},{p:[1.6,.31,1.25],s:[.72,.62,1.3]},{p:[-2.55,.34,-1.45],s:[1.05,.68,.82]},{p:[.5,.55,-2.9],s:[.8,1.1,.7]}],[]);return je(({camera:M,clock:h},x)=>{const a=Math.max(0,Math.min(1,d.current)),j=Math.max(Math.min(.075,h.elapsedTime*.009),Math.min(1,Math.max(0,(a-.035)/.93))),C=j*j*(3-2*j);$.getPointAt(C,f);const l=$.getTangentAt(Math.min(.999,C));o.current&&(o.current.position.set(f.x,0,f.z),o.current.rotation.y=Math.atan2(-l.x,-l.z),o.current.position.y=Math.sin(h.elapsedTime*3)*.012),n.current&&(n.current.rotation.x=-h.elapsedTime*.35);const b=a>.17&&a<.45,Y=a>.39&&a<.68,pe=a>.57&&a<.87;if(s.current&&(s.current.visible=b,s.current.position.set(f.x,0,f.z),s.current.rotation.y=h.elapsedTime*.22),u.current){u.current.visible=Y;const v=Math.max(.17,1.4-(a-.39)*4.3);u.current.children.forEach((N,T)=>{N.position.set(f.x+g[T].x*v,.1,f.z+g[T].z*v)})}if(m.current){m.current.visible=Y,m.current.position.set(f.x,.045,f.z);const v=Math.max(.35,2.5-(a-.39)*7.2);m.current.scale.set(v,v,1)}r.current&&(r.current.visible=pe);const U=(v,N,T)=>v+(N-v)*T;let O=t?new c(6.8,6.1,4.4):new c(7.1,5.2,8.3),R=t?new c(2.35,-1.15,-1.75):new c(-.35,.1,0);if(a>.17&&a<.42){const v=Math.min(1,(a-.17)/.1);O=new c(U(7.1,4,v),U(5.2,3.4,v),U(8.3,4.8,v)),R=new c(f.x,.2,f.z)}else if(a>=.42&&a<.79){const v=Math.min(1,(a-.42)/.09);O=new c(U(4,.01,v),U(3.4,11.5,v),U(4.8,.015,v)),R=new c(0,0,0)}else if(a>=.79){const v=Math.min(1,(a-.79)/.11);O=new c(U(.01,4.2,v),U(11.5,3.4,v),U(.015,5.6,v)),R=new c(f.x,.1,f.z)}O.x+=e.current.x*.16,O.y+=e.current.y*.08,M.position.lerp(O,Math.min(1,x*2.25)),_.lerp(R,Math.min(1,x*2.8)),M.lookAt(_)}),i.jsxs(i.Fragment,{children:[i.jsx("color",{attach:"background",args:["#101b20"]}),i.jsx("fog",{attach:"fog",args:["#101b20",10,25]}),i.jsx("ambientLight",{intensity:.92}),i.jsx("hemisphereLight",{args:["#e4edf0","#253238",1.7]}),i.jsx("directionalLight",{castShadow:!0,position:[3,8,5],intensity:3.4,color:"#f0eadf","shadow-mapSize":[1024,1024],"shadow-camera-left":-8,"shadow-camera-right":8,"shadow-camera-top":8,"shadow-camera-bottom":-8}),i.jsx("pointLight",{position:[-3,3,0],intensity:24,color:"#cf7045",distance:9}),i.jsxs("mesh",{receiveShadow:!0,rotation:[-Math.PI/2,0,0],position:[0,-.04,0],children:[i.jsx("planeGeometry",{args:[30,30]}),i.jsx("meshStandardMaterial",{color:"#18282e",roughness:.89,metalness:.07})]}),i.jsx("gridHelper",{args:[12,24,"#52656a","#34484e"],position:[0,.003,0]}),E.map(({p:M,s:h},x)=>i.jsxs("mesh",{castShadow:!0,receiveShadow:!0,position:M,children:[i.jsx("boxGeometry",{args:h}),i.jsx("meshStandardMaterial",{color:x%2?"#495b5e":"#617271",roughness:.78,metalness:.08})]},x)),i.jsx(H,{points:Be,color:"#df8155",lineWidth:2.2,transparent:!0,opacity:.92}),i.jsxs("group",{ref:r,visible:!1,children:[i.jsx(H,{points:Ce,color:"#8ba3a3",lineWidth:1,transparent:!0,opacity:.52,dashed:!0,dashSize:.11,gapSize:.1}),i.jsx(H,{points:Oe,color:"#8ba3a3",lineWidth:1,transparent:!0,opacity:.52,dashed:!0,dashSize:.11,gapSize:.1})]}),i.jsxs("mesh",{position:[-3.5,.09,2.8],rotation:[-Math.PI/2,0,0],children:[i.jsx("ringGeometry",{args:[.25,.29,48]}),i.jsx("meshBasicMaterial",{color:"#df8155",side:ne})]}),i.jsx(De,{groupRef:o,wheelRef:n}),i.jsx("group",{ref:s,visible:!1,children:Array.from({length:20},(M,h)=>{const x=h*Math.PI*2/20,a=h%4===0?2.8:1.95;return i.jsx(H,{points:[[0,.82,.29],[Math.cos(x)*a,.1,Math.sin(x)*a]],color:"#9bc5bf",lineWidth:1,transparent:!0,opacity:.4},h)})}),i.jsx("group",{ref:u,visible:!1,children:g.map((M,h)=>i.jsxs("mesh",{children:[i.jsx("sphereGeometry",{args:[.045,7,7]}),i.jsx("meshBasicMaterial",{color:h%4===0?"#df8155":"#a7c8c0",transparent:!0,opacity:.8})]},h))}),i.jsxs("mesh",{ref:m,visible:!1,rotation:[-Math.PI/2,0,0],children:[i.jsx("ringGeometry",{args:[.97,1,64]}),i.jsx("meshBasicMaterial",{color:"#a7c8c0",side:ne,transparent:!0,opacity:.7})]})]})}function Ie({progress:d,pointer:e,active:t,lowQuality:o}){const n=window.innerWidth<760;return i.jsx(Ee,{"aria-hidden":"true",shadows:!o,dpr:o?[1,1]:[1,1.5],frameloop:t?"always":"demand",camera:{position:n?[6.8,6.1,4.4]:[7.1,5.2,8.3],fov:n?53:44,near:.1,far:70},gl:{antialias:!o,powerPreference:"high-performance",alpha:!1},onCreated:({gl:s})=>{s.setClearColor("#101b20")},children:i.jsx(p.Suspense,{fallback:null,children:i.jsx(Pe,{progress:d,pointer:e,mobile:n})})})}export{Ie as default};
