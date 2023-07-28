// Write your code here
// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem'
import {format} from 'date-fns'

class Appointments extends Component{
    state = {
        userInput: "",
        userDate: "",
        appointmentsList: [],
        toShowStarred: false
    }

    onShowStarredOnly = () => {
        const {toShowStarred} = this.state
        this.setState(prevState => ({toShowStarred: !prevState.toShowStarred}))

    }

    onSubmitForm = (event) => {
        event.preventDefault()
        const {userDate, userInput} = this.state

        let newAppointment
        if(userInput !== "" && userDate !== ""){
            const newDate = new Date(userDate)
            const formatedDate = format(new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()), 'dd MMMM yyyy, EEEE')
            
           newAppointment = {
                id: v4(),
                appointment: userInput,
                appointmentDate: formatedDate,
                isStarred: false
            }
        }

        if(userInput !== "" && userDate !== ""){
            this.setState(prevState => ({
                appointmentsList: [...prevState.appointmentsList, newAppointment],
                userInput: "",
                userDate: ""
            }))
        }else{
            event.preventDefault()
        }
       
    }

    starred = (id) => {
        this.setState(prevState => ({
            appointmentsList: prevState.appointmentsList.map(eachAppointment => {
                if(eachAppointment.id === id){
                    return {...eachAppointment, isStarred: !eachAppointment.isStarred}
                }
                return eachAppointment
            })
            
        }))
    }

    onChangeInput = (event) => {
        this.setState({userInput: event.target.value})
    }

    onChangeDate = (event) => {
        this.setState({userDate: event.target.value})
    }

    getFilteredAppointments = () => {
        const {appointmentsList, toShowStarred} = this.state
        if (toShowStarred === true){
            return appointmentsList.filter(eachAppointment => eachAppointment.isStarred === true)
        }
        return appointmentsList
    }

    render(){
        const {userDate, userInput, appointmentsList} = this.state
        
        const filteredAppointments = this.getFilteredAppointments()

        return(
            <div className="bg-container">
               <div className="appointment-container">
                    <div className="appointment-content-container">
                        <div>
                            <h1 className="heading"> Add Appointment</h1>

                            <form onSubmit={this.onSubmitForm} className="form-container">
                                <label className="label" htmlFor="titleInput"> TITLE </label>
                                <input onChange={this.onChangeInput} value={userInput} placeholder="Title" className="title-input" id="titleInput" type="text"/>

                                <label className="label" htmlFor="dateInput"> DATE </label>
                                <input onChange={this.onChangeDate} value={userDate} className="date-input" id="dateInput" type="date"/>
                                
                                <button type="submit" className="add-button"> Add </button>
                            </form>
                        </div>
                        
                        <img className="appointments-image" 
                        src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png" alt="appointments"/>
                    
                    </div>
                    <hr className="horizontal-line"/>
                    <div className="container">
                        <h1 className="sub-heading"> Appointments </h1>
                        <button onClick={this.onShowStarredOnly} className="starred-btn"> Starred</button>
                    </div>

                    <ul className="appointment-list">
                        {filteredAppointments.map(eachAppointment => 
                            <AppointmentItem starred={this.starred} key={eachAppointment.id} appointmentItem={eachAppointment}/>)}
                    </ul>
               </div>
            </div>
        )
    }
}



export default Appointments