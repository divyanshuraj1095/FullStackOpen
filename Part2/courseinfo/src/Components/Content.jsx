import Parts from './Parts.jsx'

const Content = ({prts}) => (
  <>
    {prts.map(part => 
      <Parts key={part.id} prt={part} />
      )
    }
  </>
)

export default Content