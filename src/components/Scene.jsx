import React from "react"
import { PatternPlane } from "./PatternPlane"
import { CameraControls, Grid, Html } from "@react-three/drei"

export const Scene = () => {
  return (
    <>
      <group name="setup">
        <CameraControls />
        <axesHelper args={[10]} />
        <Grid args={[4, 4]} />
      </group>

      <Html
        position={[0.1, 0.75, 0]}
        style={{
          color: "green",
        }}
      >
        Y
      </Html>

      <Html
        position={[0.75, -0.1, 0]}
        style={{
          color: "red",
        }}
      >
        X
      </Html>

      <group name="meshes">
        <PatternPlane />
      </group>
    </>
  )
}
