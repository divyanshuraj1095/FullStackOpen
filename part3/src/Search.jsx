const Search = ({searchPerson,handleSearchPerson}) =>{  
    return(<div>
       <div>
         filter by name : <input value= {searchPerson} onChange={handleSearchPerson} />
        
         </div> 
  
    </div>);
  }
  export default Search