import Animal from "./Animal.js";

// custom sound for Lion type/class
const SOUND = 'roar'

export default class Lion extends Animal{

  constructor(name = '') {
    super(SOUND, name);
    this.id = null;
  }

  // add here custom implementation for Lion class
  // ...
  // ...
}