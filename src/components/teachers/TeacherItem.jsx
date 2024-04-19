import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import { openModal, deleteTeacher } from '@/app/teachers/teachersSlice'; // Assuming this is where you have your deleteStudent action

const TeacherItem = ({ info }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => {
        setConfirmDelete(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteTeacher(info.id));
        setConfirmDelete(false);
        window.location.reload()
    };

    const handleCancelDelete = () => {
        setConfirmDelete(false);
    };

    const herStudents = (group) => {
        localStorage.setItem("teacherGroup", group);
        navigate("/her-students");
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
            <button onClick={() => herStudents(info.group)} className="border-2 border-green-500 hover:text-red-500">Her students</button>
        </div>
    );
};

TeacherItem.propTypes = {
    info: PropTypes.object,
}

export default TeacherItem;
