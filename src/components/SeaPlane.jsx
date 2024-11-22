import { useEffect, useRef } from "react"
import * as THREE from "three"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useThree, useFrame, extend, useLoader } from "@react-three/fiber"
import { useControls, folder } from "leva"

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
    uBigWavesSpeed: { value: 0.75 },

    uSmallWavesElevation: { value: 0.15 },
    uSmallWavesFrequency: { value: 3 },
    uSmallWavesSpeed: { value: 0.2 },
    uSmallWavesIterations: { value: 3 },

    uDepthColor: { value: new THREE.Color("#43435c") },
    uSurfaceColor: { value: new THREE.Color("#9babb4") },
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

  const { size, topology, wireframe } = useControls("Geometry", {
    size: {
      value: 4,
      min: 4,
      max: 128,
      step: 1,
    },
    topology: {
      value: 512,
      min: 8,
      max: 512,
      step: 8,
    },
    wireframe: false,
  })
  const { uDepthColor, uSurfaceColor, uColorOffset, uColorMultiplier } = useControls("Color", {
    uDepthColor: {
      label: "Depth",
      value: `#${uniforms.current.uDepthColor.value.getHexString()}`,
    },
    uSurfaceColor: {
      label: "Surface",
      value: `#${uniforms.current.uSurfaceColor.value.getHexString()}`,
    },
    uColorOffset: {
      label: "Offset",
      value: uniforms.current.uColorOffset.value,
      min: 0,
      max: 1,
      step: 0.01,
    },
    uColorMultiplier: {
      label: "Multiplier",
      value: uniforms.current.uColorMultiplier.value,
      min: 0,
      max: 10,
      step: 0.1,
    },
  })
  const { uBigWavesSpeed, uBigWavesElevation, uBigWavesFrequency } = useControls("Big Waves", {
    uBigWavesSpeed: {
      label: "Speed",
      value: uniforms.current.uBigWavesSpeed.value,
      min: 0,
      max: 4,
      step: 0.05,
    },
    uBigWavesElevation: {
      label: "Elevation",
      value: uniforms.current.uBigWavesElevation.value,
      min: -2.5,
      max: 2.5,
      step: 0.01,
    },
    uBigWavesFrequency: {
      label: "Frequency",
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
  })
  const { uSmallWavesSpeed, uSmallWavesElevation, uSmallWavesFrequency, uSmallWavesIterations } =
    useControls("Small Waves", {
      uSmallWavesSpeed: {
        label: "Speed",
        value: uniforms.current.uSmallWavesSpeed.value,
        min: 0,
        max: 4,
        step: 0.05,
      },
      uSmallWavesElevation: {
        label: "Elevation",
        value: uniforms.current.uSmallWavesElevation.value,
        min: 0,
        max: 2.5,
        step: 0.01,
      },
      uSmallWavesFrequency: {
        label: "Frequency",
        value: uniforms.current.uSmallWavesFrequency.value,
        min: 0,
        max: 30,
        step: 1,
      },
      uSmallWavesIterations: {
        label: "Iterations",
        value: uniforms.current.uSmallWavesIterations.value,
        min: 1,
        max: 5,
        step: 1,
      },
    })

  // leva shader
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uDepthColor.value = new THREE.Color(uDepthColor)
      materialRef.current.uniforms.uSurfaceColor.value = new THREE.Color(uSurfaceColor)
      materialRef.current.uniforms.uColorOffset.value = uColorOffset
      materialRef.current.uniforms.uColorMultiplier.value = uColorMultiplier

      materialRef.current.uniforms.uBigWavesElevation.value = uBigWavesElevation
      materialRef.current.uniforms.uBigWavesFrequency.value = uBigWavesFrequency
      materialRef.current.uniforms.uBigWavesSpeed.value = uBigWavesSpeed

      materialRef.current.uniforms.uSmallWavesElevation.value = uSmallWavesElevation
      materialRef.current.uniforms.uSmallWavesFrequency.value = uSmallWavesFrequency
      materialRef.current.uniforms.uSmallWavesSpeed.value = uSmallWavesSpeed
      materialRef.current.uniforms.uSmallWavesIterations.value = uSmallWavesIterations
    }
  }, [
    uDepthColor,
    uSurfaceColor,
    uColorOffset,
    uColorMultiplier,
    uBigWavesElevation,
    uBigWavesFrequency,
    uBigWavesSpeed,
    uSmallWavesElevation,
    uSmallWavesFrequency,
    uSmallWavesSpeed,
    uSmallWavesIterations,
  ])

  return (
    <>
      <mesh ref={meshRef} rotation-x={Math.PI / 2} position-y={0}>
        <planeGeometry args={[size, size, topology, topology]} ref={geometryRef} />
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
