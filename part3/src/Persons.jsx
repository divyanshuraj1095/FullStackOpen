const Persons = ({persons,filteredPerson,searchPerson,removePerson})=>{
    const listToShow = searchPerson ? filteredPerson : persons;
    return(
      
        <>
        {listToShow.map((person,index) => (
            <div key={person.id}>
                
                {person.name} {person.number}  <button onClick={()=>removePerson(person.id)}>Delete</button>
                
            </div>
            
          )
             )}
        </>
          
            
           
        
      
    );
  }
  export default Persons