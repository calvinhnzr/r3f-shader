import { useEffect, useRef } from "react"
import * as THREE from "three"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useThree, useFrame, extend, useLoader } from "@react-three/fiber"
import { useControls } from "leva"

import vertexShader from "../shaders/water/vertex.glsl"
import fragmentShader from "../shaders/water/fragment.glsl"

export const SeaPlane = () => {
  const meshRef = useRef()
  const geometryRef = useRef()
  const materialRef = useRef()

  const uniforms = useRef({
    uTime: { value: 0 },
    uBigWavesElevation: { value: 0.2 },
    uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
    uWaveSpeed: { value: 0.75 },
    uDepthColor: { value: new THREE.Color("#186691") },
    uSurfaceColor: { value: new THREE.Color("#5387a4") },
    uColorOffset: { value: 0.25 },
    uColorMultiplier: { value: 2 },
  })

  // uTime
  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    // update material
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsedTime
    }
  })

  //  leva
  const {
    size,
    wireframe,
    uBigWavesElevation,
    uBigWavesFrequency,
    uWaveSpeed,
    uDepthColor,
    uSurfaceColor,
    uColorOffset,
    uColorMultiplier,
  } = useControls({
    size: {
      value: 16,
      min: 8,
      max: 128,
      step: 8,
    },
    wireframe: true,
    uBigWavesElevation: {
      value: uniforms.current.uBigWavesElevation.value,
      min: -2.5,
      max: 2.5,
      step: 0.01,
    },
    uBigWavesFrequency: {
      value: uniforms.current.uBigWavesFrequency.value,
      x: {
        value: uniforms.current.uBigWavesFrequency.value.x,
        min: 0,
        max: 10,
        step: 0.1,
      },
      y: {
        value: uniforms.current.uBigWavesFrequency.value.y,
        min: 0,
        max: 10,
        step: 0.1,
      },
    },
    uWaveSpeed: {
      value: uniforms.current.uWaveSpeed.value,
      min: 0,
      max: 4,
      step: 0.05,
    },
    uDepthColor: {
      value: `#${uniforms.current.uDepthColor.value.getHexString()}`,
    },
    uSurfaceColor: {
      value: `#${uniforms.current.uSurfaceColor.value.getHexString()}`,
    },
    uColorOffset: {
      value: uniforms.current.uColorOffset.value,
      min: 0,
      max: 1,
      step: 0.01,
    },
    uColorMultiplier: {
      value: uniforms.current.uColorMultiplier.value,
      min: 0,
      max: 10,
      step: 0.1,
    },
  })

  // leva shader
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uBigWavesElevation.value = uBigWavesElevation
      materialRef.current.uniforms.uBigWavesFrequency.value = uBigWavesFrequency
      materialRef.current.uniforms.uWaveSpeed.value = uWaveSpeed

      materialRef.current.uniforms.uDepthColor.value = new THREE.Color(
        uDepthColor
      )
      materialRef.current.uniforms.uSurfaceColor.value = new THREE.Color(
        uSurfaceColor
      )
    }
    materialRef.current.uniforms.uColorOffset.value = uColorOffset
    materialRef.current.uniforms.uColorMultiplier.value = uColorMultiplier
  }, [
    uBigWavesElevation,
    uBigWavesFrequency,
    uWaveSpeed,
    uDepthColor,
    uSurfaceColor,
    uColorOffset,
    uColorMultiplier,
  ])

  return (
    <>
      <mesh ref={meshRef} rotation-x={Math.PI / 2} position-y={0}>
        <planeGeometry args={[4, 4, size, size]} ref={geometryRef} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms.current}
          wireframe={wireframe}
          transparent={false}
          side={THREE.DoubleSide}
          ref={materialRef}
        />
      </mesh>
    </>
  )
}
