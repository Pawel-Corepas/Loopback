import { get, getModelSchemaRef, RestBindings, ResponseObject } from '@loopback/rest';
import { Students } from '../models';
import { repository } from '@loopback/repository';
import { StudentsRepository, PaymentsRepository } from '../repositories';
import { resolve } from 'url';
import { response, Request, Response } from 'express';
import { inject } from '@loopback/core';

const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          greeting: { type: 'string' },
          date: { type: 'string' },
          url: { type: 'string' },
          headers: {
            type: 'object',
            properties: {
              'Content-Type': { type: 'string' },
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};
export class HeartbeatController {
  [x: string]: any;

  constructor(
    @repository(StudentsRepository)
    public studentsRepository: StudentsRepository,
    @repository(PaymentsRepository)
    public paymentsRepository: StudentsRepository,
    @inject(RestBindings.Http.REQUEST)
    private req: Request,
    @inject(RestBindings.Http.RESPONSE) protected response: Response,
  ) {
  }

}