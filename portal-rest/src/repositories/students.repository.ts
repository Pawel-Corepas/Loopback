import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Students, StudentsRelations, Lessons, Payments} from '../models';
import {PortalDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {LessonsRepository} from './lessons.repository';
import {PaymentsRepository} from './payments.repository';

export class StudentsRepository extends DefaultCrudRepository<
  Students,
  typeof Students.prototype.id,
  StudentsRelations
> {

  public readonly lessons: HasManyRepositoryFactory<Lessons, typeof Students.prototype.id>;

  public readonly payments: HasManyRepositoryFactory<Payments, typeof Students.prototype.id>;

  constructor(
    @inject('datasources.portalDB') dataSource: PortalDbDataSource, @repository.getter('LessonsRepository') protected lessonsRepositoryGetter: Getter<LessonsRepository>, @repository.getter('PaymentsRepository') protected paymentsRepositoryGetter: Getter<PaymentsRepository>,
  ) {
    super(Students, dataSource);
    this.payments = this.createHasManyRepositoryFactoryFor('payments', paymentsRepositoryGetter,);
    this.lessons = this.createHasManyRepositoryFactoryFor('lessons', lessonsRepositoryGetter,);
  }
}
