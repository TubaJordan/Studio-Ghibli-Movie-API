const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const mongoose = require("mongoose"); //added in the lesson example
const Models = require("./models.js"); //added in the lesson example


const app = express();


const Movies = Models.Movie; //added in the lesson example
const Users = Models.User; //added in the lesson example

mongoose.connect("mongodb://localhost:27017/jnDB", { useNewUrlParser: true, useUnifiedTopology: true }); //added in the lesson example...I think the issue might be in this statment? but am not sure. This seems like where the connection to the DB happens, so I would assume the issue is here?

// let users = [
//     {
//         id: 1,
//         name: "Jordan",
//         favoriteMovies: []
//     }
// ]

// let topMovies = [
//     {
//         "title": "Nausicaä of the Valley of the Wind",
//         "description": "Warrior and pacifist Princess Nausicaä desperately struggles to prevent two warring nations from destroying themselves and their dying planet.",
//         "genre": {
//             "name": "fantasy",
//             "description": "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
//         },
//         "director": {
//             "name": "Hayao Miyazaki",
//             "bio": "Hayao Miyazaki (宮崎 駿, Miyazaki Hayao, [mijaꜜzaki hajao]; born January 5, 1941) is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
//             "birth": 1941
//         },
//         "imageUrl": "https://m.media-amazon.com/images/I/81Ei2OKDSJL.jpg",
//         "featured": false
//     },
//     {
//         "title": "Princess Mononoke",
//         "description": "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony. In this quest he also meets San, the Mononoke Hime.",
//         "genre": {
//             "name": "fantasy",
//             "description": "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
//         },
//         "director": {
//             "name": "Hayao Miyazaki",
//             "bio": "Hayao Miyazaki (宮崎 駿, Miyazaki Hayao, [mijaꜜzaki hajao]; born January 5, 1941) is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
//             "birth": 1941.0
//         },
//         "imageUrl": "https://upload.wikimedia.org/wikipedia/en/8/8c/Princess_Mononoke_Japanese_poster.png",
//         "featured": false
//     },
//     {
//         "title": "My Neighbor Totoro",
//         "description": "When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby.",
//         "genre": {
//             "name": "fantasy",
//             "description": "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
//         },
//         "director": {
//             "name": "Hayao Miyazaki",
//             "bio": "Hayao Miyazaki (宮崎 駿, Miyazaki Hayao, [mijaꜜzaki hajao]; born January 5, 1941) is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
//             "birth": 1941.0
//         },
//         "imageUrl": "https://m.media-amazon.com/images/I/716yTFwaX3L._SY445_.jpg",
//         "featured": false
//     },
//     {
//         "title": "Spirited Away",
//         "description": "Spirited Away is a wondrous fantasy about a young girl, Chihiro, trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free herself and return her family to the outside world.",
//         "genre": {
//             "name": "fantasy",
//             "description": "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
//         },
//         "director": {
//             "name": "Hayao Miyazaki",
//             "bio": "Hayao Miyazaki (宮崎 駿, Miyazaki Hayao, [mijaꜜzaki hajao]; born January 5, 1941) is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
//             "birth": 1941.0
//         },
//         "imageUrl": "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
//         "featured": false
//     },
//     {
//         "title": "Howl's Moving Castle",
//         "description": "Sophie, a young milliner and eldest of three sisters, encounters a wizard named Howl on her way to visit her sister Lettie. Upon returning home, she meets the Witch of the Waste, who transforms her into a 90-year-old woman. Seeking to break the curse, Sophie leaves home and sets off through the countryside.",
//         "genre": {
//             "name": "fantasy",
//             "description": "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
//         },
//         "director": {
//             "name": "Hayao Miyazaki",
//             "bio": "Hayao Miyazaki (宮崎 駿, Miyazaki Hayao, [mijaꜜzaki hajao]; born January 5, 1941) is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
//             "birth": 1941.0
//         },
//         "imageUrl": "https://m.media-amazon.com/images/I/51ROjdVz1uL._SY445_.jpg",
//         "featured": false
//     },
//     {
//         "title": "Kiki's Delivery Service",
//         "description": "The story follows Kiki, a young witch who moves to a new town and uses her flying ability to earn a living",
//         "genre": {
//             "name": "adventure",
//             "description": "An adventure film is a form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films. Adventure films may also be combined with other film genres such as action, comedy, drama, fantasy, science fiction, family, horror, war, or the medium of animation."
//         },
//         "director": {
//             "name": "Hayao Miyazaki",
//             "bio": "Hayao Miyazaki (宮崎 駿, Miyazaki Hayao, [mijaꜜzaki hajao]; born January 5, 1941) is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
//             "birth": 1941.0
//         },
//         "imageUrl": "https://m.media-amazon.com/images/I/61urbL5Q4vL._SY445_.jpg",
//         "featured": false
//     },
//     {
//         "title": "Castle in the Sky",
//         "description": "Set in a fictional late 19th century, it follows the adventures of a boy and girl who are trying to keep a powerful crystal from the army, a group of secret agents, and a family of pirates, while searching for a legendary floating castle.",
//         "genre": {
//             "name": "fantasy",
//             "description": "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
//         },
//         "director": {
//             "name": "Hayao Miyazaki",
//             "bio": "Hayao Miyazaki (宮崎 駿, Miyazaki Hayao, [mijaꜜzaki hajao]; born January 5, 1941) is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
//             "birth": 1941.0
//         },
//         "imageUrl": "https://m.media-amazon.com/images/I/51LfPGcHqrL._SX300_SY300_QL70_FMwebp_.jpg",
//         "featured": false
//     },
//     {
//         "title": "Porco Rosso",
//         "description": "Set in a fictional late 19th century, it follows the adventures of a boy and girl who are trying to keep a powerful crystal from the army, a group of secret agents, and a family of pirates, while searching for a legendary floating castle.",
//         "genre": {
//             "name": "fantasy",
//             "description": "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
//         },
//         "director": {
//             "name": "Hayao Miyazaki",
//             "bio": "Hayao Miyazaki (宮崎 駿, Miyazaki Hayao, [mijaꜜzaki hajao]; born January 5, 1941) is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
//             "birth": 1941.0
//         },
//         "imageUrl": "https://m.media-amazon.com/images/I/61TdubxADNL._SX342_.jpg",
//         "featured": false
//     },
//     {
//         "title": "The Wind Rises",
//         "description": "The story is loosely based on the real life story of Jiro Horikoshi. He dreams of flying but, because he's nearsighted, decides to be a Japanese airplane designer. We observe his life from child to adulthood as he makes his dream plane and, in the process, falls in love with Naoko.",
//         "genre": {
//             "name": "war",
//             "description": "War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama. It has been strongly associated with the 20th century."
//         },
//         "director": {
//             "name": "Hayao Miyazaki",
//             "bio": "Hayao Miyazaki (宮崎 駿, Miyazaki Hayao, [mijaꜜzaki hajao]; born January 5, 1941) is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
//             "birth": 1941.0
//         },
//         "imageUrl": "https://m.media-amazon.com/images/I/91z1brPyVtL._AC_UY218_.jpg",
//         "featured": false
//     },
//     {
//         "title": "The Cat Returns",
//         "description": "After helping a cat, a seventeen-year-old girl finds herself involuntarily engaged to a cat Prince in a magical world where her only hope of freedom lies with a dapper cat statuette come to life.",
//         "genre": {
//             "name": "fantasy",
//             "description": "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
//         },
//         "director": {
//             "name": "Hiroyuki Morita",
//             "bio": "Hiroyuki Morita (森田 宏幸, Morita Hiroyuki, born June 26, 1964 in Fukuoka, Japan) is a Japanese animator and director. He is best known for working as director on the Studio Ghibli film The Cat Returns.",
//             "birth": 1964.0
//         },
//         "imageUrl": "https://m.media-amazon.com/images/I/51Y9GA5ZTPL._SX300_SY300_QL70_FMwebp_.jpg",
//         "featured": false
//     },
//     {
//         "title": "From Up on Poppy Hill",
//         "description": "From Up on Poppy Hill follows Umi, a young schoolgirl who runs her family's lodging house, where she lives with her grandmother and siblings while their mother is away in America. Umi's father died in the Korean War, and she raises flags every day from Poppy Hill as a memorial.",
//         "genre": {
//             "name": "romance",
//             "description": "Romance films involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters."
//         },
//         "director": {
//             "name": "Gorō Miyazaki",
//             "bio": "Gorō Miyazaki (宮崎 吾朗, Miyazaki Gorō, born January 21, 1967) is a Japanese landscape designer and film director of Studio Ghibli. He is also the managing director of the Foundation Tokuma Memorial Cultural Foundation for Animation. He is the son of lauded animator Hayao Miyazaki, who is one of the co-founders of the renowned animation company Studio Ghibli. Described as 'reluctant' to follow his father's career, Gorō initially worked as the CEO of Ghibli subsidiaries Museo Darte Ghibli, President of Mamma Auito Group and Nibariki, and a landscaper for many years before entering the film business. He has directed three films, Tales from Earthsea (2006), From Up on Poppy Hill (2011), and Earwig and the Witch (2020), the series Ronja, the Robber's Daughter (2014).",
//             "birth": 1967.0
//         },
//         "imageUrl": "https://m.media-amazon.com/images/I/51o+HVdOf8L._SY300_.jpg",
//         "featured": false
//     },
//     {
//         "title": "Tales from Earthsea",
//         "description": "In a mythical land, a man and a young boy investigate a series of unusual occurrences.",
//         "genre": {
//             "name": "fantasy",
//             "description": "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
//         },
//         "director": {
//             "name": "Gorō Miyazaki",
//             "bio": "Gorō Miyazaki (宮崎 吾朗, Miyazaki Gorō, born January 21, 1967) is a Japanese landscape designer and film director of Studio Ghibli. He is also the managing director of the Foundation Tokuma Memorial Cultural Foundation for Animation. He is the son of lauded animator Hayao Miyazaki, who is one of the co-founders of the renowned animation company Studio Ghibli. Described as 'reluctant' to follow his father's career, Gorō initially worked as the CEO of Ghibli subsidiaries Museo Darte Ghibli, President of Mamma Auito Group and Nibariki, and a landscaper for many years before entering the film business. He has directed three films, Tales from Earthsea (2006), From Up on Poppy Hill (2011), and Earwig and the Witch (2020), the series Ronja, the Robber's Daughter (2014).",
//             "birth": 1967.0
//         },
//         "imageUrl": "https://m.media-amazon.com/images/I/51ctK4I3Y7L._SX300_SY300_QL70_FMwebp_.jpg",
//         "featured": false
//     },
//     {
//         "title": "Whisper of the Heart",
//         "description": "A love story between a girl who loves reading books, and a boy who has previously checked out all of the library books she chooses. 14-year-old teenage bookworm Shizuku lives a simple life, dominated by her love for stories and writing.",
//         "genre": {
//             "name": "romance",
//             "description": "Romance films involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters."
//         },
//         "director": {
//             "name": "Yoshifumi Kondō",
//             "bio": "Yoshifumi Kondō (近藤 喜文, Kondō Yoshifumi, March 31, 1950 to January 21, 1998) was a Japanese animator who worked for Studio Ghibli in his last years. He was born in Gosen, Niigata Prefecture, Japan. He worked as an animation director on Anne of Green Gables, Sherlock Hound, Kiki's Delivery Service, Only Yesterday and Princess Mononoke. Kondō directed the animated film Whisper of the Heart, and was expected to become one of the top directors at Studio Ghibli, alongside Hayao Miyazaki and Isao Takahata, and to become their eventual successor. Kondō died of aortic dissection in 1998.",
//             "birth": 1950.0
//         },
//         "imageUrl": "https://m.media-amazon.com/images/I/51OIBFKGVZL._SX300_SY300_QL70_FMwebp_.jpg",
//         "featured": false
//     },
//     {
//         "title": "Pom Poko",
//         "description": "A community of magical shape-shifting raccoon dogs struggle to prevent their forest home from being destroyed by urban development.",
//         "genre": {
//             "name": "fantasy",
//             "description": "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
//         },
//         "director": {
//             "name": "Isao Takahata",
//             "bio": "Isao Takahata (高畑 勲, Takahata Isao, October 29, 1935 to April 5, 2018) was a Japanese director, screenwriter and producer. A co-founder of Studio Ghibli, he earned international critical acclaim for his work as a director of Japanese animated feature films. Born in Ujiyamada, Mie Prefecture, Takahata joined Toei Animation after graduating from the University of Tokyo in 1959. He worked as an assistant director, holding various positions over the years and collaborating with colleague Hayao Miyazaki, eventually directing his own film, The Great Adventure of Horus, Prince of the Sun (1968). He continued his partnership with Miyazaki, and under Nippon Animation directed the television series Heidi, Girl of the Alps (1974), 3000 Leagues in Search of Mother (1976), and Anne of Green Gables (1979). Takahata, Miyazaki and others formed Studio Ghibli in 1985, where he would direct Grave of the Fireflies (1988), Only Yesterday (1991), Pom Poko (1994), and My Neighbors the Yamadas (1999). His last film as director was The Tale of the Princess Kaguya (2013), which was nominated for an Oscar in the category of Best Animated Feature Film at the 87th Academy Awards.",
//             "birth": 1935.0
//         },
//         "imageUrl": "https://m.media-amazon.com/images/I/51HNZD5N7NL._SY445_.jpg",
//         "featured": false
//     }
// ];

