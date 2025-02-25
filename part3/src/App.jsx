import { useEffect, useState } from 'react';
import './App.css';
import Search from './Search.jsx';
import PersonForm from './PersonForm.jsx';
import Persons from './Persons.jsx';
import Notification from './Notification.jsx';
import nameService from './services/name.js';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchPerson, setSearchPerson] = useState('');
  const [filteredPerson, setFilteredPerson] = useState([]);
  const [notification, setNotification] = useState({ message: null, type: '' });

  useEffect(() => {
    nameService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
        setFilteredPerson(initialPersons);
      })
      .catch(error => {
        showNotification('Failed to fetch data from server', 'error');
      });
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification({ message: null, type: '' });
    }, 3000);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already in the phonebook. Do you want to update the number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        nameService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => (p.id === existingPerson.id ? returnedPerson : p)));
            setFilteredPerson(filteredPerson.map(p => (p.id === existingPerson.id ? returnedPerson : p)));
            setNewName('');
            setNewNumber('');
            showNotification(`Updated ${returnedPerson.name}'s number`, 'success');
          })
          .catch(error => {
            showNotification(`Error: ${existingPerson.name} was already removed from the server`, 'error');
            setPersons(persons.filter(p => p.id !== existingPerson.id));
            setFilteredPerson(filteredPerson.filter(p => p.id !== existingPerson.id));
          });
      }
    } else {
      const personObject = { name: newName, number: newNumber };

      nameService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setFilteredPerson(filteredPerson.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          showNotification(`Added ${returnedPerson.name}`, 'success');
        })
        .catch(error => {
          showNotification('Failed to add person', 'error');
        });
    }
  };

  const removePerson = (id) => {
    const personToRemove = persons.find(person => person.id === id);

    if (!personToRemove) {
      alert('Person not found');
      return;
    }

    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      nameService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setFilteredPerson(filteredPerson.filter(person => person.id !== id));
          showNotification(`Deleted ${personToRemove.name}`, 'success');
        })
        .catch(error => {
          showNotification(`Error: ${personToRemove.name} was already removed from the server`, 'error');
          setPersons(persons.filter(p => p.id !== id));
          setFilteredPerson(filteredPerson.filter(p => p.id !== id));
        });
    }
  };

  const handleSearchPerson = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchPerson(event.target.value);
    setFilteredPerson(persons.filter(person => person.name.toLowerCase().includes(query)));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Search searchPerson={searchPerson} handleSearchPerson={handleSearchPerson} />
      <h2>Add a New</h2>
      <PersonForm
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPerson} removePerson={removePerson} />
    </div>
  );
}

export default App;