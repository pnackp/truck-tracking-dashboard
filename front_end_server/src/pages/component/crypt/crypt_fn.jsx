export function Crypy_func() {
    const array = new Uint16Array(1); 
    crypto.getRandomValues(array); 
    return array[0].toString(16).padStart(4, "0"); 
}