import { ZooError, ERROR_MESSAGES } from '../common/ZooError';

export default class Animal {
  // ID is used with Zoo class, once the animal is added to a zoo instance
  #id = null;
  #sound = '';
  #name = '';

  constructor(sound, name) {
    this.#sound = sound;
    this.#name = name;
    this.#id = null;

    if (this.constructor.name === 'Animal') {
      throw new ZooError(`${ERROR_MESSAGES.INSTANCE_FROM_ABSTRACT} (Animal)`);
    }
  }

  get sound() {
    return this.#sound;
  }

  set sound(s) {
    this.#sound = s;
  }

  get name() {
    return this.#name;
  }

  set name(n) {
    this.#name = n;
  }

  get id() {
    return this.#id;
  }

  set id(i) {
    this.#id = i;
  }

  getPhraseForAnotherAnimal(phrase) {
    return `${phrase} `.split(' ').join(` ${this.#sound} `).trimEnd();
  }

  getPhraseForAHuman(phrase) {
    const words = phrase.split(' ').length;
    return `${this.#sound} `.repeat(words).trimEnd();
  }

  speak(phrase, toHuman = false) {
    console.log(
      toHuman
        ? this.getPhraseForAHuman(phrase)
        : this.getPhraseForAnotherAnimal(phrase)
    );
  }
}
