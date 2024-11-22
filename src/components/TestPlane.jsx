import { useEffect, useRef } from "react"
import * as THREE from "three"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useThree, useFrame, extend, useLoader } from "@react-three/fiber"
import { useControls, folder } from "leva"
import testVertextShader from "../shaders/test/vertex.glsl"
import testFragmentShader from "../shaders/test/fragment.glsl"

export const TestPlane = () => {
  const flagTexture = useLoader(TextureLoader, "./textures/euro-flag.png")

  const meshRef = useRef()
  const geometryRef = useRef()
  const materialRef = useRef()

  const { frequencyX, frequencyY } = useControls("uFrequency", {
    frequencyX: {
      value: 10,
      min: 0,
      max: 20,
      step: 1,
    },
    frequencyY: {
      value: 5,
      min: 0,
      max: 20,
      step: 1,
    },
  })

  const { uColor } = useControls("uColor", {
    uColor: {
      value: "#ff0000",
    },
  })

  const uniforms = useRef({
    // uFrequency: new THREE.Uniform(new THREE.Vector2(frequencyX, frequencyY)),
    uFrequency: {
      value: new THREE.Vector2(frequencyX, frequencyY),
    },
    uTime: {
      value: 0,
    },
    // uColor: new THREE.Uniform(new THREE.Color(uColor)),
    uColor: {
      value: new THREE.Color(uColor),
    },
    uTexture: {
      value: flagTexture,
    },
  })

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    // update material
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsedTime
    }
  })

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uFrequency.value.x = frequencyX
      materialRef.current.uniforms.uFrequency.value.y = frequencyY
      meshRef.current.material.uniforms.uColor.value = new THREE.Color(uColor)

      console.log(geometryRef.current)
    }
  }, [frequencyX, frequencyY, uColor])

  return (
    <mesh scale-y={2 / 3} position-y={0.5} ref={meshRef}>
      <planeGeometry args={[1, 1, 32, 32]} ref={geometryRef} />
      <rawShaderMaterial
        vertexShader={testVertextShader}
        fragmentShader={testFragmentShader}
        uniforms={uniforms.current}
        // wireframe
        transparent
        ref={materialRef}
      />
    </mesh>
  )
}
