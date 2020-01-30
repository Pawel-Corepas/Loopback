import {Model, model, property} from '@loopback/repository';
import { getJsonSchema } from '@loopback/rest';

@model({settings: {strict: false}})
export class Page extends Model {
  @property({
    type: 'number',
    default: 0,
  })
  total?: number;

  @property({
    type: 'number',
    default: 20,
  })
  limit?: number;

  @property({
    type: 'number',
    default: 0,
  })
  offset?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Page>) {
    super(data);
  }
}

export interface PageRelations {
  // describe navigational properties here
}

export type PageWithRelations = Page & PageRelations;
