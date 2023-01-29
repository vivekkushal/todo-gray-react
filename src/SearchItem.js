function SearchItem(props) {
  const { search, setSearch } = props;

  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">Search</label>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        id="search"
        role="searchbox"
        placeholder="Search"
      />
    </form>
  );
}

export default SearchItem;
