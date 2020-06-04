const getList = (author, keyword) => {
    return [
        {
            id: 1,
            age: 2,
        },
        {
            id: 2,
            age: 14
        }
    ]
}

const getDetail = (id)=>{
    return {
        id: 1,
        age: 2,
    }
}

const addBlog = (blogData={})=>{
    return {
        id: 1
    }
}

const updateBlog = (id, blogData={})=>{
    return true
}

const delBlog = (id) =>{
    return true
}

module.exports = {
    getList,
    getDetail,
    addBlog,
    updateBlog,
    delBlog
}