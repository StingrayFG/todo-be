import { Controller} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('task')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
