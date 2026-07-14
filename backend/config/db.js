import mongoose from 'mongoose';
import dns from 'dns';

// Fix for Windows / Local Router DNS SRV blocking (querySrv ECONNREFUSED)
// By explicitly setting reliable public DNS resolvers, Node.js bypasses local router restrictions
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore if unable to set custom DNS servers
}

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;
    if (!uri) {
      console.warn('⚠️ No MONGODB_URI or DATABASE_URL found in .env');
      return;
    }

    try {
      const conn = await mongoose.connect(uri);
      console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
      console.log(`🗄️  Database Name: ${conn.connection.name}`);
    } catch (initialError) {
      if (initialError.message.includes('querySrv') || initialError.message.includes('ECONNREFUSED')) {
        console.log('ℹ️ DNS SRV query refused by local router (`querySrv ECONNREFUSED`), switching to direct replica set connection string...');
        const directUri = uri
          .replace('mongodb+srv://', 'mongodb://')
          .replace('@cluster0.c2upypj.mongodb.net', '@ac-vmzi3ps-shard-00-00.c2upypj.mongodb.net:27017,ac-vmzi3ps-shard-00-01.c2upypj.mongodb.net:27017,ac-vmzi3ps-shard-00-02.c2upypj.mongodb.net:27017')
          + (uri.includes('?') ? '&ssl=true&authSource=admin' : '?ssl=true&authSource=admin');
        const fallbackConn = await mongoose.connect(directUri);
        console.log(`🍃 MongoDB Connected via Direct Replica Set: ${fallbackConn.connection.host}`);
        console.log(`🗄️  Database Name: ${fallbackConn.connection.name}`);
      } else {
        throw initialError;
      }
    }
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
  }
};
