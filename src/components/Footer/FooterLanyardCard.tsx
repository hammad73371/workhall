/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
  type RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import workhallWhite from "../../assets/workhall-white.svg";

extend({ MeshLineGeometry, MeshLineMaterial });

const FOOTER_CARD_SCALE = 0.8;
const FOOTER_CARD_OFFSET_Y = -1.2;
const FOOTER_CARD_CAP_CENTER_Y = 1.76;
const FOOTER_CARD_CAP_HEIGHT = 0.08;
const FOOTER_CARD_RENDER_ANCHOR_Y =
  FOOTER_CARD_OFFSET_Y +
  FOOTER_CARD_SCALE * (FOOTER_CARD_CAP_CENTER_Y + FOOTER_CARD_CAP_HEIGHT * 0.5);
const FOOTER_CARD_JOINT_Y = 1.45;

type LanyardRigidBody = RapierRigidBody & {
  lerped?: THREE.Vector3;
};

function WorkHallCard() {
  const [frontMap, backMap] = useTexture([workhallWhite, workhallWhite]);

  useEffect(() => {
    [frontMap, backMap].forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    });
  }, [frontMap, backMap]);

  return (
    <>
      <RoundedBox args={[2.14, 3.06, 0.024]} radius={0.16} smoothness={6}>
        <meshBasicMaterial
          color="#d26d45"
        />
      </RoundedBox>

      <mesh position={[0, 0, 0.014]} scale={[1.48, 1.48, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={frontMap} transparent opacity={0.97} toneMapped={false} />
      </mesh>

      <mesh position={[0, 0, -0.014]} rotation={[0, Math.PI, 0]} scale={[1.48, 1.48, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={backMap} transparent opacity={0.97} toneMapped={false} />
      </mesh>

      <mesh position={[0, 1.58, 0.018]}>
        <boxGeometry args={[0.34, 0.18, 0.06]} />
        <meshBasicMaterial color="#efe6d8" />
      </mesh>

      <mesh position={[0, 1.76, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.08, 28]} />
        <meshBasicMaterial color="#d8cbb8" />
      </mesh>
    </>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) {
  const cardAttachment = useMemo(
    () => new THREE.Vector3(0, FOOTER_CARD_RENDER_ANCHOR_Y, 0),
    [],
  );
  const cardWorldAttachment = useMemo(() => new THREE.Vector3(), []);
  const cardRotation = useMemo(() => new THREE.Quaternion(), []);
  const band = useRef<THREE.Mesh>(null!);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<LanyardRigidBody>(null!);
  const j2 = useRef<LanyardRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const segmentProps: RigidBodyProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const getLerped = (body: LanyardRigidBody) => {
    if (!body.lerped) {
      body.lerped = new THREE.Vector3().copy(body.translation());
    }

    return body.lerped;
  };

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, FOOTER_CARD_JOINT_Y, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (!fixed.current) return;

    [j1, j2].forEach((ref) => {
      const lerped = getLerped(ref.current);
      const clampedDistance = Math.max(
        0.1,
        Math.min(1, lerped.distanceTo(ref.current.translation())),
      );
      lerped.lerp(
        ref.current.translation(),
        delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        );
      });

    cardRotation.set(
      card.current.rotation().x,
      card.current.rotation().y,
      card.current.rotation().z,
      card.current.rotation().w,
    );
    cardWorldAttachment
      .copy(cardAttachment)
      .applyQuaternion(cardRotation)
      .add(card.current.translation());

    curve.points[0].copy(cardWorldAttachment);
    curve.points[1].copy(getLerped(j2.current));
    curve.points[2].copy(getLerped(j1.current));
    curve.points[3].copy(fixed.current.translation());
    (band.current.geometry as any).setPoints(curve.getPoints(isMobile ? 16 : 32));

    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());
    card.current.setAngvel(
      { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
      true,
    );
  });

  curve.curveType = "chordal";

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={FOOTER_CARD_SCALE}
            position={[0, FOOTER_CARD_OFFSET_Y, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(event: ThreeEvent<PointerEvent>) => {
              (event.target as Element).releasePointerCapture(event.pointerId);
              drag(false);
            }}
            onPointerDown={(event: ThreeEvent<PointerEvent>) => {
              (event.target as Element).setPointerCapture(event.pointerId);
              drag(new THREE.Vector3().copy(event.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <WorkHallCard />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band as React.MutableRefObject<THREE.Mesh>}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#d26d45"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          lineWidth={0.9}
        />
      </mesh>
    </>
  );
}

function FooterLanyardScene() {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 30], fov: 20 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
    >
      <ambientLight intensity={Math.PI} />
      <Physics gravity={[0, -40, 0]} timeStep={isMobile ? 1 / 30 : 1 / 60}>
        <Band isMobile={isMobile} />
      </Physics>
      <Environment blur={0.75}>
        <Lightformer
          intensity={2}
          color="white"
          position={[0, -1, 5]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[-1, -1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[1, 1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={10}
          color="white"
          position={[-10, 0, 14]}
          rotation={[0, Math.PI / 2, Math.PI / 3]}
          scale={[100, 10, 1]}
        />
      </Environment>
    </Canvas>
  );
}

export default function FooterLanyardCard() {
  return (
    <aside className="sp-footer-lanyard-card" aria-label="WorkHall card">
      <div className="sp-footer-lanyard-card__frame">
        <div className="sp-footer-lanyard-wrapper">
          <FooterLanyardScene />
        </div>
      </div>
    </aside>
  );
}
