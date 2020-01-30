import {Model, model, property} from '@loopback/repository';
import { Students } from './students.model';
import { Page } from './page.model';

@model({settings: {strict: false}})
export class ListPaymentsForStudentResponse extends Model {
  @property({
    type: 'array',
    itemType: Students
  })
  data: Students[];

  @property({
    required: true,
  })
  page: Page;

  @property({
    type: 'string',
  })
  totalPaid?: string;

  @property({
    type: 'string',
  })
  totalDue?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ListPaymentsForStudentResponse>) {
    super(data);
  }
}

export interface ListPaymentsForStudentResponseRelations {
  // describe navigational properties here
}

export type ListPaymentsForStudentResponseWithRelations = ListPaymentsForStudentResponse & ListPaymentsForStudentResponseRelations;
