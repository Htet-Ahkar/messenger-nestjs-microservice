export class BasicUserDTO {
  email: string;
  password: string;
}

export class NewUserDTO extends BasicUserDTO {
  firstName: string;
  lastName: string;
}

export class ExistingUserDTO extends BasicUserDTO {}
