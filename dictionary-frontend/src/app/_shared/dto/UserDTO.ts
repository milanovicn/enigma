import { TeamDTO } from "./TeamDTO";

export class UserDTO {
  user_ID: number;
  eNumber: string;
  email: string;
  name: string;
  surname: string;
  admin: boolean;
  team: TeamDTO;

  constructor(
    user_id: number,
    e_number: string,
    email: string,
    name: string,
    surname: string,
    is_admin: boolean,
    team: TeamDTO
    )
    {
      this.user_ID = user_id;
      this.eNumber = e_number;
      this.email = email;
      this.name = name;
      this.surname = surname;
      this.admin = is_admin;
      this.team = team;
    }
}
