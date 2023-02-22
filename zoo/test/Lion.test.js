import Animal from "../src/entities/Animal.js";
import Lion from "../src/entities/Lion.js";

const LION_SOUND = 'roar';
const LION_PHRASES = {
  PHRASE: "I'm a lion",
  PHRASE_PRESENTED: "I'm roar a roar lion roar",
  PHRASE_TO_HUMAN_PRESENTED: "roar roar roar"
}

describe("Test Lion class", () => {

  afterEach(() => {    
    jest.clearAllMocks();
  });

  // Base testing
  it("Should create a Lion instance (subclass of Animal)", () => {
    const lion = new Lion();
    expect(lion).toBeInstanceOf(Animal);
  });

  it("Should create a Lion instance with appropriate sound ('roar')", () => {
    const lion = new Lion();
    expect(lion.sound).toBe(LION_SOUND);
  });

  it("Should create a phrase to talk to another animal", () => {
    const consoleSpy = jest.spyOn(global.console, 'log');

    const lion = new Lion();
    lion.speak(LION_PHRASES.PHRASE);
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(LION_PHRASES.PHRASE_PRESENTED);
  });

  // Additional testing (related to Zoo/App implementation)
  it("Should create a Lion instance with a name = 'Leo' and id = null", () => {
    const lion = new Lion('Leo');
    expect(lion.name).toBe('Leo');
    expect(lion.id).toBeNull();
  });

  it("Should create a phrase to talk to a Human", () => {
    const consoleSpy = jest.spyOn(global.console, 'log');

    const lion = new Lion();
    lion.speak(LION_PHRASES.PHRASE, true);
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(LION_PHRASES.PHRASE_TO_HUMAN_PRESENTED);
  });

});