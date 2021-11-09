import React, { Fragment } from 'react'
import Index from './index'
const offline = ():React.ReactElement=>{
  
  return (
    <Fragment>
      <h1 className="mx-auto w-75">
        Parece que no tienes conexion a internet, podras navegar pero ten en cuenta que los datos no estaran actualizados
      </h1>
      <Index></Index>
    </Fragment>
  )
}

export default offline

