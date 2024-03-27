import express from 'express';
import {getSearchResults,getSuggestions} from '../Controllers/searchController';
const router = express.Router();

router.get('/',getSearchResults );

router.get('/suggestions',getSuggestions );

export default router