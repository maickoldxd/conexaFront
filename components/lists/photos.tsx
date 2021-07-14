import React from 'react'
//FOR BETTER PERFOMANCE I USE PURE COMPONENT 

type Props = {
    albumId?: number,
    id?:number,
    title?:string,
    url?:string,
    thumbnailUrl?:string,
    all?:{
        albumId?: number,
        id?:number,
        title?:string,
        url?:string,
        thumbnailUrl?:string,
    },
}

class PhotosList extends React.PureComponent<Props> {
    render():React.ReactElement{
        //THERE ARE SOME PROPS UNNECESSARIES LIKE ID
        let albumId = this.props.albumId
        let title = this.props.title
        let thumbnailUrl = this.props.thumbnailUrl
        
        //SOMETIMES IS MORE EFFICIENT PASS DIRECT ALL PROPS IN JUST A DIRECT OBJECT FROM THE RESPONSE
        const all = this.props.all
        
        if (all) {
            albumId = all.albumId
            title = all.title
            thumbnailUrl = all.thumbnailUrl
        }
        return (
            <div className="list-group-item list-group-item-action" aria-current="true">
                <div className="d-flex w-100 flex-row">
                    <img src={thumbnailUrl} alt={title} className="rounded-circle me-5"/>
                    <div className="d-flex flex-column mt-3 ">
                        <h3 className="mb-1"> Album{albumId}</h3>
                        <h5>{title}</h5>
                    </div>                    
                </div>
            </div>
        )
    }
}

export default PhotosList