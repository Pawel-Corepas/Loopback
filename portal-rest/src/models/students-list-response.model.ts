import {Model, model, property, hasMany, hasOne} from '@loopback/repository';
import { Students } from './students.model';
import { Page } from './page.model';
import { getJsonSchema } from '@loopback/repository-json-schema/dist/build-schema';
import { getModelSchemaRef} from '@loopback/rest';

@model()
export class StudentsListResponse extends Model {
  @property({
    type: 'array',
    itemType: Students,
    required: true,
  })
  data: Students[];

  @property({
    required: true,
  })
  page: Page  

  
  constructor(data?: Partial<StudentsListResponse>) {
    super(data);
  }
}
export interface StudentsListResponseRelations {
  // describe navigational properties here
}

export type StudentsListResponseWithRelations = StudentsListResponse & StudentsListResponseRelations;

