import { Inject, Injectable } from '@nestjs/common';
import { POSTS_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, map, takeLast } from 'rxjs';

@Injectable()
export class AppService {
  constructor() {}
}
