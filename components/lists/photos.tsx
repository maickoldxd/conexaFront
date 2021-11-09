import React from 'react'
import Image from 'next/image'
//FOR BETTER PERFOMANCE I USE PURE COMPONENT 

export type PhotosTypes = {
    albumId?: number,
    id?: number,
    title?: string,
    url?: string,
    thumbnailUrl?: string,
    b64?:string
}

export type PhotosOnDataTypes = {
    data: [
        PhotosTypes
    ],
    page?: number
}


class PhotosList extends React.PureComponent<PhotosTypes> {
    render(): React.ReactElement {
        //THERE ARE SOME PROPS UNNECESSARIES LIKE ID
        const {albumId, title,thumbnailUrl, b64} = this.props

        return (
            <div className="list-group-item list-group-item-action" aria-current="true">
                <div className="d-flex flex-row">

                    <div className="me-4">
                        <Image
                            src={thumbnailUrl}
                            layout="fixed"
                            width={150} height={"150"}
                            placeholder="blur"
                            blurDataURL={b64}
                            className="rounded-circle" />
                    </div>
                    <div className="d-flex flex-column mt-3 ">
                        <a className="h2 text-decoration-none text-dark"> Album{albumId}</a>
                        <p>{title}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default PhotosList