export default () => ({
  card: {
    position: 'fixed',
    bottom: 24,
    marginLeft: 32,
    marginRight: 32,
    width: 'calc(100vw - 64px)',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  gridButton: {
    marginTop: 10,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#00b883',
    color: 'white',
    '&:hover': {
      backgroundColor: '#30c99d',
    },
    '&.Mui-disabled': {
      backgroundColor: '#018761',
      color: 'lightgray',
    },
  },
  formControl: {
    width: '100%',
  },
});
