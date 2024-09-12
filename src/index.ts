import express,{Request, Response} from "express";
import path from "path";

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));



app.get('/', async function (request:Request, response: Response) {

    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
        const data = await res.json()

        response.render('index', data)
    } catch (err) {
        console.log('ocorreu um erro inesperado', err)
        response.status(500).send("Error fetching data")
    }
});


app.get('/:id',async function (request:Request, response: Response) {
    const idPoke:string = request.params.id

    if(idPoke === null){
        return response.status(400).send("Invalid Pokémon ID");
    }
    
    
    try {
        
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPoke}`)
        const data = await res.json()
    
        response.render('each', {data: data})
    } catch (error) {
        console.log('ocorreu um erro inesperado', error)
        response.status(500).send("Error fetching data")
    }
})


app.listen(3000, function () {
    console.log("Server is running");
})