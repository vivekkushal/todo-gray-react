import ItemList from './ItemList';

function Content(props) {
  const { items, handleCheck, handleDelete } = props;

  return (
    <main>
      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p>Nothing to look here 😎</p>
      )}
    </main>
  );
}

export default Content;
