import {DefaultCrudRepository} from '@loopback/repository';
import {Candidates, CandidatesRelations} from '../models';
import {PortalDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CandidatesRepository extends DefaultCrudRepository<
  Candidates,
  typeof Candidates.prototype.id,
  CandidatesRelations
> {
  constructor(
    @inject('datasources.portalDB') dataSource: PortalDbDataSource,
  ) {
    super(Candidates, dataSource);
  }
}
