import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { Column } from 'typeorm/decorator/columns/Column';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';
import { Transaction } from '../product_number/transaction.entity';
import { Customer } from '../product_name/product_name.entity';

@Entity('product_i18n')
export class product_i18n extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  product_i18n_id: number;

  @Column({ type: 'numeric' })
  product_id: number;

  @Column({ type: 'numeric'})
  string: number;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @ManyToOne(() => Customer, (customer) => customer.accounts, {
    eager: true,
    nullable: false,
    onDelete: 'RESTRICT',
  })
  customer: Customer;

}
