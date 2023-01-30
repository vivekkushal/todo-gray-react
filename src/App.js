import { useState, useEffect } from 'react';
import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import apiRequest from './apiRequest';

function App() {
  const API_URL = 'http://localhost:8000/items';

  const [items, setItems] = useState([]);
  // If we ran the application first time we need an empty shopping list array otherwise we get won't have an array and we can't 'filter' a 'null' that's why we need ' || []'
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Read
    async function fetchItems() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('No data received');
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        console.log(err.message);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    // Delay simulation
    setTimeout(() => {
      fetchItems();
      // setIsLoading(false);
    }, 2000);

    // If we want to save the state locally using localStorage but only when 'items' change
    // localStorage.setItem('shoppinglist', JSON.stringify(items));
  }, []);

  function addItem(item) {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };
    const itemsArray = [...items, addNewItem];
    setItems(itemsArray);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addNewItem),
    };
  }

  function handleCheck(id) {
    // const itemsArray = items.filter((item) => item.id === id);
    // itemsArray[0].checked = !itemsArray[0].checked;
    // setItems([...items]);

    const itemsArray = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(itemsArray);

    // Old way
    // setItems(itemsArray);
    // If we want to save the state locally using localStorage
    // localStorage.setItem('shoppinglist', JSON.stringify(itemsArray));
  }

  function handleDelete(id) {
    const itemsArray = items.filter((item) => item.id !== id);
    setItems(itemsArray);

    // Old way
    // setItems(itemsArray);
    // If we want to save the state locally using localStorage
    // localStorage.setItem('shoppinglist', JSON.stringify(itemsArray));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newItem) return;
    // Add item
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header title="To-Do List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading Items ✋🏻</p>}
        {fetchError && <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )} // Super important search functionality
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
