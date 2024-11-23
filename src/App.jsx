import { Canvas } from "@react-three/fiber"
import "./styles/App.css"

import { Scene } from "./components/Scene"

function App() {
  return (
    <>
      <Canvas
        camera={{
          position: [5, 5, 5],
          fov: 40,
          near: 0.1,
          far: 1000,
        }}
      >
        <Scene />
      </Canvas>
    </>
  )
}

export default App
