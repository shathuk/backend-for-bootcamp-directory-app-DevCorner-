const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder')

const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name con not be more than 50 characters']    
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    website: {
        type: String,
        match : [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
         'please use a vsalid url with HTTP or HTTPS']
    },
    phone: {
        type: String,
        maxlength: [20, 'phone number can not be longer than 20 characters']
    },
    email: {
        type: String,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         'please add a valid email']
    },
    address:{
        type: String,
        required: [true, 'please add an address']
    },
    location: {
        //GeoJson field
        type: {
            type: String,
            enum: ['point'],
            require: true
        },
        coordinates: {
            type: [Number],
            require: true,
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    careers: {
        type: [String],
        required: [true, 'please select a career'],
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Others'
        ]
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least a'],
        max: [10, 'Rating must can not be more than 10']
    },
    averageCost: Number,
    photo:{
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

//Create bootcamp slug from the name
BootcampSchema.pre('save', function(next){
    this.slug = slugify(this.name, {lower: true});
    next()
});


//geocoder / location field
BootcampSchema.pre('save', async function(next){
    const loc = await geocoder.geocode(this.address)
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].country
    }
    next()
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);