export class TeamDTO {
  name: string;
  team_ID: number;

  constructor
  (
    name: string,
    team_id: number
  )
  {
    this.name = name;
    this.team_ID = team_id;
  }
}
