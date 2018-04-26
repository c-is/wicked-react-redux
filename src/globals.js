import moment from 'moment';
import 'moment/locale/en-gb';


const createColour = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

const timeConverter = (time) => {
  moment.locale('en-gb');
  const format = 'DD.MM.YYYY';
  const zero = time ? time.includes('0001-01-01') : '';
  if (zero) { return '-'; }

  return moment(time).format(format);
};

const getItemById = (items, id) => (
  items.find(item => item.id === id)
);

const addSpaceInLetters = (text) => (
  text.replace(/([A-Z])/g, ' $1').trim()
);

export { timeConverter, getItemById, addSpaceInLetters, createColour };