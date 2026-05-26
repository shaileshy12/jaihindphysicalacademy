import OfflineEnquiry from "../model/offlineEnquiry.model.js";

export const createOfflineEnquiry = async (req, res, next) => {
  try {
    const enquiry = await OfflineEnquiry.create(req.body);

    res.status(201).json({
      success: true,
      message: "Offline enquiry stored",
      enquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const getOfflineEnquiries = async (req, res, next) => {
  try {
    const enquiries = await OfflineEnquiry.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      enquiries,
    });
  } catch (error) {
    next(error);
  }
};