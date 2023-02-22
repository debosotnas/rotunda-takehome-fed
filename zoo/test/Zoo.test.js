import Lion from "../src/entities/Lion";
import Tiger from "../src/entities/Tiger";
import Zoo from "../src/entities/Zoo";

describe("Test Zoo class", () => {

  it ("Should add and remove Animals", () => {
    const lion = new Lion();
    const tiger = new Tiger();
    const zoo = new Zoo();

    expect(zoo.getAnimalsList().length).toBe(0);
    zoo.addAnimal(lion);
    expect(zoo.getAnimalsList().length).toBe(1);
    zoo.addAnimal(tiger);
    expect(zoo.getAnimalsList().length).toBe(2);

    zoo.removeAnimal(lion);
    expect(zoo.getAnimalsList().length).toBe(1);
    zoo.removeAnimal(tiger);
    expect(zoo.getAnimalsList().length).toBe(0);
  });

  it ("Animals added should have an unique Zoo Id", () => {
    const lion = new Lion();
    const lion2nd = new Lion();
    const tiger = new Tiger();
    const tiger2nd = new Tiger();
    const zoo = new Zoo();

    expect(lion.id).toBeNull();
    zoo.addAnimal(lion);
    expect(lion.id).not.toBeNaN();

    expect(lion2nd.id).toBeNull();
    zoo.addAnimal(lion2nd);
    expect(lion2nd.id).not.toBeNaN();

    expect(tiger2nd.id).toBeNull();
    zoo.addAnimal(tiger2nd);
    expect(tiger2nd.id).not.toBeNaN();

    expect(lion.id !== lion2nd.id).toBe(true);
    expect(tiger.id !== tiger2nd.id).toBe(true);
    expect(lion.id !== tiger.id).toBe(true);
    expect(lion2nd.id !== tiger2nd.id).toBe(true);
  });

  it ("Add, get and remove animal by Id from Zoo", () => {
    const zoo = new Zoo();
    const lion = new Lion();
    expect(lion.id).toBeNull();

    zoo.addAnimal(lion);
    const lionId = lion.id;
    expect(lionId).not.toBeNaN();

    const lionAnimal = zoo.getAnimalById(lionId);
    expect(lionAnimal).not.toBeUndefined();
    expect(lion === lionAnimal).toBe(true);

    for(let [animalId] of zoo.getAnimalsList()) {
      zoo.removeAnimalById(animalId);
    }

    const newAnimal = zoo.getAnimalById(lionId);
    expect(newAnimal).toBeUndefined();
  });

});