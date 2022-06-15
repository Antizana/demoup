import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { Column } from 'typeorm/decorator/columns/Column';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';
import { Transaction } from '../product_number/product_number.entity';
import { ProductName } from '../product_name/product_name.entity';

@Entity('product_i18n')
export class Product_i18n extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  product_i18n_id: number;

  @Column({ type: 'numeric' })
  product_id: number;

  @Column({ type: 'numeric'})
  string: number;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @ManyToOne(() => ProductName, (productName) => productName.product_name_id, {
    eager: true,
    nullable: false,
    onDelete: 'RESTRICT',
  })
  productName: ProductName;

}
