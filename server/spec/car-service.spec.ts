// import 'jasmine';
// import { Car } from '../src/car';
// import { CarService } from '../src/cars-service';

// describe("O servico de carros", () => {
//   var carService: CarService;

//   beforeEach(() => carService = new CarService())

//   it("é inicialmente vazio", () => {
//     expect(carService.cars.length).toBe(0);
//   })

//   it("cadastra carros corretamente", () => {
//     const sample = <Car> {
//       name: "Lancer",
//       brand: "Mitsubishi",
//       price: 1,
//       color: "BLACK"
//     }
//     carService.add(sample);

//     expect(carService.cars.length).toBe(1);
//     const result = carService.cars[0];
//     expect(result.id).toBe(0);
//     expect(result.name).toBe(sample.name);
//     expect(result.brand).toBe(sample.brand);
//     expect(result.price).toBe(sample.price);
//     expect(result.color).toBe(sample.color);
//   })
// })