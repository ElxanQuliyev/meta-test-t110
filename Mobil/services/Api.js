import React, { useState, useEffect, useStatus } from 'react';
import { BASE_URL, TOKEN } from "../config/Config"



export const GET = async (url,accessToken) => {

    const API_URL = `${BASE_URL}${url}`;
    let response = await fetch(API_URL,
        {
            method: 'GET',
            headers: {
                "x-access-token": accessToken
            }
        }
         
        );
    response = await response.json();
    return response;


} 


