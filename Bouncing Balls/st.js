class Converter {
    // Here we go...
    constructor(s, u){
        this.size = s; 
        this.unit = u;
    }
    unit() {return JSON.stringify(this.unit);}
    size() {return this.size;}
}
