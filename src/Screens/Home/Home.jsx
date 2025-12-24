import React, { useState, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
  MeshWobbleMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Leaf, Droplets, ShieldCheck } from "lucide-react";
import Styles from "./styles/HomeStyles";
import useCitizenTree from "/src/hooks/useCitizenTree.jsx";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

// --- Configuration ---
const STAGE_NAMES = [
  "Dormant Seed", // 0-12
  "Emerging Sprout", // 13-25
  "Young Sapling", // 26-37
  "Woody Stem", // 38-50
  "Bushy Juvenile", // 51-62
  "Thriving Tree", // 63-75
  "Grand Canopy", // 76-87
  "Ancient Guardian", // 88-100
];

// --- Helper: Leaf Clusters with Particles ---
const LeafCloud = ({ position, scale }) => (
  <group position={position}>
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh>
        <sphereGeometry args={[scale * 0.4, 16, 16]} />
        <MeshWobbleMaterial
          factor={0.4}
          speed={1}
          color="#064e3b"
          roughness={0.8}
        />
      </mesh>

      {/* RESTORED: Leaf Highlight Particles */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 1.5) * (scale * 0.3),
            Math.cos(i * 1.5) * (scale * 0.3),
            (Math.random() - 0.5) * scale,
          ]}
          scale={0.08}
        >
          <planeGeometry />
          <meshStandardMaterial
            color="#34d399"
            side={THREE.DoubleSide}
            emissive="#10b981"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </Float>
  </group>
);

// --- Helper: Branch Structure ---
const Branch = ({ position, rotation, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <mesh>
      <cylinderGeometry args={[0.02, 0.06, 1, 8]} />
      <meshStandardMaterial color="#2d1a0f" />
    </mesh>
    <LeafCloud position={[0, 0.5, 0]} scale={0.6} />
  </group>
);

// --- Helper: Rain Particles for Stage 1 ---
const RainParticles = () => {
  const rainRef = useRef();
  useFrame(() => {
    if (rainRef.current) {
      rainRef.current.children.forEach((drop) => {
        drop.position.y -= 0.05;
        if (drop.position.y < 0) drop.position.y = 3;
      });
    }
  });
  return (
    <group ref={rainRef}>
      {[...Array(20)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 2,
            Math.random() * 3,
            (Math.random() - 0.5) * 2,
          ]}
        >
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#60a5fa"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  );
};

// --- Realistic Tree Component ---
const RealisticTree = ({ points }) => {
  const stageIndex = Math.min(7, Math.floor(points / 12.5));
  const stage = stageIndex + 1;
  const treeRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (treeRef.current) {
      treeRef.current.rotation.y = Math.sin(t * 0.15) * 0.04;
    }
  });

  return (
    <group ref={treeRef} position={[0, -2, 0]}>
      {/* Soil Base */}
      <mesh receiveShadow position={[0, 0.1, 0]}>
        <cylinderGeometry args={[2.5, 2.6, 0.4, 64]} />
        <meshStandardMaterial color="#1a120b" roughness={1} />
      </mesh>

      {/* STAGE 1: Dormant Seed */}
      {stage === 1 && (
        <group>
          <mesh position={[0, 0.3, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#4d3221" />
          </mesh>
          <RainParticles />
        </group>
      )}

      {/* STAGE 2: Emerging Sprout */}
      {stage === 2 && (
        <group>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.02, 0.04, 0.6, 12]} />
            <meshStandardMaterial color="#10b981" />
          </mesh>
          <LeafCloud position={[0, 0.7, 0]} scale={0.5} />
        </group>
      )}

      {/* STAGE 3: Young Sapling */}
      {stage === 3 && (
        <group>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 1.2, 12]} />
            <meshStandardMaterial color="#3b1f05" />
          </mesh>
          <Branch position={[0, 0.9, 0]} rotation={[0, 0.5, 0.6]} scale={0.5} />
          <LeafCloud position={[0, 1.3, 0]} scale={0.8} />
        </group>
      )}

      {/* STAGE 4: Woody Stem */}
      {stage === 4 && (
        <group>
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.08, 0.14, 1.8, 12]} />
            <meshStandardMaterial color="#3b1f05" />
          </mesh>
          <Branch position={[0, 1.4, 0]} rotation={[0, 1, 0.7]} scale={0.7} />
          <Branch position={[0, 1.0, 0]} rotation={[0, -2, -0.7]} scale={0.6} />
          <LeafCloud position={[0, 1.8, 0]} scale={1.2} />
        </group>
      )}

      {/* STAGE 5: Bushy Juvenile */}
      {stage === 5 && (
        <group>
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.12, 0.2, 2.2, 16]} />
            <meshStandardMaterial color="#2d1a0f" />
          </mesh>
          <Branch position={[0, 1.6, 0]} rotation={[0, 0, 0.8]} scale={0.8} />
          <Branch
            position={[0, 1.3, 0]}
            rotation={[0, 2.5, -0.8]}
            scale={0.8}
          />
          <Branch position={[0, 1.8, 0]} rotation={[0, 4, 0.4]} scale={0.6} />
          <LeafCloud position={[0, 2.4, 0]} scale={1.8} />
        </group>
      )}

      {/* STAGE 6: Thriving Tree */}
      {stage === 6 && (
        <group>
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.15, 0.28, 2.6, 16]} />
            <meshStandardMaterial color="#2d1a0f" />
          </mesh>
          {[0, 2.1, 4.2].map((rot, i) => (
            <group
              key={i}
              rotation={[0, rot, 0.7]}
              position={[0, 1.2 + i * 0.4, 0]}
            >
              <Branch scale={0.9} />
            </group>
          ))}
          <LeafCloud position={[0, 3.0, 0]} scale={2.5} />
        </group>
      )}

      {/* STAGE 7: Grand Canopy */}
      {stage === 7 && (
        <group>
          <mesh position={[0, 1.4, 0]}>
            <cylinderGeometry args={[0.2, 0.4, 3, 20]} />
            <meshStandardMaterial color="#2d1a0f" />
          </mesh>
          {[0, 1.5, 3, 4.5].map((rot, i) => (
            <group
              key={i}
              rotation={[0, rot, 0.6]}
              position={[0, 1.2 + i * 0.5, 0]}
            >
              <Branch scale={1} />
            </group>
          ))}
          <LeafCloud position={[0, 3.4, 0]} scale={3.2} />
          <LeafCloud position={[1.2, 2.2, 0]} scale={1.8} />
          <LeafCloud position={[-1, 2.5, 0.8]} scale={1.6} />
        </group>
      )}

      {/* STAGE 8: Ancient Guardian */}
      {stage === 8 && (
        <group>
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.3, 0.55, 3.2, 20]} />
            <meshStandardMaterial color="#2d1a0f" roughness={1} />
          </mesh>
          {[0, 1.2, 2.4, 3.6, 4.8].map((rot, i) => (
            <group
              key={i}
              rotation={[0, rot, 0.5]}
              position={[0, 1.2 + i * 0.4, 0]}
            >
              <Branch scale={1.1 + i * 0.1} />
            </group>
          ))}
          <LeafCloud position={[0, 4.0, 0]} scale={4} />
          <LeafCloud position={[1.8, 2.8, 0.5]} scale={2.5} />
          <LeafCloud position={[-1.5, 3.2, -1]} scale={2.8} />
          <LeafCloud position={[0.5, 2.2, -1.8]} scale={2} />
        </group>
      )}
    </group>
  );
};

