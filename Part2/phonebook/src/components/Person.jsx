import React from 'react';

const Person = ({ person, clickHandler }) => {
  return (
    <div>
      {person.name} — {person.number}
      <button onClick={() => clickHandler(person.id)}>Delete</button>
    </div>
  );
};

export default Person;
