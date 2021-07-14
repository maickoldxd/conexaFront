import React from 'react'
import Link from 'next/link'
const Index = ():React.ReactElement=>{
  
  return (
    <div>
      <Link href="/./posts">
        <a className="text-decoration-none h2">
          Go to Posts →
        </a>
      </Link>
      <br/>
      <Link href="/./photos">
        <a className="text-decoration-none h2">
          Go to Photos →
        </a>
      </Link>
    </div>
  )
}

export default Index

