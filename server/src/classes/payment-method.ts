export class PaymentMethod {
  id: number
  number: string;
  name_titular: string;
  cvv: number;
  flag: string;
  name: string;
  email: string;
  type: string;

  constructor(paymentMethod: PaymentMethod) {
    this.type = paymentMethod.type;
    this.name = paymentMethod.name;
    if (this.type == "Cartao de Credito" || this.type == "Cartao de Debito") {
      this.number = paymentMethod.number;
      this.name_titular = paymentMethod.name_titular;
      this.cvv = paymentMethod.cvv;
      this.flag = paymentMethod.flag;
    }
    if (this.type == "PicPay"  || this.type == "PayPal") {
      this.email = paymentMethod.email;
    }
  }

  update(paymentMethod: PaymentMethod) {
    console.log("update de dentroo")
    console.log(paymentMethod);
      this.name = this.type + paymentMethod.name;
      if (this.type == "PicPay"  || this.type == "PayPal") {
        this.email = paymentMethod.email;
      }
  }
  
}