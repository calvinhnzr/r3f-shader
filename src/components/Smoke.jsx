import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useThree, useFrame, extend, useLoader } from "@react-three/fiber"
import { useControls, folder } from "leva"
import vertexShader from "../shaders/smoke/vertex.glsl"
import fragmentShader from "../shaders/smoke/fragment.glsl"

export const Smoke = () => {
  const perlinTexture = useLoader(THREE.TextureLoader, "/textures/perlin.png")
  // RepeatWrapping is used to repeat the texture
  perlinTexture.wrapS = THREE.RepeatWrapping
  perlinTexture.wrapT = THREE.RepeatWrapping

  const meshRef = useRef()
  const geometryRef = useRef()
  const materialRef = useRef()

  const uniforms = useRef({
    uTime: new THREE.Uniform(0),
    uPerlinTexture: new THREE.Uniform(perlinTexture),
    uSmokeColor: new THREE.Uniform(new THREE.Color(0xffffff)),
  })

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsedTime
    }
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
        depthWrite={false}
        transparent
      />
    </mesh>
  )
}
