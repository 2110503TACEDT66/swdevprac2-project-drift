export default async function userLogIn(userEmail:string , userPassword:string){

    const response = await fetch("https://swd-hotel-backend.vercel.app/api/v1/auth/login",{
        method:"POST",
        mode:"cors",
        cache:"no-cache",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email:userEmail,
            password:userPassword
        })
    })
    if(!response.ok) throw new Error("Can't find user")
    return await response.json()
}