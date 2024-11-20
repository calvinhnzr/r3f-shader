import { useEffect, useRef } from "react"
import * as THREE from "three"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useThree, useFrame, extend, useLoader } from "@react-three/fiber"
import { useControls, folder } from "leva"

export const Plane = () => {
  const meshRef = useRef()
  const geometryRef = useRef()
  const materialRef = useRef()

  const uniforms = useRef({
    //
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 32, 32]} ref={geometryRef} />
      <shaderMaterial
        uniforms={uniforms}
        wireframe
        transparent
        ref={materialRef}
      />
    </mesh>
  )
}
