import * as dateFns from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Container, Grid } from "semantic-ui-react";
import { getItems, setSelectedDate } from "../../../actions";
import ItemList from "./ItemList";
import TodayHeader from "./TodayHeader";

export default function Today() {

    const dispatch = useDispatch()
    const { date } = useParams()

    const items = Object.values(useSelector(state => state.items))

    const {loginData} = useSelector(state => state.auth)
    
    useEffect(()=> {
        if(date) setCurrentDay(new Date(date))
        dispatch(setSelectedDate(new Date()))
        if(loginData) 
        {const {userId, access_token} = loginData
        dispatch(getItems(userId, access_token)
        )}},[dispatch, loginData, date])


    const [currentDay, setCurrentDay] = useState(new Date())

    const renderDay = (items) => {
        const todayItems = items.filter(item => 
            dateFns.isSameDay(new Date(item.date),currentDay))
        if(todayItems.length > 0) return(<ItemList loginData={loginData} items={todayItems}/>)
        return(
        <Container
        position="center"
        text
        style={{"fontSize": "140%"}}
        content="You don't have any tasks for today!"/>)
        }

    return (

    <Grid columns={3}>
        <Grid.Row>
        <Grid.Column width={16}>
        <div className='calendar'>
            <TodayHeader currentDay={currentDay} setCurrentDay={setCurrentDay}/>
        </div>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
                <Grid.Column>
                {renderDay(items)}
                </Grid.Column>
                <Grid.Column/>
                <Grid.Column/>
        </Grid.Row>
    </Grid>
    )
} 