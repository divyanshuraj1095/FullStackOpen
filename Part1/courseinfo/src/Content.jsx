import Parts from './Parts.jsx'
const Content = (props) =>{
    const parts = props.parts
    // console.log('here1')
    return (
        <div>
          <Parts part ={parts[0]}/>
          <Parts part ={parts[1]}/>
          <Parts part ={parts[2]}/>  
        </div>
    )

}
export default Content