const Address = require('../../models/Address')



const addAddress = async (req, res) => {
    try{
        const {userId, address, city, pincode, phone, notes} = req.body;
        if(!userId || !address || !city || !pincode || !phone || !notes){
            return res.status(400).json({
                success : false,
                message : 'Invalid Data'
            })
        }

        const newAddedAddress = new Address({
            userId, address, city, pincode, phone, notes
        })

        const savedAddress = await newAddedAddress.save();

        res.status(200).json({
            success : true,
            message : 'Added successfully',
            data : savedAddress
        })

    }catch ( error) {
        res.status(500).json({
            success : false,
            message : 'SomeError'
        });

    }
}

const editAddress = async (req, res) => {
    try{
        const {userId, addressId} = req.params;
        const {formData} = req.body;
        if(!userId || !addressId){
            return res.status(400).json({
                success : false,
                message : '[editAddress] No Data given'
            })
        }

        const address = await Address.findOneAndUpdate({_id : addressId, userId}, formData, {new : true}); //logs or return new updated address
        if(!address){
            return res.status(404).json({
                success: false,
                message: "Address not found",
              });
        }
        res.status(200).json({
            success: true,
            message : 'Address updated Successfully',
            data : address
        })
    }catch ( error ) {
        res.status(500).json({
            success : false,
            message : 'No Address found'
        })
    }
}

const deleteAddress = async (req, res) => {
    try{
        const {userId, addressId} = req.params;
        if(!userId || !addressId){
            return res.status(400).json({
                success : false,
                message : '[Delete Address] No data provided'
            })
        }
        const address = await Address.findOneAndDelete({
            _id : addressId, userId
        });
        if(!address){
            return res.status(400).json({
                success : false,
                message : 'No matching address found'
            })
        }
        res.status(200).json({
            success : true,
            message : 'Address deleted successfully',
            data : address
        })
    }catch ( error) {
        res.status(500).json({
            success : false,
            message : 'SomeError'
        })
    }
}

const fetchAllAddress = async (req, res) => {
    try{
        const {userId} = req.params;
        const formData = req.body;
        if(!userId){
            return res.status(400).json({
                success : false,
                message : 'No data provided'
            })
        }
        const addressList = await Address.find({userId
        });

        res.status(200).json({
            success : true,
            message : 'updated successfully',
            data : addressList
        })
    }catch ( error) {
        res.status(500).json({
            success : false,
            message : 'SomeError'
        })
    }
}



module.exports = {addAddress, deleteAddress, editAddress, fetchAllAddress}