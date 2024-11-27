interface Filters{
    category_id?: string,
    filterByPrice?: string,
    priceRange?: string,
    subCategory_id?: string,
    keyword?: string
}

export async function getProducts(filters: Filters){
    try{
       const params = new URLSearchParams(filters)
       console.log(params.toString(), filters.priceRange)
       const query = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/products?${params.toString()}`, {
        method: "GET"
       })
       const products = await query.json()
       return products
    }catch (error) {
        console.log(error)
    }
} 