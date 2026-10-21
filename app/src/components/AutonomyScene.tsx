import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import type { MutableRefObject, RefObject } from 'react';
import * as THREE from 'three';

type SceneProps = {
  progress: MutableRefObject<number>;
  pointer: MutableRefObject<{ x: number; y: number }>;
  active: boolean;
  lowQuality: boolean;
  mobile?: boolean;
};

const route = new THREE.CatmullRomCurve3([
  new THREE.Vector3(3.2, 0.09, -2.8),
  new THREE.Vector3(2.1, 0.09, -1.9),
  new THREE.Vector3(0.8, 0.09, -0.9),
  new THREE.Vector3(-0.5, 0.09, -0.6),
  new THREE.Vector3(-1.55, 0.09, 0.3),
  new THREE.Vector3(-1.65, 0.09, 1.6),
  new THREE.Vector3(-2.6, 0.09, 2.3),
  new THREE.Vector3(-3.5, 0.09, 2.8),
]);

const routePoints = route.getPoints(84).map((point) => [point.x, point.y, point.z] as [number, number, number]);
const candidateA: [number, number, number][] = [[3.2, .07, -2.8], [1.5, .07, .6], [.1, .07, 1.3], [-1.5, .07, 2.1], [-3.5, .07, 2.8]];
const candidateB: [number, number, number][] = [[3.2, .07, -2.8], [1.2, .07, -3.2], [-1.5, .07, -2.1], [-2.4, .07, .3], [-3.5, .07, 2.8]];

function Robot({ groupRef, wheelRef }: {
  groupRef: RefObject<THREE.Group | null>;
  wheelRef: RefObject<THREE.Group | null>;
}) {
  return (
    <group ref={groupRef}>
      <mesh castShadow position={[0, .34, 0]}>
        <boxGeometry args={[1.12, .28, 1.42]} />
        <meshStandardMaterial color="#d9d8cf" metalness={.65} roughness={.34} />
      </mesh>
      <mesh castShadow position={[0, .51, -.09]}>
        <boxGeometry args={[.94, .12, 1.05]} />
        <meshStandardMaterial color="#303f43" metalness={.45} roughness={.45} />
      </mesh>
      <mesh position={[0, .586, -.33]}>
        <boxGeometry args={[.55, .018, .13]} />
        <meshStandardMaterial color="#cf7045" emissive="#863b25" emissiveIntensity={.32} />
      </mesh>
      <group ref={wheelRef}>
        {[-.63, .63].map((x) => (
          <group key={x} position={[x, .24, 0]} rotation={[0, 0, Math.PI / 2]}>
            <mesh castShadow>
              <cylinderGeometry args={[.25, .25, .15, 24]} />
              <meshStandardMaterial color="#18252b" roughness={.8} />
            </mesh>
            <mesh position={[0, .083, 0]}>
              <cylinderGeometry args={[.11, .11, .006, 20]} />
              <meshStandardMaterial color="#8b9997" metalness={.75} roughness={.3} />
            </mesh>
          </group>
        ))}
      </group>
      <mesh castShadow position={[0, .66, .29]}>
        <cylinderGeometry args={[.16, .18, .16, 24]} />
        <meshStandardMaterial color="#9caeac" metalness={.6} roughness={.32} />
      </mesh>
      <mesh castShadow position={[0, .78, .29]}>
        <cylinderGeometry args={[.23, .23, .08, 32]} />
        <meshStandardMaterial color="#242f33" metalness={.45} roughness={.35} />
      </mesh>
      <mesh position={[0, .826, .29]}>
        <cylinderGeometry args={[.17, .17, .012, 32]} />
        <meshStandardMaterial color="#cf7045" metalness={.3} roughness={.4} />
      </mesh>
      <mesh position={[0, .24, -.72]}>
        <boxGeometry args={[.42, .1, .035]} />
        <meshStandardMaterial color="#e7bd89" emissive="#a86632" emissiveIntensity={.6} />
      </mesh>
    </group>
  );
}

