import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import {useState} from 'react';
import jwt from 'jsonwebtoken';

export default function Home() {

  const [username,setUserName]=useState('');
  const [password,setPassword]=useState('');
  const [message,setMessage]=useState('You are not logged in');
  const [secret,setSecret]=useState('');

  async function submit() {
    
    const res=await fetch('/api/login',{
      method:"POST",
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify({username,password})
    }).then((t)=>t.json());



    const token=res.token;
    if(token){
       
      const json=jwt.decode(token) as { [key: string]: string } ;
      setMessage(
        `Welcome ${json.username} and you are ${json.admin ? 'an admin' : 'not an admin'}`
      )

      const res=await fetch('/api/secret',{
        method:"POST",
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify({token})
      }).then((t)=>t.json());

      if(res.secretAdminCode){
        setSecret(res.secretAdminCode)
      }
      else{
        setSecret("Nothing Available")
      }


    }
    else{
      setMessage("Something went wrong!")
    }
  }

  return (
    <div>
      <h1>{message}</h1>
      <h1>Secret :{secret}</h1>
        <form >
          <input type="text" name="username" value={username} onChange={(e)=>{setUserName(e.target.value)}}></input><br/>
          <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input><br/>
          <input type="button" value="Login" onClick={submit}></input><br/>
       </form>
    </div>
  )
}
