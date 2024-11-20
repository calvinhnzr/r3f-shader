import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { useControls, Leva } from "leva"
import testVertextShader from "../shaders/test/vertex.glsl"
import testFragmentShader from "../shaders/test/fragment.glsl"

export const Plane = () => {
  const meshRef = useRef()
  const geometryRef = useRef()
  const materialRef = useRef()

  // Leva controls
  const { frequencyX, frequencyY } = useControls("uFrequency", {
    frequencyX: {
      value: 1,
      min: 0,
      max: 10,
      step: 1,
    },
    frequencyY: {
      value: 1,
      min: 0,
      max: 10,
      step: 1,
    },
  })

  const uniforms = useRef({
    uFrequency: new THREE.Uniform(new THREE.Vector2(frequencyX, frequencyY)),
  })

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uFrequency.value.x = frequencyX
      materialRef.current.uniforms.uFrequency.value.y = frequencyY
      console.log(materialRef.current.uniforms.uFrequency.value)
    }
  }, [frequencyX, frequencyY])

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 32, 32]} ref={geometryRef} />
      <rawShaderMaterial
        vertexShader={testVertextShader}
        fragmentShader={testFragmentShader}
        uniforms={uniforms.current}
        // uniforms={{ value: new THREE.Vector2(10, 5) }}
        wireframe
        transparent
        ref={materialRef}
      />
    </mesh>
  )
}
