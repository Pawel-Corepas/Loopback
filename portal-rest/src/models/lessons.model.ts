import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Lessons extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  startDateTime: string;

  @property({
    type: 'date',
    required: true,
  })
  d: string;

  @property({
    type: 'number',
  })
  duration?: number;

  @property({
    type: 'string',
  })
  description?: string;
  
  @property({
    type: 'number',
  })
  instructorsId?: number;

  @property({
    type: 'number',
  })
  studentsId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Lessons>) {
    super(data);
  }
}

export interface LessonsRelations {
  // describe navigational properties here
}

export type LessonsWithRelations = Lessons & LessonsRelations;
