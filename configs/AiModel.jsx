const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


export const GenerateCourseLayout_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Generate A Course Tutorial on Following\nDetail With field as  Course Name, Description,\nAlong with Chapter Name, about, Duration:\nCategory: 'Programming', Topic: Python,\nLevel:Basic, Duration:l hours, NoOf\nChapters:5 , in JSON format" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"Course Name\": \"Python Programming Fundamentals\",\n  \"Description\": \"This course provides a foundational understanding of Python programming, covering essential concepts and practical skills for beginners. Learn to write clean, efficient code and build simple applications.\",\n  \"Category\": \"Programming\",\n  \"Topic\": \"Python\",\n  \"Level\": \"Basic\",\n  \"Duration\": \"5 hours\",\n  \"NoOfChapters\": 5,\n  \"Chapters\": [\n    {\n      \"Chapter Name\": \"Introduction to Python and Setup\",\n      \"about\": \"This chapter introduces you to the world of Python, explaining its uses and advantages. You'll learn how to install Python and set up your development environment.\",\n      \"Duration\": \"1 hour\"\n     },\n    {\n      \"Chapter Name\": \"Data Types and Variables\",\n      \"about\": \"Explore the core data types in Python (integers, floats, strings, booleans) and how to declare and use variables. You'll also learn about operators for performing basic calculations.\",\n      \"Duration\": \"1 hour\"\n    },\n     {\n      \"Chapter Name\": \"Control Flow: Conditional Statements\",\n      \"about\": \"Master the art of controlling the flow of your programs using conditional statements (if, elif, else). Learn to make your code execute different blocks based on various conditions.\",\n      \"Duration\": \"1 hour\"\n    },\n    {\n      \"Chapter Name\": \"Control Flow: Loops\",\n       \"about\": \"Discover the power of loops (for and while) to repeat tasks efficiently. You'll learn how to iterate through sequences and perform actions multiple times.\",\n       \"Duration\": \"1 hour\"\n    },\n     {\n       \"Chapter Name\": \"Introduction to Functions\",\n       \"about\": \"Learn about functions, a fundamental building block in programming. You'll learn how to create and use functions to organize code into reusable blocks.\",\n        \"Duration\":\"1 hour\"\n     }\n\n  ]\n}\n```\n" },
      ],
    },
  ],
});


export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Explain the concept in Detail on Topic: Python Basic, Chapter:Variables and Data Types, in JSON Format with list of array with field as title, explanation on given chapter in detail , Code Example(Code field in <precode> format )if applicable" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"chapterTitle\": \"Variables and Data Types in Python\",\n  \"sections\": [\n    {\n      \"title\": \"What are Variables?\",\n      \"explanation\": \"In Python, a variable is a named storage location that holds a value.  Think of it as a container that you can use to store data.  You assign a value to a variable using the assignment operator (=).  Python is dynamically typed, meaning you don't need to explicitly declare the type of a variable; Python infers the type based on the value assigned.\",\n      \"codeExample\": \"<precode>name = \\\"Alice\\\"  # String variable\\nage = 30      # Integer variable\\nheight = 5.8   # Float variable\\nis_student = True # Boolean variable</precode>\"\n    },\n    {\n      \"title\": \"Data Types\",\n      \"explanation\": \"Python supports several built-in data types.  The most common ones are:\\n\\n* **Integers (int):** Whole numbers (e.g., 10, -5, 0).\\n* **Floating-point numbers (float):** Numbers with decimal points (e.g., 3.14, -2.5, 0.0).\\n* **Strings (str):** Sequences of characters enclosed in single (' ') or double (\\\" \\\") quotes (e.g., 'Hello', \\\"Python\\\").\\n* **Booleans (bool):** Represent truth values; either True or False.\\n* **NoneType (None):** Represents the absence of a value.\",\n      \"codeExample\": \"<precode>x = 10       # int\\ny = 3.14159  # float\\nz = \\\"Hello\\\"  # str\\nb = True      # bool\\nc = None      # NoneType\\n\\nprint(type(x)) # Output: <class 'int'>\\nprint(type(y)) # Output: <class 'float'>\\nprint(type(z)) # Output: <class 'str'>\\nprint(type(b)) # Output: <class 'bool'>\\nprint(type(c)) # Output: <class 'NoneType'></precode>\"\n    },\n    {\n      \"title\": \"Variable Naming Conventions\",\n      \"explanation\": \"Follow these rules and guidelines when naming variables:\\n\\n* Variable names must start with a letter (a-z, A-Z) or an underscore (_).\\n* They can contain letters, numbers, and underscores.\\n* They are case-sensitive (e.g., myVariable is different from myvariable).\\n* Use descriptive names to improve code readability (e.g., use `student_age` instead of `x`).\\n* Avoid using reserved keywords as variable names (e.g., if, else, for, while, etc.).\",\n      \"codeExample\": \"<precode>valid_variable = 10\\n_private_var = 20  # Often used for internal variables\\nmy_counter = 0\\n# Invalid variable names:\\n# 1st_variable  (Starts with a number)\\n# my-variable   (Contains a hyphen)\\n# for           (Reserved keyword)</precode>\"\n    },\n    {\n      \"title\": \"Type Conversion\",\n      \"explanation\": \"You can convert a variable from one data type to another using type casting functions like `int()`, `float()`, `str()`, and `bool()`.  However, not all conversions are possible (e.g., converting a string like 'abc' to an integer will result in an error).\",\n      \"codeExample\": \"<precode>age_str = \\\"30\\\"\\nage_int = int(age_str)  # Convert string to integer\\nprint(age_int + 5)       # Output: 35\\n\\nprice = 19.99\\nprice_str = str(price)  # Convert float to string\\nprint(\\\"The price is: \\\" + price_str) # Output: The price is: 19.99</precode>\"\n    },\n    {\n      \"title\": \"Variable Assignment and Reassignment\",\n      \"explanation\": \"You can assign a value to a variable using the `=` operator.  You can also reassign a new value to an existing variable later in your code. Python will automatically update the variable's value and type if needed.\",\n      \"codeExample\": \"<precode>x = 10\\nprint(x)  # Output: 10\\nx = \\\"hello\\\" \\nprint(x)  # Output: hello\\nx = True\\nprint(x) # Output: True</precode>\"\n    }\n  ]\n}\n```\n" },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());


// Explain the concept in Detail on Topic: Python Basic, Chapter:Variables and Data Types, in JSON Format with list of array with field as title, explanation on given
// chapter in detail , Code Example(Code field in <precode> format )if applicable