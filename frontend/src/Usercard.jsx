import React from 'react'

const Usercard = ({user}) => {
    const{firstName,lastName,bio,skills,age}=user
  return (
    <div className="card card-border bg-base-300 w-96">
      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName}' <span>{age?age:"21"}</span></h2>
        <p>{bio}</p>
        <p>{skills.map(skill=>skill).join(", ")}</p>
        <div className="card-actions justify-start">
          <button className="btn hover:bg-white hover:text-black ">Ignore ❌</button>
          <button className="btn hover:bg-pink-500">Interested ✅</button>
        </div>
       </div>
    </div>
  )
}

export default Usercard
