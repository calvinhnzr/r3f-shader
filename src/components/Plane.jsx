import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useControls, Leva } from "leva"
import testVertextShader from "../shaders/test/vertex.glsl"
import testFragmentShader from "../shaders/test/fragment.glsl"

export const Plane = () => {
  const meshRef = useRef()
  const geometryRef = useRef()
  const materialRef = useRef()

  const { x, y } = useControls("uFrequency", {
    x: {
      value: 1,
      min: 0,
      max: 10,
      step: 1,
    },
    y: {
      value: 1,
      min: 0,
      max: 10,
      step: 1,
    },
  })

  const count = geometryRef.current?.attributes.position.count
  const randoms = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    randoms[i] = Math.random()
  }

  useEffect(() => {
    if (geometryRef.current) {
      const count = geometryRef.current.attributes.position.count
      const randoms = new Float32Array(count)
      for (let i = 0; i < count; i++) {
        randoms[i] = Math.random()
      }
      geometryRef.current.setAttribute(
        "aRandom",
        new THREE.BufferAttribute(randoms, 1)
      )
    }
  }, [geometryRef])

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 32, 32]} ref={geometryRef} />
      <rawShaderMaterial
        vertexShader={testVertextShader}
        fragmentShader={testFragmentShader}
        uniforms={{
          uFrequency: { value: new THREE.Vector2(x, y) },
        }}
        wireframe
        transparent
        ref={materialRef}
      />
    </mesh>
  )
}
