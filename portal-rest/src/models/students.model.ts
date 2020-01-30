import {Entity, model, property, hasMany} from '@loopback/repository';
import {Lessons} from './lessons.model';
import {Payments} from './payments.model';

@model({settings: {strict: false}})
export class Students extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  surname: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  personalIdentificationNumber?: string;

  @property({
    type: 'string',
  })
  birthPlace?: string;

  @property({
    type: 'string',
  })
  postalCode?: string;

  @property({
    type: 'string',
  })
  town?: string;

  @property({
    type: 'string',
  })
  street?: string;

  @property({
    type: 'string'
  })
  buildingNumber?: string;

  @property({
    type: 'string',
  })
  flatNumber?: string;

  @property({
    type: 'string',
    required: true,
  })
  mobileNumber?: string;

  @property({
    type: 'string',
    required: true,
  })
  email?: string;


  @property({
    type: 'string',
    default: 'B',
  })
  courseCategory?: string;

  @property({
    type: 'string',
    format: 'date',
  })
  theoryStartDate?: string;

  @property({
    type: 'string',
    format: 'date',
  })
  practiceStartDate?: string;

  @property({
    type: 'string',
    format: 'date',
  })
  internalExamDate?: string;

  @property({
    type: 'boolean',
  })
  placeOfTraining?: boolean;

  @property({
    type: 'boolean',
    default: 0,
  })
  archived?: boolean;

  @property({
    type: 'string',
    default: "Radomsko",
  })
  stateRegulator?: string;

  @property({
    type: 'number',
  })
  instructorsId?: number;

  @hasMany(() => Lessons)
  lessons: Lessons[];

  @hasMany(() => Payments)
  payments: Payments[];

  @property({
    type: 'number',
  })
  coursesId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Students>) {
    super(data);
  }
}

export interface StudentsRelations {
  // describe navigational properties here
}

export type StudentsWithRelations = Students & StudentsRelations;
