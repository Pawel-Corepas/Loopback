import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Categories} from './categories.model';
import {Students} from './students.model';
import {Instructors} from './instructors.model';

@model({settings: {strict: false}})
export class Courses extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
  })
  startDate?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @belongsTo(() => Categories)
  categoriesId: number;

  @hasMany(() => Students)
  students: Students[];

  @hasMany(() => Instructors)
  instructors: Instructors[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Courses>) {
    super(data);
  }
}

export interface CoursesRelations {
  // describe navigational properties here
}

export type CoursesWithRelations = Courses & CoursesRelations;
