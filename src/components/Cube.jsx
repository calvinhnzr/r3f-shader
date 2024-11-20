import { useRef } from "react"

const fragmentShader = `...`
const vertexShader = `...`

export const Cube = () => {
  const mesh = useRef()

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial></meshNormalMaterial>
    </mesh>
  )
}
