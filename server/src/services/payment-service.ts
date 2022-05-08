import { PaymentMethod } from "../classes/payment-method";

export class PaymentMethodService {
 
  private userPayment: PaymentMethod[] = [];
  
  set(userPayment: PaymentMethod[]) {
    this.userPayment = userPayment;
  }

  add(newMethod: PaymentMethod): PaymentMethod {
    
    console.log(this.userPayment.length);
    console.log(newMethod.type);
    if (this.userPayment.length == 5  || (newMethod.type != "Cartao de Credito" && newMethod.type != "Cartao de Debito" && newMethod.type != "Pix" && newMethod.type != "PicPay" && newMethod.type != "PayPal")) {
      console.log("dentro if")
      return null;
    }
    console.log("depois if gigante");
    if(this.userPayment.find(method => method == newMethod)){
      console.log("pedido iguaaal")
      return null;
    }
      

    //checa se e-mail possui arroba
    if(newMethod.type == "PayPal" || newMethod.type == "PicPay"){
      let email = newMethod.email;
      let regexvalidation = /^([a-z]){1,}([a-z0-9.-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
      if(regexvalidation.test(email) == false)return null;
    }
    
    //validação cartao servidor
    if(newMethod.type == "Cartao de Credito" || newMethod.type == "Cartao de Debito"){

      if(isNaN(Number(newMethod.number)) == true){
        return null;
      }

      if( String(newMethod.number).length != 16 ){
        return null
      }
      if( String(newMethod.cvv).length != 3 ){
        return null  
      }

      if( newMethod.name_titular == undefined ){
        return null
      }
      if( newMethod.flag != "visa" && newMethod.flag != "master"  ){
        return null
      }
      if( newMethod.name == undefined ){
        return null
      }
    }
    console.log("pós segundo if gigante")
    console.log(this.userPayment[this.userPayment.length-1])

    let id:number;
    if(this.userPayment.length) {
      console.log()
      id = this.userPayment[this.userPayment.length-1].id + 1;
    } else {
      id = 0;
    }
    newMethod.id = id;
    console.log(newMethod.id)
    const finalMethod = newMethod;
  
    this.userPayment.push(finalMethod);
    console.log("no add:");
    console.log(finalMethod);
    return finalMethod;
  }

  update(method: PaymentMethod ): PaymentMethod {
    //console.log("antes if2");
    var result = this.getById(method.id);
    console.log('result=', result)
    if(!(method.type == "PicPay"  || method.type == "PayPal")) {
      return null;
    }
    
    if (result) {
      
      let email = result.email;
      let regexvalidation = /^([a-z]){1,}([a-z0-9.-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
      if(regexvalidation.test(email) == false)return null;
      
      result.email = method.email;
      result.name = result.type + "(" +result.email + ")";
    
      return result;
    }
    
    return null;
  }

  remove(newMethod: PaymentMethod): PaymentMethod {
    var r: number = this.userPayment.indexOf(newMethod);
    if (this.userPayment.length > 0 && r != -1) {
      var result: PaymentMethod = this.userPayment[r];
      this.userPayment.splice(r,1);
      return result;
    }
  
    return null;
    
  }
  
  getByName(mName: string) : PaymentMethod {
    return this.userPayment.find(metodo => metodo.name == mName);
  }

  getById(id: number) : PaymentMethod {
    return this.userPayment.find( method => method.id == id);
  }
}