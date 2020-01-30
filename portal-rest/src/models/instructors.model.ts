import {Entity, model, property, hasMany} from '@loopback/repository';
import {Students} from './students.model';
import {Lessons} from './lessons.model';
import {Categories} from './categories.model';

@model({settings: {strict: false}})
export class Instructors extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  nick?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  mobileNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  surname: string;

  @property({
    type: 'string',
    required: true,
  })
  instructorIdentifier: string;

  @hasMany(() => Students)
  students: Students[];

  @hasMany(() => Lessons)
  lessons: Lessons[];

  @property({
    type: 'number',
  })
  coursesId?: number;

  @hasMany(() => Categories)
  categories: Categories[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Instructors>) {
    super(data);
  }
}

export interface InstructorsRelations {
  // describe navigational properties here
}

export type InstructorsWithRelations = Instructors & InstructorsRelations;
