import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';


const HumanModel = () => {
  // const modelUrl = "/3d_model/body.glb";
  const { scene } = useGLTF("/3d_model/body.glb");
  return <primitive object={scene} />;
};

const Body = () => (
  <Canvas>
    <ambientLight />
    <Suspense fallback={null}>
      <HumanModel />
    </Suspense>
    <OrbitControls />
  </Canvas>
);

export default Body;
