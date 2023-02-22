import { UrlParserError, ERROR_MESSAGES } from './UrlParserError';

export default class URLParser {
  #variables = new Map();

  /**
   * Constructor calls internally 'defineURLFormat'. 'defineURLFormat' could be called later if is needed
   * @param {string} formatString A URL pattern used to define the parse format for the instance
   */
  constructor(formatString) {
    if (formatString) {
      this.defineURLFormat(formatString);
    }
  }

  /**
   *
   * @param {string} formatString A URL pattern used to define the parse format for the instance
   * @returns void
   */
  defineURLFormat(formatString) {
    this.#variables = new Map();
    const parts = formatString.split('/').filter(Boolean);
    parts.forEach((value, idx) => {
      if (String(value).startsWith(':')) {
        const varName = String(value).slice(1);
        this.#variables.set(idx, varName);
      }
    });
  }

  /**
   *
   * @param {string} urlToParse A URL used to get a hash with url and query variables
   * @returns Hash/Object with variables (key) and values
   */
  parse(urlToParse) {
    if (this.#variables.size === 0) {
      throw new UrlParserError(ERROR_MESSAGES.NO_FORMAT_STRING);
    }

    const [urlVariables, queryVariables] = urlToParse.split('?');
    const urlValues = this.getURLHashValues(urlVariables);
    const queryValues = this.getQueryHashValues(queryVariables);

    return {
      ...urlValues,
      ...queryValues,
    };
  }

  /**
   *
   * @param {string} urlVariables Url with variables to be parsed
   * @returns
   */
  getURLHashValues(urlVariables) {
    const parts = urlVariables.split('/').filter(Boolean);
    const urlHash = {};
    for (let [key, value] of this.#variables) {
      if (parts[key] === undefined) {
        throw new UrlParserError(ERROR_MESSAGES.BAD_URL_TO_PARSE);
      }
      urlHash[value] = isNaN(parts[key]) ? parts[key] : Number(parts[key]);
    }
    return urlHash;
  }

  /**
   *
   * @param {string} queryVariables Query string from an Url with variables to be parsed
   * @returns
   */
  getQueryHashValues(queryVariables) {
    if (!queryVariables) {
      return {};
    }
    const parts = queryVariables.split('&').filter(Boolean);
    const queryHash = {};
    for (let keyVal of parts) {
      const [key, value] = keyVal.split('=');
      queryHash[key] = isNaN(value) ? value : Number(value);
    }
    return queryHash;
  }
}
