import Services from "./class.services.js";
import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
import ProductManager from "../daos/filesystem/product.dao.js";

//Comentar o descomentar para cambio de persistencia MongoDB a Firesystem, viceversa.
//const prodDao =new ProductDaoFS();
const prodDao = new ProductDaoMongoDB();

export default class ProductService extends Services {
  constructor() {
    super(prodDao);
  }
}

export const addProductToCart = async (cartId, productId) => {
  try {
    const exists = await prodDao.getById(productId);
    const newProduct = await prodDao.addProductToCart(cartId, productId);
    if (!exists) throw new Error('Product not found (population)')
    return newProduct;

  } catch (error) {
    console.log(error);
  }
}

export const sortAggregation = async () => { 
  try {
    return await prodDao.sortAggregation();
  } catch (error) {
    console.log(error);
  }
}

export const getQuery = async ({ query }) => {
  try {
    return await prodDao.getAll({ query });
  } catch (error) {
    console.log(error);
  }
};

export const getAll = async (page, limit) => {
  try {
    const data = await prodDao.getAll(page, limit);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const prod = await prodDao.getById(id);
    if (!prod) return false;
    else return prod;
  } catch (error) {
    console.log(error);
  }
};

export const create = async (obj) => {
  try {
    if (!obj.title || !obj.description || !obj.price || !obj.thumbnails || !obj.code || !obj.stock) {
      throw new Error('Missing fields');
    }
    const newProd = await prodDao.create(obj);
    if (!newProd) return false;
    else return newProd;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (id, obj) => {
  try {
    const prodUpd = await prodDao.update(id, obj);
    if (!prodUpd) return false;
    else return prodUpd;
  } catch (error) {
    console.log(error);
  }
};

export const remove = async (id) => {
  try {
    const prodDel = await prodDao.delete(id);
    if (!prodDel) return false;
    else return prodDel;
  } catch (error) {
    console.log(error);
  }
};
export const createMockingProducts = async (cant = 100) =>{
  try {
    const productsArray = [];
    for (let i = 0; i < cant; i++) {
      const products = generateProducts();
      productsArray.push(products);
    }
    const products = await productsModel.create(productsArray);
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const getMockingProducts = async () => {
  try {
    return await UserModel.find({});
  } catch (error) {
    console.log(error);
  }
};