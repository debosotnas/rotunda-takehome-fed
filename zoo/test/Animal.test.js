import { ERROR_MESSAGES, ZooError } from '../src/common/ZooError';
import Animal from '../src/entities/Animal';

const TEST_PHRASE = "I'm an Animal";

describe('Test Animal class', () => {
  it("Should throw a ZooError on instantiation of 'Animal' class", () => {
    const createInstance = () => {
      const animal = new Animal();
      animal.speak(TEST_PHRASE);
    };

    expect(createInstance).toThrow(ZooError);
    expect(createInstance).toThrow(ERROR_MESSAGES.INSTANCE_FROM_ABSTRACT);
  });

  it("shouldn't call to 'Speak' method from an 'Animal' instance", () => {
    const consoleSpy = jest.spyOn(global.console, 'log');
    try {
      const animal = new Animal();
      animal.speak(TEST_PHRASE);
    } catch (err) {
    } finally {
      expect(consoleSpy).not.toHaveBeenCalled();
    }
  });
});
