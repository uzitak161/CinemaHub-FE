import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";



function EditModal({ setModal }) {


    return (
        <div className='row'>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <textarea placeholder="Bio" />

            
        </div>
    )
}

export default EditModal;