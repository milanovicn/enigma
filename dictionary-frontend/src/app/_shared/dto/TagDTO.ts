export class TagDTO {
  name: string;
  tag_ID: number;

  constructor(
    tag_id: number,
    name: string
  )
  {
    this.name = name;
    this.tag_ID = tag_id;
  }
}