// const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), { flags: "a" });
// app.use(morgan("combined", { stream: accessLogStream }));

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //added in the lesson example
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Welcome to my movie app!");
});

app.get("/documentation", (req, res) => {
    res.sendFile("public/documentation.html", { root: __dirname });
});


// CREATE - Allow new users to register
// app.post("/users", (req, res) => {
//     const newUser = req.body;

//     if (newUser.name) {
//         newUser.id = uuid.v4();
//         users.push(newUser);
//         res.status(201).json(newUser);
//     } else {
//         res.status(400).send("Users must have a name");
//     }
// });
// This is from the in-memory version

app.post("/users", (req, res) => {
    Users.findOne({ Name: req.body.Name })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Name + "already exists");
            } else {
                Users
                    .create({
                        Name: req.body.Name,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        BirthDate: req.body.BirthDate
                    })
                    .then((user) => { res.status(201).json(user) })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send("Error: " + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
        });
});
// This is the new version that was from the example, and the rest of the examples are not typed in here, but here is where the exampe to run in Postman is the lesson.


// READ - Return a list of ALL movies to the user
app.get("/movies", (req, res) => {
    res.status(200).json(topMovies);
});

// READ - Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get("/movies/:title", (req, res) => {
    const { title } = req.params;
    const movie = topMovies.find(movie => movie.title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send("No movie by that title exists in the database");
    }
});

