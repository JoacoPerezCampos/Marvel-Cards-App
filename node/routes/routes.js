import express from "express"
import * as appController from '../controllers/appControllers.js';


const router = express.Router();

router.get("/", appController.getAllCharacters); //Endpoint to show all characters
router.get("/character/:id", appController.getACharacterById); //Endpoint to show a character by an specific id
router.get("/search/:name", appController.searchCharactersByName); //Endpoint to search characters by an string
router.post("/favorites", appController.saveFavoriteCharacter); //Endpoint to save a character in Favorites
router.delete("/favorites/:charId", appController.deleteFavoriteCharacterById); //Endpoint to delete a character from Favorites
router.get("/favorites", appController.getFavoriteCharacters); //Endpoint to get all characters saved in Favorites

export default router