// 5.

// a: criar objecto funcao construtor
function Emitter(){   
    // adicionar uma propriedade ao objeto/função
    this.events = {};
}

// Adicionar eventos
Emitter.prototype.on = function(type, listener){
    if(this.events[type] == undefined){
        this.events[type] = [];
    }
    this.events[type].push(listener);
           
}

// Emitir um evento
Emitter.prototype.emit = function(type){
    if(this.events[type] != undefined){
        this.events[type].forEach(function(listener) {
            listener();
        });
    }
}

module.exports = Emitter;