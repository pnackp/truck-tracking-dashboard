export function Remove_token(token){
    localStorage.removeItem(token);
    return;
}

export function Insert_token(token , data){
    localStorage.setItem(token , data);
    return;
}

export function Check_token(token){
    return localStorage.getItem(token);
}