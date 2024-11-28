export async function getTotalSold(salerId: string) {
    try{
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/orders/totalSold/${salerId}`)
        const response = await request.json()
        return response
    }catch(error){
        console.log(error)
    }    
}

export async function getAmountByProductsSold(salerId: string) {
    try{
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/orders/amountProductsSold/${salerId}`)
        const response = await request.json()
        return response
    }catch(error){
        console.log(error)
    }    
}