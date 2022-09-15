import 'module-alias/register';
import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { createAsync } from './inversify.config';

(async () => {
  await createAsync();
})();
