import { useEffect, useRef } from "react"
import * as THREE from "three"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useThree, useFrame, extend, useLoader } from "@react-three/fiber"
import { useControls, folder } from "leva"

import vertexShader from "../shaders/pattern/vertex.glsl"
import fragmentShader from "../shaders/pattern/fragment.glsl"

export const PatternPlane = () => {
  const meshRef = useRef()
  const geometryRef = useRef()
  const materialRef = useRef()

  const uniforms = useRef({
    //
  })

  useEffect(() => {
    if (materialRef.current) {
      // console.log(geometryRef.current)
    }
  }, [])

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 32, 32]} ref={geometryRef} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
        transparent={false}
        side={THREE.DoubleSide}
        ref={materialRef}
      />
    </mesh>
  )
}
