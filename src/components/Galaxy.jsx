import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useThree, useFrame, extend, useLoader } from "@react-three/fiber"
import { useControls, folder } from "leva"

export const Galaxy = () => {
  const meshRef = useRef()
  const geometryRef = useRef()
  const materialRef = useRef()

  const uniforms = useRef({})

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 32, 32]} ref={geometryRef} />
      <shaderMaterial wireframe transparent uniforms={uniforms.current} ref={materialRef} />
    </mesh>
  )
}
