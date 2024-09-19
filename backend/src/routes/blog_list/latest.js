const models = require('../../../db/models')

async function latestBlogs(page) {
    // Calculate the offset for pagination
    const offset = (page - 1) * 10;

    // Return a new promise
    return new Promise(async (resolve, reject) => {
        // Validate page number
        if (page <= 0) {
            return reject({ status: 400, message: 'Page must be greater than 0' });
        }

        // Fetch blogs with pagination and sorting
        models.Blogs.findAll({
            attributes:['Id','date','Title','Content'],
            include:[{model:models.Authors,attributes:['id'],include:[{model:models.Users,attributes:['firstName','lastName']}]},{model:models.Categories,attributes:['category']}],
            limit: 10,  // Ensure limit is set to match your pagination
            offset: offset,
            order: [['date', 'DESC']]  // Order by date ascending
        })
        .then(async result =>  {
            const count = await models.Blogs.count()
            const substringged = result.map(blog=>({
                id:blog.Id,
                title:blog.Title,
                date:blog.date,
                author:{id:blog.Author.id,username:`${blog.Author.User.firstName} ${blog.Author.User.lastName}`},
                category:blog.Category.category,
                content:blog.Content.substring(0,200)

            }))
            
            resolve({totalpages:Math.ceil(count/10),currentpage:substringged})
        })
        .catch(error => {
            console.error(error);
            reject({ status: 500, message: 'Internal server error' });
        });
    });
}


module.exports = latestBlogs