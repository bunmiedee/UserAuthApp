import 'reflect-metadata';
import { EventEmitter } from 'events';
import { DataSource, ObjectLiteral } from 'typeorm';
import User from '../entities/User';
import dotenv from 'dotenv';

dotenv.config();

class PostgresDataStoreWrapper extends EventEmitter {
  private initialized = false;
  private entityClasses: Function[] = [];
  public readonly source: DataSource;

  constructor() {
    super();
    this.source = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: true,
      logging: false,
    });
  }

  get isInitialized(): boolean {
    return this.initialized;
  }

  registerEntities(entities: Function[]): this {
    if (this.initialized) {
      throw new Error('Cannot register entities after DataSource is initialized');
    }
    this.entityClasses.push(...entities);
    return this;
  }

  async initialize(): Promise<void> {
    this.source.setOptions({ entities: this.entityClasses });
    try {
      await this.source.initialize();
      this.initialized = true;
      this.emit('ready');
      console.log('✔ PostgresDataSource initialized successfully');
    } catch (error) {
      console.error('✖ Failed to initialize Postgres connection:', error);
      throw error;
    }
  }

  getRepository<T extends ObjectLiteral>(entity: new () => T) {
    if (!this.isInitialized) {
      throw new Error('PostgresDataSource is not initialized');
    }
    return this.source.getRepository<T>(entity);
  }

  onReady(callback: () => void): void {
    if (this.initialized) callback();
    else this.once('ready', callback);
  }

  isReady(): boolean {
    return this.initialized;
  }
}

export const PostgresStore = new PostgresDataStoreWrapper();
PostgresStore.registerEntities([User]);
PostgresStore.initialize();