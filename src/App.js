import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMap } from 'react-icons/fa';

const url = 'https://randomuser.me/api/';
function App() {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('random user');

  // fetchrandomAPI
  const fetchrandomAPI = async () => {
    const resp = await fetch(url);
    const data = await resp.json();
    const user = data.results[0];
    const {
      name: { first, last },
      phone,
      email,
      location: {
        city,
        street: { number, name },
      },
      picture: { large: pic },
    } = user;
    const newUser = {
      user: `${first} ${last}`,
      email,
      phone,
      location: `${city}, ${name}, ${number}`,
      pic,
    };
    setPerson(newUser);
    setLoading(false);
    setTitle('name');
    setValue(newUser.user);
  };

  useEffect(() => {
    fetchrandomAPI();
  }, []);

  const handleValue = (e) => {
    if (e.target.classList.contains('btn')) {
      const newUser = e.target.dataset.label;
      setTitle(newUser);
      setValue(person[newUser]);
    }
  };
  return (
    <section className='block'>
      {/* main-text && image*/}
      <div className='main-header'>
        <div className='title'>
          <h3>hello</h3>
          <h2>
            my {title} is {value}
          </h2>
        </div>
        <div className='image-container'>
          <img
            src={
              (person && person.pic) ||
              'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
            }
            alt=''
          />
        </div>
      </div>
      <div className='values-list'>
        <button className='btn' data-label='user' onMouseOver={handleValue}>
          <FaUser />
        </button>
        <button className='btn' data-label='email' onMouseOver={handleValue}>
          <FaEnvelope />
        </button>
        <button className='btn' data-label='phone' onMouseOver={handleValue}>
          <FaPhone />
        </button>
        <button className='btn' data-label='location' onMouseOver={handleValue}>
          <FaMap />
        </button>
      </div>
      <div className='center'>
        <button className='btn btn-user' onClick={fetchrandomAPI}>
          {loading ? 'loading . . .' : 'random user'}
        </button>
      </div>
    </section>
  );
}

export default App;
