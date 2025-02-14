const xhr = new XMLHttpRequest(); // XMLHttpRequest is a built-in class. And this code creates a new HTTP message/request to the backend.

xhr.addEventListener('load', () => {
  console.log(xhr.response); // to get the response in our code instead of in the network
});

// xhr.response = asynchronous code

xhr.open('GET', 'https://supersimplebackend.dev'); // to set up the request, GET = get some information from the backend, there are several common types of request we can give to the backend like POST, PUT, DELETE

// We can send requests to different url paths and we will get different responses from the backend. 

xhr.send(); 

/* 
What is backend?
= another computer that manages the data of a website.

How does our computer (frontend) send information to the backend?
= over the internet, using a message called HTTP (Hypertext Transfer Protocol)

URL = Uniform Resource Locator
- Like an address, but for the internet.

Request-Response Cycle = 1 request, 1 response

A backend only supports a certain set of URL paths. If we send a request to a URL path that is not supported, the backend will respond with an error. 

Whenever we get a response from the backend, the backend also gives as a status code which tells us if the request succeeded or failed.

Status code that starts with 4 or 5 (400, 404, 500) means the request failed. If it starts with 4 , it means it is our problem. If it starts with 5, it means it is the backend's problem.

A status code that starts with 2 (200, 201, 204) means the response was successful. 

SOme backends provide a documentation page that lists the url paths that are supported and also what kind of response they give. 

The list of all the URL paths that are supported is called the Backend API. 
API = application programming interface; all the ways we can interact with the backend

The backend can respond with different types of data. One type is text. 

Using the browser = making a Get request
*/