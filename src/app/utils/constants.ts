import dotenv from 'dotenv';
import { resolve } from 'path';
import database from '../../database/breaking-bad-api.json';

const environmment = process.env.ENVIRONMENT ?? 'local';

if (environmment) {
  const path = resolve(__dirname, `../../../environments/.env.${environmment}`);
  dotenv.config({ path });
} else {
  dotenv.config();
}

export const DATABASE = database;
export const BASE_PATH = '/'
export const PAGINATION = Object.freeze({
  MAX_LIMIT_SIZE : 20,
  MIN_PAGE_SIZE : 0,
  MIN_START_PAGE : 1,
  DEFAULT_SORT: 'DESC',
})
