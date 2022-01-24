importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");

class Worker {

    constructor() {
        this.prevPointX = undefined;
        this.prevPointY = undefined;
        this.ctx = undefined;
        this.canvasWidth = 0; 
        this.canvasHeight = 0;        
    }
    
    init(canvas) {
        this.canvasWidth = canvas.width; 
        this.canvasHeight = canvas.height;
        this.ctx = canvas.getContext("2d");
    }

    draw(payload, cb) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.prevPointX, this.prevPointY);
        this.ctx.lineTo(payload.x, payload.y);
        this.ctx.strokeStyle = '#ff0000';
        this.ctx.stroke();            
        this.prevPointX = payload.x;
        this.prevPointY = payload.y;
        
        cb({x: payload.x, y: payload.y})
    }
    
    cleanup() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); 
        return true;          
    }
}

Comlink.expose(new Worker());