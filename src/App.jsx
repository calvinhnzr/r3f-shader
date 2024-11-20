import { Canvas } from "@react-three/fiber"
import "./styles/App.css"

import { Scene } from "./components/Scene"

function App() {
  return (
    <>
      <Canvas>
        <Scene />
      </Canvas>
    </>
  )
}

export default App
