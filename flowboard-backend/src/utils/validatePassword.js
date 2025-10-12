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