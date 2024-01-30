import { Request, Response } from 'express';
import * as brandService from '../Services/brandService';

//return brands with their logos
export const getAllBrands = async (req: Request, res: Response)=> {
    try {
        const brands = await brandService.getAllBrands();
        return res.status(200).json(brands);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error2' });
    }
};

//brands selected by store/admin to appear in home page
export const getTopBrands = async (req: Request, res: Response)=> {
    try {
        const brands = await brandService.getTopBrands();
        return res.status(200).json(brands);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error2' });
    }
};