export default async function getUserProfile(token:string) {
     const response = await fetch("https://swd-hotel-backend.vercel.app/api/v1/auth/me",{
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`   
        },
     })
     if(!response.ok) throw new Error("Cannot GET userProfile")
     return response.json()
 
}