import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

useGLTF.preload("/models/Colliders.glb");

const Colliders: React.FC = () => {
  const { scene } = useGLTF("/models/Colliders.glb");

  return (
    <RigidBody type="fixed" colliders="trimesh" includeInvisible>
      <primitive object={scene.children[0]} visible={false} />
    </RigidBody>
  );
};

export default Colliders;
