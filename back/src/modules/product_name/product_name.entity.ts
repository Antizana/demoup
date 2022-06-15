import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { Column } from 'typeorm/decorator/columns/Column';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';
import { status } from '../../shared/entity_status.enum';
import { product_i18n } from '../product_i18n/product_i18n.entity';

@Entity('product_name')
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  product_name_id: number;

  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  product_name: number;

  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  surname: string;

  @Column({ type: 'varchar', default: status.ACTIVE, length: 8 })
  status: string;

  @OneToMany(() => Account, (account) => account.customer)
  accounts: Account[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
