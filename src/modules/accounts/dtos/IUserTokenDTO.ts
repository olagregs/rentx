interface IUserTokenDTO {
  refresh_token: string;
  user_id: string;
  expires_date: Date;
}

export { IUserTokenDTO }