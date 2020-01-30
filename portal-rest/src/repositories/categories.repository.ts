import {DefaultCrudRepository} from '@loopback/repository';
import {Categories, CategoriesRelations} from '../models';
import {PortalDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CategoriesRepository extends DefaultCrudRepository<
  Categories,
  typeof Categories.prototype.id,
  CategoriesRelations
> {
  constructor(
    @inject('datasources.portalDB') dataSource: PortalDbDataSource,
  ) {
    super(Categories, dataSource);
  }
}
