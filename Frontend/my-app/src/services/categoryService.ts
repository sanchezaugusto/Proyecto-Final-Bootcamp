export async function getCategories(){
    try{
       const query = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/categories`)
       const categories = await query.json()
       return categories
    }catch (error) {
        console.log(error)
    }
} 