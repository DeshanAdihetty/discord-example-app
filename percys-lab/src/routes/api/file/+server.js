import * as fs from 'fs';


export const GET = async ({request}) =>{
    const authHeader = request.headers.get("Authorization")
        try{
        let data = fs.readFileSync('chatTrain.jsonl', 'utf8',)
        return new Response(data, {status: 200})
        }catch(err){
            return new Response(JSON.stringify(err), {status: 400})
        }
}

export const POST = async ({request}) =>{
    const authHeader = request.headers.get("Authorization")
    if(authHeader!="Abnormal"){
    return new Response(JSON.stringify({message: "Not authorised"}), {status: 401})
    }
    else{
       
        const response = await request.text()
        let data = JSON.parse(response)
       
        fs.writeFile('chatTrain.jsonl',JSON.stringify(data.displayData), ((err)=>{
            return new Response(JSON.stringify(err), {status: 401})
        })
        )
        

        }
    
        
          
        return new Response(JSON.stringify({message: "Success"}), {status: 200})
    }
