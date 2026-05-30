'use client'

import { useEffect, useRef } from 'react'

const VS = `
varying vec3 vNormal;
varying vec3 vPos;
varying vec2 vNDC;
void main(){
  vNormal=normalize(normalMatrix*normal);
  vPos=position;
  vec4 clip=projectionMatrix*modelViewMatrix*vec4(position,1.0);
  vNDC=clip.xy/clip.w;
  gl_Position=clip;
}`

const FS = `
varying vec3 vNormal;
varying vec3 vPos;
varying vec2 vNDC;
uniform float uTime;
uniform vec2 uMouse;
float h(vec3 p){
  p=fract(p*vec3(443.9,441.4,437.2));
  p+=dot(p,p.zxy+19.2);
  return fract((p.x+p.y)*p.z);
}
float n3(vec3 p){
  vec3 i=floor(p),f=fract(p);
  f=f*f*(3.0-2.0*f);
  return mix(
    mix(mix(h(i),h(i+vec3(1.0,0.0,0.0)),f.x),mix(h(i+vec3(0.0,1.0,0.0)),h(i+vec3(1.0,1.0,0.0)),f.x),f.y),
    mix(mix(h(i+vec3(0.0,0.0,1.0)),h(i+vec3(1.0,0.0,1.0)),f.x),mix(h(i+vec3(0.0,1.0,1.0)),h(i+vec3(1.0,1.0,1.0)),f.x),f.y),f.z);
}
float fbm(vec3 p){
  float v=0.0,a=0.5;
  for(int i=0;i<5;i++){v+=a*n3(p);p=p*2.1+1.7;a*=0.5;}
  return v;
}
vec3 aC(float t){
  t=clamp(t,0.0,1.0);
  vec3 c1=vec3(0.941,0.376,0.188),c2=vec3(0.941,0.243,0.471),c3=vec3(0.722,0.251,0.722);
  if(t<0.5) return mix(c1,c2,t*2.0);
  return mix(c2,c3,(t-0.5)*2.0);
}
void main(){
  float act=fbm(vPos*2.8+vec3(uTime*0.07,uTime*0.05,uTime*0.06));
  act=clamp(act*1.3-0.1,0.0,1.0);
  if(uMouse.x>-90.0){
    float md=length(vNDC-uMouse);
    act=clamp(act+max(0.0,1.0-md/0.65)*0.4,0.0,1.0);
  }
  vec3 col=aC(act);
  vec3 ld=normalize(vec3(0.3,0.7,1.0));
  float diff=max(dot(vNormal,ld),0.0)*0.6+0.4;
  col*=diff;
  float rim=1.0-abs(dot(normalize(vNormal),vec3(0.0,0.0,1.0)));
  col+=aC(act+0.15)*rim*0.12;
  gl_FragColor=vec4(col,0.18+act*0.52+rim*0.06);
}`

interface BrainCanvasProps {
  variant?: 'hero' | 'centered'
  sectionRef?: React.RefObject<HTMLElement | null>
}

export default function BrainCanvas({ variant = 'hero', sectionRef }: BrainCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let animFrameId: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderer: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mL: any = null, mR: any = null

    async function init() {
      const THREE = await import('three')

      renderer = new THREE.WebGLRenderer({ canvas: canvas as HTMLCanvasElement, antialias: true, alpha: true })
      renderer.setClearColor(0x000000, 0)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
      camera.position.z = 4

      function makeMat() {
        return new THREE.ShaderMaterial({
          vertexShader: VS, fragmentShader: FS,
          uniforms: { uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(-99, -99) } },
          transparent: true, side: THREE.DoubleSide, depthWrite: false,
        })
      }

      const group = new THREE.Group()
      scene.add(group)

      function loadBin(url: string) {
        return fetch(url).then(r => r.arrayBuffer())
      }
      function buildGeo(vb: ArrayBuffer, fb: ArrayBuffer) {
        const g = new THREE.BufferGeometry()
        g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vb), 3))
        g.setIndex(new THREE.BufferAttribute(new Uint32Array(fb), 1))
        g.computeVertexNormals()
        return g
      }

      Promise.all([
        loadBin('/brain/left_verts.bin'), loadBin('/brain/left_faces.bin'),
        loadBin('/brain/right_verts.bin'), loadBin('/brain/right_faces.bin'),
      ]).then(bufs => {
        mL = new THREE.Mesh(buildGeo(bufs[0], bufs[1]), makeMat())
        mR = new THREE.Mesh(buildGeo(bufs[2], bufs[3]), makeMat())
        mL.position.x = -0.35
        mR.position.x = 0.35
        const pivot = new THREE.Group()
        pivot.rotation.x = -Math.PI / 2
        pivot.add(mL, mR)
        group.add(pivot)
      }).catch(e => console.warn('Brain mesh load failed:', e))

      const mouse = new THREE.Vector2(-99, -99)
      const heroEl = sectionRef?.current ?? (canvas as HTMLCanvasElement).parentElement
      if (heroEl) {
        heroEl.addEventListener('mousemove', (e: Event) => {
          const me = e as MouseEvent
          const r = (canvas as HTMLCanvasElement).getBoundingClientRect()
          mouse.set((me.clientX - r.left) / r.width * 2 - 1, -((me.clientY - r.top) / r.height) * 2 + 1)
        })
        heroEl.addEventListener('mouseleave', () => mouse.set(-99, -99))
      }

      function resize() {
        const w = window.innerWidth, h = window.innerHeight
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        if (variant === 'hero') {
          group.position.x = w > 768 ? 1.1 : 0.2
          group.scale.setScalar(w > 768 ? 1.4 : 1.0)
        } else {
          group.scale.setScalar(w > 768 ? 1.3 : 1.0)
        }
      }
      window.addEventListener('resize', resize, { passive: true })
      resize()

      const clk = new THREE.Clock()
      function frame() {
        animFrameId = requestAnimationFrame(frame)
        const t = clk.getElapsedTime()
        const hasMouse = mouse.x > -90
        group.rotation.y = t * 0.05 + (hasMouse ? mouse.x * 0.10 : 0)
        group.rotation.x = 0.10 + (hasMouse ? -mouse.y * 0.06 : 0)
        if (mL) {
          const mu = hasMouse ? mouse : new THREE.Vector2(-99, -99)
          mL.material.uniforms.uTime.value = t
          mR.material.uniforms.uTime.value = t
          mL.material.uniforms.uMouse.value.copy(mu)
          mR.material.uniforms.uMouse.value.copy(mu)
        }
        renderer.render(scene, camera)
      }
      frame()
    }

    init()

    return () => {
      cancelAnimationFrame(animFrameId)
      renderer?.dispose()
    }
  }, [variant, sectionRef])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none block"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
