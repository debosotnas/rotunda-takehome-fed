import { Alarm } from '../src/ErrorAlarm';

const TEST_ERROR_MESSAGES = {
  MSG_A: 'New error A',
  MSG_B: 'New error B',
  MSG_C: 'New error C',
  MSG_SPECIAL: 'New error Special',
};

const TEST_ARR_ERRORS_10 = [
  TEST_ERROR_MESSAGES.MSG_A,
  TEST_ERROR_MESSAGES.MSG_B,
  TEST_ERROR_MESSAGES.MSG_C,
  TEST_ERROR_MESSAGES.MSG_A,
  TEST_ERROR_MESSAGES.MSG_B,
  TEST_ERROR_MESSAGES.MSG_C,
  TEST_ERROR_MESSAGES.MSG_A,
  TEST_ERROR_MESSAGES.MSG_B,
  TEST_ERROR_MESSAGES.MSG_C,
  TEST_ERROR_MESSAGES.MSG_A,
];

const TEST_OLD_ERROR_DATA = {
  datetime: +new Date('November 14, 1982 00:00:00'),
  error: 'Old error',
  sent: false,
};

const TEST_ARR_ERRORS_11 = [
  ...TEST_ARR_ERRORS_10,
  TEST_ERROR_MESSAGES.MSG_SPECIAL,
];

const TEST_THRESHOLD = 10;

describe('Test Alarm class', () => {
  afterEach(() => {
    Alarm.t_prevs = [];
    Alarm.lastEmailSent = { datetime: null, data: [] };
    jest.clearAllMocks();
  });

  it('t_prevs should be empty by default', () => {
    expect(Alarm.t_prevs.length).toBe(0);
  });

  it('lastEmailSent should be not initialized by default', () => {
    expect(Alarm.lastEmailSent.data.length).toBe(0);
    expect(Alarm.lastEmailSent.datetime).toBeNull();
  });

  it('Should add 1 error on t_prevs', () => {
    expect(Alarm.t_prevs.length).toBe(0);
    Alarm.notifyError(TEST_ERROR_MESSAGES.MSG_A);
    expect(Alarm.t_prevs.length).toBe(1);
  });

  it('Should add 3 errors on t_prevs', () => {
    expect(Alarm.t_prevs.length).toBe(0);
    Alarm.notifyError(TEST_ERROR_MESSAGES.MSG_A);
    expect(Alarm.t_prevs.length).toBe(1);
    Alarm.notifyError(TEST_ERROR_MESSAGES.MSG_B);
    expect(Alarm.t_prevs.length).toBe(2);
    Alarm.notifyError(TEST_ERROR_MESSAGES.MSG_C);
    expect(Alarm.t_prevs.length).toBe(3);
  });

  it('Should add 9 errors and without send email notification', () => {
    for (let err of TEST_ARR_ERRORS_10.slice(1)) {
      Alarm.notifyError(err);
    }
    expect(Alarm.t_prevs.length).toBe(9);
    expect(Alarm.lastEmailSent.data.length).toBe(0);
    expect(Alarm.lastEmailSent.datetime).toBeNull();
  });

  it('Should add 10 errors and send 1 email notification', () => {
    const sendEmailSpy = jest.spyOn(Alarm, 'sendEmail');

    for (let err of TEST_ARR_ERRORS_10) {
      Alarm.notifyError(err);
    }

    expect(Alarm.t_prevs.length).toBe(1);
    expect(Alarm.lastEmailSent.data.length).toBe(10);
    expect(Alarm.lastEmailSent.datetime).not.toBeNaN();
    expect(sendEmailSpy).toHaveBeenCalledTimes(1);
  });

  it('Should add 1 error (removing existing old error)', () => {
    Alarm.t_prevs.push(TEST_OLD_ERROR_DATA);
    expect(Alarm.t_prevs.length).toBe(1);
    Alarm.notifyError(TEST_ERROR_MESSAGES.MSG_A);

    expect(Alarm.t_prevs.length).toBe(1);
    expect(Alarm.t_prevs[0].error).toBe(TEST_ERROR_MESSAGES.MSG_A);
  });

  it('Should add 1 error (removing existing 9 old errors)', () => {
    const sendEmailSpy = jest.spyOn(Alarm, 'sendEmail');
    const newPrevs = new Array(9);
    newPrevs.fill(TEST_OLD_ERROR_DATA);
    Alarm.t_prevs = newPrevs.fill(TEST_OLD_ERROR_DATA);
    expect(Alarm.t_prevs.length).toBe(9);
    Alarm.notifyError(TEST_ERROR_MESSAGES.MSG_A);
    expect(Alarm.t_prevs.length).toBe(1);
    expect(Alarm.t_prevs[0].error).toBe(TEST_ERROR_MESSAGES.MSG_A);
    expect(sendEmailSpy).not.toHaveBeenCalled();
  });

  it('Should add 9 errors (removing existing old error) without send notification', () => {
    const sendEmailSpy = jest.spyOn(Alarm, 'sendEmail');
    Alarm.t_prevs.push(TEST_OLD_ERROR_DATA);
    expect(Alarm.t_prevs.length).toBe(1);

    for (let err of TEST_ARR_ERRORS_10.slice(1)) {
      Alarm.notifyError(err);
    }

    expect(Alarm.t_prevs.length).toBe(9);
    expect(sendEmailSpy).not.toHaveBeenCalled();
    expect(Alarm.lastEmailSent.data.length).toBe(0);
    expect(Alarm.lastEmailSent.datetime).toBeNull();
  });

  it('Should call 11 times, add 10 errors and send 1 notification', () => {
    const sendEmailSpy = jest.spyOn(Alarm, 'sendEmail');
    expect(Alarm.t_prevs.length).toBe(0);

    const arrTestErrors = [...TEST_ARR_ERRORS_11];
    for (let i = 0; i < arrTestErrors.length; i++) {
      Alarm.notifyError(arrTestErrors[i]);
    }
    const errorsNotSent = Alarm.t_prevs.filter((e) => !e.sent);
    expect(errorsNotSent.length).toBe(1);
    expect(errorsNotSent[0].error).toBe(TEST_ERROR_MESSAGES.MSG_SPECIAL);
    expect(sendEmailSpy).toHaveBeenCalledTimes(1);
    expect(Alarm.lastEmailSent.data.length).toBe(10);
    expect(Alarm.lastEmailSent.datetime).not.toBeNaN();
  });

  it('Should call 20 times, add 10 errors and send 1 notification', () => {
    const sendEmailSpy = jest.spyOn(Alarm, 'sendEmail');
    expect(Alarm.t_prevs.length).toBe(0);

    const arrTestErrors = [...TEST_ARR_ERRORS_10, ...TEST_ARR_ERRORS_10];
    for (let i = 0; i < arrTestErrors.length; i++) {
      Alarm.notifyError(arrTestErrors[i]);
    }
    const errorsNotSent = Alarm.t_prevs.filter((e) => !e.sent);
    expect(errorsNotSent.length).toBe(10);
    expect(sendEmailSpy).toHaveBeenCalledTimes(1);
    expect(Alarm.lastEmailSent.data.length).toBe(10);
    expect(Alarm.lastEmailSent.datetime).not.toBeNaN();
  });
});
