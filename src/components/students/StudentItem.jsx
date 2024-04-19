import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom"
import PropTypes from "prop-types";
import { openModal, deleteStudent } from '@/app/students/studentsSlice'; // Assuming this is where you have your deleteStudent action

const StudentItem = ({ info }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => {
        setConfirmDelete(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteStudent(info.id));
        setConfirmDelete(false);
        window.location.reload()
    };

    const handleCancelDelete = () => {
        setConfirmDelete(false);
    };

    const herTeacher = (group) => {
        localStorage.setItem("studentGroup", group);
        navigate("/her-teacher");
    }   

    return (
        <div className="flex gap-4 m-4">
            <span>{info.firstname}</span>
            <span>{info.lastname}</span>
            <span>{info.group}</span>
            <button onClick={() => dispatch(openModal(info))} className="border-2 border-sky-500 hover:text-red-500">
                Edit
            </button>
            {confirmDelete ? (
                <>
                    <button onClick={handleConfirmDelete} className="border-2 border-red-500 hover:text-red-500">
                        Confirm Delete
                    </button>
                    <button onClick={handleCancelDelete} className="border-2 border-red-500 hover:text-red-500">
                        Cancel
                    </button>
                </>
            ) : (
                <button onClick={handleDelete} className="border-2 border-red-500 hover:text-red-500">
                    Delete
                </button>
            )}
            <button onClick={() => herTeacher(info.group)} className="border-2 border-green-500 hover:text-red-500">Her teacher</button>
        </div>
    );
};

StudentItem.propTypes = {
    info: PropTypes.object,
}

export default StudentItem;
