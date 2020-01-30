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
} from '@loopback/rest';
import {Lessons} from '../models';
import {LessonsRepository} from '../repositories';

export class LessonsController {
  constructor(
    @repository(LessonsRepository)
    public lessonsRepository : LessonsRepository,
  ) {}

  @post('/lessons', {
    responses: {
      '200': {
        description: 'Lessons model instance',
        content: {'application/json': {schema: getModelSchemaRef(Lessons)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lessons, {
            title: 'NewLessons',
            exclude: ['id'],
          }),
        },
      },
    })
    lessons: Omit<Lessons, 'id'>,
  ): Promise<Lessons> {
    return this.lessonsRepository.create(lessons);
  }

  @get('/lessons/count', {
    responses: {
      '200': {
        description: 'Lessons model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Lessons)) where?: Where<Lessons>,
  ): Promise<Count> {
    return this.lessonsRepository.count(where);
  }

  @get('/lessons', {
    responses: {
      '200': {
        description: 'Array of Lessons model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Lessons)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Lessons)) filter?: Filter<Lessons>,
  ): Promise<Lessons[]> {
    return this.lessonsRepository.find(filter);
  }

  @patch('/lessons', {
    responses: {
      '200': {
        description: 'Lessons PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lessons, {partial: true}),
        },
      },
    })
    lessons: Lessons,
    @param.query.object('where', getWhereSchemaFor(Lessons)) where?: Where<Lessons>,
  ): Promise<Count> {
    return this.lessonsRepository.updateAll(lessons, where);
  }

  @get('/lessons/{id}', {
    responses: {
      '200': {
        description: 'Lessons model instance',
        content: {'application/json': {schema: getModelSchemaRef(Lessons)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Lessons> {
    return this.lessonsRepository.findById(id);
  }

  @patch('/lessons/{id}', {
    responses: {
      '204': {
        description: 'Lessons PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lessons, {partial: true}),
        },
      },
    })
    lessons: Lessons,
  ): Promise<void> {
    await this.lessonsRepository.updateById(id, lessons);
  }

  @put('/lessons/{id}', {
    responses: {
      '204': {
        description: 'Lessons PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() lessons: Lessons,
  ): Promise<void> {
    await this.lessonsRepository.replaceById(id, lessons);
  }

  @del('/lessons/{id}', {
    responses: {
      '204': {
        description: 'Lessons DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.lessonsRepository.deleteById(id);
  }
}
