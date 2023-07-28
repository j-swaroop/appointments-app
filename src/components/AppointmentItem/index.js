// Write your code here
import './index.css'

const starred_img_url = "https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
const filled_starred_img_url = "https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"

const AppointmentItem = (props) => {
    const {appointmentItem, starred} = props
    const {id, appointment, appointmentDate, isStarred} = appointmentItem

    const starredImg = isStarred? filled_starred_img_url: starred_img_url
   
    const toStarred = () => {
        starred(id)
    }

    return(
        <li className="appointment-item">
            <div className="appoint-details-container">
                <p className="title"> {appointment}</p>
                <button onClick={toStarred} type="button" data-testid="star">
                    <img className="star-img" alt="star" src={starredImg}/>
                </button>
            </div>
            <p className="appointment-date"> Date: {appointmentDate} </p>
        </li>
    )
}

export default AppointmentItem