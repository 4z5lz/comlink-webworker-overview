let ctx;
let canvasWidth;
let canvasHeight;
let prevPointX = undefined;
let prevPointY = undefined;

// handle messages FROM the main thread
self.addEventListener("message", message => {
    const { action, payload, canvas } = message.data;

    if (canvas) {
        canvasWidth = canvas.width; 
        canvasHeight = canvas.height;
        
        ctx = canvas.getContext("2d");        
    }
    
    switch (action) {
        case 'draw':
            
            ctx.beginPath();
            ctx.moveTo(prevPointX, prevPointY);
            ctx.lineTo(payload.x, payload.y);
            ctx.strokeStyle = '#ff0000';
            ctx.stroke();            
            prevPointX = payload.x;
            prevPointY = payload.y;
            
            // send message TO the main thread
            postMessage({ processed: 'drawing', payload: {x: payload.x, y: payload.y} });

            break;

        case 'cleanup': 
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);           
            postMessage({ processed: 'cleanup', payload: true });

            break;
    }
});  