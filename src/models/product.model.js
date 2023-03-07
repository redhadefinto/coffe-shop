const db = require("../configs/postgre");

const getProducts = (query) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `select p.id, p."product_name", p.image, p.price, pc."category_name" from products p 
    join prod_categories pc on p.category_id = pc.id `;
    // Order by price
    let order = "p.id ASC";

    if (query.name && query.order === "cheapest" && query.limit) {
      sqlQuery += ` WHERE lower(p.product_name) LIKE lower('%${query.name}%') ORDER BY p.price ASC LIMIT ${query.limit}`;
    }

    // Filter by name
    if (query.name) {
      sqlQuery += ` WHERE lower(p."product_name") LIKE lower('%${query.name}%')`;
    }

    if (query.order === "cheapest") {
      order = "p.price ASC";
    }
    if (query.order === "priciest") {
      order = "p.price DESC";
    }
    sqlQuery += ` ORDER BY ${order}`;

    // Limit number of results
    if (query.limit) {
      sqlQuery += ` LIMIT ${query.limit}`;
    }

    db.query(sqlQuery, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const getProductDetail = (params) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `select p.id, p."product_name", p.image, p.price, pc."category_name", ps.size_name, pm.delivery_methods
    from products p 
    join prod_categories pc on p.category_id = pc.id 
    join prod_size ps on p.size_id = ps.id
    join prod_delivery_methods pm on p.delivery_method = pm.id
    WHERE p.id = $1`;
    const values = [params.productId];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const insertProduct = (data) => {
  return new Promise((resolve, reject) => { 
    const sqlQuery = `insert into products (product_name, price, category_id, size_id, delivery_method, image) values ($1, $2, $3, $4, $5, $6) RETURNING *`;
    // parameterized query
    const values = [data.product_name, data.price, data.category_id, data.size_id, data.delivery_method, data.image];
    db.query(sqlQuery, values, (err, result) => {
      if(err) {
        reject (err);
        return;
      }
      resolve(result);
    });
  });
};  

const updateProduct = (params, data) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `update products set product_name = $1, price = $2, category_id = $3, size_id = $4, delivery_method = $5, image = $6 where id = $7 RETURNING *;`;
    const values = [data.product_name, data.price, data.category_id, data.size_id, data.delivery_method, data.image, params.productId];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const deleteProduct = (params) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `delete from products where id = $1`;
    const values = [params.productId];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  getProducts,
  insertProduct,
  getProductDetail,
  updateProduct,
  deleteProduct
};