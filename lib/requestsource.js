require('dotenv').config({ path: '../.env'});
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Product = require('../classes/product.js');
const ProxyAgent = require('proxy-agent')
const fs = require('node:fs')

module.exports = {
    // Grabs the source
    async getSource(link) {
        // Checks if link is valid
        if (link.includes('shopify') || !link.includes('products') || link.includes('.js') || link.includes('variant')) {
            return false;
        }
        let jsLink = link + ".js";
        const response = await (await fetch(jsLink, {
            "agent": await this.genRandomProxy()
        })).json();
        return new Product(link, response);
    },
    async getAllProxies() {
        // Reads all proxies, separating them by new line
        let proxyList = await fs.readFileSync('./resources/proxies.txt', 'utf8');
        // Checks if we actually read anything
        if (proxyList.length == 0) {
            throw "No proxy loaded... exiting";
        }
        return proxyList.split("\n");
    },
    async genRandomProxy() {
        // Grabs all proxies
        let proxyList = await this.getAllProxies();
        // Picks a random proxy
        let proxySelected = proxyList[Math.floor(Math.random() * (proxyList.length - 1))].trim().split(":");
        // Put into URI form to transform into a proxy agent
        let createURI = process.env.http_proxy || `http://${proxySelected[2]}:${proxySelected[3]}@${proxySelected[0]}:${proxySelected[1]}`;
        return new ProxyAgent(createURI);
    },
}