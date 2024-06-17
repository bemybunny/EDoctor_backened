const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    name: {
        type: String,
        default: '',
        required:true,
    },
    specialization: {
        type: String,
        default: '',
        required:true,
    },
    college_name: {
        type: String,
        default: '',
        required:true,
    },
    experience: {
        type: Number, // You can change the type based on the nature of recent performance data
        default: 0,
        required:true,
    },
    image: {
        type: String, // Assuming image is stored as a URL or file path
        default: '',
        required:true,
    },
    patient:[
        {
            userId:{
                type:String,
                default:'',
            }
        }
    ],
    meeting:[
        {
            doctorId:{
                type:String,
                default:"",
            },
            patientname:{
                type:String,
                default:'',
            },
            doctorname:{
                type:String,
                default:'',
            },
            date:{
                type:Date,
                default:'',
            },
            time:{
                type:String,
                default:'',
            }
        }
    ]
});

const Doctor = mongoose.model('Doctor', DoctorSchema);
module.exports = Doctor;