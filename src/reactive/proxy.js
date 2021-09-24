const person = {
  name: 'viking'
}
console.log(Reflect.get(person, 'name'));
const handler = {
  get(target, prop, value, receiver) {
    console.log('trigger get');
    // return target[prop]
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    console.log('trigger set');
    // target[prop] = value
    // return true
    return Reflect.set(...arguments);
  }
}
const proxy = new Proxy(person, handler);
proxy.name = 'lucy'
console.log('proxy.name :>> ', proxy.name);
console.log('person.name :>> ', person.name);