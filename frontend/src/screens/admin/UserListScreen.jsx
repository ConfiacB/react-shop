import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { toast } from 'react-toastify';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery(); // get users route
  const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation(); // delete user route
  
  const deleteHandler = async (id) => {
    confirmAlert({
        title: "Delete a user",
        message: "Are you sure ?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
                try {
                    await deleteUser(id);           // delete user using delete user route
                    toast.success('User Deleted');
                    refetch();                      // refresh
                } catch (err) {
                    toast.error(err?.data?.message || err.error);
                }
            }
          },
          {
            label: "No",
          }
        ]
    });
}

  return (
    <>
      <h1>Users</h1>
      { loadingDelete && <Loader /> }
      { isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }}/>
                  ): (
                    <FaTimes style={{ color: 'red' }}/>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: 'white' }}/>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen