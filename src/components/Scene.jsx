import React from "react"
import { CameraControls, Environment, Grid, Html } from "@react-three/drei"
import { Model } from "./Model"
import { Smoke } from "./Smoke"
import { RagingSea } from "./RagingSea"
import { Flag } from "./Flag"

export const Scene = () => {
  return (
    <>
      <group name="setup">
        <CameraControls />
        <ambientLight intensity={0.5} />
        {/* <Grid args={[4, 4]} /> */}
        <Environment preset="city" />
      </group>

      <group name="meshes">
        <Smoke />
        <Model />
      </group>

      <group visible={false}>
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
