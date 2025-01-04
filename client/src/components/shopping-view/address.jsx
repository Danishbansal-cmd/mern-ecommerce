import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import CommonForm from '../common/form';
import { addressFormControls } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddress, fetchAllAddresses } from '@/store/shop/address-slice';

const initalAddressFormData = {
    address : '',
    city : '',
    phone : '',
    pincode : '',
    notes : ''
}
function Address() {
    const [formData, setFormData] = useState(initalAddressFormData);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {addressList} = useSelector(state => state.shopAddress);
    
    function handleMangaeAddress(e){
        e.preventDefault();
        dispatch(addNewAddress({...formData, userId : user?.id})).then((data) => {console.log(data);
            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id))
                setFormData(initalAddressFormData); //to again empty the fields for the new address
            }
        }).catch((error) => console.log(error,"Error in adding the data"));
    }

    function isFormValid(){
    return Object.keys(formData).map(key => formData[key].trim() !== '').every(item => item)
    }

    useEffect(() => { //to fetch on the page or the component loads
        dispatch(fetchAllAddresses(user?.id))
    },[dispatch])
    console.log(addressList, "addressList addressList")

    return <Card>
    <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>Address List</div>
    <CardHeader>
        <CardTitle>Add New Address</CardTitle>
    </CardHeader>
    <CardContent className='space-y-3'>
        <CommonForm formControls={addressFormControls} formData={formData} setFormData={setFormData} buttonText={'Add'} onSubmit={handleMangaeAddress} isBtnDisabled={!isFormValid()}/>
    </CardContent>
    </Card>
};

export default Address;