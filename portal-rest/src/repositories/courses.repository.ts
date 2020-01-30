import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Courses, CoursesRelations, Categories, Students, Instructors} from '../models';
import {PortalDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CategoriesRepository} from './categories.repository';
import {StudentsRepository} from './students.repository';
import {InstructorsRepository} from './instructors.repository';

export class CoursesRepository extends DefaultCrudRepository<
  Courses,
  typeof Courses.prototype.id,
  CoursesRelations
> {

  public readonly categories: BelongsToAccessor<Categories, typeof Courses.prototype.id>;

  public readonly students: HasManyRepositoryFactory<Students, typeof Courses.prototype.id>;

  public readonly instructors: HasManyRepositoryFactory<Instructors, typeof Courses.prototype.id>;

  constructor(
    @inject('datasources.portalDB') dataSource: PortalDbDataSource, @repository.getter('CategoriesRepository') protected categoriesRepositoryGetter: Getter<CategoriesRepository>, @repository.getter('StudentsRepository') protected studentsRepositoryGetter: Getter<StudentsRepository>, @repository.getter('InstructorsRepository') protected instructorsRepositoryGetter: Getter<InstructorsRepository>,
  ) {
    super(Courses, dataSource);
    this.instructors = this.createHasManyRepositoryFactoryFor('instructors', instructorsRepositoryGetter,);
    this.students = this.createHasManyRepositoryFactoryFor('students', studentsRepositoryGetter,);
    this.categories = this.createBelongsToAccessorFor('categories', categoriesRepositoryGetter,);
  }
}
