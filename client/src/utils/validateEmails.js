import _ from "lodash";
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
    const invalidEmails = emails
        .split(',')
        .map(email => email.trim())
        .filter(email => email.length && re.test(email) === false) // capture emails that fail regex test and do not have a length. First condition handles trailing commas, as we are splitting by them. will return invalid emails
        _.compact(invalidEmails); // helps remove leading/trailing commas from entries in the middle of the list

        return invalidEmails.length ? `These emails are invalid: ${invalidEmails}` : null;
};  