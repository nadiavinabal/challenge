import { ApiProperty } from '@nestjs/swagger';

export class UpdateFilmsResponseDto {
  @ApiProperty()
  message: string;
}