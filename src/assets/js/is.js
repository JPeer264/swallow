const isEs6 = () => true;

const isArray = value => Object.prototype.toString.call(value) === '[object Array]';

export { isEs6, isArray };
