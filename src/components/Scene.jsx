import React from "react"
import { SeaPlane } from "./SeaPlane"
import { CameraControls, Grid, Html } from "@react-three/drei"

export const Scene = () => {
  return (
    <>
      <group name="setup">
        <CameraControls />

        {/* <Grid args={[4, 4]} /> */}
      </group>

      <group name="meshes">
        <SeaPlane />
      </group>

      <group visible={true}>
        <Html
          position={[2.5, -0.1, 0]}
          style={{
            color: "red",
          }}
        >
          X
        </Html>
        <Html
          position={[0.1, 2.5, 0]}
          style={{
            color: "green",
          }}
        >
          Y
        </Html>
        <Html
          position={[0.1, 0, 2.5]}
          style={{
            color: "blue",
          }}
        >
          Z
        </Html>
        <axesHelper args={[10]} />
      </group>
    </>
  )
}
