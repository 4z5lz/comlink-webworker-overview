self.addEventListener("message", message => {
    const {action, payload} = message.data;

    switch (action) {
        case 'handleMousePosition':
            postMessage({processed: 'position', payload});
            break;
        
        case 'handleMouseClick':
            postMessage({processed: 'click', payload});
            break;
    }
});  