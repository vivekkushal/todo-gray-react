import LineItem from './LineItem';

function ItemList(props) {
  const { items, handleCheck, handleDelete } = props;

  return (
    <ul>
      {items.map((item) => (
        <LineItem
          key={item.id}
          item={item}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ItemList;
