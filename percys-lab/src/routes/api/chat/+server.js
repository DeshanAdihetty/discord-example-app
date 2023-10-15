
import * as fs from 'fs';
import fetch from 'node-fetch';
import OpenAI from "openai";
import  { toFile } from 'openai';
let dataset = ''

export const GET = async ({request}) =>{

    const openai = new OpenAI({apiKey: "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"});
//DO THIS FIRST


    // let data = JSON.parse(fs.readFileSync('chatTrain.jsonl', 'utf8',))
    
    // data.forEach((e) => {
       
    //     dataset = dataset.concat(JSON.stringify(e)+'\n')
    // });
    
    // await fs.writeFileSync('traindata.jsonl',dataset)
    // const file = fs.createReadStream('traindata.jsonl');

    // openai.files.create({ file: file, purpose: 'fine-tune' })
    //   .then(async (response) => {
    //     console.log(response);
       
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    



//THEN THIS
   
    //
    // const fineTune = await openai.fineTuning.jobs.create({ training_file: 'file-KaJ6D2vrnxUDtKlEvqWtmtPk', model: 'gpt-3.5-turbo', hyperparameters: {"n_epochs":5} })
    // let page = await openai.fineTuning.jobs.list({ limit: 10 });
    // console.log(page)
    
    let files = await openai.files.list()
    console.log(files)
    let id = []
//Delete All    
    // files.data.forEach((e)=>{id.push(e.id)
    // })
    // id.forEach((e)=>{openai.files.del(e)})
 return new Response("test", {status: 200})
}