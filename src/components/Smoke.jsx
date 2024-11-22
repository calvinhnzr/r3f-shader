import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useThree, useFrame, extend, useLoader } from "@react-three/fiber"
import { useControls, folder } from "leva"
import vertexShader from "../shaders/smoke/vertex.glsl"
import fragmentShader from "../shaders/smoke/fragment.glsl"

export const Smoke = () => {
  const perlinTexture = useLoader(THREE.TextureLoader, "/textures/perlin.png")

  const meshRef = useRef()
  const geometryRef = useRef()
  const materialRef = useRef()

  const uniforms = useRef({
    uPerlinTexture: new THREE.Uniform(perlinTexture),
  })

  return (
    <mesh ref={meshRef} position-y={0.9}>
      <planeGeometry ref={geometryRef} args={[0.25, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
        // wireframe
        transparent
      />
    </mesh>
  )
}
