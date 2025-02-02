
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
    let connection;
  try {
     connection = await connectDB(); 
    const [users] = await connection.execute("SELECT * FROM users");

    return NextResponse.json({success:true,message: "User fetched Successfully", users},{ status: 200 });
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({success:false,message: "Something went Wrong", users:[] }, { status: 500 });
  }finally{
    if(connection){
        await connection.end();
    }
  }
}

export async function POST(req) {
    let connection;
    try {
        const body = await req.json(); 

      const { Name, Interest, Age, Mobile, Email } = body;

      if (!Name || !Interest || !Age || !Mobile || !Email) {
        return NextResponse.json({success:true, message: "All fields are required" }, { status: 400 });
      }
  
      connection = await connectDB();
      await connection.execute(
        "INSERT INTO users (Name, Interest, Age, Mobile, Email) VALUES (?, ?, ?, ?, ?)",
        [Name, Interest, Age, Mobile, Email]
      );
  
      return NextResponse.json({success:true, message: "User added successfully" }, { status: 201 });
    } catch (error) {
      return NextResponse.json({success:true, message: "Something went Wrong"}, { status: 500 });
    }finally{
        if(connection){
            await connection.end();
        }
    }
  }

  export async function PUT (req) {
      let connection;
    try {
        const body = await req.json(); 
    const { Name, Interest, Age, Mobile, Email, id } = body;

    if (!Name || !Interest || !Age || !Mobile || !Email) {
        return NextResponse.json({ success:false,message: "All fields are required" }, { status: 400 });
      }

       connection = await connectDB();
      await connection.execute(
        "UPDATE users SET Name = ?, Interest = ?, Age = ?, Mobile = ?, Email = ? WHERE id = ?",
        [Name, Interest, Age, Mobile, Email, id]
      );
      return NextResponse.json({success:true, message: "User Update successfully" }, { status: 200 });
   
    } catch (error) {
        return NextResponse.json({success:false, message: "something went wrong" }, { status: 500 });
    }finally{
        if(connection){
            await connection.end();
        }
    }
   

  }
