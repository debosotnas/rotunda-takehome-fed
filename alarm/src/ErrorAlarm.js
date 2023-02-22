/*
Error Alarm Excercise
===== ===== =========

General overview:
  Implement a Class ('Alarm') to keep the last errors and determine if an email should 
  be sent when a new error occurs.
  Each time when Alarm is called, the method will compare the new error against the collection
  of previous errors and determine if an email is needed to be sent.
  This Alarm class can be called at the same time/place where 'logError()'.

Class details and low-level description:
  The entry point of the Alarm class is a static method that expects the 'error' info.
    - notifyError(error: string): void

    As part of the Alarm definition, the value of a 'threshold' per minute should be defined:
    - THRESHOLD: number     = A constant that sets the #error limit at the last minute. 
                              A new email will be sent when the #error reaches this threshold.

  Every time a new error happens, a static method from the Alarm class will be called to look at the following:
    - t_new: number         = Timestamp of the new error
    - t_prevs: number[]     = timestamp of the last errors
    - lastEmailSent: Object = An object that persists info about the last time when an
                              the email was sent (flag, timestamp, etc.).

  Procedure/Steps after Alarm.notifyError is called with an error:
    1- While t_prevs is not empty, t_new and oldest t_prevs (t_prevs[0]) will be compared.
      2- if the comparison is greater than 1 minute:
        3- t_prevs[0] will be removed from the collection.
      4- if the comparison is lower or equal to 1 minute:
        5- t_new will be added to t_prevs
        6- End Repeat
    7- Check the length of the t_prevs collection. 
       If the length of t_prevs is greater or equal to THRESHOLD:
      8- Check lastEmailSent obj. If a new email notification is needed:
        9- send an email notification
        10- leave only the last error on t_prevs (for coming notifications), marking it as 'sent'
        11- update lastEmailSent obj with info about the email sent.

*/

// *************************************************
// General/Pseudo implementation for Alarm (Alarm.js)
// *************************************************

const MINUTE = 1000 * 60;
const THRESHOLD = 10; //this can be hardcoded or loaded from a config file if needed.

export class Alarm {
  static #t_prevs = [];
  static #lastEmailSent = { datetime: null, data: [] };

  static notifyError(error) {
    const t_new = +new Date();
    let added = false;
    while (!added) {
      const first = this.#t_prevs[0];
      if (first) {
        const diff = t_new - first.datetime;
        // [Step 2]
        if (diff > MINUTE) {
          // [Step 3]
          this.#t_prevs.shift();
        } else {
          // [Step 5]
          this.#t_prevs.push({
            datetime: t_new,
            error,
            sent: false,
          });
          added = true;
        }
      } else {
        this.#t_prevs.push({
          datetime: t_new,
          error,
          sent: false,
        });
        added = true;
      }
    }
    //[Step 7]
    if (this.#t_prevs.length >= THRESHOLD) {
      const { datetime: emailDatetime } = this.#lastEmailSent;
      const emailDiff = t_new - emailDatetime;
      // [Step 8]
      if (emailDiff > MINUTE) {
        const arrLastErrors = this.#t_prevs.filter((errObj) => !errObj.sent);
        // [Step 9]
        this.sendEmail({
          datetime: t_new,
          // 'data' is added as a summary of errors
          // (depends it is needed as part of the email notification)
          data: arrLastErrors,
        });
        // after send email leaving in t_prevs only last error
        // to calculate future notification
        // updating it to 'sent'
        // [Step 10]
        const lastErrorSent = this.#t_prevs.at(-1);
        lastErrorSent.sent = true;
        this.#t_prevs = [lastErrorSent];
      }
    }
  }

  static sendEmail(emailInfo) {
    // perform actions to send email
    // ...

    // [Step 11]
    // update lastEmailSent when email is sent
    this.#lastEmailSent = emailInfo;

    // other actions required
    // ...
  }

  // added for testing purposes
  static get lastEmailSent() {
    return this.#lastEmailSent;
  }
  static get t_prevs() {
    return this.#t_prevs;
  }
  static set lastEmailSent(l) {
    this.#lastEmailSent = l;
  }
  static set t_prevs(p) {
    this.#t_prevs = p;
  }
}
