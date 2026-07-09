/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Canvas,
  extend,
  useFrame,
  type ThreeEvent,
} from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RigidBodyProps,
  type RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import workhallOrange from "../../assets/workhall-orange.svg";

extend({ MeshLineGeometry, MeshLineMaterial });

type LanyardRigidBody = RapierRigidBody & {
  lerped?: THREE.Vector3;
};

function LanyardBand() {
  const cardAttachment = useMemo(() => new THREE.Vector3(0, 0.62, 0), []);
  const cardWorldAttachment = useMemo(() => new THREE.Vector3(), []);
  const cardRotation = useMemo(() => new THREE.Quaternion(), []);
  const band = useRef<THREE.Mesh>(null!);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<LanyardRigidBody>(null!);
  const j2 = useRef<LanyardRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const [logoFront, logoBack] = useTexture([workhallOrange, workhallOrange]);
  const [dragged, setDragged] = useState<false | THREE.Vector3>(false);
  const [hovered, setHovered] = useState(false);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const pointerVec = useMemo(() => new THREE.Vector3(), []);
  const dragOffset = useMemo(() => new THREE.Vector3(), []);
  const dragDirection = useMemo(() => new THREE.Vector3(), []);

  const segmentProps: RigidBodyProps = {
    type: "dynamic" as const,
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

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.7]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.7]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.7]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 2.54, 0]]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [dragged, hovered]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      pointerVec.set(state.pointer.x, state.pointer.y, 0.6).unproject(state.camera);
      dragDirection.copy(pointerVec).sub(state.camera.position).normalize();
      pointerVec.add(dragDirection.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: pointerVec.x - dragged.x,
        y: pointerVec.y - dragged.y,
        z: pointerVec.z - dragged.z,
      });
    }

    if (!fixed.current) return;

    [j1, j2].forEach((ref) => {
      const lerped = getLerped(ref.current);
      const distance = Math.max(
        0.1,
        Math.min(1, lerped.distanceTo(ref.current.translation())),
      );
      lerped.lerp(ref.current.translation(), delta * (18 + distance * 28));
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
    (band.current.geometry as any).setPoints(curve.getPoints(28));

    const angvel = card.current.angvel();
    const rotation = card.current.rotation();
    card.current.setAngvel(
      {
        x: angvel.x,
        y: angvel.y - rotation.y * 0.25,
        z: angvel.z,
      },
      true,
    );
  });

  curve.curveType = "chordal";

  return (
    <>
      <group position={[0, 3.55, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody ref={j1} position={[0.42, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j2} position={[0.86, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j3} position={[1.28, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          ref={card}
          position={[1.72, -0.2, 0]}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[1.17, 1.625, 0.08]} />
          <group
            position={[0, -1.52, 0]}
            scale={1.352}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(event: ThreeEvent<PointerEvent>) => {
              (event.target as Element).releasePointerCapture(event.pointerId);
              setDragged(false);
            }}
            onPointerDown={(event: ThreeEvent<PointerEvent>) => {
              (event.target as Element).setPointerCapture(event.pointerId);
              dragOffset.copy(card.current.translation());
              setDragged(new THREE.Vector3().copy(event.point).sub(dragOffset));
            }}
          >
            <RoundedBox args={[2.14, 3.06, 0.12]} radius={0.16} smoothness={5}>
              <meshPhysicalMaterial
                color="#f6eee2"
                roughness={0.82}
                metalness={0.03}
                clearcoat={0.2}
                clearcoatRoughness={0.28}
              />
            </RoundedBox>

            <mesh position={[0, 0, 0.072]} scale={[1.72, 1.72, 1]}>
              <planeGeometry args={[1.48, 1.48]} />
              <meshBasicMaterial
                map={logoFront}
                transparent
                opacity={0.97}
                toneMapped={false}
              />
            </mesh>

            <mesh position={[0, 0, -0.072]} rotation={[0, Math.PI, 0]} scale={[1.72, 1.72, 1]}>
              <planeGeometry args={[1.48, 1.48]} />
              <meshBasicMaterial
                map={logoBack}
                transparent
                opacity={0.97}
                toneMapped={false}
              />
            </mesh>

            <mesh position={[0, 1.58, 0.08]}>
              <boxGeometry args={[0.34, 0.18, 0.1]} />
              <meshStandardMaterial color="#e8dccb" metalness={0.22} roughness={0.5} />
            </mesh>

            <mesh position={[0, 1.76, 0]}>
              <cylinderGeometry args={[0.18, 0.18, 0.1, 28]} />
              <meshStandardMaterial color="#c9b9a7" metalness={0.45} roughness={0.35} />
            </mesh>
          </group>
        </RigidBody>
      </group>

      <mesh ref={band as any}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#d26d45"
          depthTest={false}
          resolution={[1000, 1000]}
          lineWidth={0.5}
        />
      </mesh>
    </>
  );
}

function FooterLanyardScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15.25], fov: 52 }}
      dpr={[1, 1.75]}
      gl={{ alpha: true }}
    >
      <ambientLight intensity={1.55} />
      <directionalLight position={[2, 5, 5]} intensity={2.35} color="#fff7ef" />
      <Physics gravity={[0, -26, 0]} timeStep={1 / 60}>
        <LanyardBand />
      </Physics>
      <Environment blur={0.8}>
        <Lightformer
          intensity={1.8}
          color="#fffaf0"
          position={[0, 4, 6]}
          rotation={[0, 0, Math.PI / 5]}
          scale={[10, 0.8, 1]}
        />
        <Lightformer
          intensity={3}
          color="#f2dfcf"
          position={[-4, 1, 3]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12, 5, 1]}
        />
        <Lightformer
          intensity={2.6}
          color="#d26d45"
          position={[5, -1, 2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[8, 4, 1]}
        />
      </Environment>
    </Canvas>
  );
}

export default function FooterLanyardCard() {
  return (
    <aside className="sp-footer-lanyard-card" aria-label="WorkHall card">
      <div className="sp-footer-lanyard-card__frame">
        <FooterLanyardScene />
      </div>
    </aside>
  );
}
