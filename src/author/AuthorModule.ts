import { ApiModule } from '@author/api/ApiModule';
import { Module } from '@nestjs/common';

@Module({
  imports: [ApiModule],
})
export class AuthorModule {}
