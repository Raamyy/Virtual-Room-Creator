import React, {createRef} from "react";
import {Canvas} from "react-three-fiber";
import { connect } from "react-redux"

import OrbitControl from "../three-fiber/OrbitControl.js";
import Geometry from "../three-fiber/Geometry.js";
import Light from "../three-fiber/Light.js";


function Scene({ meshReducer, lightReducer }) {
    /// Ref to Orbit Control Stoped when Transform Start
    const orbitRef = createRef();
    return (
        <Canvas 
            camera={{
                fov: 80,
                aspect: window.innerWidth / window.innerHeight,
                near: 0.1,
                far: 500,
                position: [0, 10, 15]
            }}
        >

            <OrbitControl ref={orbitRef} />
            <gridHelper args={[50, 50, 0xff1744]} />
            {
                lightReducer.lights.map((light, key) => {
                    return <Light orbit={orbitRef} key={light.id} name={light.id} />
                })
            }
            {
                meshReducer.meshes.map((mesh, key) => {
                    return <Geometry orbit={orbitRef} key={mesh.id} name={mesh.id} />
                })
            } 
        </Canvas>
    );
}

const mapStateToProps = (state) => ({
    meshReducer: state.meshReducer,
    lightReducer: state.lightReducer,
});
const mapDispatchToProps = dispatch => ({
    
});
export default connect(mapStateToProps, mapDispatchToProps)(Scene)
