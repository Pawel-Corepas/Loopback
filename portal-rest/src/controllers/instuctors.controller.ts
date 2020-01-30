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
import {Instructors} from '../models';
import {InstructorsRepository} from '../repositories';

export class InstuctorsController {
  constructor(
    @repository(InstructorsRepository)
    public instructorsRepository : InstructorsRepository,
  ) {}

  @post('/instructors', {
    responses: {
      '200': {
        description: 'Instructors model instance',
        content: {'application/json': {schema: getModelSchemaRef(Instructors)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Instructors, {
            title: 'NewInstructors',
            exclude: ['id'],
          }),
        },
      },
    })
    instructors: Omit<Instructors, 'id'>,
  ): Promise<Instructors> {
    return this.instructorsRepository.create(instructors);
  }

  @get('/instructors/count', {
    responses: {
      '200': {
        description: 'Instructors model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Instructors)) where?: Where<Instructors>,
  ): Promise<Count> {
    return this.instructorsRepository.count(where);
  }

  @get('/instructors', {
    responses: {
      '200': {
        description: 'Array of Instructors model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Instructors)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Instructors)) filter?: Filter<Instructors>,
  ): Promise<Instructors[]> {
    return this.instructorsRepository.find(filter);
  }

  @patch('/instructors', {
    responses: {
      '200': {
        description: 'Instructors PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Instructors, {partial: true}),
        },
      },
    })
    instructors: Instructors,
    @param.query.object('where', getWhereSchemaFor(Instructors)) where?: Where<Instructors>,
  ): Promise<Count> {
    return this.instructorsRepository.updateAll(instructors, where);
  }

  @get('/instructors/{id}', {
    responses: {
      '200': {
        description: 'Instructors model instance',
        content: {'application/json': {schema: getModelSchemaRef(Instructors)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Instructors> {
    return this.instructorsRepository.findById(id);
  }

  @patch('/instructors/{id}', {
    responses: {
      '204': {
        description: 'Instructors PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Instructors, {partial: true}),
        },
      },
    })
    instructors: Instructors,
  ): Promise<void> {
    await this.instructorsRepository.updateById(id, instructors);
  }

  @put('/instructors/{id}', {
    responses: {
      '204': {
        description: 'Instructors PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() instructors: Instructors,
  ): Promise<void> {
    await this.instructorsRepository.replaceById(id, instructors);
  }

  @del('/instructors/{id}', {
    responses: {
      '204': {
        description: 'Instructors DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.instructorsRepository.deleteById(id);
  }
}
