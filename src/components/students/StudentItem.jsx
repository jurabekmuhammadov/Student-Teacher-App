import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types";
import { openModal, deleteStudent } from '@/app/students/studentsSlice'; // Assuming this is where you have your deleteStudent action
import { TableCell, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Pencil, Trash2, CheckCheck, X, User } from "lucide-react"

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
        <TableRow key={info.id}>
            <TableCell className="font-medium font-semibol text-base">#{info.id}</TableCell>
            <TableCell className="font-semibol text-base">{info.firstname}</TableCell>
            <TableCell className="font-semibol text-base">{info.lastname}</TableCell>
            <TableCell className="text-right font-semibol text-base">{info.group}</TableCell>
            <TableCell className="flex float-end gap-4 font-semibol text-base">
                <Button onClick={() => dispatch(openModal(info))} className="bg-yellow-600 hover:bg-yellow-500 text-white text-sm rounded rounded-xl font-bold flex gap-2 items-center">
                    <Pencil size={16} />
                    Edit
                </Button>
                {confirmDelete ? (
                    <>
                        <Button onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-500  text-white text-sm rounded rounded-xl font-bold flex gap-2 items-center">
                            <CheckCheck size={16} />
                            Confirm Delete
                        </Button>
                        <Button onClick={handleCancelDelete} className="bg-slate-400 hover:bg-slate-500  text-white text-sm rounded rounded-xl font-bold flex gap-2 items-center">
                            <X size={16} />
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button onClick={handleDelete} className="bg-gray-600 hover:bg-gray-500  text-white text-sm rounded rounded-xl font-bold flex gap-2 items-center">
                        <Trash2 size={16} />
                        Delete
                    </Button>
                )}
                <Button onClick={() => herTeacher(info.group)} className="bg-sky-600 hover:bg-sky-500 text-white text-sm rounded rounded-xl font-bold flex gap-2 items-center"><User size={16} />
                    Her teacher
                </Button>
            </TableCell>
        </TableRow>
    );
};

StudentItem.propTypes = {
    info: PropTypes.object,
}

export default StudentItem;
