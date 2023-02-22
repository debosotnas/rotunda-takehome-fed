import Animal from "../src/entities/Animal.js";
import Tiger from "../src/entities/Tiger.js";

const TIGER_SOUND = 'grrr';
const TIGER_PHRASES = {
  PHRASE: "Lions suck",
  PHRASE_PRESENTED: "Lions grrr suck grrr",
  PHRASE_TO_HUMAN_PRESENTED: "grrr grrr"
}

describe("Test Tiger class", () => {
  afterEach(() => {    
    jest.clearAllMocks();
  });
  
  // Base testing
  it("Should create a Tiger instance (subclass of Animal)", () => {
    const tiger = new Tiger();
    expect(tiger).toBeInstanceOf(Animal);
  });

  it("Should create a Tiger instance with appropriate sound ('grrr')", () => {
    const tiger = new Tiger();
    expect(tiger.sound).toBe(TIGER_SOUND);
  });

  it("Should create a phrase to talk to another animal", () => {
    const consoleSpy = jest.spyOn(global.console, 'log');

    const tiger = new Tiger();
    tiger.speak(TIGER_PHRASES.PHRASE);
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(TIGER_PHRASES.PHRASE_PRESENTED);
  });

  // Additional testing (related to Zoo/App implementation)
  it("Should create a Tiger instance with a name = 'Tyson' and id = null", () => {
    const tiger = new Tiger('Tyson');
    expect(tiger.name).toBe('Tyson');
    expect(tiger.id).toBeNull();
  });

  it("Should create a phrase to talk to a Human", () => {
    const consoleSpy = jest.spyOn(global.console, 'log');

    const tiger = new Tiger();
    tiger.speak(TIGER_PHRASES.PHRASE, true);
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(TIGER_PHRASES.PHRASE_TO_HUMAN_PRESENTED);
  });

});