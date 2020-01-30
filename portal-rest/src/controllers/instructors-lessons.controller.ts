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
  Lessons,
} from '../models';
import {InstructorsRepository} from '../repositories';

export class InstructorsLessonsController {
  constructor(
    @repository(InstructorsRepository) protected instructorsRepository: InstructorsRepository,
  ) { }

  @get('/instructors/{id}/lessons', {
    responses: {
      '200': {
        description: 'Array of Lessons\'s belonging to Instructors',
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
    return this.instructorsRepository.lessons(id).find(filter);
  }

  @post('/instructors/{id}/lessons', {
    responses: {
      '200': {
        description: 'Instructors model instance',
        content: {'application/json': {schema: getModelSchemaRef(Lessons)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Instructors.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lessons, {
            title: 'NewLessonsInInstructors',
            exclude: ['id'],
            optional: ['instructorsId']
          }),
        },
      },
    }) lessons: Omit<Lessons, 'id'>,
  ): Promise<Lessons> {
    return this.instructorsRepository.lessons(id).create(lessons);
  }

  @patch('/instructors/{id}/lessons', {
    responses: {
      '200': {
        description: 'Instructors.Lessons PATCH success count',
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
    return this.instructorsRepository.lessons(id).patch(lessons, where);
  }

  @del('/instructors/{id}/lessons', {
    responses: {
      '200': {
        description: 'Instructors.Lessons DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Lessons)) where?: Where<Lessons>,
  ): Promise<Count> {
    return this.instructorsRepository.lessons(id).delete(where);
  }
}
