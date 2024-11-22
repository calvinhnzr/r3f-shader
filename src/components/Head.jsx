import { useEffect, useRef, useLayoutEffect } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useThree, useFrame, extend, useLoader } from "@react-three/fiber"
import { useGLTF, Gltf } from "@react-three/drei"
import { useControls } from "leva"

export const Head = () => {
  const colorMap = useLoader(THREE.TextureLoader, "./models/LeePerrySmith/color.jpg")
  const normalMap = useLoader(THREE.TextureLoader, "./models/LeePerrySmith/normal.jpg")
  const gltf = useLoader(GLTFLoader, "./models/LeePerrySmith/LeePerrySmith.glb")
  const { scene, nodes, materials } = useGLTF("./models/LeePerrySmith/LeePerrySmith.glb")

  return (
    <>
      <primitive object={gltf.scene} scale={0.2}></primitive>
    </>
  )
}