function World({ progress, pointer, mobile }: Pick<SceneProps, 'progress' | 'pointer' | 'mobile'>) {
  const robot = useRef<THREE.Group>(null);
  const wheels = useRef<THREE.Group>(null);
  const scan = useRef<THREE.Group>(null);
  const particles = useRef<THREE.Group>(null);
  const alternatives = useRef<THREE.Group>(null);
  const certainty = useRef<THREE.Mesh>(null);
  const cameraTarget = useMemo(() => new THREE.Vector3(), []);
  const point = useMemo(() => new THREE.Vector3(), []);
  const particleSeeds = useMemo(() => Array.from({ length: 42 }, (_, index) => {
    const angle = index * 2.399963;
    const radius = Math.sqrt((index + .5) / 42);
    return { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius };
  }), []);
  const obstacles = useMemo(() => [
    { p: [-.15, .42, 1.35] as [number, number, number], s: [1.0, .84, .94] as [number, number, number] },
    { p: [1.6, .31, 1.25] as [number, number, number], s: [.72, .62, 1.3] as [number, number, number] },
    { p: [-2.55, .34, -1.45] as [number, number, number], s: [1.05, .68, .82] as [number, number, number] },
    { p: [.5, .55, -2.9] as [number, number, number], s: [.8, 1.1, .7] as [number, number, number] },
  ], []);

  useFrame(({ camera, clock }, delta) => {
    const p = Math.max(0, Math.min(1, progress.current));
    const drive = Math.max(Math.min(.075, clock.elapsedTime * .009), Math.min(1, Math.max(0, (p - .035) / .93)));
    const easedDrive = drive * drive * (3 - 2 * drive);
    route.getPointAt(easedDrive, point);
    const tangent = route.getTangentAt(Math.min(.999, easedDrive));
    if (robot.current) {
      robot.current.position.set(point.x, 0, point.z);
      robot.current.rotation.y = Math.atan2(-tangent.x, -tangent.z);
      robot.current.position.y = Math.sin(clock.elapsedTime * 3) * .012;
    }
    if (wheels.current) wheels.current.rotation.x = -clock.elapsedTime * .35;

    const isPerception = p > .17 && p < .45;
    const isLocalization = p > .39 && p < .68;
    const isPlanning = p > .57 && p < .87;
    if (scan.current) {
      scan.current.visible = isPerception;
      scan.current.position.set(point.x, 0, point.z);
      scan.current.rotation.y = clock.elapsedTime * .22;
    }
    if (particles.current) {
      particles.current.visible = isLocalization;
      const contraction = Math.max(.17, 1.4 - (p - .39) * 4.3);
      particles.current.children.forEach((child, index) => {
        child.position.set(point.x + particleSeeds[index].x * contraction, .1, point.z + particleSeeds[index].z * contraction);
      });
    }
    if (certainty.current) {
      certainty.current.visible = isLocalization;
      certainty.current.position.set(point.x, .045, point.z);
      const size = Math.max(.35, 2.5 - (p - .39) * 7.2);
      certainty.current.scale.set(size, size, 1);
    }
    if (alternatives.current) alternatives.current.visible = isPlanning;

    const blend = (a: number, b: number, t: number) => a + (b - a) * t;
    let desired = mobile ? new THREE.Vector3(6.8, 6.1, 4.4) : new THREE.Vector3(7.1, 5.2, 8.3);
    let look = mobile ? new THREE.Vector3(2.35, -1.15, -1.75) : new THREE.Vector3(-.35, .1, 0);
    if (p > .17 && p < .42) {
      const t = Math.min(1, (p - .17) / .1);
      desired = new THREE.Vector3(blend(7.1, 4.0, t), blend(5.2, 3.4, t), blend(8.3, 4.8, t));
      look = new THREE.Vector3(point.x, .2, point.z);
    } else if (p >= .42 && p < .79) {
      const t = Math.min(1, (p - .42) / .09);
      desired = new THREE.Vector3(blend(4, .01, t), blend(3.4, 11.5, t), blend(4.8, .015, t));
      look = new THREE.Vector3(0, 0, 0);
    } else if (p >= .79) {
      const t = Math.min(1, (p - .79) / .11);
      desired = new THREE.Vector3(blend(.01, 4.2, t), blend(11.5, 3.4, t), blend(.015, 5.6, t));
      look = new THREE.Vector3(point.x, .1, point.z);
    }
    desired.x += pointer.current.x * .16;
    desired.y += pointer.current.y * .08;
    camera.position.lerp(desired, Math.min(1, delta * 2.25));
    cameraTarget.lerp(look, Math.min(1, delta * 2.8));
    camera.lookAt(cameraTarget);
  });

  return (
    <>
      <color attach="background" args={['#101b20']} />
      <fog attach="fog" args={['#101b20', 10, 25]} />
      <ambientLight intensity={.92} />
      <hemisphereLight args={['#e4edf0', '#253238', 1.7]} />
      <directionalLight castShadow position={[3, 8, 5]} intensity={3.4} color="#f0eadf" shadow-mapSize={[1024, 1024]} shadow-camera-left={-8} shadow-camera-right={8} shadow-camera-top={8} shadow-camera-bottom={-8} />
      <pointLight position={[-3, 3, 0]} intensity={24} color="#cf7045" distance={9} />

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -.04, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#18282e" roughness={.89} metalness={.07} />
      </mesh>
      <gridHelper args={[12, 24, '#52656a', '#34484e']} position={[0, .003, 0]} />
      {obstacles.map(({ p, s }, index) => (
        <mesh key={index} castShadow receiveShadow position={p}>
          <boxGeometry args={s} />
          <meshStandardMaterial color={index % 2 ? '#495b5e' : '#617271'} roughness={.78} metalness={.08} />
        </mesh>
      ))}
      <Line points={routePoints} color="#df8155" lineWidth={2.2} transparent opacity={.92} />
      <group ref={alternatives} visible={false}>
        <Line points={candidateA} color="#8ba3a3" lineWidth={1} transparent opacity={.52} dashed dashSize={.11} gapSize={.1} />
        <Line points={candidateB} color="#8ba3a3" lineWidth={1} transparent opacity={.52} dashed dashSize={.11} gapSize={.1} />
      </group>
      <mesh position={[-3.5, .09, 2.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[.25, .29, 48]} />
        <meshBasicMaterial color="#df8155" side={THREE.DoubleSide} />
      </mesh>
      <Robot groupRef={robot} wheelRef={wheels} />
      <group ref={scan} visible={false}>
        {Array.from({ length: 20 }, (_, index) => {
          const angle = index * Math.PI * 2 / 20;
          const length = index % 4 === 0 ? 2.8 : 1.95;
          return <Line key={index} points={[[0, .82, .29], [Math.cos(angle) * length, .1, Math.sin(angle) * length]]} color="#9bc5bf" lineWidth={1} transparent opacity={.4} />;
        })}
      </group>
      <group ref={particles} visible={false}>
        {particleSeeds.map((_, index) => (
          <mesh key={index}>
            <sphereGeometry args={[.045, 7, 7]} />
            <meshBasicMaterial color={index % 4 === 0 ? '#df8155' : '#a7c8c0'} transparent opacity={.8} />
          </mesh>
        ))}
      </group>
      <mesh ref={certainty} visible={false} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[.97, 1, 64]} />
        <meshBasicMaterial color="#a7c8c0" side={THREE.DoubleSide} transparent opacity={.7} />
      </mesh>
    </>
  );
}

export default function AutonomyScene({ progress, pointer, active, lowQuality }: SceneProps) {
  const mobile = window.innerWidth < 760;
  return (
    <Canvas
      aria-hidden="true"
      shadows={!lowQuality}
      dpr={lowQuality ? [1, 1] : [1, 1.5]}
      frameloop={active ? 'always' : 'demand'}
      camera={{ position: mobile ? [6.8, 6.1, 4.4] : [7.1, 5.2, 8.3], fov: mobile ? 53 : 44, near: .1, far: 70 }}
      gl={{ antialias: !lowQuality, powerPreference: 'high-performance', alpha: false }}
      onCreated={({ gl }) => { gl.setClearColor('#101b20'); }}
    >
      <Suspense fallback={null}>
        <World progress={progress} pointer={pointer} mobile={mobile} />
      </Suspense>
    </Canvas>
  );
}
