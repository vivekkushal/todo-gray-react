function Footer(props) {
  const { length } = props;
  let today = new Date();
  return (
    <footer>
      <footer>
        {length} List {length === 1 ? 'item' : 'items'}
      </footer>
      <footer>
        {'<>'} with ❤️ by Vivek. Copyright &copy; {today.getFullYear()}
      </footer>
    </footer>
  );
}

export default Footer;
