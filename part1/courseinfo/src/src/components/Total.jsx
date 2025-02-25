const Total = (params)=>{
  
  return(
    <>
     
      <p>Number of exercises : {params.total[0].exercises + params.total[1].exercises + params.total[2].exercises}</p>

    </>
  )
}

export default Total