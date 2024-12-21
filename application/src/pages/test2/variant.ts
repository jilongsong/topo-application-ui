export const variants = [
  {
    name: 'soft', // Soft 按钮变体
    states: [
      {
        state: 'default',
        styles: {
          backgroundColor: 'lightgray',
          color: 'black',
          borderRadius: '8px',
          border: 'none',
        },
      },
      {
        state: 'hover',
        styles: {
          backgroundColor: 'gray',
          color: 'white',
        },
      },
      {
        state: 'pressed',
        styles: {
          backgroundColor: 'red',
          color: 'white',
        },
      },
    ],
  },
  {
    name: 'surface', // Surface 按钮变体
    states: [
      {
        state: 'default',
        styles: {
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid #ddd',
          borderRadius: '8px',
        },
      },
      {
        state: 'hover',
        styles: {
          backgroundColor: 'lightgray',
          color: 'black',
        },
      },
    ],
  },
  {
    name: 'outline', // Outline 按钮变体
    states: [
      {
        state: 'default',
        styles: {
          backgroundColor: 'transparent',
          color: 'black',
          border: '1px solid black',
          borderRadius: '8px',
        },
      },
      {
        state: 'hover',
        styles: {
          backgroundColor: 'black',
          color: 'white',
        },
      },
    ],
  },
];
