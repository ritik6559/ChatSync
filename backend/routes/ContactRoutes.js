import express from 'express';
import {searchContacts} from "../controllers/ContactsController.js";

const contactRoutes = express.Router();

contactRoutes.post("/search", searchContacts);


export default contactRoutes;

