import React from 'react'

function formValidation(formValue) {
    const phoneregex=/^[6-9]\d{9}$/;
    const zipRegex=/^\d{6}$/;
    const errors={};

    //phone numbrr validation
  if(!formValue.PhoneNumber)
    {
        errors.PhoneNumber="Phone Number required";
    }
  else if(!phoneregex.test(formValue.PhoneNumber))
    {
        errors.PhoneNumber="Phone number invalid";
    }

    //zipnumber validation
if(!formValue.ZipCode)
    {
        errors.ZipCode="zipcode required";
    }
else if(!zipRegex.test(formValue.ZipCode))
    {
        errors.ZipCode="Zipcode invalid";
    }

    //date validation
    if(!formValue.DeliveryDate)
    {
        errors.DeliveryDate="Date required";
    }
    else
    {
        const todayDate=Date.now();
        const enteredDate=new Date(formValue.DeliveryDate).getTime();
        if(enteredDate<todayDate)
        {
            errors.DeliveryDate="Please Check your date is invalid";
        }
    }

    //Address Validation
    if(!formValue.Address)
        {
            errors.Address="Address required";
        }
        //city validation
        if(!formValue.City)
            {
                errors.City="City required";
            }

            //state validation
            if(!formValue.State)
                {
                    errors.State="State required";
                }

                return errors;
}

export default formValidation;