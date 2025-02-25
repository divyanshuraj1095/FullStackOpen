const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, addPerson }) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="number">Number:</label>
          <input id="number" name="number" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm