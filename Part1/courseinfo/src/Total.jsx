const Total = (props) =>{
    const parts = props.parts
    return(<div>

        <p> No of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
                 
   )
}

export default Total