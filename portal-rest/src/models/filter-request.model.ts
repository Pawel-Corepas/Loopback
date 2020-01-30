import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class FilterRequest extends Model {
  @property({
    type: 'number',
    default: 20,
  })
  limit?: number;

  @property({
    type: 'number',
    default: 1,
  })
  offset?: number;

  @property({
    type: 'string',
  })
  queryString?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<FilterRequest>) {
    super(data);
  }
}

export interface FilterRequestRelations {
  // describe navigational properties here
}

export type FilterRequestWithRelations = FilterRequest & FilterRequestRelations;
