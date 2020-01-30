import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Instructors, InstructorsRelations, Students, Lessons, Categories} from '../models';
import {PortalDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {StudentsRepository} from './students.repository';
import {LessonsRepository} from './lessons.repository';
import {CategoriesRepository} from './categories.repository';

export class InstructorsRepository extends DefaultCrudRepository<
  Instructors,
  typeof Instructors.prototype.id,
  InstructorsRelations
> {

  public readonly students: HasManyRepositoryFactory<Students, typeof Instructors.prototype.id>;

  public readonly lessons: HasManyRepositoryFactory<Lessons, typeof Instructors.prototype.id>;

  public readonly categories: HasManyRepositoryFactory<Categories, typeof Instructors.prototype.id>;

  constructor(
    @inject('datasources.portalDB') dataSource: PortalDbDataSource, @repository.getter('StudentsRepository') protected studentsRepositoryGetter: Getter<StudentsRepository>, @repository.getter('LessonsRepository') protected lessonsRepositoryGetter: Getter<LessonsRepository>, @repository.getter('CategoriesRepository') protected categoriesRepositoryGetter: Getter<CategoriesRepository>,
  ) {
    super(Instructors, dataSource);
    this.categories = this.createHasManyRepositoryFactoryFor('categories', categoriesRepositoryGetter,);
    this.lessons = this.createHasManyRepositoryFactoryFor('lessons', lessonsRepositoryGetter,);
    this.students = this.createHasManyRepositoryFactoryFor('students', studentsRepositoryGetter,);
  }
}
