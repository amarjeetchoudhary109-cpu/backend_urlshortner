import urlModel from "../models/url.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import shortid from "shortid";

export const urlShortner = asyncHandler(async (req, res) => {
    try {
        const { original_url } = req.body;

        if (!original_url) {
            throw new ApiError(400, "original url is required");
        }

        const existingUrl = await urlModel.findOne({
            original_url: original_url
        });

        if (existingUrl) {
            return res.json(
                new ApiResponse(200, {
                    original_url: existingUrl.original_url,
                    short_code: existingUrl.short_code
                }, "URL already exists, returning existing short code")
            );
        }

        const short_code = shortid.generate();

        const newUrl = await urlModel.create({
            original_url,
            short_code
        });

        res.json(
            new ApiResponse(200, {
                original_url: newUrl.original_url,
                short_code: newUrl.short_code
            }, "new url created successfully")
        );
    } catch (error) {
        console.log("Something went wrong while generating the url:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
});

export const redirectOriginalUrl = asyncHandler(async (req, res) => {
    try {
        const { shortcode } = req.params;

        const urlEntry = await urlModel.findOne({
            short_code: shortcode
        });

        if (!urlEntry) {
            throw new ApiError(404, "url not found");
        }

        urlEntry.visit_count += 1;
        await urlEntry.save();

        res.redirect(urlEntry.original_url);

    } catch (error) {
        console.log("Error in redirect:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
});

export const getUrlStats = asyncHandler(async (req, res) => {
    try {
        console.log("Fetching URL stats...");

        const urls = await urlModel.find({})
            .sort({ createdAt: -1 })
            .select('original_url short_code visit_count createdAt updatedAt');

        console.log("Found URLs:", urls.length);
        console.log("URLs data:", urls);

        res.json(
            new ApiResponse(200, urls, "URL statistics retrieved successfully")
        );
    } catch (error) {
        console.log("Error fetching URL stats:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
});

// Test route to check database connection
export const testConnection = asyncHandler(async (req, res) => {
    try {
        const count = await urlModel.countDocuments();
        res.json({
            success: true,
            message: "Database connection working",
            totalUrls: count
        });
    } catch (error) {
        console.log("Database connection error:", error);
        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: error.message
        });
    }
});
export const deleteUrl = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new ApiError(400, "URL ID is required");
        }

        const deletedUrl = await urlModel.findByIdAndDelete(id);

        if (!deletedUrl) {
            throw new ApiError(404, "URL not found");
        }

        res.json(
            new ApiResponse(200, deletedUrl, "URL deleted successfully")
        );
    } catch (error) {
        console.log("Error deleting URL:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
});

export const deleteUrlByShortCode = asyncHandler(async (req, res) => {
    try {
        const { shortcode } = req.params;

        if (!shortcode) {
            throw new ApiError(400, "Short code is required");
        }

        const deletedUrl = await urlModel.findOneAndDelete({ short_code: shortcode });

        if (!deletedUrl) {
            throw new ApiError(404, "URL not found");
        }

        res.json(
            new ApiResponse(200, deletedUrl, "URL deleted successfully")
        );
    } catch (error) {
        console.log("Error deleting URL by short code:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
});