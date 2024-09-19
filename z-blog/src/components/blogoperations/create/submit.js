import axiosInstance from "../../_utilities/axios";

export default function SubmitBlog(title,category,content,context,navigate){
    const date = new Date().toISOString().split('T')[0];
    const data = {title:title,category:category,date:date,content:content}
    axiosInstance.post('/blogs/create',data).then(res=>{
        context.setMessage('Blog created successfully');
        context.setSnackstate(true);
        navigate('/')


    }).catch(error=>{console.log(error)})
}