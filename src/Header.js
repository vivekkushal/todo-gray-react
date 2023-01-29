function Header(props) {
  const { title } = props;

  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}

// Default props values
Header.defaultProps = {
  title: 'Default List',
};

export default Header;
