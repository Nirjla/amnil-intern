import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { ChatController } from "../controllers/chat.controller";
import { MessageController } from "../controllers/message.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()
const userController = new UserController();
const chatController = new ChatController();
const messageController = new MessageController();

//User routes
router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);
router.get('/users', authMiddleware, userController.getUsers)
// router.get('/users/get', authMiddleware, userController.getUsersNotCreator)


//Chat routes
router.post('/rooms', authMiddleware, chatController.create);
router.get('/rooms', authMiddleware, chatController.getAllRooms);
router.get('/rooms/:id', authMiddleware, chatController.getRoomById);
router.post('/rooms/:chatId/add', authMiddleware, chatController.addParticipant)
router.get('/rooms/:chatId/participants/get', authMiddleware, chatController.getParticipants)
router.get('/rooms/:chatId/non-participants/get', authMiddleware, chatController.getNonParticipants)

//Message routes
router.post('/messages', authMiddleware, messageController.create);
router.get('/rooms/:chatRoomId/messages', authMiddleware, messageController.getRoomMessages);


export default router;