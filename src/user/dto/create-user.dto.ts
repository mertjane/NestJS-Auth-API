import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  Length,
  Matches,
  ValidationArguments,
  MinLength,
  MaxLength,
} from 'class-validator';
import { REGEX } from 'src/utils/auth.utils';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username',
    example: 'jhondoe',
  })
  @IsNotEmpty({ message: REGEX.USERNAME_VALIDATION_MESSAGE.EMPTY })
  @MinLength(4, { message: REGEX.USERNAME_VALIDATION_MESSAGE.SHORT })
  @MaxLength(24, { message: REGEX.USERNAME_VALIDATION_MESSAGE.LONG })
  username: string;

  @ApiProperty({
    description: 'Email',
    example: 'jhondoe@example.com',
  })
  @IsNotEmpty({ message: REGEX.EMAIL_VALIDATION_MESSAGE.EMPTY })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'Example123##',
  })
  @IsNotEmpty({ message: REGEX.PASSWORD_VALIDATION_MESSAGE.EMPTY })
  @Length(8, 24, {
    message: (args: ValidationArguments) => {
      if (args.value.length < 8) {
        return REGEX.PASSWORD_VALIDATION_MESSAGE.SHORT;
      } else if (args.value.length > 24) {
        return REGEX.PASSWORD_VALIDATION_MESSAGE.LONG;
      }
    },
  })
  @Matches(REGEX.PASSWORD_VALIDATION, {
    message: (args: ValidationArguments) => {
      if (args.constraints[0] !== args.value) {
        return REGEX.PASSWORD_VALIDATION_MESSAGE.NOT_MATCH;
      } else {
        return REGEX.PASSWORD_VALIDATION_MESSAGE.INCORRECT;
      }
    },
  })
  password: string;

  @ApiProperty({
    description: 'Confirm Password',
    example: 'Example123##',
  })
  @IsNotEmpty({ message: REGEX.PASSWORD_VALIDATION_MESSAGE.EMPTY })
  @Length(8, 24, {
    message: (args: ValidationArguments) => {
      if (!args.value) {
        return 'Password is required';
      }
      if (args.value.length < 8) {
        return REGEX.PASSWORD_VALIDATION_MESSAGE.SHORT;
      } else if (args.value.length > 24) {
        return REGEX.PASSWORD_VALIDATION_MESSAGE.LONG;
      }
    },
  })
  @Matches(REGEX.PASSWORD_VALIDATION, {
    message: (args: ValidationArguments) => {
      if (args.constraints[0] !== args.value) {
        return REGEX.PASSWORD_VALIDATION_MESSAGE.NOT_MATCH;
      } else {
        return REGEX.PASSWORD_VALIDATION_MESSAGE.INCORRECT;
      }
    },
  })
  confirm: string;
}
