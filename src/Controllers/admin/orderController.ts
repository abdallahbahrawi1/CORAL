import { Request, Response } from 'express';
import * as orderService from '../../Services/admin/orderService'; 

export const getOrderItemAnalytics = async (req: Request, res: Response) => {
  try {
    const { status, startDate, endDate, brandId, categoryId ,productId,sortBy} = req.query;

    // Validate and parse query parameters as needed

    const options = {
      status: status ? String(status) : 'completed',
      startDate: startDate ? new Date(String(startDate)) : undefined,
      endDate: endDate ? new Date(String(endDate)) : undefined,
      brandId: brandId ? parseInt(String(brandId), 10) : undefined,
      categoryId: categoryId ? parseInt(String(categoryId), 10) : undefined,
      productId: productId ? parseInt(String(productId), 10) : undefined,
      sortOptions: sortBy as string || 'total_sales_desc',
    };

    const result = await orderService.getOrderItemAnalytics(options);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const getTotalByBrand = async (req: Request, res: Response) => {
  try {
    const { status, startDate, endDate, brandId,sortBy} = req.query;

    // Validate and parse query parameters as needed

    const options = {
      status: status ? String(status) : 'completed',
      startDate: startDate ? new Date(String(startDate)) : undefined,
      endDate: endDate ? new Date(String(endDate)) : undefined,
      brandId: brandId ? parseInt(String(brandId), 10) : undefined,
      sortOptions: sortBy as string || 'total_sales_desc',
    };

    const result = await orderService.getTotalByBrand(options);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const getTotalByCategory = async (req: Request, res: Response) => {
  try {
    const { status, startDate, endDate, categoryId,sortBy} = req.query;

    // Validate and parse query parameters as needed

    const options = {
      status: status ? String(status) : 'completed',
      startDate: startDate ? new Date(String(startDate)) : undefined,
      endDate: endDate ? new Date(String(endDate)) : undefined,
      categoryId: categoryId ? parseInt(String(categoryId), 10) : undefined,
      sortOptions: sortBy as string || 'total_sales_desc',
    };

    const result = await orderService.getTotalByCategory(options);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getTotalOrdersInPeriod = async (req: Request, res: Response) => {
  try {
    const { status, startDate, endDate} = req.query;

    // Validate and parse query parameters as needed

    const options = {
      status: status ? String(status) : 'completed',
      startDate: startDate ? new Date(String(startDate)) : undefined,
      endDate: endDate ? new Date(String(endDate)) : undefined,
      sortOptions:  'total_sales_desc',
    };

    const result = await orderService.getTotalByCategory(options);
    const totals = result.reduce((acc, item) => {
      acc.totalQuantity += parseInt(item.quantity_sold);
      acc.totalOrder += item.order_count;
      acc.totalBeforeDiscount += item.total_before_discount;
      acc.totalSales += item.total_sales;
      return acc;
    }, {
      totalQuantity: 0,
      totalOrder: 0,
      totalBeforeDiscount: 0,
      totalSales: 0
    });
    res.status(200).json(totals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};