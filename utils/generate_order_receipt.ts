// import { User } from "../web-app/src/app/admin/user"
import { User } from "../server/src/interfaces/users"
import { Order } from "../web-app/src/app/features/user/orders/order"

export default function generateOrderReceipt(user: User, order: Order) {

    var receiptString =
        `
    Olá, ${user.name}, seu pedido ${order.id} em ${order.restaurant} foi confirmado.

    -------- Nota Fiscal -------- 
    ${order.products.map((product) => {
            return (
                `${product.quantity}x ${product.name} - R$${product.price * product.quantity}\n    `
            )
        }).join("")}
    ${order.coupon ? `Desconto: R$ ${order.coupon.discount} (Coupom: R$ ${order.coupon.name})` : ""}
    ------------------------------
    Total: R$${order.amount}

    Obrigado por comprar com a gente! 
    `;

    return receiptString
}