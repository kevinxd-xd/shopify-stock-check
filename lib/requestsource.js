require('dotenv').config({ path: '../.env'});
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Product = require('../classes/product.js');

module.exports = {
    // Grabs the source
    async getSource(link) {
        if (link.includes('shopify') || !link.includes('products') || link.includes('.js') || link.includes('variant')) {
            return false;
        }
        let jsLink = link + ".js";
        const response = await (await fetch(jsLink)).text();
        return new Product(link, response);
    },
}