import { ApiModule } from '@book/api/ApiModule';
import { Module } from '@nestjs/common';

@Module({
  imports: [ApiModule],
  exports: [ApiModule],
})
export class BookModule {}
