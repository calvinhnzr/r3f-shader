import { useEffect, useRef, useLayoutEffect } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useThree, useFrame, extend, useLoader } from "@react-three/fiber"
import { useGLTF, Gltf } from "@react-three/drei"
import { useControls } from "leva"

export const Model = () => {
  const gltf = useLoader(GLTFLoader, "./models/bakedModel.glb")
  return (
    <>
      <primitive object={gltf.scene} scale={0.2}></primitive>
    </>
  )
}
