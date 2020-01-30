import {DefaultCrudRepository} from '@loopback/repository';
import {Payments, PaymentsRelations} from '../models';
import {PortalDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PaymentsRepository extends DefaultCrudRepository<
  Payments,
  typeof Payments.prototype.id,
  PaymentsRelations
> {
  constructor(
    @inject('datasources.portalDB') dataSource: PortalDbDataSource,
  ) {
    super(Payments, dataSource);
  }

 async getSumByStudentId(id: number){
    var amount = await this.dataSource.execute('select sum(amount) as sumOfPayments from payments where studentsId = ?',[id])
    if(amount[0].sumOfPayments === null){
      amount[0].sumOfPayments = 0.00;
    }
      return amount[0].sumOfPayments.toFixed(2);
  }
}
