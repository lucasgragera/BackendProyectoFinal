// const socket = io();
// socket.on("productos", (data) => {
//   const productosLista = document.querySelector(".container");
//   productosLista.innerHTML = " ";
//   data.forEach((products) => {
//     const boxItem = `
//                 <div class="product">
//                 <h3>${products.title}</h3>
//                 <p>Description: ${products.description}</p>
//                 <p>ID: ${products.id}</p>
//                 <p>$ ${products.price}</p>
//                 <p>Stock: ${products.stock}</p>
//                 </div>`;
//     productosLista.innerHTML += boxItem;
//   });
// });
import { Router } from "express";
import productRouter from "./products/productRouter.js"
import userRouter from "./users/userRouter.js";
import cartRouter from "./carts/cartRouter.js";
import ticketRouter from "./tickets/ticketRouter.js";

export default class MainRouter {
    constructor() {
        this.router = Router();
        this.initRoutes();
    };

    initRoutes(){
        this.router.use('/products', productRouter);
        this.router.use('/users', userRouter);
        this.router.use('/carts', cartRouter);
        this.router.use('/tickets', ticketRouter);
    };

    getRouter() {
        return this.router;
    };
};
