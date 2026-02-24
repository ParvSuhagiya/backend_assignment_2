const express = require("express");

const app = express();

app.use(express.json());

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 799,
    stock: 25,
    rating: 4.3
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 2499,
    stock: 40,
    rating: 4.5
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "Accessories",
    price: 999,
    stock: 30,
    rating: 4.2
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 12,
    rating: 4.4
  },
  {
    id: 5,
    name: "Backpack",
    category: "Fashion",
    price: 1599,
    stock: 50,
    rating: 4.1
  }
];

/////// GET REQUESTS ///////

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(
        (p) => p.id === id
    );

    if (!product) {
        return res.status(404).json({ message: "product not found" });
    }

    res.json(product);
});
app.get("/products/category/:categoryName", (req, res) => {
    let cname = req.params.categoryName;
    cname = cname.toLowerCase();
    const product = products.filter(
        (p) => {
            let category_lower = p.category.toLowerCase();
            return category_lower === cname
        }
    );

    if (!product) {
        return res.status(404).json({ message: "product not found" });
    }

    res.json(product);
});

/////// POST REQUESTS ///////

app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    category : req.body.category,
    price : req.body.price,
    rating : req.body.rating
  };

  products.push(newProduct);

  res.status(201).json({
    message: "product created",
    product : newProduct
  });
});

/////// PUT REQUESTS ///////

app.put("/product/:id", (req, res) => {
  const productId = Number(req.params.id);
  const index = products.findIndex(p => p.id === productId);

  if (index === -1) {
    return res.status(404).json({ message: "product not found" });
  }

  products[index] = {
    id: productId,
    category : req.body.category,
    price : req.body.price,
    rating : req.body.rating
  };

  res.status(200).json({
    message: "product replaced",
    product: products[index]
  });
});
app.put("/product/:id/stock", (req, res) => {
  const productId = Number(req.params.id);
  const index = products.findIndex(p => p.id === productId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  products[index].stock = req.body.stock;

  res.status(200).json({
    message: "Stock updated",
    user: products[index]
  });
});
app.put("/product/:id/price", (req, res) => {
  const productId = Number(req.params.id);
  const index = products.findIndex(p => p.id === productId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  products[index].price = req.body.price;

  res.status(200).json({
    message: "price updated",
    user: products[index]
  });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});