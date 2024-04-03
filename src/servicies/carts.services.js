import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const cartDao = new CartDaoMongoDB();
const productDao = new ProductDaoMongoDB();


export const getAllCarts = async () => {
  try {
    return await cartDao.getAllCarts();
  } catch (error) {
    console.log(error);
  }
};

export const getCartById = async (id) => {
  try {
    const cart = await cartDao.getCartById(id);
    if (!cart) return false;
    else return cart;
  } catch (error) {
    console.log(error);
  }
};

export const createCart = async () => {
  try {
    const newCart = cartDao.create();
    if (!newCart) return false;
    else return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const removeCart = async (id) => {
  try {
    const cartDel = await cartDao.removeCart(id);
    if (!cartDel) return false;
    else return cartDel;
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (cid,id)=>{
// export const addProduct = async (cid,pid)=>{
    try {
        const cart = await cartDao.getCartById(cid);
        const product = id
        // const product = pid
        if(!cart || !product) return false;
        else{
            const response = await cartDao.addProductToCart(cart,product)
            return response
        }
    } catch (error) {
        console.log(error)
    }
    
}
export const removeProdToCart = async (cid, id) => {
  try {
    const existCart = await getCartById(cid);
    console.log("existCart-->", existCart);
    if (!existCart) return false;

    const existProd = existCart.products.find((p)=>p.product._id.toString() === id.toString());
    console.log("existProd-->", existProd);
    if (!existProd) return false;

    return await cartDao.removeProdToCart(existCart, existProd);
  } catch (error) {
    console.log(error);
  }
};

export const updateProdQuantityToCart = async (cid, id, quantity) => {
  try {
    const existCart = await getCartById(cid);
    console.log("existCart-->", existCart);
    if (!existCart) return false;

    const existProd = existCart.products.find((p)=>p.product._id.toString() === id.toString());
    console.log("existProd-->", existProd);
    if (!existProd) return false;

    return await cartDao.updateProdQuantityToCart(existCart, existProd, quantity);
  } catch (error) {
    console.log(error);
  }
};

export const clearCart = async (cid) => {
  try {
    const existCart = await getById(cid);
    console.log("existCart-->", existCart);
    if (!existCart) return false;

    return await cartDao.clearCart(existCart);
  } catch (error) {
    console.log(error);
  }
}