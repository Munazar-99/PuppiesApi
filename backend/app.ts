import express from 'express';
import cors from 'cors'
import { Request, Response, Application } from 'express';
import {puppies} from './data/database'

const app: Application = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));

app.get('/puppies', (_req: Request, res: Response) => {
  return res.status(200).json(puppies);
});
app.get('/puppies/:id', (_req: Request, res: Response) => {
  const puppyId = _req.params.id;
  const requestedPuppy = puppies.find(puppy => puppy.id ===Number(puppyId))
  return res.status(200).json(requestedPuppy);
});
app.post('/puppies', (req: Request, res: Response) => {
  const {name, breed, DOB}: { name: string; breed: string; DOB:string } = req.body;
  const newPuppy ={
    id: Date.now(),
    name: name,
    breed: breed,
    DOB: DOB
  }
  puppies.push(newPuppy);
  return res.status(200).send(puppies);
});
app.put('/api/puppies/:id', (req: Request, res: Response) => {
  const puppyId = req.params.id;
  const requestedPuppyId = puppies.findIndex(puppy => puppy.id ===Number(puppyId))
  const {name, breed, DOB}: { name: string; breed: string; DOB:string } = req.body;
  console.log(requestedPuppyId)
  if( requestedPuppyId >= 0 && name && breed && DOB) {
    console.log('hi')
    puppies[requestedPuppyId]!.name =  name;
    puppies[requestedPuppyId]!.breed = breed;
    puppies[requestedPuppyId]!.DOB = DOB;
  }
  return res.status(200).json(puppies);
});
app.delete('/api/puppies/:id', (_req: Request, res: Response) => {
  const puppyId = _req.params.id;
  const requestedPuppy = puppies.filter(puppy => puppy.id !==Number(puppyId))
  return res.status(200).json(requestedPuppy);
});

export default app;
