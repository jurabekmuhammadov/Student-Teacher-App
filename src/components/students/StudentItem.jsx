import { openModal } from "@/app/students/studentsSlice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const StudentItem = ({ info }) => {
    const dispatch = useDispatch();

    return (
        <div className="flex gap-4 m-4">
            <span>
                {info.firstname}
            </span>
            <span>
                {info.lastname}
            </span>
            <span>
                {info.group}
            </span>
            <button onClick={() => dispatch(openModal(info))} className="border-2 border-sky-500 hover:text-red-500">Edit</button>
            <button className="border-2 border-red-500 hover:text-red-500">Delete</button>
        </div>
    )
}
StudentItem.propTypes = {
    info: PropTypes.object,
}
export default StudentItem