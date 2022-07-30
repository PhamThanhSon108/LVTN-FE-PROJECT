import mongoose from 'mongoose';

const sliderSchema = mongoose.Schema({
    url: {
        type: String,
        require: true,
    },
});
const Slider = mongoose.model('Slider', sliderSchema);
export default Slider;