// READ - Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get("/movies/genre/:genreName", (req, res) => {
    const { genreName } = req.params;
    console.log(genreName);
    const genre = topMovies.find(movie => movie.genre.name === genreName).genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send("No genre of that type exists in the database");
    }
});

// READ - Return data about a director (bio, birth year, death year) by name
app.get("/movies/director/:directorName", (req, res) => {
    const { directorName } = req.params;
    const director = topMovies.find(movie => movie.director.name === directorName).director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send("No director by that name exists in the database");
    }
});

// UPDATE - Allow users to update their user info (username)
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send("No user by that ID exists in the database")
    }
});

// UPDATE/POST - Allow users to add a movie to their list of favorites
app.post("/users/:id/:movieTitle", (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to ${user.name}'s favorite movies!`);
    } else {
        res.status(400).send("No user by that ID exists in the database")
    }
});

//DELETE - Allow users to remove a movie from their list of favorites
app.delete("/users/:id/:movieTitle", (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from ${user.name}'s favorite movies.`);
    } else {
        res.status(400).send("No user by that ID exists in the database")
    }
});

//DELETE - Allow existing users to deregister
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send(`${user.name} has been successfully removed from the database.`);
    } else {
        res.status(400).send("No user by that ID exists in the database")
    }
});


app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(8080, () => {
    console.log("Your app is listening on port 8080.")
});