
export const required = value => value ? true : false;
export const maxLength = max => value =>
  value && value.length > max ? false : true;
export const minLength = min => value =>
  value && value.length < min || value.length == 0 ? false : true
export const maxLength10 = maxLength(10);
export const minLength5 = minLength(5);
export const maxLength55 = maxLength(55);
export const emails = value => 
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 
    false : true;