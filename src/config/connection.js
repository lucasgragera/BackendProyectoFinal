import mongoose from 'mongoose';

const connectionString = 'mongodb://127.0.0.1:27017/coder47345';
//'mongodb+srv://lucasgragera51:2l0i0g1e@ecommercee.xfj5uxp.mongodb.net/?retryWrites=true&w=majority&appName=ecommercee';

try {
  await mongoose.connect(connectionString);
  console.log('Conectado a la base de datos de MongoDB');
} catch (error) {
  console.log(`ERROR => ${error}`);
}