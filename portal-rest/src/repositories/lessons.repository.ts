import {DefaultCrudRepository} from '@loopback/repository';
import {Lessons, LessonsRelations} from '../models';
import {PortalDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LessonsRepository extends DefaultCrudRepository<
  Lessons,
  typeof Lessons.prototype.id,
  LessonsRelations
> {
  constructor(
    @inject('datasources.portalDB') dataSource: PortalDbDataSource,
  ) {
    super(Lessons, dataSource);
  }
}
