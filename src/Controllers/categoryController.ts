import { Request, Response } from 'express';
import * as categoryService from '../Services/categoryService';

//get all categories with all their details
export const getAllCategories = async (req: Request, res: Response) => {
    try {
			const categories = await categoryService.getAllCategories();
			return res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//categories selected by store/admin to appear in home page 
export const getHandpickedCategories = async (req: Request, res: Response)=> {
    try {
        const categories = await categoryService.getHandpickedCategories();
        return res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//categories selected by store/admin to appear in mobile home page and navigation bar
export const getTopCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getTopCategories();
        return res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//categories selected by store/admin to appear in a specfic mobile page 
export const getMobileCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getMobileCategories();
        return res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

  //Search products by category ID is implemented in the product service ,you just need to provide a categoryId in the query 