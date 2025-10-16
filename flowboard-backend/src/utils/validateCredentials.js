export const validatePassword = (password) => {
    if(password.length<8) return false;
    let [containsLower, containsUpper, containsSymbol, containsNumber] = [false,false,false,false]
    for(let i=0; i<password.length; i++){
        const code = password.charCodeAt(i);
        if(code>=65 && code<=90){
            containsUpper = true;
        }
        else if(code>=97 && code<=122){
            containsLower = true;
        }
        else if(code>=48 && code<=57){
            containsNumber = true;
        }
        else if(code>=32 && code<=126){
            containsSymbol = true
        }
    }
    return (containsLower&&containsNumber&&containsSymbol&&containsUpper);

}
export const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/
    if(!emailRegex.test(email)){
        return false;
    }
    return true;
}
export const validateUsername = (name) =>{
    if(name.length>32 || name.length<8){
        return false;
    }
    return true;
}