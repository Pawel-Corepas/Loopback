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
  Courses,
  Instructors,
} from '../models';
import {CoursesRepository} from '../repositories';

export class CoursesInstructorsController {
  constructor(
    @repository(CoursesRepository) protected coursesRepository: CoursesRepository,
  ) { }

  @get('/courses/{id}/instructors', {
    responses: {
      '200': {
        description: 'Array of Instructors\'s belonging to Courses',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Instructors)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Instructors>,
  ): Promise<Instructors[]> {
    return this.coursesRepository.instructors(id).find(filter);
  }

  @post('/courses/{id}/instructors', {
    responses: {
      '200': {
        description: 'Courses model instance',
        content: {'application/json': {schema: getModelSchemaRef(Instructors)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Courses.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Instructors, {
            title: 'NewInstructorsInCourses',
            exclude: ['id'],
            optional: ['coursesId']
          }),
        },
      },
    }) instructors: Omit<Instructors, 'id'>,
  ): Promise<Instructors> {
    return this.coursesRepository.instructors(id).create(instructors);
  }

  @patch('/courses/{id}/instructors', {
    responses: {
      '200': {
        description: 'Courses.Instructors PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Instructors, {partial: true}),
        },
      },
    })
    instructors: Partial<Instructors>,
    @param.query.object('where', getWhereSchemaFor(Instructors)) where?: Where<Instructors>,
  ): Promise<Count> {
    return this.coursesRepository.instructors(id).patch(instructors, where);
  }

  @del('/courses/{id}/instructors', {
    responses: {
      '200': {
        description: 'Courses.Instructors DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Instructors)) where?: Where<Instructors>,
  ): Promise<Count> {
    return this.coursesRepository.instructors(id).delete(where);
  }
}
