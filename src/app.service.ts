import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { name: any } {
    return { name: 'Hone page...' };
  }
}
