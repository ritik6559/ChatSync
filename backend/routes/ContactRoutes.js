import express from 'express';
import {getAllContacts, getContactsForDMList, searchContacts} from "../controllers/ContactsController.js";
import {verifyToken} from "../middlewares/AuthMiddleware.js";

const contactRoutes = express.Router();

contactRoutes.post("/search", searchContacts);
contactRoutes.get("/get-contacts-for-dm", verifyToken, getContactsForDMList);
contactRoutes.get("/get-all-contacts", verifyToken, getAllContacts)

export default contactRoutes;

