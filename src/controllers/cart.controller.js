import * as cartService from "../servicies/carts.services.js";
import Controllers from "../controllers/class.controller.js"

export default class CartController extends Controllers {
  constructor() {
    super(cartService);
  };
  getAllCarts = async (req, res, next) => {
    try {
      const { email } = req.user
      const carts = await cartService.getAllCarts(email);
      res.status(200).json(carts);
    } catch (error) {
      console.log(error);
    }
  };

  getCartById = async (req, res, next) => {
    try {
      const { email } = req.user;
      const { id } = req.params;
      const cart = await cartService.getCartById(id, email);
      if (!cart) {
        res.status(404).json({ msg: "Cart Not Found!" });
      } else {
        res.status(200).json(cart);
      }
    } catch (error) {
      next(error.message);
    }
  };

  createCart = async (req, res, next) => {
    try {
      const { email } = req.user;
      const newCart = await cartService.createCart(req.body, email);
      if (!newCart) {
        throw Error("Error creating cart");
      } else {
        res.status(201).json({ msg: "cart creado con exito ", newCart });
      }
    } catch (error) {
      next(error.message);
    }
  };

  removeCart = async (req, res, next) => {
    try {
      const { email } = req.user;
      const { id } = req.params;
      const cartDel = await cartService.removeCart(id, email);
      if (!cartDel) {
        res.status(404).json({ msg: "Error Delete Cart" })
      }
      else {
        res.status(200).json({ msg: "cart eliminado" })
      }
    } catch (error) {
      next(error.message);
    }
  };

  addProductToCart = async (req, res, next) => {
    try {
      const { email } = req.user;
      const { cid, id } = req.params;
      const response = await cartService.addProductToCart(cid, id, email);
      if (!response) {
        res.status(404).json({ msg: "Error" })
      }
      else {
        res.status(200).json({ msg: "Producto agregado" })
      }
    } catch (error) {
      next(error.message)
    }
  };
  removeProdToCart = async (req, res, next) => {
    try {
        const { idCart, idProd } = req.params;
        const { email } = req.user;
        console.log('EMAIL - CONTROLLER --->', email);
        const delProdToUserCart = await cartService.removeProdToCart(idCart, idProd, email);
        if (!delProdToUserCart) {
            return (
                httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_TO_CART)
            )
        } else {
            return (
                httpResponse.Ok(res, delProdToUserCart)
            )
        };
    } catch (error) {
      next(error.message)
    }
};

updateProdQuantityToCart = async (req, res, next) => {
    try {
        const { idCart, idProd } = req.params;
        const { quantity } = req.body;
        const updateProdQuantity = await service.updateProdQuantityToCart(
            idCart,
            idProd,
            quantity
        );
        if (!updateProdQuantity) {
            return (
                httpResponse.NotFound(res, "Error update product quantity to cart")
            )
        } else {
            return (
                httpResponse.Ok(res, updateProdQuantity)
            )
        };
    } catch (error) {
      next(error.message)
    }
};

clearCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const { email } = req.user;
        const clearCart = await cartService.clearCart(idCart, email);
        if (!clearCart) {
            return (
                httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_ITEM)
            )
        } else {
            return (
                httpResponse.Ok(res, clearCart)
            )
        };
    } catch (error) {
        next(error.message);
    }
};
}