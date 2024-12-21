export default {
  text: '表格',
  multiple: true,
  stripe: false,
  border: true,
  height: '',
  selection: false,
  vertical: false,
  direction: true,
  showHeader: true,
  headerStyle: {
    backgroundColor: '#268AFF',
    color: '#fff',
    height: '40px',
    textAlign: 'left',
  },
  cellConfig: {
    height: '40px',
    textAlign: 'left',
    tableLayout: 'auto',
    oddRows: {
      backgroundColor: '#E6EEFE',
      color: 'rgba(0,0,0,0.8)',
    },
    evenRows: {
      backgroundColor: '#CFE4FB',
      color: 'rgba(0,0,0,0.8)',
    },
  },

  selectRows: {
    rows: [],
    rowsStyle: {
      backgroundColor: '#E6EEFE',
      color: 'rgba(0,0,0,0.8)',
    },
  },
  selectCols: {
    cols: [],
    colsStyle: {
      backgroundColor: '#E6EEFE',
      color: 'rgba(0,0,0,0.8)',
    },
  },
  style: {
    width: 700,
    height: 240,
    borderColor: '#c1deff',
    visibility: 'inherit',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 73,
    left: 501,
    borderTopWidth: '0',
    borderRightWidth: '0',
    borderBottomWidth: '0',
    borderLeftWidth: '0',
  },
};
