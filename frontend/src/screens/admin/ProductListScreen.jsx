import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { toast } from 'react-toastify';
import {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
} from '../../slices/productsApiSlice';

const ProductListScreen = () => {
    const { pageNumber } = useParams(); // get page number from url (dynamic param)
    const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber}); // get products route
    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation(); // create product route
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation(); // delete product route

    const deleteHandler = async (id) => {
        confirmAlert({
            title: "Delete a product",
            message: "Are you sure ?",
            buttons: [
              {
                label: "Yes",
                onClick: async () => {
                    try {
                        await deleteProduct(id); // delete product using delete product route
                        toast.success('Product deleted');
                        refetch();              // refresh
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

    const createProductHandler = async () => {
        confirmAlert({
            title: "Create a product",
            message: "Are you sure ?",
            buttons: [
              {
                label: "Yes",
                onClick: async () => {
                    try {
                        await createProduct();  // create product using create product route
                        refetch();
                    } catch (err) {
                        toast.error(err?.data?.message || err.error );
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
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-3' onClick={createProductHandler}>
                        <FaEdit /> Create Product
                    </Button>
                </Col>
            </Row>

            { loadingCreate && <Loader /> }
            { loadingDelete && <Loader /> }

            { isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.message}</Message>
            ) : (
                <>
                    <Table striped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { data.products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm mx-2'>
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(product._id)}
                                        >
                                            <FaTrash style={{ color: 'white' }}/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={data.pages} page={data.page} isAdmin={true} />
                </>
            )}
        </>
    )
}

export default ProductListScreen