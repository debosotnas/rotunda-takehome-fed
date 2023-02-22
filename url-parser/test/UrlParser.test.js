import URLParser from '../src/UrlParser';
import { UrlParserError, ERROR_MESSAGES } from '../src/UrlParserError';

const URL_FORMAT_STRING_A = '/:version/api/:collection/:id';
const URL_STRING_A_1 = '/6/api/listings/3?sort=desc&limit=10';
const URL_STRING_A_2 = '/6/api/listings/3';
const URL_STRING_A_BAD_1 = '/6/api/listings/';
const URL_STRING_A_BAD_2 = '/api/listings/';
const URL_STRING_OBJECT_A = {
  version: 6,
  collection: 'listings',
  id: 3,
  sort: 'desc',
  limit: 10,
};
const URL_STRING_OBJECT_A_2 = {
  version: 6,
  collection: 'listings',
  id: 3,
};

const URL_FORMAT_STRING_B = '/endpoint/:type/:collection/followers/:name';
const URL_STRING_B_OK =
  '/endpoint/clients/folders/followers/leo?sort=desc&limit=5&page=4&time=1435245&env=dev';
const URL_STRING_OBJECT_B = {
  type: 'clients',
  collection: 'folders',
  name: 'leo',
  sort: 'desc',
  limit: 5,
  page: 4,
  time: 1435245,
  env: 'dev',
};

describe('Test URLParser class', () => {
  it('Should create a new instance of URLParser but throw error (missing string format)', () => {
    const parseTest = () => {
      const urlParser = new URLParser();
      const parsedResult = urlParser.parse(URL_STRING_A_1);
      expect(parsedResult).toMatchObject(URL_STRING_OBJECT_A);
    };
    expect(parseTest).toThrow(UrlParserError);
    expect(parseTest).toThrow(ERROR_MESSAGES.NO_FORMAT_STRING);
  });

  it('Should create a new instance of URLParser and parse after calling defineURLFormat', () => {
    const urlParser = new URLParser();
    urlParser.defineURLFormat(URL_FORMAT_STRING_A);
    const parsedResult = urlParser.parse(URL_STRING_A_1);
    expect(parsedResult).toMatchObject(URL_STRING_OBJECT_A);
  });

  it('Should create a new instance with a formatString in constructor and get a valid hash', () => {
    const urlParser = new URLParser(URL_FORMAT_STRING_A);
    const parsedResult = urlParser.parse(URL_STRING_A_1);
    expect(parsedResult).toMatchObject(URL_STRING_OBJECT_A);
  });

  it('Should return a hash for an url without query params', () => {
    const urlParser = new URLParser(URL_FORMAT_STRING_A);
    const parsedResult = urlParser.parse(URL_STRING_A_2);
    expect(parsedResult).toMatchObject(URL_STRING_OBJECT_A_2);
  });

  it('Should throw an UrlParserError for invalid url during parse', () => {
    const parseTest = () => {
      const urlParser = new URLParser(URL_FORMAT_STRING_A);
      const parsedResult = urlParser.parse(URL_STRING_A_BAD_1);
      expect(parsedResult).toMatchObject(URL_STRING_OBJECT_A_2);
    };
    const parseTest2 = () => {
      const urlParser = new URLParser(URL_FORMAT_STRING_A);
      const parsedResult = urlParser.parse(URL_STRING_A_BAD_2);
      expect(parsedResult).toMatchObject(URL_STRING_OBJECT_A_2);
    };

    expect(parseTest).toThrow(UrlParserError);
    expect(parseTest).toThrow(ERROR_MESSAGES.BAD_URL_TO_PARSE);
    expect(parseTest2).toThrow(UrlParserError);
    expect(parseTest2).toThrow(ERROR_MESSAGES.BAD_URL_TO_PARSE);
  });

  it('Should create and parse appropiate url with query params', () => {
    const urlParser = new URLParser(URL_FORMAT_STRING_B);

    const parseTest = () => {
      const parsedResultInternal = urlParser.parse(URL_STRING_A_1);
      expect(parsedResultInternal).toMatchObject(URL_STRING_OBJECT_A);
    };

    expect(parseTest).toThrow(UrlParserError);
    expect(parseTest).toThrow(ERROR_MESSAGES.BAD_URL_TO_PARSE);

    const parseTest2nd = () => {
      const badParsing = urlParser.parse('');
    };

    expect(parseTest2nd).toThrow(UrlParserError);
    expect(parseTest2nd).toThrow(ERROR_MESSAGES.BAD_URL_TO_PARSE);

    const parsedResult = urlParser.parse(URL_STRING_B_OK);
    expect(parsedResult).toMatchObject(URL_STRING_OBJECT_B);

    urlParser.defineURLFormat(URL_FORMAT_STRING_A);
    parseTest();
  });
});
