export async function getCategories(){
    try{
       const query = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/categories`)
       const categories = await query.json()
       console.log(`${process.env.NEXT_PUBLIC_API_HOST}/categories/`, categories) 
       return categories
    }catch (error) {
        console.log(error)
    }
} 