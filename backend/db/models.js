const {DataTypes} = require('sequelize');
const sequelize = require("./connection")



const Users = sequelize.define('Users',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:true},
    firstName:{type:DataTypes.STRING(100)},
    lastName:{type:DataTypes.STRING(100)},
    email:{type:DataTypes.STRING(150),unique:true},
    password:{type:DataTypes.TEXT},
    verified:{type:DataTypes.INTEGER,defaultValue:false},
    Author_status:{type:DataTypes.INTEGER,defaultValue:false},
},{tableName:"Users",timestamps:false});


const Authors = sequelize.define('Authors',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:true},
    Author_id:{type:DataTypes.INTEGER, references:{model:Users,key:'id'},onDelete:"CASCADE",onUpdate:"CASCADE"},
    Follower:{type:DataTypes.INTEGER,defaultValue:'0'}

},{tableName:'Authors',timestamps:false});

Authors.belongsTo(Users,{foreignKey:'Author_id'})
Users.hasMany(Authors,{foreignKey:'Author_id'})



const Categories = sequelize.define('Categories',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:true},
    category:{type:DataTypes.STRING(100),allowNull:false}
},{tableName:'Categories',timestamps:false});



const Blogs = sequelize.define('Blog',{
    Id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:true},
    Author_id:{type:DataTypes.INTEGER, references:{model:Authors,key:'id'},onDelete:"CASCADE",onUpdate:"CASCADE"},
    Category_id:{type:DataTypes.INTEGER, references:{model:Categories,key:'id'},onDelete:"CASCADE",onUpdate:"CASCADE"},
    Content:{type:DataTypes.TEXT},
    date:{type:DataTypes.DATE},
    Title:{type:DataTypes.TEXT,allowNull:false},
    Like_count:{type:DataTypes.INTEGER,allowNull:false,defaultValue:'0'}

},{tableName:'Blog',timestamps:false});


Blogs.belongsTo(Authors,{foreignKey:'Author_id'})
Authors.hasMany(Blogs,{foreignKey:'Author_id'})

Blogs.belongsTo(Categories,{foreignKey:'Category_id'})
Categories.hasMany(Blogs,{foreignKey:'Category_id'})




const Likes = sequelize.define('Likes',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:true},
    Blog_id:{type:DataTypes.INTEGER, references:{model:Blogs,key:'id'},onDelete:"CASCADE",onUpdate:"CASCADE"},
    user_id:{type:DataTypes.INTEGER, references:{model:Users,key:'id'},onDelete:"CASCADE",onUpdate:"CASCADE"},
},{tableName:'Likes',timestamps:false});

Likes.belongsTo(Blogs,{foreignKey:'Blog_id'})
Blogs.hasMany(Likes,{foreignKey:'Blog_id'})

Likes.belongsTo(Users,{foreignKey:'user_id'})
Users.hasMany(Likes,{foreignKey:'user_id'})




const Comments = sequelize.define('Comments',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:true},
    Blog_id:{type:DataTypes.INTEGER, references:{model:Blogs,key:'id'},onDelete:"CASCADE",onUpdate:"CASCADE"},
    user_id:{type:DataTypes.INTEGER, references:{model:Users,key:'id'},onDelete:"CASCADE",onUpdate:"CASCADE"},
    Comment:{type:DataTypes.TEXT}
},{tableName:'comments',timestamps:false});

Comments.belongsTo(Blogs,{foreignKey:'Blog_id'})
Blogs.hasMany(Comments,{foreignKey:'Blog_id'})

Comments.belongsTo(Users,{foreignKey:'user_id'})
Users.hasMany(Comments,{foreignKey:'user_id'})




const Followers = sequelize.define('Followers',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    author:{type:DataTypes.INTEGER,allowNull:false,references:{model:Authors,key:'id'},onDelete:"CASCADE",onUpdate:"CASCADE"},
    follower:{type:DataTypes.INTEGER,allowNull:false,references:{model:Users,key:'id'},onDelete:"CASCADE",onUpdate:"CASCADE"},
},{tableName:'FOLLOWERS',timestamps:false});


Followers.belongsTo(Authors,{foreignKey:'author'});
Followers.belongsTo(Users,{foreignKey:'follower'});

Authors.hasMany(Followers,{foreignKey:'author'});
Users.hasMany(Followers,{foreignKey:'follower'});











module.exports = {Users,Authors,Categories,Blogs,Likes,Comments,Followers}