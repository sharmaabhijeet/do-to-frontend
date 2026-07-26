import { useState , useEffect } from 'react'
import axios from 'axios'


interface Joke {
  id: number;
  title: string;
  punchline: string;
}

function App() {
  const [jokes, setJokes] = useState<Joke[]>([]);

  useEffect(() => {
            axios.get('/api/jokes').then((respose) =>{
              setJokes(respose.data);
            }).catch((error) => {
              console.error('Error fetching jokes:', error);
            })
  });

  return (
    <>
       <h1>Jokes {jokes.length} </h1>
        <div>
           {
            jokes.map((joke) => (
              <div key={joke.id}>
                <h2>{joke.title}</h2>
                <p>{joke.punchline}</p>
              </div>
            ))
           }
        </div>
    </>
  )
}

export default App
