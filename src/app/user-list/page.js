"use client"
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {UserContext} from '../../context/UserContext'
import { toast } from 'react-toastify';
import Loading from '@/utils/loading'


export default function UserList() {
const {setUser}=useContext(UserContext)
  const [colorpallete,_]=useState([
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-indigo-300",
    "bg-teal-300",
    "bg-orange-300",
    "bg-cyan-300"
  ])
  const [userList, setUserList] = useState([]);
  const [viewDetails,setViewDetails]=useState(false);
  const [selectedUser,setSelectedUser]=useState({})
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await fetch("/api/users");  
      const data = await res.json();      
      setLoading(false);
      setUserList(data?.users);
      toast(data?.message)                     
    };

    fetchUsers();
  }, []);
  
  const router = useRouter();
  const handleEdit = (data,flag) =>{
    if(!flag){
      setUser(data) 
    }else{
      setUser(null)
    }
    router.push( "/create-list")
  }

  const handleView = (item) => {
    setSelectedUser(item)
    setViewDetails(true)
  }
if(loading){
  return(
    <Loading/>
  )
}
  
    return (
      <div className="w-full h-full  flex justify-center flex-col">
        <div className="flex justify-center items-center gap-4">
        <h1 className="text-center">UserList</h1>
        <button onClick={()=>handleEdit({},1)} className="border b px-2 text-white  bg-blue-400 rounded-md p-2"> 
          Create User
        </button>
        </div>
      
        <table className="overflow-x-auto">
          <thead>
            <tr><th className="border border-grey">
              S.No.
            </th>
              <th className="border border-grey">Name</th>
              <th className="border border-grey">Interest</th>
              <th className="border border-grey">Age</th>
              <th className="border border-grey">Mobile</th>
              <th className="border border-grey">Email</th>
              <th className="border border-grey">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(userList) &&
              userList.map((item, index) => (
                <tr key={index} className="">
                  <td  className="border border-grey">
                    {index+1}
                  </td>
                  <td className="border border-grey">{item.Name}</td>
                  <td className="border border-grey">
                    {item.Interest.split(',').map((interest, i) => (
                      <span key={i} className={`${colorpallete[Math.floor(Math.random()*10)]} rounded-sm px-2 mx-2`}>
                        {interest}
                      </span>
                    ))}

                  </td>
                  <td className="border border-grey">{item.Age}</td>
                  <td className="border border-grey">{item.Mobile}</td>
                  <td className="border border-grey">{item.Email}</td>
                  <td className="border border-grey flex justify-center">
                    <button onClick={()=>handleView(item)} className="border b px-2 bg-blue-400 rounded-md p-2">
                      View
                    </button>
                    <button className="border b px-2  bg-blue-400 rounded-md p-2" onClick={()=>handleEdit(item)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {viewDetails && selectedUser && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <p>
              <strong>Name:</strong> {selectedUser.Name}
            </p>
            <p>
              <strong>Interests:</strong> {selectedUser.Interest}
            </p>
            <p>
              <strong>Age:</strong> {selectedUser.Age}
            </p>
            <p>
              <strong>Mobile:</strong> {selectedUser.Mobile}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.Email}
            </p>
            <button
              onClick={() => setViewDetails(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}


      </div>
    );
  }