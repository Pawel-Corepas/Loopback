import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Candidates extends Entity {
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
  surname: string;

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
  birhtPlace?: string;

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
    type: 'string',
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
  mobileNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'date',
  })
  theoryStartDate?: string;

  @property({
    type: 'date',
  })
  practiceStartDate?: string;

  @property({
    type: 'string',
  })
  placeOfTraining?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Candidates>) {
    super(data);
  }
}

export interface CandidatesRelations {
  // describe navigational properties here
}

export type CandidatesWithRelations = Candidates & CandidatesRelations;
