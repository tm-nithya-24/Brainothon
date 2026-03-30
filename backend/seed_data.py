SEED_QUESTIONS = [
    # PYTHON CATEGORY
    {
        "question_text": "What is the output of print(2 ** 3)?",
        "category": "Python", "difficulty": "easy",
        "options": ["6", "8", "9", "Error"], "correct_answer": "8",
        "explanation": "The ** operator is used for exponentiation, so 2 ** 3 means 2 raised to the power of 3, which is 8."
    },
    {
        "question_text": "Which of these is not a core Python data type?",
        "category": "Python", "difficulty": "easy",
        "options": ["List", "Dictionary", "Tuple", "Class"], "correct_answer": "Class",
        "explanation": "Classes are user-defined blueprints, not a built-in core primitive data type like List or Tuple."
    },
    {
        "question_text": "How do you insert an element at a specific index in a Python list?",
        "category": "Python", "difficulty": "easy",
        "options": ["list.push()", "list.add()", "list.insert()", "list.append()"], "correct_answer": "list.insert()",
        "explanation": "list.insert(index, element) allows you to insert an element at a specifically defined position."
    },
    {
        "question_text": "What does the 'pass' statement do?",
        "category": "Python", "difficulty": "easy",
        "options": ["Exits the program", "Skips to the next iteration", "Does nothing", "Raises an exception"], "correct_answer": "Does nothing",
        "explanation": "'pass' is a null operation. It's used as a placeholder when a statement is syntactically required but you need no logic."
    },
    {
        "question_text": "What is a dictionary in Python?",
        "category": "Python", "difficulty": "easy",
        "options": ["Ordered collection of items", "Key-Value pairs", "Array of strings", "Immutable sequence"], "correct_answer": "Key-Value pairs",
        "explanation": "Dictionaries are used to store data in key:value mappings."
    },
    {
        "question_text": "How do you handle exceptions in Python?",
        "category": "Python", "difficulty": "medium",
        "options": ["try/catch", "try/except", "do/except", "catch/finally"], "correct_answer": "try/except",
        "explanation": "In Python, errors are caught using a try block paired with one or more except blocks."
    },
    {
        "question_text": "What is slicing in Python?",
        "category": "Python", "difficulty": "medium",
        "options": ["Cutting strings into lists", "Obtaining a sub-sequence of elements", "Removing memory leaks", "Overriding class methods"], "correct_answer": "Obtaining a sub-sequence of elements",
        "explanation": "Slicing uses the syntax [start:stop:step] to extract subsets of sequences like lists or strings."
    },
    {
        "question_text": "Which of these is mutable?",
        "category": "Python", "difficulty": "medium",
        "options": ["Tuple", "String", "List", "Integer"], "correct_answer": "List",
        "explanation": "Lists can be modified after creation (appending, modifying values), whereas tuples, strings, and integers cannot."
    },
    {
        "question_text": "What is a lambda function?",
        "category": "Python", "difficulty": "hard",
        "options": ["An anonymous inline function", "A math operation", "An asynchronous task", "A database query"], "correct_answer": "An anonymous inline function",
        "explanation": "Lambda functions are small, anonymous functions defined without a name and typically consist of a single expression."
    },
    {
        "question_text": "Which method can be used to convert a string to uppercase?",
        "category": "Python", "difficulty": "easy",
        "options": ["upper()", "capitalize()", "toUpper()", "toUpperCase()"], "correct_answer": "upper()",
        "explanation": "The upper() method returns a new string where all the characters are in uppercase."
    },

    # REACT CATEGORY
    {
        "question_text": "What is JSX?",
        "category": "React", "difficulty": "easy",
        "options": ["A state manager", "A database wrapper", "A syntax extension for JavaScript", "A styling library"], "correct_answer": "A syntax extension for JavaScript",
        "explanation": "JSX allows you to write HTML-like syntax directly inside React JavaScript files."
    },
    {
        "question_text": "Which hook is used to manage local component state?",
        "category": "React", "difficulty": "easy",
        "options": ["useRef", "useEffect", "useState", "useContext"], "correct_answer": "useState",
        "explanation": "The useState hook allows functional components to maintain and update their own local state."
    },
    {
        "question_text": "What happens if you omit the dependency array in useEffect?",
        "category": "React", "difficulty": "medium",
        "options": ["It runs only once", "It errors out", "It runs after every render", "It never runs"], "correct_answer": "It runs after every render",
        "explanation": "Without a dependency array, useEffect executes after every single render of the component."
    },
    {
        "question_text": "How do you pass data to a child component?",
        "category": "React", "difficulty": "easy",
        "options": ["State", "Props", "Context", "Variables"], "correct_answer": "Props",
        "explanation": "Props (properties) are the mechanism for passing read-only data from parent to child components."
    },
    {
        "question_text": "What is the virtual DOM?",
        "category": "React", "difficulty": "medium",
        "options": ["A lightweight browser copy", "A fast in-memory representation of the real DOM", "A backend server structure", "An HTML template"], "correct_answer": "A fast in-memory representation of the real DOM",
        "explanation": "React uses the Virtual DOM to batch and optimize updates before applying them to the actual slower browser DOM."
    },
    {
        "question_text": "How do you lift state up in React?",
        "category": "React", "difficulty": "hard",
        "options": ["Use Redux exclusively", "Move the state to a common ancestor", "Use the useLift hook", "Export the state variable"], "correct_answer": "Move the state to a common ancestor",
        "explanation": "Lifting state up involves moving the state to the closest common parent of the components that need to share it."
    },
    {
        "question_text": "React components must return...",
        "category": "React", "difficulty": "easy",
        "options": ["An array of numbers", "A single JSX element or React Fragment", "Nothing", "Multiple separate HTML tags"], "correct_answer": "A single JSX element or React Fragment",
        "explanation": "React requires your functional return value to be wrapped in a single parent node, like a <div> or Fragment <>"
    },
    {
        "question_text": "Which React hook is used for subscribing to a Context?",
        "category": "React", "difficulty": "medium",
        "options": ["useContext", "useReducer", "useStore", "useSubscribe"], "correct_answer": "useContext",
        "explanation": "useContext accepts a React context object and returns its current value based on the nearest Provider."
    },
    {
        "question_text": "Why do React lists need a 'key' prop?",
        "category": "React", "difficulty": "hard",
        "options": ["To identify elements efficiently for rerenders", "For database security", "To style the elements", "To handle click events"], "correct_answer": "To identify elements efficiently for rerenders",
        "explanation": "Keys help React identify which items have changed, been added, or been removed, optimizing the Virtual DOM diffing."
    },
    {
        "question_text": "Can React run on the server?",
        "category": "React", "difficulty": "medium",
        "options": ["No, it requires a browser", "Yes, using Server-Side Rendering (SSR)", "Yes, using pure Python", "No, it's only a CSS framework"], "correct_answer": "Yes, using Server-Side Rendering (SSR)",
        "explanation": "React can render to HTML string on a Node.js server using frameworks like Next.js or ReactDOMServer."
    },

    # HTML CATEGORY
    {
        "question_text": "What does HTML stand for?",
        "category": "HTML", "difficulty": "easy",
        "options": ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Text Multi Language"], "correct_answer": "Hyper Text Markup Language",
        "explanation": "HTML is the standard markup language for creating Web pages."
    },
    {
        "question_text": "Which HTML element is used for the largest heading?",
        "category": "HTML", "difficulty": "easy",
        "options": ["<head>", "<h6>", "<h1>", "<heading>"], "correct_answer": "<h1>",
        "explanation": "<h1> defines the most important and generally largest heading on a page."
    },
    {
        "question_text": "What is the correct HTML element for inserting a line break?",
        "category": "HTML", "difficulty": "easy",
        "options": ["<br>", "<lb>", "<break>", "<hr>"], "correct_answer": "<br>",
        "explanation": "<br> inserts a single line break without starting a new paragraph."
    },
    {
        "question_text": "Which attribute specifies an alternate text for an image?",
        "category": "HTML", "difficulty": "medium",
        "options": ["title", "src", "alt", "longdesc"], "correct_answer": "alt",
        "explanation": "The required 'alt' attribute provides alternative information for an image if a user cannot view it."
    },
    {
        "question_text": "How can you make a numbered list?",
        "category": "HTML", "difficulty": "easy",
        "options": ["<ul>", "<ol>", "<list>", "<dl>"], "correct_answer": "<ol>",
        "explanation": "<ol> stands for 'ordered list' and uses numbers by default."
    },
    {
        "question_text": "Which HTML5 element is used to specify a footer for a document or section?",
        "category": "HTML", "difficulty": "medium",
        "options": ["<bottom>", "<footer>", "<section>", "<nav>"], "correct_answer": "<footer>",
        "explanation": "The <footer> element specifies a footer for its nearest ancestor sectioning content."
    },
    {
        "question_text": "In HTML, which attribute is used to specify that an input field must be filled out?",
        "category": "HTML", "difficulty": "medium",
        "options": ["validate", "formvalidate", "placeholder", "required"], "correct_answer": "required",
        "explanation": "The 'required' attribute specifies that an input field must not be empty before submission."
    },
    {
        "question_text": "What does the <iframe> HTML element do?",
        "category": "HTML", "difficulty": "hard",
        "options": ["Creates an invisible window", "Embeds another document within the current HTML document", "Creates an animated frame", "Stores localized data"], "correct_answer": "Embeds another document within the current HTML document",
        "explanation": "An inline frame (iframe) is used to embed another document within the current HTML document."
    },
    {
        "question_text": "Which is the correct HTML element for playing audio files?",
        "category": "HTML", "difficulty": "easy",
        "options": ["<sound>", "<mp3>", "<audio>", "<music>"], "correct_answer": "<audio>",
        "explanation": "HTML5 introduced the <audio> element to directly embed sound content in documents."
    },
    {
        "question_text": "What does the 'id' attribute do?",
        "category": "HTML", "difficulty": "medium",
        "options": ["Specifies a unique identifier for an element", "Assigns a class to an element", "Defines the stylesheet", "Initiates a javascript function"], "correct_answer": "Specifies a unique identifier for an element",
        "explanation": "The id attribute specifies a unique id for an HTML element (the value must be unique within the HTML document)."
    },

    # FASTAPI CATEGORY
    {
        "question_text": "What Python standard does FastAPI heavily rely on for data validation?",
        "category": "FastAPI", "difficulty": "medium",
        "options": ["Django ORM", "Marshmallow", "Pydantic", "Cerberus"], "correct_answer": "Pydantic",
        "explanation": "FastAPI leverages Pydantic for data validation, serialization, and automatic documentation based on Python type hints."
    },
    {
        "question_text": "Which web server is most commonly used to run FastAPI applications in production?",
        "category": "FastAPI", "difficulty": "hard",
        "options": ["Gunicorn", "Apache", "Uvicorn", "Waitress"], "correct_answer": "Uvicorn",
        "explanation": "Uvicorn is an ASGI web server implementation for Python heavily used with FastAPI for async performance."
    },
    {
        "question_text": "How do you declare a path parameter in a FastAPI route?",
        "category": "FastAPI", "difficulty": "easy",
        "options": ["Using curly braces {} in the path string", "Using the query string ?id=X", "Using the Request object", "Using an HTTP header"], "correct_answer": "Using curly braces {} in the path string",
        "explanation": "Path parameters are declared in the endpoint path using curly braces, e.g., @app.get('/items/{item_id}')."
    },
    {
        "question_text": "Which decorator creates a GET endpoint in FastAPI?",
        "category": "FastAPI", "difficulty": "easy",
        "options": ["@app.fetch", "@app.route(method='GET')", "@app.get", "@get"], "correct_answer": "@app.get",
        "explanation": "FastAPI uses operation decorators like @app.get(), @app.post(), etc."
    },
    {
        "question_text": "How does FastAPI automatically generate interactive API documentation?",
        "category": "FastAPI", "difficulty": "medium",
        "options": ["By scanning markdown files", "Using Swagger UI & ReDoc", "By using a separate node server", "It doesn't"], "correct_answer": "Using Swagger UI & ReDoc",
        "explanation": "FastAPI automatically generates comprehensive OpenAPI documentation using Swagger UI (at /docs) and ReDoc (at /redoc)."
    },
    {
        "question_text": "How do you read a JSON body in a POST request?",
        "category": "FastAPI", "difficulty": "medium",
        "options": ["request.body.json()", "Declare it as a Pydantic model parameter in the function", "Flask.request.json_", "Parse sys.stdin"], "correct_answer": "Declare it as a Pydantic model parameter in the function",
        "explanation": "By simply declaring a function parameter with a Pydantic schema type, FastAPI automatically parses, validates, and injects the JSON body."
    },
    {
        "question_text": "How is Dependency Injection usually implemented in a FastAPI route?",
        "category": "FastAPI", "difficulty": "hard",
        "options": ["Using the Depends() function in the parameters", "Through a global container", "Using Spring framework", "Via singleton classes"], "correct_answer": "Using the Depends() function in the parameters",
        "explanation": "FastAPI has a very powerful and intuitive built-in Dependency Injection system using the Depends() class in route parameters."
    },
    {
        "question_text": "What type hints are used to declare query parameters in FastAPI?",
        "category": "FastAPI", "difficulty": "medium",
        "options": ["Strictly string hints", "Standard Python functional type hints not included in the path", "Query objects only", "There are no query parameters"], "correct_answer": "Standard Python functional type hints not included in the path",
        "explanation": "Any function parameter declared that does not explicitly match a curly-braced `{path_parameter}` is automatically parsed as a query parameter."
    },
    {
        "question_text": "Is FastAPI synchronous or asynchronous?",
        "category": "FastAPI", "difficulty": "easy",
        "options": ["Purely synchronous", "Purely asynchronous", "It supports both natively", "Neither"], "correct_answer": "It supports both natively",
        "explanation": "FastAPI supports both synchronous `def` and asynchronous `async def` endpoints, running synch endpoints in an external threadpool."
    },
    {
        "question_text": "Who is the primary creator of FastAPI?",
        "category": "FastAPI", "difficulty": "hard",
        "options": ["Guido van Rossum", "Armin Ronacher", "Sebastián Ramírez", "Tom Preston-Werner"], "correct_answer": "Sebastián Ramírez",
        "explanation": "Sebastián Ramírez (tiangolo) is the creator and principle maintainer of FastAPI."
    },

    # POSTGRES CATEGORY
    {
        "question_text": "What type of database is PostgreSQL natively?",
        "category": "Postgres", "difficulty": "easy",
        "options": ["Document Store", "Object-Relational", "Key-Value Store", "Graph Database"], "correct_answer": "Object-Relational",
        "explanation": "PostgreSQL is a powerful, open source object-relational database system (ORDBMS)."
    },
    {
        "question_text": "Which data type is explicitly supported natively by Postgres for massive text searching?",
        "category": "Postgres", "difficulty": "hard",
        "options": ["tsvector", "Varchar(max)", "LongText", "TextBlob"], "correct_answer": "tsvector",
        "explanation": "Postgres uses tsvector (and tsquery) for highly optimized full-text search directly inside the database."
    },
    {
        "question_text": "What does ACID stand for in database systems like Postgres?",
        "category": "Postgres", "difficulty": "medium",
        "options": ["Atomicity, Consistency, Isolation, Durability", "Action, Constraint, Index, Delay", "Asynchronous, Consistent, Intelligent, Durable", "Atomic, Contextual, Identifiable, Direct"], "correct_answer": "Atomicity, Consistency, Isolation, Durability",
        "explanation": "ACID guarantees that database transactions are processed reliably, even in the event of errors."
    },
    {
        "question_text": "Which Postgres indexing mechanism is best used for multidimensional spatial data?",
        "category": "Postgres", "difficulty": "hard",
        "options": ["B-Tree", "Hash", "GiST", "BRIN"], "correct_answer": "GiST",
        "explanation": "GiST (Generalized Search Tree) indexes are heavily used for geographic data and complex geometric types."
    },
    {
        "question_text": "How do you drop a table in Postgres?",
        "category": "Postgres", "difficulty": "easy",
        "options": ["DELETE TABLE name;", "REMOVE TABLE name;", "DROP TABLE name;", "TRUNCATE table name;"], "correct_answer": "DROP TABLE name;",
        "explanation": "DROP TABLE entirely removes the table schema and data from the database."
    },
    {
        "question_text": "What does a Foreign Key do?",
        "category": "Postgres", "difficulty": "medium",
        "options": ["Encrypts a row", "Provides a globally unique UUID", "Enforces a link between data in two tables", "Allows external users to connect"], "correct_answer": "Enforces a link between data in two tables",
        "explanation": "A foreign key matches the primary key in another table, structurally enforcing referential integrity."
    },
    {
        "question_text": "Which SQL statement is used to completely empty a table while keeping its structure?",
        "category": "Postgres", "difficulty": "medium",
        "options": ["DROP", "TRUNCATE", "EMPTY", "CLEAR"], "correct_answer": "TRUNCATE",
        "explanation": "TRUNCATE quickly removes all rows from a set of tables with lower overhead than DELETE."
    },
    {
        "question_text": "Does Postgres natively support JSON data types?",
        "category": "Postgres", "difficulty": "easy",
        "options": ["Yes, using specific JSON and JSONB fields", "No, you must construct a string", "Yes, but only via extensions", "No, only XML is supported"], "correct_answer": "Yes, using specific JSON and JSONB fields",
        "explanation": "PostgreSQL has incredibly powerful native support for JSON and the binary optimized JSONB format."
    },
    {
        "question_text": "What command line tool is natively used to interact with a Postgres database?",
        "category": "Postgres", "difficulty": "easy",
        "options": ["mysql", "psql", "pgadmin", "pgcli"], "correct_answer": "psql",
        "explanation": "psql is the standard interactive terminal-based front-end to PostgreSQL."
    },
    {
        "question_text": "How do you typically handle auto-incrementing IDs in Postgres 10+ natively?",
        "category": "Postgres", "difficulty": "hard",
        "options": ["Use the IDENTITY column feature", "Rely entirely on triggers", "Generate UUIDs offline", "AUTO_INCREMENT keyword"], "correct_answer": "Use the IDENTITY column feature",
        "explanation": "Modern Postgres uses standard SQL `GENERATED ALWAYS AS IDENTITY` instead of the older `SERIAL`."
    }
]
