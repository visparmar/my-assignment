"use client"
import React, { useState,useContext } from 'react'
import {UserContext} from '../../context/UserContext'
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
const CreateUser = () => {
    const [loading,setLoading]=useState(false);
   const {user}=useContext(UserContext)
   const router = useRouter();
    const [error,setError]=useState({})
    const [userdetail,setUserDetail]=useState( 
        user || {
        Name:'',
        Interest:'',
        Age:'',
        Mobile:'',
        Email:''
    });
    const handleInputChange=(e)=>{
        const {id,value}=e.target;
       setUserDetail({
        ...userdetail,
        [id]:value
       })
    }

    const handleValidation = () =>{
        // for name validation
        if(!userdetail.Name.length){
            setError({nameError:'Name must be filled'})  
            return false ;
        }

        // for interest validation
        if(!userdetail.Interest.length){
            setError({interestError:'Interest must be filled'})  
            return false;
        }

        //for Age validation
        if(!Number(userdetail.Age) && (Number(userdetail.Age) < 18 || Number(userdetail.Age) > 80)){
            setError({ageError:'Age Must be Between 18 to 80'})  
            return false;
        }
        // for Mobile Number validation
        if(String(userdetail.Mobile).length!=10){
            setError({mobileError:'Mobile Number must be 10 digit long'});
            return false;
        }

        // for Email Validation
        if(!userdetail.Email){
            setError({emailError:'email is Mandatory'}) 
            return false;
        }
        else if(!userdetail.Email || 
            userdetail.Email.split('@').length!=2 || 
            !userdetail.Email.split('@')[0] || 
            !userdetail.Email.split('@')[1] || 
            !userdetail.Email.split('@')[1].includes('.') ||
            userdetail.Email.split('@')[1].startsWith('.')
        ){
            setError({emailError:'Please Filled Valid Email'}) 
            return false;
        }
         return true;
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();

        // empty the previous Error
        setError({})
        try {
            setLoading(true)
            if( handleValidation()){
                const res = await fetch("/api/users", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userdetail), 
                  });
                  const result = await res.json();
                  toast(result.message)
               }
        } catch (error) {
            toast.error("Something went Wrong")
        }finally{
            setLoading(false)
        }
       
        
    }

    const handleUpdate = async () => {
        setError({})
        if(handleValidation()){
            const res = await fetch("/api/users", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userdetail), 
              });
              const result = await res.json();
                 console.log(result,"lop")
                 toast(result.message)
        }else{
            console.log(userdetail,"M3")
        }
    }
    const handleRedirect = () => {
        router.push('/user-list');

    }
  return (
    <div className='w-full  h-screen flex justify-center items-center border bg-gray-100'>
          <form className='flex flex-col bg-white  border border-grey p-10 shadow-md w-96'>
            <h2 className='text-xl font-semibold mb-6 text-center'>User information</h2>
              <label htmlFor="name"  className='text-sm font-medium '>Name</label>
              <input type="text" id="Name" value={userdetail.Name} onChange={handleInputChange} className='border border-gray-300  outline-none' />
              <span className='mb-4 text-red-500 text-sm'>{error.nameError}</span>
               
               <label htmlFor="interest"  className='text-sm font-medium '>Interest <span className="text-xs text-gray-500">(Must be, separated)</span></label>
               <input type="text" id="Interest"  value={userdetail.Interest} onChange={handleInputChange} className='border border-gray-300 outline-none' />
               <span className='mb-4 text-red-500 text-sm'>{error.interestError}</span>

               <label htmlFor="interest"  className='text-sm font-medium '>Age</label>
               <input type="Number" id="Age"  value={userdetail.Age} onChange={handleInputChange} className='border border-gray-300  outline-none' />
               <span className='mb-4 text-red-500 text-sm'>{error.ageError}</span>

               <label htmlFor="interest"  className='text-sm font-medium '>Mobile</label>
               <input type="Number" id="Mobile"  value={userdetail.Mobile} onChange={handleInputChange} className='border border-gray-300 outline-none' />
               <span className='mb-4 text-red-500 text-sm'>{error.mobileError}</span>
               <label htmlFor="interest"  className='text-sm font-medium '>Email</label>
               <input type="email" id="Email"  value={userdetail.Email} onChange={handleInputChange} className='border border-gray-300  outline-none' />
               <span className='mb-4 text-red-500 text-sm'>{error.emailError}</span>
               <button type='button' className={`${user?'bg-red-300':'bg-blue-400'} rounded-md p-2 text-white`} onClick={user ? handleUpdate : handleSubmit}>{user ? 'Update' : 'Submit'}</button>
               <button type='button' className='bg-blue-400 rounded-md p-2 text-white my-2' 
               onClick={handleRedirect}
               >View List</button>
          </form>

    </div>
  )
}

export default CreateUser