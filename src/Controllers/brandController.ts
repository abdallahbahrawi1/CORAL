import { Request, Response } from 'express';
import * as brandService from '../Services/brandService';

export const getAllBrands = async (req: Request, res: Response)=> {
    try {
        const brands = await brandService.getAllBrands();
        return res.status(200).json(brands);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  export const getTopBrands = async (req: Request, res: Response)=> {
    try {
        const brands = await brandService.getTopBrands();
        return res.status(200).json(brands);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};