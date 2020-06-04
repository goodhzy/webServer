const loginCheck = ({username, password})=>{
    if(username === 'hzy' && password === '123456'){
        return true
    }else{
        return false
    }
}

module.exports = {
    loginCheck
}