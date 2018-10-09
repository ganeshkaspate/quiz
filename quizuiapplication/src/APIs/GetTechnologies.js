import axios from 'axios';
import HttpStatus from 'http-status-codes';
import { FETCH_TECHNOLOGIES_URL } from '../Constants/AppConstants';

export const getTechnologiesData = (token) =>
    axios.get(
           `${FETCH_TECHNOLOGIES_URL}`,
        {
            headers: { "Authorization": `Bearer ${token}` }
        }
    ).then(data => {
        if (data.status === HttpStatus.OK) {
            return {
                status: data.status,
                payload: data.data
            };
        }
    }).catch(err => {
        console.log("Error in authorization", err.response.status);
        return {
            status: err.response.status,
            payload: null
        };
    });