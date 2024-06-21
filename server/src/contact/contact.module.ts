import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
