export default {
  layout: 'row',
  gap: 1,
  dataSource: { a: 40, b: 30, c: 20, d: 10 },
  options: [
    { key: 'a', color: 'rgba(38, 138, 255,0.6)', borderColor: 'rgba(38, 138, 255,1)' },
    { key: 'b', color: 'rgba(0, 198, 47,0.6)', borderColor: 'rgba(0, 198, 47,1)' },
    { key: 'c', color: 'rgba(255, 173, 50,0.6)', borderColor: 'rgba(255, 173, 50,1)' },
    { key: 'd', color: 'rgba(255, 50, 50,0.6)', borderColor: 'rgba(255, 50, 50,1)' },
  ],
  borderRadius: '2px',
  borderWidth: 1,
  fontSize: 14,
  color: 'rgba(0, 0, 0, 0.80)',
  style: {
    width: 220,
    height: 30,
    border: 0,
    position: 'absolute',
    top: 73,
    left: 501,
  },
};
