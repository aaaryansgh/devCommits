import React from 'react'

const Connectioncard = ({conn}) => {
    const {firstName,lastName,bio,skills}=conn;
  return (
    <div className="card card-border border-success bg-transparent  w-56">
      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName}</h2>
        <p className='italic'>{bio}</p>
        <p>{skills.map(skill=>skill).join(", ")}</p>
        <div className="card-actions justify-start">
          <button className="btn btn-success hover:bg-white hover:text-black ">Connected</button>
        </div>
       </div>
    </div>
  )
}

export default Connectioncard
