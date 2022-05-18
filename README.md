#### install nestjs globally

> npm i -g @nestjs/cli

---

##### Initialize nest project

> nest new [project name]

---

#### Run lint

> yarn run lint --fix

---

#### Install mongoose

> npm i mongoose @nestjs/mongoose

---

##### Decorators

> @Controller(), @Modules(), @Injectable()

---

##### Use nest cli to create modules, controllers and services

`g` stands for generate

> nest g module car
> nest g controller car
> nest g service car

---

#### Example mock database

> car.mock.ts

```TypeScript
export const CARS = [
  {
    id: 1,
    brand: 'BMW',
    color: 'red',
    model: 'BMW X6',
  },
];
```

---

#### Example service.ts

```TypeScript
import { Injectable, HttpException } from '@nestjs/common';
import { CARS } from './cars.mock';

@Injectable()
export class CarService {
  private cars = CARS;

  public getCars() {
    return this.cars;
  }
  public postCar(car) {
    return this.cars.push(car);
  }
  public getCarById(id: number): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const car = this.cars.find((car) => car.id === carId);
      if (!car) {
        throw new HttpException('Not found', 404);
      }
      return resolve(car);
    });
  }
  public deleteCarById(id: number): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const index = this.cars.findIndex((car) => car.id === carId);
      if (index === -1) {
        throw new HttpException('Not found', 404);
      }
      this.cars.splice(index, 1);
      return resolve(this.cars);
    });
  }

  public putCarById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const index = this.cars.findIndex((car) => car.id === carId);
      if (index === -1) {
        throw new HttpException('Not found', 404);
      }
      this.cars[index][propertyName] = propertyValue;
      return resolve(this.cars[index]);
    });
  }
}

```

---

#### Example car controller

```typescript
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './car.dto';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  public getCars() {
    return this.carService.getCars();
  }

  @Post()
  public postCar(@Body() car: CarDto) {
    return this.carService.postCar(car);
  }

  @Get(':id')
  public async getCarById(@Param('id') id: number) {
    const result = await this.carService.getCarById(id);
    return result;
  }
  @Delete(':id')
  public async deleteCarById(@Param('id') id: number) {
    const result = await this.carService.deleteCarById(id);
    return result;
  }

  @Put(':id')
  public async putCarById(@Param('id') id: number, @Query() query) {
    const propertyName = query.property_name;
    const propertyValue = query.property_value;
    const result = await this.carService.putCarById(
      id,
      propertyName,
      propertyValue,
    );
    return result;
  }
}
```
