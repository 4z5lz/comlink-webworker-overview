importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");

class Worker {

    handleMousePosition(payload, cb) {
            cb({processed: 'position', payload})
    }
    
    handleMouseClick(payload, cb) {
            cb({processed: 'click', payload})
    }

}

Comlink.expose(new Worker());