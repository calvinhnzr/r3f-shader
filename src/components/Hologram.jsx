import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useThree, useFrame, extend, useLoader } from "@react-three/fiber"
import { useControls, folder } from "leva"

import vertexShader from "../shaders/holographic/vertex.glsl"
import fragmentShader from "../shaders/holographic/fragment.glsl"

export const Hologram = () => {
  const meshRef = useRef()
  const geometryRef = useRef()
  const materialRef = useRef()

  const uniforms = useRef({
    uTime: new THREE.Uniform(0),
    uColor: new THREE.Uniform(new THREE.Color(0xffffff)),
  })

  const {} = useControls({
    uColor: {
      value: `#${uniforms.current.uColor.value.getHexString()}`,
      onChange: (color) => {
        materialRef.current.uniforms.uColor.value = new THREE.Color(color)
      },
    },
  })

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.current.uTime.value = state.clock.getElapsedTime()
    }
  })

  const CustomShaderMaterial = () => {
    return (
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        wireframe={false}
        transparent
        ref={materialRef}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    )
  }

  return (
    <group>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[1, 0]} ref={geometryRef} />
        <CustomShaderMaterial />
      </mesh>
      <mesh ref={meshRef} position-x={-3}>
        <boxGeometry ref={geometryRef} />
        <CustomShaderMaterial />
      </mesh>
      <mesh ref={meshRef} position-x={3}>
        <sphereGeometry ref={geometryRef} />
        <CustomShaderMaterial />
      </mesh>
    </group>
  )
}
