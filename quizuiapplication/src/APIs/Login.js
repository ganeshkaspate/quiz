import axios from 'axios';
import HttpStatus from 'http-status-codes';
import { LOGIN_PATH } from '../Constants/AppConstants';
import  apiGatewayEndpoint  from '../config/index';

//API to generate auth token from LRSC
export const generateToken = (bodyJson) =>
    axios.post(
         apiGatewayEndpoint.apiGatewayEndpoint + `${LOGIN_PATH}username=${bodyJson.username}&password=${bodyJson.password}`,
        bodyJson
    ).then(data => {
            if(data.status === HttpStatus.OK){
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