import React from "react"
import { Cube } from "./Cube"
import { CameraControls } from "@react-three/drei"

export const Scene = () => {
  return (
    <>
      <group name="setup">
        <CameraControls />
      </group>

      <group name="meshes">
        <Cube />
      </group>
    </>
  )
}
