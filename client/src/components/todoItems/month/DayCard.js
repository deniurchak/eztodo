import { Card, Container, List } from "semantic-ui-react"
import * as dateFns from "date-fns";
import DailyItem from "../week/DailyItem";
import history from "../../../history";
import { useDispatch } from "react-redux";
import { setSelectedDate } from "../../../actions";
import { toggleAddItemModal } from "../../../actions/modal";

export default function DayCard({day,items}) {

    const dispatch = useDispatch()

    const handleAddItem = () => {
        dispatch(setSelectedDate(day))
        dispatch(toggleAddItemModal())
        history.push('/todo/month/add')
    }

    return(
        <Card>
            <Card.Content>
                <i style={{cursor: "pointer"}} onClick={handleAddItem} 
                className="right floated large green plus circle icon" />
                <Card.Header>
                {dateFns.format(day, "iii, d MMMM")}
                </Card.Header>
            </Card.Content>
            <Card.Content extra>
            <List bulleted verticalAlign='middle' style={{fontSize:"15px", color:'#1a8fff'}}>
                {
                items.length > 0 ?
                items.map(item => 
                    <DailyItem key={item.id} item={item} />)
                : <Container>No tasks for this day yet</Container>
                }
            </List>
            </Card.Content>
        </Card>
    ) 
}