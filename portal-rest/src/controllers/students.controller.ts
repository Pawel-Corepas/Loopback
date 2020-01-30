import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  RestBindings,
} from '@loopback/rest';
import { Students, FilterRequest, StudentsListResponse, Page } from '../models';
import { StudentsRepository } from '../repositories';
import { response, Request, Response } from 'express';
import { Http2ServerRequest } from 'http2';
import { TIMEOUT } from 'dns';
import { inject, intercept } from '@loopback/core';


export class StudentsController {

  constructor(
    @repository(StudentsRepository)
    public studentsRepository: StudentsRepository,
    @inject(RestBindings.Http.REQUEST)
    private req: Request,
    @inject(RestBindings.Http.RESPONSE) protected response: Response,

  ) {
  }



  @post('/students', {
    responses: {
      '200': {
        description: 'Students model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Students) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Students, {
            title: 'NewStudents',
            exclude: ['id'],
          }),
        },
      },
    })
    students: Omit<Students, 'id'>,
  ): Promise<Students> {
    var testData = this.studentsRepository.create(students)
    return testData;
  }

  @get('/students/count', {
    responses: {
      '200': {
        description: 'Students model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  async count(

    @param.query.object('where', getWhereSchemaFor(Students)) where?: Where<Students>,
  ): Promise<Count> {
    return this.studentsRepository.count(where);
  }

  @get('/students', {
    responses: {
      '200': {
        description: 'Array of Students model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Students) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Students)) filter?: Filter<Students>,
  ): Promise<Students[]> {
    return this.studentsRepository.find(filter);
  }

  @patch('/students', {
    responses: {
      '200': {
        description: 'Students PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Students, { partial: true }),
        },
      },
    })
    students: Students,
    @param.query.object('where', getWhereSchemaFor(Students)) where?: Where<Students>,
  ): Promise<Count> {
    return this.studentsRepository.updateAll(students, where);
  }

  @get('/students/{id}', {
    responses: {
      '200': {
        description: 'Students model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Students) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Students> {
    return this.studentsRepository.findById(id);
  }

  @patch('/students/{id}', {


    responses: {
      '204': {
        description: 'Students PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,

    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Students, { partial: true }),
        },
      },
    })

    students: Students,

  ): Promise<void> {

    await this.studentsRepository.updateById(id, students);
  }

  @put('/students/{id}', {
    responses: {
      '204': {
        description: 'Students PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() students: Students,
  ): Promise<void> {
    await this.studentsRepository.replaceById(id, students);
  }

  @del('/students/{id}',
    {
      responses: {
        '204': {
          description: 'Students DELETE success',
        },
      },
    })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.studentsRepository.deleteById(id);
  }

  @post('/students/list', {

    responses: {
      '200': {
        description: 'Array of Students model instances',
        content: {
          'application/json': {
            schema: getModelSchemaRef(StudentsListResponse),
          },
        },
      },
    }
  })

  async filterStudents(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FilterRequest, { partial: true }),
        },
      },
    })
    filterStr: FilterRequest,

  ): Promise<void> {
    var count = await this.studentsRepository.execute('select count(*) as totalStudents from students where id in (select id from (select id, CONCAT(name,surname) as strt from  students) as Students where strt like ?)',
      ['%' + filterStr.queryString + '%'])
    var responseBoy = {
      data: await this.studentsRepository.execute('select *  from students where id in (select id from (select id, CONCAT(name,surname) as strt from  students) as Students where strt like ? ) order by id desc limit ? offset ? ',
        ['%' + filterStr.queryString + '%', filterStr.limit, filterStr.offset]),
      page: {
        total: count[0].totalStudents,
        limit: filterStr.limit,
        offset: filterStr.offset
      }
    }
    console.log(count)
    this.response.send(responseBoy)
  }
}


