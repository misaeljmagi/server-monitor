/* eslint class-methods-use-this: 0 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHealth(): Record<string, string> {
    return {
      status: 'UP',
    };
  }
}
