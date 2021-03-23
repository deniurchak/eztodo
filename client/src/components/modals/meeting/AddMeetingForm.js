import React, { useEffect, useState } from 'react'
import { Formik,Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addItem,updateItem } from '../../../actions/toDo';
import * as Yup from 'yup' 
import { Button } from 'semantic-ui-react';
import * as dateFns from "date-fns";
import { setSelectedDate } from '../../../actions';

export default function AddMeetingForm({toggleModal}) {
    const {loginData: {userId, access_token}} = useSelector(state => state.auth)
    const {item} = useSelector(state => state.itemToEdit)
    const {selectedDate} = useSelector(state => state.selectedDate)

    const INITIAL_VALUES = {
      body: '',
      date: dateFns.format(selectedDate,'yyyy-MM-dd'),
      userId: userId, 
      isDone: false,
      link:'',
      isDeadline:'',
      time:''
      }

    const dispatch = useDispatch()

    const [initialValues, setInitialValues] = useState(INITIAL_VALUES)
    const [action, setAction] = useState(()=>addItem)
    
    useEffect(()=>{
      if(item) {
        setInitialValues(item)
        setAction(()=>updateItem)
    }},[item])

    const validationSchema = Yup.object(
    {
        date: Yup.date().required(),
        body: Yup.string().required(),
        link: Yup.string().required(),
    })


    return(
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={
              ( values, { setSubmitting }) => {
                dispatch(action(values,access_token))
                toggleModal()
                setSubmitting(false)
            }
        }
        >
       {({
         handleSubmit,
         isSubmitting,
         isValid
       }) => (
         <Form className='ui form error' onSubmit={handleSubmit}>
            <Field 
             type="date"
             name="date"
             placeholder={initialValues.date}
           />
           <Field 
             style={{marginTop:"10px"}}
             as="textarea"
             name="body"
             rows="1"
             onChange={(e) => setInitialValues({...initialValues,body: e.target.value})}
             value={initialValues.body}
             placeholder="Conference title"
             onKeyPress={e=>{
                if (e.key === 'Enter' && e.shiftKey) {
                    return
                } else if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    isValid && handleSubmit()
                }}}   
           />
           <Field
             style={{marginTop:"10px"}}
             as="textarea"
             rows="1"
             name="link"
             placeholder="Link"
             value={initialValues.link}
             onChange={(e) => setInitialValues({...initialValues,link: e.target.value})}
           />
           <Button style={{marginTop:"10px"}} positive type="submit" disabled={isSubmitting}>
             Submit
           </Button>
           <Button style={{marginTop:"10px"}} onClick={toggleModal} disabled={isSubmitting}>
             Cancel
           </Button>
         </Form>
       )}
        </Formik>
    )
}