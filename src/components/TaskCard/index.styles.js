export default () => ({
  card: {
    marginRight: 32,
    marginLeft: 32,
    marginBottom: 8,
  },
  iconButton: {
    padding: 0,
    top: 0,
    position: 'absolute',
    transition: 'color 0.3s',
  },
  deleteIconButton: {
    right: 0,
    '&:hover': {
      color: '#f44336',
    },
  },
  editIconButton: {
    right: 24,
    '&:hover': {
      color: '#3e3fa1',
    },
  },
  typography: {
    overflowWrap: 'anywhere',
    marginTop: 2,
  },
});