// --- Main App Page ---
export default function EcoApp() {
  const { user, loading: authLoading } = useAuth();
  const citizenId = user?.id;

  const { treeLevel, loading } = useCitizenTree(citizenId);

  if (authLoading) {
    return <div className="loading-screen">Authenticating… 🔐</div>;
  }

  if (loading || treeLevel === null) {
    return <div className="loading-screen">Loading your tree… 🌱</div>;
  }

  const points = Math.min(100, Math.max(0, treeLevel));
  const currentStageIndex = Math.min(7, Math.floor(points / 12.5));

  return (
    <div className="page-container">
      <Styles />
      <div className="molten-bg">
        <div className="molten-orb" />
      </div>

      <div className="app-wrapper">
        <header className="nav-header">
          <div className="logo-text">
            <img
              src="../../assets/images/logo.png"
              style={{ width: "40px", height: "40px" }}
              alt="logo"
            />
            EcoSphere
          </div>
        </header>

        <main className="dashboard-grid">
          {/* Left: Tree Status (NO TEST CONTROLLER) */}
          <section className="glass-panel">
            <h2 style={{ marginBottom: "10px", fontSize: "1.2rem" }}>
              Tree Growth Status
            </h2>

            <div
              style={{
                marginTop: "10px",
                padding: "15px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "15px",
              }}
            >
              <h4
                style={{
                  margin: "0 0 5px 0",
                  fontSize: "0.8rem",
                  color: "#34d399",
                  textTransform: "uppercase",
                }}
              >
                Current Phase
              </h4>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                {STAGE_NAMES[currentStageIndex]}
              </div>
              <div style={{ fontSize: "0.9rem", opacity: 0.6 }}>
                Tree Level {treeLevel} / 100
              </div>
            </div>
          </section>

          {/* Center: 3D Visualization */}
          <section className="canvas-section">
            <div className="points-pill">
              <h1
                style={{
                  margin: 0,
                  fontSize: "1.4rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                {STAGE_NAMES[currentStageIndex]}
              </h1>
              <div className="progress-track">
                <motion.div
                  className="progress-fill"
                  animate={{ width: `${points}%` }}
                  transition={{ type: "spring", stiffness: 50 }}
                />
              </div>
            </div>

            <div className="canvas-holder">
              <Canvas shadows dpr={[1, 2]}>
                <Suspense fallback={null}>
                  <Environment preset="forest" />
                  <RealisticTree points={points} />
                  <ContactShadows
                    opacity={0.4}
                    scale={15}
                    blur={2.5}
                    far={10}
                    color="#000"
                  />
                  <OrbitControls
                    enableZoom={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 2.1}
                  />
                </Suspense>
              </Canvas>
            </div>
          </section>

          {/* Right: Impact Metrics */}
          <section className="glass-panel">
            <h3 style={{ marginBottom: "20px", fontSize: "1rem" }}>
              Environmental Impact
            </h3>
            <div style={{ display: "grid", gap: "20px" }}>
              <ImpactItem
                icon={<Droplets size={20} color="#34d399" />}
                label="Water Purified"
                value={`${Math.round(points) * 5}L`}
              />
              <ImpactItem
                icon={<Leaf size={20} color="#34d399" />}
                label="CO₂ Offset"
                value={`${(points * 0.4).toFixed(1)}kg`}
              />
              <ImpactItem
                icon={<ShieldCheck size={20} color="#34d399" />}
                label="Growth Rank"
                value={`Lvl ${treeLevel}`}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const ImpactItem = ({ icon, label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
    <div
      style={{
        padding: "10px",
        background: "rgba(52, 211, 153, 0.1)",
        borderRadius: "12px",
      }}
    >
      {icon}
    </div>
    <div>
      <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{value}</div>
      <small
        style={{ opacity: 0.5, textTransform: "uppercase", fontSize: "0.7rem" }}
      >
        {label}
      </small>
    </div>
  </div>
);
