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
  Students,
  Lessons,
} from '../models';
import {StudentsRepository} from '../repositories';

export class StudentsLessonsController {
  constructor(
    @repository(StudentsRepository) protected studentsRepository: StudentsRepository,
  ) { }

  @get('/students/{id}/lessons', {
    responses: {
      '200': {
        description: 'Array of Lessons\'s belonging to Students',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Lessons)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Lessons>,
  ): Promise<Lessons[]> {
    return this.studentsRepository.lessons(id).find(filter);
  }

  @post('/students/{id}/lessons', {
    responses: {
      '200': {
        description: 'Students model instance',
        content: {'application/json': {schema: getModelSchemaRef(Lessons)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Students.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lessons, {
            title: 'NewLessonsInStudents',
            exclude: ['id'],
            optional: ['studentsId']
          }),
        },
      },
    }) lessons: Omit<Lessons, 'id'>,
  ): Promise<Lessons> {
    return this.studentsRepository.lessons(id).create(lessons);
  }

  @patch('/students/{id}/lessons', {
    responses: {
      '200': {
        description: 'Students.Lessons PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lessons, {partial: true}),
        },
      },
    })
    lessons: Partial<Lessons>,
    @param.query.object('where', getWhereSchemaFor(Lessons)) where?: Where<Lessons>,
  ): Promise<Count> {
    return this.studentsRepository.lessons(id).patch(lessons, where);
  }

  @del('/students/{id}/lessons', {
    responses: {
      '200': {
        description: 'Students.Lessons DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Lessons)) where?: Where<Lessons>,
  ): Promise<Count> {
    return this.studentsRepository.lessons(id).delete(where);
  }
}
