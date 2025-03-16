const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 0.2,
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
        { text: "Generate a JSON response for a course with the following fields:\n  - \"Course Name\": (string) The name of the course.\n  - \"Description\": (string) A brief summary of the course.\n  - \"Category\": (string) The course category.\n  - \"Topic\": (string) The course topic.\n  - \"Level\": (string) Beginner, Intermediate, or Advanced.\n  - \"Duration\": (string) Total duration of the course.\n  - \"NoOfChapters\": (integer) Number of chapters.\n  - \"Chapters\": (array) Each chapter must include:\n    - \"Chapter Name\" (string) (strictly in this format)\n    - \"about\" (string) A brief description of the chapter.\n    - \"Duration\" (string) Time required for the chapter.\n  \n  The response **must be in strict JSON format** with no additional text or explanations." },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"Course Name\": \"Introduction to Python Programming\",\n  \"Description\": \"A beginner-friendly course covering the fundamentals of Python programming.\",\n  \"Category\": \"Programming\",\n  \"Topic\": \"Python\",\n  \"Level\": \"Beginner\",\n  \"Duration\": \"12 hours\",\n  \"NoOfChapters\": 5,\n  \"Chapters\": [\n    {\n      \"Chapter Name\": \"Chapter 1: Introduction to Python\",\n      \"about\": \"Learn the basics of Python and set up your development environment.\",\n      \"Duration\": \"2 hours\"\n    },\n    {\n      \"Chapter Name\": \"Chapter 2: Data Types and Variables\",\n      \"about\": \"Explore different data types and learn how to work with variables.\",\n      \"Duration\": \"2.5 hours\"\n    },\n    {\n      \"Chapter Name\": \"Chapter 3: Operators and Expressions\",\n      \"about\": \"Understand operators, expressions, and control flow statements.\",\n      \"Duration\": \"2.5 hours\"\n    },\n    {\n      \"Chapter Name\": \"Chapter 4: Functions and Modules\",\n      \"about\": \"Learn how to define functions and use modules in Python.\",\n      \"Duration\": \"3 hours\"\n    },\n    {\n      \"Chapter Name\": \"Chapter 5: Working with Lists and Dictionaries\",\n      \"about\": \"Explore lists and dictionaries, and learn how to manipulate them.\",\n      \"Duration\": \"2 hours\"\n    }\n  ]\n}\n```" },
      ],
    },
    {
      role: "user",
      parts: [
        { text: "Generate a JSON response for a course with the following fields:\n  - \"Course Name\": (string) The name of the course.\n  - \"Description\": (string) A brief summary of the course.\n  - \"Category\": (string) The course category.\n  - \"Topic\": (string) The course topic.\n  - \"Level\": (string) Beginner, Intermediate, or Advanced.\n  - \"Duration\": (string) Total duration of the course.\n  - \"NoOfChapters\": (integer) Number of chapters.\n  - \"Chapters\": (array) Each chapter must include:\n    - \"Chapter Name\" (string) (strictly in this format)\n    - \"about\" (string) A brief description of the chapter.\n    - \"Duration\" (string) Time required for the chapter.\n  \n  The response **must be in strict JSON format** with no additional text or explanations." },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"Course Name\": \"Advanced Machine Learning Techniques\",\n  \"Description\": \"A deep dive into advanced machine learning algorithms and their applications.\",\n  \"Category\": \"Data Science\",\n  \"Topic\": \"Machine Learning\",\n  \"Level\": \"Advanced\",\n  \"Duration\": \"30 hours\",\n  \"NoOfChapters\": 7,\n  \"Chapters\": [\n    {\n      \"Chapter Name\": \"Chapter 1: Ensemble Methods\",\n      \"about\": \"Exploring techniques like bagging, boosting, and stacking for improved model performance.\",\n      \"Duration\": \"4 hours\"\n    },\n    {\n      \"Chapter Name\": \"Chapter 2: Deep Neural Networks\",\n      \"about\": \"In-depth study of convolutional neural networks (CNNs) and recurrent neural networks (RNNs).\",\n      \"Duration\": \"5 hours\"\n    },\n    {\n      \"Chapter Name\": \"Chapter 3: Generative Adversarial Networks (GANs)\",\n      \"about\": \"Understanding GAN architectures and their applications in image generation and data augmentation.\",\n      \"Duration\": \"4 hours\"\n    },\n    {\n      \"Chapter Name\": \"Chapter 4: Reinforcement Learning\",\n      \"about\": \"Introduction to reinforcement learning concepts, algorithms, and environments.\",\n      \"Duration\": \"4 hours\"\n    },\n    {\n      \"Chapter Name\": \"Chapter 5: Natural Language Processing (NLP)\",\n      \"about\": \"Advanced NLP techniques including transformers and sequence-to-sequence models.\",\n      \"Duration\": \"4 hours\"\n    },\n    {\n      \"Chapter Name\": \"Chapter 6: Time Series Analysis\",\n      \"about\": \"Advanced time series modeling techniques and forecasting methods.\",\n      \"Duration\": \"5 hours\"\n    },\n    {\n      \"Chapter Name\": \"Chapter 7: Model Deployment and Monitoring\",\n      \"about\": \"Strategies for deploying machine learning models and monitoring their performance in production.\",\n      \"Duration\": \"4 hours\"\n    }\n  ]\n}\n```" },
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