import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { Column } from 'typeorm/decorator/columns/Column';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';
import { Account } from '../product_i18n/product_i18n.entity';

@Entity('product_number')
export class ProductNumber extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  product_number_id: number;

  @Column({ type: 'varchar', length: 100 })
  product_number: string;

  @Column({ type: 'numeric' })
  product_id: number;

  @ManyToOne(() => Account, (account) => account.transactions, {
    eager: true,
    nullable: false,
    onDelete: 'RESTRICT',
  })
  account: Account;
}
