export default class Zoo {
  #zooAnimals;

  constructor () {
    this.#zooAnimals = new Map();
  }

  #getNewIdForAnimal() {
    return this.#zooAnimals.size + 1;
  }

  addAnimal(animal) {
    animal.id = this.#getNewIdForAnimal();
    this.#zooAnimals.set(animal.id, animal);
  }

  removeAnimal(animal) {
    this.removeAnimalById(animal.id);
  }

  removeAnimalById(animalId) {
    this.#zooAnimals.delete(animalId);
  }

  getAnimalById(animalId) {
    return this.#zooAnimals.get(animalId);
  }

  getAnimalsList() {
    return Array.from(this.#zooAnimals);
  }

}