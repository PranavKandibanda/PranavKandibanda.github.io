import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type Kind = 'vex' | 'cargo' | 'weed';

function Wheel({ x, z, radius = .28 }: { x: number; z: number; radius?: number }) {
  return <group position={[x, radius, z]} rotation={[0, 0, Math.PI / 2]}><mesh castShadow><cylinderGeometry args={[radius, radius, .17, 20]} /><meshStandardMaterial color="#202b30" roughness={.84} /></mesh><mesh position={[0, .089, 0]}><cylinderGeometry args={[radius * .44, radius * .44, .008, 20]} /><meshStandardMaterial color="#a3aba4" metalness={.7} roughness={.31} /></mesh></group>;
}

function Model({ kind }: { kind: Kind }) {
  const palette = kind === 'weed' ? '#7b8b66' : kind === 'vex' ? '#abb9b9' : '#c7beb0';
  const length = kind === 'cargo' ? 2.5 : kind === 'weed' ? 2.15 : 1.9;
  const width = kind === 'cargo' ? 1.55 : kind === 'weed' ? 1.48 : 1.45;
  const wheelZ = length * .38;
  return <group rotation={[0, -.22, 0]}>
    <mesh castShadow position={[0, .39, 0]}><boxGeometry args={[width, .19, length]} /><meshStandardMaterial color={palette} metalness={.52} roughness={.42} /></mesh>
    <mesh castShadow position={[0, .55, 0]}><boxGeometry args={[width * .84, .15, length * .73]} /><meshStandardMaterial color="#293a3d" metalness={.45} roughness={.5} /></mesh>
    {[-1, 1].flatMap(x => [-1, 1].map(z => <Wheel key={`${x}:${z}`} x={x * width * .53} z={z * wheelZ} radius={kind === 'weed' ? .34 : .29} />))}
    {kind === 'cargo' && <><mesh castShadow position={[0, .9, .15]}><boxGeometry args={[width * .72, .65, length * .52]} /><meshStandardMaterial color="#aebbb5" roughness={.58} /></mesh><mesh castShadow position={[0, 1.31, -.56]}><cylinderGeometry args={[.11, .11, .22, 16]} /><meshStandardMaterial color="#db8058" /></mesh><mesh position={[0, .64, -length * .49]}><boxGeometry args={[.4, .13, .04]} /><meshStandardMaterial color="#e7bd89" emissive="#864724" emissiveIntensity={.4} /></mesh></>}
    {kind === 'weed' && <><mesh castShadow position={[0, .82, .12]}><boxGeometry args={[width * .55, .37, length * .43]} /><meshStandardMaterial color="#b7c0ab" roughness={.65} /></mesh><mesh castShadow position={[0, .88, -.53]}><cylinderGeometry args={[.1, .1, .52, 14]} /><meshStandardMaterial color="#4b5d58" metalness={.5} /></mesh><mesh castShadow position={[0, 1.17, -.53]}><boxGeometry args={[.52, .08, .28]} /><meshStandardMaterial color="#222f31" /></mesh><mesh castShadow position={[0, .24, length * .55]}><boxGeometry args={[width * .66, .09, .47]} /><meshStandardMaterial color="#879173" metalness={.48} /></mesh></>}
    {kind === 'vex' && <><mesh castShadow position={[0, .82, .08]}><boxGeometry args={[width * .63, .41, length * .5]} /><meshStandardMaterial color="#a9b7b6" metalness={.65} roughness={.32} /></mesh><mesh position={[0, .8, .08]}><boxGeometry args={[width * .67, .02, length * .54]} /><meshStandardMaterial color="#26373a" wireframe /></mesh><mesh castShadow position={[0, .96, -length * .42]}><boxGeometry args={[.28, .23, .15]} /><meshStandardMaterial color="#dc7950" /></mesh><mesh castShadow position={[0, .7, length * .48]}><boxGeometry args={[width * .42, .12, .35]} /><meshStandardMaterial color="#d0d2c8" metalness={.42} /></mesh></>}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.01, 0]} receiveShadow><planeGeometry args={[200, 200]} /><meshStandardMaterial color="#1b2b30" roughness={1} /></mesh>
    <gridHelper args={[12, 24, '#476065', '#304349']} position={[0, .002, 0]} />
  </group>;
}

export default function ConceptModel({ kind, lowQuality }: { kind: Kind; lowQuality: boolean }) {
  return <Canvas aria-hidden="true" shadows={!lowQuality} dpr={lowQuality ? 1 : [1, 1.5]} camera={{ position: [3.6, 2.8, 4.8], fov: 42 }} gl={{ antialias: !lowQuality, powerPreference: 'high-performance' }}>
    <color attach="background" args={['#1b2b30']} /><ambientLight intensity={1.4} /><hemisphereLight args={['#edf0e9', '#233238', 1.7]} /><directionalLight castShadow={!lowQuality} position={[4, 6, 5]} intensity={3.1} color="#f2ece1" shadow-mapSize={[512, 512]} /><pointLight position={[-3, 3, -2]} intensity={10} color="#c97951" distance={8} /><Model kind={kind} /><OrbitControls enableZoom={false} enablePan={false} minPolarAngle={.5} maxPolarAngle={1.45} autoRotate={false} target={new THREE.Vector3(0, .5, 0)} />
  </Canvas>;
}
