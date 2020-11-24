const data=require('./iceCream.json');

console.log(Object.keys(data));
console.log(Object.values(data));

Object.values(data).forEach(value=>console.log(Object.keys(value)));