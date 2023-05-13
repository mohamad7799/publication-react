import BlogList from "./BlogList";
import useData from "./useData";

const Home = () => {

    const {data: blogs , louding , isError} = useData('http://localhost:8000/blogs');

    

    return ( 

    
        <div className="home"> 
        
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

            {blogs && <BlogList  blogs={blogs}  />}
            
        </div>
    );
}

export default Home;