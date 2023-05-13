    import { useState } from "react";
    import { useNavigate } from "react-router-dom";


    function BlogForm() {
    
    // Basis for fields
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");
    const history = useNavigate();

    // for errors messages
    const [titleError, setTitleError] = useState(false);
    const [authorError, setAuthorError] = useState(false);
    const [bodyError, setBodyError] = useState(false);

    // for action on submmit the button 
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    const handleFormSubmit = (e) => {
    
    e.preventDefault();

    if ( (!title && !author && !body) ) {
        setTitleError(true);
        setAuthorError(true);
        setBodyError(true);
        return;
    } else {
        setTitleError(false);
        setAuthorError(false);
        setBodyError(false);
    }

    // if user insert spaces
    setTitleError(!title.trim());
    setAuthorError(!author.trim());
    setBodyError(!body.trim());

    if (!title.trim() || !author.trim() || !body.trim()) {
        return;
    }


    setIsLoading(true);

    const blog = { title, body, author };

    // fetch json data 
    fetch("http://localhost:8000/blogs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
    })
        .then(() => {
        console.log("new blog added");
        setIsLoading(false);
        setIsSuccess(true);

        setTimeout(() => {
            setIsSuccess(false);
        }, 3000);

        history('/');
        })
        .catch((error) => {
        console.error(error);
        setIsLoading(false);
        });
    
    setTitle("");
    setAuthor("");
    setBody("");
    };


    const handleInButton = () => {
        if (!title || !author || !body) {
        return;
        }
        handleFormSubmit(new Event("submit"));
    };

    return (
        <div className="create">
        <h2>Add a New Blog</h2>
        <form onSubmit={handleFormSubmit}>
            <label>Blog Title:</label>
            <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            {titleError && (
            <p style={{ color: "red" }}>Please enter a title</p>
            )}

            <label>Author:</label>
            <input
            type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            />
            {authorError && (
            <p style={{ color: "red" }}>Please enter an author</p>
            )}

            <label>Body</label>
            <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            ></textarea>
            {bodyError && <p style={{ color: "red" }}>Please enter the body</p>}

            <button
            className={isLoading ? "submit-btn loading" : "submit-btn"}
            onClick={handleInButton}
            disabled={isLoading}
            >
            {isSuccess ? "Blog Added Successfully" : "Add Blog"}
            {isSuccess && <span className="checkmark"> &#10003;</span>}
            </button>
        </form>
        </div>
    );
    }

    export default BlogForm;
