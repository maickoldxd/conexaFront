import React from 'react'
//FOR BETTER PERFOMANCE I USE PURE COMPONENT 

export type PostsTypes = {
    title?: string,
    userId?:string,
    body?:string,
    id?:string,
    all?:{
        title?: string,
        userId?:string,
        body?:string,
        id?:string,
    }
}
//
export type PostsOnDataTypes = {
    data:[
        PostsTypes
    ]
}

class PostsList extends React.PureComponent<PostsTypes> {
    render():React.ReactElement{

        let title = this.props.title
        let userId = this.props.userId
        let body = this.props.body
        let id = this.props.id
        //SOMETIMES IS MORE EFFICIENT PASS DIRECT ALL PROPS IN JUST A DIRECT OBJECT FROM THE RESPONSE
        const all = this.props.all
        
        if (all) {
            title = all.title
            userId = all.userId
            body = all.body
            id = all.id
        }
        return (
            <div className="list-group-item list-group-item-action w-50 mx-auto" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1"> {title}</h5>
                <small>User: {userId}</small>
                </div>
                <p className="mb-1">{body}</p>
                <small>itemId: {id}</small>
            </div>
        )
    }
}

export default PostsList