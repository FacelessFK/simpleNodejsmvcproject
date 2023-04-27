const fs = require("fs");
const path = require("path");

const Cart = require("./cart");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "products.json"
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        // add id to our saved products
        getProductsFromFile((products) => {
            // ma be model aslimooon oomadim id ham dadim ta id haro begire bad oomadim goftim ke age id vojod dasht ( ma moghe ezafe kardan ye product jadid nemiaim behesh id bedim moghe save midim be else hamiin ja tavajoh kon ) khob age id dashtim bia product ro peyda kon shomare indexesho ke idish ba id ke vared shode moshe edit barabar hast bad bia kole prodact haro beriz tu update product bad oon indexi ke find kardim ru tu update product bia behesh hamin objecti ke update darim mikonim ro pass bede bad file systemi ro benevis dobare
            if (this.id) {
                const existingProductIndex = products.findIndex(
                    (prod) => prod.id === this.id
                );
                const updateProducts = [...products];
                updateProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updateProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
    static findById(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find((p) => p.id === id);
            cb(product);
        });
    }
    static delete(id) {
        // ----------maximilian solution ------------
        getProductsFromFile((products) => {
            const product = products.find((p) => p.id === id);
            const updateProducts = products.filter((p) => p.id !== id);
            fs.writeFile(p, JSON.stringify(updateProducts), (err) => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
            });
        });

        // ---------- my solution -----------
        // getProductsFromFile((products) => {
        //     const existingProductIndex = products.findIndex(
        //         (prod) => prod.id === id
        //     );
        //     const updateProducts = [...products];
        //     updateProducts.splice(existingProductIndex, 1);
        //     fs.writeFile(p, JSON.stringify(updateProducts), (err) => {
        //         console.log(err);
        //     });
        // });
    }
};
