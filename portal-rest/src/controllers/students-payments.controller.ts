import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
  RestBindings,
} from '@loopback/rest';
import {
  Students,
  Payments,
  FilterRequest,
  ListPaymentsForStudentResponse,
} from '../models';
import { PaymentsRepository, StudentsRepository } from '../repositories';
import { response, Request, Response } from 'express';
import { inject } from '@loopback/core';

export class StudentsPaymentsController {
  constructor(
    @repository(PaymentsRepository) protected paymentsRepository: PaymentsRepository,
    @repository(StudentsRepository) protected studentsRepository: StudentsRepository,
    @inject(RestBindings.Http.REQUEST)
    private req: Request,
    @inject(RestBindings.Http.RESPONSE) protected response: Response,
  ) { }

  @get('/students/{id}/payments', {
    responses: {
      '200': {
        description: 'Array of Payments\'s belonging to Students',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Payments) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Payments>,
  ): Promise<Payments[]> {
    return this.studentsRepository.payments(id).find(filter);
  }

  @post('/students/{id}/payments/list', {

    responses: {
      '200': {
        description: 'Array of Students model instances',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ListPaymentsForStudentResponse),
          },
        },
      }
    }
  })

  async filterStudentPayments(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FilterRequest),
        },
      },
    })
    filterStr: FilterRequest,
    @param.path.number('id') studentId: typeof Students.prototype.id,
  ): Promise<void> {
    console.log('studentId: ' + studentId)
    var count = await this.paymentsRepository.execute('select count(*) as totalPayments from payments where id in (select id from (select id, CONCAT(paidBy,paidTo, description) as strt from  payments) as Payments where strt like ?) and studentsId = ?',
      ['%' + filterStr.queryString + '%', studentId])
    var totalSumOfPayments = await this.paymentsRepository.getSumByStudentId(studentId)
  
    var responseBoy = {
      data: await this.paymentsRepository.execute('select *  from payments where id in (select id from (select id, CONCAT(paidBy,paidTo, description) as strt from  payments) as Payments where strt like ? ) and studentsId = ? order by id desc limit ? offset ? ',
        ['%' + filterStr.queryString + '%', studentId, filterStr.limit, filterStr.offset]),
      page: {
        total: count[0].totalPayments,
        limit: filterStr.limit,
        offset: filterStr.offset
      },
      totalPaid: totalSumOfPayments
    }
    console.log(responseBoy.data)
    console.log(count)
    this.response.send(responseBoy)
  }

  @post('/students/{id}/payments', {
    responses: {
      '200': {
        description: 'Students model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Payments) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Students.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payments, {
            title: 'NewPaymentsInStudents',
            exclude: ['id'],
            optional: ['studentsId']
          }),
        },
      },
    }) payments: Omit<Payments, 'id'>,
  ): Promise<Payments> {
    return this.studentsRepository.payments(id).create(payments);
  }

  @patch('/students/{id}/payments', {
    responses: {
      '200': {
        description: 'Students.Payments PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payments, { partial: true }),
        },
      },
    })
    payments: Partial<Payments>,
    @param.query.object('where', getWhereSchemaFor(Payments)) where?: Where<Payments>,
  ): Promise<Count> {
    return this.studentsRepository.payments(id).patch(payments, where);
  }

  @del('/students/{id}/payments', {
    responses: {
      '200': {
        description: 'Students.Payments DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Payments)) where?: Where<Payments>,
  ): Promise<Count> {
    return this.studentsRepository.payments(id).delete(where);
  }
}
