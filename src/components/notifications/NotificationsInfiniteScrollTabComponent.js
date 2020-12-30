import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import LoaderComponent from "../LoaderComponent";
import {dateToString} from "../../functions/generalFunctions";
import {emitNotificationRead} from "../../redux/notifications/actions";

// Component
function NotificationsInfiniteScrollTabComponent({notifications, handleDeleteModalShow, dispatch}) {

    const handleNotificationItemDetails = (id) => {
        dispatch(emitNotificationRead({id}));
    }

    const handleNotificationItemDelete = (id) => {
        handleDeleteModalShow(id)
    }

    // Render
    return (
        <div className="table-responsive">
            <table className="table table-hover text-nowrap table-bordered">
                <thead className='bg-theme'>
                <tr>
                    <th>CREER LE</th>
                    <th>MESSAGE</th>
                    <th>ACTIONS</th>
                </tr>
                </thead>
                <tbody>
                    {notifications.map((item, key) => {
                        return (
                            <tr key={key} className={`${item.read ? '' : 'bg-theme-light'}`}>
                                <td>{dateToString(item.creation)}</td>
                                <td>{item.message}</td>
                                <td className='text-center'>
                                    {item.actionLoader ? <LoaderComponent little={true} /> :
                                        <>
                                            <Link to={item.url}
                                                  className='btn btn-sm btn-secondary'
                                                  onClick={handleNotificationItemDetails(item.id)}
                                            >
                                                <i className='fa fa-eye' />
                                            </Link>
                                            &nbsp;
                                            <button className='btn btn-sm btn-danger'
                                                    onClick={handleNotificationItemDelete(item.id)}
                                            >
                                                <i className='fa fa-trash' />
                                            </button>
                                        </>
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

// Prop types to ensure destroyed props data type
NotificationsInfiniteScrollTabComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
    handleDeleteModalShow: PropTypes.func.isRequired,
};

export default React.memo(NotificationsInfiniteScrollTabComponent);
