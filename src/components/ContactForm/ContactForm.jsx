import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import s from './ContactForm.module.css';
import { v4 as uuidv4 } from 'uuid';

const ContactForm = ({ addTodo, contacts }) => {
  const [name, setUser] = useState('');
  const [number, setNumder] = useState('');
  const handleSubmit = evt => {
    evt.preventDefault();
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else if (
      contacts.find(
        contact => contact.number.toLowerCase() === number.toLowerCase()
      )
    ) {
      alert(`${number} is already in contacts.`);
    } else {
      addTodo({ id: uuidv4(), name: name, number: number });
      reset();
    }
  };
  const reset = () => {
    setUser('');
    setNumder('');
  };
  const onInput = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setUser(value);
        break;
      case 'number':
        setNumder(value);
        break;
      default:
        break;
    }
  };
  useEffect(() => {}, [contacts]);
  return (
    <section className={s.ContactForm}>
      <form className={s['form']} onSubmit={handleSubmit}>
        <p className={s['text']}>Name</p>
        <input
          className={s['input']}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onInput}
        />
        <p className={s['text']}>Number</p>
        <input
          className={s['input']}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={onInput}
        />
        <button className={s['button']} type="sumdit">
          Add contact
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
