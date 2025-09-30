export type RegisterRequestDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginRequestDTO = {
  email: string;
  password: string;
};
