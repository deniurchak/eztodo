import React from 'react'
import { Segment } from 'semantic-ui-react'
import Item from './Item'

export default function ItemList({loginData,items}) {

    return(
        <Segment.Group>
            {
            items.map(item => 
                <Item loginData={loginData} item={item}/>
                )
            }
        </Segment.Group>
)}


