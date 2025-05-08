export type ApiResponse<T> = {
  message: string;
  result: T;
};

export type LoginData = {
  user: {
    id: number;
    name: string;
    username: string;
  };
  token: string;
};
