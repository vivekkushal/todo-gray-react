import { useState, useEffect } from 'react';
import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('shoppinglist')) || []
  ); // If we ran the application first time we need an empty shopping list array otherwise we get won't have an array and we can't 'filter' a 'null' that's why we need ' || []'
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // If we want to save the state locally using localStorage but only when 'items' change
    localStorage.setItem('shoppinglist', JSON.stringify(items));
  }, [items]);

  function addItem(item) {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };
    const itemsArray = [...items, addNewItem];
    setItems(itemsArray);
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
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )} // Super important search functionality
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
