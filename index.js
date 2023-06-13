const express = require("express"),
    morgan = require("morgan"),
    fs = require("fs"),
    path = require("path");

const app = express();

let topMovies = [
    {
        title: "Nausicaä of the Valley of the Wind",
        director: "Hayao Miyazaki"
    },
    {
        title: "Princess Mononoke",
        director: "Hayao Miyazaki"
    },
    {
        title: "My Neighbor Totoro",
        director: "Hayao Miyazaki"
    },
    {
        title: "Spirited Away",
        director: "Hayao Miyazaki"
    },
    {
        title: "Howl's Moving Castle",
        director: "Hayao Miyazaki"
    },
    {
        title: "Kiki's Delivery Service",
        director: "Hayao Miyazaki"
    },
    {
        title: "Castle in the Sky",
        director: "Hayao Miyazaki"
    },
    {
        title: "Porco Rosso",
        director: "Hayao Miyazaki"
    },
    {
        title: "The Wind Rises",
        director: "Hayao Miyazaki"
    },
    {
        title: "The Cat Returns",
        director: "Hiroyuki Morita"
    },
    {
        title: "From Up on Poppy Hill",
        director: "Goro Miyazaki"
    },
    {
        title: "Tales from Earthsea",
        director: "Goro Miyazaki"
    },
    {
        title: "Whisper of the Heart",
        director: "Yoshifumi Kondō"
    },
    {
        title: "Pom Poko",
        director: "Isao Takahata"
    },
];

// const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), { flags: "a" });
// app.use(morgan("combined", { stream: accessLogStream }));

app.use(morgan("common"));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Welcome to my movie app!");
});

app.get("/documentation", (req, res) => {
    res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
    res.json(topMovies);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(8080, () => {
    console.log("Your app is listening on port 8080.")
});