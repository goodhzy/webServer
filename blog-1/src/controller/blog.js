const { exec } = require("../db/mysql.js");

const getList = (author, keyword) => {
  // 小技巧:1=1 可以防止author和keword没有时报错
  let sql = "select * from blogs where 1=1 ";
  author && (sql += `and author='${author}' `);
  keyword && (sql += `and title like '%${keyword}%' `);
  sql += `order by createtime desc;`;
  return exec(sql);
};

const getDetail = (id) => {
  let sql = `select * from blogs where id= '${id}'`;
  return exec(sql);
};

const addBlog = (blogData = {}) => {
  const { title, content, author, createtime = Date.now() } = blogData;

  let sql = `insert into blogs (title,content,createtime,author) values 
    ('${title}','${content}','${createtime}','${author}');`;

  return exec(sql).then((insertData) => {
    return {
      id: insertData.insertId,
    };
  });
};

const updateBlog = (blogData = {}) => {
  const { id, title, content } = blogData;
  let sql = `update blogs set title='${title}', content='${content}' where id='${id}'`;
  return exec(sql).then((updateData) => {
    return updateData.affectedRows > 0;
  });
};

const delBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'`;
  return exec(sql).then((delData) => {
    return delData.affectedRows > 0;
  });
};

module.exports = {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog,
};
