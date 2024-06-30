const express = require('express');
const path = require('path');
const { title } = require('process');
const app = express();
const arr = [{ id:1 ,fname:"bef"},{ id:2 ,fname:"ubuebf"}]
// const logger = require('morgan');
// app.use(logger('common'))
app.use(express.json());

// Initialize books array
let books = [
    {id: 1, title: "book 1", author: "Author 1"},
    {id: 2, title: "book 2", author: "Author 2"}
];

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/books', (req, res) => {
    const newBook = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedBook = req.body;
    const index = books.findIndex(book => book.id === id); // Use findIndex() instead of find()
    if (index !== -1) { // Check if index is found
        books[index] = {...books[index], ...updatedBook};
        res.json(books[index]);
    } else {
        res.status(404).json({error: "Book not found"});
    }
});

app.delete('/books/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === id);
    if(index !== -1){
        const deletedBook = books[index];
        books.splice(index,1);
        res.json(deletedBook);
    }else{
        res.status(404).json({error: "Book not found"});
    }
})

app.listen(3000, () => {
    console.log("listening on 3000");
});


// app.use(express.static('public'));
// app.use(express.urlencoded({extented: false}));
// app.get('/books',(req,res) => {
//     res.json(books)
// })
// app.post('/books',(req,res) => {
//     const newbook = {
//         id:books.length + 1,
//         title: req.body.title,
//         author: req.body.author
//     }
//     books.push(newbook);
//     res.status(201).json(newbook);
// })

// const logger = (req,res,next) => {
    //     console.log(`${new Date()} , Request[${req.method}], [${req.url}]`);
    //     next();
    // }
    
    // app.use('/about',logger);

// app.get('/api/v1/query',(req,res) => {
//     console.log(req.query);
//     let a = [...arr];
//     const {search} = req.query;
//     if(search){
//         a = a.filter(product => product.fname.startsWith(search));
//     }
//     res.json(a);
//     console.log(arr,"\n",a);
//     res.send("hi");
// })


// app.get('/:id', (req,res) => {
//     const {id} = req.params
//     const current = arr.find(data => data.id === Number(id))
//     if(current){
//         res.json(current);
//     }else{
//         res.send("product not found");
//     }
// })

// app.get('/', (req,res) => {
//     res.json([{fnam:"bef"},{lname:"ubuebf"}]);
// })
// app.get('/',(req,res) => {
    //     res.send("hello everyone");
    // })
    // app.get('/package',(req,res) => {
    //     res.sendFile(path.join(__dirname,'package.json'));
        
    // }) 
    
    // app.all('*',(req,res) => {
    //     res.send("dont found")
    // })

    // app.use(express.static('tic tac toe'))
// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname,'tic tac toe','index.html'))
// })