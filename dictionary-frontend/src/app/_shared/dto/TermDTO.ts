import { TagDTO } from "./TagDTO";
import { TeamDTO } from "./TeamDTO";

export class TermDTO {
  term_ID: number;
  title: string;
  description: string;
  details: string;
  team: TeamDTO;        // Team
  tags: Array<TagDTO>;  // Tags

  constructor(
    name: string,
    description: string,
    details: string,
    term_id: number,
    team: TeamDTO,
    tags: Array<TagDTO>
  )
  {
    this.title = name;
    this.description = description;
    this.details = details;
    this.tags = tags;
    this.team = team;
    this.term_ID = term_id;
  }
}
