import Slider from '../models/slider.model.js';
const getSliders = async (req, res) => {
    const slider = await Slider.find({}).sort({ _id: -1 });
    res.json(slider);
};

const deleteSliderByAdmin = async (req, res) => {
    const slider = await Slider.findById(req.params.id);
    const listSlider = await Slider.find({});
    if (listSlider.length <= 1) {
        res.status(404);
        throw new Error('Can delete slide');
    }
    if (slider) {
        await Slider.remove();
        res.json({ message: 'Slide deleted' });
    } else {
        res.status(404);
        throw new Error('Slide not Found');
    }
};

const createSliderByAdmin = async (req, res) => {
    const { url, id } = req.body;
    //add slider
    if (!id) {
        const sliderExist = await Slider.findOne({ url: url.trim() });
        if (url.trim() === '') {
            res.status(400);
            throw new Error('Please enter slide');
        }
        if (sliderExist) {
            res.status(400);
            throw new Error('Slider url already exist');
        } else {
            const slider = new Slider({
                url,
                // user: req.user._id,
            });
            if (slider) {
                const createdSlider = await Slider.save();
                res.status(201).json(createdSlider);
            } else {
                res.status(400);
                throw new Error("Can't add slide");
            }
        }
    } else {
        const sliderNew = await Slider.findById(id);
        const sliderExist = await Slider.findOne({ url: url.trim() });
        if (sliderNew.url === url) {
            res.status(400);
            throw new Error('No thing to update');
        }
        if (sliderExist && sliderExist._id !== id) {
            res.status(400);
            throw new Error('Slider url already exist');
        }
        if (sliderNew) {
            sliderNew.url = url.trim();
            await sliderNew.save();
            res.status(201).json();
        }
    }
};

const sliderController = { createSliderByAdmin, getSliders, deleteSliderByAdmin };
export default sliderController;
