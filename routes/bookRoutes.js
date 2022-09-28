const router = require("express").Router();

const Book = require("../models/Book");

//Insere um livro
router.post("/", async (req, res) => {
    const { name, writer, categories, price } = req.body;

    if (!name) {
        res.status(422).json({ error: "Necessario nome do livro!" });
        return;
    }
    if (!writer) {
        res.status(422).json({ error: "Necessario nome do escritor!" });
        return;
    }
    if (!categories) {
        res.status(422).json({ error: "Necessario categorias!" });
        return;
    }
    if (!price) {
        res.status(422).json({ error: "Necessario um preco!" });
        return;
    }

    const book = {
        name,
        writer,
        categories,
        price,
    };

    try {
        await Book.create(book);

        res.status(200).json({ message: "Livro inserido com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

//Retorna todos os livros
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

//Retorna o livro com id correspondente
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const book = await Book.findOne({ _id: id });

        if (!book) {
            res.status(422).json({ message: "O livro não foi encontrado!" });
            return;
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

//Retorna os livros por escritor

router.get("/forwriter/:writer", async (req, res) => {
    const writer = req.params.writer;

    try {
        const books = await Book.find({ writer: writer });

        if (!books) {
            res.status(422).json({ message: "O escritor não foi encontrado" });
            return;
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

//Retorna os livros por categoria

router.get("/forcategorie/:categorie", async (req, res) => {
    const categorie = req.params.categorie;

    try {
        const books = await Book.find({ categories: categorie });

        if (!books) {
            res.status(422).json({
                message: "Nenhum livro com essa categoria foi encontrado",
            });
            return;
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

//Retorna os livros abaixo do preço indicado

router.get("/forprice/:price", async (req, res) => {
    const priceSet = req.params.price;

    try {
        const books = await Book.find();

        let bookSaves = [];

        for (let i = 0; i < books.length; i++) {
            if (books[i].price <= priceSet) {
                bookSaves.push(books[i]);
            }
        }

        if (bookSaves == []) {
            res.status(422).json({
                message:
                    "Nenhum livro com o preço inferior ou igual ao indicado foi encontrado",
            });
            return;
        }

        res.status(200).json(bookSaves);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

//Deleta um livro pelo id
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const book = await Book.findOne({ _id: id });

    if (!book) {
        res.status(422).json({ message: "O livro não foi encontrado!" });
        return;
    }
    try {
        await Book.deleteOne({ _id: id });

        res.status(200).json({ message: "Livro excluido" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

//Atualiza um livro
router.patch("/:id", async (req, res) => {
    const id = req.params.id;

    const { name, writer, categories, price } = req.body;

    const book = {
        name,
        writer,
        categories,
        price,
    };

    try {
        const updatedBook = await Book.updateOne({ _id: id }, book);

        if (updatedBook.matchedCount == 0) {
            res.status(422).json({ message: "O livro não foi encontrado" });
            return;
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
