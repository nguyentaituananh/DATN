import Banners from "../models/banners.model.js";
export const createBanner = async(req,res)=>{
    try {
        const { title, image_url, link_to,position } = req.body;
        const newBanner = new Banners({
            title,
            image_url,
            link_to,
            position
        });
        const savedBanner = await newBanner.save();
        res.status(201).json(savedBanner);
    } catch (error) {
        res.status(500).json({ message: error.message });     
    }
}

export const updateBanner = async(req,res)=>{
    try {
        const {id} = req.params;
        const { title, image_url, link_to, position } = req.body;
        const updatedBanner = await Banners.findByIdAndUpdate(id, { title, image_url, link_to, position }, { new: true });
        if (updatedBanner) {
            res.json(updatedBanner);
        } else {
            res.status(404).json({ message: "Không tìm thấy banner để cập nhật." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteBanner = async(req,res)=>{
    try {
        const {id} = req.params;
        const deletedBanner = await Banners.findByIdAndDelete(id);
        if (deletedBanner) {
            res.json({ message: "Xóa banner thành công." });
        } else {
            res.status(404).json({ message: "Không tìm thấy banner để xóa." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}