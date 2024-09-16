import { IsMongoId, IsOptional } from "class-validator";

export class IdDto {
  @IsMongoId()
  id: string;

  @IsMongoId()
  @IsOptional()
  taskId?: string;
}