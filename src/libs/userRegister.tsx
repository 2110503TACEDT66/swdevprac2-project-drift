export default async function userRegister(userName:string, userTel:string, userEmail:string , userPassword:string){

    const response = await fetch("https://swd-hotel-backend.vercel.app/api/v1/auth/register",{
        method:"POST",
        mode:"cors",
        cache:"no-cache",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name: userName,
            tel: userTel,
            email: userEmail,
            password: userPassword,
            role: "user"
        })
    })
    if(!response.ok) throw new Error("Can't register")
    return await response.json()
}