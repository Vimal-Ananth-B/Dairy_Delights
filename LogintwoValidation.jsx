import React, { useState } from 'react';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>].*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
export default function LoginValidation(formdata)
{
    const errors={};
    if(!formdata.UserName)
    {
        errors.UserName="Username must be required";
    }
    else if(!usernameRegex.test(formdata.UserName))
    {
        errors.UserName="Username must be only text";
    }
    if(!formdata.Email)
    {
        errors.Email="Email must be required";
    }
    else if(!emailRegex.test(formdata.Email))
        {
            errors.Email="Invalid Email ID";
        }

    let temppassword=formdata.Password;
    if(!temppassword)
    {
        errors.Password="Password must be required";
    }
    else if(!passwordRegex.test(temppassword))
        {
            errors.Password="Your Password must be strong";
        }
    if(!formdata.ConfirmPassword)
        {
            errors.ConfirmPassword="Please Confirm the password that you stated above";
        }
        else if(formdata.Password!==formdata.ConfirmPassword)
        {
            errors.ConfirmPassword="The password you entered is not same as your previous password";
        }
        return errors;
};