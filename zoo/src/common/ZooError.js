const ERROR_MESSAGES = {
  INSTANCE_FROM_ABSTRACT: 'Error during instantiation of an abstract class'
}

class ZooError extends Error {
  constructor(msg) {
    super(msg);
  }
  showError(e) {
    console.log(`ZooError: ${e}`);
  }
}

export {
  ZooError,
  ERROR_MESSAGES
}