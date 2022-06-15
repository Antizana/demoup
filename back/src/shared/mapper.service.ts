import { Injectable } from '@nestjs/common';
import { CustomerDto } from '../modules/product_name/dto/customer.dto';
import { Customer } from '../modules/product_name/product_name.entity';
import { TypeMapper } from 'ts-mapper';

@Injectable()
export class MapperService extends TypeMapper {
  constructor() {
    super();
    this.config();
  }

  private config(): void {
    this.createMap<Customer, CustomerDto>()
      .map(
        (entity) => entity.id,
        (dto) => dto.id,
      )
      .map(
        (entity) => entity.name,
        (dto) => dto.name,
      )
      .map(
        (entity) => entity.surname,
        (dto) => dto.surname,
      );
  }
}
