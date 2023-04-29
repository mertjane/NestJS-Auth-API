import { HttpStatus, ValidationPipe } from '@nestjs/common';

const USERNAME_VALIDATION_MESSAGE = {
  EXIST: 'Username already taken',
  SHORT: 'Username is too short, minimum length is 4 character',
  LONG: 'Username is too long, maximum length is 24 character',
  EMPTY: 'Username cannot be empty field',
};

const EMAIL_VALIDATION_MESSAGE = {
  EXIST: 'Email already registered',
  INVALID: 'Please enter a valid email address',
  EMPTY: 'Email cannot be empty field',
};

const PASSWORD_VALIDATION_MESSAGE = {
  NOT_MATCH:
    'Your password should contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character',
  INCORRECT: 'The passwords you entered do not match',
  EMPTY: 'Password cannot be empty field',
  SHORT: 'Password is too short, minimum length is 8 character',
  LONG: 'Password is too long, maximum length is 24 character',
};

const LOGIN_VALIDATION_MESSAGE = 'Wrong username or password';

const VALIDATION_PIPE = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});

const PASSWORD_VALIDATION =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

export const REGEX = {
  PASSWORD_VALIDATION,
  PASSWORD_VALIDATION_MESSAGE,
  USERNAME_VALIDATION_MESSAGE,
  EMAIL_VALIDATION_MESSAGE,
  LOGIN_VALIDATION_MESSAGE,
};

export const SETTINGS = {
  VALIDATION_PIPE,
};
