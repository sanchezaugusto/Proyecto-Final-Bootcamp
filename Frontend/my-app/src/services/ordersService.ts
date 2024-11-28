export async function getTotalSold(salerId: string) {
    try{
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/orders/totalSold/673d10ec57366646c59afbb8`)
        const response = await request.json()
        return response
    }catch(error){
        console.log(error)
    }    
}

export async function getAmountByProductsSold(salerId: string) {
    try{
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/orders/amountProductsSold/673d10ec57366646c59afbb8`)
        const response = await request.json()
        return response
    }catch(error){
        console.log(error)
    }    
}