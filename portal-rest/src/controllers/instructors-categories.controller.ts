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
  Categories,
} from '../models';
import {InstructorsRepository} from '../repositories';

export class InstructorsCategoriesController {
  constructor(
    @repository(InstructorsRepository) protected instructorsRepository: InstructorsRepository,
  ) { }

  @get('/instructors/{id}/categories', {
    responses: {
      '200': {
        description: 'Array of Categories\'s belonging to Instructors',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categories)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Categories>,
  ): Promise<Categories[]> {
    return this.instructorsRepository.categories(id).find(filter);
  }

  @post('/instructors/{id}/categories', {
    responses: {
      '200': {
        description: 'Instructors model instance',
        content: {'application/json': {schema: getModelSchemaRef(Categories)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Instructors.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {
            title: 'NewCategoriesInInstructors',
            exclude: ['id'],
            optional: ['instructorsId']
          }),
        },
      },
    }) categories: Omit<Categories, 'id'>,
  ): Promise<Categories> {
    return this.instructorsRepository.categories(id).create(categories);
  }

  @patch('/instructors/{id}/categories', {
    responses: {
      '200': {
        description: 'Instructors.Categories PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {partial: true}),
        },
      },
    })
    categories: Partial<Categories>,
    @param.query.object('where', getWhereSchemaFor(Categories)) where?: Where<Categories>,
  ): Promise<Count> {
    return this.instructorsRepository.categories(id).patch(categories, where);
  }

  @del('/instructors/{id}/categories', {
    responses: {
      '200': {
        description: 'Instructors.Categories DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Categories)) where?: Where<Categories>,
  ): Promise<Count> {
    return this.instructorsRepository.categories(id).delete(where);
  }
}
