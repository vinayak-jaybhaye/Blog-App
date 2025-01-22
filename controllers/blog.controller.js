import Blog from '../models/blog.model.js';
import Comment from '../models/comment.model.js';

const addBlog = async (req, res) => {
    try {
        const { title, body } = req.body; // Set default value for coverImageUrl
        const coverImageUrl = req.file
            ? `/uploads/${req.file.filename}`
            : '/uploads/default-placeholder.jpeg';

        const createdBy = req.user?._id; // Ensure req.user exists

        // Validate required fields
        if (!title || !body || !createdBy) {
            // console.log(req.body)
            return res.status(400).json({ error: "All fields are mandatory" });
        }

        // console.log("Creating blog with:", { createdBy, title, body, coverImageUrl });

        // Create the blog
        const blog = await Blog.create({ title, body, createdBy, coverImageUrl });

        if (!blog) {
            return res.status(500).json({ error: "Failed to create blog" });
        }

        return res.status(201).redirect('/');
    } catch (error) {
        console.error("Error while adding new blog:", error);

        // Respond with a generic error message
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({})
    res.render('home', {
        user: req.user,
        blogs: blogs 
    })
}

const getBlog = async (req, res) =>{
    const blog = await Blog.findById(req.params.id).populate('createdBy')
    const comments = await Comment.find({blog : blog._id}).populate('createdBy')
    // console.log(comments)
    // console.log(blog.id) 
    
    return res.render('blog', {
        blog,
        user : req.user,
        comments 
    })
}

const blogComment = async(req, res) =>{
      try {
        const comment = await Comment.create({content : req.body.content,
            blog : req.params.id,
            createdBy : req.user._id
        })
        // console.log(comment)
            return res.redirect(`/blog/${req.params.id}`)
      } catch (error) {
        
      }
}

export { addBlog, getAllBlogs, getBlog, blogComment };
