import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import imgCard1 from '../public/cards/1.jpg'
import imgCard2 from '../public/cards/2.jpg'
const Index = (): React.ReactElement => {

  //NEXT JS WILL AUTOMATICALLY SHOW A BLURRED IMG, BECAUSE WE AUTO IMPORT IT, IN CASE OF A DYNAMIC IMAGES, I USED A MODULE TO GENERATE A BASE64 4X4px VERSION OF EVERY IMAGE, THIS IS RECOMMENDED TO DO ON SERVER SIDE, BUT CAN BE CREATED IN DEVICE AS WELL.

  return (
    <div className="d-flex flex-row justify-content-between flex-wrap">
      <div className="card bg-light-2 mx-auto mt-5 rounded-8">
        <Image
            quality={90}
          src={imgCard1}
          width={300} height={180}
          placeholder="blur"
          className="rounded-top-8"
        />
        <Link href="/./posts">
          <a className="text-decoration-none h2 ms-2">
            Go to Posts
          </a>
        </Link>
      </div>
      <div className="card bg-light-2 mx-auto mt-5 rounded-8">
      <Image
          quality={90}
          src={imgCard2}
          width={300} height={180}
          placeholder="blur"
          className="rounded-top-8"
        />
        <Link href="/./photos">
          <a className="text-decoration-none h2 ms-2">
            Go to Photos
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Index

