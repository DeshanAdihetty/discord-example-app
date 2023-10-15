import * as fs from 'fs';


export const GET = async ({request}) =>{
    const authHeader = request.headers.get("Authorization")
        try{
        let data = fs.readFileSync('catpics.json', 'utf8',)
        return new Response(data, {status: 200})
        }catch(err){
            return new Response(JSON.stringify(err), {status: 400})
        }
}


