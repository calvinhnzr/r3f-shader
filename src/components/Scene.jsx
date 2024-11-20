import React from "react"
import { TestPlane } from "./TestPlane"
import { Plane } from "./Plane"
import { CameraControls, Grid } from "@react-three/drei"

export const Scene = () => {
  return (
    <>
      <group name="setup">
        <CameraControls />
        {/* <axesHelper args={[10]} /> */}
        <Grid args={[4, 4]} />
      </group>

      <group name="meshes">
        <TestPlane />
        <Plane />
      </group>
    </>
  )
}
