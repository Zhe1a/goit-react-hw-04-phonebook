import { useState, useEffect } from 'react';
import s from './App.module.css';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

const contacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [contactsList, setContactsList] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? contacts
  );
  const [filter, setFilter] = useState('');
  const addTodo = elm => {
    setContactsList(el => [...el, elm]);
  };
  const remove = id => {
    setContactsList(el => el.filter(el => el.id !== id));
  };
  const onFilter = e => {
    const { value } = e.target;
    setFilter(value);
  };
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contactsList));
  }, [contactsList]);
  const contactsUser = () => {
    const normalizedFilter = filter.toLowerCase();
    const contactUser =
      filter === ''
        ? contactsList
        : contactsList.filter(el =>
            el.name.toLowerCase().includes(normalizedFilter)
          );
    return contactUser;
  };

  return (
    <>
      <h1 className={s.titel}>Phonebook</h1>
      <ContactForm addTodo={addTodo} contacts={contactsList} />
      <h2 className={s.titel}>Contacts</h2>
      <Filter filter={onFilter} value={filter} />
      <ContactList contacts={contactsUser()} remove={remove} />
    </>
  );
};

export default App;

