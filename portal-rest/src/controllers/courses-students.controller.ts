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
  Students,
} from '../models';
import {CoursesRepository} from '../repositories';

export class CoursesStudentsController {
  constructor(
    @repository(CoursesRepository) protected coursesRepository: CoursesRepository,
  ) { }

  @get('/courses/{id}/students', {
    responses: {
      '200': {
        description: 'Array of Students\'s belonging to Courses',
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
    return this.coursesRepository.students(id).find(filter);
  }

  @post('/courses/{id}/students', {
    responses: {
      '200': {
        description: 'Courses model instance',
        content: {'application/json': {schema: getModelSchemaRef(Students)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Courses.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Students, {
            title: 'NewStudentsInCourses',
            exclude: ['id'],
            optional: ['coursesId']
          }),
        },
      },
    }) students: Omit<Students, 'id'>,
  ): Promise<Students> {
    return this.coursesRepository.students(id).create(students);
  }

  @patch('/courses/{id}/students', {
    responses: {
      '200': {
        description: 'Courses.Students PATCH success count',
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
    return this.coursesRepository.students(id).patch(students, where);
  }

  @del('/courses/{id}/students', {
    responses: {
      '200': {
        description: 'Courses.Students DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Students)) where?: Where<Students>,
  ): Promise<Count> {
    return this.coursesRepository.students(id).delete(where);
  }
}
