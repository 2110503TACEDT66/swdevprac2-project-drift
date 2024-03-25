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
    if(!response.ok){ throw new Error("You have entered an invalid username or password")}
    return await response.json()
}