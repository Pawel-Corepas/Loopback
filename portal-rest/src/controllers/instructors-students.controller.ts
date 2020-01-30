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
} from '@loopback/rest';
import {
  Instructors,
  Students,
} from '../models';
import {InstructorsRepository} from '../repositories';

export class InstructorsStudentsController {
  constructor(
    @repository(InstructorsRepository) protected instructorsRepository: InstructorsRepository,
  ) { }

  @get('/instructors/{id}/students', {
    responses: {
      '200': {
        description: 'Array of Students\'s belonging to Instructors',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Students)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Students>,
  ): Promise<Students[]> {
    return this.instructorsRepository.students(id).find(filter);
  }

  @post('/instructors/{id}/students', {
    responses: {
      '200': {
        description: 'Instructors model instance',
        content: {'application/json': {schema: getModelSchemaRef(Students)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Instructors.prototype.id,

    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Students, {
            title: 'NewStudentsInInstructors',
            exclude: ['id'],
            optional: ['instructorsId']
          }),
        },
      },
    }) students: Omit<Students, 'id'>,
  ): Promise<Students> {
    return this.instructorsRepository.students(id).create(students);
  }


  @patch('/instructors/{id}/students', {
    responses: {
      '200': {
        description: 'Instructors.Students PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Students, {partial: true}),
        },
      },
    })
    students: Partial<Students>,
    @param.query.object('where', getWhereSchemaFor(Students)) where?: Where<Students>,
  ): Promise<Count> {
    return this.instructorsRepository.students(id).patch(students, where);
  }

  @del('/instructors/{id}/students', {
    responses: {
      '200': {
        description: 'Instructors.Students DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Students)) where?: Where<Students>,
  ): Promise<Count> {
    return this.instructorsRepository.students(id).delete(where);
  }
}
