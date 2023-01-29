import { FaPlus } from 'react-icons/fa';
import { useRef } from 'react';

function AddItem(props) {
  const { newItem, setNewItem, handleSubmit } = props;
  const inputRef = useRef();

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Item</label>
      <input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        type="text"
        id="addItem"
        autoFocus
        ref={inputRef}
        placeholder="Add"
        required
      />
      <button
        type="submit"
        onClick={() => inputRef.current.focus()}
        aria-label="Add Item"
      >
        <FaPlus />
      </button>
    </form>
  );
}

export default AddItem;
