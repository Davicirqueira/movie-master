
export function horario(){
    let now = new Date();
    let msg = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    return msg;
}