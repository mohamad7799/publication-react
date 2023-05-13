import { useParams } from "react-router-dom";
import useData from "./useData";
import { useNavigate } from "react-router-dom";



const BlogDetails = () => {

    const {id}=useParams();
    const {data: blog , louding , isError} = useData('http://localhost:8000/blogs/'+id);
    const history=useNavigate();


    const handleDelete=()=>{

        fetch("http://localhost:8000/blogs/"+blog.id ,{method:"DELETE"})
        .then(()=>{
            history("/")
        })
    }


    return ( 
        <div className="blog-details">
            {
                isError && 
                <div class="bar error">
                    <i class="ico">&#8855;</i>{isError}
                </div>
            }

            {
                louding && <figure>
                                <div className="dot white"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </figure>
            }

            {
                blog && (
                    <article>
                        <h2>{blog.title}</h2>
                        <p>{blog.author}</p>
                        <div>{blog.body}</div>
                        <button onClick={handleDelete}>Delete</button>
                    </article>
                )
            }
        </div>
    );
}

export default BlogDetails;