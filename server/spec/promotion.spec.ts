import "jasmine";
import request = require("request-promise");
import { Coupon } from "../src/classes/coupon";

const baseUrl = "http://localhost:3000";

const adminUrl = `${baseUrl}/promotion/admin`;
const restUrl = `${baseUrl}/promotion/restaurants`;
const userId = '11a84677';
const userUrl = `${baseUrl}/user/${userId}`;

describe("O servidor", () => {
	var server: any;

	beforeAll(() => {
		server = require("../server");
	});

	afterAll(() => {
		server.closeServer();
	});

	// -------------------------------------------------------------- TESTES DE ADMIN --------------------------------------------------------------

	it("Exclui uma promoção no admin", () => {

		const couponName = "SEGUNDACOMPRA";

		const options: any = {
			method: "DELETE",
			uri: adminUrl + '/' + couponName,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(201);
		});
	});
	
	it("Tenta excluir uma promoção não existente no admin", () => {

		const couponName = "CUPOMTES";

		const options: any = {
			method: "DELETE",
			uri: adminUrl + '/' + couponName,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).not.toBe(201);
		});
	});

	it("Cadastra uma promoção válida no admin", () => {

		const body = {
			name: "SEGUNDACOMPRA",
			status: "Ativo",
			minValue: 15,
			discount: 0.5,
			product: "Nenhum",
			adm: true
		};

		const options: any = {
			method: "POST",
			uri: adminUrl,
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(201);
		});
	});

	it("Cadastra uma promoção inválida no admin", () => {
		const body = {
			name: "100OFF",
			status: "Ativo",
			minValue: 15,
			discount: 1
		};

		const options: any = {
			method: "POST",
			uri: adminUrl,
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).not.toBe(201);
		});
	});

	
	it("Atualiza uma promoção no admin", () => {

		const couponName = "SEGUNDACOMPRA";

		const body = {
			status: "Ativo",
		};

		const options: any = {
			method: "PUT",
			uri: adminUrl + '/' + couponName,
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(201);
		});
	});

	it("Tenta atualizar uma promoção no admin com dados inválidos", () => {

		const couponName = "SEGUNDACOMPRA";

		const body = {
			discount: 10,
		};

		const options: any = {
			method: "PUT",
			uri: adminUrl + '/' + couponName,
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).not.toBe(201);
		});
	});

	// -------------------------------------------------------------- TESTES DE RESTAURANTE --------------------------------------------------------------

	it("Exclui uma promoção do restaurante Mequi", () => {

		const couponName = "2BIGMEQUIPOR1";

		const options: any = {
			method: "DELETE",
			uri: restUrl +'/Mequi/' + couponName,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(201);
		});
	});
	
	it("Tenta excluir uma promoção não existente no restaurante BK", () => {

		const couponName = "PRIMEIRACOMPRA1";

		const options: any = {
			method: "DELETE",
			uri: restUrl + '/BK/' + couponName,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).not.toBe(201);
		});
	});

	it("Cadastra uma promoção válida no restaurante Mequi", () => {

		const body = {
			name: "2BIGMEQUIPOR1",
			status: "Ativo",
			minValue: 15,
			discount: 0.5,
			product: "Big Méqui",
			adm: false
		};

		const options: any = {
			method: "POST",
			uri: restUrl + '/Mequi',
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(201);
		});
	});

	it("Cadastra uma promoção inválida no restaurante BK", () => {
		// Cadastro de promoção sem produto por restaurante
		const body = {
			name: "20%OFF",
			status: "Inativo",
			minValue: 15,
			discount: 0.2
		};

		const options: any = {
			method: "POST",
			uri: restUrl + "/BK",
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).not.toBe(201);
		});
	});

	
	it("Atualiza uma promoção no restaurante BK", () => {

		const couponName = "60OFFWHOPPER";

		const body = {
			status: "Inativo",
			discount: 0.2
		};

		const options: any = {
			method: "PUT",
			uri: restUrl + '/BK/' + couponName,
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(201);
		});
	});

	it("Tenta atualizar uma promoção no restaurante Mequi com dados inválidos", () => {

		const couponName = "2BIGMEQUIPOR1";

		const body = {
			discount: 0.5,
			name: "20%OFF"
		};

		const options: any = {
			method: "PUT",
			uri: restUrl + '/Mequi/' + couponName,
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).not.toBe(201);
		});
	});

	// -------------------------------------------------------------- TESTES DE USUÁRIO --------------------------------------------------------------

	it(`Lista os pedidos do usuário ${userId}` , () => {

		const options: any = {
			method: "GET",
			uri: userUrl + "/orders",
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(201);
		});
	});

	it(`Finaliza um pedido do usuário ${userId}`, () => {

		const body = {
			products: [
				{
					name: "Big Méqui",
					price: 15,
					quantity: 2
				},
				{
					name: "Cheddar Méquimelt",
					price: 12,
					quantity: 1
				}
			],
			amount: 42,
			restaurant: "Mequi",
			address: "Avenida Tales de Mileto, 13, Barro",
			// podia ter coupon tb
		};

		const options: any = {
			method: "POST",
			uri: userUrl + "/orders",
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(201);
		});
	});

	it(`Aplica cupom não existente ao pedido atual do usuário ${userId}`, () => {

		const body = {
			couponName: "TERCEIRACOMPRA",
			order: {
				address: "Av. Biel o Grande, 51, Pina",
				products: [
					{
						name: "Méqui Shake",
						price: 15,
						quantity: 1
					},
					{
						name: "Cheddar Méquimelt",
						price: 12,
						quantity: 3
					}
				],
				amount: 51,
				restaurant: "Mequi"
			}
		}

		const options: any = {
			method: "POST",
			uri: userUrl + "/order",
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).not.toBe(201);
		});
	});

		
	it(`Aplica cupom de admin ao pedido atual do usuário ${userId}`, () => {

		const body = {
			couponName: "SEGUNDACOMPRA",
			order: {
				address: "Av. Tales de Mileto, 13, Barro",
				products: [
					{
						name: "Big Méqui",
						price: 15,
						quantity: 2
					},
					{
						name: "Cheddar Méquimelt",
						price: 12,
						quantity: 1
					}
				],
				amount: 42,
				restaurant: "Mequi"
			}
		}

		const options: any = {
			method: "POST",
			uri: userUrl + "/order",
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(201);
		});
	});

});

