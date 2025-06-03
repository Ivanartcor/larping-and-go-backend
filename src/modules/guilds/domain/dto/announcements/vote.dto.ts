import { ArrayMinSize } from "class-validator";

export class VoteDto {
  @ArrayMinSize(1) optionIds!: string[];
}