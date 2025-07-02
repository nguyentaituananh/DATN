import Banners from "../models/banners.model.js";
import { bannerSchema,bannerUpdateSchema } from "../validates/banner.validate.js";
export const createBanner = async(req,res)=>{
    const { error } = bannerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((err) => ({
      field: err.path?.[0] || "null",
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }
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
    const { error } = bannerUpdateSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((err) => ({
      field: err.path?.[0] || "null",
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }
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