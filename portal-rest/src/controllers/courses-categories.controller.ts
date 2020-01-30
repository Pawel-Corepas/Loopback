import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Courses,
  Categories,
} from '../models';
import {CoursesRepository} from '../repositories';

export class CoursesCategoriesController {
  constructor(
    @repository(CoursesRepository)
    public coursesRepository: CoursesRepository,
  ) { }

  @get('/courses/{id}/categories', {
    responses: {
      '200': {
        description: 'Categories belonging to Courses',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categories)},
          },
        },
      },
    },
  })
  async getCategories(
    @param.path.number('id') id: typeof Courses.prototype.id,
  ): Promise<Categories> {
    return this.coursesRepository.categories(id);
  }
}
