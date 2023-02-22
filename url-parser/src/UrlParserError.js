const ERROR_MESSAGES = {
  NO_FORMAT_STRING:
    "Please define an UrlFormatString first (on constructor or calling 'defineURLFormat')",
  BAD_URL_TO_PARSE: 'Url provided to parse and String Format do not match',
};

class UrlParserError extends Error {
  constructor(msg) {
    super(msg);
  }
}

export { UrlParserError, ERROR_MESSAGES };
