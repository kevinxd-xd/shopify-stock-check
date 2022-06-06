module.exports = class Product {
    constructor(url, src) {
        this.URL = url;
        this.source = JSON.parse(src);
        this.vars = [];
        this.subnames = [];
        this.pic = this.source.media[0].src;
        this.prodName = this.source.title;
    }
    async parseVariants() {
        for (let key in this.source.variants) {
            this.vars.push(this.source.variants[key].id);
        }
    }
    async parseSubNames() {
        for (let key in this.source.variants) {
            this.subnames.push(this.source.variants[key].title);
        }
    }
    async parseStock() {

    }
}