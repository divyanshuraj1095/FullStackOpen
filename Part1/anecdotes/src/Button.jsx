
const Button = ({ onClick, text }) =>{
    return(
        <div>
            <button onClick={onClick}>
    {text}
  </button>
        </div>
    )
}
export default Button
  